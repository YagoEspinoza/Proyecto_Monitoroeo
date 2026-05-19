import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RolUsuario } from '../constants/roles.constants';
import { APP_ROUTES } from '../constants/routes.constants';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

/** Guard de roles — usar en `data: { roles: ['admin'] }` */
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const notif = inject(NotificationService);

  const rolesPermitidos = (route.data?.['roles'] as RolUsuario[] | undefined) ?? [];

  if (!rolesPermitidos.length || auth.tieneRol(...rolesPermitidos)) {
    return true;
  }

  notif.warning('Acceso denegado', 'No tienes permisos para esta sección.');
  return router.createUrlTree([`/${APP_ROUTES.VISION_GENERAL}`]);
};
