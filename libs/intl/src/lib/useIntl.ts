'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  useLanguageStore,
  type Language,
} from './store.js';
import type { TranslationFunction, TranslationKey } from './types.js';
import { loadTranslations, translate } from './utils.js';

// Hook return type
interface UseIntlReturn {
  // Translation function
  t: TranslationFunction;

  // Current language
  language: Language;

  // Change language
  setLanguage: (language: Language) => void;

  // Available languages
  availableLanguages: Language[];

  // Language display names
  languageNames: Record<Language, string>;

  // Loading state
  isLoading: boolean;

  // Error state
  error: string | null;

  // Raw translations (for advanced use cases)
  translations: any | null;
}

// Custom hook for internationalization
export const useIntl = (): UseIntlReturn => {
  const {
    currentLanguage,
    setLanguage: setStoreLanguage,
    isLoading: storeLoading,
    setLoading,
  } = useLanguageStore();
  const [translations, setTranslations] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load translations when language changes
  useEffect(() => {
    let isMounted = true;

    const loadLanguageTranslations = async () => {
      try {
        setLoading(true);
        setError(null);

        const loadedTranslations = await loadTranslations(currentLanguage);

        if (isMounted) {
          setTranslations(loadedTranslations);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err instanceof Error ? err.message : 'Failed to load translations';
          setError(errorMessage);
          console.error('Error loading translations:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLanguageTranslations();

    return () => {
      isMounted = false;
    };
  }, [currentLanguage, setLoading]);

  // Translation function
  const t: TranslationFunction = useCallback(
    (key: TranslationKey, fallback?: string) => {
      if (!translations) {
        return fallback || key;
      }

      return translate(translations, key, fallback);
    },
    [translations]
  );

  // Language setter with validation
  const setLanguage = useCallback(
    (language: Language) => {
      if (!SUPPORTED_LANGUAGES.includes(language)) {
        console.warn(`Unsupported language: ${language}`);
        return;
      }

      setStoreLanguage(language);
    },
    [setStoreLanguage]
  );

  return {
    t,
    language: currentLanguage,
    setLanguage,
    availableLanguages: SUPPORTED_LANGUAGES,
    languageNames: LANGUAGE_NAMES,
    isLoading: storeLoading,
    error,
    translations,
  };
};

// Hook for language switching only (lighter version)
export const useLanguage = () => {
  const { currentLanguage, setLanguage: setStoreLanguage } = useLanguageStore();

  const setLanguage = useCallback(
    (language: Language) => {
      if (!SUPPORTED_LANGUAGES.includes(language)) {
        console.warn(`Unsupported language: ${language}`);
        return;
      }

      setStoreLanguage(language);
    },
    [setStoreLanguage]
  );

  return {
    language: currentLanguage,
    setLanguage,
    availableLanguages: SUPPORTED_LANGUAGES,
    languageNames: LANGUAGE_NAMES,
  };
};

// Hook for translation only (assumes translations are already loaded)
export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore();
  const [translations, setTranslations] = useState<any | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLanguageTranslations = async () => {
      try {
        const loadedTranslations = await loadTranslations(currentLanguage);

        if (isMounted) {
          setTranslations(loadedTranslations);
        }
      } catch (err) {
        console.error('Error loading translations:', err);
      }
    };

    loadLanguageTranslations();

    return () => {
      isMounted = false;
    };
  }, [currentLanguage]);

  const t: TranslationFunction = useCallback(
    (key: TranslationKey, fallback?: string) => {
      if (!translations) {
        return fallback || key;
      }

      return translate(translations, key, fallback);
    },
    [translations]
  );

  return { t, language: currentLanguage };
};
