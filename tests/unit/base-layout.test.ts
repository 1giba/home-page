import { describe, expect, it } from 'vitest'
import BaseLayout from '@/layouts/BaseLayout.astro'
import { focusables, render } from './render'

const page = (locale: 'pt-br' | 'en', path = '/about/') =>
  render(
    BaseLayout,
    { locale, path, title: 'Test page', description: 'A test page description.' },
    `https://codehappy.com.br/${locale}${path}`,
    { default: '<h1>Body</h1>' }
  )

describe('BaseLayout', () => {
  it('sets the document language from the locale (SPEC §8.4)', async () => {
    expect((await page('pt-br')).querySelector('html')?.getAttribute('lang')).toBe('pt-BR')
    expect((await page('en')).querySelector('html')?.getAttribute('lang')).toBe('en')
  })

  it('renders the branded title, charset and viewport (SPEC §11.1)', async () => {
    const doc = await page('en')
    expect(doc.querySelector('title')?.text).toBe('Test page | Code Happy')
    // The home page supplies its complete title, unbranded by the layout.
    expect((await page('en', '/')).querySelector('title')?.text).toBe('Test page')
    expect(doc.querySelector('meta[charset]')?.getAttribute('charset')?.toLowerCase()).toBe('utf-8')
    expect(doc.querySelector('meta[name="viewport"]')?.getAttribute('content')).toBe(
      'width=device-width, initial-scale=1'
    )
  })

  it('makes a localized skip link the first focusable element, targeting main (SPEC §6.1)', async () => {
    for (const [locale, label] of [
      ['pt-br', 'Pular para o conteúdo'],
      ['en', 'Skip to content'],
    ] as const) {
      const first = focusables(await page(locale))[0]
      expect(first?.getAttribute('href'), locale).toBe('#main')
      expect(first?.text.trim(), locale).toBe(label)
    }
  })

  it('renders exactly one main#main that can receive focus from the skip link', async () => {
    const mains = (await page('en')).querySelectorAll('main')
    expect(mains).toHaveLength(1)
    expect(mains[0].getAttribute('id')).toBe('main')
    expect(mains[0].getAttribute('tabindex')).toBe('-1')
    expect(mains[0].querySelector('h1')?.text).toBe('Body')
  })

  it('ships no client-side JavaScript (SPEC §9.3)', async () => {
    const scripts = (await page('pt-br')).querySelectorAll('script')
    expect(scripts.filter((s) => s.getAttribute('type') !== 'application/ld+json')).toHaveLength(0)
  })
})
