import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { CONTACT_EMAIL, LEGAL_NAME, SITE_URL, SOCIAL } from '@/config/site'
import { ui } from '@/i18n/ui'
import { organizationLd, personLd } from '@/lib/jsonld'

// Plan F6-02 / SPEC §11.8: Organization on Home, the founder as a Person on About, confirmed
// details only, and never Review, AggregateRating or priced offers.
describe('organizationLd', () => {
  it('names the company and its public contact points', () => {
    expect(organizationLd()).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Code Happy',
      legalName: LEGAL_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.x],
    })
  })
})

describe('personLd', () => {
  it('the founder, working for Code Happy, with LinkedIn only', () => {
    expect(personLd()).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Giba',
      worksFor: { '@type': 'Organization', name: 'Code Happy', url: SITE_URL },
      sameAs: [SOCIAL.linkedin],
    })
  })
})

describe('default OG image source (plan F6-02)', () => {
  it('uses only design-token colors', () => {
    const css = readFileSync('src/styles/global.css', 'utf8')
    const tokens = new Set(
      [...css.matchAll(/--color-[\w-]+:\s*(#[0-9a-f]{6})/gi)].map(([, hex]) => hex.toLowerCase())
    )
    const svg = readFileSync('src/assets/og/default.svg', 'utf8')
    const used = [...svg.matchAll(/#[0-9a-f]{6}\b/gi)].map(([hex]) => hex.toLowerCase())
    expect(used.length).toBeGreaterThan(0)
    for (const hex of used) expect(tokens, hex).toContain(hex)
  })

  it('is 1200×630 and carries the name and the current home.h1 in both languages', () => {
    const svg = readFileSync('src/assets/og/default.svg', 'utf8')
    expect(svg).toMatch(/<svg[^>]*width="1200"[^>]*height="630"/)
    expect(svg).toContain('>Code Happy</text>')
    // Review F6: the image must follow the copy (E3 may change home.h1).
    for (const locale of ['pt-br', 'en'] as const) {
      const lines = [
        ...svg.matchAll(new RegExp(`<text[^>]*data-lang="${locale}"[^>]*>([^<]*)</text>`, 'g')),
      ]
      expect(lines.length, locale).toBeGreaterThan(0)
      expect(lines.map(([, text]) => text).join(' '), locale).toBe(ui[locale]['home.h1'])
    }
  })

  it('the committed PNG was rendered from the current SVG (run scripts/build-og.mjs)', () => {
    const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex')
    const rendered = JSON.parse(readFileSync('src/assets/og/rendered.json', 'utf8'))
    expect(rendered).toEqual({
      svgSha256: sha('src/assets/og/default.svg'),
      pngSha256: sha('public/og/default.png'),
    })
  })
})
