import { describe, expect, it } from 'vitest'
import { absoluteUrl, alternates, localizedPath, stripLocale, switchLocalePath } from '@/i18n/paths'

describe('localizedPath', () => {
  it('prefixes the locale and enforces the trailing slash (SPEC §8.2)', () => {
    expect(localizedPath('en', '/services/ai')).toBe('/en/services/ai/')
    expect(localizedPath('en', '/services/ai/')).toBe('/en/services/ai/')
    expect(localizedPath('pt-br', '/about')).toBe('/pt-br/about/')
  })

  it('maps the root and the empty path to the locale home', () => {
    expect(localizedPath('pt-br', '/')).toBe('/pt-br/')
    expect(localizedPath('en', '')).toBe('/en/')
  })

  it('accepts a path without a leading slash', () => {
    expect(localizedPath('en', 'about')).toBe('/en/about/')
  })

  it('collapses repeated interior slashes', () => {
    expect(localizedPath('en', '/about//team///')).toBe('/en/about/team/')
  })

  it('keeps query strings and fragments after the trailing slash', () => {
    expect(localizedPath('pt-br', '/contact?service=ai')).toBe('/pt-br/contact/?service=ai')
    expect(localizedPath('en', '/contact/#form')).toBe('/en/contact/#form')
    expect(localizedPath('en', '/contact?service=ai#form')).toBe('/en/contact/?service=ai#form')
    expect(localizedPath('en', '/?x=1')).toBe('/en/?x=1')
  })

  it('refuses a path that already carries a locale, instead of double-prefixing', () => {
    expect(() => localizedPath('pt-br', '/en/about/')).toThrow(/already localized/)
    expect(() => localizedPath('en', '/en')).toThrow(/already localized/)
    expect(() => localizedPath('en', 'pt-br/about')).toThrow(/already localized/)
  })

  it('does not mistake look-alike segments for locales', () => {
    expect(localizedPath('en', '/english/')).toBe('/en/english/')
    expect(localizedPath('en', '/EN/')).toBe('/en/EN/')
  })

  it('refuses absolute and protocol-relative URLs', () => {
    expect(() => localizedPath('en', 'https://example.com/a')).toThrow(/internal path/)
    expect(() => localizedPath('en', '//example.com/a')).toThrow(/internal path/)
    expect(() => localizedPath('en', 'mailto:contato@codehappy.com.br')).toThrow(/internal path/)
  })
})

describe('stripLocale', () => {
  it('splits a localized pathname into locale and path', () => {
    expect(stripLocale('/en/about/')).toEqual({ locale: 'en', path: '/about/' })
    expect(stripLocale('/pt-br/services/ai/')).toEqual({ locale: 'pt-br', path: '/services/ai/' })
  })

  it('treats the locale home with or without trailing slash as the root', () => {
    expect(stripLocale('/en/')).toEqual({ locale: 'en', path: '/' })
    expect(stripLocale('/en')).toEqual({ locale: 'en', path: '/' })
  })

  it('returns a null locale and the unchanged path for unsupported prefixes', () => {
    expect(stripLocale('/es/about/')).toEqual({ locale: null, path: '/es/about/' })
    expect(stripLocale('/pt-BR/')).toEqual({ locale: null, path: '/pt-BR/' })
    expect(stripLocale('/EN/about/')).toEqual({ locale: null, path: '/EN/about/' })
    expect(stripLocale('/english/')).toEqual({ locale: null, path: '/english/' })
    expect(stripLocale('/')).toEqual({ locale: null, path: '/' })
  })
})

describe('switchLocalePath', () => {
  it('switches to the same page in the other locale', () => {
    expect(switchLocalePath('/pt-br/services/ai/', 'en')).toBe('/en/services/ai/')
    expect(switchLocalePath('/en/services/ai/', 'pt-br')).toBe('/pt-br/services/ai/')
  })

  it('works on non-indexed pages such as the contact confirmation', () => {
    expect(switchLocalePath('/pt-br/contact/thanks/', 'en')).toBe('/en/contact/thanks/')
  })

  it('switches between locale homes, with or without trailing slash', () => {
    expect(switchLocalePath('/en/', 'pt-br')).toBe('/pt-br/')
    expect(switchLocalePath('/en', 'pt-br')).toBe('/pt-br/')
  })

  it('normalizes a missing trailing slash', () => {
    expect(switchLocalePath('/en/about', 'pt-br')).toBe('/pt-br/about/')
  })

  it('returns the same page when the target is the current locale', () => {
    expect(switchLocalePath('/en/about/', 'en')).toBe('/en/about/')
  })

  it('falls back to the target home for unlocalized or unsupported paths', () => {
    expect(switchLocalePath('/unknown', 'en')).toBe('/en/')
    expect(switchLocalePath('/es/about/', 'en')).toBe('/en/')
    expect(switchLocalePath('/', 'pt-br')).toBe('/pt-br/')
  })
})

describe('absoluteUrl', () => {
  it('resolves an internal path against the canonical origin', () => {
    expect(absoluteUrl('/en/about/')).toBe('https://codehappy.com.br/en/about/')
    expect(absoluteUrl('/')).toBe('https://codehappy.com.br/')
  })

  it('refuses anything that is not a root-relative path', () => {
    expect(() => absoluteUrl('en/about/')).toThrow(/root-relative/)
    expect(() => absoluteUrl('//example.com/')).toThrow(/root-relative/)
    expect(() => absoluteUrl('https://example.com/')).toThrow(/root-relative/)
  })
})

describe('alternates', () => {
  it('lists pt-BR, en and x-default (→ en) as absolute URLs (SPEC §8.4)', () => {
    expect(alternates('/about/')).toEqual([
      { hreflang: 'pt-BR', href: 'https://codehappy.com.br/pt-br/about/' },
      { hreflang: 'en', href: 'https://codehappy.com.br/en/about/' },
      { hreflang: 'x-default', href: 'https://codehappy.com.br/en/about/' },
    ])
  })

  it('covers the home page', () => {
    expect(alternates('/').map((a) => a.href)).toEqual([
      'https://codehappy.com.br/pt-br/',
      'https://codehappy.com.br/en/',
      'https://codehappy.com.br/en/',
    ])
  })

  it('refuses an already localized path', () => {
    expect(() => alternates('/en/about/')).toThrow(/already localized/)
  })
})
