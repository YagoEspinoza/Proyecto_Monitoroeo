# Fase 7 — Testing, QA y SonarQube (Cursor)

## Objetivo general

Elevar calidad del frontend: cobertura Vitest, pipeline CI estable y análisis SonarQube sin vulnerabilidades bloqueantes.

---

## Contexto obligatorio

- Runner: Vitest vía `ng test`
- CI: `.github/workflows/ci.yml`
- Sonar: `sonar-project.properties`, key `netguard-soc`
- Scripts: `test:ci`, `lint:check`

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `.github/workflows/ci.yml` | Pipeline |
| `sonar-project.properties` | Config Sonar |
| `documentacion/reglas/testing.md` | Estándares |
| `src/app/**/*.spec.ts` | Tests existentes |

---

## Reglas que debe respetar Cursor

1. [testing.md](../reglas/testing.md)
2. No tests flaky con timers sin fakeAsync
3. No desactivar reglas Sonar sin comentario y justificación
4. Priorizar dominios críticos: Auth, Quarantine, SecurityPolicies

---

## Módulos a crear o mejorar

| Área | Acción |
|------|--------|
| core/guards | Specs completos |
| core/services | Cobertura servicios red, auth, audit |
| pages críticas | Smoke tests componentes |
| CI | Subir cobertura a artefactos |

---

## Criterios de aceptación

- [ ] `npm run test:ci` pasa en local y CI
- [ ] `npm run lint:check` pasa
- [ ] Cobertura lcov generada en `coverage/lcov.info`
- [ ] SonarQube ejecutado (local o CI) sin bugs críticos nuevos
- [ ] Documentar umbral mínimo en README doc
- [ ] Sin `fit`/`fdescribe` olvidados

---

## Restricciones

- No integrar GNS3 en unit tests
- No subir `node_modules` a Sonar
- Mantener tiempo CI < 10 min

---

## Validaciones

```bash
npm run test:ci
npm run lint:check
# Sonar scanner (si instalado)
sonar-scanner -Dsonar.projectBaseDir=.
```

---

## Pruebas mínimas (ampliación obligatoria)

| Dominio | Archivo spec objetivo |
|---------|----------------------|
| Auth | auth.service, auth-guard |
| Quarantine | tests de flujo isolate |
| Policies | security-policy.service |
| Alerts | orden por severidad |

---

## Resultado esperado

Confianza para releases: regresiones detectadas en CI y deuda visible en SonarQube.

**Bitácora:** [avance_fase_7_testing_qa.md](../avances/avance_fase_7_testing_qa.md)
