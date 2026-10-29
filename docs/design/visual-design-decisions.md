# Visual design: decision register

**Status:** decisions D1–D10 were **approved by the owner on 23 October 2026**. This register records them, the technical defaults that follow from them, the pending validations and the asset plan.

**This register does not approve:**

- the visual specification as a whole;
- the SPEC amendment;
- asset production;
- implementation.

Each of those needs explicit approval.

**Legend:**

- **Approved:** decided by the owner.
- **Technical:** a default the implementer follows unless the owner objects.
- **Pending:** must be verified with evidence before it counts as done.

## 1. Approved owner decisions

| #   | Decision            | Approved content                                                                                                                                                                                                                                 | Conditions / notes                                                                                                                                                                                                   |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| —   | Direction           | Bright, modern, friendly, premium. Credibility (senior engineering, architecture, practical AI, reliability) balanced with personality (creativity, collaboration, optimism, approachability). Neither a generic corporate template nor childish | The reference image was not available to the author; the owner reviews assets against it                                                                                                                             |
| D1  | Primary blue        | `#2557E8` (`--color-accent`); hover `#1D47C9`, active `#1A3EAE`                                                                                                                                                                                  | AA verified for the listed pairs (spec §1.1); any other pair must be computed before use                                                                                                                             |
| D2  | Secondary colors    | Pink `#F25C9A`, yellow `#FFC93C`, green `#2EC27E`, with soft tints `#FDF0F6`, `#FEF8E1`, `#EAF8F1`                                                                                                                                               | Illustration, logo and decoration only, never text. Error `#B42318` and success `#137A3F` stay semantically distinct (always icon + text; decorative colors never used for status)                                   |
| D3  | Typography          | Plus Jakarta Sans, self-hosted variable font                                                                                                                                                                                                     | Licence verified (SIL OFL 1.1). Coverage, file size, loading and performance **pending** (V1–V3). Fallback: system stack or Inter                                                                                    |
| D4  | Logo                | "code" dark navy `#0B1426` + "happy" vibrant blue `#2557E8` + small pink accent `#F25C9A` + blue-and-yellow cube symbol. Horizontal (primary), stacked, symbol-only                                                                              | The generated image is a visual reference, not a production asset. The production logo is real vectors (no raster in SVG, no live text)                                                                              |
| D5  | Mascot              | Friendly 3D cube: blue outer shell, white front face, yellow side panel, simple expressive face; small blue/yellow/pink decorative elements above it allowed; static                                                                             | No limbs, accessories or name without a documented reason and approval; professional, not childish                                                                                                                   |
| D6  | Founder photo       | Optional                                                                                                                                                                                                                                         | Not a dependency; never generated or simulated                                                                                                                                                                       |
| D7  | Asset sourcing      | AI-assisted first drafts for the logo concept, mascot and hero illustration                                                                                                                                                                      | Drafts are source material: quality review and production preparation are required. Usage rights verified before publication. No purchases or supplier contact. Manual vector reconstruction of the logo is required |
| D8  | Initial asset scope | 1. horizontal logo; 2. stacked logo; 3. cube symbol; 4. favicon and app icons; 5. primary mascot illustration; 6. homepage hero illustration                                                                                                     | Extra mascot poses and decorative or spot illustrations are optional follow-up                                                                                                                                       |
| D9  | SPEC amendment      | Direction approved in principle; a narrow amendment prepared (`visual-spec-amendment-proposal.md`)                                                                                                                                               | Editing `SPEC.md` needs separate explicit approval                                                                                                                                                                   |
| D10 | Timing              | Visual refinement before the new site's launch                                                                                                                                                                                                   | Doesn't start F8; no deployment, publication, commit, push or merge; implementation needs separate authorization                                                                                                     |

## 2. Technical defaults (follow unless the owner objects)

| Topic                    | Default                                                                                                                                                                                    | Spec       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Neutral and state tokens | `bg #FFFFFF`, `surface #F6F8FC`, `accent-soft #EEF3FF`, `text #0B1426`, `muted #4A5568`, `border #DCE3EE`, `border-strong #6B7A90`, `error #B42318`, `success #137A3F`                     | §1         |
| Type scale and weights   | 6 steps; H1 28 px at 320 px → 56 px cap; weights 400/500/600/700/800                                                                                                                       | §2         |
| Radii and shadows        | sm 0.5rem, lg 1rem, full; two shadow levels on interactive cards only                                                                                                                      | §4         |
| Buttons                  | Pill, 44 px; primary, secondary, text and arrow variants                                                                                                                                   | §5         |
| Shared primitives        | `PageHeader`, `Section`, `CtaBand`; shared service card and button classes                                                                                                                 | §6.1       |
| Header                   | Static; logo 32/28 px; the 3px top border removed                                                                                                                                          | §8         |
| Logo rules               | Clear space ≥ 0.5 C (C = cube height); minimum sizes horizontal 120 px, stacked 80 px, symbol 16 px (simplified below 24 px); no monochrome or reversed version until a real use needs one | §7.1       |
| Mascot canonical view    | 3/4 from slightly above; edge radius about 12–15%; soft matte; key light top left; transparent; light backgrounds only                                                                     | §7.2       |
| Hero illustration        | Mascot + up to three technology objects; 1:1, master 1200×1200 PNG; ≤ 80 KB AVIF                                                                                                           | §7.3       |
| Icons                    | Lucide paths copied (ISC, verified), no dependency                                                                                                                                         | §7.4       |
| Contact layout           | Two columns from `lg`, DOM order unchanged                                                                                                                                                 | §9.5       |
| Copy                     | No new copy. Eyebrows and informative alt text need E3                                                                                                                                     | §2.3, §7.5 |

