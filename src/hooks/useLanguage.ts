import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../i18n';

/**
 * Custom hook for language management
 * Provides language switching functionality and translation utilities
 */
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const setLanguage = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const getLanguageConfig = (language: SupportedLanguage) => {
    return SUPPORTED_LANGUAGES[language];
  };

  const getCurrentLanguageConfig = () => {
    return getLanguageConfig(currentLanguage);
  };

  return {
    currentLanguage,
    setLanguage,
    t,
    i18n,
    getLanguageConfig,
    getCurrentLanguageConfig,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
};
