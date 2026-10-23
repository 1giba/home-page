import { join } from 'node:path'
import sharp from 'sharp'
import { describe, expect, it } from 'vitest'
import type { HTMLElement } from 'node-html-parser'
import {
  assertDistBuilt,
  distDir,
  isLocalized,
  isRedirectStub,
  listHtmlFiles,
  projectSources,
  readHtml,
  readRaw,
  urlPathFor,
} from './helpers'

const SITE = 'https://codehappy.com.br'

const head = (doc: HTMLElement) => doc.querySelector('head') ?? doc

/** The one element in <head> matching `selector`; fails when it is missing or duplicated. */
function only(doc: HTMLElement, selector: string, file: string): HTMLElement {
  const all = head(doc).querySelectorAll(selector)
  expect(all, `${file}: expected exactly one ${selector}`).toHaveLength(1)
  return all[0]
}

const content = (doc: HTMLElement, selector: string, file: string) =>
  only(doc, selector, file).getAttribute('content')

// Search engines apply the most restrictive robots directive, so look at every robots meta.
const isNoindex = (doc: HTMLElement) =>
  head(doc)
    .querySelectorAll('meta[name="robots"]')
    .some((m) => (m.getAttribute('content') ?? '').toLowerCase().includes('noindex'))

/** hreflang links as [label, href] pairs, in document order, duplicates kept. */
const hreflangLinks = (doc: HTMLElement): [string, string][] =>
  head(doc)
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .map((l) => [l.getAttribute('hreflang') ?? '', l.getAttribute('href') ?? ''])

const pages = () => listHtmlFiles().filter((f) => !isRedirectStub(f))
const indexable = () => pages().filter((f) => isLocalized(f) && !isNoindex(readHtml(f)))

