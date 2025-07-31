'use client';

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LinkKarma",
    "description": "Plataforma de referrals com IA que transforma links em vitrines profissionais. Sistema de Prova de Contribuição, Karma Points e verificação de segurança.",
    "url": "https://linkkarma.com.br",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
      "description": "Primeira vitrine gratuita"
    },
    "featureList": [
      "Criação automática de vitrines com IA",
      "Sistema de Prova de Contribuição",
      "Karma Points e gamificação",
      "Verificação de segurança anti-fraude",
      "Trust Score dinâmico",
      "Verificação comunitária"
    ],
    "screenshot": "https://linkkarma.com.br/screenshot.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "author": {
      "@type": "Organization",
      "name": "LinkKarma Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LinkKarma",
      "logo": {
        "@type": "ImageObject",
        "url": "https://linkkarma.com.br/logo.png"
      }
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LinkKarma",
    "url": "https://linkkarma.com.br",
    "logo": "https://linkkarma.com.br/logo.png",
    "description": "A primeira plataforma de referrals com IA, sistema de Prova de Contribuição e verificação de segurança.",
    "foundingDate": "2024",
    "sameAs": [
      "https://twitter.com/linkkarma",
      "https://linkedin.com/company/linkkarma"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contato@linkkarma.com.br"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LinkKarma",
    "url": "https://linkkarma.com.br",
    "description": "Transforme seus links de referral em vitrines profissionais com IA. Sistema de Prova de Contribuição, Karma Points e verificação de segurança.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://linkkarma.com.br/showcases?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que é o sistema de Prova de Contribuição?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "É o coração do LinkKarma. Para postar uma vitrine, você precisa contribuir com a comunidade usando links de referral ou ajudando na verificação comunitária. Isso garante qualidade e elimina spam."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona a criação de vitrines com IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nossa IA analisa automaticamente seu link de referral, extrai informações do serviço e cria uma vitrine profissional com título, descrição, vantagens, FAQ e guia passo-a-passo. Você pode personalizar tudo antes de publicar."
        }
      },
      {
        "@type": "Question",
        "name": "O que são Karma Points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karma Points (KP) são a moeda interna do LinkKarma. Você ganha KP contribuindo com a comunidade e pode usá-los para impulsionar suas vitrines, destacá-las ou acessar recursos premium."
        }
      },
      {
        "@type": "Question",
        "name": "Como funciona o sistema de segurança?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utilizamos um sistema híbrido de três camadas: IA multimodal para análise automática, verificação manual pelo divulgador em 24h, e verificação comunitária por usuários confiáveis. Isso garante máxima segurança contra fraudes."
        }
      },
      {
        "@type": "Question",
        "name": "A primeira vitrine é realmente gratuita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Todo novo usuário pode criar sua primeira vitrine gratuitamente como bônus de boas-vindas. Para vitrines adicionais, você precisa acumular Créditos de Contribuição participando da comunidade."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
