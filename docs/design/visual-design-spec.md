# Code Happy: Visual Design Specification

**Status: FINAL PROPOSAL for owner approval.** The owner approved the visual direction and decisions D1–D10 on 23 October 2026 (recorded in `visual-design-decisions.md`). This document turns them into an implementable specification.

**This document is not:**

- approval to implement;
- approval to edit `SPEC.md`;
- approval to produce or publish assets.

**Related documents:**

- Rules marked **[needs amendment]** take effect only once the SPEC amendment in `visual-spec-amendment-proposal.md` is approved and applied.
- Pending technical validations are listed in §14.
- `visual-implementation-plan.md` gives the order of work; `visual-reference-gap-analysis.md` compares the plan with the current site.

**Basis:**

- **Prepared:** 23 October 2026, against branch `redesign/f0-foundation`, HEAD `170c777`.
- **Inputs:**
  - the approved `SPEC.md` (read-only copy in `.superpowers/sdd/IMPLEMENTATION_PLAN/`), §§1.4, 6, 7, 12;
  - the visual audit of 23 October 2026;
  - the owner's approved direction and decisions D1–D10;
  - the current code at HEAD.
- **Limitation:** the previously generated Code Happy brand reference was **not available** to the author. Nothing here claims to reproduce it. Where it matters (logo, mascot, hero), the owner's written description is the source, and the owner reviews the produced assets against the reference.

**Contents:**

0. Design intent
1. Color
2. Typography
3. Spacing and layout
4. Shapes and elevation
5. Buttons and interaction
6. Content components
7. Brand assets: logo, mascot, hero illustration, icons
8. Header and footer
9. Page-level rules
10. Accessibility rules
11. Performance rules
12. Proposed test changes
13. What stays as it is
14. Pending technical validations

## 0. Design intent

Code Happy must look like **a senior engineering consultancy you'd enjoy working with**. The style is bright, modern, friendly and premium: neither a generic corporate template nor childish.

- **Technical credibility:** senior software engineering, architecture, practical AI engineering, reliability. The visual means are structure, precision, restraint and readable long-form text.
- **Human personality:** creativity, collaboration, optimism, approachability. The visual means are a bright palette, rounded shapes, generous whitespace and one distinctive 3D cube mascot.

**Rules of thumb:**

1. **Content leads; the brand supports.** Every page must still work if all illustrations are removed.
2. **One hero moment per page at most.** The mascot is prominent on the home hero only. Elsewhere it is small, if present at all.
3. **Blue does the work, and color is spent sparingly.** The primary blue carries actions and emphasis. Pink, yellow and green are seasoning for illustrations and small decorative details, never for text.
4. **Soft, not loose.** Shapes are rounded and shadows are subtle. Nothing floats, bounces, glows or blurs.
5. **No generic agency template** (SPEC §1.4). That means:
   - no gradient orbs, floating icons, glassmorphism or gradient text;
   - no stock photos of handshakes, robots or glowing brains;
   - nothing that implies a larger team, clients or results than are confirmed.

## 1. Color

All colors are `@theme` tokens in `src/styles/global.css`. Components never use hex values. Contrast ratios were computed with the WCAG 2.x formula on 23 October 2026. Only the pairs listed here are approved for text; any other foreground/background pair must be computed and added before use.

### 1.1 Neutral, brand and state tokens

| Token                               | Hex       | Intended use                                                                                                        | Prohibited / discouraged                                                         | Contrast (verified)                                         |
| ----------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `--color-bg`                        | `#FFFFFF` | Page background; cards on surface sections                                                                          | —                                                                                | —                                                           |
| `--color-surface`                   | `#F6F8FC` | Alternate section backgrounds; footer; summary panels; success tile                                                 | Text-bearing UI that needs extra separation (use a border)                       | Text tokens below ≥ 4.5:1 on it                             |
| `--color-accent-soft`               | `#EEF3FF` | Hero backdrop shape, highlight panels, icon tiles, CTA bands, current-language pill                                 | Large full-page fills; text color                                                | Text tokens below ≥ 4.5:1 on it                             |
| `--color-text`                      | `#0B1426` | Body text, headings; "code" in the wordmark                                                                         | —                                                                                | 18.38 bg · 17.29 surface · 16.55 accent-soft                |
| `--color-muted`                     | `#4A5568` | Secondary text, meta, captions                                                                                      | Long body paragraphs (use `text`)                                                | 7.53 bg · 7.08 surface · 6.77 accent-soft                   |
| `--color-border`                    | `#DCE3EE` | Dividers, card borders, decorative separators                                                                       | As the **only** visible boundary of a form control or button (1.29:1, below 3:1) | Decorative only                                             |
| `--color-border-strong`             | `#6B7A90` | Form-control borders, secondary-button border                                                                       | Text                                                                             | 4.36 bg · 4.10 surface · 3.93 accent-soft (≥ 3:1 UI)        |
| `--color-accent` (**D1, approved**) | `#2557E8` | Primary buttons, links, focus outline, current-nav indicator, eyebrow labels; "happy" in the wordmark; mascot shell | Large blocks of body text                                                        | 5.82 bg · 5.48 surface · 5.24 accent-soft; white on it 5.82 |
| `--color-accent-hover`              | `#1D47C9` | Hover of links and primary buttons                                                                                  | —                                                                                | 7.51 bg; white on it 7.51                                   |
| `--color-accent-active`             | `#1A3EAE` | Pressed (`:active`) primary buttons                                                                                 | —                                                                                | white on it 8.96                                            |
| `--color-on-accent`                 | `#FFFFFF` | Text and icons on accent fills                                                                                      | —                                                                                | see accent rows                                             |
| `--color-error`                     | `#B42318` | Error text, error icon, invalid-field border                                                                        | Decoration                                                                       | 6.57 bg · 6.18 surface                                      |
| `--color-success`                   | `#137A3F` | Success icon, success heading accent                                                                                | Decoration                                                                       | 5.41 bg · 5.09 surface · 4.87 accent-soft                   |

