// Single source for the root and legacy redirects (SPEC §8.2, §11.10). Astro emits static
// meta-refresh fallbacks from this list; F8-02 generates host-native 301/308 rules from it too.
export const LEGACY_REDIRECTS: Readonly<Record<string, string>> = {
  '/': '/pt-br/',
  '/about': '/pt-br/about/',
  '/contact': '/pt-br/contact/',
  '/privacy': '/pt-br/privacy/',
  '/terms': '/pt-br/terms/',
}
