import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'
import { describe, expect, it } from 'vitest'

// Runs against dist-fixtures/, built with CONTENT_FIXTURES=1 (one fictional published project,
// tests/fixtures/projects/fixture). `npm run test:dist:fixtures` builds it first (plan F3-03).
const DIR = join(process.cwd(), 'dist-fixtures')
const SITE = 'https://codehappy.com.br'
const read = (rel: string) => readFileSync(join(DIR, rel), 'utf8')
const html = (rel: string): HTMLElement => parse(read(rel))

function allHtml(dir = DIR): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name)
    if (e.isDirectory()) return allHtml(full)
    return e.name.endsWith('.html') ? [relative(DIR, full)] : []
  })
}

const CASES = [
  { locale: 'pt-br', file: 'pt-br/work/fixture/index.html', title: 'Projeto Fixture' },
  { locale: 'en', file: 'en/work/fixture/index.html', title: 'Fixture Project' },
] as const

describe('Work routes with a published project (SPEC §4.5, §5.2)', () => {
  it('builds the Work index and the case page in both languages', () => {
    if (!existsSync(DIR))
      throw new Error('Run `npm run test:dist:fixtures` (builds dist-fixtures/).')
    for (const f of ['pt-br/work/index.html', 'en/work/index.html', ...CASES.map((c) => c.file)]) {
      expect(existsSync(join(DIR, f)), f).toBe(true)
    }
  })

  it('shows the Work link in the navigation once something is published', () => {
    const header = html('pt-br/index.html').querySelector('header nav')
    expect(header?.querySelector('a[href="/pt-br/work/"]')).not.toBeNull()
    expect(
      html('en/about/index.html').querySelector('header nav a[href="/en/work/"]')
    ).not.toBeNull()
  })

  it('lists the case study on the Work index, linking to its page', () => {
    const index = html('pt-br/work/index.html')
    expect(index.querySelectorAll('h1')).toHaveLength(1)
    const link = index.querySelector('main a[href="/pt-br/work/fixture/"]')
    expect(link?.text).toContain('Projeto Fixture')
  })

  for (const [locale, intro] of [
    ['pt-br', 'Projetos em que a Code Happy atuou'],
    ['en', 'Projects Code Happy has worked on'],
  ] as const) {
    it(`gives the Work index an intro and the primary CTA (SPEC §5.2, ${locale})`, () => {
      const main = html(`${locale}/work/index.html`).querySelector('main')!
      expect(main.querySelector('h1 + p')?.text).toContain(intro)
      const cta = main.querySelector('a[data-cta="primary"]')
      expect(cta?.getAttribute('href')).toBe('https://calendly.com/1giba')
      expect(cta?.querySelector('.sr-only')).not.toBeNull()
    })
  }

  it('never renders outcome sources or confidentiality notes anywhere', () => {
    for (const f of allHtml()) {
      expect(read(f), f).not.toMatch(/SECRET-SOURCE|SECRET-NOTE/)
    }
  })

  for (const { locale, file, title } of CASES) {
    it(`renders the case page sections from the content (${locale})`, () => {
      const page = html(file)
      const main = page.querySelector('main')!
      expect(main.querySelectorAll('h1').map((h) => h.text.trim())).toEqual([title])
      const text = main.text
      for (const expected of locale === 'pt-br'
        ? [
            'Cliente Fixture',
            'Papel fictício de liderança técnica',
            'Contexto fictício',
            'Primeiro desafio fictício',
            'Abordagem fictícia',
            'Entrega fictícia',
            'Resultado fictício verificado',
            'FixtureLang',
          ]
        : [
            'Fixture Client',
            'Fictional technical leadership role',
            'Fictional business context',
            'First fictional challenge',
            'Fictional approach',
            'Fictional deliverable',
            'Fictional verified outcome',
            'FixtureLang',
          ]) {
        expect(text, expected).toContain(expected)
      }
      // Related services link to their pages in the same language.
      for (const service of ['advisory', 'ai']) {
        expect(
          main.querySelector(`a[href="/${locale}/services/${service}/"]`),
          service
        ).not.toBeNull()
      }
    })

    it(`renders the cover through astro:assets with alt text and dimensions (${locale})`, () => {
      const img = html(file).querySelector('main img')
      expect(img?.getAttribute('alt')).toBe(
        locale === 'pt-br' ? 'Diagrama fictício da arquitetura' : 'Fictional architecture diagram'
      )
      expect(img?.getAttribute('src')).toMatch(/^\/_astro\//)
      expect(Number(img?.getAttribute('width'))).toBeGreaterThan(0)
      expect(Number(img?.getAttribute('height'))).toBeGreaterThan(0)
    })

    it(`has correct SEO head for the case page (${locale})`, () => {
      const head = html(file).querySelector('head')!
      const own = `${SITE}/${locale}/work/fixture/`
      expect(
        head.querySelectorAll('link[rel="canonical"]').map((l) => l.getAttribute('href'))
      ).toEqual([own])
      expect(head.querySelectorAll('title').map((t) => t.text)).toEqual([`${title} | Code Happy`])
      const alts = Object.fromEntries(
        head
          .querySelectorAll('link[rel="alternate"][hreflang]')
          .map((l) => [l.getAttribute('hreflang'), l.getAttribute('href')])
      )
      expect(alts).toEqual({
        'pt-BR': `${SITE}/pt-br/work/fixture/`,
        en: `${SITE}/en/work/fixture/`,
        'x-default': `${SITE}/en/work/fixture/`,
      })
      expect(head.querySelectorAll('meta[name="robots"]')).toHaveLength(0)
    })
  }
})
