# Integración SonarQube

Análisis de calidad estática del **frontend Angular** NetGuard SOC.

---

## Configuración actual

Archivo: `sonar-project.properties` en raíz del repo.

| Propiedad | Valor |
|-----------|-------|
| `sonar.projectKey` | `netguard-soc` |
| `sonar.projectName` | NetGuard SOC Frontend |
| `sonar.sources` | `src` |
| `sonar.tests` | `src` |
| `sonar.test.inclusions` | `**/*.spec.ts` |
| `sonar.typescript.lcov.reportPaths` | `coverage/lcov.info` |

---

## Flujo local

```bash
npm run test:ci
# Genera coverage/lcov.info

sonar-scanner \
  -Dsonar.projectBaseDir=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=<TOKEN>
```

---

## Integración CI (futuro)

Añadir job tras `test:ci`:

```yaml
# Ejemplo GitHub Actions (futuro)
- name: SonarQube Scan
  uses: SonarSource/sonarqube-scan-action@v2
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

---

## Quality Gate sugerido

| Métrica | Umbral |
|---------|--------|
| Coverage | ≥ 60% (objetivo 70% en dominios críticos) |
| Bugs | 0 críticos |
| Vulnerabilities | 0 altas |
| Code smells | Tendencia estable o decreciente |
| Duplications | < 3% |

---

## Exclusiones justificadas

- `**/node_modules/**`
- `**/dist/**`
- Assets estáticos sin lógica

No excluir `core/services` de seguridad sin revisión.

---

## Responsabilidades

| Rol | Tarea |
|-----|-------|
| Dev | Corregir issues antes de merge |
| Tech lead | Aprobar excepciones documentadas |
| Fase 7 | Ver [instrucciones/fase_7_testing_qa_sonarqube_cursor.md](../instrucciones/fase_7_testing_qa_sonarqube_cursor.md) |

---

## Backend futuro

Crear proyecto Sonar separado `netguard-soc-api` cuando exista carpeta `backend/`.
