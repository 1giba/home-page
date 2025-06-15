import * as React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Global styles are imported in the root layout only

// Define types for the layout props
type Props = {
  children: React.JSX.Element;
  params: { locale: string };
};

// Load messages for a specific locale
async function getMessages(locale: string) {
  try {
    console.log(`Loading messages for locale: ${locale}`);
    const messages = (await import(`@/i18n/locales/${locale}.json`)).default;
    console.log(`Successfully loaded ${locale} messages`);
    return messages;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {};
  }
}

// Metadata generator for the layout
export async function generateMetadata(
  { params }: { params: { locale: string } }
) {
  // In Next.js 15, we must await params before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  return {
    title: locale === 'en-US' ? 'My Portfolio' : 'Meu Portfólio',
    description: locale === 'en-US' ? 
      'Professional portfolio showcasing my work and skills' : 
      'Portfólio profissional mostrando meu trabalho e habilidades',
  };
}

// Root layout for localized routes
export default async function LocaleLayout({ children, params }: Props) {
  // In Next.js 15, params must be awaited before accessing properties
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  // Redirect to 404 if locale is not supported
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  
  // Load messages for the locale
  const messages = await getMessages(locale);

  /**
   * Next.js 15 App Router handles layouts as nested components
   * To avoid hydration mismatches, we DON'T render html/body tags here
   * Root layout already provides those tags
   */
  return (
    <NextIntlClientProvider locale={locale} messages={messages} children={children} />
  );
}
