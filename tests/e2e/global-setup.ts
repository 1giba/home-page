import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { FullConfig } from '@playwright/test'

/**
 * Refuses to run the suite unless the server under test serves this checkout's dist/.
 * Guards against another process (a parallel run, a dev server) answering on the port.
 */
export default async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL = config.projects[0]?.use.baseURL
  if (!baseURL) throw new Error('globalSetup: no baseURL configured')

  const expected = readFileSync(join(process.cwd(), 'dist', 'index.html'), 'utf8')
  const response = await fetch(new URL('/', baseURL))
  const served = await response.text()

  if (served !== expected) {
    throw new Error(
      `The server at ${baseURL} is not serving this checkout's dist/ ` +
        `(${process.cwd()}/dist/index.html differs from GET /). ` +
        'Another process may be using the port; rebuild with `npm run build` and retry.'
    )
  }
}
