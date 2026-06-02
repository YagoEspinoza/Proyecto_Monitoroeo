export interface Alerta {
  _id: string;
  mensaje: string;
  nivel: 'informacion' | 'advertencia' | 'alto' | 'critico';
  tipo_evento: 'caida' | 'latencia_alta' | 'perdida_paquetes' | 'recuperacion';
  reconocida: boolean;
  fecha_generacion: Date;
}

export interface ListadoAlertas {
  total: number;
  datos: Alerta[];
}