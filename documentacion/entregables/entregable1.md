# Entregable 1 — Análisis y diseño del sistema SOC

**Proyecto:** NetGuard SOC / MyMonitoreo  
**Taller de Investigación — Ingeniería de Sistemas**

---

## 1. Introducción

### 1.1 Problema

Las organizaciones con redes segmentadas por VLAN requieren visibilidad centralizada, detección temprana de intrusos y capacidad de **aislamiento rápido** sin derribar toda la infraestructura.

### 1.2 Solución propuesta

Plataforma web SOC/NOC con monitoreo de dispositivos, gestión de VLANs, políticas de seguridad, alertas, VLAN de cuarentena y asistente IA para apoyo al analista.

---

## 2. Objetivos

| Objetivo | Indicador |
|----------|-----------|
| Centralizar monitoreo | Dashboard con KPIs en tiempo casi real |
| Segmentar red | Módulo VLANManagement |
| Detectar amenazas | ThreatDetection + políticas |
| Contener incidentes | Quarantine + IncidentResponse |
| Trazabilidad | AuditLogs exportables |

---

## 3. Alcance

### Incluido

- Frontend Angular 21
- Simulación de datos y ataques (lab)
- Documentación arquitectónica y por fases
- Contrato API futuro (OpenAPI)

### Excluido en esta entrega

- Backend Node.js productivo
- Integración física con switches de producción
- Certificación comercial SOC2

---

## 4. Requisitos funcionales (resumen)

| ID | Requisito | Dominio |
|----|-----------|---------|
| RF-01 | Autenticación por roles | Auth |
| RF-02 | Dashboard SOC | NetworkMonitoring |
| RF-03 | Inventario dispositivos | NetworkMonitoring |
| RF-04 | Gestión VLANs | VLANManagement |
| RF-05 | Políticas de seguridad | SecurityPolicies |
| RF-06 | Centro de alertas | ThreatDetection |
| RF-07 | Aislamiento cuarentena | Quarantine |
| RF-08 | Auditoría y reportes | AuditLogs |
| RF-09 | Simulación ataques | ThreatDetection |
| RF-10 | Asistente IA SOC | SOC_AI_Assistant |

---

## 5. Requisitos no funcionales

| ID | Requisito |
|----|-----------|
| RNF-01 | UI en español |
| RNF-02 | RBAC admin/operador/analista |
| RNF-03 | Despliegue Docker frontend |
| RNF-04 | Tests automatizados en CI |
| RNF-05 | Análisis SonarQube |

---

## 6. Arquitectura de referencia

Ver [../arquitectura.md](../arquitectura.md) — capas presentación, aplicación (futuro), dominio e infraestructura.

---

## 7. Modelo de dominios (DDD)

Diez contextos delimitados documentados en [../reglas/ddd.md](../reglas/ddd.md).

---

## 8. Plan de fases

Ocho fases detalladas en [../fases.md](../fases.md) e [../instrucciones/](../instrucciones/).

---

## 9. Riesgos iniciales

| Riesgo | Probabilidad | Impacto |
|--------|--------------|---------|
| Retraso backend | Alta | Medio |
| Datos mock no representativos | Media | Medio |
| Complejidad GNS3 | Media | Alto |

---

## 10. Conclusiones del entregable 1

El diseño propuesto es viable como **SPA Angular** con evolución a arquitectura full-stack. La separación por dominios SOC permite implementación incremental alineada al temario de ciberseguridad y redes.

---

## Anexos

- [../README.md](../README.md)
- [../arquitectura.md](../arquitectura.md)
- [../fases.md](../fases.md)
