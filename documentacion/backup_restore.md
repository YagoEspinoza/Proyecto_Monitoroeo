# Backup y restauración

Plan de continuidad de datos para NetGuard SOC. La mayoría de componentes de persistencia son **futuros**; este documento define la estrategia objetivo.

---

## Estado actual

| Dato | Persistencia actual | Backup |
|------|---------------------|--------|
| Sesión / token | localStorage (cliente) | No centralizado |
| Configuración UI | Servicios mock / memoria | No |
| Alertas, VLANs, dispositivos | Mock en memoria | No |
| Auditoría | Mock / memoria en sesión | Export manual vía reportes |

---

## Estado futuro (objetivo)

| Activo | Método de backup | Frecuencia |
|--------|------------------|------------|
| Base de datos (PostgreSQL) | pg_dump / snapshots | Diario + incremental |
| Configuración sistema | Export JSON versionado | Semanal |
| Logs de auditoría | Archivo + replicación SIEM | Continuo |
| Políticas de seguridad | Incluidas en BD + Git | Cada cambio |
| Reportes generados | Object storage (S3-compatible) | Según demanda |
| Imágenes Docker | Registry con tags | Por release |

---

## Qué respaldar

### 1. Configuración

- Umbrales de alertas
- Parámetros de retención
- Integraciones GNS3/VMware (endpoints, credenciales en vault)
- Roles y usuarios (sin hashes en texto plano)

### 2. Logs

- Tabla `audit_logs` (futuro)
- Rotación: hot 30 días, warm 90, cold 1 año

### 3. Base de datos (futuro)

Esquemas principales por dominio:

- `users`, `sessions`
- `devices`, `vlans`, `quarantine_hosts`
- `security_policies`, `alerts`, `incidents`

### 4. Reportes

- PDF/CSV exportados almacenados con checksum SHA-256

### 5. Políticas

- Export YAML/JSON desde API
- Control de versiones en repositorio privado (opcional)

---

## Procedimiento de backup (futuro)

```bash
# Ejemplo PostgreSQL
pg_dump -h db.internal -U netguard -Fc netguard_soc > backup_$(date +%Y%m%d).dump
```

Automatizar con cron o job Kubernetes; cifrar backups en reposo (AES-256).

---

## Procedimiento de restauración

| Escenario | Pasos |
|-----------|-------|
| Corrupción parcial de alertas | Restaurar tabla desde dump más reciente |
| Pérdida total de BD | Restaurar último backup full + WAL si aplica |
| Error de despliegue | Preferir [rollback.md](./rollback.md) de aplicación |
| Desastre en DC | Restaurar BD + frontend desde registry en sitio DR |

### Validación post-restore

1. Health check API
2. Login con usuario admin
3. Conteo de políticas y VLANs vs backup manifest
4. Prueba de lectura en auditoría

---

## RPO / RTO objetivo (producción futura)

| Métrica | Objetivo |
|---------|----------|
| RPO (pérdida máxima de datos) | ≤ 1 h |
| RTO (tiempo de recuperación) | ≤ 4 h |

Ajustar según SLA del negocio.

---

## Responsabilidades

| Rol | Tarea |
|-----|-------|
| Admin sistema | Configurar jobs de backup |
| SOC lead | Validar integridad de logs de auditoría |
| DevOps | Pruebas de restore trimestrales |

---

## Relación con incidentes

Tras un incidente mayor, restaurar desde backup **anterior al compromiso** si la BD pudo alterarse. Documentar en postmortem.

Ver [incident_response.md](./incident_response.md).
