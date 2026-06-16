# REQUERIMIENTOS — RF y RNF

Requerimientos derivados de `documentacion/fases.md`, `manualdeusuario.md` y dominios DDD.

| ID_REQUERIMIENTO | TIPO(RF/RNF) | DESCRIPCION | PRIORIDAD | PMV | ESTADO | ID_BOLT_RELACIONADO |
|------------------|--------------|-------------|-----------|-----|--------|---------------------|
| RF-AUTH-001 | RF | El sistema debe permitir login con JWT y cierre de sesión | alta | PMV-F01 | completado | BOLT-AUTH-001 |
| RF-AUTH-002 | RF | Rutas sensibles deben restringirse por rol (admin, operador, analista) | alta | PMV-F01 | completado | BOLT-AUTH-001 |
| RNF-AUTH-001 | RNF | Tokens no deben persistirse en logs ni enviarse al asistente IA | alta | PMV-F01 | completado | BOLT-AUTH-001 |
| RF-NET-001 | RF | Dashboard debe mostrar KPIs: dispositivos, alertas, VLANs, cumplimiento ISO | alta | PMV-F02 | completado | BOLT-NET-001 |
| RF-NET-002 | RF | Inventario de dispositivos con filtro por VLAN y estado | media | PMV-F02 | completado | BOLT-NET-002 |
| RF-NET-003 | RF | Topología debe visualizar gateways HSRP y segmentos institucionales | media | PMV-F02 | completado | BOLT-NET-003 |
| RF-VLAN-001 | RF | Gestión de VLANs con áreas institucionales y matriz PERMIT/DENY | alta | PMV-F03 | completado | BOLT-VLAN-001 |
| RF-VLAN-002 | RF | Cuarentena VLAN 999 con confirmación humana antes de aislar | alta | PMV-F03 | completado | BOLT-VLAN-002 |
| RNF-VLAN-001 | RNF | Aislamiento fail-safe: sin confirmación no se mueve host | alta | PMV-F03 | completado | BOLT-VLAN-002 |
| RF-POL-001 | RF | CRUD de políticas con severidad y acciones (alertar, auditar, cuarentena) | alta | PMV-F04 | completado | BOLT-POL-001 |
| RF-ALT-001 | RF | Centro de alertas con reconocimiento y escalamiento | alta | PMV-F05 | completado | BOLT-ALT-001 |
| RF-AUD-001 | RF | Audit trail append-only de acciones críticas | alta | PMV-F05 | completado | BOLT-AUD-001 |
| RF-REP-001 | RF | Exportar reportes de incidentes con campos ISO y PDF | media | PMV-F05 | en_progreso | BOLT-REP-001 |
| RF-IA-001 | RF | Asistente IA debe resumir alertas y sugerir contención sin ejecutar cuarentena | media | PMV-F06 | en_progreso | BOLT-IA-001 |
| RNF-IA-001 | RNF | Disclaimer visible: asistencia IA — verificar procedimiento SOC | alta | PMV-F06 | completado | BOLT-IA-001 |
| RF-ISO-001 | RF | Calcular indicadores de cumplimiento ISO 27001 y calidad ISO 25000 | alta | PMV-F02 | completado | BOLT-ISO-001 |
| RF-SIM-001 | RF | Simulación de ataques en laboratorio con permiso simulate | baja | PMV-F05 | completado | BOLT-SIM-001 |
| RNF-QA-001 | RNF | Cobertura de tests en dominios críticos vía Vitest en CI | media | PMV-F07 | en_progreso | BOLT-DEV-001 |
| RNF-DEV-001 | RNF | Frontend desplegable vía Docker + nginx | media | PMV-F08 | en_progreso | BOLT-DEV-002 |
| RF-CFG-001 | RF | Admin puede desactivar IA SOC desde configuración global | media | PMV-F06 | pendiente | BOLT-CFG-001 |
| RNF-BE-001 | RNF | API reportes con validación y manejo centralizado de errores | media | PMV-F05 | en_progreso | BOLT-BE-001 |
