import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, ToastTipo } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack" aria-live="polite" aria-atomic="true">
      @for (t of notif.toasts(); track t.id) {
        <div
          class="toast toast-{{ t.tipo }}"
          role="alert">
          <span class="toast-icon" aria-hidden="true">{{ icono(t.tipo) }}</span>
          <div class="toast-body">
            <strong>{{ t.titulo }}</strong>
            @if (t.mensaje) {
              <span>{{ t.mensaje }}</span>
            }
          </div>
          <button type="button" class="toast-close" (click)="notif.dismiss(t.id); $event.stopPropagation()" aria-label="Cerrar notificación">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-stack {
      position: fixed;
      top: calc(var(--topbar-height) + 12px);
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: min(400px, calc(100vw - 40px));
      pointer-events: none;
    }
    .toast {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-md);
      animation: toastIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(100%) scale(0.95); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    html.no-animations .toast { animation: none; }
    .toast-success { border-left: 3px solid var(--color-ok); }
    .toast-error { border-left: 3px solid var(--color-alert); }
    .toast-warning { border-left: 3px solid var(--color-warn); }
    .toast-info { border-left: 3px solid var(--color-brand); }
    .toast-threat {
      border-left: 3px solid var(--color-quarantine);
      background: linear-gradient(90deg, rgba(244, 63, 94, 0.08), var(--bg-elevated));
    }
    .toast-config { border-left: 3px solid var(--color-info); }
    .toast-icon { font-size: 1.1rem; flex-shrink: 0; }
    .toast-body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      font-size: 0.82rem;
    }
    .toast-body strong { color: var(--text-primary); }
    .toast-body span { color: var(--text-secondary); font-size: 0.78rem; }
    .toast-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }
    .toast-close:hover { color: var(--text-primary); }
    @media (max-width: 640px) {
      .toast-stack { left: 12px; right: 12px; max-width: none; }
    }
  `]
})
export class ToastContainerComponent {
  readonly notif = inject(NotificationService);

  icono(tipo: ToastTipo): string {
    const m: Record<ToastTipo, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
      threat: '⛔',
      config: '⚙'
    };
    return m[tipo] ?? '•';
  }
}
