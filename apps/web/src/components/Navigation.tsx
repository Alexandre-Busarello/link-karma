'use client';

import { useAuthStore } from '@linkkarma/auth';
import {
  ChevronDown,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocalizedNavigation } from '../hooks/useLocalizedNavigation';

export function Navigation() {
  const router = useRouter();
  const { push: localizedPush, createHref } = useLocalizedNavigation();
  const { isAuthenticated, user, signOut, isLoading } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    localizedPush('/');
  };

  const handleSignIn = () => {
    const currentUrl = window.location.pathname + window.location.search;
    const signinUrl = `/auth/signin${
      currentUrl !== '/' ? `?redirect=${encodeURIComponent(currentUrl)}` : ''
    }`;
    router.push(signinUrl);
  };

  const handleSignUp = () => {
    const currentUrl = window.location.pathname + window.location.search;
    const signupUrl = `/auth/signup${
      currentUrl !== '/' ? `?redirect=${encodeURIComponent(currentUrl)}` : ''
    }`;
    router.push(signupUrl);
  };

  const displayName =
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'Usuário';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link
              href={createHref('/')}
              className="flex items-center space-x-2"
            >
              <h1 className="text-xl font-bold text-purple-600">LinkKarma</h1>
              <span className="text-sm text-gray-500">MVP Demo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={createHref('/showcases')}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Vitrines
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href={createHref('/showcases/create')}
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Criar Vitrine
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">{displayName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Meu Perfil
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                      </Link>

                      <div className="border-t">
                        <button
                          onClick={handleSignOut}
                          disabled={isLoading}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sair
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSignIn}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Entrar
                </button>
                <button
                  onClick={handleSignUp}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Criar Conta
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-3">
              <Link
                href={createHref('/showcases')}
                className="block text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vitrines
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href={createHref('/showcases/create')}
                    className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Vitrine
                  </Link>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href="/profile"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Meu Perfil
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                      </Link>

                      <button
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="flex items-center text-red-700 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-3 border-t pt-3 mt-3">
                  <button
                    onClick={handleSignIn}
                    className="block w-full text-left text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="block w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-center"
                  >
                    Criar Conta
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
}

export default Navigation;
