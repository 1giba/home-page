import { expect, test, type Page } from '@playwright/test'
import { PAGES } from './fixtures'

// Plan F7-02 / SPEC §6.3, §12.2, §15: every page at 320–1440 px without horizontal scroll (menu
// closed and open), 200% text at 320 px and at 1280 px (emulated with a 640 px viewport), and
// target sizes of at least 24×24 px (44×44 for primary CTAs) at 320 px.
const URLS = PAGES.flatMap(({ pt, en }) => [pt, en])
const WIDTHS = [320, 375, 768, 1024, 1440]

const overflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

for (const url of URLS) {
  test(`${url}: no horizontal scroll at ${WIDTHS.join('/')} px, menu closed and open`, async ({
    page,
  }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(url)
      expect(await overflow(page), `${width}px`).toBeLessThanOrEqual(0)
      const summary = page.locator('header details > summary')
      if (await summary.isVisible()) {
        await summary.click()
        expect(await overflow(page), `${width}px, menu open`).toBeLessThanOrEqual(0)
      }
    }
  })

  test(`${url}: 200% text causes no horizontal scroll (320 px, and 1280 px as 640 px)`, async ({
    page,
  }) => {
    for (const width of [320, 640]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(url)
      expect(await overflow(page), `${width}px, 100% text`).toBeLessThanOrEqual(0)
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
      expect(await overflow(page), `${width}px, 200% text`).toBeLessThanOrEqual(0)
    }
  })

  test(`${url}: targets are at least 24×24 (primary CTAs 44×44) at 320 px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 })
    await page.goto(url)
    await page.locator('header details > summary').click()
    const small = await page.evaluate(() =>
      [
        ...document.querySelectorAll<HTMLElement>(
          'a[href], button, summary, input, select, textarea'
        ),
      ]
        .filter((el) => el.getClientRects().length > 0 && !el.classList.contains('sr-only'))
        .filter((el) => !(el instanceof HTMLInputElement && el.type === 'hidden'))
        // WCAG 2.5.8 exempts links inline in a sentence; links that are a paragraph's only
        // content or a list item's only content are standalone targets.
        .filter((el) => {
          if (el.tagName !== 'A') return true
          const parent = el.parentElement
          return !parent || parent.textContent?.trim() === el.textContent?.trim()
        })
        .map((el) => {
          const r = el.getBoundingClientRect()
          const min = el.dataset.cta === 'primary' ? 44 : 24
          const name =
            (el.textContent ?? '').trim() || el.getAttribute('aria-label') || el.id || el.tagName
          return Math.min(r.width, r.height) < min
            ? `${name} ${Math.round(r.width)}x${Math.round(r.height)}`
            : null
        })
        .filter(Boolean)
    )
    expect(small).toEqual([])
  })
}
