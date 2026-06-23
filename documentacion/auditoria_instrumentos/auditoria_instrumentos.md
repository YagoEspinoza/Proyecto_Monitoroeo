# Auditoría de Instrumentos — Matriz vs. Código Real (NetWatch Pro / NetGuard SOC)

**Repositorio auditado:** https://github.com/YagoEspinoza/Proyecto_Monitoroeo
**Método:** Revisión directa del código fuente (backend Node/Express/Mongoose, frontend Angular), búsqueda de librerías reales de red (SNMP/SSH/pcap), búsqueda de crypto/hashing, búsqueda de monitoreo real de CPU/RAM, y lectura de servicios clave (`mock-network.service.ts`, `iso-compliance.service.ts`).

**Hallazgo estructural más importante:** el propio código declara `modoSimulacion = signal(true)`. Los valores de VLANs, dispositivos, alertas, disponibilidad (uptime, RTO) y métricas ISO 25000 están **hardcodeados o generados en memoria del navegador**, no leídos de switches/routers reales vía SNMP/SSH, ni capturados con Wireshark, ni medidos con cronómetro sobre un evento real. El backend (Express + Mongoose + PDFKit) solo persiste **reportes de incidentes** en MongoDB; no tiene ninguna librería de redes (no `net-snmp`, no `ssh2`, no `pcap`), ni de hashing (`crypto`), ni de monitoreo de sistema (`os`, `child_process`).

Esto no significa que el software esté mal — es válido como **prototipo/dashboard SOC funcional con datos simulados**, pero condiciona qué instrumentos puedes documentar como "ya implementados con evidencia real" vs. cuáles debes declarar como **pendientes de integración real** o **adaptar la metodología** a "simulación controlada".

Leyenda de estado:
- ✅ **Implementado real** — el código ejecuta la medición real descrita en el instrumento
- 🟡 **Simulado/parcial** — existe en el software pero con datos mock, hardcodeados o cálculo derivado, no medición directa del evento real
- ❌ **No implementado** — no se encontró evidencia en el código

---

## Variable Independiente: Arquitectura de Red Ciberresiliente (VLAN y HSRP)

| Instrumento | Estado | Evidencia en código | Observación |
|---|---|---|---|
| Ficha de Verificación de VLANs | 🟡 | `mock-network.service.ts` → `datosInicialesVlans()`; modelo `VlanSegmento` | Los campos (N° VLAN, nombre, puertos, estado) existen en el modelo y se muestran en `/vlans`, pero los datos son iniciales hardcodeados, no un `show vlan brief` real vía SSH |
| Guía de Pruebas de Conectividad Inter-VLAN | 🟡 | `iso.constants.ts` → `POLITICAS_TRAFICO_VLAN` (matriz PERMIT/DENY) | Es una matriz de políticas declarada, no una prueba de ping/traceroute ejecutada en tiempo real contra equipos |
| Ficha de Direccionamiento IP | 🟡 | Campos en `VlanSegmento` (gateway, subred) | Presentes como datos de modelo, no obtenidos de `show ip interface brief` |
| Ficha de Configuración FHRP (HSRP/GLBP) | 🟡 | `iso-compliance.service.ts` → objeto `gateways` (RT-CORE-01/02) | Strings y estados hardcodeados; no hay consulta real `show standby brief` |
| Bitácora de Tiempos de Convergencia | 🟡 | `eventosDisponibilidad`, campo `tiempoRecuperacionSeg: 4` | Valor fijo en el código (4 segundos), no medido por cronómetro ante una falla real de gateway |
| Registro de Disponibilidad de Red | 🟡 | `kpiDisponibilidadRed`, `uptime: 99.98` (hardcodeado) | No hay proceso de polling periódico real que calcule disponibilidad sobre eventos reales |
| Ficha Comparativa de Topología (redundancia) | 🟡 | `ResilienciaInfraestructura`, modelo `PuntoUnicoFallo` | Estructura de datos correcta, alimentada con dispositivos mock (RT-CORE, SW-DIST) |
| Ficha de Distribución de Tráfico GLBP | 🟡 | `balanceoCargaActivo` (booleano) en `ResilienciaInfraestructura` | Es un flag, no una medición real de % de tráfico por gateway vía Wireshark |
| Bitácora de Captura de Tráfico (% pérdida) | ❌ | No se encontró librería de captura de paquetes (pcap) ni cálculo de pérdida de paquetes | No hay integración con Wireshark/tshark en el código |

