import { Injectable, signal } from '@angular/core';

export type WidgetId =
  | 'kpis'
  | 'chart-trafico'
  | 'chart-alertas'
  | 'alertas-recientes'
  | 'dispositivos'
  | 'vlans'
  | 'actividad'
  | 'uptime'
  | 'amenazas';

export interface WidgetLayout {
  id: WidgetId;
  visible: boolean;
  orden: number;
  ancho: 'full' | 'half' | 'third';
}

const DEFAULT: WidgetLayout[] = [
  { id: 'kpis', visible: true, orden: 0, ancho: 'full' },
  { id: 'chart-trafico', visible: true, orden: 1, ancho: 'half' },
  { id: 'chart-alertas', visible: true, orden: 2, ancho: 'half' },
  { id: 'amenazas', visible: true, orden: 3, ancho: 'third' },
  { id: 'uptime', visible: true, orden: 4, ancho: 'third' },
  { id: 'alertas-recientes', visible: true, orden: 5, ancho: 'half' },
  { id: 'dispositivos', visible: true, orden: 6, ancho: 'half' },
  { id: 'vlans', visible: true, orden: 7, ancho: 'half' },
  { id: 'actividad', visible: true, orden: 8, ancho: 'half' }
];

const STORAGE_KEY = 'ng_dashboard_layout';

@Injectable({ providedIn: 'root' })
export class DashboardLayoutService {
  private readonly _widgets = signal<WidgetLayout[]>(DEFAULT);
  readonly widgets = this._widgets.asReadonly();
  readonly modoEdicion = signal(false);

  constructor() {
    this.cargar();
  }

  widgetsOrdenados(): WidgetLayout[] {
    return [...this._widgets()]
      .filter(w => w.visible)
      .sort((a, b) => a.orden - b.orden);
  }

  toggleEdicion(): void {
    this.modoEdicion.update(v => !v);
  }

  toggleVisible(id: WidgetId): void {
    this._widgets.update(list =>
      list.map(w => (w.id === id ? { ...w, visible: !w.visible } : w))
    );
    this.persistir();
  }

  mover(id: WidgetId, direccion: -1 | 1): void {
    const list = [...this._widgets()].sort((a, b) => a.orden - b.orden);
    const idx = list.findIndex(w => w.id === id);
    const swap = idx + direccion;
    if (swap < 0 || swap >= list.length) return;
    const tmp = list[idx].orden;
    list[idx] = { ...list[idx], orden: list[swap].orden };
    list[swap] = { ...list[swap], orden: tmp };
    this._widgets.set(list);
    this.persistir();
  }

  reset(): void {
    this._widgets.set([...DEFAULT]);
    this.persistir();
  }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this._widgets.set(JSON.parse(raw));
    } catch {
      /* default */
    }
  }

  private persistir(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._widgets()));
  }
}
