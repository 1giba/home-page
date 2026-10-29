// Compile-time assertions, checked by `astro check` (not run by Vitest).
// Each @ts-expect-error fails the type check if the line it guards ever becomes valid.
import type { Locale } from '@/i18n/locales'
import { useTranslations, type UiKey } from '@/i18n/ui'

// @ts-expect-error unknown UI keys are rejected
export const unknownKey: UiKey = 'nav.does-not-exist'

// @ts-expect-error useTranslations only accepts known keys
export const unknownLookup = useTranslations('en')('nav.does-not-exist')

// @ts-expect-error language tags are not route locales
export const tagAsLocale: Locale = 'pt-BR'
