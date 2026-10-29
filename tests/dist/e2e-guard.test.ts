import { createServer, type Server } from 'node:http'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import globalSetup from '../e2e/global-setup'
import { assertDistBuilt, distDir, readRaw } from './helpers'

// The e2e identity guard must recognise *this* build. `/` is a redirect stub (F2-03) whose bytes
// are the same in every build of the site, so it cannot be what the guard compares.

type Routes = Record<string, { status?: number; headers?: Record<string, string>; body?: string }>

let server: Server | undefined
afterEach(() => server?.close())

function serve(routes: Routes): Promise<number> {
  return new Promise((resolve) => {
    server = createServer((req, res) => {
      const route = routes[req.url ?? ''] ?? { status: 404, body: 'not found' }
      res.writeHead(route.status ?? 200, route.headers ?? {})
      res.end(route.body ?? '')
    }).listen(0, () => resolve((server!.address() as { port: number }).port))
  })
}

const configFor = (port: number) =>
  ({
    configFile: join(distDir, '..', 'playwright.config.ts'),
    projects: [{ use: { baseURL: `http://localhost:${port}` } }],
  }) as unknown as Parameters<typeof globalSetup>[0]

describe('e2e identity guard', () => {
  it('accepts a server serving this checkout’s build', async () => {
    assertDistBuilt()
    const port = await serve({ '/pt-br/': { body: readRaw('pt-br/index.html') } })
    await expect(globalSetup(configFor(port))).resolves.toBeUndefined()
  })

  it('rejects another build even when its / redirect stub is byte-identical', async () => {
    const port = await serve({
      '/': { body: readRaw('index.html') },
      '/pt-br/': { body: '<!doctype html><html lang="pt-BR"><body>another build</body></html>' },
    })
    await expect(globalSetup(configFor(port))).rejects.toThrow(/not serving this checkout/)
  })

  it('rejects a server that redirects instead of serving the page', async () => {
    const port = await serve({
      '/pt-br/': { status: 302, headers: { location: '/elsewhere/' } },
      '/elsewhere/': { body: readRaw('pt-br/index.html') },
    })
    await expect(globalSetup(configFor(port))).rejects.toThrow(/not serving this checkout/)
  })

  it('reads dist/ next to the Playwright config, not from the current directory', async () => {
    const port = await serve({ '/pt-br/': { body: readRaw('pt-br/index.html') } })
    const cwd = process.cwd()
    process.chdir('/')
    try {
      await expect(globalSetup(configFor(port))).resolves.toBeUndefined()
    } finally {
      process.chdir(cwd)
    }
  })
})
