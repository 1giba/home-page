---
description: Core Developer Agent
---

## 🧠 Task

Implement a [feature/component/fix], following the guidelines below.

## ⚙️ Context

- The stack includes Vue 3, Vite, TypeScript, Tailwind CSS v4, vue-i18n, Vue Router, and Headless UI.
- The codebase follows the official Vue Style Guide.
- Project architecture is modular and component-driven.
- i18n messages are stored in JSON files under `src/i18n/`.

## 🎨 UX & UI Guidelines

- Apply **modern, minimalistic, and accessible UI design** using Tailwind CSS utilities.
- Ensure **keyboard accessibility** and proper **ARIA attributes** for interactive elements.
- Respect responsive behavior for mobile, tablet, and desktop using Tailwind breakpoints.
- Use **semantic HTML** and avoid generic `<div>`s when more appropriate elements exist.
- Visual hierarchy should be clear: headings, spacing, typography, and contrast must follow best practices.
- Prefer UI patterns inspired by **design systems like Radix, Headless UI, or Apple/Human Interface**.
- Use Tailwind classes for consistent spacing (`gap`, `padding`, `margin`) and fluid layout.

## 🧑‍💻 Implementation Requirements

- Follow the Vue Style Guide and clean architecture
- Follow mobile-first design principles using Tailwind’s responsive utility classes
- Use only necessary abstractions and readable logic
- Ensure accessibility (ARIA, keyboard support)
- Keep components isolated and reusable
- Add comments only where logic clarity is needed
- No hardcode in texts, use i18n

## ✅ Acceptance Criteria

- The code must reside in the appropriate directory (`components/`, `layout/`, or `composables/`).
- Written in Vue 3 Composition API with `<script setup lang="ts">` and type-safe logic.
- Must be ESLint-compliant and Prettier-formatted.
- No logic leaks or tight coupling to route/view state.
- All textual content must be pulled from `vue-i18n`.
- Components must be reusable and isolated from layout logic when possible.

## 🎯 Goal

The goal is to...
