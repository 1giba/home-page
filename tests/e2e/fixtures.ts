/** Page pairs (pt-br, en) exercised by the browser tests (plan F1-03, extended in F4 and F5). */
export const PAGES: { pt: string; en: string }[] = [
  { pt: '/pt-br/', en: '/en/' },
  { pt: '/pt-br/services/', en: '/en/services/' },
  { pt: '/pt-br/services/fractional-cto/', en: '/en/services/fractional-cto/' },
  { pt: '/pt-br/services/ai/', en: '/en/services/ai/' },
  { pt: '/pt-br/services/advisory/', en: '/en/services/advisory/' },
  { pt: '/pt-br/about/', en: '/en/about/' },
  { pt: '/pt-br/privacy/', en: '/en/privacy/' },
  { pt: '/pt-br/contact/', en: '/en/contact/' },
  { pt: '/pt-br/contact/thanks/', en: '/en/contact/thanks/' },
]

export const SERVICE_PAGES = ['fractional-cto', 'ai', 'advisory'] as const
