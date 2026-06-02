# Reglas de arquitectura

---

## Capas

| Capa | Contenido | Dependencias |
|------|-----------|--------------|
| UI | Components, templates | Application services |
| Application | Orquestación, casos de uso | Domain |
| Domain | Modelos, reglas de negocio | Ninguna infra |
| Infrastructure | HTTP, WebSocket, GNS3 | Domain (interfaces) |

**Actual:** UI + Application fusionados en Angular services. **Futuro:** backend con domain explícito.

---

## Bounded contexts

No mezclar en un mismo servicio:

- Gestión de VLAN (VLANManagement) con lógica de alertas (ThreatDetection)
- Auth con políticas de seguridad

Comunicación entre contextos vía:

- Eventos (`soc-event.service`)
- API REST agregada (futuro BFF)

---

## Flujos críticos

### Detección → Cuarentena

```
ThreatDetection → IncidentResponse → Quarantine → AuditLogs
```

Cada paso debe ser idempotente donde sea posible (reintentar aislamiento sin duplicar).

---

## Integraciones externas

| Sistema | Patrón |
|---------|--------|
| GNS3 | Anti-corruption layer |
| VMware | Jobs + polling de estado |
| SonarQube | Fuera de runtime |
| Docker | Solo despliegue |

---

## Contratos

- OpenAPI es fuente de verdad para REST
- Cambios breaking documentados en `breaking-changes-*.md`
- Versionado semver

---

## Decisiones prohibidas

- Lógica de switch en componentes Angular
- BD accedida directamente desde frontend
- Un solo “god service” para toda la red

Ver diagrama en [../arquitectura.md](../arquitectura.md).
