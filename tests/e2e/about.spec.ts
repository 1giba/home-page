import { expect, test } from '@playwright/test'
import { SOCIAL } from '../../src/config/site'

// Plan F4-03: About shows the founder by name, with a LinkedIn link.
for (const lang of ['pt-br', 'en'] as const) {
  test(`/${lang}/about/ names the founder and links to LinkedIn`, async ({ page }) => {
    await page.goto(`/${lang}/about/`)
    await expect(page.locator('main')).toContainText('Giba')
    await expect(page.locator(`main a[href="${SOCIAL.linkedin}"]`)).toBeVisible()
  })
}
