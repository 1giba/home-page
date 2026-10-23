import { describe, expect, it } from 'vitest'
import { listHtmlFiles, readHtml } from './helpers'

// SPEC §5.2 About page and §3.5 (company-led, founder-visible), over the built HTML.
const main = (locale: string) => readHtml(`${locale}/about/index.html`).querySelector('main')!

const EXPECTED = {
  'pt-br': {
    company: ['Code Happy Tecnologia Ltda.', '2020', 'brasileira'],
    led: 'conduzido pessoalmente por Giba',
    founder: ['2004', '2010', '2020', '2022'],
  },
  en: {
    company: ['Code Happy Tecnologia Ltda.', '2020', 'Brazilian'],
    led: 'led personally by its founder',
    founder: ['2004', '2010', '2020', '2022'],
  },
} as const

describe('founder references stay gender-neutral (pronouns not stated)', () => {
  it('no built page uses gendered pronouns or fundador/fundadora', () => {
    for (const file of listHtmlFiles()) {
      const text = readHtml(file).querySelector('main')?.text ?? ''
      expect(text, file).not.toMatch(/\b(he|him|his|she|her|hers)\b|\bfundador(a)?\b/i)
    }
  })
})

describe('About page (SPEC §5.2)', () => {
  for (const locale of ['pt-br', 'en'] as const) {
    const text = () => main(locale).text.replace(/\s+/g, ' ')

    it(`${locale}: opens with the company in a sentence or two (legal name, founded, Brazil)`, () => {
      const intro = main(locale).querySelector('h1 ~ p, h1 + div p')!.text
      for (const fact of EXPECTED[locale].company) expect(intro).toContain(fact)
    })

    it(`${locale}: says engagements are led personally by the founder (§3.5)`, () => {
      expect(text()).toContain(EXPECTED[locale].led)
    })

    it(`${locale}: gives the founder's confirmed background (B5)`, () => {
      for (const year of EXPECTED[locale].founder) expect(text()).toContain(year)
    })

    it(`${locale}: has a "how we work" list of 3–4 behaviors`, () => {
      const lists = main(locale).querySelectorAll('[data-section="how"] li')
      expect(lists.length).toBeGreaterThanOrEqual(3)
      expect(lists.length).toBeLessThanOrEqual(4)
    })

    it(`${locale}: ends with the booking CTA`, () => {
      expect(
        main(locale)
          .querySelector('[data-section="cta"] a[data-cta="primary"]')
          ?.getAttribute('href')
      ).toBe('https://calendly.com/1giba')
    })

    it(`${locale}: no CV timeline, tag clouds or legacy slogans (plan F4-03)`, () => {
      expect(text()).not.toMatch(/Machine Learning|Big O|forefront of innovation|vanguarda/i)
      expect(main(locale).querySelectorAll('[data-year]')).toHaveLength(0)
    })
  }
})
