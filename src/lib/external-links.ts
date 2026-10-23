// SPEC §7.3: external links are identifiable. Rendered Markdown (legal pages, About) cannot use the
// Icon component, so Prose passes its HTML through here: every http(s) link gets the same
// decorative icon and sr-only label as the components. Input is our own rendered Markdown, not
// user content. (Astro 7's Markdown processor takes no rehype plugins without an extra package.)
import { STROKE_PATHS } from '@/components/ui/icon-paths'

const ICON =
  '<svg class="ml-1 inline-block size-4 align-text-bottom" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  `<path d="${STROKE_PATHS.external}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function markExternalLinks(html: string, label: string): string {
  return html.replace(
    /(<a\s[^>]*\bhref="https?:\/\/[^"]*"[^>]*>)([\s\S]*?)<\/a>/g,
    (_, open: string, inner: string) =>
      `${open}${inner}${ICON}<span class="sr-only">${escapeHtml(label)}</span></a>`
  )
}
