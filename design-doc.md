# ANTIGRAVITY — PORTFOLIO DESIGN DOCUMENT

> Project: **Antigravity Portfolio** for Siddhant Vashisth
> Philosophy: **Digital Brutalism** — engineered, not decorated
> Status: Active Development (v0.4)

This document is the single source of truth for *why* the website looks and behaves the way it does. It holds the **rules, motivations, design system, and engineering approaches** behind the implementation.

---

## 0. ONE-LINE THESIS

A portfolio should not look like a portfolio. It should look like a piece of industrial signage that happens to render in a browser — sharp, loud, confidently empty, and mechanically alive. Every pixel must justify itself by carrying either *information* or *rhythm*. Nothing exists for decoration.

---

## 1. VISUAL QUALITY SPEC — THE OBSIDIAN RULE

### 1.1 Color palette (non-negotiable)

| Token       | Hex       | Role                                              |
|-------------|-----------|---------------------------------------------------|
| Background  | `#000000` | Default canvas. Black is the *subject*.           |
| Foreground  | `#FFFFFF` | Type, rules, hairlines. Maximum contrast.         |
| Accent      | `#FFFF00` | Reserved for *actionable* or *measurable* data.   |

Implemented as oklch tokens in `src/styles.css`:

```css
--background : oklch(0.04 0 0);      /* near-pure black, retains depth */
--foreground : oklch(0.98 0 0);      /* near-pure white, prevents flare */
--accent     : oklch(0.97 0.21 110); /* neon yellow, max chroma at 110°  */
```

**Forbidden, with reasons:**

- **Gradients** — soften edges, imply photographic depth. Brutalism is flat; depth comes from contrast and scale, not blur.
- **Drop shadows / blur filters** — they fake light. We don't fake light.
- **Additional accent colors** — yellow *means* "interactive / metric." A second accent dilutes meaning and the eye loses the signal.
- **Mid-greys for softness** — softness is a UX lie. We use hairlines and whitespace instead.

### 1.2 Typography

Two families, no third:

- **Display** — Inter / Helvetica Now / Helvetica Neue. Used at extreme weight (Black / 900) and extreme size (`13vw` for the hero name). Tracking is crushed to `-0.06em` at large sizes to make letters *kiss*. That's the brutalist signature.
- **Mono** — JetBrains Mono. *Metadata only*: coordinates, timestamps, status, version strings. Uppercase, tracking `0.2em`, size `10px`. It frames display type the way a serial number frames a product.

### 1.3 Cursor & rendering

```css
body {
  cursor: crosshair;
  -webkit-font-smoothing: none;
  text-rendering: geometricPrecision;
}
```

- `crosshair` cursor reinforces the surveying / engineering metaphor.
- Font smoothing **off** keeps edges hard. Smoothed type belongs to marketing decks, not to brutalism.
- `geometricPrecision` favors exact glyph metrics over hinted readability.

### 1.4 Noise overlay

A 6%-opacity SVG fractal-noise plate is fixed across the viewport in `.noise::before`. Purpose: defeat banding on pure black and add analog texture without using a raster image. Mix mode is `screen` so it only brightens, never darkens.

### 1.5 Grid background

An 80px × 80px line grid (`.grid-bg`) at `oklch(0.18 0 0)` sits behind the hero. It is the visible *engineering paper* the type is drafted on.

---

## 2. LAYOUT SYSTEM — 12-COLUMN BLUEPRINT

Every section uses `grid-cols-12 gap-5 px-5`. The `5px / 20px` rhythm is inherited from architectural drafting. The 12-column grid lets us place a label in `col-span-3` and a headline in `col-span-9` — the classic editorial split (Vignelli / Unimark, applied to web).

Section anatomy is identical everywhere:

```
┌─ index ─┬──────────────────── headline ────────────────────┐
│ (01)    │  SELECTED  WORK                                  │
│ ──────  │  ▓▓▓▓▓▓▓  ░░░░░░                                 │
│ LABEL   │                                                  │
└─────────┴──────────────────────────────────────────────────┘
```

Enforced by `SliceHeading`. Consistency of *frame* licenses variation of *content* — when the frame is rigid the content can scream.

---

## 3. MOTION PHILOSOPHY — CINEMATIC CUTS

### 3.1 The cut, not the fade

Brutalist motion never crossfades. We **cut**, **slice**, and **stamp**. The signature easing is:

```ts
const EASE = [0.85, 0, 0.15, 1] as const;
// cubic-bezier(0.85, 0, 0.15, 1)
```

