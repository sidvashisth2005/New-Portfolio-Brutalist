# SIDDHANT VASHISTH — INTERACTIVE 3D DEVELOPER PORTFOLIO
## THE DESIGN SYSTEM, BEHAVIOR GRAMMAR, AND TECHNICAL BLUEPRINT

> **Project Name:** Antigravity Portfolio  
> **Target Owner:** Siddhant Vashisth  
> **Philosophy:** Digital Brutalism — engineered, not decorated.  
> **Status:** Production-Ready (v0.4)

This document is the absolute source of truth for the codebase, visual logic, motion choreography, and engineering parameters of this portfolio. It provides a complete map for any human developer or AI agent to start building and extending the codebase.

---

## 0. ONE-LINE THESIS

A developer portfolio should not look like a generic corporate website. It should feel like a piece of industrial machinery or telemetry signage that happens to render in a browser — sharp, loud, confidently structured, and mechanically alive. Every pixel must carry either *information* or *rhythm*. Nothing exists for decoration.

---

## 1. VISUAL SYSTEM SPECIFICATION

The visuals are strictly constrained to preserve a high-contrast, structural aesthetic. Soft edges, gradients, and drop shadows are forbidden.

### 1.1 Color Tokens (Non-Negotiable)

We use a three-token palette mapped using OKLCH color spaces in `src/styles.css` under the `@theme` directive:

| Token | CSS Variable / OKLCH | Fallback Hex | Role |
| :--- | :--- | :--- | :--- |
| **Background** | `--background: oklch(0.04 0 0)` | `#000000` | Depth-enhanced deep black. Holds visual solidity. |
| **Foreground** | `--foreground: oklch(0.98 0 0)` | `#FFFFFF` | Text, rules, hairlines. Near-pure white to prevent screen flare. |
| **Accent** | `--accent: oklch(0.97 0.21 110)` | `#FFFF00` | Pure yellow, maximum chroma at 110°. Reserved for actionables/metrics. |

#### Forbidden Elements:
- **Gradients**: They soften edges and simulate photographic depth. Brutalism is flat; depth is achieved via sharp scale contrast and layer clipping.
- **Drop Shadows / Blurs**: Fakes lighting. All panels are hard-docked.
- **Additional Accent Colors**: Yellow is the sole indicator of interaction and performance metrics. Introducing a second color dilutes visual telemetry.
- **Mid-greys**: We do not use grey to separate components; separation is done strictly with solid 2px white lines (`border-2 border-white`) and whitespace.

### 1.2 Typography System

The site utilizes exactly two font families (imported via Google Fonts in `src/routes/__root.tsx`):

1. **Display Font (Inter / Sans-Serif)**:
   - Used for primary titles, headings, and names.
   - Enforced at extreme weights (`font-black` / `900`) and massive viewport widths (`text-[13vw]` for the hero).
   - Letter-spacing is heavily crushed to `tracking-[-0.06em]` at large scale so characters *kiss* to form block-like typographic layouts.
2. **Mono Font (JetBrains Mono / Monospace)**:
   - Reserved strictly for metadata readouts: indexes, timestamps, status indicators, stack tools, coordinate trackers, and version numbers.
   - Standardized format: `font-mono text-[10px] uppercase tracking-[0.2em]`. It frames the display type like a serial number on a machine plate.

### 1.3 Hard Edges & Rendering
To enforce a raw, digital appearance:
- Cursor is locked globally to a `crosshair` to emphasize a surveying utility.
- Font-smoothing is bypassed (`-webkit-font-smoothing: antialiased` is overridden or not used where crisp pixels are preferred).
- Text rendering uses `geometricPrecision` to favor exact glyph outlines over browser-hinted readability.

```css
body {
  cursor: crosshair;
  text-rendering: geometricPrecision;
}
```

### 1.4 Analog Texture Overlay (Noise)
To prevent digital banding on pure black screens and add subtle texture:
- A 6%-opacity SVG fractal noise block is generated and fixed across the screen using a `.noise::before` selector.
- Built using `mix-blend-mode: screen`, ensuring it only lifts/textures light tones, leaving pure black pixels deep and dark.

### 1.5 Engineering Grid Background
An 80px × 80px repeating grid (`.grid-bg`) styled at `oklch(0.18 0 0)` is positioned absolutely behind the Hero elements, representing drafting graph paper.

---

## 2. LAYOUT & STRUCTURAL GRID

The structure is anchored on a rigid 12-column layout to mimic editorial grid drafting.

