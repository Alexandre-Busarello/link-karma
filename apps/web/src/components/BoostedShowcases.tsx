'use client';

import { mockShowcaseService } from '@linkkarma/db';
import { useIntl } from '@linkkarma/intl';
import { Showcase } from '@linkkarma/shared-types';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Crown,
  Eye,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ShowcasePreview } from './ShowcasePreview';

// Function to generate showcase URL following the /:user/:id pattern
const generateShowcaseUrl = (showcase: Showcase) => {
  const slug = showcase.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const userSlug = `user-${showcase.id}`;
  return `/showcases/${userSlug}/${slug}`;
};

export function BoostedShowcases() {
  const { t } = useIntl();
  const [showcases, setShowcases] = useState<Showcase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoostedShowcases = async () => {
      try {
        const result = await mockShowcaseService.getShowcases({
          sort: 'featured',
        });

        // Filter showcases with active boosts (featured or karma boost)
        const boostedShowcases = result.data.filter((showcase) => {
          const isFeatured =
            showcase.featured_until &&
            new Date(showcase.featured_until) > new Date();
          const hasKarmaBoost = showcase.karma_boost > 0;
          return isFeatured || hasKarmaBoost;
        });

        // Sort by priority: featured first, then karma boost amount
        boostedShowcases.sort((a, b) => {
          const aFeatured =
            a.featured_until && new Date(a.featured_until) > new Date();
          const bFeatured =
            b.featured_until && new Date(b.featured_until) > new Date();

          if (aFeatured && !bFeatured) return -1;
          if (!aFeatured && bFeatured) return 1;
          if (aFeatured && bFeatured) return 0;

          return b.karma_boost - a.karma_boost;
        });

        setShowcases(boostedShowcases.slice(0, 6)); // Limit to 6 showcases
      } catch (error) {
        console.error('Erro ao carregar vitrines impulsionadas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBoostedShowcases();
  }, []);

  // Auto-rotate showcases every 5 seconds
  useEffect(() => {
    if (showcases.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [showcases.length]);

  const nextShowcase = () => {
    setCurrentIndex((prev) => (prev + 1) % showcases.length);
  };

  const prevShowcase = () => {
    setCurrentIndex((prev) => (prev - 1 + showcases.length) % showcases.length);
  };

  const goToShowcase = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-purple-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {t('frontend.showcases.boosted.title')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {t('frontend.showcases.boosted.subtitle')}
            </h2>
          </div>

          {/* Loading State */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (showcases.length === 0) {
    return null; // Don't render if no boosted showcases
  }

  const currentShowcase = showcases[currentIndex];

  return (
    <section
      id="boosted-showcases"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-pink-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-purple-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            {t('frontend.showcases.boosted.title')}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
            {t('frontend.showcases.boosted.subtitle')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            {t('frontend.showcases.boosted.description')}
          </p>
        </div>

        {/* Showcase Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <Link href={generateShowcaseUrl(currentShowcase)}>
              <div className="relative">
                <ShowcasePreview
                  showcase={currentShowcase}
                  className="transform scale-100 hover:scale-[1.02] transition-transform duration-300"
                />

                {/* Boost Indicators */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {currentShowcase.featured_until &&
                    new Date(currentShowcase.featured_until) > new Date() && (
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                        <Crown className="w-3 h-3 fill-current" />
                        {t('frontend.showcases.boosted.featuredPremium')}
                      </div>
                    )}

                  {currentShowcase.karma_boost > 0 && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                      <Zap className="w-3 h-3 fill-current" />+
                      {currentShowcase.karma_boost} KP
                    </div>
                  )}
                </div>

                {/* Time Remaining Indicator */}
                {currentShowcase.featured_until && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      <Clock className="w-3 h-3" />
                      {t('frontend.showcases.boosted.active')}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Navigation Arrows */}
          {showcases.length > 1 && (
            <>
              <button
                onClick={prevShowcase}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-purple-600 transition-all duration-200 z-10"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextShowcase}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:text-purple-600 transition-all duration-200 z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {showcases.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {showcases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToShowcase(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {
                showcases.filter(
                  (s) =>
                    s.featured_until && new Date(s.featured_until) > new Date()
                ).length
              }
            </h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.showcases.boosted.activeHighlights')}
            </p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {showcases.filter((s) => s.karma_boost > 0).length}
            </h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.showcases.boosted.boosts')}
            </p>
          </div>

          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">+300%</h3>
            <p className="text-gray-600 text-sm">
              {t('frontend.showcases.boosted.moreVisibility')}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white mx-4 sm:mx-0">
            <h3 className="text-2xl font-bold mb-4">
              {t('frontend.showcases.boosted.wantBoost')}
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              {t('frontend.showcases.boosted.useKarmaPoints')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/showcases"
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('frontend.showcases.recent.viewAll')}
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('frontend.showcases.boosted.startBoosting')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
