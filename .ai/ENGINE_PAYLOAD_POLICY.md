# ENGINE PAYLOAD POLICY — ElectroCraft

Este documento establece las reglas para la persistencia de datos provenientes de motores externos (OSS).

## 1. Principio de Aislamiento
ElectroCraft no debe persistir estados internos, clases de JavaScript o proxies reactivos de los motores. Solo se permite JSON serializable.

## 2. Estructura del Wrapper
Cada payload externo debe estar envuelto en un objeto `EnginePayloadWrapper`:
```json
{
  "engine": "puck" | "rete" | "tiptap" | "rqb" | "zod",
  "version": 1,
  "value": { ... },
  "metadata": { ... }
}
```

## 3. Motores Permitidos y Alcance
- **Puck**: Solo el objeto `data` (composición de componentes). Prohibido guardar el `AppState` de edición.
- **Rete**: Solo el grafo JSON (nodos y conexiones). Prohibido guardar instancias de `Node` o `Socket`.
- **Tiptap**: Solo el formato JSON nativo de ProseMirror. Prohibido guardar HTML sucio como fuente de verdad.
- **RQB (React Query Builder)**: Solo la configuración de reglas y filtros.

## 4. Validación y Migración
- Cada motor es responsable de validar su propio `value`.
- Si un motor actualiza su formato, la migración debe ocurrir dentro del adapter del motor antes de ser re-serializado por ElectroCraft.
- El `schemaVersion` global del proyecto no cambia si solo cambia la versión interna de un motor (se usa el `version` del wrapper).
