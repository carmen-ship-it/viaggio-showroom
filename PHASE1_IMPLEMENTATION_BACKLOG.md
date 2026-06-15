# Phase 1 Implementation Backlog — Digital Salesperson Transformation

**Date:** 14 June 2026  
**Scope:** Code + content changes only — **no new photography, video, logos, or dealership ops**  
**Companion:** [EXECUTIVE_TRANSFORMATION_PLAN.md](./EXECUTIVE_TRANSFORMATION_PLAN.md)  
**Goal:** *"Could this replace an average salesperson for the first 5 minutes?"* → Target **partial yes** after this backlog  

---

## Ranking Methodology

Each backlog item scored 1–5 on four axes:

| Axis | Weight | Question |
|------|--------|----------|
| **Revenue impact** | 35% | Does it move test drives, WhatsApp leads, or close probability? |
| **Customer confidence** | 25% | Does it resolve fear or build trust faster? |
| **Lead generation** | 25% | Does it increase capture rate or lead quality? |
| **Implementation speed** | 15% | Can it ship in ≤3 days without external dependencies? |

**Composite score** determines rank. **Sprint** groups items for sequential delivery.

---

## Executive Summary — Top 10 at a Glance

| Rank | Item | Composite | Sprint |
|------|------|-----------|--------|
| 1 | Guided discovery (5-question quiz) | 4.85 | A |
| 2 | Recommendation engine + single CTA component | 4.80 | A |
| 3 | Personalized route resolver | 4.75 | A |
| 4 | Kiosk test drive form (3 fields) | 4.70 | B |
| 5 | Remove SVG overlays on S01/S03 | 4.55 | B |
| 6 | S12 compare one-screen mode | 4.50 | B |
| 7 | Compare gating full recovery | 4.45 | B |
| 8 | Conversion focus mode (production) | 4.40 | B |
| 9 | S26 one-screen financing default | 4.35 | C |
| 10 | Session progress indicator | 4.20 | C |

**Estimated total Phase 1 duration:** 4–5 weeks (3 engineers) or 3 weeks (1 senior full-stack)  
**Estimated KPI lift (code-only):** Session→test drive 8% → 14%; time-to-CTA 12min → 5min  

---

## Full Backlog — Ranked

---

### #1 — Guided Discovery Experience

**ID:** `P1-DISCOVERY-001`  
**Sprint:** A · **Priority:** P0

**What to build:**
- New `DiscoveryScreen` after S02 (or replaces path choice)
- 5 tap questions with skip option on budget:
  1. First SUV or replacement?
  2. Family with children? (yes / no / soon)
  3. Primary use: city / Doble Vía / mixed
  4. Priority: safety / technology / price / space
  5. Monthly budget range (optional skip)
- Persist as `DiscoveryProfile` in `SessionProvider`
- Analytics: `discovery_completed` with profile summary

**Files likely touched:**
- `lib/session/SessionProvider.tsx` — add `DiscoveryProfile` type
- `types/discovery.ts` — new
- `components/screens/DiscoveryScreen.tsx` — new
- `components/screens/ExperienceEntry.tsx` — route to discovery before vehicles
- `content/shared/discovery.json` — question copy

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 5 | 5 | 3 | **4.85** |

**Acceptance criteria:**
- [ ] Completes in ≤60 seconds (5 taps max)
- [ ] Profile visible in session recap and WhatsApp message
- [ ] No scroll required on 1080p

---

### #2 — Digital Salesperson Recommendation Engine

**ID:** `P1-RECO-001`  
**Sprint:** A · **Priority:** P0

**What to build:**
- `lib/recommendations/getNextStep.ts` — inputs: `DiscoveryProfile`, session state, current screen
- Returns: `{ label, href, reason, personaId? }`
- `RecommendedNextStep` component — single prominent CTA with one-line salesperson reason
- Integrate on S22, S25, S11, S12, S26, S13

