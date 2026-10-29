import { LOCALES, type Locale } from '@/i18n/locales'

/** Service page slugs, shared by both locales (SPEC §5.1, §8.3). */
export const SERVICE_IDS = ['fractional-cto', 'ai', 'advisory'] as const

export type ServiceId = (typeof SERVICE_IDS)[number]

/**
 * Unlocalized paths of the indexable pages built in every locale (SPEC §5.1). Work pages are
 * added from published content; thanks and the 404 are noindex and never listed (sitemap.xml).
 */
export const INDEXABLE_PATHS = [
  '/',
  '/services/',
  ...SERVICE_IDS.map((id) => `/services/${id}/`),
  '/about/',
  '/contact/',
  '/privacy/',
] as const

/** getStaticPaths for pages that exist once per locale under src/pages/[lang]/. */
export function localeStaticPaths(): { params: { lang: Locale }; props: { locale: Locale } }[] {
  return LOCALES.map((lang) => ({ params: { lang }, props: { locale: lang } }))
}
