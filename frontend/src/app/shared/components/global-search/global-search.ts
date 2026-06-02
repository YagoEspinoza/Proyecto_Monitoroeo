import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalSearchService } from '../../../core/services/global-search.service';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (search.abierto()) {
      <div class="gs-backdrop" (click)="search.cerrar()"></div>
      <div class="gs-modal" role="dialog" aria-label="Búsqueda global">
        <div class="gs-input-wrap">
          <span class="gs-icon">⌕</span>
          <input
            type="search"
            class="gs-input"
            [ngModel]="search.query()"
            (ngModelChange)="search.query.set($event)"
            placeholder="Buscar dispositivos, VLANs, alertas, logs..."
            autofocus />
          <kbd class="gs-kbd">ESC</kbd>
        </div>
        <div class="gs-results">
          @if (search.resultados().length === 0) {
            <p class="gs-empty">Sin resultados</p>
          }
          @for (r of search.resultados(); track r.id) {
            <button type="button" class="gs-item" (click)="ir(r.ruta)">
              <span class="gs-item-icon">{{ r.icono }}</span>
              <div class="gs-item-body">
                <strong>{{ r.titulo }}</strong>
                <span>{{ r.subtitulo }}</span>
              </div>
              <span class="gs-type">{{ r.tipo }}</span>
            </button>
          }
        </div>
        <footer class="gs-footer mono">Ctrl+K · NetGuard SOC</footer>
      </div>
    }
  `,
  styles: [`
    .gs-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 11000; backdrop-filter: blur(4px); }
    .gs-modal {
      position: fixed; top: 12%; left: 50%; transform: translateX(-50%);
      width: min(560px, 92vw); background: var(--bg-surface);
      border: 1px solid var(--border-glow); border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md); z-index: 11001;
      animation: fadeIn 0.2s ease;
    }
    .gs-input-wrap { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--border-color); }
    .gs-icon { color: var(--color-brand); font-size: 1.2rem; }
    .gs-input { flex: 1; border: none; background: transparent; color: var(--text-primary); font-size: 1rem; outline: none; }
    .gs-kbd { font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; background: var(--bg-elevated); color: var(--text-muted); }
    .gs-results { max-height: 360px; overflow-y: auto; padding: 8px; }
    .gs-item {
      display: flex; align-items: center; gap: 12px; width: 100%;
      padding: 10px 12px; border: none; border-radius: var(--radius-sm);
      background: transparent; color: inherit; cursor: pointer; text-align: left;
      transition: var(--transition);
    }
    .gs-item:hover { background: var(--bg-hover); }
    .gs-item-body { flex: 1; display: flex; flex-direction: column; }
    .gs-item-body span { font-size: 0.75rem; color: var(--text-muted); }
    .gs-type { font-size: 0.65rem; text-transform: uppercase; color: var(--color-brand); }
    .gs-empty { padding: 24px; text-align: center; color: var(--text-muted); }
    .gs-footer { padding: 8px 16px; font-size: 0.68rem; color: var(--text-muted); border-top: 1px solid var(--border-color); }
  `]
})
export class GlobalSearchComponent {
  readonly search = inject(GlobalSearchService);
  private readonly router = inject(Router);

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      this.search.toggle();
    }
    if (e.key === 'Escape' && this.search.abierto()) {
      this.search.cerrar();
    }
  }

  ir(ruta: string): void {
    this.search.cerrar();
    void this.router.navigateByUrl(ruta);
  }
}