- **Column Grid**: `grid grid-cols-12 gap-5 px-5` is used across all content components.
- **Layout Rhythm**: Section gaps (`py-32`) and borders (`border-t-2 border-white`) form flat brutalist tiles.
- **Section Anatomy**: Every section starts with a consistent horizontal split:
  - Left column (`col-span-12 md:col-span-3`): Mono index label (e.g., `(01) ABOUT / MANIFESTO`) inside a sticky wrapper.
  - Right column (`col-span-12 md:col-span-9`): Display content, lists, grids, or interactive drawers.

---

## 3. MOTION & ANIMATION SCHEME

Motion must feel mechanical, snappy, and physical. Soft, slow fades are replaced with swift, high-acceleration transitions.

### 3.1 The Guillotine Easing Curve
Every transition utilizes a single custom cubic-bezier curve. It behaves like a high-speed mechanical stamp: near-linear in the center with violent acceleration at both ends.

```ts
const EASE = [0.85, 0, 0.15, 1] as const;
```

### 3.2 Animation Library Checklist
- **Diagonal Slide Reveals**: Uses diagonal `clipPath` polygons (e.g., `polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))`) to reveal sections.
- **Letter Stretches**: Staggers name letters with an initial scale offset: `y: "110%", scaleX: 0.5, opacity: 0` mapping to `y: 0, scaleX: 1, opacity: 1` staggered by `50ms` intervals.
- **Clip-Path Wipe**: Masks details from left-to-right (`clipPath: "inset(0 100% 0 0)"` to `"inset(0 0% 0 0)"`) like a printer head.
- **Vertical Shutter Slide**: Headers live inside an `overflow-hidden` container and animate up from `y: "100%"`.
- **Typographic Tickers**: The `StickyTicker` tracks viewport scroll, mapping translating positions `3x faster` (`["30%", "-130%"]`) to sweep large outline texts across sections.
- **Infinite Loop Marquee**: Pure CSS horizontal translations (`translateX(0 -> -50%)`) configured with matching twin loops to hide seams. Running at `25s` to keep Stat bands readable.
- **Digital Blink**: A blink status dot utilizing `steps(2)` to animate a binary state instead of smooth curves.

---

## 4. INTERACTIVE 3D GRAPHICS SYSTEM

The portfolio features a high-fidelity WebGL runtime overlaying the flat text grid, blending 3D space with 2D editorial layout.

### 4.1 Stars Background Bounds
- **Scope**: Bounded to the upper region of the Hero section, ending strictly at the line below the name `SIDDHANT` and starting below the nav header border (`top-[54px]`).
- **Structure**: Rendered in a dedicated component ([StarField.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/StarField.tsx)) placed inside a `relative flex-1 overflow-hidden` wrapper container. This clips all star particles cleanly at the line boundary.

### 4.2 Sigil Model Details
- Renders an abstract 3D asset comprising:
  - 5 interlocking structural metal beams (`metalness: 1, roughness: 0.32`).
  - 6 hexagonal crystal shards with a refractive Glass Transmission material (`transmission: 1, ior: 1.45, chromaticAberration: 0.06`).
  - A glowing central accent cube (`color: "#ffff00"`) illuminated by a point light source (`intensity: 2`).
- Embedded inside a slow floating movement controller (`Float`) and an `OrbitControls` camera rig allowing users to drag and spin the model.
- The 3D model's Canvas background is transparent, overlaying on top of the separate full-width `StarField` component.

### 4.3 60FPS Ref-Telemetry Coordinates (High Performance)
To animate geographical coordinates dynamically without triggering heavy React component renders (which stutters Framer Motion animations):
1. A single React `useRef` is initialized on `Hero.tsx` targeting the coordinates text:
   ```ts
   const coordsRef = useRef<HTMLDivElement>(null);
   ```
2. The `coordsRef` is passed as a prop down into the R3F `<Canvas>` and `<SigilScene>` render loops.
3. On every frame inside R3F `useFrame((state) => { ... })`, telemetry math maps mouse coordinates (`state.pointer.x/y`), clock runtime (`state.clock.getElapsedTime()`), and camera orbit angles (`state.camera.position`) to compute a changing Lat/Lng readout:
   ```ts
   const lat = 24.6471 + (pointerY * 3.5) + Math.sin(time * 0.5) * 1.5 + (state.camera.position.y * 0.8);
   const lng = 77.3119 + (pointerX * 5.2) + Math.cos(time * 0.4) * 2.1 + (camAngle * 4.5);
   ```