**Resumen Variable Independiente:** 0 instrumentos con medición real directa, 8 simulados/parciales, 1 no implementado.

---

## Variable Mediadora 1: Gestión de Seguridad ISO/IEC 27001

| Instrumento | Estado | Evidencia en código | Observación |
|---|---|---|---|
| Matriz de Identificación de Riesgos (Anexo A) | 🟡 | `iso.models.ts` → `RiesgoTI`; `iso-compliance.service.ts` → `riesgos` | Estructura de datos correcta; se calcula desde vulnerabilidades mock, no desde un análisis documental externo cargado |
| Matriz de Evaluación de Riesgos (prob. × impacto) | 🟡 | Tabla con semáforo en `reportes.component.html` | El cálculo de nivel de riesgo existe, pero la probabilidad/impacto provienen de datos simulados |
| Checklist de Tratamiento de Riesgos | 🟡 | Campo `tratamiento` en modelo de reporte (MongoDB) | Existe el campo, pero se llena manualmente al crear un reporte, no automáticamente tras aplicar un control |
| Bitácora de Eventos de Seguridad | 🟡 | `SocEventService` → `eventos`; `LogSistema` | Sí registra eventos con fecha/tipo/origen/severidad en tiempo de ejecución de la simulación de ataques — **este es uno de los instrumentos mejor cubiertos**, aunque el origen del evento es el simulador, no un sensor de red real |
| Checklist de Vulnerabilidades de Configuración | 🟡 | `VulnerabilidadTI` en `iso-compliance.service.ts` | Datos derivados de alertas simuladas (ej. puerto 445 expuesto), no de un escaneo real (no hay integración tipo Nmap) |
| Ficha de Registro de Incidentes (ID, IP, acción) | ✅ | `report.model.ts` (backend) + `ReportModel` en MongoDB; endpoint `POST /api/reports` | **Esto sí es persistencia real**: cada incidente creado desde la UI se guarda en MongoDB con campos `activoAfectado`, `amenaza`, `tratamiento`, etc. Es el instrumento mejor implementado de toda la matriz |
| Checklist de Controles Anexo A ISO/IEC 27001:2022 | 🟡 | `CONTROLES_ISO_27001` en `iso.constants.ts` | Lista de controles declarada como constante; el cumplimiento Sí/No es configurable pero no verificado automáticamente contra el estado real del sistema |
| Ficha Resumen de Cumplimiento Normativo (%) | 🟡 | `cumplimientoIso27001` (computed); endpoint `GET /api/reports/iso27001-summary` | El % se calcula matemáticamente sobre los controles marcados, es un cálculo válido pero sobre datos declarados manualmente |
| Formato de Auditoría Interna de Seguridad | 🟡 | `AuditTrailService`, módulo `/auditoria` | Registra acciones de usuarios del sistema (login, cambios), no una auditoría técnica de la red en sí |

**Resumen Mediadora 1:** 1 instrumento con persistencia real (incidentes en MongoDB), 8 simulados/parciales.

---

## Variable Mediadora 2: Calidad del Software ISO/IEC 25000 (SQuaRE)

