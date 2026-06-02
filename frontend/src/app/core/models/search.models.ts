export type TipoResultadoBusqueda =
  | 'dispositivo'
  | 'vlan'
  | 'usuario'
  | 'log'
  | 'alerta'
  | 'politica'
  | 'incidencia'
  | 'pagina';

export interface ResultadoBusqueda {
  id: string;
  tipo: TipoResultadoBusqueda;
  titulo: string;
  subtitulo: string;
  ruta: string;
  icono: string;
  meta?: string;
}