4. Values are formatted with `.toFixed(4)` and written directly to the DOM node:
   ```ts
   coordsRef.current.innerText = `${latDir} ${latVal}° / ${lngDir} ${lngVal}°`;
   ```

---

## 5. DETAILED COMPONENT ARCHITECTURE

### 5.1 Hero Section ([Hero.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/Hero.tsx))
- Splits the view into a **Top Part** (star field background, 3D model, name title, status metadata, and a 2px white dividing rule) and a **Bottom Part** (solid black background, role description, and a 4-box metrics layout).
- The 3D model container is vertically centered inside the star field boundaries using:
  ```css
  className="absolute right-5 md:right-10 top-[calc(50%+27px)] -translate-y-1/2"
  ```
  This centers the sigil relative to the top line (`54px` header offset) and the bottom line (divider location).

### 5.2 About & Manifesto ([About.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/About.tsx))
- Houses biographical summaries, GPA listings, and external documentation triggers.
- Features a bottom metrics grid where labels are styled at `text-[10px] md:text-[11px] tracking-[0.12em]` to stay within their container blocks without wrapping to more lines.

### 5.3 Projects & Hover Wipes ([Projects.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/Projects.tsx))
- Lists primary code projects. On row hover, a solid yellow panel wipes left-to-right (`w-0 -> w-full`), inverting text colors to black.
- On hover, an expanding panel reveals detailed bullet points.
- **GitHub Trigger Button**: Displays a custom link button with a sliding background hover transition (`translate-y-full` to `translate-y-0`) and GitHub SVG.
  - If the project container is not hovered (black background): Button shows white border/text, and slides in a white background with black text when hovered.
  - If the project container is hovered (yellow background): Button shows black border/text, and slides in a black background with yellow text when hovered. This ensures maximum contrast.

### 5.4 Custom Podcast Player ([Podcast.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/Podcast.tsx))
- Plays `/audio/podcast.mp3`. Features interactive play/pause controls, progress seeks, volume, and skipping.
- Includes a responsive equalizing bar visualizer that animates actively when the track plays.

### 5.5 Skills Matrix ([Skills.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/Skills.tsx))
- Split-screen layout. The left column lists skills cards (Business, Technical, Data). The right column is a detailed information view. Hovering/selecting a skill on the left instantly updates the details on the right.

### 5.6 Contact & Directory ([Contact.tsx](file:///d:/New%20PORTFOLIO/src/components/portfolio/Contact.tsx))
- Features clickable email and phone links, social media directories, and a brutalist design footer.

---

## 6. CSS UTILITIES & STYLING BLUEPRINT

Defined inside [styles.css](file:///d:/New%20PORTFOLIO/src/styles.css):

### 6.1 Custom Utilities
- `.text-outline` / `.text-outline-yellow`: Creates outline-only display text using `-webkit-text-stroke: 1px currentColor`.
- `.grid-bg`: Sets repeating background lines using CSS gradients:
  ```css
  background-image: linear-gradient(to right, var(--color-grid) 1px, transparent 1px),
                    linear-gradient(to bottom, var(--color-grid) 1px, transparent 1px);
  ```
- `.noise`: Generates overlay grain using an SVG data URL:
  ```css
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  ```

### 6.2 Selection Styling
```css
::selection {
  background-color: var(--accent);
  color: #000000;
}
```
Matches the brand accent colors when highlighting text.

---

## 7. DEVELOPER & AI WORKFLOW GUIDE

### 7.1 Setup & Installation
The portfolio runs on a modern Vite/TypeScript stack. Install dependencies using Node or Bun:
```bash
# Install dependencies
npm install
# or
bun install
```

### 7.2 Running Development Server
Runs Vite development client with Hot Module Replacement (HMR).
```bash
npm run dev
# or
bun dev
```
Development address is hosted at `http://localhost:8080/`.

### 7.3 Building Production Bundle
Compiles Vite client assets and SSR assets for production deployment:
```bash
npm run build
```
This produces optimized production assets inside the `dist/` directory.

### 7.4 Verification Checklist
- Run `npm run build` to check for compilation or TypeScript errors.
- Exceed WCAG AAA standards for contrast (21:1 on white/black, 19.5:1 on yellow/black).
- Target Lighthouse performance scores above 95.

---

*End of blueprint. Follow these rules to maintain design integrity when modifying or extending this codebase.*
