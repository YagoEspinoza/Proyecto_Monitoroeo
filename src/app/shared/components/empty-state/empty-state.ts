import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty">
      <div class="empty-icon">{{ icono }}</div>
      <h3>{{ titulo }}</h3>
      <p>{{ descripcion }}</p>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .empty {
      text-align: center;
      padding: 48px 24px;
      color: var(--text-secondary);
    }
    .empty-icon {
      font-size: 2.5rem;
      opacity: 0.4;
      margin-bottom: 12px;
    }
    h3 {
      margin: 0 0 8px;
      color: var(--text-primary);
      font-size: 1rem;
    }
    p {
      margin: 0;
      font-size: 0.85rem;
      max-width: 320px;
      margin-inline: auto;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icono = '∅';
  @Input() titulo = 'Sin datos';
  @Input() descripcion = 'No hay registros para mostrar.';
}
