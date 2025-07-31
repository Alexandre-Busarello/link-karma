'use client';

import { useAuthStore } from '@linkkarma/auth';
import { LogIn, Menu, User, UserPlus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LandingNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Seções principais da landing page
  const sections = [
    { id: 'hero', label: 'Início', href: '#hero' },
    { id: 'core-loop', label: 'Como Funciona', href: '#core-loop' },
    { id: 'vitrines-ia', label: 'Vitrines IA', href: '#vitrines-ia' },
    { id: 'pricing', label: 'Preços', href: '#pricing' },
    { id: 'team', label: 'Equipe', href: '#team' },
    { id: 'faq', label: 'FAQ', href: '#faq' },
  ];

  // Scroll spy para destacar seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId || '');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const displayName =
    user?.user_metadata?.display_name ||
    user?.email?.split('@')[0] ||
    'Usuário';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-purple-600">LinkKarma</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.href)}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  activeSection === section.id
                    ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                    : 'text-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/showcases"
                  className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium"
                >
                  Minhas Vitrines
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {displayName}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Entrar
                </button>
                <button
                  onClick={handleSignUp}
                  className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Criar Conta
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.href)}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-50 hover:text-purple-600 rounded-lg ${
                      activeSection === section.id
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      href="/showcases"
                      className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Minhas Vitrines
                    </Link>
                    <div className="flex items-center px-4 py-2 space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {displayName}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={handleSignIn}
                      className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Entrar
                    </button>
                    <button
                      onClick={handleSignUp}
                      className="flex items-center w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Criar Conta
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
