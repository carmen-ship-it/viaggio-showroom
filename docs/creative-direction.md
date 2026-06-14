# Creative Direction — Viaggio Digital Showroom

**Experience thesis:** A cinematic product theater for the GAC GS4 MAX — not a dealership website on a kiosk. The customer discovers the vehicle at their own pace, builds trust before desire, and converts when ready — with Viaggio present but never pushing.

**Design lenses applied:**
- **Tesla Experience Designer** — product-first immersion, minimal chrome, stat clarity
- **Apple Retail Designer** — calm orientation, respectful pacing, no pressure
- **Automotive Creative Director** — vehicle as protagonist, lighting-driven drama
- **Luxury Brand Art Director** — restraint, typographic confidence, honest tone

**Inputs:** [asset-acquisition-plan.md](./assets/asset-acquisition-plan.md) · [source-catalog.md](./assets/source-catalog.md) · [screen-map.md](./screen-map.md) · [customer-journey.md](./customer-journey.md) · [pre-phase2-readiness.md](./pre-phase2-readiness.md)

**MVP demo path:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15 (+ S19, S20 overlays)

**Viewport:** 1920×1080 landscape kiosk · readable from 2 m for family groups

---

## Global Visual System

### Experience Principles

| Principle | Expression | Avoid |
|-----------|------------|-------|
| **Product theater** | Full-bleed vehicle imagery; UI floats above, never competes | Grid of small thumbnails as first impression |
| **Calm confidence** | Generous negative space; one focal action per screen | Red sale badges, countdown timers, flashing CTAs |
| **Honest luxury** | Premium materials in UI (glass, depth) without ornament | Gold gradients, faux leather textures, trophy icons |
| **Trust before desire** | Carlos-led surfaces use cooler, steadier palette | Sofía desire styling on trust screens |
| **Self-directed** | Customer chooses path; system suggests, never forces | Auto-advance tours without consent; modal pop-ups |

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `canvas-deep` | `#0A0C10` | Attract, hero, tour player — cinematic dark |
| `canvas-soft` | `#141820` | Trust, compare, economics — readable dark |
| `canvas-light` | `#F5F5F7` | Forms, FAQ accordion content — Apple-like clarity |
| `surface-glass` | `rgba(255,255,255,0.08)` + blur | Stat strips, hot-spot labels, overlays |
| `text-primary` | `#FFFFFF` on dark · `#1D1D1F` on light | Headlines |
| `text-secondary` | `rgba(255,255,255,0.72)` · `#6E6E73` | Body, disclaimers |
| `accent-warm` | `#C8A96E` | Sparingly — warranty seal, key stat highlight (not sale yellow) |
| `accent-trust` | `#4A9B8E` | “Nosotros ganamos” compare badge, trust completion |
| `accent-neutral` | `#8E8E93` | “Ellos ganan” honest compare badge |
| `viaggio-brand` | From `logo-viaggio-full` vector | Header co-brand only |
| `gac-brand` | From `logo-gac-full` vector | Header co-brand only |

No primary red. No green “BUY NOW.” Accent warm is jewelry, not discount.

### Typography

| Role | Typeface direction | Size (kiosk base) | Weight | Notes |
|------|-------------------|-------------------|--------|-------|
| **Display** | Geometric sans (e.g. SF Pro Display, Inter Display) | 56–72 px | 600 | Vehicle name, hero stats — tight tracking `-0.02em` |
| **Headline** | Same family | 36–44 px | 600 | Screen titles, topic headers |
| **Body** | Humanist sans for narration | 22–26 px | 400 | Carlos/Diego/Sofía copy — line-height 1.5 |
| **Stat** | Tabular figures enabled | 28–32 px | 500 | Precio, garantía, consumo — monospace nums |
| **Label** | All caps, wide tracking | 13–15 px | 500 | `MOTOR` · `SEGURIDAD` · `5 AÑOS` — letter-spacing `0.08em` |
| **CTA** | Sentence case | 20–22 px | 500 | *Tocá para empezar* — never ALL CAPS SHOUTING |

**S19 scaling:** Base = M. S = −15%. L = +20%. Minimum body 20 px at L.

**Language:** es-BO. *Tú* default. Diego may use *vos* if Viaggio brand approves.

### Photography & Video Treatment

| Treatment | Rule |
|-----------|------|
| **Color grade** | Slight desaturation (−8%), lifted shadows, cool highlights — unifies GAC press + Viaggio local shots |
| **Crop** | 16:9 hero; never crop wheels or roofline awkwardly |
| **Overlay** | Bottom 40% gradient `canvas-deep` 0% → 85% for text legibility |
| **Video** | Muted default; subtle Ken Burns on stills when `prefers-reduced-motion` |
| **Competitor** | Corolla Cross at same visual weight as GS4 MAX — no thumb-nailing to diminish |

