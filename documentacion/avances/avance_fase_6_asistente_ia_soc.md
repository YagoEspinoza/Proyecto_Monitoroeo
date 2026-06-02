# Avance Fase 6 — Asistente IA SOC

**Última actualización:** 2026-05-24  
**Semáforo:** 🟡 En curso

---

## Estado general

Componente `soc-ai-assistant` y `soc-ai.service` integrados en layout. Respuestas basadas en plantillas; sin LLM productivo.

**Progreso estimado:** 55%

---

## Cambios realizados

- UI panel asistente flotante
- `soc-ai.service` — respuestas contextuales mock
- Reglas en `documentacion/reglas/ia.md`

---

## Módulos afectados

| Dominio | Archivos |
|---------|----------|
| SOC_AI_Assistant | soc-ai-assistant, soc-ai.service |

---

## Pruebas realizadas

| Prueba | Resultado |
|--------|-----------|
| Abrir/cerrar panel | OK manual |
| Tests automatizados soc-ai | Pendiente |

---

## Pendientes

- [ ] Endpoint backend chat
- [ ] Disclaimer UI permanente
- [ ] Log consultas en auditoría
- [ ] RAG sobre documentación interna

---

## Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Sobreconfianza del operador | Disclaimer + no auto-aislar |
| Filtrado datos sensibles a LLM | Política en ia.md |

---

## Próximos pasos

1. Ampliar plantillas con procedimiento IR
2. Tests soc-ai.service
3. Definir contrato OpenAPI `/soc-ai/chat`
