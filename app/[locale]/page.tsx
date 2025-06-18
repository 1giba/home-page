// Import React and Next.js modules
import * as React from 'react';

// Import internationalization tools
import { getTranslations } from 'next-intl/server';

// Using standard Next.js Link with locale support
// @ts-expect-error - Importação necessária do Next.js 15
import Link from 'next/link';

// Import page components individually
import HeroSection from './components/HeroSection';
import FeaturedPlatformsSection from './components/FeaturedPlatformsSection';

// Import additional sections that are used in the page
import SkillsSection from './components/SkillsSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';

// Using components for all sections of the page

// Generate metadata for this page (Next.js 15 metadata API)
export async function generateMetadata({ params }: { params: { locale: string } }) {
  // In Next.js 15, params needs to be resolved before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale; // Access locale after resolving params

  // Get translations from i18n files
  const t = await getTranslations('Home');

  // Build title with developer role
  const title = `Giba - ${t('description')}`;

  // Use the welcome message as description
  const description = t('welcome');

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
      locale: locale,
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
  // Resolve params before accessing its properties
  const resolvedParams = await Promise.resolve(params);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _locale = resolvedParams.locale; // Used to verify current language

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
        {/* Rendering each component individually with error handling */}
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

        <div>
          {(() => {
            try {
              console.log('Rendering FeaturedPlatformsSection');
              return <FeaturedPlatformsSection />;
            } catch (error) {
              console.error('Error rendering FeaturedPlatformsSection:', error);
              return <div className="p-8 bg-red-100">Error rendering FeaturedPlatformsSection</div>;
            }
          })()}
        </div>

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
