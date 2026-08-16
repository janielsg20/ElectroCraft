import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import namespaces
import common from './locales/es/common.json';
import shell from './locales/es/shell.json';
import settings from './locales/es/settings.json';

export const defaultNS = 'common';
export const resources = {
  es: {
    common,
    shell,
    settings
  },
} as const;

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    lng: 'es',
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