### Motion Language

| Pattern | Duration | Easing | When |
|---------|----------|--------|------|
| **Reveal** | 600 ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Screen enter — content rises 24 px + fade |
| **Hero parallax** | Scroll-linked, max 8% shift | linear | S22 hot-spot layer only |
| **Hot-spot pulse** | 2 s loop, opacity 0.4→1 | ease-in-out | S22 — stops when reduced motion |
| **Crossfade** | 400 ms | ease | Image swaps in tour, compare |
| **Accordion** | 300 ms | ease-out | S25 FAQ |
| **Stat count-up** | 800 ms | ease-out | S22 key stats on first view only |
| **CTA breathe** | 3 s scale 1→1.02 | ease-in-out | S01 only — subtle, not urgent |

**Reduced motion (S19):** Replace parallax, count-up, and video with static hero. Crossfades become instant cuts.

### Layout Grid (1920×1080)

```
┌────────────────────────────────────────────────────────────┐
│  GlobalHeader (72px) — logos, settings, session hint       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Content safe zone: 120px L/R · 48px top · 96px bottom     │
│  (bottom reserves space for contextual CTA, not sticky bar)│
│                                                            │
├────────────────────────────────────────────────────────────┤
│  Contextual CTA zone (80px) — emerges per trust threshold  │
└────────────────────────────────────────────────────────────┘
```

- **Touch targets:** minimum 56×56 px; 64 px for primary CTAs
- **Group viewing:** key copy within center 70% width; nothing critical in outer 15%

### CTA Hierarchy (Global)

| Tier | Style | Copy pattern | When |
|------|-------|--------------|------|
| **Primary** | Filled white on dark · filled dark on light | Action verb + benefit: *Agendá tu prueba* | Post-trust threshold |
| **Secondary** | Ghost / glass outline | Explore: *Explorar libremente* | Always available on hero/hub |
| **Tertiary** | Text link + chevron | Navigate: *Ver garantía* | Inline in content |
| **Soft** | Persona-attributed chip | *¿Tenés dudas? Carlos te explica* | Trust screens |

**Never:** *¡APROVECHÁ!* · *OFERTA LIMITADA* · *EL MEJOR PRECIO* · sticky bar before 2 trust signals.

### Transition Map (Between MVP Screens)

| From → To | Transition |
|-----------|------------|
| S01 → S02 | Video freeze-frame blur → content reveal (600 ms) |
| S02 → S03 | Horizontal slide left, vehicle cards enter staggered 80 ms |
| S03 → S22 | **Cinematic expand** — selected card full-bleeds to hero (800 ms) |
| S22 → S25/S24 | Dark hold; trust content rises from bottom (calm, not alarm) |
| S25 ↔ S24 | Crossfade same plane — trust chapter continuity |
| S24 → S06 | Fade to black 200 ms → tour step 1 reveal (theater curtain) |
| S06 → S08 | Shared media crossfade if same asset; else slide up |
| S08 → S11 | Rational shift — light `canvas-soft` panel slides over hero |
| S11 → S12 | Column reveal — competitor slides in from right 500 ms |
| S12 → S26 | Warm accent `#C8A96E` thread appears in stat strip (desire → economics) |
| S26 → S13 | Recap cards assemble like Apple receipt — sequential 120 ms |
| S13 → S14 | Sheet rise from bottom (48% height), hero dims behind |
| S14 → S15 | Form success checkmark → WhatsApp green only on confirmation icon |
| Any → S19/S20 | Frosted overlay 300 ms; content scales to 0.98 |

---

## Screen-by-Screen Creative Direction

---

### S01 — Attract Loop

**What should the customer feel?**  
**Curiosity** — *something beautiful is waiting; no one will bother me if I walk past.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Floor magnet: GS4 MAX in motion, brand presence without clutter |
| **2. Emotional goal** | Quiet invitation; passersby slow down, don't feel sold to |
| **3. Asset requirements** | `video-attract-loop` (P0); fallback `gs4-max-hero-01`; `logo-viaggio-full` + `logo-gac-full`; optional co-brand lockup |
| **4. Layout structure** | Full-bleed video edge-to-edge; co-brand lockup top-left (48 px pad); tagline lower-left; single pulse CTA lower-center |
| **5. Motion recommendations** | Seamless 15–30 s loop; 3 s CTA breathe; no text animation on loop |
| **6. Transition recommendations** | Touch anywhere → freeze last frame → blur 8 px → S02 reveal |
| **7. Typography recommendations** | Tagline Display 48 px: *Conocé el GAC GS4 MAX a tu ritmo*; sub-label 18 px: *Tocá para empezar* |
| **8. Background treatment** | Pure video; `canvas-deep` vignette at edges only (10%) |
| **9. CTA placement** | Lower center, 120 px from bottom; glass pill button; no secondary CTAs |
| **10. Accessibility considerations** | No audio required; respect `prefers-reduced-motion` → static `gs4-max-hero-ambient`; touch target full screen OK with visible affordance |

