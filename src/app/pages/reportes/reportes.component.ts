import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportService, FormatoExportacion } from '../../core/services/export.service';
import { NotificationService } from '../../core/services/notification.service';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';

interface ReporteItem {
  tipo: 'logs' | 'alertas' | 'metricas' | 'auditoria' | 'incidentes';
  titulo: string;
  desc: string;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, PageShellComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {
  readonly exportSvc = inject(ExportService);
  readonly notif = inject(NotificationService);
  readonly exportando = signal(false);

  readonly items: ReporteItem[] = [
    { tipo: 'logs', titulo: 'Logs del sistema', desc: 'Eventos y auditoría en vivo' },
    { tipo: 'alertas', titulo: 'Alertas IDS', desc: 'Detecciones y estados' },
    { tipo: 'metricas', titulo: 'Métricas SOC', desc: 'KPIs del dashboard' },
    { tipo: 'auditoria', titulo: 'Auditoría de acciones', desc: 'Quién, cuándo y qué' },
    { tipo: 'incidentes', titulo: 'Incidentes', desc: 'Hosts comprometidos y aislados' }
  ];

  exportar(tipo: ReporteItem['tipo'], formato: FormatoExportacion): void {
    this.exportando.set(true);
    setTimeout(() => {
      this.exportSvc.exportar(tipo, formato);
      this.exportando.set(false);
      this.notif.success('Exportación completada', `Archivo ${formato.toUpperCase()} generado`);
    }, 400);
  }
}
