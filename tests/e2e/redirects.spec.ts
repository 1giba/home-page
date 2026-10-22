import { expect, test } from '@playwright/test'

// Review Focus 1: legacy URLs, with or without trailing slash or a query, land on /pt-br/.
const LANDS_ON = (path: string) => new RegExp(`/pt-br${path}(\\?[^#]*)?$`)

async function expectLanding(page: import('@playwright/test').Page, from: string, to: string) {
  await page.goto(from)
  await expect(page).toHaveURL(LANDS_ON(to))
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.locator('h1')).toBeVisible()
}

const SLASHED: [from: string, to: string][] = [
  ['/', '/'],
  ['/about/', '/about/'],
  ['/contact/?ref=x', '/contact/'],
  ['/privacy/', '/privacy/'],
  ['/terms/', '/terms/'],
]

for (const [from, to] of SLASHED) {
  test(`${from} lands on /pt-br${to}`, async ({ page }) => {
    await expectLanding(page, from, to)
  })
}

// The old SPA served slash-less paths (/about). `astro preview` answers 404 for every slash-less
// path under trailingSlash: 'always' (real pages included), so these are only meaningful against
// the deployed host, whose native rules (plan F8-02) redirect both forms. Run them there with
// PLAYWRIGHT_BASE_URL (plan F8-03/F8-04).
test.describe('slash-less legacy URLs on the deployed host', () => {
  test.skip(
    !process.env.PLAYWRIGHT_BASE_URL,
    'astro preview 404s slash-less paths; covered by host-native redirects (F8-02), run with PLAYWRIGHT_BASE_URL'
  )

  for (const [from, to] of [
    ['/about', '/about/'],
    ['/contact?ref=x', '/contact/'],
    ['/privacy', '/privacy/'],
    ['/terms', '/terms/'],
  ] as const) {
    test(`${from} lands on /pt-br${to}`, async ({ page }) => {
      await expectLanding(page, from, to)
    })
  }
})
