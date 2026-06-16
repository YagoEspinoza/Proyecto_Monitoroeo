# DEPENDENCIAS — Dependencias entre Bolts

| ID_BOLT | DEPENDE_DE | TIPO_DEPENDENCIA | IMPACTO | OBSERVACION |
|---------|------------|------------------|---------|-------------|
| BOLT-NET-002 | BOLT-NET-001 | funcional | medio | Inventario reutiliza mock-network y KPIs del dashboard |
| BOLT-NET-003 | BOLT-NET-001 | funcional | medio | Topología comparte modelos network.models.ts |
| BOLT-VLAN-002 | BOLT-VLAN-001 | funcional | alto | Cuarentena requiere catálogo VLAN y mock-network |
| BOLT-POL-001 | BOLT-VLAN-001 | funcional | alto | Políticas referencian vlanIds |
| BOLT-ALT-001 | BOLT-POL-001 | funcional | alto | Alertas generadas por evaluación de reglas |
| BOLT-ALT-001 | BOLT-AUD-001 | trazabilidad | medio | Alertas críticas deben auditarse |
| BOLT-AUD-002 | BOLT-AUD-001 | funcional | alto | UI auditoría consume audit-trail.service |
| BOLT-REP-001 | BOLT-AUD-001 | funcional | alto | Reportes incluyen datos de auditoría e incidentes |
| BOLT-REP-001 | BOLT-ISO-001 | funcional | alto | Campos ISO en report.model.ts |
| BOLT-BE-001 | BOLT-REP-001 | técnica | alto | Backend persiste lo que exporta el frontend |
| BOLT-IA-001 | BOLT-ALT-001 | funcional | medio | Contexto de alertas para sugerencias IA |
| BOLT-IA-001 | BOLT-CFG-001 | configuración | bajo | Toggle IA en configuración (pendiente RF-CFG-001) |
| BOLT-SIM-001 | BOLT-ALT-001 | funcional | medio | Simulación valida detección de alertas |
| BOLT-ISO-001 | BOLT-NET-001 | funcional | alto | KPIs ISO en vision-general |
| BOLT-ISO-001 | BOLT-POL-001 | funcional | medio | Checklist controles Anexo A en políticas |
| BOLT-VLAN-001 | BOLT-AUTH-001 | seguridad | alto | Rutas protegidas por authGuard |
| BOLT-DEV-001 | BOLT-AUTH-001 | técnica | medio | CI ejecuta specs de auth-guard |
| BOLT-DEV-002 | BOLT-DEV-001 | técnica | medio | Despliegue tras pasar CI |
