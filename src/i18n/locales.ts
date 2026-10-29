// Single source of truth for supported locales. Route segments are lowercase (`pt-br`, `en`);
// HTML `lang`/`hreflang` use BCP 47 tags (`pt-BR`, `en`). Never derive one from the other by string
// manipulation — always go through these maps.

export const LOCALES = ['pt-br', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt-br'

/** Locale that `hreflang="x-default"` points to (SPEC §8.4). */
export const X_DEFAULT_LOCALE: Locale = 'en'

export const LANG_TAG = { 'pt-br': 'pt-BR', en: 'en' } as const satisfies Record<Locale, string>

export type LangTag = (typeof LANG_TAG)[Locale]

export const OG_LOCALE = { 'pt-br': 'pt_BR', en: 'en_US' } as const satisfies Record<Locale, string>

/** Each language named in itself, as the language switcher shows it. */
export const LOCALE_NAME = { 'pt-br': 'Português', en: 'English' } as const satisfies Record<
  Locale,
  string
>

/** The switcher's visible abbreviation and the full name it gives assistive technology. */
export const LOCALE_SHORT = { 'pt-br': 'PT', en: 'EN' } as const satisfies Record<Locale, string>
export const LOCALE_FULL_NAME = {
  'pt-br': 'Português (Brasil)',
  en: 'English',
} as const satisfies Record<Locale, string>

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
