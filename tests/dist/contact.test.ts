import { describe, expect, it } from 'vitest'
import { CALENDLY_URL, FORMSUBMIT_ACTION } from '../../src/config/site'
import { readHtml } from './helpers'

// Plan F5-01 / SPEC §13.2–§13.4: the contact form markup, over the built HTML.
const LOCALES = ['pt-br', 'en'] as const
const form = (locale: string) =>
  readHtml(`${locale}/contact/index.html`).querySelector('form[data-contact-form]')!
const input = (locale: string, name: string) => form(locale).querySelector(`[name="${name}"]`)!

// What the visitor can fill in, and how Privacy §1 discloses each field (review F4 I3: the form
// must collect exactly what the policy says, no more and no less).
const DISCLOSED = {
  name: { 'pt-br': 'nome', en: 'name' },
  email: { 'pt-br': 'e-mail', en: 'email' },
  company: { 'pt-br': 'empresa (opcional)', en: 'company (optional)' },
  service: { 'pt-br': 'o serviço de interesse', en: 'the service you are interested in' },
  message: { 'pt-br': 'a mensagem', en: 'your message' },
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
      expect(visible).toEqual(Object.keys(DISCLOSED))

      const policy = readHtml(`${locale}/privacy/index.html`).querySelector('main')!.text
      const section1 = policy.replace(/\s+/g, ' ').match(/1\. [^]*?(?= 2\. )/)![0]
      for (const [name, phrase] of Object.entries(DISCLOSED))
        expect(section1, name).toContain(phrase[locale])
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
      expect(select.hasAttribute('required')).toBe(true)
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
      for (const name of Object.keys(DISCLOSED)) {
        const id = input(locale, name).getAttribute('id')!
        const label = form(locale).querySelector(`label[for="${id}"]`)
        expect(label, name).not.toBeNull()
        expect(label!.classList.contains('sr-only'), name).toBe(false)
        if (name === 'company') expect(label!.text).not.toContain(required)
        else expect(label!.text, name).toContain(required)
      }
    })

    it(`${locale}: each field references its (hidden) error text via aria-describedby`, () => {
      for (const name of Object.keys(DISCLOSED)) {
        const el = input(locale, name)
        const ids = el.getAttribute('aria-describedby')?.split(' ') ?? []
        expect(ids, name).toContain(`${el.getAttribute('id')}-error`)
        for (const id of ids) expect(form(locale).querySelector(`#${id}`), id).not.toBeNull()
        const error = form(locale).querySelector(`#${el.getAttribute('id')}-error`)!
        expect(error.hasAttribute('hidden')).toBe(true)
      }
    })

    it(`${locale}: has a polite live region and a submit button that is never disabled`, () => {
      expect(form(locale).querySelector('[role="status"][aria-live="polite"]')).not.toBeNull()
      const submit = form(locale).querySelector('button[type="submit"]')!
      expect(submit.hasAttribute('disabled')).toBe(false)
      expect(submit.text.trim().length).toBeGreaterThan(0)
    })

    it(`${locale}: a privacy notice next to submit names FormSubmit and links the policy`, () => {
      const notice = form(locale).querySelector('[data-privacy-notice]')!
      expect(notice.text).toContain('FormSubmit')
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
