import { expect, test } from '@playwright/test'

test('the built site serves a page with a document language', async ({ page }) => {
  const response = await page.goto('/pt-br/')
  expect(response?.ok()).toBe(true)
  await expect(page.locator('html')).toHaveAttribute('lang', /^(pt-BR|en)$/)
})
