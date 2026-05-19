export type EstadoPolitica = 'activa' | 'critica' | 'monitoreo' | 'deshabilitada';

export type TipoPolitica =
  | 'bloquear_trafico_sospechoso'
  | 'aislar_desconocidos'
  | 'limitar_vlan'
  | 'intentos_fallidos'
  | 'cuarentena_automatica';

export type AccionPolitica = 'bloquear' | 'aislar' | 'alertar' | 'monitorear';

export interface ImpactoPolitica {
  id: string;
  politicaId: string;
  politicaNombre: string;
  descripcion: string;
  timestamp: Date;
}

export interface PoliticaSeguridad {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoPolitica;
  estado: EstadoPolitica;
  activa: boolean;
  vlanIds: number[];
  accion: AccionPolitica;
  prioridad: number;
  impactos: number;
  ultimaActivacion: string | null;
  creadaEn: string;
}