describe('SEO head on indexable localized pages (SPEC §11)', () => {
  it('covers the expected pages', () => {
    assertDistBuilt()
    // Per locale: home, services, 3 services, about, contact, privacy, terms (9), plus the Work
    // index and one page per published case study once anything is published (SPEC §4.5).
    const published = projectSources().filter((p) => p.published).length
    const perLocale = 9 + (published > 0 ? 1 + published : 0)
    expect(indexable()).toHaveLength(2 * perLocale)
  })

  it('has exactly one <title> in <head> per page, unique across the site', () => {
    // Scoped to <head>: an accessible <svg><title> in the body is not a document title.
    const titles = indexable().map((f) => only(readHtml(f), 'title', f).text.trim())
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('carries no robots directive at all, so nothing can make it noindex', () => {
    for (const f of indexable()) {
      expect(head(readHtml(f)).querySelectorAll('meta[name="robots"]'), f).toHaveLength(0)
    }
  })

  it('has exactly one meta description, unique and 50–170 characters long', () => {
    const descriptions = indexable().map((f) => {
      const d = content(readHtml(f), 'meta[name="description"]', f) ?? ''
      expect(d.length, `${f}: "${d}"`).toBeGreaterThanOrEqual(50)
      expect(d.length, `${f}: "${d}"`).toBeLessThanOrEqual(170)
      return d
    })
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('has one absolute self-referencing canonical (SPEC §11.3)', () => {
    for (const f of indexable()) {
      expect(only(readHtml(f), 'link[rel="canonical"]', f).getAttribute('href'), f).toBe(
        SITE + urlPathFor(f)
      )
    }
  })

  it('lists exactly one pt-BR, en and x-default alternate, each in its own language (SPEC §8.4)', () => {
    for (const f of indexable()) {
      const links = hreflangLinks(readHtml(f))
      // Exactly three links with three distinct labels: no duplicates, nothing missing.
      expect(links.map(([label]) => label).sort(), f).toEqual(['en', 'pt-BR', 'x-default'])
      const alts = Object.fromEntries(links)
      // Each label points into its own language's tree; x-default is the English page.
      expect(alts['pt-BR'].startsWith(`${SITE}/pt-br/`), `${f}: pt-BR → ${alts['pt-BR']}`).toBe(
        true
      )
      expect(alts.en.startsWith(`${SITE}/en/`), `${f}: en → ${alts.en}`).toBe(true)
      expect(alts['x-default'], f).toBe(alts.en)
      // The page lists itself under its own language.
      expect(alts[f.startsWith('pt-br/') ? 'pt-BR' : 'en'], f).toBe(SITE + urlPathFor(f))
      // Reciprocity: the page in the other language declares the identical set.
      const other = f.startsWith('pt-br/') ? alts.en : alts['pt-BR']
      const otherFile = `${other.slice(SITE.length + 1)}index.html`
      expect(otherFile, f).not.toBe(f)
      const otherLinks = hreflangLinks(readHtml(otherFile))
      expect([...otherLinks].sort(), `${f} ↔ ${otherFile}`).toEqual([...links].sort())
    }
  })

  it('sets one of each Open Graph field, matching the page (SPEC §11.7)', () => {
    for (const f of indexable()) {
      const doc = readHtml(f)
      const locale = f.startsWith('pt-br/') ? 'pt_BR' : 'en_US'
      expect(content(doc, 'meta[property="og:locale"]', f)).toBe(locale)
      expect(content(doc, 'meta[property="og:locale:alternate"]', f)).toBe(
        locale === 'pt_BR' ? 'en_US' : 'pt_BR'
      )
      expect(content(doc, 'meta[property="og:type"]', f)).toBe('website')
      expect(content(doc, 'meta[property="og:url"]', f)).toBe(SITE + urlPathFor(f))
      expect(content(doc, 'meta[property="og:title"]', f)).toBe(only(doc, 'title', f).text.trim())
      expect(content(doc, 'meta[property="og:description"]', f)).toBe(
        content(doc, 'meta[name="description"]', f)
      )
      expect(content(doc, 'meta[name="twitter:card"]', f)).toBe('summary_large_image')
    }
  })

  it('brands every title, and gives the home page its own full title (SPEC §11.1)', () => {
    for (const f of indexable()) {
      const title = only(readHtml(f), 'title', f).text.trim()
      const isHome = f === 'pt-br/index.html' || f === 'en/index.html'
      if (isHome) expect(title.startsWith('Code Happy'), f).toBe(true)
      else expect(title.endsWith(' | Code Happy'), f).toBe(true)
    }
  })
})

describe('sitemap.xml and robots.txt (plan F6-01, SPEC §11.4)', () => {
  const sitemap = () => readRaw('sitemap.xml')
  /** Each <url> entry: its <loc> and its xhtml:link alternates as [hreflang, href]. */
  const entries = () =>
    [...sitemap().matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
      loc: /<loc>([^<]+)<\/loc>/.exec(body)?.[1] ?? '',
      alternates: [
        ...body.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*\/>/g),
      ].map(([, lang, href]) => [lang, href] as [string, string]),
    }))

  it('is a sitemap urlset declaring the xhtml namespace', () => {
    expect(sitemap()).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
    expect(sitemap()).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
    expect(sitemap()).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('lists exactly the canonical URLs of the indexable localized pages, once each', () => {
    const locs = entries().map((e) => e.loc)
    expect(new Set(locs).size).toBe(locs.length)
    expect([...locs].sort()).toEqual(
      indexable()
        .map((f) => SITE + urlPathFor(f))
        .sort()
    )
  })

  it('gives every URL the same pt-BR, en and x-default alternates as its page head', () => {
    for (const { loc, alternates } of entries()) {
      const file = `${loc.slice(SITE.length + 1)}index.html`
      expect([...alternates].sort(), loc).toEqual([...hreflangLinks(readHtml(file))].sort())
      expect(alternates, loc).toHaveLength(3)
    }
  })

  it('excludes the thanks pages, the 404 and, while nothing is published, Work', () => {
    const locs = entries().map((e) => e.loc)
    expect(locs.filter((l) => /\/thanks\/|404/.test(l))).toEqual([])
    if (!projectSources().some((p) => p.published))
      expect(locs.filter((l) => l.includes('/work/'))).toEqual([])
  })

  it('robots.txt allows everything and points to the sitemap', () => {
    const lines = readRaw('robots.txt').trim().split('\n')
    expect(lines).toContain('User-agent: *')
    expect(lines).toContain('Allow: /')
    expect(lines).toContain(`Sitemap: ${SITE}/sitemap.xml`)
    expect(lines.filter((l) => /^Disallow:/i.test(l) && l.trim() !== 'Disallow:')).toEqual([])
  })
})

describe('default OG image (plan F6-02, SPEC §11.7)', () => {
  it('every page points og:image at the 1200×630 default image, which is built', async () => {
    for (const f of pages()) {
      expect(content(readHtml(f), 'meta[property="og:image"]', f)).toBe(`${SITE}/og/default.png`)
    }
    const { width, height, format } = await sharp(join(distDir, 'og/default.png')).metadata()
    expect({ width, height, format }).toEqual({ width: 1200, height: 630, format: 'png' })
  })
})

describe('structured data (plan F6-02, SPEC §11.8)', () => {
  const blocks = (f: string) =>
    readHtml(f)
      .querySelectorAll('script[type="application/ld+json"]')
      .map((s) => JSON.parse(s.text) as Record<string, unknown>)

  it('home has exactly one block: the Organization', () => {
    for (const f of ['pt-br/index.html', 'en/index.html']) {
      const [org, ...rest] = blocks(f)
      expect(rest, f).toHaveLength(0)
      expect(org).toMatchObject({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Code Happy',
        legalName: 'Code Happy Tecnologia Ltda.',
        url: SITE,
        email: 'contato@codehappy.com.br',
      })
    }
  })

  it('about has exactly one block: the founder as a Person working for Code Happy', () => {
    for (const f of ['pt-br/about/index.html', 'en/about/index.html']) {
      const [person, ...rest] = blocks(f)
      expect(rest, f).toHaveLength(0)
      expect(person).toMatchObject({
        '@type': 'Person',
        name: 'Giba',
        worksFor: { '@type': 'Organization', name: 'Code Happy' },
      })
    }
  })

  it('no other page has structured data, and none has reviews, ratings or prices', () => {
    for (const f of pages()) {
      const ld = blocks(f)
      if (!/^(pt-br|en)\/(about\/)?index\.html$/.test(f)) expect(ld, f).toHaveLength(0)
      expect(JSON.stringify(ld), f).not.toMatch(/Review|AggregateRating|"offers"|"price/)
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
  it('marks the contact confirmation and the 404 with a single noindex robots tag', () => {
    for (const f of [
      'pt-br/contact/thanks/index.html',
      'en/contact/thanks/index.html',
      '404.html',
    ]) {
      expect(content(readHtml(f), 'meta[name="robots"]', f), f).toBe('noindex')
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
