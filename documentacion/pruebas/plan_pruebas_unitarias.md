# Plan de pruebas unitarias — NetGuard SOC / MyMonitoreo

**Versión:** 1.0  
**Fecha:** 2026-06-29  
**Sistema:** Plataforma de monitoreo de red, segmentación VLAN, detección de amenazas y operaciones SOC/NOC.

---

## 1. Objetivo

Definir el plan integral de **pruebas unitarias** para todo el software del repositorio, garantizando:

- Detección temprana de regresiones en dominios críticos de ciberseguridad.
- Cobertura medible y trazable por dominio DDD.
- Alineación con CI (GitHub Actions), SonarQube y estándares del proyecto.

---

## 2. Alcance

### 2.1 Incluido

| Capa | Tecnología | Ubicación |
|------|------------|-----------|
| Presentación | Angular 21 + Vitest | `frontend/src/app/` |
| API REST | Node.js + Express + Mongoose | `backend/src/` |
| Utilidades puras | TypeScript | `core/utils/`, `shared/utils/`, `backend/src/utils/` |

### 2.2 Excluido (otros tipos de prueba)

| Tipo | Motivo |
|------|--------|
| E2E (Playwright/Cypress) | Plan futuro; no son unitarias |
| Integración GNS3 / VMware | Laboratorio externo; prohibido en unit tests |
| Pruebas de carga / stress | Fuera del alcance unitario |
| Despliegue Docker / nginx | Validación operativa, no unitaria |

---

## 3. Estrategia general

### 3.1 Pirámide de pruebas (enfoque actual)

```
        ┌─────────┐
        │  E2E    │  ← Futuro (smoke: login → dashboard)
       ┌┴─────────┴┐
       │ Integración│  ← Futuro (API + MongoDB en memoria)
      ┌┴────────────┴┐
      │  Unitarias   │  ← Este plan (prioridad alta)
      └──────────────┘
```

### 3.2 Herramientas

| Componente | Herramienta | Comando |
|------------|-------------|---------|
| Frontend | Vitest + Angular TestBed | `npm run test` / `npm run test:ci` |
| Frontend cobertura | `@vitest/coverage-v8` | Genera `frontend/coverage/lcov.info` |
| Calidad estática | SonarQube | `sonar-project.properties` |
| CI | GitHub Actions | `.github/workflows/ci.yml` |
| Backend | **Pendiente:** Vitest o Jest | Recomendado en Fase 7+ |

### 3.3 Convenciones

- Archivos `*.spec.ts` junto al código fuente.
- Nombres descriptivos en español: `debería aislar host cuando operador confirma`.
- Mocks **solo** en tests; nunca en código de producción.
- Sin dependencia de red real, GNS3 ni WebSocket productivo.
- Sin `fit` / `fdescribe` en commits.
- Timers: usar `fakeAsync` / `tick` o `vi.useFakeTimers()` para evitar tests flaky.

### 3.4 Umbrales de cobertura

| Área | Objetivo mínimo |
|------|-----------------|
| `core/guards`, `core/services/auth*` | ≥ 80% |
| Servicios cuarentena y políticas | ≥ 70% |
| Resto de `core/services` | ≥ 60% |
| Páginas (`pages/`) | Smoke: componente se crea sin error |
| Componentes compartidos críticos | ≥ 50% |
| Backend `services/`, `utils/` | ≥ 70% (al configurar runner) |
| Backend controladores | Smoke con supertest (integración ligera) |

---

## 4. Estado actual vs planificado

### 4.1 Frontend — specs existentes

| Archivo | Estado |
|---------|--------|
| `app.spec.ts` | ✅ Implementado |
| `core/services/auth.service.spec.ts` | ✅ Implementado |
| `core/guards/auth-guard.spec.ts` | ✅ Implementado |
| `core/guards/no-auth-guard.spec.ts` | ✅ Implementado |
| `core/interceptors/token-interceptor.spec.ts` | ✅ Implementado |
| `core/services/mock-network.service.spec.ts` | ✅ Implementado |
| `layouts/main-layout/main-layout.component.spec.ts` | ✅ Implementado |
| `pages/login/login.component.spec.ts` | ✅ Implementado |
| `shared/components/status-badge/status-badge.spec.ts` | ✅ Implementado |

