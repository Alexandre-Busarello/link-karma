import {
  AIGenerationResponse,
  CreateShowcaseRequest,
  MockDataService,
  PaginatedResponse,
  Showcase,
  ShowcaseCategory,
  ShowcaseContent,
  ShowcaseFilters,
  ShowcaseStatus,
  UpdateShowcaseRequest,
} from '@linkkarma/shared-types';
import { getAIShowcaseService } from './ai-showcase-service.js';

// Mock data for showcases
const mockShowcases: Showcase[] = [
  {
    id: 'nubank-conta-digital-sem-tarifas',
    user_id: 'user-1',
    title: 'Nubank - Conta Digital Sem Tarifas',
    description:
      'Abra sua conta no Nubank e tenha acesso a uma conta digital completa, sem tarifas e com cartão de crédito sem anuidade.',
    referral_url: 'https://nubank.com.br/convite/abc123',
    service_name: 'Nubank',
    category: 'banking' as ShowcaseCategory,
    status: 'published' as ShowcaseStatus,
    cover_image_url:
      'https://play-lh.googleusercontent.com/NPkx0aiwABB31gBw_CuZO9Rwukhir-BwemxfNlAVjT6smwk6QgUbb3XrmsSSClfzk0dY=w240-h480-rw',
    gallery_images: [
      'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=App+Screenshot+1',
      'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=App+Screenshot+2',
    ],
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
      status: 'APROVADO',
      confidence: 92,
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
        trustworthiness_score: 92,
      },
    },
  },
  {
    id: 'ifood-delivery-de-comida',
    user_id: 'user-2',
    title: 'iFood - Delivery de Comida',
    description:
      'Peça comida no iFood e ganhe desconto na primeira compra. Milhares de restaurantes disponíveis.',
    referral_url: 'https://ifood.com.br/convite/def456',
    service_name: 'iFood',
    category: 'food' as ShowcaseCategory,
    status: 'published' as ShowcaseStatus,
    cover_image_url:
      'https://via.placeholder.com/800x400/FF6B6B/FFFFFF?text=iFood',
    gallery_images: [],
    video_url: null,
    content: {
      what_is:
        'O iFood é a maior plataforma de delivery de comida do Brasil, conectando você aos melhores restaurantes da sua região com entrega rápida e segura.',
      advantages: [
        'Milhares de restaurantes parceiros',
        'Entrega rápida e rastreamento em tempo real',
        'Promoções exclusivas e cupons de desconto',
      ],
      quick_guide: [
        'Clique no link de convite',
        'Baixe o app do iFood',
        'Cadastre-se com seu e-mail',
        'Adicione seu endereço de entrega',
        'Escolha seu restaurante favorito e faça o pedido',
      ],
      faq: [
        {
          question: 'Qual o valor mínimo do pedido?',
          answer:
            'O valor mínimo varia por restaurante, geralmente entre R$ 15 e R$ 25.',
        },
        {
          question: 'Posso cancelar meu pedido?',
          answer:
            'Sim, você pode cancelar antes do restaurante confirmar o preparo.',
        },
      ],
    },
    karma_boost: 25,
    featured_until: '2025-02-01T23:59:59Z',
    created_at: '2025-01-10T14:30:00Z',
    updated_at: '2025-01-20T09:15:00Z',
    security_check: {
      status: 'SUSPEITO',
      confidence: 65,
      sources_checked: ['app_stores', 'reclame_aqui', 'trustpilot'],
      findings: [
        'Algumas reclamações sobre taxas de entrega',
        'Política de cancelamento restritiva',
        'Variação na qualidade do atendimento',
      ],
      recommendation: 'Prosseguir com cautela, verificar termos antes de usar',
      details: {
        positive_mentions: 450,
        negative_mentions: 180,
        scam_indicators: ['taxas_ocultas'],
        trustworthiness_score: 65,
      },
    },
  },
];

// Mock AI generation responses
const mockAIResponses: Record<string, AIGenerationResponse> = {
  'nubank.com.br': {
    titulo_cativante: 'Nubank - Conta Digital Sem Tarifas',
    o_que_e:
      'O Nubank é um banco digital brasileiro que oferece conta corrente gratuita, cartão de crédito sem anuidade e diversos produtos financeiros através de um aplicativo moderno e intuitivo.',
    tres_vantagens: [
      'Conta digital 100% gratuita, sem tarifas mensais',
      'Cartão de crédito Mastercard sem anuidade',
      'Aplicativo premiado com interface simples e moderna',
    ],
    guia_rapido: [
      'Clique no link de indicação acima',
      'Baixe o app do Nubank na App Store ou Google Play',
      'Faça seu cadastro com CPF e dados pessoais',
      'Aguarde a análise (geralmente aprovada em minutos)',
      'Receba seu cartão em casa em até 7 dias úteis',
    ],
    faq: [
      {
        pergunta: 'O Nubank é seguro?',
        resposta:
          'Sim! O Nubank é regulamentado pelo Banco Central e possui todas as certificações de segurança necessárias.',
      },
      {
        pergunta: 'Tem taxa de manutenção?',
        resposta:
          'Não, a conta do Nubank é totalmente gratuita, sem taxa de manutenção.',
      },
    ],
    service_name: 'Nubank',
  },
  'ifood.com.br': {
    titulo_cativante: 'iFood - Delivery de Comida',
    o_que_e:
      'O iFood é a maior plataforma de delivery de comida do Brasil, conectando você aos melhores restaurantes da sua região com entrega rápida e segura.',
    tres_vantagens: [
      'Milhares de restaurantes parceiros',
      'Entrega rápida e rastreamento em tempo real',
      'Promoções exclusivas e cupons de desconto',
    ],
    guia_rapido: [
      'Clique no link de convite',
      'Baixe o app do iFood',
      'Cadastre-se com seu e-mail',
      'Adicione seu endereço de entrega',
      'Escolha seu restaurante favorito e faça o pedido',
    ],
    faq: [
      {
        pergunta: 'Qual o valor mínimo do pedido?',
        resposta:
          'O valor mínimo varia por restaurante, geralmente entre R$ 15 e R$ 25.',
      },
      {
        pergunta: 'Posso cancelar meu pedido?',
        resposta:
          'Sim, você pode cancelar antes do restaurante confirmar o preparo.',
      },
    ],
    service_name: 'iFood',
  },
};

