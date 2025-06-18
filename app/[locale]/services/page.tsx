import * as React from 'react';
import ServicesSection from '../components/ServicesSection';
import { getTranslations } from 'next-intl/server';
// @ts-expect-error - Importação necessária do Next.js 15
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // O locale é usado para os metadados e alterações de idioma
  const _locale = params.locale; // Prefixado com _ para indicar uso indireto
  
  // Get translations for the Services namespace
  const t = await getTranslations('Services');
  
  // Build title with the name suffix
  const title = `${t('title')} | Giba - Full Stack Developer`;
  const description = t('description');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: '/images/og-image-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Giba - Services'
      }],
      locale: _locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-services.jpg']
    },
    alternates: {
      canonical: `/services`,
      languages: {
        'en-US': '/en-US/services',
        'pt-BR': '/pt-BR/services'
      }
    }
  };
}

// Server Component for the services page
export default async function ServicesPage({ params }: { params: { locale: string } }) {
  // Debug: Log params for Next.js 15 locale access pattern
  console.log('Services page params:', params);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = params.locale;
  
  // Access the translations (server-side) with explicit namespace
  const t = await getTranslations('Services');
  
  return (
    <main className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
        <div className="mb-6">
          <Link 
            href="/"
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            ← {t('backToHome')}
          </Link>
        </div>
        <ServicesSection />
      </div>
    </main>
  );
}
