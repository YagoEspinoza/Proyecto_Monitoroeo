# FLUJO_BPMN — Nodos y transiciones

Flujo principal de respuesta a incidentes (procesos misionales 12–16) y flujo de acceso (proceso 17).

| ID_NODO | ID_PROCESO | TIPO_NODO(EVENTO/GATEWAY/ACTIVIDAD) | NOMBRE | NODO_ORIGEN | NODO_DESTINO | CONDICION |
|---------|------------|-------------------------------------|--------|-------------|--------------|-----------|
| N-PROC-MIS-012-01 | PROC-MIS-012 | EVENTO | Inicio — Evento de red detectado | — | N-PROC-MIS-012-02 | — |
| N-PROC-MIS-012-02 | PROC-MIS-011 | ACTIVIDAD | Evaluar políticas de seguridad | N-PROC-MIS-012-01 | N-PROC-MIS-012-03 | Regla coincidente |
| N-PROC-MIS-012-03 | PROC-MIS-012 | ACTIVIDAD | Generar alerta en centro IDS | N-PROC-MIS-012-02 | N-PROC-MIS-012-04 | Severidad asignada |
| N-PROC-MIS-012-04 | PROC-MIS-012 | GATEWAY | ¿Severidad crítica o alta? | N-PROC-MIS-012-03 | N-PROC-MIS-013-01 | severidad ∈ {crítica, alta} |
| N-PROC-MIS-012-04 | PROC-MIS-012 | GATEWAY | ¿Severidad crítica o alta? | N-PROC-MIS-012-03 | N-PROC-APO-024-01 | severidad ∈ {media, baja} |
| N-PROC-MIS-013-01 | PROC-MIS-013 | ACTIVIDAD | Clasificar incidente | N-PROC-MIS-012-04 | N-PROC-MIS-014-01 | — |
| N-PROC-MIS-014-01 | PROC-MIS-014 | ACTIVIDAD | Aplicar contención | N-PROC-MIS-013-01 | N-PROC-MIS-015-01 | Requiere contención |
| N-PROC-MIS-015-01 | PROC-MIS-015 | GATEWAY | ¿Confirmar cuarentena? | N-PROC-MIS-014-01 | N-PROC-MIS-015-02 | operador confirma = sí |
| N-PROC-MIS-015-01 | PROC-MIS-015 | GATEWAY | ¿Confirmar cuarentena? | N-PROC-MIS-014-01 | N-PROC-APO-025-01 | operador solicita IA |
| N-PROC-MIS-015-02 | PROC-MIS-015 | ACTIVIDAD | Mover host a VLAN 999 | N-PROC-MIS-015-01 | N-PROC-APO-021-01 | — |
| N-PROC-APO-021-01 | PROC-APO-021 | ACTIVIDAD | Registrar en audit trail | N-PROC-MIS-015-02 | N-PROC-APO-022-01 | — |
| N-PROC-APO-022-01 | PROC-APO-022 | ACTIVIDAD | Consultar evidencia en auditoría | N-PROC-APO-021-01 | N-PROC-MIS-016-01 | — |
| N-PROC-MIS-016-01 | PROC-MIS-016 | ACTIVIDAD | Recuperación post-incidente | N-PROC-APO-022-01 | N-PROC-MIS-016-02 | Causa erradicada |
| N-PROC-MIS-016-02 | PROC-MIS-016 | EVENTO | Fin — Host en producción | N-PROC-MIS-016-01 | — | — |
| N-PROC-APO-024-01 | PROC-APO-024 | ACTIVIDAD | Notificar operador | N-PROC-MIS-012-04 | N-PROC-APO-022-01 | — |
| N-PROC-APO-025-01 | PROC-APO-025 | ACTIVIDAD | Asistente IA sugiere pasos | N-PROC-MIS-015-01 | N-PROC-MIS-015-01 | Sin ejecución autónoma |
| N-PROC-APO-017-01 | PROC-APO-017 | EVENTO | Inicio — Usuario accede a /login | — | N-PROC-APO-017-02 | — |
| N-PROC-APO-017-02 | PROC-APO-017 | ACTIVIDAD | Autenticar credenciales | N-PROC-APO-017-01 | N-PROC-APO-018-01 | Credenciales válidas |
| N-PROC-APO-017-02 | PROC-APO-017 | ACTIVIDAD | Autenticar credenciales | N-PROC-APO-017-01 | N-PROC-APO-017-03 | Credenciales inválidas |
| N-PROC-APO-017-03 | PROC-APO-017 | EVENTO | Fin — Acceso denegado | N-PROC-APO-017-02 | — | — |
| N-PROC-APO-018-01 | PROC-APO-018 | ACTIVIDAD | Aplicar RBAC en ruta | N-PROC-APO-017-02 | N-PROC-MIS-006-01 | Rol autorizado |
| N-PROC-MIS-006-01 | PROC-MIS-006 | EVENTO | Fin — Dashboard SOC | N-PROC-APO-018-01 | — | — |
