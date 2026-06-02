import { RolUsuario } from '../constants/roles.constants';

export interface Usuario {
  _id: string;
  nombre: string;
  correo: string;
  rol: RolUsuario;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
