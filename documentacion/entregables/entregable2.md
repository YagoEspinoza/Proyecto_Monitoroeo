# Entregable 2 — Implementación del frontend SOC

**Proyecto:** NetGuard SOC / MyMonitoreo

---

## 1. Resumen de implementación

Se desarrolló una **Single Page Application** en Angular 21 que cubre los flujos operativos de un centro SOC/NOC académico, utilizando servicios mock para simular telemetría de red hasta la disponibilidad del backend Node.js.

---

## 2. Stack tecnológico

| Tecnología | Versión / Uso |
|------------|---------------|
| Angular | 21.x |
| TypeScript | 5.9 |
| Chart.js | KPIs y gráficos |
| socket.io-client | Preparación WebSocket |
| Vitest | Pruebas unitarias |
| Docker + nginx | Despliegue frontend |

---

## 3. Módulos implementados

| Módulo / Página | Ruta | Dominio |
|-----------------|------|---------|
| Login | `/login` | Auth |
| Visión general | `/vision-general` | NetworkMonitoring |
| Dispositivos | `/dispositivos` | NetworkMonitoring |
| Alertas | `/alertas` | ThreatDetection |
| VLANs | `/vlans` | VLANManagement |
| Cuarentena | `/vlan-cuarentena` | Quarantine |
| Topología | `/topologia` | NetworkMonitoring |
| Políticas | `/politicas` | SecurityPolicies |
| Auditoría | `/auditoria` | AuditLogs |
| Simulación | `/simulacion-ataques` | ThreatDetection |
| Configuración | `/configuracion` | Users |
| Reportes | `/reportes` | AuditLogs |
| Perfil | `/perfil` | Users |

---

## 4. Servicios core destacados

```
auth.service.ts
mock-network.service.ts / network-api.service.ts
security-policy.service.ts
audit-trail.service.ts
attack-simulation.service.ts
soc-ai.service.ts
soc-event.service.ts
token-interceptor.ts
```

---

## 5. Seguridad en cliente

- Guards por autenticación y rol
- Permisos `PERMISOS_POR_ROL`
- Confirmación en acciones de cuarentena
- Interceptor Bearer preparado para JWT

---

## 6. Evidencias de pruebas

| Tipo | Estado |
|------|--------|
| Unit tests (auth, guards, mock-network) | Implementados parcialmente |
| CI GitHub Actions | Configurado |
| SonarQube | `netguard-soc` configurado |
| Pruebas manuales flujo SOC | Documentadas en avances |

Comando: `npm run test:ci`

---

## 7. Capturas sugeridas (para informe)

Incluir en el documento final del docente:

1. Login
2. Dashboard SOC
3. Centro de alertas con severidades
4. VLAN de cuarentena
5. Políticas de seguridad
6. Auditoría
7. Asistente IA SOC

---

## 8. Limitaciones conocidas

- Sin persistencia servidor
- Aislamiento VLAN simulado
- IA basada en plantillas
- GNS3/VMware no conectados

Marcado explícitamente como **futuro** en documentación.

---

## 9. Instrucciones de ejecución

Ver [../manual-desarrollo.md](../manual-desarrollo.md):

```bash
npm install
npm start
```

---

## 10. Conclusión entregable 2

El frontend demuestra un **MVP SOC funcional** para laboratorio, con arquitectura preparada para API REST, WebSockets e integraciones de red documentadas en `documentacion/implementacion/`.

---

## Referencias

- [../manualdeusuario.md](../manualdeusuario.md)
- [../avances/](../avances/)
- [../implementacion/openapi-angular-backend-node.yaml](../implementacion/openapi-angular-backend-node.yaml)
