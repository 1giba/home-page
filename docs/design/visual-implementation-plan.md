# Visual implementation plan

**Status: PROPOSAL.** Listing a package does **not** authorize it. Each package needs the owner's explicit go-ahead. Decisions D1–D10 are approved (`visual-design-decisions.md`); the specification and the SPEC amendment still await approval.

- **Design source:** `visual-design-spec.md`. Token names and values come only from there.
- **Repository basis:** branch `redesign/f0-foundation`, HEAD `170c777`, Astro 7 + Tailwind CSS 4. Tokens live in `src/styles/global.css`.
- **Timing (D10):** before the new site's launch. None of this starts F8, deploys, publishes, commits, pushes or merges without separate authorization.

## Package map

There are three kinds of work, each reviewed separately:

| Kind                    | Packages      | Changes                                                                         |
| ----------------------- | ------------- | ------------------------------------------------------------------------------- |
| **Documentation**       | WP-D          | `SPEC.md` (only with approval), these design docs                               |
| **Asset preparation**   | WP-A1, WP-A2  | New files under `src/assets/brand/` and `public/` (favicons). No component code |
| **Code implementation** | WP-C1 … WP-C4 | `src/` styles, components, pages, tests                                         |
| **Validation**          | WP-V          | Evidence only (QA report), no feature code                                      |

```
WP-D approval ──► WP-A1 logo + canonical mascot ──► WP-A2 hero, favicons, icons ─────────────┐
       │                                                                                       ▼
       └──────► WP-C1 tokens & primitives ──► WP-C2 typography & spacing ──► WP-C3 shared components ──► WP-C4 pages ──► WP-V
```

- **Code is not blocked by assets.** WP-C1 to WP-C3 can proceed while assets are prepared. WP-C3 and WP-C4 use text-only fallbacks: the current wordmark, and a hero without an image. They integrate the logo and mascot once WP-A1 and WP-A2 are accepted.
- **Decorative tokens wait for the SPEC.** They (in WP-C1) and any illustration in the UI (WP-C4) are added only after WP-D has applied the SPEC amendment.

**General rules for code packages:**

- Tests first for guards and behaviour (fail, then pass).
- No existing assertion weakened.
- `npm run verify:full` exits 0 at the end of each package.
- One package is one or a few commits, which makes rollback a `git revert`.

## WP-D: Approve the specification and the SPEC amendment (documentation)

- **Scope:**
  - the owner reviews `visual-design-spec.md` and `visual-spec-amendment-proposal.md`;
  - with explicit approval, A1–A6 are applied to `SPEC.md`, wording only, filling in the approval date;
  - `IMPLEMENTATION_PLAN.md` stays unchanged unless separately approved.
- **Dependencies:** none.
- **Acceptance:**
  - `SPEC.md` differs from the approved copy only in §7.1, §7.2 (principles 2 and 3), §7.3 (Color, Imagery and Cards rows) and §7.4;
  - a diff is shown to the owner before it's applied.
- **Tests:** none. Docs only; `npm run check-format` for Markdown.
- **Manual checks:** the owner reads the diff.
- **Risks / rollback:** a mis-scoped edit is reverted by restoring the approved copy in `.superpowers/sdd/IMPLEMENTATION_PLAN/SPEC.md`.

## WP-A1: Logo variants and the canonical mascot (asset preparation)

- **Scope** (D7 workflow, decisions register §3):
  - AI-assisted drafts of the logo concept and the mascot;
  - owner selection of **one** canonical mascot (V7);
  - **manual vector reconstruction** of the horizontal logo, the stacked logo and the symbol, plus the small-size symbol (V4, V6);
  - mascot cleanup to a PNG master with alpha;
  - an asset register entry for each asset, with a rights review (V5, V9).
- **Dependencies:** WP-D approved (the asset rules are part of the amendment); owner authorization to produce assets. No purchases or supplier contact are implied.
- **Acceptance:**
  - Logo SVGs contain only vector paths (no `<image>`, no `<text>`), use the exact token colors, are ≤ 4 KB each, and meet clear space ≥ 0.5 C and the minimum sizes (spec §7.1).
  - Mascot matches spec §7.2: blue shell, white face, yellow side panel, simple face, no limbs, accessories or name, 3/4 view, matte; clean edges on white, surface and accent-soft.
  - The register is complete. **No asset is used on the site until its rights review is recorded as passed.**
- **Tests:** none yet (assets only). The logo guard test is added in WP-C3.
- **Manual checks:** the owner compares the logo and mascot with the reference; legibility at the minimum sizes; the mascot reads as professional, not childish.
- **Risks:** inconsistent drafts, raster artefacts, unclear rights. **Rollback:** assets are not referenced by code until WP-C3/C4, so dropping them affects nothing.

## WP-A2: Hero illustration, favicons and app icons, line icons (asset preparation)

