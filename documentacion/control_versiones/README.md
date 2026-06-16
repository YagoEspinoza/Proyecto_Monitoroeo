# Matriz de Registro — Modelo de Control de Versiones (AI-DLC)

Documentación del **Modelo de Control de Versiones** para el desarrollo asistido por IA del proyecto **NetGuard SOC** (*MyMonitoreo*): monitoreo de red, segmentación VLAN, detección de intrusos y operaciones SOC/NOC (Angular 21 + Node.js/Express).

---

## ¿Qué es un Bolt?

Un **Bolt** (*building block of traceable logic*) es la **unidad mínima de desarrollo trazable** asistido por IA en este proyecto. Agrupa:

- Una intención de cambio (Intent)
- Requerimientos asociados (`RF-*`, `RNF-*`)
- Implementación en código (`frontend/src/app/pages/`, `core/services/`, `backend/src/`)
- Evidencias de ciclo de vida, pruebas y despliegue

**Ejemplos en el repositorio:**

| ID_BOLT | Alcance |
|---------|---------|
| `BOLT-AUTH-001` | Login, JWT mock, `authGuard`, `roleGuard` — Fase 1 |
| `BOLT-NET-001` | Dashboard SOC — `pages/vision-general/` |
| `BOLT-VLAN-002` | Cuarentena VLAN 999 — `pages/vlan-cuarentena/` |
| `BOLT-ISO-001` | Cumplimiento ISO — `iso-compliance.service.ts` |
| `BOLT-BE-001` | API reportes — `backend/src/routes/report.routes.ts` |

Convención de ID: `BOLT-{DOMINIO}-{NNN}` (detalle en [gobierno_ia/README.md](../gobierno_ia/README.md)).

---

## Propósito del Modelo de Control de Versiones AI-DLC

El modelo asegura que cada Bolt generado o modificado con ayuda de IA (Cursor Agent, copiloto SOC, etc.) cumpla un **ciclo de vida auditable** antes de considerarse estable:

1. **Inicio** — intención y requerimiento claros
2. **Construcción** — diseño, código en Git, pruebas
3. **Operaciones** — despliegue o justificación N/A
4. **Coherencia técnica** — estructura y convenciones del monorepo
5. **Trazabilidad** — IDs, commits, PRs, evidencias recuperables
6. **Estabilidad** — funcionamiento e integración sin regresiones

La matriz vive en esta carpeta; el **catálogo operativo** (BPMN, dependencias, dashboard) vive en [gobierno_ia/](../gobierno_ia/).

---

## Archivos de esta carpeta

| Archivo | Descripción |
|---------|-------------|
| [REGISTRO_BOLTS.md](./REGISTRO_BOLTS.md) | Hoja principal **Bolts**: registro evaluado de cada Bolt del proyecto |
| [PLANTILLA_BOLT.md](./PLANTILLA_BOLT.md) | Plantilla vacía reutilizable para nuevos Bolts |

---

## Las 5 secciones de evaluación

Cada Bolt en `REGISTRO_BOLTS.md` se evalúa en **5 bloques** (la Sección 1 son los campos de identificación / Intent):

### Sección 1 — Identificación (Intent)

Metadatos del Bolt: ID, descripción, modelo IA, fecha, dominio DDD, HU/ticket y responsable.

**Valida:** que el Bolt tenga identidad única y contexto de negocio antes de evaluar calidad.

---

### Sección 2 — Marco AI-DLC

Ciclo de vida del **desarrollo asistido por IA**:

| Subsección | Qué valida |
|------------|------------|
| **2.1 Inicio** | Intent documentado, requerimiento (`documentacion/gobierno_ia/REQUERIMIENTOS.md`) y derivación Bolt ↔ RF |
| **2.2 Construcción** | Diseño (`arquitectura.md`, `reglas/`), commits en Git, tests Vitest (`.github/workflows/ci.yml`) |
| **2.3 Operaciones** | Despliegue real (`Dockerfile`, `deployment.md`) o N/A justificado para mocks |

**Resultado:** `[ ] Aprobado` / `[ ] Pendiente` / `[ ] No aplica`

---

### Sección 3 — Coherencia técnica

Alineación con la arquitectura real del proyecto:

| Subsección | Qué valida |
|------------|------------|
| **3.1 Estructural** | UI en `pages/`, lógica en `core/services/`, modelos en `core/models/`, API en `backend/src/`; sin duplicar responsabilidades |
| **3.2 Convenciones** | Nombres Angular (`*.component.ts`, kebab-case rutas), reglas en `documentacion/reglas/frontend.md` y `backend.md`, dependencias mínimas (`package.json`) |

**Resultado:** `[ ] Aprobado` / `[ ] Pendiente` / `[ ] No aplica`

---

### Sección 4 — Trazabilidad

Auditoría y procedencia recuperable:

