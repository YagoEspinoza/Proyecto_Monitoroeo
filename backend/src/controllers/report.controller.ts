import { Request, Response, NextFunction } from 'express';
import * as reportService from '../services/report.service';
import { generateReportPdf } from '../utils/pdf-generator';
import { AppError } from '../middlewares/error.middleware';
import {
  ReportSeverity,
  ReportStatus,
  ReportType,
  RiesgoNivel,
  IsoStandard
} from '../models/report.model';

function paramId(req: Request): string {
  const id = req.params.id;
  if (typeof id !== 'string' || !id.trim()) {
    throw new AppError(400, 'Identificador de reporte inválido');
  }
  return id;
}

function parseVlanId(value: unknown): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function listReports(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters: reportService.ReportFilters = {
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
      type: req.query.type as ReportType | undefined,
      severity: req.query.severity as ReportSeverity | undefined,
      status: req.query.status as ReportStatus | undefined,
      vlanId: parseVlanId(req.query.vlanId),
      deviceIp: req.query.deviceIp as string | undefined,
      isoStandard: req.query.isoStandard as IsoStandard | undefined,
      controlIso: req.query.controlIso as string | undefined,
      riesgoNivel: req.query.riesgoNivel as RiesgoNivel | undefined,
      dimension: req.query.dimension as string | undefined
    };
    const reports = await reportService.listReports(filters);
    res.json(reports);
  } catch (error) {
    next(error);
  }
}

export async function getReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const report = await reportService.getReportById(paramId(req));
    res.json(report);
  } catch (error) {
    next(error);
  }
}

export async function createReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const report = await reportService.createReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    next(error);
  }
}

export async function updateReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const report = await reportService.updateReport(paramId(req), req.body);
    res.json(report);
  } catch (error) {
    next(error);
  }
}

export async function deleteReport(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await reportService.deleteReport(paramId(req));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function downloadReportPdf(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const report = await reportService.getReportById(paramId(req));
    const pdf = await generateReportPdf(report);
    const filename = `reporte-${report._id}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdf);
  } catch (error) {
    next(error);
  }
}

export async function complianceSummary(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await reportService.getComplianceSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}

export async function iso27001Summary(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await reportService.getIso27001Summary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}

export async function iso25000Summary(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await reportService.getIso25000Summary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
}
