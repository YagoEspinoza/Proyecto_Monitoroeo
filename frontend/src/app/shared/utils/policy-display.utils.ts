import { EstadoPolitica, TipoPolitica } from '../../core/models/policy.models';

const ETIQUETAS_ESTADO: Record<EstadoPolitica, string> = {
  activa: 'Activa',
  critica: 'Crítica',
  monitoreo: 'En monitoreo',
  deshabilitada: 'Deshabilitada'
};

const ETIQUETAS_TIPO: Record<TipoPolitica, string> = {
  bloquear_trafico_sospechoso: 'Bloqueo tráfico',
  aislar_desconocidos: 'Aislar desconocidos',
  limitar_vlan: 'Limitar VLANs',
  intentos_fallidos: 'Intentos fallidos',
  cuarentena_automatica: 'Cuarentena auto.'
};

export function etiquetaEstadoPolitica(estado: EstadoPolitica): string {
  return ETIQUETAS_ESTADO[estado] ?? estado;
}

export function etiquetaTipoPolitica(tipo: TipoPolitica): string {
  return ETIQUETAS_TIPO[tipo] ?? tipo;
}

export function claseEstadoPolitica(estado: EstadoPolitica): string {
  return `policy-${estado}`;
}
