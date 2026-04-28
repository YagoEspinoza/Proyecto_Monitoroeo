import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) // <-- ESTO ES VITAL PARA QUE FUNCIONE EL ROUTER-OUTLET
  ]
};