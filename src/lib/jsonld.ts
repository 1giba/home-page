// Structured data (SPEC §11.8, plan F6-02): confirmed details only. No Review, AggregateRating or
// priced Service offers. Nothing here is language-specific, so unlike the plan's interface the
// helpers take no locale.
// Q-8: the GitHub, LinkedIn and X links are the founder's personal profiles, not company
// accounts, so the Organization lists no `sameAs` until a corporate account is confirmed. The
// Person keeps only the profile the site attributes to the founder ("Giba on LinkedIn", About).
import { CONTACT_EMAIL, LEGAL_NAME, SITE_URL, SOCIAL } from '@/config/site'

const CONTEXT = 'https://schema.org'
/** One Organization entity, referenced from the Person on About. */
const ORGANIZATION_ID = `${SITE_URL}/#organization`

/** For the home page. */
export function organizationLd(): object {
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Code Happy',
    legalName: LEGAL_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
  }
}

/** For the About page: the founder, by the name used on the site (Q-8). */
export function personLd(): object {
  return {
    '@context': CONTEXT,
    '@type': 'Person',
    name: 'Giba',
    worksFor: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Code Happy',
      url: SITE_URL,
    },
    sameAs: [SOCIAL.linkedin],
  }
}
