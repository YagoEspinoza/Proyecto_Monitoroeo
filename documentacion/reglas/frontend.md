# Reglas Frontend — Angular SOC

---

## Stack

- Angular 21, standalone components
- Signals donde el equipo ya los adopte; RxJS para streams async existentes
- Chart.js para métricas del dashboard
- `socket.io-client` solo vía `core/services/socket.ts`

---

## Estructura de páginas

Cada feature en `pages/<nombre>/`:

```
pages/alertas/
├── alertas.component.ts
├── alertas.component.html
├── alertas.css
```

- Lazy load en `app.routes.ts`
- Títulos desde `PAGE_TITLES` y `APP_ROUTES`

---

## Componentes compartidos

Ubicación: `shared/components/`

| Componente | Uso |
|------------|-----|
| `kpi-card` | Dashboard SOC |
| `status-badge` | Estado dispositivo/VLAN/alerta |
| `soc-ai-assistant` | Dominio SOC_AI_Assistant |
| `notification-center` | Alertas operativas |
| `confirm-dialog` | Acciones destructivas (cuarentena) |

---

## Servicios

- `providedIn: 'root'`
- Los datos de red pasan por `network-api.service` (fachada), no importar `mock-network` en páginas
- Guards en `core/guards/` — no duplicar lógica de roles en templates

---

## Templates y UX SOC

- Severidades con color consistente (crítica=rojo, alta=naranja, etc.)
- Confirmación doble para **aislar en cuarentena**
- Estados vacíos con `empty-state`
- Accesibilidad: labels en formularios, contraste en tema oscuro (`theme.service`)
- Textos en **español**

---

## Estilos

- CSS por componente; variables globales en `styles.css`
- Evitar `!important` salvo overrides de librerías
- Layout principal solo en `main-layout`

---

## Rutas y permisos

```typescript
// Ejemplo: políticas solo admin y operador
canActivate: [roleGuard],
data: { roles: [ROLES.ADMIN, ROLES.OPERADOR] }
```

No hardcodear strings de rol en HTML; usar constantes `ROLES`.

---

## Performance

- `OnPush` donde sea viable en listas grandes (dispositivos, alertas)
- Paginación o virtual scroll si > 100 ítems (futuro)
- Desuscribir observables o usar `async` pipe

---

## Prohibido

- Lógica de políticas de seguridad solo en template
- Tokens en query strings
- `innerHTML` sin sanitizar (`sanitize-display.pipe`)
