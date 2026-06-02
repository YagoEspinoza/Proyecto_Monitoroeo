# Conexión Angular ↔ Backend Node.js

> **Estado:** El backend Node.js es **futuro**. Este documento define la estrategia de integración desde el frontend Angular actual.

---

## Arquitectura de integración

```
Angular (network-api.service)
    ↓ HttpClient + token-interceptor
Node.js API /api/v1
    ↓
PostgreSQL + Redis (futuro)
    ↓
Adaptadores GNS3 / VMware (futuro)
```

---

## Pasos de migración desde mock

| Paso | Acción |
|------|--------|
| 1 | Publicar OpenAPI estable |
| 2 | Generar tipos TypeScript desde OpenAPI (opcional: openapi-generator) |
| 3 | Implementar métodos en `network-api.service` |
| 4 | Flag `useLiveApi` en environment |
| 5 | Sustituir inyección de `MockNetworkService` por API en `app.config` |
| 6 | Pruebas de contrato |

---

## HttpClient

```typescript
// Patrón recomendado en network-api.service (futuro)
getDevices(): Observable<Dispositivo[]> {
  if (!environment.useLiveApi) {
    return this.mock.getDevices();
  }
  return this.http.get<Dispositivo[]>(`${environment.apiUrl}/devices`);
}
```

---

## Autenticación

1. `POST /auth/login` → `{ accessToken, refreshToken, user }`
2. `auth.service` guarda accessToken
3. `token-interceptor` añade `Authorization: Bearer`
4. `401` → intentar refresh o logout

---

## CORS

Backend debe permitir origen del frontend:

```
Access-Control-Allow-Origin: https://soc.empresa.com
Access-Control-Allow-Headers: Authorization, Content-Type
```

---

## WebSocket

Tras login, conectar `socket.io` a `environment.wsUrl` con token en handshake (futuro).

Ver [websocket-events.md](./websocket-events.md).

---

## Manejo de errores

| Código | UI |
|--------|-----|
| 400 | Mensaje validación formulario |
| 401 | Redirect login |
| 403 | Toast “Sin permisos” |
| 503 | Banner degradación servicio |

Usar `error-message.util` para mapeo.

---

## Dominios y endpoints

Ver [openapi-angular-backend-node.yaml](./openapi-angular-backend-node.yaml).

---

## Entornos

| Env | apiUrl |
|-----|--------|
| dev | `http://localhost:3000/api/v1` |
| staging | `https://api-staging.../api/v1` |
| prod | `https://api.../api/v1` |

Configurar con `fileReplacements` en `angular.json`.
