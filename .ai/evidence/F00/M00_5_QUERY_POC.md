# Evidencia POC Query Portable — ElectroCraft 2.0 (M00.5)

## Objetivo
Validar un sistema de consultas (Queries) que sea independiente del motor de base de datos, permitiendo que la misma definición funcione en el Studio (PGlite) y en los targets exportados (MySQL/PostgreSQL).

## Implementación
- Se definió un formato de consulta neutral basado en el esquema de React Query Builder (RQB).
- Se implementó un `QueryCompiler` experimental en `experiments/M00_5_Query_POC.ts` que transforma la definición en SQL compatible con el esquema genérico del Studio.
- Se integró un sistema de validación de "Blockers" que prohíbe el uso de operadores no soportados por todos los targets Core.

## Resultados del Experimento
1. **Neutralidad**: La estructura de la consulta no depende de ningún driver de DB.
2. **Seguridad**: El compilador utiliza parámetros separados para evitar inyecciones SQL.
3. **Mapeo de Índices**: El compilador puede decidir inteligentemente si consultar la tabla de índices (`record_field_index`) o extraer datos del JSONB (`content_records.data`), manteniendo la abstracción para el usuario No-Code.

## Decisión Técnica (ADR Draft)
- **React Query Builder** será el componente visual para editar estas consultas en el Studio.
- El **Modelo Canónico** almacenará la consulta en formato JSON neutral.
- El **Capability Analyzer** marcará como "Bloqueado" cualquier target de exportación que no pueda satisfacer un operador específico de la consulta.

## Fixture de Consulta Neutral
```json
{
  "combinator": "AND",
  "rules": [
    { "field": "status", "operator": "=", "value": "publicado" },
    { "field": "precio", "operator": ">", "value": 1000 }
  ]
}
```
