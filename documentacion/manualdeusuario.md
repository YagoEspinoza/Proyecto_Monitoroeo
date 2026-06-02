# Manual de usuario — NetGuard SOC

Guía para **operadores SOC**, **analistas** y **administradores** que utilizan la consola de monitoreo de red y ciberseguridad.

> **Nota:** En el estado actual, muchos datos son simulados (mock). Las acciones de red real (cambio de VLAN en switches) se activarán cuando el backend e integraciones estén conectados.

---

## 1. Acceso al sistema (Login)

1. Abra la URL de la aplicación (por ejemplo `http://localhost:4200` en desarrollo).
2. Ingrese **usuario** y **contraseña**.
3. Tras autenticarse, será redirigido al **Dashboard SOC**.

| Rol | Descripción |
|-----|-------------|
| Administrador | Configuración global, políticas, cuarentena |
| Operador SOC | Monitoreo, aislamiento, simulaciones |
| Analista SOC | Lectura, auditoría, análisis |

Si olvidó su contraseña, use **Recuperar contraseña** (`/recuperar-password`).

---

## 2. Dashboard (Visión general)

Ruta: **Visión general** (`/vision-general`)

- KPIs: dispositivos online, alertas activas, VLANs, incidentes
- Gráficos de actividad y tendencias
- Accesos rápidos a alertas críticas

**Uso recomendado:** primer punto de control al iniciar turno NOC/SOC.

---

## 3. Dispositivos conectados

Ruta: **Dispositivos** (`/dispositivos`)

| Acción | Descripción |
|--------|-------------|
| Ver lista | Hosts, IP, MAC, VLAN, estado |
| Filtrar | Por estado, VLAN o texto |
| Detalle | Información de conectividad y última actividad |

---

## 4. VLANs

Ruta: **VLANs activas** (`/vlans`)

- Consultar VLANs configuradas (ID, nombre, subred)
- Ver dispositivos asociados por segmento
- **Futuro:** crear/editar VLAN vía API y sincronizar con GNS3

---

## 5. Alertas

Ruta: **Centro de alertas** (`/alertas`)

1. Revise alertas por **severidad** (crítica, alta, media, baja).
2. Abra el detalle para ver origen, política disparada y timestamp.
3. Tome acción: reconocer, escalar o iniciar contención.

Las notificaciones también aparecen en el **centro de notificaciones** (icono en barra superior).

---

## 6. Políticas de seguridad

Ruta: **Políticas** (`/politicas`) — requiere rol **admin** u **operador**

- Definir reglas (origen, destino, puertos, umbral)
- Asignar severidad y acción (alertar, auditar, cuarentena automática)
- Activar/desactivar políticas

---

## 7. Configuración

Ruta: **Configuración** (`/configuracion`) — solo **administrador**

- Parámetros del sistema (umbrales, retención de logs)
- Preferencias de notificaciones
- Tema claro/oscuro (si está habilitado en UX)

---

## 8. Logs y auditoría

Ruta: **Auditoría y logs** (`/auditoria`)

| Tipo de evento | Ejemplo |
|----------------|---------|
| Autenticación | Login exitoso/fallido |
| Red | Cambio de VLAN, dispositivo aislado |
| Seguridad | Política violada, simulación de ataque |
| Administración | Cambio de configuración |

Exporte registros desde **Reportes** cuando necesite evidencia para compliance.

---

## 9. VLAN de cuarentena

Ruta: **VLAN de cuarentena** (`/vlan-cuarentena`)

**Propósito:** aislar hosts comprometidos o sospechosos sin apagar la red completa.

| Paso | Acción |
|------|--------|
| 1 | Identificar host en alerta o dispositivos |
| 2 | Seleccionar **Aislar en cuarentena** |
| 3 | Confirmar en diálogo de seguridad |
| 4 | Verificar que el host aparece en lista de cuarentena |
| 5 | Tras remediación, **liberar** de cuarentena (operador/admin) |

---

## 10. Asistente IA SOC

Panel flotante **Asistente SOC** (disponible en layout principal)

- Pregunte sobre alertas activas, políticas o procedimientos
- Solicite resumen de incidentes o pasos de contención
- **Actual:** respuestas basadas en contexto simulado
- **Futuro:** análisis con datos en vivo del backend

---

## 11. Simulación de ataques

Ruta: **Simulación de ataques** (`/simulacion-ataques`)

Solo entornos de **laboratorio**. Permite ejecutar escenarios (port scan, brute force, etc.) para validar detección y alertas.

> No ejecutar en producción sin autorización explícita.

---

## 12. Topología y mapa de red

Ruta: **Mapa de red** (`/topologia`)

Visualización de nodos y enlaces. En integración futura con **GNS3**, reflejará la topología real del lab.

---

## 13. Reportes

Ruta: **Reportes y exportación** (`/reportes`)

- Exportar alertas, auditoría o inventario de dispositivos
- Formatos según implementación (CSV/JSON en cliente actual)

---

## 14. Perfil de usuario

Ruta: **Perfil** (`/perfil`)

- Actualizar nombre y preferencias
- Ver rol asignado
- Cerrar sesión

---

## Atajos y buenas prácticas SOC

1. Monitorear dashboard al inicio del turno.
2. Priorizar alertas **críticas** y **altas**.
3. Documentar cada aislamiento en auditoría (automático al confirmar acción).
4. Usar cuarentena antes de eliminar conectividad total.
5. Realizar **postmortem** tras incidentes mayores (ver [incident_response.md](./incident_response.md)).

---

## Soporte

Para problemas de acceso o datos incorrectos, contacte al administrador del sistema. Para desarrollo y despliegue, consulte [manual-desarrollo.md](./manual-desarrollo.md).
