import {
  EstadoSeguridad,
  NivelAlerta,
  TipoDispositivo
} from '../../core/models/network.models';

const ICONOS_TIPO: Record<TipoDispositivo, string> = {
  router: '⊕',
  switch: '⊞',
  servidor: '▣',
  workstation: '⊡',
  firewall: '⬡'
};

const ETIQUETAS_NIVEL: Record<NivelAlerta, string> = {
  critico: 'CRÍTICO',
  alto: 'ALTO',
  advertencia: 'ADVERTENCIA',
  info: 'INFO'
};

const COLORES_SEGURIDAD: Record<EstadoSeguridad, string> = {
  seguro: '#10b981',
  alerta: '#f59e0b',
  intruso: '#ef4444',
  aislado: '#f43f5e'
};

const ETIQUETAS_ESTADO_GLOBAL: Record<EstadoSeguridad, string> = {
  seguro: 'RED SEGURA',
  alerta: 'ALERTA ACTIVA',
  intruso: 'INTRUSO DETECTADO',
  aislado: 'HOSTS EN CUARENTENA'
};

export function iconoTipoDispositivo(tipo: TipoDispositivo | string): string {
  return ICONOS_TIPO[tipo as TipoDispositivo] ?? '◈';
}

export function etiquetaNivelAlerta(nivel: NivelAlerta | string): string {
  return ETIQUETAS_NIVEL[nivel as NivelAlerta] ?? String(nivel).toUpperCase();
}

export function colorEstadoSeguridad(estado: EstadoSeguridad): string {
  return COLORES_SEGURIDAD[estado];
}

export function etiquetaEstadoGlobal(estado: EstadoSeguridad): string {
  return ETIQUETAS_ESTADO_GLOBAL[estado] ?? 'MONITOREO';
}

export function porcentajeCapacidad(valor: number, maximo: number): number {
  if (maximo <= 0) return 0;
  return Math.round(Math.min(100, Math.max(0, (valor / maximo) * 100)));
}

export function estadoVlanABadge(
  estado: 'operativa' | 'degradada' | 'incidente' | 'cuarentena'
): EstadoSeguridad {
  const map: Record<string, EstadoSeguridad> = {
    operativa: 'seguro',
    degradada: 'alerta',
    incidente: 'intruso',
    cuarentena: 'aislado'
  };
  return map[estado] ?? 'alerta';
}
