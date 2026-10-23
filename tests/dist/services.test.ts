import { describe, expect, it } from 'vitest'
import { readHtml } from './helpers'

// SPEC §3.7 and §5.2 service pages, over the built HTML.
const SERVICES = ['fractional-cto', 'ai', 'advisory'] as const
const LOCALES = ['pt-br', 'en'] as const
const page = (locale: string, id: string) => readHtml(`${locale}/services/${id}/index.html`)
const sectionIds = (locale: string, id: string) =>
  page(locale, id)
    .querySelectorAll('main section[data-section]')
    .map((s) => s.getAttribute('data-section'))

describe('service pages (SPEC §5.2)', () => {
  for (const locale of LOCALES) {
    for (const id of SERVICES) {
      it(`${locale}/${id} has the required sections in order`, () => {
        expect(sectionIds(locale, id)).toEqual(['fit', 'scope', 'how', 'value', 'cta', 'other'])
      })

      it(`${locale}/${id} lists audience, at least 3 problems, scope and value items`, () => {
        const main = page(locale, id).querySelector('main')!
        expect(main.querySelectorAll('[data-section="fit"] li').length).toBeGreaterThanOrEqual(3)
        expect(main.querySelectorAll('[data-section="scope"] li').length).toBeGreaterThanOrEqual(3)
        expect(main.querySelectorAll('[data-section="value"] li').length).toBeGreaterThanOrEqual(1)
      })

      it(`${locale}/${id} links the other two services, one line each`, () => {
        const others = page(locale, id)
          .querySelectorAll('[data-section="other"] a')
          .map((a) => a.getAttribute('href'))
        expect(others.sort()).toEqual(
          SERVICES.filter((s) => s !== id)
            .map((s) => `/${locale}/services/${s}/`)
            .sort()
        )
      })

      it(`${locale}/${id} publishes no price, duration or cadence (open question Q-2)`, () => {
        const text = page(locale, id).querySelector('main')!.text
        expect(text).not.toMatch(
          /R\$|US\$|\$\s?\d|€|\bper (hour|month)\b|por (hora|mês)|\d+\s*(horas|hours|meses|months|semanas|weeks)\b/i
        )
      })
    }
  }

  it('includes the AI-built codebase assessment in Technology Advisory (SPEC §3.7.3)', () => {
    expect(page('en', 'advisory').querySelector('[data-section="scope"]')!.text).toMatch(
      /AI-built codebase/i
    )
    expect(page('pt-br', 'advisory').querySelector('[data-section="scope"]')!.text).toMatch(
      /código gerado (com|por) IA/i
    )
  })

  it('presents software engineering as part of CTO and AI engagements, not a fourth service (§3.7.4)', () => {
    for (const locale of LOCALES) {
      for (const id of ['fractional-cto', 'ai'] as const) {
        expect(
          page(locale, id).querySelector('[data-section="how"] [data-implementation]'),
          `${locale}/${id}`
        ).not.toBeNull()
      }
      const index = readHtml(`${locale}/services/index.html`)
      expect(index.querySelectorAll('main [data-service-summary]')).toHaveLength(3)
    }
  })

  it('uses the pt-BR service names (SPEC §3.7.1, Q-10 default)', () => {
    expect(page('pt-br', 'fractional-cto').querySelector('h1')!.text.trim()).toBe(
      'CTO fracionado e liderança de tecnologia'
    )
  })
})

describe('services overview (SPEC §5.2)', () => {
  for (const locale of LOCALES) {
    it(`${locale} has an intro, three summaries in order, and a "not sure" CTA`, () => {
      const main = readHtml(`${locale}/services/index.html`).querySelector('main')!
      expect(main.querySelector('h1 + p')?.text.trim().length).toBeGreaterThan(40)
      expect(
        main.querySelectorAll('[data-service-summary] h2 a').map((a) => a.getAttribute('href'))
      ).toEqual(SERVICES.map((s) => `/${locale}/services/${s}/`))
      expect(main.querySelector('[data-section="unsure"] a[data-cta="primary"]')).not.toBeNull()
    })
  }
})
