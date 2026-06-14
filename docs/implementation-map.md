# Implementation Map — Viaggio Digital Showroom MVP

**Role lenses:** Frontend Architect · UX Architect · Creative Director  
**Vehicle:** GAC GS4 MAX (`gs4-max`)  
**Market:** Viaggio Motors Santa Cruz · es-BO  
**Scope:** 17 MVP screens — engineering build map (no code)  
**Demo path:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15 (+ S19, S20 overlays)

**Inputs reviewed:**
- Content: `gs4-max-master-content.md`, persona narration docs, `sofia-final-showroom-version.md`, analysis/review docs
- Architecture: `screen-map.md`, `component-tree.md`, `creative-direction.md`, `pre-phase2-readiness.md`
- Conversion: `conversion-strategy.md`, `lead-capture-strategy.md`
- Assets: `source-catalog.md`, `asset-acquisition-plan.md`
- Production JSON: `content/vehicles/gs4-max/*`, `content/shared/dealership.json`

---

## Executive Summary

### Content readiness verdict

| Layer | Status | Engineering implication |
|-------|--------|-------------------------|
| **Strategic copy** (`gs4-max-master-content.md`) | ✅ Complete (~95%) | Hero, FAQ, objeciones, compare cualitativo, test drive, garantía — deployable with JSON structuring |
| **Persona narration** (Carlos / Sofía / Diego) | ✅ Complete | 8 + 7 + 7 blocks; bind to S06 steps and S08 topics via `narration` content blocks |
| **Sofía production cut** (`sofia-final-showroom-version.md`) | ✅ Complete | Use for Sofía voice QA; not on MVP demo path (Carlos tour only) |
| **Screen-level JSON** (`content/vehicles/gs4-max/`) | ⚠️ Partial | `adas.json` strongest; tours defined but topic copy thin; compare template has data conflicts |
| **Media assets** (`public/assets/`) | ❌ Not acquired | P0 assets catalogued; static fallbacks required for Sprint 1 |
| **Commercial data** (`dealership.json`, financing bands) | ❌ Placeholder | Blocker for S14/S15/S26 production; demo needs Viaggio sign-off |

**Build posture:** Engineering can scaffold all 17 screens immediately using the generic content-block renderer. Copy is **sufficient for MVP demo** on trust, FAQ, compare narrative, and conversion flows. **Blockers** are structured compare data (8 vs 6 airbags conflict), financing cuota JSON, real dealership contact data, and P0 media acquisition.

### Global engineering dependencies

| Dependency | Screens affected | Owner |
|------------|------------------|-------|
| `ContentBlockRenderer` + Ajv CI | S06, S08, S24, S25 | Engineering |
| `SessionProvider` + trust-threshold logic | S22, S08, S12, S13 | Engineering + UX |
| `media-manifest.json` binding | All media screens | Creative + Marketing |
| `dealership.json` real data | S13, S14, S15, S24, S26 | Viaggio ops |
| `financing.json` (orientative bands) | S26, S13 recap | Viaggio finance desk |
| `compare/*.json` (row-level data) | S11, S12 | Content + GAC research |
| `tours/trust.json` + topic hydration | S06 | Content producer |

### MVP emotional arc (UX constraint)

```
Curiosity → Relief → Excitement → Wonder → Trust → Confidence → Validation → Ownership
 S01       S02       S03          S22      S25/S24  S06/S08      S11/S12/S26  S13–S15
```

**Critical rule:** Do not surface Sofía desire tour or financing CTA before 2+ trust signals on first-time path. Enforce in `SessionProvider` trust counter.

---

## Global Overlay Screens

### S19 — Settings / Accessibility

| Dimension | Implementation binding |
|-----------|------------------------|
| **Content sources** | `creative-direction.md` (S19 section) · `screen-map.md` · `pre-phase2-readiness.md` (group viewing) |
| **Narration sources** | None — utility copy only |
| **Required media** | None |
| **Required UI components** | `SettingsOverlay` · `A11yProvider` · toggles: text size S/M/L, high contrast, reduce motion, restart session · live preview sample text · `ConfirmDialog` for restart |
| **Required transitions** | Frosted overlay 300 ms; content scales 0.98; close restores prior screen state exactly |
| **Required CTA actions** | *Listo* (close) · *Reiniciar sesión* (destructive → confirm → S02 or S01) |

**Engineering notes:** Settings persist per session in `A11yProvider`; CSS variables drive `--text-scale`, `--contrast-mode`, `--motion-reduce`. Available from `GlobalHeader` on all vehicle screens.

---

### S20 — Idle Reset Prompt

| Dimension | Implementation binding |
|-----------|------------------------|
| **Content sources** | `screen-map.md` · `creative-direction.md` · `lead-capture-strategy.md` (privacy) |
| **Narration sources** | None |
| **Required media** | None |
| **Required UI components** | `IdleManager` (in `VehicleShell`) · center modal · session flush logic · analytics flush before reset |
| **Required transitions** | 3 min idle → modal fade 300 ms + background blur 12 px; 5 min → reset → S01; continue → instant dismiss |
| **Required CTA actions** | *Sí, continuar* (primary) · *Guardar y salir* (secondary — S37 Phase 2; MVP: reset only) |

**Engineering notes:** Timer pauses during S14 form entry. On reset: clear `SessionProvider` PII from UI; server-side leads already submitted persist.

---

## Screen-by-Screen Build Map

---

### S01 — Attract Loop

**Route:** `/`  
**Role in MVP:** Floor draw; kiosk idle state

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | Mensaje hero (titular, subtítulo, línea de apoyo) |
| `creative-direction.md` | S01 visual system, tagline, CTA placement |
| `pre-phase2-readiness.md` | Demo minimum: 15–30 s loop |
| `screen-map.md` | Layout zones, exit behavior |

**Copy (locked for MVP):**
- Tagline: *Conocé el GAC GS4 MAX a tu ritmo*
- Sub-label: *Tocá para empezar*
- Co-brand: Viaggio + GAC lockup

