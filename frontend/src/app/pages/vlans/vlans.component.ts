import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { estadoVlanABadge, porcentajeCapacidad } from '../../shared/utils/network-display.utils';

@Component({
  selector: 'app-vlans',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusBadgeComponent, PageShellComponent],
  templateUrl: './vlans.component.html',
  styleUrl: './vlans.css'
})
export class VlansComponent {
  readonly mock = inject(MockNetworkService);
  readonly porcentaje = porcentajeCapacidad;
  readonly estadoVlan = estadoVlanABadge;

  vlansActivas() {
    return this.mock.vlans().filter(v => v.id !== 999);
  }
}
