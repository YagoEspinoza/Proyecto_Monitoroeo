import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { ThemeService } from './theme.service';
import { PERFIL_DEFAULT, PerfilUsuarioLocal, TemaId } from '../models/ux.models';
import { ROLES, RolUsuario } from '../constants/roles.constants';

const STORAGE_KEY = 'ng_user_profile';

const AVATARES = ['⬡', '🛡', '◎', '◈', '⊛', '⚠', '◐', '⧉'];

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly auth = inject(AuthService);
  private readonly notif = inject(NotificationService);
  private readonly theme = inject(ThemeService);

  private readonly _perfil = signal<PerfilUsuarioLocal>(this.cargar());

  readonly perfil = this._perfil.asReadonly();
  readonly avataresDisponibles = AVATARES;

  readonly nombreMostrado = computed(() => {
    const local = this._perfil().nombre.trim();
    return local || this.auth.usuario()?.nombre || 'Operador';
  });

  readonly rolMostrado = computed(() => {
    const sim = this._perfil().rolSimulado;
    if (sim) return this.etiquetaRol(sim);
    return this.etiquetaRol(this.auth.usuario()?.rol ?? ROLES.ADMIN);
  });

  readonly avatarMostrado = computed(() => {
    const av = this._perfil().avatar;
    return av || (this.auth.usuario()?.nombre?.[0] ?? 'O').toUpperCase();
  });

  readonly esEmojiAvatar = computed(() => AVATARES.includes(this._perfil().avatar));

  setNombre(nombre: string): void {
    const n = nombre.trim();
    this.guardar({ ...this._perfil(), nombre: n });
    if (n) this.auth.actualizarNombreLocal(n);
    this.notif.success('Perfil actualizado', 'Nombre guardado localmente');
  }

  setAvatar(avatar: string): void {
    this.guardar({ ...this._perfil(), avatar });
    this.notif.info('Avatar actualizado');
  }

  setRolSimulado(rol: RolUsuario | null): void {
    this.guardar({ ...this._perfil(), rolSimulado: rol });
    if (rol) {
      this.auth.simularRol(rol);
      this.notif.info('Rol simulado', `Vista como ${this.etiquetaRol(rol)}`);
    } else {
      this.auth.restaurarRolOriginal();
      this.notif.info('Rol restaurado', 'Permisos del usuario de sesión');
    }
  }

  setTema(tema: TemaId): void {
    this.theme.setTema(tema);
    this.notif.config('Tema aplicado', this.theme.temas.find(t => t.id === tema)?.label);
  }

  private guardar(perfil: PerfilUsuarioLocal): void {
    this._perfil.set(perfil);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
  }

  private cargar(): PerfilUsuarioLocal {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...PERFIL_DEFAULT, ...JSON.parse(raw) };
    } catch {
      /* defaults */
    }
    return { ...PERFIL_DEFAULT };
  }

  private etiquetaRol(rol: string): string {
    const map: Record<string, string> = {
      [ROLES.ADMIN]: 'Administrador',
      [ROLES.OPERADOR]: 'Operador',
      [ROLES.ANALISTA]: 'Analista SOC'
    };
    return map[rol] ?? rol;
  }
}
