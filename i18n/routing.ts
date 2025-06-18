// Define supported locales and defaults for next-intl v4 with Next.js 15

// Supported locales
export const locales = ['en-US', 'pt-BR'] as const;
export const defaultLocale = 'pt-BR';

// For TypeScript support
export type Locale = (typeof locales)[number];

// Export configuration for use in middleware and other parts of the app
export const routing = {
  locales,
  defaultLocale,
  // Do not fallback to default locale when a translation is missing
  // Instead, show the key name to identify missing translations
  fallbackLocale: null
};
