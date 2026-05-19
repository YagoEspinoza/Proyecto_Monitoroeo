import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import {
  AlertaIntruso,
  DispositivoRed,
  EnlaceTopologia,
  EstadoSeguridad,
  LogSistema,
  MetricasDashboard,
  NodoTopologia,
  VlanSegmento
} from '../models/network.models';
import { SocEventService } from './soc-event.service';
import { SystemConfigService } from './system-config.service';
import { SecurityPolicyService } from './security-policy.service';
import { SocIntegrationService } from './soc-integration.service';
import { NotificationCenterService } from './notification-center.service';

@Injectable({ providedIn: 'root' })
export class MockNetworkService implements OnDestroy {
  private readonly events = inject(SocEventService);
  private readonly config = inject(SystemConfigService);
  private readonly integration = inject(SocIntegrationService);
  private readonly policies = inject(SecurityPolicyService);
  private readonly notifCenter = inject(NotificationCenterService);

  readonly cargando = signal(true);
  readonly modoSimulacion = signal(true);
  readonly reloj = signal(new Date());

  readonly dispositivos = signal<DispositivoRed[]>(this.datosInicialesDispositivos());
  readonly alertas = signal<AlertaIntruso[]>(this.datosInicialesAlertas());
  readonly vlans = signal<VlanSegmento[]>(this.datosInicialesVlans());
  readonly nodosTopologia = signal<NodoTopologia[]>(this.datosInicialesNodos());
  readonly enlacesTopologia = signal<EnlaceTopologia[]>(this.datosInicialesEnlaces());

  /** Logs unificados vía SocEventService */
  readonly logs = this.events.eventos;

  readonly vlanCuarentena = computed(() =>
    this.vlans().find(v => v.estado === 'cuarentena')
  );

  readonly dispositivosCuarentena = computed(() =>
    this.dispositivos().filter(d => d.seguridad === 'aislado' || d.vlan === 999)
  );

  readonly metricas = computed<MetricasDashboard>(() => {
    const devs = this.dispositivos();
    const alts = this.alertas();
    const activos = devs.filter(d => d.estado === 'activo');
    const intrusos = devs.filter(d => d.seguridad === 'intruso');
    const aislados = devs.filter(d => d.seguridad === 'aislado');
    const trafico = this.vlans().reduce((s, v) => s + v.traficoMbps, 0);

    let estadoGlobal: EstadoSeguridad = 'seguro';
    if (intrusos.length > 0) estadoGlobal = 'intruso';
    else if (aislados.length > 0) estadoGlobal = 'aislado';
    else if (alts.some(a => !a.reconocida && (a.nivel === 'critico' || a.nivel === 'alto')))
      estadoGlobal = 'alerta';

    return {
      dispositivosActivos: activos.length,
      dispositivosTotal: devs.length,
      alertasCriticas: alts.filter(a => a.nivel === 'critico' && !a.reconocida).length,
      alertasPendientes: alts.filter(a => !a.reconocida).length,
      intrusosDetectados: intrusos.length,
      enCuarentena: aislados.length,
      traficoTotalMbps: Math.round(trafico),
      uptimePromedio: activos.length
        ? +(activos.reduce((s, d) => s + d.uptime, 0) / activos.length).toFixed(2)
        : 0,
      estadoGlobal,
      politicasActivas: this.policies.activas().length,
      impactosPoliticas: this.policies.totalImpactos()
    };
  });

  private intervalos: ReturnType<typeof setInterval>[] = [];

  constructor() {
    this.events.cargarIniciales(this.datosInicialesLogs());
    setTimeout(() => this.cargando.set(false), 800);
    this.intervalos.push(
      setInterval(() => this.reloj.set(new Date()), 1000),
      setInterval(() => this.simularTrafico(), 3000),
      setInterval(() => this.simularLatencia(), 5000),
      setInterval(() => this.agregarLogAleatorio(), 7000),
      setInterval(() => this.cicloIntegracion(), 12000)
    );
  }

