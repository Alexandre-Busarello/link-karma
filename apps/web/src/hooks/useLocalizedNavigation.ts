'use client';

import { useIntl } from '@linkkarma/intl';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook for localized navigation that automatically includes the current locale
 */
export function useLocalizedNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { language } = useIntl();

  // Get current locale from pathname
  const getCurrentLocale = useCallback(() => {
    const segments = pathname.split('/');
    const potentialLocale = segments[1];
    return (potentialLocale === 'pt' || potentialLocale === 'en') ? potentialLocale : language;
  }, [pathname, language]);

  // Navigate to a path with current locale
  const push = useCallback((path: string) => {
    const locale = getCurrentLocale();
    const localizedPath = path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
    router.push(localizedPath);
  }, [router, getCurrentLocale]);

  // Replace current path with localized version
  const replace = useCallback((path: string) => {
    const locale = getCurrentLocale();
    const localizedPath = path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
    router.replace(localizedPath);
  }, [router, getCurrentLocale]);

  // Create a localized Link href
  const createHref = useCallback((path: string) => {
    const locale = getCurrentLocale();
    return path.startsWith('/') ? `/${locale}${path}` : `/${locale}/${path}`;
  }, [getCurrentLocale]);

  // Get current path without locale
  const getPathWithoutLocale = useCallback(() => {
    const segments = pathname.split('/');
    if (segments[1] === 'pt' || segments[1] === 'en') {
      return '/' + segments.slice(2).join('/');
    }
    return pathname;
  }, [pathname]);

  return {
    push,
    replace,
    createHref,
    getCurrentLocale,
    getPathWithoutLocale,
    // Expose original router methods for non-localized navigation (like auth routes)
    router,
  };
}
