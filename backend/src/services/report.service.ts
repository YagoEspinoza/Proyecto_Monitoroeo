import {
  IReport,
  ISO_STANDARDS,
  REPORT_SEVERITIES,
  REPORT_STATUSES,
  REPORT_TYPES,
  ReportModel,
  ReportSeverity,
  ReportStatus,
  ReportType,
  RIESGO_NIVELES,
  RiesgoNivel,
  TRATAMIENTOS_RIESGO,
  TratamientoRiesgo,
  IsoStandard
} from '../models/report.model';
import { AppError } from '../middlewares/error.middleware';

export interface ReportFilters {
  from?: string;
  to?: string;
  type?: ReportType;
  severity?: ReportSeverity;
  status?: ReportStatus;
  vlanId?: number;
  deviceIp?: string;
  isoStandard?: IsoStandard;
  controlIso?: string;
  riesgoNivel?: RiesgoNivel;
  dimension?: string;
}

export interface CreateReportInput {
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

export type UpdateReportInput = Partial<CreateReportInput>;

function parseDate(value: string | undefined, field: string): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, `Fecha inválida en ${field}`);
  }
  return date;
}

function assertEnum<T extends string>(value: string | undefined, allowed: readonly T[], field: string): T | undefined {
  if (!value) return undefined;
  if (!allowed.includes(value as T)) {
    throw new AppError(400, `${field} inválido: ${value}`);
  }
  return value as T;
}

export function validateCreateInput(input: CreateReportInput): void {
  if (!input.title?.trim()) throw new AppError(400, 'El título es obligatorio');
  if (!input.description?.trim()) throw new AppError(400, 'La descripción es obligatoria');
  if (!input.createdBy?.trim()) throw new AppError(400, 'createdBy es obligatorio');
  assertEnum(input.type, REPORT_TYPES, 'type');
  assertEnum(input.severity, REPORT_SEVERITIES, 'severity');
  if (input.status) assertEnum(input.status, REPORT_STATUSES, 'status');
  if (input.isoStandard) assertEnum(input.isoStandard, ISO_STANDARDS, 'isoStandard');
  if (input.riesgoNivel) assertEnum(input.riesgoNivel, RIESGO_NIVELES, 'riesgoNivel');
  if (input.tratamiento) assertEnum(input.tratamiento, TRATAMIENTOS_RIESGO, 'tratamiento');
  if (input.impacto !== undefined && (input.impacto < 1 || input.impacto > 5)) {
    throw new AppError(400, 'impacto debe estar entre 1 y 5');
  }
  if (input.probabilidad !== undefined && (input.probabilidad < 1 || input.probabilidad > 5)) {
    throw new AppError(400, 'probabilidad debe estar entre 1 y 5');
  }
}

export function buildFilterQuery(filters: ReportFilters): Record<string, unknown> {
  const query: Record<string, unknown> = {};

  const from = parseDate(filters.from, 'from');
  const to = parseDate(filters.to, 'to');
  if (from || to) {
    query.createdAt = {};
    if (from) (query.createdAt as Record<string, Date>).$gte = from;
    if (to) (query.createdAt as Record<string, Date>).$lte = to;
  }

  const type = assertEnum(filters.type, REPORT_TYPES, 'type');
  const severity = assertEnum(filters.severity, REPORT_SEVERITIES, 'severity');
  const status = assertEnum(filters.status, REPORT_STATUSES, 'status');

  if (type) query.type = type;
  if (severity) query.severity = severity;
  if (status) query.status = status;
  if (filters.vlanId !== undefined) query.vlanId = filters.vlanId;
  if (filters.deviceIp) query.deviceIp = filters.deviceIp.trim();
  if (filters.isoStandard) query.isoStandard = assertEnum(filters.isoStandard, ISO_STANDARDS, 'isoStandard');
  if (filters.controlIso) query.controlIso = filters.controlIso.trim();
  if (filters.riesgoNivel) query.riesgoNivel = assertEnum(filters.riesgoNivel, RIESGO_NIVELES, 'riesgoNivel');
  if (filters.dimension) query.dimension = filters.dimension.trim();

  return query;
}

export async function listReports(filters: ReportFilters): Promise<IReport[]> {
  const query = buildFilterQuery(filters);
  return ReportModel.find(query).sort({ createdAt: -1 }).exec();
}

export async function getReportById(id: string): Promise<IReport> {
  const report = await ReportModel.findById(id).exec();
  if (!report) throw new AppError(404, 'Reporte no encontrado');
  return report;
}

export async function createReport(input: CreateReportInput): Promise<IReport> {
  validateCreateInput(input);
  return ReportModel.create({
    ...input,
    status: input.status ?? 'OPEN',
    evidence: input.evidence ?? [],
    logs: input.logs ?? []
  });
}

export async function updateReport(id: string, input: UpdateReportInput): Promise<IReport> {
  if (input.type) assertEnum(input.type, REPORT_TYPES, 'type');
  if (input.severity) assertEnum(input.severity, REPORT_SEVERITIES, 'severity');
  if (input.status) assertEnum(input.status, REPORT_STATUSES, 'status');
  if (input.isoStandard) assertEnum(input.isoStandard, ISO_STANDARDS, 'isoStandard');
  if (input.riesgoNivel) assertEnum(input.riesgoNivel, RIESGO_NIVELES, 'riesgoNivel');
  if (input.tratamiento) assertEnum(input.tratamiento, TRATAMIENTOS_RIESGO, 'tratamiento');

  const report = await ReportModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true
  }).exec();

  if (!report) throw new AppError(404, 'Reporte no encontrado');
  return report;
}

