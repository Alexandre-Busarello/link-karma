// Main exports for the internationalization library

// Store and language management
export {
    DEFAULT_LANGUAGE, getBrowserLanguage,
    initializeLanguage, LANGUAGE_NAMES,
    SUPPORTED_LANGUAGES, useLanguageStore,
    type Language
} from './lib/store.js';

// Types
export type {
    NestedKeyOf,
    TranslationFunction,
    TranslationKey
} from './lib/types.js';

// Utilities
export {
    clearTranslationCache,
    getCachedLanguages,
    getNestedValue,
    loadTranslations,
    preloadTranslations,
    translate,
    validateTranslationStructure
} from './lib/utils.js';

// React hooks
export { useIntl, useLanguage, useTranslation } from './lib/useIntl.js';

// React components and providers
export {
    LanguageProvider,
    useLanguageContext,
    withLanguageProvider
} from './lib/LanguageProvider.js';

// Language resources (for direct access if needed)
export { default as enTranslations } from './lib/en.json' with { type: 'json' };
export { default as ptTranslations } from './lib/pt.json' with { type: 'json' };

