# Resumen de reglas — Sistema de monitoreo VLAN / SOC

Documento transversal que resume las reglas obligatorias del proyecto NetGuard SOC.

---

## 1. Dominios (DDD)

El sistema se organiza en **10 dominios**. Todo feature debe mapear a uno:

Auth · Users · NetworkMonitoring · VLANManagement · SecurityPolicies · ThreatDetection · IncidentResponse · Quarantine · AuditLogs · SOC_AI_Assistant

Detalle: [../reglas/ddd.md](../reglas/ddd.md)

---

## 2. Seguridad SOC

| Regla | Descripción |
|-------|-------------|
| RBAC | admin > operador > analista |
| Cuarentena | Confirmación + auditoría obligatoria |
| IA | No ejecuta aislamiento automático sin humano |
| Tokens | No en logs ni query strings |
| Lab | Simulación de ataques solo con permiso `simulate` |

Detalle: [../reglas/seguridad.md](../reglas/seguridad.md)

---

## 3. Arquitectura

- Frontend Angular consume API vía fachadas (`network-api.service`)
- Mock solo como implementación intermedia
- OpenAPI define contrato backend futuro
- WebSocket para eventos SOC en tiempo real
- GNS3/VMware detrás de adaptadores, no en UI

Detalle: [../reglas/arquitectura.md](../reglas/arquitectura.md)

---

## 4. Frontend

- Standalone + lazy loading
- Rutas en `APP_ROUTES`
- Español en UI
- Confirmación en acciones destructivas
- Sin `innerHTML` sin sanitizar

Detalle: [../reglas/frontend.md](../reglas/frontend.md)

---

## 5. Backend (futuro)

- Node.js `/api/v1`
- JWT + RBAC espejo del frontend
- Audit append-only
- Endpoints de cuarentena idempotentes

Detalle: [../reglas/backend.md](../reglas/backend.md)

---

## 6. Testing y calidad

- `npm run test:ci` antes de merge
- SonarQube `netguard-soc`
- Prioridad tests: Auth, Quarantine, Policies

Detalle: [../reglas/testing.md](../reglas/testing.md)

---

## 7. Flujo operativo VLAN

```
Monitoreo → Alerta → Política → Incidente → Cuarentena → Auditoría → Recuperación
```

Procedimiento: [../incident_response.md](../incident_response.md)

---

## 8. Estado actual vs futuro

| Hoy | Futuro |
|-----|--------|
| Mock network | API + GNS3 |
| localStorage auth | JWT httpOnly |
| Polling UI | WebSocket |
| IA plantillas | LLM backend |

---

## 9. Documentación viva

Al cerrar cada fase:

1. Actualizar `avances/avance_fase_N_*.md`
2. Marcar criterios en `instrucciones/fase_N_*.md`
3. No inventar APIs no listadas en `implementacion/openapi-*.yaml`

---

## 10. Referencia rápida Cursor

```
1. Leer instrucciones/fase_N_*.md
2. Leer reglas/ aplicables
3. Leer avances/ de la fase anterior
4. Implementar solo módulos de la fase
5. Ejecutar validaciones de la fase
6. Actualizar avance
```
