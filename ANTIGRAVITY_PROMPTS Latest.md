# ANTIGRAVITY PORTFOLIO — COMPLETE PROMPT SEQUENCE
## Siddhant Vashisth · Digital Brutalism · Black / White / Yellow

> Paste prompts ONE AT A TIME in order. Verify preview after each before moving on.
> Source of truth: README.md in your project root.

---

## MASTER CONSTRAINTS (read before every prompt)

```
DESIGN LAWS — NON-NEGOTIABLE:
- Colors: oklch(0.04 0 0) black · oklch(0.98 0 0) white · oklch(0.97 0.21 110) yellow ONLY
- No gradients. No drop shadows. No blur. No additional accent colors.
- No border-radius anywhere (--radius: 0 globally enforced).
- Separators are ONLY: border-2 border-white (solid 2px white lines).
- Typography: Inter/Helvetica (display, font-black) + JetBrains Mono (metadata, 10px, uppercase, tracking-[0.2em]).
- Grid: 12-column (grid grid-cols-12 gap-5 px-5) across all content sections.
- Section anatomy: left col-span-3 mono index label · right col-span-9 display content.
- All easing: cubic-bezier(0.85, 0, 0.15, 1) — the Guillotine Curve.
- Cursor: crosshair globally (already in CSS).
- Font smoothing: geometricPrecision, -webkit-font-smoothing bypassed.
- anime.js is installed. Import as: import anime from 'animejs'
- prefers-reduced-motion: skip all anime.js animations, render at final state.
```

---

## PROMPT 1 — Install anime.js + Global Setup

