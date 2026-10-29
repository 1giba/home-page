# Gap analysis: current implementation vs the approved visual direction

**Status: FINAL PROPOSAL.** It compares the code at branch `redesign/f0-foundation`, HEAD `170c777` (re-verified on 23 October 2026), with the owner-approved direction and decisions D1–D10.

**Limitation:** the previously generated Code Happy brand reference was **not available** to the author. The comparison uses the owner's written description and decisions:

- bright, white with light-gray surfaces;
- primary blue `#2557E8`; decorative pink, yellow and green;
- Plus Jakarta Sans;
- the logo "code" (navy) + "happy" (blue) + a pink accent + a blue-and-yellow cube;
- a 3D cube mascot (blue shell, white face, yellow side panel);
- a hero combining strong copy with the mascot;
- rounded components and subtle shadows.

## 1. Interface and design system

| Approved direction                 | Current implementation (verified)                                                                          | Gap                                                              | Priority      |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------- |
| White, light-gray surfaces         | `--color-bg` #ffffff, `--color-surface` #f8fafc (`src/styles/global.css`)                                  | Small value refresh (`#F6F8FC`)                                  | Low           |
| Primary blue `#2557E8` (D1)        | `--color-accent` #1d4ed8                                                                                   | Token value change; contrast verified                            | Medium        |
| Decorative pink/yellow/green (D2)  | None. Single accent (SPEC §7.2 [Req])                                                                      | Six decorative tokens, **after the SPEC amendment**              | Medium        |
| Plus Jakarta Sans (D3)             | System font stack; H1 `font-semibold`; scale capped at 3rem                                                | Self-hosted font (V1–V3 pending), weights 700/800, H1 cap 3.5rem | High          |
| Generous, consistent whitespace    | `py-16` sections; heading gaps vary (`mt-3`/`mt-4`/`mt-6` after H1; `mt-6`/`mt-10`/`mt-12` before content) | Unified rhythm via `PageHeader`, `Section`, `CtaBand`            | High          |
| Rounded components, subtle shadows | One radius (`--radius-base` 0.5rem), no shadows                                                            | Radii sm/lg/full; two shadow levels; pill buttons                | Medium        |
| Logo (D4)                          | Plain-text "Code Happy" in the header and footer                                                           | Horizontal, stacked and symbol vectors (none exist)              | High (assets) |
| Clean header, prominent CTA        | Static header; text wordmark; 3px top border (`border-t-[3px]`, the only arbitrary value in `src/`)        | Logo, pill CTA, 72 px desktop bar                                | Medium        |
| Hero: copy + mascot                | Text-only hero (`src/pages/[lang]/index.astro`)                                                            | Two-column hero grid now; hero illustration when available       | High          |
| Consistent icons                   | 5 icons (`github`, `linkedin`, `x`, `menu`, `external`) in `src/components/ui/icon-paths.ts`               | About 8 Lucide line icons                                        | Medium        |
| Polished cards                     | Flat cards; only the title is a link; `/services/` duplicates `ServiceCard`                                | Shared interactive card with a stretched link                    | High          |
| Semantic status colors             | Error/success are color + text; form errors have no icon (a SPEC §7.3 gap)                                 | Icon + text; kept distinct from decorative colors                | Medium        |

## 2. Earlier audit findings, re-verified at HEAD `170c777`

| Finding                                                                                | Status                                         |
| -------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Repeated heading styles (9 H1 strings; `const h2` in 4 files)                          | Confirmed                                      |
| Inconsistent heading-to-content spacing                                                | Confirmed                                      |
| Duplicated service card on `/services/` (`src/pages/[lang]/services/index.astro`)      | Confirmed                                      |
| Duplicated primary-button classes (`ContactForm.astro` submit)                         | Confirmed                                      |
| Uncontrolled container scale (`max-w-3xl`, `max-w-xs`)                                 | Confirmed                                      |
| Text-only homepage hero                                                                | Confirmed                                      |
| No logo, mascot or illustrations                                                       | Confirmed (see §3)                             |
| pt-BR home H1 = 5 lines at 320 px (en = 4), measured on the HEAD build                 | Confirmed                                      |
| Conflicts with SPEC §7.2 principles 2 and 3 and the §7.3 Color, Imagery and Cards rows | Confirmed; addressed by the amendment proposal |

