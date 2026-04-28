import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard'; 
import { VisionGeneral } from './vision-general/vision-general';
import { Topologia } from './topologia/topologia';
// Importamos los nuevos
import { Politicas } from './politicas/politicas';
import { Auditoria } from './auditoria/auditoria';
import { Configuracion } from './configuracion/configuracion';

export const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'vision-general', pathMatch: 'full' }, 
      { path: 'vision-general', component: VisionGeneral },
      { path: 'topologia', component: Topologia },
      { path: 'politicas', component: Politicas },
      { path: 'auditoria', component: Auditoria },
      { path: 'configuracion', component: Configuracion }
    ]
  }
];