# UX INFORMATION ARCHITECTURE — ElectroCraft

Este documento define la jerarquía de información y las reglas de visibilidad (Progressive Disclosure) del Studio.

## 1. Clasificación de Funciones

### Primarias (Siempre Visibles)
- Navegación entre módulos (Sidebar).
- Selección de plataforma (Topbar).
- El Canvas del editor.
- Botones de Desplegar y Exportar.

### Contextuales (Aparecen según selección)
- Panel de Estructura/Capas (solo en Editor).
- Inspector de Propiedades (solo con elemento seleccionado).
- Filtros de búsqueda en listas.

### Avanzadas (Ocultas tras Disclosure/Accordion)
- Configuraciones JSON crudas.
- Metadatos técnicos.
- Overrides de plataforma específicos en estilos.
- Hooks de ciclo de vida en workflows.

### Diagnósticas (Solo en Error o Debug)
- Logs de red.
- Checksums de integridad.
- Trazas de error de motores OSS.

---

## 2. Reglas de Diseño Visual

- **Jerarquía**: Sección (Título grande) -> Grupo (Accordion) -> Control (Label + Input).
- **No Cards**: Evitar encerrar cada control en bordes o fondos diferentes; usar espacios en blanco y separadores sutiles.
- **Empty States**: Cada panel debe tener una ilustración o texto guía cuando no hay datos (ej. "Selecciona un elemento para editar").
- **Terminología**: Usar términos de negocio (ej. "Texto del botón") y relegar términos técnicos (ej. "label_prop") a la ayuda secundaria o tooltips.
