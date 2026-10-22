import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { FullConfig } from '@playwright/test'

// A real page whose bytes change with every build (markup and hashed asset names). The root `/`
// is a redirect stub that is identical across builds, so it cannot identify a build.
const IDENTITY_PAGE = '/pt-br/'

/**
 * Refuses to run the suite unless the server under test serves this checkout's dist/.
 * Guards against another process (a parallel run, a dev server) answering on the port.
 */
export default async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use.baseURL
  if (!baseURL) throw new Error('globalSetup: no baseURL configured')

  const root = config.configFile ? dirname(config.configFile) : process.cwd()
  const expected = readFileSync(join(root, 'dist', IDENTITY_PAGE, 'index.html'), 'utf8')
  const response = await fetch(new URL(IDENTITY_PAGE, baseURL), { redirect: 'manual' })
  const served = response.status === 200 ? await response.text() : null

  if (served !== expected) {
    throw new Error(
      `The server at ${baseURL} is not serving this checkout's dist/ ` +
        `(GET ${IDENTITY_PAGE} → ${response.status}, ` +
        `${served === null ? 'not a 200' : `differs from ${root}/dist${IDENTITY_PAGE}index.html`}). ` +
        'Another process may be using the port; rebuild with `npm run build` and retry.'
    )
  }
}
