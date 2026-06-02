# Avance Fase 7 — Testing y QA

**Última actualización:** 2026-05-24  
**Semáforo:** 🟡 En curso

---

## Estado general

Vitest configurado, varios `*.spec.ts` en guards y servicios. CI en GitHub Actions. SonarQube configurado a nivel proyecto.

**Progreso estimado:** 60%

---

## Cambios realizados

- Scripts `test`, `test:ci`, `lint:check`
- Specs: auth, guards, token-interceptor, status-badge, mock-network
- `sonar-project.properties` — `netguard-soc`
- Workflow `.github/workflows/ci.yml`

---

## Módulos afectados

Transversal — todos los dominios con specs existentes o pendientes.

---

## Pruebas realizadas

| Prueba | Resultado |
|--------|-----------|
| CI en push | Verificar en repo |
| Cobertura local | Generar lcov |

---

## Pendientes

- [ ] Cobertura ≥ 70% dominios críticos
- [ ] Sonar en pipeline CI
- [ ] E2E Playwright (opcional)
- [ ] Tests cuarentena y políticas

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| CI lento | Paralelizar jobs |
| Falsos positivos Sonar | Exclusions documentadas |

---

## Próximos pasos

1. Ejecutar instrucción Fase 7 completa
2. Bloquear merge si `test:ci` falla
3. Publicar badge cobertura en README proyecto
