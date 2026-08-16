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
            screens: 'Pantallas',
            templates: 'Plantillas',
            components: 'Componentes',
            ai_generate: 'Generar con IA',
            content: 'Contenido',
            models: 'Modelos',
            queries: 'Consultas',
            forms: 'Formularios',
            automation: 'Automatizaciones',
            admin: 'Administración',
            roles: 'Roles',
            media: 'Medios',
            extensions: 'Extensiones',
            themes: 'Temas',
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
  });

export default i18n;
