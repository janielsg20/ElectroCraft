# Evidencia POC Native Runtime — ElectroCraft 2.0 (M00.7)

## Objetivo
Validar la viabilidad de utilizar Expo y Capacitor como runtimes nativos para el modelo de aplicación portable de ElectroCraft.

## Implementación
- Se definió un esquema de aplicación nativa mínima en `experiments/M00_7_Native_POC.tsx`.
- Se validó el uso de `Expo Router` para la navegación y `Expo SQLite` para la persistencia local en dispositivos.
- Se comprobó la integración de `Refine Core` (headless) para gestionar el flujo de datos nativo sin depender de componentes DOM.

## Resultados del Experimento
1. **Navegación**: Expo Router proporciona un sistema de ruteo basado en archivos que se alinea perfectamente con el pilar de "Navegación" de ElectroCraft.
2. **Datos**: Drizzle + Expo SQLite permite reutilizar gran parte de la lógica de datos del Studio en la aplicación nativa final.
3. **Bloqueadores**: Se identificó que ciertas librerías de UI de la Web (como tablas complejas de shadcn) deben ser sustituidas por componentes nativos de React Native para mantener el performance y la accesibilidad (R029).

## Decisión Técnica (ADR Draft)
- **Expo** es el runtime oficial para los targets Android e iOS.
- **Capacitor** se usará para el target "Capacitor" específicamente (Hybrid WebView).
- Los componentes de la paleta deben tener una implementación dual (Web/Native) o ser marcados como "Incompatibles" por el `Capability Analyzer`.

## Fixture de Configuración Nativa
```json
{
  "expo": {
    "name": "Mi App ElectroCraft",
    "slug": "mi-app",
    "version": "1.0.0",
    "plugins": ["expo-router", "expo-sqlite"]
  }
}
```
