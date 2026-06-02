import { Injectable, inject } from '@angular/core';
import { AlertaIntruso, NivelAlerta } from '../models/network.models';
import { SecurityPolicyService } from './security-policy.service';
import { SystemConfigService } from './system-config.service';
import { SocEventService } from './soc-event.service';
import { NotificationService } from './notification.service';

export interface RedMockActions {
  dispositivos: () => { id: string; nombre: string; seguridad: string }[];
  aislarDispositivo: (id: string) => void;
  agregarAlerta: (a: AlertaIntruso) => void;
}

/**
 * Motor de integración: aplica políticas y configuración sobre el estado de red mock.
 */
@Injectable({ providedIn: 'root' })
export class SocIntegrationService {
  private readonly policies = inject(SecurityPolicyService);
  private readonly config = inject(SystemConfigService);
  private readonly events = inject(SocEventService);
  private readonly notif = inject(NotificationService);

  ejecutarMotorPoliticas(red: RedMockActions): void {
    if (!this.config.config().simulacion.generarLogsAutomaticos) return;

    const activas = this.policies.activas();
    const factor = this.config.factorSensibilidad();

    for (const pol of activas) {
      switch (pol.tipo) {
        case 'cuarentena_automatica':
          this.aplicarCuarentenaAutomatica(red, pol.id);
          break;
        case 'bloquear_trafico_sospechoso':
          if (Math.random() < 0.15 * factor) {
            this.policies.registrarImpacto(
              pol.id,
              Math.floor(Math.random() * 50),
              'Tráfico bloqueado — firma coincidente'
            );
            this.events.emit('warn', 'POLITICA', `[${pol.nombre}] Tráfico bloqueado — firma coincidente`);
          }
          break;
        case 'intentos_fallidos':
          if (Math.random() < 0.12 * factor) {
            this.generarAlertaSimulada(red, 'advertencia', `Intentos fallidos detectados — política: ${pol.nombre}`);
            this.policies.registrarImpacto(pol.id, 1, 'Intentos de acceso fallidos detectados');
          }
          break;
        case 'limitar_vlan':
          if (Math.random() < 0.1 * factor) {
            this.events.emit('info', 'POLITICA', `[${pol.nombre}] Tráfico inter-VLAN limitado`);
            this.policies.registrarImpacto(
              pol.id,
              Math.floor(Math.random() * 20),
              'Tráfico inter-VLAN limitado'
            );
          }
          break;
        case 'aislar_desconocidos':
          if (Math.random() < 0.05 * factor) {
            this.events.emit('warn', 'POLITICA', `[${pol.nombre}] Host desconocido marcado para revisión`);
          }
          break;
      }
    }

    if (this.config.config().sensibilidad === 'alta' && Math.random() < 0.2) {
      this.generarAlertaSimulada(red, 'advertencia', 'Umbral de sensibilidad ALTA — evento adicional generado');
    }
  }

  private aplicarCuarentenaAutomatica(red: RedMockActions, politicaId: string): void {
    if (!this.config.config().simulacion.autoCuarentena) return;
    const intruso = red.dispositivos().find(d => d.seguridad === 'intruso');
    if (!intruso || Math.random() > 0.25) return;

    red.aislarDispositivo(intruso.id);
    this.policies.registrarImpacto(politicaId, 1, `Cuarentena automática: ${intruso.nombre}`);
    this.events.emit('error', 'AUTO', `Cuarentena automática: ${intruso.nombre} → VLAN 999`);
    if (this.config.config().alertas.notificacionesToast) {
      this.notif.threat('Amenaza aislada', `${intruso.nombre} movido a cuarentena automática`);
    }
  }

  private generarAlertaSimulada(red: RedMockActions, nivel: NivelAlerta, mensaje: string): void {
    const nueva: AlertaIntruso = {
      id: `IDS-${Date.now()}`,
      nivel,
      mensaje,
      ip: '192.168.30.' + Math.floor(Math.random() * 200),
      vlan: 30,
      tiempo: 'Ahora',
      reconocida: false
    };
    red.agregarAlerta(nueva);
  }
}
