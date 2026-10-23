import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { readHtml } from './helpers'

// Plan F4-05 / SPEC §2.9, §13.5: Terms ported verbatim from the legacy site; Privacy keeps the
// legacy structure, but §1–§3 are rewritten to describe what the site actually does and a
// third-party section is added. The final text needs the owner's approval (E2).
type Sections = Record<string, { title: string; content: string }>
const legacy = (file: 'pt-BR' | 'en') =>
  JSON.parse(readFileSync(`legacy/vue-src/i18n/${file}.json`, 'utf8')) as {
    terms: { sections: Sections }
    privacy: { sections: Sections }
  }
const clean = (s: string) =>
  s
    .replace(/\{'@'\}/g, '@')
    .replace(/\s+/g, ' ')
    .trim()
const text = (rel: string) => readHtml(rel).querySelector('main')!.text.replace(/\s+/g, ' ')

const LOCALES = [
  { locale: 'pt-br', legacyFile: 'pt-BR' },
  { locale: 'en', legacyFile: 'en' },
] as const

describe('Terms (ported verbatim, Q-5 default)', () => {
  for (const { locale, legacyFile } of LOCALES) {
    it(`${locale}: contains every legacy section title and text unchanged`, () => {
      const page = text(`${locale}/terms/index.html`)
      for (const s of Object.values(legacy(legacyFile).terms.sections)) {
        expect(page).toContain(clean(s.title))
        expect(page).toContain(clean(s.content))
      }
    })

    it(`${locale}: shows the localized last-updated date of the legacy text (24 July 2025)`, () => {
      expect(text(`${locale}/terms/index.html`)).toContain(
        locale === 'pt-br' ? '24 de julho de 2025' : 'July 24, 2025'
      )
    })
  }
})

describe('Privacy (rewritten §1–§3 and third parties, pending approval E2)', () => {
  for (const { locale, legacyFile } of LOCALES) {
    const page = () => text(`${locale}/privacy/index.html`)

    it(`${locale}: keeps legacy §4–§7 (security, retention, rights, contact) unchanged`, () => {
      const { security, retention, rights, contact } = legacy(legacyFile).privacy.sections
      for (const s of [security, retention, rights, contact])
        expect(page()).toContain(clean(s.content))
    })

    it(`${locale}: no longer uses the legacy §1–§3 text`, () => {
      const { collection, usage, cookies } = legacy(legacyFile).privacy.sections
      for (const s of [collection, usage, cookies]) expect(page()).not.toContain(clean(s.content))
    })

    it(`${locale}: makes no analytics claims (SPEC §13.5)`, () => {
      expect(page()).not.toMatch(locale === 'pt-br' ? /analis/i : /analyze traffic|analytics/i)
    })

    it(`${locale}: discloses FormSubmit and Calendly, linking Calendly's privacy notice`, () => {
      expect(page()).toContain('FormSubmit')
      expect(page()).toContain('Calendly')
      expect(
        readHtml(`${locale}/privacy/index.html`).querySelector(
          'main a[href="https://calendly.com/legal/privacy-notice"]'
        )
      ).not.toBeNull()
    })

    it(`${locale}: makes no exclusivity claims about collection or recipients (review F4 I1)`, () => {
      // Email sent directly and the (undisclosed) email provider also receive personal data.
      expect(page()).not.toMatch(
        locale === 'pt-br'
          ? /coleta apenas|passam somente|somente pelos serviços/i
          : /only collects|passes only|only through the services/i
      )
      expect(page()).toMatch(locale === 'pt-br' ? /provedor de e-mail/i : /email provider/i)
    })

    it(`${locale}: every external link in the policy text is identifiable (SPEC §7.3)`, () => {
      const links = readHtml(`${locale}/privacy/index.html`).querySelectorAll(
        'main .prose a[href^="http"]'
      )
      expect(links.length).toBeGreaterThan(0)
      for (const a of links) {
        expect(a.querySelector('svg[aria-hidden="true"]'), a.toString()).not.toBeNull()
        expect(a.querySelector('.sr-only')?.text).toBe(
          locale === 'pt-br' ? '(site externo)' : '(external site)'
        )
      }
    })

    it(`${locale}: names the controller and the contact address`, () => {
      expect(page()).toContain('Code Happy Tecnologia Ltda.')
      expect(page()).toContain('contato@codehappy.com.br')
    })
  }
})

describe('legal pages (SPEC §2.6 fixes)', () => {
  for (const page of ['privacy', 'terms']) {
    it(`en/${page}: no Portuguese helper text left (was hard-coded in the Vue pages)`, () => {
      expect(text(`en/${page}/index.html`)).not.toMatch(/Tem dúvidas|Se você tiver dúvidas/)
    })

    for (const locale of ['pt-br', 'en']) {
      it(`${locale}/${page}: ends with a localized questions CTA linking to contact`, () => {
        const cta = readHtml(`${locale}/${page}/index.html`).querySelector(
          '[data-section="questions"]'
        )!
        const expected = {
          privacy: { 'pt-br': 'Dúvidas sobre esta política', en: 'Questions about this policy' },
          terms: { 'pt-br': 'Dúvidas sobre estes termos', en: 'Questions about these terms' },
        } as const
        expect(cta.text).toContain(expected[page as 'privacy' | 'terms'][locale as 'pt-br' | 'en'])
        expect(cta.querySelector(`a[href="/${locale}/contact/"]`)).not.toBeNull()
      })
    }
  }
})
