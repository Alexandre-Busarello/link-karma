'use client';

import { useLanguageStore } from '@linkkarma/intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootPage() {
  const router = useRouter();
  const { currentLanguage } = useLanguageStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Get the preferred language from localStorage or default to 'pt'
      const preferredLanguage = currentLanguage || 'pt';

      // Redirect to the preferred language
      router.replace(`/${preferredLanguage}`);
    }
  }, [isClient, currentLanguage, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}
