import { Injectable, signal } from '@angular/core';
import { ActividadUsuario } from '../models/audit.models';

const STORAGE_KEY = 'ng_user_activity';

@Injectable({ providedIn: 'root' })
export class UserActivityService {
  private readonly _actividades = signal<ActividadUsuario[]>([]);

  readonly actividades = this._actividades.asReadonly();

  constructor() {
    this.cargar();
  }

  registrar(
    tipo: ActividadUsuario['tipo'],
    descripcion: string,
    ruta?: string
  ): void {
    const entry: ActividadUsuario = {
      id: `ACT-${Date.now()}`,
      timestamp: new Date(),
      tipo,
      descripcion,
      ruta
    };
    this._actividades.update(list => [entry, ...list].slice(0, 200));
    this.persistir();
  }

  registrarNavegacion(ruta: string, titulo: string): void {
    this.registrar('navegacion', `Visitó ${titulo}`, ruta);
  }

  historialUsuario(): ActividadUsuario[] {
    return this._actividades();
  }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ActividadUsuario[];
      this._actividades.set(
        parsed.map(a => ({ ...a, timestamp: new Date(a.timestamp) }))
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private persistir(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._actividades()));
  }
}