// Utility function to extract domain from URL
function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch {
    return 'unknown.com';
  }
}

// Utility function to simulate API delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock showcase service implementation
export const mockShowcaseService: MockDataService = {
  async getShowcases(
    filters?: ShowcaseFilters
  ): Promise<PaginatedResponse<Showcase>> {
    await delay(500); // Simulate API delay

    let filteredShowcases = [...mockShowcases];

    // Apply filters
    if (filters?.category) {
      filteredShowcases = filteredShowcases.filter(
        (s) => s.category === filters.category
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredShowcases = filteredShowcases.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm) ||
          s.description.toLowerCase().includes(searchTerm) ||
          s.service_name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (filters?.sort) {
      switch (filters.sort) {
        case 'newest':
          filteredShowcases.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );
          break;
        case 'popular':
          filteredShowcases.sort((a, b) => b.karma_boost - a.karma_boost);
          break;
        case 'featured':
          filteredShowcases.sort((a, b) => {
            const aFeatured = a.featured_until
              ? new Date(a.featured_until).getTime()
              : 0;
            const bFeatured = b.featured_until
              ? new Date(b.featured_until).getTime()
              : 0;
            return bFeatured - aFeatured;
          });
          break;
      }
    }

    return {
      data: filteredShowcases,
      pagination: {
        page: 1,
        limit: 10,
        total: filteredShowcases.length,
        totalPages: Math.ceil(filteredShowcases.length / 10),
      },
    };
  },

  async getShowcase(id: string): Promise<Showcase | null> {
    await delay(300);
    return mockShowcases.find((s) => s.id === id) || null;
  },

  async createShowcase(data: CreateShowcaseRequest): Promise<Showcase> {
    await delay(800);

    const newShowcase: Showcase = {
      id: `showcase-${Date.now()}`,
      user_id: 'current-user', // This would come from auth context
      title: 'Novo Showcase',
      description: '',
      referral_url: data.referral_url,
      service_name: 'Serviço',
      category: data.category,
      status: 'draft',
      cover_image_url: null,
      gallery_images: [],
      video_url: null,
      content: {
        what_is: '',
        advantages: [],
        quick_guide: [],
        faq: [],
      },
      karma_boost: 0,
      featured_until: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockShowcases.push(newShowcase);
    return newShowcase;
  },

  async updateShowcase(
    id: string,
    data: UpdateShowcaseRequest
  ): Promise<Showcase> {
    await delay(500);

    const showcaseIndex = mockShowcases.findIndex((s) => s.id === id);
    if (showcaseIndex === -1) {
      throw new Error('Showcase not found');
    }

    const currentShowcase = mockShowcases[showcaseIndex];
    const updatedShowcase: Showcase = {
      ...currentShowcase,
      ...data,
      // Merge content properly to avoid partial content issues
      content: data.content
        ? { ...currentShowcase.content, ...data.content }
        : currentShowcase.content,
      updated_at: new Date().toISOString(),
    };

    mockShowcases[showcaseIndex] = updatedShowcase;
    return updatedShowcase;
  },

  async deleteShowcase(id: string): Promise<void> {
    await delay(300);

    const showcaseIndex = mockShowcases.findIndex((s) => s.id === id);
    if (showcaseIndex === -1) {
      throw new Error('Showcase not found');
    }

    mockShowcases.splice(showcaseIndex, 1);
  },

  async generateShowcaseContent(
    url: string,
    category?: ShowcaseCategory
  ): Promise<ShowcaseContent> {
    // Try to use real AI service first, with fallback to mock data
    try {
      const aiService = getAIShowcaseService();
      const showcaseCategory = category || 'other'; // Default category if not provided

      // Use the AI service with fallback
      const result = await aiService.generateShowcaseContentWithFallback(
        url,
        showcaseCategory,
        'anonymous', // Default user ID for mock service
        'basic' // Default tier for mock service
      );

      // Return only the content for backward compatibility
      return result.content;
    } catch (error) {
      console.warn('AI service failed, using mock data:', error);

      // Fallback to original mock implementation
      await delay(2000); // Simulate AI processing time

      const domain = extractDomain(url);
      const aiResponse =
        mockAIResponses[domain] || mockAIResponses['nubank.com.br']; // Fallback

      return {
        what_is: aiResponse.o_que_e,
        advantages: aiResponse.tres_vantagens,
        quick_guide: aiResponse.guia_rapido,
        faq: aiResponse.faq.map((item) => ({
          question: item.pergunta,
          answer: item.resposta,
        })),
      };
    }
  },

  async uploadImage(file: File, folder: string): Promise<string> {
    await delay(1000); // Simulate upload time

    // Generate a mock URL based on file name and folder
    const fileName = `${folder}/${Date.now()}-${file.name}`;
    return `https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=${encodeURIComponent(
      file.name
    )}`;
  },
};
