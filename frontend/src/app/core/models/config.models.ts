export type SensibilidadDeteccion = 'baja' | 'media' | 'alta';
export type TemaVisual = 'oscuro' | 'claro';

export interface ConfiguracionRed {
  rangoMonitoreo: string;
  gatewayPrincipal: string;
  vlanCuarentenaId: number;
  intervaloEscaneoSeg: number;
}

export interface ConfiguracionMonitoreo {
  refrescoDashboardSeg: number;
  simularTraficoEnVivo: boolean;
  mostrarTopologiaAnimada: boolean;
}

export interface ConfiguracionAlertas {
  notificacionesToast: boolean;
  sonidoAlertas: boolean;
  umbralCriticoAuto: boolean;
}

export interface ConfiguracionSimulacion {
  generarLogsAutomaticos: boolean;
  frecuenciaEventosSeg: number;
  autoCuarentena: boolean;
}

export interface ConfiguracionSistema {
  red: ConfiguracionRed;
  monitoreo: ConfiguracionMonitoreo;
  alertas: ConfiguracionAlertas;
  simulacion: ConfiguracionSimulacion;
  sensibilidad: SensibilidadDeteccion;
  tema: TemaVisual;
  usuariosMockActivos: boolean;
}

export const CONFIG_DEFAULT: ConfiguracionSistema = {
  red: {
    rangoMonitoreo: '10.0.0.0/8',
    gatewayPrincipal: '10.0.0.1',
    vlanCuarentenaId: 999,
    intervaloEscaneoSeg: 30
  },
  monitoreo: {
    refrescoDashboardSeg: 5,
    simularTraficoEnVivo: true,
    mostrarTopologiaAnimada: true
  },
  alertas: {
    notificacionesToast: true,
    sonidoAlertas: false,
    umbralCriticoAuto: true
  },
  simulacion: {
    generarLogsAutomaticos: true,
    frecuenciaEventosSeg: 7,
    autoCuarentena: true
  },
  sensibilidad: 'media',
  tema: 'oscuro',
  usuariosMockActivos: true
};
