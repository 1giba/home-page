---
trigger: always_on
---

# 🧠 Workflow Rules & Coding Guidelines

This document outlines the development structure and style guidelines for my personal home page project. The site is built with **Next.js 15 (App Router)** and serves as a personal marketing and portfolio platform — no backend API consumption is involved.

---

## 🌐 Tech Stack

| Layer          | Technology            |
|----------------|------------------------|
| Framework      | Next.js 15 (App Router) |
| Language       | TypeScript            |
| Styling        | Tailwind CSS 4        |
| Icons          | react-icons (Feather) |
| I18n           | next-intl 4           |
| Deployment     | Vercel                |

---

## 🧱 Project Structure

```
/app
  /[locale]
    /page.tsx              # Homepage per locale
    /components/           # Page-specific UI components
    /about/page.tsx        # Example: About page
    /layout.tsx            # Layout specifically for localized routes
/components
  Header.tsx
  Footer.tsx
  SocialLinks.tsx
/i18n
  /locales/
    en-US.json
    pt-BR.json
  request.ts              # next-intl message loading config
  routing.ts              # Locale configuration
/middleware.ts            # Root middleware for locale handling
/public
  /images/
  favicon.ico
/styles
  globals.css
  tailwind.css
/types
  global.d.ts            # Type declarations
```

---

## ✨ Styling & Components

- Use **Tailwind CSS** only for styling.
- Global styles live in `/styles/globals.css`.
- Use responsive and accessible class names.
- Global components go into `/components/`, page-specific ones inside `/app/[locale]/components/`.

---

## 🌍 Internationalization (i18n)

- Uses `next-intl` for locale-based routing and translation.
- Each locale is placed under `/app/[locale]/`.
- Localized text is stored in `/i18n/locales/{lang}.json`.

Example:

```json
// en-US.json
{
  "home": {
    "title": "Welcome to My Portfolio",
    "subtitle": "Crafting quality software"
  }
}
```

---

## 🎯 Code Style & Naming

- Use `camelCase` for variables and functions.
- Use `PascalCase` for components and files.
- Functional components only — no class components.
- Always prefix icons from `react-icons` with their source (e.g., `FiGithub`, `FaLinkedin`).
- Use English comments to support better comprehension by AI agents and code analyzers.

---
## 👨‍💻 Local development

- Use `docker compose exec app <COMMAND>`
-
---

## 🚀 Deployment

- Deployed to **Vercel** (linked to GitHub repo).
- All pages are statically rendered.
- Favicon and SEO metadata are handled in `metadata` exports in each route file.

---

**This is a personal site, built with care and clarity. Let the code speak for your work.**