# Despliegue — Dev, Staging y Producción

Estrategia de despliegue para NetGuard SOC en tres entornos.

---

## Matriz de entornos

| Aspecto | Development | Staging | Production |
|---------|-------------|---------|------------|
| URL ejemplo | `localhost:4200` | `staging.netguard.local` | `soc.empresa.com` |
| Build | `ng serve` / dev build | `ng build` optimizado | `ng build` + Docker |
| API | Mock / localhost:3000 | API staging | API prod HA |
| Datos | Mock, seed | Copia anonimizada | Datos reales |
| HTTPS | No | Sí (cert interno) | Sí (TLS público) |
| WebSocket | Deshabilitado o local | Habilitado | Habilitado + WSS |
| Logs | Consola | Agregador staging | SIEM / ELK futuro |

---

## Development

```bash
npm install
npm start
```

- Hot reload activo
- Guards y roles probables con usuarios mock en `auth.service`
- `environment.ts` con `production: false` (configurar en angular.json)

---

## Staging

**Objetivo:** validar integración Angular ↔ API Node (futuro) antes de producción.

### Pipeline sugerido

1. Push a rama `develop` o `release/*`
2. CI: `npm run test:ci` + `ng build`
3. Build imagen Docker `netguard-soc-frontend:staging`
4. Desplegar en servidor staging con tag de commit
5. Smoke tests: login, alertas, cuarentena simulada

### Configuración

| Variable | Ejemplo |
|----------|---------|
| `API_URL` | `https://api-staging.netguard.local` |
| `WS_URL` | `wss://api-staging.netguard.local` |

---

## Production

### Frontend

- Imagen Docker nginx (ver [manual-despliegue-docker.md](./manual-despliegue-docker.md))
- CDN opcional para assets estáticos
- Versionado semántico en tag de imagen: `1.0.0`, `1.0.1`

### Backend (futuro)

- Mínimo 2 instancias detrás de load balancer
- Health check: `GET /health`
- Migraciones de BD automatizadas en deploy
- Secrets en vault / variables CI, nunca en repo

### Red y laboratorio

- GNS3/VMware en red aislada; API de integración solo desde VLAN de gestión

---

## Checklist pre-producción

- [ ] Tests CI en verde
- [ ] SonarQube sin vulnerabilidades bloqueantes
- [ ] OpenAPI versionado y publicado
- [ ] Backup configurado ([backup_restore.md](./backup_restore.md))
- [ ] Plan de rollback ([rollback.md](./rollback.md))
- [ ] Runbook de incidentes ([incident_response.md](./incident_response.md))
- [ ] Monitoreo activo ([monitoring.md](./monitoring.md))

---

## Estrategia de release

Ver [implementacion/release-plan-v1.0.0.md](./implementacion/release-plan-v1.0.0.md) y [implementacion/breaking-changes-v1.0.0.md](./implementacion/breaking-changes-v1.0.0.md).

---

## Rollback rápido

Si falla el despliegue:

1. Revertir tag de imagen Docker a última versión estable
2. O restaurar artefacto estático anterior en hosting
3. Verificar health y login
4. Documentar en bitácora de avances

Detalle: [rollback.md](./rollback.md)
