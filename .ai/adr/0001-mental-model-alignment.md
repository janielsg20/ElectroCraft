# ADR 0001: Alineación al Modelo Mental No-Code 2.0

## Estatus
Aprobado (M00.1)

## Contexto
El proyecto ElectroCraft evoluciona de un enfoque centrado en CMS a un "App Builder" puro y portable. Esto requiere una reclasificación de responsabilidades para asegurar que el modelo canónico sea independiente del target de exportación.

## Decisión
Adoptar el modelo mental definido en `PRODUCT_DIRECTION.md` como la única fuente de verdad para la arquitectura:
1. **Engine-First**: Cada pilar (Datos, Pantallas, Navegación, etc.) tiene un "Owner" técnico que gestiona su semántica.
2. **Neutralidad de Target**: El modelo persistido no contendrá objetos específicos de frameworks (no Puck State directo, no Rete classes, no WP objects).
3. **Core Export**: Se eliminan los "targets opcionales". Los 9 destinos son ciudadanos de primera clase.

## Consecuencias
- La UI del Studio debe reflejar estos pilares en español.
- Cualquier funcionalidad CMS heredada debe mapearse a "Datos" o "Usuarios".
- Los exportadores deben consumir el modelo neutral y transformarlo al formato del target.
