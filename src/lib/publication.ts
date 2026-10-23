// Publication and translation rules for content entries (SPEC §4.4, §8.4, §10.4). Pure: no
// `astro:*` imports, so it is unit-tested directly and also called from the collection schemas.
import { isLocale, LOCALES, type Locale } from '@/i18n/locales'
import type { ServiceId } from '@/lib/routes'

export type ProjectStatus = 'draft' | 'review' | 'published'

/** Project frontmatter (SPEC §10.3). The Markdown body is the approach section. */
export interface ProjectData {
  status: ProjectStatus
  title: string
  summary?: string
  client?: {
    display: string
    attribution: 'named' | 'anonymized' | 'self'
    permissionRecordedOn?: Date
  }
  services?: ServiceId[]
  categories?: string[]
  role?: string
  period?: { start: string; end?: string }
  context?: string
  challenges?: string[]
  delivered?: string[]
  outcomes?: { text: string; source: string }[]
  technologies?: string[]
  confidentialityNotes?: string
  /** Resolved cover image; only its presence matters here. */
  cover?: unknown
}

/** The summary doubles as the meta description (SPEC §11.1); the schema caps it at 160. */
export const SUMMARY_MIN_LENGTH = 50

const blank = (value: string | undefined) => !value?.trim()

// Markdown/HTML that a reader would see: HTML comments do not count as content.
const visibleText = (body: string) => body.replace(/<!--[\s\S]*?-->/g, '').trim()

// The approach renders inside the page's h2 section, so its headings must start at ###.
const TOP_LEVEL_HEADING = /^ {0,3}#{1,2}\s|<h[12][\s>]/im

// Local images (Markdown or HTML) are processed by Astro and copied into the build.
const LOCAL_IMAGE =
  /!\[[^\]]*\]\((?![a-z][a-z\d+.-]*:|\/\/)[^)]+\)|<img\b[^>]*\bsrc=["'](?![a-z][a-z\d+.-]*:|\/\/)/i

/**
 * Why a project cannot be in its current state, one message per problem; empty when it can.
 * Unpublished projects only may not carry images (Astro would publish the files). Published
 * projects must meet SPEC §4.3/§4.4. `body` is the approach section: pass it when known; the
 * collection schema only sees frontmatter, and the loader re-checks with the body.
 */
export function projectProblems(p: ProjectData, body?: string): string[] {
  const problems: string[] = []
  if (p.status !== 'published') {
    if (p.cover !== undefined || (body !== undefined && LOCAL_IMAGE.test(body))) {
      problems.push(
        'images are only allowed on published projects: Astro copies them into the public build'
      )
    }
    return problems
  }
  if (blank(p.summary)) problems.push('summary is required')
  else if (p.summary!.trim().length < SUMMARY_MIN_LENGTH) {
    problems.push(`summary needs at least ${SUMMARY_MIN_LENGTH} characters (meta description)`)
  }
  if (!p.client) problems.push('client is required')
  else if (blank(p.client.display)) problems.push('client.display is required')
  if (!p.services?.length) problems.push('services needs at least one service')
  if (blank(p.role)) problems.push('role is required')
  if (blank(p.context)) problems.push('context is required')
  if (!p.challenges?.length) problems.push('challenges needs at least one entry')
  else if (p.challenges.some(blank)) problems.push('challenges has a blank entry')
  if (p.delivered?.some(blank)) problems.push('delivered has a blank entry')
  if (body !== undefined) {
    if (!visibleText(body)) problems.push('approach (the Markdown body) is required')
    if (TOP_LEVEL_HEADING.test(body)) {
      problems.push('approach headings must start at ### (the section already has an h2)')
    }
  }
  if (p.client?.attribution === 'named' && !p.client.permissionRecordedOn) {
    problems.push('client.permissionRecordedOn is required to name a client')
  }
  p.outcomes?.forEach((o, i) => {
    if (blank(o.text)) problems.push(`outcomes[${i}].text is required`)
    if (blank(o.source)) problems.push(`outcomes[${i}].source is required`)
  })
  return problems
}

const YEAR_MONTH = /^(\d{4})(?:-(0[1-9]|1[0-2]))?$/

/** Valid `YYYY` / `YYYY-MM` values with the end not before the start. */
export function periodProblems(period: { start: string; end?: string }): string[] {
  const start = YEAR_MONTH.exec(period.start)
  const end = period.end === undefined ? null : YEAR_MONTH.exec(period.end)
  const problems: string[] = []
  if (!start) problems.push(`period.start "${period.start}" must be YYYY or YYYY-MM (month 01–12)`)
  if (period.end !== undefined && !end) {
    problems.push(`period.end "${period.end}" must be YYYY or YYYY-MM (month 01–12)`)
  }
  if (start && end) {
    // Compare at the precision both sides share: a year-only end covers its whole year.
    const startKey = end[2] ? `${start[1]}-${start[2] ?? '01'}` : start[1]
    const endKey = end[2] ? `${end[1]}-${end[2]}` : end[1]
    if (startKey > endKey) problems.push('period.end is before period.start')
  }
  return problems
}

/**
 * Translation parity: a published entry (or, for collections without a status, any entry) must
 * exist in every locale, and an entry's status must be the same in every locale.
 */
export function parityProblems(entries: { id: string; lang: Locale; status?: string }[]): string[] {
  const byId = new Map<string, { lang: Locale; status?: string }[]>()
  for (const { id, ...rest } of entries) byId.set(id, [...(byId.get(id) ?? []), rest])

  const problems: string[] = []
  for (const [id, versions] of byId) {
    const statuses = new Set(versions.map((v) => v.status))
    if (statuses.size > 1) {
      problems.push(`"${id}" has different statuses across languages: ${[...statuses].join(', ')}`)
      continue
    }
    const [status] = statuses
    const mustBeComplete = status === undefined || status === 'published'
    const present = new Set(versions.map((v) => v.lang))
    const missing = LOCALES.filter((l) => !present.has(l))
    if (mustBeComplete && missing.length) {
      problems.push(`"${id}" is missing in: ${missing.join(', ')}`)
    }
  }
  return problems
}

/** `traain/en` → `{ id: 'traain', lang: 'en' }`; content files live at `<id>/<lang>.md`. */
export function splitEntryId(entryId: string): { id: string; lang: Locale } {
  const parts = entryId.split('/')
  const [id, lang] = parts
  if (parts.length !== 2 || !id || !lang || !isLocale(lang)) {
    throw new Error(`Content entry "${entryId}" must be stored as <id>/<pt-br|en>.md`)
  }
  return { id, lang }
}
