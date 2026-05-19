import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoSeguridad } from '../../../core/models/network.models';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="'badge-' + estado">
      <span class="dot"></span>
      {{ etiqueta }}
    </span>
  `,
  styles: [`
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
  `]
})
export class StatusBadgeComponent {
  @Input({ required: true }) estado!: EstadoSeguridad | string;

  get etiqueta(): string {
    const map: Record<string, string> = {
      seguro: 'Seguro',
      alerta: 'Alerta',
      intruso: 'Intruso',
      aislado: 'Aislado',
      activo: 'Activo',
      degradado: 'Degradado',
      inactivo: 'Inactivo',
      operativa: 'Operativa',
      degradada: 'Degradada',
      incidente: 'Incidente',
      cuarentena: 'Cuarentena'
    };
    return map[this.estado] ?? this.estado;
  }
}
