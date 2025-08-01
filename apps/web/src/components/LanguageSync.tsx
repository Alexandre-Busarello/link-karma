'use client';

import { useLanguageStore } from '@linkkarma/intl';
import { useEffect } from 'react';

/**
 * Component that synchronizes language preference between localStorage and cookies
 * This allows the middleware to access the user's language preference
 */
export function LanguageSync() {
  const { currentLanguage } = useLanguageStore();

  useEffect(() => {
    // Set cookie whenever language changes so middleware can access it
    if (typeof document !== 'undefined') {
      document.cookie = `linkkarma-preferred-language=${currentLanguage}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`;
    }
  }, [currentLanguage]);

  useEffect(() => {
    // On initial load, check if there's a mismatch between URL and stored preference
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const urlLocale = currentPath.split('/')[1];
      
      // If URL locale doesn't match stored preference, update the URL
      if (urlLocale !== currentLanguage && (urlLocale === 'pt' || urlLocale === 'en')) {
        // URL takes precedence, so update the store to match URL
        // This is handled by LocaleHandler, so we don't need to do anything here
        return;
      }
      
      // If we're on root path or path without locale, redirect to correct locale
      if (currentPath === '/' || (!currentPath.startsWith('/pt') && !currentPath.startsWith('/en'))) {
        const newPath = `/${currentLanguage}${currentPath === '/' ? '' : currentPath}`;
        window.history.replaceState(null, '', newPath);
      }
    }
  }, [currentLanguage]);

  // This component doesn't render anything
  return null;
}
