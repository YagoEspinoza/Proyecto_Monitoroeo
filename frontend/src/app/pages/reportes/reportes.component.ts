import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExportService, FormatoExportacion } from '../../core/services/export.service';
import { NotificationService } from '../../core/services/notification.service';
import { ReportService } from '../../core/services/report.service';
import { AuthService } from '../../core/services/auth.service';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { ModalComponent } from '../../shared/components/modal/modal';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { extraerMensajeError } from '../../core/utils/error-message.util';
import {
  CreateReportPayload,
  NetworkReport,
  ISO_STANDARDS,
  ISO_STANDARD_LABELS,
  REPORT_SEVERITIES,
  REPORT_SEVERITY_LABELS,
  REPORT_STATUSES,
  REPORT_STATUS_LABELS,
  REPORT_TYPE_LABELS,
  REPORT_TYPES,
  RIESGO_NIVELES,
  RIESGO_NIVEL_LABELS,
  TRATAMIENTOS_RIESGO,
  TRATAMIENTO_RIESGO_LABELS,
  ReportFilters,
  ReportSeverity,
  ReportStatus,
  ReportType,
  RiesgoNivel,
  TratamientoRiesgo,
  IsoStandard
} from '../../core/models/report.model';
import { CONTROLES_ISO_27001 } from '../../core/constants/iso.constants';
import { IsoComplianceService } from '../../core/services/iso-compliance.service';

interface ReporteItem {
  tipo: 'logs' | 'alertas' | 'metricas' | 'auditoria' | 'incidentes';
  titulo: string;
  desc: string;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageShellComponent,
    ModalComponent,
    EmptyStateComponent
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  readonly exportSvc = inject(ExportService);
  readonly notif = inject(NotificationService);
  readonly reportSvc = inject(ReportService);
  readonly auth = inject(AuthService);
  readonly iso = inject(IsoComplianceService);

  readonly exportando = signal(false);
  readonly cargando = signal(false);
  readonly guardando = signal(false);
  readonly backendDisponible = signal(true);
  readonly errorBackend = signal<string | null>(null);
  readonly reportes = signal<NetworkReport[]>([]);
  readonly seleccionado = signal<NetworkReport | null>(null);
  readonly modalForm = signal(false);
  readonly editando = signal(false);

  readonly types = REPORT_TYPES;
  readonly severities = REPORT_SEVERITIES;
  readonly statuses = REPORT_STATUSES;
  readonly typeLabels = REPORT_TYPE_LABELS;
  readonly severityLabels = REPORT_SEVERITY_LABELS;
  readonly statusLabels = REPORT_STATUS_LABELS;
  readonly isoStandards = ISO_STANDARDS;
  readonly isoStandardLabels = ISO_STANDARD_LABELS;
  readonly riesgoNiveles = RIESGO_NIVELES;
  readonly riesgoNivelLabels = RIESGO_NIVEL_LABELS;
  readonly tratamientos = TRATAMIENTOS_RIESGO;
  readonly tratamientoLabels = TRATAMIENTO_RIESGO_LABELS;
  readonly controlesIso = CONTROLES_ISO_27001;

  readonly items: ReporteItem[] = [
    { tipo: 'logs', titulo: 'Logs del sistema', desc: 'Eventos y auditoría en vivo' },
    { tipo: 'alertas', titulo: 'Alertas IDS', desc: 'Detecciones y estados' },
    { tipo: 'metricas', titulo: 'Métricas SOC', desc: 'KPIs del dashboard' },
    { tipo: 'auditoria', titulo: 'Auditoría de acciones', desc: 'Quién, cuándo y qué' },
    { tipo: 'incidentes', titulo: 'Incidentes', desc: 'Hosts comprometidos y aislados' },
    { tipo: 'auditoria', titulo: 'Cumplimiento ISO 27001', desc: 'Controles y evidencias SGSI' },
    { tipo: 'metricas', titulo: 'Calidad ISO 25000', desc: 'Métricas SQuaRE del software SOC' }
  ];

