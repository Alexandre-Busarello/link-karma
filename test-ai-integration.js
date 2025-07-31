// Test script para verificar a integração da IA com pesquisa na web
// Execute com: node test-ai-integration.js

const { GoogleGenAI } = require('@google/genai');

async function testAIIntegration() {
  console.log('🧪 Testando integração da IA com pesquisa na web...\n');

  // Verificar se a API key está configurada
  if (!process.env.GEMINI_API_KEY) {
    console.log('❌ GEMINI_API_KEY não está configurada');
    console.log('💡 Configure a variável de ambiente GEMINI_API_KEY para testar a IA real');
    console.log('📝 Exemplo: export GEMINI_API_KEY="sua-api-key-aqui"');
    return;
  }

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

    const testPrompt = `Você é um especialista em marketing de afiliados. 
Pesquise informações atualizadas sobre o Nubank e gere conteúdo para uma vitrine de referral em português do Brasil.

INSTRUÇÕES:
- Use a pesquisa na web para obter informações atualizadas sobre o Nubank
- Pesquise por benefícios, características e avaliações recentes
- Gere um JSON com as seguintes informações:

{
  "titulo_cativante": "Título atrativo com máximo 60 caracteres",
  "o_que_e": "Parágrafo explicativo sobre o Nubank (100-200 palavras)",
  "tres_vantagens": [
    "Primeira vantagem específica",
    "Segunda vantagem específica", 
    "Terceira vantagem específica"
  ],
  "guia_rapido": [
    "Primeiro passo para usar o Nubank",
    "Segundo passo",
    "Terceiro passo",
    "Quarto passo",
    "Quinto passo"
  ],
  "faq": [
    {
      "pergunta": "Pergunta frequente sobre o Nubank?",
      "resposta": "Resposta baseada em informações atualizadas"
    },
    {
      "pergunta": "Outra pergunta relevante?",
      "resposta": "Resposta clara e útil"
    }
  ],
  "service_name": "Nubank"
}

Responda APENAS com o JSON válido, sem texto adicional.`;

    console.log('🔍 Fazendo requisição para a IA com pesquisa na web...');
    console.log('⏳ Isso pode levar alguns segundos...\n');

    const result = await ai.models.generateContent({
      model: model,
      contents: [{ role: 'user', parts: [{ text: testPrompt }] }],
      config,
    });

    const text = result.text;
    if (!text) {
      throw new Error('A API não retornou texto.');
    }

    console.log('✅ Resposta da IA recebida!');
    console.log('📄 Conteúdo gerado:\n');
    
    try {
      // Tentar fazer parse do JSON
      const jsonResponse = JSON.parse(text);
      console.log('🎯 JSON válido gerado pela IA:');
      console.log(JSON.stringify(jsonResponse, null, 2));
      
      console.log('\n🔍 Verificando estrutura do JSON:');
      console.log(`✅ Título: ${jsonResponse.titulo_cativante ? '✓' : '✗'}`);
      console.log(`✅ Descrição: ${jsonResponse.o_que_e ? '✓' : '✗'}`);
      console.log(`✅ Vantagens (${jsonResponse.tres_vantagens?.length || 0}): ${jsonResponse.tres_vantagens?.length === 3 ? '✓' : '✗'}`);
      console.log(`✅ Guia rápido (${jsonResponse.guia_rapido?.length || 0}): ${jsonResponse.guia_rapido?.length >= 3 ? '✓' : '✗'}`);
      console.log(`✅ FAQ (${jsonResponse.faq?.length || 0}): ${jsonResponse.faq?.length >= 2 ? '✓' : '✗'}`);
      
    } catch (parseError) {
      console.log('⚠️  Resposta não é um JSON válido. Conteúdo bruto:');
      console.log(text);
    }

  } catch (error) {
    console.error('❌ Erro ao testar a integração da IA:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('💡 Verifique se sua GEMINI_API_KEY está correta');
    } else if (error.message.includes('quota')) {
      console.log('💡 Limite de quota da API atingido');
    } else if (error.message.includes('network')) {
      console.log('💡 Problema de conexão com a internet');
    }
  }
}

// Executar o teste
testAIIntegration().then(() => {
  console.log('\n🏁 Teste concluído!');
}).catch((error) => {
  console.error('💥 Erro fatal:', error);
});
