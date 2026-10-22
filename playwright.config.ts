import { defineConfig, devices } from '@playwright/test'

// Not 4321: that is `astro dev`'s default, and tests must never run against a dev server.
const PORT = 4322
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'line' : 'list',
  use: { baseURL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Serves the production build; run `npm run build` first. Skipped when testing a deployed URL.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Run astro directly (not via `npm run`) so Playwright owns the server process.
        // --ignore-lock forces a foreground server: Astro 7 otherwise auto-backgrounds
        // `preview` when it detects an AI agent, which leaves an orphan on the port.
        command: `npx astro preview --port ${PORT} --ignore-lock`,
        url: `http://localhost:${PORT}/`,
        // Always start our own server on the built dist/; fail loudly if the port is taken.
        reuseExistingServer: false,
      },
})
