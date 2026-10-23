import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { launchProblems } from '../../scripts/launch-check.mjs'

// Plan F6-03: launch is blocked until every legal text is approved (E2) and the domain is
// confirmed (E1/F8-01). Not part of `verify`; it is part of the F8 launch checklist.
const dirs: string[] = []
afterEach(() => dirs.splice(0).forEach((d) => rmSync(d, { recursive: true, force: true })))

function fixture(legal: Record<string, string>, confirmed: boolean) {
  const root = mkdtempSync(join(tmpdir(), 'launch-check-'))
  dirs.push(root)
  for (const [rel, frontmatter] of Object.entries(legal)) {
    mkdirSync(join(root, 'legal', rel, '..'), { recursive: true })
    writeFileSync(join(root, 'legal', rel), `---\ntitle: T\n${frontmatter}---\n\nText.\n`)
  }
  writeFileSync(join(root, 'site.ts'), `export const SITE_URL_CONFIRMED = ${confirmed}\n`)
  return { legalDir: join(root, 'legal'), siteFile: join(root, 'site.ts') }
}

describe('launchProblems', () => {
  it('passes when every legal file is approved (block or flow YAML) and the domain confirmed', () => {
    const opts = fixture(
      {
        'privacy/en.md': 'approved:\n  by: Owner Name\n  on: 2026-11-01\n',
        'terms/pt-br.md': 'approved: { by: Counsel, on: 2026-11-02 }\n',
      },
      true
    )
    expect(launchProblems(opts)).toEqual([])
  })

  it('lists each unapproved or half-approved legal file, and an unconfirmed domain', () => {
    const opts = fixture(
      {
        'privacy/en.md': '',
        'privacy/pt-br.md': 'approved:\n  by: Owner Name\n',
        'terms/en.md': 'approved:\n  on: 2026-11-01\n',
        'terms/pt-br.md': 'approved:\n  by: Owner Name\n  on: not-a-date\n',
      },
      false
    )
    const problems: string[] = launchProblems(opts)
    expect(problems).toHaveLength(5)
    for (const file of ['privacy/en.md', 'privacy/pt-br.md', 'terms/en.md', 'terms/pt-br.md'])
      expect(
        problems.some((p) => p.includes(file)),
        file
      ).toBe(true)
    expect(problems.some((p) => p.includes('SITE_URL_CONFIRMED'))).toBe(true)
  })

  // Whatever the repository's state (it changes at E2 and F8-01), the CLI reports it faithfully.
  it('the CLI exits non-zero exactly when there are problems, and prints each one', () => {
    const problems: string[] = launchProblems()
    const run = spawnSync('node', ['scripts/launch-check.mjs'], { encoding: 'utf8' })
    expect(run.status).toBe(problems.length > 0 ? 1 : 0)
    for (const p of problems) expect(run.stdout + run.stderr).toContain(p)
  })
})
