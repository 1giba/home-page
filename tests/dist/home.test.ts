import { describe, expect, it } from 'vitest'
import { projectSources, readHtml } from './helpers'

// SPEC §5.2 home page, over the built HTML.
const CALENDLY = 'https://calendly.com/1giba'
const H1 = {
  'pt-br': 'Liderança sênior de tecnologia, sem contratar um CTO em tempo integral.',
  en: 'Senior technology leadership, without hiring a full-time CTO.',
}
const main = (locale: 'pt-br' | 'en') => readHtml(`${locale}/index.html`).querySelector('main')!
const nothingPublished = !projectSources().some((p) => p.published)

describe('home page (SPEC §5.2)', () => {
  for (const locale of ['pt-br', 'en'] as const) {
    it(`${locale}: sections in the specified order`, () => {
      expect(
        main(locale)
          .querySelectorAll('section[data-section]')
          .map((s) => s.getAttribute('data-section'))
      ).toEqual(['hero', 'problems', 'services', 'evidence', 'steps', 'closing'])
    })

    it(`${locale}: the H1 is the value proposition (SPEC §3.2) with a supporting line`, () => {
      const hero = main(locale).querySelector('[data-section="hero"]')!
      expect(hero.querySelector('h1')!.text.trim()).toBe(H1[locale])
      expect(hero.querySelector('h1 + p')!.text.trim().length).toBeGreaterThan(60)
    })

    it(`${locale}: hero offers the intro call, then the services`, () => {
      const ctas = main(locale)
        .querySelectorAll('[data-section="hero"] [data-cta]')
        .map((a) => [a.getAttribute('data-cta'), a.getAttribute('href')])
      expect(ctas).toEqual([
        ['primary', CALENDLY],
        ['secondary', `/${locale}/services/`],
      ])
    })

    it(`${locale}: lists 3–5 concrete problems (SPEC §3.3)`, () => {
      const items = main(locale).querySelectorAll('[data-section="problems"] li')
      expect(items.length).toBeGreaterThanOrEqual(3)
      expect(items.length).toBeLessThanOrEqual(5)
    })

    it(`${locale}: each service card says who it is for and links to the service`, () => {
      for (const card of main(locale).querySelectorAll('[data-service-card]')) {
        expect(card.querySelector('[data-audience]')!.text.trim().length).toBeGreaterThan(20)
        expect(card.querySelector('a')!.getAttribute('href')).toMatch(
          new RegExp(`^/${locale}/services/(fractional-cto|ai|advisory)/$`)
        )
      }
    })

    it(`${locale}: founder background in chronological order while nothing is published (§4.5)`, () => {
      if (!nothingPublished) return
      const evidence = main(locale).querySelector('[data-section="evidence"]')!
      const years = evidence.querySelectorAll('[data-year]').map((y) => y.getAttribute('data-year'))
      expect(years).toEqual(['2004', '2010', '2020', '2022', 'now'])
      expect(evidence.querySelector(`a[href="/${locale}/about/"]`)).not.toBeNull()
    })

    it(`${locale}: three engagement steps, then a closing message CTA`, () => {
      expect(main(locale).querySelectorAll('[data-section="steps"] li')).toHaveLength(3)
      const closing = main(locale).querySelector('[data-section="closing"]')!
      expect(closing.querySelector(`a[href="/${locale}/contact/"]`)).not.toBeNull()
    })
  }
})
