# Reglas de seguridad — SOC

---

## Autenticación y autorización

| Regla | Detalle |
|-------|---------|
| JWT en header | `Authorization: Bearer` vía `token-interceptor` |
| Guards en rutas sensibles | Cuarentena, políticas, configuración, simulación |
| Menor privilegio | Analista: read + audit; sin isolate ni config |
| Sesión | Expiración y logout invalidan token (futuro backend) |

---

## Datos sensibles

- No loguear contraseñas, tokens ni claves API GNS3
- Enmascarar MAC/IP parcial en exports públicos si aplica política
- `sanitize-display.pipe` para contenido dinámico

---

## VLAN de cuarentena

- Siempre confirmación explícita del operador
- Auditar cada `isolate` y `release`
- Validar rol antes de ejecutar (operador o admin)
- En producción futura: validar que el host no sea infraestructura crítica (lista blanca)

---

## Políticas de seguridad

- Política desactivada no debe generar alertas
- Acciones automáticas a cuarentena solo si flag `autoQuarantine` está activo
- Cambios de política solo admin/operador

---

## Simulación de ataques

- Solo roles autorizados (`simulate` en `PERMISOS_POR_ROL`)
- Banner visible “ENTORNO DE LABORATORIO”
- Deshabilitar en build de producción si `environment.production` (flag futuro)

---

## Frontend

- CSP estricta en nginx
- No almacenar JWT en sessionStorage si hay riesgo XSS — preferir httpOnly cookie (futuro)
- HTTPS obligatorio en staging/prod

---

## Dependencias

- `npm audit` en CI
- Actualizar Angular y socket.io ante CVEs

---

## Respuesta a incidentes

Seguir [../incident_response.md](../incident_response.md). La seguridad del software soporta el proceso SOC, no lo reemplaza.
