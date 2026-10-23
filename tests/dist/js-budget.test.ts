import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { distDir, listHtmlFiles, readHtml } from './helpers'

// SPEC §12.1 / §9.3, plan F5-02 Step 5 and F7-01: first-party JS only on pages with the contact
// form, ≤ 10 KB gzipped, and no script or stylesheet from another host anywhere.
const CONTACT = ['pt-br/contact/index.html', 'en/contact/index.html']
const scripts = (rel: string) =>
  readHtml(rel)
    .querySelectorAll('script')
    .filter((s) => s.getAttribute('type') !== 'application/ld+json')

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

  it('no <script> or <link> loads anything from another host (no third-party requests)', () => {
    for (const file of listHtmlFiles()) {
      const doc = readHtml(file)
      const loaded = [
        ...doc.querySelectorAll('script[src]').map((s) => s.getAttribute('src') ?? ''),
        // Canonical and hreflang links are not requests; everything else a <link> names is.
        ...doc
          .querySelectorAll('link[href]')
          .filter((l) => !['canonical', 'alternate'].includes(l.getAttribute('rel') ?? ''))
          .map((l) => l.getAttribute('href') ?? ''),
      ]
      for (const url of loaded) expect(url, `${file} → ${url}`).toMatch(/^\/(?!\/)/)
    }
  })
})
