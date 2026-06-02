# Avance Fase 5 — Alertas y logs

**Última actualización:** 2026-05-24  
**Semáforo:** 🟡 En curso

---

## Estado general

Centro de alertas, auditoría y reportes en UI. Servicios de notificación y audit trail presentes.

**Progreso estimado:** 75%

---

## Cambios realizados

- `alertas` — listado y severidad
- `auditoria` — timeline eventos
- `reportes` — exportación
- `notification-center`, `audit-trail.service`, `export.service`
- Modelos `alerta.model`, `audit.models`

---

## Módulos afectados

| Dominio | Archivos |
|---------|----------|
| ThreatDetection | alertas |
| AuditLogs | auditoria, reportes, audit-trail |
| IncidentResponse | soc-event (parcial) |

---

## Pruebas realizadas

| Prueba | Resultado |
|--------|-----------|
| Export reportes | Manual |
| Notificaciones UI | OK |

---

## Pendientes

- [ ] Persistencia auditoría en BD
- [ ] WebSocket `alert.created`
- [ ] Integración SIEM (futuro)

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Pérdida logs al refrescar | Backend append-only |
| Volumen alertas mock | Paginación |

---

## Próximos pasos

1. Tests audit-trail y orden alertas
2. Fase 6 — contexto alertas en IA
3. Métricas en [monitoring.md](../monitoring.md)
