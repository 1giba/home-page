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
