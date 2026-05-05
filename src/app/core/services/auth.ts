import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _usuario = signal<Usuario | null>(null);
  private _token = signal<string | null>(null);

  usuario = this._usuario.asReadonly();
  token = this._token.asReadonly();

  // 👤 Usuarios de prueba (reemplazar con HTTP cuando tengas backend)
  private usuariosMock: { correo: string; password: string; usuario: Usuario }[] = [
    {
      correo: 'admin@netguard.com',
      password: 'Admin1234',
      usuario: { _id: '1', nombre: 'Administrador', correo: 'admin@netguard.com', rol: 'admin' }
    },
    {
      correo: 'operador@netguard.com',
      password: 'Oper1234',
      usuario: { _id: '2', nombre: 'Operador', correo: 'operador@netguard.com', rol: 'operador' }
    }
  ];

  constructor(private router: Router) {
    // Recuperar sesión al recargar la página
    const sesion = sessionStorage.getItem('nw_session');
    if (sesion) {
      const { token, usuario } = JSON.parse(sesion);
      this._token.set(token);
      this._usuario.set(usuario);
    }
  }

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    const encontrado = this.usuariosMock.find(
      u => u.correo === credenciales.correo && u.password === credenciales.password
    );

    if (encontrado) {
      const respuesta: LoginResponse = {
        token: 'mock-token-' + Date.now(),
        usuario: encontrado.usuario
      };
      this._token.set(respuesta.token);
      this._usuario.set(respuesta.usuario);
      sessionStorage.setItem('nw_session', JSON.stringify(respuesta));
      return of(respuesta);
    }

    return throwError(() => ({ error: { mensaje: 'Correo o contraseña incorrectos.' } }));
  }

  logout(): void {
    this._token.set(null);
    this._usuario.set(null);
    sessionStorage.removeItem('nw_session');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!this._token();
  }

  obtenerToken(): string | null {
    return this._token();
  }
}