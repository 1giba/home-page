---
description: Core Developer Workflow
---

## Task

Implement a change using the project's current Astro architecture.

## Context

- Astro 5, TypeScript, Tailwind CSS v4
- Static rendering by default
- Bilingual content is in `src/data/content.ts`
- Shared components are in `src/components/`
- Shared page shell and metadata are in `src/layouts/BaseLayout.astro`

## Requirements

- Use semantic HTML and mobile-first responsive design.
- Preserve Portuguese default routes and matching English routes under `/en`.
- Keep interactivity minimal; do not add a frontend framework without a concrete requirement.
- Do not introduce unsupported claims into portfolio case studies.
- Ensure accessible focus states, keyboard navigation, and reduced-motion support.
- Run `npm run check` and `npm run build` before merging.
