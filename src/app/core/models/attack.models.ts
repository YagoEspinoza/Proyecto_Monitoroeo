export type TipoAtaqueSimulado =
  | 'brute_force'
  | 'ddos'
  | 'sniffing'
  | 'acceso_no_autorizado'
  | 'port_scan'
  | 'movimiento_lateral';

export interface SimulacionAtaque {
  id: string;
  tipo: TipoAtaqueSimulado;
  nombre: string;
  descripcion: string;
  icono: string;
  severidad: 'critica' | 'alta' | 'media';
  duracionSeg: number;
}

export interface EstadoSimulacion {
  activa: boolean;
  ataqueId: string | null;
  progreso: number;
  fase: string;
}
