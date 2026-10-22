// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import { DEFAULT_LOCALE, LOCALES } from './src/i18n/locales.ts'
import { LEGACY_REDIRECTS } from './src/config/redirects.ts'

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://codehappy.com.br',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: { ...LEGACY_REDIRECTS },
  i18n: {
    // Plain path strings: Astro 7.4.1 types `defaultLocale` as a locale *code* for object locales,
    // while its runtime validator requires the *path*. BCP 47 tags (pt-BR, en) live in LANG_TAG.
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    // Root and legacy redirects come from src/config/redirects.ts (F2-03), not from i18n routing.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
    // Fail instead of silently moving to another port, so tests never hit the wrong server.
    preview: { strictPort: true },
  },
})
