import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { PERMISOS_POR_ROL, ROLES, RolUsuario } from '../constants/roles.constants';
import { APP_ROUTES } from '../constants/routes.constants';
import { extraerMensajeError } from '../utils/error-message.util';
import { LoginRequest, LoginResponse, Usuario } from '../models/usuario.model';
import { AuditTrailService } from './audit-trail.service';
import { UserActivityService } from './user-activity.service';

interface UsuarioCredencial {
  correo: string;
  password: string;
  usuario: Usuario;
}

const SESSION_KEY = 'nw_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly audit = inject(AuditTrailService);
  private readonly activity = inject(UserActivityService);
  private readonly _usuario = signal<Usuario | null>(null);
  private readonly _token = signal<string | null>(null);
  private _rolOriginal: RolUsuario | null = null;

  readonly usuario = this._usuario.asReadonly();
  readonly token = this._token.asReadonly();
  readonly rol = computed(() => this._usuario()?.rol ?? null);
  readonly estaAutenticadoSignal = computed(() => !!this._token());

  private readonly usuariosMock: UsuarioCredencial[] = [
    {
      correo: 'admin@netguard.com',
      password: 'Admin1234',
      usuario: {
        _id: '1',
        nombre: 'Administrador',
        correo: 'admin@netguard.com',
        rol: ROLES.ADMIN
      }
    },
    {
      correo: 'operador@netguard.com',
      password: 'Oper1234',
      usuario: {
        _id: '2',
        nombre: 'Operador SOC',
        correo: 'operador@netguard.com',
        rol: ROLES.OPERADOR
      }
    },
    {
      correo: 'analista@netguard.com',
      password: 'Anal1234',
      usuario: {
        _id: '3',
        nombre: 'Analista SOC',
        correo: 'analista@netguard.com',
        rol: ROLES.ANALISTA
      }
    },
    {
      correo: 'observador@netguard.com',
      password: 'Obs1234',
      usuario: {
        _id: '3b',
        nombre: 'Analista SOC',
        correo: 'observador@netguard.com',
        rol: ROLES.ANALISTA
      }
    }
  ];

  constructor(private readonly router: Router) {
    this.restaurarSesion();
  }

  recuperarPasswordMock(correo: string): Observable<{ mensaje: string }> {
    const existe = this.usuariosMock.some(
      u => u.correo === correo.trim().toLowerCase()
    );
    if (!existe) {
      return throwError(() => ({
        error: { mensaje: 'No existe una cuenta con ese correo.' }
      }));
    }
    return of({
      mensaje: 'Enlace de recuperación enviado (simulado). Revisa tu bandeja mock.'
    });
  }

  cambiarPassword(actual: string, nueva: string): Observable<{ ok: boolean }> {
    const u = this._usuario();
    if (!u) {
      return throwError(() => ({ error: { mensaje: 'Sin sesión activa.' } }));
    }
    const cred = this.usuariosMock.find(c => c.usuario._id === u._id);
    if (!cred || cred.password !== actual) {
      return throwError(() => ({
        error: { mensaje: 'Contraseña actual incorrecta.' }
      }));
    }
    cred.password = nueva;
    return of({ ok: true });
  }

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    const correo = credenciales.correo.trim().toLowerCase();
    const encontrado = this.usuariosMock.find(
      u => u.correo === correo && u.password === credenciales.password
    );

    if (!encontrado) {
      return throwError(() => ({
        error: { mensaje: 'Correo o contraseña incorrectos.' }
      }));
    }

    const respuesta: LoginResponse = {
      token: `mock-token-${Date.now()}`,
      usuario: encontrado.usuario
    };
    this.persistirSesion(respuesta);
    this.audit.registrar('login', 'AUTH', `Inicio de sesión: ${encontrado.usuario.nombre}`);
    this.activity.registrar('seguridad', 'Inicio de sesión exitoso');
    return of(respuesta);
  }

  logout(): void {
    const nombre = this._usuario()?.nombre;
    if (nombre) {
      this.audit.registrar('logout', 'AUTH', `Cierre de sesión: ${nombre}`);
    }
    this._token.set(null);
    this._usuario.set(null);
    sessionStorage.removeItem(SESSION_KEY);
    void this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
  }

  estaAutenticado(): boolean {
    return this.estaAutenticadoSignal();
  }

  obtenerToken(): string | null {
    return this._token();
  }

  tieneRol(...roles: RolUsuario[]): boolean {
    const actual = this.rol();
    return !!actual && roles.includes(actual);
  }

  puede(permiso: string): boolean {
    const rol = this.rol();
    if (!rol) return false;
    return PERMISOS_POR_ROL[rol]?.includes(permiso) ?? false;
  }

  puedeAislar(): boolean {
    return this.puede('isolate');
  }

  puedeConfigurar(): boolean {
    return this.puede('config');
  }

  simularRol(rol: RolUsuario): void {
    const u = this._usuario();
    if (!u) return;
    if (!this._rolOriginal) this._rolOriginal = u.rol;
    this._usuario.set({ ...u, rol });
    this.persistirUsuarioActual();
  }

  restaurarRolOriginal(): void {
    const u = this._usuario();
    if (!u || !this._rolOriginal) return;
    this._usuario.set({ ...u, rol: this._rolOriginal });
    this._rolOriginal = null;
    this.persistirUsuarioActual();
  }

  actualizarNombreLocal(nombre: string): void {
    const u = this._usuario();
    if (!u) return;
    this._usuario.set({ ...u, nombre });
    this.persistirUsuarioActual();
  }

  mensajeErrorLogin(error: unknown): string {
    return extraerMensajeError(error, 'Error al iniciar sesión.');
  }

  private persistirSesion(respuesta: LoginResponse): void {
    this._token.set(respuesta.token);
    this._usuario.set(respuesta.usuario);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(respuesta));
  }

  private persistirUsuarioActual(): void {
    const token = this._token();
    const usuario = this._usuario();
    if (token && usuario) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, usuario }));
    }
  }

  private restaurarSesion(): void {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as LoginResponse & { usuario?: { rol?: string } };
      const { token, usuario } = parsed;
      if (token && usuario?.rol) {
        const rolRaw = String(usuario.rol);
        const rol: RolUsuario =
          rolRaw === 'observador' || rolRaw === ROLES.ANALISTA
            ? ROLES.ANALISTA
            : (rolRaw as RolUsuario);
        this._token.set(token);
        this._usuario.set({ ...usuario, rol });
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }
}
