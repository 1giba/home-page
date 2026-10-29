import { describe, expect, it } from 'vitest'
import { markExternalLinks } from '@/lib/external-links'

// SPEC §7.3: external links are identifiable. Rendered Markdown (legal pages, About) cannot use
// the Icon component, so Prose marks its http(s) links with the same icon and sr-only label.
describe('markExternalLinks', () => {
  it('appends a decorative icon and the label inside http(s) links', () => {
    const out = markExternalLinks(
      '<p>See <a href="https://calendly.com/legal/privacy-notice">the notice</a>.</p>',
      '(site externo)'
    )
    expect(out).toMatch(
      /<a href="https:\/\/calendly\.com\/legal\/privacy-notice">the notice<svg [^>]*aria-hidden="true"[^>]*>.*<\/svg><span class="sr-only">\(site externo\)<\/span><\/a>\.<\/p>$/
    )
  })

  it('marks every external link, including http and links with other attributes', () => {
    const out = markExternalLinks(
      '<a href="http://a.example/">a</a> <a class="x" href="https://b.example/">b</a>',
      '(external site)'
    )
    expect(out.match(/sr-only/g)).toHaveLength(2)
  })

  it('leaves internal, relative, mailto and anchor links untouched', () => {
    const html =
      '<a href="/pt-br/contact/">c</a><a href="#top">t</a><a href="mailto:contato@codehappy.com.br">m</a>'
    expect(markExternalLinks(html, '(site externo)')).toBe(html)
  })

  it('escapes the label', () => {
    expect(markExternalLinks('<a href="https://x.example/">x</a>', '<b>')).toContain('&lt;b&gt;')
  })
})