**Focus color:** `--color-accent`, ≥ 5.24:1 against every background token (SPEC §6.5, §12.2: ≥ 3:1). No separate token is needed.

### 1.2 Decorative secondary tokens: D2, approved [needs amendment]

| Token                      | Hex       | Intended use                                                                              | Prohibited                                                                               | Contrast                           |
| -------------------------- | --------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------- |
| `--color-deco-pink`        | `#F25C9A` | Logo accent; illustration secondary color; small decorative shapes (dots, strokes ≥ 3 px) | **Text of any size**; control borders; status (error) indication; meaning by color alone | 3.10:1 on white: fails text        |
| `--color-deco-yellow`      | `#FFC93C` | Logo cube side; mascot side panel; illustration; small decorative shapes                  | Same                                                                                     | 1.54:1 on white: fails text and UI |
| `--color-deco-green`       | `#2EC27E` | Illustration; small decorative shapes                                                     | Same; **never** for success indication                                                   | 2.30:1 on white: fails text and UI |
| `--color-deco-pink-soft`   | `#FDF0F6` | Background tint for decorative tiles                                                      | Section backgrounds; status messages                                                     | `text` 16.61 · `muted` 6.80        |
| `--color-deco-yellow-soft` | `#FEF8E1` | Same                                                                                      | Same                                                                                     | `text` 17.27 · `muted` 7.07        |
| `--color-deco-green-soft`  | `#EAF8F1` | Same                                                                                      | Same; never for success states                                                           | `text` 16.80 · `muted` 6.88        |

**Semantic separation (D2).** Error and success stay semantically distinct from the decorative colors:

- Error (`#B42318`) and success (`#137A3F`) are darker than decorative pink and green (2.12:1 and 2.35:1 apart), and they are **always** paired with an icon and text. Color is never the only signal.
- Decorative pink and green never appear in or next to form states, status messages or validation.
- The success block uses `--color-surface` with a `--color-success` icon, **not** a decorative tint.

**Usage budget:**

- Outside the logo and illustrations, decorative colors cover no more than about 10% of any viewport.
- None on legal pages.
- Dark text (`--color-text`) on a decorative fill is allowed for small badges: 11.97:1 on yellow, 5.93 on pink, 8.00 on green.
- White text on a decorative fill is **not** allowed.

### 1.3 Changes from the current tokens (HEAD)

| Current token          | Value     | Change                                                                   |
| ---------------------- | --------- | ------------------------------------------------------------------------ |
| `--color-surface`      | `#f8fafc` | → `#F6F8FC`                                                              |
| `--color-text`         | `#0f172a` | → `#0B1426`                                                              |
| `--color-muted`        | `#475569` | → `#4A5568`                                                              |
| `--color-border`       | `#cbd5e1` | → `#DCE3EE` (decorative only); control borders → `--color-border-strong` |
| `--color-accent`       | `#1d4ed8` | → `#2557E8` (D1)                                                         |
| `--color-accent-hover` | `#1e40af` | → `#1D47C9`                                                              |
| `--color-error`        | `#b91c1c` | → `#B42318`                                                              |
| `--color-success`      | `#15803d` | → `#137A3F`                                                              |
| —                      | —         | New: `accent-soft`, `accent-active`, `border-strong`, six `deco-*`       |

`--color-bg` stays `#FFFFFF` (asserted by `tests/unit/contrast.test.ts`).

## 2. Typography: D3, approved, with pending validations

### 2.1 Typeface

**Plus Jakarta Sans**, self-hosted variable font (`wght` axis).

