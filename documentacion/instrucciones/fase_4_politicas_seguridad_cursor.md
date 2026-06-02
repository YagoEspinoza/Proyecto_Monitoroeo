# Fase 4 — Políticas de seguridad (Cursor)

## Objetivo general

Desarrollar el dominio **SecurityPolicies**: interfaz de gestión de políticas, reglas, severidades y acciones (alertar, auditar, cuarentena automática simulada).

---

## Contexto obligatorio

- Motor de reglas completo en backend: **futuro**
- Frontend: `security-policy.service`, `policy.models`
- Integración con ThreatDetection: política violada → alerta
- Solo admin y operador en `/politicas`

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/pages/politicas/` | UI políticas |
| `src/app/core/services/security-policy.service.ts` | CRUD y evaluación mock |
| `src/app/core/models/policy.models.ts` | Entidades |
| `src/app/core/services/soc-event.service.ts` | Eventos dominio |
| `documentacion/reglas/ddd.md` | Agregado Politica |

---

## Reglas que debe respetar Cursor

1. [arquitectura.md](../reglas/arquitectura.md) — motor de reglas desacoplado
2. [seguridad.md](../reglas/seguridad.md) — auto-cuarentena con flag explícito
3. No mezclar evaluación de reglas en componentes de alertas directamente

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| SecurityPolicies | Formulario crear/editar política |
| ThreatDetection | Disparo alerta al violar regla |
| IncidentResponse | Escalación opcional |

---

## Criterios de aceptación

- [ ] Listar políticas activas/inactivas
- [ ] Crear política con condición (IP, puerto, VLAN) y severidad
- [ ] Activar/desactivar sin borrar historial
- [ ] Simulación de violación genera alerta en centro de alertas
- [ ] Acción `autoQuarantine` solo si configurada
- [ ] Validación de formularios en español

---

## Restricciones

- Evaluación en cliente es didáctica; documentar límite
- No más de 50 reglas mock sin paginación
- Analista sin acceso a edición

---

## Validaciones

Crear política → simular tráfico/ataque → ver alerta vinculada con `policyId`.

---

## Pruebas mínimas

| Test | Objetivo |
|------|----------|
| security-policy.service | CRUD y evaluación |
| Política inactiva | No genera alerta |

---

## Resultado esperado

SOC define políticas alineadas a riesgo; el sistema demuestra detección y enlace alerta-política listo para motor servidor.

**Bitácora:** [avance_fase_4_politicas_seguridad.md](../avances/avance_fase_4_politicas_seguridad.md)