---

### S02 — Session Welcome

**What should the customer feel?**  
**Relief** — *I'm in control; they respect that I may already know something.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Orient without friction; establish premium tone in <10 seconds |
| **2. Emotional goal** | Anxiety → relief; confirm self-serve, no consultant ambush |
| **3. Asset requirements** | `logo-viaggio-full`, `logo-gac-full`; subtle `gs4-max-hero-ambient` (20% opacity background); no persona carousel for MVP |
| **4. Layout structure** | Center column max 720 px: welcome headline → path choice cards (2) → language confirm (static es-BO) → primary *Empezar* |
| **5. Motion recommendations** | Staggered reveal: headline → cards → button (120 ms intervals); path card selection: border glow 200 ms |
| **6. Transition recommendations** | Enter from S01 blur dissolve; exit to S03 slide left |
| **7. Typography recommendations** | Headline 44 px: *Bienvenido a Viaggio Motors*; path cards Body 24 px; helper 18 px secondary |
| **8. Background treatment** | `canvas-deep` with ambient hero at 15% opacity + 40 px blur — depth without distraction |
| **9. CTA placement** | *Empezar* center-bottom after path selected; path cards are pre-CTA choices, not navigation |
| **10. Accessibility considerations** | Path cards 160 px min height; high contrast border on focus; screen reader: "Elegí tu experiencia" |

**Path card visual differentiation:**

| Path | Visual cue |
|------|------------|
| *Primera vez con GAC* | Cool `accent-trust` left border |
| *Ya investigué online* | Neutral border; subtitle *Ir directo a tus dudas* |

---

### S03 — Vehicle Selector

**What should the customer feel?**  
**Excitement** — *this is the car I came to see; more is coming later.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | GS4 MAX as unmistakable protagonist; future models teased, not competing |
| **2. Emotional goal** | Rising excitement; clarity that GS4 MAX is the story today |
| **3. Asset requirements** | `gs4-max-hero-01` (GS4 MAX card); `gs4-max-ext-silver`; coming-soon teasers optional (P2); `logo-viaggio-full` footer |
| **4. Layout structure** | 70% width hero card left (GS4 MAX full-bleed image); 30% right stack: 3 smaller coming-soon cards; dealership footer strip |
| **5. Motion recommendations** | GS4 MAX card subtle scale 1→1.01 on idle (4 s); coming-soon cards desaturated 40% |
| **6. Transition recommendations** | GS4 MAX tap → **cinematic expand** to S22 (card grows to fullscreen) |
| **7. Typography recommendations** | Vehicle name Display 56 px on card; stat chips Label style: *177 HP* · *8 airbags* · *desde $us 42.900* |
| **8. Background treatment** | `canvas-deep`; cards have 1 px `surface-glass` border, 16 px radius |
| **9. CTA placement** | Entire GS4 MAX card is tap target; coming-soon → subtle *Avisame* text link, not primary CTA |
| **10. Accessibility considerations** | GS4 MAX card: alt *GAC GS4 MAX SUV plateado, vista tres cuartos*; coming-soon announced as unavailable |

---

### S22 — Immersive Vehicle Hero

**What should the customer feel?**  
**Wonder** — *this is the vehicle in front of me; I want to understand it.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | **Peak product theater** — Tesla-style first moment; vehicle owns the screen |
| **2. Emotional goal** | Relief → wonder; physical-digital bridge when scanned from floor |
| **3. Asset requirements** | `gs4-max-hero-01`, `gs4-max-hero-ambient`; `gs4-max-ext-front-34`, `gs4-max-ext-silver`; `gs4-max-int-dashboard`; `video-hero-ambient` (P1) or parallax stills; hot-spot targets: Motor, Seguridad, Interior, Maletero |
| **4. Layout structure** | Layer 1: full-bleed hero; Layer 2: hot-spot markers (4); Layer 3: bottom stat strip (3 stats); Layer 4: minimal action row |
| **5. Motion recommendations** | Ambient slow pan 0.5%/s; hot-spot pulse; stat count-up on load; parallax 8% on touch drag (optional MVP) |
| **6. Transition recommendations** | Enter: expand from S03; hot-spot tap → zoom 110% toward region → S08; *¿Es confiable?* → S25 crossfade |
| **7. Typography recommendations** | Vehicle name Display 64 px top-left; stats Tabular 32 px; hot-spot labels Label caps 14 px |
| **8. Background treatment** | Full-bleed imagery; bottom gradient 50% height; top 15% gradient for header legibility |
| **9. CTA placement** | Bottom action row (glass bar): *¿Es confiable?* (secondary) · *Explorar* (secondary) · *Comparar* (tertiary); no test drive here |
| **10. Accessibility considerations** | Hot-spots also in list menu (S19 or overflow); reduced motion = static `gs4-max-hero-01`; physical mode banner: *Este es el vehículo frente a vos* |

