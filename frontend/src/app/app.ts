import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { UxPreferencesService } from './core/services/ux-preferences.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class App {
  constructor() {
    inject(ThemeService).inicializar();
    inject(UxPreferencesService).inicializar();
  }
}