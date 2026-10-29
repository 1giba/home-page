// Compile-time assertions, checked by `astro check` (not run by Vitest).
import type { Props } from '@/layouts/BaseLayout.astro'

// A complete, valid props object: keeps each @ts-expect-error below about one thing only.
export const valid: Props = { locale: 'en', path: '/about/', title: 't', description: 'd' }

// Pages cannot control the Work link: BaseLayout decides it (plan F1-03 / F3-02).
// @ts-expect-error showWork is not a BaseLayout prop
export const pageSetsWork: Props = { ...valid, showWork: true }

// Every page must supply a meta description (SPEC §11.1).
// @ts-expect-error description is required
export const noDescription: Props = { locale: 'en', path: '/about/', title: 't' }