#### 2. Narration source documents

None — ambient only. No voice-over in MVP.

#### 3. Required media assets

| Asset ID | Priority | Fallback |
|----------|----------|----------|
| `video-attract-loop` | P0 | `gs4-max-hero-01` static + Ken Burns (if reduced motion) |
| `logo-viaggio-full` | P0 | — |
| `logo-gac-full` | P0 | — |

#### 4. Required UI components

| Component | Source |
|-----------|--------|
| `AttractLoop` | `component-tree.md` |
| `AttractOverlay` | pulse CTA pill |
| Full-screen touch target | entire viewport |
| `useReducedMotion()` branch | static hero path |

**Shell:** No `VehicleShell` — standalone entry before session start.

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| Boot → S01 | Instant video start |
| S01 → S02 | Freeze frame → blur 8 px → content reveal 600 ms |
| S20 reset → S01 | Fade to attract loop |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| Touch anywhere | S02 Session Welcome | `session_started` |

**No secondary CTAs on S01.**

---

### S02 — Session Welcome

**Route:** `/` (first touch overlay)  
**Role in MVP:** Path routing; premium orientation

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `screen-map.md` | Path choice layout, exit routing |
| `creative-direction.md` | S02 path cards, typography |
| `pre-phase2-readiness.md` | First-time vs pre-researched UX decision |
| `customer-journey.md` (referenced) | Trust-before-desire gating |

**Copy (locked):**
- Headline: *Bienvenido a Viaggio Motors*
- Path A: *Primera vez con GAC* — cool `accent-trust` border
- Path B: *Ya investigué online* — subtitle *Ir directo a tus dudas*
- Primary: *Empezar*
- Language: es-BO static confirm

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `carlos-narration.md` §1 Bienvenida | Optional single-line persona intro for Path A (variant corta only — **no carousel in MVP**) |
| `sofia-narration.md` §1 | **Exclude from MVP demo** — reserve for Path B preview text if needed |

**MVP rule:** One condensed line max; no persona carousel.

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `logo-viaggio-full`, `logo-gac-full` | Header |
| `gs4-max-hero-ambient` | Background at 15% opacity + blur |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `WelcomeScreen` | Center column max 720 px |
| `PathChoiceCard` ×2 | 160 px min height; `accent-trust` / neutral borders |
| `WelcomeActions` | *Empezar* disabled until path selected |
| `SessionProvider` init | Set `visitorPath`: `first_time` \| `pre_researched` |

**Exclude from MVP:** `PersonaIntroCarousel`

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S01 → S02 | Blur dissolve in |
| S02 → S03 | Horizontal slide left; cards stagger 80 ms |
| S20 → S02 | Standard reveal |

#### 6. Required CTA actions

| CTA | Condition | Target |
|-----|-----------|--------|
| *Empezar* | Path = Primera vez | S03 → default S22 |
| *Empezar* | Path = Ya investigué | S03 → S22 (MVP) or S25 shortcut flag in session |
| Path selection | — | Store in session metadata |

**Post-MVP:** Pre-researched → S25 or S37 resume if token detected.

---

### S03 — Vehicle Selector

**Route:** `/vehicles`  
**Role in MVP:** GS4 MAX entry; future model teasers

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | Panorama del vehículo · versiones · datos rápidos hero |
| `screen-map.md` | Layout 70/30, coming-soon behavior |
| `creative-direction.md` | S03 card treatment, cinematic expand exit |

**Copy (locked):**
- GS4 MAX card stats: *177 HP* · *8 airbags* · *desde $us 42.900*
- Footer: Viaggio dealership context
- Coming soon: GS8, EMZOOM, EMKOO — desaturated, no primary CTA

#### 2. Narration source documents

None on screen. Session stores `vehicleSlug: gs4-max`.

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `gs4-max-hero-01` | GS4 MAX hero card |
| `gs4-max-ext-silver` | Card color reference |
| `logo-viaggio-full` | Footer strip |
| Coming-soon placeholders | P2 — gray cards OK for MVP |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `VehicleSelector` | 70% hero card + 30% stack |
| `VehicleCard` | Full-bleed image; entire card = tap target |
| `VehicleCard` (inactive) | 40% desaturation; `aria-disabled` |
| Subtle idle scale animation | 1→1.01 over 4 s |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S03 → S22 | **Cinematic expand** — card grows to fullscreen 800 ms (signature transition) |
| Back | S02 slide right |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| GS4 MAX card tap | S22 Immersive Hero | `vehicle_selected` |
| Coming soon *Avisame* | Teaser modal + WhatsApp interest (Phase 2) | `interest_captured` |
| Back | S02 | — |

---

### S22 — Immersive Vehicle Hero

**Route:** `/vehicles/[slug]/hero`  
**Role in MVP:** **Peak product theater** — primary hub substitute in demo

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | Mensaje hero · datos rápidos · variantes hero (use rational variant for stat strip) |
| `mvp-content-readiness.md` | S22 evaluation · hot-spot → topicId requirements |
| `creative-direction.md` | S22 layers, stat strip, action row |
| `screen-map.md` | Hot-spots, physical-digital mode, exit CTAs |

**Stat strip (MVP locked):**

| Stat | Source |
|------|--------|
| Garantía 5 años / 150.000 km | Master § garantía |
| Desde $us 42.900 | Master § versiones |
| 8 airbags + 5★ C-NCAP | Master § seguridad |

**Hot-spot map (MVP — 4 markers, 2 topic destinations minimum):**

| Hot-spot | Label | Target topicId |
|----------|-------|----------------|
| Motor | MOTOR | `engine` |
| Seguridad | SEGURIDAD | `adas` |
| Interior | INTERIOR | `adas` (dashboard) |
| Maletero | MALETERO | `family-comfort` |

#### 2. Narration source documents

