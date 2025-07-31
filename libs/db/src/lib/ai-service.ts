import { GoogleGenAI } from '@google/genai';
import { ShowcaseCategory, ShowcaseContent } from '@linkkarma/shared-types';

// Extended showcase content with additional AI-generated fields
export interface ExtendedShowcaseContent extends ShowcaseContent {
  title?: string;
  description?: string;
  service_name?: string;
}

// Types for AI service
export interface AIAnalysisResult {
  titulo_cativante: string;
  descricao_curta: string;
  nome_servico: string;
  o_que_e: string;
  tres_vantagens: string[];
  guia_rapido: string[];
  faq: { pergunta: string; resposta: string }[];
}

export interface URLContentData {
  title?: string;
  description?: string;
  content?: string;
  domain: string;
  url: string;
}

export interface AIServiceConfig {
  apiKey: string;
  model?: string;
  maxRetries?: number;
  timeout?: number;
}

// Rate limiting interface
export interface RateLimitInfo {
  userId: string;
  userTier: 'basic' | 'pro';
  requestCount: number;
  windowStart: number;
}

class AIService {
  private genAI: GoogleGenAI;
  private model: string;
  private maxRetries: number;
  private timeout: number;
  private rateLimitStore: Map<string, RateLimitInfo> = new Map();

  constructor(config: AIServiceConfig) {
    if (!config.apiKey) {
      throw new Error('GEMINI_API_KEY is required for AI service');
    }

    this.genAI = new GoogleGenAI({
      apiKey: config.apiKey,
    });
    this.model = config.model || 'gemini-2.5-flash-lite';
    this.maxRetries = config.maxRetries || 3;
    this.timeout = config.timeout || 30000;
  }

  /**
   * Rate limiting for AI requests based on user tier
   */
  async checkRateLimit(
    userId: string,
    userTier: 'basic' | 'pro'
  ): Promise<boolean> {
    const limits = {
      basic: { requests: 10, windowMs: 24 * 60 * 60 * 1000 }, // 10 per day
      pro: { requests: 100, windowMs: 24 * 60 * 60 * 1000 }, // 100 per day
    };

    const limit = limits[userTier];
    const now = Date.now();
    const key = `${userId}:${userTier}`;

    const existing = this.rateLimitStore.get(key);

    if (!existing || now - existing.windowStart > limit.windowMs) {
      // New window or first request
      this.rateLimitStore.set(key, {
        userId,
        userTier,
        requestCount: 1,
        windowStart: now,
      });
      return true;
    }

    if (existing.requestCount >= limit.requests) {
      return false; // Rate limit exceeded
    }

    // Increment counter
    existing.requestCount++;
    this.rateLimitStore.set(key, existing);
    return true;
  }

