export const APP_ROUTES = {
  LOGIN: 'login',
  RECUPERAR: 'recuperar-password',
  DASHBOARD: '',
  VISION_GENERAL: 'vision-general',
  DISPOSITIVOS: 'dispositivos',
  ALERTAS: 'alertas',
  VLANS: 'vlans',
  VLAN_CUARENTENA: 'vlan-cuarentena',
  TOPOLOGIA: 'topologia',
  AUDITORIA: 'auditoria',
  POLITICAS: 'politicas',
  CONFIGURACION: 'configuracion',
  SIMULACION: 'simulacion-ataques',
  PERFIL: 'perfil',
  REPORTES: 'reportes'
} as const;

export const PAGE_TITLES: Record<string, string> = {
  [APP_ROUTES.VISION_GENERAL]: 'Dashboard SOC',
  [APP_ROUTES.DISPOSITIVOS]: 'Dispositivos Conectados',
  [APP_ROUTES.ALERTAS]: 'Centro de Alertas',
  [APP_ROUTES.VLANS]: 'VLANs Activas',
  [APP_ROUTES.VLAN_CUARENTENA]: 'VLAN de Cuarentena',
  [APP_ROUTES.TOPOLOGIA]: 'Mapa de Red',
  [APP_ROUTES.AUDITORIA]: 'Auditoría y Logs',
  [APP_ROUTES.POLITICAS]: 'Políticas de Seguridad',
  [APP_ROUTES.CONFIGURACION]: 'Configuración',
  [APP_ROUTES.SIMULACION]: 'Simulación de Ataques',
  [APP_ROUTES.PERFIL]: 'Perfil de Usuario',
  [APP_ROUTES.REPORTES]: 'Reportes y Exportación'
};
