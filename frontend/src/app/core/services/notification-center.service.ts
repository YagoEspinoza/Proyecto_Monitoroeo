import { Injectable, computed, inject, signal } from '@angular/core';
import {
  CategoriaNotificacion,
  NotificacionCentro,
  PrioridadNotificacion
} from '../models/notification-center.models';
import { UxPreferencesService } from './ux-preferences.service';

const STORAGE_KEY = 'ng_notifications';

@Injectable({ providedIn: 'root' })
export class NotificationCenterService {
  private readonly ux = inject(UxPreferencesService);
  private readonly _notificaciones = signal<NotificacionCentro[]>([]);

  readonly abierto = signal(false);
  readonly notificaciones = this._notificaciones.asReadonly();

  readonly noLeidas = computed(() => this._notificaciones().filter(n => !n.leida).length);

  readonly agrupadas = computed(() => {
    const map = new Map<string, NotificacionCentro[]>();
    for (const n of this._notificaciones()) {
      const key = n.agrupacion ?? n.categoria;
      const list = map.get(key) ?? [];
      list.push(n);
      map.set(key, list);
    }
    return map;
  });

  constructor() {
    this.cargar();
    if (this._notificaciones().length === 0) {
      this.seedIniciales();
    }
  }

  toggle(): void {
    this.abierto.update(v => !v);
  }

  cerrar(): void {
    this.abierto.set(false);
  }

  push(
    titulo: string,
    mensaje: string,
    categoria: CategoriaNotificacion,
    prioridad: PrioridadNotificacion,
    opts?: { agrupacion?: string; enlace?: string }
  ): void {
    const n: NotificacionCentro = {
      id: `NTF-${Date.now()}`,
      titulo,
      mensaje,
      categoria,
      prioridad,
      timestamp: new Date(),
      leida: false,
      agrupacion: opts?.agrupacion,
      enlace: opts?.enlace
    };
    this._notificaciones.update(list => [n, ...list].slice(0, 100));
    this.persistir();
    if (prioridad === 'critica' && this.ux.prefs().sonidosAlerta) {
      this.reproducirSonido();
    }
  }

  marcarLeida(id: string): void {
    this._notificaciones.update(list =>
      list.map(n => (n.id === id ? { ...n, leida: true } : n))
    );
    this.persistir();
  }

  marcarTodasLeidas(): void {
    this._notificaciones.update(list => list.map(n => ({ ...n, leida: true })));
    this.persistir();
  }

  filtrar(categoria?: CategoriaNotificacion, soloNoLeidas = false): NotificacionCentro[] {
    return this._notificaciones().filter(n => {
      if (categoria && n.categoria !== categoria) return false;
      if (soloNoLeidas && n.leida) return false;
      return true;
    });
  }

  limpiarLeidas(): void {
    this._notificaciones.update(list => list.filter(n => !n.leida));
    this.persistir();
  }

  private reproducirSonido(): void {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.value = 0.05;
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      /* navegador sin audio */
    }
  }

  private seedIniciales(): void {
    this.push(
      'IDS activo',
      'Motor de detección en modo simulación',
      'sistema',
      'media'
    );
    this.push(
      'Intruso detectado',
      'WS-RRHH-05 — firma SMB sospechosa',
      'seguridad',
      'critica',
      { enlace: '/alertas', agrupacion: 'intrusos' }
    );
    this.push(
      'Tráfico VLAN 40',
      'Uso al 91% en segmento Distribución',
      'red',
      'alta',
      { agrupacion: 'trafico-vlan40' }
    );
    this.persistir();
  }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as NotificacionCentro[];
      this._notificaciones.set(
        parsed.map(n => ({ ...n, timestamp: new Date(n.timestamp) }))
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private persistir(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._notificaciones()));
  }
}