**Example outputs:**
- Trust buyer on S22 → *"Resolvamos tu duda sobre la marca"* → FAQ
- Family buyer on S22 → *"Mirá cómo entra tu familia"* → family-safety topic
- Compare-first pre-researched → *"Compará con lo que ya miraste"* → compare hub
- Post-compare → *"Veamos si la cuota calza"* → financing

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 5 | 4 | 3 | **4.80** |

**Acceptance criteria:**
- [ ] Every integrated screen shows exactly one recommended CTA above fold
- [ ] Reason text references discovery answers when available
- [ ] Fallback to canonical demo path when profile empty

---

### #3 — Personalized Route Selection

**ID:** `P1-ROUTE-001`  
**Sprint:** A · **Priority:** P0

**What to build:**
- `lib/routing/resolveBuyerPath.ts` — maps profile → ordered screen sequence
- Four path templates:

| Profile signal | Path (max screens before convert) |
|----------------|-----------------------------------|
| Trust priority / first_time GAC | FAQ → trust story (compressed) → ADAS → compare → finance → test drive |
| Family + children | Family-safety topic → espacio compare rows → finance → test drive |
| Price / affordability | Compare → finance (skip deep trust) → test drive |
| Pre-researched / compare priority | Hero → compare → finance → test drive |

- Middleware or client router respects path order for `TouchNav` next hrefs
- Enable `pre_researched` path (remove demo force lock for production profile)

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 4 | 5 | 3 | **4.75** |

**Acceptance criteria:**
- [ ] Family path ≤7 screens to test drive
- [ ] Pre-researched path ≤5 screens
- [ ] Trust path ≤9 screens (vs 14 today)

---

### #4 — Kiosk Test Drive Form (3 Fields)

**ID:** `P1-CONVERT-001`  
**Sprint:** B · **Priority:** P0

**What to build:**
- `TestDriveForm` variant prop: `kiosk` | `full`
- Kiosk: name + phone + preferred day (chip select, 7 days)
- Optional: `?mode=full` for consultant tablet
- Submit → API with `discoveryProfile` + session recap
- Auto-route to WhatsApp with `intent=test_drive`
- Move spouse/children/route/email to WhatsApp follow-up template

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 4 | 5 | 4 | **4.70** |

**Acceptance criteria:**
- [ ] Entire form above fold on 1080p
- [ ] Submit visible without scroll (sticky footer)
- [ ] Completion time ≤30 seconds

---

### #5 — Remove Wireframe Overlays (S01 / S03)

**ID:** `P1-MEDIA-001`  
**Sprint:** B · **Priority:** P0  
**Note:** Code-only; uses existing WebP files

**What to build:**
- `AttractLoop.tsx` — render `FallbackArtwork` only when `MediaResolver` reports missing asset
- `VehicleSelector.tsx` — same conditional
- Optional: price flash text overlay using existing `vehicle.keyStats` ("desde $us 42.900")

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 5 | 4 | 5 | **4.55** |

**Acceptance criteria:**
- [ ] Hero photo fully visible when file exists
- [ ] Silhouette only on true missing asset
- [ ] Price visible on attract within 3 seconds

---

### #6 — Compare Verdict One-Screen Mode (S12)

**ID:** `P1-COMPARE-001`  
**Sprint:** B · **Priority:** P0

**What to build:**
- Default view: scorecard (9/1/6) + 3-line honest summary + persona quote + primary CTA
- Comparison table: collapsed by category; expand on tap
- Sticky footer: *"Cuota orientativa"* + *"Agendar prueba"*
- Inline reventa counter: *"Toyota gana en reventa — ganás en equipamiento y garantía. Veamos la cuota."*

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 5 | 3 | 3 | **4.50** |

**Acceptance criteria:**
- [ ] Verdict + CTA visible without scroll on 1080p
- [ ] Expandable detail available for engaged buyers
- [ ] Reventa fear addressed before scroll

---

### #7 — Compare Gating Full Recovery (S11)

**ID:** `P1-COMPARE-002`  
**Sprint:** B · **Priority:** P1

