import { expect, test } from '@playwright/test'

// Plan F5-01 / SPEC §13.2, Review Focus 3: without JavaScript the form is a native POST to
// FormSubmit that lands on the localized thanks page. FormSubmit is intercepted: nothing is sent.
test.use({ javaScriptEnabled: false })

const MESSAGE = 'Olá — teste ção 🚀'

for (const lang of ['pt-br', 'en'] as const) {
  test(`/${lang}/contact/ posts natively to FormSubmit and lands on the thanks page`, async ({
    page,
    baseURL,
  }) => {
    let posted: URLSearchParams | undefined
    let requests = 0
    await page.route('https://formsubmit.co/**', async (route) => {
      requests++
      posted = new URLSearchParams(route.request().postData() ?? '')
      // FormSubmit redirects to `_next`; send the browser to the same path on the preview server.
      const next = new URL(posted.get('_next')!)
      await route.fulfill({ status: 302, headers: { location: `${baseURL}${next.pathname}` } })
    })

    await page.goto(`/${lang}/contact/`)
    await page.locator('#name').fill('Maria Teste')
    await page.locator('#email').fill('maria@example.com')
    await page.locator('#service').selectOption('ai')
    await page.locator('#message').fill(MESSAGE)
    await page.locator('[data-contact-form] button[type="submit"]').click()

    await expect(page).toHaveURL(`${baseURL}/${lang}/contact/thanks/`)
    await expect(page.locator('h1')).toBeVisible()
    expect(requests).toBe(1)
    expect(posted!.get('_next')).toBe(`https://codehappy.com.br/${lang}/contact/thanks/`)
    expect(posted!.get('message')).toBe(MESSAGE) // Review Focus 2: text intact
    expect(posted!.get('_honey')).toBe('')
    expect(posted!.get('service')).toBe('ai')
    expect(posted!.get('name')).toBe('Maria Teste')
    expect(posted!.get('email')).toBe('maria@example.com')
    expect(posted!.get('company')).toBe('')
    expect(posted!.get('_captcha')).toBe('false')
    expect(posted!.get('_template')).toBe('table')
    expect(posted!.get('_subject')).toBe(
      lang === 'pt-br'
        ? 'Novo contato — site Code Happy [pt-BR]'
        : 'New contact — Code Happy website [en]'
    )
  })

  test(`/${lang}/contact/ without JS: the browser blocks an empty form (native constraints)`, async ({
    page,
  }) => {
    let requests = 0
    await page.route('https://formsubmit.co/**', (route) => {
      requests++
      return route.abort()
    })
    await page.goto(`/${lang}/contact/`)
    await page.locator('[data-contact-form] button[type="submit"]').click()
    await expect(page).toHaveURL(new RegExp(`/${lang}/contact/$`))
    expect(requests).toBe(0)
  })
}
