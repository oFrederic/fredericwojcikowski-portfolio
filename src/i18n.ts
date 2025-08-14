import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { updateDocumentLanguage } from './utils/performance';

// Import translation files
import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';
import frTranslation from './locales/fr/translation.json';

// Language configuration
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸' },
  ja: { name: '日本語', flag: '🇯🇵' },
  fr: { name: 'Français', flag: '🇫🇷' }
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Resources configuration
const resources = {
  en: {
    translation: enTranslation
  },
  ja: {
    translation: jaTranslation
  },
  fr: {
    translation: frTranslation
  }
};

// i18n configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-language'
    },
    
    // Interpolation options
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // React i18next options
    react: {
      useSuspense: false // Disable Suspense for better SSR compatibility
    }
  });

// Update document language when i18n is ready
i18n.on('initialized', () => {
  updateDocumentLanguage(i18n.language);
});

// Update document language when language changes
i18n.on('languageChanged', (lng) => {
  updateDocumentLanguage(lng);
});

export default i18n;