```
Install animejs: run `npm install animejs` and add it to package.json dependencies.

Create a shared utility file at src/lib/anime-utils.ts with the following:

export const GUILLOTINE = 'cubicBezier(0.85, 0, 0.15, 1)';

export const GLYPHS = '█▓▒░│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌';

export function glitchText(
  element: HTMLElement,
  finalText: string,
  duration = 300
): void {
  const chars = finalText.split('');
  const startTime = performance.now();
  const interval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const resolvedCount = Math.floor(progress * chars.length);
    const display = chars.map((char, i) => {
      if (i < resolvedCount) return char;
      if (char === ' ') return ' ';
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }).join('');
    element.textContent = display;
    if (progress >= 1) clearInterval(interval);
  }, 40);
}

export function useReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

Also create src/lib/content.ts with all site data:

export const profile = {
  name: 'SIDDHANT VASHISTH',
  nameLines: ['SIDDHANT', 'VASHISTH'],
  tagline: 'Business strategist, builder, and sole pitcher behind six-plus hackathon stages.',
  subTagline: 'I turn raw market signal into product narrative — across AgriTech, AR, and AI.',
  location: 'GUNA, MADHYA PRADESH, IN',
  coords: { lat: 24.6471, lng: 77.3119 },
  availability: 'OPEN · Q4 2026',
  email: 'siddhantvashisth05@gmail.com',
  phone: '+91-88715-92579',
  linkedin: 'https://linkedin.com/in/siddhantvashisth',
  github: 'https://github.com/siddhantvashisth',
};

export const stats = [
  { value: 6200, display: '6,200+', label: 'COMPETITORS OUTRANKED' },
  { value: 20,   display: '20+',    label: 'COUNTRIES REACHED' },
  { value: 6,    display: '6+',     label: 'HACKATHON PITCHES' },
  { value: 100,  display: '100%',   label: 'ON-TIME DELIVERY' },
];

export const education = {
  institution: 'Jaypee University of Engineering and Technology',
  degree: 'B.Tech · Computer Science and Engineering',
  period: 'JUL 2023 — 2027',
  cgpa: '7.5',
};

export const certifications = [
  'Machine Learning — Skill Dzire',
  'Flutter Development — Trustique',
  'Google Cloud Platform (GCP)',
];

export const experience = [
  {
    period: 'JUN 2025 — AUG 2025',
    company: 'Trustique Assists Pvt. Ltd.',
    role: 'Talent Acquisition & BD Intern',
    location: 'LUCKNOW, UP',
    bullets: [
      'Sourced, screened, and onboarded 20+ interns across multiple colleges; evaluated candidates on technical aptitude and behavioural fit.',
      'Promoted to Team Lead; directed 3 cross-functional teams (15–18 members), achieving 100% on-time delivery.',
      'Ran discovery sessions to define a B2B marketplace app; drove 30% growth in platform user base.',
    ],
  },
  {
    period: 'DEC 2024 — JAN 2025',
    company: 'Skill Dzire',
    role: 'Data Analytics & Machine Learning Intern',
    location: 'REMOTE',
    bullets: [
      'Improved ML classification model accuracy by 15% through data cleaning and EDA in Python and MS Excel.',
    ],
  },
];

export const projects = [
  {
    index: '01',
    title: 'LIVESTOCK MONITORING SYSTEM',
    category: 'IOT & AI AGRITECH',
    tags: ['IoT', 'Python', 'Web App', 'Firmware'],
    awards: ['HackNITR 7.0 — RANK 1', 'HACKSAGON — FIRST RUNNER-UP'],
    github: '#',
    bullets: [
      'Built dual-component solution — IoT hardware (Land Rover + multi-sensor wearable) and software (web app, firmware) for real-time livestock health monitoring across 100+ animals per unit.',
      'Achieved ~65% cost reduction (Rs. 60,000 vs Rs. 2–3 lakh/head); benchmarked global competitors and CAGR data; designed product launch strategy and ROI case for farmer and insurer segments.',
    ],
  },
  {
    index: '02',
    title: 'AROUND YOU',
    category: 'AR SOCIAL MEDIA & TOURISM APP',
    tags: ['ARCore', 'Firebase', 'Android Studio'],
    awards: [],
    github: '#',
    bullets: [
      'Identified first-to-market gap in AR social and tourism; integrated Map Tiles API with ARCore for geo-tagged 3D memory sharing across multiple devices.',
      'Prioritized features via user behaviour data; built the product discovery pitch from competitive landscape analysis.',
    ],
  },
  {
    index: '03',
    title: 'TRAVELGO',
    category: 'AI TRAVEL STRATEGY PLATFORM',
    tags: ['Hugging Face', 'TripAdvisor API', 'Python'],
    awards: [],
    github: '#',
    bullets: [
      'Mapped competitive landscape to identify travel planning fragmentation; engineered a full-stack platform integrating 4 APIs.',
      'Delivered AI-driven itinerary generation, hotel suggestions, and budget planning in a unified interface.',
    ],
  },
  {
    index: '04',
    title: 'SUPERSTORE MARKETING CONSULTANCY',
    category: 'BD & GROWTH STRATEGY',
    tags: ['Market Research', 'BD Strategy', 'Client Engagement'],
    awards: [],
    github: '#',
    bullets: [
      'Diagnosed a local superstore\'s low-footfall challenge through customer segment mapping, sales pattern analysis, and competitor benchmarking across 3+ product categories.',
      'Client implemented all 3 recommendations — measurable revenue uplift and 25%+ increase in customer footfall.',
    ],
  },
];

export const podcastEpisodes = [
  { ep: 'EP 01', title: 'What BD Actually Means in a Startup', duration: '32 MIN', url: '#' },
  { ep: 'EP 02', title: 'Pitching to Judges Who\'ve Seen It All', duration: '28 MIN', url: '#' },
  { ep: 'EP 03', title: 'How I Built a Team at 19 and Led It', duration: '24 MIN', url: '#' },
  { ep: 'EP 04', title: 'The Research → Product → Pitch Pipeline', duration: '35 MIN', url: '#' },
];

export const galleryItems = [
  { index: '01', title: 'HACKNIT 7.0', meta: 'RANK 1 · 6,200+ · 20 COUNTRIES', description: 'International hackathon. Built dual-component IoT livestock monitoring system. Pitched commercialisation strategy, competitive analysis, and ROI case to a global jury. Sole presenter for the team.' },
  { index: '02', title: 'HACKSAGON 2025', meta: 'FIRST RUNNER-UP · NATIONAL', description: 'National hackathon focused on AgriTech innovation. Outlined go-to-market strategy and financial viability analysis to a domain expert panel. Recognised for Product Thinking.' },
  { index: '03', title: 'BHOPAL VIGYAN MELA 2024', meta: '4 PROJECTS · 4 DAYS · NATIONAL', description: '4-day national science exhibition. Showcased 4 projects across domains. Built cross-industry professional networks and represented JUET at national stage.' },
  { index: '04', title: 'TACHYON 2025', meta: 'ORGANIZER · 2,000+ ATTENDEES', description: 'University annual tech-fest. Oversaw logistics, sponsorship outreach, and partner coordination. Event reached 2,000+ attendees.' },
  { index: '05', title: 'UNIVERSITY IDEATHON 2024', meta: '1ST PLACE · 30+ TEAMS', description: 'University-level ideathon. Defended a structured business case against 30+ competing teams. Won 1st Place.' },
  { index: '06', title: 'JUET NATIONAL CONFERENCE', meta: 'PUBLISHED · 100+ ATTENDEES', description: 'Authored and presented a research paper on Social Sciences and Library Sciences. Communicated findings to an audience of 100+ attendees.' },
  { index: '07', title: 'OFF-STAGE LEADERSHIP', meta: 'JOINT SECRETARY · VRARMR CLUB', description: 'Joint Secretary of VRARMR Club at JUET — led a 50+ member club, ran screening interviews for 20+ candidates. Active across Bitwise, Mozilla, NSS, and BIS clubs.' },
];

export const skillContributions: Record<string, string> = {
  'Business Development': 'Led BD at Trustique; drove 30% user growth through market intelligence and partner discovery sessions.',
  'Market Research': 'Benchmarked global competitors and CAGR data for Livestock Monitoring System at HackNITR 7.0.',
  'ROI Analysis': 'Built ROI case for farmer and insurer segments; presented to global jury at HackNITR 7.0.',
  'Go-to-Market Strategy': 'Designed product launch strategy for IoT AgriTech product; outlined GTM at HACKSAGON 2025.',
  'Lead Generation': 'Sourced and onboarded 20+ interns across multiple colleges at Trustique.',
  'Flutter': 'Built mobile application layer during Trustique internship.',
  'Python': 'Improved ML classification accuracy by 15% at Skill Dzire through Python-based EDA.',
  'IoT': 'Engineered IoT hardware component — Land Rover rover + multi-sensor wearable — for livestock health monitoring.',
  'Git/GitHub': 'Version control across all 4 shipped projects; collaborative workflows at Trustique.',
  'Android Studio': 'Development environment for ARound You AR social media app.',
  'SQL': 'Data querying and analysis tasks during Skill Dzire data analytics internship.',
  'MS Excel': 'Data cleaning and EDA for ML model at Skill Dzire; sales pattern analysis for Superstore consultancy.',
  'MS PowerPoint': 'Pitch decks across 6+ hackathon stages; structured business case for University Ideathon.',
  'Agile Methodology': 'Directed 3 cross-functional teams (15–18 members each) using Agile practices at Trustique.',
};

export const skills = [
  { number: '01', category: 'BUSINESS', items: ['Business Development','Market Research','ROI Analysis','Go-to-Market Strategy','Lead Generation'] },
  { number: '02', category: 'TECHNICAL', items: ['Flutter','Python','IoT','Git/GitHub','Android Studio'] },
  { number: '03', category: 'DATA & TOOLS', items: ['SQL','MS Excel','MS PowerPoint','Agile Methodology'] },
];

export const awards = [
  { index: '01', title: 'Rank 1 — HackNITR 7.0', scope: 'INTERNATIONAL', description: 'Outperformed 6,200+ participants from 20+ countries; sole presenter — pitched commercialisation strategy, competitive analysis, and product ROI case to global jury.' },
  { index: '02', title: 'First Runner-Up — HACKSAGON 2025', scope: 'NATIONAL', description: 'Recognised for Product Thinking in AgriTech; outlined go-to-market strategy and financial viability analysis to domain expert panel.' },
  { index: '03', title: 'Winner — University Ideathon 2024', scope: 'UNIVERSITY', description: '1st Place; defended structured business case against 30+ teams.' },
  { index: '04', title: 'Bhopal Vigyan Mela 2024', scope: 'NATIONAL', description: 'Team Lead at 4-day national science exhibition; showcased 4 projects and built cross-industry professional networks.' },
  { index: '05', title: 'Published Research — JUET Conference', scope: 'INSTITUTIONAL', description: 'Authored paper on Social Sciences and Library Sciences; communicated findings to 100+ attendees.' },
];

Do not render anything yet. Just install anime.js and create these two files. Confirm when done.
```

