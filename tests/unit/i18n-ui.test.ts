import { afterEach, describe, expect, it } from 'vitest'
import { LOCALES } from '@/i18n/locales'
import { formatDate, ui, useTranslations } from '@/i18n/ui'

describe('ui dictionaries', () => {
  it('have identical key sets in every locale (SPEC §8.4)', () => {
    expect(Object.keys(ui['pt-br']).sort()).toEqual(Object.keys(ui.en).sort())
  })

  it('have no empty or whitespace-only values', () => {
    for (const locale of LOCALES) {
      for (const [key, value] of Object.entries(ui[locale])) {
        expect(value.trim(), `${locale}:${key}`).not.toBe('')
      }
    }
  })

  it('carry the copy the spec fixes for the skip link and primary CTA (SPEC §6.1, §6.2)', () => {
    expect(ui['pt-br'].skip).toBe('Pular para o conteúdo')
    expect(ui.en.skip).toBe('Skip to content')
    expect(ui['pt-br']['cta.book']).toBe('Agendar uma conversa')
    expect(ui.en['cta.book']).toBe('Book an intro call')
  })
})

describe('useTranslations', () => {
  it('returns the string for the requested locale', () => {
    expect(useTranslations('en')('skip')).toBe('Skip to content')
    expect(useTranslations('pt-br')('skip')).toBe('Pular para o conteúdo')
  })
})

describe('formatDate', () => {
  const originalTz = process.env.TZ
  afterEach(() => {
    process.env.TZ = originalTz
  })

  it('formats long dates per locale', () => {
    expect(formatDate('pt-br', new Date('2025-07-24T12:00:00Z'))).toBe('24 de julho de 2025')
    expect(formatDate('en', new Date('2025-07-24T12:00:00Z'))).toBe('July 24, 2025')
  })

  it('does not shift date-only values (parsed as UTC midnight) in a UTC-3 environment', () => {
    process.env.TZ = 'America/Sao_Paulo'
    expect(formatDate('pt-br', new Date('2025-07-24'))).toBe('24 de julho de 2025')
    expect(formatDate('en', new Date('2025-07-24'))).toBe('July 24, 2025')
  })
})
