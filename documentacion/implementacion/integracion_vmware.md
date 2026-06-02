# Integración VMware

> **Estado:** Futuro. Complementa GNS3 para endpoints virtuales y sensores.

---

## Objetivo

Gestionar **VMs de laboratorio** (sensores, víctimas, atacantes) y reflejar su estado en **NetworkMonitoring** y **ThreatDetection**.

---

## Arquitectura

```
Node.js VMware Adapter (vSphere API / REST)
    ↓
vCenter o ESXi host lab
    ↓
VMs etiquetadas netguard-role=*
```

---

## Casos de uso

| Caso | API VMware |
|------|------------|
| Inventario VMs | Listar VMs con tag del proyecto |
| Estado power | poweredOn / poweredOff |
| Snapshot antes de simulación | Crear snapshot `pre-attack` |
| Aislamiento | Mover VM a port group “Quarantine-PG” |

---

## Mapeo

| VMware | NetGuard |
|--------|----------|
| VM | Dispositivo tipo `vm` |
| Port group | VLAN / segmento |
| Snapshot | Punto restauración post-simulación |

---

## Seguridad

- Cuenta de servicio con permisos mínimos en datacenter lab
- Separar vCenter producción vs lab — **nunca** cruzar credenciales
- Auditar cada `RelocateVM_Task` en AuditLogs

---

## Coordinación con GNS3

- GNS3: topología y switches
- VMware: endpoints y cargas de ataque
- Orquestador Node serializa operaciones para evitar race conditions

---

## Fases

1. Inventario read-only en `/devices?source=vmware`
2. Snapshots automáticos pre-simulación
3. Cuarentena vía port group
4. Métricas CPU/red opcionales al dashboard

---

## Referencias

- [integracion_gns3.md](./integracion_gns3.md)
- [incident_response.md](../incident_response.md)
