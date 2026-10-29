import { existsSync, readdirSync, readFileSync } from 'node:fs'
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
    if (filter.endsWith('.ts')) {
      it(`"${name}" names an existing test file (${filter})`, () => {
        expect(existsSync(filter)).toBe(true)
      })
    } else {
      it(`"${name}" (${filter}) is a folder filter selecting exactly one tests/ folder`, () => {
        expect(filter.endsWith('/')).toBe(true)
        expect(testDirs.filter((dir) => dir.includes(filter))).toHaveLength(1)
      })
    }
  }
})

describe('content fixtures never reach a production build', () => {
  it('the build script clears CONTENT_FIXTURES for every astro command', () => {
    const astroCommands = scripts.build.split('&&').map((c) => c.trim())
    expect(astroCommands.length).toBeGreaterThan(0)
    for (const command of astroCommands) expect(command).toMatch(/^CONTENT_FIXTURES= astro /)
  })

  it('the fixture build also runs the SEO and content-safety checks on dist-fixtures', () => {
    const command = scripts['test:dist:fixtures']
    expect(command).toContain('DIST_DIR=dist-fixtures')
    expect(command).toContain('PROJECTS_DIR=tests/fixtures/projects')
    expect(command).toContain('tests/dist/seo.test.ts')
    expect(command).toContain('tests/dist/content-safety.test.ts')
  })
})