### 4.2 Frontend — pendientes (este plan)

Todos los módulos listados en las secciones 5–8 sin archivo `*.spec.ts` correspondiente.

### 4.3 Backend

Sin runner de pruebas configurado en `package.json`. El plan define casos; la implementación requiere añadir Vitest/Jest y `supertest`.

---

## 5. Frontend — Dominios DDD

### 5.1 Auth (Autenticación y acceso)

**Archivos:** `auth.service.ts`, `auth.ts`, `auth-guard.ts`, `no-auth-guard.ts`, `role.guard.ts`, `token-interceptor.ts`, `pages/login/`, `pages/recuperar-password/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| AUTH-01 | Login exitoso con credenciales admin válidas | Alta | `auth.service.spec.ts` ✅ |
| AUTH-02 | Rechazo de credenciales inválidas | Alta | `auth.service.spec.ts` ✅ |
| AUTH-03 | `estaAutenticado()` false tras logout | Alta | `auth.service.spec.ts` |
| AUTH-04 | Persistencia de sesión en `sessionStorage` | Media | `auth.service.spec.ts` |
| AUTH-05 | `tieneRol()` con uno o varios roles | Alta | `auth.service.spec.ts` |
| AUTH-06 | `puedeAislar()` true para admin/operador, false para analista | Alta | `auth.service.spec.ts` ✅ |
| AUTH-07 | `puede('config')` solo admin | Alta | `auth.service.spec.ts` |
| AUTH-08 | `authGuard` redirige a login si no autenticado | Alta | `auth-guard.spec.ts` ✅ |
| AUTH-09 | `authGuard` permite acceso si autenticado | Alta | `auth-guard.spec.ts` ✅ |
| AUTH-10 | `noAuthGuard` redirige a dashboard si ya autenticado | Alta | `no-auth-guard.spec.ts` ✅ |
| AUTH-11 | `roleGuard` permite acceso con rol en `data.roles` | Alta | `role.guard.spec.ts` |
| AUTH-12 | `roleGuard` deniega y redirige a visión general | Alta | `role.guard.spec.ts` |
| AUTH-13 | `roleGuard` muestra notificación de acceso denegado | Media | `role.guard.spec.ts` |
| AUTH-14 | `token-interceptor` adjunta header Authorization si hay token | Alta | `token-interceptor.spec.ts` ✅ |
| AUTH-15 | `token-interceptor` en 401 ejecuta logout y redirección | Alta | `token-interceptor.spec.ts` ✅ |
| AUTH-16 | LoginComponent: formulario inválido no envía | Media | `login.component.spec.ts` ✅ |
| AUTH-17 | RecuperarPasswordComponent: smoke de creación | Baja | `recuperar-password.component.spec.ts` |

---

### 5.2 Users (Usuarios y perfil)

**Archivos:** `user-profile.service.ts`, `user-activity.service.ts`, `system-config.service.ts`, `pages/perfil/`, `pages/configuracion/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| USR-01 | `UserProfileService` carga perfil del usuario autenticado | Media | `user-profile.service.spec.ts` |
| USR-02 | Actualización de nombre/avatar persiste cambios | Media | `user-profile.service.spec.ts` |
| USR-03 | `UserActivityService` registra última actividad | Baja | `user-activity.service.spec.ts` |
| USR-04 | `SystemConfigService` lee/escribe configuración en storage | Media | `system-config.service.spec.ts` |
| USR-05 | ConfiguracionComponent: solo admin puede acceder (vía guard en rutas) | Alta | `configuracion.component.spec.ts` |
| USR-06 | PerfilComponent: smoke de creación con usuario mock | Baja | `perfil.component.spec.ts` |

---

### 5.3 NetworkMonitoring (Monitoreo de red)

