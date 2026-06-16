import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CONTROLES_ISO_27001,
  DIMENSIONES_MATRIZ,
  METRICAS_ISO_25000,
  MODULOS_SISTEMA,
  POLITICAS_TRAFICO_VLAN
} from '../constants/iso.constants';
import {
  ControlISO27001,
  CumplimientoISO,
  EvaluacionCalidadSoftware,
  EventoDisponibilidad,
  GatewayHA,
  IndicadorConfianzaInstitucional,
  KpiDisponibilidadRed,
  MetricaISO25000,
  ResilienciaInfraestructura,
  RiesgoTI,
  VulnerabilidadTI
} from '../models/iso.models';
import { MockNetworkService } from './mock-network.service';
import { SecurityPolicyService } from './security-policy.service';
import { AuditTrailService } from './audit-trail.service';

@Injectable({ providedIn: 'root' })
export class IsoComplianceService {
  private readonly mock = inject(MockNetworkService);
  private readonly policies = inject(SecurityPolicyService);
  private readonly audit = inject(AuditTrailService);
  private readonly http = inject(HttpClient);

  readonly complianceBackend = signal<{
    iso27001Pct: number;
    iso25000Pct: number;
    generalPct: number;
  } | null>(null);

  readonly gateways = signal<GatewayHA[]>([
    {
      id: 'gw1',
      nombre: 'RT-CORE-01',
      ip: '10.0.0.1',
      rol: 'activo',
      protocolo: 'HSRP',
      uptime: 99.98,
      tiempoRecuperacionSeg: 4
    },
    {
      id: 'gw2',
      nombre: 'RT-CORE-02',
      ip: '10.0.0.2',
      rol: 'respaldo',
      protocolo: 'HSRP',
      uptime: 99.95,
      ultimoFailover: 'Hace 2h — test sin incidencias',
      tiempoRecuperacionSeg: 4
    }
  ]);

  readonly eventosDisponibilidad = signal<EventoDisponibilidad[]>([
    {
      id: 'ev1',
      tipo: 'failover',
      componente: 'Gateway HSRP',
      descripcion: 'Failover test RT-CORE-01 → RT-CORE-02 completado',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      duracionSeg: 4,
      resuelto: true
    },
    {
      id: 'ev2',
      tipo: 'degradacion',
      componente: 'SW-DIST-02',
      descripcion: 'Latencia elevada en switch de distribución',
      timestamp: new Date(Date.now() - 480000).toISOString(),
      resuelto: false
    },
    {
      id: 'ev3',
      tipo: 'recuperacion',
      componente: 'SRV-WEB-01',
      descripcion: 'Servicio web restaurado tras reinicio controlado',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      duracionSeg: 120,
      resuelto: true
    }
  ]);

  readonly vulnerabilidades = computed<VulnerabilidadTI[]>(() => {
    const devs = this.mock.dispositivos();
    const alts = this.mock.alertas();
    const vulns: VulnerabilidadTI[] = [];

    const intruso = devs.find(d => d.seguridad === 'intruso');
    if (intruso) {
      vulns.push({
        id: 'VUL-001',
        tipo: 'dispositivo_comprometido',
        titulo: 'Host comprometido — movimiento lateral SMB',
        descripcion: 'Escaneo SMB detectado en estación de trabajo',
        estado: 'en_analisis',
        severidad: 'critico',
        dispositivoId: intruso.id,
        dispositivoNombre: intruso.nombre,
        vlanId: intruso.vlan,
        alertaId: 'IDS-9042',
        detectadaEn: new Date().toISOString()
      });
    }

    const degradado = devs.find(d => d.estado === 'degradado' && d.paquetesPerdidos > 0);
    if (degradado) {
      vulns.push({
        id: 'VUL-002',
        tipo: 'snmp_perdido',
        titulo: 'Pérdida parcial de conectividad SNMP',
        descripcion: `${degradado.nombre}: ${degradado.paquetesPerdidos} paquetes perdidos`,
        estado: 'detectada',
        severidad: 'medio',
        dispositivoId: degradado.id,
        dispositivoNombre: degradado.nombre,
        vlanId: degradado.vlan,
        detectadaEn: new Date().toISOString()
      });
    }

    const puertoSospechoso = alts.find(a => a.puerto === 445);
    if (puertoSospechoso) {
      vulns.push({
        id: 'VUL-003',
        tipo: 'puerto_sospechoso',
        titulo: 'Puerto SMB expuesto (445)',
        descripcion: puertoSospechoso.mensaje,
        estado: 'detectada',
        severidad: 'alto',
        dispositivoId: intruso?.id,
        vlanId: puertoSospechoso.vlan,
        alertaId: puertoSospechoso.id,
        puerto: 445,
        detectadaEn: new Date().toISOString()
      });
    }

    const traficoAnomalo = alts.find(a => a.mensaje.toLowerCase().includes('anómalo') || a.mensaje.toLowerCase().includes('inusual'));
    if (traficoAnomalo) {
      vulns.push({
        id: 'VUL-004',
        tipo: 'trafico_anomalo',
        titulo: 'Tráfico anómalo detectado',
        descripcion: traficoAnomalo.mensaje,
        estado: 'mitigada',
        severidad: 'medio',
        vlanId: traficoAnomalo.vlan,
        alertaId: traficoAnomalo.id,
        detectadaEn: new Date().toISOString()
      });
    }

    return vulns;
  });

