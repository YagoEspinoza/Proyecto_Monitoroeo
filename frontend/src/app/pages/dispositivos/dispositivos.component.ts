import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { DispositivoRed, EstadoSeguridad } from '../../core/models/network.models';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state';
import { ModalComponent } from '../../shared/components/modal/modal';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { iconoTipoDispositivo } from '../../shared/utils/network-display.utils';

@Component({
  selector: 'app-dispositivos',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    EmptyStateComponent,
    ModalComponent,
    PageShellComponent
  ],
  templateUrl: './dispositivos.component.html',
  styleUrl: './dispositivos.css'
})
export class DispositivosComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);
  readonly auth = inject(AuthService);

  readonly filtro = signal<'todos' | EstadoSeguridad>('todos');
  readonly busqueda = signal('');
  readonly seleccionado = signal<DispositivoRed | null>(null);

  readonly iconoTipo = iconoTipoDispositivo;

  readonly lista = computed(() => {
    let items = this.mock.dispositivos();
    const f = this.filtro();
    if (f !== 'todos') items = items.filter(d => d.seguridad === f);
    const q = this.busqueda().toLowerCase().trim();
    if (q) {
      items = items.filter(
        d =>
          d.nombre.toLowerCase().includes(q) ||
          d.ip.includes(q) ||
          d.mac.toLowerCase().includes(q)
      );
    }
    return items;
  });

  aislar(d: DispositivoRed): void {
    if (!this.auth.puedeAislar()) {
      this.notif.warning('Sin permisos', 'Tu rol no puede aislar dispositivos.');
      return;
    }
    this.mock.aislarDispositivo(d.id);
    this.seleccionado.set(null);
    this.notif.warning('Aislamiento ejecutado', `${d.nombre} → VLAN 999`);
  }

  liberar(d: DispositivoRed): void {
    if (!this.auth.puedeAislar()) {
      this.notif.warning('Sin permisos', 'Tu rol no puede liberar hosts.');
      return;
    }
    this.mock.liberarDispositivo(d.id);
    this.seleccionado.set(null);
    this.notif.success('Host liberado', `${d.nombre} restaurado a VLAN 30`);
  }
}