**Stat strip content (MVP):**

| Stat | Source |
|------|--------|
| Garantía 5 años / 150.000 km | `ficha-tecnica-gs4-max` |
| Desde $us 42.900 | `price-list-orientativo` |
| 8 airbags + 5★ C-NCAP | master content |

---

### S25 — Objections & FAQ

**What should the customer feel?**  
**Trust** — *they're not hiding anything; my concerns are normal and answered.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Calm knowledge surface — Apple Genius FAQ, not legal fine print |
| **2. Emotional goal** | Skepticism → grounded trust; Chinese-brand anxiety defused |
| **3. Asset requirements** | `persona-carlos-avatar`; copy-only MVP OK; optional `gs4-max-safety-latin-ncap` (P1); no stock handshake photos |
| **4. Layout structure** | Left 35%: Carlos portrait + intro line; Right 65%: accordion FAQ (5 categories MVP) |
| **5. Motion recommendations** | Accordion expand 300 ms; Carlos portrait static (no talking animation MVP) |
| **6. Transition recommendations** | From S22: bottom rise; to S24: horizontal crossfade — same trust chapter |
| **7. Typography recommendations** | Headline 36 px: *Preguntas frecuentes*; question 24 px semibold; answer 22 px regular, max 65 chars/line |
| **8. Background treatment** | `canvas-soft` solid; accordion panels `canvas-light` inset — readable, not clinical white |
| **9. CTA placement** | After 2+ items opened: tertiary *Ver historias de clientes* → S24; soft footer *Seguir explorando* — no convert CTA |
| **10. Accessibility considerations** | Accordion: full-row tap 72 px; `aria-expanded`; answer text scales with S19; honest competitor mentions readable, not footnote size |

**MVP FAQ categories:** ¿Por qué confiar? · Repuestos · Reventa · Garantía · Post-venta Viaggio

---

### S24 — Viaggio & GAC Trust Story

**What should the customer feel?**  
**Confidence** — *global brand + local partner; I'll be supported after I buy.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Dual credibility story — OEM scale meets Santa Cruz service |
| **2. Emotional goal** | Trust → confidence; Viaggio feels permanent, not a pop-up dealer |
| **3. Asset requirements** | `logo-gac-full`; Viaggio showroom photo (acquire); `video-viaggio-taller` or service clip (P1); `viaggio-service-map-pin` (P1); `video-trust-heritage` (P1); GAC global facts from brochure |
| **4. Layout structure** | Two-chapter scroll: **Chapter A** GAC global (60% viewport) → **Chapter B** Viaggio local (60%); map pin + address footer |
| **5. Motion recommendations** | Chapter scroll snap; video auto-play muted in Chapter B only; Ken Burns on showroom still |
| **6. Transition recommendations** | From S25: crossfade; to S06: fade to black → tour open |
| **7. Typography recommendations** | Chapter titles Headline 40 px; body 24 px; pull quote 28 px italic for Roda/Arandia launch quotes |
| **8. Background treatment** | Chapter A: dark + GAC heritage still; Chapter B: `canvas-light` + local photography warmth |
| **9. CTA placement** | End of Chapter B: secondary *Conocer la garantía* → S06/S08; tertiary map link; no financing CTA yet |
| **10. Accessibility considerations** | Video captions es-BO; map as text address + hours; alt text on showroom: *Showroom GAC Motor Viaggio, Santa Cruz* |

---

### S06 — Guided Tour Player

**What should the customer feel?**  
**Trust** (Carlos tour) — *someone competent is walking me through without selling.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Immersive linear narrative — each step is a scene, not a slide deck |
| **2. Emotional goal** | Trust deepening; customer feels guided, not lectured |
| **3. Asset requirements** | `persona-carlos-avatar`; MVP: Carlos Trust tour 5 steps; per-step: `video-trust-adas` (step 4), static fallbacks for steps 1–3, 5; `warranty-timeline-5yr-150k` (step 6 if extended); `gs4-max-int-dashboard`, `gs4-max-int-rear-seats` |
| **4. Layout structure** | Top: progress bar (thin 4 px); Center 75%: full-bleed step media; Bottom: narration card (Carlos avatar 64 px + text) + controls |
| **5. Motion recommendations** | Step transition crossfade 400 ms; progress bar fill linear; auto-advance OFF by default (S19 toggle) |
| **6. Transition recommendations** | Step next: media crossfade; tour end → S13 recap cards assemble; exit → fade to prior screen |
| **7. Typography recommendations** | Narration 24 px; step title Label caps above media; progress *Paso 3 de 5* 16 px secondary |
| **8. Background treatment** | Media full-bleed; narration card `surface-glass` blur 24 px over bottom 28% |
| **9. CTA placement** | Controls only: *Anterior* · *Siguiente* · *Salir*; end screen: *¿Listo para dar el siguiente paso?* → S13 (emerges after final step) |
| **10. Accessibility considerations** | Full narration text visible (not audio-only); pause on video steps; skip step without penalty; reduced motion = still per step |

