# MVP Implementation Audit — Viaggio Digital Showroom

**Audit date:** June 2026  
**Vehicle:** GAC GS4 MAX (`gs4-max`)  
**Scope:** Screens S01–S37 vs. planning docs and actual codebase  
**Method:** Read `implementation-map.md`, `screen-map.md`, `creative-direction.md`, `pre-phase2-readiness.md`, `family-conversion-implementation-plan.md`, `dealership-operations-blueprint.md`, `product-truth-matrix.md`; inspect routes under `app/(showroom)/`, components, and `content/`.

---

## Executive Summary

The codebase has moved beyond “planning only” into a **functional vertical slice** with cinematic entry (S01–S03), immersive hero (S22), trust surfaces (S24–S25), tour player (S06), topic renderer (S08), family bundle (Diego 7-step tour, `family-safety`, S34, S33), and stub conversion screens. **No screen fully meets MVP demo acceptance criteria** — all lack production media, several MVP-demo-path screens are missing or placeholder, and commercial/trust data remains unverified.

| Score | Value | Interpretation |
|-------|------:|----------------|
| **MVP Completion** | **51** | Demo path runnable with gaps; compare, financing hub, WhatsApp handoff, and overlays block consultant demo |
| **Production Readiness** | **29** | No lead API, staff ops, idle/a11y, real dealership data, or asset pipeline |
| **Family Conversion** | **58** | Family P0 bundle largely scaffolded; S14 family fields and co-decision continuity still weak |
| **Trust Conversion** | **55** | FAQ + trust story + Carlos tour strong; no testimonials, compare honesty, or truth-matrix gate |

---

## Status Legend

| Status | Meaning |
|--------|---------|
| **Complete** | Route + UI + content + navigation match spec; demo-ready without placeholders |
| **Partial** | Implemented with meaningful UI/content; gaps in media, data, navigation, or acceptance criteria |
| **Placeholder** | Route exists; stub UI or foundation shell only |
| **Not Implemented** | No route or no meaningful screen |

---

## Screen-by-Screen Audit (S01–S37)

### Entry & orientation

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S01** | Attract Loop | `/` | **Partial** | `ExperienceEntry`, `AttractLoop`, `CinematicShell`, `GlobalHeader`, `PlaceholderMedia` | `app/(showroom)/page.tsx` tagline; `vehicle.json` `heroMediaId` | `PlaceholderMedia` gradient (`gs4-max-attract-loop`); no `public/assets` video | **Yes** — touch → S02 | No | Partial — responsive layout | Partial — no video loop; Ken Burns not on attract |
| **S02** | Session Welcome | `/` (overlay) | **Partial** | `WelcomeScreen`, `ExperienceEntry`, `SessionProvider` | Hardcoded welcome; `vehicle.json` tagline; `personas.json` names | Ambient from prior attract placeholder | **Partial** — first-time → S03; pre-researched → Sofía experience (spec: S25/S22) | No | Partial | Partial — path cards OK; no S19 text scale |
| **S03** | Vehicle Selector | `/vehicles` | **Partial** | `VehicleSelector`, `CinematicShell`, `GlobalHeader` | `registry.json`, `vehicle.json` `keyStats` | `PlaceholderMedia` per card | **Yes** — GS4 MAX → S22; coming soon desaturated | No | Partial | Partial — no cinematic expand transition |

### Hub, tours & themes

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S04** | Vehicle Home Hub | `/vehicles/[slug]` | **Partial** | `CinematicShell`, `BackButton`, inline links | `vehicle.json`, `themes/*.json`, `tours/*.json` | None on hub | **Partial** — links to journeys, themes, warranty; not full trust/economics row | Partial — nav links to S14 | Partial | Partial — dev-style hub, not creative-direction cards |
| **S05** | Guided Tour Picker | overlay on S04 | **Not Implemented** | — | — | — | **No** — direct `/tour/*` and `/journey/*` instead | No | No | No |
| **S06** | Guided Tour Player | `/vehicles/[slug]/tour/[tourId]` · `/journey/[persona]` | **Partial** | `TourPlayer`, `TopicRenderer`, `CinematicShell` | `tours/trust.json` (5-step MVP slice), `tours/family.json` (7 steps), topic JSON | `PlaceholderMedia` per step | **Partial** — trust end → S13 placeholder; family end → S34/S33 | Partial — family exit CTAs | Partial | Partial — tour player OK; Carlos trust truncated to 5 steps |
| **S07** | Theme Landing | `/vehicles/[slug]/themes/[themeId]` | **Partial** | `ThemeExperience`, `CinematicShell`, `BackButton` | `themes/*.json`, topic lists | Theme hero via content blocks | **Yes** — topics → S08 | No | Partial | Partial |
| **S08** | Topic Deep Dive | `/vehicles/[slug]/themes/[themeId]/[topicId]` | **Partial** | `TopicRenderer`, `FamilySafetyTopicScreen`, `ContentBlockRenderer`, `CTARenderer` | `topics/*.json` (11+ files; `adas.json`, Diego family topics hydrated) | `PlaceholderMedia` via block `mediaId` | **Yes** — CTAs → S34/S33/tour; `family-safety` two-act | Partial — test drive routes to S34 not direct convert | Partial | Partial — family-safety kiosk-ready; generic topics less polished |

