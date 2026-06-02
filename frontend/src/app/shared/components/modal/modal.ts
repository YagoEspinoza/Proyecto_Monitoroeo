import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (abierto) {
      <div class="modal-backdrop" (click)="onBackdrop()" @fade>
        <div class="modal-dialog" [class.modal-lg]="size === 'lg'" (click)="$event.stopPropagation()">
          <header class="modal-header">
            <h2>{{ titulo }}</h2>
            <button type="button" class="modal-close" (click)="cerrar.emit()" aria-label="Cerrar">×</button>
          </header>
          <div class="modal-content">
            <ng-content></ng-content>
          </div>
          @if (mostrarFooter) {
            <footer class="modal-footer">
              <ng-content select="[footer]"></ng-content>
            </footer>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      z-index: 9000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.2s ease;
    }
    .modal-dialog {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-md);
      animation: fadeIn 0.25s ease;
    }
    .modal-lg { max-width: 640px; }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px;
      border-bottom: 1px solid var(--border-color);
    }
    .modal-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
    }
    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      line-height: 1;
    }
    .modal-close:hover { color: var(--text-primary); }
    .modal-content {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  `]
})
export class ModalComponent {
  @Input() abierto = false;
  @Input() titulo = '';
  @Input() size: 'md' | 'lg' = 'md';
  @Input() mostrarFooter = true;
  @Input() cerrarAlClickFuera = true;
  @Output() cerrar = new EventEmitter<void>();

  onBackdrop(): void {
    if (this.cerrarAlClickFuera) this.cerrar.emit();
  }
}
