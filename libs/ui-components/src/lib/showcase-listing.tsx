'use client';

import { useIntl } from '@linkkarma/intl';
import {
  PaginatedResponse,
  Showcase,
  ShowcaseFilters,
} from '@linkkarma/shared-types';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Car,
  ChevronDown,
  Clock,
  DollarSign,
  ExternalLink,
  Eye,
  Film,
  Filter,
  Grid3X3,
  Heart,
  Laptop,
  List,
  Loader2,
  Package,
  Pizza,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SecurityBadge } from './security-badge';

interface ShowcaseListingProps {
  showcases: PaginatedResponse<Showcase>;
  loading?: boolean;
  onFiltersChange: (filters: ShowcaseFilters) => void;
  onShowcaseClick: (showcase: Showcase) => void;
  onLoadMore?: () => void;
}

export function ShowcaseListing({
  showcases,
  loading = false,
  onFiltersChange,
  onShowcaseClick,
  onLoadMore,
}: ShowcaseListingProps) {
  const router = useRouter();
  const { t } = useIntl();
  const [filters, setFilters] = useState<ShowcaseFilters>({
    category: undefined,
    search: '',
    sort: 'newest',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get translated category options
  const getCategoryOptions = () => [
    {
      value: '',
      label: t('frontend.showcases.listing.categories.all'),
      icon: Sparkles,
      color: 'text-purple-600',
    },
    {
      value: 'banking',
      label: t('frontend.showcases.listing.categories.banking'),
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      value: 'transport',
      label: t('frontend.showcases.listing.categories.transport'),
      icon: Car,
      color: 'text-green-600',
    },
    {
      value: 'food',
      label: t('frontend.showcases.listing.categories.food'),
      icon: Pizza,
      color: 'text-orange-600',
    },
    {
      value: 'shopping',
      label: t('frontend.showcases.listing.categories.shopping'),
      icon: ShoppingCart,
      color: 'text-pink-600',
    },
    {
      value: 'entertainment',
      label: t('frontend.showcases.listing.categories.entertainment'),
      icon: Film,
      color: 'text-red-600',
    },
    {
      value: 'finance',
      label: t('frontend.showcases.listing.categories.finance'),
      icon: DollarSign,
      color: 'text-emerald-600',
    },
    {
      value: 'health',
      label: t('frontend.showcases.listing.categories.health'),
      icon: Heart,
      color: 'text-rose-600',
    },
    {
      value: 'education',
      label: t('frontend.showcases.listing.categories.education'),
      icon: BookOpen,
      color: 'text-indigo-600',
    },
    {
      value: 'technology',
      label: t('frontend.showcases.listing.categories.technology'),
      icon: Laptop,
      color: 'text-cyan-600',
    },
    {
      value: 'other',
      label: t('frontend.showcases.listing.categories.other'),
      icon: Package,
      color: 'text-gray-600',
    },
  ];

  // Get translated sort options
  const getSortOptions = () => [
    {
      value: 'newest',
      label: t('frontend.showcases.listing.sort.newest'),
      icon: Clock,
    },
    {
      value: 'popular',
      label: t('frontend.showcases.listing.sort.popular'),
      icon: TrendingUp,
    },
    {
      value: 'featured',
      label: t('frontend.showcases.listing.sort.featured'),
      icon: Star,
    },
  ];

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof ShowcaseFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

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

  const ShowcaseCard = ({ showcase }: { showcase: Showcase }) => {
    const isFeatured =
      showcase.featured_until && new Date(showcase.featured_until) > new Date();
    const categoryOption = getCategoryOptions().find(
      (cat) => cat.value === showcase.category
    );
    const IconComponent = categoryOption?.icon || Package;

    const handleClick = () => {
      // Use the new URL structure instead of calling onShowcaseClick
      const url = generateShowcaseUrl(showcase);
      router.push(url);
    };

    return (
      <div
        onClick={handleClick}
        className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 border border-white/20 overflow-hidden ${
          isFeatured ? 'ring-2 ring-purple-300 ring-opacity-50' : ''
        }`}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              {t('frontend.showcases.listing.badges.featured')}
            </div>
          </div>
        )}

        {/* Modern Cover Image */}
        <div className="relative overflow-hidden">
          {showcase.cover_image_url ? (
            <div className="relative">
              <img
                src={showcase.cover_image_url}
                alt={showcase.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <div className="text-center z-10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg mb-3 ${
                    categoryOption?.color || 'text-gray-600'
                  }`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <p className="text-gray-700 font-medium text-sm">
                  {showcase.service_name}
                </p>
              </div>
            </div>
          )}

          {/* Modern Karma Boost Badge */}
          {showcase.karma_boost > 0 && (
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-semibold rounded-full shadow-lg">
                <Zap className="w-3 h-3 fill-current" />+{showcase.karma_boost}{' '}
                KP
              </div>
            </div>
          )}
        </div>

        {/* Modern Content Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 ${
                categoryOption?.color || 'text-gray-600'
              }`}
            >
              <IconComponent className="w-3 h-3" />
              {categoryOption?.label ||
                t('frontend.showcases.listing.categories.other')}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(showcase.created_at)}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-900 transition-colors duration-200">
            {showcase.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {truncateText(showcase.description, 120)}
          </p>

          {/* Security Badge */}
          {showcase.security_check && (
            <div className="mb-3">
              <SecurityBadge
                securityCheck={showcase.security_check}
                showcaseId={showcase.id}
                size="sm"
                showText={true}
                showLink={true}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {showcase.service_name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-200">
              <span>
                {t('frontend.showcases.listing.actions.viewShowcase')}
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ShowcaseListItem = ({ showcase }: { showcase: Showcase }) => {
    const isFeatured =
      showcase.featured_until && new Date(showcase.featured_until) > new Date();
    const categoryOption = getCategoryOptions().find(
      (cat) => cat.value === showcase.category
    );
    const IconComponent = categoryOption?.icon || Package;

    const handleClick = () => {
      // Use the new URL structure instead of calling onShowcaseClick
      const url = generateShowcaseUrl(showcase);
      router.push(url);
    };

    return (
      <div
        onClick={handleClick}
        className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 border border-white/20 ${
          isFeatured ? 'ring-2 ring-purple-300 ring-opacity-50' : ''
        }`}
      >
        <div className="flex items-start gap-6">
          {/* Modern Thumbnail */}
          <div className="flex-shrink-0">
            {showcase.cover_image_url ? (
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={showcase.cover_image_url}
                  alt={showcase.title}
                  className="w-24 h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                <div
                  className={`z-10 ${categoryOption?.color || 'text-gray-600'}`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
              </div>
            )}
          </div>

          {/* Modern Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 ${
                    categoryOption?.color || 'text-gray-600'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  {categoryOption?.label ||
                    t('frontend.showcases.listing.categories.other')}
                </div>
                {isFeatured && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    {t('frontend.showcases.listing.badges.featured')}
                  </div>
                )}
                {showcase.karma_boost > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-semibold rounded-full">
                    <Zap className="w-3 h-3 fill-current" />+
                    {showcase.karma_boost} KP
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                <Calendar className="w-3 h-3" />
                {formatDate(showcase.created_at)}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-900 transition-colors duration-200">
              {showcase.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {truncateText(showcase.description, 180)}
            </p>

            {/* Security Badge */}
            {showcase.security_check && (
              <div className="mb-3">
                <SecurityBadge
                  securityCheck={showcase.security_check}
                  showcaseId={showcase.id}
                  size="sm"
                  showText={true}
                  showLink={true}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {showcase.service_name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-200">
                <span>
                  {t('frontend.showcases.listing.actions.viewShowcase')}
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Header with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            {t('frontend.showcases.listing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('frontend.showcases.listing.subtitle')}
          </p>
        </div>

        {/* Modern Filters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('frontend.showcases.listing.filters.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Enhanced Search */}
            <div className="lg:col-span-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder={t('frontend.showcases.listing.filters.search')}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Modern Category Filter */}
            <div className="lg:col-span-4">
              <div className="relative">
                <select
                  value={filters.category || ''}
                  onChange={(e) =>
                    handleFilterChange('category', e.target.value || undefined)
                  }
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {getCategoryOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Modern Sort Filter */}
            <div className="lg:col-span-3">
              <div className="relative">
                <select
                  value={filters.sort || 'newest'}
                  onChange={(e) =>
                    handleFilterChange('sort', e.target.value as any)
                  }
                  className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                >
                  {getSortOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Modern Stats and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {showcases.pagination.total}{' '}
                {showcases.pagination.total === 1
                  ? t('frontend.showcases.listing.stats.found')
                  : t('frontend.showcases.listing.stats.foundPlural')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {t('frontend.showcases.listing.filters.viewMode')}
              </span>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  {t('frontend.showcases.listing.filters.grid')}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                  {t('frontend.showcases.listing.filters.list')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('frontend.showcases.listing.loading.title')}
            </h3>
            <p className="text-gray-600">
              {t('frontend.showcases.listing.loading.subtitle')}
            </p>
          </div>
        )}

        {/* Modern Empty State */}
        {!loading && showcases.data.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t('frontend.showcases.listing.empty.title')}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              {t('frontend.showcases.listing.empty.subtitle')}
            </p>
          </div>
        )}

        {/* Modern Showcases Grid/List */}
        {!loading && showcases.data.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {showcases.data.map((showcase, index) => (
                  <div
                    key={showcase.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ShowcaseCard showcase={showcase} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                {showcases.data.map((showcase, index) => (
                  <div
                    key={showcase.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ShowcaseListItem showcase={showcase} />
                  </div>
                ))}
              </div>
            )}

            {/* Modern Load More Button */}
            {onLoadMore &&
              showcases.pagination.page < showcases.pagination.totalPages && (
                <div className="text-center">
                  <button
                    onClick={onLoadMore}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                    {t('frontend.showcases.listing.actions.loadMore')}
                  </button>
                </div>
              )}

            {/* Modern Pagination Info */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>
                  {t('frontend.showcases.listing.stats.page')}{' '}
                  {showcases.pagination.page}{' '}
                  {t('frontend.showcases.listing.stats.of')}{' '}
                  {showcases.pagination.totalPages} •{' '}
                  {showcases.pagination.total}{' '}
                  {showcases.pagination.total === 1
                    ? t('frontend.showcases.listing.stats.found')
                    : t('frontend.showcases.listing.stats.foundPlural')}{' '}
                  {t('frontend.showcases.listing.stats.total')}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
