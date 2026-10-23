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
}

const blank = (value: string | undefined) => !value?.trim()

/**
 * Why a project may not be published, one message per problem; empty when it may (or is not
 * `published`). `body` is the approach section: pass it when known; the collection schema only
 * sees frontmatter and omits it, and the loader re-checks with the body (src/lib/content.ts).
 */
export function projectProblems(p: ProjectData, body?: string): string[] {
  if (p.status !== 'published') return []
  const problems: string[] = []
  if (blank(p.summary)) problems.push('summary is required')
  if (!p.client) problems.push('client is required')
  if (!p.services?.length) problems.push('services needs at least one service')
  if (blank(p.role)) problems.push('role is required')
  if (blank(p.context)) problems.push('context is required')
  if (!p.challenges?.some((c) => c.trim())) problems.push('challenges needs at least one entry')
  if (body !== undefined && blank(body)) problems.push('approach (the Markdown body) is required')
  if (p.client?.attribution === 'named' && !p.client.permissionRecordedOn) {
    problems.push('client.permissionRecordedOn is required to name a client')
  }
  p.outcomes?.forEach((o, i) => {
    if (blank(o.source)) problems.push(`outcomes[${i}].source is required`)
  })
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