### Gallery, specs, compare

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S09** | Media Gallery | `/vehicles/[slug]/gallery` | **Not Implemented** | Route constant only | — | — | **No** | No | No | No |
| **S10** | Specifications | `/vehicles/[slug]/specs` | **Not Implemented** | Route constant only | — | — | **No** | No | No | No |
| **S11** | Compare Hub | `/vehicles/[slug]/compare` | **Not Implemented** | Link from `VehicleHero` only | Template `docs/content/templates/compare.gs4-max.corolla-cross.json` — **not in `content/`** | — | **No** — href 404 | No | No | No |
| **S12** | Compare Detail | `/vehicles/[slug]/compare/[targetId]` | **Not Implemented** | — | Compare template (airbag conflict 6 vs 8) | — | **No** | No | No | No |

### Conversion core

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S13** | Conversion Hub | `/vehicles/[slug]/convert` | **Placeholder** | `VehiclePageShell`, `PlaceholderPage`, `ShowroomNav` | Meta: `dealership.json` WhatsApp (placeholder) | None | **Partial** — reachable from tour end; no recap grid | **No** | No | No |
| **S14** | Test Drive Form | `/vehicles/[slug]/test-drive` | **Partial** | `TestDriveCTA`, `CinematicShell` | Inline copy; not `test-drive-form.json` | Hero placeholder dimmed | **Partial** — S34 → S14; no modal on S13 | **Partial** — mock submit (name + phone only) | Partial | Partial — missing día/hora/pasajeros/family fields |
| **S15** | WhatsApp Handoff | external + confirmation | **Not Implemented** | — | `conversion-strategy` templates not wired | QR not rendered post-submit | **No** | **No** — placeholder `+59100000000` | No | No |
| **S16** | Consultant Handoff Card | overlay | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S17** | Configurator (full) | `/vehicles/[slug]/configure` | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S18** | Session Summary | end-of-session | **Not Implemented** | — | — | — | **No** | No | No | No |

### Global overlays

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S19** | Settings / Accessibility | global overlay | **Not Implemented** | `useReducedMotion` hook exists; CSS `@media (prefers-reduced-motion)` in `globals.css` | — | — | **No** | No | No | **No** — no text scale / contrast toggles |
| **S20** | Idle Reset Prompt | global overlay | **Not Implemented** | — | — | — | **No** | No | N/A | **No** — kiosk hygiene blocker |

### Trust & credibility (extended)

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S21** | Pre-Visit QR Landing | `/visit/[slug]` or `/v/[slug]` | **Not Implemented** | — | — | — | **No** | No | **No** | No |
| **S22** | Immersive Vehicle Hero | `/vehicles/[slug]/hero` | **Partial** | `VehicleHero`, `GlobalHeader`, `TouchNav`, `PlaceholderMedia`; premium components (`HeroStatStrip`, `HotSpotMarker`) exist but **not wired** | `vehicle.json` stats, `metadata.heroHotspots` | `PlaceholderMedia` (`gs4-max-hero-01`) | **Partial** — FAQ/trust/family/compare links; default next → Diego journey | Partial — compare link 404 until trust threshold | Partial | **Partial** — hotspots desktop-only; no physical-digital banner |
| **S23** | Social Proof Hub | `/vehicles/[slug]/trust/testimonials` | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S24** | Viaggio & GAC Trust Story | `/vehicles/[slug]/trust/story` | **Partial** | `TrustStoryScreen`, `CarlosTrustExperienceScreen` (alt consolidated path) | `trust-story.json` | Chapter `mediaId` → placeholders | **Yes** — S25 ↔ S24 ↔ S06 tour | No | Partial | Partial — scroll-snap chapters; no taller video |
| **S25** | Objections & FAQ | `/vehicles/[slug]/trust/faq` | **Partial** | `FAQScreen`, `PersonaPortrait`, `SessionProvider` trust counter | `faq.json` (5 MVP items) | `persona-carlos-avatar` placeholder | **Yes** — S22 → S25 → S24 | No | Partial | **Partial** — accordion + Carlos column; claims unverified per truth matrix |

