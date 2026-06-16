import {
  AreaVlanInstitucional,
  DimensionMatrizClave,
  EstadoVulnerabilidad,
  IsoStandard,
  NivelRiesgo,
  TipoVulnerabilidad,
  TratamientoRiesgo
} from '../constants/iso.constants';

/** Gestión de riesgos TI — dimensiones 4 y 12 */
export interface RiesgoTI {
  id: string;
  activoAfectado: string;
  amenaza: string;
  vulnerabilidad: string;
  impacto: number;
  probabilidad: number;
  nivel: NivelRiesgo;
  tratamiento: TratamientoRiesgo;
  controlIso?: string;
  dimension?: DimensionMatrizClave;
  reporteId?: string;
  alertaId?: string;
  dispositivoId?: string;
  descripcion?: string;
  fechaIdentificacion: string;
  fechaActualizacion?: string;
}

/** Vulnerabilidades detectadas — dimensiones 5 y 13 */
export interface VulnerabilidadTI {
  id: string;
  tipo: TipoVulnerabilidad;
  titulo: string;
  descripcion: string;
  estado: EstadoVulnerabilidad;
  severidad: NivelRiesgo;
  dispositivoId?: string;
  dispositivoNombre?: string;
  vlanId?: number;
  areaVlan?: AreaVlanInstitucional;
  alertaId?: string;
  reporteId?: string;
  cve?: string;
  puerto?: number;
  detectadaEn: string;
  mitigadaEn?: string;
}

/** Control ISO/IEC 27001 — dimensión 6 */
export interface ControlISO27001 {
  id: string;
  codigo: string;
  nombre: string;
  dominio: string;
  aplicado: boolean;
  porcentajeCumplimiento: number;
  evidencias: EvidenciaISO[];
  controlesPendientes?: string[];
  dimensiones: number[];
  ultimaEvaluacion?: string;
}

/** Métrica ISO/IEC 25000 SQuaRE */
export interface MetricaISO25000 {
  clave: string;
  nombre: string;
  valor: number;
  unidad: string;
  umbral: number;
  cumple: boolean;
  dimension: number;
  evidencia?: string;
  medidoEn: string;
}

/** Evaluación integral de calidad del software */
export interface EvaluacionCalidadSoftware {
  id: string;
  periodoHoras: number;
  uptimeSoftware: number;
  disponibilidadSoftware: number;
  tiempoRespuestaAlertaMs: number;
  eventosProcesados: number;
  cpuUso: number;
  memoriaUso: number;
  telemetriaSinPerdida: boolean;
  backendEstado: 'operativo' | 'degradado' | 'caido';
  baseDatosEstado: 'operativo' | 'degradado' | 'caido';
  metricas: MetricaISO25000[];
  evaluadoEn: string;
}

/** Evidencia vinculada a controles o dimensiones */
export interface EvidenciaISO {
  id: string;
  titulo: string;
  tipo: 'log' | 'alerta' | 'reporte' | 'politica' | 'config' | 'auditoria' | 'metrica';
  referenciaId?: string;
  descripcion: string;
  estandar: IsoStandard;
  controlIso?: string;
  dimension?: DimensionMatrizClave;
  fecha: string;
  url?: string;
}

/** Resumen de cumplimiento normativo */
export interface CumplimientoISO {
  estandar: IsoStandard;
  porcentajeGeneral: number;
  controlesAplicados: number;
  controlesPendientes: number;
  controlesTotal: number;
  evidencias: EvidenciaISO[];
  evaluadoEn: string;
}

/** Alta disponibilidad de red — dimensión 2 */
export interface GatewayHA {
  id: string;
  nombre: string;
  ip: string;
  rol: 'activo' | 'respaldo' | 'standby';
  protocolo: 'HSRP' | 'VRRP' | 'GLBP';
  uptime: number;
  ultimoFailover?: string;
  tiempoRecuperacionSeg?: number;
}

export interface EventoDisponibilidad {
  id: string;
  tipo: 'caida' | 'recuperacion' | 'failover' | 'degradacion';
  componente: string;
  descripcion: string;
  timestamp: string;
  duracionSeg?: number;
  resuelto: boolean;
}

export interface KpiDisponibilidadRed {
  porcentaje: number;
  periodoHoras: number;
  eventosCaida: number;
  eventosRecuperacion: number;
  tiempoRecuperacionPromedioSeg: number;
  continuidadServicio: boolean;
}

/** Resiliencia de infraestructura — dimensión 3 */
export interface PuntoUnicoFallo {
  id: string;
  componente: string;
  criticidad: NivelRiesgo;
  redundanciaDisponible: boolean;
  descripcion: string;
  dispositivoIds: string[];
}

export interface ResilienciaInfraestructura {
  indiceResiliencia: number;
  puntosUnicosFallo: PuntoUnicoFallo[];
  equiposRedundantes: number;
  equiposTotal: number;
  balanceoCargaActivo: boolean;
  serviciosEstables: number;
  serviciosTotal: number;
}

/** Política de tráfico entre segmentos VLAN */
export interface PoliticaTraficoVlan {
  origen: AreaVlanInstitucional;
  destino: AreaVlanInstitucional;
  permitido: boolean;
  protocolo?: string;
  descripcion: string;
  bloqueosUltimas24h?: number;
}

/** Indicador de confianza institucional — dimensión 15 */
export interface IndicadorConfianzaInstitucional {
  nivel: number;
  disponibilidadRed: number;
  disponibilidadSoftware: number;
  incidentesResueltos: number;
  incidentesTotal: number;
  cumplimientoIso: number;
  percepcionInterna?: number;
  calculadoEn: string;
}

/** Resumen agregado para dashboard y reportes */
export interface ResumenMatrizOperacionalizacion {
  cumplimientoIso27001: CumplimientoISO;
  cumplimientoIso25000: CumplimientoISO;
  riesgosAbiertos: number;
  riesgosCriticos: number;
  vulnerabilidadesAbiertas: number;
  disponibilidadRed: KpiDisponibilidadRed;
  resiliencia: ResilienciaInfraestructura;
  confianzaInstitucional: IndicadorConfianzaInstitucional;
  dimensiones: { clave: DimensionMatrizClave; cobertura: number }[];
}