  ngOnDestroy(): void {
    this.intervalos.forEach(clearInterval);
  }

  reconocerAlerta(id: string): void {
    this.alertas.update(lista =>
      lista.map(a => (a.id === id ? { ...a, reconocida: true } : a))
    );
    this.registrarLog('success', 'IDS', `Alerta ${id} reconocida por operador`);
  }

  agregarAlerta(alerta: AlertaIntruso): void {
    this.alertas.update(list => [alerta, ...list].slice(0, 50));
    if (!alerta.reconocida && (alerta.nivel === 'critico' || alerta.nivel === 'alto')) {
      this.notifCenter.push(
        `Nueva alerta ${alerta.id}`,
        alerta.mensaje,
        'seguridad',
        alerta.nivel === 'critico' ? 'critica' : 'alta',
        { enlace: '/alertas', agrupacion: 'ids-live' }
      );
    }
  }

  aislarDispositivo(id: string): void {
    this.dispositivos.update(lista =>
      lista.map(d =>
        d.id === id
          ? { ...d, seguridad: 'aislado' as EstadoSeguridad, vlan: 999, estado: 'degradado' }
          : d
      )
    );
    const dev = this.dispositivos().find(d => d.id === id);
    this.registrarLog('warn', 'VLAN', `Dispositivo ${dev?.nombre} aislado en VLAN 999 (cuarentena)`);
    this.vlans.update(vlans =>
      vlans.map(v =>
        v.id === 999 ? { ...v, dispositivos: this.dispositivosCuarentena().length } : v
      )
    );
    const pol = this.policies.porTipo('cuarentena_automatica');
    if (pol) this.policies.registrarImpacto(pol.id, 1);
  }

  liberarDispositivo(id: string): void {
    this.dispositivos.update(lista =>
      lista.map(d =>
        d.id === id
          ? { ...d, seguridad: 'seguro' as EstadoSeguridad, vlan: 30, estado: 'activo' }
          : d
      )
    );
    this.registrarLog('success', 'VLAN', `Dispositivo liberado de cuarentena`);
  }

  escanearRed(): Promise<void> {
    this.cargando.set(true);
    this.registrarLog('info', 'SCAN', 'Escaneo de red iniciado...');
    return new Promise(resolve => {
      setTimeout(() => {
        this.cargando.set(false);
        this.registrarLog('success', 'SCAN', 'Escaneo completado — 12 hosts respondieron');
        resolve();
      }, 2000);
    });
  }

  registrarLog(nivel: LogSistema['nivel'], modulo: string, mensaje: string): void {
    this.events.emit(nivel, modulo, mensaje);
  }

  private cicloIntegracion(): void {
    this.integration.ejecutarMotorPoliticas({
      dispositivos: () => this.dispositivos(),
      aislarDispositivo: id => this.aislarDispositivo(id),
      agregarAlerta: a => this.agregarAlerta(a)
    });
    this.simularEventoRed();
  }

  private simularLatencia(): void {
    this.dispositivos.update(lista =>
      lista.map(d => {
        if (d.estado === 'inactivo' || d.seguridad === 'aislado') return d;
        const delta = Math.round((Math.random() - 0.5) * 8);
        const latencia = d.latencia === null ? 5 : Math.max(1, d.latencia + delta);
        return { ...d, latencia };
      })
    );
  }

  private simularEventoRed(): void {
    if (Math.random() > 0.35) return;
    const intruso = this.dispositivos().find(d => d.seguridad === 'intruso');
    if (intruso && Math.random() > 0.7) {
      this.registrarLog('warn', 'IDS', `Actividad sospechosa continua en ${intruso.nombre}`);
    }
  }

