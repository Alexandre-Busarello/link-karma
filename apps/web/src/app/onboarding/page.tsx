'use client';

import { useAuthStore } from '@linkkarma/auth';
import {
  ArrowRight,
  CheckCircle,
  Gift,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/onboarding');
    }
  }, [isAuthenticated, router]);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Bem-vindo ao LinkKarma!',
      description:
        'Sua jornada para maximizar seus ganhos com referrals começa aqui',
      icon: <Sparkles className="h-12 w-12 text-purple-600" />,
      content: (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <Gift className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">🎉 Bônus de Boas-Vindas</h3>
            <p className="text-lg">
              Sua primeira vitrine é <strong>100% GRÁTIS</strong>!
            </p>
            <p className="text-sm mt-2 opacity-90">
              Comece já a compartilhar seus links de referral sem custo algum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold">Mais Conversões</h4>
              <p className="text-gray-600">
                Vitrines atraentes convertem até 3x mais
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold">Verificação IA</h4>
              <p className="text-gray-600">Links verificados automaticamente</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold">Comunidade</h4>
              <p className="text-gray-600">Rede de divulgadores confiáveis</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'proof-of-contribution',
      title: 'Sistema "Prova de Contribuição"',
      description: 'Entenda como funciona nosso sistema único de reputação',
      icon: <CheckCircle className="h-12 w-12 text-green-600" />,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              Como Funciona?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Use um link de outro usuário
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Cadastre-se em um serviço através de uma vitrine
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Comprove sua contribuição
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Envie evidência do seu cadastro (print, email, etc.)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">
                    Ganhe créditos
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Receba 1 Crédito de Contribuição + 15 Karma Points
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Benefícios dos Créditos
            </h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Cada 3 créditos = 1 nova vitrine grátis</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Aumente seu Trust Score na comunidade</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span>Acesso a recursos premium</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              <strong>💡 Dica:</strong> Quanto mais você contribui, mais a
              comunidade confia em você!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'ready',
      title: 'Tudo Pronto!',
      description: 'Você está pronto para começar sua jornada no LinkKarma',
      icon: <Star className="h-12 w-12 text-yellow-500" />,
      content: (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl">
            <Star className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Parabéns, {user?.user_metadata?.display_name || 'Usuário'}!
            </h3>
            <p className="text-lg mb-4">
              Você agora faz parte da comunidade LinkKarma
            </p>
            <div className="bg-white/20 rounded-lg p-4 mb-4">
              <h4 className="font-bold mb-2">Seu Status Inicial:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Vitrines Grátis</div>
                  <div className="text-2xl font-bold">1</div>
                </div>
                <div>
                  <div className="font-semibold">Karma Points</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Próximos Passos:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-purple-600 mb-2">
                  1. Crie sua primeira vitrine
                </h4>
                <p className="text-sm text-gray-600">
                  Use seu bônus de boas-vindas para criar uma vitrine incrível
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-blue-600 mb-2">
                  2. Explore a comunidade
                </h4>
                <p className="text-sm text-gray-600">
                  Veja outras vitrines e contribua para ganhar créditos
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Complete onboarding and redirect to dashboard
      router.push('/');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Configuração Inicial
            </h1>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Pular
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / onboardingSteps.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>
              Passo {currentStep + 1} de {onboardingSteps.length}
            </span>
            <span>
              {Math.round(((currentStep + 1) / onboardingSteps.length) * 100)}%
              completo
            </span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            {currentStepData.icon}
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-lg text-gray-600">
              {currentStepData.description}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">{currentStepData.content}</div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <div className="flex space-x-2">
            {onboardingSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-purple-600'
                    : index < currentStep
                    ? 'bg-purple-300'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isLastStep ? 'Começar' : 'Próximo'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
