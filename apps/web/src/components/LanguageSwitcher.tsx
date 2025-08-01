'use client';

import { useIntl } from '@linkkarma/intl';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage, availableLanguages, languageNames } =
    useIntl();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLanguage: string) => {
    // Update the language in the store
    setLanguage(newLanguage as any);

    // Navigate to the new language route
    const currentPath = pathname.replace(/^\/[a-z]{2}/, ''); // Remove current locale
    const newPath = `/${newLanguage}${currentPath}`;

    // Update cookie for middleware
    document.cookie = `linkkarma-preferred-language=${newLanguage}; path=/; max-age=${
      365 * 24 * 60 * 60
    }; samesite=lax`;

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languageNames[language as keyof typeof languageNames]}
        </span>
        <span className="sm:hidden">{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                  lang === language
                    ? 'bg-purple-50 text-purple-600 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {languageNames[lang as keyof typeof languageNames]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
