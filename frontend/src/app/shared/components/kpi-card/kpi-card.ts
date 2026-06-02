import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [style.border-left]="'3px solid ' + accent">
      <div class="kpi-icon" [style.background]="accent + '22'" [style.color]="accent">
        {{ icono }}
      </div>
      <div>
        <div class="kpi-label">{{ etiqueta }}</div>
        <div class="kpi-value">{{ valor }}@if (sufijo) {<small>{{ sufijo }}</small>}</div>
        @if (subtitulo) {
          <div class="kpi-sub">{{ subtitulo }}</div>
        }
        @if (porcentaje !== undefined) {
          <div class="traffic-bar-bg" style="margin-top: 10px">
            <div class="traffic-bar-fill" [style.width.%]="porcentaje" [style.background]="accent"></div>
          </div>
        }
      </div>
    </div>
  `
})
export class KpiCardComponent {
  @Input({ required: true }) etiqueta!: string;
  @Input({ required: true }) valor!: string | number;
  @Input() sufijo = '';
  @Input() subtitulo = '';
  @Input() icono = '◆';
  @Input() accent = 'var(--color-brand)';
  @Input() porcentaje?: number;
}
