# Code Happy — Technology Leadership & AI Consulting

Code Happy's institutional website, built with Astro and Tailwind CSS v4. The site is content-led and statically generated, with Portuguese as the default language and English under `/en`.

## Stack

- Astro 5 with TypeScript
- Tailwind CSS 4 via the official Vite plugin
- Static generation by default
- Bilingual pages: `pt-BR` and `en`
- FormSubmit for contact form delivery

## Local development

Requires Node.js 18.20.8+, 20.3.0+, or a compatible newer LTS version.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
npm run build
npm run preview
```

## Routes

Portuguese pages are the default routes: `/`, `/services`, `/work`, `/about`, `/contact`, `/privacy`, and `/terms`.

English equivalents are under `/en`: `/en/`, `/en/services`, `/en/work`, `/en/about`, `/en/contact`, `/en/privacy`, and `/en/terms`.

Project case studies are generated at `/work/{slug}` and `/en/work/{slug}`.

## Deployment

The site is configured for `https://www.codehappy.com.br` and can be deployed to Vercel as an Astro project. The contact form uses FormSubmit and depends on that provider being activated for the configured inbox.
