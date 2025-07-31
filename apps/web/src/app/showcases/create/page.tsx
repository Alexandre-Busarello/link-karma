'use client';

import { mockShowcaseService } from '@linkkarma/db';
import {
  CreateShowcaseRequest,
  LoadingState,
  SecurityCheckResult,
  Showcase,
  ShowcaseCategory,
  ShowcaseCreationStep,
} from '@linkkarma/shared-types';
import {
  AIGenerationProgress,
  SecurityStatusDisplay,
  ShowcaseCreationForm,
  ShowcaseEditor,
} from '@linkkarma/ui-components';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@linkkarma/auth';
import AuthGuard from '../../../components/AuthGuard';

interface APIResult {
  data: {
    what_is: string;
    advantages: string[];
    quick_guide: string[];
    faq: { question: string; answer: string }[];
    service_name?: string;
  };
  security_check: SecurityCheckResult;
}

export default function CreateShowcasePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [currentShowcase, setCurrentShowcase] = useState<Showcase | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });
  const [creationStep, setCreationStep] = useState<ShowcaseCreationStep>('url-input');
  const [securityCheck, setSecurityCheck] = useState<SecurityCheckResult | null>(null);
  const [userAcceptedRisk, setUserAcceptedRisk] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string>('');
  const [pendingCategory, setPendingCategory] = useState<ShowcaseCategory>('other');

  // Mock user data - in real app this would come from auth context
  const mockUser = {
    tier: 'basic' as const,
    showcaseCount: 0,
  };

  // Security verification function
  const handleSecurityVerification = async (
    url: string,
    category: ShowcaseCategory
  ) => {
    setLoading({ isLoading: true, error: null });
    setCreationStep('security-verification');

    // Store URL and category for later use
    setPendingUrl(url);
    setPendingCategory(category);

    try {
      // Call the security verification API
      const response = await fetch('/api/showcases/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          category,
          userId: user?.id || 'anonymous',
          userTier: mockUser.tier,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'LINK_BLOCKED') {
          // Link is blocked - show security status and stop
          setSecurityCheck(result.security_check);
          setLoading({ isLoading: false, error: null });
          return;
        }
        throw new Error(result.message || 'Erro na verificação de segurança');
      }

      // Store security check result
      setSecurityCheck(result.security_check);

      // If approved, proceed to AI generation
      if (result.security_check?.status === 'APROVADO') {
        setCreationStep('ai-generation');
        // Continue with showcase creation
        await continueShowcaseCreation(url, category, result);
      } else if (result.security_check?.status === 'SUSPEITO') {
        // Show warning and wait for user decision
        setLoading({ isLoading: false, error: null });
      }
    } catch (error) {
      console.error('Security verification failed:', error);
      setLoading({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro na verificação de segurança',
      });
    }
  };

  // Continue showcase creation after security approval
  const continueShowcaseCreation = async (
    url: string,
    category: ShowcaseCategory,
    apiResult?: APIResult
  ) => {
    // Set loading state for AI generation progress
    setLoading({ isLoading: true, error: null });

    try {
      let showcaseContent;
      let securityResult;

      if (apiResult) {
        // Use existing API result
        showcaseContent = apiResult.data;
        securityResult = apiResult.security_check;
      } else {
        // Make new API call (for suspicious links that user accepted)
        const response = await fetch('/api/showcases/generate-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            category,
            userId: user?.id || 'anonymous',
            userTier: mockUser.tier,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Erro na geração de conteúdo');
        }

        showcaseContent = result.data;
        securityResult = result.security_check;
      }

      // Create showcase with security information
      const newShowcase = await mockShowcaseService.createShowcase({
        referral_url: url,
        category,
      });

      // Update with AI content and security check
      const updatedShowcase = await mockShowcaseService.updateShowcase(
        newShowcase.id,
        {
          title:
            showcaseContent.title ||
            `${showcaseContent.what_is.split(' ').slice(0, 6).join(' ')}...`,
          description:
            showcaseContent.description ||
            showcaseContent.what_is.substring(0, 150) + '...',
          service_name: showcaseContent.service_name || 'Serviço',
          content: {
            what_is: showcaseContent.what_is,
            advantages: showcaseContent.advantages,
            quick_guide: showcaseContent.quick_guide,
            faq: showcaseContent.faq,
          },
          security_check: securityResult,
        }
      );

      setCurrentShowcase(updatedShowcase);
      setCreationStep('content-editing');
      setLoading({ isLoading: false, error: null });
    } catch (error) {
      console.error('Showcase creation failed:', error);
      setLoading({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Erro ao criar showcase',
      });
    }
  };

  const handleCreateShowcase = async (data: CreateShowcaseRequest) => {
    // Reset states
    setSecurityCheck(null);
    setUserAcceptedRisk(false);
    setPendingUrl('');
    setPendingCategory('other');

    // Start with security verification
    await handleSecurityVerification(data.referral_url, data.category);
  };

  const handleSaveShowcase = async (data: Partial<Showcase>) => {
    if (!currentShowcase) return;

    setLoading({ isLoading: true, error: null });
    try {
      const updatedShowcase = await mockShowcaseService.updateShowcase(
        currentShowcase.id,
        data
      );
      setCurrentShowcase(updatedShowcase);
    } catch (error) {
      setLoading({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Erro ao salvar vitrine',
      });
    } finally {
      setLoading((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handlePublishShowcase = async (data: Partial<Showcase>) => {
    if (!currentShowcase) return;

    setLoading({ isLoading: true, error: null });
    try {
      const updatedShowcase = await mockShowcaseService.updateShowcase(
        currentShowcase.id,
        {
          ...data,
          status: 'published',
        }
      );
      setCurrentShowcase(updatedShowcase);
      setCreationStep('published');

      // Show success message and redirect to showcase view
      setTimeout(() => {
        router.push(`/showcases/${updatedShowcase.user_id}/${updatedShowcase.id}`);
      }, 1000);
    } catch (error) {
      setLoading({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Erro ao publicar vitrine',
      });
    } finally {
      setLoading((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleBackToShowcases = () => {
    router.push('/showcases');
  };

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToShowcases}
              className="text-gray-600 hover:text-gray-900 flex items-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Criar Nova Vitrine
            </h1>
          </div>

          <div className="flex items-center text-purple-600">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">IA Powered</span>
          </div>
        </div>

        {/* Creation Progress */}
        <div className="mt-4">
          <div className="flex items-center space-x-4 text-sm">
            <div
              className={`flex items-center ${
                creationStep === 'url-input'
                  ? 'text-purple-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs mr-2">
                1
              </span>
              URL Input
            </div>
            <div
              className={`flex items-center ${
                creationStep === 'security-verification'
                  ? 'text-purple-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs mr-2">
                2
              </span>
              Verificação
            </div>
            <div
              className={`flex items-center ${
                creationStep === 'ai-generation'
                  ? 'text-purple-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs mr-2">
                3
              </span>
              IA Gerando
            </div>
            <div
              className={`flex items-center ${
                creationStep === 'content-editing'
                  ? 'text-purple-600'
                  : 'text-gray-400'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-current text-white flex items-center justify-center text-xs mr-2">
                4
              </span>
              Edição
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (creationStep === 'url-input') {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <ShowcaseCreationForm
            onSubmit={handleCreateShowcase}
            loading={loading}
            userTier={mockUser.tier}
            currentShowcaseCount={mockUser.showcaseCount}
          />
        </div>
      );
    }

    if (creationStep === 'security-verification') {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center py-12">
            {loading.isLoading ? (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verificando Segurança do Link
                </h3>
                <p className="text-gray-600">
                  Analisando a reputação online do serviço...
                </p>
              </div>
            ) : securityCheck ? (
              <div className="max-w-lg mx-auto">
                <SecurityStatusDisplay
                  securityCheck={securityCheck}
                  onProceed={
                    securityCheck.status === 'SUSPEITO'
                      ? async () => {
                          setUserAcceptedRisk(true);
                          setCreationStep('ai-generation');
                          await continueShowcaseCreation(
                            pendingUrl,
                            pendingCategory
                          );
                        }
                      : undefined
                  }
                  onCancel={() => {
                    setCreationStep('url-input');
                    setSecurityCheck(null);
                    setUserAcceptedRisk(false);
                    setPendingUrl('');
                    setPendingCategory('other');
                    setLoading({ isLoading: false, error: null });
                  }}
                  showActions={securityCheck.status !== 'BLOQUEADO'}
                />

                {securityCheck.status === 'SUSPEITO' && !userAcceptedRisk && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="accept-risk"
                        className="mt-1 mr-3"
                        onChange={(e) => setUserAcceptedRisk(e.target.checked)}
                      />
                      <label
                        htmlFor="accept-risk"
                        className="text-sm text-yellow-800"
                      >
                        <strong>Entendo os riscos</strong> e desejo prosseguir
                        com a criação da vitrine. Estou ciente de que este link
                        apresenta questões de reputação que podem afetar minha
                        credibilidade na plataforma.
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    if (creationStep === 'ai-generation') {
      return (
        <div className="max-w-2xl mx-auto p-6">
          <AIGenerationProgress
            isGenerating={loading.isLoading}
            error={loading.error}
            onRetry={async () => {
              if (pendingUrl) {
                setLoading({ isLoading: true, error: null });
                await continueShowcaseCreation(pendingUrl, pendingCategory);
              }
            }}
          />
        </div>
      );
    }

    if (creationStep === 'content-editing' && currentShowcase) {
      return (
        <ShowcaseEditor
          showcase={currentShowcase}
          onSave={handleSaveShowcase}
          onPublish={handlePublishShowcase}
          loading={loading}
          userTier={mockUser.tier}
        />
      );
    }

    return null;
  };

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        {renderHeader()}

        {/* Global Error Display */}
        {loading.error && (
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400 text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erro</h3>
                  <div className="mt-2 text-sm text-red-700">{loading.error}</div>
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        setLoading((prev) => ({ ...prev, error: null }))
                      }
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {renderContent()}
      </div>
    </AuthGuard>
  );
}
