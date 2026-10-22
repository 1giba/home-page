import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'

export default [
  {
    ignores: ['dist/', '.astro/', 'legacy/', 'node_modules/', '.superpowers/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  // Backed by eslint-plugin-jsx-a11y-x (ESLint 10-compatible fork; eslint-plugin-jsx-a11y caps at ESLint 9).
  ...astro.configs['jsx-a11y-recommended'],
]