None on hero surface. Hot-spots deep-link to topic narration (Carlos ADAS, Diego family).

#### 3. Required media assets

| Asset ID | Layer | Priority |
|----------|-------|----------|
| `gs4-max-hero-01` | Full-bleed hero | P0 |
| `gs4-max-hero-ambient` | Parallax / reduced-motion fallback | P0 |
| `video-hero-ambient` | Slow pan loop | P1 |
| `gs4-max-ext-front-34` | Motor hot-spot zoom target | P0 |
| `gs4-max-int-dashboard` | Interior hot-spot | P0 |
| `gs4-max-int-rear-seats` | Maletero / space context | P0 |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `ImmersiveHero` *(new — not in component-tree)* | 4-layer stack: media · hot-spots · stat strip · action row |
| `HotSpotMarker` | Pulse 2 s loop; list-menu fallback for a11y |
| `HeroStatStrip` | Tabular figures; count-up on first view |
| `PhysicalModeBanner` | *Este es el vehículo frente a vos* — QR/windshield entry |
| `ContextualCTAStrip` | Trust threshold 0–1: explore only |
| `VehicleShell` + `GlobalHeader` | Minimal chrome |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S03 → S22 | Cinematic expand (continuity from card) |
| Hot-spot → S08 | Zoom 110% toward region → topic |
| S22 → S25/S24 | Dark hold; trust content rises from bottom |
| S22 → S11 | Rational shift — soft panel slide |

#### 6. Required CTA actions

| CTA | Tier | Target | Trust gate |
|-----|------|--------|------------|
| *¿Es confiable?* | Secondary | S25 FAQ | Always |
| *Explorar* | Secondary | S04 Hub (post-MVP) / S06 tour in MVP | Always |
| *Comparar* | Tertiary | S11 | 2+ trust signals |
| *Configurar* | Tertiary | S30 (excluded MVP) | — |
| Hot-spot tap | — | S08 topic | — |

**No test drive CTA on S22** per creative direction.

---

### S25 — Objections & FAQ

**Route:** `/vehicles/gs4-max/trust/faq`  
**Role in MVP:** Chinese-brand trust; accordion knowledge surface

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | **§ Preguntas frecuentes** (15 items) · **§ Objeciones frecuentes** (8 items with prueba sugerida) |
| `mvp-content-readiness.md` | S25 readiness 8/10 · MVP top-5 accordion selection |
| `carlos-objection-analysis.md` | Persona attribution guidance · trust signal gaps |
| `screen-map.md` | Accordion categories, exit CTAs |
| `creative-direction.md` | S25 layout 35/65, accordion motion |

**MVP accordion items (5 locked):**

| # | Question | Answer source | Persona |
|---|----------|---------------|---------|
| 1 | ¿Por qué confiar en una marca china? | Objeción § «Es marca china» | Carlos |
| 2 | ¿Hay repuestos en Santa Cruz? | Objeción § repuestos + FAQ servicio | Carlos |
| 3 | ¿Cuánto vale en reventa? | Objeción § reventa | Carlos |
| 4 | ¿Qué pasa si necesito garantía? | FAQ garantía + § garantía | Carlos |
| 5 | ¿Viaggio responde post-venta? | Objeción § repuestos + showrooms list | Carlos / Diego |

**Include per item:** `prueba_sugerida` from master as tertiary link hint.

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `carlos-narration.md` §5 Garantía | Condensed answer tone for item 4 |
| `carlos-narration.md` §7 Confiabilidad | Tone reference for items 1, 3 |
| `carlos-objection-analysis.md` | Supplement: C-NCAP 8 airbags wording for item 1 |

**Diego attribution:** Item 5 emotional angle only — factual body remains Carlos.

#### 3. Required media assets

| Asset ID | Usage | Priority |
|----------|-------|----------|
| `persona-carlos-avatar` | Left column portrait | P0-produce |
| `warranty-timeline-5yr-150k` | Inline in garantía accordion expand | P0-produce |
| `gs4-max-safety-latin-ncap` | Optional badge in item 1 | P1 |

**MVP:** Copy-only acceptable per pre-phase2-readiness.

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `FAQScreen` *(new)* | `canvas-soft` background |
| `PersonaPortrait` | Carlos 35% column |
| `AccordionBlock` | 72 px row height; `aria-expanded` |
| `TrustSignalCounter` | Increment on each accordion open |
| `ContentBlockRenderer` | Optional `narration` block per expanded item |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S22 → S25 | Bottom rise — calm, not alarm |
| S25 ↔ S24 | Crossfade same plane — trust chapter |
| S25 → S06 | Fade to black 200 ms → tour open |

#### 6. Required CTA actions

| CTA | Condition | Target |
|-----|-----------|--------|
| *Ver historias de clientes* | 2+ items opened | S24 Trust Story |
| *Seguir explorando* | Footer tertiary | S22 or S06 |
| Accordion *Profundizar* | Per item | S08 topic / S29 warranty (post-MVP) |
| Trust signal | Each open | `faq_item_opened` + trust counter +1 |

**No convert CTA on S25** until trust threshold met elsewhere.

---

### S24 — Viaggio & GAC Trust Story

**Route:** `/vehicles/gs4-max/trust/story`  
**Role in MVP:** Dual credibility — OEM global + Viaggio local

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | Contexto de marca en Bolivia · Viaggio Motor S.A. · GAC global positioning · Showrooms y talleres (4 ciudades) · § garantía (Viaggio como canal oficial) |
| `mvp-content-readiness.md` | MC-07 S24 trust story gap — **partially covered by master** |
| `screen-map.md` | Two-chapter scroll layout |
| `creative-direction.md` | Chapter A dark / Chapter B light |
| `dealership-operations-blueprint.md` | Grupo Roda · operational credibility |

**Chapter A — GAC global (copy blocks):**
- Production scale, export markets, third-gen GS4
- Bolivia as regional launch market
- Source: Master § panorama + § contexto de marca

