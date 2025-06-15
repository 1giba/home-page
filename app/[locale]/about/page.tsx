import * as React from 'react';
import AboutSection from '../components/AboutSection';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedLocale = resolvedParams.locale;
  
  const title = resolvedLocale === 'en-US' 
    ? 'About Me | Giba - Full Stack Developer' 
    : 'Sobre Mim | Giba - Desenvolvedor Full Stack';
    
  const description = resolvedLocale === 'en-US' 
    ? 'Learn more about my experience, skills, and journey as a Full Stack Developer' 
    : 'Saiba mais sobre minha experiência, habilidades e trajetória como Desenvolvedor Full Stack';
  
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
      locale: resolvedLocale,
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
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
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
