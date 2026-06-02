import { Injectable, inject, signal } from '@angular/core';
import { UxPreferencesService } from './ux-preferences.service';

export type ToastTipo =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'threat'
  | 'config';

export interface Toast {
  id: string;
  tipo: ToastTipo;
  titulo: string;
  mensaje?: string;
  duracion?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly ux = inject(UxPreferencesService);

  readonly toasts = signal<Toast[]>([]);

  show(tipo: ToastTipo, titulo: string, mensaje?: string, duracion = 4500): void {
    if (!this.debeMostrar(tipo)) return;

    const toast: Toast = {
      id: `t-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      tipo,
      titulo,
      mensaje,
      duracion
    };
    this.toasts.update(list => [...list, toast].slice(-6));
    this.reproducirSonido(tipo);
    setTimeout(() => this.dismiss(toast.id), duracion);
  }

  success(titulo: string, mensaje?: string): void {
    this.show('success', titulo, mensaje);
  }

  error(titulo: string, mensaje?: string): void {
    this.show('error', titulo, mensaje, 6000);
  }

  warning(titulo: string, mensaje?: string): void {
    this.show('warning', titulo, mensaje, 5500);
  }

  info(titulo: string, mensaje?: string): void {
    this.show('info', titulo, mensaje);
  }

  threat(titulo: string, mensaje?: string): void {
    this.show('threat', titulo, mensaje, 7000);
  }

  config(titulo: string, mensaje?: string): void {
    this.show('config', titulo, mensaje);
  }

  dismiss(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  private debeMostrar(tipo: ToastTipo): boolean {
    return true;
  }

  private reproducirSonido(tipo: ToastTipo): void {
    if (!this.ux.prefs().sonidosAlerta) return;
    if (tipo !== 'threat' && tipo !== 'error' && tipo !== 'warning') return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = tipo === 'threat' ? 880 : 440;
      gain.gain.value = 0.04;
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
      setTimeout(() => void ctx.close(), 200);
    } catch {
      /* sin audio */
    }
  }
}
