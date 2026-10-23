import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { assertDistBuilt, exists, listHtmlFiles, readRaw } from './helpers'

// Unpublished case studies must never reach the built site (SPEC §4.4, §4.5, §10.4).
const PROJECTS_DIR = join(process.cwd(), 'src/content/projects')
const CANDIDATES = ['Eficaz', 'Traain', 'Fatima', 'Pedbot'] // SPEC §4.2

/** Project ids with at least one `status: published` file, read straight from the sources. */
function publishedProjectIdsFromSource(): string[] {
  if (!existsSync(PROJECTS_DIR)) return []
  return readdirSync(PROJECTS_DIR).filter((id) =>
    readdirSync(join(PROJECTS_DIR, id)).some((file) =>
      /^status:\s*published\s*$/m.test(readFileSync(join(PROJECTS_DIR, id, file), 'utf8'))
    )
  )
}

function builtText(): string {
  const parts = listHtmlFiles().map((f) => readRaw(f))
  if (exists('sitemap.xml')) parts.push(readRaw('sitemap.xml'))
  return parts.join('\n')
}

describe('unpublished case studies stay out of the build', () => {
  it('has draft entries for the four candidate projects, none published yet', () => {
    expect(readdirSync(PROJECTS_DIR).sort()).toEqual(['eficaz', 'fatima', 'pedbot', 'traain'])
    expect(publishedProjectIdsFromSource()).toEqual([])
  })

  it('never mentions an unpublished candidate project anywhere in the built site', () => {
    assertDistBuilt()
    const published = publishedProjectIdsFromSource()
    const text = builtText()
    for (const name of CANDIDATES) {
      if (!published.includes(name.toLowerCase())) expect(text, name).not.toContain(name)
    }
  })

  it('builds no Work pages and links to none while nothing is published (SPEC §4.5)', () => {
    if (publishedProjectIdsFromSource().length > 0) return
    expect(exists('pt-br/work/index.html')).toBe(false)
    expect(exists('en/work/index.html')).toBe(false)
    expect(builtText()).not.toContain('/work/')
  })
})
