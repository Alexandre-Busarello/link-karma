'use client';

import { useAuthStore } from '@linkkarma/auth';
import { mockShowcaseService } from '@linkkarma/db';
import { useIntl } from '@linkkarma/intl';
import {
  LoadingState,
  PaginatedResponse,
  Showcase,
  ShowcaseFilters,
} from '@linkkarma/shared-types';
import {
  AuthIndicator,
  ShowcaseDisplay,
  ShowcaseListing,
} from '@linkkarma/ui-components';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useLocalizedNavigation } from '../../../hooks/useLocalizedNavigation';

type ViewMode = 'listing' | 'display';

export default function ShowcasesPage() {
  const router = useRouter();
  const { push: localizedPush } = useLocalizedNavigation();
  const { isAuthenticated } = useAuthStore();
  const { t } = useIntl();
  const [viewMode, setViewMode] = useState<ViewMode>('listing');
  const [showcases, setShowcases] = useState<PaginatedResponse<Showcase>>({
    data: [],
    pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  });
  const [currentShowcase, setCurrentShowcase] = useState<Showcase | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  const loadShowcases = useCallback(async (filters?: ShowcaseFilters) => {
    setLoading({ isLoading: true, error: null });
    try {
      const result = await mockShowcaseService.getShowcases(filters);
      setShowcases(result);
    } catch (error) {
      setLoading({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : t('frontend.showcases.error.loadingShowcases'),
      });
    } finally {
      setLoading((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load showcases on component mount
  useEffect(() => {
    const initialLoad = async () => {
      setLoading({ isLoading: true, error: null });
      try {
        const result = await mockShowcaseService.getShowcases();
        setShowcases(result);
      } catch (error) {
        setLoading({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : t('frontend.showcases.error.loadingShowcases'),
        });
      } finally {
        setLoading((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initialLoad();
  }, []); // Empty dependency array for initial load only

  const handleCreateShowcase = () => {
    localizedPush('/showcases/create');
  };

  const handleShowcaseClick = async (showcase: Showcase) => {
    setCurrentShowcase(showcase);
    setViewMode('display');
  };

  const handleFiltersChange = useCallback(
    (filters: ShowcaseFilters) => {
      loadShowcases(filters);
    },
    [loadShowcases]
  );

  const handleBackToListing = () => {
    setViewMode('listing');
    setCurrentShowcase(null);
    setLoading({ isLoading: false, error: null });
  };

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {viewMode !== 'listing' && (
              <button
                onClick={handleBackToListing}
                className="text-gray-600 hover:text-gray-900 flex items-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t('frontend.showcases.back')}
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {viewMode === 'listing' && t('frontend.showcases.title')}
              {viewMode === 'display' && currentShowcase?.title}
            </h1>
          </div>

          {viewMode === 'listing' && isAuthenticated && (
            <button
              onClick={handleCreateShowcase}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {t('frontend.showcases.createShowcase')}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'listing':
        return (
          <ShowcaseListing
            showcases={showcases}
            loading={loading.isLoading}
            onFiltersChange={handleFiltersChange}
            onShowcaseClick={handleShowcaseClick}
          />
        );

      case 'display':
        return currentShowcase ? (
          <div className="max-w-4xl mx-auto p-6">
            <ShowcaseDisplay
              showcase={currentShowcase}
              onReferralClick={() => {
                console.log('Referral clicked:', currentShowcase.referral_url);
                // In real app, track analytics here
              }}
            />
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthIndicator variant="banner" />
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
                <h3 className="text-sm font-medium text-red-800">
                  {t('frontend.showcases.error.title')}
                </h3>
                <div className="mt-2 text-sm text-red-700">{loading.error}</div>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      setLoading((prev) => ({ ...prev, error: null }))
                    }
                    className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                  >
                    {t('frontend.showcases.error.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
}