### Economics

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S26** | Financing Preview | `/vehicles/[slug]/economics/financing` | **Placeholder** | `PlaceholderPage`, `VehiclePageShell` | `vehicle.json` disclaimer only; **no `financing.json`** | — | **Partial** — nav link only | **No** | No | No |
| **S27** | Trade-In Intent | `/vehicles/[slug]/economics/trade-in` | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S28** | Ownership Cost Calculator | `/vehicles/[slug]/economics/tco` | **Not Implemented** | — | — | — | **No** | No | No | No |

### Product & share

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S29** | Warranty Deep-Dive | `/vehicles/[slug]/trust/warranty` | **Partial** | `TrustSectionRenderer`, `ContentBlockRenderer`, `CTARenderer` | `topics/warranty-terms.json`, `viaggio-service.json` | Placeholders | **Yes** — hub + hero links | Partial | Partial | Partial |
| **S30** | Configurator Lite | `/vehicles/[slug]/configure-lite` | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S31** | Comparison Shortlist | `/vehicles/[slug]/compare/saved` | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S32** | WhatsApp Bridge | modal / inline | **Not Implemented** | Partial logic in `FamilyShareScreen` wa.me | — | — | **No** | Partial — S33 only | Partial | Partial |
| **S33** | Family Share Summary | `/vehicles/[slug]/share` · `/share/[token]` | **Partial** | `FamilyShareScreen`, `SessionProvider` | `share-summary.json` | Hero placeholder; QR via share URL | **Yes** — Diego tour end, S34; token view compact | **Partial** — wa.me with placeholder number | **Yes** — compact recipient view | Partial |
| **S34** | Test Drive Logistics | `/vehicles/[slug]/test-drive/info` | **Partial** | `TestDriveLogisticsScreen` | `content/shared/test-drive-logistics.json` | Route map placeholder | **Yes** — Diego step 7, topic CTAs → S14/S33 | Partial — sets expectations before form | Partial | **Partial** — family-first copy present |

### Staff & resume

| Screen ID | Screen | Route | Status | Components Used | Content Source | Media Source | Navigation Wired? | Conversion Ready? | Mobile Ready? | Kiosk Ready? |
|-----------|--------|-------|--------|-----------------|--------------|--------------|-------------------|-------------------|---------------|--------------|
| **S35** | Staff Dashboard | `/staff` | **Not Implemented** | — | `dealership-operations-blueprint.md` spec only | — | **No** | No | No | No |
| **S36** | Consultant Live Handoff | modal / S13 | **Not Implemented** | — | — | — | **No** | No | No | No |
| **S37** | Post-Visit Resume | `/resume/[token]` | **Not Implemented** | localStorage token stub in S33 only | — | — | **No** | Partial — share token only | Partial — share link only | No |

---

## Implementation Inventory

### Routes implemented (18 page files)

| Path | Screen ID(s) |
|------|----------------|
| `/` | S01, S02 |
| `/vehicles` | S03 |
| `/vehicles/[slug]` | S04 |
| `/vehicles/[slug]/hero` | S22 |
| `/vehicles/[slug]/trust/faq` | S25 |
| `/vehicles/[slug]/trust/story` | S24 |
| `/vehicles/[slug]/trust/warranty` | S29 |
| `/vehicles/[slug]/tour/[tourId]` | S06 |
| `/vehicles/[slug]/journey/[persona]` | S06 (Carlos/Sofía/Diego tours) |
| `/vehicles/[slug]/experience/[persona]` | S24/S25 consolidated |
| `/vehicles/[slug]/themes/[themeId]` | S07 |
| `/vehicles/[slug]/themes/[themeId]/[topicId]` | S08 |
| `/vehicles/[slug]/economics/financing` | S26 (placeholder) |
| `/vehicles/[slug]/test-drive` | S14 |
| `/vehicles/[slug]/test-drive/info` | S34 |
| `/vehicles/[slug]/share` | S33 |
| `/vehicles/[slug]/share/[token]` | S33 mobile |
| `/vehicles/[slug]/convert` | S13 (placeholder) |

### Routes defined but missing pages

