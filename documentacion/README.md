# Documentación — NetGuard SOC / MyMonitoreo

Sistema de **monitoreo de red, segmentación VLAN, detección de intrusos y operaciones SOC/NOC**. Esta carpeta centraliza la documentación técnica, operativa y de desarrollo del proyecto.

---

## Estado del proyecto

| Componente | Estado |
|------------|--------|
| Frontend Angular 21 | **Implementado** (SPA con datos mock) |
| Backend Node.js + API REST | **Futuro** |
| WebSockets en tiempo real | **Preparado** (`socket.io-client`; integración pendiente) |
| GNS3 / VMware | **Futuro** (laboratorio y topología) |
| Docker (frontend) | **Parcial** (`Dockerfile` + nginx) |
| SonarQube | **Configurado** (`sonar-project.properties`) |
| Base de datos persistente | **Futuro** |

---

## Índice general

### Documentos raíz

| Documento | Descripción |
|-----------|-------------|
| [arquitectura.md](./arquitectura.md) | Arquitectura actual y roadmap (capas, dominios, flujos) |
| [fases.md](./fases.md) | Resumen de fases del proyecto (infra → producción) |
| [manualdeusuario.md](./manualdeusuario.md) | Guía para operadores y analistas SOC |
| [manual-desarrollo.md](./manual-desarrollo.md) | Entorno local, Angular, convenciones |
| [manual-despliegue-docker.md](./manual-despliegue-docker.md) | Despliegue con contenedores |
| [manual-despliegue-hosting-compartido.md](./manual-despliegue-hosting-compartido.md) | Hosting estático sin Docker |
| [deployment.md](./deployment.md) | Dev / staging / producción |
| [monitoring.md](./monitoring.md) | Observabilidad, métricas y salud del sistema |
| [incident_response.md](./incident_response.md) | Flujo ante intrusos y cuarentena |
| [backup_restore.md](./backup_restore.md) | Respaldo y restauración (plan futuro) |
| [rollback.md](./rollback.md) | Reversión a versión estable |

### Carpetas

| Carpeta | Contenido |
|---------|-----------|
| [reglas/](./reglas/) | Estándares de código, seguridad, DDD y dominios |
| [instrucciones/](./instrucciones/) | Guías ejecutables por fase para Cursor |
| [avances/](./avances/) | Bitácora de progreso por fase |
| [implementacion/](./implementacion/) | OpenAPI, WebSockets, integraciones e releases |
| [entregables/](./entregables/) | Entregables académicos e informe final |

---

## Dominios del sistema (DDD)

| Dominio | Responsabilidad |
|---------|-----------------|
| **Auth** | Login, tokens, guards, recuperación de contraseña |
| **Users** | Perfil, roles (`admin`, `operador`, `analista`) |
| **NetworkMonitoring** | Dispositivos, topología, KPIs del dashboard |
| **VLANManagement** | VLANs activas y segmentación |
| **SecurityPolicies** | Reglas y políticas de seguridad |
| **ThreatDetection** | Alertas, simulación de ataques |
| **IncidentResponse** | Clasificación, contención, notificaciones |
| **Quarantine** | VLAN de cuarentena y aislamiento |
| **AuditLogs** | Auditoría, trazabilidad, exportación |
| **SOC_AI_Assistant** | Asistente IA para operadores SOC |

---

## Fases de desarrollo (resumen)

1. Seguridad y acceso  
2. Dashboard y monitoreo  
3. VLANs y cuarentena  
4. Políticas de seguridad  
5. Alertas y logs  
6. Asistente IA SOC  
7. Testing, QA y SonarQube  
8. Producción y DevOps  

Detalle: [fases.md](./fases.md) · Instrucciones Cursor: [instrucciones/](./instrucciones/) · Avances: [avances/](./avances/)

---

## Convenciones de lectura

- **Estado actual**: lo que existe hoy en el repositorio (principalmente Angular + servicios mock).
- **Estado futuro**: backend Node.js, persistencia, integraciones GNS3/VMware, WebSockets productivos.
- Los documentos marcan explícitamente ambos estados para evitar suposiciones incorrectas.

---

## Contacto y mantenimiento

Actualizar `avances/` al cerrar cada fase. Las reglas en `reglas/` son obligatorias para contribuciones asistidas por Cursor o por el equipo de desarrollo.
