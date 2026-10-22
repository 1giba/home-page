import { LOCALES, type Locale } from '@/i18n/locales'

/** Service page slugs, shared by both locales (SPEC §5.1, §8.3). */
export const SERVICE_IDS = ['fractional-cto', 'ai', 'advisory'] as const

export type ServiceId = (typeof SERVICE_IDS)[number]

/** getStaticPaths for pages that exist once per locale under src/pages/[lang]/. */
export function localeStaticPaths(): { params: { lang: Locale }; props: { locale: Locale } }[] {
  return LOCALES.map((lang) => ({ params: { lang }, props: { locale: lang } }))
}
