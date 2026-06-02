import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnboardingService } from '../../../core/services/onboarding.service';

@Component({
  selector: 'app-onboarding-tour',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (tour.activo()) {
      <div class="ob-overlay"></div>
      <div class="ob-card">
        <span class="ob-step">Paso {{ tour.pasoActual() + 1 }} / {{ tour.pasos.length }}</span>
        <h3>{{ tour.paso()?.titulo }}</h3>
        <p>{{ tour.paso()?.texto }}</p>
        <div class="ob-actions">
          @if (tour.pasoActual() > 0) {
            <button type="button" class="btn btn-outline btn-sm" (click)="tour.anterior()">Anterior</button>
          }
          <button type="button" class="btn btn-outline btn-sm" (click)="tour.omitir()">Omitir</button>
          <button type="button" class="btn btn-primary btn-sm" (click)="siguiente()">
            {{ tour.esUltimo() ? 'Finalizar' : 'Siguiente' }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .ob-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.65);
      z-index: 12000; backdrop-filter: blur(2px);
    }
    .ob-card {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      width: min(440px, 92vw); padding: 24px;
      background: var(--bg-surface); border: 1px solid var(--border-glow);
      border-radius: var(--radius-lg); z-index: 12001;
      box-shadow: var(--shadow-glow); animation: fadeIn 0.3s ease;
    }
    .ob-step { font-size: 0.7rem; color: var(--color-brand); text-transform: uppercase; }
    .ob-card h3 { margin: 8px 0; }
    .ob-card p { color: var(--text-secondary); font-size: 0.9rem; }
    .ob-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
  `]
})
export class OnboardingTourComponent {
  readonly tour = inject(OnboardingService);
  private readonly router = inject(Router);

  siguiente(): void {
    const ruta = this.tour.paso()?.ruta;
    if (ruta) void this.router.navigateByUrl(ruta);
    this.tour.siguiente();
  }
}