| Item                | Status                                                                                                                                                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Licence             | **Verified:** SIL Open Font License 1.1 (`github.com/tokotype/PlusJakartaSans`, `OFL.txt`, 23 Oct 2026). Self-hosting and subsetting are permitted. `OFL.txt` must ship with the files                                                                                                         |
| pt-BR / en coverage | **Claimed by the project** ("Encoding based on GF Latin Pro & GF Latin Plus"). **Pending:** verify that the shipped subset contains every glyph used by the site in both languages, including ã õ ç á é í ó ú â ê ô à ü, the "–", "—", "…", "’" and "©" punctuation, and the "→" arrow if used |
| File size           | **Pending:** measure after subsetting. Budget ≤ 60 KB per woff2 (§11)                                                                                                                                                                                                                          |
| Loading             | **Defined:** one variable woff2 per subset (latin, latin-ext), `font-display: swap`, latin preloaded, a metric-adjusted fallback face (`size-adjust`, `ascent-override`, `descent-override` computed from the real file), no CDN                                                               |
| Performance impact  | **Pending:** Lighthouse with F7-03 thresholds. If the budget or the thresholds fail, keep the system stack. Every rule in this spec works with it                                                                                                                                              |

Fallback alternative, if validation fails: **Inter** (SIL OFL 1.1, verified at `github.com/rsms/inter`), or the current system stack.

### 2.2 Font stack and weights

```
--font-sans: 'Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', ui-sans-serif, system-ui,
  -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: (unchanged)
```

| Use                      | Weight |
| ------------------------ | ------ |
| Body, lead               | 400    |
| Nav links, labels, meta  | 500    |
| Buttons, card titles, H3 | 600    |
| H2                       | 700    |
| H1                       | 800    |

### 2.3 Scale

Six steps (SPEC §7.3); H1 on mobile ≤ 40 px.

| Token         | Size                                    | Line height | Tracking | Use                            |
| ------------- | --------------------------------------- | ----------- | -------- | ------------------------------ |
| `--text-sm`   | 0.875rem (14 px)                        | 1.5         | 0        | Meta, captions, labels, footer |
| `--text-base` | 1rem (16 px)                            | 1.6         | 0        | Body, buttons                  |
| `--text-lg`   | 1.125rem (18 px)                        | 1.55        | 0        | Leads, card summaries          |
| `--text-xl`   | clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)  | 1.3         | −0.01em  | H3, card titles                |
| `--text-2xl`  | clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)  | 1.2         | −0.015em | H2                             |
| `--text-3xl`  | clamp(1.75rem, 1.2rem + 2.75vw, 3.5rem) | 1.1         | −0.02em  | H1 (all pages)                 |

At 320 px, H1 = 28 px; it caps at 56 px.

- **Eyebrow labels** (optional): `--text-sm`, 600, uppercase, 0.08em, `--color-accent`. Existing copy only; new eyebrow text needs E3.
- **Widths:** prose and leads ≤ `--container-prose`; H1 ≤ `--container-headline`.
- **Monospace:** only step numbers and timeline years.
- **Long Portuguese headline:**
  - home H1 ≤ 4 lines at 320 px in both locales (HEAD: 5 lines in pt-BR at 32 px);
  - wording unchanged; no `<br>` or forced spaces;
  - `text-wrap: balance` on H1/H2 as progressive enhancement.

## 3. Spacing and layout

- **Spacing:** Tailwind's default 4 px scale; only the steps below are used for rhythm.
- **Containers:** reset the default scale (`--container-*: initial`; HEAD still allows `max-w-3xl` and `max-w-xs`).

| Token                  | Value | Use                                                  |
| ---------------------- | ----- | ---------------------------------------------------- |
| `--container-content`  | 72rem | Page container (unchanged)                           |
| `--container-prose`    | 42rem | Prose, leads, forms (unchanged)                      |
| `--container-headline` | 40rem | Home hero H1 (replaces `max-w-3xl`)                  |
| `--container-narrow`   | 20rem | Footer tagline and footer logo (replaces `max-w-xs`) |

- **Gutters:** unchanged (`px-4 sm:px-6 lg:px-8`).

**Rhythm.** Implemented once, in the shared primitives (§6.1):

| Relationship                         | Spacing                                        |
| ------------------------------------ | ---------------------------------------------- |
| Inner page header top padding        | `pt-12 md:pt-16`                               |
| H1 → lead                            | `mt-4`                                         |
| Lead → first content block           | `mt-10 md:mt-12`                               |
| Section vertical padding             | `py-16 md:py-24`                               |
| Home hero padding                    | `pt-10 pb-16 md:pt-16 lg:py-24`                |
| H2 → section intro                   | `mt-3`                                         |
| H2 or intro → content                | `mt-8`                                         |
| Stacked sections in one prose column | `gap-12 md:gap-16`                             |
| Card grid gap                        | `gap-6` (`lg:gap-8` on the home services grid) |
| Card padding                         | `p-6 md:p-8`                                   |
| Form fields; label → control         | `gap-6`; `mt-2`                                |

**Grids** (SPEC §7.3): one column on mobile, two at `md`, three at `lg`. In a three-card grid at `md`, the last card spans both columns.