## 3. Asset production workflow (D7, D8)

This is a plan only. Nothing has been generated, downloaded, bought or commissioned.

| Step                 | Logo (1–3)                                                                                                                                                   | Favicon / app icons (4)                                                     | Canonical mascot (5)                                                                                                                                                                                                                 | Hero illustration (6)                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| a. Draft             | AI-assisted concept matching D4                                                                                                                              | — (derived)                                                                 | AI-assisted renders matching D5 and spec §7.2                                                                                                                                                                                        | AI-assisted composition: the canonical mascot + ≤ 3 objects (spec §7.3)                     |
| b. Review            | Owner reviews it against the reference                                                                                                                       | —                                                                           | Owner selects **one** canonical appearance (V7) before anything else                                                                                                                                                                 | Owner reviews it after the mascot is accepted                                               |
| c. Production        | **Manual vector reconstruction** in a vector editor: outlined lettering (V4), exact token colors, horizontal/stacked/symbol, small-size symbol variant, SVGO | Exported from the symbol: `favicon.ico` 16/32, `icon.svg`, 180×180, 512×512 | Cleanup: consistent edges and alpha, background removal check, color correction to the token blues and yellow, consistent shadow. **Not** a 3D source file: if an editable 3D model is ever needed, that is separate specialist work | Same cleanup; check the mascot matches the canonical version; export a 1200×1200 PNG master |
| d. Quality checks    | V6: paths only, sizes, clear space, legibility at minimum size                                                                                               | Legible at 16 px                                                            | Edge quality on white, surface and accent-soft; no artefacts; not childish                                                                                                                                                           | No clutter; text and CTA stay dominant in layout mock-ups at 320/768/1440                   |
| e. Rights            | V5: terms of the AI tool used; no third-party marks or styles copied; record the result                                                                      | Same                                                                        | Same                                                                                                                                                                                                                                 | Same                                                                                        |
| f. Register          | Entry in `src/assets/brand/README.md` (source, date, files, steps, formats, owner, rights result)                                                            | Same                                                                        | Same                                                                                                                                                                                                                                 | Same                                                                                        |
| g. Formats delivered | SVG ×3 (+ the small-size symbol)                                                                                                                             | ICO, SVG, PNG                                                               | PNG with alpha (master)                                                                                                                                                                                                              | PNG with alpha (master); AVIF/WebP generated at build time                                  |

**What generated drafts are not.** A generated image is not:

- a clean vector;
- an editable source file;
- a complete asset package.

Where production needs more (vector reconstruction, an editable 3D model), the gap is recorded in the register. It is not hidden.

## 4. Pending technical validations

These are the same items as spec §14.

| #   | Validation                                                                 | Status  |
| --- | -------------------------------------------------------------------------- | ------- |
| V1  | Font glyph coverage (pt-BR and en characters used) in the shipped subsets  | Pending |
| V2  | woff2 size ≤ 60 KB each                                                    | Pending |
| V3  | Lighthouse with the font and hero (F7-03 thresholds)                       | Pending |
| V4  | Font outlines in the logo permitted under OFL 1.1, or the wordmark redrawn | Pending |
| V5  | Usage rights of AI-assisted drafts (tool terms)                            | Pending |
| V6  | Logo is genuine vectors and meets the size and clear-space rules           | Pending |
| V7  | Canonical mascot accepted by the owner                                     | Pending |
| V8  | Hero ≤ 80 KB AVIF; whether it is the LCP element                           | Pending |
| V9  | Asset register complete with the rights review passed                      | Pending |

## 5. Remaining owner actions

These are approvals and acceptances, not new design questions:

1. Approve the final visual specification.
2. Approve applying the SPEC amendment (A1–A6).
3. Accept the canonical mascot (V7) and the production logo (V6), after the asset work is authorized.
4. Confirm the usage-rights review (V5, V9) before any asset is published.
5. Authorize implementation, as separate packages.
