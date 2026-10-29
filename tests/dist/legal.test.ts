import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { exists, listHtmlFiles, readHtml } from './helpers'

// Plan F4-05 / SPEC §2.9, §13.5: Terms ported verbatim from the legacy site; Privacy keeps the
// legacy structure, but §1–§3 are rewritten to describe what the site actually does and a
// third-party section is added. The final text needs the owner's approval (E2).
type Sections = Record<string, { title: string; content: string }>
// The legacy text, kept verbatim in a fixture since the legacy sources were removed (F7-04).
const legacy = (file: 'pt-BR' | 'en') =>
  (
    JSON.parse(readFileSync('tests/fixtures/legacy-legal.json', 'utf8')) as Record<
      'pt-BR' | 'en',
      { terms: { sections: Sections }; privacy: { sections: Sections } }
    >
  )[file]
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

// Q-5, decided by the owner on 27 Oct 2026: the institutional site has no Terms of Use page (the
// legacy terms were service-contract terms; engagements are governed by proposal or contract).
describe('Terms of Use (removed, Q-5)', () => {
  for (const locale of ['pt-br', 'en']) {
    it(`${locale}: no Terms page is built and nothing links to one`, () => {
      expect(exists(`${locale}/terms/index.html`)).toBe(false)
      for (const file of listHtmlFiles().filter((f) => f.startsWith(`${locale}/`)))
        expect(readHtml(file).querySelector(`a[href^="/${locale}/terms"]`), file).toBeNull()
    })
  }
})

describe('Privacy (LGPD revision, pending approval E2)', () => {
  for (const { locale, legacyFile } of LOCALES) {
    const page = () => text(`${locale}/privacy/index.html`)

    // The legacy §1–§5 text made claims the project cannot confirm (generic security measures,
    // "as long as necessary" retention); the revision states only confirmed facts.
    it(`${locale}: no longer uses the legacy collection, usage, cookies, security or retention text`, () => {
      const { collection, usage, cookies, security, retention } =
        legacy(legacyFile).privacy.sections
      for (const s of [collection, usage, cookies, security, retention])
        expect(page()).not.toContain(clean(s.content))
    })

    it(`${locale}: identifies the controller's CNPJ and every provider the site actually uses`, () => {
      for (const fact of [
        '37.833.013/0001-51',
        'FormSubmit',
        'Google Workspace',
        'Calendly',
        'Vercel',
      ])
        expect(page()).toContain(fact)
    })

    it(`${locale}: discloses the theme preference in localStorage and the data subject's rights`, () => {
      expect(page()).toContain('localStorage')
      // The rights section cites LGPD art. 18 (art. 9, VII). The ANPD mention was dropped by the
      // owner on 29 Oct 2026.
      expect(page()).toContain('art. 18')
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
  for (const page of ['privacy']) {
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
        } as const
        expect(cta.text).toContain(expected[page as 'privacy'][locale as 'pt-br' | 'en'])
        expect(cta.querySelector(`a[href="/${locale}/contact/"]`)).not.toBeNull()
      })
    }
  }
})
