// Test script para verificar o sistema de segurança e reputação
// Execute com: node test-security-verification.js

const { GoogleGenAI } = require('@google/genai');

async function testSecurityVerification() {
  console.log('🔒 Testando sistema de verificação de segurança...\n');

  // Verificar se a API key está configurada
  if (!process.env.GEMINI_API_KEY) {
    console.log('❌ GEMINI_API_KEY não está configurada');
    console.log('💡 Configure a variável de ambiente GEMINI_API_KEY para testar a verificação de segurança');
    console.log('📝 Exemplo: export GEMINI_API_KEY="sua-api-key-aqui"');
    return;
  }

  // URLs de teste para diferentes cenários
  const testUrls = [
    {
      url: 'https://nubank.com.br/convite/test123',
      expectedStatus: 'APROVADO',
      description: 'Nubank - Serviço legítimo e conhecido'
    },
    {
      url: 'https://ifood.com.br/convite/test456',
      expectedStatus: 'APROVADO',
      description: 'iFood - Plataforma estabelecida'
    },
    {
      url: 'https://suspicious-investment-site.com/ref/123',
      expectedStatus: 'SUSPEITO',
      description: 'Site suspeito de investimentos'
    },
    {
      url: 'https://get-rich-quick-scheme.com/join/456',
      expectedStatus: 'BLOQUEADO',
      description: 'Esquema de enriquecimento rápido'
    }
  ];

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const tools = [
      { urlContext: {} },
      { googleSearch: {} },
    ];

    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      tools,
    };

    const model = 'gemini-2.5-flash-lite';

    for (const testCase of testUrls) {
      console.log(`🔍 Testando: ${testCase.description}`);
      console.log(`📎 URL: ${testCase.url}`);
      console.log(`🎯 Status esperado: ${testCase.expectedStatus}\n`);

      const domain = new URL(testCase.url).hostname.replace('www.', '');
      const serviceName = domain.split('.')[0];

      const prompt = `Você é um especialista em segurança digital e análise de reputação online.
Sua tarefa é verificar a segurança e reputação de um link de referral através de pesquisa abrangente na web.

LINK PARA VERIFICAR:
- URL: ${testCase.url}
- Domínio: ${domain}
- Serviço: ${serviceName}

INSTRUÇÕES DE PESQUISA:
1. Pesquise extensivamente sobre "${serviceName}" e "${domain}" nas seguintes fontes:
   - Twitter/X: Busque menções recentes, reclamações, alertas
   - Reddit: Procure discussões em subreddits relevantes (r/golpes, r/investimentos, etc.)
   - Reclame Aqui: Verifique reclamações e avaliações
   - Trustpilot: Analise avaliações de usuários
   - Google: Busque notícias, artigos, alertas sobre o serviço

2. Procure especificamente por:
   - Termos de alerta: "golpe", "scam", "fraude", "pirâmide", "esquema", "não paga", "calote"
   - Reclamações sobre não pagamento ou dificuldades para receber
   - Padrões de esquema de pirâmide ou marketing multinível suspeito
   - Avaliações negativas consistentes
   - Alertas de órgãos reguladores ou mídia

CRITÉRIOS DE CLASSIFICAÇÃO:
- APROVADO: Serviço legítimo, sem indicações significativas de problemas
- SUSPEITO: Algumas reclamações ou sinais de alerta, mas não conclusivos
- BLOQUEADO: Evidências claras de golpe, fraude ou esquema prejudicial

FORMATO DE RESPOSTA (JSON válido):
{
  "status": "APROVADO|SUSPEITO|BLOQUEADO",
  "confidence": 85,
  "sources_checked": ["twitter", "reddit", "reclame_aqui", "trustpilot", "google"],
  "findings": [
    "Lista de descobertas específicas encontradas na pesquisa"
  ],
  "recommendation": "Recomendação clara baseada na análise",
  "details": {
    "positive_mentions": 15,
    "negative_mentions": 3,
    "scam_indicators": ["lista de indicadores encontrados"],
    "trustworthiness_score": 75
  }
}

Responda APENAS com o JSON válido, sem texto adicional.`;

      try {
        console.log('⏳ Analisando reputação online...');
        
        const result = await ai.models.generateContent({
          model: model,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config,
        });

        const text = result.text;
        if (!text) {
          throw new Error('A API não retornou texto.');
        }

        // Tentar fazer parse do JSON
        const securityResult = JSON.parse(text);
        
        console.log('✅ Análise concluída!');
        console.log(`📊 Status: ${securityResult.status} (${securityResult.confidence}% confiança)`);
        console.log(`🔍 Fontes verificadas: ${securityResult.sources_checked.join(', ')}`);
        console.log(`💡 Recomendação: ${securityResult.recommendation}`);
        
        if (securityResult.findings && securityResult.findings.length > 0) {
          console.log('📋 Descobertas:');
          securityResult.findings.forEach((finding, index) => {
            console.log(`   ${index + 1}. ${finding}`);
          });
        }
        
        if (securityResult.details) {
          console.log('📈 Detalhes:');
          console.log(`   • Menções positivas: ${securityResult.details.positive_mentions}`);
          console.log(`   • Menções negativas: ${securityResult.details.negative_mentions}`);
          console.log(`   • Score de confiabilidade: ${securityResult.details.trustworthiness_score}/100`);
          
          if (securityResult.details.scam_indicators && securityResult.details.scam_indicators.length > 0) {
            console.log(`   • Indicadores de risco: ${securityResult.details.scam_indicators.join(', ')}`);
          }
        }
        
        // Verificar se o resultado está conforme esperado
        const statusMatch = securityResult.status === testCase.expectedStatus;
        console.log(`${statusMatch ? '✅' : '⚠️'} Status ${statusMatch ? 'conforme esperado' : 'diferente do esperado'}`);
        
      } catch (parseError) {
        console.log('❌ Erro ao analisar resposta:', parseError.message);
        console.log('📄 Resposta bruta:', text);
      }
      
      console.log('\n' + '='.repeat(80) + '\n');
    }

  } catch (error) {
    console.error('❌ Erro ao testar verificação de segurança:', error.message);
  }
}

// Executar o teste
testSecurityVerification().then(() => {
  console.log('🏁 Teste de verificação de segurança concluído!');
  console.log('\n💡 Dicas:');
  console.log('• O sistema analisa múltiplas fontes online para verificar reputação');
  console.log('• Links suspeitos recebem aviso, links perigosos são bloqueados');
  console.log('• A verificação é integrada ao processo de criação de vitrines');
}).catch((error) => {
  console.error('💥 Erro fatal:', error);
});
