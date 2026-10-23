import { readFileSync } from 'node:fs'
import type { HTMLElement } from 'node-html-parser'
import { describe, expect, it } from 'vitest'
import { ui } from '../../src/i18n/ui'
import { listHtmlFiles, readHtml } from './helpers'

// Plan F7-01 / SPEC §3.6, §8.4, §15: banned marketing phrases, leftovers of the legacy CV site,
// and UI text in the wrong language, over every built page.
const { phrases } = JSON.parse(readFileSync('tests/dist/banned-phrases.json', 'utf8')) as {
  phrases: { phrase: string; allow: { page: string; reason: string }[] }[]
}

/**
 * What a visitor sees or hears: body text (templates included), title and descriptive attributes.
 * Mutates `doc` (removes scripts): pass a freshly parsed document.
 */
function visibleText(doc: HTMLElement): string {
  for (const s of doc.querySelectorAll('script')) s.remove()
  const attrs = doc
    .querySelectorAll('[aria-label], [alt], [title], meta[name="description"]')
    .flatMap((el) => ['aria-label', 'alt', 'title', 'content'].map((a) => el.getAttribute(a) ?? ''))
  return [doc.querySelector('title')?.text ?? '', doc.querySelector('body')?.text ?? '', ...attrs]
    .join(' ')
    .replace(/\s+/g, ' ')
}

const pages = listHtmlFiles()
const text = new Map(pages.map((f) => [f, visibleText(readHtml(f)).toLowerCase()]))

describe('banned phrases (SPEC §3.6)', () => {
  it('lists the SPEC phrases and their pt-BR equivalents', () => {
    expect(phrases.map((p) => p.phrase)).toHaveLength(20)
  })

  for (const { phrase, allow } of phrases) {
    it(`"${phrase}" appears nowhere, except substantiated uses`, () => {
      const allowed = new Set(allow.map((a) => a.page))
      for (const [file, body] of text)
        if (!allowed.has(file)) expect(body, file).not.toContain(phrase.toLowerCase())
    })
  }

  it('no leftovers of the legacy CV site', () => {
    for (const legacy of [
      'Giba - Full Stack',
      'Desenvolvedor Full Stack',
      'especialista em Laravel',
    ])
      for (const [file, body] of text) expect(body, file).not.toContain(legacy.toLowerCase())
  })
})

describe('language leak (SPEC §8.4)', () => {
  // UI values that differ between the locales; short ones are skipped (shared words, names).
  const only = (from: 'pt-br' | 'en', other: 'pt-br' | 'en') =>
    Object.entries(ui[from])
      .filter(
        ([key, value]) => value !== ui[other][key as keyof (typeof ui)['en']] && value.length > 12
      )
      .map(([key, value]) => ({ key, value: value.toLowerCase() }))

  for (const [locale, foreign] of [
    ['pt-br', 'en'],
    ['en', 'pt-br'],
  ] as const) {
    it(`no ${locale} page shows ${foreign} UI text`, () => {
      const strings = only(foreign, locale)
      expect(strings.length).toBeGreaterThan(50)
      for (const [file, body] of text) {
        if (!file.startsWith(`${locale}/`)) continue
        for (const { key, value } of strings) expect(body, `${file}: ${key}`).not.toContain(value)
      }
    })
  }
})
