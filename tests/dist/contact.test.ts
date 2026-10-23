import { describe, expect, it } from 'vitest'
import { CALENDLY_URL, FORMSUBMIT_ACTION } from '../../src/config/site'
import { listHtmlFiles, readHtml } from './helpers'

// Plan F5-01 / SPEC §13.2–§13.4: the contact form markup, over the built HTML.
const LOCALES = ['pt-br', 'en'] as const
const form = (locale: string) =>
  readHtml(`${locale}/contact/index.html`).querySelector('form[data-contact-form]')!
const input = (locale: string, name: string) => form(locale).querySelector(`[name="${name}"]`)!

// What the visitor can fill in, and how Privacy §1 discloses each field (review F4 I3: the form
// must collect exactly what the policy says, no more and no less).
const DISCLOSED = ['name', 'email', 'company', 'service', 'message']
// The exact enumeration in Privacy §1, in form order (review F5: substring checks were too loose).
const POLICY_LIST = {
  'pt-br':
    'formulário de contato: nome, e-mail, empresa (opcional), o serviço de interesse e a mensagem.',
  en: 'contact form: name, email, company (optional), the service you are interested in and your message.',
} as const

describe('contact form (SPEC §13.2–§13.4)', () => {
  for (const locale of LOCALES) {
    it(`${locale}: posts natively to FormSubmit with the hidden fields`, () => {
      const f = form(locale)
      expect(f.getAttribute('method')?.toUpperCase()).toBe('POST')
      expect(f.getAttribute('action')).toBe(FORMSUBMIT_ACTION)
      expect(f.hasAttribute('novalidate')).toBe(false)
      const hidden = (name: string) =>
        f.querySelector(`input[type="hidden"][name="${name}"]`)?.getAttribute('value')
      expect(hidden('_next')).toBe(`https://codehappy.com.br/${locale}/contact/thanks/`)
      expect(hidden('_captcha')).toBe('false')
      expect(hidden('_template')).toBe('table')
      expect(hidden('_subject')).toMatch(locale === 'pt-br' ? /\[pt-BR\]$/ : /\[en\]$/)
    })

    it(`${locale}: has a honeypot hidden from people and assistive tech`, () => {
      const honey = input(locale, '_honey')
      expect(honey.getAttribute('type')).toBe('text')
      expect(honey.classList.contains('sr-only')).toBe(true)
      expect(honey.getAttribute('tabindex')).toBe('-1')
      expect(honey.getAttribute('autocomplete')).toBe('off')
      expect(honey.getAttribute('aria-hidden')).toBe('true')
    })

    it(`${locale}: collects exactly the fields Privacy §1 discloses`, () => {
      const visible = form(locale)
        .querySelectorAll('input, select, textarea')
        .filter(
          (el) => el.getAttribute('type') !== 'hidden' && el.getAttribute('name') !== '_honey'
        )
        .map((el) => el.getAttribute('name'))
      expect(visible).toEqual(DISCLOSED)

      const policy = readHtml(`${locale}/privacy/index.html`).querySelector('main')!.text
      expect(policy.replace(/\s+/g, ' ')).toContain(POLICY_LIST[locale])
    })

    it(`${locale}: field constraints and autocomplete match SPEC §13.3`, () => {
      const attrs = (name: string) => input(locale, name).attributes
      expect(attrs('name')).toMatchObject({ required: '', minlength: '2', autocomplete: 'name' })
      expect(attrs('email')).toMatchObject({ type: 'email', required: '', autocomplete: 'email' })
      expect(attrs('company')).toMatchObject({ autocomplete: 'organization' })
      expect(input(locale, 'company').hasAttribute('required')).toBe(false)
      expect(attrs('message')).toMatchObject({ required: '', minlength: '10', maxlength: '5000' })
      const select = input(locale, 'service')
      expect(select.tagName).toBe('SELECT')
      expect(select.hasAttribute('required')).toBe(false) // always has a value (HTML conformance)
      expect(select.querySelectorAll('option').map((o) => o.getAttribute('value'))).toEqual([
        'fractional-cto',
        'ai',
        'advisory',
        'other',
      ])
      expect(select.querySelector('option[selected]')?.getAttribute('value')).toBe('other')
    })

    it(`${locale}: every field has a visible label; required ones say so in words`, () => {
      const required = locale === 'pt-br' ? '(obrigatório)' : '(required)'
      for (const name of DISCLOSED) {
        const id = input(locale, name).getAttribute('id')!
        const label = form(locale).querySelector(`label[for="${id}"]`)
        expect(label, name).not.toBeNull()
        expect(label!.classList.contains('sr-only'), name).toBe(false)
        if (name === 'company') expect(label!.text).not.toContain(required)
        else expect(label!.text, name).toContain(required)
      }
    })

    it(`${locale}: each field references its (hidden) error text via aria-describedby`, () => {
      for (const name of DISCLOSED) {
        const el = input(locale, name)
        const ids = el.getAttribute('aria-describedby')?.split(' ') ?? []
        expect(ids, name).toContain(`${el.getAttribute('id')}-error`)
        for (const id of ids) expect(form(locale).querySelector(`#${id}`), id).not.toBeNull()
        const error = form(locale).querySelector(`#${el.getAttribute('id')}-error`)!
        expect(error.hasAttribute('hidden')).toBe(true)
      }
    })

    it(`${locale}: has a polite live region and a submit button that is never disabled`, () => {
      const root = readHtml(`${locale}/contact/index.html`).querySelector('[data-contact]')!
      expect(root.querySelector('[role="status"][aria-live="polite"]')).not.toBeNull()
      expect(form(locale).querySelector('[role="status"]')).toBeNull()
      const submit = form(locale).querySelector('button[type="submit"]')!
      expect(submit.hasAttribute('disabled')).toBe(false)
      expect(submit.text.trim().length).toBeGreaterThan(0)
    })

    it(`${locale}: a privacy notice next to submit names FormSubmit and links the policy`, () => {
      const notice = form(locale).querySelector('[data-privacy-notice]')!
      expect(notice.text).toContain('FormSubmit')
      expect(notice.text).toContain(
        locale === 'pt-br' ? 'preparar uma proposta' : 'prepare a proposal'
      )
      expect(notice.querySelector(`a[href="/${locale}/privacy/"]`)).not.toBeNull()
    })
  }
})

