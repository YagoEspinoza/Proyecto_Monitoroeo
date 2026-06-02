import { Injectable, signal } from '@angular/core';
import {
  IdiomaMock,
  PreferenciasUx,
  TamanoFuente,
  UX_DEFAULT
} from '../models/ux.models';

const STORAGE_KEY = 'ng_ux_prefs';

@Injectable({ providedIn: 'root' })
export class UxPreferencesService {
  private readonly _prefs = signal<PreferenciasUx>(this.cargar());

  readonly prefs = this._prefs.asReadonly();

  inicializar(): void {
    this.aplicar(this._prefs());
  }

  setTamanoFuente(t: TamanoFuente): void {
    this.patch({ tamanoFuente: t });
  }

  toggleCompacto(): void {
    this.patch({ modoCompacto: !this._prefs().modoCompacto });
  }

  setCompacto(v: boolean): void {
    this.patch({ modoCompacto: v });
  }

  toggleAnimaciones(): void {
    this.patch({ animaciones: !this._prefs().animaciones });
  }

  setAnimaciones(v: boolean): void {
    this.patch({ animaciones: v });
  }

  toggleSonidos(): void {
    this.patch({ sonidosAlerta: !this._prefs().sonidosAlerta });
  }

  setSonidos(v: boolean): void {
    this.patch({ sonidosAlerta: v });
  }

  setIdioma(idioma: IdiomaMock): void {
    this.patch({ idioma });
  }

  toggleSidebarColapsado(): void {
    this.patch({ sidebarColapsado: !this._prefs().sidebarColapsado });
  }

  setSidebarColapsado(v: boolean): void {
    this.patch({ sidebarColapsado: v });
  }

  private patch(parcial: Partial<PreferenciasUx>): void {
    const next = { ...this._prefs(), ...parcial };
    this._prefs.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    this.aplicar(next);
  }

  private aplicar(prefs: PreferenciasUx): void {
    const root = document.documentElement;
    root.classList.toggle('compact-mode', prefs.modoCompacto);
    root.classList.toggle('no-animations', !prefs.animaciones);
    root.classList.remove('font-sm', 'font-md', 'font-lg');
    root.classList.add(`font-${prefs.tamanoFuente}`);
    root.setAttribute('lang', prefs.idioma);
  }

  private cargar(): PreferenciasUx {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...UX_DEFAULT, ...JSON.parse(raw) };
    } catch {
      /* defaults */
    }
    return { ...UX_DEFAULT };
  }
}
