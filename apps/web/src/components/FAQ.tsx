'use client';

import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'O que é o sistema de Prova de Contribuição?',
    answer:
      'É o coração do LinkKarma. Para postar uma vitrine, você precisa contribuir com a comunidade usando links de referral ou ajudando na verificação comunitária. Isso garante qualidade e elimina spam. Você precisa de 3 Créditos de Contribuição para desbloquear um novo slot de vitrine.',
  },
  {
    question: 'Como funciona a criação de vitrines com IA?',
    answer:
      'Nossa IA analisa automaticamente seu link de referral, extrai informações do serviço e cria uma vitrine profissional com título, descrição, vantagens, FAQ e guia passo-a-passo. Utilizamos o Google Gemini AI para garantir conteúdo de alta qualidade. Você pode personalizar tudo antes de publicar.',
  },
  {
    question: 'O que são Karma Points e como usar?',
    answer:
      'Karma Points (KP) são a moeda interna do LinkKarma. Você ganha KP contribuindo com a comunidade (15 KP por verificação aprovada, 3 KP por análise comunitária). Use KP para impulsionar suas vitrines (25 KP) ou destacá-las (100 KP), aumentando sua visibilidade.',
  },
  {
    question: 'Como funciona o sistema de segurança?',
    answer:
      'Utilizamos um sistema híbrido de três camadas: 1) IA multimodal para análise automática de evidências, 2) Verificação manual pelo divulgador em até 24h, 3) Verificação comunitária por usuários confiáveis (Trust Score >400). Isso garante máxima segurança contra fraudes.',
  },
  {
    question: 'A primeira vitrine é realmente gratuita?',
    answer:
      'Sim! Todo novo usuário recebe um bônus de boas-vindas e pode criar sua primeira vitrine gratuitamente, sem precisar acumular Créditos de Contribuição. Para vitrines adicionais, você precisa participar da comunidade seguindo o sistema de Prova de Contribuição.',
  },
  {
    question: 'Qual a diferença entre plano Básico e Pro?',
    answer:
      'Plano Básico (Grátis): 1 vitrine ativa, 1 imagem de capa. Plano Pro: até 5 vitrines ativas, galeria com 5 imagens, vídeo incorporado, salário mensal de Karma Points, limites maiores para verificação por IA e desconto na compra de KP.',
  },
  {
    question: 'Como funciona o Trust Score?',
    answer:
      'O Trust Score é uma pontuação de 0 a 1000 que reflete sua confiabilidade na plataforma. Aumenta com verificações aprovadas (+10), análises comunitárias corretas (+3), e diminui com tentativas de fraude (-50). Usuários com score >400 podem participar da verificação comunitária.',
  },
  {
    question: 'Posso usar qualquer link de referral?',
    answer:
      'Todos os links passam por verificação de segurança automática antes da publicação. Nossa IA verifica se o serviço é legítimo consultando múltiplas fontes (Twitter, Reddit, Reclame Aqui, Trustpilot). Links suspeitos ou fraudulentos são bloqueados automaticamente.',
  },
  {
    question: 'Vale a pena assinar o plano Pro?',
    answer:
      'O plano Pro por R$ 29/mês oferece excelente custo-benefício: você recebe 500 Karma Points mensais (equivalente a R$ 125 em impulsionamentos), pode ter até 10 vitrines ativas, galeria com 5 imagens, vídeo incorporado e 30 verificações IA por dia. Ideal para quem quer maximizar resultados.',
  },
];

export function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Perguntas Frequentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tire Suas <span className="text-blue-600">Dúvidas</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tudo o que você precisa saber sobre o LinkKarma
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {expandedIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>

              {expandedIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa equipe está pronta para ajudar você a começar no LinkKarma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contato@linkkarma.com.br"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entrar em Contato
              </a>
              <a
                href="/showcases"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ver Exemplos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
