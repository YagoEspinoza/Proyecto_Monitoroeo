export type CategoriaNotificacion = 'seguridad' | 'sistema' | 'red' | 'usuarios';
export type PrioridadNotificacion = 'critica' | 'alta' | 'media' | 'baja';

export interface NotificacionCentro {
  id: string;
  titulo: string;
  mensaje: string;
  categoria: CategoriaNotificacion;
  prioridad: PrioridadNotificacion;
  timestamp: Date;
  leida: boolean;
  agrupacion?: string;
  enlace?: string;
}
