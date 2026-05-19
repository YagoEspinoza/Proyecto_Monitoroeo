import { Injectable, computed, inject, signal } from '@angular/core';
import { MockNetworkService } from './mock-network.service';
import { SecurityPolicyService } from './security-policy.service';

export interface MensajeAi {
  id: string;
  rol: 'user' | 'assistant' | 'system';
  texto: string;
  timestamp: Date;
  sugerencia?: { etiqueta: string; accion: string };
}

export interface TipAi {
  id: string;
  titulo: string;
  texto: string;
  prioridad: 'alta' | 'media';
}

const FAQ: { patron: RegExp; respuesta: string }[] = [
  {
    patron: /cuarentena|aislar|vlan 999/i,
    respuesta:
      'La VLAN 999 es la zona de cuarentena. Los hosts aislados pierden conectividad lateral. Ve a Cuarentena o usa "Aislar" en un dispositivo comprometido.'
  },
  {
    patron: /alerta|ids|intruso/i,
    respuesta:
      'Las alertas IDS se generan por firmas simuladas. Reconócelas en Centro de Alertas y aísla hosts críticos si tu rol lo permite.'
  },
  {
    patron: /política|regla/i,
    respuesta:
      'Las políticas definen acciones automáticas (bloquear, aislar, alertar). Admin y Operador pueden editarlas en Políticas de Seguridad.'
  },
  {
    patron: /dashboard|panel|métrica/i,
    respuesta:
      'El Dashboard SOC muestra KPIs en vivo: tráfico, amenazas, uptime y actividad reciente. Los widgets son personalizables.'
  },
  {
    patron: /ataque|simulaci[oó]n|ddos|brute/i,
    respuesta:
      'En Simulación de Ataques puedes lanzar escenarios (DDoS, brute force, port scan). El sistema detectará, alertará y sugerirá respuestas.'
  },
  {
    patron: /rol|permiso|admin/i,
    respuesta:
      'Roles: Administrador (config total), Operador SOC (operaciones), Analista SOC (lectura y análisis). Usa el panel de usuario para simular roles.'
  }
];

const MAX_MENSAJES = 80;

@Injectable({ providedIn: 'root' })
export class SocAiService {
  private readonly mock = inject(MockNetworkService);
  private readonly policies = inject(SecurityPolicyService);

  readonly abierto = signal(false);
  readonly minimizado = signal(false);
  readonly escribiendo = signal(false);

  private readonly _mensajes = signal<MensajeAi[]>([this.mensajeBienvenida()]);
  private respuestaTimeout: ReturnType<typeof setTimeout> | null = null;
  private ignorarCierreBackdrop = false;

  readonly mensajes = this._mensajes.asReadonly();

  readonly tips = computed<TipAi[]>(() => {
    const m = this.mock.metricas();
    const tips: TipAi[] = [
      {
        id: 't1',
        titulo: 'Atajo rápido',
        texto: 'Presiona Ctrl+K para búsqueda global en todo el sistema.',
        prioridad: 'media'
      }
    ];
    if (m.intrusosDetectados > 0) {
      tips.unshift({
        id: 't-intruso',
        titulo: 'Amenaza activa',
        texto: `${m.intrusosDetectados} intruso(s) detectado(s). Revisa alertas y considera aislamiento VLAN 999.`,
        prioridad: 'alta'
      });
    }
    if (m.alertasPendientes > 3) {
      tips.push({
        id: 't-alertas',
        titulo: 'Cola de alertas',
        texto: `Tienes ${m.alertasPendientes} alertas pendientes. Prioriza las críticas primero.`,
        prioridad: 'alta'
      });
    }
    if (m.traficoTotalMbps > 200) {
      tips.push({
        id: 't-trafico',
        titulo: 'Tráfico elevado',
        texto: 'El tráfico agregado supera umbrales normales. Verifica VLAN Distribución.',
        prioridad: 'media'
      });
    }
    return tips;
  });

  readonly recomendaciones = computed(() => {
    const m = this.mock.metricas();
    const recs: { icono: string; titulo: string; detalle: string; ruta: string }[] = [];
    if (m.intrusosDetectados > 0) {
      recs.push({
        icono: '⛔',
        titulo: 'Aislar host comprometido',
        detalle: 'Revisar hosts en VLAN cuarentena',
        ruta: '/vlan-cuarentena'
      });
    }
    if (m.alertasCriticas > 0) {
      recs.push({
        icono: '⚠',
        titulo: 'Revisar alertas críticas',
        detalle: `${m.alertasCriticas} alertas requieren atención inmediata`,
        ruta: '/alertas'
      });
    }
    if (this.policies.activas().length < 2) {
      recs.push({
        icono: '⊛',
        titulo: 'Activar políticas IDS',
        detalle: 'Habilita reglas de cuarentena automática',
        ruta: '/politicas'
      });
    }
    return recs;
  });

  abrir(): void {
    this.abierto.set(true);
    this.minimizado.set(false);
    this.activarProteccionBackdrop();
  }

