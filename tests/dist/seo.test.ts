import { describe, expect, it } from 'vitest'
import type { HTMLElement } from 'node-html-parser'
import {
  assertDistBuilt,
  isLocalized,
  isRedirectStub,
  listHtmlFiles,
  readHtml,
  urlPathFor,
} from './helpers'

const SITE = 'https://codehappy.com.br'

const meta = (doc: HTMLElement, attr: 'name' | 'property', key: string) =>
  doc.querySelector(`meta[${attr}="${key}"]`)?.getAttribute('content')

const isNoindex = (doc: HTMLElement) => meta(doc, 'name', 'robots')?.includes('noindex') ?? false

function alternatesOf(doc: HTMLElement): Record<string, string> {
  return Object.fromEntries(
    doc
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .map((l) => [l.getAttribute('hreflang')!, l.getAttribute('href')!])
  )
}

const pages = () => listHtmlFiles().filter((f) => !isRedirectStub(f))
const indexable = () => pages().filter((f) => isLocalized(f) && !isNoindex(readHtml(f)))

describe('SEO head on indexable localized pages (SPEC §11)', () => {
  it('covers the expected pages', () => {
    assertDistBuilt()
    // 9 indexable pages per locale: home, services, 3 services, about, contact, privacy, terms.
    expect(indexable()).toHaveLength(18)
  })

  it('has exactly one <title> per page, unique across the site', () => {
    const titles = indexable().map((f) => {
      const all = readHtml(f).querySelectorAll('title')
      expect(all, f).toHaveLength(1)
      return all[0].text.trim()
    })
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('has a unique meta description of 50–170 characters', () => {
    const descriptions = indexable().map((f) => {
      const d = meta(readHtml(f), 'name', 'description') ?? ''
      expect(d.length, `${f}: "${d}"`).toBeGreaterThanOrEqual(50)
      expect(d.length, `${f}: "${d}"`).toBeLessThanOrEqual(170)
      return d
    })
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('has an absolute self-referencing canonical (SPEC §11.3)', () => {
    for (const f of indexable()) {
      const canonicals = readHtml(f).querySelectorAll('link[rel="canonical"]')
      expect(canonicals, f).toHaveLength(1)
      expect(canonicals[0].getAttribute('href'), f).toBe(SITE + urlPathFor(f))
    }
  })

  it('lists pt-BR, en and x-default (= en) alternates, absolute and reciprocal (SPEC §8.4)', () => {
    for (const f of indexable()) {
      const alts = alternatesOf(readHtml(f))
      expect(Object.keys(alts).sort(), f).toEqual(['en', 'pt-BR', 'x-default'])
      for (const href of Object.values(alts)) expect(href.startsWith(`${SITE}/`), f).toBe(true)
      expect(alts['x-default'], f).toBe(alts.en)
      expect(Object.values(alts), f).toContain(SITE + urlPathFor(f))
      // Reciprocity: the page in the other language declares the same set.
      const other = f.startsWith('pt-br/') ? alts.en : alts['pt-BR']
      const otherFile = `${other.slice(SITE.length + 1)}index.html`
      expect(alternatesOf(readHtml(otherFile)), `${f} ↔ ${otherFile}`).toEqual(alts)
    }
  })

  it('sets Open Graph fields that match the page (SPEC §11.7)', () => {
    for (const f of indexable()) {
      const doc = readHtml(f)
      const locale = f.startsWith('pt-br/') ? 'pt_BR' : 'en_US'
      expect(meta(doc, 'property', 'og:locale'), f).toBe(locale)
      expect(meta(doc, 'property', 'og:locale:alternate'), f).toBe(
        locale === 'pt_BR' ? 'en_US' : 'pt_BR'
      )
      expect(meta(doc, 'property', 'og:type'), f).toBe('website')
      expect(meta(doc, 'property', 'og:url'), f).toBe(SITE + urlPathFor(f))
      expect(meta(doc, 'property', 'og:title'), f).toBe(doc.querySelector('title')?.text.trim())
      expect(meta(doc, 'property', 'og:description'), f).toBe(meta(doc, 'name', 'description'))
      expect(meta(doc, 'name', 'twitter:card'), f).toMatch(/^summary(_large_image)?$/)
    }
  })

  it('brands every title, and gives the home page its own full title (SPEC §11.1)', () => {
    for (const f of indexable()) {
      const title = readHtml(f).querySelector('title')?.text.trim() ?? ''
      const isHome = f === 'pt-br/index.html' || f === 'en/index.html'
      if (isHome) expect(title.startsWith('Code Happy'), f).toBe(true)
      else expect(title.endsWith(' | Code Happy'), f).toBe(true)
    }
  })
})

describe('headings (SPEC §11.2)', () => {
  it('has exactly one h1 and never skips a heading level on any real page', () => {
    for (const f of pages()) {
      const levels = readHtml(f)
        .querySelectorAll('h1, h2, h3, h4, h5, h6')
        .map((h) => Number(h.tagName[1]))
      expect(
        levels.filter((l) => l === 1),
        f
      ).toHaveLength(1)
      expect(levels[0], f).toBe(1)
      levels.forEach((level, i) => {
        if (i > 0)
          expect(level - levels[i - 1], `${f} h${levels[i - 1]}→h${level}`).toBeLessThanOrEqual(1)
      })
    }
  })
})

describe('non-indexable pages', () => {
  it('marks the contact confirmation and the 404 noindex', () => {
    for (const f of [
      'pt-br/contact/thanks/index.html',
      'en/contact/thanks/index.html',
      '404.html',
    ]) {
      expect(isNoindex(readHtml(f)), f).toBe(true)
    }
  })

  it('does not advertise hreflang alternates for noindex pages', () => {
    for (const f of pages().filter((f) => isNoindex(readHtml(f)))) {
      expect(readHtml(f).querySelectorAll('link[rel="alternate"][hreflang]'), f).toHaveLength(0)
    }
  })

  it('gives the 404 page no canonical (it has no URL of its own)', () => {
    expect(readHtml('404.html').querySelectorAll('link[rel="canonical"]')).toHaveLength(0)
  })
})
