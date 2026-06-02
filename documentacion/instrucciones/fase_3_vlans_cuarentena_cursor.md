# Fase 3 — VLANs y cuarentena (Cursor)

## Objetivo general

Implementar **VLANManagement** y **Quarantine**: gestión de VLANs activas, VLAN de cuarentena y flujo de aislamiento/liberación con auditoría.

---

## Contexto obligatorio

- VLAN 802.1Q como concepto de segmentación lógica
- Cuarentena = VLAN aislada sin routing a producción
- Roles con `isolate`: admin y operador
- Flujo IR: ver [incident_response.md](../incident_response.md)

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/pages/vlans/` | VLANManagement |
| `src/app/pages/vlan-cuarentena/` | Quarantine |
| `src/app/core/models/network.models.ts` | Modelos VLAN |
| `src/app/core/services/confirm-dialog.service.ts` | Confirmación aislamiento |
| `src/app/core/services/audit-trail.service.ts` | Registro acciones |
| `documentacion/reglas/seguridad.md` | Confirmación doble |

---

## Reglas que debe respetar Cursor

1. [seguridad.md](../reglas/seguridad.md) — confirmar antes de aislar
2. [ddd.md](../reglas/ddd.md) — Quarantine separado de VLANManagement
3. `roleGuard` en `/vlan-cuarentena`
4. Cada isolate/release genera entrada de auditoría

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| VLANManagement | CRUD UI mock de VLANs |
| Quarantine | Lista hosts aislados, acciones |
| AuditLogs | Eventos `HOST_ISOLATED`, `HOST_RELEASED` |

---

## Criterios de aceptación

- [ ] Listado VLANs con ID, nombre, estado, conteo hosts
- [ ] Cuarentena lista hosts con timestamp y motivo
- [ ] Botón aislar pide confirmación
- [ ] Tras aislar, dispositivo aparece en cuarentena y estado actualizado
- [ ] Liberar host restaura estado en mock
- [ ] Analista no puede acceder a acciones de aislamiento

---

## Restricciones

- No llamar API de switch real
- No aislar sin rol operador/admin
- Marcar UI como simulación si aplica

---

## Validaciones

Probar flujo: dispositivo → aislar → ver en cuarentena → liberar → ver auditoría.

```bash
ng test --include='**/vlan*'
```

---

## Pruebas mínimas

| Test | Objetivo |
|------|----------|
| Aislamiento mock | Host cambia VLAN a cuarentena |
| Permisos | roleGuard en ruta cuarentena |
| Auditoría | Evento registrado tras confirmar |

---

## Resultado esperado

Capacidad operativa de contención por segmentación: el SOC aísla hosts sospechosos en VLAN cuarentena con trazabilidad completa.

**Bitácora:** [avance_fase_3_vlans_cuarentena.md](../avances/avance_fase_3_vlans_cuarentena.md)