**Chapter B — Viaggio local (copy blocks):**
- 100% boliviana · Grupo Roda · exclusive distributor
- Showroom addresses (Santa Cruz primary for kiosk)
- Service bay credibility
- Source: Master § mantenimiento showrooms + § contexto

**Pull quotes (optional):** Launch communications referenced in master appendix (InfoDiez, Economy.com.bo).

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `carlos-narration.md` §5 Garantía | Chapter B service channel tone |
| `sofia-narration.md` §6 Por qué GAC | Chapter A brand bridge (desire tone — use sparingly in trust screen) |
| `carlos-objection-analysis.md` | «Respaldo local» suggested block — integrate into Chapter B |

**Canonical voice on S24:** Carlos factual; Sofía lines excluded from MVP render.

#### 3. Required media assets

| Asset ID | Chapter | Priority |
|----------|---------|----------|
| `logo-gac-full` | A | P0 |
| `video-trust-heritage` or GAC heritage still | A | P1 |
| Viaggio showroom photo | B | P0 — acquire locally |
| `video-viaggio-taller` | B | P0-produce |
| `viaggio-service-map-pin` | B footer | P1 |
| `logo-viaggio-full` | B | P0 |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `TrustStoryScreen` *(new)* | Scroll-snap two chapters |
| `ChapterSection` ×2 | A: dark + heritage · B: light + local photo |
| `VideoBlock` | Muted autoplay Chapter B only |
| `MapPin` / address footer | Text address + hours from `dealership.json` |
| `KenBurnsStill` | Showroom photo if no video |
| `TrustSignalCounter` | Chapter B 80% scroll = +1 trust signal |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S25 → S24 | Horizontal crossfade |
| S24 → S06 | Fade to black → tour step 1 reveal (theater curtain) |
| S24 → S29 | Tertiary link (post-MVP) |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| *Conocer la garantía* | S06 tour (warranty step) or S08 `warranty-terms` | `trust_story_completed` |
| Map / directions | External maps (`dealership.json` coordinates) | `directions_opened` |
| *Seguir explorando* | S06 Carlos tour | — |

**No financing CTA on S24** per creative direction.

---

### S06 — Guided Tour Player

**Route:** `/vehicles/gs4-max/tour/trust`  
**Role in MVP:** Carlos Trust tour — **shortened to 5 steps** for demo

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `content/vehicles/gs4-max/tours/trust.json` | 8-step structure (MVP: truncate to steps 1–5) |
| `gs4-max-master-content.md` | Motor · seguridad · garantía · mantenimiento · contexto marca |
| `mvp-content-readiness.md` | Carlos journey readiness · step → topic binding |
| `creative-direction.md` | MVP 5-step table · tour player layout |
| `pre-phase2-readiness.md` | Demo: Carlos only · no tour picker |

**MVP 5-step binding (override full 8-step tour):**

| Step | Title | topicId | Master section |
|------|-------|---------|----------------|
| 1 | Motor y rendimiento | `engine` | Panorama + motor |
| 2 | Chasis y durabilidad | `chassis` | Seguridad pasiva / estructura |
| 3 | Respaldo global | `brand-heritage` | Contexto de marca |
| 4 | ADAS y seguridad | `adas` | Seguridad activa |
| 5 | Garantía 5/150 | `warranty-terms` | Garantía |

**Skip for MVP demo:** steps 6–8 (`maintenance`, `viaggio-service`) — available post-demo.

#### 2. Narration source documents

| Step | Narration source | Block |
|------|------------------|-------|
| 1 | `carlos-narration.md` §2 Motor | Script principal (adapt `[MODELO]` → GS4 MAX, `[CIUDAD]` → Santa Cruz) |
| 2 | `carlos-narration.md` §7 Confiabilidad | Variant corta — chasis / calle real angle |
| 3 | `carlos-narration.md` §1 Bienvenida + master § contexto | GAC global backing |
| 4 | `carlos-narration.md` §4 Seguridad | ADAS script principal |
| 5 | `carlos-narration.md` §5 Garantía | Script principal |
| Cierre | `carlos-narration.md` §8 Recomendación final | Tour end screen only |

**Hydration task:** Copy narration into `content/vehicles/gs4-max/topics/*.json` `narration` blocks or tour-level override JSON.

#### 3. Required media assets

| Step | Asset ID | Fallback |
|------|----------|----------|
| 1 | `gs4-max-ext-front-34` | `gs4-max-hero-01` |
| 2 | Structure still / `gs4-max-ext-front-34` | Hero still |
| 3 | GAC heritage clip or still | `logo-gac-full` on dark |
| 4 | `video-trust-adas` | `gs4-max-int-dashboard` |
| 5 | `warranty-timeline-5yr-150k` | Stat callout text-only |
| Global | `persona-carlos-avatar` | Required P0-produce |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `TourPlayer` | Full-bleed media 75% + narration card 28% |
| `TourProgress` | Thin 4 px bar; *Paso N de 5* |
| `TourStep` | Media crossfade 400 ms between steps |
| `PersonaNarration` | Carlos avatar 64 px + text 24 px |
| `TourControls` | Anterior · Siguiente · Saltar paso · Salir |
| `ContentBlockRenderer` | Per-step optional stat_callout |
| Auto-advance toggle | OFF default; linked to S19 |

**Exclude MVP:** `TourPicker` (S05) — direct route to `/tour/trust`

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S24 → S06 step 1 | Fade to black 200 ms → step reveal |
| Step → step | Media crossfade 400 ms |
| S06 → S08 | Shared media crossfade if same asset |
| Tour end → S13 | Recap cards assemble 120 ms stagger |

#### 6. Required CTA actions

| CTA | When | Target |
|-----|------|--------|
| *Siguiente* / *Anterior* | Per step | Step navigation |
| *Salir* | Any step | S22 |
| *¿Listo para dar el siguiente paso?* | Final step | S13 Conversion Hub |
| Step complete | Each advance | `tour_step_completed` + trust +1 |
| Tour complete | Step 5 | `tour_completed` |

