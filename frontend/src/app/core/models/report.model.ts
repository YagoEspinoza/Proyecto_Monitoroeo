export const REPORT_TYPES = [
  'INTRUSION_DETECTED',
  'VLAN_CREATED',
  'VLAN_DELETED',
  'DEVICE_QUARANTINED',
  'POLICY_CHANGED',
  'NETWORK_MODIFIED',
  'SYSTEM_ALERT'
] as const;

export const REPORT_SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export const REPORT_STATUSES = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'] as const;

export const ISO_STANDARDS = ['ISO_27001', 'ISO_25000'] as const;
export const RIESGO_NIVELES = ['bajo', 'medio', 'alto', 'critico'] as const;
export const TRATAMIENTOS_RIESGO = ['aceptar', 'mitigar', 'transferir', 'evitar'] as const;

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportSeverity = (typeof REPORT_SEVERITIES)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];
export type IsoStandard = (typeof ISO_STANDARDS)[number];
export type RiesgoNivel = (typeof RIESGO_NIVELES)[number];
export type TratamientoRiesgo = (typeof TRATAMIENTOS_RIESGO)[number];

/** Campos opcionales ISO / matriz de operacionalización */
export interface CamposIsoReporte {
  isoStandard?: IsoStandard;
  dimension?: string;
  controlIso?: string;
  riesgoNivel?: RiesgoNivel;
  impacto?: number;
  probabilidad?: number;
  activoAfectado?: string;
  amenaza?: string;
  vulnerabilidad?: string;
  tratamiento?: TratamientoRiesgo;
  evidenciaIso?: string[];
}

export interface NetworkReport extends CamposIsoReporte {
  _id: string;
  title: string;
  description: string;
  type: ReportType;
  severity: ReportSeverity;
  vlanId?: number;
  deviceIp?: string;
  deviceMac?: string;
  attackerIp?: string;
  actionTaken?: string;
  status: ReportStatus;
  createdBy: string;
  evidence?: string[];
  logs?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportPayload {
  title: string;
  description: string;
  type: ReportType;
  severity: ReportSeverity;
  vlanId?: number;
  deviceIp?: string;
  deviceMac?: string;
  attackerIp?: string;
  actionTaken?: string;
  status?: ReportStatus;
  createdBy: string;
  evidence?: string[];
  logs?: string[];
  isoStandard?: IsoStandard;
  dimension?: string;
  controlIso?: string;
  riesgoNivel?: RiesgoNivel;
  impacto?: number;
  probabilidad?: number;
  activoAfectado?: string;
  amenaza?: string;
  vulnerabilidad?: string;
  tratamiento?: TratamientoRiesgo;
  evidenciaIso?: string[];
}

export type UpdateReportPayload = Partial<CreateReportPayload>;

export interface ReportFilters {
  from?: string;
  to?: string;
  type?: ReportType;
  severity?: ReportSeverity;
  status?: ReportStatus;
  vlanId?: number;
  deviceIp?: string;
}

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  INTRUSION_DETECTED: 'Intrusión detectada',
  VLAN_CREATED: 'VLAN creada',
  VLAN_DELETED: 'VLAN eliminada',
  DEVICE_QUARANTINED: 'Dispositivo en cuarentena',
  POLICY_CHANGED: 'Política modificada',
  NETWORK_MODIFIED: 'Red modificada',
  SYSTEM_ALERT: 'Alerta del sistema'
};

export const REPORT_SEVERITY_LABELS: Record<ReportSeverity, string> = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
  CRITICAL: 'Crítica'
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En progreso',
  RESOLVED: 'Resuelto',
  ARCHIVED: 'Archivado'
};

export const ISO_STANDARD_LABELS: Record<IsoStandard, string> = {
  ISO_27001: 'ISO/IEC 27001',
  ISO_25000: 'ISO/IEC 25000'
};

export const RIESGO_NIVEL_LABELS: Record<RiesgoNivel, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico'
};

export const TRATAMIENTO_RIESGO_LABELS: Record<TratamientoRiesgo, string> = {
  aceptar: 'Aceptar',
  mitigar: 'Mitigar',
  transferir: 'Transferir',
  evitar: 'Evitar'
};