  readonly riesgos = computed<RiesgoTI[]>(() => {
    const vulns = this.vulnerabilidades();
    return vulns.map((v, i) => ({
      id: `RISK-${String(i + 1).padStart(3, '0')}`,
      activoAfectado: v.dispositivoNombre ?? `VLAN ${v.vlanId ?? '—'}`,
      amenaza: v.tipo === 'dispositivo_comprometido' ? 'Ransomware / movimiento lateral' : 'Degradación de servicio',
      vulnerabilidad: v.titulo,
      impacto: v.severidad === 'critico' ? 5 : v.severidad === 'alto' ? 4 : 3,
      probabilidad: v.estado === 'cerrada' ? 1 : v.severidad === 'critico' ? 4 : 3,
      nivel: v.severidad,
      tratamiento: v.estado === 'mitigada' ? 'mitigar' as const : 'mitigar' as const,
      controlIso: v.tipo === 'dispositivo_comprometido' ? 'A.8.7' : 'A.8.16',
      dimension: 'gestion_riesgos_ti' as const,
      alertaId: v.alertaId,
      dispositivoId: v.dispositivoId,
      fechaIdentificacion: v.detectadaEn
    }));
  });

  readonly kpiDisponibilidadRed = computed<KpiDisponibilidadRed>(() => {
    const eventos = this.eventosDisponibilidad();
    const caidas = eventos.filter(e => e.tipo === 'caida' || e.tipo === 'degradacion').length;
    const recuperaciones = eventos.filter(e => e.tipo === 'recuperacion' || e.tipo === 'failover').length;
    const tiempos = eventos.filter(e => e.duracionSeg).map(e => e.duracionSeg!);
    const promedio = tiempos.length ? tiempos.reduce((a, b) => a + b, 0) / tiempos.length : 0;
    const uptime = this.mock.metricas().uptimePromedio;

    return {
      porcentaje: uptime,
      periodoHoras: 48,
      eventosCaida: caidas,
      eventosRecuperacion: recuperaciones,
      tiempoRecuperacionPromedioSeg: Math.round(promedio),
      continuidadServicio: uptime >= 99
    };
  });

  readonly resiliencia = computed<ResilienciaInfraestructura>(() => {
    const devs = this.mock.dispositivos();
    const redundantes = devs.filter(d => d.nombre.includes('02') || d.tipo === 'router').length;
    const spofs = [
      {
        id: 'spof1',
        componente: 'Enlace único a DMZ',
        criticidad: 'medio' as const,
        redundanciaDisponible: true,
        descripcion: 'FW-EDGE-01 con respaldo planificado',
        dispositivoIds: ['9']
      }
    ];
    const servicios = devs.filter(d => d.tipo === 'servidor' || d.tipo === 'router');
    const estables = servicios.filter(d => d.estado === 'activo' && d.uptime > 99).length;

    return {
      indiceResiliencia: Math.round((redundantes / Math.max(devs.length, 1)) * 100),
      puntosUnicosFallo: spofs,
      equiposRedundantes: redundantes,
      equiposTotal: devs.length,
      balanceoCargaActivo: true,
      serviciosEstables: estables,
      serviciosTotal: servicios.length
    };
  });

