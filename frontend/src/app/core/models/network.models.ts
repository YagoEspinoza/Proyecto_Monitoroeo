import { AreaVlanInstitucional } from '../constants/iso.constants';

export type EstadoSeguridad = 'seguro' | 'alerta' | 'intruso' | 'aislado';
export type EstadoDispositivo = 'activo' | 'inactivo' | 'degradado';
export type NivelAlerta = 'critico' | 'alto' | 'advertencia' | 'info';
export type TipoDispositivo = 'router' | 'switch' | 'servidor' | 'workstation' | 'firewall';
export type RolGateway = 'activo' | 'respaldo' | 'standby';

export interface DispositivoRed {
  id: string;
  nombre: string;
  ip: string;
  mac: string;
  tipo: TipoDispositivo;
  vlan: number;
  areaInstitucional?: AreaVlanInstitucional;
  ubicacion: string;
  estado: EstadoDispositivo;
  seguridad: EstadoSeguridad;
  latencia: number | null;
  uptime: number;
  paquetesPerdidos: number;
  ultimaActividad: string;
  redundante?: boolean;
  rolRedundancia?: 'primario' | 'secundario' | 'balanceado';
  puntoUnicoFallo?: boolean;
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
  tipoAtaque?: string;
  ipAtacante?: string;
  vulnerabilidadId?: string;
  tiempoRespuestaMs?: number;
}

export interface VlanSegmento {
  id: number;
  nombre: string;
  areaInstitucional: AreaVlanInstitucional;
  rango: string;
  gateway: string;
  dispositivos: number;
  traficoMbps: number;
  maxMbps: number;
  color: string;
  estado: 'operativa' | 'degradada' | 'incidente' | 'cuarentena';
  seguridad: EstadoSeguridad;
  politicasTraficoAplicadas?: number;
  bloqueosInterVlan24h?: number;
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

export interface GatewayRed {
  id: string;
  nombre: string;
  ip: string;
  vlanId: number;
  rol: RolGateway;
  protocolo: 'HSRP' | 'VRRP' | 'GLBP';
  uptime: number;
  tiempoRecuperacionSeg?: number;
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
  /** Dimensión 2 — Alta disponibilidad */
  gatewayActivo?: string;
  gatewayRespaldo?: string;
  disponibilidadRedPct?: number;
  tiempoRecuperacionPromedioSeg?: number;
  /** Dimensión 3 — Resiliencia */
  indiceResiliencia?: number;
  puntosUnicoFallo?: number;
  equiposRedundantes?: number;
  /** Dimensión 6/14 — Cumplimiento */
  cumplimientoIso27001Pct?: number;
  cumplimientoIso25000Pct?: number;
  /** Dimensión 4/5 — Riesgo y vulnerabilidades */
  riesgosCriticos?: number;
  vulnerabilidadesAbiertas?: number;
  /** Dimensión 8/9 — Calidad software */
  uptimeSoftwarePct?: number;
  tiempoRespuestaAlertaMs?: number;
  /** Dimensión 15 — Confianza */
  confianzaInstitucionalPct?: number;
}
