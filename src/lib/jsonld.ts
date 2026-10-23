// Structured data (SPEC §11.8, plan F6-02): confirmed details only. No Review, AggregateRating or
// priced Service offers. `sameAs` uses the current public profiles (SPEC §13.1; Q-8 open).
// Nothing here is language-specific, so unlike the plan's interface the helpers take no locale.
import { CONTACT_EMAIL, LEGAL_NAME, SITE_URL, SOCIAL } from '@/config/site'

const CONTEXT = 'https://schema.org'

/** For the home page. */
export function organizationLd(): object {
  return {
    '@context': CONTEXT,
    '@type': 'Organization',
    name: 'Code Happy',
    legalName: LEGAL_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    sameAs: [SOCIAL.linkedin, SOCIAL.github, SOCIAL.x],
  }
}

/** For the About page: the founder, by the name used on the site (Q-8). */
export function personLd(): object {
  return {
    '@context': CONTEXT,
    '@type': 'Person',
    name: 'Giba',
    worksFor: { '@type': 'Organization', name: 'Code Happy', url: SITE_URL },
    sameAs: [SOCIAL.linkedin],
  }
}
