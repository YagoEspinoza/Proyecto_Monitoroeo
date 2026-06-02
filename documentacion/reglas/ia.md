# Reglas — Asistente IA SOC

Dominio: **SOC_AI_Assistant**

---

## Propósito

Asistir a analistas y operadores con:

- Resumen de alertas activas
- Sugerencia de pasos de contención
- Explicación de políticas violadas
- Borrador de postmortem (futuro)

**No** reemplaza la decisión humana en aislamiento ni en cambios de política.

---

## Implementación actual

- `soc-ai.service` — lógica en cliente
- `soc-ai-assistant` — UI flotante
- Respuestas basadas en plantillas y contexto mock

---

## Reglas de diseño

| Regla | Razón |
|-------|-------|
| Mostrar disclaimer “Asistencia IA — verificar con procedimiento SOC” | Evitar automatización ciega |
| No ejecutar cuarentena sin confirmación humana | Seguridad crítica |
| Contexto mínimo necesario | Privacidad |
| Citar IDs de alerta/incidente cuando existan | Trazabilidad |
| Fallback si servicio no disponible | Operación degradada |

---

## Integración futura (LLM)

- API backend `/api/v1/soc-ai/chat`
- System prompt con políticas de la organización
- RAG sobre documentación interna y runbooks
- Rate limit por usuario
- No enviar secretos ni credenciales GNS3 al modelo

---

## Prompts (orientación)

Incluir en contexto:

- Rol del usuario
- Alertas abiertas (severidad, host)
- VLANs afectadas
- Políticas relacionadas

Excluir:

- Tokens JWT
- Datos personales innecesarios

---

## Testing

- Verificar que respuestas no filtran datos de otros usuarios
- Mock del proveedor IA en tests
- SonarQube: no introducir claves API en código

---

## Ética y cumplimiento

- Registrar consultas en AuditLogs (futuro)
- Permitir desactivar IA por admin en configuración
