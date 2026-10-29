import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  LANG_TAG,
  LOCALE_NAME,
  LOCALES,
  OG_LOCALE,
  X_DEFAULT_LOCALE,
  isLocale,
} from '@/i18n/locales'

describe('locales', () => {
  it('supports exactly pt-br and en, with pt-br as the default (SPEC §8.1)', () => {
    expect(LOCALES).toEqual(['pt-br', 'en'])
    expect(DEFAULT_LOCALE).toBe('pt-br')
  })

  it('maps route segments to HTML language tags (SPEC §8.2, §8.4)', () => {
    expect(LANG_TAG).toEqual({ 'pt-br': 'pt-BR', en: 'en' })
  })

  it('maps route segments to Open Graph locales (SPEC §8.4)', () => {
    expect(OG_LOCALE).toEqual({ 'pt-br': 'pt_BR', en: 'en_US' })
  })

  it('points x-default at English (SPEC §8.4)', () => {
    expect(X_DEFAULT_LOCALE).toBe('en')
  })

  it('names each language in its own language for the switcher (SPEC §8.4)', () => {
    expect(LOCALE_NAME).toEqual({ 'pt-br': 'Português', en: 'English' })
  })
})

describe('isLocale', () => {
  it('accepts the route segments', () => {
    expect(isLocale('pt-br')).toBe(true)
    expect(isLocale('en')).toBe(true)
  })

  it('rejects language tags and other casings: URLs are lowercase segments only', () => {
    for (const v of ['pt-BR', 'PT-BR', 'EN', 'En', 'pt_BR', 'pt'])
      expect(isLocale(v), v).toBe(false)
  })

  it('rejects unsupported locales, empty strings and padded values', () => {
    for (const v of ['es', 'en-US', 'english', '', ' en', 'en/', '/en']) {
      expect(isLocale(v), JSON.stringify(v)).toBe(false)
    }
  })

  it('rejects object prototype keys', () => {
    for (const v of ['constructor', 'toString', '__proto__', 'hasOwnProperty']) {
      expect(isLocale(v), v).toBe(false)
    }
  })
})
