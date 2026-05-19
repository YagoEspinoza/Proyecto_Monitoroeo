import { Injectable, signal } from '@angular/core';
import { ColorAcento, PreferenciasTema, TEMA_DEFAULT, TemaId } from '../models/ux.models';

const STORAGE_KEY = 'ng_theme_prefs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _prefs = signal<PreferenciasTema>(this.cargar());

  readonly prefs = this._prefs.asReadonly();
  readonly tema = () => this._prefs().tema;
  readonly acento = () => this._prefs().acento;

  readonly temas: { id: TemaId; label: string; icon: string }[] = [
    { id: 'oscuro', label: 'Modo oscuro', icon: '◐' },
    { id: 'claro', label: 'Modo claro', icon: '○' },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: '⚡' },
    { id: 'soc', label: 'SOC profesional', icon: '⬡' }
  ];

  readonly acentos: { id: ColorAcento; label: string; hex: string }[] = [
    { id: 'cyan', label: 'Cian', hex: '#38bdf8' },
    { id: 'emerald', label: 'Esmeralda', hex: '#10b981' },
    { id: 'violet', label: 'Violeta', hex: '#8b5cf6' },
    { id: 'amber', label: 'Ámbar', hex: '#f59e0b' },
    { id: 'rose', label: 'Rosa', hex: '#f43f5e' }
  ];

  inicializar(): void {
    this.aplicar(this._prefs());
  }

  setTema(tema: TemaId): void {
    this.guardar({ ...this._prefs(), tema });
  }

  setAcento(acento: ColorAcento): void {
    this.guardar({ ...this._prefs(), acento });
  }

  private guardar(prefs: PreferenciasTema): void {
    this._prefs.set(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    this.aplicar(prefs);
  }

  private aplicar(prefs: PreferenciasTema): void {
    const root = document.documentElement;
    root.setAttribute('data-theme', prefs.tema);
    root.setAttribute('data-accent', prefs.acento);
  }

  private cargar(): PreferenciasTema {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...TEMA_DEFAULT, ...JSON.parse(raw) };
      }
      const legacy = localStorage.getItem('ng_config');
      if (legacy) {
        const cfg = JSON.parse(legacy) as { tema?: string };
        if (cfg.tema === 'claro' || cfg.tema === 'oscuro') {
          return { ...TEMA_DEFAULT, tema: cfg.tema };
        }
      }
    } catch {
      /* defaults */
    }
    return { ...TEMA_DEFAULT };
  }
}
