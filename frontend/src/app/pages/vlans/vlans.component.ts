import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { IsoComplianceService } from '../../core/services/iso-compliance.service';
import { AREA_VLAN_LABELS } from '../../core/constants/iso.constants';
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
  readonly iso = inject(IsoComplianceService);
  readonly areaLabels = AREA_VLAN_LABELS;
  readonly porcentaje = porcentajeCapacidad;
  readonly estadoVlan = estadoVlanABadge;

  vlansActivas() {
    return this.mock.vlans().filter(v => v.id !== 999);
  }

  etiquetaArea(area: string): string {
    return this.areaLabels[area as keyof typeof this.areaLabels] ?? area;
  }
}
