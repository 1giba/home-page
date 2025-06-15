---
description: Performing a Task
---

# 🚀 Windsurf Editor – Agent Workflow

This workflow guide AI agent performing development tasks inside the **Windsurf** Editor (Next.js 15.x based), with focus on **clarity, SOLID principles, and zero technical debt**. All work must be **clean, minimal, and follow senior-level development practices**.

---

## ✅ Performing a Task

1. **Understand the task context**
   - Read the user story, design reference, and target route (e.g., `/about`)
   - Load locale from `[locale]` and translation key namespace

2. **Create or update files in the correct scope**
   - Use `/app/[locale]/page.tsx` or `/app/[locale]/components/`
   - Never duplicate logic — reuse shared UI when possible

3. **Follow code principles**
   - Apply **SOLID** and **DRY**
   - Functional components only
   - Tailwind CSS for layout and visual rules
   - Use English comments for all logic and UI blocks
   - Avoid legacy: do **not** leave unused files, classes, or methods

4. **i18n**
   - Wrap all visible strings using `useTranslations()`
   - Namespace translations by route or component domain

5. **Metadata**
   - Define `export const metadata` with `title`, `description`, Open Graph, and Twitter tags

6. **Lint and test**
   - Run `npm run lint`
   - Confirm proper rendering and responsiveness

---

## ❓ When in Doubt

If the agent is uncertain about:

- Business logic or user intent
- Architectural boundaries or file placement
- Whether to reuse or refactor a component
- Translation namespace or i18n usage
- Any pattern that may violate existing rules

**→ Always pause and request clarification before proceeding.**

Do not guess, assume, or generate speculative code.
All work must reflect intentional design and adherence to the Windsurf standards.

Ask a clear question to the maintainer, such as:

> “Should this component be placed under `/components` or `/app/[locale]/components`?”
>
> “Does this section require a standalone route for SEO?”

This ensures the project remains consistent, secure, and aligned with its long-term vision.

---

All agent work must reflect **expert-level understanding of Next.js**, **zero tolerance for tech debt**, and complete **respect for the