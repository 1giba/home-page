// Site-wide constants. Values are fixed by SPEC.md §13.1; change them only with a spec update.

/** Canonical production origin (provisional until the domain is confirmed — plan F8-01). */
export const SITE_URL = 'https://codehappy.com.br'

/** Set to true in plan F8-01 once the production domain is confirmed; `npm run launch-check` fails until then. */
export const SITE_URL_CONFIRMED = false

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

/**
 * AJAX endpoint. Verified 2026-10-23 against https://formsubmit.co/ajax-documentation: the URL is
 * `https://formsubmit.co/ajax/<email>`, and the documented examples POST a JSON body with
 * `Content-Type: application/json` and `Accept: application/json`. The page does NOT document the
 * response body (unverified: the expected shape is `{ "success": "true" | "false", "message" }`),
 * so success is accepted only on an OK status with `success` true or "true", and anything else is
 * a failure the visitor sees (plan F5-02). The real response and delivery are confirmed only by
 * the pre-launch test submission (plan F8-04, E4).
 */
export const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`
