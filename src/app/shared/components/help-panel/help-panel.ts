import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpService } from '../../../core/services/help.service';
import { HELP_GENERAL } from '../../../core/constants/help-content.constants';

@Component({
  selector: 'app-help-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (help.abierto()) {
      <div class="help-backdrop" (click)="help.cerrar()"></div>
      <aside class="help-drawer" role="dialog" aria-label="Panel de ayuda">
        <header class="help-header">
          <h2>Ayuda SOC</h2>
          <button type="button" class="btn btn-icon btn-outline" (click)="help.cerrar()" aria-label="Cerrar">×</button>
        </header>

        <nav class="help-tabs">
          <button type="button" [class.active]="help.tabActiva() === 'guia'" (click)="help.tabActiva.set('guia')">Guía</button>
          <button type="button" [class.active]="help.tabActiva() === 'faq'" (click)="help.tabActiva.set('faq')">FAQ</button>
          <button type="button" [class.active]="help.tabActiva() === 'soporte'" (click)="help.tabActiva.set('soporte')">Soporte</button>
        </nav>

        <div class="help-body">
          @switch (help.tabActiva()) {
            @case ('guia') {
              <span class="ctx-badge mono">Pantalla: {{ help.contenidoContextual().titulo }}</span>
              <h3>{{ help.contenidoContextual().titulo }}</h3>
              <p>{{ help.contenidoContextual().resumen }}</p>
              <h4>Tips</h4>
              <ul>
                @for (tip of help.contenidoContextual().tips; track tip) {
                  <li>{{ tip }}</li>
                }
              </ul>
              <hr />
              <h4>Módulos del sistema</h4>
              <ul class="mod-list">
                <li><strong>Dashboard</strong> — KPIs y estado global</li>
                <li><strong>Alertas</strong> — Detección IDS</li>
                <li><strong>Políticas</strong> — Reglas de seguridad</li>
                <li><strong>Auditoría</strong> — Logs en tiempo real</li>
              </ul>
            }
            @case ('faq') {
              @for (f of help.faq; track f.pregunta) {
                <details class="faq-item">
                  <summary>{{ f.pregunta }}</summary>
                  <p>{{ f.respuesta }}</p>
                </details>
              }
            }
            @case ('soporte') {
              <p>{{ general.resumen }}</p>
              <button type="button" class="btn btn-primary w-100" (click)="help.simularTicket()">
                Simular ticket de soporte
              </button>
              <p class="help-note">Respuesta simulada en 24h · sin backend</p>
            }
          }
        </div>
      </aside>
    }
  `,
  styles: [`
    .help-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 9990;
    }
    .help-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: min(400px, 100vw);
      height: 100vh;
      background: var(--bg-surface);
      border-left: 1px solid var(--border-color);
      z-index: 9991;
      display: flex;
      flex-direction: column;
      animation: slideDrawer 0.3s ease;
      box-shadow: -8px 0 32px rgba(0,0,0,0.35);
    }
    @keyframes slideDrawer {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .help-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 18px;
      border-bottom: 1px solid var(--border-color);
    }
    .help-header h2 { margin: 0; font-size: 1rem; }
    .help-tabs {
      display: flex;
      border-bottom: 1px solid var(--border-color);
    }
    .help-tabs button {
      flex: 1;
      padding: 10px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
    }
    .help-tabs button.active {
      color: var(--color-brand);
      border-bottom: 2px solid var(--color-brand);
    }
    .help-body {
      flex: 1;
      overflow-y: auto;
      padding: 18px;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }
    .help-body h3, .help-body h4 { color: var(--text-primary); margin: 12px 0 8px; }
    .ctx-badge {
      display: inline-block;
      font-size: 0.68rem;
      padding: 3px 8px;
      border-radius: 4px;
      background: var(--bg-elevated);
      margin-bottom: 10px;
    }
    .faq-item {
      margin-bottom: 8px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      padding: 8px 12px;
    }
    .faq-item summary { cursor: pointer; color: var(--text-primary); font-weight: 500; }
    .help-note { font-size: 0.75rem; margin-top: 12px; color: var(--text-muted); }
    .w-100 { width: 100%; }
    .mod-list { padding-left: 18px; }
  `]
})
export class HelpPanelComponent {
  readonly help = inject(HelpService);
  readonly general = HELP_GENERAL;
}
