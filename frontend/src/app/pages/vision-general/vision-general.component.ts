import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { SecurityPolicyService } from '../../core/services/security-policy.service';
import { SystemConfigService } from '../../core/services/system-config.service';
import { DashboardLayoutService, WidgetId } from '../../core/services/dashboard-layout.service';
import { DispositivoRed } from '../../core/models/network.models';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { ModalComponent } from '../../shared/components/modal/modal';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { ChartWidgetComponent } from '../../shared/components/chart-widget/chart-widget';
import {
  etiquetaNivelAlerta,
  iconoTipoDispositivo,
  porcentajeCapacidad
} from '../../shared/utils/network-display.utils';

@Component({
  selector: 'app-vision-general',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterModule,
    KpiCardComponent,
    StatusBadgeComponent,
    ModalComponent,
    PageShellComponent,
    ChartWidgetComponent
  ],
  templateUrl: './vision-general.component.html',
  styleUrl: './vision-general.css'
})
export class VisionGeneralComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly auth = inject(AuthService);
  readonly policies = inject(SecurityPolicyService);
  readonly config = inject(SystemConfigService);
  readonly layout = inject(DashboardLayoutService);

  readonly modalDispositivo = signal<DispositivoRed | null>(null);

  widgetVisible(id: WidgetId): boolean {
    return this.layout.widgets().find(w => w.id === id)?.visible ?? true;
  }

  moverWidget(id: WidgetId, dir: -1 | 1): void {
    this.layout.mover(id, dir);
  }

  readonly iconoTipo = iconoTipoDispositivo;
  readonly etiquetaNivel = etiquetaNivelAlerta;
  readonly porcentajeTrafico = porcentajeCapacidad;

  reconocer(id: string): void {
    if (!this.auth.puede('write')) {
      this.notif.warning('Solo lectura', 'Tu rol no puede reconocer alertas.');
      return;
    }
    this.mock.reconocerAlerta(id);
    this.notif.info('Alerta reconocida', `ID ${id} marcada como atendida`);
  }

  aislar(dev: DispositivoRed): void {
    if (!this.auth.puedeAislar()) {
      this.notif.warning('Sin permisos', 'No puedes aislar dispositivos.');
      return;
    }
    this.mock.aislarDispositivo(dev.id);
    this.modalDispositivo.set(null);
    this.notif.warning('Host aislado', `${dev.nombre} movido a VLAN 999`);
  }

  verDispositivo(dev: DispositivoRed): void {
    this.modalDispositivo.set(dev);
  }

  cerrarModal(): void {
    this.modalDispositivo.set(null);
  }
}
