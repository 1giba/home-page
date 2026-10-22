import { describe, expect, it } from 'vitest'
import type { HTMLElement } from 'node-html-parser'
import BaseLayout from '@/layouts/BaseLayout.astro'
import { CALENDLY_URL, CONTACT_EMAIL, LEGAL_NAME, SOCIAL } from '@/config/site'
import { render } from './render'

const at = (locale: 'pt-br' | 'en', url: string, props: Record<string, unknown> = {}) =>
  render(BaseLayout, { locale, title: 't', ...props }, `https://codehappy.com.br${url}`, {
    default: '<h1>x</h1>',
  })

const hrefs = (root: HTMLElement | null | undefined) =>
  [...new Set((root?.querySelectorAll('a') ?? []).map((a) => a.getAttribute('href')))].sort()

describe('header navigation (SPEC §6.1)', () => {
  it('links the wordmark and every nav item to the current locale', async () => {
    const header = (await at('en', '/en/about/')).querySelector('header')
    expect(header?.querySelector('a')?.text.trim()).toBe('Code Happy')
    expect(header?.querySelector('a')?.getAttribute('href')).toBe('/en/')
    const navHrefs = hrefs(header?.querySelector('nav'))
    expect(navHrefs).toEqual(['/en/about/', '/en/contact/', '/en/services/'])
  })

  it('labels nav items in the page language', async () => {
    const pt = (await at('pt-br', '/pt-br/')).querySelector('header nav')
    expect(pt?.querySelectorAll('a').map((a) => a.text.trim())).toEqual([
      'Serviços',
      'Sobre',
      'Contato',
    ])
    const en = (await at('en', '/en/')).querySelector('header nav')
    expect(en?.querySelectorAll('a').map((a) => a.text.trim())).toEqual([
      'Services',
      'About',
      'Contact',
    ])
  })

  it('hides Work until a case study is published, and shows it when asked (SPEC §4.5)', async () => {
    const without = await at('en', '/en/')
    expect(without.querySelectorAll('a[href="/en/work/"]')).toHaveLength(0)
    const withWork = await at('en', '/en/', { showWork: true })
    expect(withWork.querySelector('header nav a[href="/en/work/"]')?.text.trim()).toBe('Work')
  })

  it('marks the current page with aria-current="page" and its section with "true"', async () => {
    const about = await at('en', '/en/about/')
    for (const a of about.querySelectorAll('header nav a[href="/en/about/"]')) {
      expect(a.getAttribute('aria-current')).toBe('page')
    }
    // Desktop and mobile navs each mark exactly one item.
    for (const nav of about.querySelectorAll('header nav')) {
      expect(nav.querySelectorAll('a[aria-current]')).toHaveLength(1)
    }

    const service = await at('en', '/en/services/ai/')
    expect(
      service.querySelector('header nav a[href="/en/services/"]')?.getAttribute('aria-current')
    ).toBe('true')

    const home = await at('en', '/en/')
    expect(home.querySelectorAll('header nav a[aria-current]')).toHaveLength(0)
  })

  it('offers the booking CTA in the same tab with the spec copy (SPEC §6.2)', async () => {
    for (const [locale, label] of [
      ['pt-br', 'Agendar uma conversa'],
      ['en', 'Book an intro call'],
    ] as const) {
      const ctas = (await at(locale, `/${locale}/`)).querySelectorAll(
        `header a[href="${CALENDLY_URL}"]`
      )
      expect(ctas.length, locale).toBeGreaterThan(0)
      for (const cta of ctas) {
        // Visible label first; the screen-reader external-site hint is checked separately below.
        expect(cta.text.replace(/\s+/g, ' ').trim().startsWith(label)).toBe(true)
        expect(cta.getAttribute('target')).toBeUndefined()
      }
    }
  })

  it('repeats the nav, switcher and CTA in a mobile panel toggled by a no-JS <details>', async () => {
    const header = (await at('pt-br', '/pt-br/about/')).querySelector('header')
    const summary = header?.querySelector('details[data-menu] > summary')
    expect(summary?.text.trim()).toBe('Menu')
    const panel = header?.querySelector('[data-mobile-panel]')
    expect(summary?.getAttribute('aria-controls')).toBe(panel?.getAttribute('id'))
    expect(hrefs(panel)).toEqual(
      [
        '/pt-br/services/',
        '/pt-br/about/',
        '/pt-br/contact/',
        CALENDLY_URL,
        '/pt-br/about/',
        '/en/about/',
      ]
        .filter((v, i, all) => all.indexOf(v) === i)
        .sort()
    )
  })
})