  readonly controlesIso27001 = computed<ControlISO27001[]>(() => {
    const politicasActivas = this.policies.activas().length > 0;
    const cuarentena = this.mock.dispositivosCuarentena().length >= 0;
    const logs = this.audit.registros().length > 0;

    return CONTROLES_ISO_27001.map(c => {
      let aplicado = false;
      let pct = 40;
      if (c.id.startsWith('A.8.2') || c.id === 'A.8.22') aplicado = this.mock.vlans().length >= 5;
      if (c.id === 'A.8.15' || c.id === 'A.8.16') aplicado = logs;
      if (c.id === 'A.8.7' || c.id === 'A.8.8') aplicado = this.vulnerabilidades().length > 0;
      if (c.id === 'A.5.26' || c.id === 'A.5.24') aplicado = cuarentena;
      if (c.id === 'A.8.20') aplicado = politicasActivas;
      if (aplicado) pct = 85 + (c.id.length % 15);

      return {
        id: c.id,
        codigo: c.id,
        nombre: c.nombre,
        dominio: c.dominio,
        aplicado,
        porcentajeCumplimiento: aplicado ? pct : 35,
        evidencias: aplicado
          ? [{ id: `ev-${c.id}`, titulo: `Evidencia ${c.id}`, tipo: 'log' as const, descripcion: c.nombre, estandar: 'ISO_27001' as const, controlIso: c.id, fecha: new Date().toISOString() }]
          : [],
        dimensiones: [...c.dimensiones],
        ultimaEvaluacion: new Date().toISOString()
      };
    });
  });

  readonly cumplimientoIso27001 = computed<CumplimientoISO>(() => {
    const controles = this.controlesIso27001();
    const aplicados = controles.filter(c => c.aplicado).length;
    const backend = this.complianceBackend();
    const pct = backend?.iso27001Pct ?? Math.round((aplicados / controles.length) * 100);

    return {
      estandar: 'ISO_27001',
      porcentajeGeneral: pct,
      controlesAplicados: aplicados,
      controlesPendientes: controles.length - aplicados,
      controlesTotal: controles.length,
      evidencias: controles.flatMap(c => c.evidencias),
      evaluadoEn: new Date().toISOString()
    };
  });

  readonly metricasIso25000 = computed<MetricaISO25000[]>(() => {
    const m = this.mock.metricas();
    const alertas = this.mock.alertas();
    const tiempoAlerta = alertas.length ? 3200 : 5000;

    return METRICAS_ISO_25000.map(def => {
      let valor = 0;
      let unidad = '%';
      switch (def.clave) {
        case 'completitud_funcional':
          valor = 92;
          break;
        case 'correccion_funcional':
          valor = 94;
          break;
        case 'pertinencia_funcional':
          valor = 88;
          break;
        case 'disponibilidad_software':
          valor = 99.2;
          break;
        case 'tolerancia_fallas':
          valor = 96;
          break;
        case 'tiempo_respuesta_alerta':
          valor = tiempoAlerta / 1000;
          unidad = 's';
          break;
        case 'eficiencia_procesamiento':
          valor = 87;
          break;
        case 'modularidad':
          valor = MODULOS_SISTEMA.length * 11;
          break;
        case 'portabilidad_snmp':
          valor = 100;
          break;
        case 'documentacion_tecnica':
          valor = 78;
          break;
      }
      const cumple = def.clave === 'tiempo_respuesta_alerta' ? valor < def.umbral : valor >= def.umbral;
      return {
        clave: def.clave,
        nombre: def.nombre,
        valor,
        unidad,
        umbral: def.umbral,
        cumple,
        dimension: def.dimension,
        medidoEn: new Date().toISOString()
      };
    });
  });

