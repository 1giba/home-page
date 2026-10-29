import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { distDir, listHtmlFiles, readHtml } from './helpers'

// SPEC §12.1 / §9.3, plan F5-02 Step 5 and F7-01: first-party JS only on pages with the contact
// form, ≤ 10 KB gzipped, and no script or stylesheet from another host anywhere. The one exception
// is the inline theme initializer (dark/light theme, 26 Oct 2026), held to its own small budget.
const CONTACT = ['pt-br/contact/index.html', 'en/contact/index.html']
const THEME_BUDGET = 1024

/** URLs a stylesheet would fetch: url(...) and @import "...". */
const cssUrls = (css: string) => [
  ...[...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((m) => m[2].trim()),
  ...[...css.matchAll(/@import\s+(['"])([^'"]+)\1/g)].map((m) => m[2].trim()),
]
const allScripts = (rel: string) =>
  readHtml(rel)
    .querySelectorAll('script')
    .filter((s) => s.getAttribute('type') !== 'application/ld+json')
const isTheme = (s: ReturnType<typeof allScripts>[number]) => s.hasAttribute('data-theme-init')
/** Every script except the theme initializer. */
const scripts = (rel: string) => allScripts(rel).filter((s) => !isTheme(s))

describe('theme initializer', () => {
  it('every page has exactly one, inline, first in <head> after the meta tags', () => {
    for (const file of listHtmlFiles()) {
      const doc = readHtml(file)
      // Astro's generated redirect stubs (legacy URLs) render nothing and are skipped.
      if (doc.querySelector('meta[http-equiv="refresh"]')) continue
      const theme = doc.querySelectorAll('script').filter(isTheme)
      expect(theme, file).toHaveLength(1)
      expect(theme[0].getAttribute('src'), file).toBeUndefined()
      expect(theme[0].parentNode, file).toBe(doc.querySelector('head'))
      // Nothing that loads or renders comes before it, so it runs before first paint.
      const before = doc
        .querySelector('head')!
        .childNodes.filter((n) => 'tagName' in n && (n as { tagName: string }).tagName !== 'META')
      expect(before[0], file).toBe(theme[0])
    }
  })

  it('is ≤ 1 KB gzipped, makes no requests and only touches the theme', () => {
    const text = allScripts('en/index.html').filter(isTheme)[0].text
    expect(gzipSync(text).length).toBeLessThanOrEqual(THEME_BUDGET)
    expect(text).not.toMatch(/\b(fetch|XMLHttpRequest|import|sendBeacon|cookie|WebSocket)\b/)
    expect(text).toContain("localStorage.getItem('theme')")
  })
})

describe('first-party JavaScript budget', () => {
  it('only the contact pages ship a script', () => {
    const withScript = listHtmlFiles().filter((f) => scripts(f).length > 0)
    expect(withScript.sort()).toEqual([...CONTACT].sort())
  })

  it('the contact script is first-party and ≤ 10 KB gzipped (inline or bundled)', () => {
    for (const page of CONTACT) {
      let bytes = 0
      for (const s of scripts(page)) {
        const src = s.getAttribute('src')
        if (src) {
          expect(src, page).toMatch(/^\/_astro\/[^/]+\.js$/)
          bytes += gzipSync(readFileSync(join(distDir, src))).length
        } else {
          bytes += gzipSync(s.text).length
        }
      }
      expect(bytes, page).toBeGreaterThan(0)
      expect(bytes, page).toBeLessThanOrEqual(10240)
    }
  })

  // Review F7: every attribute that makes the browser fetch something on load, not only
  // script/link (Global Constraints: no Calendly embed, no font CDN, no third-party requests).
  it('nothing on any page loads from another host (no third-party requests)', () => {
    const attr = (doc: ReturnType<typeof readHtml>, selector: string, name: string) =>
      doc.querySelectorAll(selector).map((el) => el.getAttribute(name) ?? '')
    for (const file of listHtmlFiles()) {
      const doc = readHtml(file)
      const loaded = [
        ...attr(doc, 'script[src]', 'src'),
        // Canonical and hreflang links are not requests; everything else a <link> names is.
        ...doc
          .querySelectorAll('link[href]')
          .filter((l) => !['canonical', 'alternate'].includes(l.getAttribute('rel') ?? ''))
          .map((l) => l.getAttribute('href') ?? ''),
        ...attr(
          doc,
          'img[src], iframe[src], embed[src], audio[src], video[src], source[src]',
          'src'
        ),
        ...attr(doc, 'input[type="image"][src], track[src]', 'src'),
        ...attr(doc, 'video[poster]', 'poster'),
        ...attr(doc, 'object[data]', 'data'),
        ...doc
          .querySelectorAll('img[srcset], source[srcset]')
          .flatMap((el) =>
            (el.getAttribute('srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0])
          ),
        ...[...doc.querySelectorAll('[style], style')].flatMap((el) =>
          cssUrls(el.getAttribute('style') ?? el.text)
        ),
      ]
      for (const url of loaded) expect(url, `${file} → ${url}`).toMatch(/^(\/(?!\/)|data:)/)
      // Inline module scripts must not import code from elsewhere either.
      for (const s of doc.querySelectorAll('script:not([src])'))
        expect(s.text, file).not.toMatch(/\bimport\b[^;]*["'`](https?:)?\/\//)
    }
  })

  it('no stylesheet imports or references anything from another host', () => {
    const css = readdirSync(join(distDir, '_astro')).filter((f) => f.endsWith('.css'))
    expect(css.length).toBeGreaterThan(0)
    for (const f of css)
      for (const url of cssUrls(readFileSync(join(distDir, '_astro', f), 'utf8')))
        expect(url, f).toMatch(/^(\/(?!\/)|data:|#)/)
  })
})
