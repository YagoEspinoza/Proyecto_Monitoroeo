# Plan de release v1.0.0 — NetGuard SOC

> **Estado objetivo:** Primera versión estable del frontend + contrato API documentado. Backend puede estar en v0.9 beta paralela.

---

## Alcance v1.0.0

### Incluido

- Frontend Angular desplegable (Docker/nginx)
- Auth mock o JWT básico si API lista
- Dashboard, dispositivos, VLANs, cuarentena (simulada o real)
- Políticas, alertas, auditoría, reportes export
- Simulación de ataques (lab)
- Asistente IA SOC (modo plantilla)
- Documentación completa en `documentacion/`
- OpenAPI 1.0.0 publicado
- CI con tests + build

### Excluido (v1.1+)

- Integración GNS3/VMware productiva
- LLM productivo en IA
- SIEM externo
- MFA
- Alta disponibilidad multi-región

---

## Cronograma sugerido

| Hito | Semana | Entregable |
|------|--------|------------|
| Code freeze UI | S-2 | Todas las fases 1–6 cerradas |
| QA + Sonar | S-1 | Fase 7 verde |
| Staging deploy | S0 | Fase 8 Docker |
| Release tag | S0 | `v1.0.0` |
| Informe académico | S+1 | `entregables/informe_final.md` |

---

## Checklist release

- [ ] `npm run test:ci` OK
- [ ] `npm run build` producción OK
- [ ] `docker build` OK
- [ ] Smoke: login → alerta → cuarentena → auditoría
- [ ] OpenAPI version 1.0.0 sin cambios breaking no documentados
- [ ] CHANGELOG o sección en README
- [ ] Tag git `v1.0.0`
- [ ] Imagen Docker `netguard-soc-frontend:1.0.0`
- [ ] Documentación avances actualizada

---

## Versionado

- **Semver** para frontend y API
- Documentar breaking en [breaking-changes-v1.0.0.md](./breaking-changes-v1.0.0.md)

---

## Comunicación

| Audiencia | Mensaje |
|-----------|---------|
| Equipo SOC | Nueva consola v1.0, datos lab |
| Docente | Entregables 1–3 + informe final |
| DevOps | Imagen Docker y rollback doc |

---

## Post-release

- Monitorear errores consola y 404 SPA
- Planificar v1.1: backend Node MVP + WebSocket alertas
