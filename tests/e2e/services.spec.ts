import { expect, test } from '@playwright/test'
import { CALENDLY_URL } from '../../src/config/site'
import { SERVICE_PAGES } from './fixtures'

// Plan F4-02 / SPEC §5.2: service pages convert through the intro call, with a message as the
// secondary path pre-selecting the service.
for (const lang of ['pt-br', 'en'] as const) {
  for (const id of SERVICE_PAGES) {
    test(`/${lang}/services/${id}/ has one H1, the booking CTA and a pre-selected contact link`, async ({
      page,
    }) => {
      await page.goto(`/${lang}/services/${id}/`)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator(`main a[href="${CALENDLY_URL}"]`).first()).toBeVisible()
      await expect(page.locator(`main a[href="/${lang}/contact/?service=${id}"]`)).toBeVisible()
    })

    test(`/${lang}/services/${id}/ shows no related-work section while nothing is published`, async ({
      page,
    }) => {
      await page.goto(`/${lang}/services/${id}/`)
      await expect(page.locator('[data-related-work]')).toHaveCount(0)
    })
  }

  test(`/${lang}/services/ links each service page and offers the booking CTA`, async ({
    page,
  }) => {
    await page.goto(`/${lang}/services/`)
    for (const id of SERVICE_PAGES) {
      await expect(page.locator(`main a[href="/${lang}/services/${id}/"]`)).toBeVisible()
    }
    await expect(page.locator(`main a[href="${CALENDLY_URL}"]`).first()).toBeVisible()
  })
}