**MVP tour steps (Carlos Trust, shortened):**

| Step | Media | Topic |
|------|-------|-------|
| 1 | Static engine/`gs4-max-ext-front-34` | Motor y rendimiento |
| 2 | Structure still or fallback | Chasis y durabilidad |
| 3 | GAC heritage clip or still | Respaldo global |
| 4 | `video-trust-adas` | ADAS y seguridad |
| 5 | `warranty-timeline-5yr-150k` | Garantía 5/150 |

---

### S08 — Topic Deep Dive

**What should the customer feel?**  
**Confidence** (ADAS) / **Ownership** (family space) — *I can see myself in this vehicle.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Single decision point explored deeply — magazine feature, not spec sheet |
| **2. Emotional goal** | Confidence rising to quiet excitement; family buyer feels space |
| **3. Asset requirements** | MVP topics: ADAS (`gs4-max-int-dashboard`, `video-trust-adas`, `gs4-max-int-360-display`); family-space (`gs4-max-int-rear-seats`); persona avatars per topic |
| **4. Layout structure** | Hero media 50% top; scroll below: narration → feature icon grid (3–4) → stat callout → related topic link |
| **5. Motion recommendations** | Hero video inline muted; icon grid stagger 60 ms; stat callout slide up |
| **6. Transition recommendations** | From S06 shared step: seamless; from S22 hot-spot: zoom continuity; exit soft CTA → S14 modal |
| **7. Typography recommendations** | Topic headline 40 px; persona narration 24 px with name Label: *Carlos · Seguridad* |
| **8. Background treatment** | Hero: full-bleed; content area `canvas-soft`; stat callout glass card with `accent-warm` left edge |
| **9. CTA placement** | Footer soft only: *¿Querés probarlo?* → S14 (after content scroll); contextual, not sticky |
| **10. Accessibility considerations** | Video captions; feature grid icons with text labels (not icon-only); ADAS stats sourced from ficha — screen reader announces source |

---

### S11 — Compare Hub

**What should the customer feel?**  
**Confidence** — *they're letting me look at alternatives honestly.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | GS4 MAX anchored; competitor choice feels like informed shopping, not battle |
| **2. Emotional goal** | Rational confidence; customer feels respected as a researcher |
| **3. Asset requirements** | `gs4-max-ext-front-34` or `gs4-max-hero-01` (anchor); `compare-corolla-cross` (P0 MVP); optional Tiggo/Tucson (P2) |
| **4. Layout structure** | Left 45%: GS4 MAX anchor (fixed); Right 55%: competitor picker grid; bottom: category preview chips |
| **5. Motion recommendations** | Competitor card hover lift 4 px; selection: border `accent-trust` 2 px |
| **6. Transition recommendations** | Select competitor → S12 column slide from right |
| **7. Typography recommendations** | *Comparar* Headline 36 px; anchor vehicle Display 32 px; competitor names 24 px |
| **8. Background treatment** | `canvas-soft`; anchor side slightly brighter — home team without cheerleading |
| **9. CTA placement** | Primary appears only after competitor selected: *Ver comparación*; back tertiary top-left |
| **10. Accessibility considerations** | Both vehicles described in alt text; competitor list keyboard/touch grid 3×2 min 140 px cells |

---

### S12 — Compare Detail

**What should the customer feel?**  
**Confidence** — *I have an honest picture; I know where each vehicle wins.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Side-by-side clarity — Bloomberg comparison, not fighting spec sheet |
| **2. Emotional goal** | Rational confidence → readiness to act; honesty builds trust |
| **3. Asset requirements** | Same as S11; persona callouts (`persona-carlos-avatar`, `persona-sofia-avatar`); compare data from `ficha-tecnica-gs4-max` + competitor press specs |
| **4. Layout structure** | Header: both vehicles + thumbnails; Body: row groups (Seguridad, Tecnología, Espacio, Garantía, Precio, Consumo); Persona callout inline per row |
| **5. Motion recommendations** | Row expand on tap 300 ms; badge fade in: *Nosotros ganamos* / *Ellos ganan* |
| **6. Transition recommendations** | Change competitor → S11 picker overlay; to S26: warm accent thread in header |
| **7. Typography recommendations** | Row label Label caps; values Tabular 22 px; persona callout 18 px italic |
| **8. Background treatment** | Alternating rows `rgba(255,255,255,0.04)` / transparent; badges: `accent-trust` / `accent-neutral` |
| **9. CTA placement** | Post-scroll: primary *Agendá tu prueba y comprobá* → S14; secondary *Compartir* (Phase 2); tertiary *Cambiar competidor* |
| **10. Accessibility considerations** | Don't rely on color alone for win/lose — text labels *Ventaja GS4 MAX*; table semantics for screen reader; price disclaimers legible |

