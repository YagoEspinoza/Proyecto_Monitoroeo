import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttackSimulationService } from '../../core/services/attack-simulation.service';
import { SocAiService } from '../../core/services/soc-ai.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { PageShellComponent } from '../../shared/components/page-shell/page-shell';
import { SimulacionAtaque } from '../../core/models/attack.models';

@Component({
  selector: 'app-simulacion-ataques',
  standalone: true,
  imports: [CommonModule, PageShellComponent],
  templateUrl: './simulacion-ataques.component.html',
  styleUrl: './simulacion-ataques.css'
})
export class SimulacionAtaquesComponent {
  readonly sim = inject(AttackSimulationService);
  readonly ai = inject(SocAiService);
  readonly auth = inject(AuthService);
  readonly notif = inject(NotificationService);

  lanzar(ataque: SimulacionAtaque): void {
    if (!this.auth.puede('simulate') && !this.auth.puede('write')) {
      this.notif.warning('Sin permisos', 'Tu rol no puede ejecutar simulaciones.');
      return;
    }
    this.sim.iniciar(ataque);
    this.notif.info('Simulación iniciada', ataque.nombre);
  }

  consultarAi(): void {
    this.ai.abrir();
    this.ai.enviarMensaje('¿Qué hacer tras detectar un ataque simulado?');
  }
}
