import { Injectable, signal } from '@angular/core';
import { LogSistema } from '../models/network.models';

@Injectable({ providedIn: 'root' })
export class SocEventService {
  private readonly _eventos = signal<LogSistema[]>([]);
  readonly eventos = this._eventos.asReadonly();

  emit(nivel: LogSistema['nivel'], modulo: string, mensaje: string): LogSistema {
    const entry: LogSistema = {
      id: `EVT-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date(),
      nivel,
      modulo,
      mensaje
    };
    this._eventos.update(list => [entry, ...list].slice(0, 300));
    return entry;
  }

  cargarIniciales(logs: LogSistema[]): void {
    this._eventos.set(logs);
  }

  limpiar(): void {
    this._eventos.set([]);
  }
}
