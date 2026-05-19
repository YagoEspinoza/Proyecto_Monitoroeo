import { Injectable, Injector, computed, inject, signal } from '@angular/core';
import { AccionAuditoria, RegistroAuditoria } from '../models/audit.models';
import { AuthService } from './auth.service';

const STORAGE_KEY = 'ng_audit_trail';

@Injectable({ providedIn: 'root' })
export class AuditTrailService {
  private readonly injector = inject(Injector);
  private readonly _registros = signal<RegistroAuditoria[]>([]);

  readonly registros = this._registros.asReadonly();
  readonly criticos = computed(() => this._registros().filter(r => r.critico));
  readonly recientes = computed(() => this._registros().slice(0, 50));

  constructor() {
    this.cargar();
  }

  registrar(
    accion: AccionAuditoria,
    modulo: string,
    detalle: string,
    critico = false
  ): void {
    const u = this.injector.get(AuthService).usuario();
    const entry: RegistroAuditoria = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date(),
      usuarioId: u?._id ?? 'sistema',
      usuarioNombre: u?.nombre ?? 'Sistema',
      rol: u?.rol ?? 'sistema',
      accion,
      modulo,
      detalle,
      critico
    };
    this._registros.update(list => [entry, ...list].slice(0, 500));
    this.persistir();
  }

  filtrarPorAccion(accion: AccionAuditoria): RegistroAuditoria[] {
    return this._registros().filter(r => r.accion === accion);
  }

  private cargar(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as RegistroAuditoria[];
      this._registros.set(
        parsed.map(r => ({ ...r, timestamp: new Date(r.timestamp) }))
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private persistir(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._registros()));
  }
}
