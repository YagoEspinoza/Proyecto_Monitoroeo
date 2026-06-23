# Matriz de operacionalización — NetWatch Pro / NetGuard SOC

Documentación académica que vincula la **matriz de operacionalización de la tesis** con la implementación real del software.

## Tesis

**«Arquitectura de Red CiberResiliente basada en Segmentación y Alta Disponibilidad bajo el estándar ISO/IEC 27001 en una Institución Educativa»**

## Documentos

| Archivo | Descripción |
|---------|-------------|
| [mapeo_dimensiones_variables.md](./mapeo_dimensiones_variables.md) | Mapeo completo: variables, dimensiones 1–15, rutas UI, modelos, servicios y backend |

## Relación con otra documentación

| Documento | Relación |
|-----------|----------|
| [../procesos/clasificacion_procesos.md](../procesos/clasificacion_procesos.md) | Procesos del sistema (1–32) clasificados por tipo |
| [../manualdeusuario.md](../manualdeusuario.md) | Uso operativo de pantallas SOC |
| [../arquitectura.md](../arquitectura.md) | Arquitectura técnica general |
| [../estado_arte_aplicado/](../estado_arte_aplicado/) | Trazabilidad estado del arte → implementación en código |

## Código fuente de referencia

| Artefacto | Ruta |
|-----------|------|
| Constantes de la matriz | `frontend/src/app/core/constants/iso.constants.ts` |
| Modelos ISO / riesgo / vulnerabilidad | `frontend/src/app/core/models/iso.models.ts` |
| Servicio central de cumplimiento | `frontend/src/app/core/services/iso-compliance.service.ts` |
| Reportes extendidos (frontend) | `frontend/src/app/core/models/report.model.ts` |
| Reportes extendidos (backend) | `backend/src/models/report.model.ts` |
