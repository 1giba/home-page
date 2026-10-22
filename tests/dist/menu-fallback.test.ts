import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { assertDistBuilt, distDir } from './helpers'

// Chromium (the only test browser) supports :has(), so the no-:has() path cannot run in e2e.
// This checks the shipped CSS instead: without :has() the mobile panel stays visible, so the
// <details> toggle must be hidden or it would announce "collapsed" while the menu is shown.
describe('mobile menu without :has() support', () => {
  it('hides the toggle in browsers that cannot hide the panel', () => {
    assertDistBuilt()
    const css = readdirSync(join(distDir, '_astro'))
      .filter((f) => f.endsWith('.css'))
      .map((f) => readFileSync(join(distDir, '_astro', f), 'utf8'))
      .join('\n')
    const block = css.match(/@supports not selector\(:has\(\*\)\)\s*\{([^{}]*\{[^{}]*\})+\s*\}/)
    expect(block, 'no @supports not selector(:has(*)) block in built CSS').not.toBeNull()
    // Astro's scoping adds [data-astro-cid-…] next to [data-menu], in either order.
    expect(block?.[0]).toMatch(
      /details(\[[^\]]+\])*\[data-menu\](\[[^\]]+\])*\s*\{\s*display:\s*none/
    )
  })
})
