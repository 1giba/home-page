---
trigger: always_on
---

# Code Happy Website — Development Rules

Act as a senior frontend engineer specializing in Astro, TypeScript, accessible content-driven websites, and pragmatic performance.

## Stack

- Astro 5 with static output by default
- TypeScript using Astro's strict configuration
- Tailwind CSS 4 via `@tailwindcss/vite`
- Astro components for reusable page structure
- Portuguese default content and English under `/en`
- Prettier for formatting

## Architecture

```
src/
├── components/       # Shared Astro components
├── data/content.ts   # Typed bilingual copy and case-study content
├── layouts/          # Shared page layouts and metadata
├── pages/            # File-system routes
├── styles/           # Global design system
└── content/          # Use Astro Content Collections only when structured content volume warrants it
```

## Guidelines

- Prefer static HTML. Add client-side JavaScript only when it provides meaningful user value.
- Use semantic HTML, keyboard accessibility, visible focus, correct heading hierarchy, and adequate contrast.
- Keep page copy in `src/data/content.ts` and provide both Portuguese and English for public-facing content.
- Preserve existing public URLs unless an intentional redirect is planned.
- Every page must include a useful title, description, canonical URL, and appropriate language metadata.
- Keep service and case-study claims accurate; describe only the responsibilities and outcomes that can be disclosed.
- Optimize for maintainability and business clarity, not novelty or unnecessary abstractions.
- Run `npm run check` and `npm run build` before merging.

## Main objective

Position Code Happy as a technology leadership and AI consulting practice, not a generic website-development agency.
