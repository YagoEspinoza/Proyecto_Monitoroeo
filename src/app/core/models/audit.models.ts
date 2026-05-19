export type AccionAuditoria =
  | 'login'
  | 'logout'
  | 'config'
  | 'politica'
  | 'aislamiento'
  | 'alerta'
  | 'simulacion'
  | 'export'
  | 'perfil'
  | 'busqueda';

export interface RegistroAuditoria {
  id: string;
  timestamp: Date;
  usuarioId: string;
  usuarioNombre: string;
  rol: string;
  accion: AccionAuditoria;
  modulo: string;
  detalle: string;
  critico: boolean;
}

export interface ActividadUsuario {
  id: string;
  timestamp: Date;
  tipo: 'navegacion' | 'accion' | 'seguridad' | 'sistema';
  descripcion: string;
  ruta?: string;
}