`compare`, `gallery`, `specs`, `configure-lite`, `configure`, `resume/[token]`, `/staff`, `/visit/[slug]`

### Content layer summary

| Asset | Status |
|-------|--------|
| `content/vehicles/gs4-max/faq.json` | ✅ 5 MVP FAQ items |
| `content/vehicles/gs4-max/trust-story.json` | ✅ Two chapters |
| `content/vehicles/gs4-max/tours/trust.json` | ✅ 8 steps (UI uses 5) |
| `content/vehicles/gs4-max/tours/family.json` | ✅ 7 Diego steps |
| `content/vehicles/gs4-max/topics/*` | ✅ 18 topic files incl. family + `family-safety` |
| `content/shared/dealership.json` | ❌ Placeholder address/WhatsApp |
| `content/vehicles/gs4-max/financing.json` | ❌ Missing |
| Compare in `content/` | ❌ Missing (template only in docs) |
| `public/assets/` | ❌ Empty — all media via `PlaceholderMedia` |

### Infrastructure present

| Capability | Status |
|------------|--------|
| `SessionProvider` + trust thresholds | ✅ Partial — compare/convert gating |
| `ContentBlockRenderer` + block types | ✅ |
| Analytics / lead API | ❌ No `app/api/` |
| Supabase | ❌ |
| S19 / S20 overlays | ❌ |
| Ajv CI on content | Unknown — not verified in this audit |

---

## Scoring Methodology

Scores weight **MVP demo path completion** (implementation-map demo script), **production gate criteria** (pre-phase2-readiness §2), **family P0 bundle** (family-conversion plan), and **trust arc** (S23–S25, S06, S12 honesty, truth matrix).

| Score | Calculation basis |
|-------|-------------------|
| MVP Completion | 14 demo-path screens + 2 overlays vs. acceptance criteria |
| Production Readiness | Ops, data, assets, security, staff layer |
| Family Conversion | Diego 7 scenes, family-safety, S34, S33, S14 family fields, hero bifurcation |
| Trust Conversion | FAQ, trust story, tour, testimonials, compare honesty, verified claims |

---

## Completion Percentages

| Metric | Score |
|--------|------:|
| **MVP Completion Score** | **51 / 100** |
| **Production Readiness Score** | **29 / 100** |
| **Family Conversion Score** | **58 / 100** |
| **Trust Conversion Score** | **55 / 100** |

### Screen status distribution (37 screens)

| Status | Count | Screen IDs |
|--------|------:|------------|
| Complete | 0 | — |
| Partial | 16 | S01–S04, S06–S08, S14, S22, S24–S25, S29, S33–S34 |
| Placeholder | 2 | S13, S26 |
| Not Implemented | 19 | S05, S09–S12, S15–S21, S23, S27–S28, S30–S32, S35–S37 |

### MVP demo path gap analysis

Documented demo path:

```
S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
```

| Step | Status | Blocker |
|------|--------|---------|
| S01–S03, S22, S25, S24, S06, S08 | Partial | Placeholder media; path routing bugs |
| S11, S12 | Missing | **Demo stops at validation** |
| S26 | Placeholder | No cuota UI or `financing.json` |
| S13 | Placeholder | No session recap or conversion grid |
| S14 | Partial | Minimal form; no API |
| S15 | Missing | No QR confirmation screen |
| S19, S20 | Missing | Kiosk hygiene / group viewing |

---

## Top 10 Missing Screens

| Rank | Screen | Why it blocks progress |
|------|--------|------------------------|
| 1 | **S11** Compare Hub | MVP demo validation step; hero links 404 |
| 2 | **S12** Compare Detail | Honest *Ellos ganan* row required for trust arc closure |
| 3 | **S15** WhatsApp Handoff | Primary Bolivia conversion bridge after S14 |
| 4 | **S13** Conversion Hub | Session recap + equal-weight paths missing (placeholder only) |
| 5 | **S26** Financing Preview | Cuota warm-up — #1 floor question unanswered |
| 6 | **S20** Idle Reset | Shared kiosk privacy requirement |
| 7 | **S19** Settings / A11y | 2 m group viewing; text scale for demo |
| 8 | **S23** Social Proof | Chinese-brand skepticism; no owner testimonials |
| 9 | **S35** Staff Dashboard | Production ops; demo uses consultant standby |
| 10 | **S36** Consultant Live Handoff | Floor handoff dead-end without modal + alert |

---

## Top 10 Missing Features

