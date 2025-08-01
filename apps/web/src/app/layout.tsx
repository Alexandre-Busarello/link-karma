import AuthProvider from '../components/AuthProvider';
import { ConditionalNavigation } from '../components/ConditionalNavigation';
import { ScrollToTop } from '../components/ScrollToTop';
import { StructuredData } from '../components/StructuredData';
import './global.css';

export const metadata = {
  title:
    'LinkKarma - Plataforma de Referrals com IA | Ganhe Mais com Suas Indicações',
  description:
    'Transforme seus links de referral em vitrines profissionais com IA. Sistema de Prova de Contribuição, Karma Points e verificação de segurança. Aumente suas conversões em até 300%.',
  keywords:
    'referral, indicação, afiliados, marketing digital, links de referral, vitrines, IA, inteligência artificial, karma points, prova de contribuição, segurança, verificação, monetização',
  authors: [{ name: 'LinkKarma Team' }],
  creator: 'LinkKarma',
  publisher: 'LinkKarma',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://linkkarma.com.br',
    siteName: 'LinkKarma',
    title:
      'LinkKarma - Plataforma de Referrals com IA | Ganhe Mais com Suas Indicações',
    description:
      'Transforme seus links de referral em vitrines profissionais com IA. Sistema de Prova de Contribuição, Karma Points e verificação de segurança.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkKarma - Plataforma de Referrals com IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkKarma - Plataforma de Referrals com IA',
    description:
      'Transforme seus links de referral em vitrines profissionais com IA. Aumente suas conversões em até 300%.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://linkkarma.com.br',
    languages: {
      pt: '/pt',
      en: '/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <StructuredData />
      </head>
      <body>
        <AuthProvider>
          <ScrollToTop />
          <ConditionalNavigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