---

## PROMPT 2 — Hero Section Enhancement (anime.js letter reveal)

```
Enhance Hero.tsx with anime.js animations. Do NOT change any existing structure,
3D sigil, StarField, telemetry coordinates, or layout. Only add animations.

Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

1. NAME LETTER REVEAL on mount:
   - Split 'SIDDHANT' and 'VASHISTH' each into individual letter spans.
   - Wrap each letter in an overflow-hidden div (vertical shutter — per README §3.2).
   - On component mount (useEffect), if !useReducedMotion():
     anime({
       targets: '.hero-letter',
       translateY: ['110%', '0%'],
       scaleX: [0.5, 1],
       opacity: [0, 1],
       duration: 700,
       delay: anime.stagger(50, { start: 200 }),
       easing: GUILLOTINE,
     });
   - If useReducedMotion(): set all letters to final state immediately.

2. TAGLINE CLIP-PATH WIPE on mount (after name, 600ms delay):
   anime({
     targets: '.hero-tagline',
     clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
     opacity: [0, 1],
     duration: 800,
     delay: 800,
     easing: GUILLOTINE,
   });
   Add class 'hero-tagline' to the tagline paragraph element.

3. STATS COUNTER on scroll entry (About section stats, NOT hero):
   Skip this for now — handled in Prompt 3.

4. META LINES (location, availability) — slice-in from bottom:
   anime({
     targets: '.hero-meta',
     translateY: ['20px', '0px'],
     opacity: [0, 1],
     duration: 500,
     delay: anime.stagger(80, { start: 1000 }),
     easing: GUILLOTINE,
   });
   Add class 'hero-meta' to the location and availability lines.

All animations must check useReducedMotion() and skip if true.
```

