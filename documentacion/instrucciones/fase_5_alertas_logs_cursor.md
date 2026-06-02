# Fase 5 — Alertas y logs (Cursor)

## Objetivo general

Consolidar **ThreatDetection** y **AuditLogs**: centro de alertas, notificaciones, auditoría, exportación y reportes SOC.

---

## Contexto obligatorio

- Modelo alerta: `alerta.model.ts`
- Servicios: `notification-center.service`, `audit-trail.service`, `export.service`
- Páginas: `alertas`, `auditoria`, `reportes`
- Correlación con políticas (fase 4) y cuarentena (fase 3)

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/pages/alertas/` | Centro alertas |
| `src/app/pages/auditoria/` | Logs auditoría |
| `src/app/pages/reportes/` | Exportación |
| `src/app/shared/components/notification-center/` | Campana SOC |
| `src/app/core/models/audit.models.ts` | Entradas auditoría |
| `documentacion/monitoring.md` | Métricas y logs |

---

## Reglas que debe respetar Cursor

1. [ddd.md](../reglas/ddd.md) — AuditLogs append-only conceptualmente
2. [frontend.md](../reglas/frontend.md) — filtros por severidad
3. Severidades consistentes en toda la app
4. Export no debe incluir tokens

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| ThreatDetection | Filtros, orden, detalle alerta |
| AuditLogs | Timeline, búsqueda |
| NotificationCenter | Integración alertas nuevas |
| Reportes | CSV/JSON export mock |

---

## Criterios de aceptación

- [ ] Alertas ordenables por severidad y fecha
- [ ] Reconocer/cerrar alerta actualiza estado
- [ ] Notificación en barra al crear alerta
- [ ] Auditoría muestra login, isolate, policy, simulación
- [ ] Export desde reportes descarga archivo
- [ ] Enlace desde alerta a dispositivo/cuarentena (si aplica)

---

## Restricciones

- Sin SIEM real; formato export documentado
- Retención infinita solo en mock; documentar límite producción

---

## Validaciones

Flujo E2E manual: simulación ataque → alerta → notificación → auditoría → export.

```bash
ng test --include='**/audit*'
```

---

## Pruebas mínimas

| Test | Objetivo |
|------|----------|
| audit-trail | append inmutable |
| Orden alertas | críticas primero |
| export.service | genera blob válido |

---

## Resultado esperado

Operador tiene visibilidad completa de amenazas y trazabilidad para compliance e investigación.

**Bitácora:** [avance_fase_5_alertas_logs.md](../avances/avance_fase_5_alertas_logs.md)