**Header height:** `min-h-16` below `lg`, `min-h-18` (72 px) from `lg`. The bar wraps at large text sizes; there is no fixed height.

## 4. Shapes and elevation

| Token           | Value  | Use                                                           |
| --------------- | ------ | ------------------------------------------------------------- |
| `--radius-sm`   | 0.5rem | Inputs, selects, textarea, nav-link hover areas, small badges |
| `--radius-lg`   | 1rem   | Cards, panels, images, form card, CTA bands, hero backdrop    |
| `--radius-full` | 9999px | Buttons, language pills, icon buttons, number badges          |

The current `--radius-base` is replaced: buttons → `full`, cards → `lg`, inputs → `sm`.

Two shadow levels (SPEC §7.3):

| Token         | Value                                                                    | Use                                       |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------- |
| `--shadow-sm` | `0 1px 2px rgb(11 20 38 / 0.06), 0 2px 6px rgb(11 20 38 / 0.06)`         | Resting interactive cards; form card      |
| `--shadow-md` | `0 2px 6px rgb(11 20 38 / 0.06), 0 12px 32px -12px rgb(11 20 38 / 0.18)` | Hover / focus-within of interactive cards |

- **Non-interactive blocks** are flat (border or tint).
- No hover scale or translate. No blur, glass or UI gradients; only the 3D illustrations contain shading.
- **Borders:** 1 px `--color-border` (cards, dividers); 1 px `--color-border-strong` (controls); 2 px `--color-error` (invalid controls).

## 5. Buttons and interaction

| Variant                                                                 | Visual                                                                                               | States                                                                                                                 |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Primary** (`LinkButton variant="primary"` and the form submit button) | Pill, `min-h-11` (44 px), `px-6`, `--text-base` 600, `--color-accent` fill, `--color-on-accent` text | hover `--color-accent-hover`; active `--color-accent-active`; focus-visible 2 px `--color-accent` outline, 2 px offset |
| **Secondary**                                                           | Pill, same size, `--color-bg` fill, 1 px `--color-border-strong` border, `--color-text` text         | hover `--color-accent-soft` fill and `--color-accent-hover` text; same focus                                           |
| **Text link**                                                           | `--color-accent`, underline offset 0.2em                                                             | hover `--color-accent-hover`; same focus                                                                               |
| **Arrow link**                                                          | Text link with a trailing `arrow-right` icon (`aria-hidden`), `inline-flex`, `py-1`                  | Nothing moves on hover                                                                                                 |

**Rules:**

- At most one primary button per section; the header CTA is primary.
- **Loading:** only the form submit has one, unchanged ("Enviando…"/"Sending…", `aria-busy`, never disabled for invalid input).
- No disabled style.
- External links keep their icon and sr-only label.
- **Targets:** ≥ 44×44 px for primary controls, ≥ 24×24 px for all.
- **Transitions:** color, background-color, border-color and box-shadow at 150 ms (SPEC §6.4). The reduced-motion reset stays.
- Native elements only; no custom keyboard handling.

## 6. Content components

### 6.1 Shared primitives (new, small)

| Primitive                                                                                 | Purpose                               | Replaces                                             |
| ----------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| `PageHeader.astro` (`title`, `lead?`)                                                     | H1 + lead with the §3 rhythm          | 9 hand-written H1 class strings                      |
| `Section.astro` (`id`, `title`, `intro?`, `tone: 'default' \| 'surface'`, `headingLevel`) | Section padding, H2 style and spacing | `const h2 = …` in 4 files                            |
| `CtaBand.astro`                                                                           | CTA band (§6.2)                       | 4 hand-built CTA blocks (home, service, about, case) |

Nothing else is abstracted.

### 6.2 Component rules

