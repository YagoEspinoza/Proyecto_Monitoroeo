/** Roles del sistema SOC — alineados con futuro backend Node.js */
export const ROLES = {
  ADMIN: 'admin',
  OPERADOR: 'operador',
  ANALISTA: 'analista',
  /** @deprecated Usar ANALISTA */
  OBSERVADOR: 'analista'
} as const;

export type RolUsuario = 'admin' | 'operador' | 'analista';

export const ETIQUETAS_ROL: Record<RolUsuario, string> = {
  admin: 'Administrador',
  operador: 'Operador SOC',
  analista: 'Analista SOC'
};

export const PERMISOS_POR_ROL: Record<RolUsuario, string[]> = {
  admin: ['read', 'write', 'isolate', 'config', 'audit', 'simulate'],
  operador: ['read', 'write', 'isolate', 'audit', 'simulate'],
  analista: ['read', 'audit', 'simulate']
};
