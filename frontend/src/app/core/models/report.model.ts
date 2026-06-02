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

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportSeverity = (typeof REPORT_SEVERITIES)[number];
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export interface NetworkReport {
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
