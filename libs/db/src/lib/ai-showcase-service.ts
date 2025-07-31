import { ShowcaseCategory, ShowcaseContent } from '@linkkarma/shared-types';

export interface SecurityCheckResult {
  status: 'APROVADO' | 'SUSPEITO' | 'BLOQUEADO';
  confidence: number;
  sources_checked: string[];
  findings: string[];
  recommendation: string;
  details?: {
    positive_mentions: number;
    negative_mentions: number;
    scam_indicators: string[];
    trustworthiness_score: number;
  };
}

export interface AIShowcaseGenerationRequest {
  url: string;
  category: ShowcaseCategory;
  userId?: string;
  userTier?: 'basic' | 'pro';
}

export interface AIShowcaseGenerationResponse {
  success: boolean;
  data?: ShowcaseContent & { service_name?: string };
  security_check?: {
    status: 'APROVADO' | 'SUSPEITO' | 'BLOQUEADO';
    confidence: number;
    sources_checked: string[];
    findings: string[];
    recommendation: string;
    details?: {
      positive_mentions: number;
      negative_mentions: number;
      scam_indicators: string[];
      trustworthiness_score: number;
    };
  };
  error?: string;
  message?: string;
}

export class AIShowcaseService {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate showcase content using AI
   */
  async generateShowcaseContent(
    url: string,
    category: ShowcaseCategory,
    userId?: string,
    userTier?: 'basic' | 'pro'
  ): Promise<ShowcaseContent> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/showcases/generate-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            category,
            userId,
            userTier,
          } as AIShowcaseGenerationRequest),
        }
      );

      const result = (await response.json()) as AIShowcaseGenerationResponse;

      if (!response.ok) {
        throw new Error(
          result.message || result.error || 'Failed to generate content'
        );
      }

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Invalid response from AI service');
      }

      return {
        what_is: result.data.what_is,
        advantages: result.data.advantages,
        quick_guide: result.data.quick_guide,
        faq: result.data.faq,
      };
    } catch (error) {
      console.error('AI showcase generation failed:', error);

      // Re-throw with more specific error messages
      if (error instanceof Error) {
        throw error;
      }

      throw new Error('Falha na geração de conteúdo com IA');
    }
  }

  /**
   * Generate showcase content with fallback to mock data
   */
  async generateShowcaseContentWithFallback(
    url: string,
    category: ShowcaseCategory,
    userId?: string,
    userTier?: 'basic' | 'pro'
  ): Promise<{
    content: ShowcaseContent;
    securityCheck?: SecurityCheckResult;
  }> {
    try {
      // Try AI generation first with full API call to get security check
      const response = await fetch(
        `${this.baseUrl}/api/showcases/generate-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url,
            category,
            userId,
            userTier,
          } as AIShowcaseGenerationRequest),
        }
      );

      const result = (await response.json()) as AIShowcaseGenerationResponse;

      if (!response.ok) {
        throw new Error(
          result.message || result.error || 'Failed to generate content'
        );
      }

      if (!result.success || !result.data) {
        throw new Error(result.message || 'Invalid response from AI service');
      }

      return {
        content: {
          what_is: result.data.what_is,
          advantages: result.data.advantages,
          quick_guide: result.data.quick_guide,
          faq: result.data.faq,
        },
        securityCheck: result.security_check,
      };
    } catch (error) {
      console.warn('AI generation failed, falling back to mock data:', error);

      // Fallback to mock data based on domain
      return {
        content: this.generateMockContent(url, category),
        securityCheck: {
          status: 'SUSPEITO',
          confidence: 50,
          sources_checked: ['fallback'],
          findings: [
            'Verificação de segurança não disponível - usando dados mock',
          ],
          recommendation:
            'Prosseguir com cautela devido à falha na verificação',
        },
      };
    }
  }

  /**
   * Generate mock content as fallback
   */
  private generateMockContent(
    url: string,
    category: ShowcaseCategory
  ): ShowcaseContent {
    const domain = this.extractDomain(url);

    // Basic mock responses based on category
    const mockResponses = {
      banking: {
        what_is: `O ${domain} é uma plataforma financeira digital que oferece serviços bancários modernos e seguros, com foco na experiência do usuário e tecnologia de ponta.`,
        advantages: [
          'Conta digital gratuita sem tarifas mensais',
          'Interface moderna e intuitiva',
          'Atendimento 24/7 via aplicativo',
        ],
        quick_guide: [
          'Clique no link de indicação',
          'Baixe o aplicativo oficial',
          'Faça seu cadastro com CPF',
          'Aguarde a análise dos documentos',
          'Comece a usar sua conta digital',
        ],
        faq: [
          {
            question: 'É seguro usar este serviço?',
            answer:
              'Sim, é regulamentado pelos órgãos competentes e possui certificações de segurança.',
          },
          {
            question: 'Tem taxa de manutenção?',
            answer: 'Não, a conta é gratuita sem taxa de manutenção mensal.',
          },
        ],
      },
      food: {
        what_is: `O ${domain} é uma plataforma de delivery que conecta você aos melhores restaurantes da sua região, oferecendo praticidade e variedade na palma da sua mão.`,
        advantages: [
          'Milhares de restaurantes parceiros',
          'Entrega rápida e rastreamento em tempo real',
          'Promoções exclusivas e cupons de desconto',
        ],
        quick_guide: [
          'Clique no link de convite',
          'Baixe o aplicativo',
          'Cadastre-se com seu e-mail',
          'Adicione seu endereço',
          'Faça seu primeiro pedido',
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
      transport: {
        what_is: `O ${domain} é um aplicativo de mobilidade urbana que oferece viagens seguras, rápidas e convenientes, conectando passageiros a motoristas parceiros.`,
        advantages: [
          'Viagens seguras com motoristas verificados',
          'Preços transparentes calculados antecipadamente',
          'Disponível 24 horas por dia',
        ],
        quick_guide: [
          'Clique no link de indicação',
          'Baixe o aplicativo',
          'Cadastre-se com seus dados',
          'Adicione um método de pagamento',
          'Solicite sua primeira viagem',
        ],
        faq: [
          {
            question: 'Como funciona o pagamento?',
            answer:
              'O pagamento é automático através do cartão cadastrado no app.',
          },
          {
            question: 'Posso avaliar o motorista?',
            answer:
              'Sim, você pode avaliar e comentar sobre a viagem após o término.',
          },
        ],
      },
    };

    const mockData =
      mockResponses[category as keyof typeof mockResponses] ||
      mockResponses.banking;

    return {
      what_is: mockData.what_is,
      advantages: mockData.advantages,
      quick_guide: mockData.quick_guide,
      faq: mockData.faq,
    };
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'este serviço';
    }
  }
}

// Create singleton instance
let aiShowcaseServiceInstance: AIShowcaseService | null = null;

export function getAIShowcaseService(): AIShowcaseService {
  if (!aiShowcaseServiceInstance) {
    aiShowcaseServiceInstance = new AIShowcaseService();
  }
  return aiShowcaseServiceInstance;
}

export default getAIShowcaseService;
