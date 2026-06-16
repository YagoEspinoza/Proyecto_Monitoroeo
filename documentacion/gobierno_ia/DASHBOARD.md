# DASHBOARD — Indicadores del proyecto

Indicadores calculados automáticamente a partir de las demás hojas de `documentacion/gobierno_ia/`. Actualizar **VALOR** al modificar catálogos en PROCESOS, CONTROL_VERSIONES o AI_DLC.

## Fórmulas de cálculo

| Indicador | Fórmula | Hoja fuente |
|-----------|---------|-------------|
| **Total Bolts** | Contar `ID_BOLT` únicos | `AI_DLC.md` (o `CONTROL_VERSIONES.md`) |
| **Bolts Activos** | Contar filas donde `ESTADO_BOLT = activo` (última versión por Bolt) | `CONTROL_VERSIONES.md` |
| **Bolts Producción** | Contar filas donde `ESTADO_BOLT = producción` **o** `PRODUCCION = completado` en AI_DLC | `CONTROL_VERSIONES.md` + `AI_DLC.md` |
| **Procesos Estratégicos** | Contar filas donde `TIPO_PROCESO = Estratégico` | `PROCESOS.md` |
| **Procesos Misionales** | Contar filas donde `TIPO_PROCESO = Misional` | `PROCESOS.md` |
| **Procesos Apoyo** | Contar filas donde `TIPO_PROCESO = Apoyo` | `PROCESOS.md` |

---

## Indicadores (valores al 2026-06-16)

| INDICADOR | VALOR | OBSERVACION |
|-----------|-------|-------------|
| Total Bolts | 18 | Únicos en `AI_DLC.md` (18 filas) |
| Bolts Activos | 17 | `CONTROL_VERSIONES.md`: `ESTADO_BOLT = activo` (excluye BOLT-AUTH-001 en producción) |
| Bolts Producción | 1 | `BOLT-AUTH-001` — `ESTADO_BOLT = producción`, integrado en `main` |
| Procesos Estratégicos | 4 | PROC-EST-001 … PROC-EST-004 |
| Procesos Misionales | 12 | PROC-MIS-005 … PROC-MIS-016 |
| Procesos Apoyo | 16 | PROC-APO-017 … PROC-APO-032 |

---

## Indicadores complementarios (opcionales)

Registrar manualmente o derivar de otras hojas según necesidad académica.

| INDICADOR | VALOR | OBSERVACION |
|-----------|-------|-------------|
| Requerimientos completados | 14 | `REQUERIMIENTOS.md` con `ESTADO = completado` |
| Requerimientos en progreso | 5 | RF-REP-001, RF-IA-001, RNF-QA-001, RNF-DEV-001, RNF-BE-001 |
| Bolts con revisión humana pendiente | 12 | `CONTROL_VERSIONES.md` donde `REQUIERE_REVISION_HUMANA = si` y QA no cerrada |
| Merges completados | 7 | `MERGES.md` con `ESTADO = completado` |
| PMV completados | 5 de 8 | Fases F01–F04 y parcial F05 según `PMV.md` |
| Artefactos registrados | 36 | Filas en `ARTEFACTOS.md` |
| Dependencias documentadas | 18 | Filas en `DEPENDENCIAS.md` |

---

## Script de recálculo (referencia)

Al editar las hojas fuente, recalcular:

```
Total Bolts        = DISTINCT(ID_BOLT) en AI_DLC
Bolts Activos      = COUNT(ID_BOLT) en CONTROL_VERSIONES WHERE ESTADO_BOLT = 'activo' (max VERSION)
Bolts Producción   = COUNT(ID_BOLT) WHERE ESTADO_BOLT = 'producción' OR AI_DLC.PRODUCCION = 'completado'
Proc. Estratégicos = COUNT(*) en PROCESOS WHERE TIPO_PROCESO = 'Estratégico'
Proc. Misionales   = COUNT(*) en PROCESOS WHERE TIPO_PROCESO = 'Misional'
Proc. Apoyo        = COUNT(*) en PROCESOS WHERE TIPO_PROCESO = 'Apoyo'
```

*Nota: En Excel/Google Sheets estas fórmulas se implementan con `COUNTIF`, `UNIQUE` y tablas dinámicas; en Markdown se actualizan manualmente o vía script del equipo.*
