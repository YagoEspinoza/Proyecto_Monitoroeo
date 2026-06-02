import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { roleGuard } from './core/guards/role.guard';
import { ROLES } from './core/constants/roles.constants';
import { APP_ROUTES } from './core/constants/routes.constants';

export const routes: Routes = [
  {
    path: APP_ROUTES.LOGIN,
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [noAuthGuard]
  },
  {
    path: APP_ROUTES.RECUPERAR,
    loadComponent: () =>
      import('./pages/recuperar-password/recuperar-password.component').then(
        m => m.RecuperarPasswordComponent
      ),
    canActivate: [noAuthGuard]
  },
  {
    path: APP_ROUTES.DASHBOARD,
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: APP_ROUTES.VISION_GENERAL, pathMatch: 'full' },
      {
        path: APP_ROUTES.VISION_GENERAL,
        loadComponent: () =>
          import('./pages/vision-general/vision-general.component').then(m => m.VisionGeneralComponent)
      },
      {
        path: APP_ROUTES.DISPOSITIVOS,
        loadComponent: () =>
          import('./pages/dispositivos/dispositivos.component').then(m => m.DispositivosComponent)
      },
      {
        path: APP_ROUTES.ALERTAS,
        loadComponent: () =>
          import('./pages/alertas/alertas.component').then(m => m.AlertasComponent)
      },
      {
        path: APP_ROUTES.VLANS,
        loadComponent: () =>
          import('./pages/vlans/vlans.component').then(m => m.VlansComponent)
      },
      {
        path: APP_ROUTES.VLAN_CUARENTENA,
        loadComponent: () =>
          import('./pages/vlan-cuarentena/vlan-cuarentena.component').then(
            m => m.VlanCuarentenaComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [ROLES.ADMIN, ROLES.OPERADOR, ROLES.ANALISTA] }
      },
      {
        path: APP_ROUTES.TOPOLOGIA,
        loadComponent: () =>
          import('./pages/topologia/topologia.component').then(m => m.TopologiaComponent)
      },
      {
        path: APP_ROUTES.SIMULACION,
        loadComponent: () =>
          import('./pages/simulacion-ataques/simulacion-ataques.component').then(
            m => m.SimulacionAtaquesComponent
          ),
        canActivate: [roleGuard],
        data: { roles: [ROLES.ADMIN, ROLES.OPERADOR, ROLES.ANALISTA] }
      },
      {
        path: APP_ROUTES.AUDITORIA,
        loadComponent: () =>
          import('./pages/auditoria/auditoria.component').then(m => m.AuditoriaComponent)
      },
      {
        path: APP_ROUTES.POLITICAS,
        loadComponent: () =>
          import('./pages/politicas/politicas.component').then(m => m.PoliticasComponent),
        canActivate: [roleGuard],
        data: { roles: [ROLES.ADMIN, ROLES.OPERADOR] }
      },
      {
        path: APP_ROUTES.CONFIGURACION,
        loadComponent: () =>
          import('./pages/configuracion/configuracion.component').then(m => m.ConfiguracionComponent),
        canActivate: [roleGuard],
        data: { roles: [ROLES.ADMIN] }
      },
      {
        path: APP_ROUTES.PERFIL,
        loadComponent: () =>
          import('./pages/perfil/perfil.component').then(m => m.PerfilComponent)
      },
      {
        path: APP_ROUTES.REPORTES,
        loadComponent: () =>
          import('./pages/reportes/reportes.component').then(m => m.ReportesComponent)
      }
    ]
  },
  { path: '**', redirectTo: `/${APP_ROUTES.LOGIN}` }
];