export async function deleteReport(id: string): Promise<void> {
  const result = await ReportModel.findByIdAndDelete(id).exec();
  if (!result) throw new AppError(404, 'Reporte no encontrado');
}

export interface ComplianceSummary {
  totalReportes: number;
  porEstado: Record<string, number>;
  porSeveridad: Record<string, number>;
  porRiesgoNivel: Record<string, number>;
  controlesConEvidencia: string[];
  porcentajeConEvidenciaIso: number;
}

export interface Iso27001Summary extends ComplianceSummary {
  estandar: 'ISO_27001';
  controlesAplicados: number;
  controlesPendientes: number;
  porcentajeCumplimiento: number;
  porControl: { controlIso: string; total: number; resueltos: number }[];
}

export interface Iso25000Summary extends ComplianceSummary {
  estandar: 'ISO_25000';
  dimensionesCubiertas: string[];
  porcentajeCumplimiento: number;
  reportesFuncionales: number;
  reportesDisponibilidad: number;
}

async function buildComplianceBase(isoStandard?: IsoStandard): Promise<ComplianceSummary> {
  const match = isoStandard ? { isoStandard } : { isoStandard: { $exists: true, $ne: null } };
  const reports = await ReportModel.find(match).exec();
  const total = reports.length;

  const porEstado: Record<string, number> = {};
  const porSeveridad: Record<string, number> = {};
  const porRiesgoNivel: Record<string, number> = {};
  const controlesSet = new Set<string>();
  let conEvidencia = 0;

  for (const r of reports) {
    porEstado[r.status] = (porEstado[r.status] ?? 0) + 1;
    porSeveridad[r.severity] = (porSeveridad[r.severity] ?? 0) + 1;
    if (r.riesgoNivel) porRiesgoNivel[r.riesgoNivel] = (porRiesgoNivel[r.riesgoNivel] ?? 0) + 1;
    if (r.controlIso) controlesSet.add(r.controlIso);
    if (r.evidenciaIso?.length || r.evidence?.length) conEvidencia++;
  }

  return {
    totalReportes: total,
    porEstado,
    porSeveridad,
    porRiesgoNivel,
    controlesConEvidencia: [...controlesSet],
    porcentajeConEvidenciaIso: total ? Math.round((conEvidencia / total) * 100) : 0
  };
}

export async function getComplianceSummary(): Promise<{
  iso27001: Iso27001Summary;
  iso25000: Iso25000Summary;
  general: { porcentajeCumplimiento: number; totalReportes: number };
}> {
  const [iso27001, iso25000] = await Promise.all([
    getIso27001Summary(),
    getIso25000Summary()
  ]);
  const total = iso27001.totalReportes + iso25000.totalReportes;
  const generalPct = total
    ? Math.round((iso27001.porcentajeCumplimiento + iso25000.porcentajeCumplimiento) / 2)
    : 0;
  return {
    iso27001,
    iso25000,
    general: { porcentajeCumplimiento: generalPct, totalReportes: total }
  };
}

export async function getIso27001Summary(): Promise<Iso27001Summary> {
  const base = await buildComplianceBase('ISO_27001');
  const reports = await ReportModel.find({ isoStandard: 'ISO_27001' }).exec();
  const controlMap = new Map<string, { total: number; resueltos: number }>();

  for (const r of reports) {
    if (!r.controlIso) continue;
    const cur = controlMap.get(r.controlIso) ?? { total: 0, resueltos: 0 };
    cur.total++;
    if (r.status === 'RESOLVED' || r.status === 'ARCHIVED') cur.resueltos++;
    controlMap.set(r.controlIso, cur);
  }

  const porControl = [...controlMap.entries()].map(([controlIso, v]) => ({ controlIso, ...v }));
  const controlesAplicados = porControl.filter(c => c.resueltos > 0).length;
  const controlesPendientes = porControl.filter(c => c.resueltos < c.total).length;
  const controlesTotal = Math.max(porControl.length, 1);

  return {
    ...base,
    estandar: 'ISO_27001',
    controlesAplicados,
    controlesPendientes,
    porcentajeCumplimiento: Math.round((controlesAplicados / controlesTotal) * 100),
    porControl
  };
}

export async function getIso25000Summary(): Promise<Iso25000Summary> {
  const base = await buildComplianceBase('ISO_25000');
  const reports = await ReportModel.find({ isoStandard: 'ISO_25000' }).exec();
  const dimensiones = new Set<string>();
  let funcionales = 0;
  let disponibilidad = 0;

  for (const r of reports) {
    if (r.dimension) dimensiones.add(r.dimension);
    if (r.dimension?.includes('funcional')) funcionales++;
    if (r.dimension?.includes('disponibilidad') || r.dimension?.includes('fiabilidad')) disponibilidad++;
  }

  const resueltos = reports.filter(r => r.status === 'RESOLVED' || r.status === 'ARCHIVED').length;
  const porcentaje = reports.length ? Math.round((resueltos / reports.length) * 100) : 0;

  return {
    ...base,
    estandar: 'ISO_25000',
    dimensionesCubiertas: [...dimensiones],
    porcentajeCumplimiento: porcentaje,
    reportesFuncionales: funcionales,
    reportesDisponibilidad: disponibilidad
  };
}
