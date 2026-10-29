// Launch gate (plan F6-03): fails until every legal text carries an owner/counsel approval
// (`approved: { by, on }`, E2) and no pending-information marker (⟦…⟧, e.g. ⟦PENDENTE⟧ or
// ⟦PENDING⟧), and SITE_URL is marked confirmed (SITE_URL_CONFIRMED, F8-01).
// Not part of `npm run verify`, so development is not blocked; it is on the F8 launch checklist.
import { readdirSync, readFileSync, realpathSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const LEGAL_DIR = 'src/content/legal'
const SITE_FILE = 'src/config/site.ts'

function markdownFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return markdownFiles(full)
    return entry.name.endsWith('.md') ? [full] : []
  })
}

/** `approved.by` and `approved.on` from YAML frontmatter, in block or flow style. */
function approval(source) {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? ''
  const flow = /^approved:\s*\{([^}]*)\}\s*$/m.exec(frontmatter)?.[1]
  const block = /^approved:\s*\r?\n((?:[ \t]+.*(?:\r?\n|$))+)/m.exec(frontmatter)?.[1]
  const body = flow ?? block ?? ''
  const field = (name) =>
    new RegExp(`(?:^|[\\s,])${name}:\\s*['"]?([^,'"\\n}]*?)['"]?\\s*(?:,|$)`, 'm')
      .exec(body)?.[1]
      ?.replace(/\s+#.*$/, '')
      .trim()
  return { by: field('by'), on: field('on') }
}

/** A real calendar date written as YYYY-MM-DD (rejects 2026-02-30 and timestamps). */
function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function launchProblems({ legalDir = LEGAL_DIR, siteFile = SITE_FILE } = {}) {
  const problems = []
  for (const file of markdownFiles(legalDir).sort()) {
    const source = readFileSync(file, 'utf8')
    const { by, on } = approval(source)
    // Any ⟦…⟧ marker means the text still waits for information, even if someone approved it.
    const markers = source.match(/⟦[^⟧]*⟧?/g) ?? []
    const reasons = [
      !by && 'missing approved.by',
      !on && 'missing approved.on',
      on && !isCalendarDate(on) && `approved.on is not a YYYY-MM-DD date ("${on}")`,
      markers.length > 0 && `${markers.length} pending marker(s) such as "${markers[0]}"`,
    ].filter(Boolean)
    if (reasons.length > 0)
      problems.push(`${relative(legalDir, file)}: ${reasons.join(', ')} (legal approval, E2)`)
  }
  // Comments removed first, so a commented-out declaration never counts.
  const site = readFileSync(siteFile, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
  if (!/^export const SITE_URL_CONFIRMED(?:\s*:\s*boolean)?\s*=\s*true\b/m.test(site))
    problems.push(
      'SITE_URL_CONFIRMED is not true in src/config/site.ts (domain confirmation, F8-01)'
    )
  return problems
}

// Run as a CLI when this file is the entry point. Real paths on both sides: through a symlinked
// path the check must still run (a launch gate never fails open).
const entry = process.argv[1] ? realpathSync(process.argv[1]) : ''
if (entry === realpathSync(fileURLToPath(import.meta.url))) {
  const problems = launchProblems()
  if (problems.length > 0) {
    console.error(
      `Launch blocked (${problems.length}):\n${problems.map((p) => `- ${p}`).join('\n')}`
    )
    process.exit(1)
  }
  console.log('Launch check passed.')
}