**What to build:**
- Replace minimal gated state with:
  - Progress: *"Te falta 1 paso para comparar"*
  - Two tap cards: → FAQ, → ADAS topic
  - Show trust signal count: *"Exploraste X de 2 temas de confianza"*
- Hide unavailable competitors in all modes (not just demo)

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 4 | 4 | 5 | **4.45** |

**Acceptance criteria:**
- [ ] Zero dead-end screens in entire app
- [ ] Gated user reaches compare in ≤2 taps

---

### #8 — Conversion Focus Mode (Production)

**ID:** `P1-CONVERT-002`  
**Sprint:** B · **Priority:** P1

**What to build:**
- `lib/config/showroom-mode.ts` — `kiosk | consultant | full`
- Kiosk mode on S13/S14/S15:
  - Hide `ShowroomNav` (extend demo behavior to production flag)
  - S13: 2 cards only — test drive (2× size) + WhatsApp
  - Hide financing/share cards (already in demo via `hideExploration`)
- Env: `NEXT_PUBLIC_SHOWROOM_MODE=kiosk`

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 4 | 4 | 4 | **4.40** |

**Acceptance criteria:**
- [ ] Conversion screens show ≤2 choices
- [ ] Primary test drive card visually dominant
- [ ] Works without `DEMO_MODE=true`

---

### #9 — One-Screen Financing Default (S26)

**ID:** `P1-FINANCE-001`  
**Sprint:** C · **Priority:** P1

**What to build:**
- Kiosk default: profile-selected trim (4x2 for city, AWD for Doble Vía) + 36-month plazo
- Single cuota range displayed large
- TCO monthly total below (existing static data)
- *"Personalizar"* expands trim/plazo toggles
- Primary CTA: *"Agendar prueba de manejo"* (direct to S14, not generic convert hub)

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 5 | 4 | 3 | 4 | **4.35** |

**Acceptance criteria:**
- [ ] Affordability answer above fold
- [ ] Trim pre-selected from discovery
- [ ] Direct test drive path

---

### #10 — Session Progress Indicator

**ID:** `P1-UX-001`  
**Sprint:** C · **Priority:** P1

**What to build:**
- `JourneyProgressBar` component — milestones: Conociste · Confiaste · Comparaste · Cuota · Prueba
- Derived from session state (not page count)
- Fixed bottom or top strip; minimal height
- Hidden on S01 attract

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 5 | 3 | 5 | **4.20** |

**Acceptance criteria:**
- [ ] Visible on all screens except attract
- [ ] Updates on trust/compare/finance/test drive events
- [ ] Does not consume >48px height

---

### #11 — FAQ Objection Router (S25)

**ID:** `P1-TRUST-001`  
**Sprint:** C · **Priority:** P1

**What to build:**
- Replace accordion-first UX with 5 tap tiles matching FAQ items
- Tap → full-screen single answer + Carlos quote + sticky *"Siguiente paso"*
- Pre-select tile from discovery (`primaryConcern`: trust / resale / warranty / service)

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 5 | 3 | 4 | **4.15** |

**Acceptance criteria:**
- [ ] One objection resolved per screen without scroll
- [ ] Discovery pre-routes to relevant tile

---

### #12 — Enable Pre-Researched / Compare-First Path

**ID:** `P1-ROUTE-002`  
**Sprint:** C · **Priority:** P1

**What to build:**
- Remove `forceVisitorPath: "first_time"` lock in production
- Discovery answer *"Ya investigué online"* OR compare priority → hero → compare (skip trust arc)
- Trust content linked as *"¿Aún tenés dudas sobre la marca?"* optional branch

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 3 | 4 | 5 | **4.10** |

**Acceptance criteria:**
- [ ] Compare reachable in ≤3 screens for pre-researched profile
- [ ] Trust still accessible on demand

---

### #13 — Auto-Skip Vehicle Selector (Single SKU)

**ID:** `P1-ROUTE-003`  
**Sprint:** C · **Priority:** P2