**Archivos:** `mock-network.service.ts`, `network-api.service.ts`, `soc-event.service.ts`, `soc-integration.service.ts`, `pages/vision-general/`, `pages/dispositivos/`, `pages/topologia/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| NET-01 | `MockNetworkService` retorna lista de dispositivos | Alta | `mock-network.service.spec.ts` ✅ |
| NET-02 | Filtro por estado (online/offline/cuarentena) | Alta | `mock-network.service.spec.ts` |
| NET-03 | KPIs calculados (totales, porcentajes) son coherentes | Media | `mock-network.service.spec.ts` |
| NET-04 | `aislarDispositivo()` mueve host a VLAN cuarentena | **Crítica** | `mock-network.service.spec.ts` |
| NET-05 | `liberarDispositivo()` restaura VLAN original | **Crítica** | `mock-network.service.spec.ts` |
| NET-06 | `aislarDispositivo()` rechaza si usuario sin permiso | Alta | `mock-network.service.spec.ts` |
| NET-07 | Emisión de eventos SOC al aislar/liberar | Media | `mock-network.service.spec.ts` |
| NET-08 | `NetworkApiService` mapea DTO a modelo de dominio | Media | `network-api.service.spec.ts` |
| NET-09 | `SocEventService` emite y suscriptores reciben payload | Media | `soc-event.service.spec.ts` |
| NET-10 | `SocIntegrationService` correlaciona alerta con dispositivo | Media | `soc-integration.service.spec.ts` |
| NET-11 | `network-display.utils` formatea IP, MAC, estado | Baja | `network-display.utils.spec.ts` |
| NET-12 | VisionGeneralComponent: smoke + KPIs renderizados | Media | `vision-general.component.spec.ts` |
| NET-13 | DispositivosComponent: filtro por texto funciona | Media | `dispositivos.component.spec.ts` |
| NET-14 | TopologiaComponent: smoke de creación | Baja | `topologia.component.spec.ts` |

---

### 5.4 VLANManagement (Gestión de VLANs)

**Archivos:** `mock-network.service.ts` (VLANs), `pages/vlans/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| VLAN-01 | Listado de VLANs con id, nombre y estado | Alta | `mock-network.service.spec.ts` |
| VLAN-02 | VLAN de cuarentena identificada correctamente | Alta | `mock-network.service.spec.ts` |
| VLAN-03 | Conteo de hosts por VLAN es correcto | Media | `mock-network.service.spec.ts` |
| VLAN-04 | VlansComponent: smoke de creación | Baja | `vlans.component.spec.ts` |
| VLAN-05 | VlansComponent: muestra estado activa/inactiva | Media | `vlans.component.spec.ts` |

---

### 5.5 SecurityPolicies (Políticas de seguridad)

**Archivos:** `security-policy.service.ts`, `policy.models.ts`, `policy-display.utils.ts`, `pages/politicas/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| POL-01 | `crear()` genera id único y persiste en localStorage | Alta | `security-policy.service.spec.ts` |
| POL-02 | `actualizar()` modifica campos parciales | Alta | `security-policy.service.spec.ts` |
| POL-03 | `eliminar()` remueve política y emite evento | Alta | `security-policy.service.spec.ts` |
| POL-04 | `toggleActiva()` cambia estado activa/deshabilitada | Alta | `security-policy.service.spec.ts` |
| POL-05 | Computed `activas` filtra solo políticas activas | Media | `security-policy.service.spec.ts` |
| POL-06 | Computed `criticas` lista políticas en estado crítica | Media | `security-policy.service.spec.ts` |
| POL-07 | `evaluarRegla()` con condiciones mock dispara impacto | **Crítica** | `security-policy.service.spec.ts` |
| POL-08 | Evaluación no expone datos sensibles en impactos | Alta | `security-policy.service.spec.ts` |
| POL-09 | `policy-display.utils` formatea tipo y severidad | Baja | `policy-display.utils.spec.ts` |
| POL-10 | PoliticasComponent: smoke de creación | Baja | `politicas.component.spec.ts` |

---

### 5.6 ThreatDetection (Detección de amenazas)

**Archivos:** `attack-simulation.service.ts`, `attack.models.ts`, `alerta.model.ts`, `pages/alertas/`, `pages/simulacion-ataques/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| THR-01 | Alertas ordenadas por severidad (crítica → baja) | **Crítica** | `mock-network.service.spec.ts` o servicio alertas |
| THR-02 | Filtro por severidad y estado funciona | Alta | `alertas.component.spec.ts` |
| THR-03 | `AttackSimulationService` lista escenarios disponibles | Media | `attack-simulation.service.spec.ts` |
| THR-04 | `iniciarSimulacion()` emite alertas mock | Alta | `attack-simulation.service.spec.ts` |
| THR-05 | `detenerSimulacion()` limpia estado activo | Media | `attack-simulation.service.spec.ts` |
| THR-06 | SimulacionAtaquesComponent: requiere rol (guard) | Media | `simulacion-ataques.component.spec.ts` |
| THR-07 | AlertasComponent: smoke de creación | Baja | `alertas.component.spec.ts` |

