# Evidencia POC Visual Editor (Puck) — ElectroCraft 2.0 (M00.3)

## Objetivo
Validar la capacidad de Puck para actuar como el motor de composición visual, manteniendo la independencia del modelo de datos de ElectroCraft.

## Implementación
- Se creó un harness técnico en `experiments/M00_3_Puck_POC.tsx`.
- Se definieron componentes base: `Section`, `Text`, `Button`.
- Se validó el flujo de normalización: Puck Data -> Electro Document.

## Resultados del Experimento
1. **Composición**: Puck gestiona correctamente el nesting y el reordenamiento.
2. **Normalización**: El snapshot exportado de Puck contiene metadatos internos (`_puck_id`, etc.) que ElectroCraft debe limpiar antes de persistir para mantener la neutralidad de target.
3. **Overhead**: La configuración de Puck es puramente declarativa, lo que facilita el mapeo desde el `ComponentRegistry` de ElectroCraft.

## Decisión Técnica (ADR Draft)
- Se usará Puck exclusivamente para el **Canvas de Edición**.
- El **Modelo Canónico** (`ElectroDocument`) no almacenará tipos o estructuras propietarias de Puck; el `PuckAdapter` realizará la transformación en caliente.
- Las paletas de componentes se cargarán dinámicamente según las capacidades del target analizadas por el `CapabilityAnalyzer`.

## Fixture de Prueba
```json
{
  "screens": [
    {
      "id": "home",
      "name": "Inicio",
      "content": [
        { "type": "Section", "props": { "padding": 24 } },
        { "type": "Text", "props": { "text": "Bienvenido al No-Code" } }
      ]
    }
  ]
}
```
