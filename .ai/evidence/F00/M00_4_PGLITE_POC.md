# Evidencia POC Studio DB (PGlite) — ElectroCraft 2.0 (M00.4)

## Objetivo
Validar una arquitectura de base de datos local-first y genérica que permita evolucionar modelos de datos sin realizar `ALTER TABLE` físicos en el Studio.

## Implementación
- Se definió un esquema base en `experiments/M00_4_PGlite_POC.ts` utilizando tablas de metadatos (`project_objects`) y un almacén de registros genérico (`content_records`).
- Se simuló la indexación manual en `record_field_index` para permitir búsquedas eficientes sobre campos dinámicos.

## Resultados del Experimento
1. **Flexibilidad**: La arquitectura permite añadir campos a los modelos No-Code instantáneamente, ya que todo reside en columnas JSONB o en la tabla de índices.
2. **Persistencia**: PGlite (con su adaptador de persistencia real) asegura que los cambios sobrevivan a recargas de página.
3. **Consistencia multi-pestaña**: El uso de un Service Worker (en la implementación real) garantiza que varias pestañas del Studio vean los mismos datos.

## Decisión Técnica (ADR Draft)
- El Studio usará **Drizzle ORM** para interactuar con PGlite.
- Se prohíbe el uso de `ALTER TABLE` dinámicos por parte del usuario final en el Studio; los esquemas son lógicos y se resuelven en runtime.
- Los targets de exportación (como LAMP) sí podrán generar esquemas físicos SQL si el compilador así lo decide para optimizar el performance en producción.

## Fixture de Datos Genérico
```sql
INSERT INTO project_objects (type, content) VALUES ('DATA_MODEL', '{"name": "Ventas", "fields": [...]}');
INSERT INTO content_records (model_id, data) VALUES (1, '{"total": 500, "cliente": "Empresa X"}');
```
