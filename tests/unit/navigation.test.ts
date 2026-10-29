import { describe, expect, it } from 'vitest'
import { ariaCurrent, mainNav } from '@/lib/navigation'

describe('mainNav', () => {
  it('lists Services, About and Contact in the locale, in order (SPEC §6.1)', () => {
    expect(mainNav('en', false)).toEqual([
      { key: 'nav.services', href: '/en/services/' },
      { key: 'nav.about', href: '/en/about/' },
      { key: 'nav.contact', href: '/en/contact/' },
    ])
  })

  it('adds Work after Services only when work is published (SPEC §4.5)', () => {
    expect(mainNav('pt-br', true).map((item) => item.href)).toEqual([
      '/pt-br/services/',
      '/pt-br/work/',
      '/pt-br/about/',
      '/pt-br/contact/',
    ])
  })
})

describe('ariaCurrent', () => {
  it('returns "page" for the exact page', () => {
    expect(ariaCurrent('/en/about/', '/en/about/')).toBe('page')
  })

  it('returns "true" for a page inside the item’s section', () => {
    expect(ariaCurrent('/en/services/ai/', '/en/services/')).toBe('true')
  })

  it('returns undefined elsewhere, including look-alike prefixes', () => {
    expect(ariaCurrent('/en/', '/en/about/')).toBeUndefined()
    expect(ariaCurrent('/en/services-old/', '/en/services/')).toBeUndefined()
  })

  it('never treats a locale home as a section of every page', () => {
    expect(ariaCurrent('/en/about/', '/en/')).toBeUndefined()
    expect(ariaCurrent('/en/', '/en/')).toBe('page')
  })

  it('treats a missing trailing slash on the current path as the same page', () => {
    expect(ariaCurrent('/en/about', '/en/about/')).toBe('page')
  })
})
