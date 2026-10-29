import { expect, test, type Page } from '@playwright/test'

// Plan F7-03 keyboard pass, as a repeatable spec (keyboard emulation; a person should still
// confirm on a real device — QA report). Home and Contact, both locales, at 375 and 1280 px:
// the skip link works, every Tab stop is visibly focused and not covered, the mobile menu works
// from the keyboard, and the contact form can be completed without a pointer.
async function tabStops(page: Page, max = 60) {
  const stops: { label: string; outline: boolean; unobscured: boolean }[] = []
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      if (!el || el === document.body) return null
      const s = getComputedStyle(el)
      const box = el.getClientRects()[0] ?? el.getBoundingClientRect()
      const top = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
      return {
        label: `${el.tagName.toLowerCase()} ${(el.textContent ?? '').trim().slice(0, 30) || el.getAttribute('aria-label') || el.id}`,
        outline: parseFloat(s.outlineWidth) >= 2 && s.outlineStyle !== 'none',
        unobscured: !!top && (el === top || el.contains(top)),
      }
    })
    if (!info || info.label === stops[0]?.label) break
    stops.push(info)
  }
  return stops
}

for (const lang of ['pt-br', 'en'] as const) {
  for (const width of [375, 1280]) {
    for (const path of [`/${lang}/`, `/${lang}/contact/`]) {
      test(`${path} at ${width}px: skip link, visible focus on every stop`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path)
        await page.keyboard.press('Tab')
        await expect(page.locator(':focus')).toHaveAttribute('href', '#main')
        await page.keyboard.press('Enter')
        await expect(page.locator('main')).toBeFocused()

        await page.goto(path)
        const stops = await tabStops(page)
        expect(stops.length).toBeGreaterThan(10)
        expect(stops.filter((s) => !s.outline || !s.unobscured).map((s) => s.label)).toEqual([])
      })

      if (width === 375) {
        test(`${path} at 375px: the menu opens and closes from the keyboard`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 })
          await page.goto(path)
          const details = page.locator('header details')
          await page.locator('header details > summary').focus()
          await page.keyboard.press('Enter')
          await expect(details).toHaveAttribute('open', '')
          await page.keyboard.press('Enter')
          await expect(details).not.toHaveAttribute('open', '')
        })
      }

      if (path.endsWith('/contact/')) {
        test(`${path} at ${width}px: the form works from the keyboard alone`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 })
          await page.route('https://formsubmit.co/**', (route) =>
            route.fulfill({
              status: 200,
              contentType: 'application/json',
              body: '{"success":"true"}',
            })
          )
          await page.goto(path)
          await page.locator('[data-contact-form] button[type="submit"]').focus()
          await page.keyboard.press('Enter')
          await expect(page.locator('#name')).toBeFocused()
          await page.keyboard.type('Maria Teste')
          await page.keyboard.press('Tab')
          await page.keyboard.type('maria@example.com')
          await page.keyboard.press('Tab')
          await page.keyboard.press('Tab') // company is optional
          await page.keyboard.press('ArrowUp') // service: "other" → the option above it
          await expect(page.locator('#service')).toHaveValue('advisory')
          await page.keyboard.press('Tab')
          await page.keyboard.type('Mensagem escrita só com o teclado.')
          await page.keyboard.press('Tab') // privacy policy link
          await page.keyboard.press('Tab') // submit
          await page.keyboard.press('Enter')
          await expect(page.locator('[data-contact-success] h2')).toBeFocused()
        })
      }
    }
  }
}
