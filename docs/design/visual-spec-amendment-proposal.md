# Proposed amendment to SPEC.md §7 (visual design)

**Status: FINAL PROPOSAL. NOT APPLIED.** `SPEC.md` and `IMPLEMENTATION_PLAN.md` are unchanged.

- The owner approved the visual direction in principle on 23 October 2026 (decision D9).
- That approval does **not** authorize editing `SPEC.md`. Applying this text needs a separate, explicit owner approval.

**Scope.** Only what the approved direction needs:

1. one primary blue plus decorative secondary colors;
2. a consistent 3D illustration and mascot system;
3. rules for decorative versus informative images;
4. asset ownership and usage-right verification before publication;
5. consistent clickable-card styling.

Nothing else in the SPEC changes (§4).

**Source of the current wording:** the approved SPEC as copied in `.superpowers/sdd/IMPLEMENTATION_PLAN/SPEC.md`, lines 523–556. Every "Current" block below was checked verbatim against that file on 23 October 2026.

**Related:**

- `visual-design-spec.md` (the system these changes enable);
- `visual-design-decisions.md` (approved decisions D1–D10).

**Legend:**

- **[Req]** — mandatory.
- **[Rec]** — recommendation, as in the SPEC.

## 1. Conflicts with the approved direction

| #   | SPEC location                     | Current requirement (excerpt)                                                      | Conflict                                                                                                                   |
| --- | --------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| C1  | §7.2 principle 2 [Req]            | "One accent color, few type sizes, and generous whitespace."                       | The approved palette (D2) adds decorative pink, yellow and green                                                           |
| C2  | §7.2 principle 3 [Req]            | "… preferred over stock imagery or abstract 3D art. When unavailable, use none."   | The approved mascot (D5) and hero illustration (D8) are 3D art                                                             |
| C3  | §7.3 "Color" [Rec]                | "plus **one** accent for links and primary CTAs"                                   | Same as C1                                                                                                                 |
| C4  | §7.3 "Imagery"                    | "Optional. If used: … No stock photos of handshakes, robots, or glowing brains."   | It doesn't regulate illustration style, mascot placement, decorative vs informative images, or asset rights                |
| C5  | §7.3 "Cards"                      | "flat or a single subtle border/shadow"                                            | Interactive cards use a border **and** the first shadow level, with the second on hover, which is ambiguous under "single" |
| C6  | §7.1 status / §7.4 open decisions | "Everything in this section is a proposed direction [Rec], not an approved brand." | The decided parts of Q-7 should be recorded                                                                                |

**Checked, no conflict, unchanged:**

- §7.2 principles 1, 4 and 5.
- §7.3 rows Tokens (including "a max of two shadow levels"), Typography (system stack **or** one self-hosted variable font; no CDN), Type scale, Layout & width, Grid, Breakpoints, Buttons, Links, Forms, Header/footer, Icons.
- §1.4 anti-goals; §6.4 motion; §6.5 focus; §12.

## 2. Proposed changes

### A1. §7.2 principle 2 (fixes C1)

**Current:**

> 2. **Restraint signals seniority.** One accent color, few type sizes, and generous whitespace. No gradient text, glassmorphism, blurred orbs, or emoji icons.

**Proposed:**

> 2. **Restraint signals seniority.** One **primary** accent color (blue) for actions, links and emphasis; up to three **decorative** secondary colors (pink, yellow, green) used only in the logo, illustrations and small decorative details, never for text, never for status (error/success), and never as the only carrier of meaning. Few type sizes and generous whitespace. No gradient text, glassmorphism, blurred orbs, or emoji icons.

**Rationale:**

- It allows the approved palette (D1, D2).
- It keeps a single action color and every banned effect.
- It separates the decorative colors from the semantic error and success colors.

**Status:** [Req].

### A2. §7.2 principle 3 (fixes C2)

**Current:**

