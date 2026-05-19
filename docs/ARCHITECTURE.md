# NetGuard SOC — Arquitectura Frontend

## Visión general

Aplicación Angular 21 para monitoreo de red, detección de intrusos y aislamiento VLAN (cuarentena). El frontend opera en **modo simulación** con datos mock y `localStorage`, preparado para integrar backend Node.js, GNS3, VMware y WebSockets.

## Estructura de carpetas

```
src/app/
├── core/
│   ├── constants/        # Rutas, roles, permisos, ayuda
│   ├── guards/           # auth, no-auth, role
│   ├── interceptors/     # JWT (futuro API)
│   ├── models/           # Dominio + audit, notificaciones, ataques, búsqueda
│   ├── services/         # Auth, red mock, IA, export, onboarding, etc.
│   └── utils/
├── layouts/main-layout/  # Shell SOC global
├── pages/                # Vistas lazy-loaded
└── shared/
    ├── components/       # IA, búsqueda, notificaciones, charts, tour
    ├── directives/
    └── utils/
```

## Módulos premium implementados

| Módulo | Servicios / componentes |
|--------|-------------------------|
| Usuarios y seguridad | `AuthService`, `UserProfileService`, `AuditTrailService`, `UserActivityService`, página Perfil, recuperar contraseña |
| Cyber AI Assistant | `SocAiService`, `SocAiAssistantComponent` |
| Mapa de red | `TopologiaComponent` (SVG live, tráfico animado) |
| Tiempo real | `MockNetworkService` (timers), `SocEventService`, notificaciones live |
| Notificaciones | `NotificationCenterService`, `NotificationCenterComponent` |
| Dashboard premium | `DashboardLayoutService`, `ChartWidgetComponent`, widgets personalizables |
| Simulación de ataques | `AttackSimulationService`, página Laboratorio |
| Búsqueda global | `GlobalSearchService`, Ctrl+K |
| Exportación | `ExportService`, página Reportes (CSV/Excel/PDF mock) |
| Onboarding | `OnboardingService`, `OnboardingTourComponent` |
| UX | `ThemeService`, `UxPreferencesService`, tooltips, skeletons, FABs |

## Roles y permisos

| Rol | Lectura | Escritura | Aislar | Config | Simular |
|-----|---------|-----------|--------|--------|---------|
| admin | ✓ | ✓ | ✓ | ✓ | ✓ |
| operador | ✓ | ✓ | ✓ | ✗ | ✓ |
| analista | ✓ | ✗ | ✗ | ✗ | ✓ |

Credenciales demo: `admin@netguard.com` / `Admin1234`, `operador@netguard.com` / `Oper1234`, `analista@netguard.com` / `Anal1234`.

## Integración futura

- `NetworkApiService` + `environment.apiUrl` + `tokenInterceptor`
- `SocketService` (socket.io-client ya instalado)
- Reemplazar mocks manteniendo interfaces en `core/models/`

## DevOps

- `Dockerfile` + `nginx.conf` para despliegue estático
- `.github/workflows/ci.yml` — build, lint, tests
- `sonar-project.properties` — SonarQube

## Comandos

```bash
npm start
npm run build
npm test
npm run test:ci
```