describe('thanks page (SPEC §5.2, B6)', () => {
  for (const locale of LOCALES) {
    const main = () => readHtml(`${locale}/contact/thanks/index.html`).querySelector('main')!

    it(`${locale}: confirms, states the 48-hour reply, links Calendly and home`, () => {
      expect(main().querySelectorAll('h1')).toHaveLength(1)
      expect(main().text).toContain(locale === 'pt-br' ? '48 horas' : '48 hours')
      expect(main().querySelector(`a[href="${CALENDLY_URL}"]`)).not.toBeNull()
      expect(main().querySelector(`a[href="/${locale}/"]`)).not.toBeNull()
    })
  }
})

describe('typography', () => {
  // Astro drops a line break between an expression and an element, so text written on its own
  // line before a link renders glued to it ("escreva para:contato@…"). Includes <template>s.
  it('no inline link is glued to the text before or after it', () => {
    for (const file of listHtmlFiles()) {
      const main = readHtml(file).querySelector('main')?.innerHTML ?? ''
      expect(main, file).not.toMatch(/[^\s>([“‘"']<a\s/u)
      expect(main, file).not.toMatch(/<\/a>[\p{L}\d]/u)
    }
  })
})

describe('contact page composition (plan F5-03, SPEC §5.2)', () => {
  for (const locale of LOCALES) {
    const main = () => readHtml(`${locale}/contact/index.html`).querySelector('main')!

    it(`${locale}: sections in order — intro, call, message, email, FAQ`, () => {
      const sections = main()
        .querySelectorAll('[data-section]')
        .map((s) => s.getAttribute('data-section'))
      expect(sections).toEqual(['call', 'message', 'email', 'faq'])
      expect(main().querySelectorAll('h1')).toHaveLength(1)
      // "What happens next", right under the H1.
      expect(main().querySelector('h1 + p')?.text.trim().length).toBeGreaterThan(20)
    })

    it(`${locale}: the call is labeled with its confirmed 30-minute duration (B6)`, () => {
      const call = main().querySelector('[data-section="call"]')!
      expect(call.text).toMatch(/30 minutos|30-minute/)
      expect(call.querySelector(`a[href="${CALENDLY_URL}"]`)).not.toBeNull()
    })

    it(`${locale}: the FAQ answers only the budget question; no legacy timelines`, () => {
      const faq = main().querySelector('[data-section="faq"]')!
      expect(faq.querySelectorAll('h3')).toHaveLength(1)
      expect(faq.text).toMatch(locale === 'pt-br' ? /proposta por escrito/ : /written proposal/)
      expect(main().text).not.toMatch(/semanas|meses|weeks|months/i)
    })
  }
})
