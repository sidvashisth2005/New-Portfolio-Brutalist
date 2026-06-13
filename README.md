# ⚡ SIDDHANT VASHISTH — DIGITAL BRUTALIST PORTFOLIO
### Engineered Telemetry Signage · React 19 · TanStack Start · Tailwind v4 · R3F

---

A developer portfolio should not look like a generic corporate landing page. This is a piece of industrial signage rendered in a browser—sharp, confidently empty, and mechanically alive. Every pixel justifies itself by carrying either *information* or *rhythm*. Nothing exists for decoration.

This repository contains the complete source code for **Siddhant Vashisth's** interactive portfolio, showcasing international hackathon wins, B.Tech CSE credentials, and consulting experience.

---

## 🛠️ TECH STACK

- **Core**: [React 19](https://react.dev/) & [Vite 7](https://vite.dev/)
- **Routing & SSR**: [TanStack Start v1](https://tanstack.com/router/v1/docs/start/overview)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Native OKLCH color spaces, no config files)
- **3D Engine**: [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) / [Drei](https://github.com/pmndrs/drei)
- **Motion & Transitions**: [Framer Motion](https://www.framer.com/motion/)

---

## 🎨 THE DESIGN SYSTEM (THE OBSIDIAN RULE)

To preserve a raw, high-contrast visual identity, the site follows strict visual constraints:

- **Strict Color Tokens**:
  - **Background**: Near-pure black (`oklch(0.04 0 0)` / `#000000`)
  - **Foreground**: Near-pure white (`oklch(0.98 0 0)` / `#FFFFFF`)
  - **Accent**: Neon yellow (`oklch(0.97 0.21 110)` / `#FFFF00`) — *reserved exclusively for interactive hovers, metrics, and indicators*.
- **Zero Border-Radius**: Brutalism has no rounded corners. `--radius: 0` is globally enforced.
- **No Lie Elements**: Drop shadows, blur filters, and gradients are forbidden. Faking light is prohibited.
- **Raw Typography**: 
  - **Display (Inter)**: Extrabold / 900 tracking at `-0.06em` to create block-like letters that *kiss*.
  - **Mono (JetBrains Mono)**: Uppercase, tracking `0.2em` at `10px` for all metadata coordinates, indices, timestamps, and details.
- **Crosshair Cursor**: Fixed globally (`cursor: crosshair`) to reinforce the surveying/telemetry metaphor.
- **Analog SVG Grain**: A 6%-opacity fixed fractal-noise plate layered at the root screen layer to prevent color banding and add a subtle analog screen texture.

---

## 🪐 KEY SYSTEMS & ARCHITECTURE

### 1. 3D WebGL Sigil Canvas & Telemetry
In the Hero section, a transparent WebGL overlay renders an abstract interactive sigil consisting of:
- **5 interlocking metal beams** (`metalness: 1, roughness: 0.32`)
- **6 hexagonal glass crystal shards** (`ior: 1.45, chromaticAberration: 0.06`)
- **1 glowing central point-light source** creating dynamic specular highlights.

#### ⚡ 60FPS Ref-Telemetry
To avoid heavy React re-renders that would stutter page animations, the coordinates display in the Hero is driven directly via a DOM ref:
1. R3F's `useFrame` hook calculates changing Lat/Lng telemetry based on state pointers, scroll values, and camera angles.
2. Updates are written directly to `coordsRef.current.innerText` bypassing the React state cycle completely to maintain a steady 60FPS.

### 2. Motion Grammar (The Guillotine Curve)
Brutalist motion does not fade; it **cuts, slices, and stamps**. Every transition utilizes a single acceleration curve:
```typescript
const EASE = [0.85, 0, 0.15, 1]; // cubic-bezier(0.85, 0, 0.15, 1)
```
Transitions feature diagonal slice polygon masks, left-to-right clip-path wipes (similar to printer heads), and staggered character snaps.

### 3. Outcomes-Oriented Sections
- **Projects**: Clean horizontal rows displaying category and impact metrics. Hovering triggers a left-to-right yellow wipe panel that inverts typography, and opens a details drawer.
- **Skills Matrix**: A split-screen interaction. Toggling skills in the left panel triggers an `AnimatePresence` update in the right-hand outcome inspector detail card.
- **Custom Podcast Player**: A fully functional custom audio controller playing the owner's intro path with a reactive equalizer.
- **Milestone Gallery**: An infinite horizontal marquee containing achievements that change from grayscale to color on hover.

---

## 🚀 DEVELOPER SETUP

Get the repository running locally on your machine:

### 1. Install Dependencies
Make sure you have Node.js or Bun installed.
```bash
npm install
# or
bun install
```

### 2. Start Local Server
Launches the development client with hot reload active.
```bash
npm run dev
# or
bun dev
```
Open `http://localhost:8080/` in your browser.

### 3. Compile Production Bundle
Builds SSR assets and client bundle.
```bash
npm run build
```

---

## 📄 VERIFICATION PROTOCOLS

To maintain the design integrity during future adjustments, check:
- [ ] No rounded corners are present.
- [ ] Yellow highlights are used only on interactive elements, marquee bands, metrics, and divider blocks.
- [ ] All page borders are exactly `2px solid white` (no grey dividers).
- [ ] Selection highlight color remains `#FFFF00` with black text.
- [ ] No raster images are used on the index landing page.
- [ ] The live IST clock in the header works.
- [ ] Performance target: Lighthouse score >= 95.