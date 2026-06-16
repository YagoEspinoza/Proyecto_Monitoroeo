# REGISTRO_BOLTS — Hoja principal Bolts

Matriz de Registro del Modelo de Control de Versiones (AI-DLC) para **NetGuard SOC / MyMonitoreo**.

> **Leyenda resultados:** `[x]` = seleccionado · `[ ]` = no seleccionado  
> **Responsable por defecto (Git):** Yago Espinoza — commits `fcccf11` … `5dbdc31`  
> **Plantilla nuevos Bolts:** [PLANTILLA_BOLT.md](./PLANTILLA_BOLT.md)

## Índice de Bolts

| ID_BOLT | Dominio | Estado | Sección 2 | Sección 3 | Sección 4 | Sección 5 |
|---------|---------|--------|-----------|-----------|-----------|-----------|
| [BOLT-AUTH-001](#bolt-bolt-auth-001) | Auth | Producción | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-NET-001](#bolt-bolt-net-001) | NetworkMonitoring | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-NET-002](#bolt-bolt-net-002) | NetworkMonitoring | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-NET-003](#bolt-bolt-net-003) | NetworkMonitoring | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-VLAN-001](#bolt-bolt-vlan-001) | VLANManagement | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-VLAN-002](#bolt-bolt-vlan-002) | Quarantine | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-POL-001](#bolt-bolt-pol-001) | SecurityPolicies | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-ALT-001](#bolt-bolt-alt-001) | ThreatDetection | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-AUD-001](#bolt-bolt-aud-001) | AuditLogs | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-AUD-002](#bolt-bolt-aud-002) | AuditLogs | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-REP-001](#bolt-bolt-rep-001) | AuditLogs | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-IA-001](#bolt-bolt-ia-001) | SOC_AI_Assistant | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-ISO-001](#bolt-bolt-iso-001) | Transversal ISO | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-SIM-001](#bolt-bolt-sim-001) | ThreatDetection | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-CFG-001](#bolt-bolt-cfg-001) | Users | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-BE-001](#bolt-bolt-be-001) | Backend | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-DEV-001](#bolt-bolt-dev-001) | DevOps | Activo | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-DEV-002](#bolt-bolt-dev-002) | DevOps | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| [BOLT-DOC-001](#bolt-bolt-doc-001) | Documentación | Activo | No aplica | No aplica | Pendiente | No aplica |

---

## Bolt: `BOLT-AUTH-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-AUTH-001` |
| **Descripción del Bolt** | Autenticación JWT mock, login/logout, guards (`authGuard`, `roleGuard`, `noAuthGuard`), interceptor de token y RBAC (`admin`, `operador`, `analista`). |
| **Modelo IA usado** | `humano` (base) + `cursor-agent` (iteraciones) |
| **Fecha** | 2025-11-15 |
| **Dominio funcional** | Auth / Users — Fase 1 |
| **HU/Ticket** | `PMV-F01` · `RF-AUTH-001` · `RF-AUTH-002` · `RNF-AUTH-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | `documentacion/instrucciones/fase_1_seguridad_acceso_cursor.md` |
| ¿Requerimiento asociado documentado? | Sí | `documentacion/gobierno_ia/REQUERIMIENTOS.md` → RF-AUTH-001 |
| ¿Bolt derivado del requerimiento? | Sí | `gobierno_ia/AI_DLC.md` · `gobierno_ia/ARTEFACTOS.md` ART-SRC-001…005 |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Sí | `documentacion/arquitectura.md` · `documentacion/reglas/seguridad.md` |
| ¿Implementación registrada en commit? | Sí | Git: `553d719`, `645332e` — `frontend/src/app/pages/login/`, `core/guards/` |
| ¿Pruebas automatizadas ejecutadas? | Sí | `auth-guard.spec.ts`, `auth.service.spec.ts`, `login.component.spec.ts`, `no-auth-guard.spec.ts` |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | Parcial | Integrado en `main`; despliegue Docker global aún parcial (Fase 8) |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | UI: `pages/login/` · guards: `core/guards/` · servicio: `core/services/auth.service.ts` |
| ¿La lógica se implementa en la capa adecuada? | Sí | Auth en servicio; protección de rutas en guards; rutas en `app.routes.ts` |
| ¿Se evita la creación de archivos o estructuras redundantes? | Sí | Un servicio auth central; guards reutilizables |
| ¿La implementación mantiene una separación clara de responsabilidades? | Sí | Alineado a `documentacion/reglas/ddd.md` dominio Auth |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Sí | `*.component.ts`, `auth-guard.ts`, constantes `ROLES` |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Sí | `documentacion/reglas/frontend.md` |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Sí | Solo dependencias Angular estándar en `frontend/package.json` |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | `gobierno_ia/CONTROL_VERSIONES.md` → CV-BOLT-AUTH-001-v1 |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-AUTH-001, RF-AUTH-002 en `REQUERIMIENTOS.md` |
| ¿Pull request o commit asociado? | Parcial | Commits Git; PR no registrado en `MERGES.md` |
| ¿Evidencia de validación recuperable? | Sí | Specs Vitest + CI `.github/workflows/ci.yml` |
| ¿Evidencia de despliegue en producción o N/A justificado? | Parcial | Estado `producción` en gobierno_ia; deploy Fase 8 pendiente |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | Requiere smoke manual en `/login` |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Supera análisis estático aplicable? | Pendiente validación | SonarQube configurado; resultado no archivado aquí |
| ¿Supera validación de seguridad y dependencias? | Pendiente validación | `reglas/seguridad.md` — revisión humana pendiente |
| ¿Supera pruebas automatizadas? | Parcial | 4 specs auth; cobertura global no cerrada |
| ¿Revisión de código aprobada en integración? | Pendiente validación | Sin PR documentado |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Producción |
| **Observaciones complementarias** | Fase 1 cerrada; JWT mock — backend auth futuro |
| **Punto de mejora** | Registrar PR en `MERGES.md` y evidencia SonarQube |

---

## Bolt: `BOLT-NET-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-NET-001` |
| **Descripción del Bolt** | Dashboard SOC (`vision-general`): KPIs de dispositivos, alertas, VLANs, cumplimiento ISO, gráficos Chart.js. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-01-20 |
| **Dominio funcional** | NetworkMonitoring — Fase 2 |
| **HU/Ticket** | `PMV-F02` · `RF-NET-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | `instrucciones/fase_2_dashboard_monitoreo_cursor.md` |
| ¿Requerimiento asociado documentado? | Sí | `RF-NET-001` en `REQUERIMIENTOS.md` |
| ¿Bolt derivado del requerimiento? | Sí | `ARTEFACTOS.md` ART-SRC-010, ART-SRC-013 |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Sí | `fases.md` Fase 2 · `manualdeusuario.md` §2 |
| ¿Implementación registrada en commit? | Parcial | `645332e`, `7457ff0` — `pages/vision-general/` |
| ¿Pruebas automatizadas ejecutadas? | Parcial | `mock-network.service.spec.ts` (servicio relacionado) |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | Frontend mock en `develop`; Fase 8 pendiente |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Código en módulo correspondiente? | Sí | `frontend/src/app/pages/vision-general/` |
| ¿Lógica en capa adecuada? | Sí | Datos: `mock-network.service.ts` · KPIs ISO: `iso-compliance.service.ts` |
| ¿Sin estructuras redundantes? | Pendiente validación | — |
| ¿Separación de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Convenciones de nombres? | Pendiente validación | — |
| ¿Organización interna consistente? | Pendiente validación | — |
| ¿Sin dependencias innecesarias? | Pendiente validación | Chart.js usado en dashboard |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt con ID verificable? | Sí | `gobierno_ia/CONTROL_VERSIONES.md` |
| ¿Requerimiento asociado? | Sí | RF-NET-001 |
| ¿Commit o PR? | Pendiente validación | — |
| ¿Evidencia de validación? | Pendiente validación | — |
| ¿Despliegue o N/A? | N/A justificado | Mock SPA — producción pendiente |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento esperado? | Pendiente validación | — |
| ¿Funciona en su alcance? | Pendiente validación | — |
| ¿Preserva funcionalidades existentes? | Pendiente validación | — |
| ¿Sin corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Análisis estático? | Pendiente validación | — |
| ¿Seguridad y dependencias? | Pendiente validación | — |
| ¿Pruebas automatizadas? | Pendiente validación | — |
| ¿Revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Integración ISO en dashboard (2026-06) |
| **Punto de mejora** | Spec dedicado `vision-general.component.spec.ts` |

---

## Bolt: `BOLT-NET-002`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-NET-002` |
| **Descripción del Bolt** | Inventario de dispositivos: IP, MAC, VLAN, estado (online/offline/degradado/cuarentena), filtros. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-01-22 |
| **Dominio funcional** | NetworkMonitoring — Fase 2 |
| **HU/Ticket** | `PMV-F02` · `RF-NET-002` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | Fase 2 dashboard/monitoreo |
| ¿Requerimiento documentado? | Sí | RF-NET-002 |
| ¿Bolt derivado? | Sí | `pages/dispositivos/` — ART-SRC-011 |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Commit registrado? | Pendiente validación | — |
| ¿Pruebas automatizadas? | No | Sin `dispositivos.component.spec.ts` |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue en producción? | No | N/A — mock |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo correspondiente? | Sí | `pages/dispositivos/` |
| ¿Capa adecuada? | Sí | Datos vía `mock-network.service.ts` |
| ¿Sin redundancia? | Pendiente validación | — |
| ¿Separación responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres consistentes? | Pendiente validación | — |
| ¿Organización interna? | Pendiente validación | — |
| ¿Dependencias mínimas? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt? | Sí | gobierno_ia |
| ¿Requerimiento? | Sí | RF-NET-002 |
| ¿Commit/PR? | Pendiente validación | — |
| ¿Validación? | Pendiente validación | — |
| ¿Despliegue/N/A? | N/A | Mock |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento esperado? | Pendiente validación | — |
| ¿Alcance correcto? | Pendiente validación | — |
| ¿Sin regresiones? | Pendiente validación | — |
| ¿Sin corrección inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Análisis estático? | Pendiente validación | — |
| ¿Seguridad? | Pendiente validación | — |
| ¿Pruebas auto? | No | — |
| ¿Revisión código? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | KPIs ISO en vista dispositivos |
| **Punto de mejora** | Añadir pruebas unitarias del componente |

---

## Bolt: `BOLT-NET-003`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-NET-003` |
| **Descripción del Bolt** | Mapa de topología L3: nodos, enlaces, gateways HSRP activo/respaldo, segmentos por VLAN. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-02-01 |
| **Dominio funcional** | NetworkMonitoring — Fase 2 |
| **HU/Ticket** | `PMV-F02` · `RF-NET-003` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | Fase 2 |
| ¿Requerimiento documentado? | Sí | RF-NET-003 |
| ¿Bolt derivado? | Sí | `pages/topologia/` |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Commit? | Pendiente validación | — |
| ¿Pruebas? | No | Sin spec topología |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo correcto? | Sí | `pages/topologia/` |
| ¿Capa adecuada? | Pendiente validación | — |
| ¿Sin redundancia? | Pendiente validación | — |
| ¿Separación? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres? | Pendiente validación | — |
| ¿Organización? | Pendiente validación | — |
| ¿Dependencias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt? | Sí | gobierno_ia |
| ¿Requerimiento? | Sí | RF-NET-003 |
| ¿Commit/PR? | Pendiente validación | — |
| ¿Validación? | Pendiente validación | — |
| ¿Despliegue/N/A? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento esperado? | Pendiente validación | — |
| ¿Alcance? | Pendiente validación | — |
| ¿Sin regresiones? | Pendiente validación | — |
| ¿Integración estable? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Análisis estático? | Pendiente validación | — |
| ¿Seguridad? | Pendiente validación | — |
| ¿Pruebas? | Pendiente validación | — |
| ¿Revisión? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Dimensión 2 tesis — HSRP mock |
| **Punto de mejora** | Tests y validación visual documentada |

---

## Bolt: `BOLT-VLAN-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-VLAN-001` |
| **Descripción del Bolt** | Gestión de VLANs activas: áreas institucionales, matriz PERMIT/DENY inter-VLAN, capacidad y tráfico. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-02-10 |
| **Dominio funcional** | VLANManagement — Fase 3 |
| **HU/Ticket** | `PMV-F03` · `RF-VLAN-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | `fase_3_vlans_cuarentena_cursor.md` |
| ¿Requerimiento documentado? | Sí | RF-VLAN-001 |
| ¿Bolt derivado? | Sí | `pages/vlans/`, `mock-network.service.ts` |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño? | Pendiente validación | — |
| ¿Commit? | Pendiente validación | — |
| ¿Pruebas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo? | Sí | `pages/vlans/` |
| ¿Capa? | Sí | Modelos `network.models.ts`, mock service |
| ¿Redundancia? | Pendiente validación | — |
| ¿Separación? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres? | Pendiente validación | — |
| ¿Organización? | Pendiente validación | — |
| ¿Dependencias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt? | Sí | gobierno_ia |
| ¿Requerimiento? | Sí | RF-VLAN-001 |
| ¿Commit/PR? | Pendiente validación | — |
| ¿Validación? | Pendiente validación | — |
| ¿Despliegue/N/A? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento? | Pendiente validación | — |
| ¿Alcance? | Pendiente validación | — |
| ¿Regresiones? | Pendiente validación | — |
| ¿Integración? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Estático? | Pendiente validación | — |
| ¿Seguridad? | Pendiente validación | — |
| ¿Pruebas? | Pendiente validación | — |
| ¿Revisión? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Dimensión 1 matriz tesis |
| **Punto de mejora** | Revisión humana matriz inter-VLAN |

---

## Bolt: `BOLT-VLAN-002`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-VLAN-002` |
| **Descripción del Bolt** | VLAN de cuarentena (999): aislamiento de hosts con confirmación humana, ACL DENY ALL, liberación. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-02-15 |
| **Dominio funcional** | Quarantine — Fase 3 |
| **HU/Ticket** | `PMV-F03` · `RF-VLAN-002` · `RNF-VLAN-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent? | Sí | `incident_response.md` · Fase 3 |
| ¿Requerimiento? | Sí | RF-VLAN-002, RNF-VLAN-001 |
| ¿Bolt derivado? | Sí | `pages/vlan-cuarentena/` |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño? | Sí | `arquitectura.md` fail-safe cuarentena |
| ¿Commit? | Pendiente validación | — |
| ¿Pruebas? | No | Crítico — sin spec cuarentena |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo? | Sí | `vlan-cuarentena/` |
| ¿Capa? | Pendiente validación | — |
| ¿Redundancia? | Pendiente validación | — |
| ¿Separación? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres? | Pendiente validación | — |
| ¿Organización? | Pendiente validación | — |
| ¿Dependencias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt? | Sí | gobierno_ia · `REQUIERE_REVISION_HUMANA = si` |
| ¿Requerimiento? | Sí | RF-VLAN-002 |
| ¿Commit/PR? | Pendiente validación | — |
| ¿Validación? | Parcial | Revisión humana documentada en `HISTORIAL.md` 2026-02-15 |
| ¿Despliegue/N/A? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento? | Pendiente validación | — |
| ¿Alcance? | Pendiente validación | — |
| ¿Regresiones? | Pendiente validación | — |
| ¿Integración? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Estático? | Pendiente validación | — |
| ¿Seguridad? | Pendiente validación | Crítico SOC |
| ¿Pruebas? | No | — |
| ¿Revisión? | Parcial | Histórico gobierno_ia |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Seguridad crítica — no ejecución autónoma IA |
| **Punto de mejora** | Tests E2E flujo confirmación cuarentena |

---

## Bolt: `BOLT-POL-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-POL-001` |
| **Descripción del Bolt** | CRUD políticas de seguridad y motor de reglas mock: origen/destino, severidad, acciones. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-02-20 |
| **Dominio funcional** | SecurityPolicies — Fase 4 |
| **HU/Ticket** | `PMV-F04` · `RF-POL-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | `fase_4_politicas_seguridad_cursor.md` |
| ¿Requerimiento documentado? | Sí | RF-POL-001 |
| ¿Bolt derivado? | Sí | `pages/politicas/`, `security-policy.service.ts` |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue en producción? | No | N/A mock |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo correspondiente? | Sí | `pages/politicas/` |
| ¿Capa adecuada? | Sí | `security-policy.service.ts`, `policy.models.ts` |
| ¿Sin redundancia? | Pendiente validación | — |
| ¿Separación responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres consistentes? | Pendiente validación | — |
| ¿Organización interna? | Pendiente validación | — |
| ¿Dependencias mínimas? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt verificable? | Sí | gobierno_ia |
| ¿Requerimiento asociado? | Sí | RF-POL-001 |
| ¿Commit o PR? | Pendiente validación | — |
| ¿Evidencia validación? | Pendiente validación | — |
| ¿Despliegue o N/A? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento esperado? | Pendiente validación | — |
| ¿Alcance correcto? | Pendiente validación | — |
| ¿Sin regresiones? | Pendiente validación | — |
| ¿Integración estable? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Análisis estático? | Pendiente validación | — |
| ¿Seguridad y dependencias? | Pendiente validación | — |
| ¿Pruebas automatizadas? | Pendiente validación | — |
| ¿Revisión código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Checklist ISO Anexo A en UI políticas |
| **Punto de mejora** | Motor de reglas backend futuro |

---

## Bolt: `BOLT-ALT-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-ALT-001` |
| **Descripción del Bolt** | Centro de alertas IDS: severidad, reconocimiento, escalamiento, notificaciones. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-03-01 |
| **Dominio funcional** | ThreatDetection — Fase 5 |
| **HU/Ticket** | `PMV-F05` · `RF-ALT-001` |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | `fase_5_alertas_logs_cursor.md` |
| ¿Requerimiento asociado documentado? | Sí | RF-ALT-001 |
| ¿Bolt derivado del requerimiento? | Sí | `pages/alertas/`, `notification-center.service.ts` |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `pages/alertas/` |
| ¿La lógica se implementa en la capa adecuada? | Sí | `notification-center.service.ts` |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-ALT-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Depende de BOLT-POL-001 |
| **Punto de mejora** | WebSockets tiempo real (futuro) |

---

## Bolt: `BOLT-AUD-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-AUD-001` |
| **Descripción del Bolt** | Servicio audit trail append-only en localStorage para acciones críticas SOC. |
| **Modelo IA usado** | `humano` |
| **Fecha** | 2026-03-05 |
| **Dominio funcional** | AuditLogs — Fase 5 |
| **HU/Ticket** | `PMV-F05` · `RF-AUD-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RF-AUD-001 |
| ¿Requerimiento asociado documentado? | Sí | RF-AUD-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `audit-trail.service.ts` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-AUD-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Persistencia local — BD futura |
| **Punto de mejora** | Spec audit-trail.service |

---

## Bolt: `BOLT-AUD-002`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-AUD-002` |
| **Descripción del Bolt** | UI de auditoría: timeline de eventos auth, red, seguridad y administración. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-03-08 |
| **Dominio funcional** | AuditLogs — Fase 5 |
| **HU/Ticket** | `PMV-F05` · proceso 22 |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | proceso 22 / Fase 5 |
| ¿Requerimiento asociado documentado? | Sí | RF-AUD-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `pages/auditoria/` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-AUD-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Dimensión 6 y 11 tesis |
| **Punto de mejora** | Exportación desde auditoría |

---

## Bolt: `BOLT-REP-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-REP-001` |
| **Descripción del Bolt** | Módulo reportes: exportación incidentes CSV/JSON, campos ISO, integración con API backend y PDF. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-06-10 |
| **Dominio funcional** | AuditLogs / Reportes — Fase 5 |
| **HU/Ticket** | `PMV-F05` · `RF-REP-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RF-REP-001 |
| ¿Requerimiento asociado documentado? | Sí | RF-REP-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `pages/reportes/` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-REP-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Pendiente |
| **Observaciones complementarias** | RF-REP-001 en progreso |
| **Punto de mejora** | Cerrar integración E2E con BOLT-BE-001 |

---

## Bolt: `BOLT-IA-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-IA-001` |
| **Descripción del Bolt** | Asistente IA SOC mock: resumen alertas, sugerencias contención, disclaimer; sin cuarentena autónoma. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-04-15 |
| **Dominio funcional** | SOC_AI_Assistant — Fase 6 |
| **HU/Ticket** | `PMV-F06` · `RF-IA-001` · `RNF-IA-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | fase_6_asistente_ia_soc_cursor.md |
| ¿Requerimiento asociado documentado? | Sí | RF-IA-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `soc-ai.service.ts` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-IA-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | LLM backend `/api/v1/soc-ai/chat` futuro |
| **Punto de mejora** | Registrar consultas en AuditLogs |

---

## Bolt: `BOLT-ISO-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-ISO-001` |
| **Descripción del Bolt** | Servicio central cumplimiento ISO 27001/25000: riesgos, controles, KPIs, confianza institucional. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-05-01 |
| **Dominio funcional** | Transversal — matriz tesis |
| **HU/Ticket** | `PMV-F02` · `RF-ISO-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | matriz-operacionalizacion/ |
| ¿Requerimiento asociado documentado? | Sí | RF-ISO-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `iso-compliance.service.ts` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-ISO-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Integrado en múltiples pantallas 2026-06 |
| **Punto de mejora** | Spec iso-compliance.service |

---

## Bolt: `BOLT-SIM-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-SIM-001` |
| **Descripción del Bolt** | Laboratorio simulación ataques (port scan, brute force) para validar detección IDS. |
| **Modelo IA usado** | `humano` |
| **Fecha** | 2026-03-20 |
| **Dominio funcional** | ThreatDetection — apoyo |
| **HU/Ticket** | `PMV-F05` · `RF-SIM-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RF-SIM-001 |
| ¿Requerimiento asociado documentado? | Sí | RF-SIM-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `pages/simulacion-ataques/` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-SIM-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Solo laboratorio; permiso simulate |
| **Punto de mejora** | Documentar escenarios en manual usuario |

---

## Bolt: `BOLT-CFG-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-CFG-001` |
| **Descripción del Bolt** | Configuración global admin: umbrales, retención logs, preferencias; toggle IA SOC pendiente. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-02-25 |
| **Dominio funcional** | Users / Gobierno — MP1 |
| **HU/Ticket** | `PMV-F06` · `RF-CFG-001` (pendiente) |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RF-CFG-001 (pendiente) |
| ¿Requerimiento asociado documentado? | Sí | RF-CFG-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `pages/configuracion/` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RF-CFG-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | RF-CFG-001 no cerrado |
| **Punto de mejora** | Implementar desactivar IA SOC |

---

## Bolt: `BOLT-BE-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-BE-001` |
| **Descripción del Bolt** | API REST reportes Express: persistencia MongoDB, PDF generator, campos ISO extendidos. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-05-15 |
| **Dominio funcional** | Backend — Fase 5 |
| **HU/Ticket** | `PMV-F05` · `RNF-BE-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RNF-BE-001 |
| ¿Requerimiento asociado documentado? | Sí | RNF-BE-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `backend/src/routes/report.routes.ts` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RNF-BE-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Pendiente |
| **Observaciones complementarias** | Desarrollo en curso según AI_DLC |
| **Punto de mejora** | Tests API y validación MongoDB |

---

## Bolt: `BOLT-DEV-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-DEV-001` |
| **Descripción del Bolt** | Pipeline CI GitHub Actions: ejecución Vitest (`npm run test:ci`). |
| **Modelo IA usado** | `humano` |
| **Fecha** | 2026-01-10 |
| **Dominio funcional** | DevOps / Calidad — Fase 7 |
| **HU/Ticket** | `PMV-F07` · `RNF-QA-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RNF-QA-001 |
| ¿Requerimiento asociado documentado? | Sí | RNF-QA-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `.github/workflows/ci.yml` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RNF-QA-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | 9 specs frontend actuales |
| **Punto de mejora** | Ampliar cobertura dominios críticos |

---

## Bolt: `BOLT-DEV-002`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-DEV-002` |
| **Descripción del Bolt** | Contenedor Docker frontend + nginx para despliegue estático Angular. |
| **Modelo IA usado** | `humano` |
| **Fecha** | 2026-04-20 |
| **Dominio funcional** | DevOps — Fase 8 |
| **HU/Ticket** | `PMV-F08` · `RNF-DEV-001` |
| **Responsable** | Yago Espinoza |


### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | RNF-DEV-001 |
| ¿Requerimiento asociado documentado? | Sí | RNF-DEV-001 |
| ¿Bolt derivado del requerimiento? | Sí | gobierno_ia/ARTEFACTOS.md |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Pendiente validación | — |
| ¿Implementación registrada en commit? | Pendiente validación | — |
| ¿Pruebas automatizadas ejecutadas? | Pendiente validación | — |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | No | N/A |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | Sí | `frontend/Dockerfile` |
| ¿La lógica se implementa en la capa adecuada? | Sí | — |
| ¿Se evita la creación de archivos o estructuras redundantes? | Pendiente validación | — |
| ¿La implementación mantiene una separación clara de responsabilidades? | Pendiente validación | — |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | Pendiente validación | — |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | Pendiente validación | — |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | Pendiente validación | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | Sí | gobierno_ia |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | Sí | RNF-DEV-001 |
| ¿Pull request o commit asociado? | Pendiente validación | — |
| ¿Evidencia de validación recuperable? | Pendiente validación | — |
| ¿Evidencia de despliegue en producción o N/A justificado? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | Pendiente validación | — |
| ¿El bolt funciona correctamente dentro de su alcance? | Pendiente validación | — |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | Pendiente validación | — |
| ¿El bolt se integra sin requerir corrección correctiva inmediata? | Pendiente validación | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático? | Pendiente validación | — |
| ¿El bolt supera validación de seguridad y dependencias? | Pendiente validación | — |
| ¿El bolt supera las pruebas automatizadas? | Pendiente validación | — |
| ¿El bolt cuenta con revisión de código aprobada? | Pendiente validación | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`


### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Pendiente |
| **Observaciones complementarias** | Despliegue parcial v0.7.0 |
| **Punto de mejora** | Smoke test post-deploy documentado |

---

## Bolt: `BOLT-DOC-001`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-DOC-001` |
| **Descripción del Bolt** | Documentación plantilla Gobierno IA: 12 hojas operativas en `documentacion/gobierno_ia/`. |
| **Modelo IA usado** | `cursor-agent` |
| **Fecha** | 2026-06-16 |
| **Dominio funcional** | Documentación / Gobierno |
| **HU/Ticket** | N/A — entregable académico tesis |
| **Responsable** | Yago Espinoza |

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | Sí | Solicitud plantilla gobierno IA proyecto |
| ¿Requerimiento documentado? | No aplica | Documentación de proceso, no RF funcional |
| ¿Bolt derivado? | Sí | Carpeta `gobierno_ia/` completa |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | Sí | Estructura 12 hojas en README gobierno_ia |
| ¿Commit? | Pendiente validación | — |
| ¿Pruebas? | No aplica | Solo Markdown |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Despliegue producción? | No aplica | Documentación en repo |

**Resultado Sección 2:** `[ ] Aprobado` / `[ ] Pendiente` / `[x] No aplica`

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Módulo correspondiente? | No aplica | Solo docs |
| ¿Capa adecuada? | No aplica | — |
| ¿Sin redundancia? | Sí | Complementa `control_versiones/` sin duplicar evaluación |
| ¿Separación? | Sí | gobierno_ia = tabular; control_versiones = matriz evaluación |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Nombres? | Sí | IDs BOLT-* alineados |
| ¿Organización? | Sí | Bajo `documentacion/` |
| ¿Dependencias? | No aplica | — |

**Resultado Sección 3:** `[ ] Aprobado` / `[ ] Pendiente` / `[x] No aplica`

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿ID Bolt? | Sí | BOLT-DOC-001 |
| ¿Requerimiento? | No aplica | — |
| ¿Commit/PR? | Pendiente validación | — |
| ¿Validación? | Pendiente validación | Revisión equipo tesis |
| ¿Despliegue/N/A? | N/A | — |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Funcionamiento? | No aplica | — |
| ¿Alcance? | No aplica | — |
| ¿Regresiones? | No aplica | — |
| ¿Integración? | No aplica | — |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Estático? | No aplica | — |
| ¿Seguridad? | No aplica | — |
| ¿Pruebas? | No aplica | — |
| ¿Revisión? | No aplica | — |

**Resultado Sección 5:** `[ ] Aprobado` / `[ ] Pendiente` / `[x] No aplica`

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | Activo |
| **Observaciones complementarias** | Base para esta carpeta `control_versiones/` |
| **Punto de mejora** | Sincronizar IDs al registrar nuevos Bolts de código |

---

*Fin del registro. Para nuevos Bolts: copiar [PLANTILLA_BOLT.md](./PLANTILLA_BOLT.md) y añadir sección aquí.*
