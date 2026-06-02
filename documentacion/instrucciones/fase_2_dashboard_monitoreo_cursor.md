# Fase 2 — Dashboard y monitoreo (Cursor)

## Objetivo general

Completar el dominio **NetworkMonitoring**: dashboard SOC (KPIs), inventario de dispositivos y mapa de topología con datos coherentes vía capa de servicios.

---

## Contexto obligatorio

- Datos actuales: `mock-network.service` (simulación)
- Fachada futura: `network-api.service`
- Visualización: Chart.js, `kpi-card`, `dashboard-layout.service`
- Página principal: `vision-general`, rutas `dispositivos`, `topologia`

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/pages/vision-general/` | Dashboard SOC |
| `src/app/pages/dispositivos/` | Lista dispositivos |
| `src/app/pages/topologia/` | Mapa de red |
| `src/app/core/services/mock-network.service.ts` | Fuente mock |
| `src/app/core/services/network-api.service.ts` | Abstracción API |
| `src/app/core/models/network.models.ts` | DTOs red |
| `src/app/shared/components/kpi-card/` | KPIs |
| `documentacion/arquitectura.md` | Capas |

---

## Reglas que debe respetar Cursor

1. [frontend.md](../reglas/frontend.md)
2. [ddd.md](../reglas/ddd.md) — dominio NetworkMonitoring
3. Páginas no importan mock directamente si existe fachada
4. Estados de dispositivo: online, offline, degradado, cuarentena

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| NetworkMonitoring | KPIs, dispositivos, topología |
| shared/kpi-card | Métricas configurables |
| dashboard-layout | Persistencia layout (opcional) |

---

## Criterios de aceptación

- [ ] Dashboard muestra ≥ 4 KPIs con datos mock consistentes
- [ ] Lista dispositivos con filtro y badge de estado
- [ ] Topología renderiza nodos/enlaces sin error
- [ ] Gráficos Chart.js responsivos
- [ ] Empty state cuando no hay dispositivos
- [ ] `network-api.service` delega a mock (switch preparado para API)

---

## Restricciones

- No integrar GNS3 real en esta fase
- No bloquear UI con llamadas síncronas pesadas
- Mantener textos en español

---

## Validaciones

```bash
npm run lint:check
ng test --include='**/mock-network*'
```

Navegar: `/vision-general`, `/dispositivos`, `/topologia`.

---

## Pruebas mínimas

| Test | Objetivo |
|------|----------|
| `mock-network.service.spec.ts` | Datos seed válidos |
| Componente dispositivos | Creación sin errores |
| KPI card | Inputs requeridos |

---

## Resultado esperado

Operador SOC visualiza salud de red y dispositivos desde un dashboard unificado, preparado para telemetría en vivo vía WebSocket (fase posterior).

**Bitácora:** [avance_fase_2_dashboard_monitoreo.md](../avances/avance_fase_2_dashboard_monitoreo.md)
