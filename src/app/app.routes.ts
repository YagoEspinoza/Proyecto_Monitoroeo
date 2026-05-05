import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { VisionGeneral } from './vision-general/vision-general';
import { Topologia } from './topologia/topologia';
import { Politicas } from './politicas/politicas';
import { Auditoria } from './auditoria/auditoria';
import { Configuracion } from './configuracion/configuracion';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'vision-general', pathMatch: 'full' },
      { path: 'vision-general', component: VisionGeneral },
      { path: 'topologia', component: Topologia },
      { path: 'politicas', component: Politicas },
      { path: 'auditoria', component: Auditoria },
      { path: 'configuracion', component: Configuracion }
    ]
  },
  { path: '**', redirectTo: '/login' }
];