import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(err => {
  console.error('Error al iniciar NetGuard SOC:', err);
  const root = document.querySelector('app-root');
  if (root) {
    root.innerHTML =
      '<div style="padding:2rem;font-family:system-ui;color:#ef4444">' +
      '<h1>Error al cargar la aplicación</h1>' +
      '<p>Recarga la página. Si persiste, abre la consola (F12) y revisa el detalle.</p>' +
      '</div>';
  }
});