| Qué valida |
|------------|
| `ID_BOLT` en [gobierno_ia/CONTROL_VERSIONES.md](../gobierno_ia/CONTROL_VERSIONES.md) y [ARTEFACTOS.md](../gobierno_ia/ARTEFACTOS.md) |
| `RF-*` / `RNF-*` en [REQUERIMIENTOS.md](../gobierno_ia/REQUERIMIENTOS.md) |
| Commit o PR en historial Git / [MERGES.md](../gobierno_ia/MERGES.md) |
| Evidencia de validación (specs, SonarQube, CI) |
| Despliegue producción o N/A documentado |

**Resultado:** `[ ] Aprobado` / `[ ] Pendiente` / `[ ] No aplica`

---

### Sección 5 — Estabilidad

Comportamiento e integración sin regresiones:

| Subsección | Qué valida |
|------------|------------|
| **5.1 Funcional** | El módulo cumple su alcance (manual de usuario, flujo SOC) y no rompe funcionalidades existentes |
| **5.2 Técnica** | SonarQube (`sonar-project.properties`), seguridad (`reglas/seguridad.md`), Vitest en CI, revisión humana cuando `REQUIERE_REVISION_HUMANA = si` |

**Resultado:** `[ ] Aprobado` / `[ ] Pendiente` / `[ ] No aplica`

---

### Estado final

| Estado | Significado |
|--------|-------------|
| **Activo** | En desarrollo o en `develop`; funcional con mock o parcial |
| **Producción** | Integrado en `main` / release desplegable |
| **Deprecado** | Reemplazado o fuera de alcance |
| **Pendiente** | Registro o evaluación incompleta |

---

## Cómo usar `PLANTILLA_BOLT.md`

1. **Nuevo Bolt:** copiar el contenido de [PLANTILLA_BOLT.md](./PLANTILLA_BOLT.md).
2. Asignar `ID_BOLT` siguiente en la secuencia del dominio (p. ej. `BOLT-ALT-002`).
3. Rellenar identificación (Intent) y enlazar `RF-*` en `gobierno_ia/REQUERIMIENTOS.md`.
4. Completar secciones 2–5 con evidencias (rutas de archivo, hash de commit, enlace a spec).
5. Pegar la sección completa al final de [REGISTRO_BOLTS.md](./REGISTRO_BOLTS.md).
6. Actualizar en paralelo:
   - [gobierno_ia/AI_DLC.md](../gobierno_ia/AI_DLC.md)
   - [gobierno_ia/CONTROL_VERSIONES.md](../gobierno_ia/CONTROL_VERSIONES.md)
   - [gobierno_ia/ARTEFACTOS.md](../gobierno_ia/ARTEFACTOS.md)
   - [gobierno_ia/DASHBOARD.md](../gobierno_ia/DASHBOARD.md)

**Con IA asistida (Cursor):** indicar en el prompt el `ID_BOLT` y pedir que complete solo las filas con evidencia verificable en el repo; marcar `[x] Pendiente` donde falte revisión humana.

---

## Relación con `documentacion/gobierno_ia/`

| Carpeta | Rol |
|---------|-----|
| **gobierno_ia/** | Vista **operativa y tabular**: procesos BPMN, dependencias, merges, dashboard, control de versiones resumido |
| **control_versiones/** | Vista **evaluativa y cualitativa**: checklist AI-DLC por Bolt con evidencias y resultado Aprobado/Pendiente |

**Mismo `ID_BOLT` en ambas carpetas** — no crear IDs distintos para el mismo cambio.

```
ID_BOLT (único)
    ├── gobierno_ia/REQUERIMIENTOS.md      → RF/RNF
    ├── gobierno_ia/AI_DLC.md              → etapas Intent…Producción
    ├── gobierno_ia/CONTROL_VERSIONES.md   → versión, commit, agente
    ├── gobierno_ia/ARTEFACTOS.md          → rutas de archivos
    └── control_versiones/REGISTRO_BOLTS.md → evaluación 5 secciones
```

---

## Stack y rutas de referencia

| Capa | Ruta | Tecnología |
|------|------|------------|
| Frontend SPA | `frontend/src/app/` | Angular 21, Vitest, Chart.js |
| Backend API | `backend/src/` | Express, MongoDB (reportes) |
| CI/CD | `.github/workflows/ci.yml` | GitHub Actions |
| Calidad | `sonar-project.properties` | SonarQube |
| Reglas | `documentacion/reglas/` | frontend, backend, ia, seguridad, ddd |
| Fases / PMV | `documentacion/fases.md` | PMV-F01 … PMV-F08 |

---

## Mantenimiento

- Al cerrar evaluación de un Bolt: cambiar `[x] Pendiente` → `[x] Aprobado` en las secciones correspondientes y actualizar **Estado del Bolt**.
- Bolts de seguridad crítica (auth, cuarentena, políticas): exigir **Sección 4 y 5 Aprobadas** + revisión humana antes de `Producción`.
- Sincronizar fechas con `git log` y responsable con autor del commit cuando aplique.

*Última actualización: junio 2026.*
