import { describe, expect, it } from 'vitest'
import { assertDistBuilt, listHtmlFiles, readHtml, urlPathFor } from './helpers'

describe('build output', () => {
  it('exists', () => {
    assertDistBuilt()
  })

  it('contains at least one real HTML page with a lang attribute and a body', () => {
    assertDistBuilt()
    const pages = listHtmlFiles()
    expect(pages.length).toBeGreaterThan(0)
    for (const page of pages) {
      const html = readHtml(page)
      expect(html.querySelector('html')?.getAttribute('lang'), page).toMatch(/^(pt-BR|en)$/)
      expect(html.querySelector('body')?.text.trim(), page).not.toBe('')
    }
  })
})

describe('urlPathFor', () => {
  it('maps directory-style files to trailing-slash URLs', () => {
    expect(urlPathFor('index.html')).toBe('/')
    expect(urlPathFor('pt-br/about/index.html')).toBe('/pt-br/about/')
    expect(urlPathFor('404.html')).toBe('/404.html')
  })
})
