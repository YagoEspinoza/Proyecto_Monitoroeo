# Avance Fase 1 — Seguridad y acceso

**Última actualización:** 2026-05-24  
**Semáforo:** 🟢 Avanzado

---

## Estado general

Autenticación mock, guards y roles implementados en Angular. Interceptor preparado para JWT del backend futuro. Pendiente endurecimiento cuando exista API real.

**Progreso estimado:** 85%

---

## Cambios realizados

- `auth.service` con login/logout y persistencia de sesión
- Guards: `authGuard`, `noAuthGuard`, `roleGuard`
- `token-interceptor` para cabecera Bearer
- Constantes `ROLES`, `PERMISOS_POR_ROL`, `ETIQUETAS_ROL`
- Páginas `login`, `recuperar-password`
- Tests en `auth.service.spec.ts`, `auth-guard.spec.ts`

---

## Módulos afectados

| Dominio | Componentes |
|---------|---------------|
| Auth | auth.service, guards, interceptor |
| Users | perfil (lectura de rol) |

---

## Pruebas realizadas

| Prueba | Resultado |
|--------|-----------|
| Login admin/operador/analista | OK manual |
| Acceso `/configuracion` solo admin | OK |
| `npm run test:ci` (auth) | Parcial — ampliar specs |

---

## Pendientes

- [ ] Refresh token con backend Node
- [ ] httpOnly cookies en producción
- [ ] MFA (futuro, fuera de alcance académico)

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Sesión solo en localStorage | Migrar a cookies httpOnly |
| Roles solo en cliente | Validar RBAC en API futura |

---

## Próximos pasos

1. Cerrar cobertura tests guards (Fase 7)
2. Iniciar Fase 2 si dashboard requiere auth estable
3. Documentar usuarios demo en manual de desarrollo
