// Launch gate (plan F6-03): fails until every legal text carries an owner/counsel approval
// (`approved: { by, on }`, E2) and SITE_URL is marked confirmed (SITE_URL_CONFIRMED, F8-01).
// Not part of `npm run verify`, so development is not blocked; it is on the F8 launch checklist.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'

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
      ?.trim()
  return { by: field('by'), on: field('on') }
}

export function launchProblems({ legalDir = LEGAL_DIR, siteFile = SITE_FILE } = {}) {
  const problems = []
  for (const file of markdownFiles(legalDir).sort()) {
    const { by, on } = approval(readFileSync(file, 'utf8'))
    const missing = [
      !by && 'approved.by',
      !(on && /^\d{4}-\d{2}-\d{2}$/.test(on) && !Number.isNaN(Date.parse(on))) && 'approved.on',
    ].filter(Boolean)
    if (missing.length > 0)
      problems.push(
        `${relative(legalDir, file)}: missing ${missing.join(' and ')} (legal approval, E2)`
      )
  }
  if (!/^export const SITE_URL_CONFIRMED\s*=\s*true\b/m.test(readFileSync(siteFile, 'utf8')))
    problems.push(
      'SITE_URL_CONFIRMED is not true in src/config/site.ts (domain confirmation, F8-01)'
    )
  return problems
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const problems = launchProblems()
  if (problems.length > 0) {
    console.error(
      `Launch blocked (${problems.length}):\n${problems.map((p) => `- ${p}`).join('\n')}`
    )
    process.exit(1)
  }
  console.log('Launch check passed.')
}