  private simularTrafico(): void {
    if (!this.config.config().monitoreo.simularTraficoEnVivo) return;
    this.vlans.update(vlans =>
      vlans.map(v => ({
        ...v,
        traficoMbps: Math.max(
          1,
          Math.min(v.maxMbps, v.traficoMbps + (Math.random() * 10 - 5))
        )
      }))
    );
  }

  private agregarLogAleatorio(): void {
    if (!this.config.config().simulacion.generarLogsAutomaticos) return;
    const mensajes = [
      ['info', 'NETFLOW', 'Flujo ICMP normalizado en VLAN 20'],
      ['info', 'HSRP', 'Hello packet recibido de RT-CORE-01'],
      ['warn', 'IDS', 'Patrón de escaneo de puertos detectado (contenido)'],
      ['info', 'DHCP', 'Lease renovado 192.168.30.112'],
      ['success', 'ACL', 'Regla de firewall aplicada correctamente']
    ] as const;
    const [nivel, modulo, mensaje] = mensajes[Math.floor(Math.random() * mensajes.length)];
    this.registrarLog(nivel, modulo, mensaje);
  }

  private datosInicialesDispositivos(): DispositivoRed[] {
    return [
      { id: '1', nombre: 'RT-CORE-01', ip: '10.0.0.1', mac: '00:1A:2B:3C:4D:01', tipo: 'router', vlan: 10, ubicacion: 'Rack A-U1', estado: 'activo', seguridad: 'seguro', latencia: 2, uptime: 99.98, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '2', nombre: 'RT-CORE-02', ip: '10.0.0.2', mac: '00:1A:2B:3C:4D:02', tipo: 'router', vlan: 10, ubicacion: 'Rack A-U2', estado: 'activo', seguridad: 'seguro', latencia: 3, uptime: 99.95, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '3', nombre: 'SW-DIST-01', ip: '10.0.1.1', mac: '00:1A:2B:3C:4D:03', tipo: 'switch', vlan: 40, ubicacion: 'Rack B-U1', estado: 'activo', seguridad: 'seguro', latencia: 1, uptime: 100, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '4', nombre: 'SW-DIST-02', ip: '10.0.1.2', mac: '00:1A:2B:3C:4D:04', tipo: 'switch', vlan: 40, ubicacion: 'Rack B-U2', estado: 'degradado', seguridad: 'alerta', latencia: 45, uptime: 97.2, paquetesPerdidos: 3, ultimaActividad: 'Hace 1 min' },
      { id: '5', nombre: 'SRV-WEB-01', ip: '10.10.10.5', mac: '00:1A:2B:3C:4D:05', tipo: 'servidor', vlan: 20, ubicacion: 'Rack C-U3', estado: 'activo', seguridad: 'seguro', latencia: 5, uptime: 99.9, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '6', nombre: 'SRV-DB-01', ip: '10.10.10.6', mac: '00:1A:2B:3C:4D:06', tipo: 'servidor', vlan: 20, ubicacion: 'Rack C-U4', estado: 'activo', seguridad: 'seguro', latencia: 4, uptime: 99.99, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '7', nombre: 'WS-RRHH-05', ip: '192.168.30.45', mac: 'AA:BB:CC:DD:EE:F5', tipo: 'workstation', vlan: 30, ubicacion: 'Piso 3', estado: 'degradado', seguridad: 'intruso', latencia: 120, uptime: 45.2, paquetesPerdidos: 12, ultimaActividad: 'Hace 2 min' },
      { id: '8', nombre: 'SW-ACC-01', ip: '10.0.2.1', mac: '00:1A:2B:3C:4D:08', tipo: 'switch', vlan: 40, ubicacion: 'Rack D-U1', estado: 'activo', seguridad: 'seguro', latencia: 2, uptime: 100, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '9', nombre: 'FW-EDGE-01', ip: '172.16.5.1', mac: '00:1A:2B:3C:4D:09', tipo: 'firewall', vlan: 50, ubicacion: 'DMZ', estado: 'activo', seguridad: 'seguro', latencia: 8, uptime: 99.7, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '10', nombre: 'WS-INV-12', ip: '192.168.30.88', mac: '11:22:33:44:55:66', tipo: 'workstation', vlan: 999, ubicacion: 'Cuarentena', estado: 'degradado', seguridad: 'aislado', latencia: null, uptime: 0, paquetesPerdidos: 0, ultimaActividad: 'Aislado' },
      { id: '11', nombre: 'WS-FIN-03', ip: '192.168.30.21', mac: '77:88:99:AA:BB:CC', tipo: 'workstation', vlan: 30, ubicacion: 'Piso 2', estado: 'activo', seguridad: 'seguro', latencia: 6, uptime: 98.5, paquetesPerdidos: 0, ultimaActividad: 'Ahora' },
      { id: '12', nombre: 'WS-DEV-07', ip: '192.168.30.77', mac: 'DE:AD:BE:EF:00:07', tipo: 'workstation', vlan: 30, ubicacion: 'Piso 4', estado: 'inactivo', seguridad: 'alerta', latencia: null, uptime: 0, paquetesPerdidos: 0, ultimaActividad: 'Hace 15 min' }
    ];
  }

