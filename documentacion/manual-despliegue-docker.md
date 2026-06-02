# Manual de despliegue con Docker

Despliegue del **frontend Angular** de NetGuard SOC usando contenedores. El stack completo (API Node.js, base de datos, Redis) se documenta como **evolución futura**.

---

## Estado actual

El repositorio incluye un `Dockerfile` multi-stage:

1. **Build:** Node 22 Alpine → `npm ci` → `npm run build`
2. **Runtime:** nginx Alpine sirviendo `dist/my-monitoreo/browser`

---

## Requisitos

- Docker 24+
- Docker Compose 2.x (opcional, para stack futuro)

---

## Build de imagen

Desde la raíz del proyecto:

```bash
docker build -t netguard-soc-frontend:latest .
```

---

## Ejecución

```bash
docker run -d \
  --name netguard-frontend \
  -p 8080:80 \
  netguard-soc-frontend:latest
```

Acceso: `http://localhost:8080`

---

## Configuración nginx

El `Dockerfile` referencia `nginx.conf` en la raíz del proyecto. Debe incluir:

- `try_files` para SPA (fallback a `index.html`)
- Cabeceras de seguridad básicas (`X-Content-Type-Options`, `X-Frame-Options`)
- Compresión gzip para assets estáticos

---

## Variables de entorno en build (futuro)

Para inyectar `apiUrl` y `wsUrl` en tiempo de build:

```dockerfile
ARG API_URL=https://api.ejemplo.com
ARG WS_URL=wss://api.ejemplo.com
# RUN sed o fileReplacements en angular.json
```

Recomendación: usar `fileReplacements` en `angular.json` con `environment.prod.ts` por entorno.

---

## Docker Compose (stack futuro — referencia)

```yaml
# docker-compose.yml (FUTURO — no incluido aún como definitivo)
services:
  frontend:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - api
  api:
    image: netguard-soc-api:latest  # Futuro
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
  postgres:
    image: postgres:16-alpine
```

---

## CI/CD

El workflow `.github/workflows/ci.yml` ejecuta tests y build. Extender con:

1. Push de imagen a registry (GHCR, Docker Hub)
2. Despliegue en staging/prod

Ver [deployment.md](./deployment.md) y [implementacion/release-plan-v1.0.0.md](./implementacion/release-plan-v1.0.0.md).

---

## Salud y logs del contenedor

```bash
docker logs -f netguard-frontend
docker exec -it netguard-frontend wget -qO- http://localhost/
```

---

## Limitaciones actuales

| Limitación | Mitigación futura |
|------------|-------------------|
| Solo frontend estático | Añadir servicio `api` en Compose |
| Sin WebSocket en nginx solo | Proxy pass a gateway Node |
| Datos mock en cliente | Backend + persistencia |

---

## Seguridad en producción

- Usar HTTPS con reverse proxy (Traefik, nginx externo, cloud LB)
- No exponer credenciales en la imagen
- Escanear imagen con `docker scout` o Trivy
- Usuario no-root en nginx cuando sea posible
