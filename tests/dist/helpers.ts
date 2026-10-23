import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'

// DIST_DIR / PROJECTS_DIR let the same checks run against the fixture build (a published project).
export const distDir = join(process.cwd(), process.env.DIST_DIR ?? 'dist')
export const projectsDir = join(process.cwd(), process.env.PROJECTS_DIR ?? 'src/content/projects')
export const isFixtureBuild = process.env.DIST_DIR !== undefined

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

/** Every file under dist/ (any type), relative to dist/. */
export function listAllFiles(dir: string = distDir): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? listAllFiles(full) : [relative(distDir, full)]
  })
}

/** Frontmatter of a Markdown file as raw text (the block between the first two `---` lines). */
const frontmatter = (path: string) =>
  /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(path, 'utf8'))?.[1] ?? ''

export interface ProjectSource {
  id: string
  title: string
  published: boolean
}

/** Projects as written in the content sources: one per folder, published if any locale is. */
export function projectSources(): ProjectSource[] {
  if (!existsSync(projectsDir)) return []
  return readdirSync(projectsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map(({ name: id }) => {
      const files = readdirSync(join(projectsDir, id)).filter((f) => f.endsWith('.md'))
      const fms = files.map((f) => frontmatter(join(projectsDir, id, f)))
      return {
        id,
        title: /^title:\s*['"]?(.+?)['"]?\s*$/m.exec(fms[0] ?? '')?.[1] ?? id,
        published: fms.some((fm) => /^status:\s*['"]?published['"]?\s*$/m.test(fm)),
      }
    })
}

export function readRaw(rel: string): string {
  return readFileSync(join(distDir, rel), 'utf8')
}

export function readHtml(rel: string): HTMLElement {
  return parse(readRaw(rel))
}

export function exists(rel: string): boolean {
  return existsSync(join(distDir, rel))
}

/** Directory names directly under dist/. */
export function topLevelDirs(): string[] {
  return readdirSync(distDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

/** True for Astro's static redirect fallback pages (a meta refresh, no <html lang>). */
export function isRedirectStub(rel: string): boolean {
  return /<meta http-equiv="refresh"/.test(readRaw(rel))
}

/** True for pages under a locale prefix (`pt-br/…`, `en/…`). */
export function isLocalized(rel: string): boolean {
  return rel.startsWith('pt-br/') || rel.startsWith('en/')
}

/** Maps an internal href (`/pt-br/about/?x#y`) to the dist file that serves it. */
export function hrefToFile(href: string): string {
  const path = href.replace(/[?#].*$/, '')
  if (!path.startsWith('/')) throw new Error(`Not a root-relative href: ${href}`)
  return path.endsWith('/') ? `${path.slice(1)}index.html` : path.slice(1)
}

/** Maps `pt-br/about/index.html` → `/pt-br/about/`, and `404.html` → `/404.html`. */
export function urlPathFor(rel: string): string {
  if (rel === 'index.html') return '/'
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`
  return `/${rel}`
}
