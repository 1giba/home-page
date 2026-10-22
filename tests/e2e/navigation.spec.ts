import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { SOCIAL } from '../../src/config/site'

// Runs against the placeholder `/` page (pt-br) until F2-02 adds the localized routes.
// Locale/URL-specific behaviour is covered by tests/unit/site-chrome.test.ts.
const URL = '/'
const MOBILE = { width: 375, height: 800 }
const DESKTOP = { width: 1280, height: 900 }

/** Tabs through the page and returns a description of every element that receives focus. */
async function tabThrough(page: Page, max = 40) {
  const seen: {
    label: string
    outlineWidth: number
    outlineStyle: string
    visible: boolean
    unobscured: boolean
  }[] = []
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      if (!el || el === document.body) return null
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      // WCAG 2.2 SC 2.4.11: the focused element must not be hidden by other content.
      const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      return {
        label: `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim() || el.getAttribute('aria-label')}"`,
        outlineWidth: parseFloat(s.outlineWidth),
        outlineStyle: s.outlineStyle,
        visible: r.width > 0 && r.height > 0,
        unobscured: !!top && (el === top || el.contains(top)),
      }
    })
    // Stop when focus leaves the document or wraps around to the first stop.
    if (!info || info.label === seen[0]?.label) break
    seen.push(info)
  }
  return seen
}

test.describe('keyboard', () => {
  test('the skip link is the first Tab stop, becomes visible, and moves focus to main', async ({
    page,
  }) => {
    await page.goto(URL)
    await page.keyboard.press('Tab')
    const skip = page.locator(':focus')
    await expect(skip).toHaveText('Pular para o conteúdo')
    await expect(skip).toHaveAttribute('href', '#main')
    const box = await skip.boundingBox()
    expect(box && box.width > 1 && box.height > 1).toBe(true)
    await page.keyboard.press('Enter')
    await expect(page.locator('main#main')).toBeFocused()
  })

  for (const [name, viewport] of [
    ['mobile', MOBILE],
    ['desktop', DESKTOP],
  ] as const) {
    test(`every Tab stop is visible with a 2px solid focus outline (${name})`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(URL)
      const stops = await tabThrough(page)
      test
        .info()
        .annotations.push({ type: 'tab order', description: stops.map((s) => s.label).join(' → ') })
      expect(stops.length).toBeGreaterThan(5)
      for (const stop of stops) {
        expect(stop.visible, stop.label).toBe(true)
        expect(stop.unobscured, stop.label).toBe(true)
        expect(stop.outlineStyle, stop.label).toBe('solid')
        expect(stop.outlineWidth, stop.label).toBeGreaterThanOrEqual(2)
      }
    })
  }
})

test('with the mobile menu open, no later Tab stop is hidden under it (WCAG 2.2 SC 2.4.11)', async ({
  page,
}) => {
  await page.setViewportSize(MOBILE)
  await page.goto(URL)
  // Stand-in for real page content (pages arrive in F4): focusable elements at the top of main.
  await page.evaluate(() => {
    document
      .querySelector('main')
      ?.insertAdjacentHTML(
        'afterbegin',
        '<p><a href="#a">probe one</a> <a href="#b">probe two</a></p>'
      )
  })
  await page.locator('header details > summary').click()
  const stops = await tabThrough(page)
  expect(stops.map((s) => s.label)).toContain('a "probe one"')
  for (const stop of stops) expect(stop.unobscured, stop.label).toBe(true)
})

test.describe('large text (SPEC §12.2: 200% text without loss of content, WCAG 1.4.4)', () => {
  for (const width of [320, 375, 1024, 1280]) {
    for (const lang of ['pt-br', 'en'] as const) {
      test(`header stays within the page at ${width}px with 200% text (${lang} copy)`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(URL)
        if (lang === 'en') {
          // Swap in the longer English CTA copy so both languages are exercised on the one page.
          await page.evaluate(() =>
            document
              .querySelectorAll('[data-cta="primary"]')
              .forEach((el) => (el.textContent = 'Book an intro call'))
          )
        }
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
        const summary = page.locator('header details > summary')
        for (const open of [false, true]) {
          if (open && (await summary.isVisible())) await summary.click()
          const problems = await page.evaluate(() => {
            const out: string[] = []
            const overflow = document.documentElement.scrollWidth - window.innerWidth
            if (overflow > 0) out.push(`page scrolls horizontally by ${overflow}px`)
            for (const el of document.querySelectorAll<HTMLElement>('header a, header summary')) {
              if (el.getClientRects().length === 0) continue
              const r = el.getBoundingClientRect()
              const name = (el.textContent ?? '').trim() || el.getAttribute('aria-label')
              if (r.top < 0 || r.left < 0 || r.right > window.innerWidth + 0.5) {
                out.push(
                  `${name} at ${Math.round(r.left)},${Math.round(r.top)}–${Math.round(r.right)}`
                )
              }
            }
            return out
          })
          expect(problems, open ? 'menu open' : 'menu closed').toEqual([])
        }
      })
    }
  }
})

