import { createServer } from 'node:net'
import { defineConfig, devices } from '@playwright/test'

/** Asks the OS for a currently free TCP port. */
function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.once('error', reject)
    server.listen(0, () => {
      const { port } = server.address() as { port: number }
      server.close(() => resolve(port))
    })
  })
}

// Every run serves its own build on its own port, so parallel runs (other worktrees, agents, a
// running `astro dev` on 4321) can never answer each other's tests. The port is chosen once in the
// main process and handed to worker processes through the environment.
process.env.E2E_PORT ??= String(await freePort())
const PORT = Number(process.env.E2E_PORT)
const external = process.env.PLAYWRIGHT_BASE_URL
const baseURL = external ?? `http://localhost:${PORT}`

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'line' : 'list',
  use: { baseURL },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Verifies the server really serves this checkout's dist/ before any test runs.
  globalSetup: external ? undefined : './tests/e2e/global-setup.ts',
  // Serves the production build; run `npm run build` first. Skipped when testing a deployed URL.
  webServer: external
    ? undefined
    : {
        // Run astro directly (not via `npm run`) so Playwright owns the server process.
        // --ignore-lock forces a foreground server: Astro 7 otherwise auto-backgrounds
        // `preview` when it detects an AI agent, which leaves an orphan on the port.
        command: `npx astro preview --port ${PORT} --ignore-lock`,
        url: `http://localhost:${PORT}/`,
        // Always start our own server; never attach to one that happens to be listening.
        reuseExistingServer: false,
      },
})
