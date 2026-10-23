import { expect, test, type Page, type Route } from '@playwright/test'
import { CONTACT_EMAIL, FORMSUBMIT_AJAX } from '../../src/config/site'

// Plan F5-02 / SPEC §13.2, §13.4, Review Focus 2: with JavaScript the form submits through
// FormSubmit's AJAX endpoint and reports success only on a confirmed positive response.
// Every FormSubmit request is intercepted: nothing reaches the network.
const MESSAGE = 'Olá — teste ção 🚀, uma mensagem com acentos.'

/** Intercepts FormSubmit. `ajax` answers the AJAX endpoint; native posts are counted and refused. */
async function mockFormSubmit(page: Page, ajax: (route: Route) => Promise<void>) {
  const calls = { ajax: 0, native: 0, bodies: [] as Record<string, string>[], accept: '' }
  await page.route('https://formsubmit.co/**', async (route) => {
    if (route.request().url() !== FORMSUBMIT_AJAX) {
      calls.native++
      return route.abort()
    }
    calls.ajax++
    calls.accept = route.request().headers()['accept'] ?? ''
    calls.bodies.push(route.request().postDataJSON())
    await ajax(route)
  })
  return calls
}

const json = (body: unknown) => (route: Route) =>
  route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })

async function fillValid(page: Page, message = MESSAGE) {
  await page.locator('#name').fill('Maria Teste')
  await page.locator('#email').fill('maria@example.com')
  await page.locator('#service').selectOption('advisory')
  await page.locator('#message').fill(message)
}

const submit = (page: Page) => page.locator('[data-contact-form] button[type="submit"]')

for (const lang of ['pt-br', 'en'] as const) {
  test.describe(`/${lang}/contact/ with JavaScript`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${lang}/contact/`)
    })

    test('success only after a confirmed response; the success heading gets focus', async ({
      page,
    }) => {
      const calls = await mockFormSubmit(page, json({ success: 'true', message: 'ok' }))
      await fillValid(page)
      await submit(page).click()
      const heading = page.locator('[data-contact-success] h2')
      await expect(heading).toBeFocused()
      await expect(page.locator('[data-contact-form]')).toHaveCount(0)
      expect(calls.ajax).toBe(1)
      expect(calls.native).toBe(0)
      expect(calls.accept).toContain('application/json')
      expect(calls.bodies[0]).toMatchObject({
        name: 'Maria Teste',
        email: 'maria@example.com',
        service: 'advisory',
        message: MESSAGE, // Review Focus 2: diacritics and emoji intact
        _honey: '',
      })
      await expect(page.locator('[data-contact-success]')).toContainText(
        lang === 'pt-br' ? '48 horas' : '48 hours'
      )
    })

    test('server says failure → failure state, values kept, no fallback submission', async ({
      page,
    }) => {
      const calls = await mockFormSubmit(page, json({ success: 'false', message: 'nope' }))
      await fillValid(page)
      await submit(page).click()
      await expect(
        page.locator(`[data-form-status] a[href="mailto:${CONTACT_EMAIL}"]`)
      ).toBeVisible()
      await expect(page.locator('#message')).toHaveValue(MESSAGE)
      await expect(page.locator('#name')).toHaveValue('Maria Teste')
      await expect(page.locator('[data-contact-success]')).toHaveCount(0)
      expect(calls.native).toBe(0)
      // Submission is possible again.
      await submit(page).click()
      await expect.poll(() => calls.ajax).toBe(2)
    })

    test('HTTP error with a success body is still a failure', async ({ page }) => {
      await mockFormSubmit(page, (route) =>
        route.fulfill({ status: 500, contentType: 'application/json', body: '{"success":"true"}' })
      )
      await fillValid(page)
      await submit(page).click()
      await expect(
        page.locator(`[data-form-status] a[href="mailto:${CONTACT_EMAIL}"]`)
      ).toBeVisible()
      await expect(page.locator('[data-contact-success]')).toHaveCount(0)
    })

    test('network error → failure state', async ({ page }) => {
      const calls = await mockFormSubmit(page, (route) => route.abort())
      await fillValid(page)
      await submit(page).click()
      await expect(
        page.locator(`[data-form-status] a[href="mailto:${CONTACT_EMAIL}"]`)
      ).toBeVisible()
      await expect(page.locator('#message')).toHaveValue(MESSAGE)
      expect(calls.native).toBe(0)
    })

    test('double submit sends one request; the button says it is sending', async ({ page }) => {
      const calls = await mockFormSubmit(page, async (route) => {
        await new Promise((r) => setTimeout(r, 500))
        await json({ success: true })(route)
      })
      await fillValid(page)
      await submit(page).click()
      await expect(submit(page)).toHaveText(lang === 'pt-br' ? 'Enviando…' : 'Sending…')
      await expect(page.locator('[data-contact-form]')).toHaveAttribute('aria-busy', 'true')
      await submit(page).click({ force: true })
      await expect(page.locator('[data-contact-success] h2')).toBeFocused()
      expect(calls.ajax).toBe(1)
    })

    test('invalid submit focuses the first invalid field; button not disabled', async ({
      page,
    }) => {
      const calls = await mockFormSubmit(page, json({ success: 'true' }))
      await submit(page).click()
      await expect(page.locator('#name')).toBeFocused()
      for (const id of ['name', 'email', 'message']) {
        await expect(page.locator(`#${id}`)).toHaveAttribute('aria-invalid', 'true')
        await expect(page.locator(`#${id}-error`)).toBeVisible()
        await expect(page.locator(`#${id}-error`)).not.toBeEmpty()
      }
      await expect(page.locator('#company')).not.toHaveAttribute('aria-invalid', 'true')
      await expect(submit(page)).toBeEnabled()
      expect(calls.ajax + calls.native).toBe(0)
    })

    test('errors explain the fix and clear on blur once corrected', async ({ page }) => {
      await page.locator('#email').fill('not-an-email')
      await page.locator('#message').fill('curta')
      await submit(page).click()
      await expect(page.locator('#email-error')).toContainText(
        lang === 'pt-br' ? 'nome@empresa.com' : 'name@company.com'
      )
      await expect(page.locator('#message-error')).toContainText('10')
      await page.locator('#email').fill('maria@example.com')
      await page.locator('#email').blur()
      await expect(page.locator('#email')).not.toHaveAttribute('aria-invalid', 'true')
      await expect(page.locator('#email-error')).toBeHidden()
    })

    test('5000-character message accepted, 5001 blocked', async ({ page }) => {
      const calls = await mockFormSubmit(page, json({ success: 'true' }))
      await page.locator('#message').fill('a'.repeat(5001))
      await expect(page.locator('#message')).toHaveValue('a'.repeat(5000))
      await fillValid(page, 'ç'.repeat(5000))
      await submit(page).click()
      await expect(page.locator('[data-contact-success] h2')).toBeFocused()
      expect(calls.bodies[0].message).toBe('ç'.repeat(5000))
    })
  })

  test(`/${lang}/contact/?service=advisory preselects the service`, async ({ page }) => {
    await page.goto(`/${lang}/contact/?service=advisory`)
    await expect(page.locator('#service')).toHaveValue('advisory')
  })

  test(`/${lang}/contact/?service=bogus is ignored`, async ({ page }) => {
    await page.goto(`/${lang}/contact/?service=bogus`)
    await expect(page.locator('#service')).toHaveValue('other')
  })
}
