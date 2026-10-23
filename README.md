# Code Happy website

Corporate site for Code Happy Tecnologia Ltda.: a static, bilingual (pt-BR / en) site built with Astro.

The redesign is driven by `SPEC.md` (requirements) and `IMPLEMENTATION_PLAN.md` (phased tasks). Those
documents are maintained outside this branch for now.

## Stack

- [Astro](https://astro.build) 7, static output (`dist/`), no client framework
- Tailwind CSS 4 via `@tailwindcss/vite`
- TypeScript (strict) checked by `astro check`
- ESLint 10 (`typescript-eslint`, `eslint-plugin-astro`) and Prettier (`prettier-plugin-astro`)
- Vitest for unit tests and checks over the built `dist/`
- Playwright (Chromium) for browser tests against `astro preview`

## Requirements

Node `>=22.22.0` (see `.nvmrc`). Astro 7 does not run on older versions.

## Commands

| Command                      | What it does                                                          |
| ---------------------------- | --------------------------------------------------------------------- |
| `npm ci`                     | Install exact dependencies from the lockfile                          |
| `npm run dev`                | Dev server at `http://localhost:4321`                                 |
| `npm run build`              | Type-check (`astro check`), then build to `dist/`                     |
| `npm run preview`            | Serve `dist/` locally                                                 |
| `npm run check`              | Type-check only                                                       |
| `npm run lint`               | ESLint                                                                |
| `npm run format`             | Format with Prettier                                                  |
| `npm run check-format`       | Fail if any file is not Prettier-formatted                            |
| `npm run test`               | Unit tests (`tests/unit`)                                             |
| `npm run test:dist`          | Checks over the built site (`tests/dist`); run `npm run build` first  |
| `npm run test:build`         | Builds fictional bad content and checks the build refuses it          |
| `npm run test:dist:fixtures` | Builds with a fictional published case study and tests the Work pages |
| `npm run test:e2e`           | Browser tests (`tests/e2e`); builds must exist; serves `dist/`        |
| `npm run verify`             | check + lint + format check + build + unit + dist tests               |
| `npm run verify:full`        | `verify` plus browser tests                                           |

First-time browser setup for e2e tests: `npx playwright install chromium`.

To run browser tests against a deployed URL instead of the local build:
`PLAYWRIGHT_BASE_URL=https://example.test npm run test:e2e`.

## Layout

```
src/
  config/site.ts     Site-wide constants (canonical URL, contact destinations, FormSubmit endpoints)
  pages/             Routes (Astro file-based routing)
  styles/global.css  Tailwind entry point and design tokens
tests/
  unit/              Pure TypeScript tests (no astro:* imports)
  dist/              Assertions over the built HTML in dist/
  e2e/               Playwright browser tests
legacy/              Previous Vue 3 SPA, kept read-only until each part is replaced, then deleted
```

## Content

Content lives in Markdown collections under `src/content/<collection>/<id>/<lang>.md`
(`services`, `projects`, `legal`, `pages`); schemas are in `src/content.config.ts`. Every entry
needs both `pt-br.md` and `en.md` once published: the build fails on a missing translation.

### Adding a case study

1. Create `src/content/projects/<id>/pt-br.md` and `en.md`. `<id>` becomes the URL
   (`/pt-br/work/<id>/`).
2. Start with `status: draft`. Drafts and entries in `review` are never built, linked or listed.
3. Fill in only confirmed facts (SPEC §4.3). Publishing requires: `summary` (≤ 160 characters,
   also the meta description), `client`, at least one of `services`, `role`, `context`, at least
   one of `challenges`, and the approach as the Markdown body.
4. `client.attribution` is `named`, `anonymized` or `self`. Naming a client requires
   `client.permissionRecordedOn` (the date permission was given).
5. Every entry in `outcomes` needs a `source` explaining why the claim is true. Sources and
   `confidentialityNotes` are internal and never rendered.
6. A `cover` image needs `coverAlt`.
7. Set `status: published` in both languages. The build refuses to publish anything that breaks
   these rules, and the Work page and nav link appear automatically with the first published case.

`npm run test:dist:fixtures` builds the site against a fictional published project
(`tests/fixtures/projects`) to test the Work pages; `npm run test:build` checks that unfit
content fails the build.

## Deployment

Undecided. The hosting provider and canonical domain are open decisions (SPEC Q-6). A `vercel.json`
existed briefly in 2025 and was removed; it is not evidence of the current host.
