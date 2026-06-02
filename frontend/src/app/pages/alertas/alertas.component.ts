import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { AlertaIntruso } from '../../core/models/network.models';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { ModalComponent } from '../../shared/components/modal/modal';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { etiquetaNivelAlerta } from '../../shared/utils/network-display.utils';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, ModalComponent, PageShellComponent],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.css'
})
export class AlertasComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly auth = inject(AuthService);
  readonly detalle = signal<AlertaIntruso | null>(null);
  readonly etiquetaNivel = etiquetaNivelAlerta;

  reconocer(a: AlertaIntruso): void {
    if (!this.auth.puede('write')) {
      this.notif.warning('Solo lectura', 'No puedes reconocer alertas.');
      return;
    }
    this.mock.reconocerAlerta(a.id);
    this.notif.info('Alerta reconocida', a.id);
  }

  reconocerTodas(): void {
    if (!this.auth.puede('write')) return;
    this.mock.alertas().filter(a => !a.reconocida).forEach(a => this.mock.reconocerAlerta(a.id));
    this.notif.success('Todas las alertas reconocidas');
  }

  aislarDesdeAlerta(a: AlertaIntruso): void {
    if (!this.auth.puedeAislar()) {
      this.notif.warning('Sin permisos', 'No puedes aislar hosts.');
      return;
    }
    const dev = this.mock.dispositivos().find(d => d.ip === a.ip);
    if (dev) {
      this.mock.aislarDispositivo(dev.id);
      this.notif.warning('Host aislado', `${dev.nombre} en VLAN 999`);
    } else {
      this.notif.error('No se encontró el host', a.ip);
    }
    this.detalle.set(null);
  }
}
