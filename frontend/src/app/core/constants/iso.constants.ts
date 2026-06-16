/** Matriz de operacionalización — tesis NetWatch Pro / NetGuard SOC */

export const VARIABLES_TESIS = {
  INDEPENDIENTE: 'Arquitectura de Red Ciberresiliente',
  MEDIADORA_SGSI: 'Gestión de Seguridad de la Información basada en ISO/IEC 27001',
  MEDIADORA_CALIDAD: 'Calidad del Software de Monitoreo basada en ISO/IEC 25000 SQuaRE',
  DEPENDIENTE: 'Postura de Ciberseguridad Institucional'
} as const;

/** Dimensiones 1–15 de la matriz de operacionalización */
export const DIMENSIONES_MATRIZ = [
  { id: 1, clave: 'segmentacion_vlan', nombre: 'Segmentación de red mediante VLAN', variable: VARIABLES_TESIS.INDEPENDIENTE },
  { id: 2, clave: 'alta_disponibilidad', nombre: 'Alta disponibilidad de red', variable: VARIABLES_TESIS.INDEPENDIENTE },
  { id: 3, clave: 'resiliencia_infra', nombre: 'Resiliencia de infraestructura TI', variable: VARIABLES_TESIS.INDEPENDIENTE },
  { id: 4, clave: 'gestion_riesgos_ti', nombre: 'Gestión de riesgos en la protección de TI', variable: VARIABLES_TESIS.MEDIADORA_SGSI },
  { id: 5, clave: 'deteccion_vulnerabilidades', nombre: 'Detección sistemática de vulnerabilidades', variable: VARIABLES_TESIS.MEDIADORA_SGSI },
  { id: 6, clave: 'cumplimiento_normativo', nombre: 'Cumplimiento normativo y estándares internacionales', variable: VARIABLES_TESIS.MEDIADORA_SGSI },
  { id: 7, clave: 'funcionalidad_software', nombre: 'Funcionalidad y adecuación funcional', variable: VARIABLES_TESIS.MEDIADORA_CALIDAD },
  { id: 8, clave: 'fiabilidad_software', nombre: 'Fiabilidad y disponibilidad del software', variable: VARIABLES_TESIS.MEDIADORA_CALIDAD },
  { id: 9, clave: 'eficiencia_desempeno', nombre: 'Eficiencia en el desempeño', variable: VARIABLES_TESIS.MEDIADORA_CALIDAD },
  { id: 10, clave: 'mantenibilidad_portabilidad', nombre: 'Mantenibilidad y portabilidad', variable: VARIABLES_TESIS.MEDIADORA_CALIDAD },
  { id: 11, clave: 'confidencialidad', nombre: 'Confidencialidad de la información', variable: VARIABLES_TESIS.DEPENDIENTE },
  { id: 12, clave: 'riesgos_seguridad_ti', nombre: 'Gestión de riesgos en seguridad TI', variable: VARIABLES_TESIS.DEPENDIENTE },
  { id: 13, clave: 'vulnerabilidades_seguridad', nombre: 'Detección sistemática de vulnerabilidades', variable: VARIABLES_TESIS.DEPENDIENTE },
  { id: 14, clave: 'cumplimiento_seguridad', nombre: 'Cumplimiento de estándares internacionales de seguridad', variable: VARIABLES_TESIS.DEPENDIENTE },
  { id: 15, clave: 'confianza_institucional', nombre: 'Confianza y reputación institucional', variable: VARIABLES_TESIS.DEPENDIENTE }
] as const;

export type DimensionMatrizClave = (typeof DIMENSIONES_MATRIZ)[number]['clave'];

export const AREAS_VLAN_INSTITUCIONAL = [
  'administracion',
  'docentes',
  'estudiantes',
  'registros_academicos',
  'servidores',
  'cuarentena',
  'infraestructura'
] as const;

export type AreaVlanInstitucional = (typeof AREAS_VLAN_INSTITUCIONAL)[number];

export const AREA_VLAN_LABELS: Record<AreaVlanInstitucional, string> = {
  administracion: 'Administración',
  docentes: 'Docentes',
  estudiantes: 'Estudiantes',
  registros_academicos: 'Registros académicos',
  servidores: 'Servidores',
  cuarentena: 'Cuarentena',
  infraestructura: 'Infraestructura de red'
};

