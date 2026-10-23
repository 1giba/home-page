// Progressive enhancement for the contact form (SPEC §13.2, §13.4, plan F5-02). Without it the form
// still posts natively to FormSubmit. With it: validation on submit (and on blur afterwards),
// one AJAX request at a time, success only on a confirmed positive response, and a failure state
// that keeps the input. There is no fallback native submission. All copy comes from the page.
import { SERVICE_IDS } from '@/lib/routes'

export type Messages = Record<'sending' | 'required' | 'email' | 'minlength' | 'maxlength', string>

export interface ContactFormOptions {
  ajaxUrl: string
  messages: Messages
  /** Replaces the form after a confirmed submission; its h2 receives focus. */
  success: HTMLTemplateElement
  /** Shown in the status region when sending fails (includes the mailto link). */
  failure: HTMLTemplateElement
}

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

/** FormSubmit reports `success` as the string "true"; accept a boolean too. Nothing else is success. */
export function isConfirmedSuccess(ok: boolean, body: unknown): boolean {
  const success = (body as { success?: unknown } | null)?.success
  return ok && (success === true || success === 'true')
}

function errorFor(field: Field, messages: Messages): string {
  const value = field.value.trim()
  const min = Number(field.getAttribute('minlength') ?? 0)
  const max = Number(field.getAttribute('maxlength') ?? Infinity)
  if (field.required && !value) return messages.required
  if (field.validity.typeMismatch) return messages.email
  // Checked by hand: the browser flags tooShort only for values typed by the user.
  if (value && value.length < min) return messages.minlength.replace('{n}', String(min))
  if (field.value.length > max) return messages.maxlength.replace('{n}', String(max))
  return ''
}

export function initContactForm(form: HTMLFormElement, opts: ContactFormOptions): void {
  const { ajaxUrl, messages } = opts
  const fields = [...form.querySelectorAll<Field>('input, select, textarea')].filter(
    (f) => f.type !== 'hidden' && f.name !== '_honey'
  )
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
  const status = form.querySelector<HTMLElement>('[data-form-status]')!
  const label = button.textContent
  let attempted = false
  let pending = false

  // Our own messages replace the browser's validation bubbles.
  form.noValidate = true

  const service = form.querySelector<HTMLSelectElement>('select[name="service"]')
  const preset = new URLSearchParams(location.search).get('service')
  if (service && SERVICE_IDS.some((id) => id === preset)) service.value = preset!

  function validate(field: Field): boolean {
    const message = errorFor(field, messages)
    const error = form.querySelector<HTMLElement>(`#${field.id}-error`)
    if (message) field.setAttribute('aria-invalid', 'true')
    else field.removeAttribute('aria-invalid')
    if (error) {
      error.textContent = message
      error.hidden = !message
    }
    return !message
  }

  for (const field of fields) {
    field.addEventListener('blur', () => {
      if (attempted) validate(field)
    })
  }

  function setPending(on: boolean) {
    pending = on
    if (on) form.setAttribute('aria-busy', 'true')
    else form.removeAttribute('aria-busy')
    button.textContent = on ? messages.sending : label
    if (on) status.textContent = messages.sending
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (pending) return
    attempted = true
    const invalid = fields.filter((f) => !validate(f))
    if (invalid.length > 0) {
      invalid[0].focus()
      return
    }

    setPending(true)
    try {
      const res = await fetch(ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const body: unknown = await res.json().catch(() => null)
      if (isConfirmedSuccess(res.ok, body)) {
        const block = opts.success.content.firstElementChild!.cloneNode(true) as HTMLElement
        form.replaceWith(block)
        block.querySelector<HTMLElement>('h2')?.focus()
        return
      }
    } catch {
      // Network error: handled below as a failure.
    }
    setPending(false)
    status.replaceChildren(opts.failure.content.cloneNode(true))
  })
}