**Honest badge rules:**

| Badge | Color | Copy |
|-------|-------|------|
| GS4 MAX wins | `accent-trust` | *Nosotros ganamos* |
| Competitor wins | `accent-neutral` | *Ellos ganan* |
| Tie | `surface-glass` | *Equivalente* |

---

### S26 — Financing Preview

**What should the customer feel?**  
**Confidence** — *I have a realistic idea of the monthly payment; no surprises.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Clean economics surface — calculator app, not bank lobby poster |
| **2. Emotional goal** | Anxiety → informed confidence; cuota fear reduced, not exploited |
| **3. Asset requirements** | `price-list-orientativo` (internal); `logo-bank-partner-1` (P1); trim data from ficha; disclaimer legal copy |
| **4. Layout structure** | Top: trim selector (2 pills); Center: large cuota display; Bottom: plazo tabs (12/24/36/48) + bank logos + disclaimer |
| **5. Motion recommendations** | Cuota number crossfade on trim/plazo change 200 ms; no slot-machine animation |
| **6. Transition recommendations** | From S12: warm accent header thread continues; to S13: recap includes financing selection |
| **7. Typography recommendations** | Cuota Display 64 px Tabular; *desde* Label above; disclaimer 16 px secondary, always visible |
| **8. Background treatment** | `canvas-light` — brightest economics screen; feels open and calculable |
| **9. CTA placement** | Secondary *Quiero que me confirmen la cuota* → S13 (not live S36 in MVP demo); primary *Agendar prueba* tertiary |
| **10. Accessibility considerations** | Disclaimer not below fold; cuota announced with trim + plazo; bank logos have alt text |

**Required disclaimer (always visible):**  
*Cuota referencial. Tu consultor Viaggio confirma tasa exacta.*

---

### S13 — Conversion Hub

**What should the customer feel?**  
**Ownership** — *this could be mine; I'm choosing how to take the next step.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Session recap as personal summary — Apple order review, not checkout pressure |
| **2. Emotional goal** | Desire → committed action; customer chooses their path |
| **3. Asset requirements** | `gs4-max-hero-01` (recap header); session data (topics, compare, financing); `logo-viaggio-full`; map pin / address |
| **4. Layout structure** | Top: hero thumbnail + *Tu recorrido* recap chips; Center: 4 conversion path cards (2×2 grid); Footer: Viaggio address + hours |
| **5. Motion recommendations** | Recap chips assemble sequential 120 ms; path cards subtle hover |
| **6. Transition recommendations** | Enter: cards rise; to S14: sheet modal; to S15: success state |
| **7. Typography recommendations** | *Tu recorrido* Headline 32 px; path card title 22 px; recap chips Label style |
| **8. Background treatment** | `canvas-soft`; recap area `surface-glass`; path cards `canvas-light` insets |
| **9. CTA placement** | Four equal-weight paths — no hero CTA dominating: Prueba · WhatsApp · Compartir (P2) · Consultor (mock MVP) |
| **10. Accessibility considerations** | All four paths same visual weight; recap readable as list; map address as text |

**Conversion path visual hierarchy (equal weight):**

| Path | Icon direction | Copy |
|------|----------------|------|
| Test drive | Calendar | *Agendá tu prueba de manejo* |
| WhatsApp | Chat | *Escribinos por WhatsApp* |
| Share | Share | *Compartir con tu familia* |
| Consultant | Person | *Hablar con un consultor* |

---

### S14 — Test Drive Form

**What should the customer feel?**  
**Confidence** — *they'll be ready for me; this is easy and specific.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Focused intent capture — Apple appointment booking, not CRM survey |
| **2. Emotional goal** | Committed action; customer feels scheduled, not trapped |
| **3. Asset requirements** | None required; optional `gs4-max-ext-silver` 20% opacity sheet background |
| **4. Layout structure** | Modal sheet 52% viewport height; fields: nombre, teléfono, día, hora, pasajeros; submit *Confirmar* |
| **5. Motion recommendations** | Sheet rise 400 ms `cubic-bezier(0.22, 1, 0.36, 1)`; field focus glow |
| **6. Transition recommendations** | Success → checkmark 600 ms → S15 optional or inline confirmation |
| **7. Typography recommendations** | Form title 28 px; labels 16 px caps; inputs 22 px; minimal fields visible — progressive if needed |
| **8. Background treatment** | Hero dims to 40% behind sheet; sheet `canvas-light` |
| **9. CTA placement** | Single submit bottom of sheet; *Cancelar* text link top-right — escape hatch |
| **10. Accessibility considerations** | Large inputs 56 px height; error states text + icon; phone field numeric keypad; group-friendly: *¿Cuántos van a probar?* |

