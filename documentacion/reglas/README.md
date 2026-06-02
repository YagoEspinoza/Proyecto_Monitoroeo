# Reglas de desarrollo — NetGuard SOC

Estándares obligatorios para el equipo y para asistencia con **Cursor**. Aplican al frontend Angular actual y al backend Node.js futuro.

---

## Índice

| Documento | Alcance |
|-----------|---------|
| [clean_code.md](./clean_code.md) | Legibilidad, nombres, funciones, deuda |
| [frontend.md](./frontend.md) | Angular, componentes, UX SOC |
| [backend.md](./backend.md) | Node.js API (futuro) |
| [arquitectura.md](./arquitectura.md) | Capas, dominios, integraciones |
| [seguridad.md](./seguridad.md) | Auth, cuarentena, datos sensibles |
| [testing.md](./testing.md) | Vitest, cobertura, SonarQube |
| [ia.md](./ia.md) | Asistente SOC, prompts, límites |
| [ddd.md](./ddd.md) | Bounded contexts y dominios |

---

## Dominios del sistema (obligatorio)

Todo código de negocio debe ubicarse mental y físicamente en uno de estos contextos:

| Dominio | Prefijo sugerido en servicios/modelos |
|---------|--------------------------------------|
| Auth | `auth-*` |
| Users | `user-*` |
| NetworkMonitoring | `network-*`, `device-*` |
| VLANManagement | `vlan-*` |
| SecurityPolicies | `policy-*`, `security-policy-*` |
| ThreatDetection | `alert-*`, `threat-*`, `attack-*` |
| IncidentResponse | `incident-*`, `soc-event-*` |
| Quarantine | `quarantine-*` |
| AuditLogs | `audit-*` |
| SOC_AI_Assistant | `soc-ai-*` |

---

## Jerarquía de reglas

1. **Seguridad** — nunca comprometer por velocidad
2. **Arquitectura y DDD** — límites claros entre dominios
3. **Frontend / Backend** — convenciones del stack
4. **Testing** — no merge sin pruebas mínimas de la fase
5. **Clean code** — mantenibilidad

---

## Uso con Cursor

Antes de cada tarea por fase, leer:

1. Regla correspondiente en esta carpeta
2. [instrucciones/fase_N_*.md](../instrucciones/)
3. [avances/](../avances/) del estado actual

No inventar endpoints ni tablas de BD no documentados en `implementacion/`.
