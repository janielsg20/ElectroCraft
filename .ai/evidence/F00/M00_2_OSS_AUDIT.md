# Auditoría de Responsabilidades OSS — ElectroCraft 2.0 (M00.2)

## Resumen de Auditoría por Motor

### 1. Puck (Editor de Pantallas)
- **Responsabilidad**: Composición visual, Drag & Drop, Outline, Viewports.
- **Límite**: No debe gestionar el modelo canónico de datos; ElectroCraft provee el `DocumentAdapter`.
- **Gap**: La IA de Puck no se usará; se integrará la arquitectura de IA propia (Gemini + Vercel AI SDK).

### 2. Rete.js (Workflows)
- **Responsabilidad**: Editor de grafos, conexiones, lógica de ejecución en JS.
- **Límite**: El grafo debe ser serializable a un formato neutral que LAMP y WordPress puedan compilar a código nativo (PHP/Slim).

### 3. PGlite + Drizzle (Datos Locales)
- **Responsabilidad**: Base de datos PostgreSQL en el navegador con persistencia.
- **Límite**: Solo para el Studio y el target "Proyecto Local". Otros targets usarán sus adaptadores nativos (SQLite en Expo, MySQL en LAMP).

### 4. Slim 4 (Target LAMP)
- **Responsabilidad**: Routing PSR-7 y Middleware.
- **Estatus**: Confirmado como base para el compilador LAMP.

### 5. Gemini + Vercel AI SDK (IA)
- **Responsabilidad**: Invocación de modelos, streaming, structured output.
- **Seguridad**: Se requiere un Gateway (F08) para no exponer llaves en el cliente.

### 6. shadcn/ui + AI Elements
- **Responsabilidad**: Componentes base de UI y elementos específicos de IA.
- **Decisión**: Se prohíbe mezclar con `React Aria` o `Headless UI` sin un ADR previo.

## Matriz de Decisiones Rápidas (ADR Draft)

- **Licencias**: Todos los motores seleccionados poseen licencias permisivas (MIT/Apache 2.0/BSD) compatibles con el proyecto.
- **Internacionalización**: `i18next` gestionará los namespaces; el español es el fallback obligatorio (R002).
- **Formularios**: `React Hook Form` + `Zod` son el estándar para validación en el Studio y targets React.

## Conclusión
Los motores seleccionados cubren el 95% de las capacidades requeridas. El 5% restante (Mapping canónico, compiladores a PHP, adaptadores de IA seguros) es responsabilidad directa del desarrollo de ElectroCraft.
