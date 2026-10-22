import { getViteConfig } from 'astro/config'

type AstroViteConfig = Parameters<typeof getViteConfig>[0]

// Astro's Vite config lets tests render .astro components with the Container API.
// The cast is needed because Astro 7 types getViteConfig against its own bundled Vite, which
// Vitest's `test` augmentation does not reach. Runtime behaviour is unaffected.
// Unit-tested modules must still not import `astro:*` virtual modules (plan §3).
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/dist/**/*.test.ts'],
  },
} as unknown as AstroViteConfig)
