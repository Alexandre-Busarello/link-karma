import { LanguageProvider } from '@linkkarma/intl';
import { notFound } from 'next/navigation';
import { LocaleHandler } from '../../components/LocaleHandler';

// Supported locales
const locales = ['pt', 'en'] as const;
type Locale = (typeof locales)[number];

// Validate locale parameter
function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // Await the params
  const { locale } = await params;

  // Validate the locale parameter
  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <LanguageProvider defaultLanguage={locale} preloadLanguages={['pt', 'en']}>
      <LocaleHandler>{children}</LocaleHandler>
    </LanguageProvider>
  );
}

// Generate static params for supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
