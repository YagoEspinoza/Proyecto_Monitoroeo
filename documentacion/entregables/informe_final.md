# Informe final — NetGuard SOC

**Título del proyecto:** Sistema de monitoreo de red y ciberseguridad con segmentación VLAN y operaciones SOC/NOC  
**Producto:** NetGuard SOC (MyMonitoreo)  
**Fecha:** Mayo 2026

---

## Resumen ejecutivo

NetGuard SOC es una aplicación web orientada a **monitoreo de red**, **detección de intrusos**, **políticas de seguridad** y **aislamiento en VLAN de cuarentena**, con dashboard para operaciones SOC/NOC. La implementación actual consiste en un **frontend Angular 21** con datos simulados y documentación empresarial que define la evolución hacia backend Node.js, WebSockets, Docker, GNS3, VMware y SonarQube.

---

## 1. Planteamiento del problema

Las redes empresariales y académicas utilizan VLANs para segmentar tráfico. Sin una consola unificada, los equipos de seguridad enfrentan:

- Visibilidad fragmentada de dispositivos y alertas
- Tiempos de respuesta lentos ante intrusiones
- Falta de trazabilidad en acciones de contención
- Dificultad para entrenar analistas sin laboratorio integrado

---

## 2. Objetivos cumplidos

| Objetivo | Estado |
|----------|--------|
| Consola SOC unificada | Cumplido (frontend) |
| Gestión VLAN y cuarentena | Cumplido (simulado) |
| Políticas y alertas | Cumplido (mock) |
| Auditoría y reportes | Cumplido (UI) |
| Simulación de ataques | Cumplido (lab) |
| Asistente IA SOC | Parcial (plantillas) |
| Backend e integraciones físicas | Planificado (futuro) |

---

## 3. Metodología

Desarrollo incremental en **8 fases** (ver [../fases.md](../fases.md)):

1. Seguridad y acceso  
2. Dashboard y monitoreo  
3. VLANs y cuarentena  
4. Políticas  
5. Alertas y logs  
6. Asistente IA  
7. Testing y SonarQube  
8. Producción y DevOps  

Metodología de dominios (**DDD**) con diez bounded contexts documentados en [../reglas/ddd.md](../reglas/ddd.md).

---

## 4. Arquitectura implementada

```
[Usuario SOC] → [Angular SPA] → [Servicios mock / fachada API]
                      ↓ futuro
              [Node.js API] → [BD] → [GNS3 / VMware]
                      ↓ futuro
              [WebSocket alertas en tiempo real]
```

Detalle: [../arquitectura.md](../arquitectura.md)

---

## 5. Resultados técnicos

### 5.1 Funcionalidades

- Autenticación con roles RBAC
- Dashboard con KPIs y gráficos
- Inventario de dispositivos y topología
- Centro de alertas por severidad
- VLANs y flujo de cuarentena
- Políticas de seguridad configurables
- Auditoría y exportación de reportes
- Simulación de ataques para laboratorio
- Panel de asistente IA SOC

### 5.2 Calidad

- Pruebas unitarias con Vitest
- Pipeline CI
- Configuración SonarQube `netguard-soc`
- Dockerfile para despliegue nginx

### 5.3 Documentación

Carpeta `documentacion/` con manuales, reglas, instrucciones Cursor, avances, implementación y entregables.

---

## 6. Pruebas realizadas

| Área | Método | Resultado |
|------|--------|-----------|
| Auth y guards | Unit + manual | Satisfactorio |
| Navegación módulos | Manual | Satisfactorio |
| Flujo alerta → cuarentena | Manual | En validación |
| CI build/test | Automatizado | Según pipeline |
| Docker | Build local | Pendiente validación final |

---

## 7. Análisis de riesgos

| Riesgo | Mitigación documentada |
|--------|------------------------|
| Mock vs producción | OpenAPI + fachada network-api |
| Seguridad solo en cliente | RBAC backend futuro |
| IA incorrecta | Disclaimer + no auto-aislar |
| Pérdida de logs | Estrategia backup_restore |

---

## 8. Trabajo futuro

1. Implementar API Node.js según OpenAPI 1.0.0  
2. WebSocket para alertas y KPIs  
3. Integración GNS3 para topología real  
4. VMware para VMs de laboratorio  
5. LLM controlado para SOC_AI_Assistant  
6. Persistencia PostgreSQL y SIEM  

---

## 9. Conclusiones

El proyecto demuestra que es posible construir una **plataforma SOC didáctica y escalable** comenzando por una experiencia de usuario completa en Angular, mientras se documenta de forma profesional la arquitectura objetivo. La separación por dominios de ciberseguridad (cuarentena, políticas, amenazas, auditoría) facilita el mantenimiento y la integración futura con herramientas de red y DevOps.

---

## 10. Referencias del proyecto

| Recurso | Ubicación |
|---------|-----------|
| Índice documentación | [../README.md](../README.md) |
| Manual usuario | [../manualdeusuario.md](../manualdeusuario.md) |
| Entregable 1 — Diseño | [entregable1.md](./entregable1.md) |
| Entregable 2 — Implementación | [entregable2.md](./entregable2.md) |
| Entregable 3 — Despliegue | [entregable3.md](./entregable3.md) |
| Bitácora avances | [../avances/](../avances/) |

---

## Anexo A — Glosario

| Término | Definición |
|---------|------------|
| SOC | Security Operations Center |
| NOC | Network Operations Center |
| VLAN | Virtual LAN (802.1Q) |
| Cuarentena | VLAN de aislamiento sin acceso a producción |
| IDS | Sistema de detección de intrusos (conceptual en políticas) |

---

## Anexo B — Plantilla postmortem (incidente)

| Campo | Valor |
|-------|-------|
| ID incidente | |
| Fecha/hora detección | |
| Severidad | |
| Hosts afectados | |
| Política disparada | |
| Acciones (cuarentena, etc.) | |
| Tiempo de contención | |
| Causa raíz | |
| Lecciones aprendidas | |

Ver procedimiento completo: [../incident_response.md](../incident_response.md)
