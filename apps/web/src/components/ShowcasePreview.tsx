'use client';

import { Showcase } from '@linkkarma/shared-types';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Shield,
  Star,
  Zap,
} from 'lucide-react';

interface ShowcasePreviewProps {
  showcase: Showcase;
  className?: string;
  isClickable?: boolean;
}

export function ShowcasePreview({
  showcase,
  className = '',
  isClickable = true,
}: ShowcasePreviewProps) {
  const isFeatured =
    showcase.featured_until && new Date(showcase.featured_until) > new Date();

  const handleClick = () => {
    if (!isClickable) {
      // For preview, we'll just show an alert instead of navigating
      alert(
        'Esta é uma prévia da vitrine! Crie sua conta para ver vitrines reais.'
      );
    }
    // If isClickable is true, the parent Link component will handle navigation
  };

  return (
    <div
      onClick={isClickable ? undefined : handleClick}
      className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
        isClickable ? 'cursor-pointer' : 'cursor-pointer'
      } transform hover:scale-[1.02] hover:-translate-y-1 border border-white/30 overflow-hidden ${
        isFeatured ? 'ring-2 ring-purple-300 ring-opacity-50' : ''
      } ${className}`}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Destaque
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg mb-3 text-purple-600">
                <Building2 className="w-8 h-8" />
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
              <Zap className="w-3 h-3 fill-current" />+{showcase.karma_boost} KP
            </div>
          </div>
        )}

        {/* Security Badge */}
        {showcase.security_check && (
          <div className="absolute top-4 left-4">
            <div
              className={`flex items-center gap-1 px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg ${
                showcase.security_check.status === 'APROVADO'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : showcase.security_check.status === 'SUSPEITO'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}
            >
              <Shield className="w-3 h-3" />
              {showcase.security_check.status === 'APROVADO'
                ? 'Verificado'
                : showcase.security_check.status === 'SUSPEITO'
                ? 'Atenção'
                : 'Bloqueado'}
            </div>
          </div>
        )}
      </div>

      {/* Modern Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-900 transition-colors duration-200 line-clamp-2">
            {showcase.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {showcase.description}
          </p>
        </div>

        {/* Modern Category Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-medium rounded-full">
            <Building2 className="w-3 h-3" />
            {showcase.category === 'banking'
              ? 'Bancos'
              : showcase.category === 'food'
              ? 'Alimentação'
              : showcase.category === 'transport'
              ? 'Transporte'
              : showcase.category === 'shopping'
              ? 'Compras'
              : showcase.category === 'entertainment'
              ? 'Entretenimento'
              : showcase.category === 'finance'
              ? 'Finanças'
              : showcase.category === 'health'
              ? 'Saúde'
              : showcase.category === 'education'
              ? 'Educação'
              : showcase.category === 'technology'
              ? 'Tecnologia'
              : 'Outros'}
          </div>
        </div>

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
            <span>Ver Vitrine</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>

      {/* Preview Badge */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12">
        Prévia Real
      </div>
    </div>
  );
}
