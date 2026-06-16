# ACTIVIDADES_BPMN — Actividades por proceso

Actividades BPMN vinculadas al flujo operativo documentado: *Monitoreo → Alerta → Política → Incidente → Cuarentena → Auditoría → Recuperación*.

| ID_BOLT | ID_PROCESO | ACTIVIDAD_BPMN | ROL_RESPONSABLE | TIPO_ACTIVIDAD | DESCRIPCION | MODULO_AFECTADO |
|---------|------------|----------------|-----------------|----------------|-------------|-----------------|
| BOLT-AUTH-001 | PROC-APO-017 | Iniciar sesión en NetGuard SOC | Operador SOC | User Task | Validar credenciales y emitir token JWT | `pages/login/`, `auth.service.ts` |
| BOLT-AUTH-001 | PROC-APO-018 | Verificar rol en ruta protegida | Sistema | Service Task | Aplicar authGuard y roleGuard según ROLES | `core/guards/` |
| BOLT-NET-001 | PROC-MIS-006 | Consultar KPIs del turno | Operador SOC | User Task | Mostrar dispositivos online, alertas, VLANs, ISO | `pages/vision-general/` |
| BOLT-NET-002 | PROC-MIS-007 | Filtrar inventario de dispositivos | Operador SOC | User Task | Listar hosts por VLAN, estado y conectividad | `pages/dispositivos/` |
| BOLT-NET-003 | PROC-MIS-008 | Visualizar topología L3 | Operador SOC | User Task | Renderizar nodos, enlaces y gateways HSRP | `pages/topologia/` |
| BOLT-VLAN-001 | PROC-MIS-009 | Administrar VLANs activas | Operador SOC | User Task | CRUD consulta segmentos y matriz inter-VLAN | `pages/vlans/` |
| BOLT-VLAN-002 | PROC-MIS-015 | Aislar host en cuarentena | Operador SOC | User Task | Confirmar movimiento a VLAN 999 con ACL DENY | `pages/vlan-cuarentena/` |
| BOLT-POL-001 | PROC-MIS-010 | Definir política de seguridad | Admin | User Task | Crear regla origen/destino, severidad, acción | `pages/politicas/` |
| BOLT-POL-001 | PROC-MIS-011 | Evaluar tráfico contra reglas | Sistema | Service Task | Matching mock y generación de alerta | `security-policy.service.ts` |
| BOLT-ALT-001 | PROC-MIS-012 | Revisar alerta en centro IDS | Analista SOC | User Task | Clasificar, reconocer o escalar alerta | `pages/alertas/` |
| BOLT-ALT-001 | PROC-MIS-013 | Clasificar severidad de incidente | Analista SOC | User Task | Asignar crítica/alta/media/baja y SLA | `pages/alertas/`, modelos threat |
| BOLT-ALT-001 | PROC-MIS-014 | Ejecutar contención inicial | Operador SOC | User Task | Bloqueo temporal, logging reforzado | `notification-center.service.ts` |
| BOLT-AUD-001 | PROC-APO-021 | Registrar evento en audit trail | Sistema | Service Task | Append-only de acciones críticas | `audit-trail.service.ts` |
| BOLT-AUD-002 | PROC-APO-022 | Consultar timeline de auditoría | Analista | User Task | Filtrar logs auth, red, seguridad | `pages/auditoria/` |
| BOLT-REP-001 | PROC-APO-023 | Exportar reporte de cumplimiento | Analista | User Task | Generar CSV/JSON/PDF con campos ISO | `pages/reportes/`, `backend/src/` |
| BOLT-CFG-001 | PROC-EST-001 | Configurar parámetros globales | Admin | User Task | Umbrales, retención, toggle IA SOC | `pages/configuracion/` |
| BOLT-IA-001 | PROC-APO-025 | Solicitar asistencia IA SOC | Analista | User Task | Panel flotante: resumen alertas y sugerencias | `soc-ai.service.ts`, soc-ai-assistant |
| BOLT-SIM-001 | PROC-APO-026 | Lanzar escenario de ataque lab | Analista | User Task | Port scan, brute force contra detección mock | `pages/simulacion-ataques/` |
| BOLT-ISO-001 | PROC-MIS-006 | Calcular KPIs ISO 27001/25000 | Sistema | Service Task | Agregar riesgos, controles, confianza | `iso-compliance.service.ts` |
| BOLT-BE-001 | PROC-APO-023 | Persistir reporte en MongoDB | Sistema | Service Task | POST/GET `/api/reports` y generación PDF | `backend/src/routes/report.routes.ts` |
| BOLT-DEV-001 | PROC-APO-028 | Ejecutar pipeline CI | Sistema | Service Task | Tests Vitest en GitHub Actions | `.github/workflows/ci.yml` |
| BOLT-DEV-002 | PROC-APO-030 | Desplegar frontend en contenedor | DevOps | Service Task | Build Angular + nginx | `frontend/Dockerfile` |
