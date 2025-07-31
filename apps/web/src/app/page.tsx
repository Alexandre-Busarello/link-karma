'use client';

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
import { BoostedShowcases } from '../components/BoostedShowcases';
import { FAQ } from '../components/FAQ';
import { LandingNavigation } from '../components/LandingNavigation';
import { Pricing } from '../components/Pricing';
import { RecentShowcases } from '../components/RecentShowcases';
import { ShowcasePreview } from '../components/ShowcasePreview';
import { Team } from '../components/Team';

export default function Index() {
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
        className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-16"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-200 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Sistema de Prova de Contribuição Revolucionário
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Transforme Seus
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Links de Referral
              </span>
              <br />
              em Vitrines Profissionais
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-purple-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
              A primeira plataforma que combina <strong>IA avançada</strong>,{' '}
              <strong>sistema de Karma Points</strong> e
              <strong> verificação de segurança</strong> para maximizar suas
              conversões em até{' '}
              <strong className="text-yellow-400">300%</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Link
                href="/auth/signup"
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Começar Gratuitamente
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/showcases"
                className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Ver Vitrines
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
                <span>Ver vitrines em destaque</span>
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
                <span>Como funciona</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0 mt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  1ª Vitrine
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  100% Gratuita
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  IA Avançada
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  Criação Automática
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                  Verificação
                </div>
                <div className="text-purple-200 text-sm sm:text-base">
                  Anti-Fraude
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
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />O
              Coração do LinkKarma
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              Sistema de{' '}
              <span className="text-green-600">Prova de Contribuição</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              O primeiro ecossistema de referrals baseado em{' '}
              <strong>contribuição mútua</strong>. Para postar, você precisa
              contribuir. Simples, justo e escalável.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Infográfico do Core Loop */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Como Funciona
                </h3>

                <div className="space-y-6">
                  {/* Passo 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Use um Link de Referral
                      </h4>
                      <p className="text-gray-600">
                        Cadastre-se em um serviço através de um link da
                        plataforma
                      </p>
                      <div className="mt-2 text-sm text-green-600 font-medium">
                        +1 Crédito de Contribuição + 15 Karma Points
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
                        Ajude na Verificação
                      </h4>
                      <p className="text-gray-600">
                        Analise solicitações na fila de verificação comunitária
                      </p>
                      <div className="mt-2 text-sm text-green-600 font-medium">
                        +0.5 Crédito de Contribuição + 3 Karma Points
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
                        Publique Sua Vitrine
                      </h4>
                      <p className="text-gray-600">
                        Com 3 créditos, desbloqueie um novo slot de vitrine
                      </p>
                      <div className="mt-2 text-sm text-blue-600 font-medium">
                        Vitrine Profissional Liberada!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center space-x-2 text-green-700 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    <span>Sistema 100% Baseado em Mérito</span>
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
                    Qualidade Garantida
                  </h3>
                </div>
                <p className="text-gray-600">
                  Apenas usuários que contribuem podem postar, eliminando spam e
                  garantindo links de alta qualidade.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Comunidade Ativa
                  </h3>
                </div>
                <p className="text-gray-600">
                  Sistema de verificação comunitária cria uma rede de usuários
                  engajados e confiáveis.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Crescimento Sustentável
                  </h3>
                </div>
                <p className="text-gray-600">
                  Modelo escalável que cresce naturalmente com a participação da
                  comunidade.
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
              Tecnologia de Ponta
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2 sm:px-0">
              Vitrines Inteligentes com{' '}
              <span className="text-purple-600">IA Avançada</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Transforme qualquer link de referral em uma{' '}
              <strong>vitrine profissional</strong> em segundos. Nossa IA
              analisa o serviço e cria conteúdo otimizado que{' '}
              <strong>converte até 300% mais</strong> que links simples.
            </p>
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
                  Criado com IA
                </div>
              </div>

              {/* Indicador de Interatividade */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    👆 Clique para interagir
                  </p>
                </div>
              </div>
            </div>

            {/* Processo de Criação */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Sua Vitrine Profissional em Apenas 3 Passos
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Cole Seu Link
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Nossa IA analisa automaticamente o serviço e extrai
                      informações relevantes
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      IA Cria o Conteúdo
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Título, descrição, vantagens, FAQ e guia passo-a-passo
                      gerados automaticamente
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Personalize e Publique
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Edite o conteúdo, adicione imagens e publique sua vitrine
                      profissional
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-semibold text-purple-900">
                    Powered by Google Gemini AI
                  </span>
                </div>
                <p className="text-purple-700 text-sm">
                  Utilizamos a mais avançada IA do Google para criar conteúdo
                  otimizado e persuasivo, aumentando suas conversões em até
                  300%.
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
                Verificação de Segurança
              </h3>
              <p className="text-gray-600 text-sm">
                Cada link passa por verificação automática anti-fraude antes da
                publicação
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Analytics Integrado
              </h3>
              <p className="text-gray-600 text-sm">
                Acompanhe cliques, conversões e performance de cada vitrine em
                tempo real
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                SEO Otimizado
              </h3>
              <p className="text-gray-600 text-sm">
                Vitrines otimizadas para mecanismos de busca, aumentando sua
                visibilidade
              </p>
            </div>
          </div>

          {/* CTA para Vitrines */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 sm:p-8 text-white mx-4 sm:mx-0">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para Criar Sua Primeira Vitrine?
              </h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Veja como suas vitrines ficam na prática. Explore nossa galeria
                de vitrines reais criadas por usuários como você e descubra o
                poder da IA em ação.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/showcases"
                  className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Explorar Vitrines Reais
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Criar Minha Vitrine
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
              Economia Gamificada
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sistema de <span className="text-yellow-600">Karma Points</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Uma economia interna baseada em{' '}
              <strong>contribuições reais</strong>. Ganhe Karma Points
              participando da comunidade e use para impulsionar suas vitrines.
            </p>
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
                    Seu Saldo de Karma
                  </h3>
                  <div className="text-4xl font-bold text-yellow-600 mt-2">
                    1,250 KP
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Verificação aprovada
                      </span>
                    </div>
                    <span className="text-green-600 font-bold">+15 KP</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-800 font-medium">
                        Ajudou na verificação
                      </span>
                    </div>
                    <span className="text-blue-600 font-bold">+3 KP</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-purple-600" />
                      <span className="text-purple-800 font-medium">
                        Vitrine destacada
                      </span>
                    </div>
                    <span className="text-red-600 font-bold">-100 KP</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors">
                    <Zap className="w-4 h-4 mr-2" />
                    Impulsionar (25 KP)
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                    <Star className="w-4 h-4 mr-2" />
                    Destacar (100 KP)
                  </button>
                </div>
              </div>
            </div>

            {/* Como Ganhar e Usar */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Como Ganhar Karma Points
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Usar Links de Referral
                      </h4>
                      <p className="text-gray-600 text-sm">
                        +15 KP por verificação aprovada
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Verificação Comunitária
                      </h4>
                      <p className="text-gray-600 text-sm">
                        +3 KP por análise correta
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Plano Pro</h4>
                      <p className="text-gray-600 text-sm">
                        Salário mensal de KP
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Como Usar Karma Points
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Impulsionar Vitrine
                      </h4>
                      <p className="text-gray-600 text-sm">
                        25 KP - Apareça no topo por 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Destacar Vitrine
                      </h4>
                      <p className="text-gray-600 text-sm">
                        100 KP - Destaque especial por 7 dias
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Economia Justa e Transparente
            </h3>
            <p className="text-yellow-100 text-lg max-w-2xl mx-auto">
              Diferente de outras plataformas, no LinkKarma você ganha Karma
              Points através de
              <strong> contribuições reais</strong> para a comunidade, não
              apenas pagando.
            </p>
          </div>
        </div>
      </section>

      {/* Sistema de Segurança e Moderação */}
      <section id="seguranca" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-800 text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Máxima Segurança
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Sistema de <span className="text-red-600">Segurança Híbrido</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proteção multicamada com{' '}
              <strong>IA + Divulgador + Comunidade</strong>. Trust Score
              dinâmico e verificação anti-fraude garantem um ambiente seguro.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* IA de Verificação */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                IA Multimodal
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Análise automática de evidências
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Detecção de padrões de fraude</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Aprovação instantânea (&gt;90% confiança)
                  </span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  Google Gemini AI
                </span>
              </div>
            </div>

            {/* Verificação do Divulgador */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Divulgador
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Análise manual em 24h</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Conhecimento específico do serviço
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Bônus por agilidade</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                  Especialista Humano
                </span>
              </div>
            </div>

            {/* Verificação Comunitária */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Comunidade
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">
                    Usuários confiáveis (Trust Score &gt;400)
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Consenso por votação</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm">Escalabilidade infinita</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Sabedoria Coletiva
                </span>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Sistema de Trust Score
                </h3>
                <p className="text-gray-300 mb-6">
                  Pontuação dinâmica de 0 a 1000 que reflete a confiabilidade de
                  cada usuário. Quanto maior o score, mais privilégios e
                  responsabilidades na plataforma.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">
                      Verificação aprovada por IA
                    </span>
                    <span className="text-green-400 font-bold">+10 pontos</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">
                      Análise comunitária correta
                    </span>
                    <span className="text-green-400 font-bold">+3 pontos</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-gray-300">Tentativa de fraude</span>
                    <span className="text-red-400 font-bold">-50 pontos</span>
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
                      <div className="text-gray-400">Trust Score</div>
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 w-48 h-48 rounded-full border-8 border-transparent border-t-yellow-400 border-r-yellow-400 border-b-yellow-400"
                    style={{ transform: 'rotate(305deg)' }}
                  ></div>
                </div>
                <div className="text-yellow-400 font-bold text-lg">
                  Usuário Confiável
                </div>
                <div className="text-gray-400 text-sm">
                  Pode participar da verificação comunitária
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
            Pronto para Revolucionar Seus Referrals?
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 mb-6 sm:mb-8 px-4 sm:px-0">
            Junte-se à primeira plataforma que combina IA, segurança e economia
            justa. Sua primeira vitrine é{' '}
            <strong className="text-yellow-400">100% gratuita</strong>!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-4 sm:px-0">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Criar Conta Gratuita
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/showcases"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Explorar Vitrines
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center px-4 sm:px-0">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                Primeira Vitrine Grátis
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                24/7
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                Verificação Automática
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                300%
              </div>
              <div className="text-purple-200 text-sm sm:text-base">
                Aumento nas Conversões
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
