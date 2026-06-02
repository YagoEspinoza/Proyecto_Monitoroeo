# Fase 6 — Asistente IA SOC (Cursor)

## Objetivo general

Evoluir **SOC_AI_Assistant**: panel conversacional contextual con alertas, políticas e incidentes; preparar contrato para LLM backend futuro.

---

## Contexto obligatorio

- Componente: `soc-ai-assistant`
- Servicio: `soc-ai.service`
- **Actual:** respuestas template/mock
- **Futuro:** API `/soc-ai/chat` — no implementar servidor aquí sin spec
- Reglas éticas: [ia.md](../reglas/ia.md)

---

## Archivos de referencia

| Archivo | Uso |
|---------|-----|
| `src/app/shared/components/soc-ai-assistant/` | UI |
| `src/app/core/services/soc-ai.service.ts` | Lógica |
| `src/app/core/services/soc-event.service.ts` | Contexto eventos |
| `documentacion/reglas/ia.md` | Límites IA |
| `documentacion/implementacion/openapi-angular-backend-node.yaml` | Endpoint futuro |

---

## Reglas que debe respetar Cursor

1. Disclaimer visible en UI
2. IA **no ejecuta** cuarentena ni borra políticas
3. Contexto mínimo: alertas abiertas, rol usuario
4. Sin enviar JWT a logs de chat
5. Fallback si “servicio no disponible”

---

## Módulos a crear o mejorar

| Módulo | Acción |
|--------|--------|
| SOC_AI_Assistant | UI chat, historial sesión |
| soc-ai.service | Plantillas + builder contexto |
| Integración | Leer alertas activas de servicios existentes |

---

## Criterios de aceptación

- [ ] Panel abre/cierra desde layout principal
- [ ] Pregunta “¿alertas críticas?” responde con datos mock actuales
- [ ] Sugiere pasos de [incident_response.md](../incident_response.md)
- [ ] Botones de acción rápida solo navegan (no ejecutan isolate)
- [ ] Tests sin filtrar datos de otros usuarios
- [ ] Admin puede desactivar IA en config (flag mock)

---

## Restricciones

- No integrar OpenAI key en frontend
- No almacenar historial chat en localStorage sin cifrar (futuro)
- Respuestas en español

---

## Validaciones

Manual: abrir asistente con alertas mock activas; verificar disclaimer y ausencia de auto-aislamiento.

---

## Pruebas mínimas

| Test | Objetivo |
|------|----------|
| soc-ai.service | respuesta con contexto vacío |
| Sanitización | no XSS en mensajes usuario |

---

## Resultado esperado

Copiloto SOC que orienta al analista sin sustituir procedimientos humanos; listo para enchufar LLM vía backend.

**Bitácora:** [avance_fase_6_asistente_ia_soc.md](../avances/avance_fase_6_asistente_ia_soc.md)
