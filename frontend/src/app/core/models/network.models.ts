export type EstadoSeguridad = 'seguro' | 'alerta' | 'intruso' | 'aislado';
export type EstadoDispositivo = 'activo' | 'inactivo' | 'degradado';
export type NivelAlerta = 'critico' | 'alto' | 'advertencia' | 'info';
export type TipoDispositivo = 'router' | 'switch' | 'servidor' | 'workstation' | 'firewall';

export interface DispositivoRed {
  id: string;
  nombre: string;
  ip: string;
  mac: string;
  tipo: TipoDispositivo;
  vlan: number;
  ubicacion: string;
  estado: EstadoDispositivo;
  seguridad: EstadoSeguridad;
  latencia: number | null;
  uptime: number;
  paquetesPerdidos: number;
  ultimaActividad: string;
}

export interface AlertaIntruso {
  id: string;
  nivel: NivelAlerta;
  mensaje: string;
  ip: string;
  mac?: string;
  puerto?: number;
  vlan?: number;
  tiempo: string;
  reconocida: boolean;
  accion?: string;
}

export interface VlanSegmento {
  id: number;
  nombre: string;
  rango: string;
  gateway: string;
  dispositivos: number;
  traficoMbps: number;
  maxMbps: number;
  color: string;
  estado: 'operativa' | 'degradada' | 'incidente' | 'cuarentena';
  seguridad: EstadoSeguridad;
}

export interface LogSistema {
  id: string;
  timestamp: Date;
  nivel: 'info' | 'warn' | 'error' | 'success';
  modulo: string;
  mensaje: string;
}

export interface NodoTopologia {
  id: string;
  label: string;
  ip: string;
  tipo: TipoDispositivo;
  x: number;
  y: number;
  seguridad: EstadoSeguridad;
}

export interface EnlaceTopologia {
  desde: string;
  hasta: string;
  activo: boolean;
}

export interface MetricasDashboard {
  dispositivosActivos: number;
  dispositivosTotal: number;
  alertasCriticas: number;
  alertasPendientes: number;
  intrusosDetectados: number;
  enCuarentena: number;
  traficoTotalMbps: number;
  uptimePromedio: number;
  estadoGlobal: EstadoSeguridad;
  politicasActivas: number;
  impactosPoliticas: number;
}
