---
description: Code Review
---

# 🚀 Windsurf Editor – Agent Workflow

This workflow guide AI agent performing code revuew tasks inside the **Windsurf** Editor (Next.js 15.x based), with focus on **clarity, SOLID principles, and zero technical debt**. All work must be **clean, minimal, and follow senior-level development practices**.

---

## ✅ Code Review

1. **Check for rule compliance**
   - Structure must follow `/app/[locale]/` and `components/` separation
   - Metadata must exist in all route files
   - No inline styles or non-semantic HTML

2. **Code quality validation**
   - Follow naming conventions: `PascalCase` for components, `camelCase` for functions
   - Review all JSX structure and ensure accessibility
   - Ensure there are **no unused files**, **dead code**, or **legacy functions**

3. **Comments**
   - Every block of logic must be clearly commented in **English**
   - No unclear abbreviations or domain-specific jargon

4. **Functional correctness**
   - Confirm behavior matches task requirements
   - Cross-check against original ticket or specification

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