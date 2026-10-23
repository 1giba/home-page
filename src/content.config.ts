// Content collections (SPEC §10). Files live at src/content/<collection>/<id>/<lang>.md; the entry
// id ("traain/en") is split into id and language by splitEntryId, never repeated in frontmatter.
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { periodProblems, projectProblems } from './lib/publication'
import { SERVICE_IDS } from './lib/routes'

const markdownIn = (collection: string, base = `./src/content/${collection}`) =>
  glob({ pattern: '**/*.md', base })

// Tests build against fictional projects instead of the real ones: CONTENT_FIXTURES=1 uses
// tests/fixtures/projects, CONTENT_FIXTURES=<name> uses tests/fixtures/<name> (plan F3-03).
const fixtures = process.env.CONTENT_FIXTURES
const projectsBase = fixtures
  ? `./tests/fixtures/${fixtures === '1' ? 'projects' : fixtures}`
  : './src/content/projects'

// YAML reads `2024` as a number; periods are stored as strings (YYYY or YYYY-MM).
const yearMonth = z.coerce.string().regex(/^\d{4}(-\d{2})?$/, 'expected YYYY or YYYY-MM')

const services = defineCollection({
  loader: markdownIn('services'),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(160),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    audience: z.array(z.string().trim().min(1)).min(1),
    problems: z.array(z.string().trim().min(1)).min(3).max(6),
    scope: z.array(z.string().trim().min(1)).min(1),
    // SPEC §3.7 "Expected business value", stated as intent, never as a guarantee.
    value: z.array(z.string().trim().min(1)).min(1),
    // SPEC §3.7.4: software engineering appears as part of an engagement, not as a service.
    implementation: z.string().trim().min(1).optional(),
    // Open question Q-2: unset until engagement formats are confirmed.
    format: z.string().min(1).optional(),
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).optional(),
    order: z.number().int(),
  }),
})

const projects = defineCollection({
  loader: markdownIn('projects', projectsBase),
  schema: ({ image }) =>
    z
      .object({
        status: z.enum(['draft', 'review', 'published']).default('draft'),
        title: z.string().min(1),
        // Doubles as the case page's meta description (SPEC §11.1: ≈120–160 characters).
        summary: z.string().max(160).optional(),
        client: z
          .object({
            display: z.string().min(1),
            attribution: z.enum(['named', 'anonymized', 'self']),
            permissionRecordedOn: z.coerce.date().optional(),
          })
          .optional(),
        services: z.array(z.enum(SERVICE_IDS)).optional(),
        categories: z.array(z.string().min(1)).optional(),
        role: z.string().optional(),
        period: z.object({ start: yearMonth, end: yearMonth.optional() }).optional(),
        context: z.string().optional(),
        challenges: z.array(z.string()).optional(),
        delivered: z.array(z.string().min(1)).optional(),
        // `source` documents why the claim is true; it is never rendered.
        outcomes: z.array(z.object({ text: z.string().min(1), source: z.string() })).optional(),
        technologies: z.array(z.string().min(1)).optional(),
        // Internal only; never rendered.
        confidentialityNotes: z.string().optional(),
        cover: image().optional(),
        coverAlt: z.string().min(1).optional(),
      })
      .superRefine((data, ctx) => {
        // Frontmatter rules here; the loader re-checks with the approach body (src/lib/content.ts).
        for (const message of projectProblems(data)) ctx.addIssue({ code: 'custom', message })
        for (const message of data.period ? periodProblems(data.period) : []) {
          ctx.addIssue({ code: 'custom', message })
        }
        if (data.cover && !data.coverAlt) {
          ctx.addIssue({ code: 'custom', message: 'coverAlt is required with cover (SPEC §11.11)' })
        }
      }),
})

const legal = defineCollection({
  loader: markdownIn('legal'),
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    updated: z.coerce.date(),
    // Recorded by the owner (or counsel) when the text is approved for launch (plan F6-03).
    approved: z.object({ by: z.string().min(1), on: z.coerce.date() }).optional(),
  }),
})

const pages = defineCollection({
  loader: markdownIn('pages'),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
})

export const collections = { services, projects, legal, pages }
