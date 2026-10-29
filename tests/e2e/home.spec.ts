import { expect, test } from '@playwright/test'
import { CALENDLY_URL } from '../../src/config/site'
import { SERVICE_PAGES } from './fixtures'

// Plan F4-01: the home page converts through the intro call and routes to the services.
for (const lang of ['pt-br', 'en'] as const) {
  test(`/${lang}/: the first CTA is the intro call`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    await expect(page.locator('main [data-cta]').first()).toHaveAttribute('href', CALENDLY_URL)
  })

  test(`/${lang}/: the three service cards link to their pages`, async ({ page }) => {
    await page.goto(`/${lang}/`)
    const cards = page.locator('main [data-service-card]')
    await expect(cards).toHaveCount(3)
    for (const id of SERVICE_PAGES) {
      await expect(cards.locator(`a[href="/${lang}/services/${id}/"]`)).toHaveCount(1)
    }
  })

  test(`/${lang}/: with no published work, the evidence is the founder background`, async ({
    page,
  }) => {
    await page.goto(`/${lang}/`)
    const evidence = page.locator('main [data-section="evidence"]')
    await expect(evidence).toContainText('2004')
    await expect(evidence).toContainText('2020')
  })
}