- **Scope:**
  - hero illustration: the canonical mascot + up to three technology objects, 1:1, a 1200×1200 PNG master (spec §7.3);
  - favicons and app icons exported from the symbol (`favicon.ico` 16/32, `icon.svg`, 180×180, 512×512);
  - Lucide line icons selected (3 service icons, `check`, `alert-circle`, `arrow-right`, `mail`, `calendar`), with the ISC and Feather notices recorded;
  - register entries.
- **Dependencies:** WP-A1 accepted (the canonical mascot and symbol exist).
- **Acceptance:**
  - Hero: no people, text, robots or glowing brains; the mascot matches the canonical version.
  - A layout mock-up shows the text and CTA dominant at 320, 768 and 1440 px.
  - The favicon is legible at 16 px. Rights recorded.
- **Tests:** none yet. The budgets are enforced in WP-C4.
- **Manual checks:** owner review against the reference; clutter check.
- **Risks / rollback:** as for WP-A1.

## WP-C1: Design tokens and reusable primitives (code)

- **Scope:**
  - **Consolidation:** `PageHeader.astro`, `Section.astro`, `CtaBand.astro`. Replace the 9 H1 class strings, the 4 `const h2` copies and the 4 hand-built CTA blocks.
  - **Containers:** reset the container scale; add `--container-headline`/`--container-narrow`; remove `max-w-3xl` and `max-w-xs`.
  - **Duplicates:** shared primary-button classes (`LinkButton.astro` and the `ContactForm.astro` submit); `/services/` uses `ServiceCard.astro` through a slot.
  - **Tokens** (spec §1, §4): new values; `accent-soft`, `accent-active`, `border-strong`, `radius-sm/lg/full`, `shadow-sm/md`. **`deco-*` tokens only after WP-D.**
- **Likely files:**
  - `src/styles/global.css`
  - `src/components/{PageHeader,Section,CtaBand,ServiceCard,ContactForm,ServiceDetail,LegalPage,CaseStudy}.astro`, `src/components/ui/LinkButton.astro`
  - `src/pages/[lang]/{index,about,services/index,contact/index,contact/thanks,work/index}.astro`, `src/pages/404.astro`
- **Tests first:**
  - extend `tests/unit/contrast.test.ts` (spec §12);
  - after WP-D, the decorative-color guard.
- **Dependencies:** authorization. WP-D only for the decorative tokens.
- **Acceptance:**
  - `verify:full` exits 0;
  - no `max-w-3xl`, `max-w-xs` or `const h2 =` in `src/`;
  - no hex values in `.astro` files.
- **Relevant tests:** all; especially `tests/dist/{seo,services,home,contact}.test.ts` and `tests/e2e/{responsive,a11y,keyboard}.spec.ts`.
- **Manual checks:** before/after screenshots (kept out of the repo) at 375 and 1440 px, both locales. Differences are limited to the token changes.
- **Risks:** heading levels changing in `Section` (explicit `headingLevel`); loss of `data-section` and id hooks used by tests.
- **Rollback:** revert the package commits.

## WP-C2: Typography and spacing (code)

- **Scope:**
  - Plus Jakarta Sans woff2 (latin, latin-ext) with `OFL.txt`, `@font-face` `swap`, a metric-adjusted fallback, latin preloaded in `BaseLayout.astro`;
  - the `--text-*` scale, weights and tracking;
  - `text-wrap: balance` on headings;
  - the rhythm rules of spec §3 through the primitives.
- **Tests first:**
  - font-budget dist test;
  - hero H1 ≤ 4 lines at 320 px (e2e). It fails at HEAD in pt-BR.
- **Dependencies:** WP-C1.
- **Acceptance:**
  - **V1:** a glyph check of the subsets against the site's pt-BR/en characters (spec §2.1).
  - **V2:** ≤ 60 KB per woff2.
  - **V3:** Lighthouse at the F7-03 thresholds on `/pt-br/`, `/en/` and `/pt-br/contact/`.
  - `verify:full` exits 0.
  - If V1–V3 fail, keep the system stack and the scale changes only.
- **Relevant tests:** `responsive.spec.ts` (320 px, 200% text), `js-budget.test.ts` (the font must be same-origin), `a11y.spec.ts`.
- **Manual checks:** font swap on a throttled connection (no visible jump); headings in both languages at 320 and 1440 px.
- **Risks:** layout shift; longer pt-BR lines.
- **Rollback:** remove `@font-face` and the preload. The fallback is already in the stack.

## WP-C3: Shared components (code)

- **Scope:**
  - **Header:** remove `border-t-[3px]`; logo (WP-A1, or the text wordmark); pill language switcher and menu toggle; 72 px bar.
  - **Footer:** stacked logo or wordmark; icon buttons.
  - **Controls:** buttons (pill variants, arrow link); form controls and error line with `alert-circle`.
  - **Cards:** service and case cards (stretched link, shadows); steps badges; highlight panel; success block on `--color-surface`.
  - **Icons:** Lucide paths in `src/components/ui/icon-paths.ts`.
