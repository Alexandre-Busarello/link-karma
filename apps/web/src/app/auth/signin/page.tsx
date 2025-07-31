'use client';

import { useAuthStore } from '@linkkarma/auth';
import { SignInForm } from '@linkkarma/ui-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isInitialized } = useAuthStore();

  // Get redirect URL from query params
  const redirectTo = searchParams.get('redirect') || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isInitialized, router, redirectTo]);

  // Handle successful sign in
  const handleSignInSuccess = () => {
    router.push(redirectTo);
  };

  // Handle switch to sign up
  const handleSwitchToSignUp = () => {
    const signUpUrl = `/auth/signup${
      redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''
    }`;
    router.push(signUpUrl);
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
        <SignInForm
          onSuccess={handleSignInSuccess}
          onSwitchToSignUp={handleSwitchToSignUp}
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