---

### 5.7 IncidentResponse (Respuesta a incidentes)

**Archivos:** `soc-integration.service.ts`, `notification.service.ts`, `confirm-dialog.service.ts`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| IR-01 | Notificación de incidente con severidad correcta | Media | `notification.service.spec.ts` |
| IR-02 | `ConfirmDialogService` resuelve true/false según usuario | Media | `confirm-dialog.service.spec.ts` |
| IR-03 | Flujo: alerta → confirmación → aislamiento (mock) | Alta | `soc-integration.service.spec.ts` |
| IR-04 | `error-message.util` traduce códigos de error | Baja | `error-message.util.spec.ts` |

---

### 5.8 Quarantine (Cuarentena / aislamiento)

**Archivos:** `mock-network.service.ts`, `pages/vlan-cuarentena/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| QTN-01 | Listar hosts en VLAN cuarentena | **Crítica** | `mock-network.service.spec.ts` |
| QTN-02 | Aislar host: cambia estado a `cuarentena` | **Crítica** | `mock-network.service.spec.ts` |
| QTN-03 | Liberar host: restaura VLAN y estado `online` | **Crítica** | `mock-network.service.spec.ts` |
| QTN-04 | Doble aislamiento del mismo host es idempotente o rechazado | Media | `mock-network.service.spec.ts` |
| QTN-05 | Auditoría de acción isolate/release registrada | Alta | `audit-trail.service.spec.ts` |
| QTN-06 | VlanCuarentenaComponent: smoke de creación | Baja | `vlan-cuarentena.component.spec.ts` |
| QTN-07 | VlanCuarentenaComponent: botón liberar llama al servicio | Alta | `vlan-cuarentena.component.spec.ts` |

---

### 5.9 AuditLogs (Auditoría y trazabilidad)

**Archivos:** `audit-trail.service.ts`, `export.service.ts`, `report.service.ts` (frontend), `pages/auditoria/`, `pages/reportes/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| AUD-01 | `AuditTrailService.append()` agrega evento con timestamp | Alta | `audit-trail.service.spec.ts` |
| AUD-02 | Eventos ordenados por fecha descendente | Media | `audit-trail.service.spec.ts` |
| AUD-03 | Filtro por tipo de acción (login, isolate, policy) | Media | `audit-trail.service.spec.ts` |
| AUD-04 | `ExportService` genera CSV/JSON con cabeceras | Alta | `export.service.spec.ts` |
| AUD-05 | Export no incluye campos internos sensibles | Alta | `export.service.spec.ts` |
| AUD-06 | `ReportService` (frontend) prepara datos para export | Media | `report.service.spec.ts` |
| AUD-07 | AuditoriaComponent: smoke de creación | Baja | `auditoria.component.spec.ts` |
| AUD-08 | ReportesComponent: smoke de creación | Baja | `reportes.component.spec.ts` |

---

### 5.10 SOC_AI_Assistant (Asistente IA SOC)

**Archivos:** `soc-ai.service.ts`, `shared/components/soc-ai-assistant/`

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| AI-01 | `consultar()` retorna respuesta para pregunta válida | Alta | `soc-ai.service.spec.ts` |
| AI-02 | Respuesta no filtra tokens/contraseñas del contexto | **Crítica** | `soc-ai.service.spec.ts` |
| AI-03 | Pregunta vacía retorna mensaje de error amigable | Media | `soc-ai.service.spec.ts` |
| AI-04 | Historial de conversación se limita a N mensajes | Baja | `soc-ai.service.spec.ts` |
| AI-05 | `sugerenciasParaAlerta()` genera acciones recomendadas | Media | `soc-ai.service.spec.ts` |
| AI-06 | SocAiAssistantComponent: smoke de creación | Baja | `soc-ai-assistant.spec.ts` |

---

## 6. Frontend — Infraestructura transversal

