// Content loaders (plan §3). Every loader validates its whole collection first and throws, failing
// the build, when content is not fit to publish: missing translations (parityProblems) or, for
// projects, publication rules including the approach body (projectProblems).
import { getCollection, type CollectionEntry } from 'astro:content'
import type { Locale } from '@/i18n/locales'
import { parityProblems, projectProblems, splitEntryId } from '@/lib/publication'
import type { ServiceId } from '@/lib/routes'

type Collection = 'services' | 'projects' | 'legal' | 'pages'

function fail(collection: Collection, problems: string[]): never {
  throw new Error(
    `Content collection "${collection}" is not fit to publish:\n- ${problems.join('\n- ')}`
  )
}

async function validated<C extends Collection>(collection: C) {
  const entries = (await getCollection(collection)) as CollectionEntry<C>[]
  const keyed = entries.map((entry) => ({ entry, ...splitEntryId(entry.id) }))
  const status = (e: CollectionEntry<C>) =>
    collection === 'projects' ? (e as CollectionEntry<'projects'>).data.status : undefined

  const problems = parityProblems(
    keyed.map(({ id, lang, entry }) => ({ id, lang, status: status(entry) }))
  )
  if (collection === 'projects') {
    for (const { entry, id, lang } of keyed) {
      const project = entry as CollectionEntry<'projects'>
      for (const p of projectProblems(project.data, project.body ?? '')) {
        problems.push(`"${id}" (${lang}): ${p}`)
      }
    }
  }
  if (problems.length) fail(collection, problems)
  return keyed
}

async function inLocale<C extends Collection>(collection: C, locale: Locale) {
  return (await validated(collection)).filter((e) => e.lang === locale)
}

/** Published projects in `locale` as `{ id, entry }`; `entry` is Astro's entry, ready for render(). */
export async function getPublishedProjects(locale: Locale) {
  return (await inLocale('projects', locale))
    .filter(({ entry }) => entry.data.status === 'published')
    .map(({ id, entry }) => ({ id, entry }))
    .sort((a, b) => a.entry.data.title.localeCompare(b.entry.data.title, locale))
}

/** Whether any case study is published; drives the Work nav link and routes (SPEC §4.5). */
export async function hasPublishedWork(): Promise<boolean> {
  return (await getPublishedProjects('pt-br')).length > 0
}

export async function getServices(locale: Locale) {
  return (await inLocale('services', locale))
    .map(({ id, entry }) => ({ id: id as ServiceId, entry }))
    .sort((a, b) => a.entry.data.order - b.entry.data.order)
}

export async function getService(id: ServiceId, locale: Locale) {
  return (await getServices(locale)).find((s) => s.id === id)?.entry
}

export async function getLegal(id: 'privacy' | 'terms', locale: Locale) {
  return (await inLocale('legal', locale)).find((e) => e.id === id)?.entry
}

export async function getPage(id: 'about', locale: Locale) {
  return (await inLocale('pages', locale)).find((e) => e.id === id)?.entry
}
