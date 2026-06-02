import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CategoriaNotificacion,
  NotificacionCentro
} from '../../../core/models/notification-center.models';
import { NotificationCenterService } from '../../../core/services/notification-center.service';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="nc-wrap">
    <button
      type="button"
      class="nc-trigger btn btn-icon btn-outline"
      (click)="center.toggle()"
      aria-label="Notificaciones">
      🔔
      @if (center.noLeidas() > 0) {
        <span class="nc-badge">{{ center.noLeidas() }}</span>
      }
    </button>

    @if (center.abierto()) {
      <div class="nc-backdrop" (click)="center.cerrar()"></div>
      <div class="nc-panel">
        <header class="nc-header">
          <strong>Centro de notificaciones</strong>
          <div class="nc-actions">
            <button type="button" class="btn btn-sm btn-outline" (click)="center.marcarTodasLeidas()">
              Marcar leídas
            </button>
            <button type="button" class="btn btn-sm btn-outline" (click)="center.cerrar()">✕</button>
          </div>
        </header>

        <div class="nc-filters">
          <button type="button" [class.active]="filtro() === null" (click)="filtro.set(null)">Todas</button>
          @for (c of categorias; track c) {
            <button type="button" [class.active]="filtro() === c" (click)="filtro.set(c)">{{ c }}</button>
          }
          <label class="nc-solo">
            <input type="checkbox" [checked]="soloNoLeidas()" (change)="soloNoLeidas.set($any($event.target).checked)" />
            No leídas
          </label>
        </div>

        <div class="nc-list">
          @for (n of filtradas(); track n.id) {
            <article class="nc-item" [class.leida]="n.leida" [class]="'prio-' + n.prioridad">
              <div class="nc-item-head">
                <span class="nc-cat">{{ n.categoria }}</span>
                <time>{{ n.timestamp | date:'shortTime' }}</time>
              </div>
              <strong>{{ n.titulo }}</strong>
              <p>{{ n.mensaje }}</p>
              <div class="nc-item-foot">
                @if (!n.leida) {
                  <button type="button" class="btn btn-sm btn-outline" (click)="center.marcarLeida(n.id)">
                    Marcar leída
                  </button>
                }
                @if (n.enlace) {
                  <a [routerLink]="n.enlace" class="btn btn-sm btn-primary" (click)="center.cerrar()">Ver</a>
                }
              </div>
            </article>
          } @empty {
            <p class="nc-empty">Sin notificaciones</p>
          }
        </div>
      </div>
    }
  </div>
  `,
  styles: [`
    .nc-wrap { position: relative; }
    .nc-trigger { position: relative; }
    .nc-badge {
      position: absolute; top: -4px; right: -4px;
      min-width: 18px; height: 18px; padding: 0 4px;
      background: var(--color-alert); color: #fff; font-size: 0.65rem;
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
    }
    .nc-backdrop { position: fixed; inset: 0; z-index: 9990; }
    .nc-panel {
      position: absolute; top: calc(100% + 8px); right: 0;
      width: min(380px, 92vw); max-height: 480px;
      background: var(--bg-surface); border: 1px solid var(--border-color);
      border-radius: var(--radius-md); box-shadow: var(--shadow-md);
      z-index: 9991; display: flex; flex-direction: column;
      animation: fadeIn 0.2s ease;
    }
    .nc-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 12px 14px; border-bottom: 1px solid var(--border-color);
    }
    .nc-actions { display: flex; gap: 6px; }
    .nc-filters {
      display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 14px;
      border-bottom: 1px solid var(--border-color);
    }
    .nc-filters button {
      padding: 4px 10px; font-size: 0.7rem; border-radius: 20px;
      border: 1px solid var(--border-color); background: transparent;
      color: var(--text-muted); cursor: pointer; text-transform: capitalize;
    }
    .nc-filters button.active { border-color: var(--color-brand); color: var(--color-brand); }
    .nc-solo { font-size: 0.72rem; display: flex; align-items: center; gap: 4px; margin-left: auto; }
    .nc-list { overflow-y: auto; flex: 1; padding: 8px; }
    .nc-item {
      padding: 10px; margin-bottom: 8px; border-radius: var(--radius-sm);
      background: var(--bg-elevated); border-left: 3px solid var(--color-info);
    }
    .nc-item.leida { opacity: 0.65; }
    .nc-item.prio-critica { border-left-color: var(--color-alert); }
    .nc-item.prio-alta { border-left-color: var(--color-warn); }
    .nc-item-head { display: flex; justify-content: space-between; font-size: 0.68rem; color: var(--text-muted); }
    .nc-item p { margin: 4px 0 8px; font-size: 0.78rem; color: var(--text-secondary); }
    .nc-item-foot { display: flex; gap: 6px; }
    .nc-empty { padding: 24px; text-align: center; color: var(--text-muted); }
  `]
})
export class NotificationCenterComponent {
  readonly center = inject(NotificationCenterService);
  readonly filtro = signal<CategoriaNotificacion | null>(null);
  readonly soloNoLeidas = signal(false);
  readonly categorias: CategoriaNotificacion[] = ['seguridad', 'sistema', 'red', 'usuarios'];

  filtradas(): NotificacionCentro[] {
    return this.center.filtrar(this.filtro() ?? undefined, this.soloNoLeidas());
  }
}
