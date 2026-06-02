# Monitoreo y observabilidad

Estrategia de observabilidad para operaciones SOC/NOC y salud de la plataforma NetGuard SOC.

---

## Objetivos

1. Conocer **disponibilidad** del sistema y servicios
2. Correlacionar **eventos de seguridad** con telemetría de red
3. Detectar degradación de **VLANs** y dispositivos
4. Alimentar alertas y el dashboard en tiempo real (futuro WebSocket)

---

## Pilares de observabilidad

| Pilar | Qué observar | Estado |
|-------|--------------|--------|
| **Uptime** | Frontend, API, nginx | Parcial (manual / futuro APM) |
| **Logs** | App, auditoría, acceso | UI auditoría + futuro centralizado |
| **Métricas** | KPIs SOC, latencia API | Dashboard + futuro Prometheus |
| **Trazas** | Flujo alerta → cuarentena | Futuro OpenTelemetry |

---

## Uptime y disponibilidad

### Frontend (actual)

- Verificar respuesta HTTP 200 en `/` y rutas SPA
- CI GitHub Actions en cada push

### Futuro

| Check | Herramienta sugerida |
|-------|----------------------|
| HTTP synthetic | Uptime Kuma, Pingdom |
| API `/health` | Kubernetes liveness |
| WebSocket | Probe de conexión cada N min |

---

## Logs

### Tipos en NetGuard SOC

| Categoría | Origen | Retención sugerida |
|-----------|--------|-------------------|
| Auditoría SOC | `audit-trail.service` | 90–365 días |
| Seguridad | Políticas, cuarentena | 1 año |
| Aplicación | Frontend / API | 30 días |
| Infra | nginx, Docker | 14 días |

### Buenas prácticas

- Formato estructurado JSON en backend futuro
- Campos: `timestamp`, `severity`, `domain`, `userId`, `correlationId`
- No registrar contraseñas ni tokens completos

---

## Métricas clave (SOC/NOC)

| Métrica | Descripción |
|---------|-------------|
| `devices_online_total` | Dispositivos activos |
| `alerts_active_by_severity` | Alertas abiertas por nivel |
| `vlans_healthy_ratio` | VLANs operativas vs degradadas |
| `quarantine_hosts_count` | Hosts en VLAN cuarentena |
| `mttr_incidents_minutes` | Tiempo medio de resolución |
| `policy_violations_rate` | Violaciones por hora |

**Actual:** calculadas en cliente desde mock.  
**Futuro:** expuestas en `/metrics` (Prometheus) y stream WebSocket.

---

## Alertas operativas vs alertas de seguridad

| Tipo | Ejemplo | Canal |
|------|---------|-------|
| Operativa | API caída, disco lleno | Email / PagerDuty futuro |
| Seguridad | Intrusión, escaneo puertos | Dashboard + notificación SOC |

El **Centro de alertas** (`/alertas`) es la vista principal de seguridad para el operador.

---

## Eventos de seguridad

Flujo de evento unificado vía `soc-event.service`:

1. Origen: simulación, sensor, política
2. Normalización a modelo de alerta
3. Publicación en UI y (futuro) WebSocket `alert.created`
4. Registro en AuditLogs

---

## Estado de dispositivos

- Página **Dispositivos**: online, offline, degradado, cuarentena
- Actualización periódica (polling) hasta WebSocket
- Umbrales configurables en **Configuración** (admin)

---

## Estado VLAN

| Estado | Significado |
|--------|-------------|
| Activa | Tráfico normal |
| Degradada | Pérdida parcial / spanning tree |
| Mantenimiento | Cambios planificados |
| Cuarentena | Segmento de aislamiento |

Monitorear en `/vlans` y `/vlan-cuarentena`.

---

## Dashboard SOC

La **Visión general** consolida KPIs. En producción:

- Refresh automático vía WebSocket
- Indicadores de fuente de datos (mock vs live)

---

## Integración futura

- **SonarQube:** calidad de código, no runtime
- **GNS3/VMware:** métricas de lab exportadas a API
- **SIEM:** exportación de AuditLogs vía API o syslog

Ver [implementacion/websocket-events.md](./implementacion/websocket-events.md).
