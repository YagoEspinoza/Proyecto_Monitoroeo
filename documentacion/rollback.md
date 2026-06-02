# Rollback — Reversión a versión estable

Procedimiento para volver a una versión conocida estable de NetGuard SOC tras un despliegue fallido o regresión crítica.

---

## Cuándo ejecutar rollback

- Error 5xx masivo en API (futuro)
- Login o dashboard inutilizable
- Regresión en flujo de cuarentena o alertas
- Vulnerabilidad introducida en release
- Tests de humo post-deploy fallidos

**No** usar rollback para limpiar datos de un incidente de seguridad; ver [incident_response.md](./incident_response.md) y [backup_restore.md](./backup_restore.md).

---

## Versionado

| Artefacto | Esquema |
|-----------|---------|
| Frontend Docker | `netguard-soc-frontend:MAJOR.MINOR.PATCH` |
| API Node (futuro) | Misma convención semver |
| OpenAPI | Versión en `info.version` |
| BD | Migraciones numeradas reversibles |

Registrar cada deploy en bitácora `documentacion/avances/`.

---

## Rollback frontend (Docker)

```bash
# Listar tags disponibles
docker images netguard-soc-frontend

# Detener contenedor actual
docker stop netguard-frontend && docker rm netguard-frontend

# Ejecutar versión anterior estable (ejemplo 0.9.5)
docker run -d --name netguard-frontend -p 8080:80 \
  netguard-soc-frontend:0.9.5
```

Verificar: login, dashboard, rutas SPA.

---

## Rollback hosting compartido

1. Conservar ZIP del build anterior antes de cada deploy
2. Restaurar contenido de `dist/my-monitoreo/browser/` vía FTP
3. Limpiar caché CDN si aplica
4. Probar refresh en rutas profundas

---

## Rollback API y base de datos (futuro)

| Componente | Acción |
|------------|--------|
| API | Desplegar imagen tag anterior |
| Migraciones BD | Ejecutar `down` solo si migración lo soporta; si no, restaurar backup |
| WebSocket | Compatible hacia atrás 1 versión minor |

Consultar [implementacion/breaking-changes-v1.0.0.md](./implementacion/breaking-changes-v1.0.0.md) antes de rollback entre majors.

---

## Checklist post-rollback

- [ ] HTTP 200 en frontend
- [ ] Autenticación funcional
- [ ] Alertas y VLANs cargan (mock o API)
- [ ] Sin errores críticos en consola
- [ ] CI de la versión objetivo estaba en verde
- [ ] Incidente de deploy documentado

---

## Comunicación

1. Notificar a equipo SOC de ventana de inestabilidad
2. Registrar hora inicio/fin y versión restaurada
3. Abrir tarea para corregir causa antes de reintentar deploy

---

## Prevención

- Blue/green o canary en producción (futuro)
- Tag `stable` en registry apuntando última versión validada
- Smoke tests automáticos post-deploy
- Feature flags para cambios arriesgados

Ver [deployment.md](./deployment.md) y [implementacion/release-plan-v1.0.0.md](./implementacion/release-plan-v1.0.0.md).