> 3. **Evidence over illustration.** Real photos (founder, if approved) and real artifacts (anonymized diagrams, if approved) are preferred over stock imagery or abstract 3D art. When unavailable, use none.

**Proposed:**

> 3. **Evidence first, illustration as brand.** Claims are supported by real evidence (confirmed facts, a real founder photo if supplied and approved, anonymized artifacts if approved), never by illustration. One coherent brand illustration system, a 3D cube mascot plus a small set of 3D illustrations in the same style, may be used for recognition and warmth, sparingly and never as a substitute for evidence. No stock imagery. No image may depict or simulate a real person who has not supplied the photograph, and no illustration may imply a larger team, clients, results or capabilities than are confirmed (§1.4).

**Rationale:**

- It enables the approved mascot and hero illustration (D5, D8).
- It keeps the original intent: no decoration pretending to be evidence, and no stock art.
- It encodes D6 (the founder photo is never generated).
- It ties illustration to the §1.4 anti-goal.

**Status:** [Req].

### A3. §7.3 "Color" row (fixes C3)

**Current:**

> | Color [Rec] | Light, neutral base (near-white background, near-black text, 2–3 grays) plus **one** accent for links and primary CTAs, and one state color each for error and success. A dark mode is a _Could_ (§14.3). Proposed values are not approved [Open Q-7]. All text/background pairs ≥ 4.5:1 (≥ 3:1 for large text and UI components). |

**Proposed:**

> | Color [Rec] | Light, neutral base (white background, light-gray surface, near-black text, 2–3 grays) plus **one primary** accent (vibrant blue) for links, primary CTAs and focus, with hover/active shades and a soft tint for highlight panels; one state color each for error and success, distinct from the decorative colors; and up to three **decorative** colors (pink, yellow, green) with soft tints, restricted to the logo, illustrations and small decorative shapes. **[Req]** Decorative colors are never used for text, for error/success indication, or as the only visible boundary of a control. A dark mode is a _Could_ (§14.3). Values per the approved visual design spec. **[Req]** All text/background pairs ≥ 4.5:1 (≥ 3:1 for large text and UI components); each pair used for text is verified, not assumed. |

**Rationale:**

- It records the approved structure.
- It promotes the contrast rules to [Req], so new colors can't weaken accessibility.
- It requires the actual pairs to be verified (D1).

### A4. §7.3 "Imagery" row (fixes C4)

**Current:**

> | Imagery | Optional. If used: optimized through Astro's image pipeline (§12), with explicit dimensions, meaningful `alt` text or `alt=""` for decorative images. No stock photos of handshakes, robots, or glowing brains. |

**Proposed:**

> | Imagery | Brand imagery uses one consistent 3D style: the cube mascot and a small set of supporting illustrations (same camera, materials and lighting; blue-dominant, decorative colors secondary). The mascot is prominent only in the home hero; elsewhere it appears small or not at all, and never on legal pages or inside forms. At most one illustration per viewport. Images never animate (§6.4). If people appear, at most two (client and consultant). **[Req]** Decorative images use `alt=""`; images that convey information have meaningful `alt` text in both languages; the logo has the accessible name of the company. **[Req]** Optimized through Astro's image pipeline (§12), served from the site itself, with explicit dimensions and size budgets. Logos are genuine vector graphics, not raster images embedded in SVG. No stock photos of handshakes, robots, or glowing brains. **[Req]** Before publication, each asset's source, ownership and usage rights (including the terms of any AI tool used to create drafts) are verified and recorded. |

**Rationale:**

- It replaces "optional, if used" with rules for the approved system: style consistency, placement and density, no animation.
- It sets the decorative/informative image rules.
- It requires a vector logo (D4) and documented rights before publication (D7).
- It keeps every existing technical and anti-cliché constraint.

### A5. §7.3 "Cards" row (fixes C5)

**Current:**

