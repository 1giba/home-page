import { SITE_URL } from '@/config/site'
import { LANG_TAG, LOCALES, X_DEFAULT_LOCALE, isLocale, type LangTag, type Locale } from './locales'

export interface Alternate {
  hreflang: LangTag | 'x-default'
  href: string
}

const SITE_ORIGIN = new URL(SITE_URL).origin

// The WHATWG URL parser rewrites `\` to `/` and silently drops tab, LF and CR, so these could
// smuggle a `//host` or a `..` segment past string checks. Other control characters are never valid.
// eslint-disable-next-line no-control-regex -- matching control characters is the point
const UNSAFE_PATH_CHARS = /[\\\u0000-\u001F\u007F]/

// `.` and `..`, including percent-encoded forms, which URL parsing also resolves as dot segments.
const DOT_SEGMENT = /^(?:\.|%2e){1,2}$/i

/** Splits `path` into the pathname and everything from the first `?` or `#`. */
function splitPath(path: string): [pathname: string, suffix: string] {
  const [, pathname = '', suffix = ''] = path.match(/^([^?#]*)(.*)$/s) ?? []
  return [pathname, suffix]
}

/**
 * Builds the URL of an unlocalized internal path in `locale`, always with a trailing slash
 * (SPEC §8.2). Query strings and fragments are kept after the slash.
 * Throws on external URLs, on paths that already start with a locale segment, and on paths that
 * could resolve outside `/{locale}/` (dot segments, backslashes, control characters).
 */
export function localizedPath(locale: Locale, path: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) {
    throw new Error(`localizedPath expects an internal path, got "${path}"`)
  }
  const [pathname, suffix] = splitPath(path)
  if (UNSAFE_PATH_CHARS.test(pathname)) {
    throw new Error(`Invalid internal path ${JSON.stringify(path)}: backslash or control character`)
  }
  const segments = pathname.split('/').filter(Boolean)
  if (segments.some((segment) => DOT_SEGMENT.test(segment))) {
    throw new Error(`Invalid internal path ${JSON.stringify(path)}: "." or ".." segment`)
  }
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

/** Resolves a root-relative path against SITE_URL; the result is guaranteed to stay on that origin. */
export function absoluteUrl(path: string): string {
  const fail = () =>
    new Error(
      `absoluteUrl expects a root-relative path on ${SITE_ORIGIN}, got ${JSON.stringify(path)}`
    )
  const [pathname] = splitPath(path)
  if (!path.startsWith('/') || path.startsWith('//') || UNSAFE_PATH_CHARS.test(pathname)) {
    throw fail()
  }
  const url = new URL(path, SITE_URL)
  if (url.origin !== SITE_ORIGIN) throw fail()
  return url.href
}

/** `hreflang` alternates for an unlocalized path: every locale plus `x-default` (SPEC §8.4). */
export function alternates(path: string): Alternate[] {
  const href = (locale: Locale) => absoluteUrl(localizedPath(locale, path))
  return [
    ...LOCALES.map((locale) => ({ hreflang: LANG_TAG[locale], href: href(locale) })),
    { hreflang: 'x-default', href: href(X_DEFAULT_LOCALE) },
  ]
}