  /**
   * Extract content from URL for AI analysis
   */
  async extractURLContent(url: string): Promise<URLContentData> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'LinkKarma-Bot/1.0 (+https://linkkarma.com.br)',
        },
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const domain = new URL(url).hostname.replace('www.', '');

      // Extract basic metadata using simple regex patterns
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const descriptionMatch =
        html.match(
          /<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i
        ) ||
        html.match(
          /<meta[^>]*content=["\']([^"']+)["\'][^>]*name=["\']description["\'][^>]*>/i
        );

      // Extract some text content (simplified)
      const textContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 2000); // Limit content length

      return {
        title: titleMatch?.[1]?.trim(),
        description: descriptionMatch?.[1]?.trim(),
        content: textContent,
        domain,
        url,
      };
    } catch (error) {
      console.error('URL content extraction failed:', error);

      // Return basic info even if extraction fails
      const domain = new URL(url).hostname.replace('www.', '');
      return {
        domain,
        url,
        title: `Serviço de ${domain}`,
        description: `Conheça os benefícios do ${domain}`,
        content: '',
      };
    }
  }

  /**
   * Generate showcase content using AI
   */
  async generateShowcaseContent(
    urlData: URLContentData,
    category: ShowcaseCategory,
    userId = 'anonymous',
    userTier: 'basic' | 'pro' = 'basic'
  ): Promise<ExtendedShowcaseContent> {
    // Check rate limiting
    const canProceed = await this.checkRateLimit(userId, userTier);
    if (!canProceed) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const prompt = this.buildPrompt(urlData, category);

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // Configure tools for web search and URL context
        const tools = [{ urlContext: {} }, { googleSearch: {} }];

        const config = {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          tools,
        };

        const result = await this.genAI.models.generateContent({
          model: this.model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config,
        });

        const text = result.text;
        if (!text) {
          throw new Error('A API não retornou texto.');
        }

        // Parse the JSON response
        const aiResult = this.parseAIResponse(text);

        // Convert to ShowcaseContent format with additional fields
        return {
          what_is: aiResult.o_que_e,
          advantages: aiResult.tres_vantagens,
          quick_guide: aiResult.guia_rapido,
          faq: aiResult.faq.map((item) => ({
            question: item.pergunta,
            answer: item.resposta,
          })),
          // Additional fields for complete showcase data
          title: aiResult.titulo_cativante,
          description: aiResult.descricao_curta,
          service_name: aiResult.nome_servico,
        };
      } catch (error) {
        lastError = error as Error;
        console.error(`AI generation attempt ${attempt} failed:`, error);

        if (attempt < this.maxRetries) {
          // Wait before retry with exponential backoff
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    // If all retries failed, throw the last error
    throw new Error(
      `AI content generation failed after ${this.maxRetries} attempts: ${lastError?.message}`
    );
  }

  /**
   * Build structured prompt for AI content generation
   */
  private buildPrompt(
    urlData: URLContentData,
    category: ShowcaseCategory
  ): string {
    const categoryContext = this.getCategoryContext(category);

    return `Você é um especialista em marketing de afiliados e criação de conteúdo persuasivo.
Com base nas informações fornecidas e usando pesquisa na web quando necessário, gere o conteúdo para uma 'Vitrine de Referral' em português do Brasil.

INFORMAÇÕES DO SITE:
- URL: ${urlData.url}
- Domínio: ${urlData.domain}
- Título: ${urlData.title || 'Não disponível'}
- Descrição: ${urlData.description || 'Não disponível'}
- Categoria: ${category} (${categoryContext})
- Conteúdo extraído: ${urlData.content?.substring(0, 1000) || 'Não disponível'}

INSTRUÇÕES:
- Use a pesquisa na web para obter informações atualizadas sobre o serviço/produto
- Pesquise por avaliações, benefícios, preços e características específicas
- O tom deve ser convidativo, claro e confiável
- Use linguagem brasileira natural e acessível
- Foque nos benefícios reais para o usuário baseados em informações verificadas
- Seja específico e evite promessas exageradas
- Mantenha a credibilidade e transparência
- Se não conseguir informações específicas via pesquisa, use as informações fornecidas

FORMATO DE RESPOSTA (JSON válido):
{
  "titulo_cativante": "Título atrativo com máximo 60 caracteres",
  "descricao_curta": "Descrição concisa em 1-2 frases que resume o valor do serviço",
  "nome_servico": "Nome oficial do serviço/empresa extraído da análise",
  "o_que_e": "Parágrafo explicativo sobre o produto/serviço (100-200 palavras)",
  "tres_vantagens": [
    "Primeira vantagem específica e clara",
    "Segunda vantagem específica e clara",
    "Terceira vantagem específica e clara"
  ],
  "guia_rapido": [
    "Primeiro passo para usar o serviço",
    "Segundo passo para usar o serviço",
    "Terceiro passo para usar o serviço",
    "Quarto passo para usar o serviço",
    "Quinto passo para usar o serviço"
  ],
  "faq": [
    {
      "pergunta": "Pergunta frequente relevante 1?",
      "resposta": "Resposta clara e útil"
    },
    {
      "pergunta": "Pergunta frequente relevante 2?",
      "resposta": "Resposta clara e útil"
    },
    {
      "pergunta": "Pergunta frequente relevante 3?",
      "resposta": "Resposta clara e útil"
    }
  ]
}

Responda APENAS com o JSON válido, sem texto adicional.`;
  }

  /**
   * Get category-specific context for better AI generation
   */
  private getCategoryContext(category: ShowcaseCategory): string {
    const contexts = {
      banking: 'Serviços bancários e financeiros',
      transport: 'Transporte e mobilidade urbana',
      food: 'Delivery de comida e restaurantes',
      shopping: 'E-commerce e compras online',
      entertainment: 'Entretenimento e streaming',
      finance: 'Investimentos e finanças pessoais',
      health: 'Saúde e bem-estar',
      education: 'Educação e cursos online',
      technology: 'Tecnologia e software',
      other: 'Outros serviços',
    };

    return contexts[category] || contexts.other;
  }

  /**
   * Parse AI response and validate JSON structure
   */
  private parseAIResponse(text: string): AIAnalysisResult {
    try {
      // Clean the response text
      let cleanText = text.trim();

      // Remove markdown code blocks if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any leading/trailing whitespace again
      cleanText = cleanText.trim();

      // Fix common JSON formatting issues
      // Remove leading/trailing single quotes if present
      if (cleanText.startsWith("'") && cleanText.endsWith("'")) {
        cleanText = cleanText.slice(1, -1);
      }

      // Try to find JSON content if wrapped in other text
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      // Additional cleaning for malformed JSON
      // Be more careful with quote replacement to avoid breaking content
      cleanText = cleanText
        .replace(/,\s*}/g, '}') // Remove trailing commas
        .replace(/,\s*]/g, ']'); // Remove trailing commas in arrays

      console.log(
        'Attempting to parse cleaned JSON:',
        cleanText.substring(0, 200) + '...'
      );

      // Try parsing the cleaned text
      let parsed;
      try {
        parsed = JSON.parse(cleanText);
      } catch {
        console.log('First parse attempt failed, trying quote replacement...');
        // If first attempt fails, try replacing single quotes with double quotes
        const quotesReplaced = cleanText.replace(/'/g, '"');
        try {
          parsed = JSON.parse(quotesReplaced);
        } catch {
          console.log(
            'Second parse attempt failed, trying to fix truncated JSON...'
          );
          // If still failing, try to fix truncated JSON by adding missing closing braces
          let fixedText = cleanText;
          const openBraces = (fixedText.match(/\{/g) || []).length;
          const closeBraces = (fixedText.match(/\}/g) || []).length;
          const openBrackets = (fixedText.match(/\[/g) || []).length;
          const closeBrackets = (fixedText.match(/\]/g) || []).length;

          // Add missing closing braces/brackets
          for (let i = 0; i < openBraces - closeBraces; i++) {
            fixedText += '}';
          }
          for (let i = 0; i < openBrackets - closeBrackets; i++) {
            fixedText += ']';
          }

          parsed = JSON.parse(fixedText);
        }
      }

      // Validate required fields
      if (
        !parsed.titulo_cativante ||
        !parsed.o_que_e ||
        !parsed.tres_vantagens ||
        !parsed.guia_rapido ||
        !parsed.faq
      ) {
        throw new Error('Missing required fields in AI response');
      }

      // Validate array fields
      if (
        !Array.isArray(parsed.tres_vantagens) ||
        parsed.tres_vantagens.length !== 3
      ) {
        throw new Error('tres_vantagens must be an array with exactly 3 items');
      }

      if (!Array.isArray(parsed.guia_rapido) || parsed.guia_rapido.length < 3) {
        throw new Error('guia_rapido must be an array with at least 3 items');
      }

      if (!Array.isArray(parsed.faq) || parsed.faq.length < 2) {
        throw new Error('faq must be an array with at least 2 items');
      }

      // Validate FAQ structure
      for (const faqItem of parsed.faq) {
        if (!faqItem.pergunta || !faqItem.resposta) {
          throw new Error('Each FAQ item must have pergunta and resposta');
        }
      }

      return parsed as AIAnalysisResult;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.error('Raw response:', text);
      throw new Error(
        `Invalid AI response format: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
    }
  }
}

// Create singleton instance
let aiServiceInstance: AIService | null = null;

export function getAIService(): AIService {
  if (!aiServiceInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    aiServiceInstance = new AIService({
      apiKey,
      model: 'gemini-2.5-flash-lite',
      maxRetries: 3,
      timeout: 30000,
    });
  }

  return aiServiceInstance;
}

// Export types and service
export { AIService };
export default getAIService;
