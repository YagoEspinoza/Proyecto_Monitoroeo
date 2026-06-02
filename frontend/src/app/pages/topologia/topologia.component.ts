import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockNetworkService } from '../../core/services/mock-network.service';
import { NotificationService } from '../../core/services/notification.service';
import { EstadoSeguridad, EnlaceTopologia, NodoTopologia } from '../../core/models/network.models';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { colorEstadoSeguridad } from '../../shared/utils/network-display.utils';

@Component({
  selector: 'app-topologia',
  standalone: true,
  imports: [CommonModule, PageShellComponent],
  templateUrl: './topologia.component.html',
  styleUrl: './topologia.css'
})
export class TopologiaComponent {
  readonly mock = inject(MockNetworkService);
  readonly notif = inject(NotificationService);

  readonly zoom = signal(1);
  readonly nodoSeleccionado = signal<NodoTopologia | null>(null);

  readonly colorSeguridad = colorEstadoSeguridad;

  readonly tick = computed(() => this.mock.reloj().getSeconds());

  esOnline(n: NodoTopologia): boolean {
    return n.seguridad !== 'aislado';
  }

  enlaceActivo(e: EnlaceTopologia): boolean {
    return e.activo && this.tick() % 2 === 0;
  }

  zoomIn(): void {
    this.zoom.update(z => Math.min(1.5, z + 0.1));
  }

  zoomOut(): void {
    this.zoom.update(z => Math.max(0.6, z - 0.1));
  }

  centrar(): void {
    this.zoom.set(1);
    this.nodoSeleccionado.set(null);
    this.notif.info('Vista centrada');
  }

  seleccionar(n: NodoTopologia): void {
    this.nodoSeleccionado.set(n);
  }

  linea(enlace: { desde: string; hasta: string }): { x1: number; y1: number; x2: number; y2: number } | null {
    const nodos = this.mock.nodosTopologia();
    const a = nodos.find(n => n.id === enlace.desde);
    const b = nodos.find(n => n.id === enlace.hasta);
    if (!a || !b) return null;
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }
}
