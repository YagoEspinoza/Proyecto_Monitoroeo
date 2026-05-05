import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface Dispositivo {
  id: string;
  nombre: string;
  ip: string;
  tipo: 'router' | 'switch' | 'servidor' | 'workstation';
  estado: 'activo' | 'inactivo' | 'degradado';
  latencia: number | null;
  uptime: number;
  ubicacion: string;
  vlan: number;
  paquetesPerdidos: number;
}

interface Alerta {
  id: string;
  nivel: 'critico' | 'alto' | 'advertencia' | 'info';
  mensaje: string;
  ip: string;
  puerto?: number;
  vlan?: number;
  tiempo: string;
  reconocida: boolean;
}

interface TraficoVlan {
  vlan: number;
  nombre: string;
  mbps: number;
  maximo: number;
  color: string;
}

@Component({
  selector: 'app-vision-general',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './vision-general.html',
  styleUrl: './vision-general.css',
})
export class VisionGeneral implements OnInit, OnDestroy {

  ahora = signal(new Date());
  private reloj: any;

  dispositivos = signal<Dispositivo[]>([
    { id: '1', nombre: 'RT-CORE-01', ip: '10.0.0.1',      tipo: 'router',      estado: 'activo',    latencia: 2,  uptime: 99.98, ubicacion: 'Rack A - U1', vlan: 10, paquetesPerdidos: 0 },
    { id: '2', nombre: 'RT-CORE-02', ip: '10.0.0.2',      tipo: 'router',      estado: 'activo',    latencia: 3,  uptime: 99.95, ubicacion: 'Rack A - U2', vlan: 10, paquetesPerdidos: 0 },
    { id: '3', nombre: 'SW-DIST-01', ip: '10.0.1.1',      tipo: 'switch',      estado: 'activo',    latencia: 1,  uptime: 100,   ubicacion: 'Rack B - U1', vlan: 40, paquetesPerdidos: 0 },
    { id: '4', nombre: 'SW-DIST-02', ip: '10.0.1.2',      tipo: 'switch',      estado: 'degradado', latencia: 45, uptime: 97.2,  ubicacion: 'Rack B - U2', vlan: 40, paquetesPerdidos: 3 },
    { id: '5', nombre: 'SRV-WEB-01', ip: '10.10.10.5',    tipo: 'servidor',    estado: 'activo',    latencia: 5,  uptime: 99.9,  ubicacion: 'Rack C - U3', vlan: 20, paquetesPerdidos: 0 },
    { id: '6', nombre: 'SRV-DB-01',  ip: '10.10.10.6',    tipo: 'servidor',    estado: 'activo',    latencia: 4,  uptime: 99.99, ubicacion: 'Rack C - U4', vlan: 20, paquetesPerdidos: 0 },
    { id: '7', nombre: 'WS-RRHH-05', ip: '192.168.30.45', tipo: 'workstation', estado: 'inactivo',  latencia: null, uptime: 0,   ubicacion: 'Piso 3',      vlan: 30, paquetesPerdidos: 0 },
    { id: '8', nombre: 'SW-ACC-01',  ip: '10.0.2.1',      tipo: 'switch',      estado: 'activo',    latencia: 2,  uptime: 100,   ubicacion: 'Rack D - U1', vlan: 40, paquetesPerdidos: 0 },
  ]);

  alertas = signal<Alerta[]>([
    { id: 'SYS-8902', nivel: 'critico',    mensaje: 'Posible escaneo SMB / Intento Ransomware contenido', ip: '192.168.30.45', puerto: 445, vlan: 30, tiempo: 'Hace 2 min',  reconocida: false },
    { id: 'SYS-8901', nivel: 'alto',       mensaje: 'Latencia alta detectada en SW-DIST-02 (45ms)',        ip: '10.0.1.2',      puerto: 0,   vlan: 40, tiempo: 'Hace 8 min',  reconocida: false },
    { id: 'SYS-8900', nivel: 'advertencia',mensaje: 'Tráfico DNS inusualmente alto desde VLAN 20',         ip: '172.16.5.100',  puerto: 53,  vlan: 20, tiempo: 'Hace 15 min', reconocida: false },
    { id: 'SYS-8899', nivel: 'info',       mensaje: 'HSRP Hello packet recibido correctamente',            ip: '10.0.0.1',      puerto: 1985,vlan: 10, tiempo: 'Hace 20 min', reconocida: true  },
    { id: 'SYS-8898', nivel: 'info',       mensaje: 'Backup completado exitosamente en SRV-DB-01',         ip: '10.10.10.6',    puerto: 0,   vlan: 20, tiempo: 'Hace 1h',     reconocida: true  },
  ]);

  traficoVlans = signal<TraficoVlan[]>([
    { vlan: 10, nombre: 'Administración', mbps: 12,  maximo: 100, color: '#6366f1' },
    { vlan: 20, nombre: 'Servidores',     mbps: 78,  maximo: 100, color: '#10b981' },
    { vlan: 30, nombre: 'Usuarios',       mbps: 45,  maximo: 100, color: '#f59e0b' },
    { vlan: 40, nombre: 'Distribución',   mbps: 91,  maximo: 100, color: '#f97316' },
    { vlan: 50, nombre: 'DMZ',            mbps: 23,  maximo: 100, color: '#3b82f6' },
  ]);

  get totalDispositivos() { return this.dispositivos().length; }
  get activosCount()      { return this.dispositivos().filter(d => d.estado === 'activo').length; }
  get inactivosCount()    { return this.dispositivos().filter(d => d.estado === 'inactivo').length; }
  get degradadosCount()   { return this.dispositivos().filter(d => d.estado === 'degradado').length; }
  get alertasCriticas()   { return this.alertas().filter(a => a.nivel === 'critico' && !a.reconocida).length; }
  get alertasPendientes() { return this.alertas().filter(a => !a.reconocida).length; }
  get uptimePromedio() {
    const activos = this.dispositivos().filter(d => d.estado === 'activo');
    return activos.length
      ? (activos.reduce((s, d) => s + d.uptime, 0) / activos.length).toFixed(2)
      : '0.00';
  }

  ngOnInit(): void {
    this.reloj = setInterval(() => this.ahora.set(new Date()), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.reloj);
  }

  iconoTipo(tipo: string): string {
    const map: any = { router: '⊕', switch: '⊞', servidor: '▣', workstation: '⊡' };
    return map[tipo] || '◈';
  }

  etiquetaNivel(nivel: string): string {
    const map: any = { critico: 'CRIT', alto: 'HIGH', advertencia: 'WARN', info: 'INFO' };
    return map[nivel] || nivel;
  }

  reconocerAlerta(id: string): void {
    this.alertas.update(lista =>
      lista.map(a => a.id === id ? { ...a, reconocida: true } : a)
    );
  }

  porcentajeTrafico(item: TraficoVlan): number {
    return Math.round((item.mbps / item.maximo) * 100);
  }
}