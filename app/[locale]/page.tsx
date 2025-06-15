// Import React and Next.js modules
import * as React from 'react';
import { Metadata } from 'next';

// Import internationalization tools
import { getTranslations } from 'next-intl/server';
// Using standard Next.js Link with locale support
import Link from 'next/link';
import { routing } from '@/i18n/routing';

// Import error boundary wrapper
import ErrorBoundaryWrapper from './components/ErrorBoundaryWrapper';

// Import page components individually to isolate potential issues
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ServicesSection from './components/ServicesSection';

// Debug: Log all component imports to check for undefined
console.log('Component import check:', {
  HeroSection,
  AboutSection,
  SkillsSection,
  ServicesSection
});
// Removendo a importação problemática e implementando o componente inline

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // In Next.js 15, params must be awaited before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const resolvedLocale = resolvedParams.locale;

  const title = resolvedLocale === 'en-US'
    ? 'Giba - Full Stack Developer'
    : 'Giba - Desenvolvedor Full Stack';

  const description = resolvedLocale === 'en-US'
    ? 'Full Stack Developer specialized in modern web applications, cloud solutions, and digital transformation'
    : 'Desenvolvedor Full Stack especializado em aplicações web modernas, soluções em nuvem e transformação digital';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: '/images/og-image.jpg',
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
      images: ['/images/og-image.jpg']
    },
    alternates: {
      canonical: `/`,
      languages: {
        'en-US': '/en-US',
        'pt-BR': '/pt-BR'
      }
    }
  };
}

// Server Component for the home page
export default async function Page({ params }: { params: { locale: string } }) {
  // In Next.js 15, params must be awaited before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;

  // We'll handle locale in middleware instead
  // unstable_setRequestLocale is no longer available in next-intl 4.1.0

  // Access the translations (server-side) with explicit namespace
  const t = await getTranslations('Home');
  const nav = await getTranslations('Navigation');

  return (
    <>
      <header className="sr-only">
        <h1>Giba - {t('title')}</h1>
        <nav>
          <ul>
            <li>
              <Link href="/about">{nav('about')}</Link>
            </li>
            <li>
              <Link href="/services">{nav('services')}</Link>
            </li>
            <li>
              <Link href="/contact">{nav('contact')}</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col min-h-screen">
        {/* Renderizando cada componente individualmente com tratamento de erro */}
        <div>
          {(() => {
            try {
              console.log('Rendering HeroSection');
              return <HeroSection />;
            } catch (error) {
              console.error('Error rendering HeroSection:', error);
              return <div className="p-8 bg-red-100">Error rendering HeroSection</div>;
            }
          })()}
        </div>
        
        <div>
          {(() => {
            try {
              console.log('Rendering AboutSection');
              return <AboutSection />;
            } catch (error) {
              console.error('Error rendering AboutSection:', error);
              return <div className="p-8 bg-red-100">Error rendering AboutSection</div>;
            }
          })()}
        </div>
        
        <div>
          {(() => {
            try {
              console.log('Rendering SkillsSection');
              return <SkillsSection />;
            } catch (error) {
              console.error('Error rendering SkillsSection:', error);
              return <div className="p-8 bg-red-100">Error rendering SkillsSection</div>;
            }
          })()}
        </div>
        
        <div>
          {(() => {
            try {
              console.log('Rendering ServicesSection');
              return <ServicesSection />;
            } catch (error) {
              console.error('Error rendering ServicesSection:', error);
              return <div className="p-8 bg-red-100">Error rendering ServicesSection</div>;
            }
          })()}
        </div>
        
        {/* Implementação embutida da seção de plataformas para evitar problemas de renderização */}
        <section id="featured-platforms" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-4 rounded-full bg-green-100 text-green-800 font-medium mb-4">
                Featured Platforms
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platforms I've Worked With</h2>
              <p className="max-w-2xl mx-auto text-gray-600">Check out some of the platforms I've collaborated with</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Platform items */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-40 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-800">Jarvi</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-40 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-800">HelloFatima</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="h-40 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-gray-800">Tray</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('exploreMore')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/about"
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#3e8e41] transition-colors"
              >
                {nav('about')}
              </Link>
              <Link
                href="/services"
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#3e8e41] transition-colors"
              >
                {nav('services')}
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2 bg-[#4CAF50] text-white rounded-md hover:bg-[#3e8e41] transition-colors"
              >
                {nav('contact')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
