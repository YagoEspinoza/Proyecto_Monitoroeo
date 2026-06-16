# ARTEFACTOS — Archivos y rutas del repositorio

| ID_ARTEFACTO | TIPO_ARTEFACTO | ID_BOLT | NOMBRE | RUTA_URL | VERSION | OBSERVACION |
|--------------|----------------|---------|--------|----------|---------|-------------|
| ART-SRC-001 | SRC | BOLT-AUTH-001 | LoginComponent | frontend/src/app/pages/login/login.component.ts | 1.0.0 | UI autenticación |
| ART-SRC-002 | SRC | BOLT-AUTH-001 | AuthService | frontend/src/app/core/services/auth.service.ts | 1.0.0 | JWT mock |
| ART-SRC-003 | SRC | BOLT-AUTH-001 | authGuard | frontend/src/app/core/guards/auth-guard.ts | 1.0.0 | Protección rutas |
| ART-SRC-004 | SRC | BOLT-AUTH-001 | roleGuard | frontend/src/app/core/guards/role.guard.ts | 1.0.0 | RBAC |
| ART-SRC-005 | SRC | BOLT-AUTH-001 | app.routes | frontend/src/app/app.routes.ts | 1.0.0 | Definición rutas lazy-load |
| ART-SRC-010 | SRC | BOLT-NET-001 | VisionGeneralComponent | frontend/src/app/pages/vision-general/ | 1.0.0 | Dashboard SOC |
| ART-SRC-011 | SRC | BOLT-NET-002 | DispositivosComponent | frontend/src/app/pages/dispositivos/ | 1.0.0 | Inventario hosts |
| ART-SRC-012 | SRC | BOLT-NET-003 | TopologiaComponent | frontend/src/app/pages/topologia/ | 1.0.0 | Mapa red L3 |
| ART-SRC-013 | SRC | BOLT-NET-001 | MockNetworkService | frontend/src/app/core/services/mock-network.service.ts | 1.0.0 | Datos red simulados |
| ART-SRC-020 | SRC | BOLT-VLAN-001 | VlansComponent | frontend/src/app/pages/vlans/ | 1.0.0 | VLANs activas |
| ART-SRC-021 | SRC | BOLT-VLAN-002 | VlanCuarentenaComponent | frontend/src/app/pages/vlan-cuarentena/ | 1.0.0 | Aislamiento VLAN 999 |
| ART-SRC-030 | SRC | BOLT-POL-001 | PoliticasComponent | frontend/src/app/pages/politicas/ | 1.0.0 | CRUD políticas |
| ART-SRC-031 | SRC | BOLT-POL-001 | SecurityPolicyService | frontend/src/app/core/services/security-policy.service.ts | 1.0.0 | Motor reglas mock |
| ART-SRC-032 | SRC | BOLT-POL-001 | policy.models | frontend/src/app/core/models/policy.models.ts | 1.0.0 | Modelos dominio |
| ART-SRC-040 | SRC | BOLT-ALT-001 | AlertasComponent | frontend/src/app/pages/alertas/ | 1.0.0 | Centro alertas |
| ART-SRC-041 | SRC | BOLT-ALT-001 | NotificationCenterService | frontend/src/app/core/services/notification-center.service.ts | 1.0.0 | Notificaciones barra |
| ART-SRC-050 | SRC | BOLT-AUD-001 | AuditTrailService | frontend/src/app/core/services/audit-trail.service.ts | 1.0.0 | Registro append-only |
| ART-SRC-051 | SRC | BOLT-AUD-002 | AuditoriaComponent | frontend/src/app/pages/auditoria/ | 1.0.0 | Timeline auditoría |
| ART-SRC-060 | SRC | BOLT-REP-001 | ReportesComponent | frontend/src/app/pages/reportes/ | 1.1.0 | Exportación incidentes |
| ART-SRC-061 | SRC | BOLT-REP-001 | ReportService (FE) | frontend/src/app/core/services/report.service.ts | 1.1.0 | Cliente HTTP reportes |
| ART-SRC-062 | SRC | BOLT-BE-001 | report.routes | backend/src/routes/report.routes.ts | 1.0.0 | API REST |
| ART-SRC-063 | SRC | BOLT-BE-001 | report.service (BE) | backend/src/services/report.service.ts | 1.0.0 | Lógica negocio |
| ART-SRC-064 | SRC | BOLT-BE-001 | pdf-generator | backend/src/utils/pdf-generator.ts | 1.1.0 | PDF cumplimiento ISO |
| ART-SRC-070 | SRC | BOLT-IA-001 | SocAiService | frontend/src/app/core/services/soc-ai.service.ts | 0.6.0 | Asistente mock |
| ART-SRC-071 | SRC | BOLT-SIM-001 | SimulacionAtaquesComponent | frontend/src/app/pages/simulacion-ataques/ | 1.0.0 | Laboratorio IDS |
| ART-SRC-080 | SRC | BOLT-ISO-001 | IsoComplianceService | frontend/src/app/core/services/iso-compliance.service.ts | 1.0.0 | KPIs ISO |
| ART-SRC-081 | SRC | BOLT-ISO-001 | iso.constants | frontend/src/app/core/constants/iso.constants.ts | 1.0.0 | Matriz tesis |
| ART-SRC-082 | SRC | BOLT-ISO-001 | iso.models | frontend/src/app/core/models/iso.models.ts | 1.0.0 | Tipos ISO/riesgo |
| ART-SRC-090 | SRC | BOLT-CFG-001 | ConfiguracionComponent | frontend/src/app/pages/configuracion/ | 1.0.0 | Solo admin |
| ART-CFG-001 | CFG | BOLT-DEV-001 | ci.yml | .github/workflows/ci.yml | 1.0.0 | Pipeline Vitest |
| ART-CFG-002 | CFG | BOLT-DEV-002 | Dockerfile | frontend/Dockerfile | 0.7.0 | Contenedor nginx |
| ART-CFG-003 | CFG | BOLT-DEV-002 | nginx.conf | frontend/nginx.conf | 0.7.0 | Proxy estático |
| ART-DOC-001 | DOC | BOLT-DOC-001 | README gobierno_ia | documentacion/gobierno_ia/README.md | 1.0.0 | Esta plantilla |
| ART-DOC-002 | DOC | BOLT-ISO-001 | mapeo_dimensiones | documentacion/matriz-operacionalizacion/mapeo_dimensiones_variables.md | 1.0.0 | Tesis ↔ código |
| ART-DOC-003 | DOC | BOLT-IA-001 | reglas ia | documentacion/reglas/ia.md | 1.0.0 | Dominio SOC_AI_Assistant |
| ART-TEST-001 | TEST | BOLT-AUTH-001 | auth-guard.spec | frontend/src/app/core/guards/auth-guard.spec.ts | 1.0.0 | Vitest |
| ART-TEST-002 | TEST | BOLT-NET-001 | mock-network.service.spec | frontend/src/app/core/services/mock-network.service.spec.ts | 1.0.0 | Vitest |
