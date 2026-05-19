import { Injectable, computed, inject, signal } from '@angular/core';
import {
  AccionPolitica,
  EstadoPolitica,
  ImpactoPolitica,
  PoliticaSeguridad,
  TipoPolitica
} from '../models/policy.models';
import { SocEventService } from './soc-event.service';
import { NotificationService } from './notification.service';

const STORAGE_KEY = 'ng_politicas';

@Injectable({ providedIn: 'root' })
export class SecurityPolicyService {
  private readonly events = inject(SocEventService);
  private readonly notif = inject(NotificationService);

  private readonly _politicas = signal<PoliticaSeguridad[]>(this.cargarOInicial());
  private readonly _impactos = signal<ImpactoPolitica[]>([]);

  readonly politicas = this._politicas.asReadonly();
  readonly ultimosImpactos = this._impactos.asReadonly();
  readonly activas = computed(() => this._politicas().filter(p => p.activa && p.estado !== 'deshabilitada'));
  readonly criticas = computed(() => this._politicas().filter(p => p.estado === 'critica'));
  readonly totalImpactos = computed(() => this._politicas().reduce((s, p) => s + p.impactos, 0));

  crear(datos: Omit<PoliticaSeguridad, 'id' | 'impactos' | 'ultimaActivacion' | 'creadaEn'>): PoliticaSeguridad {
    const politica: PoliticaSeguridad = {
      ...datos,
      id: `POL-${Date.now()}`,
      impactos: 0,
      ultimaActivacion: null,
      creadaEn: new Date().toISOString()
    };
    this._politicas.update(list => [...list, politica]);
    this.persistir();
    this.events.emit('success', 'POLITICA', `Política creada: ${politica.nombre}`);
    this.notif.success('Política creada', politica.nombre);
    return politica;
  }

  actualizar(id: string, cambios: Partial<PoliticaSeguridad>): void {
    this._politicas.update(list =>
      list.map(p => (p.id === id ? { ...p, ...cambios } : p))
    );
    this.persistir();
    this.events.emit('info', 'POLITICA', `Política actualizada: ${id}`);
  }

  eliminar(id: string): void {
    const p = this._politicas().find(x => x.id === id);
    this._politicas.update(list => list.filter(x => x.id !== id));
    this.persistir();
    this.events.emit('warn', 'POLITICA', `Política eliminada: ${p?.nombre ?? id}`);
    this.notif.info('Política eliminada');
  }

  toggleActiva(id: string): void {
    const p = this._politicas().find(x => x.id === id);
    if (!p) return;
    const activa = !p.activa;
    const estado: EstadoPolitica = activa
      ? p.estado === 'deshabilitada'
        ? 'activa'
        : p.estado
      : 'deshabilitada';
    this.actualizar(id, {
      activa,
      estado,
      ultimaActivacion: activa ? new Date().toISOString() : p.ultimaActivacion
    });
    this.events.emit(
      activa ? 'success' : 'warn',
      'POLITICA',
      `Política ${activa ? 'activada' : 'desactivada'}: ${p.nombre}`
    );
    this.notif.info(activa ? 'Política activada' : 'Política desactivada', p.nombre);
  }

  registrarImpacto(id: string, cantidad = 1, descripcion?: string): void {
    const p = this._politicas().find(x => x.id === id);
    this._politicas.update(list =>
      list.map(x =>
        x.id === id
          ? { ...x, impactos: x.impactos + cantidad, ultimaActivacion: new Date().toISOString() }
          : x
      )
    );
    this.persistir();
    if (p && descripcion) {
      this.registrarImpactoVisible(p.id, p.nombre, descripcion);
    }
  }

  registrarImpactoVisible(politicaId: string, politicaNombre: string, descripcion: string): void {
    const entry: ImpactoPolitica = {
      id: `IMP-${Date.now()}`,
      politicaId,
      politicaNombre,
      descripcion,
      timestamp: new Date()
    };
    this._impactos.update(list => [entry, ...list].slice(0, 40));
  }

