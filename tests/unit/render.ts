import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { parse, type HTMLElement } from 'node-html-parser'

type Component = Parameters<AstroContainer['renderToString']>[0]

/**
 * Renders an Astro component as if served at `url` (sets Astro.url) and parses the HTML.
 * Lets layout tests cover both locales and any path without creating routes.
 */
export async function render(
  component: Component,
  props: Record<string, unknown>,
  url: string,
  slots: Record<string, string> = {}
): Promise<HTMLElement> {
  const container = await AstroContainer.create()
  const html = await container.renderToString(component, {
    props,
    slots,
    request: new Request(url),
    partial: false,
  })
  return parse(html)
}

/** Elements a keyboard user can Tab to, in document order (ignores CSS visibility). */
export function focusables(root: HTMLElement): HTMLElement[] {
  return root
    .querySelectorAll('a[href], button, summary, input, select, textarea, [tabindex]')
    .filter((el) => el.getAttribute('tabindex') !== '-1')
}
