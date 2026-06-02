# Integración GNS3

> **Estado:** Futuro. La topología actual en Angular usa datos mock.

---

## Objetivo

Sincronizar el **mapa de red** y acciones de **cuarentena simuladas** con proyectos GNS3 del laboratorio de Taller de Investigación.

---

## Arquitectura

```
Angular (topologia)
    ↓ REST
Node.js GNS3 Adapter
    ↓ HTTP API
GNS3 Server (proyecto lab-netguard)
```

---

## Casos de uso

| Caso | Acción GNS3 |
|------|-------------|
| Visualizar topología | `GET /v2/projects/{id}/topology` |
| Estado nodo | Consultar nodo/router |
| Aislamiento lab | Cambiar VLAN en switch virtual o desconectar enlace |
| Simulación ataque | Inyectar tráfico desde nodo atacante |

---

## Configuración (futuro)

| Variable | Descripción |
|----------|-------------|
| `GNS3_URL` | `http://gns3-lab:3080` |
| `GNS3_PROJECT_ID` | UUID del proyecto |
| `GNS3_USER` / `GNS3_PASSWORD` | Credenciales (vault) |

---

## Mapeo de datos

| GNS3 | Modelo NetGuard |
|------|-----------------|
| Node | `Dispositivo` |
| Link | `Enlace` topología |
| Switch + VLAN | `Vlan` |

---

## Seguridad

- API GNS3 solo desde red de gestión
- No exponer GNS3 a Internet
- Credenciales rotadas por semestre académico

---

## Fases de implementación

1. Lectura topología read-only en dashboard
2. Refresco periódico / WebSocket `topology.updated`
3. Acción cuarentena → cambio en proyecto GNS3 (solo lab)
4. Vincular `simulacion-ataques` con escenarios GNS3

---

## Referencias

- [arquitectura.md](../arquitectura.md)
- [openapi-angular-backend-node.yaml](./openapi-angular-backend-node.yaml) — extender con `/integrations/gns3/*` cuando se defina