**What already meets the direction and stays:**

- static header and no-JS menu;
- 44 px primary targets;
- AA contrast for every text token (`tests/unit/contrast.test.ts`);
- no horizontal overflow at 320–1440 px or at 200% text;
- reduced motion;
- zero third-party requests;
- Lighthouse 100 on six pages (local, F7-03).

## 3. Assets: what exists in the repository vs the initial scope (D8)

**Tracked image files at HEAD:**

- `public/favicon.ico` (legacy);
- `public/og/default.png`, rendered from `src/assets/og/default.svg` (typographic OG image, token colors, hashes in `src/assets/og/rendered.json`);
- three SVGs under `tests/fixtures/` (test only).

There are no logo, mascot, illustration, font or brand-icon files.

| D8 priority | Asset                                  | Exists?                   | Needed work                                                      |
| ----------- | -------------------------------------- | ------------------------- | ---------------------------------------------------------------- |
| 1           | Horizontal logo                        | No (text only)            | Draft → manual vector reconstruction (WP-A1)                     |
| 2           | Stacked logo                           | No                        | Same                                                             |
| 3           | Cube symbol                            | No                        | Same, plus a small-size drawing                                  |
| 4           | Favicon and app icons                  | Legacy `favicon.ico` only | Export from the symbol (WP-A2)                                   |
| 5           | Primary (canonical) mascot             | No                        | Draft → owner selection → cleanup to a PNG master (WP-A1)        |
| 6           | Homepage hero illustration             | No                        | Mascot + ≤ 3 objects → PNG master 1200×1200 (WP-A2)              |
| —           | Line icons                             | 5 exist                   | About 8 Lucide paths (WP-A2)                                     |
| —           | Typeface files                         | No                        | Plus Jakarta Sans woff2 + `OFL.txt` (WP-C2)                      |
| Optional    | Extra mascot poses, spot illustrations | No                        | Follow-up, not a prerequisite                                    |
| Optional    | Founder photo (D6)                     | No                        | Only if the owner supplies a real photo; never generated         |
| Optional    | Updated OG image                       | Typographic OG exists     | `scripts/build-og.mjs` can be reused with the stacked logo later |

**Reusable:**

- the OG pipeline (`scripts/build-og.mjs` + `rendered.json` check);
- `Icon.astro` and `icon-paths.ts` (same stroke style as Lucide);
- `astro:assets` (already used by `CaseStudy.astro` for case covers).

## 4. Priority-ranked changes

1. **Approve the spec and amendment (WP-D).** This unblocks the decorative colors and illustrations.
2. **Consolidate and set tokens (WP-C1).** It doesn't depend on assets.
3. **Typography and rhythm (WP-C2).** It also fixes the 5-line pt-BR H1; validations V1–V3.
4. **Logo and canonical mascot (WP-A1),** in parallel with code. The production logo needs manual vector work.
5. **Shared components (WP-C3).** Logo integration once accepted; form error icons close a SPEC §7.3 gap.
6. **Hero illustration, favicons, icons (WP-A2).**
7. **Pages (WP-C4),** then **validation (WP-V).**

## 5. Constraints and unresolved gaps

**Constraints:**

- SPEC §1.4 (no generic agency template; no implied team);
- §6.4 (no animation);
- §6.5 (static header);
- §7.3 (two shadow levels; whole-card link; no hover transform);
- §12 (WCAG 2.2 AA; ≤ 10 KB JS; no third-party requests);
- copy, legal text, routing, SEO and launch gates are untouched.

**Unresolved:**

- **Fidelity to the reference** can't be checked by the author. The owner reviews the assets (WP-A1, WP-A2) and the pages (WP-C4) against it.
- **Production assets don't exist yet.** AI-assisted drafts will need vector reconstruction (logo) and cleanup (mascot, hero), and their usage rights must be verified (V5, V9) before publication.
- **Font coverage, size and performance** are not yet measured (V1–V3).
- **The decorative palette and illustrations** wait for the SPEC amendment to be applied (WP-D).