| Instrumento | Estado | Evidencia en código | Observación |
|---|---|---|---|
| Ficha de Pruebas Funcionales (3 vectores de ataque) | 🟡 | `attack-simulation.service.ts` → escenarios (`Brute Force SSH`, etc.) | Existen escenarios simulados que generan alertas; sirve como evidencia de "detección" pero dentro de un simulador, no un ataque real ejecutado contra la red |
| Ficha Comparativa de Exactitud (vs. Wireshark) | ❌ | No se encontró integración con Wireshark/PCAP ni comparación de logs | No es posible generar este instrumento sin una captura de red real paralela |
| Matriz de Trazabilidad Requerimiento-Función | ❌ | No se encontró un documento o módulo de trazabilidad de requerimientos en el código | Este instrumento es más bien documental/manual, no se espera que esté en el código |
| Bitácora de Disponibilidad del Software (uptime 48h) | 🟡 | Endpoint `GET /health` en backend | Existe un healthcheck básico, pero no hay un proceso que registre uptime cada cierto intervalo en archivo/BD durante 48h continuas |
| Ficha de Prueba de Tolerancia a Fallos (SNMP) | ❌ | No hay conexión SNMP real, por lo tanto no se puede "perder" una conexión SNMP real | El evento `snmp_perdido` en `iso-compliance.service.ts` es un tipo de alerta simulada, no una pérdida real de sesión SNMP |
| Bitácora de Tiempos de Recuperación del Software | ❌ | No se encontró lógica de reinicio automático del servicio ni cronometraje de ese reinicio | |
| Ficha de Tiempos de Alerta (evento → alerta, segundos) | 🟡 | `AlertaIntruso` tiene timestamp; `SocEventService` genera eventos con `Date.now()` | Hay timestamps reales de cuándo se genera la alerta en el simulador, lo cual sí permite medir el tiempo simulación→alerta del software (aunque no es un ataque de red real) |
| Ficha de Consumo de Recursos (CPU/RAM) | ❌ | No se encontró `os.cpuUsage()`, `process.memoryUsage()`, ni librería tipo `psutil`/`systeminformation` | No hay monitoreo real de recursos del proceso |
| Ficha de Integridad de Procesamiento (eventos generados vs. registrados) | 🟡 | Se puede inferir comparando `attack-simulation.service.ts` (generador) vs. `SocEventService` (registrador) | No hay un contador explícito de "eventos perdidos", pero la arquitectura permite calcularlo indirectamente |
| Checklist de Arquitectura Modular | ✅ | Estructura real del repo: `core/services`, `core/models`, `pages/`, separación backend/frontend | Esto sí es verificable directamente en la organización de carpetas del proyecto |
| Ficha de Compatibilidad Multi-fabricante (Cisco/MikroTik vía SNMP) | ❌ | No existe integración SNMP real con ningún fabricante | |
| Checklist de Despliegue del Software | ✅ | `Dockerfile`, `manual-despliegue-docker.md`, `deployment.md` | Sí hay evidencia real de un proceso de instalación documentado y dockerizado |

**Resumen Mediadora 2:** 2 implementados reales (arquitectura modular, despliegue), 4 simulados/parciales, 5 no implementados. **Esta es la variable con más brechas.**

---

## Variable Dependiente: Postura de Ciberseguridad Institucional