  readonly filtros = this.fb.group({
    from: [''],
    to: [''],
    type: ['' as ReportType | ''],
    severity: ['' as ReportSeverity | ''],
    status: ['' as ReportStatus | ''],
    vlanId: [''],
    deviceIp: ['']
  });

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(5000)]],
    type: ['INTRUSION_DETECTED' as ReportType, Validators.required],
    severity: ['MEDIUM' as ReportSeverity, Validators.required],
    status: ['OPEN' as ReportStatus, Validators.required],
    vlanId: [''],
    deviceIp: [''],
    deviceMac: [''],
    attackerIp: [''],
    actionTaken: [''],
    evidenceText: [''],
    logsText: [''],
    isoStandard: ['' as IsoStandard | ''],
    dimension: [''],
    controlIso: [''],
    riesgoNivel: ['' as RiesgoNivel | ''],
    impacto: [''],
    probabilidad: [''],
    activoAfectado: [''],
    amenaza: [''],
    vulnerabilidad: [''],
    tratamiento: ['' as TratamientoRiesgo | ''],
    evidenciaIsoText: ['']
  });

  readonly listaFiltrada = computed(() => this.reportes());

  ngOnInit(): void {
    this.cargarReportes();
    this.iso.cargarResumenBackend();
  }

  cargarReportes(): void {
    this.cargando.set(true);
    this.errorBackend.set(null);
    const f = this.filtros.getRawValue();
    const filters: ReportFilters = {
      from: f.from || undefined,
      to: f.to || undefined,
      type: (f.type || undefined) as ReportType | undefined,
      severity: (f.severity || undefined) as ReportSeverity | undefined,
      status: (f.status || undefined) as ReportStatus | undefined,
      vlanId: f.vlanId ? Number(f.vlanId) : undefined,
      deviceIp: f.deviceIp || undefined
    };

    this.reportSvc.getReports(filters).subscribe({
      next: data => {
        this.reportes.set(data);
        this.backendDisponible.set(true);
        this.cargando.set(false);
      },
      error: err => {
        this.backendDisponible.set(false);
        this.errorBackend.set(extraerMensajeError(err));
        this.reportes.set([]);
        this.cargando.set(false);
      }
    });
  }

  limpiarFiltros(): void {
    this.filtros.reset({
      from: '',
      to: '',
      type: '',
      severity: '',
      status: '',
      vlanId: '',
      deviceIp: ''
    });
    this.cargarReportes();
  }

  abrirCrear(): void {
    this.editando.set(false);
    this.form.reset({
      title: '',
      description: '',
      type: 'INTRUSION_DETECTED',
      severity: 'MEDIUM',
      status: 'OPEN',
      vlanId: '',
      deviceIp: '',
      deviceMac: '',
      attackerIp: '',
      actionTaken: '',
      evidenceText: '',
      logsText: '',
      isoStandard: '',
      dimension: '',
      controlIso: '',
      riesgoNivel: '',
      impacto: '',
      probabilidad: '',
      activoAfectado: '',
      amenaza: '',
      vulnerabilidad: '',
      tratamiento: '',
      evidenciaIsoText: ''
    });
    this.modalForm.set(true);
  }

  abrirEditar(r: NetworkReport): void {
    this.editando.set(true);
    this.seleccionado.set(r);
    this.form.patchValue({
      title: r.title,
      description: r.description,
      type: r.type,
      severity: r.severity,
      status: r.status,
      vlanId: r.vlanId != null ? String(r.vlanId) : '',
      deviceIp: r.deviceIp ?? '',
      deviceMac: r.deviceMac ?? '',
      attackerIp: r.attackerIp ?? '',
      actionTaken: r.actionTaken ?? '',
      evidenceText: (r.evidence ?? []).join('\n'),
      logsText: (r.logs ?? []).join('\n'),
      isoStandard: r.isoStandard ?? '',
      dimension: r.dimension ?? '',
      controlIso: r.controlIso ?? '',
      riesgoNivel: r.riesgoNivel ?? '',
      impacto: r.impacto != null ? String(r.impacto) : '',
      probabilidad: r.probabilidad != null ? String(r.probabilidad) : '',
      activoAfectado: r.activoAfectado ?? '',
      amenaza: r.amenaza ?? '',
      vulnerabilidad: r.vulnerabilidad ?? '',
      tratamiento: r.tratamiento ?? '',
      evidenciaIsoText: (r.evidenciaIso ?? []).join('\n')
    });
    this.modalForm.set(true);
  }

  cerrarModal(): void {
    this.modalForm.set(false);
    this.seleccionado.set(null);
  }

  verDetalle(r: NetworkReport): void {
    this.seleccionado.set(r);
  }

  cerrarDetalle(): void {
    this.seleccionado.set(null);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const payload: CreateReportPayload = {
      title: v.title!.trim(),
      description: v.description!.trim(),
      type: v.type!,
      severity: v.severity!,
      status: v.status!,
      vlanId: v.vlanId ? Number(v.vlanId) : undefined,
      deviceIp: v.deviceIp?.trim() || undefined,
      deviceMac: v.deviceMac?.trim() || undefined,
      attackerIp: v.attackerIp?.trim() || undefined,
      actionTaken: v.actionTaken?.trim() || undefined,
      createdBy: this.auth.usuario()?.nombre ?? 'Usuario SOC',
      evidence: this.splitLines(v.evidenceText),
      logs: this.splitLines(v.logsText),
      isoStandard: (v.isoStandard || undefined) as IsoStandard | undefined,
      dimension: v.dimension?.trim() || undefined,
      controlIso: v.controlIso?.trim() || undefined,
      riesgoNivel: (v.riesgoNivel || undefined) as RiesgoNivel | undefined,
      impacto: v.impacto ? Number(v.impacto) : undefined,
      probabilidad: v.probabilidad ? Number(v.probabilidad) : undefined,
      activoAfectado: v.activoAfectado?.trim() || undefined,
      amenaza: v.amenaza?.trim() || undefined,
      vulnerabilidad: v.vulnerabilidad?.trim() || undefined,
      tratamiento: (v.tratamiento || undefined) as TratamientoRiesgo | undefined,
      evidenciaIso: this.splitLines(v.evidenciaIsoText)
    };

    this.guardando.set(true);
    const req = this.editando() && this.seleccionado()
      ? this.reportSvc.updateReport(this.seleccionado()!._id, payload)
      : this.reportSvc.createReport(payload);

    req.subscribe({
      next: () => {
        this.notif.success(
          this.editando() ? 'Reporte actualizado' : 'Reporte registrado',
          payload.title
        );
        this.guardando.set(false);
        this.cerrarModal();
        this.cargarReportes();
      },
      error: err => {
        this.notif.error('No se pudo guardar', extraerMensajeError(err));
        this.guardando.set(false);
      }
    });
  }

  eliminar(r: NetworkReport): void {
    if (!confirm(`¿Eliminar el reporte "${r.title}"?`)) return;
    this.reportSvc.deleteReport(r._id).subscribe({
      next: () => {
        this.notif.info('Reporte eliminado', r.title);
        if (this.seleccionado()?._id === r._id) this.cerrarDetalle();
        this.cargarReportes();
      },
      error: err => this.notif.error('Error al eliminar', extraerMensajeError(err))
    });
  }

  descargarPdf(r: NetworkReport): void {
    this.reportSvc.downloadPdf(r._id).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte-${r._id}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.notif.success('PDF generado', r.title);
      },
      error: err => this.notif.error('Error al descargar PDF', extraerMensajeError(err))
    });
  }

  exportar(tipo: ReporteItem['tipo'], formato: FormatoExportacion): void {
    this.exportando.set(true);
    setTimeout(() => {
      this.exportSvc.exportar(tipo, formato);
      this.exportando.set(false);
      this.notif.success('Exportación completada', `Archivo ${formato.toUpperCase()} generado`);
    }, 400);
  }

  claseSeveridad(s: ReportSeverity): string {
    return { LOW: 'sev-low', MEDIUM: 'sev-med', HIGH: 'sev-high', CRITICAL: 'sev-crit' }[s];
  }

  claseEstado(s: ReportStatus): string {
    return { OPEN: 'st-open', IN_PROGRESS: 'st-progress', RESOLVED: 'st-resolved', ARCHIVED: 'st-archived' }[s];
  }

  semaforoRiesgo(nivel?: string): string {
    return this.iso.semaforoRiesgo(nivel ?? 'bajo');
  }

  exportarCumplimientoIso(formato: FormatoExportacion): void {
    this.exportar('auditoria', formato);
  }

  private splitLines(text: string | null | undefined): string[] {
    return (text ?? '')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
  }
}
