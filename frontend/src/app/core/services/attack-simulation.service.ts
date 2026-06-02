import { Injectable, inject, signal } from '@angular/core';
import { SimulacionAtaque, EstadoSimulacion, TipoAtaqueSimulado } from '../models/attack.models';
import { AlertaIntruso } from '../models/network.models';
import { MockNetworkService } from './mock-network.service';
import { NotificationCenterService } from './notification-center.service';
import { SocAiService } from './soc-ai.service';
import { AuditTrailService } from './audit-trail.service';
import { AuthService } from './auth.service';

export const ATAQUES_DISPONIBLES: SimulacionAtaque[] = [
  {
    id: 'bf',
    tipo: 'brute_force',
    nombre: 'Brute Force SSH',
    descripcion: 'Intentos masivos de autenticación contra servidor',
    icono: '🔐',
    severidad: 'alta',
    duracionSeg: 8
  },
  {
    id: 'ddos',
    tipo: 'ddos',
    nombre: 'DDoS volumétrico',
    descripcion: 'Saturación de ancho de banda en VLAN Distribución',
    icono: '🌊',
    severidad: 'critica',
    duracionSeg: 10
  },
  {
    id: 'sniff',
    tipo: 'sniffing',
    nombre: 'Sniffing ARP',
    descripcion: 'Captura pasiva de tráfico en segmento usuarios',
    icono: '👁',
    severidad: 'media',
    duracionSeg: 7
  },
  {
    id: 'unauth',
    tipo: 'acceso_no_autorizado',
    nombre: 'Acceso no autorizado',
    descripcion: 'Login exitoso desde IP no catalogada',
    icono: '🚪',
    severidad: 'alta',
    duracionSeg: 6
  },
  {
    id: 'scan',
    tipo: 'port_scan',
    nombre: 'Escaneo de puertos',
    descripcion: 'SYN scan en rango 1-1024',
    icono: '🔍',
    severidad: 'alta',
    duracionSeg: 7
  },
  {
    id: 'lat',
    tipo: 'movimiento_lateral',
    nombre: 'Movimiento lateral',
    descripcion: 'Propagación SMB entre hosts VLAN 30',
    icono: '↔',
    severidad: 'critica',
    duracionSeg: 9
  }
];

@Injectable({ providedIn: 'root' })
export class AttackSimulationService {
  private readonly mock = inject(MockNetworkService);
  private readonly notifCenter = inject(NotificationCenterService);
  private readonly ai = inject(SocAiService);
  private readonly audit = inject(AuditTrailService);
  private readonly auth = inject(AuthService);

  readonly estado = signal<EstadoSimulacion>({
    activa: false,
    ataqueId: null,
    progreso: 0,
    fase: 'Inactivo'
  });

  readonly ataques = ATAQUES_DISPONIBLES;

  iniciar(ataque: SimulacionAtaque): void {
    if (!this.auth.puede('simulate') && !this.auth.puede('write')) {
      return;
    }
    if (this.estado().activa) return;

    this.estado.set({
      activa: true,
      ataqueId: ataque.id,
      progreso: 0,
      fase: `Iniciando ${ataque.nombre}...`
    });

    this.audit.registrar('simulacion', 'LAB', `Simulación iniciada: ${ataque.nombre}`, true);
    this.mock.registrarLog('warn', 'SIM', `Ataque simulado: ${ataque.nombre}`);

    const pasos = 5;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progreso = Math.round((step / pasos) * 100);
      const fases = [
        'Generando tráfico malicioso...',
        'IDS analizando firmas...',
        'Correlación de eventos...',
        'Generando alerta...',
        'Completado'
      ];
      this.estado.update(s => ({
        ...s,
        progreso,
        fase: fases[step - 1] ?? 'Completado'
      }));

      if (step >= pasos) {
        clearInterval(interval);
        this.finalizar(ataque);
      }
    }, (ataque.duracionSeg * 1000) / pasos);
  }

  detener(): void {
    this.estado.set({ activa: false, ataqueId: null, progreso: 0, fase: 'Detenido' });
  }

  private finalizar(ataque: SimulacionAtaque): void {
    const alerta = this.crearAlerta(ataque.tipo);
    this.mock.agregarAlerta(alerta);

    this.notifCenter.push(
      `Ataque detectado: ${ataque.nombre}`,
      alerta.mensaje,
      'seguridad',
      ataque.severidad === 'critica' ? 'critica' : 'alta',
      { enlace: '/alertas', agrupacion: `sim-${ataque.id}` }
    );

    this.ai.explicarAlerta(alerta.id, alerta.mensaje);

    if (ataque.tipo === 'ddos') {
      this.mock.vlans.update(vlans =>
        vlans.map(v =>
          v.id === 40 ? { ...v, traficoMbps: Math.min(v.maxMbps, v.traficoMbps + 25) } : v
        )
      );
    }

    this.estado.set({
      activa: false,
      ataqueId: null,
      progreso: 100,
      fase: 'Simulación completada — revisar alertas'
    });

    this.audit.registrar(
      'simulacion',
      'IDS',
      `Detección automática tras ${ataque.nombre}`,
      ataque.severidad === 'critica'
    );
  }

  private crearAlerta(tipo: TipoAtaqueSimulado): AlertaIntruso {
    const map: Record<TipoAtaqueSimulado, string> = {
      brute_force: 'Múltiples intentos fallidos SSH — posible brute force',
      ddos: 'Volumen anómalo de tráfico — posible DDoS',
      sniffing: 'ARP spoofing detectado en VLAN usuarios',
      acceso_no_autorizado: 'Sesión iniciada desde IP no autorizada',
      port_scan: 'Escaneo SYN masivo en puertos 1-1024',
      movimiento_lateral: 'Propagación SMB — movimiento lateral detectado'
    };
    const id = `IDS-SIM-${Date.now().toString().slice(-4)}`;
    return {
      id,
      nivel: tipo === 'ddos' || tipo === 'movimiento_lateral' ? 'critico' : 'alto',
      mensaje: map[tipo],
      ip: '192.168.30.45',
      mac: 'AA:BB:CC:DD:EE:F5',
      puerto: tipo === 'port_scan' ? 443 : 22,
      vlan: 30,
      tiempo: 'Ahora',
      reconocida: false,
      accion: 'Investigar'
    };
  }
}
