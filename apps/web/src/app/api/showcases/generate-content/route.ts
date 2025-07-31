import { getAIService, getSecurityVerificationService } from '@linkkarma/db';
import { ShowcaseCategory } from '@linkkarma/shared-types';
import { NextRequest, NextResponse } from 'next/server';

export interface GenerateContentRequest {
  url: string;
  category: ShowcaseCategory;
  userId?: string;
  userTier?: 'basic' | 'pro';
}

export interface GenerateContentResponse {
  success: boolean;
  data?: {
    what_is: string;
    advantages: string[];
    quick_guide: string[];
    faq: { question: string; answer: string }[];
    service_name?: string;
  };
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

export async function POST(
  request: NextRequest
): Promise<NextResponse<GenerateContentResponse>> {
  try {
    // Parse request body
    const body: GenerateContentRequest = await request.json();

    // Validate required fields
    if (!body.url) {
      return NextResponse.json(
        {
          success: false,
          error: 'URL is required',
          message: 'Por favor, forneça uma URL válida',
        },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category is required',
          message: 'Por favor, selecione uma categoria',
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(body.url);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid URL format',
          message: 'URL inválida. Verifique se inclui http:// ou https://',
        },
        { status: 400 }
      );
    }

    // Step 1: Perform security verification first
    const securityService = getSecurityVerificationService();
    const securityCheck = await securityService.verifyReferralSecurity(
      body.url
    );

    console.log('Security check result:', securityCheck);

    // Block creation if link is identified as scam
    if (securityCheck.status === 'BLOQUEADO') {
      return NextResponse.json(
        {
          success: false,
          security_check: securityCheck,
          error: 'LINK_BLOCKED',
          message:
            'Este link foi identificado como potencial golpe/scam baseado em avaliações online e não pode ser usado para criar vitrines.',
        },
        { status: 403 }
      );
    }

    // Step 2: Get AI service instance and generate content
    const aiService = getAIService();

    // Extract content from URL
    const urlData = await aiService.extractURLContent(body.url);

    // Generate showcase content using AI
    const showcaseContent = await aiService.generateShowcaseContent(
      urlData,
      body.category,
      body.userId || 'anonymous',
      body.userTier || 'basic'
    );

    // Return successful response with security check
    return NextResponse.json({
      success: true,
      data: {
        ...showcaseContent,
        // Use AI-generated service name if available, fallback to domain
        service_name: showcaseContent.service_name || urlData.domain,
      },
      security_check: securityCheck,
      message:
        securityCheck.status === 'SUSPEITO'
          ? 'Conteúdo gerado com sucesso! Atenção: algumas questões de reputação foram identificadas.'
          : 'Conteúdo gerado com sucesso!',
    });
  } catch (error) {
    console.error('Showcase content generation failed:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Rate limit error
      if (error.message.includes('Rate limit exceeded')) {
        return NextResponse.json(
          {
            success: false,
            error: 'RATE_LIMIT_EXCEEDED',
            message:
              'Limite de solicitações excedido. Tente novamente mais tarde.',
          },
          { status: 429 }
        );
      }

      // AI service error
      if (error.message.includes('AI content generation failed')) {
        return NextResponse.json(
          {
            success: false,
            error: 'AI_GENERATION_FAILED',
            message:
              'Falha na geração de conteúdo. Tente novamente em alguns minutos.',
          },
          { status: 503 }
        );
      }

      // URL extraction error
      if (error.message.includes('HTTP')) {
        return NextResponse.json(
          {
            success: false,
            error: 'URL_ACCESS_FAILED',
            message:
              'Não foi possível acessar a URL fornecida. Verifique se está correta e acessível.',
          },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Erro interno do servidor. Tente novamente mais tarde.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Método não permitido. Use POST.',
    },
    { status: 405 }
  );
}

export async function PUT(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Método não permitido. Use POST.',
    },
    { status: 405 }
  );
}

export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'METHOD_NOT_ALLOWED',
      message: 'Método não permitido. Use POST.',
    },
    { status: 405 }
  );
}
