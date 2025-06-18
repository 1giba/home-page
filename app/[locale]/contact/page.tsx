import * as React from 'react';
import ContactSection from './components/ContactSection';
import { getTranslations } from 'next-intl/server';
// @ts-expect-error - Importação necessária do Next.js 15
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // O locale é usado para a configuração de metadados e alternativos
  const _locale = params.locale; // Prefixado com _ para indicar uso indireto
  
  // Get translations for the Contact namespace
  const t = await getTranslations('Contact');
  
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
        url: '/images/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Giba - Contact'
      }],
      locale: _locale,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image-contact.jpg']
    },
    alternates: {
      canonical: `/contact`,
      languages: {
        'en-US': '/en-US/contact',
        'pt-BR': '/pt-BR/contact'
      }
    }
  };
}

// Server Component for the contact page
export default async function ContactPage({ params }: { params: { locale: string } }) {
  // Debug: Log params for Next.js 15 locale access pattern
  console.log('Contact page params:', params);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const locale = params.locale;
  
  // Access the translations (server-side) with explicit namespace
  const t = await getTranslations('Contact');
  
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
        <ContactSection />
      </div>
    </main>
  );
}
