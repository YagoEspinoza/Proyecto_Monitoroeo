import { Injectable, computed, inject, signal } from '@angular/core';
import { CONFIG_DEFAULT, ConfiguracionSistema, SensibilidadDeteccion } from '../models/config.models';
import { SocEventService } from './soc-event.service';
import { NotificationService } from './notification.service';
import { ThemeService } from './theme.service';

const STORAGE_KEY = 'ng_config';

@Injectable({ providedIn: 'root' })
export class SystemConfigService {
  private readonly events = inject(SocEventService);
  private readonly notif = inject(NotificationService);
  private readonly theme = inject(ThemeService);

  private readonly _config = signal<ConfiguracionSistema>(this.cargar());
  private readonly _pendientes = signal(false);
  private readonly _borrador = signal<ConfiguracionSistema | null>(null);

  readonly config = this._config.asReadonly();
  readonly tienePendientes = this._pendientes.asReadonly();
  readonly sensibilidad = computed(() => this._config().sensibilidad);

  /** Factor 0.5–2.0 para frecuencia de alertas simuladas */
  readonly factorSensibilidad = computed(() => {
    const map: Record<SensibilidadDeteccion, number> = {
      baja: 0.5,
      media: 1,
      alta: 2
    };
    return map[this._config().sensibilidad];
  });

  editar(parcial: Partial<ConfiguracionSistema>): void {
    const base = this._borrador() ?? structuredClone(this._config());
    this._borrador.set({ ...base, ...parcial });
    this._pendientes.set(true);
  }

  editarSeccion<K extends keyof ConfiguracionSistema>(
    seccion: K,
    valor: ConfiguracionSistema[K]
  ): void {
    const base = this._borrador() ?? structuredClone(this._config());
    this._borrador.set({ ...base, [seccion]: valor });
    this._pendientes.set(true);
  }

  aplicar(): void {
    const borrador = this._borrador();
    if (!borrador) return;
    this._config.set(borrador);
    this._borrador.set(null);
    this._pendientes.set(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(borrador));
    this.events.emit('success', 'CONFIG', 'Configuración del sistema aplicada');
    this.notif.success('Configuración guardada', 'Los cambios ya están activos en el SOC');
    const t = borrador.tema;
    if (t === 'oscuro' || t === 'claro') {
      this.theme.setTema(t);
    }
  }

  descartar(): void {
    this._borrador.set(null);
    this._pendientes.set(false);
    this.notif.info('Cambios descartados');
  }

  valorActual<K extends keyof ConfiguracionSistema>(key: K): ConfiguracionSistema[K] {
    const b = this._borrador();
    return b ? b[key] : this._config()[key];
  }

  /** Aplica tema guardado al arrancar la app */
  inicializar(): void {
    /* tema gestionado por ThemeService */
  }

  private cargar(): ConfiguracionSistema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConfiguracionSistema;
        return { ...CONFIG_DEFAULT, ...parsed };
      }
    } catch {
      /* defaults */
    }
    return structuredClone(CONFIG_DEFAULT);
  }

}
