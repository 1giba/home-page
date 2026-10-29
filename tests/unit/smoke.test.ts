import { describe, expect, it } from 'vitest'
import * as site from '@/config/site'

// Exact destinations from SPEC §13.1; these must survive the redesign unchanged.
describe('site constants', () => {
  it('pins the canonical origin and legal name', () => {
    expect(site.SITE_URL).toBe('https://codehappy.com.br')
    expect(site.LEGAL_NAME).toBe('Code Happy Tecnologia Ltda.')
  })

  it('keeps the domain unconfirmed until F8-01 (launch-check gate, plan F6-03)', () => {
    expect(site.SITE_URL_CONFIRMED).toBe(false)
  })

  it('keeps the existing contact destinations', () => {
    expect(site.CONTACT_EMAIL).toBe('contato@codehappy.com.br')
    expect(site.CALENDLY_URL).toBe('https://calendly.com/1giba')
    expect(site.SOCIAL).toEqual({
      github: 'https://github.com/1giba',
      linkedin: 'https://linkedin.com/in/1giba',
      x: 'https://x.com/1_giba',
    })
  })

  it('posts the form to FormSubmit for the contact address', () => {
    expect(site.FORMSUBMIT_ACTION).toBe('https://formsubmit.co/contato@codehappy.com.br')
    expect(site.FORMSUBMIT_AJAX).toBe('https://formsubmit.co/ajax/contato@codehappy.com.br')
  })
})
