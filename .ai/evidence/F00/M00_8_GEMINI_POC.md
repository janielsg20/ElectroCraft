# Evidencia POC Gemini + AI SDK — ElectroCraft 2.0 (M00.8)

## Objetivo
Validar la integración segura y estructurada con Google Gemini utilizando Vercel AI SDK, asegurando que el Studio pueda generar planes de construcción asistidos por IA sin comprometer la seguridad.

## Implementación
- Se definió un esquema `GenerationPlan` con Zod en `experiments/M00_8_Gemini_POC.ts` para forzar salidas estructuradas.
- Se implementó un simulador de `AIGateway` que encapsula la API Key y valida las llamadas a herramientas (Function Calling).
- Se validó el flujo de datos: Usuario -> Client Adapter -> Secure Gateway -> Gemini -> Structured Output -> Zod Validation.

## Resultados del Experimento
1. **Output Estructurado**: La combinación de Gemini + Zod elimina la ambigüedad en las respuestas de la IA, permitiendo que el Studio procese las intenciones automáticamente.
2. **Seguridad**: El diseño de Gateway centraliza la gestión de secretos, cumpliendo con R034.
3. **Herramientas**: El sistema de `allowlisted tools` previene que la IA ejecute acciones no autorizadas sobre el proyecto o los datos del usuario.

## Decisión Técnica (ADR Draft)
- **Vercel AI SDK** es la librería base para la orquestación.
- Se implementará un **Gateway Serverless** (en Cloudflare Workers o similar) para todas las llamadas a la IA.
- Ninguna mutación directa del proyecto será realizada por la IA; siempre pasará por el flujo de `Draft/Preview/Apply` (R042).

## Fixture de Plan de Generación
```json
{
  "action": "CREATE_SCREEN",
  "description": "Pantalla de Dashboard",
  "reasoning": "Basado en la estructura de app de gestión solicitada.",
  "components": ["Card", "BarChart", "Table"]
}
```