Almost-linear in the middle with **violent acceleration at both ends** — mimics a guillotine blade or a printing press. Every transition uses this single curve. One curve, one identity.

### 3.2 Choreography catalogue

| Pattern               | Where                  | Why                                            |
|-----------------------|------------------------|------------------------------------------------|
| Diagonal slice        | `Hero.tsx` intro       | Two stacked panels (yellow then white) clip out along a diagonal polygon, exposing the black canvas. Reads as a printing plate being lifted. |
| Letter stretch        | `SIDDHANT` letters     | Each letter enters from `y:110%, scaleX:0.5` and stamps to `0,1` with 50 ms stagger. Mimics a variable-font weight-axis snap. |
| Clip-path wipe        | `Projects.tsx` rows    | `inset(0 100% 0 0) → inset(0 0% 0 0)` — row unmasked left-to-right like a teleprinter. |
| Vertical slide-up     | `SliceHeading` H2      | Heading sits in `overflow-hidden` aperture and slides from `y:100% → 0`. Window is shutter; text is film. |
| Scroll-linked drift   | `StickyTicker`         | `useScroll` + `useTransform` maps progress to X. Giant outlined word drifts against scroll. Momentum without a timer. |
| Marquee               | `Marquee.tsx`          | CSS keyframe `translateX(0 → -50%)` looped. Doubled content hides the seam. 25 s — slow enough to read, fast enough to feel mechanical. |
| Blink                 | Status dot             | `steps(2)` — a digital blink, not a breath.    |
| Diagonal divider      | `Divider.tsx`          | Yellow slab enters at `x:-110%`, parks at `0`; text fades on top. The slab is the transition; the section change is the event. |
| Progress bar          | `ScrollProgress.tsx`   | 3 px yellow bar with spring (`stiffness 120, damping 30`). Constant orientation without browser chrome. |
| Hover slice           | `Projects.tsx` row     | Yellow panel grows `w-0 → w-full` under the row in 500 ms; text inverts to black. Interactivity is paid for in yellow. |

### 3.3 Stagger as rhythm

List items always stagger by `0.06 – 0.08 s`. Faster feels chaotic; slower feels lazy. The stagger interval is a metronome — it tells the eye the system has timing.

### 3.4 `viewport={{ once: true, margin: "-100px" }}`

Reveals fire **once**, with a negative margin so animation starts *before* the element fully enters view. Prevents the popcorn effect of late-firing animations and keeps scroll feeling pre-loaded.

---

## 4. COMPONENT-BY-COMPONENT MOTIVATION

### 4.1 `Hero.tsx`
- **Role:** first impression. Identity in under 2 seconds.
- **Composition:** `SIDDHANT` at `13vw`, single line. Letters individually animated, then underlined by a `scaleX:0 → 1` rule — a draftsman's stroke under a label.
- **Metadata grid:** four cells (ROLE / INST / YEAR / RANK) replace the conventional tagline. Data > slogans.
- **Top crosshair info:** status pill, GPS coordinates, version string. Not real; they are *theater*. They say "this site is a surveying instrument, not a brochure."
- **Scroll indicator:** `SCROLL ─── 01/04`. The `01/04` tells the user the site has a finite number of cuts. Sets expectation.

### 4.2 `Marquee.tsx`
- Stat ribbon entering with `clipPath: inset(50% 0 50% 0)` (opens vertically) then scrolls horizontally — two axes in one element.
- Yellow background = all metrics, all interactive-grade.
- Black squares are typographic bullets, not icons.

### 4.3 `Projects.tsx`
- Table-like row list, no thumbnails. A brutalist portfolio shows **outcomes as type**, not screenshots. Five columns of meaning: index · title · stack · impact · year.
- Hover inverts black/white *via* a yellow wipe. The wipe is the verb; the inversion is the consequence.

### 4.4 `SliceHeading.tsx`
- Uniform section opener: index in mono left, headline in display right.
- Headline lives in `overflow-hidden` mask, slides from `y:100%`. Reused everywhere — repetition makes it feel like *grammar*.
- `11vw` mobile / `8vw` desktop, `whitespace-nowrap`. Constraint: the headline must always fit on one line. Wrapping would break the guillotine metaphor.

### 4.5 `StickyTicker.tsx`
- Scroll-linked horizontal drift. Outlined word at `12vw`, weight 900. Outline (`-webkit-text-stroke`) instead of fill because a section *connector* should feel like a watermark, not a banner.
- Yellow `✶` punctuates each repeat — the only ornament permitted on the site, allowed because it carries the accent color.