> | Cards | Service and work cards: flat or a single subtle border/shadow, the whole card clickable through one real link (not nested links), no hover scale or translate. |

**Proposed:**

> | Cards | Service and work cards (interactive): subtle border plus the first shadow level at rest, the second shadow level on hover/focus-within; the whole card clickable through one real link (not nested links); visible focus; no hover scale or translate. Non-interactive blocks (steps, principles, panels): flat, border or tint only, no shadow. |

**Rationale:**

- It resolves the ambiguity, and keeps the two-level shadow limit and the no-transform rule.
- It adds the focus requirement, which already applies through §6.5.

### A6. §7.1 status and §7.4 open decisions (fixes C6)

**Current §7.1 (excerpt):**

> **Everything in this section is a proposed direction [Rec], not an approved brand.** Open decisions are listed in §7.4.

**Proposed §7.1 (excerpt):**

> The visual direction (bright, blue-primary, decorative secondary accents, 3D cube mascot, logo concept) was approved by the owner on 23 October 2026 and is specified in `docs/design/visual-design-spec.md`. Production assets and measured validations still pending are listed in §7.4.

**Current §7.4:**

> Logo or wordmark treatment, accent color, typeface, whether a founder photo is used, and whether "Code Happy" should feel lighter in tone (playfulness) or neutral.

**Proposed §7.4:**

> Decided (23 October 2026): primary blue, decorative palette, typeface (Plus Jakarta Sans, subject to validation), logo concept (horizontal, stacked, symbol), mascot concept, tone (friendly but professional), founder photo optional. Still open: acceptance of the production logo and canonical mascot; verification of asset usage rights; measured font coverage, size and performance (see `docs/design/visual-design-spec.md` §14).

**Rationale:** it records what is decided and keeps the real open items visible.

## 3. Technical acceptance criteria tied to the amendment

These are verified during implementation (see `visual-implementation-plan.md`). None is weakened by the amendment.

1. **Contrast:** `tests/unit/contrast.test.ts` is extended (new backgrounds, `accent-active`, `border-strong`), never relaxed. `bg = #ffffff` and every ≥ 4.5:1 check stay.
2. **Decorative colors:** a guard fails on decorative tokens used as text or status color.
3. **Images:** every `<img>` has `width`, `height` and `alt`. Budgets: hero ≤ 80 KB, mascot ≤ 30 KB, logo SVG ≤ 4 KB.
4. **Logo:** the SVG files contain vector paths only (no `<image>`, no `<text>`); the accessible name is "Code Happy".
5. **No third-party requests** (`tests/dist/js-budget.test.ts` unchanged); no new client JavaScript.
6. **Motion:** `tests/e2e/motion.spec.ts` unchanged; illustrations are static.
7. **Responsive:** `tests/e2e/responsive.spec.ts` unchanged; the home H1 is ≤ 4 lines at 320 px in both locales.
8. **Lighthouse** at the F7-03 thresholds after fonts and images are added.
9. **Asset register:** the register records the rights review before any asset is published.

## 4. Requirements this amendment does **not** change

- §1.4 anti-goals, including "gradient orbs, floating icons" and "implies a larger team".
- §6.3 readability, §6.4 motion (no decorative animation; ≤ 200 ms; reduced motion), §6.5 focus and the static/sticky header rule.
- §7.3 rows not listed above.
- §8 i18n, §11 SEO, §12 accessibility and performance, §13 contact and privacy, security constraints.
- All launch gates (E1–E4; F8-04 manual checks).
- `IMPLEMENTATION_PLAN.md`: no change proposed. The visual packages are separate (`visual-implementation-plan.md`). Per D10, they run before launch and do not start F8.

## 5. What remains before applying

- **Owner:** explicit approval to apply A1–A6 to `SPEC.md`. The approval date is recorded in A6.
- No other owner decision blocks the text. The open items in A6's §7.4 are production and validation tasks, not decisions needed to apply the amendment.