---

## PROMPT 3 — About Section: Fill Content + anime.js Counters

```
Update About.tsx with full content from src/lib/content.ts.
Import { stats, education, certifications, profile } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

LAYOUT (follows README §2 12-col grid):
- Section starts with border-t-2 border-white and py-32.
- Left col-span-3: mono index label — font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
  Text: (01) ABOUT / MANIFESTO
  Make this sticky: sticky top-8
- Right col-span-9: all content.

CONTENT in right column:

1. BIO BLOCK:
   Display heading (font-black text-[4vw] tracking-[-0.06em] uppercase leading-none):
   "PITCHER'S MIND. BUILDER'S HANDS."

   Body text below (font-display text-[15px] text-white/70 leading-relaxed, max-w-xl):
   "Fresher with experience in BD, recruitment, and market research; international hackathon 
   champion (Rank 1 of 6,200+) recognized for pitching product strategy across AgriTech, AR, 
   and AI. Delivered real-world consulting outcomes across 6+ national and international competitions."

2. EDUCATION + CERTS (two columns, mt-16):
   Left: Education label in mono yellow. Then institution, degree, period, CGPA.
   Right: Certifications label in mono yellow. Then the 3 certifications as a list.
   All labels: font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400 mb-4
   All values: text-white/70 text-[14px]

3. STATS GRID (mt-16, grid grid-cols-2 md:grid-cols-4 gap-0, border-t-2 border-white):
   Each stat cell: border-r-2 border-white (last: no right border), p-8.
   - Large number: font-black text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.06em] text-white
     Give each number element a unique ref or class: 'stat-value' with data-target="{value}"
   - Label below: font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-2

anime.js COUNTER on scroll entry:
   Use IntersectionObserver on the stats grid (threshold: 0.5).
   When it enters viewport, if !useReducedMotion():
   stats.forEach((stat, i) => {
     const el = document.querySelectorAll('.stat-value')[i];
     const target = stat.value;
     anime({
       targets: { value: 0 },
       value: target,
       duration: 1400,
       delay: i * 120,
       easing: GUILLOTINE,
       round: 1,
       update: function(anim) {
         el.textContent = Math.round(anim.animations[0].currentValue).toLocaleString() + (stat.display.includes('+') ? '+' : stat.display.includes('%') ? '%' : '');
       }
     });
   });
   Observer should only fire once (disconnect after triggering).
```

---

## PROMPT 4 — Experience Section: Full Build

```
Create or fully replace Experience.tsx with the following. 
Import { experience } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

LAYOUT (12-col grid, matches README §2):
- border-t-2 border-white, py-32
- Left col-span-3: sticky mono label "(02) EXPERIENCE / TRAIL", font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400, sticky top-8
- Right col-span-9: experience entries

EACH EXPERIENCE ENTRY:
- border-t border-white/20, pt-12, pb-12 (border-t-2 border-white on first entry)
- Period: font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400 — e.g. "JUN 2025 — AUG 2025"
- Company name: font-black text-[clamp(1.8rem,3.5vw,3rem)] tracking-[-0.06em] uppercase text-white mt-2
- Role + Location on same line: font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1
  Format: "TALENT ACQUISITION & BD INTERN · LUCKNOW, UP"
- Bullet points: mt-6, each bullet is a row with:
  - A 2px yellow square (w-1.5 h-1.5 bg-yellow-400 mt-[6px] flex-shrink-0) on the far left
  - Text: font-display text-[14px] text-white/70 leading-relaxed ml-4

PROMO CALLOUT (Trustique entry only):
After bullet 2 of Trustique, add a standalone callout line:
  font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
  Text: "↑ PROMOTED TO TEAM LEAD — MID INTERNSHIP"
  This should visually stand apart from the bullets.

anime.js — CLIP-PATH ROW REVEAL on scroll:
Use IntersectionObserver (threshold: 0.2) on the experience section wrapper.
When it enters, if !useReducedMotion():
anime({
  targets: '.experience-entry',
  clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
  opacity: [0, 1],
  duration: 600,
  delay: anime.stagger(150),
  easing: GUILLOTINE,
});
Add class 'experience-entry' to each entry wrapper div.
```

