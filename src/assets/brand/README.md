# Code Happy brand assets: register

**Status: §0 set APPROVED by the owner (26 October 2026) and integrated** (see §0.3). The superseded WP-A1 set below is not used by the website.

> **26 October 2026: the original WP-A1 set (the three SVGs at the top of this folder, documented in §1–§6 below) is superseded by the proposed set in §0.** The owner rejected it as unfaithful to `docs/design/code-happy-brand-reference.png` (one-line wordmark, diamond accent, flat polygon cube). The three files are kept unchanged until the owner decides what to do with them.

## 0. Proposed reference-matched set (26 October 2026)

**Status: PROPOSED, for owner review.** Prepared on branch `redesign/f0-foundation`, HEAD `170c777`. Preview: `docs/design/brand-preview-reference.html` (open it in a browser; it shows each variant beside the matching crop of the reference board).

### 0.1 Logo (`logo/`)

_Second iteration, 26 October 2026: cube turned to show more of the yellow side, rounder face, larger icon in the stacked lockup, white icon outline in the dark-background version._

| File                                  | Variant                                                       | viewBox            | Intrinsic size (CSS px) | Size        |
| ------------------------------------- | ------------------------------------------------------------- | ------------------ | ----------------------- | ----------- |
| `logo/code-happy-logo-horizontal.svg` | Two-line wordmark, flat cube icon to its right                | `0 0 6261.08 2240` | 157 × 56                | 4,047 bytes |
| `logo/code-happy-logo-stacked.svg`    | Flat cube icon above the two-line wordmark                    | `0 0 3846.08 5180` | 119 × 160               | 4,053 bytes |
| `logo/code-happy-icon.svg`            | Icon only, full colour                                        | `0 0 128 128`      | 64 × 64                 | 1,048 bytes |
| `logo/code-happy-logo-on-dark.svg`    | Horizontal, white wordmark, for use on `#111827`; transparent | `0 0 6261.08 2240` | 157 × 56                | 4,008 bytes |
| `logo/code-happy-icon-mono.svg`       | Icon only, navy line art on white faces                       | `0 0 128 128`      | 64 × 64                 | 703 bytes   |

- **Content:** only `<path>`, `<rect>`, `<circle>` and `<g>` elements plus one `<title>Code Happy</title>` as the root's first child; the root has `role="img"`. No `<image>`, no `<text>`, no embedded font, no raster data, no base64 (checked by the generator on every build).
- **Wordmark:** lowercase "code" (`#111827`, board label "Texto") above "happy" (`#2563EB`, "Primária"), with a short pink horizontal bar (`#EC4899`, "Rosa") on the baseline right after "happy". Never a diamond or a dot.
- **Typeface: PROVISIONAL.** The glyph outlines are **Saira** (variable font, instance weight 800, width 125), chosen by visual comparison with the reference among Exo 2, Saira, Russo One and Kanit. **The reference's wordmark typeface has not been identified.** Replace the outlines once it is confirmed.
  - Source: `github.com/google/fonts`, `ofl/saira/Saira[wdth,wght].ttf` (483,700 bytes, SHA-256 `9d050fc5a01c85f74c4257c207d50b55d1e40c37308c642f974a2c5003231dde`), with its `OFL.txt` ("Copyright 2020 The Saira Project Authors (https://github.com/Omnibus-Type/Saira)").
  - Licence: SIL Open Font License 1.1. The OFL FAQ (Q1.1) allows using OFL fonts in logos, including as converted outlines; the font file itself is not redistributed. The OFL grants no trademark rights (FAQ Q3.7).