describe('external links (SPEC §7.3: identifiable)', () => {
  it('marks the off-site booking CTA visually and for screen readers, in the page language', async () => {
    for (const [locale, hint] of [
      ['pt-br', '(site externo)'],
      ['en', '(external site)'],
    ] as const) {
      const ctas = (await at(locale, `/${locale}/`)).querySelectorAll(`a[href="${CALENDLY_URL}"]`)
      expect(ctas.length, locale).toBeGreaterThan(0)
      for (const cta of ctas) {
        expect(cta.querySelector('svg[aria-hidden="true"]'), locale).not.toBeNull()
        expect(cta.querySelector('.sr-only')?.text.trim(), locale).toBe(hint)
      }
    }
  })
})

describe('language switcher (SPEC §8.4)', () => {
  const switcher = (doc: HTMLElement) => doc.querySelector('header [data-lang-switch]')

  it('links to the same page in each language, named in its own language', async () => {
    const list = switcher(await at('pt-br', '/pt-br/services/ai/'))
    const links = list?.querySelectorAll('a') ?? []
    expect(links.map((a) => [a.text.trim(), a.getAttribute('href')])).toEqual([
      ['Português', '/pt-br/services/ai/'],
      ['English', '/en/services/ai/'],
    ])
  })

  it('marks the current language and declares lang/hreflang on each link', async () => {
    const links = switcher(await at('en', '/en/contact/thanks/'))?.querySelectorAll('a') ?? []
    expect(links.map((a) => a.getAttribute('aria-current'))).toEqual([undefined, 'true'])
    expect(links.map((a) => [a.getAttribute('lang'), a.getAttribute('hreflang')])).toEqual([
      ['pt-BR', 'pt-BR'],
      ['en', 'en'],
    ])
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/pt-br/contact/thanks/',
      '/en/contact/thanks/',
    ])
  })

  it('falls back to each language home outside the locale tree', async () => {
    const links = switcher(await at('pt-br', '/'))?.querySelectorAll('a') ?? []
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/pt-br/', '/en/'])
  })

  it('has an accessible name in the page language', async () => {
    expect(switcher(await at('pt-br', '/pt-br/'))?.getAttribute('aria-label')).toBe('Idioma')
    expect(switcher(await at('en', '/en/'))?.getAttribute('aria-label')).toBe('Language')
  })
})

describe('footer (SPEC §6.1, §13.1)', () => {
  it('links the exact social destinations with accessible names and decorative icons', async () => {
    const footer = (await at('en', '/en/')).querySelector('footer')
    for (const [name, href] of [
      ['GitHub', SOCIAL.github],
      ['LinkedIn', SOCIAL.linkedin],
      ['X', SOCIAL.x],
    ]) {
      const link = footer?.querySelector(`a[href="${href}"]`)
      expect(link?.getAttribute('aria-label'), name).toBe(name)
      expect(link?.querySelector('svg')?.getAttribute('aria-hidden'), name).toBe('true')
    }
  })

  it('shows the contact email, legal name and a build-time copyright range', async () => {
    const footer = (await at('pt-br', '/pt-br/')).querySelector('footer')
    expect(footer?.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`)?.text.trim()).toBe(
      CONTACT_EMAIL
    )
    expect(footer?.text).toContain(LEGAL_NAME)
    expect(footer?.text).toContain(`© 2020–${new Date().getFullYear()}`)
  })

  it('links privacy and terms in the page language', async () => {
    const pt = (await at('pt-br', '/pt-br/')).querySelector('footer')
    expect(pt?.querySelector('a[href="/pt-br/privacy/"]')?.text.trim()).toBe(
      'Política de Privacidade'
    )
    expect(pt?.querySelector('a[href="/pt-br/terms/"]')?.text.trim()).toBe('Termos de Uso')
    const en = (await at('en', '/en/')).querySelector('footer')
    expect(en?.querySelector('a[href="/en/privacy/"]')?.text.trim()).toBe('Privacy Policy')
    expect(en?.querySelector('a[href="/en/terms/"]')?.text.trim()).toBe('Terms of Use')
  })
})

describe('whole layout', () => {
  it('opens no link in a new tab and ships no script (SPEC §6.2, §9.3)', async () => {
    const doc = await at('en', '/en/about/', { showWork: true })
    expect(doc.querySelectorAll('a[target]')).toHaveLength(0)
    expect(doc.querySelectorAll('script')).toHaveLength(0)
  })
})
