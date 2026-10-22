import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// Plain Vitest config (not Astro's getViteConfig, whose types reject `test` under Vitest 5).
// Unit-tested modules must not import `astro:*` virtual modules (plan §3).
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['tests/unit/**/*.test.ts', 'tests/dist/**/*.test.ts'],
  },
})