| Component                                                         | Rule                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service card** (`ServiceCard.astro`, also used on `/services/`) | `--color-bg` on a `surface` section, 1 px border, `--radius-lg`, `--shadow-sm`, `p-6 md:p-8`. A 48 px icon tile (`--color-accent-soft`, `--color-accent` line icon). Title H3 (`--text-xl`, 600) holds the only link, stretched over the card (one real link; SPEC §7.3). Hover/focus-within: `--shadow-md` and an `--color-accent` border. Summary `--text-lg`; audience `--text-sm` muted. `/services/` passes its extra lists through an optional slot (no duplicate markup) |
| **Case card** (`CaseCard.astro`)                                  | Same pattern without the icon tile; hidden until a case is published                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Engagement steps**                                              | Flat cards, `--radius-lg`; the number sits in a 40 px `--radius-full` badge (`--color-accent-soft`, `--color-accent` monospace); `<ol>` kept                                                                                                                                                                                                                                                                                                                                    |
| **Feature/problem list** (home problems, about principles)        | 2 px `--color-accent` left rule (current pattern); two columns at `md`; no cards                                                                                                                                                                                                                                                                                                                                                                                                |
| **Founder timeline**                                              | Kept; year dots may alternate `deco-pink`, `deco-yellow`, `deco-green` and `accent` (decorative; years stay in text)                                                                                                                                                                                                                                                                                                                                                            |
| **Highlight panel** (one per service page: "value")               | `--color-accent-soft`, `--radius-lg`, `p-6 md:p-8`, no border or shadow                                                                                                                                                                                                                                                                                                                                                                                                         |
| **CTA band**                                                      | `--color-accent-soft`, `--radius-lg`, `p-8 md:p-12`, H2 + text + primary (+ optional secondary); one per page                                                                                                                                                                                                                                                                                                                                                                   |
| **Contact form**                                                  | Form card (`--color-bg`, border, `--radius-lg`, `--shadow-sm`, `p-6 md:p-8`). Controls: `--radius-sm`, 1 px `--color-border-strong`, `min-h-11`, `--text-base`. Invalid: 2 px `--color-error` border plus an error line with an `alert-circle` icon + text in `--color-error` (meets the SPEC §7.3 "icon or prefix"). Submit uses the shared primary button classes                                                                                                             |
| **Success block** (form success, thanks page)                     | A 48 px `--color-surface` tile with a `--color-success` `check` icon, then H2 and text; focus behavior unchanged                                                                                                                                                                                                                                                                                                                                                                |
| **Legal content**                                                 | `PageHeader` + date + `Prose`; no cards, illustrations, decorative colors or shadows                                                                                                                                                                                                                                                                                                                                                                                            |
| **Nav and footer links**                                          | §8                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## 7. Brand assets: logo, mascot, hero illustration, icons [needs amendment]

**Approved concept:** D4, D5. **Sourcing:** D7, an AI-assisted first draft followed by production preparation. **Initial scope and priority (D8):**

1. horizontal logo;
2. stacked logo;
3. cube symbol;
4. favicon and app icons;
5. primary mascot illustration;
6. homepage hero illustration.

Additional poses and decorative illustrations are optional follow-up work.

### 7.1 Logo (D4)

**Concept, preserved from the owner-approved generated reference:**

