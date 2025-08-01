import { NextRequest, NextResponse } from 'next/server';

// Supported locales
const locales = ['pt', 'en'] as const;
const defaultLocale = 'pt';

// Helper function to get locale from pathname
function getLocaleFromPathname(pathname: string): string | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  return locales.includes(potentialLocale as any) ? potentialLocale : null;
}

// Helper function to get preferred locale from storage cookie
function getPreferredLocale(request: NextRequest): string {
  // Try to get language from cookie (set by client-side storage)
  const languageCookie = request.cookies.get('linkkarma-preferred-language');
  
  if (languageCookie?.value && locales.includes(languageCookie.value as any)) {
    return languageCookie.value;
  }
  
  // Fallback to Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Simple parsing of Accept-Language header
    const preferredLanguages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase());
    
    for (const lang of preferredLanguages) {
      if (lang.startsWith('pt')) return 'pt';
      if (lang.startsWith('en')) return 'en';
    }
  }
  
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  const currentLocale = getLocaleFromPathname(pathname);
  
  // If pathname is just "/" (root), redirect to preferred locale
  if (pathname === '/') {
    const preferredLocale = getPreferredLocale(request);
    const redirectUrl = new URL(`/${preferredLocale}`, request.url);
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Set cookie to remember the preference
    response.cookies.set('linkkarma-preferred-language', preferredLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  }
  
  // If pathname doesn't have a locale, redirect to preferred locale + pathname
  if (!currentLocale) {
    const preferredLocale = getPreferredLocale(request);
    const redirectUrl = new URL(`/${preferredLocale}${pathname}`, request.url);
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Set cookie to remember the preference
    response.cookies.set('linkkarma-preferred-language', preferredLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  }
  
  // If we have a valid locale, update the cookie and continue
  if (currentLocale && locales.includes(currentLocale as any)) {
    const response = NextResponse.next();
    
    // Update cookie with current locale
    response.cookies.set('linkkarma-preferred-language', currentLocale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    return response;
  }
  
  // If locale is invalid, redirect to default locale
  const redirectUrl = new URL(`/${defaultLocale}${pathname.replace(/^\/[^\/]+/, '')}`, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files (public folder)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
