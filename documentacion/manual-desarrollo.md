# Manual de desarrollo — NetGuard SOC

Guía para desarrolladores que trabajan en el frontend Angular y preparan la integración con el backend Node.js futuro.

---

## Requisitos

| Herramienta | Versión recomendada |
|-------------|---------------------|
| Node.js | 20.x o 22.x |
| npm | 11.x (ver `packageManager` en package.json) |
| Angular CLI | 21.x (incluido en devDependencies) |
| Git | Última estable |
| Editor | VS Code / Cursor con extensiones Angular |

Opcional: Docker, SonarQube Scanner, GNS3 (laboratorio de red).

---

## Instalación

```bash
git clone <url-del-repositorio>
cd my-monitoreo
npm install
```

---

## Ejecutar en desarrollo

```bash
npm start
# equivalente: ng serve
```

Abrir: `http://localhost:4200/`

### Build de producción

```bash
npm run build
```

Artefactos en `dist/my-monitoreo/browser/`.

### Pruebas

```bash
npm test
npm run test:ci    # CI con cobertura
npm run lint:check # verificación de build
```

---

## Estructura del proyecto Angular

```
src/
├── app/
│   ├── core/                 # Lógica transversal
│   │   ├── constants/        # Rutas, roles, ayuda
│   │   ├── guards/           # auth, role, no-auth
│   │   ├── interceptors/     # token-interceptor
│   │   ├── models/           # DTOs y dominios
│   │   └── services/         # Auth, red, alertas, IA...
│   ├── layouts/
│   │   └── main-layout/      # Shell SOC
│   ├── pages/                # Una carpeta por feature/ruta
│   └── shared/               # Componentes UI reutilizables
├── environments/
│   └── environment.ts        # apiUrl, wsUrl (futuro)
└── styles.css                # Estilos globales
```

---

## Dominios y servicios (mapa rápido)

| Dominio | Servicios / páginas |
|---------|---------------------|
| Auth | `auth.service`, `login`, guards |
| Users | `user-profile.service`, `perfil` |
| NetworkMonitoring | `mock-network.service`, `network-api.service`, `dispositivos`, `topologia` |
| VLANManagement | `vlans` |
| SecurityPolicies | `security-policy.service`, `politicas` |
| ThreatDetection | `alertas`, `attack-simulation.service` |
| Quarantine | `vlan-cuarentena` |
| AuditLogs | `audit-trail.service`, `auditoria` |
| SOC_AI_Assistant | `soc-ai.service`, `soc-ai-assistant` |

---

## Variables de entorno

Archivo: `src/environments/environment.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'http://tu-servidor.com/api',  // Futuro backend
  wsUrl: 'http://tu-servidor.com'         // Futuro WebSocket
};
```

Para desarrollo local con API futura, crear `environment.development.ts` y configurar en `angular.json`.

---

## Comandos útiles

| Comando | Uso |
|---------|-----|
| `ng generate component pages/nueva --standalone` | Nuevo módulo de página |
| `ng generate service core/services/nombre` | Nuevo servicio |
| `ng test --include='**/auth*.spec.ts'` | Tests filtrados |
| `npm run build -- --configuration production` | Build optimizado |

---

## Convenciones de código

Seguir obligatoriamente: [reglas/](./reglas/)

Resumen:

- Componentes **standalone** con lazy loading en rutas
- Servicios con `providedIn: 'root'` salvo excepción
- Modelos tipados en `core/models/`
- Rutas centralizadas en `APP_ROUTES`
- Textos de UI en español
- No acoplar componentes a datos mock; usar `network-api.service` como fachada

---

## Flujo de trabajo con Git

1. Rama por feature: `feature/fase-3-vlans-cuarentena`
2. Commits descriptivos en español o inglés técnico consistente
3. Actualizar `documentacion/avances/` al cerrar tareas de fase
4. PR con checklist de pruebas mínimas de la fase

---

## Integración backend (futuro)

1. Implementar endpoints según [implementacion/openapi-angular-backend-node.yaml](./implementacion/openapi-angular-backend-node.yaml)
2. Sustituir llamadas en `mock-network.service` por `network-api.service`
3. Activar `token-interceptor` con JWT real
4. Conectar `socket.ts` a `environment.wsUrl`

---

## Documentación relacionada

- [arquitectura.md](./arquitectura.md)
- [instrucciones/](./instrucciones/) — tareas por fase para Cursor
- [implementacion/conexion_angular_backend_node.md](./implementacion/conexion_angular_backend_node.md)
