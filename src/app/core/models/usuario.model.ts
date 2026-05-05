export interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  rol: 'admin' | 'operador' | 'visor';
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}