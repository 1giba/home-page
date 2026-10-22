import { LANG_TAG, type Locale } from './locales'

// UI strings, flat-keyed. pt-BR is the reference: `UiKey` is derived from it, and the English
// dictionary is typed `Record<UiKey, string>`, so a missing or extra key is a type error.
// Add keys in pairs, only when a component uses them.

const ptBR = {
  skip: 'Pular para o conteúdo',
  'lang.label': 'Idioma',
  'cta.book': 'Agendar uma conversa',
} as const

export type UiKey = keyof typeof ptBR

const en: Record<UiKey, string> = {
  skip: 'Skip to content',
  'lang.label': 'Language',
  'cta.book': 'Book an intro call',
}

export const ui: Record<Locale, Record<UiKey, string>> = { 'pt-br': ptBR, en }

export function useTranslations(locale: Locale): (key: UiKey) => string {
  return (key) => ui[locale][key]
}

/**
 * Long date in the page locale. Formatted in UTC because content dates are date-only values
 * (`2025-07-24` parses as UTC midnight); formatting in the build machine's zone would show
 * the previous day anywhere west of UTC, including Brazil.
 */
export function formatDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(LANG_TAG[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(
    date
  )
}
