// Site-wide constants. Values are fixed by SPEC.md §13.1; change them only with a spec update.

/** Canonical production origin (provisional until the domain is confirmed — plan F8-01). */
export const SITE_URL = 'https://codehappy.com.br'

export const LEGAL_NAME = 'Code Happy Tecnologia Ltda.'

export const CONTACT_EMAIL = 'contato@codehappy.com.br'

export const CALENDLY_URL = 'https://calendly.com/1giba'

export const SOCIAL = {
  github: 'https://github.com/1giba',
  linkedin: 'https://linkedin.com/in/1giba',
  x: 'https://x.com/1_giba',
} as const

/** Native (no-JS) form target. */
export const FORMSUBMIT_ACTION = `https://formsubmit.co/${CONTACT_EMAIL}`

/** AJAX endpoint; the URL format and response shape are verified against FormSubmit docs in plan F5-02. */
export const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`
