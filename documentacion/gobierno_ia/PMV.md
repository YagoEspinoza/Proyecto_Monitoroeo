# PMV — Productos Mínimos Viables por fase

Alineado con `documentacion/fases.md` y avances en `documentacion/avances/`.

| ID_PMV | NOMBRE_PMV | ID_BOLT | MODULO | ESTADO | OBSERVACION |
|--------|------------|---------|--------|--------|-------------|
| PMV-F01 | Seguridad y acceso | BOLT-AUTH-001 | Auth / login / guards | completado | Fase 1 — criterio: rutas protegidas y RBAC |
| PMV-F02 | Dashboard y monitoreo | BOLT-NET-001 | vision-general | completado | KPIs SOC + gráficos Chart.js |
| PMV-F02 | Dashboard y monitoreo | BOLT-NET-002 | dispositivos | completado | Inventario hosts mock |
| PMV-F02 | Dashboard y monitoreo | BOLT-NET-003 | topologia | completado | Mapa red y HSRP |
| PMV-F02 | Dashboard y monitoreo | BOLT-ISO-001 | iso-compliance | en_progreso | KPIs ISO en dashboard |
| PMV-F03 | VLANs y cuarentena | BOLT-VLAN-001 | vlans | completado | Segmentación institucional |
| PMV-F03 | VLANs y cuarentena | BOLT-VLAN-002 | vlan-cuarentena | completado | Aislamiento VLAN 999 |
| PMV-F04 | Políticas de seguridad | BOLT-POL-001 | politicas | completado | CRUD y motor mock |
| PMV-F05 | Alertas y logs | BOLT-ALT-001 | alertas | completado | Centro alertas IDS |
| PMV-F05 | Alertas y logs | BOLT-AUD-001 | audit-trail | completado | Registro automático |
| PMV-F05 | Alertas y logs | BOLT-AUD-002 | auditoria | completado | Consulta timeline |
| PMV-F05 | Alertas y logs | BOLT-REP-001 | reportes | en_progreso | Export + backend MongoDB |
| PMV-F05 | Alertas y logs | BOLT-BE-001 | backend/reports | en_progreso | API /api/reports |
| PMV-F05 | Alertas y logs | BOLT-SIM-001 | simulacion-ataques | completado | Validación detección lab |
| PMV-F06 | Asistente IA SOC | BOLT-IA-001 | soc-ai-assistant | en_progreso | Mock; LLM backend futuro |
| PMV-F06 | Asistente IA SOC | BOLT-CFG-001 | configuracion | pendiente | Toggle IA admin pendiente |
| PMV-F07 | Testing y SonarQube | BOLT-DEV-001 | ci / vitest | en_progreso | Pipeline configurado |
| PMV-F08 | Producción y DevOps | BOLT-DEV-002 | docker / nginx | en_progreso | Despliegue parcial |