**Carlos CTA tone:** *cuando quieras, coordinamos* — route to S14 via S13, never direct hard sell.

---

### S08 — Topic Deep Dive

**Route:** `/vehicles/[slug]/themes/[themeId]/[topicId]`  
**Role in MVP:** Feature proof — **2 topics:** ADAS + family space

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `content/vehicles/gs4-max/topics/adas.json` | **Primary implementable source** — blocks defined |
| `content/vehicles/gs4-max/topics/family-comfort.json` | Family topic — needs narration hydration from Diego |
| `gs4-max-master-content.md` | § Seguridad · § Familia · § Confort |
| `mvp-content-readiness.md` | Safety 7/10 · family topic gaps |
| `screen-map.md` | Composable blocks list · footer CTAs |

**MVP topic routes:**
- `/vehicles/gs4-max/themes/safety/adas` — from S06 step 4, S22 Seguridad hot-spot
- `/vehicles/gs4-max/themes/family/family-comfort` — from S22 Maletero hot-spot

#### 2. Narration source documents

| topicId | Persona | Narration source |
|---------|---------|------------------|
| `adas` | Carlos | `carlos-narration.md` §4 Seguridad — **already partially in adas.json**; align verbatim |
| `family-comfort` | Diego | `diego-narration.md` §1 Viajes en familia + §3 Los chicos — replace thin JSON narration |

**Feature grid copy:**
- ADAS: from master § seguridad activa table
- Family: from master § escenarios de uso Bolivia + Diego §2 Manejo diario (cámara 360°)

#### 3. Required media assets

| topicId | Asset ID | Usage |
|---------|----------|-------|
| `adas` | `gs4-max-int-dashboard` | Hero |
| `adas` | `video-trust-adas` | Inline muted video |
| `adas` | `gs4-max-int-360-display` | Feature grid |
| `family-comfort` | `gs4-max-int-rear-seats` | Hero |
| `family-comfort` | `gs4-max-family-cover` | Cover (acquire or reuse rear seats) |
| Both | `persona-carlos-avatar` / `persona-diego-avatar` | Narration attribution |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `TopicDeepDive` | Hero 50% + scroll content |
| `ContentBlockRenderer` | hero · narration · feature_grid · stat_callout · cta |
| `HeroRenderer` | Full-bleed with bottom gradient |
| `NarrationRenderer` | Persona label: *Carlos · Seguridad* / *Diego · Familia* |
| `FeatureGridRenderer` | 3–4 icons with text labels (not icon-only) |
| `StatCalloutRenderer` | ADAS: 8 airbags, 360°, C-NCAP |
| `SuggestedNextTopic` | ADAS → `structure`; family → `adas` |
| `ContextualCTAStrip` | Soft CTA after 60% scroll |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S06 step 4 → `adas` | Seamless media crossfade |
| S22 hot-spot → topic | Zoom continuity 110% |
| S08 → S11 | Rational shift — `canvas-soft` panel slides over hero |
| S08 → S14 | Sheet rise from bottom (soft CTA) |

#### 6. Required CTA actions

| CTA | topicId | Target | Gate |
|-----|---------|--------|------|
| *¿Querés probarlo?* | both | S14 (or S34 post-MVP) | After 60% scroll |
| Inline `cta` block | `adas` | S14 test drive | Post-trust |
| Inline `cta` block | `family-comfort` | S14 — *Traé a tu familia* | Post-trust |
| Related topic link | per JSON | Other S08 topic | — |
| Compare link | ADAS footer | S11 | 2+ trust signals |

**Analytics:** `topic_viewed`, `topic_scroll_depth`, `topic_cta_clicked`

---

### S11 — Compare Hub

**Route:** `/vehicles/gs4-max/compare`  
**Role in MVP:** Competitor selection — Corolla Cross pre-selected

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | § Puntos de conversación comparativos · vs Corolla Cross table |
| `docs/content/templates/compare.gs4-max.corolla-cross.json` | Schema reference — **requires data fix before deploy** |
| `mvp-content-readiness.md` | Compare 6/10 · structured row requirements |
| `screen-map.md` | Anchor left / picker right layout |

**Pre-deploy data fix (P0 blocker):**
- Template lists GS4 MAX airbags as **6** — master says **8**. Update `anchorValue`.
- Add missing categories: Espacio, Precio, Consumo per MVP demo script.
- Set `contentVersion` + `lastVerified` date.

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `carlos-narration.md` §8 | Honest comparison tone — *no es la única opción* |
| `sofia-narration.md` §6 | *Equipamiento que rinde* — Sofía rows only (technology category) |
| Master § vs Corolla Cross | Row explanations and honest notes |

**Persona assignment per category:**

| Category | personaId |
|----------|-----------|
| Seguridad, Garantía | `carlos` |
| Tecnología, Valor | `sofia` |
| Espacio, Consumo | `carlos` |
| Precio / reventa | `carlos` (honest *ellos ganan* on reventa) |

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `gs4-max-ext-front-34` or `gs4-max-hero-01` | GS4 MAX anchor (fixed left) |
| `compare-corolla-cross` | Competitor picker thumbnail |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `CompareHub` | 45% anchor / 55% picker |
| `CompareAnchor` | GS4 MAX fixed; slightly brighter |
| `CompareTargetPicker` | Grid 3×2 min 140 px cells |
| `CategoryPreviewChips` | Seguridad · Tecnología · Espacio · Garantía · Precio · Consumo |
| `CompareVerdict` preview | On chip hover |

**MVP:** Single competitor (Corolla Cross) — picker can show 1 active + disabled future targets.

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S08 → S11 | `canvas-soft` panel slides over hero |
| S11 → S12 | Competitor column slides in from right 500 ms |
| S22 → S11 | Tertiary CTA crossfade |

#### 6. Required CTA actions

