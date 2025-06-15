import * as React from 'react';
import ServicesSection from '../components/ServicesSection';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedLocale = resolvedParams.locale;
  
  const title = resolvedLocale === 'en-US' 
    ? 'Services | Giba - Full Stack Developer' 
    : 'Serviços | Giba - Desenvolvedor Full Stack';
    
  const description = resolvedLocale === 'en-US' 
    ? 'Explore my professional services including web development, cloud solutions, and digital transformation' 
    : 'Explore meus serviços profissionais, incluindo desenvolvimento web, soluções em nuvem e transformação digital';
  
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
      locale: resolvedLocale,
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
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
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
