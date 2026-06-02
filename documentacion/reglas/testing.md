# Reglas de testing

---

## Herramientas

| Herramienta | Uso |
|-------------|-----|
| Vitest | Unit tests vía `ng test` |
| Angular TestBed | Componentes y servicios |
| SonarQube | Calidad estática (`sonar-project.properties`) |
| CI | `.github/workflows/ci.yml` |

---

## Qué probar por dominio

| Dominio | Mínimo |
|---------|--------|
| Auth | login, guards, interceptor 401 |
| Users | perfil, permisos por rol |
| NetworkMonitoring | mapeo DTO, filtros dispositivos |
| VLANManagement | listado VLAN, estados |
| SecurityPolicies | evaluación regla mock |
| ThreatDetection | severidad, orden alertas |
| Quarantine | flujo isolate/release |
| AuditLogs | append evento, export |
| SOC_AI_Assistant | respuesta sin datos sensibles filtrados |

---

## Convenciones

- Archivos `*.spec.ts` junto al código
- Nombres: `debería aislar host cuando operador confirma`
- Mocks solo en tests, no en producción
- `test:ci` debe pasar antes de merge

---

## Cobertura

| Área | Objetivo |
|------|----------|
| `core/guards`, `core/services/auth*` | ≥ 80% |
| Servicios de cuarentena y políticas | ≥ 70% |
| Páginas | Smoke de componente creado |

SonarQube: revisar `coverage/lcov.info` tras `test:ci`.

---

## Pruebas prohibidas

- Depender de GNS3 real en unit tests
- Tests que requieran orden aleatorio de alertas sin seed
- Snapshots frágiles de HTML completo

---

## E2E (futuro)

Playwright o Cypress para:

1. Login → dashboard
2. Crear alerta mock → abrir cuarentena
3. Exportar auditoría

---

## Fase 7

Ver [../instrucciones/fase_7_testing_qa_sonarqube_cursor.md](../instrucciones/fase_7_testing_qa_sonarqube_cursor.md).