  porTipo(tipo: TipoPolitica): PoliticaSeguridad | undefined {
    return this.activas().find(p => p.tipo === tipo);
  }

  sincronizarReglas(): void {
    this.events.emit('info', 'POLITICA', 'Sincronización de reglas ACL iniciada');
    setTimeout(() => {
      this._politicas.update(list =>
        list.map(p => (p.activa ? { ...p, estado: 'activa' as EstadoPolitica } : p))
      );
      this.persistir();
      this.events.emit('success', 'POLITICA', 'Reglas sincronizadas con motor IDS/IPS');
      this.notif.success('Sincronización completa', 'Motor de políticas actualizado');
    }, 1200);
  }

  private persistir(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._politicas()));
  }

  private cargarOInicial(): PoliticaSeguridad[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as PoliticaSeguridad[];
    } catch {
      /* usar defaults */
    }
    return this.datosIniciales();
  }

  private datosIniciales(): PoliticaSeguridad[] {
    return [
      {
        id: 'POL-001',
        nombre: 'Bloquear tráfico sospechoso',
        descripcion: 'Drop de paquetes con firmas SMB/Ransomware y C2 conocidos',
        tipo: 'bloquear_trafico_sospechoso',
        estado: 'critica',
        activa: true,
        vlanIds: [30, 50],
        accion: 'bloquear',
        prioridad: 1,
        impactos: 14592,
        ultimaActivacion: new Date().toISOString(),
        creadaEn: '2026-01-10T08:00:00Z'
      },
      {
        id: 'POL-002',
        nombre: 'Aislar dispositivos desconocidos',
        descripcion: 'Mover hosts no inventariados a VLAN de cuarentena',
        tipo: 'aislar_desconocidos',
        estado: 'activa',
        activa: true,
        vlanIds: [999],
        accion: 'aislar',
        prioridad: 2,
        impactos: 23,
        ultimaActivacion: new Date().toISOString(),
        creadaEn: '2026-01-12T10:00:00Z'
      },
      {
        id: 'POL-003',
        nombre: 'Limitar accesos entre VLANs',
        descripcion: 'Restringe tráfico lateral entre segmentos de usuarios y servidores',
        tipo: 'limitar_vlan',
        estado: 'monitoreo',
        activa: true,
        vlanIds: [20, 30, 40],
        accion: 'monitorear',
        prioridad: 3,
        impactos: 8204,
        ultimaActivacion: new Date().toISOString(),
        creadaEn: '2026-01-15T14:00:00Z'
      },
      {
        id: 'POL-004',
        nombre: 'Detectar múltiples intentos fallidos',
        descripcion: 'Alerta tras 5 intentos SSH/RDP fallidos en 60 segundos',
        tipo: 'intentos_fallidos',
        estado: 'activa',
        activa: true,
        vlanIds: [10, 30],
        accion: 'alertar',
        prioridad: 4,
        impactos: 341,
        ultimaActivacion: new Date().toISOString(),
        creadaEn: '2026-02-01T09:00:00Z'
      },
      {
        id: 'POL-005',
        nombre: 'Cuarentena automática',
        descripcion: 'Aislamiento inmediato al detectar intruso confirmado por IDS',
        tipo: 'cuarentena_automatica',
        estado: 'critica',
        activa: true,
        vlanIds: [999],
        accion: 'aislar',
        prioridad: 1,
        impactos: 12,
        ultimaActivacion: new Date().toISOString(),
        creadaEn: '2026-02-10T11:00:00Z'
      },
      {
        id: 'POL-006',
        nombre: 'Bloqueo DNS externo',
        descripcion: 'Rechaza consultas DNS salientes no autorizadas',
        tipo: 'bloquear_trafico_sospechoso',
        estado: 'deshabilitada',
        activa: false,
        vlanIds: [20],
        accion: 'bloquear' as AccionPolitica,
        prioridad: 5,
        impactos: 0,
        ultimaActivacion: null,
        creadaEn: '2026-03-01T16:00:00Z'
      }
    ];
  }
}