**What to build:**
- When registry has one available vehicle + discovery complete → route `/vehicles` → `/vehicles/gs4-max/hero`
- Selector remains for multi-SKU future

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 3 | 4 | 5 | **3.85** |

---

### #14 — 4x2 vs AWD Internal Comparison

**ID:** `P1-COMPARE-003`  
**Sprint:** D · **Priority:** P2

**What to build:**
- `content/vehicles/gs4-max/compare/trim-4x2-vs-awd.json`
- Compare hub tab: *"Elegí tu versión"* vs *"Compará con otros"*
- Discovery city → highlight 4x2; Doble Vía → highlight AWD

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 4 | 3 | 3 | **3.80** |

---

### #15 — TCO Sliders (km/month + entrada %)

**ID:** `P1-FINANCE-002`  
**Sprint:** D · **Priority:** P2

**What to build:**
- Sliders on S26 expand panel
- Recalculate: adjusted cuota estimate + monthly all-in + 36-month total
- Uses existing `financing.json` ranges; linear interpolation (disclaimer: orientativo)

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 4 | 5 | 3 | 3 | **3.80** |

---

### #16 — Trust Tour Kiosk Compression (3 Steps)

**ID:** `P1-TRUST-002`  
**Sprint:** D · **Priority:** P2

**What to build:**
- `tour/trust-kiosk.json` — 3 steps: motor → ADAS → mantenimiento
- Route trust-path buyers to short tour
- Full 5-step tour for consultant mode

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 4 | 3 | 3 | **3.45** |

---

### #17 — Discovery Pre-Fill Test Drive + WhatsApp

**ID:** `P1-CONVERT-003`  
**Sprint:** D · **Priority:** P2

**What to build:**
- Map discovery → `testDriveDraft` defaults (children, route preference)
- Include discovery summary in WhatsApp message and lead API payload
- Consultant sees: *"Familia con 2 hijos · Ciudad · Prioridad: seguridad"*

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 3 | 5 | 4 | **3.65** |

---

### #18 — Trust Story One-Screen Compression (S24)

**ID:** `P1-TRUST-003`  
**Sprint:** D · **Priority:** P2

**What to build:**
- Kiosk mode: single screen with 3 proof cards (GAC global · Viaggio local · 5★/8 airbags)
- *"Profundizar"* links to full scroll story for engaged users
- No new media — uses existing copy from `trust-story.json`

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 4 | 2 | 4 | **3.40** |

---

### #19 — ADAS One-Screen Layout (S08)

**ID:** `P1-TRUST-004`  
**Sprint:** D · **Priority:** P2

**What to build:**
- Full-bleed dashboard hero above fold (existing `dashboard.webp`)
- 3 feature tiles: 8 airbags · 360° · AEB — no scroll for summary
- Uses existing topic content; layout only

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 4 | 2 | 4 | **3.40** |

---

### #20 — Idle Extension on Conversion Screens

**ID:** `P1-UX-002`  
**Sprint:** D · **Priority:** P3

**What to build:**
- `IdleManager.tsx` — 8 min timeout on S13/S14/S15 vs 5 min elsewhere
- Prompt at 5 min on conversion screens only

| Revenue | Confidence | Lead gen | Speed | **Composite** |
|---------|------------|----------|-------|---------------|
| 3 | 3 | 4 | 5 | **3.35** |

---

## Explicitly Excluded from Phase 1 (Requires Media/Ops)

| Item | Blocker | Phase |
|------|---------|-------|
| Live WhatsApp number | Ops config | A-parallel |
| Brand logos | Marketing assets | Media sprint |
| Corolla Cross photo | License | Media sprint |
| Attract loop video | MP4 production | Media sprint |
| Viaggio workshop video | Local shoot | Media sprint |
| Persona avatars Sofía/Diego | Photo shoot | Media sprint |
| Family proof photography | Local shoot | Media sprint |
| Social proof S23 | Owner recruitment + video | Phase 2 |
| Staff dashboard S35 | CRM integration | Phase 2 |

---