test.describe('mobile menu without JavaScript (SPEC §6.1)', () => {
  test.use({ javaScriptEnabled: false, viewport: MOBILE })

  test('opens and closes from the keyboard and contains the navigation', async ({ page }) => {
    await page.goto(URL)
    const summary = page.locator('header details > summary')
    const menuLink = page.locator('header [data-mobile-panel] a[href="/pt-br/about/"]')
    await expect(summary).toBeVisible()
    await expect(menuLink).toBeHidden()
    await summary.focus()
    await page.keyboard.press('Enter')
    await expect(menuLink).toBeVisible()
    await expect(page.locator('header [data-mobile-panel] [data-lang-switch] a')).toHaveCount(2)
    await page.keyboard.press('Enter')
    await expect(menuLink).toBeHidden()
    await page.keyboard.press('Space')
    await expect(menuLink).toBeVisible()
  })

  test('hides the desktop navigation on small screens', async ({ page }) => {
    await page.goto(URL)
    await expect(page.locator('header [data-desktop-nav]')).toBeHidden()
  })
})

test('desktop shows the inline navigation, switcher and CTA, not the menu button', async ({
  page,
}) => {
  await page.setViewportSize(DESKTOP)
  await page.goto(URL)
  await expect(page.locator('header details > summary')).toBeHidden()
  await expect(page.locator('header [data-desktop-nav] a[href="/pt-br/about/"]')).toBeVisible()
  await expect(page.locator('header [data-desktop-nav] [data-lang-switch]')).toBeVisible()
  await expect(page.locator('header [data-desktop-nav] [data-cta="primary"]')).toBeVisible()
})

test('footer social links point to the exact destinations (SPEC §13.1)', async ({ page }) => {
  await page.goto(URL)
  await expect(page.locator('footer a[aria-label="GitHub"]')).toHaveAttribute('href', SOCIAL.github)
  await expect(page.locator('footer a[aria-label="LinkedIn"]')).toHaveAttribute(
    'href',
    SOCIAL.linkedin
  )
  await expect(page.locator('footer a[aria-label="X"]')).toHaveAttribute('href', SOCIAL.x)
})

test.describe('responsive layout (SPEC §6.3, §12.2)', () => {
  for (const width of [320, 375, 768, 1024, 1440]) {
    test(`no horizontal scrolling at ${width}px, with the menu closed and open`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(URL)
      const overflow = () =>
        page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(await overflow()).toBeLessThanOrEqual(0)
      const summary = page.locator('header details > summary')
      if (await summary.isVisible()) {
        await summary.click()
        expect(await overflow()).toBeLessThanOrEqual(0)
      }
    })
  }

  test('interactive targets are at least 24×24 and primary CTAs at least 44×44 at 320px', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto(URL)
    await page.locator('header details > summary').click()
    const sizes = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('a[href], button, summary')]
        .filter((el) => el.getClientRects().length > 0 && !el.classList.contains('sr-only'))
        .map((el) => {
          const r = el.getBoundingClientRect()
          return {
            label: (el.textContent ?? '').trim() || el.getAttribute('aria-label'),
            w: r.width,
            h: r.height,
            primary: el.dataset.cta === 'primary',
          }
        })
    )
    expect(sizes.length).toBeGreaterThan(5)
    for (const s of sizes) {
      expect(Math.min(s.w, s.h), `${s.label} ${s.w}x${s.h}`).toBeGreaterThanOrEqual(
        s.primary ? 44 : 24
      )
    }
  })
})

test.describe('motion (SPEC §6.4)', () => {
  test('no animations run, and transitions are short', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(URL)
    expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)
    ).toBe('auto')
    const durations = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('*')].flatMap((el) =>
        getComputedStyle(el)
          .transitionDuration.split(',')
          .map((d) => parseFloat(d))
      )
    )
    expect(Math.max(...durations)).toBeLessThanOrEqual(0.2)
  })

  test.describe('with prefers-reduced-motion', () => {
    test.use({ reducedMotion: 'reduce' })
    test('removes transitions entirely', async ({ page }) => {
      await page.setViewportSize(DESKTOP)
      await page.goto(URL)
      const cta = page.locator('header [data-desktop-nav] [data-cta="primary"]')
      expect(await cta.evaluate((el) => getComputedStyle(el).transitionDuration)).toBe('0s')
    })
  })
})

test.describe('automated accessibility scan (WCAG 2.2 AA)', () => {
  const scan = async (page: Page) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    return results.violations
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
  }

  test('desktop has no serious or critical violations', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(URL)
    expect(await scan(page)).toEqual([])
  })

  test('mobile with the menu open has no serious or critical violations', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto(URL)
    await page.locator('header details > summary').click()
    expect(await scan(page)).toEqual([])
  })
})
