# Evidencia POC Action Flow (Rete) — ElectroCraft 2.0 (M00.6)

## Objetivo
Validar el uso de Rete.js como motor de orquestación de acciones y workflows, asegurando que la definición visual (grafo) sea serializable y ejecutable en múltiples entornos.

## Implementación
- Se definió una estructura de `ActionGraph` neutral en `experiments/M00_6_Rete_POC.ts`.
- Se simuló el flujo de ejecución (Dataflow/ControlFlow) de un workflow simple: Trigger -> Condición -> Acción.
- Se validó que el grafo no dependa de instancias de clases de Rete para su persistencia.

## Resultados del Experimento
1. **Separación de Concernientes**: Rete.js se encargará de la **UI del Editor** y la gestión de sockets; ElectroCraft se encargará de la **Semántica de Ejecución** y la persistencia.
2. **Portabilidad**: El formato JSON producido es fácilmente procesable por un compilador PHP para el target LAMP, transformando nodos en llamadas a funciones o métodos.
3. **Historial**: El soporte nativo de Rete para undo/redo facilita la experiencia No-Code sin implementar lógica compleja de estado manualmente.

## Decisión Técnica (ADR Draft)
- **Rete.js** es el estándar para la edición de workflows.
- El **Modelo Canónico** almacenará la lista de nodos y conexiones de forma plana.
- Los nodos de "Condición" y "Bucle" son obligatorios para todos los targets Core.

## Fixture de Grafo
```json
{
  "nodes": [
    { "id": "trig1", "type": "onClick" },
    { "id": "cond1", "type": "if", "inputs": { "in": "trig1" } },
    { "id": "act1", "type": "toast", "inputs": { "in": "cond1.true" } }
  ]
}
```
