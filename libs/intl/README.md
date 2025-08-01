# @linkkarma/intl

Custom internationalization library for LinkKarma platform supporting Portuguese (pt) and English (en).

## Features

- 🌍 **Multi-language support** - Portuguese and English
- 🔄 **Zustand state management** - Global language state with localStorage persistence
- ⚡ **Dynamic loading** - Translations loaded on-demand with caching
- 🎯 **TypeScript support** - Fully typed translation keys and structure
- 🔧 **React hooks** - Easy-to-use hooks for components
- 📱 **Browser detection** - Automatic language detection from browser preferences
- 🛡️ **Fallback system** - Intelligent fallback for missing translations

## Installation

This library is part of the LinkKarma NX monorepo. Import it in your applications:

```typescript
import { useIntl, LanguageProvider } from '@linkkarma/intl';
```

## Quick Start

### 1. Wrap your app with LanguageProvider

```tsx
import { LanguageProvider } from '@linkkarma/intl';

function App() {
  return (
    <LanguageProvider defaultLanguage="pt" preloadLanguages={['pt', 'en']}>
      <YourAppContent />
    </LanguageProvider>
  );
}
```

### 2. Use the useIntl hook in components

```tsx
import { useIntl } from '@linkkarma/intl';

function MyComponent() {
  const { t, language, setLanguage } = useIntl();

  return (
    <div>
      <h1>{t('frontend.landing.hero.title')}</h1>
      <p>{t('frontend.landing.hero.subtitle')}</p>

      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pt')}>Português</button>

      <p>Current language: {language}</p>
    </div>
  );
}
```

## Available Hooks

### useIntl()

Main hook providing translation function and language management:

```typescript
const {
  t, // Translation function
  language, // Current language
  setLanguage, // Change language
  availableLanguages, // Available languages array
  languageNames, // Language display names
  isLoading, // Loading state
  error, // Error state
  translations, // Raw translations object
} = useIntl();
```

### useLanguage()

Lightweight hook for language switching only:

```typescript
const { language, setLanguage, availableLanguages, languageNames } = useLanguage();
```

### useTranslation()

Hook for translation only (assumes translations are loaded):

```typescript
const { t, language } = useTranslation();
```

## Translation Structure

Translations are organized hierarchically:

```json
{
  "frontend": {
    "landing": {
      "hero": {
        "title": "Transform Your",
        "subtitle": "The first platform..."
      },
      "navigation": {
        "home": "Home",
        "pricing": "Pricing"
      }
    },
    "pricing": { ... },
    "faq": { ... }
  },
  "backend": {
    "ai-service": {
      "analysis": { ... }
    }
  }
}
```

## Utilities

### loadTranslations(language)

Load translations for a specific language:

```typescript
import { loadTranslations } from '@linkkarma/intl';

const translations = await loadTranslations('en');
```

### preloadTranslations(languages)

Preload multiple languages for better performance:

```typescript
import { preloadTranslations } from '@linkkarma/intl';

await preloadTranslations(['pt', 'en']);
```

## TypeScript Support

The library provides full TypeScript support with typed translation keys:

```typescript
// ✅ Valid - will autocomplete and type-check
t('frontend.landing.hero.title');

// ❌ Invalid - TypeScript error
t('invalid.key.path');
```

## Language Files

- `pt.json` - Portuguese translations
- `en.json` - English translations

Both files follow the same hierarchical structure and are automatically validated.

## Browser Support

- Automatic browser language detection
- localStorage persistence
- Fallback to default language (Portuguese)
- SSR-safe (no hydration issues)

## Development

### Adding New Translations

1. Add the key to both `pt.json` and `en.json`
2. Update the TypeScript types if needed
3. Use the new key in your components

### Validation

The library includes validation utilities to ensure translation structure consistency:

```typescript
import { validateTranslationStructure } from '@linkkarma/intl';

const isValid = validateTranslationStructure(translations, 'en');
```

## Building

Run `nx build intl` to build the library.

## Running unit tests

Run `nx test intl` to execute the unit tests via [Jest](https://jestjs.io).

## License

MIT
