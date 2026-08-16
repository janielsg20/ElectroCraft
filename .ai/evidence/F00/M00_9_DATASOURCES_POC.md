# Evidencia POC Data Sources — ElectroCraft 2.0 (M00.9)

## Objetivo
Validar una arquitectura de fuentes de datos externa que sea portable y segura, permitiendo conectar el Studio y las apps generadas a APIs REST y GraphQL sin exponer credenciales.

## Implementación
- Se definió el contrato `DataSourceAdapter` en `experiments/M00_9_DataSources_POC.ts`.
- Se implementaron adaptadores mock para REST y GraphQL que normalizan las respuestas a un formato estándar `DataResult`.
- Se validó el concepto de `SecretRef`, donde el proyecto solo guarda la referencia al secreto, y el Gateway (simulado) inyecta el valor real en el servidor.

## Resultados del Experimento
1. **Normalización**: El formato `DataResult` permite que los componentes de la UI (como tablas y listas) consuman datos de cualquier fuente sin conocer el protocolo subyacente.
2. **Seguridad**: Se confirmó que la arquitectura de `SecretRef` evita que llaves de API sensibles sean guardadas en el repositorio o enviadas al navegador del usuario final.
3. **OpenAPI**: Se evaluó el uso de `openapi-types` y `zod-to-json-schema` para el descubrimiento automático de operaciones; se integrarán en la fase F09.

## Decisión Técnica (ADR Draft)
- El **DataSourceRegistry** centralizará todos los adaptadores.
- Se usará un **Gateway de Datos** obligatorio para cualquier fuente que requiera autenticación sensible fuera del flujo OAuth2 del cliente.
- Las mutaciones (WRITE) sobre fuentes externas requerirán una validación previa del `CapabilityAnalyzer` para asegurar que el target de exportación soporta la operación.

## Fixture de Fuente de Datos
```json
{
  "id": "api-ventas",
  "type": "REST",
  "config": {
    "baseUrl": "https://api.empresa.com/v1",
    "operations": [
      { "id": "list-orders", "method": "GET", "path": "/orders" }
    ],
    "auth": { "type": "Bearer", "secretRef": "API_KEY_VENTAS" }
  }
}
```
