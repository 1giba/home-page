import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { PAGES } from './fixtures'

// Dark/light theme (26 Oct 2026): dark by default, the system preference on a first visit, an
// explicit choice saved across navigation and reloads, applied before first paint.
const theme = (page: Page) => page.locator('html').getAttribute('data-theme')
const bodyBg = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor)
const DARK_BG = 'rgb(7, 13, 41)'
const LIGHT_BG = 'rgb(255, 255, 255)'

test.describe('first visit', () => {
  for (const [scheme, expected, bg] of [
    ['dark', 'dark', DARK_BG],
    ['light', 'light', LIGHT_BG],
  ] as const) {
    test(`system ${scheme} → ${expected} theme`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.goto('/pt-br/')
      expect(await theme(page)).toBe(expected)
      expect(await bodyBg(page)).toBe(bg)
    })
  }

  // Chromium cannot emulate "no preference" (it reports light), so simulate a browser where the
  // system preference is unavailable: no media query matches.
  test('no system preference available → dark theme', async ({ page }) => {
    await page.addInitScript(() => {
      const never = (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener() {},
          removeEventListener() {},
        }) as unknown as MediaQueryList
      window.matchMedia = never
    })
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/pt-br/')
    expect(await theme(page)).toBe('dark')
    expect(await bodyBg(page)).toBe(DARK_BG)
  })

  test('the theme is set before the body is parsed (no flash of the other theme)', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    // Record data-theme at the moment <body> first appears, before any paint of its content.
    await page.addInitScript(() => {
      // Init scripts run before the document is parsed: watch the whole document for <body>.
      new MutationObserver((_, observer) => {
        if (document.body) {
          ;(window as unknown as { themeAtBody: string | undefined }).themeAtBody =
            document.documentElement.dataset.theme
          observer.disconnect()
        }
      }).observe(document, { childList: true, subtree: true })
    })
    await page.goto('/en/about/')
    expect(
      await page.evaluate(() => (window as unknown as { themeAtBody: string }).themeAtBody)
    ).toBe('light')
  })
})

test.describe('the header toggle', () => {
  for (const width of [375, 1280]) {
    test(`at ${width}px: switches, saves, and keeps the choice across navigation and reloads`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/pt-br/')
      const toggle = page.getByRole('button', { name: 'Tema escuro' })
      await expect(toggle).toBeVisible()
      await expect(toggle).toHaveAttribute('aria-pressed', 'true')

      await toggle.click()
      expect(await theme(page)).toBe('light')
      await expect(toggle).toHaveAttribute('aria-pressed', 'false')
      expect(await bodyBg(page)).toBe(LIGHT_BG)

      // Navigation within the site, then to the other language, then a reload.
      await page.goto('/pt-br/services/')
      expect(await theme(page)).toBe('light')
      await page.goto('/en/services/')
      expect(await theme(page)).toBe('light')
      await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute(
        'aria-pressed',
        'false'
      )
      await page.reload()
      expect(await theme(page)).toBe('light')

      // The saved choice wins over the system preference.
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.reload()
      expect(await theme(page)).toBe('light')

      await page.getByRole('button', { name: 'Dark theme' }).click()
      expect(await theme(page)).toBe('dark')
      await page.goto('/pt-br/contact/')
      expect(await theme(page)).toBe('dark')
    })
  }

  test('works from the keyboard', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/en/')
    await page.getByRole('button', { name: 'Dark theme' }).focus()
    await page.keyboard.press('Enter')
    expect(await theme(page)).toBe('light')
    await page.keyboard.press('Space')
    expect(await theme(page)).toBe('dark')
  })

  test('still switches when storage is blocked (the choice just is not kept)', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new DOMException('blocked', 'SecurityError')
        },
      })
    })
    await page.emulateMedia({ colorScheme: 'dark' })
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto('/en/')
    expect(await theme(page)).toBe('dark')
    await page.getByRole('button', { name: 'Dark theme' }).click()
    expect(await theme(page)).toBe('light')
    expect(errors).toEqual([])
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('the page is dark and the toggle, which could not work, is hidden', async ({ page }) => {
    await page.goto('/pt-br/')
    expect(await bodyBg(page)).toBe(DARK_BG)
    await expect(page.locator('[data-theme-toggle]')).toBeHidden()
  })
})

test.describe('language selector', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('flags and codes, full names for assistive technology, current marked', async ({ page }) => {
    await page.goto('/pt-br/services/ai/')
    const nav = page.locator('header [data-desktop-nav] [data-lang-switch]')
    const pt = nav.getByRole('link', { name: 'PT – Português (Brasil)' })
    const en = nav.getByRole('link', { name: 'EN – English' })
    await expect(pt).toHaveAttribute('aria-current', 'true')
    await expect(en).not.toHaveAttribute('aria-current', /.*/)
    await expect(pt.locator('svg')).toBeVisible()
    // The current language is shown by a border too, not by colour alone.
    expect(await pt.evaluate((a) => getComputedStyle(a).borderTopColor)).not.toBe(
      await en.evaluate((a) => getComputedStyle(a).borderTopColor)
    )
    await en.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/en\/services\/ai\/$/)
  })

  test('works in the mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/en/contact/')
    await page.locator('header details > summary').click()
    await page
      .locator('header [data-mobile-panel] [data-lang-switch]')
      .getByRole('link', { name: 'PT – Português (Brasil)' })
      .click()
    await expect(page).toHaveURL(/\/pt-br\/contact\/$/)
  })
})

// a11y.spec.ts scans every page in Playwright's default light scheme; this repeats the scan in
// the dark theme (contrast in particular), with the mobile menu open on small screens.
test.describe('dark theme accessibility', () => {
  const URLS = [...PAGES.flatMap(({ pt, en }) => [pt, en]), '/404.html']
  for (const url of URLS) {
    test(`${url}: no serious or critical axe violations in the dark theme`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      for (const width of [1280, 375]) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(url)
        expect(await theme(page)).toBe('dark')
        if (width === 375) await page.locator('header details > summary').click()
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()
        const serious = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${width}px ${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
        expect(serious).toEqual([])
      }
    })
  }
})
