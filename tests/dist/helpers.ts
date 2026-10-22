import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'

export const distDir = join(process.cwd(), 'dist')

/** Fails loudly when the build output is missing, instead of letting checks pass on nothing. */
export function assertDistBuilt(): void {
  if (!existsSync(distDir)) {
    throw new Error(
      `dist/ not found at ${distDir}. Run \`npm run build\` before \`npm run test:dist\`.`
    )
  }
}

/** HTML files under dist/, as paths relative to dist/ (e.g. `pt-br/about/index.html`). */
export function listHtmlFiles(dir: string = distDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return listHtmlFiles(full)
    return entry.name.endsWith('.html') ? [relative(distDir, full)] : []
  })
}

export function readHtml(rel: string): HTMLElement {
  return parse(readFileSync(join(distDir, rel), 'utf8'))
}

/** Maps `pt-br/about/index.html` → `/pt-br/about/`, and `404.html` → `/404.html`. */
export function urlPathFor(rel: string): string {
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel}`
}
