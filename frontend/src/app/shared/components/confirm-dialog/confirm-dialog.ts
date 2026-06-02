import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (confirm.visible()) {
      <div class="confirm-backdrop" (click)="confirm.cancelar()" role="presentation">
        <div class="confirm-box" role="alertdialog" aria-modal="true" (click)="$event.stopPropagation()">
          <h3>{{ confirm.opciones()?.titulo }}</h3>
          <p>{{ confirm.opciones()?.mensaje }}</p>
          <div class="confirm-actions">
            <button type="button" class="btn btn-outline" (click)="confirm.cancelar()">
              {{ confirm.opciones()?.cancelarTexto }}
            </button>
            <button
              type="button"
              class="btn"
              [class.btn-danger]="confirm.opciones()?.peligro"
              [class.btn-primary]="!confirm.opciones()?.peligro"
              (click)="confirm.aceptar()">
              {{ confirm.opciones()?.confirmarTexto }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10001;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    .confirm-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px;
      max-width: 420px;
      width: 100%;
      box-shadow: var(--shadow-md);
      animation: scaleIn 0.25s ease;
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .confirm-box h3 { margin: 0 0 10px; font-size: 1.05rem; }
    .confirm-box p { margin: 0 0 20px; color: var(--text-secondary); font-size: 0.88rem; }
    .confirm-actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class ConfirmDialogComponent {
  readonly confirm = inject(ConfirmDialogService);
}
