import type { Language } from './store.js';
import type { TranslationKey } from './types.js';

// Translation cache
const translationCache = new Map<Language, any>();

// Load translations for a specific language
export const loadTranslations = async (
  language: Language,
  forceReload = false
): Promise<any> => {
  // Check cache first (unless force reload)
  if (!forceReload && translationCache.has(language)) {
    const cached = translationCache.get(language);
    if (cached) {
      console.log('Using cached translations for', language);
      return cached;
    }
  }

  try {
    let translations: any;

    // Dynamic import based on language
    switch (language) {
      case 'pt':
        translations = (await import('./pt.json')).default;
        break;
      case 'en':
        translations = (await import('./en.json')).default;
        break;
      default:
        // Fallback to Portuguese
        translations = (await import('./pt.json')).default;
        break;
    }

    // Cache the translations
    translationCache.set(language, translations);
    console.log(
      'Loaded translations for',
      language,
      'Skills items type:',
      typeof translations?.frontend?.team?.skills?.items,
      'Is array:',
      Array.isArray(translations?.frontend?.team?.skills?.items)
    );
    return translations;
  } catch (error) {
    console.error(
      `Failed to load translations for language: ${language}`,
      error
    );

    // Fallback to Portuguese if available
    if (language !== 'pt') {
      return loadTranslations('pt');
    }

    // If even Portuguese fails, return empty structure
    throw new Error('Failed to load any translations');
  }
};

// Get nested value from object using dot notation
export const getNestedValue = (obj: unknown, path: string): unknown => {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current &&
      typeof current === 'object' &&
      current !== null &&
      key in current
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj);
};

// Translation function
export const translate = (
  translations: any,
  key: TranslationKey,
  fallback?: string
): string | any => {
  const value = getNestedValue(translations, key);

  // Debug logging for array keys
  if (key.includes('skills.items') || key.includes('creditsBenefits.items')) {
    console.log('Debug translate:', {
      key,
      value,
      type: typeof value,
      isArray: Array.isArray(value),
      translations: translations ? 'loaded' : 'null',
    });
  }

  // Return the value as-is if it's a string, array, or object
  if (
    typeof value === 'string' ||
    Array.isArray(value) ||
    (typeof value === 'object' && value !== null)
  ) {
    return value;
  }

  if (fallback) {
    return fallback;
  }

  // Return the key itself as fallback
  return key;
};

// Preload translations for better performance
export const preloadTranslations = async (
  languages: Language[] = ['pt', 'en']
) => {
  const promises = languages.map((lang) => loadTranslations(lang));

  try {
    await Promise.all(promises);
    console.log('Translations preloaded successfully');
  } catch (error) {
    console.warn('Failed to preload some translations:', error);
  }
};

// Clear translation cache (useful for development)
export const clearTranslationCache = () => {
  translationCache.clear();
  console.log('Translation cache cleared');
};

// Get available languages from cache
export const getCachedLanguages = (): Language[] => {
  return Array.from(translationCache.keys());
};

// Validate translation structure (useful for development)
export const validateTranslationStructure = (
  _translations: unknown,
  _language: Language
): boolean => {
  return true;
};
