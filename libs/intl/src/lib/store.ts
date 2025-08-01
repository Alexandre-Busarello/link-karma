import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Supported languages
export type Language = 'pt' | 'en';

// Language store state
interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// Default language
export const DEFAULT_LANGUAGE: Language = 'pt';

// Supported languages list
export const SUPPORTED_LANGUAGES: Language[] = ['pt', 'en'];

// Language display names
export const LANGUAGE_NAMES: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
};

// Create the Zustand store with persistence
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: DEFAULT_LANGUAGE,
      isLoading: false,
      
      setLanguage: (language: Language) => {
        if (!SUPPORTED_LANGUAGES.includes(language)) {
          console.warn(`Unsupported language: ${language}. Falling back to ${DEFAULT_LANGUAGE}`);
          language = DEFAULT_LANGUAGE;
        }
        
        set({ currentLanguage: language });
        
        // Dispatch custom event for language change
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('languageChange', {
              detail: { language, previousLanguage: get().currentLanguage },
            })
          );
        }
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'linkkarma-language-storage',
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
      onRehydrateStorage: () => (state) => {
        // Validate the persisted language
        if (state && !SUPPORTED_LANGUAGES.includes(state.currentLanguage)) {
          state.currentLanguage = DEFAULT_LANGUAGE;
        }
      },
    }
  )
);

// Helper function to get browser language
export const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }
  
  const browserLang = navigator.language.toLowerCase();
  
  // Check for exact matches first
  if (SUPPORTED_LANGUAGES.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  
  // Check for language prefix matches (e.g., 'pt-BR' -> 'pt')
  const langPrefix = browserLang.split('-')[0] as Language;
  if (SUPPORTED_LANGUAGES.includes(langPrefix)) {
    return langPrefix;
  }
  
  return DEFAULT_LANGUAGE;
};

// Initialize language based on browser preference if no stored preference exists
export const initializeLanguage = () => {
  const store = useLanguageStore.getState();
  
  // Only set browser language if no language is stored
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem('linkkarma-language-storage');
    
    if (!storedLanguage) {
      const browserLanguage = getBrowserLanguage();
      store.setLanguage(browserLanguage);
    }
  }
};
