import { describe, expect, it } from 'vitest'
import { parityProblems, projectProblems, splitEntryId, type ProjectData } from '@/lib/publication'

// Obviously fictional values; never placed in src/content (plan F3-01).
const validPublished: ProjectData = {
  status: 'published',
  title: 'Fixture',
  summary: 'A fictional project used only by tests.',
  client: { display: 'Fixture Client', attribution: 'anonymized' },
  services: ['advisory'],
  role: 'Fixture role',
  context: 'Fixture context.',
  challenges: ['Fixture challenge'],
}
const BODY = 'Fixture approach.'

describe('projectProblems (SPEC §4.4, §10.3)', () => {
  it('accepts a draft that only has a title', () => {
    expect(projectProblems({ status: 'draft', title: 'X' })).toEqual([])
    expect(projectProblems({ status: 'draft', title: 'X' }, '')).toEqual([])
  })

  it('does not apply publication rules to entries under review', () => {
    expect(projectProblems({ status: 'review', title: 'X' }, '')).toEqual([])
  })

  it('accepts a complete published entry', () => {
    expect(projectProblems(validPublished, BODY)).toEqual([])
  })

  for (const field of ['summary', 'client', 'role', 'context'] as const) {
    it(`requires ${field} on a published entry`, () => {
      expect(projectProblems({ ...validPublished, [field]: undefined }, BODY)).toContainEqual(
        expect.stringContaining(field)
      )
    })
  }

  it('requires at least one service and one challenge on a published entry', () => {
    expect(projectProblems({ ...validPublished, services: [] }, BODY)).toContainEqual(
      expect.stringContaining('services')
    )
    expect(projectProblems({ ...validPublished, challenges: [] }, BODY)).toContainEqual(
      expect.stringContaining('challenges')
    )
  })

  it('treats blank strings as missing', () => {
    expect(projectProblems({ ...validPublished, role: '   ' }, BODY)).toContainEqual(
      expect.stringContaining('role')
    )
  })

  it('requires a non-empty approach body when the body is known', () => {
    expect(projectProblems(validPublished, '  \n')).toContainEqual(
      expect.stringContaining('approach')
    )
    // Frontmatter-only validation (the collection schema) cannot see the body.
    expect(projectProblems(validPublished)).toEqual([])
  })

  it('requires recorded permission before naming a client (SPEC §4.4.2)', () => {
    expect(
      projectProblems(
        { ...validPublished, client: { display: 'Acme', attribution: 'named' } },
        BODY
      )
    ).toContainEqual(expect.stringContaining('permissionRecordedOn'))
    expect(
      projectProblems(
        {
          ...validPublished,
          client: {
            display: 'Acme',
            attribution: 'named',
            permissionRecordedOn: new Date('2026-01-01'),
          },
        },
        BODY
      )
    ).toEqual([])
  })

  it('requires a source for every outcome (SPEC §4.4.4)', () => {
    expect(
      projectProblems({ ...validPublished, outcomes: [{ text: 'faster', source: '' }] }, BODY)
    ).not.toEqual([])
    expect(
      projectProblems(
        { ...validPublished, outcomes: [{ text: 'faster', source: 'client report' }] },
        BODY
      )
    ).toEqual([])
  })

  it('reports every problem, not just the first', () => {
    const problems = projectProblems(
      { status: 'published', title: 'X', client: { display: 'A', attribution: 'named' } },
      ''
    )
    for (const field of ['summary', 'services', 'role', 'context', 'challenges', 'approach']) {
      expect(problems).toContainEqual(expect.stringContaining(field))
    }
    expect(problems).toContainEqual(expect.stringContaining('permissionRecordedOn'))
  })
})

describe('parityProblems (SPEC §8.4: published pages exist in both languages)', () => {
  it('flags a published entry that exists in only one language', () => {
    expect(parityProblems([{ id: 'a', lang: 'pt-br', status: 'published' }])).toHaveLength(1)
  })

  it('flags an entry whose status differs between languages', () => {
    expect(
      parityProblems([
        { id: 'a', lang: 'pt-br', status: 'published' },
        { id: 'a', lang: 'en', status: 'draft' },
      ])
    ).toHaveLength(1)
  })

  it('accepts an entry published in both languages, and a one-language draft', () => {
    expect(
      parityProblems([
        { id: 'a', lang: 'pt-br', status: 'published' },
        { id: 'a', lang: 'en', status: 'published' },
        { id: 'b', lang: 'en', status: 'draft' },
      ])
    ).toEqual([])
  })

  it('requires both languages for collections without a status', () => {
    expect(parityProblems([{ id: 'privacy', lang: 'en' }])).toHaveLength(1)
    expect(
      parityProblems([
        { id: 'privacy', lang: 'en' },
        { id: 'privacy', lang: 'pt-br' },
      ])
    ).toEqual([])
  })

  it('names the entry in each message', () => {
    expect(parityProblems([{ id: 'traain', lang: 'en', status: 'published' }])[0]).toContain(
      'traain'
    )
  })
})

describe('splitEntryId', () => {
  it('splits <id>/<lang> entry ids', () => {
    expect(splitEntryId('traain/en')).toEqual({ id: 'traain', lang: 'en' })
    expect(splitEntryId('privacy/pt-br')).toEqual({ id: 'privacy', lang: 'pt-br' })
  })

  it('rejects unsupported languages and malformed ids', () => {
    for (const bad of ['traain/es', 'traain', 'traain/en/extra', '/en', 'traain/']) {
      expect(() => splitEntryId(bad), bad).toThrow()
    }
  })
})
