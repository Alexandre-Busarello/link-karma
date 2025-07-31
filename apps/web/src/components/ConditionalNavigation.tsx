'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Não mostrar navegação padrão na página inicial
  if (pathname === '/') {
    return null;
  }
  
  return <Navigation />;
}
