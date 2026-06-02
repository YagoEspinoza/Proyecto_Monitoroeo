# Clean Code — NetGuard SOC

Principios de código limpio adaptados a un sistema SOC/NOC, no a dominios comerciales genéricos.

---

## Nombres significativos

| Evitar | Preferir |
|--------|----------|
| `data`, `info` | `alertaActiva`, `dispositivoEnCuarentena` |
| `handleClick` | `aislarHostEnCuarentena` |
| `flag` | `politicaViolada`, `requiereAislamiento` |

Usar terminología de red: VLAN, host, segmento, severidad, política, incidente.

---

## Funciones pequeñas

- Una función = una responsabilidad (ej. solo clasificar severidad, solo mapear DTO)
- Máximo ~30 líneas por método en servicios; extraer si crece
- Evitar lógica de UI en servicios de dominio

---

## Comentarios

Comentar solo:

- Referencias a RFC/protocolos (802.1Q, etc.)
- Supuestos de laboratorio vs producción
- Deuda técnica con ticket o fase (`// Fase 8: migrar a API real`)

No comentar lo obvio (`// incrementa contador`).

---

## Manejo de errores

- Mensajes al usuario en español vía `error-message.util`
- Errores de red: distinguir timeout, 401, 403, 503
- Nunca silenciar fallos de aislamiento en cuarentena

---

## DRY con moderación

- Reutilizar `status-badge`, `kpi-card`, `modal`
- No abstraer prematuramente políticas que aún evolucionan (Fase 4)

---

## Tipado estricto

- TypeScript `strict` donde el proyecto lo permita
- Interfaces en `core/models/` por dominio
- Evitar `any`; usar `unknown` + type guards para eventos SOC

---

## Formato

- Prettier del proyecto (`.prettierrc`)
- Imports ordenados: Angular → terceros → `@app/core` → relativos

---

## Deuda técnica

Registrar en `avances/` si se deja mock temporal. Toda deuda debe tener fase de salida definida en [fases.md](../fases.md).
