# CONTROL_VERSIONES — Registro de versiones por Bolt

Última versión registrada por Bolt. Ampliar filas al crear nuevas versiones (`VERSION` incremental).

| ID_REGISTRO | ID_BOLT | BOLT_PADRE | VERSION | TIPO_CAMBIO | ESTADO_BOLT | ESTADO_INTEGRACION | FECHA | RESPONSABLE | AGENTE_RESPONSABLE | COMMIT | PULL_REQUEST | FUENTE | CONFIANZA | REQUIERE_REVISION_HUMANA | OBSERVACIONES |
|-------------|---------|------------|---------|-------------|-------------|---------------------|-------|-------------|-------------------|--------|--------------|--------|-----------|--------------------------|---------------|
| CV-BOLT-AUTH-001-v1 | BOLT-AUTH-001 | — | 1.0.0 | feature | producción | main | 2025-11-15 | Dev equipo | humano | — | — | manual | alta | no | Fase 1 cerrada |
| CV-BOLT-NET-001-v1 | BOLT-NET-001 | — | 1.0.0 | feature | activo | develop | 2026-01-20 | Dev equipo | cursor-agent | — | — | cursor | alta | si | KPIs + ISO en dashboard |
| CV-BOLT-NET-002-v1 | BOLT-NET-002 | BOLT-NET-001 | 1.0.0 | feature | activo | develop | 2026-01-22 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Inventario dispositivos |
| CV-BOLT-NET-003-v1 | BOLT-NET-003 | BOLT-NET-001 | 1.0.0 | feature | activo | develop | 2026-02-01 | Dev equipo | cursor-agent | — | — | cursor | media | si | Topología HSRP |
| CV-BOLT-VLAN-001-v1 | BOLT-VLAN-001 | — | 1.0.0 | feature | activo | develop | 2026-02-10 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Matriz inter-VLAN |
| CV-BOLT-VLAN-002-v1 | BOLT-VLAN-002 | BOLT-VLAN-001 | 1.0.0 | feature | activo | develop | 2026-02-15 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Confirmación cuarentena |
| CV-BOLT-POL-001-v1 | BOLT-POL-001 | — | 1.0.0 | feature | activo | develop | 2026-02-20 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Políticas + motor mock |
| CV-BOLT-ALT-001-v1 | BOLT-ALT-001 | BOLT-POL-001 | 1.0.0 | feature | activo | develop | 2026-03-01 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Centro alertas |
| CV-BOLT-AUD-001-v1 | BOLT-AUD-001 | — | 1.0.0 | feature | activo | develop | 2026-03-05 | Dev equipo | humano | — | — | manual | alta | no | localStorage audit |
| CV-BOLT-AUD-002-v1 | BOLT-AUD-002 | BOLT-AUD-001 | 1.0.0 | feature | activo | develop | 2026-03-08 | Dev equipo | cursor-agent | — | — | cursor | alta | si | UI auditoría |
| CV-BOLT-REP-001-v1 | BOLT-REP-001 | BOLT-AUD-001 | 1.0.0 | feature | activo | develop | 2026-04-01 | Dev equipo | cursor-agent | — | — | cursor | media | si | Frontend + backend reportes |
| CV-BOLT-REP-001-v2 | BOLT-REP-001 | BOLT-AUD-001 | 1.1.0 | enhancement | activo | develop | 2026-06-10 | Dev equipo | cursor-agent | — | — | cursor | media | si | Campos ISO extendidos PDF |
| CV-BOLT-IA-001-v1 | BOLT-IA-001 | — | 0.6.0 | feature | activo | develop | 2026-04-15 | Dev equipo | cursor-agent | — | — | cursor | media | si | Mock plantillas soc-ai |
| CV-BOLT-ISO-001-v1 | BOLT-ISO-001 | — | 1.0.0 | feature | activo | develop | 2026-05-01 | Dev equipo | cursor-agent | — | — | cursor | alta | si | IsoComplianceService |
| CV-BOLT-SIM-001-v1 | BOLT-SIM-001 | BOLT-ALT-001 | 1.0.0 | feature | activo | develop | 2026-03-20 | Dev equipo | humano | — | — | manual | alta | no | Lab simulación |
| CV-BOLT-CFG-001-v1 | BOLT-CFG-001 | — | 1.0.0 | feature | activo | develop | 2026-02-25 | Dev equipo | cursor-agent | — | — | cursor | alta | si | Solo admin |
| CV-BOLT-BE-001-v1 | BOLT-BE-001 | BOLT-REP-001 | 1.0.0 | feature | activo | develop | 2026-05-15 | Dev equipo | cursor-agent | — | — | cursor | media | si | Express + MongoDB |
| CV-BOLT-DEV-001-v1 | BOLT-DEV-001 | — | 1.0.0 | infra | activo | main | 2026-01-10 | DevOps | humano | — | — | manual | alta | no | GitHub Actions CI |
| CV-BOLT-DEV-002-v1 | BOLT-DEV-002 | — | 0.7.0 | infra | activo | main | 2026-04-20 | DevOps | humano | — | — | manual | media | si | Dockerfile parcial |
| CV-BOLT-DOC-001-v1 | BOLT-DOC-001 | — | 1.0.0 | documentacion | activo | develop | 2026-06-16 | Dev equipo | cursor-agent | — | — | cursor | alta | no | Plantilla gobierno_ia |
