import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
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
  mkdirSync(join(root, 'legal'))
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

  it('reports a present but malformed date as such, and rejects impossible dates', () => {
    const opts = fixture(
      {
        'a.md': 'approved:\n  by: Owner\n  on: 2026-11-01T10:00:00Z\n',
        'b.md': 'approved:\n  by: Owner\n  on: 2026-02-30\n',
        'c.md': 'approved:\n  by: Owner\n  on: 2026-11-01 # signed copy on file\n',
      },
      true
    )
    const problems: string[] = launchProblems(opts)
    expect(problems).toHaveLength(2)
    expect(problems.find((p) => p.includes('a.md'))).toMatch(
      /approved\.on is not a YYYY-MM-DD date/
    )
    expect(problems.find((p) => p.includes('b.md'))).toMatch(
      /approved\.on is not a YYYY-MM-DD date/
    )
  })

  it('blocks an approved legal text that still has a ⟦PENDENTE⟧ or ⟦PENDING⟧ marker', () => {
    const opts = fixture(
      {
        'privacy/pt-br.md':
          'approved: { by: Owner, on: 2026-11-01 }\n---\n\nPrazo: ⟦PENDENTE: definir⟧.\n',
        'privacy/en.md':
          'approved: { by: Owner, on: 2026-11-01 }\n---\n\nPeriod: ⟦PENDING: set⟧.\n',
        'terms/en.md': 'approved: { by: Owner, on: 2026-11-01 }\n',
      },
      true
    )
    const problems: string[] = launchProblems(opts)
    expect(problems).toHaveLength(2)
    expect(problems.find((p) => p.includes('privacy/pt-br.md'))).toMatch(
      /1 pending marker\(s\) such as "⟦PENDENTE: definir⟧"/
    )
    expect(problems.find((p) => p.includes('privacy/en.md'))).toMatch(/⟦PENDING: set⟧/)
  })

  it('accepts a typed SITE_URL_CONFIRMED declaration and ignores commented-out ones', () => {
    const typed = fixture({}, true)
    writeFileSync(typed.siteFile, 'export const SITE_URL_CONFIRMED: boolean = true\n')
    expect(launchProblems(typed)).toEqual([])
    const commented = fixture({}, false)
    writeFileSync(
      commented.siteFile,
      '/*\nexport const SITE_URL_CONFIRMED = true\n*/\nexport const SITE_URL_CONFIRMED = false\n'
    )
    expect(launchProblems(commented)).toHaveLength(1)
  })

  // Review F6: a launch gate must never fail open. Through a symlinked path the main-module check
  // used to see two different paths and skip the check entirely (exit 0, no output).
  it('runs the check when invoked through a symlinked path', () => {
    const link = join(mkdtempSync(join(tmpdir(), 'launch-link-')), 'scripts')
    dirs.push(join(link, '..'))
    symlinkSync(join(process.cwd(), 'scripts'), link)
    const problems: string[] = launchProblems()
    const run = spawnSync('node', [join(link, 'launch-check.mjs')], { encoding: 'utf8' })
    expect(run.status).toBe(problems.length > 0 ? 1 : 0)
    expect((run.stdout + run.stderr).trim().length).toBeGreaterThan(0)
  })

  // Whatever the repository's state (it changes at E2 and F8-01), the CLI reports it faithfully.
  it('the CLI exits non-zero exactly when there are problems, and prints each one', () => {
    const problems: string[] = launchProblems()
    const run = spawnSync('node', ['scripts/launch-check.mjs'], { encoding: 'utf8' })
    expect(run.status).toBe(problems.length > 0 ? 1 : 0)
    for (const p of problems) expect(run.stdout + run.stderr).toContain(p)
  })
})
