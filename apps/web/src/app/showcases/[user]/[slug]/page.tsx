'use client';

import { mockShowcaseService, useUIStore } from '@linkkarma/db';
import { Showcase } from '@linkkarma/shared-types';
import { ShowcaseDisplay } from '@linkkarma/ui-components';
import { ArrowLeft, Flag, Heart, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShowcasePage() {
  const params = useParams();
  const router = useRouter();
  const [showcase, setShowcase] = useState<Showcase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useUIStore();

  const user = params.user as string;
  const slug = params.slug as string;

  useEffect(() => {
    const loadShowcase = async () => {
      try {
        setLoading(true);
        setError(null);

        // In a real app, you would fetch by user and slug
        // For now, we'll use the slug as the showcase ID
        const showcaseData = await mockShowcaseService.getShowcase(slug);

        if (!showcaseData) {
          setError('Vitrine não encontrada');
          return;
        }

        setShowcase(showcaseData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar vitrine'
        );
      } finally {
        setLoading(false);
      }
    };

    if (user && slug) {
      loadShowcase();
    }
  }, [user, slug]);

  const handleBack = () => {
    router.push('/showcases');
  };

  const handleShare = async () => {
    try {
      if (navigator.share && showcase) {
        await navigator.share({
          title: showcase.title,
          text: showcase.description,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        showSuccess(
          'Link copiado!',
          'O link da vitrine foi copiado para a área de transferência'
        );
      }
    } catch {
      showError(
        'Erro ao compartilhar',
        'Não foi possível compartilhar a vitrine'
      );
    }
  };

  const handleReferralClick = () => {
    if (showcase) {
      // Track analytics here
      console.log('Referral clicked:', showcase.referral_url);
      showSuccess('Redirecionando...', `Abrindo ${showcase.service_name}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar às Vitrines
            </button>
          </div>

          {/* Loading Content */}
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Carregando vitrine
            </h3>
            <p className="text-gray-600">Preparando o conteúdo para você...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !showcase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar às Vitrines
            </button>
          </div>

          {/* Error Content */}
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl mb-6">
              <Flag className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {error || 'Vitrine não encontrada'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
              A vitrine que você está procurando pode ter sido removida ou não
              existe mais.
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar às Vitrines
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Voltar às Vitrines
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200">
              <Heart className="w-4 h-4" />
              Favoritar
            </button>
          </div>
        </div>

        {/* Enhanced Showcase Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden p-6">
          <ShowcaseDisplay
            showcase={showcase}
            onReferralClick={handleReferralClick}
          />
        </div>
      </div>
    </div>
  );
}
