export type TemaId = 'oscuro' | 'claro' | 'cyberpunk' | 'soc';

export type ColorAcento = 'cyan' | 'emerald' | 'violet' | 'amber' | 'rose';

export type TamanoFuente = 'sm' | 'md' | 'lg';

export type IdiomaMock = 'es' | 'en';

export interface PreferenciasUx {
  tamanoFuente: TamanoFuente;
  modoCompacto: boolean;
  animaciones: boolean;
  sonidosAlerta: boolean;
  idioma: IdiomaMock;
  sidebarColapsado: boolean;
}

export interface PreferenciasTema {
  tema: TemaId;
  acento: ColorAcento;
}

export interface PerfilUsuarioLocal {
  nombre: string;
  avatar: string;
  rolSimulado: string | null;
}

export const UX_DEFAULT: PreferenciasUx = {
  tamanoFuente: 'md',
  modoCompacto: false,
  animaciones: true,
  sonidosAlerta: false,
  idioma: 'es',
  sidebarColapsado: false
};

export const TEMA_DEFAULT: PreferenciasTema = {
  tema: 'oscuro',
  acento: 'cyan'
};

export const PERFIL_DEFAULT: PerfilUsuarioLocal = {
  nombre: '',
  avatar: '⬡',
  rolSimulado: null
};