| Rank | Feature | Evidence |
|------|---------|----------|
| 1 | Compare flow (S11/S12 + JSON in `content/`) | No pages; template has 6 vs 8 airbag conflict |
| 2 | Conversion hub with dynamic session recap | S13 is `PlaceholderPage` |
| 3 | Financing preview (trim × plazo × cuota) | S26 placeholder; no `financing.json` |
| 4 | WhatsApp handoff with QR + session context | S15 absent; `dealership.json` fake number |
| 5 | Lead capture API | No `/api/leads`; mock form submit only |
| 6 | Idle timer + reset overlay | S20 not implemented |
| 7 | Accessibility settings overlay | S19 not implemented |
| 8 | Trust-before-desire path enforcement | Pre-researched → Sofía desire (`ExperienceEntry.tsx`) |
| 9 | Product truth gating | Unverified claims in FAQ/stats (truth matrix P0 conflicts) |
| 10 | Staff handoff queue (S35/S36 + Realtime) | Not started |

---

## Top 10 Missing Assets

| Rank | Asset ID | Screens affected |
|------|----------|------------------|
| 1 | `video-attract-loop` | S01 |
| 2 | `gs4-max-hero-01` (real photography) | S01, S03, S22, S13 |
| 3 | `logo-viaggio-full` + `logo-gac-full` | S01, S02, global header |
| 4 | `persona-carlos-avatar` (+ Diego, Sofía) | S25, S06, S08, S12 |
| 5 | Viaggio showroom photo + `video-viaggio-taller` | S24, S29 |
| 6 | `video-trust-adas` | S06 step 4, S08 ADAS |
| 7 | `warranty-timeline-5yr-150k` | S06, S29 |
| 8 | Diego scene media (`gs4-max-diego-*` × 7) | S06 family tour, S08 |
| 9 | `compare-corolla-cross` | S11, S12 |
| 10 | `price-list-orientativo` / bank logos | S22 stats, S26 |

**Note:** `public/assets/` is empty; all visuals use `PlaceholderMedia` gradients.

---

## Top 10 Highest-ROI Improvements

| Rank | Improvement | Impact | Effort |
|------|-------------|--------|--------|
| 1 | **Ship S11 + S12** with fixed compare JSON (8 airbags, reventa row) | Unblocks MVP demo validation arc | Medium |
| 2 | **Replace `dealership.json`** with real WhatsApp, Banzer address, hours | S13–S15, S33, footers trustworthy | Low (ops) |
| 3 | **Build S13 Conversion Hub** with session recap chips | Closes demo script ending | Medium |
| 4 | **S26 financing preview** with mock cuota bands + disclaimer | Answers #1 floor question | Medium |
| 5 | **S15 WhatsApp confirmation** (QR + pre-fill from session) | Bolivia-primary conversion | Medium |
| 6 | **Acquire P0 hero + attract media** (or approved GAC pack) | Product theater credibility | Medium (creative) |
| 7 | **Fix S02 routing** — pre-researched → S25/S22, not Sofía desire | Trust-before-desire rule | Low |
| 8 | **S20 idle reset + S19 text scale** | Kiosk demo readiness | Medium |
| 9 | **Extend S14** with día/hora/pasajeros + route from S34 | Family conversion + no-shows | Medium |
| 10 | **Truth-matrix gate** — block stat callouts until approved values | Prevents demo trust damage | Medium (process + content) |

---

## Prioritized Build Roadmap

### P0 — Required for dealership demo

Must complete before Viaggio floor demo with scripted path:

| # | Deliverable | Screens |
|---|-------------|---------|
| P0-1 | Compare hub + detail with corrected `compare.gs4-max.corolla-cross.json` in `content/` | S11, S12 |
| P0-2 | Conversion hub with session recap + four paths (test drive, WhatsApp, share stub, consultant message) | S13 |
| P0-3 | Financing preview UI with mock cuota + visible disclaimer | S26 |
| P0-4 | WhatsApp handoff screen post-submit | S15 |
| P0-5 | Real `dealership.json` (WhatsApp, address, coordinates) | S13–S15, S24, S33 |
| P0-6 | P0 media minimum: hero still, attract loop or Ken Burns fallback, Carlos avatar | S01, S22, S25 |
| P0-7 | Idle reset overlay | S20 |
| P0-8 | Settings overlay (text S/M/L, reduce motion toggle) | S19 |
| P0-9 | Demo path navigation fixes (S02 paths, S22 → trust default, compare gated) | S02, S22 |
| P0-10 | Extended test drive form (día, hora, pasajeros) + mock lead log | S14 |
| P0-11 | Viaggio/GAC sign-off on FAQ + stat claims per truth matrix | S03, S22, S25 |