---

## PROMPT 5 — Projects Section: Complete Data + anime.js Row Reveal

```
Update Projects.tsx with full project data from src/lib/content.ts.
Import { projects } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

Keep ALL existing hover behavior exactly as documented in README §5.3:
- Yellow panel wipes left-to-right on row hover (w-0 → w-full, text inverts to black).
- Expanding detail bullets appear on hover.
- GitHub button dual-state (white/black depending on hover context).
DO NOT break any of this.

ADD these to each project row from content.ts:
- index: displayed as font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400 (or text-black when hovered)
- title: font-black text-[clamp(1.5rem,3vw,2.5rem)] tracking-[-0.06em] uppercase
- category: font-mono text-[10px] uppercase tracking-[0.2em] text-white/50
- tags: small mono chips, text-[9px] uppercase tracking-[0.2em], border border-white/30, px-2 py-0.5, text-white/50. On row hover: border-black/30, text-black/50.
- awards (if present): font-mono text-[9px] uppercase tracking-[0.2em] text-yellow-400. On hover: text-black. Show above the title as a pre-label.

anime.js — CLIP-PATH STAGGER REVEAL on scroll entry:
IntersectionObserver (threshold: 0.15) on the projects section.
When it enters, if !useReducedMotion():
anime({
  targets: '.project-row',
  clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
  opacity: [0, 1],
  duration: 500,
  delay: anime.stagger(120),
  easing: GUILLOTINE,
});
Add class 'project-row' to each project row's outer wrapper.
Observer fires once only.
```

---

## PROMPT 6 — Podcast Section: Complete Data + Equalizer Enhancement

```
Update Podcast.tsx with episode data from src/lib/content.ts.
Import { podcastEpisodes, profile } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

LAYOUT (12-col grid):
- border-t-2 border-white, py-32
- Left col-span-3: sticky mono label "(04) PODCAST / PITCHED.", text-yellow-400
  Below label: Channel name "PITCHED." in font-black text-[2rem] tracking-[-0.06em] text-white mt-4
  Below: "BD · STRATEGY · BUILDER LIFE" in font-mono text-[9px] uppercase tracking-[0.2em] text-white/40
- Right col-span-9: player + episode list

PLAYER BLOCK (keep existing player if functional, enhance):
- Player wrapper: border-2 border-white p-6
- Show currently playing episode title in font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
- Progress bar track: h-0.5 bg-white/20. Fill: bg-yellow-400. Seek on click.
- Controls row: PLAY/PAUSE in font-black text-[11px] uppercase · SKIP ±15s · time display in font-mono
- Volume: a simple range input styled with accent-yellow

EQUALIZER BARS — replace existing CSS animation with anime.js:
7 bars total. Each bar: w-1 bg-yellow-400. Container: flex gap-1 items-end h-8.
When audio is playing, run this anime.js loop (if !useReducedMotion()):
function animateEqualizer() {
  anime({
    targets: '.eq-bar',
    height: () => `${anime.random(4, 32)}px`,
    duration: 300,
    delay: anime.stagger(40),
    easing: 'easeInOutSine',
    complete: animateEqualizer,
  });
}
Start animateEqualizer() when play begins. Stop (reset bars to 4px height) on pause.
If useReducedMotion(): bars stay static at 16px height.

EPISODE LIST (below player):
Map over podcastEpisodes. Each episode row:
- border-t border-white/20, py-5, flex items-center justify-between
- Left: EP number in font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400, w-16
- Center: Episode title in font-display text-[15px] text-white, hover: text-yellow-400 transition-colors duration-150
- Right: Duration in font-mono text-[10px] uppercase tracking-[0.2em] text-white/40
- On hover of full row: background slides in from left (yellow, w-0→w-full, text inverts to black) — same pattern as Projects.
- Clicking an episode loads it into the player.
```

---

## PROMPT 7 — Gallery Section: Full Build from Scratch

