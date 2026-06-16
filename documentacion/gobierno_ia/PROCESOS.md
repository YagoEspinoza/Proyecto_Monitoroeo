# PROCESOS — Catálogo de procesos

Procesos del sistema NetGuard SOC clasificados según [clasificacion_procesos.md](../procesos/clasificacion_procesos.md).

| ID_PROCESO | TIPO_PROCESO | NOMBRE_PROCESO | RAMA_GIT | RESPONSABLE | ESTADO | VERSION_ACTUAL | OBSERVACIONES |
|------------|--------------|----------------|----------|-------------|--------|----------------|---------------|
| PROC-EST-001 | Estratégico | Configuración global del sistema | main | Equipo tesis / admin | activo | 1.0.0 | Ruta `/configuracion`; dominio Users |
| PROC-EST-002 | Estratégico | Planificación por fases del proyecto | develop | Equipo tesis | activo | 1.0.0 | Roadmap 8 fases en `documentacion/fases.md` |
| PROC-EST-003 | Estratégico | Planificación y release v1.0.0 | main | Equipo tesis | activo | 0.9.0 | `implementacion/release-plan-v1.0.0.md` |
| PROC-EST-004 | Estratégico | Postmortem y mejora continua | main | Analista SOC | activo | 1.0.0 | Tras incidentes mayores; `incident_response.md` |
| PROC-MIS-005 | Misional | Monitoreo de red e infraestructura | develop | Operador SOC | activo | 1.0.0 | Dominio NetworkMonitoring; mock-network.service |
| PROC-MIS-006 | Misional | Visualización de dashboard SOC (KPIs) | develop | Operador SOC | activo | 1.0.0 | `pages/vision-general/` |
| PROC-MIS-007 | Misional | Inventario y estado de dispositivos | develop | Operador SOC | activo | 1.0.0 | `pages/dispositivos/` |
| PROC-MIS-008 | Misional | Mapa de topología de red | develop | Operador SOC | activo | 1.0.0 | `pages/topologia/` |
| PROC-MIS-009 | Misional | Gestión de VLANs activas | develop | Operador SOC | activo | 1.0.0 | `pages/vlans/`; VLANManagement |
| PROC-MIS-010 | Misional | Gestión de políticas de seguridad | develop | Admin / operador | activo | 1.0.0 | `pages/politicas/` |
| PROC-MIS-011 | Misional | Evaluación de reglas (motor de reglas) | develop | Sistema | activo | 0.8.0 | UI mock; backend futuro |
| PROC-MIS-012 | Misional | Detección y centro de alertas | develop | Analista SOC | activo | 1.0.0 | `pages/alertas/` |
| PROC-MIS-013 | Misional | Clasificación de incidentes | develop | Analista SOC | activo | 0.9.0 | ThreatDetection + IncidentResponse |
| PROC-MIS-014 | Misional | Contención de amenazas | develop | Operador SOC | activo | 0.9.0 | Flujo en `incident_response.md` |
| PROC-MIS-015 | Misional | Aislamiento en VLAN de cuarentena | develop | Operador SOC | activo | 1.0.0 | `pages/vlan-cuarentena/`; Quarantine |
| PROC-MIS-016 | Misional | Recuperación post-incidente | develop | Operador SOC | activo | 0.8.0 | Liberación de cuarentena documentada |
| PROC-APO-017 | Apoyo | Autenticación y sesión | main | Dev frontend | producción | 1.0.0 | Fase 1; auth.service, login |
| PROC-APO-018 | Apoyo | Autorización RBAC por roles | main | Dev frontend | producción | 1.0.0 | role.guard; ROLES admin/operador/analista |
| PROC-APO-019 | Apoyo | Gestión de perfil de usuario | develop | Dev frontend | activo | 1.0.0 | `pages/perfil/` |
| PROC-APO-020 | Apoyo | Recuperación de contraseña | develop | Dev frontend | activo | 1.0.0 | `pages/recuperar-password/` |
| PROC-APO-021 | Apoyo | Registro de auditoría (audit trail) | develop | Sistema | activo | 1.0.0 | audit-trail.service |
| PROC-APO-022 | Apoyo | Consulta de logs y auditoría | develop | Analista | activo | 1.0.0 | `pages/auditoria/` |
| PROC-APO-023 | Apoyo | Exportación de reportes | develop | Analista | activo | 1.0.0 | `pages/reportes/` + API backend |
| PROC-APO-024 | Apoyo | Centro de notificaciones | develop | Sistema | activo | 1.0.0 | notification-center.service |
| PROC-APO-025 | Apoyo | Asistencia inteligente SOC (IA) | develop | Dev + IA | activo | 0.6.0 | soc-ai.service mock; Fase 6 |
| PROC-APO-026 | Apoyo | Simulación de ataques (laboratorio) | develop | Analista | activo | 1.0.0 | `pages/simulacion-ataques/` |
| PROC-APO-027 | Apoyo | Observabilidad de la plataforma | main | DevOps | activo | 0.5.0 | `monitoring.md`; futuro Prometheus |
| PROC-APO-028 | Apoyo | Pruebas unitarias y CI | main | Dev | activo | 1.0.0 | Vitest; `.github/workflows/ci.yml` |
| PROC-APO-029 | Apoyo | Análisis estático SonarQube | main | Dev | activo | 1.0.0 | sonar-project.properties |
| PROC-APO-030 | Apoyo | Despliegue (dev/staging/prod) | main | DevOps | activo | 0.7.0 | Dockerfile frontend; Fase 8 |
| PROC-APO-031 | Apoyo | Backup y restauración de datos | main | DevOps | inactivo | 0.1.0 | Plan futuro; `backup_restore.md` |
| PROC-APO-032 | Apoyo | Rollback de versiones | main | DevOps | activo | 1.0.0 | `rollback.md` |
