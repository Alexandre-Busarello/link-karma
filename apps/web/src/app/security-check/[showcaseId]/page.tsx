'use client';

import { mockShowcaseService, useUIStore } from '@linkkarma/db';
import { Showcase } from '@linkkarma/shared-types';
import { SecurityStatusDisplay } from '@linkkarma/ui-components';
import { ArrowLeft, ExternalLink, Shield } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SecurityCheckPage() {
  const params = useParams();
  const router = useRouter();
  const { showError } = useUIStore();
  const [showcase, setShowcase] = useState<Showcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const showcaseId = params.showcaseId as string;

  useEffect(() => {
    const loadShowcase = async () => {
      try {
        setLoading(true);
        setError(null);

        const showcaseData = await mockShowcaseService.getShowcase(showcaseId);

        if (!showcaseData) {
          setError('Vitrine não encontrada');
          return;
        }

        if (!showcaseData.security_check) {
          setError(
            'Informações de segurança não disponíveis para esta vitrine'
          );
          return;
        }

        setShowcase(showcaseData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao carregar informações de segurança'
        );
      } finally {
        setLoading(false);
      }
    };

    if (showcaseId) {
      loadShowcase();
    }
  }, [showcaseId]);

  const handleBack = () => {
    router.back();
  };

  const handleViewShowcase = () => {
    if (showcase) {
      const url = `/showcases/user-${showcase.id}/${showcase.id}`;
      router.push(url);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>

          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carregando informações de segurança
            </h3>
            <p className="text-gray-600">Preparando os detalhes para você...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !showcase || !showcase.security_check) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>

          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl mb-6">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {error || 'Informações não disponíveis'}
            </h3>
            <p className="text-gray-600 mb-6">
              Não foi possível carregar as informações de segurança desta
              vitrine.
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar
          </button>

          <button
            onClick={handleViewShowcase}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            Ver Vitrine
          </button>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verificação de Segurança
          </h1>
          <p className="text-gray-600">
            Detalhes completos da análise de segurança para{' '}
            <strong>{showcase.title}</strong>
          </p>
        </div>

        {/* Security Status Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden p-6">
          <SecurityStatusDisplay
            securityCheck={showcase.security_check}
            showActions={false}
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Sobre esta verificação
          </h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              • Esta análise foi realizada automaticamente por nosso sistema de
              IA
            </p>
            <p>• As informações são coletadas de fontes públicas na internet</p>
            <p>
              • A verificação é atualizada periodicamente para manter a precisão
            </p>
            <p>
              • Use essas informações como orientação, mas sempre faça sua
              própria pesquisa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
