import { GoogleGenAI } from '@google/genai';

// Types for security verification
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

export interface SecurityVerificationConfig {
  apiKey: string;
  model?: string;
  timeout?: number;
}

export class SecurityVerificationService {
  private genAI: GoogleGenAI;
  private model: string;
  private timeout: number;

  constructor(config: SecurityVerificationConfig) {
    if (!config.apiKey) {
      throw new Error(
        'GEMINI_API_KEY is required for security verification service'
      );
    }

    this.genAI = new GoogleGenAI({
      apiKey: config.apiKey,
    });
    this.model = config.model || 'gemini-2.5-flash-lite';
    this.timeout = config.timeout || 45000; // Increased timeout for thorough search
  }

  /**
   * Verify the security and reputation of a referral URL
   */
  async verifyReferralSecurity(url: string): Promise<SecurityCheckResult> {
    const domain = this.extractDomain(url);
    const serviceName = this.extractServiceName(domain);

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `Security verification attempt ${attempt}/${maxRetries} for ${domain}`
        );

        const prompt = this.buildSecurityVerificationPrompt(
          url,
          domain,
          serviceName,
          attempt
        );

        // Configure tools for web search
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
          throw new Error(
            'A API não retornou texto para verificação de segurança.'
          );
        }

        console.log(
          `Raw AI response (attempt ${attempt}):`,
          text.substring(0, 200) + '...'
        );

        // Parse the JSON response
        const securityResult = this.parseSecurityResponse(text, attempt);

        // Validate and enhance the result
        const validatedResult = this.validateSecurityResult(
          securityResult,
          domain
        );

        console.log(`Security verification successful on attempt ${attempt}`);
        return validatedResult;
      } catch (error) {
        lastError = error as Error;
        console.error(
          `Security verification attempt ${attempt} failed:`,
          error
        );

        if (attempt < maxRetries) {
          // Wait before retry with exponential backoff
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    console.error(
      'All security verification attempts failed, returning fallback result'
    );

    // Return a safe default result in case of all retries failing
    return {
      status: 'SUSPEITO',
      confidence: 50,
      sources_checked: ['error_fallback'],
      findings: [
        `Não foi possível verificar a reputação do link após ${maxRetries} tentativas: ${
          lastError?.message || 'Erro desconhecido'
        }`,
      ],
      recommendation:
        'Prosseguir com extrema cautela devido à falha na verificação',
      details: {
        positive_mentions: 0,
        negative_mentions: 0,
        scam_indicators: ['verification_failed'],
        trustworthiness_score: 50,
      },
    };
  }

  /**
   * Build comprehensive security verification prompt
   */
  private buildSecurityVerificationPrompt(
    url: string,
    domain: string,
    serviceName: string,
    attempt = 1
  ): string {
    const retryInstructions =
      attempt > 1
        ? `

⚠️ ATENÇÃO - TENTATIVA ${attempt}:
Esta é uma nova tentativa após falha no parsing JSON. É CRÍTICO que você:
1. Responda APENAS com JSON válido
2. NÃO use markdown, NÃO use \`\`\`json
3. NÃO adicione texto explicativo antes ou depois do JSON
4. Certifique-se de que todas as aspas estão corretas
5. Verifique se todos os colchetes e chaves estão fechados
`
        : '';

    return `Você é um especialista em segurança digital e análise de reputação online.
Sua tarefa é verificar a segurança e reputação de um link de referral através de pesquisa abrangente na web.
${retryInstructions}
LINK PARA VERIFICAR:
- URL: ${url}
- Domínio: ${domain}
- Serviço: ${serviceName}

INSTRUÇÕES DE PESQUISA:
1. Pesquise extensivamente sobre "${serviceName}" e "${domain}" nas seguintes fontes:
   - Twitter/X: Busque menções recentes, reclamações, alertas
   - Reddit: Procure discussões em subreddits relevantes (r/golpes, r/investimentos, etc.)
   - Reclame Aqui: Verifique reclamações e avaliações
   - Trustpilot: Analise avaliações de usuários
   - Google: Busque notícias, artigos, alertas sobre o serviço
   - Fóruns e comunidades: Procure discussões sobre o serviço

2. Procure especificamente por:
   - Termos de alerta: "golpe", "scam", "fraude", "pirâmide", "esquema", "não paga", "calote"
   - Reclamações sobre não pagamento ou dificuldades para receber
   - Padrões de esquema de pirâmide ou marketing multinível suspeito
   - Avaliações negativas consistentes
   - Alertas de órgãos reguladores ou mídia

3. Analise também aspectos positivos:
   - Avaliações positivas genuínas
   - Presença em app stores oficiais
   - Regulamentação por órgãos competentes
   - Tempo de mercado e reputação estabelecida

CRITÉRIOS DE CLASSIFICAÇÃO:
- APROVADO: Serviço legítimo, sem indicações significativas de problemas
- SUSPEITO: Algumas reclamações ou sinais de alerta, mas não conclusivos
- BLOQUEADO: Evidências claras de golpe, fraude ou esquema prejudicial

FORMATO DE RESPOSTA - EXTREMAMENTE IMPORTANTE:
Você DEVE responder APENAS com um JSON válido, sem qualquer texto adicional, markdown, explicações ou formatação.

ESTRUTURA EXATA DO JSON:
{
  "status": "APROVADO",
  "confidence": 85,
  "sources_checked": ["twitter", "reddit", "reclame_aqui", "trustpilot", "google"],
  "findings": [
    "Primeira descoberta específica da pesquisa",
    "Segunda descoberta específica da pesquisa"
  ],
  "recommendation": "Recomendação clara e concisa baseada na análise",
  "details": {
    "positive_mentions": 15,
    "negative_mentions": 3,
    "scam_indicators": ["indicador1", "indicador2"],
    "trustworthiness_score": 75
  }
}

REGRAS CRÍTICAS:
1. Responda APENAS com o JSON - sem texto antes ou depois
2. Não use markdown, não use \`\`\`json, não adicione explicações
3. O status deve ser exatamente: "APROVADO", "SUSPEITO" ou "BLOQUEADO"
4. Confidence deve ser um número entre 0 e 100
5. Todos os arrays devem ter pelo menos 1 item
6. Todas as strings devem estar entre aspas duplas
7. Não quebre linhas desnecessariamente nos textos

EXEMPLO DE RESPOSTA CORRETA:
{"status":"SUSPEITO","confidence":70,"sources_checked":["google","twitter"],"findings":["Algumas reclamações encontradas","Falta de transparência"],"recommendation":"Prosseguir com cautela","details":{"positive_mentions":5,"negative_mentions":8,"scam_indicators":["reclamações"],"trustworthiness_score":60}}`;
  }

  /**
   * Parse and validate security verification response
   */
  private parseSecurityResponse(
    text: string,
    attempt = 1
  ): SecurityCheckResult {
    try {
      console.log(
        `Parsing security response (attempt ${attempt}):`,
        text.substring(0, 500)
      );

      // Clean the response text
      let cleanText = text.trim();

      // Remove markdown code blocks if present
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Try to extract JSON from text that might have extra content
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      console.log(
        `Cleaned text for parsing (attempt ${attempt}):`,
        cleanText.substring(0, 300)
      );

      const parsed = JSON.parse(cleanText);

      // Validate required fields
      if (
        !parsed.status ||
        !['APROVADO', 'SUSPEITO', 'BLOQUEADO'].includes(parsed.status)
      ) {
        throw new Error('Invalid status in security response');
      }

      if (
        typeof parsed.confidence !== 'number' ||
        parsed.confidence < 0 ||
        parsed.confidence > 100
      ) {
        throw new Error('Invalid confidence score in security response');
      }

      if (!Array.isArray(parsed.sources_checked)) {
        throw new Error('Invalid sources_checked in security response');
      }

      if (!Array.isArray(parsed.findings)) {
        throw new Error('Invalid findings in security response');
      }

      return parsed as SecurityCheckResult;
    } catch (error) {
      console.error(
        `Failed to parse security response (attempt ${attempt}):`,
        error
      );
      console.error('Raw response:', text);

      // Provide more specific error message for retry attempts
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(
        `Attempt ${attempt} - Invalid security response format: ${errorMessage}. Response was not valid JSON.`
      );
    }
  }

  /**
   * Validate and enhance security result
   */
  private validateSecurityResult(
    result: SecurityCheckResult,
    domain: string
  ): SecurityCheckResult {
    // Apply additional validation rules
    const enhancedResult = { ...result };

    // Check for known safe domains
    const knownSafeDomains = [
      'nubank.com.br',
      'inter.co',
      'c6bank.com.br',
      'itau.com.br',
      'bradesco.com.br',
      'santander.com.br',
      'ifood.com.br',
      'uber.com',
      'netflix.com',
      'spotify.com',
    ];

    if (knownSafeDomains.includes(domain.toLowerCase())) {
      enhancedResult.status = 'APROVADO';
      enhancedResult.confidence = Math.max(enhancedResult.confidence, 90);
      enhancedResult.findings.push(
        'Domínio reconhecido como seguro e confiável'
      );
    }

    // Check for suspicious patterns in domain
    const suspiciousPatterns = [
      /\d{4,}/, // Many numbers
      /[.-](win|earn|money|cash|profit)[.-]/i,
      /[.-](easy|fast|quick)[.-]/i,
      /[.-](invest|trading|forex)[.-]/i,
    ];

    const hasSuspiciousPattern = suspiciousPatterns.some((pattern) =>
      pattern.test(domain)
    );
    if (hasSuspiciousPattern && enhancedResult.status === 'APROVADO') {
      enhancedResult.status = 'SUSPEITO';
      enhancedResult.confidence = Math.min(enhancedResult.confidence, 70);
      enhancedResult.findings.push('Padrão suspeito identificado no domínio');
    }

    return enhancedResult;
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return 'unknown.com';
    }
  }

  /**
   * Extract service name from domain
   */
  private extractServiceName(domain: string): string {
    try {
      const parts = domain.split('.');
      const serviceName = parts[0];
      return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
    } catch {
      return 'Serviço Desconhecido';
    }
  }
}

// Create singleton instance
let securityServiceInstance: SecurityVerificationService | null = null;

export function getSecurityVerificationService(): SecurityVerificationService {
  if (!securityServiceInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }

    securityServiceInstance = new SecurityVerificationService({
      apiKey,
      model: 'gemini-2.5-flash-lite',
      timeout: 45000,
    });
  }

  return securityServiceInstance;
}

export default getSecurityVerificationService;
