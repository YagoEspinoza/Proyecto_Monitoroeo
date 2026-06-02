import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { DispositivoRed } from '../../core/models/network.models';

@Component({
  selector: 'app-vlan-cuarentena',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, EmptyStateComponent, PageShellComponent],
  templateUrl: './vlan-cuarentena.component.html',
  styleUrl: './vlan-cuarentena.css'
})
export class VlanCuarentenaComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly auth = inject(AuthService);

  liberar(d: DispositivoRed): void {
    if (!this.auth.puedeAislar()) {
      this.notif.warning('Sin permisos', 'No puedes liberar hosts.');
      return;
    }
    this.mock.liberarDispositivo(d.id);
    this.notif.success('Host liberado', `${d.nombre} devuelto a la red corporativa`);
  }

  bloquearPermanente(d: DispositivoRed): void {
    if (!this.auth.puede('config')) {
      this.notif.warning('Sin permisos', 'Solo administradores pueden bloquear permanentemente.');
      return;
    }
    this.notif.error('Bloqueo permanente simulado', `${d.nombre} — registrado en auditoría`);
  }
}