### 6.1 Layouts y enrutamiento

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| TRX-01 | `app.routes` redirige `**` a login | Media | `app.routes.spec.ts` |
| TRX-02 | MainLayoutComponent: smoke de creación | Baja | `main-layout.component.spec.ts` ✅ |
| TRX-03 | MainLayoutComponent: menú según rol del usuario | Media | `main-layout.component.spec.ts` |

### 6.2 Servicios UX y soporte

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| UX-01 | `ThemeService` alterna tema claro/oscuro | Baja | `theme.service.spec.ts` |
| UX-02 | `NotificationService` encola toast con tipo | Media | `notification.service.spec.ts` |
| UX-03 | `NotificationCenterService` marca leídas | Baja | `notification-center.service.spec.ts` |
| UX-04 | `HelpService` retorna contenido por clave | Baja | `help.service.spec.ts` |
| UX-05 | `OnboardingService` avanza pasos del tour | Baja | `onboarding.service.spec.ts` |
| UX-06 | `GlobalSearchService` busca en índice mock | Media | `global-search.service.spec.ts` |
| UX-07 | `DashboardLayoutService` persiste layout widgets | Baja | `dashboard-layout.service.spec.ts` |
| UX-08 | `UxPreferencesService` guarda preferencias | Baja | `ux-preferences.service.spec.ts` |
| UX-09 | `IsoComplianceService` calcula métricas ISO mock | Media | `iso-compliance.service.spec.ts` |
| UX-10 | `SocketService` no conecta en unit test (mock io) | Media | `socket.spec.ts` |

### 6.3 Componentes compartidos

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| CMP-01 | `StatusBadge` muestra clase según severidad | Media | `status-badge.spec.ts` ✅ |
| CMP-02 | `ConfirmDialog` emite confirm/cancel | Media | `confirm-dialog.spec.ts` |
| CMP-03 | `Modal` abre/cierra con @Input | Baja | `modal.spec.ts` |
| CMP-04 | `KpiCard` renderiza valor y etiqueta | Baja | `kpi-card.spec.ts` |
| CMP-05 | `EmptyState` muestra mensaje por defecto | Baja | `empty-state.spec.ts` |
| CMP-06 | `Loader` visible según flag | Baja | `loader.spec.ts` |
| CMP-07 | `ChartWidget` smoke sin Chart.js real | Baja | `chart-widget.spec.ts` |
| CMP-08 | `GlobalSearch` emite selección | Media | `global-search.spec.ts` |
| CMP-09 | `NotificationCenter` lista notificaciones | Baja | `notification-center.spec.ts` |
| CMP-10 | `UserPanel` muestra nombre de usuario | Baja | `user-panel.spec.ts` |
| CMP-11 | `HelpPanel` toggle visibilidad | Baja | `help-panel.spec.ts` |
| CMP-12 | `OnboardingTour` smoke de creación | Baja | `onboarding-tour.spec.ts` |
| CMP-13 | `ToastContainer` renderiza cola | Baja | `toast-container.spec.ts` |
| CMP-14 | `PageShell` proyecta contenido | Baja | `page-shell.spec.ts` |
| CMP-15 | `Skeleton` smoke de creación | Baja | `skeleton.spec.ts` |

### 6.4 Pipes y directivas

| ID | Caso de prueba | Prioridad | Archivo spec objetivo |
|----|----------------|-----------|----------------------|
| PD-01 | `SanitizeDisplayPipe` escapa HTML peligroso | **Crítica** | `sanitize-display.pipe.spec.ts` |
| PD-02 | `TooltipDirective` muestra texto al hover | Baja | `tooltip.directive.spec.ts` |

---

## 7. Backend — API de reportes

### 7.1 Configuración previa recomendada

```json
// backend/package.json (futuro)
"scripts": {
  "test": "vitest run",
  "test:ci": "vitest run --coverage"
}
```

Dependencias sugeridas: `vitest`, `supertest`, `@types/supertest`, `mongodb-memory-server`.

### 7.2 `services/report.service.ts`