export const NIVELES_RIESGO = ['bajo', 'medio', 'alto', 'critico'] as const;
export type NivelRiesgo = (typeof NIVELES_RIESGO)[number];

export const TRATAMIENTOS_RIESGO = ['aceptar', 'mitigar', 'transferir', 'evitar'] as const;
export type TratamientoRiesgo = (typeof TRATAMIENTOS_RIESGO)[number];

export const ESTADOS_VULNERABILIDAD = ['detectada', 'en_analisis', 'mitigada', 'cerrada'] as const;
export type EstadoVulnerabilidad = (typeof ESTADOS_VULNERABILIDAD)[number];

export const TIPOS_VULNERABILIDAD = [
  'snmp_perdido',
  'puerto_sospechoso',
  'trafico_anomalo',
  'dispositivo_comprometido',
  'cve',
  'configuracion_insegura'
] as const;

export type TipoVulnerabilidad = (typeof TIPOS_VULNERABILIDAD)[number];

export const ISO_STANDARDS = ['ISO_27001', 'ISO_25000'] as const;
export type IsoStandard = (typeof ISO_STANDARDS)[number];

export const ISO_STANDARD_LABELS: Record<IsoStandard, string> = {
  ISO_27001: 'ISO/IEC 27001',
  ISO_25000: 'ISO/IEC 25000 (SQuaRE)'
};

/** Controles ISO/IEC 27001:2022 — Anexo A (selección alineada a red educativa) */
export const CONTROLES_ISO_27001: readonly {
  id: string;
  nombre: string;
  dominio: string;
  dimensiones: number[];
}[] = [
  { id: 'A.5.1', nombre: 'Políticas de seguridad de la información', dominio: 'Organizacional', dimensiones: [6, 11, 14] },
  { id: 'A.5.7', nombre: 'Inteligencia de amenazas', dominio: 'Organizacional', dimensiones: [4, 5, 13] },
  { id: 'A.5.23', nombre: 'Seguridad en servicios cloud', dominio: 'Organizacional', dimensiones: [6, 14] },
  { id: 'A.8.1', nombre: 'Inventario de activos', dominio: 'Tecnológico', dimensiones: [4, 7] },
  { id: 'A.8.7', nombre: 'Protección contra malware', dominio: 'Tecnológico', dimensiones: [5, 13] },
  { id: 'A.8.8', nombre: 'Gestión de vulnerabilidades técnicas', dominio: 'Tecnológico', dimensiones: [5, 13] },
  { id: 'A.8.9', nombre: 'Gestión de configuración', dominio: 'Tecnológico', dimensiones: [6, 10] },
  { id: 'A.8.15', nombre: 'Registro de eventos', dominio: 'Tecnológico', dimensiones: [6, 11] },
  { id: 'A.8.16', nombre: 'Actividades de monitoreo', dominio: 'Tecnológico', dimensiones: [5, 7, 9] },
  { id: 'A.8.20', nombre: 'Seguridad de redes', dominio: 'Tecnológico', dimensiones: [1, 3, 14] },
  { id: 'A.8.22', nombre: 'Segregación de redes', dominio: 'Tecnológico', dimensiones: [1, 11] },
  { id: 'A.8.23', nombre: 'Filtrado web', dominio: 'Tecnológico', dimensiones: [1, 11] },
  { id: 'A.8.24', nombre: 'Uso de criptografía', dominio: 'Tecnológico', dimensiones: [11] },
  { id: 'A.5.24', nombre: 'Planificación de gestión de incidentes', dominio: 'Organizacional', dimensiones: [4, 12] },
  { id: 'A.5.26', nombre: 'Respuesta a incidentes de seguridad', dominio: 'Organizacional', dimensiones: [4, 12, 15] },
  { id: 'A.5.29', nombre: 'Seguridad de la información durante interrupciones', dominio: 'Organizacional', dimensiones: [2, 8, 15] }
];