---

### S15 — WhatsApp Handoff

**What should the customer feel?**  
**Confidence** — *my context goes with me; I can continue on my phone.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Clean bridge to personal device — QR ritual, not app download |
| **2. Emotional goal** | Committed action with continuity; WhatsApp-native Bolivia buyer respected |
| **3. Asset requirements** | Real Viaggio WhatsApp number; QR generated from `wa.me` link; `logo-viaggio-full` |
| **4. Layout structure** | Center: QR 280×280 px; Below: *Escaneá con tu celular*; Pre-filled message preview (read-only); confirmation state |
| **5. Motion recommendations** | QR fade in; success checkmark only animation |
| **6. Transition recommendations** | From S14: crossfade; *Seguir explorando* → S22 or S13 |
| **7. Typography recommendations** | Headline 32 px: *Continuá la conversación*; message preview mono 18 px, max 4 lines |
| **8. Background treatment** | `canvas-light`; QR on white card with subtle shadow — scannable contrast |
| **9. CTA placement** | Primary: QR scan (passive); secondary *Seguir explorando*; no third CTA |
| **10. Accessibility considerations** | Message preview readable at 2 m; phone number as text below QR; high contrast QR quiet zone |

---

### S19 — Settings / Accessibility

**What should the customer feel?**  
**Confidence** — *the system adapts to me; I'm not fighting the kiosk.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Utility overlay — iOS Settings panel, not admin console |
| **2. Emotional goal** | Control and inclusion; group can adjust for readability |
| **3. Asset requirements** | None |
| **4. Layout structure** | Right sheet 40% width; toggles: text size S/M/L, high contrast, reduce motion, restart session |
| **5. Motion recommendations** | Sheet slide 300 ms; toggles instant — no bounce |
| **6. Transition recommendations** | Frosted overlay; close returns to exact prior screen state |
| **7. Typography recommendations** | Panel title 24 px; toggle labels 20 px; live preview sample text |
| **8. Background treatment** | Frosted `surface-glass` over dimmed content 60% |
| **9. CTA placement** | *Listo* top-right close; *Reiniciar sesión* destructive style at bottom, confirmation step |
| **10. Accessibility considerations** | This screen IS accessibility; 64 px toggle rows; high contrast mode: `#000`/`#FFF` only; settings persist session |

---

### S20 — Idle Reset Prompt

**What should the customer feel?**  
**Trust** (privacy) — *my session is respected; I'm not being rushed out.*

| # | Direction |
|---|-----------|
| **1. Visual goal** | Gentle privacy check — hotel room "still watching?" not alarm |
| **2. Emotional goal** | Respect; customer doesn't feel judged for pausing |
| **3. Asset requirements** | None |
| **4. Layout structure** | Center modal 480 px: *¿Seguís ahí?* → {Sí, continuar} · {Guardar y salir} (S37 Phase 2) |
| **5. Motion recommendations** | Modal fade 300 ms; no countdown visual (reduces urgency) |
| **6. Transition recommendations** | 3 min idle → prompt; 5 min → reset → S01; continue → dismiss instant |
| **7. Typography recommendations** | Question 32 px; buttons 20 px; helper 18 px: *La sesión se reinicia para tu privacidad* |
| **8. Background treatment** | Content freeze + blur 12 px; modal `canvas-light` |
| **9. CTA placement** | *Sí, continuar* primary; *Guardar y salir* secondary (Phase 2 S37) |
| **10. Accessibility considerations** | Full-screen tap on *Sí* OK; screen reader announces idle state; no auto-reset without prompt |

---

## Persona Visual Language

Each digital guide has a distinct but cohesive treatment across S06, S08, S12, S25.

| Persona | Role | Color thread | Photography pairing | Voice in UI |
|---------|------|--------------|---------------------|-------------|
| **Carlos** | Trust | `accent-trust` | Technical, chassis, warranty, ADAS | Factual, honest, never sells |
| **Diego** | Ownership | Warm neutral `#D4C4B0` | Family, rear seats, road context | Relatable, *vos/tú*, Santa Cruz |
| **Sofía** | Desire | Soft rose `#B8A0A0` | Design, screen, color, value | Aspirational, never warrants |

Avatar style: commissioned illustration (see [source-catalog](./assets/source-catalog.md)) — not stock photos, not anime. Premium editorial portrait, shoulders up, neutral background.

---

## Contextual CTA Emergence (Trust Threshold)

Per [customer-journey.md](./customer-journey.md) and [pre-phase2-readiness.md](./pre-phase2-readiness.md) — no sticky sell bar before trust.

