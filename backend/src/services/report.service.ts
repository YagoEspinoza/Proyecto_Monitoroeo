import {
  IReport,
  REPORT_SEVERITIES,
  REPORT_STATUSES,
  REPORT_TYPES,
  ReportModel,
  ReportSeverity,
  ReportStatus,
  ReportType
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
