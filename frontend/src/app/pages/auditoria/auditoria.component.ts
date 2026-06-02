import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { ExportService } from '../../core/services/export.service';
import { AuditTrailService } from '../../core/services/audit-trail.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';

const MODULOS_SOC = ['todos', 'POLITICA', 'CONFIG', 'IDS', 'VLAN', 'AUTO', 'RED'] as const;
type FiltroModulo = (typeof MODULOS_SOC)[number];

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, PageShellComponent],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.css'
})
export class AuditoriaComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly exportSvc = inject(ExportService);
  readonly audit = inject(AuditTrailService);

  readonly filtroNivel = signal<'todos' | 'info' | 'warn' | 'error' | 'success'>('todos');
  readonly filtroModulo = signal<FiltroModulo>('todos');
  readonly exportando = signal(false);
  readonly enVivo = signal(true);

  readonly modulos = MODULOS_SOC;

  readonly logsFiltrados = computed(() => {
    const fNivel = this.filtroNivel();
    const fMod = this.filtroModulo();
    let logs = this.mock.logs();
    if (fNivel !== 'todos') {
      logs = logs.filter(l => l.nivel === fNivel);
    }
    if (fMod !== 'todos') {
      logs = logs.filter(l => l.modulo === fMod);
    }
    return logs;
  });

  exportar(): void {
    this.exportando.set(true);
    setTimeout(() => {
      this.exportSvc.exportar('logs', 'csv');
      this.exportando.set(false);
    }, 400);
  }

  limpiarVista(): void {
    this.notif.info('Vista actualizada', 'Los eventos continúan en modo simulación en vivo');
  }

  toggleEnVivo(): void {
    this.enVivo.update(v => !v);
  }
}