  private datosInicialesAlertas(): AlertaIntruso[] {
    return [
      { id: 'IDS-9042', nivel: 'critico', mensaje: 'Escaneo SMB / posible movimiento lateral — host comprometido', ip: '192.168.30.45', mac: 'AA:BB:CC:DD:EE:F5', puerto: 445, vlan: 30, tiempo: 'Hace 2 min', reconocida: false, accion: 'Aislar' },
      { id: 'IDS-9041', nivel: 'alto', mensaje: 'Tráfico saliente anómalo hacia IP externa (C2 sospechoso)', ip: '192.168.30.45', puerto: 443, vlan: 30, tiempo: 'Hace 5 min', reconocida: false },
      { id: 'IDS-9040', nivel: 'alto', mensaje: 'Latencia elevada en SW-DIST-02 (45ms)', ip: '10.0.1.2', vlan: 40, tiempo: 'Hace 8 min', reconocida: false },
      { id: 'IDS-9039', nivel: 'advertencia', mensaje: 'Volumen DNS inusual en VLAN Servidores', ip: '10.10.10.5', puerto: 53, vlan: 20, tiempo: 'Hace 15 min', reconocida: false },
      { id: 'IDS-9038', nivel: 'info', mensaje: 'Host WS-INV-12 aislado automáticamente en VLAN 999', ip: '192.168.30.88', vlan: 999, tiempo: 'Hace 1h', reconocida: true, accion: 'Aislado' },
      { id: 'IDS-9037', nivel: 'info', mensaje: 'HSRP failover test completado sin incidencias', ip: '10.0.0.1', vlan: 10, tiempo: 'Hace 2h', reconocida: true }
    ];
  }

  private datosInicialesVlans(): VlanSegmento[] {
    return [
      { id: 10, nombre: 'Administración', rango: '10.0.0.0/24', gateway: '10.0.0.1', dispositivos: 2, traficoMbps: 12, maxMbps: 100, color: '#6366f1', estado: 'operativa', seguridad: 'seguro' },
      { id: 20, nombre: 'Servidores', rango: '10.10.10.0/24', gateway: '10.10.10.1', dispositivos: 2, traficoMbps: 78, maxMbps: 100, color: '#10b981', estado: 'operativa', seguridad: 'seguro' },
      { id: 30, nombre: 'Usuarios', rango: '192.168.30.0/24', gateway: '192.168.30.1', dispositivos: 4, traficoMbps: 52, maxMbps: 100, color: '#f59e0b', estado: 'incidente', seguridad: 'intruso' },
      { id: 40, nombre: 'Distribución', rango: '10.0.1.0/24', gateway: '10.0.1.1', dispositivos: 3, traficoMbps: 91, maxMbps: 100, color: '#f97316', estado: 'degradada', seguridad: 'alerta' },
      { id: 50, nombre: 'DMZ', rango: '172.16.5.0/24', gateway: '172.16.5.1', dispositivos: 1, traficoMbps: 23, maxMbps: 100, color: '#3b82f6', estado: 'operativa', seguridad: 'seguro' },
      { id: 999, nombre: 'Cuarentena', rango: '192.168.99.0/24', gateway: '192.168.99.1', dispositivos: 1, traficoMbps: 2, maxMbps: 50, color: '#ef4444', estado: 'cuarentena', seguridad: 'aislado' }
    ];
  }