| ID | Caso de prueba | Prioridad |
|----|----------------|-----------|
| BE-R01 | `validateCreateInput` rechaza título vacío | Alta |
| BE-R02 | `validateCreateInput` rechaza type/severity inválidos | Alta |
| BE-R03 | `validateCreateInput` valida impacto 1–5 | Media |
| BE-R04 | `buildFilterQuery` construye rango de fechas | Alta |
| BE-R05 | `buildFilterQuery` rechaza fecha inválida | Alta |
| BE-R06 | `listReports` retorna ordenado por `createdAt` desc | Media |
| BE-R07 | `getReportById` lanza 404 si no existe | Alta |
| BE-R08 | `createReport` asigna status OPEN por defecto | Media |
| BE-R09 | `updateReport` lanza 404 si no existe | Alta |
| BE-R10 | `deleteReport` lanza 404 si no existe | Alta |
| BE-R11 | `getIso27001Summary` calcula porcentaje cumplimiento | Media |
| BE-R12 | `getIso25000Summary` agrupa dimensiones | Media |
| BE-R13 | `getComplianceSummary` combina ISO 27001 y 25000 | Media |

### 7.3 `controllers/report.controller.ts`

| ID | Caso de prueba | Prioridad |
|----|----------------|-----------|
| BE-C01 | `GET /api/reports` retorna 200 y array | Alta |
| BE-C02 | `GET /api/reports/:id` retorna 404 si no existe | Alta |
| BE-C03 | `POST /api/reports` retorna 201 con body válido | Alta |
| BE-C04 | `POST /api/reports` retorna 400 con body inválido | Alta |
| BE-C05 | `PUT /api/reports/:id` actualiza parcialmente | Media |
| BE-C06 | `DELETE /api/reports/:id` retorna 204 | Media |
| BE-C07 | `GET /api/reports/:id/pdf` retorna PDF con content-type | Media |
| BE-C08 | Query filters (`from`, `to`, `severity`) se aplican | Media |

### 7.4 `middlewares/error.middleware.ts`

| ID | Caso de prueba | Prioridad |
|----|----------------|-----------|
| BE-M01 | `AppError` serializa status y mensaje | Alta |
| BE-M02 | `notFoundHandler` retorna 404 JSON | Alta |
| BE-M03 | `errorHandler` oculta stack en producción | Alta |

### 7.5 `utils/pdf-generator.ts`

| ID | Caso de prueba | Prioridad |
|----|----------------|-----------|
| BE-P01 | `generateReportPdf` retorna Buffer no vacío | Media |
| BE-P02 | PDF incluye título y severidad del reporte | Media |

### 7.6 `app.ts` y `config/database.ts`

| ID | Caso de prueba | Prioridad |
|----|----------------|-----------|
| BE-A01 | `GET /health` retorna status ok | Alta |
| BE-A02 | `GET /health` indica database connected/disconnected | Media |
| BE-A03 | CORS permite origen configurado | Baja |
| BE-A04 | `isDatabaseConnected()` refleja estado mongoose | Media |

---

## 8. Matriz de priorización global

### 8.1 Prioridad crítica (implementar primero)

1. Cuarentena: aislar / liberar host (`NET-04`, `NET-05`, `QTN-01` a `QTN-03`)
2. Políticas: evaluación de reglas (`POL-07`, `POL-08`)
3. Alertas: orden por severidad (`THR-01`)
4. Auth: `roleGuard` (`AUTH-11`, `AUTH-12`)
5. SOC AI: no filtrar datos sensibles (`AI-02`)
6. Sanitización HTML (`PD-01`)
7. Backend: validación de entrada (`BE-R01` a `BE-R05`)

### 8.2 Prioridad alta (segunda oleada)

- Resto de casos Auth, Audit export, Attack simulation
- Controladores backend con supertest
- Componentes de cuarentena y alertas

### 8.3 Prioridad media/baja (tercera oleada)

- Smoke tests de páginas y componentes compartidos
- Servicios UX, tema, onboarding
- Utilidades de display

---

## 9. Datos de prueba (fixtures)

### 9.1 Usuarios mock

| Rol | Correo | Password |
|-----|--------|----------|
| admin | admin@netguard.com | Admin1234 |
| operador | operador@netguard.com | Oper1234 |
| analista | analista@netguard.com | Anal1234 |

### 9.2 Dispositivo mock

```typescript
const dispositivoMock = {
  id: 'dev-001',
  nombre: 'WS-LAB-01',
  ip: '192.168.10.50',
  mac: '00:1A:2B:3C:4D:5E',
  vlanId: 10,
  estado: 'online' as const
};
```