### 4.6 `Divider.tsx`
- Replaces `<hr>` and whitespace transitions. A yellow slab clip-pathed `polygon(0 0, 100% 0, 92% 100%, 0 100%)` slides in and parks; `// 01—02` label fades on top. Marks the *seam* between chapters. `invert` prop flips colors without breaking the palette.

### 4.7 `ScrollProgress.tsx`
- 3 px yellow bar driven by `useSpring(scrollYProgress)`. Bottom-right shows `00% / SCROLLED` in mono with `mix-blend-mode: difference`.
- Linear bar feels like a video timeline; a spring bar feels like a *needle responding to weight*. The difference between "website" and "instrument."

### 4.8 `Awards / About / Experience / Contact`
- All follow `SliceHeading + 12-col content`. Chapters of the same book, not separate pages. The visual grammar is the binding.

### 4.9 `Nav.tsx`
- Fixed top bar, mono labels only. Smooth-scroll delegated to `html`. No hamburger; the nav is short enough to live inline at every breakpoint. Brutalism is anti-hamburger.

---

## 5. CSS UTILITIES — THE TOOLBOX

Defined in `src/styles.css` under `@layer utilities`:

- `.text-outline` / `.text-outline-yellow` — `-webkit-text-stroke` outlined type. Lets a *negative-space* version of a word sit next to its filled counterpart (see `SELECTED [WORK]`).
- `.grid-bg` — 80 px engineering grid.
- `.noise::before` — analog texture overlay.
- `.animate-marquee` — 25 s linear loop.
- `.animate-blink` — `steps(2)` digital blink.
- `.animate-stretch` — font-stretch + scaleX letter stamp (CSS variant).
- `.animate-slice-in` — clip-path reveal helper for non-JS contexts.
- `.diagonal-divider` / `.diagonal-divider-rev` — reusable diagonal clip-path presets.

### Selection color

```css
::selection { background: #ffff00; color: #000; }
```

Even text selection respects the palette. No leaks.

---

## 6. ACCESSIBILITY POSTURE

Brutalism is not an excuse for inaccessibility.

- Contrast **21 : 1** (white on black) — exceeds WCAG AAA everywhere.
- Yellow on black **19.5 : 1** — also AAA.
- All animations are transform / opacity / clip-path only — they hit the compositor and respect `prefers-reduced-motion` when the browser short-circuits transforms.
- Type never below 12 px. Mono metadata at 10 px is non-essential and duplicated by larger display type.
- Every interactive element has a visible hover state (the yellow wipe).

---

## 7. ENGINEERING APPROACH

### 7.1 Stack
- **TanStack Start v1** (React 19, Vite 7). Single page route `index.tsx` mounts the whole portfolio; sections are components, not routes, because the site is consumed as a *scroll experience*.
- **Tailwind v4** via native `@import "tailwindcss"`. All design tokens are oklch variables — no `tailwind.config.js`.
- **framer-motion** for JS-driven motion. CSS keyframes used only for infinite loops (marquee, blink) where JS would waste CPU.
- **shadcn/ui** installed but *unused* on the portfolio surface — its soft, rounded aesthetic fights brutalism. Reserved for future admin/auth.

### 7.2 Why no images?
Images introduce a third color, soft edges, and load flicker. Avoiding them costs visual variety but buys instant load, hard edges, and brand integrity. Case-study pages can have images later — never on the index.

### 7.3 Why a single `index.tsx`?
Five sections don't need five routes. Routing implies a transition tax. A single scroll with `ScrollProgress` + sticky `Nav` gives the user a *map* without that tax.

### 7.4 Performance budget
- No images, no icon fonts, no external CSS.
- One display family + one mono, system-stack fallbacks.
- All animation GPU-composited.
- Target Lighthouse Performance ≥ 95 mobile.

---

## 8. CONTENT VOICE

- **Uppercase everywhere** for headings, labels, metrics. Lowercase reserved for body paragraphs (currently minimal).
- **Numbers beat adjectives.** "RANK 01 / 6,200+" beats "award-winning." "65% COST REDUCTION" beats "highly performant."
- **Slashes and arrows as punctuation.** `JUET / GUNA`, `SCROLL → SCROLL`. Engineering glyphs belong to schematics.
- **No exclamation marks. Ever.** Brutalism does not need to raise its voice.

---

## 9. NON-GOALS — THINGS THIS SITE WILL NEVER DO

- Never use a purple-to-pink gradient.
- Never use a glassmorphism card.
- Never feature a hero video background.
- Never animate on a `setTimeout` loop.
- Never apologize for being loud.

---

*End of design blueprint.*