| CTA | Condition | Target |
|-----|-----------|--------|
| *Ver comparación* | Competitor selected | S12 Compare Detail |
| Back | — | S22 |
| Pre-selected path | MVP default | Auto-highlight Corolla Cross → prompt *Ver comparación* |

**Analytics:** `comparison_started`, `competitor_selected`

---

### S12 — Compare Detail

**Route:** `/vehicles/gs4-max/compare/corolla-cross`  
**Role in MVP:** Honest side-by-side validation

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | § vs Corolla Cross (full table) · diferenciales transversales · honest reventa note |
| `compare.gs4-max.corolla-cross.json` | Row structure — **after P0 data fix** |
| `carlos-objection-analysis.md` | Honest framing for reventa / marca rows |
| `creative-direction.md` | Badge rules: *Nosotros ganamos* / *Ellos ganan* / *Equivalente* |

**Required row groups (MVP minimum):**

| Category | Rows (min) | Honest loss expected |
|----------|------------|----------------------|
| Seguridad | Airbags, Cámara 360°, C-NCAP | Airbags may be `target_wins` — verify research |
| Tecnología | Pantalla central, ADAS, CarPlay | `anchor_wins` |
| Espacio | Maletero, distancia entre ejes | Mixed |
| Garantía | Años/km, mantenimiento sin costo | `anchor_wins` |
| Precio | Lista USD orientativa | Context-dependent |
| Consumo | WLTC vs real | Disclaimer required |
| Reventa | Percepción mercado | **`target_wins` explicit** |

#### 2. Narration source documents

| Row type | Source |
|----------|--------|
| Seguridad / Garantía callouts | `carlos-narration.md` §4, §5 + master compare notes |
| Tecnología / Valor callouts | `sofia-narration.md` §3 Tecnología, §5 Premium |
| Reventa row | Master objeción § reventa — Carlos honest voice |

**Per-row `explanation`:** max 2 sentences; pull from master § notas honestas.

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `gs4-max-ext-front-34` | Header thumbnail GS4 MAX |
| `compare-corolla-cross` | Header thumbnail competitor |
| `persona-carlos-avatar`, `persona-sofia-avatar` | Inline row callouts |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `CompareDetail` | Split column layout |
| `CompareTable` | Semantic table for screen readers |
| `CompareRow` | Expand on tap 300 ms |
| `CompareVerdict` | Badge: `accent-trust` / `accent-neutral` / glass |
| `PersonaQuote` | Italic 18 px inline per row |
| `ContextualCTAStrip` | Emerges after full scroll |

**Accessibility:** Text labels *Ventaja GS4 MAX* / *Ventaja competidor* — not color-only.

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S11 → S12 | Column reveal from right 500 ms |
| S12 → S26 | Warm accent `#C8A96E` thread in header stat strip |
| Change competitor | S11 picker overlay |

#### 6. Required CTA actions

| CTA | Tier | Target |
|-----|------|--------|
| *Agendá tu prueba y comprobá* | Primary (post-scroll) | S14 (MVP) / S34 → S14 (production) |
| *Cambiar competidor* | Tertiary | S11 |
| *Compartir comparación* | Secondary | S33 (post-MVP) |
| *Escribinos* | Tertiary | S15 / S32 |
| Compare complete | — | `comparison_completed` + trust threshold unlock financing CTA |

---

### S26 — Financing Preview

**Route:** `/vehicles/gs4-max/economics/financing`  
**Role in MVP:** Cuota orientativa warm-up

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | § Precio y financiamiento FAQ · versiones y precios USD |
| `lead-capture-strategy.md` | § Financing requests · soft interest capture |
| `conversion-strategy.md` | Commercial warm-up stage |
| `creative-direction.md` | S26 layout · disclaimer always visible |
| `pre-phase2-readiness.md` | 2 trims × 3 plazos demo minimum |

**Copy (locked):**
- Disclaimer: *Cuota referencial. Tu consultor Viaggio confirma tasa exacta.*
- Trim labels: GS4 MAX Full Equipo (4x2) · GS4 MAX Full Equipo AWD
- Plazos: 12 / 24 / 36 / 48 meses

**Data file to create:** `content/vehicles/gs4-max/financing.json` — sourced from `price-list-orientativo` (internal, Viaggio-approved). **Not in repo today.**

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `sofia-narration.md` | **Do not use on S26** — Sofía does not quote financing |
| `carlos-narration.md` §8 | Redirect tone: *financiamiento lo cerrás con el equipo de ventas* |

**No persona narration on S26** — calculator UI only.

#### 3. Required media assets

| Asset ID | Usage | Priority |
|----------|-------|----------|
| `price-list-orientativo` | Data source only — never render publicly | P0-produce |
| `logo-bank-partner-1` (+ optional 2–3) | Footer logos | P1 |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `FinancingPreview` *(new)* | Brightest screen — `canvas-light` |
| `TrimSelector` | 2 pills: 4x2 / AWD |
| `PlazoTabs` | 12 / 24 / 36 / 48 |
| `CuotaDisplay` | Display 64 px tabular; crossfade on change 200 ms |
| `DisclaimerBar` | Always visible — not below fold |
| `BankPartnerLogos` | Optional MVP |
| `SessionRecap` hook | Store selected trim + plazo for S13 |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S12 → S26 | Warm accent header thread continues |
| S26 → S13 | Recap includes financing selection |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| *Quiero que me confirmen la cuota* | S13 Conversion Hub (MVP) / S36 (production) | `financing_interest_flagged` |
| *Agendar prueba* | S14 tertiary | `test_drive_intent_from_financing` |
| Trim/plazo change | — | `financing_preview_viewed` |

**MVP demo:** Mock cuota ranges acceptable with visible disclaimer if Viaggio bands not ready.

---

### S13 — Conversion Hub

