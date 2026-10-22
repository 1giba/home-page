import { describe, expect, it } from 'vitest'
import config from '../../astro.config.mjs'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales'

describe('astro.config i18n', () => {
  it('uses the locales and default from src/i18n/locales', () => {
    expect(config.i18n?.locales).toEqual([...LOCALES])
    expect(config.i18n?.defaultLocale).toBe(DEFAULT_LOCALE)
  })

  it('prefixes every locale and leaves the root redirect to src/config/redirects (SPEC §8.2)', () => {
    expect(config.i18n?.routing).toMatchObject({
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    })
  })
})
