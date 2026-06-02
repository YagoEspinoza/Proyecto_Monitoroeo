# Breaking changes — v1.0.0

Documento de referencia para cambios incompatibles al publicar **NetGuard SOC 1.0.0**.

> En v1.0.0 como primera release estable, los “breaking” aplican principalmente a **consumidores de mock internos** y a **preparación de API** respecto a betas anteriores del Taller.

---

## 1. Rutas Angular

Las rutas canónicas quedan definidas en `APP_ROUTES`. Cualquier ruta legacy debe redirigir:

| Antes (beta) | Después (v1.0.0) |
|--------------|------------------|
| `/dashboard` | `/vision-general` |
| `/quarantine` | `/vlan-cuarentena` |
| `/security-policies` | `/politicas` |

---

## 2. Roles

| Antes | Después |
|-------|---------|
| `observador` | `analista` (alias deprecado en código) |

Actualizar asignaciones en datos mock y futura BD.

---

## 3. Modelos de alerta

Campos obligatorios en `Alert` (OpenAPI):

- `severity`: `critical | high | medium | low`
- `status`: `open | acknowledged | closed`

Eliminar severidades numéricas 1–4 si existían en prototipos.

---

## 4. Servicios mock

`MockNetworkService` no será API pública para páginas. Consumir solo vía `NetworkApiService`.

**Migración:** reemplazar inyección directa de mock en componentes.

---

## 5. Variables de entorno

| Variable | Cambio |
|----------|--------|
| `apiUrl` | Debe incluir sufijo `/api/v1` |
| `wsUrl` | URL base sin path `/socket.io` |

---

## 6. OpenAPI 1.0.0

Endpoints renombrados respecto a borradores:

| Borrador | v1.0.0 |
|----------|--------|
| `POST /isolation` | `POST /quarantine/isolate` |
| `GET /logs` | `GET /audit` |

Clientes generados deben regenerarse.

---

## 7. WebSocket

Namespace único recomendado: `/soc`. Eventos legacy `newAlert` → `alert.created`.

---

## 8. Políticas

Campo `autoQuarantine` boolean explícito; antes acción implícita en `action: 'quarantine'`.

---

## Plan de migración para equipos

1. Buscar usos de rutas y roles antiguos
2. Regenerar cliente API desde OpenAPI
3. Ejecutar suite de tests
4. Desplegar staging 48h antes de prod
5. Consultar [rollback.md](../rollback.md) si falla

---

## Compatibilidad hacia atrás

No se garantiza compatibilidad con builds anteriores a **2026-05** del Taller sin revisión manual.
