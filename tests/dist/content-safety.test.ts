import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  assertDistBuilt,
  exists,
  isFixtureBuild,
  listAllFiles,
  listHtmlFiles,
  projectsDir,
  projectSources,
  readRaw,
} from './helpers'

// Unpublished case studies must never reach the built site (SPEC §4.4, §4.5, §10.4). Works for any
// number of published projects; `npm run test:dist:fixtures` also runs it on the fixture build.
const CANDIDATES = ['Eficaz', 'Traain', 'Fatima', 'Pedbot'] // SPEC §4.2

const projects = projectSources()
const published = projects.filter((p) => p.published)
const unpublished = projects.filter((p) => !p.published)

function builtText(): string {
  const parts = listHtmlFiles().map((f) => readRaw(f))
  if (exists('sitemap.xml')) parts.push(readRaw('sitemap.xml'))
  return parts.join('\n')
}

describe('project sources', () => {
  it('keeps every project in both languages', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const { id } of projects) {
      expect(
        readdirSync(join(projectsDir, id))
          .filter((f) => f.endsWith('.md'))
          .sort(),
        id
      ).toEqual(['en.md', 'pt-br.md'])
    }
  })

  it('has draft entries for the four candidate projects (SPEC §4.2)', () => {
    if (isFixtureBuild) return
    expect(projects.map((p) => p.id).sort()).toEqual(['eficaz', 'fatima', 'pedbot', 'traain'])
  })
})

describe('unpublished case studies stay out of the build', () => {
  it('never mentions an unpublished project or candidate anywhere in the built pages', () => {
    assertDistBuilt()
    const text = builtText()
    const names = new Set([
      ...unpublished.map((p) => p.title),
      ...CANDIDATES.filter((c) => !published.some((p) => p.id === c.toLowerCase())),
    ])
    for (const name of names) expect(text, name).not.toContain(name)
  })

  it('ships no file named after an unpublished project (e.g. a draft image)', () => {
    const files = listAllFiles().map((f) => f.toLowerCase())
    for (const { id, title } of unpublished) {
      for (const token of [id, title.toLowerCase()]) {
        expect(
          files.filter((f) => f.includes(token)),
          token
        ).toEqual([])
      }
    }
  })

  it('ships no asset that no page or stylesheet references', () => {
    const astroDir = join(process.cwd(), process.env.DIST_DIR ?? 'dist', '_astro')
    if (!existsSync(astroDir)) return
    const referrers = listAllFiles()
      .filter((f) => f.endsWith('.html') || f.endsWith('.css'))
      .map((f) => readRaw(f))
      .join('\n')
    // Astro also emits the original of an optimized image (cover.HASH.svg next to the referenced
    // cover.HASH_VARIANT.svg); an original counts as used when one of its variants is referenced.
    const isReferenced = (asset: string) => {
      const stem = asset.replace(/\.[^.]+$/, '')
      return referrers.includes(`/_astro/${asset}`) || referrers.includes(`/_astro/${stem}_`)
    }
    expect(readdirSync(astroDir).filter((asset) => !isReferenced(asset))).toEqual([])
  })

  it('builds Work pages exactly for the published projects (SPEC §4.5)', () => {
    const anyPublished = published.length > 0
    for (const locale of ['pt-br', 'en']) {
      expect(exists(`${locale}/work/index.html`), `${locale} Work index`).toBe(anyPublished)
      for (const { id } of published)
        expect(exists(`${locale}/work/${id}/index.html`), id).toBe(true)
      for (const { id } of unpublished) {
        expect(exists(`${locale}/work/${id}/index.html`), id).toBe(false)
      }
    }
    const text = builtText()
    if (!anyPublished) expect(text).not.toContain('/work/')
    for (const { id } of unpublished) expect(text).not.toContain(`/work/${id}/`)
  })

  it('never contains fictional test fixtures in the production build', () => {
    if (isFixtureBuild) return
    expect(builtText()).not.toMatch(/SECRET-(SOURCE|NOTE)|Projeto Fixture|Fixture Project/)
  })
})
