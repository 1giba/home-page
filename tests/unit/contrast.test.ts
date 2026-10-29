import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// WCAG 2.2 relative luminance and contrast ratio (https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio).
function luminance(hex: string): number {
  const channels = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!channels) throw new Error(`Not a #rrggbb colour: ${hex}`)
  const [r, g, b] = channels.slice(1).map((h) => {
    const c = parseInt(h, 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const css = readFileSync('src/styles/global.css', 'utf8')

function token(name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})\\s*;`, 'i'))
  if (!match) throw new Error(`--color-${name} not defined as #rrggbb in src/styles/global.css`)
  return match[1]
}

describe('contrastRatio', () => {
  it('matches the WCAG reference values', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 2)
  })
})

describe('design tokens (SPEC §7.3, §12.2: text ≥ 4.5:1)', () => {
  it('defines a white page background', () => {
    expect(token('bg').toLowerCase()).toBe('#ffffff')
  })

  for (const name of ['text', 'muted', 'accent', 'accent-hover', 'error', 'success']) {
    it(`--color-${name} reaches 4.5:1 on the page background`, () => {
      expect(contrastRatio(token(name), token('bg'))).toBeGreaterThanOrEqual(4.5)
    })

    it(`--color-${name} reaches 4.5:1 on the surface background`, () => {
      expect(contrastRatio(token(name), token('surface'))).toBeGreaterThanOrEqual(4.5)
    })
  }

  it('white button text reaches 4.5:1 on the accent and its hover state', () => {
    expect(contrastRatio('#ffffff', token('accent'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio('#ffffff', token('accent-hover'))).toBeGreaterThanOrEqual(4.5)
  })

  it('the focus outline (accent) reaches 3:1 against both backgrounds (SPEC §6.5)', () => {
    expect(contrastRatio(token('accent'), token('bg'))).toBeGreaterThanOrEqual(3)
    expect(contrastRatio(token('accent'), token('surface'))).toBeGreaterThanOrEqual(3)
  })
})

describe('arcade surfaces (text ≥ 4.5:1 on every background it is used on)', () => {
  it('white button text reaches 4.5:1 on the pink CTA and its hover state', () => {
    expect(contrastRatio(token('on-accent'), token('cta'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(token('on-accent'), token('cta-hover'))).toBeGreaterThanOrEqual(4.5)
  })

  for (const surface of ['night', 'night-raised']) {
    for (const name of ['on-night', 'on-night-muted', 'sky', 'sun', 'candy']) {
      it(`--color-${name} reaches 4.5:1 on --color-${surface}`, () => {
        expect(contrastRatio(token(name), token(surface))).toBeGreaterThanOrEqual(4.5)
      })
    }
    it(`the night focus ring (sun) reaches 3:1 on --color-${surface}`, () => {
      expect(contrastRatio(token('sun'), token(surface))).toBeGreaterThanOrEqual(3)
    })
  }

  for (const surface of ['pale', 'pale-strong']) {
    for (const name of ['text', 'muted', 'accent']) {
      it(`--color-${name} reaches 4.5:1 on --color-${surface}`, () => {
        expect(contrastRatio(token(name), token(surface))).toBeGreaterThanOrEqual(4.5)
      })
    }
  }

  it('white text and the sun focus ring work on the accent closing band', () => {
    expect(contrastRatio(token('on-accent'), token('accent'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(token('sun'), token('accent'))).toBeGreaterThanOrEqual(3)
  })
})

describe('dark theme tokens (the default theme)', () => {
  const block = css.match(/:root\[data-theme='dark'\],\s*:root:not\(\[data-theme\]\)\s*\{([^}]*)\}/)
  const dark = (name: string): string => {
    if (!block) throw new Error('dark theme block not found in src/styles/global.css')
    const m = block[1].match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})\\s*;`, 'i'))
    return m ? m[1] : token(name)
  }

  for (const surface of ['bg', 'surface', 'pale', 'pale-strong']) {
    for (const name of ['text', 'muted', 'accent', 'accent-hover', 'error', 'success']) {
      it(`--color-${name} reaches 4.5:1 on --color-${surface}`, () => {
        expect(contrastRatio(dark(name), dark(surface))).toBeGreaterThanOrEqual(4.5)
      })
    }
    it(`the focus outline (accent) reaches 3:1 on --color-${surface}`, () => {
      expect(contrastRatio(dark('accent'), dark(surface))).toBeGreaterThanOrEqual(3)
    })
  }

  it('the form-field border (muted) reaches 3:1 on the page (WCAG 1.4.11)', () => {
    expect(contrastRatio(dark('muted'), dark('bg'))).toBeGreaterThanOrEqual(3)
  })

  it('white text and the sun focus ring work on the closing band', () => {
    expect(contrastRatio(token('on-accent'), token('band'))).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(token('sun'), token('band'))).toBeGreaterThanOrEqual(3)
  })
})