```
Create src/components/portfolio/Gallery.tsx from scratch.
This section does NOT exist in the README — build it to match the site's brutalist grammar.
Import { galleryItems } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

LAYOUT:
- border-t-2 border-white, py-32
- Left col-span-3: sticky mono label "(05) GALLERY / FIELD NOTES", text-yellow-400, sticky top-8
- Right col-span-9: 7 gallery cards

EACH CARD (closed state):
- Full-width row. border-2 border-white. p-8. mb-0 (cards touch, borders merge).
- Top row: index in font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400 (left) + meta string right: font-mono text-[10px] uppercase tracking-[0.2em] text-white/40
- Title: font-black text-[clamp(1.8rem,3.5vw,3rem)] tracking-[-0.06em] uppercase text-white mt-3
- Description: initially hidden (max-h-0, overflow-hidden, opacity-0)
- On hover: yellow panel wipes left-to-right behind the card (position: absolute, inset-0, bg-yellow-400, scaleX 0→1 from left, transform-origin left). Text inverts to black. Description slides down (max-h expands, opacity 1).

ON CLICK — expand to full screen:
1. anime.js sequence:
   anime({
     targets: clickedCard,
     scale: [1, 1.02],
     duration: 150,
     easing: GUILLOTINE,
   }).finished.then(() => {
     // Show overlay
   });
2. Overlay: position fixed, inset 0, z-50, bg-black.
   Entry animation: opacity 0→1, 200ms.
3. Overlay layout: grid grid-cols-2 h-screen.
   Left half: large index number (font-black text-[20vw] tracking-[-0.06em] text-white/10 absolute) + event title (font-black text-[4vw] tracking-[-0.06em] uppercase text-white) + placeholder frame (border-2 border-white/30, aspect-video, flex items-center justify-center, font-mono text-[10px] text-white/30: "[ PHOTO COMING SOON ]").
   Right half: border-l-2 border-white p-12.
     - Scope/meta in font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
     - Full description in font-display text-[15px] text-white/70 leading-relaxed mt-4
     - Photo carousel placeholder: flex gap-4 mt-8. 3 placeholder frames (border border-white/20, w-24 h-16, flex items-center justify-center, font-mono text-[8px] text-white/30: "IMG")
4. Close: ESC key or ✕ button top-right (font-mono text-[10px] uppercase tracking-[0.2em] text-white/50, hover text-yellow-400). Click reverses: overlay opacity 1→0, 200ms.

anime.js — STAGGER REVEAL on scroll:
IntersectionObserver (threshold: 0.1) on gallery section.
anime({
  targets: '.gallery-card',
  clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  opacity: [0, 1],
  duration: 500,
  delay: anime.stagger(80),
  easing: GUILLOTINE,
});
Add class 'gallery-card' to each card wrapper. Observer fires once.
```

---

## PROMPT 8 — Skills Section: Fill Contributions + anime.js Panel Swap

```
Update Skills.tsx with full content from src/lib/content.ts.
Import { skills, skillContributions } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

Keep the existing split-screen architecture (README §5.5):
- Left panel: skill category cards. Right panel: detail view updating on hover/select.
DO NOT change the split-screen structure.

LEFT PANEL — skill category cards (per category in skills array):
- Each category card: border-2 border-white p-6 mb-0 (stacked, borders merge), cursor-pointer
- Category number: font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
- Category name: font-black text-[1.5rem] tracking-[-0.06em] uppercase text-white mt-1
- Skill items list below: each item is a row:
  - Skill name: font-display text-[14px] text-white/70 flex-1
  - Yellow dot on right: w-1.5 h-1.5 bg-yellow-400 (visible only on hover of that skill row)
  - On hover: skill name → text-yellow-400
  - border-b border-white/10 between items
- On hover of a SKILL ITEM: update the right panel with that skill's contribution text.
- Active category card gets a filled yellow background (bg-yellow-400) with text-black.

RIGHT PANEL — detail view:
- border-l-2 border-white h-full p-8 sticky top-0
- Active skill name: font-black text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.06em] uppercase text-white
- Contribution text: font-display text-[15px] text-white/70 leading-relaxed mt-6
- Category tag: font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400 mt-4

anime.js — PANEL CONTENT SWAP when skill changes:
When hovered skill changes, if !useReducedMotion():
// Exit current content
anime({
  targets: '.skill-detail-content',
  clipPath: ['inset(0 0% 0 0)', 'inset(0 100% 0 0)'],
  duration: 180,
  easing: GUILLOTINE,
  complete: () => {
    // Update content in state
    // Then enter new content
    anime({
      targets: '.skill-detail-content',
      clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
      duration: 200,
      easing: GUILLOTINE,
    });
  }
});
Add class 'skill-detail-content' to the right panel content wrapper.
Default state (no skill hovered): show first skill from first category.
```

