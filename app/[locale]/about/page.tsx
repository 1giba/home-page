import * as React from 'react';
import AboutSection from '../components/AboutSection';
import { getTranslations } from 'next-intl/server';
// @ts-expect-error - Importação necessária do Next.js 15
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // In Next.js 15, params should be accessed directly in async components
  // O locale é usado para gerar os metadados adequados
  const _locale = params.locale; // Prefixo com _ para indicar variável útil mas não utilizada diretamente
  
  // Get translations for the About namespace
  const t = await getTranslations('About');
  
  // Build title with the name suffix
  const title = `${t('title')} | Giba - Full Stack Developer`;
  const description = t('welcome');
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: '/images/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Giba - Full Stack Developer'
      }],
      locale: _locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-about.jpg']
    },
    alternates: {
      canonical: `/about`,
      languages: {
        'en-US': '/en-US/about',
        'pt-BR': '/pt-BR/about'
      }
    }
  };
}

// Server Component for the about page
export default async function AboutPage({ params }: { params: { locale: string } }) {
  // Debug: Log params for Next.js 15 locale access pattern
  console.log('About page params:', params);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = params.locale;

  // Access the translations (server-side) with explicit namespace
  const t = await getTranslations('About');

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
        <AboutSection />
      </div>
    </main>
  );
}