**Route:** `/vehicles/gs4-max/convert`  
**Role in MVP:** Session recap + equal-weight conversion paths

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `screen-map.md` | 4 conversion paths · recap chips |
| `conversion-strategy.md` | Funnel stage Intent · CTA hierarchy |
| `lead-capture-strategy.md` | Session context attachment to leads |
| `creative-direction.md` | S13 equal-weight grid · Apple receipt assembly |
| `gs4-max-master-content.md` | § Mensajes test drive · CTAs |

**Recap chips (dynamic from session):**
- Topics visited (e.g. ADAS, Familia, Garantía)
- Compare result summary (competitor + net verdict count)
- Financing selection if S26 visited
- Trust items consumed (FAQ opens, tour steps)

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `carlos-narration.md` §8 Recomendación final | Optional header narration on recap — variant corta |
| `sofia-narration.md` §7 Invitación prueba | **Alternative** if session persona affinity = Sofía (post-MVP) |

**MVP:** Static copy — no persona narration block.

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `gs4-max-hero-01` | Recap header thumbnail |
| `logo-viaggio-full` | Footer |
| Map pin | From `dealership.json` |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `ConversionHub` | `canvas-soft` + glass recap area |
| `SessionRecap` | Chips assemble sequential 120 ms |
| `ConversionPathCard` ×4 | 2×2 equal-weight grid |
| `TrustFooter` | Address + hours from `dealership.json` |
| `LeadContextBuilder` | Attach session metadata to downstream forms |

**Four paths (equal visual weight):**

| Path | Icon | Copy |
|------|------|------|
| Test drive | Calendar | *Agendá tu prueba de manejo* |
| WhatsApp | Chat | *Escribinos por WhatsApp* |
| Share | Share | *Compartir con tu familia* (P2 MVP: disabled or mock) |
| Consultant | Person | *Hablar con un consultor* (MVP: modal mock, no S35) |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S26/S12/S06 end → S13 | Recap cards rise |
| S13 → S14 | Sheet rise from bottom 48% height |
| S13 → S15 | Crossfade success state |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| Prueba de manejo | S14 (MVP direct; production S34 → S14) | `conversion_hub_viewed` |
| WhatsApp | S15 | `whatsapp_intent_from_hub` |
| Compartir | S33 (post-MVP) | `share_initiated` |
| Consultor | S36 modal (MVP: dead-end message) | `staff_handoff_requested` |
| Back | S22 | — |

---

### S14 — Test Drive Form

**Route:** Modal overlay on S13 (or global modal route)  
**Role in MVP:** Lead capture — scheduling intent

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `gs4-max-master-content.md` | § Mensajes test drive · Antes del test drive · Variantes invitación |
| `lead-capture-strategy.md` | § Test drive form fields · validation · confirmation copy |
| `conversion-strategy.md` | Form copy · event `test_drive_requested` |
| `screen-map.md` | Field list |

**Form copy (locked):**
- Title: *Agendá tu prueba de manejo*
- Submit helper: *Manejalo vos mismo. Un consultor de Viaggio te confirma por WhatsApp.*
- Confirmation: *¡Listo, [nombre]! Te escribimos al [teléfono] para confirmar tu prueba del GS4 MAX.*

#### 2. Narration source documents

| Document | Usage |
|----------|-------|
| `sofia-narration.md` §7 Invitación | Tone reference for form header |
| `diego-narration.md` CTAs | *Traé a tu familia* — pasajeros field helper text |
| `carlos-narration.md` §8 | Soft close alignment |

#### 3. Required media assets

None required. Optional: `gs4-max-ext-silver` at 20% opacity behind sheet.

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `TestDriveForm` | Modal sheet 52% viewport height |
| `Input` / `Select` / date picker | 56 px height fields |
| Phone mask | Bolivia +591 |
| Day picker | Next 14 days; respect `dealership.json` hours |
| Hora chips | Mañana / Tarde / Hora específica |
| Pasajeros chips | Solo / Con familia |
| `LeadConfirmation` | Success state inline |
| API submit | POST `/api/leads` — MVP: mock OK |

**MVP fields (minimum):** Nombre · Teléfono · Día · Hora · Pasajeros

**Extended (production):** Vehículo actual · Primera vez GAC · Retoma → S27 pre-fill

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S13 → S14 | Sheet rise 400 ms; hero dims 40% |
| Submit success | Checkmark 600 ms |
| Success → S15 | Optional crossfade |
| Cancel | Sheet dismiss → S13 |

#### 6. Required CTA actions

| CTA | Target | Analytics |
|-----|--------|-----------|
| *Confirmar* | Submit → confirmation | `test_drive_requested` |
| *Cancelar* | S13 | — |
| Post-submit WhatsApp confirm | S15 (optional) | — |

---

### S15 — WhatsApp Handoff

**Route:** External `wa.me` + on-kiosk confirmation screen  
**Role in MVP:** Bolivia-primary conversion bridge

#### 1. Content source documents

| Document | Sections used |
|----------|---------------|
| `conversion-strategy.md` | § WhatsApp · pre-fill template |
| `lead-capture-strategy.md` | § QR continuation · kiosk ≠ personal device |
| `screen-map.md` | Behavior + return confirmation |
| `dealership.json` | **Real WhatsApp number required** |

**Pre-fill template (from conversion-strategy):**
```
Hola Viaggio, exploré el GAC GS4 MAX en el showroom digital.
Me interesa: [prueba de manejo / información y precio].
Temas que vi: [seguridad, familia, garantía].
Mi nombre: [___]
```

**Enrich from session:** topics visited, compare target, financing trim/plazo if applicable.

#### 2. Narration source documents

None.

#### 3. Required media assets

| Asset ID | Usage |
|----------|-------|
| `logo-viaggio-full` | Confirmation screen |
| QR code | Generated from `wa.me` link — 280×280 px, high contrast |

#### 4. Required UI components

