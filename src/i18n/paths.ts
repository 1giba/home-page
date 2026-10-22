import { SITE_URL } from '@/config/site'
import { LANG_TAG, LOCALES, X_DEFAULT_LOCALE, isLocale, type LangTag, type Locale } from './locales'

export interface Alternate {
  hreflang: LangTag | 'x-default'
  href: string
}

/**
 * Builds the URL of an unlocalized internal path in `locale`, always with a trailing slash
 * (SPEC §8.2). Query strings and fragments are kept after the slash.
 * Throws on external URLs and on paths that already start with a locale segment.
 */
export function localizedPath(locale: Locale, path: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) {
    throw new Error(`localizedPath expects an internal path, got "${path}"`)
  }
  const [, pathname = '', suffix = ''] = path.match(/^([^?#]*)(.*)$/s) ?? []
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length > 0 && isLocale(segments[0])) {
    throw new Error(`Path "${path}" is already localized`)
  }
  return `/${[locale, ...segments].join('/')}/${suffix}`
}

/** Splits `/en/about/` into `{ locale: 'en', path: '/about/' }`; unsupported prefixes give `locale: null`. */
export function stripLocale(pathname: string): { locale: Locale | null; path: string } {
  const [, first = '', rest = ''] = pathname.match(/^\/([^/]*)(.*)$/s) ?? []
  if (isLocale(first)) return { locale: first, path: rest.startsWith('/') ? rest : `/${rest}` }
  return { locale: null, path: pathname || '/' }
}

/** The same page in `target`; pages outside the locale tree fall back to the target home. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const { locale, path } = stripLocale(pathname)
  return localizedPath(target, locale ? path : '/')
}

export function absoluteUrl(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error(`absoluteUrl expects a root-relative path, got "${path}"`)
  }
  return new URL(path, SITE_URL).href
}

/** `hreflang` alternates for an unlocalized path: every locale plus `x-default` (SPEC §8.4). */
export function alternates(path: string): Alternate[] {
  const href = (locale: Locale) => absoluteUrl(localizedPath(locale, path))
  return [
    ...LOCALES.map((locale) => ({ hreflang: LANG_TAG[locale], href: href(locale) })),
    { hreflang: 'x-default', href: href(X_DEFAULT_LOCALE) },
  ]
}
