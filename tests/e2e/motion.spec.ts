import { expect, test } from '@playwright/test'
import { PAGES } from './fixtures'

// Plan F7-02 / SPEC §6.4, §12.2: nothing animates on load; transitions are short; with
// prefers-reduced-motion, smooth scrolling and transitions are off.
const URLS = [...PAGES.flatMap(({ pt, en }) => [pt, en]), '/404.html']
const DESKTOP = { width: 1280, height: 900 }

for (const url of URLS) {
  test(`${url}: no running animations after load; transitions ≤ 200 ms`, async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(url)
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
    const longest = await page.evaluate(() =>
      Math.max(
        ...[...document.querySelectorAll<HTMLElement>('*')].flatMap((el) =>
          getComputedStyle(el)
            .transitionDuration.split(',')
            .map((d) => parseFloat(d))
        )
      )
    )
    expect(longest).toBeLessThanOrEqual(0.2)
  })
}

test.describe('with prefers-reduced-motion: reduce', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const url of URLS) {
    test(`${url}: no smooth scrolling and no transitions`, async ({ page }) => {
      await page.setViewportSize(DESKTOP)
      await page.goto(url)
      expect(
        await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
      ).toBe('auto')
      const primary = page.locator('[data-cta="primary"]').first()
      expect(await primary.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s')
      const longest = await page.evaluate(() =>
        Math.max(
          ...[...document.querySelectorAll<HTMLElement>('*')].flatMap((el) =>
            getComputedStyle(el)
              .transitionDuration.split(',')
              .map((d) => parseFloat(d))
          )
        )
      )
      expect(longest).toBe(0)
    })
  }
})
