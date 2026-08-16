# ADR 0002: Congelación de Arquitectura Global — ElectroCraft 2.0

## Estatus
Aprobado (M00.11)

## Contexto
Tras completar 10 microfases de auditoría y POCs, se requiere formalizar las decisiones de arquitectura para iniciar la construcción de la infraestructura del Studio.

## Decisiones

### 1. Motores Core (OSS Ownership)
- **Visual Editor**: Puck (Composición y Canvas).
- **Workflows**: Rete.js (Grafo de acciones).
- **Studio Data**: PGlite + Drizzle (Local-first Postgre).
- **AI Orchestration**: Vercel AI SDK + Gemini.
- **UI Base**: shadcn/ui + Radix + AI Elements.

### 2. Pilar de Portabilidad
- **Modelo Canónico**: Se define como una representación neutral en JSON, libre de clases o tipos de motores específicos.
- **Export Targets**: 9 destinos Core con el mismo nivel de prioridad. Se adopta el `ExportTargetContract` para todos.

### 3. Seguridad y Conectividad
- **Gateway de Datos**: Obligatorio para fuentes externas con secretos (`SecretRef`).
- **AI Gateway**: Protege las API Keys de Gemini; ninguna key reside en el cliente.

### 4. Alternativas Rechazadas
- **Craft.js/GrapesJS**: Rechazados por ser demasiado acoplados al DOM Web, dificultando la paridad nativa.
- **React Flow**: Rechazado en favor de Rete.js por su mejor manejo de Dataflow/ControlFlow para ejecución lógica.

## Consecuencias
- Todas las fases siguientes (F01 a F27) deben respetar estos adaptadores y contratos.
- El `CapabilityAnalyzer` es el juez final de qué funciones No-Code llegan a qué targets.
