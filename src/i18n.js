import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import fr from './locales/fr.json';
import de from './locales/de.json';
import ar from './locales/ar.json';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    debug: false,
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
    resources: {
      fr: { translation: fr },
      de: { translation: de },
      ar: { translation: ar },
    },
    react: {
      useSuspense: false,
    },
  });

// Applique la langue et le sens de lecture (RTL pour l'arabe) au chargement et à chaque changement
const applyDocumentLang = (lng) => {
  const code = (lng || 'fr').slice(0, 2);
  document.documentElement.setAttribute('lang', code);
  document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
};
applyDocumentLang(i18n.language);
i18n.on('languageChanged', applyDocumentLang);

export default i18n;