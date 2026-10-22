// Compile-time assertions, checked by `astro check` (not run by Vitest).
import type { Props } from '@/layouts/BaseLayout.astro'

// Pages cannot control the Work link: BaseLayout decides it (plan F1-03 / F3-02).
// @ts-expect-error showWork is not a BaseLayout prop
export const pageSetsWork: Props = { locale: 'en', title: 't', showWork: true }