- **Measured composition** (from the reference's stacked lockup; "hInk" = ink height of "happy", "hW" = ink width of "happy"):
  - "happy" ascender top sits 0.06 hInk below the "code" baseline; tracking −0.02 em.
  - Width of "code" ÷ width of "happy": reference ≈ 0.725, proposal 0.75 (follows from the typeface).
  - Pink bar: gap 0.026 hW, length 0.157 hW, thickness 0.22 hInk, top at 0.62 hInk, corner radius 0.32 × thickness.
  - Horizontal: icon 1.2 × wordmark height, centred; gap 0.18 × wordmark height. Stacked: icon box 1.9 × wordmark height (the drawn cube and sparks ≈ 1.7 ×; ≈ 1.75 × on the board), centred close above the wordmark.
- **Icon:** a flat 2D cube drawn by hand as vector paths (not traced, not generated, not derived from the 3D mascot): navy (`#111827`) outline, white front face with a thin blue frame, rounded closed eyes (∩ ∩) set wide and a small smile (∪) between them, yellow right side (visible width ≈ 0.65 of the front face's) (`#F59E0B`, "Amarelo"), light-blue top (`#87A9F4`, a 45% white tint of `#2563EB`; the board gives no label for it), and four rounded sparks (blue dot, blue, yellow and pink strokes).
- **Dark-background version:** the icon's outline is white (`#FFFFFF`), as on the reference board, so the cube stays visible on `#111827`; the face stays navy on the white front face. Checked at 24, 32 and 56 px high.
- **Monochrome icon: spark count unconfirmed.** The board's "Versão monocromática" tile is ambiguous; at its resolution it seems to show two or three sparks, but the intended count has not been confirmed. The proposed file keeps the four sparks of the colour icon until it is.
- **Method:** a Node script read the font with `fontkitten` and optimised the output with `svgo` (both already in `node_modules`); nothing was installed. The script lives outside the repository and is not part of the build.
- **The site's design tokens and typography are unchanged.** These files use the reference palette only inside the SVGs.

### 0.2 Mascot (`mascot/`)

| File                           | Content                                                             | Size                           |
| ------------------------------ | ------------------------------------------------------------------- | ------------------------------ |
| `mascot/code-happy-mascot.png` | 3D mascot, **open-mouth "Feliz" expression** (pink tongue), no arms | 995 × 1071 px, 1,541,078 bytes |

- **Source:** `docs/design/code-happy-mascot-3d.png` (1536 × 1024 RGBA, SHA-256 `1502db02997045e7b15b311d4cded99fd220e03003d695924e9ccdc59612b74f`). The source file was not modified; its checksum was verified after processing.
- **Processing** (with `sharp`, already in `node_modules`):
  1. Alpha set to 255 only where the source alpha is ≥ 250 (536,890 pixels; the body was 251–254, never fully opaque). Softer edge and glow alpha is kept as is.
  2. Trimmed to the bounding box of pixels with alpha ≥ 2: 899 × 975 px at source x 352, y 14. Outside that box the source holds only alpha-1 pixels (0.4% opacity, invisible); trimming at alpha > 0 would have kept almost the whole canvas.
  3. 48 px of transparent padding added on every side.
  4. **Colours unchanged** (no yellow adjustment; that change is not authorized).
- **Result:** RGBA PNG with a transparent background: 50.38% fully opaque, 2.38% partially transparent (edges and glow), 47.24% fully transparent. SHA-256 `2175e96a83d0ea3e96ea4e23ba5b10c66c46b3671e03aa39355dd3ccc6bbd4d2`.
- **Checked visually** on `#FFFFFF`, `#F9FAFB` and `#EEF3FF`: no halo or fringe.
- The mascot is an illustration, not the logo icon.

### 0.3 Integration (26 October 2026)

| Where                            | Asset                                 | How                                                                                                                                                          |
| -------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header (`Header.astro`)          | `logo/code-happy-logo-horizontal.svg` | `astro:assets` `<Image>`, 44 px tall (123 px wide, above the 120 px minimum), `alt="Code Happy"` as the home link's name                                     |
| Footer (`Footer.astro`)          | `logo/code-happy-logo-stacked.svg`    | `<Image>`, 96 px wide (minimum 80 px), `alt="Code Happy"`, on the light surface                                                                              |
| Home hero (`[lang]/index.astro`) | `mascot/code-happy-mascot.png`        | `<Picture>`: AVIF + WebP at 160–640 w, `alt=""` (decorative), explicit size, `loading="eager"`. Beside the copy from `lg`, below the CTAs on smaller screens |
| Favicons (`public/`)             | `logo/code-happy-icon.svg`            | `favicon.ico` (16, 32, 48 px PNG entries), `icon.svg` (copy), `apple-touch-icon.png` (180 px on white); linked from `BaseLayout.astro`                       |

- The favicon files were rendered from the approved icon with `sharp` (no artwork change). At 16 px the cube and its colours read, but the face and sparks blur; a dedicated small-size drawing (visual design spec §7.1) has not been made.
- No `icon-512.png` or web manifest was added: nothing would reference them.

---

The rest of this file documents the **superseded** WP-A1 set.

- **Prepared:** 25 October 2026, on branch `redesign/f0-foundation`, HEAD `170c777`.
- **Specification:** `docs/design/visual-design-spec.md` §7.1 (logo), §1 (colors), §2 (typeface).
- **Preview for review:** `docs/design/brand-preview.html` (superseded set).

## 1. Files

| File                             | Variant                                            | Format                 | Intrinsic size (CSS px) | viewBox               | Size        |
| -------------------------------- | -------------------------------------------------- | ---------------------- | ----------------------- | --------------------- | ----------- |
| `code-happy-logo-horizontal.svg` | Horizontal (primary): cube + wordmark side by side | SVG, vector paths only | 313 × 48                | `0 0 7142.47 1094.24` | 2,695 bytes |
| `code-happy-logo-stacked.svg`    | Stacked: cube above the wordmark                   | SVG, vector paths only | 320 × 160               | `0 0 6003.26 3001.34` | 2,708 bytes |
| `code-happy-symbol.svg`          | Symbol: cube only                                  | SVG, vector paths only | 64 × 64                 | `0 0 64 64`           | 519 bytes   |

- **Content:** every file contains only `<path>` elements and one `<title>Code Happy</title>`. They contain no `<image>`, no `<text>`, no embedded font, no raster data and no base64. This was checked with `grep` on 25 October 2026.
- **Accessible name:** each root `<svg>` has `role="img"` and its `<title>` as the first child. In the website, use `<img src=… alt="Code Happy">`.
- **Budget:** all files are ≤ 4 KB (spec §7.1).

## 2. Colors

| Element                                   | Hex       | Token                                                                                                                 |
| ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| "code"                                    | `#0B1426` | `--color-text` (dark navy)                                                                                            |
| "happy"                                   | `#2557E8` | `--color-accent` (D1)                                                                                                 |
| Pink accent (small diamond after "happy") | `#F25C9A` | `--color-deco-pink` (D2)                                                                                              |
| Cube front face                           | `#2557E8` | `--color-accent`                                                                                                      |
| Cube side face                            | `#FFC93C` | `--color-deco-yellow` (D2)                                                                                            |
| Cube top face                             | `#7192F0` | Logo-only shade: a 35% white tint of `#2557E8`, allowed by spec §7.1 ("lighter or darker blues for the cube's faces") |

No other colors are used. Only full color is produced, for use on `--color-bg` `#FFFFFF`, `--color-surface` `#F6F8FC` and `--color-accent-soft` `#EEF3FF`. No monochrome or reversed version exists, because no current use needs one (spec §7.1).

## 3. Construction method

All three files were produced on 25 October 2026 by the project's AI coding agent, **without any image-generation model**:

1. **Wordmark.** The letters "code" and "happy" are the glyph outlines of **Plus Jakarta Sans ExtraBold (weight 800)**.
   - **Source:** the official font file `PlusJakartaSans-ExtraBold.ttf`, taken directly from the project's repository `github.com/tokotype/PlusJakartaSans` (`fonts/ttf/`, 128,888 bytes, SHA-256 `7d60d21b5dec501c77437e80aabd539f1d7a7b0ac7d4ada361d4d42abc7c55ea`).
   - **Conversion:** the glyphs were read with `fontkitten` (MIT; already present in `node_modules` through Astro) and converted to SVG path data.
   - **Spacing:** glyphs are placed at their advance widths. No manual kerning was applied.
   - **Not shipped:** the font file is not stored in the repository.
2. **Cube.** An isometric cube drawn from exact geometry, with these proportions:
   - a regular hexagon silhouette, width = 0.866 × height;
   - three faces, each inset by a hairline separation;
   - corners softened by a same-color stroke with round joins (stroke width 7% of the cube height).
3. **Pink accent.** A small diamond (13% of the wordmark ink height) after "happy", at x-height level, with rounded corners.
4. **Optimisation.** `svgo` (preset-default, 2-decimal precision; already present in `node_modules`). Then `role="img"` was added and the `<title>` was verified as the first child.
5. **Review renders.** `sharp` (present via Astro) rendered a contact sheet and pixel-exact symbol renders at 16, 24 and 32 px, kept in the session scratchpad, not in the repository. Findings:
   - the symbol stays recognisable at 16 px; the face separations soften below 24 px, but the shape holds;
   - the wordmark is legible at the minimum sizes below.

The full generator is reproduced in the appendix, so the files can be regenerated from the official font.

**Interpretation note.** The owner-approved generated reference image was **not available** to the agent. The composition follows the owner's written description:

- "code" in dark navy, "happy" in vibrant blue;
- a small pink accent;
- a blue-and-yellow cube;
- the wordmark and cube side by side;
- a stacked version and an isolated symbol.

Some details are the agent's interpretation, for the owner to compare with the reference:

- a closed-up lowercase "codehappy" (no space);
- the accent's shape and position (a diamond after "happy");
- the cube face arrangement (blue front, yellow side, light-blue top).

## 4. Clear space and minimum sizes

Let **C** be the height of the cube in the variant being used.

| Variant    | C relative to the file's height  | Example                                       |
| ---------- | -------------------------------- | --------------------------------------------- |
| Horizontal | C = 0.893 × the displayed height | At the header size of 32 px tall: C ≈ 28.6 px |
| Stacked    | C = 0.521 × the displayed height | —                                             |
| Symbol     | C = 0.906 × the displayed height | —                                             |

- **Clear space:** at least **0.5 C** on every side, free of text, edges and other graphics. In the header at 32 px, that is about 14 px.
- **Minimum sizes:**

| Variant    | Minimum size | What it means                         |
| ---------- | ------------ | ------------------------------------- |
| Horizontal | 120 px wide  | About 18 px tall; x-height about 9 px |
| Stacked    | 80 px wide   | 40 px tall                            |
| Symbol     | 16 px        | —                                     |

Below these sizes, use the next smaller variant (horizontal → symbol). The pink accent belongs to the wordmark variants only.

- **Don't:**
  - recolor, stretch, rotate, outline or add effects (shadow, glow, gradient);
  - re-typeset the wordmark in live text;
  - place the logo on dark or busy backgrounds;
  - animate it.

## 5. Ownership and usage rights

| Item                                 | Status                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Font licence                         | **Verified 23 Oct 2026:** Plus Jakarta Sans is under the SIL Open Font License 1.1 (`OFL.txt` in the font repository)                                                                                                                                                                                                                                                                                                           |
| Font outlines in a logo (V4)         | **Verified 25 Oct 2026** against the official OFL FAQ (`openfontlicense.org/ofl-faq/`). Q1.1: fonts may be used "to create logos or other graphics … or even to manufacture objects based on their outlines". Q1.1.1: "You remain the author and copyright holder of that newly derived graphic". Q1.1.2: no acknowledgement required. The artwork is not subject to the OFL (Q1.13). The font file itself is not redistributed |
| Trademark                            | **Not addressed by the OFL** (FAQ Q3.7: "The OFL does not grant any rights under trademark law"). Registering the logo as a trademark is a separate legal question for a Brazilian lawyer. It does not block use on the website                                                                                                                                                                                                 |
| Cube, accent, composition            | Original geometry authored for Code Happy Tecnologia Ltda. by the project's AI coding agent on 25 Oct 2026. No third-party artwork, stock material or image-generation output was used                                                                                                                                                                                                                                          |
| Tools                                | `fontkitten` (MIT), `svgo` (MIT) and `sharp` (Apache-2.0), all already installed as project dependencies. Their licences cover use as tools; none of their code is part of the assets                                                                                                                                                                                                                                           |
| Generated reference image            | Used only as a description of the concept; no pixels were traced or embedded. Whether the owner's image-generation tool imposes terms on derived concepts was **not verified**: the tool and its terms are unknown to the agent (V5)                                                                                                                                                                                            |
| Owner acceptance (V6 visual, V7 n/a) | **Pending:** the owner compares the assets with the reference and accepts or requests changes                                                                                                                                                                                                                                                                                                                                   |
| Publication                          | **Not published.** Use on the website requires owner acceptance plus WP-C3 authorization                                                                                                                                                                                                                                                                                                                                        |

## 6. Not included in WP-A1 (by the owner's authorization scope)

- **Favicons and app icons:** WP-A2, exported from `code-happy-symbol.svg`. A simplified small-size drawing is made there only if the 16 px favicon test shows it's needed.
- **Canonical mascot and hero illustration:** WP-A1 in the plan includes the mascot, but this authorization covered the logo variants only. They remain to be done (WP-A1 mascot / WP-A2).
- **Updated OG image:** optional follow-up.

## Appendix: generator (documentation; not part of the build)

Run it with Node 22 from a folder outside the repository: `node build.mjs PlusJakartaSans-ExtraBold.ttf out`. It reads `fontkitten`, `svgo` from the project's `node_modules` (absolute path; adjust if the checkout moves).

```js
// Builds the Code Happy logo variants (WP-A1) as genuine vector SVG:
// - wordmark: real outlines of Plus Jakarta Sans ExtraBold (SIL OFL 1.1) for "code" + "happy",
//   converted to <path> data (no <text>, no embedded font, no raster);
// - cube symbol: isometric cube drawn from exact geometry (three faces);
// - pink accent: a small rounded diamond.
// Usage: node build.mjs <font.ttf> <outDir>
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = '/home/giba/CodeHappy/home-page-f0/node_modules'
const { create } = await import(join(ROOT, 'fontkitten/dist/index.js'))
const { optimize } = await import(join(ROOT, 'svgo/lib/svgo-node.js'))

const [fontPath, outDir] = process.argv.slice(2)
mkdirSync(outDir, { recursive: true })
const font = create(readFileSync(fontPath))

// Token colors (docs/design/visual-design-spec.md §1, §7.1).
const NAVY = '#0B1426' // --color-text: "code"
const BLUE = '#2557E8' // --color-accent: "happy", cube front face
const BLUE_LIGHT = '#7192F0' // cube top face: 35% tint of #2557E8 (spec §7.1 allows lighter blues for faces)
const YELLOW = '#FFC93C' // --color-deco-yellow: cube side face
const PINK = '#F25C9A' // --color-deco-pink: accent

const r2 = (n) => Math.round(n * 100) / 100

/** Glyph outlines for `text`, baseline at y = 0, y pointing down (SVG). */
function words(parts) {
  let x = 0
  let minY = Infinity
  let maxY = -Infinity
  let minX = Infinity
  let maxX = -Infinity
  const groups = parts.map(({ text, fill }) => {
    const ds = []
    for (const g of font.glyphsForString(text)) {
      const p = g.path.transform(1, 0, 0, -1, x, 0)
      ds.push(p.toSVG())
      const b = g.bbox
      minX = Math.min(minX, x + b.minX)
      maxX = Math.max(maxX, x + b.maxX)
      minY = Math.min(minY, -b.maxY)
      maxY = Math.max(maxY, -b.minY)
      x += g.advanceWidth
    }
    return { fill, d: ds.join('') }
  })
  return { groups, bbox: { minX, maxX, minY, maxY }, advance: x }
}

/** Isometric cube centred at (cx, cy) with total height h; faces slightly inset with round joins. */
function cube(cx, cy, h) {
  const r = h / 2
  const w = r * Math.cos(Math.PI / 6)
  const P = {
    top: [cx, cy - r],
    ur: [cx + w, cy - r / 2],
    lr: [cx + w, cy + r / 2],
    bot: [cx, cy + r],
    ll: [cx - w, cy + r / 2],
    ul: [cx - w, cy - r / 2],
    c: [cx, cy],
  }
  const round = h * 0.07 // corner rounding via a same-color stroke with round joins
  const gap = h * 0.025 // hairline separation between faces
  const face = (pts, fill) => {
    const mx = pts.reduce((s, p) => s + p[0], 0) / pts.length
    const my = pts.reduce((s, p) => s + p[1], 0) / pts.length
    const inset = round / 2 + gap / 2
    const q = pts.map(([x, y]) => {
      const dx = mx - x
      const dy = my - y
      const len = Math.hypot(dx, dy)
      return [x + (dx / len) * inset * 1.6, y + (dy / len) * inset * 1.6]
    })
    const d = `M${q.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L')}Z`
    return `<path d="${d}" fill="${fill}" stroke="${fill}" stroke-width="${r2(round)}" stroke-linejoin="round"/>`
  }
  return [
    face([P.top, P.ur, P.c, P.ul], BLUE_LIGHT),
    face([P.ul, P.c, P.bot, P.ll], BLUE),
    face([P.c, P.ur, P.lr, P.bot], YELLOW),
  ].join('')
}

function diamond(cx, cy, s) {
  const k = s / 2
  return `<path d="M${r2(cx)} ${r2(cy - k)}L${r2(cx + k)} ${r2(cy)}L${r2(cx)} ${r2(cy + k)}L${r2(cx - k)} ${r2(cy)}Z" fill="${PINK}" stroke="${PINK}" stroke-width="${r2(s * 0.28)}" stroke-linejoin="round"/>`
}

/** `displayH` is the intrinsic CSS height; the viewBox keeps the precise drawing units. */
function svg(w, h, body, title, displayH) {
  const dw = Math.round((w / h) * displayH)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r2(w)} ${r2(h)}" width="${dw}" height="${displayH}"><title>${title}</title>${body}</svg>`
}