---

## PROMPT 9 — Awards Section: Full Build from Scratch

```
Create src/components/portfolio/Awards.tsx from scratch.
This section does NOT exist in the README — build it to match the brutalist grammar.
Import { awards } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion, glitchText } from 'src/lib/anime-utils'.

LAYOUT:
- border-t-2 border-white, py-32
- Left col-span-3: sticky mono label "(07) AWARDS / RECEIPTS", text-yellow-400, sticky top-8
- Right col-span-9: 5 award rows

EACH AWARD ROW:
- Full-width, border-b-2 border-white, py-8, cursor-default
- First row: border-t-2 border-white also (top border on first)
- Row layout: grid grid-cols-12 gap-5 items-start
  - col-span-1: index number — font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400
    Add class 'award-index'. On row hover: trigger glitchText(element, originalText, 250).
  - col-span-2: scope badge — font-mono text-[9px] uppercase tracking-[0.2em] text-white/30, border border-white/20, px-2 py-1, self-start
  - col-span-6: award title — font-black text-[clamp(1.2rem,2.5vw,2rem)] tracking-[-0.06em] uppercase text-white
    Add class 'award-title'. On row hover: trigger glitchText(element, originalText, 300).
  - col-span-3: description — font-display text-[12px] text-white/50 leading-relaxed

HOVER STATE on full row:
- Yellow panel wipes left-to-right behind row (same as Projects pattern).
- When yellow panel is active: index → text-black, title → text-black, scope → border-black/20 text-black/40, description → text-black/60.
- glitchText fires on mouseenter for index number and title.
- On mouseleave: text resolves back to original (glitchText fires again with short duration 150ms).

SPECIAL TREATMENT for Award 01 (HackNITR — Rank 1):
- Title text is 1.5× larger than other awards: text-[clamp(1.8rem,3.5vw,2.8rem)]
- Yellow accent bar: 4px solid yellow on the left edge of the row (border-l-4 border-yellow-400)

anime.js — STAGGER REVEAL on scroll:
IntersectionObserver (threshold: 0.2).
anime({
  targets: '.award-row',
  translateX: ['-24px', '0px'],
  opacity: [0, 1],
  duration: 500,
  delay: anime.stagger(100),
  easing: GUILLOTINE,
});
Add class 'award-row' to each row. Observer fires once.
```

---

## PROMPT 10 — Contact Section: Complete + anime.js Form

```
Update Contact.tsx with full content. 
Import { profile } from 'src/lib/content.ts'.
Import anime from 'animejs'. Import { GUILLOTINE, useReducedMotion } from 'src/lib/anime-utils'.

LAYOUT:
- border-t-2 border-white, py-32
- Left col-span-3: sticky mono label "(08) CONTACT / SIGNAL", text-yellow-400, sticky top-8
- Right col-span-9: all contact content

HEADING:
font-black text-[clamp(3rem,8vw,7rem)] tracking-[-0.06em] uppercase text-white leading-none
Text: "LET'S BUILD."

SUBTEXT (mt-6):
font-display text-[15px] text-white/60 max-w-lg leading-relaxed
"If you're hiring for business development, growth strategy, or product thinking — or you just want to talk about what's broken in AgriTech — the inbox is open."

CONTACT FORM (mt-12):
Three fields: Name, Message (textarea rows=4), Send button.
Each field wrapper: relative, border-b-2 border-white/30, mb-8.

Input/textarea styling:
  bg-transparent w-full pb-3 pt-1
  font-display text-[15px] text-white placeholder-white/20
  outline-none border-none
  
Animated border on focus:
  Below each field, add a div: position absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-0
  class: 'field-underline'
  On focus: anime({ targets: underlineEl, width: '100%', duration: 300, easing: GUILLOTINE });
  On blur: anime({ targets: underlineEl, width: '0%', duration: 200, easing: GUILLOTINE });

Send button:
  Wrap text in an overflow-hidden relative button.
  Outer: border-2 border-white px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white
  Inner sliding bg: position absolute inset-0 bg-yellow-400 translateY(100%) — slides to translateY(0) on hover.
  Text changes to text-black on hover (same as Projects GitHub button pattern).
  On hover: anime({ targets: slideBg, translateY: '0%', duration: 200, easing: GUILLOTINE });
  On mouseleave: anime({ targets: slideBg, translateY: '100%', duration: 200, easing: GUILLOTINE });
  On submit: window.location.href = 'mailto:siddhantvashisth05@gmail.com?subject=...&body=...' from field values.

RESUME DOWNLOAD BUTTON (mt-4, same styling as send but secondary):
  Text: "DOWNLOAD RESUME →"
  border-2 border-white/30 (dimmer border), same hover slide pattern.
  href="#" for now.

DIRECTORY GRID (mt-16, grid grid-cols-2 gap-0 border-t-2 border-white):
Each cell: border-r-2 border-white (last: no right), border-b-2 border-white, p-8.
  Label: font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2
  Value: font-display text-[14px] text-white. Links in yellow-400 on hover.
Cells: EMAIL · LOCATION · LINKEDIN · GITHUB

FOOTER (mt-16, border-t-2 border-white pt-8):
flex justify-between items-end.
Left: font-mono text-[10px] uppercase tracking-[0.2em] text-white/30
  "© MMXXVI · SIDDHANT VASHISTH"
  "COMPOSED IN GUNA, INDIA"
Right: font-mono text-[10px] uppercase tracking-[0.2em] text-white/20
  "DIGITAL BRUTALISM · V0.4"
  "ENGINEERED, NOT DECORATED."
```

