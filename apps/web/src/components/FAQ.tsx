'use client';

import { useIntl } from '@linkkarma/intl';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function FAQ() {
  const { t, language } = useIntl();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // FAQ questions based on language
  const faqQuestions =
    language === 'en'
      ? [
          {
            question: 'What is the Proof of Contribution system?',
            answer:
              "It's the heart of LinkKarma. To post a showcase, you need to contribute to the community by using referral links or helping with community verification. This ensures quality and eliminates spam. You need 3 Contribution Credits to unlock a new showcase slot.",
          },
          {
            question: 'How does AI showcase creation work?',
            answer:
              'Our AI automatically analyzes your referral link, extracts service information and creates a professional showcase with title, description, advantages, FAQ and step-by-step guide. We use Google Gemini AI to ensure high-quality content. You can customize everything before publishing.',
          },
          {
            question: 'What are Karma Points and how to use them?',
            answer:
              "Karma Points (KP) are LinkKarma's internal currency. You earn KP by contributing to the community (15 KP per referral use, 10 KP per verification). Use KP to boost your showcases (25 KP = 24h at the top) or highlight them (100 KP = 7 days featured).",
          },
          {
            question: 'How does security verification work?',
            answer:
              'We have a hybrid system: our AI does the first analysis checking sources like Trustpilot, Reclame Aqui and app stores. Then, the community can do additional verifications. Showcases only go public after approval in the security system.',
          },
          {
            question: 'Can I cancel my subscription at any time?',
            answer:
              'Yes! You can cancel your Pro subscription at any time. Your showcases will remain active until the end of the paid period, then return to free plan limitations.',
          },
          {
            question: 'How does the anti-spam system work?',
            answer:
              'The Proof of Contribution system is our main anti-spam mechanism. Additionally, we have mandatory security verification, community moderation and daily action limits to prevent abusive behavior.',
          },
        ]
      : [
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
              'Karma Points (KP) são a moeda interna do LinkKarma. Você ganha KP contribuindo com a comunidade (15 KP por uso de referral, 10 KP por verificação). Use KP para impulsionar suas vitrines (25 KP = 24h no topo) ou destacá-las (100 KP = 7 dias em destaque).',
          },
          {
            question: 'Como funciona a verificação de segurança?',
            answer:
              'Temos um sistema híbrido: nossa IA faz a primeira análise verificando fontes como Trustpilot, Reclame Aqui e app stores. Depois, a comunidade pode fazer verificações adicionais. Vitrines só ficam públicas após aprovação no sistema de segurança.',
          },
          {
            question: 'Posso cancelar minha assinatura a qualquer momento?',
            answer:
              'Sim! Você pode cancelar sua assinatura Pro a qualquer momento. Suas vitrines continuarão ativas até o final do período pago, depois voltarão para as limitações do plano gratuito.',
          },
          {
            question: 'Como funciona o sistema anti-spam?',
            answer:
              'O sistema de Prova de Contribuição é nosso principal mecanismo anti-spam. Além disso, temos verificação de segurança obrigatória, moderação comunitária e limites diários de ações para evitar comportamentos abusivos.',
          },
        ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t('frontend.faq.badge')}
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            dangerouslySetInnerHTML={{ __html: t('frontend.faq.subtitle') }}
          ></h2>
          <p className="text-xl text-gray-600">
            {t('frontend.faq.description')}
          </p>
        </div>

        <div className="space-y-4">
          {faqQuestions.map((faq, index: number) => (
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
              {t('frontend.faq.contact.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('frontend.faq.contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contato@linkkarma.com.br"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('frontend.faq.contact.email')}
              </a>
              <Link
                href="/showcases"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('frontend.faq.contact.examples')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
