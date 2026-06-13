# ANTIGRAVITY BUILD PROMPT — SIDDHANT VASHISTH PORTFOLIO
## Digital Brutalism · v0.4 · TanStack Start + Tailwind v4 + Framer Motion

---

## 0. WHAT YOU ARE BUILDING

A single-page scroll portfolio for **Siddhant Vashisth** — a 3rd-year B.Tech CSE student at JUET Guna, India. Rank 01 at HackNITR 7.0 (6,200+ participants). The aesthetic is **Digital Brutalism**: black canvas, white type, neon-yellow accent. No gradients. No blur. No softness. This site should feel like industrial signage rendered in a browser — mechanically alive, loud, and engineered.

Stack: **TanStack Start v1 · React 19 · Vite 7 · Tailwind v4 · framer-motion**. Single route `src/routes/index.tsx` — the whole portfolio lives there as components.

---

## 1. DESIGN SYSTEM (ABSOLUTE — DO NOT DEVIATE)

### 1.1 Color palette

```css
--background : oklch(0.04 0 0)       /* near-pure black */
--foreground : oklch(0.98 0 0)       /* near-pure white */
--accent     : oklch(0.97 0.21 110)  /* #FFFF00 neon yellow */
```

- **Black** = canvas.
- **White** = type, borders, hairlines.
- **Yellow (#FFFF00)** = interactive elements, metrics, CTAs only. No third color ever.
- **Forbidden:** gradients, drop shadows, blur filters, glassmorphism, mid-grey fills, any additional accent color.

### 1.2 Typography

```css
--font-display : 'Inter', 'Helvetica Now', 'Helvetica Neue', Arial, sans-serif;
--font-mono    : 'JetBrains Mono', 'Courier New', ui-monospace, monospace;
```

- Display: weight **900 (Black)** at extreme sizes. Large headings track at `-0.05em` to `-0.06em` — letters nearly kissing.
- Mono: weight 400. **Uppercase only.** `tracking-[0.2em]` at `10px`. Used exclusively for: coordinates, timestamps, index labels, status strings, metadata. Never for body copy.
- No third typeface. Ever.

### 1.3 Body-level CSS

```css
body {
  cursor: crosshair;
  -webkit-font-smoothing: none;
  text-rendering: geometricPrecision;
  background: #000;
  overflow-x: hidden;
}
::selection { background: #ffff00; color: #000; }
```

Font smoothing is **OFF**. Hard edges are the aesthetic.

### 1.4 Grid background

```css
.grid-bg {
  background-image:
    linear-gradient(to right, oklch(0.18 0 0) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(0.18 0 0) 1px, transparent 1px);
  background-size: 80px 80px;
}
```

Used behind the hero at 30% opacity — engineering paper beneath the type.

### 1.5 Noise overlay

```css
.noise::before {
  content: "";
  position: fixed; inset: 0; z-index: 100;
  pointer-events: none; opacity: 0.06;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```

Apply `.noise` to `<body>`. Defeats pure-black banding, adds analog texture. Screen blend = only brightens, never darkens.

### 1.6 Text utilities

```css
.text-outline       { -webkit-text-stroke: 2px oklch(0.98 0 0); color: transparent; }
.text-outline-yellow{ -webkit-text-stroke: 2px #ffff00; color: transparent; }
```

### 1.7 CSS keyframe animations (CSS-only loops — not Framer)

```css
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.animate-marquee { animation: marquee 25s linear infinite; }

@keyframes blink { 50% { opacity: 0; } }
.animate-blink { animation: blink 1s steps(2) infinite; }
```

### 1.8 The single easing curve

Every Framer Motion transition uses this — no exceptions:

```ts
const EASE = [0.85, 0, 0.15, 1] as const;
// cubic-bezier(0.85, 0, 0.15, 1) — violent at both ends, nearly linear in the middle
```

### 1.9 Viewport animation rule

```tsx
viewport={{ once: true, margin: "-100px" }}
```

Reveals fire once, start before element fully enters view. No popcorn effect.

### 1.10 Layout system

Every section: `grid grid-cols-12 gap-5 px-5`. The `5 / 20px` rhythm is architectural.
Section anatomy: `col-span-3` = mono index label, `col-span-9` = headline/content.
All `border-t-2 border-white` between sections.

---

## 2. FILE ARCHITECTURE

```
src/
  styles.css                      ← design tokens + utilities
  routes/
    __root.tsx                    ← html/body shell
    index.tsx                     ← assembles all sections
  components/
    portfolio/
      Nav.tsx
      Hero.tsx
      Marquee.tsx
      Work.tsx
      StickyTicker.tsx
      Divider.tsx
      Experience.tsx
      About.tsx
      Awards.tsx
      ScrollProgress.tsx
      SliceHeading.tsx
      Contact.tsx
```

---

## 3. COMPONENT SPECIFICATIONS

### 3.1 `Nav.tsx`

Fixed top bar. `z-50`. `bg-black/80 backdrop-blur-none border-b-2 border-white`.

Layout: flex, space-between. Left: `SIDDHANT.V` in mono `10px` uppercase. Center: `<nav>` with links `[{label, href, n}]`:
```
{ label: "Index",      href: "#top",        n: "00" }
{ label: "Work",       href: "#work",       n: "01" }
{ label: "Experience", href: "#experience", n: "02" }
{ label: "About",      href: "#about",      n: "03" }
{ label: "Contact",    href: "#contact",    n: "04" }
```

Each link: mono `10px`, uppercase, `tracking-[0.2em]`. Hover: `text-[#ffff00]`. Number prefix in `text-white/30`.

Right: live IST clock using `setInterval`, mono `10px`. Format: `IST HH:MM:SS`. Use `suppressHydrationWarning`.

Entrance animation: `initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}` with `delay: 0.1`.

No hamburger menu. Anti-hamburger by philosophy.

---

### 3.2 `Hero.tsx`

Full viewport height (`min-h-screen`). Black. `flex flex-col justify-end overflow-hidden relative`.

**Layer stack (bottom → top):**

1. `.grid-bg` absolute fill, `opacity-30`
2. White reveal panel: `absolute inset-0 z-30 bg-white` with `clipPath: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))` — animates `y: 0 → "110%"` over `1.2s delay 0.4s`
3. Yellow reveal panel: `absolute inset-0 z-40 bg-[#ffff00]` same clipPath — animates `y: 0 → "-110%"` over `1.2s delay 0.2s`
4. Content `z-10`

**Top crosshair row** (fades in at `delay: 1.6`): absolute, `top-20 left-5 right-5`, `grid-cols-12`, mono `10px` `text-white/60`:
- Col 3: `<span class="h-1.5 w-1.5 bg-[#ffff00] animate-blink" /> STATUS / ONLINE`
- Col 3 (start 7): `N 24.6471° / E 77.3119°`
- Col 3 (right-aligned): `PORTFOLIO_V04 — 06.07.26`

**Name** `SIDDHANT` at `text-[13vw]` — per-letter animation:
```tsx
initial={{ y: "110%", scaleX: 0.5, opacity: 0 }}
animate={{ y: 0, scaleX: 1, opacity: 1 }}
transition={{ delay: 0.9 + i * 0.05, duration: 0.6, ease: EASE }}
className="inline-block origin-left"
```
Below name: white `h-[2px]` rule with `scaleX: 0 → 1`, `delay: 1.4, duration: 0.8`.

**Tagline** (left col, `md:col-span-5`): `delay: 1.6`, `font-bold text-base md:text-lg uppercase leading-tight`. "Siddhant Vashisth — Computer Science Engineer & Social Architect. `<span class="text-[#ffff00]">Rank 1 of 6,200+</span>` at HackNITR 7.0."

**Metadata grid** (right, `md:col-span-7`, `grid-cols-2 md:grid-cols-4`):
```
ROLE → CSE Student
INST → JUET Guna
YEAR → 3rd / B.Tech
RANK → 01 / 6,200+
```
Each cell: `border-l-2 border-white pl-3`. Key in mono `10px` `text-white/50`. Value in display font-black `text-xl`.

**Scroll indicator** (`absolute bottom-5 left-5`): `delay: 2`, mono `10px` `text-white/60`: `SCROLL ─── 01/04`

---

### 3.3 `Marquee.tsx`

Yellow `bg-[#ffff00] text-black`, `border-y-2 border-white`.

Entrance: `clipPath: "inset(50% 0 50% 0)" → "inset(0% 0 0% 0)"` (opens vertically on scroll).

Items (tripled to hide seam):
```
HACKNITR 7.0 — RANK 01 · 6,200+ PARTICIPANTS · 30% USER GROWTH · 65% COST REDUCTION ·
JUET GUNA · CSE / 2026 · AVAILABLE FOR HIRE
```

Each item: `font-display font-black text-2xl md:text-4xl tracking-tight uppercase` + `<span class="inline-block w-3 h-3 bg-black" />` as separator.

Scroll: `class="flex gap-8 whitespace-nowrap animate-marquee w-max"`. Container `overflow-hidden`.

---

### 3.4 `SliceHeading.tsx`

```tsx
function SliceHeading({ index, label, children }: {
  index: string; label: string; children: ReactNode
})
```

`grid grid-cols-12 gap-5 mb-16`.

Left (`col-span-12 md:col-span-3`): Framer, `opacity: 0, x: -10 → opacity: 1, x: 0`, `duration: 0.5`. Content: mono `10px`, `text-white/50` — shows `{index}`, a hairline, `{label}`.

Right (`col-span-12 md:col-span-9 overflow-hidden`): Framer, `y: "100%" → 0`, `duration: 0.9`. Heading: `font-display font-black tracking-[-0.05em] text-[11vw] md:text-[8vw] leading-[0.85] uppercase whitespace-nowrap`.

This is the universal section opener. Used by Work, Experience.

---

### 3.5 `Work.tsx`

`id="work"`. `px-5 py-32 border-t-2 border-white`.

SliceHeading: `index="(01)"` `label="SELECTED_WORK"`. Heading: `SELECTED <span class="text-outline">WORK</span>`.

Projects data:
```ts
const projects = [
  { n: "01", title: "PASHU_RAKSHA",   impact: "IoT LIVESTOCK MONITORING",  stack: ["NEXT.JS", "IoT", "ML"],      year: "2025" },
  { n: "02", title: "AROUND_YOU",     impact: "AR SOCIAL PLATFORM",        stack: ["UNITY", "ARCORE", "REACT"],  year: "2025" },
  { n: "03", title: "TRAVELGO",       impact: "AI TRAVEL PLATFORM",        stack: ["REACT", "AI", "MAPS"],       year: "2024" },
  { n: "04", title: "HACKNITR_7.0",   impact: "RANK 01 / 6,200+",          stack: ["NEXT.JS", "AI", "REALTIME"], year: "2025" },
  { n: "05", title: "HACKSAGON",      impact: "FIRST RUNNER-UP",           stack: ["FULLSTACK", "ML"],            year: "2025" },
  { n: "06", title: "JUET_DEVNET",    impact: "400+ STUDENTS ONBOARDED",   stack: ["NODE", "MONGO", "WS"],       year: "2024" },
];
```

Each row: `motion.a`, `href="#"`, `grid grid-cols-12 gap-5 border-b-2 border-white py-6`. Hover: `hover:bg-[#ffff00] hover:text-black transition-colors duration-300`.

Entrance: `clipPath: "inset(0 100% 0 0)" → "inset(0 0% 0 0)"` (wipes left-to-right), `delay: i * 0.06`.

Columns: `col-span-1` mono index · `col-span-4` display font-black `text-2xl md:text-5xl` title · `col-span-3 hidden md:block` mono `text-xs` stack · `col-span-3` display font-black impact · `col-span-1` mono year (right-align).

Yellow hover wipe: `<span class="absolute left-0 top-0 h-full w-0 bg-[#ffff00] -z-10 group-hover:w-full transition-all duration-500" />` on the row (needs `group relative` on parent).

---

### 3.6 `StickyTicker.tsx`

```tsx
function StickyTicker({ text }: { text: string })
```

`border-y-2 border-white py-10 md:py-16 bg-black overflow-hidden relative`.

Uses `useRef`, `useScroll({ target: ref, offset: ["start end", "end start"] })`, `useTransform(scrollYProgress, [0,1], ["10%", "-40%"])` applied to `style={{ x }}`.

4 repetitions of `{text}`:
```tsx
<span class={i % 2 === 0 ? "text-outline" : "text-white"}>{text}</span>
<span class="text-[#ffff00]">✶</span>
```

Font: `font-display font-black uppercase tracking-[-0.04em] text-[12vw] leading-none`. `will-change-transform` on the moving div.

Used as: `<StickyTicker text="AVAILABLE FOR WORK" />` and `<StickyTicker text="SCROLL DOWN" />`.

---

### 3.7 `Divider.tsx`

```tsx
function Divider({ label = "//", invert = false }: { label?: string; invert?: boolean })
```

`h-24 md:h-32 overflow-hidden relative`. Background: `invert ? "bg-[#ffff00] text-black" : "bg-black text-white"`.

Yellow/black slab: `absolute inset-0`, `style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}`. Colour inverts with prop. Animates: `x: "-110%" → 0`, `duration: 0.8`.

Label text (fades in at `delay: 0.6`): `relative z-10 h-full flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.2em]`. Shows `{label}` on both sides + `SCROLL → SCROLL → SCROLL → SCROLL` in display font-black `text-xl md:text-3xl` between.

Used between sections: `<Divider label="// 01—02" />`, `<Divider label="// 02—03" invert />`.

---

### 3.8 `Experience.tsx`

`id="experience"`. `px-5 py-32 border-t-2 border-white`.

SliceHeading: `index="(02)"` `label="EXPERIENCE / TIMELINE"`. Heading: `EX<span class="text-outline">PERIENCE</span>`.

Rows data:
```ts
const rows = [
  {
    year: "2025",
    role: "TEAM LEAD — TRUSTIQUE ASSISTS",
    place: "Trustique Assists Pvt. Ltd.",
    outcomes: ["Led 15–18 member team", "Delivered client-facing AI products"],
  },
  {
    year: "2024 — 2025",
    role: "ML / PYTHON ENGINEER",
    place: "Skill Dzire",
    outcomes: ["Built ML pipelines", "Python automation tooling"],
  },
  {
    year: "2025",
    role: "CHAMPION / HACKNITR 7.0",
    place: "NIT Rourkela",
    outcomes: ["Rank 01 of 6,200+ global participants", "Built AI product in <36h"],
  },
  {
    year: "2023 —",
    role: "B.TECH CSE — 3RD YEAR",
    place: "JUET Guna, M.P.",
    outcomes: ["Graduating 2027", "Lead — Developer Network"],
  },
];
```

Each row: `grid grid-cols-12 gap-5 border-b-2 border-white py-8`. Entrance: `clipPath: "inset(0 0 100% 0)" → "inset(0 0 0% 0)"` (reveals top-to-bottom), `delay: i * 0.08`.

Columns: `col-span-2` mono year · `col-span-6` display role + mono place below it · `col-span-4` outcomes list with `<span class="text-[#ffff00]">▸</span>` prefix.

---

### 3.9 `About.tsx`

`id="about"`. `px-5 py-32 border-t-2 border-white bg-black`.

Left: `col-span-3`, mono sticky label `(03) ABOUT / MANIFESTO`.

Right: `col-span-9`. Word-by-word reveal:
```
"I am Siddhant Vashisth — a third-year Computer Science Engineer at JUET Guna
and a Social Architect building data-driven products. Verified by hackathon wins, not by hype."
```
Split by space. Each word: `motion.span`, `opacity: 0.15 → 1`, `once: false`, `delay: i * 0.015`. Words "Social" and "Architect" get `text-[#ffff00]`.

Metrics grid below (`mt-20 grid-cols-2 md:grid-cols-4 gap-px bg-white border-2 border-white`):
```
6,200+  → Participants outranked / HackNITR 7.0
01      → Global rank held
30%     → Platform user growth delivered
65%     → Infrastructure cost cut
```
Each cell: `bg-black p-5 hover:bg-[#ffff00] hover:text-black transition-colors group`. Number: display font-black `text-4xl md:text-6xl tracking-[-0.04em]`. Label: mono `10px` `text-white/60 group-hover:text-black/70 mt-3`.

---

### 3.10 `Awards.tsx`

Full yellow section: `bg-[#ffff00] text-black py-24 px-5`.

SliceHeading equivalent (inline, no component — yellow context): index `(∞) WINS / VERIFIED` mono, heading `AWARDS & HACKS` at `text-[12vw] md:text-[9vw]`, black text, same animation.

Awards list `border-t-2 border-black`:
```ts
[
  { yr: "2025", title: "HACKNITR 7.0",             note: "RANK 01 / 6,200+" },
  { yr: "2025", title: "HACKSAGON",                note: "FIRST RUNNER-UP" },
  { yr: "2024", title: "SMART INDIA HACKATHON",    note: "FINALIST" },
  { yr: "2023", title: "DEVFEST GUNA",             note: "BEST UI ENGINEERING" },
]
```

Each row: `grid grid-cols-12 gap-5 border-b-2 border-black py-5`. Col layout: `col-span-2` mono year · `col-span-7` display font-black `text-xl md:text-4xl` title · `col-span-3 text-right` display font-black `text-sm md:text-lg` note.

---

### 3.11 `ScrollProgress.tsx`

Fixed. No user interaction.

Yellow `3px` bar: `fixed top-0 left-0 right-0 h-[3px] bg-[#ffff00] z-[60] origin-left`.
Scale driven by `useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })`.

Bottom-right readout: `fixed bottom-5 right-5 z-[55] font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference pointer-events-none flex items-center gap-2`.
Content: `<span class="h-1.5 w-1.5 bg-[#ffff00]" /> {pct} / SCROLLED`.
`pct` from `useTransform(scrollYProgress, v => String(Math.round(v*100)).padStart(2,"0") + "%")`.

---

### 3.12 `Contact.tsx`

`id="contact"`. `px-5 py-32 border-t-2 border-white overflow-hidden`.

`.grid-bg absolute inset-0 opacity-20` behind content.

Left: mono `(04) CONTACT / TRANSMIT`.

Right: massive heading — `scaleX: 0.5 → 1, opacity: 0 → 1` from `origin-left`, `text-[18vw] md:text-[14vw]`:
```
LET'S
<span class="text-outline-yellow">BUILD.</span>
```

Two contact cards below (`grid-cols-1 md:grid-cols-2 gap-5`), each: `border-2 border-white p-6 hover:bg-[#ffff00] hover:text-black transition-colors duration-300 relative block`. Top-right: `→` arrow. Key in mono. Value in display font-black `text-xl md:text-3xl uppercase`.

Cards:
1. `mailto:siddhant.vashisth@juet.ac.in` — label: `EMAIL — PRIMARY`
2. `https://linkedin.com/in/siddhant-vashisth` — label: `LINKEDIN — CONNECT`

**Footer** (`mt-32 pt-6 border-t-2 border-white grid-cols-12 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60`):
- Col 3: `© 2026 SIDDHANT VASHISTH`
- Col 3: `JUET GUNA — M.P., INDIA`
- Col 6 right-aligned: `GITHUB · LINKEDIN · TWITTER · READ.CV` — each `hover:text-[#ffff00]`

---

## 4. `index.tsx` ASSEMBLY ORDER

```tsx
export default function Index() {
  return (
    <main className="bg-black text-white">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Divider label="// 01—02" />
      <StickyTicker text="AVAILABLE FOR WORK" />
      <Experience />
      <Divider label="// 02—03" invert />
      <About />
      <StickyTicker text="SCROLL DOWN" />
      <Awards />
      <Divider label="// 03—04" />
      <Contact />
    </main>
  );
}
```

---

## 5. `__root.tsx` REQUIREMENTS

```tsx
<html lang="en" class="bg-black">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SIDDHANT VASHISTH — PORTFOLIO</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=JetBrains+Mono&display=swap" rel="stylesheet" />
  </head>
  <body class="noise">  {/* noise class for SVG texture overlay */}
    <Outlet />
  </body>
</html>
```

`html { scroll-behavior: smooth; background: #000; }`

---

## 6. `styles.css` CRITICAL CONTENTS

```css
@import "tailwindcss";

:root {
  --radius: 0;   /* brutalism = no rounded corners anywhere */
  --background: oklch(0.04 0 0);
  --foreground: oklch(0.98 0 0);
  --accent: oklch(0.97 0.21 110);
  --font-display: 'Inter', 'Helvetica Now', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', 'Courier New', ui-monospace, monospace;
  --grid-color: oklch(0.18 0 0);
}

@layer base {
  * { border-color: oklch(0.22 0 0); }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-display);
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
    overflow-x: hidden;
    cursor: crosshair;
  }
  html { scroll-behavior: smooth; background: #000; }
  ::selection { background: #ffff00; color: #000; }
}

@layer utilities {
  .font-mono { font-family: var(--font-mono); }
  .font-display { font-family: var(--font-display); }

  .text-outline { -webkit-text-stroke: 2px oklch(0.98 0 0); color: transparent; }
  .text-outline-yellow { -webkit-text-stroke: 2px #ffff00; color: transparent; }

  .grid-bg {
    background-image:
      linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
      linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
    background-size: 80px 80px;
  }

  .noise::before {
    content: "";
    position: fixed; inset: 0; z-index: 100;
    pointer-events: none; opacity: 0.06; mix-blend-mode: screen;
    background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  }

  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .animate-marquee { animation: marquee 25s linear infinite; }

  @keyframes blink { 50% { opacity: 0; } }
  .animate-blink { animation: blink 1s steps(2) infinite; }
}
```

---

## 7. MOTION RULES (ENFORCED)

| Rule | Detail |
|------|--------|
| One easing | `[0.85, 0, 0.15, 1]` — always, no exceptions |
| No setTimeout | Never drive animation with setTimeout or setInterval |
| No crossfades | We cut, slice, stamp. Not fade. |
| Scroll-linked | `useScroll + useTransform` for parallax. No timers. |
| GPU only | All animation on `transform`, `opacity`, `clip-path`. Nothing that triggers layout. |
| Stagger | `0.06–0.08s` between list items. One metronome tempo. |
| Once | `viewport={{ once: true, margin: "-100px" }}` on all scroll-triggered reveals |
| Reduced motion | Add `@media (prefers-reduced-motion: reduce)` that disables marquee + ticker |

---

## 8. CONTENT DATA (SOURCE OF TRUTH)

### Personal
- Name: **Siddhant Vashisth**
- Location: JUET Guna, Madhya Pradesh, India
- Coordinates: N 24.6471° / E 77.3119°
- Year: B.Tech CSE, 3rd year, graduating 2027
- Email: siddhant.vashisth@juet.ac.in

### Achievements
- **HackNITR 7.0**: Rank 01 / 6,200+ participants, 20+ countries
- **HACKSAGON 2025**: First Runner-Up
- **Smart India Hackathon 2024**: Finalist
- **DevFest Guna**: Best UI Engineering

### Projects
- **Pashu Raksha**: IoT livestock health monitoring
- **ARound You**: AR social app (Unity, ARCore/ARKit)
- **TravelGo**: AI travel platform

### Internships
- Trustique Assists Pvt. Ltd. — Team Lead, 15–18 members
- Skill Dzire — ML/Python Engineer

### Metrics
- 6,200+ participants outranked
- 30% platform user growth (Trustique)
- 65% infra cost reduction
- 400+ students onboarded (JUET DevNet)

---

## 9. ABSOLUTE NON-GOALS

The site will NEVER:
- Use a purple-to-pink gradient
- Use a glassmorphism card
- Use a hero video background
- Use rounded corners (`border-radius: 0` everywhere)
- Use more than 2 accent colors
- Use an exclamation mark in any copy
- Animate on a `setTimeout` loop
- Apologize for being loud

---

## 10. QUALITY CHECK — BEFORE SUBMITTING

After building, verify:
- [ ] `cursor: crosshair` on body
- [ ] Font smoothing is OFF (`-webkit-font-smoothing: none`)
- [ ] `border-radius` is 0 everywhere
- [ ] Yellow appears ONLY on: interactive hover states, metrics, CTAs, the marquee, awards section background, divider slabs, scroll progress bar
- [ ] Hero diagonal slice reveals correctly (yellow panel exits up, white exits down)
- [ ] Per-letter animation on "SIDDHANT" with `scaleX: 0.5` entrance
- [ ] Marquee runs at exactly `25s linear infinite`
- [ ] Live IST clock in Nav
- [ ] ScrollProgress bar spring-driven (not linear)
- [ ] All borders `2px solid white` (not 1px, not grey)
- [ ] No images used anywhere on the index page
- [ ] `::selection` is yellow/black
- [ ] Noise overlay is `position: fixed` at `z-index: 100`, `pointer-events: none`

---

*This prompt is the complete specification. Build exactly this. The design doc's thesis: "A portfolio should not look like a portfolio. It should look like a piece of industrial signage that happens to render in a browser."*
