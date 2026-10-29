import { spawnSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// A build must refuse content that is not fit to publish (SPEC §4.4, §8.4, §10.4). Each case builds
// the real site with the projects collection pointed at a fictional fixture folder
// (tests/fixtures/<name>, via CONTENT_FIXTURES) and expects the build to fail with a clear reason.

function build(fixture: string): { status: number | null; output: string } {
  // Inside the checkout: Astro moves files with rename(), which fails across filesystems (EXDEV),
  // so an outDir under /tmp would make every build fail for the wrong reason.
  const outDir = join(process.cwd(), 'dist-guards', fixture)
  rmSync(outDir, { recursive: true, force: true })
  try {
    const result = spawnSync('npx', ['astro', 'build', '--outDir', outDir], {
      env: { ...process.env, CONTENT_FIXTURES: fixture },
      encoding: 'utf8',
      timeout: 180_000,
    })
    return { status: result.status, output: `${result.stdout}\n${result.stderr}` }
  } finally {
    rmSync(outDir, { recursive: true, force: true })
  }
}

// Each case is a full Astro build (~4–5 s); Vitest's 5 s default made them flaky under load.
describe('content publication guards (build-time)', { timeout: 120_000 }, () => {
  it('fails the build for a published project missing required fields', () => {
    const { status, output } = build('projects-incomplete')
    expect(status).not.toBe(0)
    for (const message of [
      'summary is required',
      'client is required',
      'services needs at least one service',
      'role is required',
      'context is required',
      'challenges needs at least one entry',
    ]) {
      expect(output).toContain(message)
    }
  })

  // Astro copies collection images into the public build whatever the entry's status (F3 review).
  it('fails the build for an unpublished project with a cover image', () => {
    const { status, output } = build('projects-draft-cover')
    expect(status).not.toBe(0)
    expect(output).toContain('images are only allowed on published projects')
  })

  it('fails the build for an unpublished project with a local image in its body', () => {
    const { status, output } = build('projects-draft-body-image')
    expect(status).not.toBe(0)
    expect(output).toContain('images are only allowed on published projects')
  })

  it('builds normally when every published project is complete (control)', () => {
    const { status, output } = build('projects')
    expect(output).not.toMatch(/not fit to publish|is required/)
    expect(status).toBe(0)
  })

  it('fails the build for a published project that exists in only one language', () => {
    const { status, output } = build('projects-one-language')
    expect(status).not.toBe(0)
    expect(output).toMatch(/"fixture-one-language" is missing in: en/)
  })

  it('fails the build for a published project with no approach section', () => {
    const { status, output } = build('projects-empty-body')
    expect(status).not.toBe(0)
    expect(output).toMatch(/approach \(the Markdown body\) is required/)
  })
})
