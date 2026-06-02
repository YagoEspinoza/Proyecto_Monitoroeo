# Reglas Backend — Node.js (futuro)

El backend **no está implementado** en el repositorio actual. Estas reglas aplican al desarrollo futuro de la API NetGuard SOC.

---

## Stack objetivo

| Componente | Elección sugerida |
|------------|-------------------|
| Runtime | Node.js 22 LTS |
| Framework | Express o Fastify |
| Validación | Zod o Joi |
| Auth | JWT + refresh, bcrypt/argon2 |
| BD | PostgreSQL |
| Tiempo real | Socket.io o ws |
| Documentación | OpenAPI 3.1 |

Contrato: [../implementacion/openapi-angular-backend-node.yaml](../implementacion/openapi-angular-backend-node.yaml)

---

## Estructura de carpetas (propuesta)

```
backend/
├── src/
│   ├── domains/
│   │   ├── auth/
│   │   ├── network-monitoring/
│   │   ├── vlan-management/
│   │   ├── threat-detection/
│   │   ├── quarantine/
│   │   └── ...
│   ├── shared/
│   │   ├── middleware/
│   │   └── errors/
│   └── index.ts
├── prisma/ o migrations/
└── tests/
```

---

## API REST

- Prefijo `/api/v1`
- Recursos en plural: `/devices`, `/vlans`, `/alerts`
- Códigos HTTP semánticos
- Errores JSON: `{ "code", "message", "details" }`

---

## Dominios y responsabilidades

| Dominio | Endpoints ejemplo |
|---------|-------------------|
| Auth | `POST /auth/login`, `POST /auth/refresh` |
| Users | `GET /users/me`, `PATCH /users/me` |
| NetworkMonitoring | `GET /devices`, `GET /topology` |
| VLANManagement | `GET/POST /vlans` |
| SecurityPolicies | `CRUD /policies` |
| ThreatDetection | `GET /alerts`, `POST /simulations` |
| Quarantine | `POST /quarantine/isolate`, `POST /quarantine/release` |
| AuditLogs | `GET /audit`, `POST /audit` (interno) |
| IncidentResponse | `POST /incidents`, `PATCH /incidents/:id` |

---

## Seguridad

- Rate limit en login
- RBAC alineado con `ROLES` del frontend
- Validar ownership en operaciones de cuarentena
- Secrets solo por variables de entorno

---

## Integraciones

- **GNS3:** adaptador en capa infra, no en controladores HTTP directos
- **VMware:** jobs asíncronos para cambios de red
- **WebSocket:** eventos documentados en [websocket-events.md](../implementacion/websocket-events.md)

---

## Logging

- JSON estructurado
- `correlationId` por request
- Auditar: login, isolate, release, policy change

---

## Migración desde mock

1. Implementar endpoint
2. Actualizar `network-api.service` en Angular
3. Feature flag `useLiveApi` en environment
4. Tests de contrato contra OpenAPI