/** Características ISO/IEC 25000 SQuaRE */
export const METRICAS_ISO_25000 = [
  { clave: 'completitud_funcional', nombre: 'Completitud funcional', dimension: 7, umbral: 85 },
  { clave: 'correccion_funcional', nombre: 'Corrección funcional', dimension: 7, umbral: 90 },
  { clave: 'pertinencia_funcional', nombre: 'Pertinencia funcional', dimension: 7, umbral: 85 },
  { clave: 'disponibilidad_software', nombre: 'Disponibilidad del software', dimension: 8, umbral: 99 },
  { clave: 'tolerancia_fallas', nombre: 'Tolerancia a fallas', dimension: 8, umbral: 95 },
  { clave: 'tiempo_respuesta_alerta', nombre: 'Tiempo de respuesta de alerta (<5s)', dimension: 9, umbral: 5 },
  { clave: 'eficiencia_procesamiento', nombre: 'Eficiencia de procesamiento', dimension: 9, umbral: 80 },
  { clave: 'modularidad', nombre: 'Modularidad del código', dimension: 10, umbral: 80 },
  { clave: 'portabilidad_snmp', nombre: 'Compatibilidad SNMP', dimension: 10, umbral: 100 },
  { clave: 'documentacion_tecnica', nombre: 'Documentación técnica', dimension: 10, umbral: 75 }
] as const;

export const MODULOS_SISTEMA = [
  { clave: 'ingesta', nombre: 'Ingesta de telemetría', dimension: 10 },
  { clave: 'deteccion', nombre: 'Detección IDS/IPS', dimension: 7 },
  { clave: 'cuarentena', nombre: 'Cuarentena VLAN', dimension: 1 },
  { clave: 'reportes', nombre: 'Reportes e incidentes', dimension: 6 },
  { clave: 'usuarios', nombre: 'Usuarios y RBAC', dimension: 11 },
  { clave: 'configuracion', nombre: 'Configuración global', dimension: 10 },
  { clave: 'auditoria', nombre: 'Auditoría y trazabilidad', dimension: 6 }
] as const;

export const NIVEL_RIESGO_LABELS: Record<NivelRiesgo, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  critico: 'Crítico'
};

export const TRATAMIENTO_RIESGO_LABELS: Record<TratamientoRiesgo, string> = {
  aceptar: 'Aceptar',
  mitigar: 'Mitigar',
  transferir: 'Transferir',
  evitar: 'Evitar'
};

export const ESTADO_VULNERABILIDAD_LABELS: Record<EstadoVulnerabilidad, string> = {
  detectada: 'Detectada',
  en_analisis: 'En análisis',
  mitigada: 'Mitigada',
  cerrada: 'Cerrada'
};

/** Matriz de tráfico inter-VLAN — políticas de segmentación institucional */
export const POLITICAS_TRAFICO_VLAN: readonly {
  origen: AreaVlanInstitucional;
  destino: AreaVlanInstitucional;
  permitido: boolean;
  protocolo?: string;
  descripcion: string;
}[] = [
  { origen: 'administracion', destino: 'servidores', permitido: true, protocolo: 'HTTPS/SSH', descripcion: 'Gestión administrativa de servidores' },
  { origen: 'docentes', destino: 'servidores', permitido: true, protocolo: 'HTTPS', descripcion: 'Acceso a plataforma académica' },
  { origen: 'estudiantes', destino: 'servidores', permitido: true, protocolo: 'HTTPS', descripcion: 'Acceso a LMS y recursos educativos' },
  { origen: 'registros_academicos', destino: 'servidores', permitido: true, protocolo: 'HTTPS', descripcion: 'Sistema de registros académicos' },
  { origen: 'estudiantes', destino: 'registros_academicos', permitido: false, descripcion: 'Denegado — segregación de datos académicos sensibles' },
  { origen: 'docentes', destino: 'administracion', permitido: false, descripcion: 'Denegado — separación administrativa' },
  { origen: 'cuarentena', destino: 'administracion', permitido: false, descripcion: 'DENY ALL — hosts aislados' },
  { origen: 'cuarentena', destino: 'servidores', permitido: false, descripcion: 'DENY ALL — hosts aislados' },
  { origen: 'cuarentena', destino: 'docentes', permitido: false, descripcion: 'DENY ALL — hosts aislados' },
  { origen: 'administracion', destino: 'cuarentena', permitido: true, protocolo: 'SSH', descripcion: 'Solo SOC puede inspeccionar cuarentena' }
];