---

## PROMPT 11 — Final Assembly + Wire Everything

```
Wire all sections into the main page route in this exact order:
1. Hero
2. About
3. Experience
4. Projects
5. Podcast
6. Gallery
7. Skills
8. Awards
9. Contact

Ensure the following global elements are present and working:
- Noise overlay (.noise class on body or root div) — already in CSS
- Grid background (.grid-bg) on Hero section only
- crosshair cursor globally (already in CSS)
- ::selection: bg yellow-400, text black (already in CSS)
- Smooth scroll (already: scroll-behavior: smooth on html)
- Scroll progress bar: position fixed top-0 left-0 z-50 h-0.5 bg-yellow-400 width driven by scroll%.
  Animate width via direct style update in scroll listener (no CSS transition on width — set will-change: transform and use scaleX instead: scaleX from 0→1, transform-origin: left).

NAV (verify or build if missing):
- position fixed top-0 left-0 right-0 z-50 border-b-2 border-white bg-black h-[54px]
- flex items-center justify-between px-5
- Left: "SIDDHANT VASHISTH" — font-mono text-[10px] uppercase tracking-[0.2em] text-white
- Center: nav links — font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white gap-8
  Links: ABOUT · EXPERIENCE · PROJECTS · PODCAST · GALLERY · SKILLS · AWARDS · CONTACT
  Active link: text-yellow-400
- Right: "LET'S TALK →" — border border-yellow-400 text-yellow-400 font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2

FINAL VERIFICATION:
- npm run build — zero TypeScript errors
- All 8 sections render in order
- anime.js in package.json dependencies
- No gradients anywhere
- No border-radius anywhere (--radius: 0)
- No additional colors beyond black/white/yellow
- prefers-reduced-motion skips all anime.js animations
- Noise overlay visible (faint texture on black bg)
- Grid background visible in Hero only
- crosshair cursor everywhere
- Selection highlight is yellow/black
```

---

## REFERENCE — Shared EASE curve for all anime.js calls

```typescript
// THE GUILLOTINE CURVE — use on every single anime() call
easing: 'cubicBezier(0.85, 0, 0.15, 1)'

// Or import from src/lib/anime-utils.ts:
import { GUILLOTINE } from 'src/lib/anime-utils';
// then: easing: GUILLOTINE
```

---

## PASTE ORDER

| # | Prompt | What it does | Verify before next |
|---|--------|-------------|-------------------|
| 1 | Install + Content | anime.js + all data | Files exist, no errors |
| 2 | Hero enhancement | Letter reveal, tagline wipe | Animations play on load |
| 3 | About | Full content + stat counters | Counters fire on scroll |
| 4 | Experience | Full build + clip reveal | Both entries render correctly |
| 5 | Projects | Data fill + row reveal | Hover wipe still works |
| 6 | Podcast | Episode data + equalizer | Player functional |
| 7 | Gallery | Full build from scratch | Cards + overlay work |
| 8 | Skills | Contributions + panel swap | Detail view updates on hover |
| 9 | Awards | Full build + glitch hover | Glitch fires on mouseenter |
| 10 | Contact | Form + directory + footer | mailto fires on submit |
| 11 | Assembly | Wire all + nav + progress bar | Build passes, all sections visible |
