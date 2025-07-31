'use client';

import { Showcase, ShowcaseCategory } from '@linkkarma/shared-types';
import {
  AlertTriangle,
  BookOpen,
  Building2,
  Calendar,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  ExternalLink,
  Film,
  Heart,
  Image,
  Laptop,
  Lightbulb,
  Package,
  Pizza,
  Rocket,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { AuthIndicator } from './auth/AuthIndicator';
import { SecurityBadge } from './security-badge';

interface ShowcaseDisplayProps {
  showcase: Showcase;
  isPreview?: boolean;
  onReferralClick?: () => void;
}

// Category icon mapping
const categoryIcons: Record<
  ShowcaseCategory,
  React.ComponentType<{ className?: string }>
> = {
  banking: Building2,
  transport: Car,
  food: Pizza,
  shopping: ShoppingCart,
  entertainment: Film,
  finance: DollarSign,
  health: Heart,
  education: BookOpen,
  technology: Laptop,
  other: Package,
};

const categoryColors: Record<ShowcaseCategory, string> = {
  banking: 'text-blue-600 bg-blue-50 border-blue-200',
  transport: 'text-green-600 bg-green-50 border-green-200',
  food: 'text-orange-600 bg-orange-50 border-orange-200',
  shopping: 'text-pink-600 bg-pink-50 border-pink-200',
  entertainment: 'text-red-600 bg-red-50 border-red-200',
  finance: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  health: 'text-rose-600 bg-rose-50 border-rose-200',
  education: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  technology: 'text-cyan-600 bg-cyan-50 border-cyan-200',
  other: 'text-gray-600 bg-gray-50 border-gray-200',
};

export function ShowcaseDisplay({
  showcase,
  isPreview = false,
  onReferralClick,
}: ShowcaseDisplayProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleReferralClick = () => {
    if (onReferralClick) {
      onReferralClick();
    }

    if (!isPreview) {
      // Track click analytics here
      window.open(showcase.referral_url, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const CategoryIcon = categoryIcons[showcase.category];
  const categoryColorClass = categoryColors[showcase.category];

  return (
    <div className="max-w-none mx-auto p-6">
      {/* Modern Preview Banner */}
      {isPreview && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-800 mb-1">
                Modo Visualização
              </h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                Esta é uma prévia da sua vitrine. O botão de referral não
                funcionará neste modo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modern Header Section */}
      <div className="text-center mb-12">
        {/* Featured Badge */}
        {showcase.featured_until &&
          new Date(showcase.featured_until) > new Date() && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white mb-6 shadow-lg">
              <Star className="w-4 h-4 fill-current" />
              Vitrine em Destaque
            </div>
          )}

        <div className="mb-6">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${categoryColorClass}`}
            >
              <CategoryIcon className="w-4 h-4" />
              {showcase.category.charAt(0).toUpperCase() +
                showcase.category.slice(1)}
            </div>

            {/* Security Badge */}
            {showcase.security_check && (
              <SecurityBadge
                securityCheck={showcase.security_check}
                showcaseId={showcase.id}
                size="sm"
                showText={true}
                showLink={true}
              />
            )}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-6 leading-tight">
          {showcase.title}
        </h1>

        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          {showcase.description}
        </p>

        {/* Modern Service Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(showcase.created_at)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Atualizado em {formatDate(showcase.updated_at)}</span>
          </div>

          {showcase.karma_boost > 0 && (
            <div className="flex items-center gap-2 text-purple-600 font-medium">
              <Zap className="w-4 h-4" />
              <span>+{showcase.karma_boost} Karma Boost</span>
            </div>
          )}
        </div>
      </div>

      {/* Modern Cover Image */}
      {showcase.cover_image_url && !imageError && (
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={showcase.cover_image_url}
              alt={showcase.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* Modern Main CTA Button */}
      <div className="text-center mb-16">
        <div className="inline-flex flex-col items-center">
          <button
            onClick={handleReferralClick}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            disabled={isPreview}
          >
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Acessar {showcase.service_name}</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {isPreview && (
            <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Botão desabilitado no modo visualização
            </p>
          )}

          {!isPreview && (
            <p className="text-sm text-gray-600 mt-3">
              Link seguro e verificado pela comunidade
            </p>
          )}
        </div>
      </div>

      {/* Authentication Indicator for Karma Points */}
      {!isPreview && (
        <div className="mb-16">
          <AuthIndicator
            variant="card"
            title="💎 Ganhe Karma Points com este Link!"
            description={`Crie uma conta gratuita e ganhe Karma Points sempre que alguém se cadastrar no ${showcase.service_name} através do seu link de referral. Acompanhe suas contribuições e desbloqueie benefícios exclusivos na plataforma!`}
            buttonText="Criar Conta e Ganhar Points"
          />
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-16">
        {/* Modern What Is Section */}
        {showcase.content.what_is && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                O que é o {showcase.service_name}?
              </h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed">
                {showcase.content.what_is}
              </p>
            </div>
          </section>
        )}

        {/* Modern Advantages Section */}
        {showcase.content.advantages &&
          showcase.content.advantages.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Vantagens Incríveis
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {showcase.content.advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="group bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {advantage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Modern Gallery Images Section */}
        {showcase.gallery_images && showcase.gallery_images.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Galeria de Imagens
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {showcase.gallery_images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={image}
                    alt={`${showcase.service_name} - Imagem ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Video Section (Pro Feature) */}
        {showcase.video_url && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">🎥</span>
              Vídeo Demonstrativo
            </h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <p className="text-gray-600">
                  Player de vídeo seria carregado aqui
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {showcase.video_url}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Quick Guide Section */}
        {showcase.content.quick_guide &&
          showcase.content.quick_guide.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">📋</span>
                Seu Guia Rápido para Começar
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <ol className="space-y-3">
                  {showcase.content.quick_guide.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

        {/* FAQ Section */}
        {showcase.content.faq && showcase.content.faq.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-3">❓</span>
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {showcase.content.faq.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h3>
          <p className="text-gray-600 mb-6">
            Clique no botão abaixo e aproveite todas as vantagens do{' '}
            {showcase.service_name}!
          </p>
          <button
            onClick={handleReferralClick}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            disabled={isPreview}
          >
            <span className="mr-2">🎯</span>
            Começar Agora
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
        <p>
          Vitrine criada com ❤️ no LinkKarma •
          <span className="ml-1">
            Última atualização: {formatDate(showcase.updated_at)}
          </span>
        </p>
      </div>
    </div>
  );
}
