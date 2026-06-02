# Fase 1 — Seguridad y acceso (Cursor)

## Objetivo general

Implementar y consolidar el dominio **Auth** y la base de **Users**: autenticación, guards, roles, interceptor JWT preparado y rutas protegidas del shell SOC.

---

## Contexto obligatorio

- Proyecto: **NetGuard SOC / MyMonitoreo** — Angular 21 SPA
- Backend Node.js: **no existe**; auth actualmente mock/localStorage
- Roles: `admin`, `operador`, `analista` (`ROLES`, `PERMISOS_POR_ROL`)
- Rutas públicas: `login`, `recuperar-password`
- Shell protegido: `main-layout` con `authGuard`

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/core/services/auth.service.ts` | Lógica de login/logout |
| `src/app/core/guards/auth-guard.ts` | Protección dashboard |
| `src/app/core/guards/no-auth-guard.ts` | Evitar login si ya autenticado |
| `src/app/core/guards/role.guard.ts` | RBAC por ruta |
| `src/app/core/interceptors/token-interceptor.ts` | Bearer token futuro |
| `src/app/core/constants/roles.constants.ts` | Roles y permisos |
| `src/app/pages/login/` | UI login |
| `documentacion/reglas/seguridad.md` | Reglas obligatorias |

---

## Reglas que debe respetar Cursor

1. [seguridad.md](../reglas/seguridad.md) — menor privilegio, no loguear tokens
2. [frontend.md](../reglas/frontend.md) — standalone, lazy routes
3. [ddd.md](../reglas/ddd.md) — Auth y Users separados
4. No inventar API REST funcional; dejar interfaces listas
5. Textos UI en español

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| Auth | Refinar `auth.service`, specs |
| Users | `user-profile.service`, página perfil |
| Guards | Cobertura de tests |
| Interceptor | Manejo 401 → logout |

---

## Criterios de aceptación

- [ ] Login redirige a `/vision-general` con credenciales válidas mock
- [ ] Rutas del dashboard bloqueadas sin sesión
- [ ] `roleGuard` bloquea `/configuracion` a no-admin
- [ ] Logout limpia sesión y redirige a login
- [ ] Tests `auth-guard`, `auth.service` en verde
- [ ] Recuperar contraseña accesible sin sesión

---

## Restricciones

- No implementar servidor OAuth real
- No almacenar contraseñas en localStorage
- No duplicar lógica de roles fuera de `roles.constants.ts`

---

## Validaciones

```bash
npm run test:ci -- --include='**/auth*'
npm run lint:check
```

Manual: probar login como admin, operador y analista; verificar menú según rol.

---

## Pruebas mínimas

| Test | Archivo |
|------|---------|
| authGuard permite con sesión | `auth-guard.spec.ts` |
| authGuard bloquea sin sesión | `auth-guard.spec.ts` |
| login exitoso | `auth.service.spec.ts` |
| roleGuard deniega rol incorrecto | crear/ampliar spec |

---

## Resultado esperado

Sistema de acceso coherente con operación SOC: operadores entran al dashboard, permisos limitan configuración y cuarentena según rol. Base lista para JWT del backend futuro.

**Bitácora:** actualizar [avance_fase_1_seguridad_acceso.md](../avances/avance_fase_1_seguridad_acceso.md)