| Instrumento | Estado | Evidencia en código | Observación |
|---|---|---|---|
| Checklist de Control de Acceso (ACL/autenticación) | 🟡 | `AuthService` + RBAC (roles admin/operador/analista) | La autenticación de usuarios al sistema sí es real; las "ACL de red" entre VLANs son la matriz de políticas simulada ya mencionada |
| Ficha de Verificación de Cifrado (SSH habilitado) | ❌ | No se encontró verificación real de cifrado en dispositivos de red | El texto "SSH" aparece solo como descripción de protocolo en políticas, no como verificación técnica |
| Ficha de Verificación de Integridad (hash antes/después) | ❌ | No se encontró ningún uso de `crypto`/SHA-256 en el código | Confirmado: no hay librería de hashing en backend ni frontend |
| Ficha de Identificación de Vectores de Ataque | 🟡 | `attack-simulation.service.ts` (catálogo de escenarios) | Bien cubierto a nivel de catálogo/simulador |
| Matriz de Evaluación de Riesgos por Escenario | 🟡 | Mismo mecanismo que en Mediadora 1 (`RiesgoTI`) | |
| Checklist de Controles de Mitigación | 🟡 | Campo `tratamiento` en reportes | |
| Bitácora de Alertas del Software | ✅ | `AlertaIntruso[]`, `SocEventService.eventos`, visibles en `/alertas` con persistencia en signal de la sesión | Buen nivel de implementación dentro del alcance del simulador |
| Checklist de Vulnerabilidades de Infraestructura | 🟡 | `VulnerabilidadTI` computed | |
| Ficha de Registro de Incidentes de Seguridad | ✅ | Mismo respaldo real en MongoDB que en Mediadora 1 | |
| Checklist Final de Cumplimiento ISO/IEC 27001 | 🟡 | `cumplimientoIso27001`, endpoint resumen | |
| Formato de Auditoría Final | 🟡 | `AuditTrailService` | |
| Ficha Resumen de Alineación Normativa | 🟡 | Cálculo derivado, igual que cumplimiento | |
| Bitácora de Caídas del Servicio | 🟡 | `eventosDisponibilidad` (mock) | |
| Ficha de Tiempo de Exposición (compromiso→contención) | 🟡 | Se puede derivar de timestamps de alerta vs. timestamp de cambio a estado "aislado" en `DispositivoRed.seguridad` | Posible pero no está calculado explícitamente como campo propio |
| Ficha de Efectividad de Mitigación (% neutralizados) | 🟡 | Se puede derivar contando alertas con acción tomada vs. total generadas en `attack-simulation.service.ts` | No hay un campo explícito `porcentajeEfectividad` calculado |

**Resumen Dependiente:** 2 implementados reales (alertas, incidentes en BD), 13 simulados/parciales, 0 no implementados.

---

## Resumen general — Conteo final (45 instrumentos)

| Estado | Cantidad | % |
|---|---|---|
| ✅ Implementado real | 5 | 11% |
| 🟡 Simulado / parcial | 31 | 69% |
| ❌ No implementado | 9 | 20% |

**Los 5 instrumentos con implementación real verificada:**
1. Ficha de Registro de Incidentes (ISO 27001) — persistencia MongoDB
2. Checklist de Arquitectura Modular (ISO 25000) — estructura del repo
3. Checklist de Despliegue del Software (ISO 25000) — Docker + manuales
4. Bitácora de Alertas del Software (Dependiente) — eventos de sesión
5. Ficha de Registro de Incidentes de Seguridad (Dependiente) — mismo respaldo MongoDB

**Los 9 instrumentos sin evidencia en el código:**
1. Bitácora de Captura de Tráfico (% pérdida — requiere pcap)
2. Ficha Comparativa de Exactitud vs. Wireshark
3. Matriz de Trazabilidad Requerimiento-Función
4. Ficha de Prueba de Tolerancia a Fallos SNMP
5. Bitácora de Tiempos de Recuperación del Software
6. Ficha de Consumo de Recursos (CPU/RAM real)
7. Ficha de Compatibilidad Multi-fabricante SNMP
8. Ficha de Verificación de Cifrado (SSH real)
9. Ficha de Verificación de Integridad (hash SHA-256)

---

## Qué hacer con esto (3 caminos, no excluyentes)

1. **Implementar lo que falta** (recomendado solo para los instrumentos más citables en tu Capítulo IV: hash de integridad con `crypto` de Node es 20 minutos de trabajo; medición real de CPU/RAM con `process.memoryUsage()` también es rápido).
2. **Reformular el instrumento** para que describa honestamente lo que el software sí hace (ej. cambiar "Verificación de cifrado en enlaces SSH" por "Verificación de autenticación RBAC del sistema").
3. **Declarar la limitación metodológica explícitamente** en tu tesis (sección de limitaciones, como ya tienes redactado en `documentacion/matriz-operacionalizacion/mapeo_dimensiones_variables.md` sección 10) — es válido académicamente decir "se trabajó bajo entorno de simulación controlada en lugar de infraestructura física real", siempre que lo digas con claridad y no como si fuera medición real.

¿Quieres que profundice en alguno de los 9 instrumentos faltantes para decirte exactamente qué archivo y cuántas líneas de código te tomaría implementarlo de verdad?