function save(name, raw) {
  let out = optimize(raw, {
    multipass: true,
    floatPrecision: 2,
    plugins: ['preset-default'],
  }).data
  // Accessible name for standalone/inline use: role="img" + <title> as the first child.
  out = out.replace('<svg ', '<svg role="img" ')
  if (!/^<svg[^>]*><title>Code Happy<\/title>/.test(out))
    throw new Error(`${name}: title not first`)
  writeFileSync(join(outDir, name), out + '\n')
  console.log(name, out.length, 'bytes')
}

const wm = words([
  { text: 'code', fill: NAVY },
  { text: 'happy', fill: BLUE },
])
const inkH = wm.bbox.maxY - wm.bbox.minY // ascender top → descender bottom
const xH = font.xHeight
const wordPaths = (dx, dy) =>
  wm.groups
    .map((g) => `<path fill="${g.fill}" transform="translate(${r2(dx)} ${r2(dy)})" d="${g.d}"/>`)
    .join('')
const accent = (dx, dy) =>
  diamond(dx + wm.bbox.maxX + inkH * 0.13, dy - xH - inkH * 0.02, inkH * 0.13)

// Horizontal: cube height C = wordmark ink height, vertically centred on the ink box; gap 0.3 C.
{
  const C = inkH
  const pad = C * 0.06
  const cubeW = C * Math.cos(Math.PI / 6)
  const gap = C * 0.3
  const dx = pad + cubeW + gap - wm.bbox.minX
  const dy = pad - wm.bbox.minY
  const cy = pad + C / 2
  const width = dx + wm.bbox.maxX + inkH * 0.13 + inkH * 0.13 + pad
  const height = C + pad * 2
  save(
    'code-happy-logo-horizontal.svg',
    svg(
      width,
      height,
      cube(pad + cubeW / 2, cy, C) + wordPaths(dx, dy) + accent(dx, dy),
      'Code Happy',
      48
    )
  )
}

// Stacked: cube 1.6 × ink height, centred above the wordmark; gap 0.22 × cube height.
{
  const C = inkH * 1.6
  const pad = inkH * 0.06
  const wordW = wm.bbox.maxX - wm.bbox.minX + inkH * 0.26
  const width = Math.max(wordW, C) + pad * 2
  const gap = C * 0.22
  const cube_ = cube(width / 2, pad + C / 2, C)
  const dx = (width - wordW) / 2 - wm.bbox.minX
  const dy = pad + C + gap - wm.bbox.minY
  const height = pad + C + gap + inkH + pad
  save(
    'code-happy-logo-stacked.svg',
    svg(width, height, cube_ + wordPaths(dx, dy) + accent(dx, dy), 'Code Happy', 160)
  )
}

// Symbol: cube alone in a square 64 × 64 box (cube height 58).
save('code-happy-symbol.svg', svg(64, 64, cube(32, 32, 58), 'Code Happy', 64))

console.log('unitsPerEm', font.unitsPerEm, 'xHeight', xH, 'inkH', r2(inkH))
```
