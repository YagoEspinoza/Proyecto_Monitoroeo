import { APP_ROUTES } from './routes.constants';

export interface HelpSection {
  titulo: string;
  contenido: string;
}

export interface HelpPageContent {
  titulo: string;
  resumen: string;
  tips: string[];
  secciones?: HelpSection[];
}

export const HELP_GENERAL: HelpPageContent = {
  titulo: 'NetGuard SOC — Guía rápida',
  resumen:
    'Plataforma de monitoreo VLAN, detección de intrusos y respuesta automatizada en modo simulación.',
  tips: [
    'Use el dashboard para el estado global de la red.',
    'Las políticas activas impactan alertas, logs y cuarentena.',
    'La configuración (admin) ajusta sensibilidad IDS y simulación.'
  ]
};

export const HELP_FAQ: { pregunta: string; respuesta: string }[] = [
  {
    pregunta: '¿Los datos son reales?',
    respuesta: 'No. Todo opera con mocks y localStorage hasta conectar el backend Node.js.'
  },
  {
    pregunta: '¿Cómo aislar un intruso?',
    respuesta: 'Desde Dispositivos o el modal del dashboard, use "Aislar en cuarentena" (VLAN 999).'
  },
  {
    pregunta: '¿Qué hace la sensibilidad alta?',
    respuesta: 'Multiplica la frecuencia de alertas y eventos simulados del motor IDS.'
  },
  {
    pregunta: '¿Cómo contacto soporte?',
    respuesta: 'Use "Simular ticket" en el panel de ayuda — genera un ID de seguimiento mock.'
  }
];

export const HELP_POR_RUTA: Record<string, HelpPageContent> = {
  [APP_ROUTES.VISION_GENERAL]: {
    titulo: 'Dashboard SOC',
    resumen: 'Vista operativa con KPIs, alertas recientes, tráfico VLAN e impacto de políticas.',
    tips: [
      'Reconozca alertas pendientes para limpiar el feed.',
      'Revise el banner de estado de seguridad global.',
      'Los chips superiores enlazan políticas y configuración.'
    ]
  },
  [APP_ROUTES.DISPOSITIVOS]: {
    titulo: 'Dispositivos',
    resumen: 'Inventario de hosts con IP, VLAN, latencia y nivel de seguridad.',
    tips: ['Filtre por estado o VLAN.', 'Los intrusos pueden aislarse a cuarentena.']
  },
  [APP_ROUTES.ALERTAS]: {
    titulo: 'Centro de alertas',
    resumen: 'Feed IDS con niveles crítico, alto, advertencia e información.',
    tips: ['Marque alertas como reconocidas.', 'Correlacione IP/VLAN con dispositivos.']
  },
  [APP_ROUTES.VLANS]: {
    titulo: 'VLANs activas',
    resumen: 'Segmentación y tráfico simulado por VLAN.',
    tips: ['Observe picos de Mbps en barras de tráfico.']
  },
  [APP_ROUTES.VLAN_CUARENTENA]: {
    titulo: 'Cuarentena',
    resumen: 'Hosts aislados en VLAN 999 por políticas o acción manual.',
    tips: ['La cuarentena automática depende de configuración y políticas activas.']
  },
  [APP_ROUTES.TOPOLOGIA]: {
    titulo: 'Topología',
    resumen: 'Mapa SVG de nodos y enlaces de la red simulada.',
    tips: ['Desactive animaciones en preferencias UX si prefiere vista estática.']
  },
  [APP_ROUTES.AUDITORIA]: {
    titulo: 'Auditoría y logs',
    resumen: 'Terminal de eventos en tiempo real filtrable por módulo y nivel.',
    tips: ['Filtre POLITICA, CONFIG, IDS, AUTO para investigaciones.']
  },
  [APP_ROUTES.POLITICAS]: {
    titulo: 'Políticas de seguridad',
    resumen: 'CRUD de reglas IDS/IPS integradas con VLANs y cuarentena.',
    tips: ['Sincronice reglas tras cambios masivos.', 'Estados: activa, crítica, monitoreo, deshabilitada.']
  },
  [APP_ROUTES.CONFIGURACION]: {
    titulo: 'Configuración del sistema',
    resumen: 'Parámetros de red, monitoreo, alertas y simulación (solo admin).',
    tips: ['Aplique cambios para que afecten el motor SOC.', 'Use preferencias globales para tema y UX.']
  }
};
