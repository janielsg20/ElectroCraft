# Evidencia POC Paridad de Exportación — ElectroCraft 2.0 (M00.10)

## Objetivo
Demostrar que los targets Core (Capacitor, LAMP, WordPress) pueden ser generados a partir de un único modelo de representación intermedia (ExportIR), garantizando la paridad funcional sin duplicar la lógica de negocio del usuario No-Code.

## Implementación
- Se definió un `ExportIR` minimalista en `experiments/M00_10_Export_POC.ts`.
- Se implementaron tres compiladores experimentales (Capacitor, LAMP, WordPress) que transforman el IR en artefactos específicos de cada plataforma.
- Se validó que los cambios en el IR se reflejan automáticamente en todos los targets.

## Resultados del Experimento
1. **Capacitor**: La generación del archivo de configuración y la estructura Web es directa.
2. **LAMP**: Se validó el mapeo de rutas a Slim 4 y la generación de código PHP. La lógica de negocio se compilará a servicios PHP.
3. **WordPress**: Se generó exitosamente la estructura de un Block Theme (`theme.json`) y el código para registrar Custom Post Types (CPT) en un plugin compañero.

## Decisión Técnica (ADR Draft)
- **Target Neutrality**: Los compiladores son adaptadores puros; no existe lógica de target dentro del modelo canónico.
- **Capability Report**: Se implementará un validador que avise si, por ejemplo, una funcionalidad de Capacitor (como Cámara) se intenta usar en un target LAMP.
- **Equal Status**: Ningún target se considera secundario. Si una capacidad No-Code es Core, debe estar disponible o adaptada en los 9 destinos.

## Informe de Compatibilidad de Paridad
| Feature | Capacitor | LAMP | WordPress |
| :--- | :--- | :--- | :--- |
| Routing | Native Web | Slim 4 | WP Routes |
| Data | SQLite | MySQL/PDO | CPT/Meta |
| UI | Web/Plugins | Server Render/CSS | Blocks/Theme |
