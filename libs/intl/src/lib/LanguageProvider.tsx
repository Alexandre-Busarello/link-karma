'use client';

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import {
  initializeLanguage,
  useLanguageStore,
  type Language,
} from './store.js';
import { preloadTranslations } from './utils.js';

// Context for language provider
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  isInitialized: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider props
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  preloadLanguages?: Language[];
  onLanguageChange?: (language: Language) => void;
}

// Language Provider Component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguage,
  preloadLanguages = ['pt', 'en'],
  onLanguageChange,
}) => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize language on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize language based on browser preference or stored value
        initializeLanguage();

        // Set default language if provided and no language is set
        if (
          defaultLanguage &&
          typeof window !== 'undefined' &&
          !localStorage.getItem('linkkarma-language-storage')
        ) {
          setLanguage(defaultLanguage);
        }

        // Preload translations
        if (preloadLanguages.length > 0) {
          await preloadTranslations(preloadLanguages);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize language provider:', error);
        setIsInitialized(true); // Still mark as initialized to prevent blocking
      }
    };

    initialize();
  }, [defaultLanguage, preloadLanguages, setLanguage]);

  // Listen for language changes
  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(currentLanguage);
    }
  }, [currentLanguage, onLanguageChange]);

  // Listen for custom language change events
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (onLanguageChange) {
        onLanguageChange(event.detail.language);
      }
    };

    window.addEventListener(
      'languageChange',
      handleLanguageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        'languageChange',
        handleLanguageChange as EventListener
      );
    };
  }, [onLanguageChange]);

  const contextValue: LanguageContextType = {
    language: currentLanguage,
    setLanguage,
    isInitialized,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error(
      'useLanguageContext must be used within a LanguageProvider'
    );
  }

  return context;
};

// HOC for components that need language context
export const withLanguageProvider = <P extends object>(
  Component: React.ComponentType<P>,
  providerProps?: Omit<LanguageProviderProps, 'children'>
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <LanguageProvider {...providerProps}>
      <Component {...props} />
    </LanguageProvider>
  );

  WrappedComponent.displayName = `withLanguageProvider(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};