  cerrar(): void {
    this.cancelarRespuestaPendiente();
    this.abierto.set(false);
    this.minimizado.set(false);
    this.escribiendo.set(false);
  }

  toggle(): void {
    if (this.abierto()) {
      this.cerrar();
    } else {
      this.abrir();
    }
  }

  /** Evita que el mismo clic que abre el panel cierre el backdrop al instante */
  cerrarPorBackdrop(): void {
    if (this.ignorarCierreBackdrop) return;
    this.cerrar();
  }

  toggleMinimizado(): void {
    if (!this.abierto()) {
      this.abrir();
      return;
    }
    this.minimizado.update(v => !v);
  }

  enviarMensaje(texto: string): void {
    const limpio = texto.trim();
    if (!limpio || this.escribiendo()) return;

    if (!this.abierto()) {
      this.abrir();
    }

    this._mensajes.update(list => [
      ...list,
      { id: `u-${Date.now()}`, rol: 'user', texto: limpio, timestamp: new Date() }
    ]);
    this.recortarHistorial();

    this.cancelarRespuestaPendiente();
    this.escribiendo.set(true);
    this.respuestaTimeout = setTimeout(() => {
      this.responder(limpio);
      this.respuestaTimeout = null;
    }, 500);
  }

  explicarAlerta(alertaId: string, mensaje: string): void {
    this.abrir();
    this._mensajes.update(list => [
      ...list,
      {
        id: `sys-${Date.now()}`,
        rol: 'system',
        texto: `Analizando alerta ${alertaId}...`,
        timestamp: new Date()
      }
    ]);
    this.recortarHistorial();

    this.cancelarRespuestaPendiente();
    this.escribiendo.set(true);
    this.respuestaTimeout = setTimeout(() => {
      this._mensajes.update(list => [
        ...list,
        {
          id: `a-${Date.now()}`,
          rol: 'assistant',
          texto: `**${alertaId}**: ${mensaje}\n\nRecomendación: reconocer la alerta, verificar el host origen y aplicar aislamiento si hay movimiento lateral.`,
          timestamp: new Date(),
          sugerencia: { etiqueta: 'Ir a alertas', accion: '/alertas' }
        }
      ]);
      this.escribiendo.set(false);
      this.recortarHistorial();
      this.respuestaTimeout = null;
    }, 700);
  }

  detectarAnomalias(): string[] {
    const devs = this.mock.dispositivos();
    return devs
      .filter(d => d.latencia !== null && d.latencia > 80)
      .map(d => `Anomalía: ${d.nombre} — latencia ${d.latencia}ms (esperado <20ms)`);
  }

  private mensajeBienvenida(): MensajeAi {
    return {
      id: 'welcome',
      rol: 'assistant',
      texto:
        'Hola, soy **Cyber AI Assistant**. Puedo explicar alertas, recomendar aislamientos y guiarte en NetGuard SOC. ¿En qué te ayudo?',
      timestamp: new Date()
    };
  }

  private activarProteccionBackdrop(): void {
    this.ignorarCierreBackdrop = true;
    setTimeout(() => {
      this.ignorarCierreBackdrop = false;
    }, 350);
  }

  private cancelarRespuestaPendiente(): void {
    if (this.respuestaTimeout) {
      clearTimeout(this.respuestaTimeout);
      this.respuestaTimeout = null;
    }
  }

  private recortarHistorial(): void {
    this._mensajes.update(list => {
      if (list.length <= MAX_MENSAJES) return list;
      const welcome = list.find(m => m.id === 'welcome');
      const rest = list.slice(-(MAX_MENSAJES - 1));
      return welcome ? [welcome, ...rest.filter(m => m.id !== 'welcome')] : rest;
    });
  }

  private responder(pregunta: string): void {
    let respuesta =
      'Puedo ayudarte con alertas, VLANs, políticas, simulaciones y navegación. Prueba preguntar sobre cuarentena, alertas IDS o simulación de ataques.';

    for (const faq of FAQ) {
      if (faq.patron.test(pregunta)) {
        respuesta = faq.respuesta;
        break;
      }
    }

    if (/anomal|comportamiento/i.test(pregunta)) {
      const anom = this.detectarAnomalias();
      respuesta =
        anom.length > 0
          ? `Comportamientos anómalos simulados:\n${anom.map(a => `• ${a}`).join('\n')}`
          : 'No se detectaron anomalías significativas en este ciclo.';
    }

    if (/hola|ayuda|empezar|nuevo/i.test(pregunta)) {
      respuesta =
        'Bienvenido a NetGuard SOC. Te sugiero: 1) Revisar el Dashboard, 2) Explorar el mapa de red, 3) Configurar alertas en Configuración. Usa el tour guiado (?) para un recorrido completo.';
    }

    this._mensajes.update(list => [
      ...list,
      {
        id: `a-${Date.now()}`,
        rol: 'assistant',
        texto: respuesta,
        timestamp: new Date()
      }
    ]);
    this.escribiendo.set(false);
    this.recortarHistorial();
  }
}
