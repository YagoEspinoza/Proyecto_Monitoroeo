# Fase 8 — Producción y DevOps (Cursor)

## Objetivo general

Preparar despliegue productivo del frontend: Docker, nginx, environments, CI/CD release y documentación de deployment/rollback.

---

## Contexto obligatorio

- `Dockerfile` multi-stage existente
- Falta `nginx.conf` si no está en repo — crear o validar
- Backend y Compose completos: **futuro**
- Release objetivo: v1.0.0

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `Dockerfile` | Build imagen |
| `src/environments/environment.ts` | URLs API/WS |
| `.github/workflows/ci.yml` | Extender deploy |
| `documentacion/deployment.md` | Entornos |
| `documentacion/implementacion/release-plan-v1.0.0.md` | Plan release |

---

## Reglas que debe respetar Cursor

1. No secrets en imagen Docker
2. SPA fallback en nginx
3. Cabeceras seguridad en nginx
4. Tags semver en imágenes
5. [manual-despliegue-docker.md](../manual-despliegue-docker.md)

---

## Módulos a crear o mejorar

| Artefacto | Acción |
|-----------|--------|
| nginx.conf | try_files, gzip, headers |
| environment.prod | apiUrl, wsUrl por entorno |
| CI | job build Docker opcional |
| Docs | deployment, rollback actualizados |

---

## Criterios de aceptación

- [ ] `docker build` exitoso
- [ ] Contenedor sirve app en puerto 80
- [ ] Refresh en `/alertas` no da 404
- [ ] `environment` diferenciado dev/prod vía angular.json
- [ ] Workflow publica artefacto `dist/` o imagen
- [ ] [rollback.md](../rollback.md) probado en staging

---

## Restricciones

- Hosting compartido documentado aparte, no mezclar con Docker prod
- No desplegar simulación de ataques sin banner en prod

---

## Validaciones

```bash
docker build -t netguard-soc:test .
docker run -p 8080:80 netguard-soc:test
curl -I http://localhost:8080/
curl -I http://localhost:8080/vision-general
```

Checklist [deployment.md](../deployment.md).

---

## Pruebas mínimas

| Prueba | Tipo |
|--------|------|
| Build Docker | Manual/CI |
| Smoke HTTP | curl 200 |
| CI verde | GitHub Actions |

---

## Resultado esperado

Frontend NetGuard SOC desplegable de forma repetible; pipeline listo para acoplar API Node en Compose futuro.

**Bitácora:** [avance_fase_8_produccion_devops.md](../avances/avance_fase_8_produccion_devops.md)