  readonly evaluacionCalidadSoftware = computed<EvaluacionCalidadSoftware>(() => ({
    id: 'eval-48h',
    periodoHoras: 48,
    uptimeSoftware: 99.4,
    disponibilidadSoftware: 99.2,
    tiempoRespuestaAlertaMs: 3200,
    eventosProcesados: this.mock.alertas().length + this.audit.registros().length,
    cpuUso: 34,
    memoriaUso: 52,
    telemetriaSinPerdida: true,
    backendEstado: 'operativo',
    baseDatosEstado: this.complianceBackend() ? 'operativo' : 'degradado',
    metricas: this.metricasIso25000(),
    evaluadoEn: new Date().toISOString()
  }));

  readonly cumplimientoIso25000 = computed<CumplimientoISO>(() => {
    const metricas = this.metricasIso25000();
    const cumplen = metricas.filter(m => m.cumple).length;
    const backend = this.complianceBackend();
    const pct = backend?.iso25000Pct ?? Math.round((cumplen / metricas.length) * 100);

    return {
      estandar: 'ISO_25000',
      porcentajeGeneral: pct,
      controlesAplicados: cumplen,
      controlesPendientes: metricas.length - cumplen,
      controlesTotal: metricas.length,
      evidencias: metricas.filter(m => m.cumple).map(m => ({
        id: `m-${m.clave}`,
        titulo: m.nombre,
        tipo: 'metrica' as const,
        descripcion: `${m.valor}${m.unidad}`,
        estandar: 'ISO_25000' as const,
        fecha: m.medidoEn
      })),
      evaluadoEn: new Date().toISOString()
    };
  });

  readonly confianzaInstitucional = computed<IndicadorConfianzaInstitucional>(() => {
    const dispRed = this.kpiDisponibilidadRed().porcentaje;
    const dispSw = this.evaluacionCalidadSoftware().disponibilidadSoftware;
    const iso = (this.cumplimientoIso27001().porcentajeGeneral + this.cumplimientoIso25000().porcentajeGeneral) / 2;
    const riesgos = this.riesgos();
    const resueltos = riesgos.filter(r => r.nivel === 'bajo' || r.nivel === 'medio').length;

    const nivel = Math.round((dispRed * 0.25 + dispSw * 0.2 + iso * 0.35 + (resueltos / Math.max(riesgos.length, 1)) * 100 * 0.2));

    return {
      nivel: Math.min(nivel, 100),
      disponibilidadRed: dispRed,
      disponibilidadSoftware: dispSw,
      incidentesResueltos: resueltos,
      incidentesTotal: riesgos.length,
      cumplimientoIso: Math.round(iso),
      percepcionInterna: 82,
      calculadoEn: new Date().toISOString()
    };
  });

  readonly politicasTraficoVlan = POLITICAS_TRAFICO_VLAN;
  readonly dimensiones = DIMENSIONES_MATRIZ;
  readonly modulosSistema = MODULOS_SISTEMA;

  readonly gatewayActivo = computed(() => this.gateways().find(g => g.rol === 'activo'));
  readonly gatewayRespaldo = computed(() => this.gateways().find(g => g.rol === 'respaldo' || g.rol === 'standby'));

  cargarResumenBackend(): void {
    this.http
      .get<{ general: { porcentajeCumplimiento: number }; iso27001: { porcentajeCumplimiento: number }; iso25000: { porcentajeCumplimiento: number } }>(
        `${environment.apiUrl}/reports/compliance-summary`
      )
      .pipe(catchError(() => of(null)))
      .subscribe(data => {
        if (data) {
          this.complianceBackend.set({
            generalPct: data.general.porcentajeCumplimiento,
            iso27001Pct: data.iso27001.porcentajeCumplimiento,
            iso25000Pct: data.iso25000.porcentajeCumplimiento
          });
        }
      });
  }

  calcularNivelRiesgo(impacto: number, probabilidad: number): 'bajo' | 'medio' | 'alto' | 'critico' {
    const score = impacto * probabilidad;
    if (score >= 20) return 'critico';
    if (score >= 12) return 'alto';
    if (score >= 6) return 'medio';
    return 'bajo';
  }

  semaforoRiesgo(nivel: string): string {
    const map: Record<string, string> = {
      bajo: '#10b981',
      medio: '#f59e0b',
      alto: '#f97316',
      critico: '#ef4444'
    };
    return map[nivel] ?? '#6b7280';
  }
}
