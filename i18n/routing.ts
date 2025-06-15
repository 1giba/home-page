import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en-US', 'pt-BR'] as string[],
  // Used when no locale matches
  defaultLocale: 'pt-BR'
});

export type Locale = (typeof routing.locales)[number];