### 9.3 Política mock

```typescript
const politicaMock = {
  nombre: 'Bloqueo SMB externo',
  tipo: 'firewall' as const,
  activa: true,
  estado: 'activa' as const,
  severidad: 'alta' as const,
  condiciones: [{ campo: 'puerto', operador: 'eq', valor: '445' }],
  acciones: ['alertar' as const]
};
```

### 9.4 Reporte backend mock

```typescript
const reporteMock = {
  title: 'Intento de escaneo',
  description: 'Puertos altos desde IP externa',
  type: 'INTRUSION',
  severity: 'HIGH',
  createdBy: 'operador@netguard.com'
};
```

---

## 10. Pruebas prohibidas

Conforme a [testing.md](../reglas/testing.md):

- Depender de **GNS3 real** o VMware en unit tests.
- Tests con orden aleatorio de alertas sin semilla fija.
- Snapshots frágiles de HTML completo de páginas.
- Llamadas HTTP reales a APIs externas o LLM.
- Tests que muten `localStorage`/`sessionStorage` sin limpiar en `beforeEach`.

---

## 11. Integración con CI y SonarQube

### 11.1 Pipeline esperado

```yaml
# Resumen lógico — ver .github/workflows/ci.yml
1. checkout
2. npm ci (frontend)
3. npm run lint:check
4. npm run test:ci
5. (futuro) sonar-scanner con coverage/lcov.info
6. (futuro) npm run test:ci (backend)
```

### 11.2 Criterios de aceptación para merge

- [ ] `npm run test:ci` pasa en frontend
- [ ] `npm run lint:check` pasa
- [ ] Cobertura ≥ umbrales de sección 3.4 en dominios críticos
- [ ] Sin bugs críticos nuevos en SonarQube
- [ ] Sin `fit`/`fdescribe` olvidados

---

## 12. Cronograma sugerido

| Sprint | Entregable | Casos aprox. |
|--------|------------|--------------|
| 1 | Auth completo + roleGuard + sanitize pipe | ~20 |
| 2 | Cuarentena + mock-network (aislar/liberar) | ~15 |
| 3 | Security policies + alertas severidad | ~15 |
| 4 | Audit + export + SOC AI | ~15 |
| 5 | Smoke páginas + componentes compartidos | ~25 |
| 6 | Backend Vitest + report service/controller | ~25 |

**Total planificado:** ~115 casos unitarios.

---

## 13. Trazabilidad dominio → código

| Dominio DDD | Servicios principales | Páginas |
|-------------|----------------------|---------|
| Auth | `auth.service`, guards, `token-interceptor` | login, recuperar-password |
| Users | `user-profile`, `system-config` | perfil, configuracion |
| NetworkMonitoring | `mock-network`, `network-api`, `soc-event` | vision-general, dispositivos, topologia |
| VLANManagement | `mock-network` | vlans |
| SecurityPolicies | `security-policy` | politicas |
| ThreatDetection | `attack-simulation`, alertas en mock-network | alertas, simulacion-ataques |
| IncidentResponse | `soc-integration`, `notification`, `confirm-dialog` | (transversal) |
| Quarantine | `mock-network` | vlan-cuarentena |
| AuditLogs | `audit-trail`, `export`, `report` | auditoria, reportes |
| SOC_AI_Assistant | `soc-ai` | soc-ai-assistant (shared) |

---

## 14. Registro de ejecución

| Fecha | Ejecutor | `test:ci` frontend | Cobertura global | Notas |
|-------|----------|-------------------|------------------|-------|
| 2026-06-29 | — | Pendiente verificar | — | Plan documentado |
| | | | | |

---

## 15. Referencias

- [Arquitectura del sistema](../arquitectura.md)
- [Reglas de testing](../reglas/testing.md)
- [Fase 7 — Testing y QA](../instrucciones/fase_7_testing_qa_sonarqube_cursor.md)
- [OpenAPI backend](../implementacion/openapi-angular-backend-node.yaml)
- [Integración SonarQube](../implementacion/integracion_sonarqube.md)

---

*Documento vivo: actualizar al cerrar cada sprint de pruebas y al añadir nuevos módulos al sistema.*
