// sitemap.xml (SPEC §11.4, plan F6-01): every indexable localized URL with its pt-BR, en and
// x-default alternates. Hand-written instead of @astrojs/sitemap for exact control of exclusions
// (thanks pages, 404, redirect stubs) and alternates. Work appears only once something is published.
import type { APIRoute } from 'astro'
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/locales'
import { absoluteUrl, alternates, localizedPath } from '@/i18n/paths'
import { getPublishedProjects } from '@/lib/content'
import { INDEXABLE_PATHS } from '@/lib/routes'

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const GET: APIRoute = async () => {
  // Published projects exist in every locale (parity is enforced by the content loaders).
  const work = (await getPublishedProjects(DEFAULT_LOCALE)).map(({ id }) => `/work/${id}/`)
  const paths = [...INDEXABLE_PATHS, ...(work.length > 0 ? ['/work/', ...work] : [])]

  const urls = paths.flatMap((path) =>
    LOCALES.map((locale) => {
      const links = alternates(path)
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}"/>`
        )
        .join('\n')
      return `  <url>\n    <loc>${escapeXml(absoluteUrl(localizedPath(locale, path)))}</loc>\n${links}\n  </url>`
    })
  )

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