| Trust signals consumed | CTA behavior | Visual treatment |
|------------------------|--------------|------------------|
| 0–1 | Explore only: *¿Es confiable?* · *Explorar* | No convert buttons |
| 2+ (FAQ item, trust story, tour step) | Soft: *Comparar* · *Ver cuota orientativa* | Glass tertiary strip |
| 4+ or compare complete | Primary emerges: *Agendá tu prueba* | White filled button |
| S13 reached | Full conversion grid | Equal-weight paths |

Trust signals: S25 accordion open · S24 chapter complete · S06 step complete · S08 topic scroll 60%.

---

## Asset-to-Screen Matrix (MVP)

| Asset ID | Screens |
|----------|---------|
| `video-attract-loop` | S01 |
| `gs4-max-hero-01` | S01 fallback, S03, S22, S11, S13 |
| `gs4-max-hero-ambient` | S01, S02, S22 |
| `gs4-max-ext-front-34` | S22 Motor hot-spot, S11 |
| `gs4-max-ext-silver` | S03, S22 |
| `gs4-max-int-dashboard` | S22 Interior, S08 ADAS, S06 step 4 |
| `gs4-max-int-rear-seats` | S08 family-space |
| `gs4-max-int-360-display` | S08 ADAS grid |
| `video-trust-adas` | S06 step 4, S08 |
| `compare-corolla-cross` | S11, S12 |
| `warranty-timeline-5yr-150k` | S06 step 5 |
| `logo-viaggio-full` + `logo-gac-full` | S01, S02, GlobalHeader all screens |
| `persona-*-avatar` | S06, S08, S12, S25 |
| `price-list-orientativo` | S22 stats, S26 |
| `ficha-tecnica-gs4-max` | S08, S12 content QA |
| Viaggio showroom / taller photo | S24 |
| Bank partner logo | S26 |

---

## What to Avoid (Dealership Cliché Kill List)

| Cliché | Replacement |
|--------|-------------|
| Red "OFERTA" banners | Orientative pricing with disclaimer |
| Balloons, confetti, trophy | Stat callouts with source citation |
| Fake urgency countdown | None — Bolivia purchase cycle is 7–21 days |
| Stock family laughing at camera | Diego lifestyle from local shoot or GAC interior |
| Chrome dealer floor reflections | Controlled GAC press grade |
| "El mejor SUV de Bolivia" | *Uno de los SUVs más equipados de su segmento* |
| Consultant popup on S02 | Self-serve welcome; consultant via S13 only |
| Auto-playing loud video | Muted default; captions always |
| Tiny spec text | 22 px minimum body; S19 L for groups |
| Competitor bashing | *Ellos ganan* badges in S12 |

---

## MVP Demo Walkthrough — Emotional Arc

```
S01  Curiosity      — floor draw, no pressure
S02  Relief         — path choice, self-serve confirmed
S03  Excitement     — GS4 MAX as protagonist
S22  Wonder         — product theater peak
S25  Trust          — objections answered honestly
S24  Confidence     — global + local credibility
S06  Trust          — Carlos guided narrative
S08  Confidence /   — feature proof (ADAS / family)
     Ownership
S11  Confidence     — comparison invited
S12  Confidence     — honest rational validation
S26  Confidence     — cuota anxiety reduced
S13  Ownership      — personal recap, choose your path
S14  Confidence     — test drive intent captured
S15  Confidence     — continuity to WhatsApp
```

**Critical rule:** If S22 → Sofía desire content before S25/S24, the arc inverts and Chinese-brand skeptics bounce at S12. Default demo script follows trust before economics.

---

## Production Handoff Checklist

Before implementation, validate:

- [ ] GAC Bolivia approved kiosk display license for all hero/video assets
- [ ] Viaggio approved `price-list-orientativo` bands for S22/S26
- [ ] Persona avatars commissioned in consistent style
- [ ] `warranty-timeline-5yr-150k` designed from official PDF
- [ ] Compare copy pre-cleared with Carlos voice (*ellos ganan* rows)
- [ ] Real WhatsApp number and address replace placeholders
- [ ] S19 high-contrast and text-scale tested at 2 m viewing distance
- [ ] Reduced-motion path tested on every video screen
- [ ] Typography licensed (Inter/SF Pro or project equivalent)

---

## Related Documents

- [Screen Map](./screen-map.md) — layout zones and exit CTAs
- [Customer Journey](./customer-journey.md) — emotional arc and trust thresholds
- [Asset Acquisition Plan](./assets/asset-acquisition-plan.md) — P0/P1 asset inventory
- [Source Catalog](./assets/source-catalog.md) — official acquisition URLs
- [Pre-Phase 2 Readiness](./pre-phase2-readiness.md) — MVP demo scope and demo script

---

*Last updated: June 2025 — Creative direction for Viaggio Digital Showroom MVP kiosk, GAC GS4 MAX.*
