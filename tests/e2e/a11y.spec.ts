import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { PAGES } from './fixtures'

// Plan F7-02 / SPEC §12.2, §15: axe (WCAG 2.2 AA tags) finds no serious or critical issue on any
// page, including with the mobile menu open and with the contact form showing its errors; and no
// page logs a console error or warning (plan F7-03 "Console", automated here).
const URLS = [...PAGES.flatMap(({ pt, en }) => [pt, en]), '/404.html']
const MOBILE = { width: 375, height: 800 }
const DESKTOP = { width: 1280, height: 900 }

async function scan(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
}

/** Opens `url`; collects console errors and warnings and uncaught page errors (plan F7-03). */
async function open(page: Page, url: string) {
  const errors: string[] = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto(url)
  return errors
}

for (const url of URLS) {
  test(`${url}: no serious or critical axe violations, no console errors (desktop)`, async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP)
    const errors = await open(page, url)
    expect(await scan(page)).toEqual([])
    expect(errors).toEqual([])
  })

  test(`${url}: no serious or critical axe violations with the mobile menu open`, async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE)
    const errors = await open(page, url)
    await page.locator('header details > summary').click()
    await expect(page.locator('header details')).toHaveAttribute('open', '')
    expect(await scan(page)).toEqual([])
    expect(errors).toEqual([])
  })
}

for (const lang of ['pt-br', 'en'] as const) {
  test(`/${lang}/contact/: no serious or critical axe violations with form errors shown`, async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP)
    const errors = await open(page, `/${lang}/contact/`)
    await page.route('https://formsubmit.co/**', (route) => route.abort())
    await page.locator('[data-contact-form] button[type="submit"]').click()
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true')
    expect(await scan(page)).toEqual([])
    expect(errors).toEqual([])
  })
}
