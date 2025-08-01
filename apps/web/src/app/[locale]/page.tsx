'use client';

import { useIntl } from '@linkkarma/intl';
import {
  ArrowRight,
  Award,
  BarChart3,
  Brain,
  CheckCircle,
  Coins,
  Eye,
  Heart,
  Lock,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { BoostedShowcases } from '../../components/BoostedShowcases';
import { FAQ } from '../../components/FAQ';
import { LandingNavigation } from '../../components/LandingNavigation';
import { Pricing } from '../../components/Pricing';
import { RecentShowcases } from '../../components/RecentShowcases';
import { ShowcasePreview } from '../../components/ShowcasePreview';
import { Team } from '../../components/Team';

export default function Index() {
  const { t } = useIntl();

  // Exemplo real de vitrine para demonstração
  const exampleShowcase = {
    id: 'nubank-conta-digital-sem-tarifas',
    user_id: 'user-1',
    title: 'Nubank - Conta Digital Sem Tarifas + Cartão Gratuito',
    description:
      'Abra sua conta no Nubank e tenha acesso a uma conta digital completa, sem tarifas e com cartão de crédito sem anuidade. Mais de 70 milhões de clientes confiam no Nubank.',
    referral_url: 'https://nubank.com.br/convite/abc123',
    service_name: 'Nubank',
    category: 'banking' as const,
    status: 'published' as const,
    cover_image_url:
      'https://play-lh.googleusercontent.com/NPkx0aiwABB31gBw_CuZO9Rwukhir-BwemxfNlAVjT6smwk6QgUbb3XrmsSSClfzk0dY=w240-h480-rw',
    gallery_images: [],
    video_url: null,
    content: {
      what_is:
        'O Nubank é um banco digital brasileiro que oferece conta corrente gratuita, cartão de crédito sem anuidade e diversos produtos financeiros através de um aplicativo moderno e intuitivo.',
      advantages: [
        'Conta digital 100% gratuita, sem tarifas mensais',
        'Cartão de crédito Mastercard sem anuidade',
        'Aplicativo premiado com interface simples e moderna',
      ],
      quick_guide: [
        'Clique no link de indicação acima',
        'Baixe o app do Nubank na App Store ou Google Play',
        'Faça seu cadastro com CPF e dados pessoais',
        'Aguarde a análise (geralmente aprovada em minutos)',
        'Receba seu cartão em casa em até 7 dias úteis',
      ],
      faq: [
        {
          question: 'O Nubank é seguro?',
          answer:
            'Sim! O Nubank é regulamentado pelo Banco Central e possui todas as certificações de segurança necessárias.',
        },
        {
          question: 'Tem taxa de manutenção?',
          answer:
            'Não, a conta do Nubank é totalmente gratuita, sem taxa de manutenção.',
        },
      ],
    },
    karma_boost: 0,
    featured_until: null,
    created_at: '2025-01-15T10:00:00Z',
    updated_at: '2025-01-15T10:00:00Z',
    security_check: {
      status: 'APROVADO' as const,
      confidence: 95,
      sources_checked: ['trustpilot', 'reclame_aqui', 'google', 'app_stores'],
      findings: [
        'Empresa regulamentada pelo Banco Central',
        'Avaliações majoritariamente positivas',
        'Transparência em termos de uso',
      ],
      recommendation: 'Serviço confiável e bem estabelecido',
      details: {
        positive_mentions: 1250,
        negative_mentions: 45,
        scam_indicators: [],
        trustworthiness_score: 95,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Landing Navigation */}
      <LandingNavigation />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-200 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <span
                dangerouslySetInnerHTML={{
                  __html: t('frontend.landing.coreLoop.title'),
                }}
              ></span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t('frontend.landing.hero.title')}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                {t('frontend.landing.hero.titleHighlight')}
              </span>
              <br />
              {t('frontend.landing.hero.titleEnd')}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
              {t('frontend.landing.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('frontend.landing.hero.ctaPrimary')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/showcases"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('frontend.landing.hero.ctaSecondary')}
              </Link>
            </div>

            {/* Subtle navigation hints */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-purple-200/80">
              <button
                onClick={() =>
                  document
                    .getElementById('boosted-showcases')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200 group"
              >
                <TrendingUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>
                  {t('frontend.landing.navigation.hints.viewFeatured')}
                </span>
              </button>
              <div className="hidden sm:block w-1 h-1 bg-purple-300/50 rounded-full"></div>
              <button
                onClick={() =>
                  document
                    .getElementById('core-loop')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-200 group"
              >
                <Target className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t('frontend.landing.navigation.howItWorks')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0 mt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  {t('frontend.landing.hero.stats.firstShowcase')}
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  {t('frontend.landing.hero.stats.firstShowcaseDesc')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  {t('frontend.landing.hero.stats.aiAdvanced')}
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  {t('frontend.landing.hero.stats.aiAdvancedDesc')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  {t('frontend.landing.hero.stats.verification')}
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  {t('frontend.landing.hero.stats.verificationDesc')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Boosted Showcases Section */}
      <BoostedShowcases />

      {/* Core Loop - Prova de Contribuição */}
      <section id="core-loop" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-100 rounded-full text-green-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {t('frontend.landing.coreLoop.badge')}
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.coreLoop.title'),
              }}
            ></h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.coreLoop.description'),
              }}
            ></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Infográfico do Core Loop */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {t('frontend.landing.coreLoop.howItWorks')}
                </h3>

                <div className="space-y-6">
                  {/* Passo 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('frontend.landing.coreLoop.step1.title')}
                      </h4>
                      <p className="text-gray-600">
                        {t('frontend.landing.coreLoop.step1.description')}
                      </p>
                      <div className="mt-2 text-sm text-green-600 font-medium">
                        {t('frontend.landing.coreLoop.step1.reward')}
                      </div>
                    </div>
                  </div>

                  {/* Passo 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('frontend.landing.coreLoop.step2.title')}
                      </h4>
                      <p className="text-gray-600">
                        {t('frontend.landing.coreLoop.step2.description')}
                      </p>
                      <div className="mt-2 text-sm text-green-600 font-medium">
                        {t('frontend.landing.coreLoop.step2.reward')}
                      </div>
                    </div>
                  </div>

                  {/* Passo 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t('frontend.landing.coreLoop.step3.title')}
                      </h4>
                      <p className="text-gray-600">
                        {t('frontend.landing.coreLoop.step3.description')}
                      </p>
                      <div className="mt-2 text-sm text-blue-600 font-medium">
                        {t('frontend.landing.coreLoop.step3.reward')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center space-x-2 text-green-700 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('frontend.landing.coreLoop.merit')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {t('frontend.landing.coreLoop.benefits.quality.title')}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {t('frontend.landing.coreLoop.benefits.quality.description')}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {t('frontend.landing.coreLoop.benefits.community.title')}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {t(
                    'frontend.landing.coreLoop.benefits.community.description'
                  )}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {t('frontend.landing.coreLoop.benefits.growth.title')}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {t('frontend.landing.coreLoop.benefits.growth.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrines com IA */}
      <section id="vitrines-ia" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-100 rounded-full text-purple-800 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {t('frontend.landing.aiShowcases.badge')}
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.aiShowcases.title'),
              }}
            ></h2>
            <p
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.aiShowcases.description'),
              }}
            ></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            {/* Preview Real da Vitrine */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl">
                <ShowcasePreview
                  showcase={exampleShowcase}
                  className="transform scale-95"
                  isClickable={false}
                />

                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  {t('frontend.landing.features.aiPowered')}
                </div>
              </div>

              {/* Indicador de Interatividade */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    {t('frontend.landing.aiShowcases.interactiveHint')}
                  </p>
                </div>
              </div>
            </div>

            {/* Processo de Criação */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t('frontend.landing.aiShowcases.professionalShowcase')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t('frontend.landing.features.howItWorks.step1.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t(
                        'frontend.landing.features.howItWorks.step1.description'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t('frontend.landing.features.howItWorks.step2.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t(
                        'frontend.landing.features.howItWorks.step2.description'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t('frontend.landing.features.howItWorks.step3.title')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t(
                        'frontend.landing.features.howItWorks.step3.description'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-purple-900">
                    {t('frontend.landing.aiShowcases.poweredByGemini')}
                  </span>
                </div>
                <p className="text-purple-700 text-sm">
                  {t('frontend.landing.aiShowcases.geminiDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Recursos Avançados */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t(
                  'frontend.landing.aiShowcases.advancedFeatures.security.title'
                )}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  'frontend.landing.aiShowcases.advancedFeatures.security.description'
                )}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t(
                  'frontend.landing.aiShowcases.advancedFeatures.analytics.title'
                )}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  'frontend.landing.aiShowcases.advancedFeatures.analytics.description'
                )}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t('frontend.landing.aiShowcases.advancedFeatures.seo.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t(
                  'frontend.landing.aiShowcases.advancedFeatures.seo.description'
                )}
              </p>
            </div>
          </div>

          {/* CTA para Vitrines */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white mx-4 sm:mx-0">
              <h3 className="text-2xl font-bold mb-4">
                {t('frontend.landing.aiShowcases.cta.title')}
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                {t('frontend.landing.aiShowcases.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/showcases"
                  className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t('frontend.landing.aiShowcases.cta.exploreReal')}
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t('frontend.landing.aiShowcases.cta.createMine')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Sistema de Karma Points */}
      <section
        id="karma-points"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-yellow-50 to-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-yellow-800 text-sm font-medium mb-6">
              <Coins className="w-4 h-4 mr-2" />
              {t('frontend.landing.karmaPoints.badge')}
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.karmaPoints.title'),
              }}
            ></h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.karmaPoints.description'),
              }}
            ></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Visualização do Sistema */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-200">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                    <Coins className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t('frontend.landing.karmaPoints.balance.title')}
                  </h3>
                  <div className="text-4xl font-bold text-yellow-600 mt-2">
                    {t('frontend.landing.karmaPoints.balance.amount')}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        {t(
                          'frontend.landing.karmaPoints.activities.verificationApproved'
                        )}
                      </span>
                    </div>
                    <span className="text-green-600 font-bold">+15 KP</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        {t(
                          'frontend.landing.karmaPoints.activities.helpedVerification'
                        )}
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold">+3 KP</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-800 font-medium">
                        {t(
                          'frontend.landing.karmaPoints.activities.showcaseFeatured'
                        )}
                      </span>
                    </div>
                    <span className="text-red-600 font-bold">-100 KP</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    {t('frontend.landing.karmaPoints.actions.boost')}
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                    <Star className="w-4 h-4 mr-2" />
                    {t('frontend.landing.karmaPoints.actions.feature')}
                  </button>
                </div>
              </div>
            </div>

            {/* Como Ganhar e Usar */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('frontend.landing.karmaPoints.howToEarn.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.useReferrals.title'
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.useReferrals.description'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.communityVerification.title'
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.communityVerification.description'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.proPlan.title'
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(
                          'frontend.landing.karmaPoints.howToEarn.proPlan.description'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('frontend.landing.karmaPoints.howToUse.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t(
                          'frontend.landing.karmaPoints.howToUse.boostShowcase.title'
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(
                          'frontend.landing.karmaPoints.howToUse.boostShowcase.description'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {t(
                          'frontend.landing.karmaPoints.howToUse.featureShowcase.title'
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {t(
                          'frontend.landing.karmaPoints.howToUse.featureShowcase.description'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('frontend.landing.karmaPoints.fairEconomy.title')}
            </h3>
            <p
              className="text-yellow-100 text-lg max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: t(
                  'frontend.landing.karmaPoints.fairEconomy.description'
                ),
              }}
            ></p>
          </div>
        </div>
      </section>

      {/* Sistema de Segurança e Moderação */}
      <section id="seguranca" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-800 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              {t('frontend.landing.security.badge')}
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.security.title'),
              }}
            ></h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{
                __html: t('frontend.landing.security.description'),
              }}
            ></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* IA de Verificação */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                {t('frontend.landing.security.aiVerification.title')}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.aiVerification.features.automaticAnalysis'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.aiVerification.features.fraudDetection'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.aiVerification.features.instantApproval'
                    )}
                  </span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {t('frontend.landing.security.aiVerification.badge')}
                </span>
              </div>
            </div>

            {/* Verificação do Divulgador */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                {t('frontend.landing.security.divulgatorVerification.title')}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.divulgatorVerification.features.manualAnalysis'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.divulgatorVerification.features.specificKnowledge'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.divulgatorVerification.features.agilityBonus'
                    )}
                  </span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  {t('frontend.landing.security.divulgatorVerification.badge')}
                </span>
              </div>
            </div>

            {/* Verificação Comunitária */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                {t('frontend.landing.security.communityVerification.title')}
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.communityVerification.features.trustedUsers'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.communityVerification.features.votingConsensus'
                    )}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    {t(
                      'frontend.landing.security.communityVerification.features.infiniteScalability'
                    )}
                  </span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {t('frontend.landing.security.communityVerification.badge')}
                </span>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  {t('frontend.landing.security.trustScore.title')}
                </h3>
                <p className="text-gray-300 mb-6">
                  {t('frontend.landing.security.trustScore.description')}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">
                      {t(
                        'frontend.landing.security.trustScore.activities.aiApproval'
                      )}
                    </span>
                    <span className="text-green-400 font-bold">
                      {t(
                        'frontend.landing.security.trustScore.points.aiApproval'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">
                      {t(
                        'frontend.landing.security.trustScore.activities.communityAnalysis'
                      )}
                    </span>
                    <span className="text-green-400 font-bold">
                      {t(
                        'frontend.landing.security.trustScore.points.communityAnalysis'
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">
                      {t(
                        'frontend.landing.security.trustScore.activities.fraudAttempt'
                      )}
                    </span>
                    <span className="text-red-400 font-bold">
                      {t(
                        'frontend.landing.security.trustScore.points.fraudAttempt'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 rounded-full border-8 border-gray-700 flex items-center justify-center mx-auto mb-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-400">
                        847
                      </div>
                      <div className="text-gray-400">
                        {t('frontend.landing.security.trustScore.label')}
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-48 h-48 rounded-full border-8 border-transparent border-t-yellow-400 border-r-yellow-400 border-b-yellow-400"
                    style={{ transform: 'rotate(305deg)' }}
                  ></div>
                </div>
                <div className="text-yellow-400 font-bold text-lg">
                  {t('frontend.landing.security.trustScore.status.trusted')}
                </div>
                <div className="text-gray-400 text-sm">
                  {t(
                    'frontend.landing.security.trustScore.status.canParticipate'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrines Recentes */}
      <RecentShowcases />

      {/* Team Section */}
      <Team />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Final */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2 sm:px-0">
            {t('frontend.landing.finalCta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 mb-6 sm:mb-8 px-4 sm:px-0">
            {t('frontend.landing.finalCta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4 sm:px-0">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t('frontend.landing.finalCta.actions.createAccount')}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/showcases"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {t('frontend.landing.finalCta.actions.exploreShowcases')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center px-4 sm:px-0">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                {t('frontend.landing.finalCta.stats.freeShowcase')}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                24/7
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                {t('frontend.landing.finalCta.stats.autoVerification')}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                300%
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                {t('frontend.landing.finalCta.stats.conversionIncrease')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
