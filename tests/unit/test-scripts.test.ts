import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Vitest path filters match as substrings: `vitest run tests/dist` would also run
// tests/dist-fixtures/ against whatever (possibly stale) dist-fixtures/ is on disk.
const scripts: Record<string, string> = JSON.parse(readFileSync('package.json', 'utf8')).scripts
const testDirs = readdirSync('tests', { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => `tests/${e.name}/`)

describe('npm test scripts', () => {
  const runs = Object.entries(scripts).flatMap(([name, command]) =>
    [...command.matchAll(/vitest run ((?:tests\/\S+\s*)+)/g)].flatMap((m) =>
      m[1]
        .trim()
        .split(/\s+/)
        .map((filter) => ({ name, filter }))
    )
  )

  it('has vitest scripts to check', () => {
    expect(runs.map((r) => r.name)).toEqual(
      expect.arrayContaining(['test', 'test:dist', 'test:build', 'test:dist:fixtures'])
    )
  })

  for (const { name, filter } of runs) {
    it(`"${name}" (${filter}) selects exactly one tests/ folder`, () => {
      const matched = testDirs.filter((dir) => dir.startsWith(filter) || `${dir}`.includes(filter))
      expect(matched).toHaveLength(1)
    })
  }
})
