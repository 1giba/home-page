// Importações necessárias para o layout localizado
import * as React from 'react'; 
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Global styles are imported in the root layout only

// Define types for the layout props
type Props = {
  children: unknown;
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
  // Get translations for the Home namespace
  const t = await getTranslations('Home');
  
  // Resolve params.locale para evitar erro de API síncrona em contexto assíncrono
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  return {
    // Configure the base URL for resolving absolute URLs in metatags
    // Uses a static fallback when environment variable isn't available
    metadataBase: new URL('https://gibagibagiba.dev'),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

// Root layout for localized routes
export default async function LocaleLayout({ children, params }: Props) {
  // Resolve params before using its properties to avoid sync API error
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams.locale;
  
  // Validate if locale is supported
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);

  /**
   * Next.js 15 App Router handles layouts as nested components
   * To avoid hydration mismatches, we DON'T render html/body tags here
   * Root layout already provides those tags
   */
  // Utilizando o NextIntlClientProvider diretamente agora que as tipagens estão corrigidas
  return <NextIntlClientProvider locale={locale} messages={messages}>{children}</NextIntlClientProvider>;
}
