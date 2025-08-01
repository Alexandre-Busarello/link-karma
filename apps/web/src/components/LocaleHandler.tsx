'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useLanguageStore, type Language } from '@linkkarma/intl';

interface LocaleHandlerProps {
  children: React.ReactNode;
}

export function LocaleHandler({ children }: LocaleHandlerProps) {
  const params = useParams();
  const { setLanguage, currentLanguage } = useLanguageStore();

  useEffect(() => {
    const locale = params?.locale as string;
    
    // Validate and set language based on URL parameter
    if (locale && (locale === 'pt' || locale === 'en')) {
      const urlLanguage = locale as Language;
      
      // Only update if different from current language to avoid unnecessary re-renders
      if (currentLanguage !== urlLanguage) {
        setLanguage(urlLanguage);
      }
    }
  }, [params?.locale, setLanguage, currentLanguage]);

  return <>{children}</>;
}