| Component | Notes |
|-----------|-------|
| `WhatsAppHandoff` | Center QR + message preview |
| `WhatsAppQRFallback` | If kiosk cannot open `wa.me` |
| `buildWhatsAppLink()` | Session context injection |
| `LeadConfirmation` | *Continuá la conversación* headline |
| Phone number text | Below QR — readable at 2 m |

#### 5. Required transitions

| From → To | Treatment |
|-----------|-----------|
| S14 → S15 | Crossfade |
| S15 → S22/S13 | *Seguir explorando* |

#### 6. Required CTA actions

| CTA | Behavior | Analytics |
|-----|----------|-----------|
| QR scan (passive) | Opens WhatsApp on customer phone | `whatsapp_initiated` |
| *Seguir explorando* | S22 or S13 | — |
| Display phone as text | Tap-to-copy optional | — |

---

## Cross-Screen Dependency Matrix

| Screen | Depends on content | Depends on media P0 | Depends on session state | Blocks |
|--------|-------------------|---------------------|--------------------------|--------|
| S01 | Hero copy | `video-attract-loop` | — | S02 |
| S02 | Path copy | Logos | — | S03 |
| S03 | Vehicle stats | `gs4-max-hero-01` | path choice | S22 |
| S22 | Hero + hot-spot map | Hero assets | trust=0 | S25/S06/S08/S11 |
| S25 | FAQ + objeciones | Carlos avatar | trust counter | S24/S06 |
| S24 | Trust story chapters | Showroom photo / taller video | trust counter | S06 |
| S06 | Tour JSON + Carlos scripts | Step media ×5 | tour progress | S08/S13 |
| S08 | Topic JSON ×2 | ADAS + rear seats | topic views | S11/S14 |
| S11 | Compare template | Competitor thumb | — | S12 |
| S12 | Compare rows (fixed) | Thumbnails | compare complete | S26/S14 |
| S26 | `financing.json` | Bank logos (opt) | financing selection | S13 |
| S13 | Session recap logic | Hero thumb | full session | S14/S15 |
| S14 | Form copy | — | lead submit | S15 |
| S15 | WhatsApp template | QR | lead context | — |
| S19 | Settings labels | — | a11y prefs | all screens |
| S20 | Idle copy | — | idle timer | S01 |

---

## Engineering Sprint Order

Aligned with `pre-phase2-readiness.md` §9, scoped to 17 MVP screens:

| Sprint | Screens | Content tasks parallel |
|--------|---------|------------------------|
| **0 — Foundation** | Providers, `ContentBlockRenderer`, Ajv CI, routing scaffold | Fix compare airbag conflict; hydrate tour step narration |
| **1 — Entry + Hero** | S01, S02, S03, S22, S19, S20 | Acquire P0 hero + attract video; real logos |
| **2 — Trust arc** | S25, S24 | Structure FAQ JSON; Viaggio showroom photo; taller clip |
| **3 — Education** | S06, S08 | Carlos scripts → topic blocks; Diego → family-comfort |
| **4 — Validation + economics** | S11, S12, S26 | Complete compare rows; Viaggio cuota bands |
| **5 — Conversion** | S13, S14, S15 | Real `dealership.json`; WhatsApp template; lead API |

---

## Content Hydration Checklist (Pre-Build)

Tasks for content producer before engineering wires JSON:

- [ ] **MC-P0-01:** Map 5 FAQ items + answers to `content/vehicles/gs4-max/faq.json`
- [ ] **MC-P0-02:** Split S24 chapters into `content/vehicles/gs4-max/trust-story.json` content blocks
- [ ] **MC-P0-03:** Copy Carlos narration §2,4,5,7,8 into tour steps 1–5 topic `narration` blocks
- [ ] **MC-P0-04:** Copy Diego §1+§3 into `family-comfort.json` narration + feature grid
- [ ] **MC-P0-05:** Fix `compare.gs4-max.corolla-cross.json` — 8 airbags, add Espacio/Precio/Consumo/Reventa rows
- [ ] **MC-P0-06:** Create `financing.json` from Viaggio `price-list-orientativo`
- [ ] **MC-P0-07:** Replace `dealership.json` placeholders with Banzer showroom real data
- [ ] **MC-P0-08:** Register all mediaIds in `media-manifest.json` per `source-catalog.md`

---

## Acceptance Criteria (MVP Demo Gate)

Demo is **build-complete** when a consultant can run this path without placeholder copy or broken assets:

```
S01 → S02 (Primera vez) → S03 → S22 → S25 (open ≥2 FAQ) → S24 →
S06 (Carlos 5 steps) → S08 (ADAS) → S11 → S12 (Corolla Cross) →
S26 (2 trims × 3 plazos) → S13 → S14 (mock submit) → S15 (real wa.me QR)
```

| Criterion | Pass condition |
|-----------|----------------|
| Trust arc | No financing/test-drive CTA before 2 trust signals on first-time path |
| Copy | Zero lorem ipsum; all narration from approved docs |
| Compare honesty | ≥1 *Ellos ganan* row visible (reventa) |
| Financing | Disclaimer visible without scroll on S26 |
| WhatsApp | Real Viaggio number in QR |
| Idle | S20 fires at 3 min; reset returns to S01 |
| A11y | S19 L text scale readable at 2 m |
| Reduced motion | S01/S22/S06 use static fallbacks |

---

## Related Documents

- [Screen Map](./screen-map.md) — routes and exit CTAs
- [Creative Direction](./creative-direction.md) — visual system and transitions
- [Component Tree](./component-tree.md) — React hierarchy (extend with S22, S24, S25, S26)
- [MVP Content Readiness](./content/mvp-content-readiness.md) — per-experience readiness scores
- [Source Catalog](./assets/source-catalog.md) — P0 media acquisition
- [Pre-Phase 2 Readiness](./pre-phase2-readiness.md) — demo scope and blockers
- [Lead Capture Strategy](./lead-capture-strategy.md) — S14/S15 field and SLA spec

---

*Last updated: June 2026 — Implementation map for Viaggio Digital Showroom MVP engineering phase.*
