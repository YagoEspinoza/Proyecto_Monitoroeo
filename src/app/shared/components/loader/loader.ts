import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
  <div class="loader-wrap" [class.inline]="inline" role="status" aria-label="Cargando">
    <div class="spinner"></div>
    @if (mensaje) {
      <span class="loader-msg">{{ mensaje }}</span>
    }
  </div>
  `,
  styles: [`
    .loader-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      padding: 48px 24px;
    }
    .loader-wrap.inline {
      flex-direction: row;
      padding: 16px;
    }
    .spinner {
      width: 36px;
      height: 36px;
      border: 3px solid var(--border-color);
      border-top-color: var(--color-brand);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    .loader-msg {
      font-size: 0.82rem;
      color: var(--text-secondary);
      font-family: var(--font-mono);
    }
  `]
})
export class LoaderComponent {
  @Input() mensaje = 'Cargando datos...';
  @Input() inline = false;
}
