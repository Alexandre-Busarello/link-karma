'use client';

import { useAuthStore } from '@linkkarma/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export function AuthGuard({
  children,
  redirectTo = '/auth/signin',
  requireAuth = true,
  fallback,
}: AuthGuardProps) {
  const router = useRouter();
  const { push: localizedPush } = useLocalizedNavigation();
  const { isAuthenticated, isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    if (isInitialized && !isLoading) {
      if (requireAuth && !isAuthenticated) {
        // Redirect to sign in with current path as redirect
        const currentPath = window.location.pathname + window.location.search;
        const signInUrl = `${redirectTo}${
          currentPath !== '/'
            ? `?redirect=${encodeURIComponent(currentPath)}`
            : ''
        }`;
        router.push(signInUrl);
      } else if (!requireAuth && isAuthenticated) {
        // Redirect authenticated users away from auth pages
        localizedPush('/');
      }
    }
  }, [
    isAuthenticated,
    isInitialized,
    isLoading,
    requireAuth,
    redirectTo,
    router,
  ]);

  // Show loading while initializing
  if (!isInitialized || isLoading) {
    return (
      fallback || (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      )
    );
  }

  // Don't render if auth requirements aren't met
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;
