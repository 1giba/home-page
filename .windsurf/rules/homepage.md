---
trigger: always_on
---

# 📘 Project Rules

Act as a **Senior Frontend Developer specialized in Vue 3 and modern web architecture**.

This is a modern, accessible and scalable **institutional website** built with Vue 3 and TypeScript, following the official [Vue Style Guide](https://vuejs.org/style-guide/).

## 🛠 Tech Stack

- **Vue 3** with `<script setup>` (Composition API)
- **TypeScript**
- **Vite** (build tool + dev server)
- **Tailwind CSS v4**
- **vue-i18n** for internationalization (pt-BR and en)
- **Vue Router** for navigation
- **Headless UI** (Vue version) for accessible UI components
- **ESLint + Prettier** for linting and formatting

## 📁 Project Structure (based on Vue Style Guide)

```
src/
├── assets/                # Static assets (CSS, images, fonts)
│   └── main.css           # Tailwind CSS imports
├── components/            # Reusable UI components
├── composables/           # Custom composables (useX)
├── i18n/                  # i18n messages and setup
│   ├── en.json
│   ├── pt-BR.json
│   └── index.ts
├── layout/                # Layout components (Header, Footer)
├── pages/                 # Route-based views
│   ├── Home.vue
│   └── About.vue
├── router/                # Vue Router configuration
│   └── index.ts
├── types/                 # Global TypeScript declarations
├── App.vue                # Root component
├── main.ts                # Application bootstrap
└── vite-env.d.ts
```

## 🌍 Internationalization

Uses `vue-i18n` with external JSON message files per locale. Language switch handled by composable or Headless UI menu component.

## 🎨 Styling

Tailwind CSS v4 is used with full utility-first approach. No external component libraries for visual design, only Headless UI for behavior/accessibility.

## 🎨 Styling

- Tailwind CSS v4 is used with a full utility-first approach. The layout is designed to be **mobile-first**, progressively enhancing for larger viewports using responsive - Tailwind breakpoints. No external component libraries are used for visual design—only Headless UI for behavior/accessibility.

## 🧪 Linting & Formatting

This project uses both ESLint and Prettier for best results:

- **ESLint** detects potential issues and enforces code quality
- **Prettier** auto-formats the code for consistency

```bash
npm run dev            # Starts the Vite development server with HMR (Hot Module Replacement)

npm run build          # Performs full TypeScript type checking (via vue-tsc) and builds the production app using Vite

npm run preview        # Serves the final built site locally to preview the production output

npm run lint           # Runs ESLint on all .ts and .vue files and auto-fixes issues where possible

npm run format         # Formats all project files using Prettier according to .prettierrc settings

npm run check-format   # Checks if files are correctly formatted (fails on CI if any file is not)

npm run check-types    # Performs a full type-check using vue-tsc without emitting build output

```

---

This architecture prioritizes maintainability, clear separation of concerns, and long-term scalability, ideal for projects that may evolve into full-featured SPAs.
