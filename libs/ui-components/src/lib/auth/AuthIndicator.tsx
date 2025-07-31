'use client';

import { useAuthStore } from '@linkkarma/auth';
import { Star, TrendingUp, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface AuthIndicatorProps {
  /**
   * Variant of the indicator
   * - 'banner': Full-width banner style (for listing pages)
   * - 'card': Card style (for individual showcase pages)
   */
  variant?: 'banner' | 'card';

  /**
   * Custom className for additional styling
   */
  className?: string;

  /**
   * Custom title text
   */
  title?: string;

  /**
   * Custom description text
   */
  description?: string;

  /**
   * Custom button text
   */
  buttonText?: string;

  /**
   * Callback when the sign-up button is clicked
   */
  onSignUpClick?: () => void;
}

export function AuthIndicator({
  variant = 'banner',
  className = '',
  title = 'Ganhe Karma Points!',
  description = 'Crie uma conta para ganhar Karma Points ao se cadastrar através dos links de referral e desbloquear benefícios exclusivos!',
  buttonText = 'Criar Conta',
  onSignUpClick,
}: AuthIndicatorProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Don't render if user is authenticated
  if (isAuthenticated) return null;

  const handleSignUpClick = () => {
    if (onSignUpClick) {
      onSignUpClick();
    } else {
      // Get current URL for redirect after signup
      const currentUrl = window.location.pathname + window.location.search;
      const signupUrl = `/auth/signup${
        currentUrl !== '/' ? `?redirect=${encodeURIComponent(currentUrl)}` : ''
      }`;
      router.push(signupUrl);
    }
  };

  if (variant === 'card') {
    return (
      <div
        className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-6 w-6" />
              <h3 className="text-lg font-bold">{title}</h3>
            </div>

            <p className="text-sm opacity-90 mb-4 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 flex-shrink-0" />
                <span>Acompanhe suas contribuições</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4 flex-shrink-0" />
                <span>Ganhe créditos para novas vitrines</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignUpClick}
          className="w-full bg-white text-purple-600 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {buttonText}
        </button>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div
      className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span className="font-semibold">{title}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>Acompanhe suas contribuições</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserPlus className="h-4 w-4" />
                <span>Ganhe créditos para novas vitrines</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSignUpClick}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {buttonText}
          </button>
        </div>
        <div className="mt-2 text-sm opacity-90">{description}</div>
      </div>
    </div>
  );
}

export default AuthIndicator;
