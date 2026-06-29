# Pruebas — NetGuard SOC / MyMonitoreo

Documentación de estrategia y planes de prueba del sistema completo.

---

## Contenido

| Documento | Descripción |
|-----------|-------------|
| [plan_pruebas_unitarias.md](./plan_pruebas_unitarias.md) | Plan maestro de pruebas unitarias (frontend, backend, utilidades, cobertura y prioridades) |

---

## Alcance

Este plan cubre **pruebas unitarias** de:

- **Frontend Angular 21** — dominios DDD, servicios, guards, interceptors, componentes, pipes y utilidades.
- **Backend Node.js + Express** — API de reportes, servicios, controladores, middleware y generación PDF.

No incluye pruebas E2E ni integración con GNS3/VMware (ver sección correspondiente en el plan maestro).

---

## Referencias relacionadas

| Documento | Uso |
|-----------|-----|
| [../reglas/testing.md](../reglas/testing.md) | Convenciones y umbrales de cobertura |
| [../instrucciones/fase_7_testing_qa_sonarqube_cursor.md](../instrucciones/fase_7_testing_qa_sonarqube_cursor.md) | Instrucciones ejecutables Fase 7 |
| [../avances/avance_fase_7_testing_qa.md](../avances/avance_fase_7_testing_qa.md) | Bitácora de avance |
| [../arquitectura.md](../arquitectura.md) | Dominios y capas del sistema |

---

## Ejecución rápida

```bash
# Frontend (Vitest vía ng test)
cd frontend
npm run test        # modo watch
npm run test:ci     # CI con cobertura (lcov)

# Backend (pendiente configurar runner — ver plan)
cd backend
npm run lint        # solo verificación TypeScript hoy
```

---

**Última actualización:** 2026-06-29
