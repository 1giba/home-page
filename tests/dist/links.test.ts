import { describe, expect, it } from 'vitest'
import {
  CALENDLY_URL,
  CONTACT_EMAIL,
  FORMSUBMIT_ACTION,
  SITE_URL,
  SOCIAL,
} from '../../src/config/site'
import { exists, hrefToFile, listHtmlFiles, readHtml, readRaw, urlPathFor } from './helpers'

// Plan F7-01 / SPEC §11.9, §15 "Links & deployment": no broken internal link or anchor in dist/,
// no orphaned page, and external links only to the destinations the site really uses (§13.1).
const EXTERNAL_ALLOWED = new Set<string>([
  FORMSUBMIT_ACTION,
  CALENDLY_URL,
  SOCIAL.github,
  SOCIAL.linkedin,
  SOCIAL.x,
  // Linked from the privacy policy (F4-05).
  'https://calendly.com/legal/privacy-notice',
])
const MAILTO_ALLOWED = new Set([`mailto:${CONTACT_EMAIL}`])

/** Every URL-bearing attribute a page can make the browser or a visitor follow. */
function urls(file: string): string[] {
  const doc = readHtml(file)
  const attr = (selector: string, name: string) =>
    doc.querySelectorAll(selector).map((el) => el.getAttribute(name) ?? '')
  return [
    ...attr('a[href]', 'href'),
    ...attr('link[href]', 'href'),
    ...attr('img[src]', 'src'),
    ...attr('script[src]', 'src'),
    ...attr('form[action]', 'action'),
    ...attr('meta[property="og:image"], meta[property="og:url"]', 'content'),
    ...doc
      .querySelectorAll('source[srcset], img[srcset]')
      .flatMap((el) =>
        (el.getAttribute('srcset') ?? '').split(',').map((s) => s.trim().split(/\s+/)[0])
      ),
  ].filter(Boolean)
}

/** Internal path of a root-relative or same-origin absolute URL; null for anything else. */
function internalPath(url: string): string | null {
  if (url.startsWith(SITE_URL + '/')) return url.slice(SITE_URL.length)
  if (url.startsWith('/') && !url.startsWith('//')) return url
  return null
}

const pages = listHtmlFiles()

describe('internal links (SPEC §15)', () => {
  it('every internal URL resolves to a file in dist/', () => {
    for (const file of pages) {
      for (const url of urls(file)) {
        const path = internalPath(url)
        if (path) expect(exists(hrefToFile(path)), `${file} → ${url}`).toBe(true)
      }
    }
  })

  it('every fragment points to an element with that id on the target page', () => {
    let checked = 0
    for (const file of pages) {
      for (const url of urls(file)) {
        const hash = url.indexOf('#')
        if (hash === -1) continue
        const path = url.startsWith('#') ? urlPathFor(file) : internalPath(url.slice(0, hash))
        if (path === null) continue
        const id = decodeURIComponent(url.slice(hash + 1))
        const target = readHtml(hrefToFile(path))
        expect(target.querySelector(`[id="${id}"]`), `${file} → ${url}`).not.toBeNull()
        checked++
      }
    }
    expect(checked).toBeGreaterThan(0) // at least the skip links
  })

  it('no page in the sitemap is orphaned: each is linked from another page (SPEC §11.9)', () => {
    const locs = [...readRaw('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, l]) => l)
    expect(locs.length).toBeGreaterThan(0)
    for (const loc of locs) {
      const path = loc.slice(SITE_URL.length)
      const linkedFrom = pages.filter(
        (file) =>
          urlPathFor(file) !== path &&
          readHtml(file)
            .querySelectorAll('a[href]')
            .some((a) => (a.getAttribute('href') ?? '').replace(/[?#].*$/, '') === path)
      )
      expect(linkedFrom.length, loc).toBeGreaterThan(0)
    }
  })
})

describe('external destinations (SPEC §13.1)', () => {
  it('links only to the allow-listed external URLs and the contact address', () => {
    for (const file of pages) {
      for (const url of urls(file)) {
        if (internalPath(url) !== null || url.startsWith('#')) continue
        if (url.startsWith('mailto:')) expect(MAILTO_ALLOWED, `${file} → ${url}`).toContain(url)
        else expect(EXTERNAL_ALLOWED, `${file} → ${url}`).toContain(url)
      }
    }
  })
})