## Sprint Plan

### Sprint A — Salesperson Brain (Days 1–8)

| Item | Owner skill |
|------|-------------|
| #1 Discovery | Full-stack + UX |
| #2 Recommendation engine | Full-stack |
| #3 Route resolver | Full-stack |

**Exit gate:** Discovery → personalized next CTA on S22 works end-to-end.

---

### Sprint B — Kiosk Conversion (Days 9–16)

| Item | Owner skill |
|------|-------------|
| #4 Kiosk test drive form | Full-stack |
| #5 Remove overlays | Frontend |
| #6 Compare one-screen | Frontend |
| #7 Compare gating recovery | Frontend |
| #8 Conversion focus mode | Full-stack |

**Exit gate:** Standing user completes discover → compare verdict → test drive in <5 min without scroll on critical screens.

---

### Sprint C — Journey Compression (Days 17–23)

| Item | Owner skill |
|------|-------------|
| #9 One-screen financing | Frontend |
| #10 Progress indicator | Frontend |
| #11 FAQ objection router | Full-stack + content |
| #12 Pre-researched path | Full-stack |
| #13 Auto-skip selector | Full-stack |

**Exit gate:** Three buyer profiles (trust / family / affordability) each have distinct ≤7 screen paths.

---

### Sprint D — Decision Depth (Days 24–30)

| Item | Owner skill |
|------|-------------|
| #14 Trim compare | Content + frontend |
| #15 TCO sliders | Frontend |
| #16 Tour compression | Content |
| #17 Discovery pre-fill | Full-stack |
| #18 Trust story compression | Frontend |
| #19 ADAS one-screen | Frontend |
| #20 Idle extension | Frontend |

**Exit gate:** Affordability and trim objections handled in software; consultant receives qualified lead payload.

---

## Definition of Done — Phase 1 Complete

The digital showroom passes Phase 1 when:

1. **Discovery** — Every session starts with ≤5 tap qualification (skippable budget only)
2. **Personalization** — At least 3 distinct paths to test drive based on profile
3. **Single CTA** — S22, S25, S12, S26, S13 each show one recommended next step above fold
4. **No dead ends** — Every screen has actionable forward path
5. **No scroll decisions** — S12 verdict, S26 default, S14 kiosk form fit 1080p
6. **Lead quality** — WhatsApp message + API lead include discovery profile + session recap
7. **5-minute test** — Stakeholder completes family path to test drive submission in ≤5 min standing

**North-star retest:**

> *"Could this replace an average salesperson for the first 5 minutes?"*

**Target answer after Phase 1:** **Yes, with supervision** — consultant closes financing and handles emotional close; kiosk qualifies, proves, and captures test drive intent.

---

## Risk Register

| Risk | Mitigation |
|------|------------|
| Discovery adds friction at welcome | Keep to 5 taps; show progress; allow skip on budget |
| Route complexity hard to test | Golden-path E2E tests per profile |
| Demo mode conflicts | Single `showroom-mode` config replaces demo-only flags |
| Content team bottleneck for trim compare | Use existing financing.json data |
| Placeholder WhatsApp still broken | Flag in UI: *"Consultor te contacta en sala"* until ops updates number |

---

## Metrics to Instrument (Phase 1)

| Event | Purpose |
|-------|---------|
| `discovery_completed` | Profile distribution |
| `recommended_cta_tapped` | Engine effectiveness |
| `path_variant` | trust / family / affordability / compare-first |
| `compare_verdict_viewed` | Above-fold engagement |
| `test_drive_kiosk_submit` | Conversion |
| `time_to_test_drive_ms` | 5-minute goal tracking |

---

*Strategic context: [EXECUTIVE_TRANSFORMATION_PLAN.md](./EXECUTIVE_TRANSFORMATION_PLAN.md) · Audits: CEO_SALES_STRATEGY_AUDIT.md, KIOSK_UX_AUDIT.md, MEDIA_ASSET_AUDIT.md, EXECUTIVE_ROADMAP_V2.md*
