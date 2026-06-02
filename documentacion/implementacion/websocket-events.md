# Eventos WebSocket — NetGuard SOC

> **Estado:** Cliente `socket.io-client` presente en `core/services/socket.ts`. Gateway servidor: **futuro**.

---

## Conexión

| Parámetro | Valor |
|-----------|-------|
| URL | `environment.wsUrl` |
| Path | `/socket.io` (default) |
| Auth | Token JWT en `auth.token` del handshake (futuro) |

```typescript
// Patrón futuro en socket.ts
import { io } from 'socket.io-client';
import { environment } from '@env/environment';

connect(token: string) {
  return io(environment.wsUrl, {
    auth: { token },
    transports: ['websocket']
  });
}
```

---

## Namespaces (propuesta)

| Namespace | Audiencia |
|-----------|-----------|
| `/soc` | Operadores SOC — alertas y cuarentena |
| `/metrics` | Dashboard KPIs (opcional) |

---

## Eventos servidor → cliente

| Evento | Dominio | Payload ejemplo |
|--------|---------|-----------------|
| `alert.created` | ThreatDetection | `{ id, severity, title, deviceId }` |
| `alert.updated` | ThreatDetection | `{ id, status }` |
| `device.status_changed` | NetworkMonitoring | `{ deviceId, status }` |
| `vlan.status_changed` | VLANManagement | `{ vlanId, status }` |
| `quarantine.host_isolated` | Quarantine | `{ deviceId, isolatedAt }` |
| `quarantine.host_released` | Quarantine | `{ deviceId }` |
| `audit.entry_created` | AuditLogs | `{ id, action, actor }` |
| `incident.updated` | IncidentResponse | `{ incidentId, phase }` |
| `topology.updated` | NetworkMonitoring | `{ nodes, edges }` |

---

## Eventos cliente → servidor

| Evento | Uso |
|--------|-----|
| `subscribe.alerts` | Filtrar severidad mínima |
| `subscribe.devices` | Segmento VLAN |
| `unsubscribe.*` | Limpiar al salir de página |

---

## Integración Angular

| Servicio | Responsabilidad |
|----------|-----------------|
| `socket.ts` | Conexión/desconexión |
| `soc-event.service` | Normalizar eventos a modelos UI |
| `notification-center.service` | Toast ante `alert.created` |

Desuscribir al `ngOnDestroy` del layout o usar servicio singleton con refcount.

---

## Seguridad

- WSS obligatorio en producción
- Validar token en gateway antes de join
- Rate limit por socket
- No emitir datos de otros tenants/organizaciones

---

## Fallback

Si WebSocket falla:

1. Banner “Modo degradado — actualización cada 30s”
2. Polling HTTP `GET /alerts?since=...`

---

## Pruebas

- Mock servidor socket.io en tests de integración (futuro)
- No depender de WS en unit tests Vitest