- the word "code" in dark navy (`#0B1426`, `--color-text`);
- the word "happy" in vibrant blue (`#2557E8`, `--color-accent`);
- a small pink accent (`#F25C9A`, `--color-deco-pink`);
- a blue-and-yellow cube symbol (`#2557E8` and `#FFC93C`, with lighter or darker blues for the cube's faces).

**Variants (all required):**

| Variant                  | Composition                             | Use on the site                                                            |
| ------------------------ | --------------------------------------- | -------------------------------------------------------------------------- |
| **Horizontal (primary)** | Cube symbol + wordmark side by side     | Header (32 px tall on desktop, 28 px on mobile)                            |
| **Stacked**              | Cube symbol above the wordmark, centred | Footer brand column; square or narrow contexts (OG image, if it is redone) |
| **Symbol**               | Cube only                               | Favicon, app icons; any context under the horizontal minimum size          |

**Production requirements:**

- **Real vector paths** in SVG: no embedded raster image, no `<image>` element, no live `<text>` that depends on an installed font.
- The wordmark letters are converted to outlines, either from licensed vector typography or from hand-drawn paths. Using Plus Jakarta Sans outlines in a logo relies on the SIL OFL 1.1; confirming that this logo use is permitted is a **pending validation** (§14).
- The generated reference is a **visual reference only**. The production logo is a manual vector reconstruction of it.
- Colors are exactly the token hex values above.
- An `SVGO`-style optimisation pass; ≤ 4 KB per variant.

**Clear space and minimum sizes:**

- Let **C** be the height of the cube symbol. The clear space on every side is at least 0.5 C.

| Variant    | Minimum size                                                                                       |
| ---------- | -------------------------------------------------------------------------------------------------- |
| Horizontal | 120 px wide on screen                                                                              |
| Stacked    | 80 px wide                                                                                         |
| Symbol     | 16 px. Below 24 px, the pink accent and fine details are omitted in a dedicated small-size drawing |

**Color variants:**

- Full color on `--color-bg`, `--color-surface` and `--color-accent-soft` only. The site has no dark sections.
- **No** monochrome or reversed version is produced now, because no current use needs one. Produce one only when a concrete use appears, such as a dark social avatar or print.

**Accessibility in use:**

- The header and footer logo links have the accessible name "Code Happy" (`<img alt="Code Happy">` for the SVG).
- The pink accent and the cube are not separately announced.

### 7.2 Mascot (D5)

**Canonical appearance**, one approved version before anything else:

- **Body:** a 3D cube with softly rounded edges and corners (edge radius about 12–15% of the edge length).
- **Colors:**
  - blue outer shell (`#2557E8` family);
  - **white front face**, which carries the face;
  - a **yellow side panel** (`#FFC93C` family).
- **Face:** simple and expressive: two eyes and a small smile on the white face. The expression is calm-friendly; never goofy, sleepy, angry, tongue-out or heart-eyes.
- **Decoration:** a few small blue, yellow and pink elements may float **above** the cube in the still image, such as sparks or small shapes. They are static, never animated.
- **Excluded:** limbs, accessories and a name. Any later change needs a documented reason and owner approval.
- **Camera:** three-quarter view from slightly above, showing the white front face, the yellow side panel and the top. The same camera is used in every future rendering.
- **Material and light:** soft matte (clay-like), subtle bevel highlights, soft key light from the top left, a soft contact shadow under the cube. No gloss, glass, neon or glow.
- **Background:** transparent.
- **Background compatibility:**
  - The white front face has no contrast against white (1.00:1). The blue shell (5.82:1 on white, 5.24:1 on `accent-soft`) must therefore enclose the whole silhouette.
  - In the hero, the mascot sits on the `--color-accent-soft` backdrop.
  - Light backgrounds only. A dark-background version is **not** required, because the site has no dark sections. If one is ever needed, check the edges for halos first.
- **Professional, not childish:** proportion, restraint and material quality carry this. The face stays small relative to the front face, there are no exaggerated cartoon features, and there's at most one mascot per viewport.

**Placement** (initial scope: the canonical mascot only, no extra poses):

| Place       | Asset                                               | Size          | Alt                   |
| ----------- | --------------------------------------------------- | ------------- | --------------------- |
| Home hero   | Hero illustration (§7.3), which contains the mascot | See §9.1      | `alt=""` (decorative) |
| 404 page    | Canonical mascot                                    | ≤ 160 px tall | `alt=""`              |
| Thanks page | Canonical mascot                                    | ≤ 120 px tall | `alt=""`              |

**Not allowed:**

- legal pages, inside forms, as list bullets;
- animated, floating, bobbing or parallax effects (SPEC §1.4, §6.4);
- more than one mascot per viewport.

**Optional follow-up** (separately approved): additional poses (thinking, pleased) and the service spot illustrations.

### 7.3 Homepage hero illustration (D8 #6)

- **Composition:**
  - the canonical mascot is the anchor, about 60–70% of the illustration area;
  - **up to three** small supporting technology objects in the same 3D style: for example a code-window tile, a stack of architecture blocks, a small AI node/spark;
  - no robots, glowing brains, people or text inside the image.
- **Restraint:** the text and the primary CTA stay visually dominant. The illustration occupies at most the 5-of-12 column at `lg` and is never taller than the copy column. No clutter, background scenery or additional mascots.
- **Format:**
  - square, 1:1;
  - master PNG with alpha at **1200×1200 px** (2× the largest rendered size, 30rem ≈ 480 CSS px, plus margin);
  - rendered through `astro:assets` as AVIF + WebP with explicit `width`/`height`.
- **Responsive:**

| Width  | Placement                                |
| ------ | ---------------------------------------- |
| `lg`   | Right column, max 30rem                  |
| `md`   | After the CTAs, right-aligned, max 18rem |
| < `md` | After the CTAs, centred, max 10rem tall  |

At 375×800, the H1, lead and primary CTA stay above the fold.

- **Without an approved asset,** the hero renders text-only in the same grid.

### 7.4 Icons

- **Style:** one line-icon set; 24 px grid, 2 px stroke, round caps and joins (matches `menu`/`external` in `src/components/ui/icon-paths.ts`).
- **Source:** paths copied from **Lucide** (ISC, verified at `github.com/lucide-icons/lucide`, `LICENSE`, 23 Oct 2026). Preserve the ISC notice and the Feather notice that the licence references. No dependency is added.
- **Needed now:** one icon per service (3), `check`, `alert-circle`, `arrow-right`, `mail`, `calendar`.
- **Accessibility:** `aria-hidden="true"` inside named controls.

### 7.5 Production and technical rules for all assets

- **Separate raster and vector:**
  - logo variants, the symbol and icons are SVG vectors;
  - the mascot and hero illustration are raster (PNG with alpha) masters.
- **Location:** everything is local to the website, in `src/assets/brand/` (masters, processed by `astro:assets`) and `public/` (favicons only). No third-party hosting or requests.
- **Delivery formats:**
  - illustrations as AVIF + WebP via `<Picture>`, with explicit `width`/`height` (CLS 0) and `loading="lazy"` except the hero;
  - the hero uses `loading="eager"` + `fetchpriority="high"` only if measurement shows it is the LCP element.
- **Favicons and app icons** (from the symbol): `favicon.ico` (16/32), `icon.svg`, `apple-touch-icon.png` 180×180, `icon-512.png` 512×512, referenced from `BaseLayout.astro`.
- **Budgets:**

| Asset                         | Budget                 |
| ----------------------------- | ---------------------- |
| Hero                          | ≤ 80 KB (largest AVIF) |
| Canonical mascot (404/thanks) | ≤ 30 KB                |
| Each logo SVG                 | ≤ 4 KB                 |

- **Alt text:**
  - decorative art uses `alt=""`;
  - the logo uses "Code Happy";
  - any informative image gets alt text in both locales, which is copy (E3).
- **Asset register:** each asset is recorded in `src/assets/brand/README.md` with:
  - source (tool or person);
  - date;
  - the generated or draft source file kept;
  - the editing steps;
  - final formats;
  - owner;
  - the result of the usage-rights review (D7).

  An asset is not published until the register shows the rights review as passed.

## 8. Header and footer

**Header** (`Header.astro`, `MobileNav.astro`, `LanguageSwitcher.astro`). It stays **static**: SPEC §6.5/§7.3, no sticky, no blur.

- **Bar:** `--color-bg`, 1 px bottom `--color-border`. The arbitrary `border-t-[3px]` is removed.
- **Logo:**
  - the horizontal logo, 32 px tall from `lg` and 28 px below, links home with the name "Code Happy";
  - until the vector logo is approved, the current text wordmark stays.
- **Desktop nav:** `--text-sm` 500, `--color-text`, hover `--color-accent`. The current page keeps the 2 px `--color-accent` underline (a non-color cue). The hover area is `--radius-sm`.
- **Language switcher:** own-language names, no flags. Current: `--color-accent-soft` pill, 600, `aria-current`. Other: `--color-muted`, hover `--color-accent`.
- **CTA:** primary pill.
- **Mobile:** the `<details>` toggle is a pill (secondary style) with the menu icon and the label. The panel stays in normal flow. Links are `--text-base`. The CTA is full width.

**Footer** (`Footer.astro`). Three columns from `md`, on `--color-surface`:

- **Brand column:** stacked logo (max `--container-narrow`), or the wordmark until approved, plus the tagline.
- **Nav column:** unchanged.
- **Contact column:** email; the three existing social links as 44 px `--radius-full` icon buttons (1 px `--color-border`, hover `--color-accent`) with their accessible names.
- **Bottom bar:** unchanged.
- **No new profiles.**

## 9. Page-level rules

### 9.1 Home

1. **Hero:**
   - **`lg`:** 12-column grid, copy 7 columns, hero illustration 5 (§7.3), on a static `--color-accent-soft` `--radius-lg` backdrop.
   - **`md` and below:** per §7.3.
   - **Copy:** H1 (`--text-3xl`, 800, max `--container-headline`), lead (`--text-lg`, muted, max `--container-prose`), primary "book a call" + secondary "explore services".
   - Text-only fallback without the asset.
2. **Problems:** `Section` (default), two-column accent-rule list.
3. **Services:** `Section` (surface), three interactive service cards.
4. **Founder:** `Section` (default), timeline (case cards replace it once cases are published).
5. **Steps:** `Section` (surface), number badges.
6. **Closing:** `CtaBand` with the existing closing copy and the "send a message" primary.

### 9.2 Services index

`PageHeader`, then a three-card grid (lists through the slot; the last card spans two at `md`), then the "not sure?" `CtaBand`.

### 9.3 Service pages

- `PageHeader` (title + summary).
- One prose column, sections at `gap-12 md:gap-16`.
- Lists with a 16 px `check` icon in `--color-accent` (semantics kept).
- **Only** "value" is a highlight panel.
- `CtaBand`; "other services" as arrow links.
- No spot illustration in the initial scope.

### 9.4 About

- `PageHeader`, prose biography, LinkedIn arrow link, principles (two-column accent-rule list), `CtaBand`.
- **Founder photo (D6):** optional and not a dependency.
  - If the owner supplies a real photograph: a 4:5 portrait with `--radius-lg`, beside the biography from `md` (5/12), above it on mobile, max 18rem, with alt text naming the founder (copy, E3).
  - A photo of the founder is **never** generated or simulated.

### 9.5 Contact

- `PageHeader`.
- **From `lg`:** `grid-template-areas: "call form" "email form" "faq form"`.
  - The DOM order stays call → form → email → FAQ (`tests/dist/contact.test.ts`); the first link in `main` remains Calendly.
  - **Left:** call card (flat, `--color-accent-soft`, primary button), email, FAQ.
  - **Right:** form card.
- One column below `lg`.
- Form behavior, endpoints and copy are unchanged.

### 9.6 Legal

`PageHeader` + date + `Prose` + questions block; nothing else. Legal text and approval status are untouched.

### 9.7 Thanks and 404

Centred narrow layout: the canonical mascot (§7.2 sizes), H1, text, the primary action. The 404 stays bilingual (pt-BR H1, en H2).

### 9.8 Both languages

- All layouts hold at 320 px and 200% text in both locales.
- No fixed widths on text and no text in images.
- Portuguese runs about 10–20% longer (home H1: 5 vs 4 lines at 320 px at HEAD). Buttons wrap rather than truncate.

## 10. Accessibility rules

SPEC §6.3–6.5 and §12.2 stay. In addition:

- Text uses only the approved pairs in §1. Decorative tokens are never text, and status always pairs color with an icon and text.
- UI boundaries use `--color-border-strong` (≥ 3:1).
- **Focus:** 2 px `--color-accent`, 2 px offset. Stretched-link cards also show `:focus-within`.
- **Headings:** sequential; `Section` takes an explicit `headingLevel`; cards keep real headings.
- **Images:** decorative `alt=""`; the logo is "Code Happy"; icons `aria-hidden`.
- **Motion:** none; transitions ≤ 200 ms; reduced-motion reset kept.
- Targets and `lang` attributes are unchanged.

## 11. Performance rules

- **JavaScript:** no new client JS; the contact script stays ≤ 10 KB gz (`tests/dist/js-budget.test.ts`).
- **No external requests:** everything is self-hosted or inline. `js-budget.test.ts` fails on external assets.
- **Fonts:** ≤ 60 KB per woff2 (latin, latin-ext); only latin is preloaded.
- **Images:** §7.5 budgets with explicit dimensions.
- **Lighthouse:** re-run after any font or image change (F7-03 thresholds: Performance ≥ 90, LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms, Accessibility ≥ 95).
- **SEO / structured data:** unchanged. If the OG image is redone, update `rendered.json` (`tests/unit/jsonld.test.ts`).

## 12. Proposed test changes

These are part of the implementation plan, not done here.

| Test                               | Change                                                                                                                                                                                                                                                                | Why                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `tests/unit/contrast.test.ts`      | Background matrix `bg`/`surface`/`accent-soft` for `text`, `muted`, `accent`, `accent-hover`, `error`, `success`; `text`/`muted` also on the decorative soft tints. White on `accent-active`. `border-strong` ≥ 3:1. **Keep** `bg = #ffffff` and every existing check | New tokens meet the same AA rules            |
| New: decorative-color guard (unit) | Fail if `src/**` uses `text-deco-*`, any `deco-*` token as text color or as a status color, or decorative hex values outside `global.css` and `src/assets/brand/`                                                                                                     | "Decorative colors are never text or status" |
| New: image guard (dist)            | Every `<img>` has `width`, `height` and `alt`                                                                                                                                                                                                                         | Layout stability, alt policy                 |
| New: logo guard (dist)             | The header and footer home links contain the logo `<img>` with `alt="Code Happy"` once the logo ships; logo SVG files contain no `<image>` or `<text>` element                                                                                                        | Accessible name; vector-only logo            |
| New: hero H1 lines (e2e)           | Home H1 ≤ 4 lines at 320 px, both locales                                                                                                                                                                                                                             | Narrow-screen fix                            |
| New: font budget (dist)            | woff2 ≤ 60 KB each, ≤ 2 files                                                                                                                                                                                                                                         | Performance                                  |
| Existing suites                    | Unchanged                                                                                                                                                                                                                                                             | Must pass as they are                        |

## 13. What stays as it is

- Routing, i18n and copy; SEO, structured data and the sitemap; form behavior and integrations.
- Legal text and approval; launch gates and F8.
- The static header, the no-JS menu, the reduced-motion reset, the skip link, external-link marking, 44 px primary targets.

## 14. Pending technical validations

These are decided in principle but not yet verified. None may be reported as done without evidence.

| #   | Validation                                                                                                                     | Owner of evidence              | Blocks                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ----------------------------------- |
| V1  | Glyph coverage of the shipped Plus Jakarta Sans subsets for every pt-BR/en character used                                      | Implementer                    | WP-C2 (typography)                  |
| V2  | Measured woff2 size ≤ 60 KB each                                                                                               | Implementer                    | WP-C2                               |
| V3  | Lighthouse with the font and hero image (F7-03 thresholds)                                                                     | Implementer                    | WP-C2, WP-C4, WP-V                  |
| V4  | Using Plus Jakarta Sans outlines in the logo is permitted under OFL 1.1 (or the wordmark is redrawn)                           | Owner + legal review if needed | Logo production (WP-A1)             |
| V5  | Usage rights of AI-assisted drafts under the terms of the tool actually used, and of any reference material                    | Owner + legal review           | Publishing any asset (WP-A1, WP-A2) |
| V6  | Production logo is genuine vectors (no raster or `<image>`, no live text) and meets the size and clear-space rules             | Asset reviewer                 | WP-A1                               |
| V7  | Canonical mascot accepted by the owner against the reference (consistency, professionalism, edge quality on light backgrounds) | Owner                          | WP-A1 → WP-A2                       |
| V8  | Hero illustration budget (≤ 80 KB AVIF) and whether it is the LCP element                                                      | Implementer                    | WP-C4                               |
| V9  | Asset register completed with rights review passed                                                                             | Owner                          | Publication of assets               |
