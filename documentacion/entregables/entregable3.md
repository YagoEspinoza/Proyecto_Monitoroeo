# Entregable 3 — Despliegue, calidad y roadmap de integración

**Proyecto:** NetGuard SOC / MyMonitoreo

---

## 1. Objetivo del entregable

Documentar cómo el sistema pasa de **desarrollo local** a **entorno desplegable**, cómo se asegura la **calidad** del código y cuál es el **roadmap** de integraciones (Node.js, Docker, GNS3, VMware, SonarQube, WebSockets).

---

## 2. Despliegue

### 2.1 Docker (recomendado)

- `Dockerfile` multi-stage documentado en [../manual-despliegue-docker.md](../manual-despliegue-docker.md)
- Imagen nginx sirviendo build Angular

### 2.2 Hosting compartido

- Alternativa estática en [../manual-despliegue-hosting-compartido.md](../manual-despliegue-hosting-compartido.md)
- Limitaciones: sin WebSocket nativo, sin Node en mismo host

### 2.3 Entornos

Matriz dev/staging/prod en [../deployment.md](../deployment.md)

---

## 3. Calidad y QA

| Herramienta | Propósito |
|-------------|-----------|
| Vitest | Regresión unitaria |
| `lint:check` | Build de verificación |
| SonarQube | Deuda, bugs, cobertura |
| CI | Automatización en push |

Detalle: [../implementacion/integracion_sonarqube.md](../implementacion/integracion_sonarqube.md)

---

## 4. Roadmap de integración

| Integración | Documento | Prioridad |
|-------------|-----------|-----------|
| Node.js API | [openapi-angular-backend-node.yaml](../implementacion/openapi-angular-backend-node.yaml) | Alta |
| WebSocket | [websocket-events.md](../implementacion/websocket-events.md) | Alta |
| Docker Compose full stack | manual-despliegue-docker | Media |
| GNS3 | [integracion_gns3.md](../implementacion/integracion_gns3.md) | Media |
| VMware | [integracion_vmware.md](../implementacion/integracion_vmware.md) | Media |
| SonarQube CI | integracion_sonarqube | Media |

---

## 5. Release v1.0.0

Plan y checklist: [../implementacion/release-plan-v1.0.0.md](../implementacion/release-plan-v1.0.0.md)

Breaking changes: [../implementacion/breaking-changes-v1.0.0.md](../implementacion/breaking-changes-v1.0.0.md)

---

## 6. Operaciones SOC

| Proceso | Documento |
|---------|-----------|
| Monitoreo | [../monitoring.md](../monitoring.md) |
| Incident response | [../incident_response.md](../incident_response.md) |
| Backup | [../backup_restore.md](../backup_restore.md) |
| Rollback | [../rollback.md](../rollback.md) |

---

## 7. Métricas de éxito del entregable 3

| Criterio | Meta |
|----------|------|
| Build Docker exitoso | Sí |
| CI verde | Sí |
| OpenAPI publicado | v1.0.0 |
| Documentación completa | Carpeta `documentacion/` |
| Plan backend definido | conexion_angular_backend_node.md |

---

## 8. Cronograma post-entrega académica

| Versión | Contenido |
|---------|-----------|
| v1.0.0 | Frontend estable + OpenAPI |
| v1.1.0 | Backend Node MVP + WS alertas |
| v1.2.0 | GNS3 topología |
| v1.3.0 | VMware + IA backend |

---

## 9. Conclusión

El proyecto entrega un **producto documentado y desplegable** con camino claro hacia un SOC con datos en vivo, sin declarar integraciones inexistentes como completadas.

---

## Anexos

- [../implementacion/](../implementacion/)
- [../instrucciones/fase_8_produccion_devops_cursor.md](../instrucciones/fase_8_produccion_devops_cursor.md)
