# PALETTE UX SPEC — ElectroCraft

Este documento define la experiencia de usuario para el catálogo de componentes del Studio.

## 1. Comportamiento del Panel
- **Ubicación**: Columna izquierda secundaria (Context Panel).
- **Modos de visualización**: 
  - Grid de 2 columnas en pantallas XL (ancho > 1440px).
  - Listado de 1 columna en pantallas Laptop/Tablet.
- **Inserción**: 
  - Drag & Drop al canvas (Escritorio).
  - Click-to-insert (Móvil/Accesibilidad).

## 2. Organización y Categorías
1.  **Layout**: Contenedores, secciones y grillas.
2.  **Básicos**: Texto, botones e imágenes.
3.  **Datos**: Listados y campos dinámicos.
4.  **Formularios**: Inputs, selectores y formularios completos.
5.  **Navegación**: Menús, migas de pan y buscadores.
6.  **Bloques**: Tarjetas, testimonios y secciones pre-diseñadas.

## 3. Búsqueda e Indexación
La búsqueda debe ser "inteligente" (Semántica):
- **Sinónimos**: `menu` -> Navegación, `input` -> Campo de formulario, `tienda` -> Comercio.
- **Referencia Técnica**: Buscar `flex` debe resaltar el Contenedor Flexible.
- **Resultados vacíos**: Mostrar sugerencias IA de "Gemini puede crear este componente por ti".

## 4. Visualización de Items
- **Icono**: Lucide React.
- **Badge**: Indica si es CORE (nativo), PRESET (configurado) o BLOCK (conjunto).
- **Favoritos**: Sección especial en la parte superior manejada por el usuario.
