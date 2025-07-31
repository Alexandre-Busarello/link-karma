'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@linkkarma/auth';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          setIsLoading(false);
          return;
        }

        if (data.session) {
          // Check if this is a new user (first time signing in)
          const isNewUser = data.session.user.created_at === data.session.user.updated_at;
          
          if (isNewUser) {
            // New user should go through onboarding
            router.push('/onboarding');
          } else {
            // Existing user goes to dashboard or redirect URL
            const redirectTo = searchParams.get('redirect') || '/';
            router.push(redirectTo);
          }
        } else {
          // No session, redirect to sign in
          router.push('/auth/signin');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        setError('Ocorreu um erro inesperado durante a autenticação');
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Erro na Autenticação
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                {error}
              </p>
              <button
                onClick={() => router.push('/auth/signin')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 text-purple-600 animate-spin mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Finalizando Autenticação
            </h2>
            <p className="text-sm text-gray-600">
              Aguarde enquanto configuramos sua conta...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
