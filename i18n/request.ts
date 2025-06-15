import {notFound} from 'next/navigation';
import {routing} from './routing';

/**
 * Function that loads messages for a specific locale
 */
async function getMessages(locale: string) {
  try {
    console.log(`Loading messages for locale: ${locale}`);
    return (await import(`./locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}:`, error);
    return {};
  }
}

/**
 * Configuration function for next-intl, compatible with Next.js 15
 * Used by middleware and server components
 */
export default async function getRequestConfig(context: {locale: string}) {
  try {
    const locale = context?.locale;
    
    // Default to pt-BR if locale is not provided (defensive coding)
    const safeLocale = locale || 'pt-BR';
    
    // Validate that the locale is supported
    if (!routing.locales.includes(safeLocale as any)) {
      console.warn(`Unsupported locale: ${safeLocale}, falling back to default`);
      return {
        locale: routing.defaultLocale,
        messages: await getMessages(routing.defaultLocale),
        timeZone: 'America/Sao_Paulo'
      };
    }
    
    // Return config with locale, messages, and timeZone
    return {
      locale: safeLocale,
      messages: await getMessages(safeLocale),
      timeZone: 'America/Sao_Paulo'
    };
  } catch (error) {
    console.error('Error in getRequestConfig:', error);
    // Fallback to default locale in case of errors
    return {
      locale: routing.defaultLocale,
      messages: await getMessages(routing.defaultLocale),
      timeZone: 'America/Sao_Paulo'
    };
  }
}