  private datosInicialesLogs(): LogSistema[] {
    const base = new Date();
    return [
      { id: 'L1', timestamp: new Date(base.getTime() - 1000), nivel: 'error', modulo: 'IDS', mensaje: 'Intruso detectado: WS-RRHH-05 — firma ransomware SMB' },
      { id: 'L2', timestamp: new Date(base.getTime() - 5000), nivel: 'warn', modulo: 'POLITICA', mensaje: 'Política de aislamiento activada para VLAN 30' },
      { id: 'L3', timestamp: new Date(base.getTime() - 12000), nivel: 'success', modulo: 'AUTO', mensaje: 'WS-INV-12 movido a VLAN 999 (cuarentena)' },
      { id: 'L4', timestamp: new Date(base.getTime() - 30000), nivel: 'info', modulo: 'NETFLOW', mensaje: 'Exportación NetFlow v9 — 1.2k registros/min' },
      { id: 'L5', timestamp: new Date(base.getTime() - 60000), nivel: 'info', modulo: 'CONFIG', mensaje: 'Sistema iniciado en modo simulación SOC' }
    ];
  }

  private datosInicialesNodos(): NodoTopologia[] {
    return [
      { id: 'rt1', label: 'RT-CORE-01', ip: '10.0.0.1', tipo: 'router', x: 50, y: 15, seguridad: 'seguro' },
      { id: 'rt2', label: 'RT-CORE-02', ip: '10.0.0.2', tipo: 'router', x: 50, y: 35, seguridad: 'seguro' },
      { id: 'fw1', label: 'FW-EDGE', ip: '172.16.5.1', tipo: 'firewall', x: 50, y: 85, seguridad: 'seguro' },
      { id: 'sw1', label: 'SW-DIST-01', ip: '10.0.1.1', tipo: 'switch', x: 20, y: 55, seguridad: 'seguro' },
      { id: 'sw2', label: 'SW-DIST-02', ip: '10.0.1.2', tipo: 'switch', x: 80, y: 55, seguridad: 'alerta' },
      { id: 'srv', label: 'SRV-WEB', ip: '10.10.10.5', tipo: 'servidor', x: 20, y: 80, seguridad: 'seguro' },
      { id: 'ws1', label: 'WS-RRHH', ip: '192.168.30.45', tipo: 'workstation', x: 80, y: 80, seguridad: 'intruso' },
      { id: 'q1', label: 'CUARENTENA', ip: 'VLAN 999', tipo: 'switch', x: 50, y: 65, seguridad: 'aislado' }
    ];
  }

  private datosInicialesEnlaces(): EnlaceTopologia[] {
    return [
      { desde: 'rt1', hasta: 'sw1', activo: true },
      { desde: 'rt1', hasta: 'sw2', activo: true },
      { desde: 'rt2', hasta: 'sw1', activo: true },
      { desde: 'rt2', hasta: 'sw2', activo: true },
      { desde: 'sw1', hasta: 'srv', activo: true },
      { desde: 'sw2', hasta: 'ws1', activo: true },
      { desde: 'sw2', hasta: 'q1', activo: true },
      { desde: 'rt1', hasta: 'fw1', activo: true }
    ];
  }
}
