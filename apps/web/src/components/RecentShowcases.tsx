'use client';

import { mockShowcaseService } from '@linkkarma/db';
import { useIntl } from '@linkkarma/intl';
import { Showcase } from '@linkkarma/shared-types';
import { ArrowRight, Shield, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShowcasePreview } from './ShowcasePreview';

// Function to generate showcase URL following the /:user/:id pattern
const generateShowcaseUrl = (showcase: Showcase) => {
  // Generate a slug from the title
  const slug = showcase.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // For now, we'll use the showcase ID as the user identifier
  // In a real app, this would be the actual user's username/slug
  const userSlug = `user-${showcase.id}`;

  return `/showcases/${userSlug}/${slug}`;
};

export function RecentShowcases() {
  const { t } = useIntl();
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentShowcases = async () => {
      try {
        const result = await mockShowcaseService.getShowcases({
          sort: 'newest',
        });

        // Filtrar apenas vitrines com verificação de segurança positiva
        const approvedShowcases = result.data.filter(
          (showcase) => showcase.security_check?.status === 'APROVADO'
        );

        // Pegar apenas as 3 mais recentes
        setShowcases(approvedShowcases.slice(0, 3));
      } catch (error) {
        console.error('Erro ao carregar vitrines recentes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentShowcases();
  }, []);

  if (loading) {
    return (
      <section id="vitrines-recentes" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t('frontend.showcases.recent.title')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('frontend.showcases.recent.subtitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('frontend.showcases.recent.description')}
            </p>
          </div>

          {/* Loading State */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vitrines-recentes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t('frontend.showcases.recent.title')}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('frontend.showcases.recent.subtitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('frontend.showcases.recent.description')}
          </p>
        </div>

        {showcases.length > 0 ? (
          <>
            {/* Grid de Vitrines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {showcases.map((showcase, index) => (
                <div
                  key={showcase.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Link href={generateShowcaseUrl(showcase)}>
                    <ShowcasePreview showcase={showcase} />
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA para Ver Mais */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('frontend.showcases.recent.wantSeeMore')}
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {t('frontend.showcases.recent.exploreGallery')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/showcases"
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t('frontend.showcases.recent.viewAll')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('frontend.showcases.recent.createMyShowcase')}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Estado Vazio */
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('frontend.showcases.recent.empty')}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t('frontend.showcases.recent.emptyFirstCreate')}
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {t('frontend.showcases.recent.createFirstShowcase')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
