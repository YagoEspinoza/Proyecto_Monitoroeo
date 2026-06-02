export interface Dispositivo {
  _id: string;
  nombre: string;
  ip_address: string;
  mac_address?: string;
  tipo: 'router' | 'switch' | 'servidor' | 'workstation' | 'impresora' | 'otro';
  ubicacion: string;
  estado: 'activo' | 'inactivo' | 'degradado' | 'sin_monitoreo';
  latencia_actual: number | null;
  uptime_porcentaje: number;
  ultima_verificacion: Date | null;
}

export interface EstadisticasDispositivos {
  total: number;
  activos: number;
  inactivos: number;
  degradados: number;
}