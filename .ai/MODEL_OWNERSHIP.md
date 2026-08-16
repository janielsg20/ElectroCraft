# MODEL OWNERSHIP — ElectroCraft

Este documento establece la jerarquía de propiedad de los datos para garantizar la portabilidad del proyecto y la eficiencia del Studio.

## 1. Project Objects (Persistidos en el Proyecto)
Son entidades que pertenecen exclusivamente a un proyecto y se versionan con él. Se incluyen en el `ElectroCraftExportIR`.

- **ProjectDefinition**: Metadatos base y configuración.
- **Documents**: Pantallas, plantillas y componentes reutilizables.
- **Queries**: Definiciones de consulta (sin resultados).
- **Actions**: Workflows visuales (grafos).
- **StateDefinitions**: Definición de variables de estado.
- **Theme**: Tokens visuales y variantes del proyecto.
- **Navigation**: Estructura de rutas.
- **PermissionPolicy**: Roles y reglas de acceso del proyecto.

## 2. App Registries (Globales del Studio)
Son catálogos que residen en la aplicación (Studio). **NUNCA** se serializan dentro de un proyecto. El proyecto solo guarda una referencia por ID.

- **ComponentRegistry**: Tipos de componentes disponibles (Button, Input, etc).
- **ConnectorRegistry**: Adaptadores de datos (PostgreSQL, REST, etc).
- **ActionNodeRegistry**: Tipos de nodos lógicos para workflows.
- **BlueprintCatalog**: Listado de paquetes de inicio disponibles.
- **PlatformCapabilities**: Matriz de soporte por destino de exportación.

## 3. Content Entities (Datos Dinámicos)
Viven en el storage (Base de Datos) y el proyecto solo contiene referencias o consultas para acceder a ellos.

- **Records**: Los datos reales creados por el usuario final (Filas de DB).
- **MediaAssets**: Los archivos binarios (Imágenes, PDFs). El proyecto guarda el `mediaId`.
- **UserProfiles**: Datos de identidad de los usuarios finales.
- **AuditLogs**: Historial de cambios y eventos de ejecución.

---

## Reglas de Validación de Arquitectura
1. Un `ProjectDefinition` serializado no debe superar un tamaño razonable (referencias, no datos masivos).
2. Si un objeto tiene una propiedad `isRegistryEntity: true`, el serializador debe omitirlo.
3. Las migraciones solo afectan a los **Project Objects**.
