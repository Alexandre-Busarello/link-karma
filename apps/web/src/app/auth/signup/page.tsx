'use client';

import { useAuthStore } from '@linkkarma/auth';
import { SignUpForm } from '@linkkarma/ui-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isInitialized } = useAuthStore();

  // Get redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/onboarding';

  // Helper function to handle redirects with locale
  const handleRedirect = (url: string) => {
    // If URL already has locale, use as is
    if (url.startsWith('/pt/') || url.startsWith('/en/')) {
      router.push(url);
      return;
    }

    // If URL is root, redirect to Portuguese (default)
    if (url === '/') {
      router.push('/pt');
      return;
    }

    // For other URLs, try to get preferred language from cookie
    const preferredLanguage =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('linkkarma-preferred-language='))
        ?.split('=')[1] || 'pt';

    router.push(`/${preferredLanguage}${url}`);
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      handleRedirect(redirectTo);
    }
  }, [isAuthenticated, isInitialized, redirectTo]);

  // Handle successful sign up
  const handleSignUpSuccess = () => {
    // New users should go through onboarding
    handleRedirect('/onboarding');
  };

  // Handle switch to sign in
  const handleSwitchToSignIn = () => {
    const signInUrl = `/auth/signin${
      redirectTo !== '/onboarding'
        ? `?redirect=${encodeURIComponent(redirectTo)}`
        : ''
    }`;
    router.push(signInUrl);
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">LinkKarma</h1>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignUpForm
          onSuccess={handleSignUpSuccess}
          onSwitchToSignIn={handleSwitchToSignIn}
          redirectUrl={redirectTo}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © 2024 LinkKarma. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
