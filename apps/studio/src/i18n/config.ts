import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          common: {
            save: 'Guardar',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            edit: 'Editar',
            create: 'Crear',
          },
          shell: {
            groups: {
              build: 'Construir',
              data: 'Datos',
              logic: 'Lógica',
              app: 'App',
              resources: 'Recursos',
              appearance: 'Apariencia',
              publish: 'Publicar',
            },
            items: {
              editor: 'Editor',
              screens: 'Pantallas',
              components: 'Componentes',
              templates: 'Plantillas',
              ai_generate: 'Generar con IA',
              records: 'Registros',
              models: 'Modelos',
              data_sources: 'Fuentes de datos',
              queries: 'Consultas',
              actions: 'Acciones y workflows',
              state: 'Estado y variables',
              forms: 'Formularios',
              navigation: 'Navegación',
              users: 'Usuarios y permisos',
              admin: 'Administración',
              media: 'Medios',
              extensions: 'Extensiones',
              themes: 'Temas',
              design_system: 'Sistema de diseño',
              tokens: 'Tokens',
              preview: 'Vista previa',
              compatibility: 'Compatibilidad',
              export: 'Exportar',
              deploy: 'Desplegar',
              help: 'Ayuda',
              settings: 'Configuración',
            }
          }
        }
      }
    }
  });

export default i18n;
