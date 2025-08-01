'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export function ConditionalNavigation() {
  const pathname = usePathname();

  // Não mostrar navegação padrão na página inicial (com ou sem locale)
  if (pathname === '/' || pathname === '/pt' || pathname === '/en') {
    return null;
  }

  return <Navigation />;
}
