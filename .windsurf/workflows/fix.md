---
description: Fixing a bug
---

# 🚀 Windsurf Editor – Agent Workflow

This workflow guide AI agent performing maintance tasks inside the **Windsurf** Editor (Next.js 15.x based), with focus on **clarity, SOLID principles, and zero technical debt**. All work must be **clean, minimal, and follow senior-level development practices**.

## 🔧 Hotfix

1. **Isolate the problem**
   - Identify route/component where the bug is located
   - Reproduce the issue with minimal steps

2. **Fix responsibly**
   - Do not create new files or methods unless truly necessary
   - **Refactor existing logic instead of adding more layers**
   - Remove obsolete code if encountered

3. **Test the result**
   - Verify locally in all supported locales
   - Check all impacted sections of the site

4. **Final pass**
   - Add clear **English comment** explaining the root cause and fix
   - Run `npm run lint` and fix formatting

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

All agent work must reflect **expert-level understanding of Next.js**, **zero tolerance for tech debt**, and complete **respect for the established architecture**.