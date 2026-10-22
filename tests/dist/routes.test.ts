import { describe, expect, it } from 'vitest'
import {
  assertDistBuilt,
  exists,
  hrefToFile,
  isLocalized,
  listHtmlFiles,
  readHtml,
  topLevelDirs,
} from './helpers'

// SPEC §5.1 sitemap, both locales (§8.2); Work routes absent until a case is published (§4.5).
const EXPECTED = [
  '',
  'services/',
  'services/fractional-cto/',
  'services/ai/',
  'services/advisory/',
  'about/',
  'contact/',
  'contact/thanks/',
  'privacy/',
  'terms/',
]

describe('localized routes', () => {
  it('builds every approved page in pt-br and en', () => {
    assertDistBuilt()
    for (const locale of ['pt-br', 'en']) {
      for (const page of EXPECTED) {
        expect(exists(`${locale}/${page}index.html`), `${locale}/${page}`).toBe(true)
      }
    }
  })

  it('builds a 404 page and no Work pages while nothing is published', () => {
    expect(exists('404.html')).toBe(true)
    expect(exists('pt-br/work/index.html')).toBe(false)
    expect(exists('en/work/index.html')).toBe(false)
  })

  it('has no top-level directories other than the locales, assets and legacy redirect stubs', () => {
    const allowed = ['pt-br', 'en', '_astro', 'og', 'about', 'contact', 'privacy', 'terms']
    expect(topLevelDirs().filter((dir) => !allowed.includes(dir))).toEqual([])
  })

  it('sets <html lang> from the URL locale on every localized page (SPEC §8.4)', () => {
    for (const file of listHtmlFiles().filter(isLocalized)) {
      expect(readHtml(file).querySelector('html')?.getAttribute('lang'), file).toBe(
        file.startsWith('pt-br/') ? 'pt-BR' : 'en'
      )
    }
  })

  it('never links the language switcher to a page that does not exist (Review Focus 5)', () => {
    let checked = 0
    for (const file of listHtmlFiles()) {
      for (const a of readHtml(file).querySelectorAll('[data-lang-switch] a')) {
        const href = a.getAttribute('href') ?? ''
        expect(exists(hrefToFile(href)), `${file} → ${href}`).toBe(true)
        checked++
      }
    }
    expect(checked).toBeGreaterThan(0)
  })

  it('shows no language switcher on the 404 page, but links both homes', () => {
    const page = readHtml('404.html')
    expect(page.querySelectorAll('[data-lang-switch]')).toHaveLength(0)
    const hrefs = page.querySelectorAll('main a').map((a) => a.getAttribute('href'))
    expect(hrefs).toEqual(expect.arrayContaining(['/pt-br/', '/en/']))
  })
})

describe('hrefToFile', () => {
  it('maps hrefs to dist files', () => {
    expect(hrefToFile('/pt-br/about/')).toBe('pt-br/about/index.html')
    expect(hrefToFile('/en/contact/?service=ai#form')).toBe('en/contact/index.html')
    expect(hrefToFile('/404.html')).toBe('404.html')
  })
})
