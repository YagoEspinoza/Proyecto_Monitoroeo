import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { APP_ROUTES } from '../constants/routes.constants';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.estaAutenticado()) return true;
  return router.createUrlTree([`/${APP_ROUTES.LOGIN}`]);
};
