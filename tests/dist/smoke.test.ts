import { describe, expect, it } from 'vitest'
import { assertDistBuilt, isRedirectStub, listHtmlFiles, readHtml, urlPathFor } from './helpers'

describe('build output', () => {
  it('exists', () => {
    assertDistBuilt()
  })

  it('gives every real page a lang attribute and a body', () => {
    assertDistBuilt()
    // Astro's meta-refresh redirect stubs are not pages (no <html lang>); redirects.test.ts covers them.
    const pages = listHtmlFiles().filter((f) => !isRedirectStub(f))
    expect(pages.length).toBeGreaterThan(0)
    for (const page of pages) {
      const html = readHtml(page)
      expect(html.querySelector('html')?.getAttribute('lang'), page).toMatch(/^(pt-BR|en)$/)
      expect(html.querySelector('body')?.text.trim(), page).not.toBe('')
    }
  })
})

describe('isRedirectStub', () => {
  it('recognises exactly the configured redirect sources', () => {
    const stubs = listHtmlFiles().filter(isRedirectStub).sort()
    expect(stubs).toEqual([
      'about/index.html',
      'contact/index.html',
      'index.html',
      'privacy/index.html',
      'terms/index.html',
    ])
  })
})

describe('urlPathFor', () => {
  it('maps directory-style files to trailing-slash URLs', () => {
    expect(urlPathFor('index.html')).toBe('/')
    expect(urlPathFor('pt-br/about/index.html')).toBe('/pt-br/about/')
    expect(urlPathFor('404.html')).toBe('/404.html')
  })
})
