import * as React from 'react';
import ContactSection from './components/ContactSection';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedLocale = resolvedParams.locale;
  
  const title = resolvedLocale === 'en-US' 
    ? 'Contact | Giba - Full Stack Developer' 
    : 'Contato | Giba - Desenvolvedor Full Stack';
    
  const description = resolvedLocale === 'en-US' 
    ? 'Get in touch with me for collaboration, projects, or questions' 
    : 'Entre em contato comigo para colaborações, projetos ou dúvidas';
  
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
      locale: resolvedLocale,
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
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
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
