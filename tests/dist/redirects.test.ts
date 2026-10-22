import { describe, expect, it } from 'vitest'
import { LEGACY_REDIRECTS } from '@/config/redirects'
import { assertDistBuilt, exists, readRaw } from './helpers'

// Static output has no server redirects, so Astro emits a meta-refresh page per source path.
// Host-native 301s are generated from the same list in F8-02 (SPEC §8.2, §11.10).
describe('root and legacy redirects', () => {
  it('maps / and the four legacy paths to their /pt-br/ equivalents', () => {
    expect(LEGACY_REDIRECTS).toEqual({
      '/': '/pt-br/',
      '/about': '/pt-br/about/',
      '/contact': '/pt-br/contact/',
      '/privacy': '/pt-br/privacy/',
      '/terms': '/pt-br/terms/',
    })
  })

  it('emits a fallback redirect page with a canonical to the target for each source', () => {
    assertDistBuilt()
    for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
      const file = from === '/' ? 'index.html' : `${from.slice(1)}/index.html`
      expect(exists(file), file).toBe(true)
      const html = readRaw(file)
      expect(html, file).toMatch(new RegExp(`http-equiv="refresh" content="0;\\s*url=${to}"`))
      expect(html, file).toContain(`<link rel="canonical" href="https://codehappy.com.br${to}"`)
    }
  })

  it('points every redirect at a page that exists', () => {
    for (const to of Object.values(LEGACY_REDIRECTS)) {
      expect(exists(`${to.slice(1)}index.html`), to).toBe(true)
    }
  })
})