- **Likely files:**
  - `src/components/{Header,MobileNav,LanguageSwitcher,Footer,ContactForm,ServiceCard,CaseCard,EngagementSteps,FounderEvidence,ServiceDetail}.astro`
  - `src/components/ui/{LinkButton,Icon}.astro`, `icon-paths.ts`
  - `src/layouts/BaseLayout.astro` (favicons, when WP-A2 is accepted)
- **Tests first:**
  - logo guard (accessible name "Code Happy"; SVG paths only) once the logo is integrated;
  - error containers include an `aria-hidden` icon;
  - each card has exactly one `<a>`.
- **Dependencies:** WP-C2. The logo and favicons need WP-A1/WP-A2 accepted with the rights recorded.
- **Acceptance:** `verify:full` exits 0; no nested interactive elements (axe); keyboard focus visible on cards.
- **Relevant tests:** `tests/e2e/{navigation,keyboard,a11y,responsive}.spec.ts`, `tests/dist/{contact,menu-fallback,links}.test.ts`, `tests/unit/site-chrome.test.ts`, `tests/dist-fixtures/work.test.ts`.
- **Manual checks:**
  - header at 320–1440 px with the menu open and closed, both locales;
  - form error and success states;
  - logo at the minimum sizes.
- **Risks:** the no-JS menu; the `:has()` fallback; pill target sizes; stretched links swallowing clicks.
- **Rollback:** revert the commits. Logo integration can be reverted alone, back to the wordmark.

## WP-C4: Homepage and internal pages (code)

- **Scope:** spec §9 for home, services, service pages, about, contact, legal, thanks and 404.
  - The hero grid with the WP-A2 illustration via `astro:assets` `<Picture>`: AVIF/WebP, explicit dimensions, `alt=""`.
  - The canonical mascot on 404 and thanks.
  - Text-only fallbacks if the assets aren't accepted.
  - Decorative timeline dots only after WP-D.
- **Tests first:** the image guard (`width`, `height`, `alt` on every `<img>`); budgets (hero ≤ 80 KB, mascot ≤ 30 KB).
- **Dependencies:** WP-C3. Assets need WP-A2. Illustrations in the UI need WP-D.
- **Acceptance:**
  - `verify:full` exits 0.
  - `tests/dist/contact.test.ts` section order and "first main link is Calendly" pass **unchanged**.
  - **V8:** hero budget, and whether it is the LCP element.
  - Lighthouse at the F7-03 thresholds.
  - At 375×800, the H1, lead and primary CTA are above the fold.
- **Relevant tests:** all; `tests/dist/content-safety.test.ts` ("no unreferenced asset").
- **Manual checks:**
  - every page at 320/375/768/1024/1440 px in both locales;
  - mascot prominence at each breakpoint;
  - the visual vs DOM order on contact (keyboard pass).
- **Risks:** LCP and CLS from images; unused assets in `dist/`; longer pt-BR copy in the hero.
- **Rollback:** revert. Removing an image reference falls back to the text-only layout.

## WP-V: Validation (evidence)

- **Scope:**
  - **Clean run:** `npm ci` + `npm run verify:full`; the concurrency check; `npm run launch-check` (must still fail for E1/E2 only, unchanged).
  - **Lighthouse:** the six F7-03 pages.
  - **QA report:** a **new** dated report, without overwriting `docs/qa/2026-10-23-qa-report.md`.
  - **F8-04 manual checks:** the screen reader smoke test and the visual overlap inspection stay mandatory, and the human keyboard confirmation stays recommended. They are **not** marked passed unless a person performs them.
- **Dependencies:** WP-C4.
- **Acceptance:** all automated gates green; the Lighthouse table meets the thresholds; V1–V9 recorded with evidence or listed as still pending.

## Validation commands

These are existing scripts only.

- `npm run verify:full`
- `npx vitest run tests/unit/contrast.test.ts`
- `npx vitest run tests/dist/`
- `npx playwright test tests/e2e/responsive.spec.ts tests/e2e/a11y.spec.ts tests/e2e/keyboard.spec.ts tests/e2e/motion.spec.ts`
- `npm run launch-check` (expected to keep failing on the same E1/E2 reasons)
- Lighthouse per F7-03
- `bash .superpowers/sdd/IMPLEMENTATION_PLAN/concurrency-check.sh`

## Risks across packages

| Risk                                  | Prevention                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------- |
| Contrast regressions                  | Extended `contrast.test.ts`; the decorative-color guard                             |
| "Toy" or childish drift               | Spec §0; one mascot moment; the deco budget; owner review at WP-A1, WP-A2 and WP-C4 |
| Publishing assets with unclear rights | Asset register; nothing referenced before the rights review passes (V5, V9)         |
| Raster logo slipping in               | Logo guard: paths only, no `<image>` or `<text>`                                    |
| Performance (font, images)            | Budgets; Lighthouse after WP-C2, WP-C4 and WP-V                                     |
| Broken test hooks                     | Keep `data-section`, ids and DOM order; tests are only extended                     |
| Copy creep                            | New visible text (eyebrows, informative alt, mascot name) needs E3                  |
| Diverging from the SPEC               | Decorative tokens and illustrations only after WP-D                                 |