**P0 exit gate:** Consultant runs full demo path without 404s, placeholder phone, or lorem; ≥2 FAQ opens before compare CTA; one *Ellos ganan* row visible.

---

### P1 — Required for customer pilot

| # | Deliverable | Screens |
|---|-------------|---------|
| P1-1 | Lead API + session metadata attachment | S14, S15 |
| P1-2 | S23 social proof (≥1 testimonial) | S23 |
| P1-3 | S34 → S14 pre-fill + family attendee fields | S34, S14 |
| P1-4 | S33 session-derived bullets + real wa.me tracking | S33 |
| P1-5 | S37 resume token (localStorage MVP → Supabase) | S37, S20 |
| P1-6 | S36 live handoff modal + S35 dashboard MVP (polling) | S35, S36 |
| P1-7 | Full Carlos trust tour content hydration (steps 6–8 optional) | S06 |
| P1-8 | `financing.json` from Viaggio finance desk | S26 |
| P1-9 | Analytics event schema extension | All |
| P1-10 | Offline/service worker for kiosk LAN | Global |

---

### P2 — Required for production launch

| # | Deliverable | Screens |
|---|-------------|---------|
| P2-1 | S21 pre-visit QR + UTM | S21 |
| P2-2 | S28 TCO + S27 trade-in | S28, S27 |
| P2-3 | S30 configurator lite | S30 |
| P2-4 | S09 gallery + S10 specs | S09, S10 |
| P2-5 | S32 rich WhatsApp bridge | S32 |
| P2-6 | S31 comparison shortlist | S31 |
| P2-7 | Full media pipeline + CDN | All media screens |
| P2-8 | Zoho CRM sync | S35, leads |
| P2-9 | Multi-kiosk `device_id` + rate limiting | API |
| P2-10 | GAC Bolivia legal review archive (`product-truth-matrix.approved.md`) | Content |

---

## Recommended Next Implementation Sprint

**Sprint: Demo Path Closure (2 weeks)**

Focus: make the documented MVP demo runnable end-to-end on a kiosk without broken links or fake contact data.

| Week | Engineering | Content / ops (parallel) |
|------|-------------|--------------------------|
| **Week 1** | S11/S12 compare pages + loader; fix S02 path routing; S13 recap hub; S20 idle + S19 a11y shell | Fix compare JSON (8 airbags, reventa row); Viaggio WhatsApp + address |
| **Week 2** | S26 financing UI; S15 WhatsApp QR; extend S14 form; wire hero → demo script nav | Mock `financing.json`; P0 hero/attract assets or approved fallbacks; truth-matrix sign-off on FAQ stats |

**Sprint exit criteria:**

- [ ] Demo path S01→S15 completable without 404
- [ ] Real Viaggio WhatsApp in QR
- [ ] Compare shows ≥1 *Ellos ganan* row
- [ ] S26 disclaimer visible without scroll
- [ ] S20 fires at 3 min idle
- [ ] No Confidence-Low stats live without disclaimer (truth matrix)

---

## Critical Findings

1. **Family P0 bundle is ahead of MVP demo path** — Diego 7-step tour, `family-safety`, S34, and S33 are partially implemented while compare and conversion hub lag.
2. **Trust and desire paths collide** — Pre-researched visitors route to Sofía experience; hero default next is Diego tour, not trust FAQ — violates trust-before-desire for Chinese-brand skeptics.
3. **All media is synthetic** — No files under `public/assets/`; cinematic goals unmet until acquisition sprint.
4. **Commercial data is blocking conversion** — Placeholder phone invalidates S33 WhatsApp and any handoff demo.
5. **Compare is the largest single MVP gap** — Linked from S22 after trust threshold but route does not exist.
6. **Screen ID mapping inconsistency** — Journey routes reuse S06 for Carlos, S25 for Sofía tour, S26 for Diego tour; financing route also labeled S26 — confusing for analytics.

---

## Document Control

| Field | Value |
|-------|-------|
| Created | June 2026 |
| Inputs | Planning docs listed in header + codebase inspection |
| Next action | Execute **Demo Path Closure** sprint (P0 table) |
| Related | `implementation-map.md`, `product-truth-matrix.md`, `family-conversion-implementation-plan.md` |

*Audit only — no code changes. Re-run after each sprint against demo exit criteria.*
