// robots.txt (SPEC §11.4, plan F6-01): everything may be crawled; noindex pages carry their own
// robots meta tag. Points crawlers to the sitemap on the canonical origin.
import type { APIRoute } from 'astro'
import { absoluteUrl } from '@/i18n/paths'

export const GET: APIRoute = () =>
  new Response(
    ['User-agent: *', 'Allow: /', `Sitemap: ${absoluteUrl('/sitemap.xml')}`, ''].join('\n'),
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }
  )
