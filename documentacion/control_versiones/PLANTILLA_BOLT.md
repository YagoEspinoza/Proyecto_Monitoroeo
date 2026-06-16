# Plantilla de registro — Bolt

> Copiar este archivo o duplicar la sección siguiente en `REGISTRO_BOLTS.md` por cada Bolt nuevo.

---

## Bolt: `BOLT-____-___`

### Campos de identificación (Intent)

| Campo | Valor |
|-------|-------|
| **ID del Bolt** | `BOLT-____-___` |
| **Descripción del Bolt** | |
| **Modelo IA usado** | `cursor-agent` / `humano` / otro |
| **Fecha** | YYYY-MM-DD |
| **Dominio funcional** | Auth / NetworkMonitoring / VLANManagement / … |
| **HU/Ticket** | `RF-___-___` o `PMV-F0N` |
| **Responsable** | |

---

### Sección 2.1 — Fase de Inicio (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Intent identificado? | | |
| ¿Requerimiento asociado documentado? | | |
| ¿Bolt derivado del requerimiento? | | |

### Sección 2.2 — Fase de Construcción (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Diseño documentado? | | |
| ¿Implementación registrada en commit? | | |
| ¿Pruebas automatizadas ejecutadas? | | |

### Sección 2.3 — Fase de Operaciones (AI-DLC)

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Existe evidencia de despliegue en producción? | | |

**Resultado Sección 2:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

---

### Sección 3.1 — Coherencia Estructural del Código

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El código se ubica en el módulo o componente correspondiente? | | |
| ¿La lógica se implementa en la capa adecuada? | | |
| ¿Se evita la creación de archivos o estructuras redundantes? | | |
| ¿La implementación mantiene una separación clara de responsabilidades? | | |

### Sección 3.2 — Consistencia con Convenciones del Proyecto

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Uso consistente de convenciones de nombres del proyecto? | | |
| ¿Mantiene consistencia con la organización interna de archivos y clases del proyecto? | | |
| ¿Se evita la incorporación de dependencias o librerías innecesarias? | | |

**Resultado Sección 3:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

---

### Sección 4.1 — Auditabilidad y Procedencia

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿Bolt documentado con ID o referencia verificable? | | |
| ¿Requerimiento documentado asociado con ID o referencia verificable? | | |
| ¿Pull request o commit asociado? | | |
| ¿Evidencia de validación recuperable? | | |
| ¿Evidencia de despliegue en producción o N/A justificado? | | |

**Resultado Sección 4:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

---

### Sección 5.1 — Estabilidad Funcional del Bolt

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt mantiene el funcionamiento esperado? | | |
| ¿El bolt funciona correctamente dentro de su alcance? | | |
| ¿El bolt preserva el funcionamiento de las funcionalidades existentes? | | |
| ¿El bolt se integra sin requerir corrección correctiva inmediata atribuible a su implementación? | | |

### Sección 5.2 — Estabilidad Técnica de Integración

| Pregunta | Registro | Evidencia |
|----------|----------|-----------|
| ¿El bolt supera la validación de análisis estático de código aplicable al proyecto? | | |
| ¿El bolt supera satisfactoriamente la validación de seguridad y dependencias aplicable? | | |
| ¿El bolt supera las pruebas automatizadas? | | |
| ¿El bolt cuenta con revisión de código aprobada en el proceso de integración correspondiente? | | |

**Resultado Sección 5:** `[ ] Aprobado` / `[x] Pendiente` / `[ ] No aplica`

---

### Estado final del Bolt

| Campo | Valor |
|-------|-------|
| **Estado del Bolt** | `Activo` / `Producción` / `Deprecado` / `Pendiente` |
| **Observaciones complementarias** | |
| **Punto de mejora** | |
