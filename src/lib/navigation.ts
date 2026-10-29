import type { Locale } from '@/i18n/locales'
import { localizedPath } from '@/i18n/paths'
import type { UiKey } from '@/i18n/ui'

export interface NavItem {
  key: UiKey
  href: string
}

/** Primary navigation (SPEC §6.1). Work appears only once a case study is published (SPEC §4.5). */
export function mainNav(locale: Locale, showWork: boolean): NavItem[] {
  const items: { key: UiKey; path: string }[] = [
    { key: 'nav.services', path: '/services/' },
    ...(showWork ? [{ key: 'nav.work' as const, path: '/work/' }] : []),
    { key: 'nav.about', path: '/about/' },
    { key: 'nav.contact', path: '/contact/' },
  ]
  return items.map(({ key, path }) => ({ key, href: localizedPath(locale, path) }))
}

/**
 * `aria-current` for a link: "page" on the exact page, "true" anywhere inside the link's section.
 * A locale home (`/en/`) is never a section, or it would match every page.
 */
export function ariaCurrent(currentPath: string, href: string): 'page' | 'true' | undefined {
  const current = currentPath.endsWith('/') ? currentPath : `${currentPath}/`
  if (current === href) return 'page'
  const isLocaleHome = href.split('/').filter(Boolean).length === 1
  if (!isLocaleHome && current.startsWith(href)) return 'true'
  return undefined
}
