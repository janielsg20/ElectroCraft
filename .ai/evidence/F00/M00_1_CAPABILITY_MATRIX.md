# Matriz de Capacidades — ElectroCraft 2.0 (M00.1)

Esta matriz traza las capacidades heredadas y nuevas al modelo mental de ElectroCraft No-Code 2.0.

## Mapeo Mental

| Capacidad Original | Modelo Mental 2.0 | Owner Canónico | Fase | Aplicabilidad de Target |
| :--- | :--- | :--- | :--- | :--- |
| CMS (Modelos/Records) | Datos | Studio DB | F04 | Todos |
| CMS (Taxonomías) | Datos | Studio DB | F04 | Todos |
| Páginas | Pantallas | Visual Editor (Puck) | F03 | Todos |
| Rutas/Menús | Navegación | Navigation Engine | F03 | Todos |
| UI Composer | Composición UI | Puck Adapter | F03 | Web/Mobile/Static/PWA/Capacitor |
| REST/OpenAPI | Fuentes de Datos | Data Connector | F09 | Todos |
| GraphQL | Fuentes de Datos | Data Connector | F09 | Todos |
| Workflows | Acciones | Rete.js Engine | F06 | Todos |
| Formularios | Formularios | RHF / Zod | F05 | Todos |
| Auth/Permisos | Usuarios | Auth Engine | F10 | Todos |
| Admin UI | Administración | Refine / TanStack | F12 | React/Static/LAMP/WordPress |
| AI Generation | Generación IA | Gemini / AI SDK | F08 | Studio (Development) |
| Native Runtime | Native | Capacitor / Expo | F07 | Android/iOS/Capacitor |
| LAMP Runtime | Server | Slim / PHP | F07 | LAMP |
| WordPress Theme | CMS Target | Block Theme / PHP | F07 | WordPress |

## Nuevos Requisitos Core
- **Gateway de Secretos**: Gestión segura de API Keys para conectores externos.
- **Portable Screen Model**: Definición de pantalla independiente del target.
- **Capability Analyzer**: Validador de paridad antes de exportar.

## Capacidades Reclasificadas
- **Legacy PDF manager**: Se reclasifica como `Acción/Workflow` o `Extensión` de exportación; no es core.
- **Hardcoded Routes**: Pasan a ser `Navigation Objects` persistidos en el modelo canónico.
