# Demo Readiness Scorecard — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Vehicle:** GAC GS4 MAX (`gs4-max`) · Viaggio Motors Santa Cruz  
**Assumption:** All active implementation workers have completed and merged to `main` before this audit.  
**Method:** Read-only review of planning docs, `content/`, `app/`, `components/`, `public/assets/`, and `npm run build`.

**Docs reviewed:** `screen-map.md`, `implementation-map.md`, `pre-phase2-readiness.md`, `product-truth-matrix.md`, `mvp-content-readiness.md`, `asset-readiness-audit.md`, `operations-gap-analysis.md`, `family-conversion-implementation-plan.md`, `lead-capture-strategy.md`, `conversion-strategy.md`, `technical-architecture.md`

**Demo path reference:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15 (+ S19, S20 overlays)

---

## Executive Summary

The showroom is **architecturally mature and partially walkable** — trust content, persona journeys, family conversion surfaces, and a media manifest pipeline exist in code. It is **not yet credible as a dealership-floor demo** because the scripted conversion arc breaks at compare, financing, and conversion hub; every visual renders as gradient placeholders; commercial data is still fake; and **production build currently fails** on a type error in `VehicleHero.tsx`.

| Verdict | Assessment |
|---------|------------|
| **Walk a curious customer through trust + product** | **Partial GO** — S22, S25, S24, Carlos/Diego journeys, S08 topics, S34, S33 work with strong copy |
| **Complete the documented 14-screen demo script end-to-end** | **NO GO** — S11/S12 missing (404), S13/S26 stub pages despite built components, S15 has no screen |
| **Deploy to kiosk hardware tomorrow** | **NO GO** — `npm run build` fails; zero files in `public/assets/` |
| **Run live dealership operations** | **NO GO** — no S35/S36, no lead backend, placeholder WhatsApp/address |

---

## Overall Scores

| Metric | Score | Rationale |
|--------|------:|-----------|
| **MVP Completion %** | **52%** | 17-screen demo scope avg.; core trust/product ~80% built; compare/economics/conversion/ops ~15% |
| **Visual Completion %** | **18%** | Media framework + manifest deployed; 0/33 asset files on disk; hero/attract still on `PlaceholderMedia` |
| **Conversion Completion %** | **41%** | S34, S33, S14 UI exist; S13/S26/S11/S12/S15/S36 missing or stub; no lead pipeline |
| **Content Completion %** | **74%** | FAQ, trust story, tours, family-safety, logistics, financing JSON strong; compare + dealership + truth conflicts remain |
| **Asset Completion %** | **8%** | Manifest + resolver scaffold only; no `.webp`, `.mp4`, `.svg` in `public/assets/` |
| **Dealership Demo Readiness %** | **36%** | Impressive for a dev walkthrough; embarrassing for a paying customer without a consultant script and dead-end avoidance |
| **Production Readiness %** | **11%** | Build broken, no Supabase, no staff layer, no analytics instrumentation, no kiosk runbook |

**Scoring legend (per-screen columns below):**  
`Yes` = shippable for demo with Viaggio sign-off · `Partial` = functional but visibly incomplete · `No` = missing or blocking

---

## Screen Scorecard (S01–S37)

| Screen ID | Screen | Route | Status | Conversion Ready? | Visual Ready? | Content Ready? | Asset Ready? | Demo Ready? |
|-----------|--------|-------|--------|-------------------|---------------|----------------|--------------|-------------|
| **S01** | Attract Loop | `/` | **Partial** | No | No | Yes | No | Partial |
| **S02** | Session Welcome | `/` (post-touch) | **Implemented** | Partial | No | Yes | No | Partial |
| **S03** | Vehicle Selector | `/vehicles` | **Implemented** | Partial | No | Yes | No | Yes |
| **S04** | Vehicle Home Hub | `/vehicles/[slug]` | **Partial** | Partial | No | Partial | No | Partial |
| **S05** | Guided Tour Picker | overlay on S04 | **Missing** | No | No | Partial | No | No |
| **S06** | Guided Tour Player | `/vehicles/[slug]/tour/[tourId]` | **Implemented** | Partial | No | Yes | No | Yes |
| **S07** | Theme Landing | `/vehicles/[slug]/themes/[themeId]` | **Implemented** | Partial | No | Yes | No | Partial |
| **S08** | Topic Deep Dive | `/vehicles/[slug]/themes/[themeId]/[topicId]` | **Implemented** | Partial | No | Yes | No | Yes |
| **S09** | Media Gallery | `/vehicles/[slug]/gallery` | **Missing** | No | No | No | No | No |
| **S10** | Specifications | `/vehicles/[slug]/specs` | **Missing** | No | No | No | No | No |
| **S11** | Compare Hub | `/vehicles/[slug]/compare` | **Missing** | No | No | No | No | No |
| **S12** | Compare Detail | `/vehicles/[slug]/compare/[targetId]` | **Missing** | No | No | No | No | No |
| **S13** | Conversion Hub | `/vehicles/[slug]/convert` | **Stub** | No | No | Partial | No | No |
| **S14** | Test Drive Form | `/vehicles/[slug]/test-drive` | **Partial** | Partial | No | Yes | No | Partial |
| **S15** | WhatsApp Handoff | external + tracking | **Missing** | Partial | No | Partial | No | No |
| **S16** | Consultant Handoff Card | overlay | **Missing** | No | No | No | No | No |
| **S17** | Configurator (full) | `/vehicles/[slug]/configure` | **Missing** | No | No | No | No | No |
| **S18** | Session Summary | end-of-session | **Missing** | No | No | No | No | No |
| **S19** | Settings / A11y | global overlay | **Missing** | No | No | Partial | No | No |
| **S20** | Idle Reset Prompt | global overlay | **Missing** | No | No | Partial | No | No |
| **S21** | Pre-Visit QR Landing | `/visit/[slug]` | **Missing** | No | No | No | No | No |
| **S22** | Immersive Vehicle Hero | `/vehicles/[slug]/hero` | **Implemented** | Partial | No | Yes | No | Yes |
| **S23** | Social Proof Hub | `/vehicles/[slug]/trust/testimonials` | **Missing** | No | No | No | No | No |
| **S24** | Viaggio & GAC Trust Story | `/vehicles/[slug]/trust/story` | **Implemented** | Partial | No | Yes | No | Yes |
| **S25** | Objections & FAQ | `/vehicles/[slug]/trust/faq` | **Implemented** | Partial | No | Yes | No | Yes |
| **S26** | Financing Preview | `/vehicles/[slug]/economics/financing` | **Stub** | No | No | Yes | No | No |
| **S27** | Trade-In Intent | `/vehicles/[slug]/economics/trade-in` | **Missing** | No | No | No | No | No |
| **S28** | Ownership Cost Calculator | `/vehicles/[slug]/economics/tco` | **Missing** | No | No | No | No | No |
| **S29** | Warranty Deep-Dive | `/vehicles/[slug]/trust/warranty` | **Partial** | Partial | No | Yes | No | Partial |
| **S30** | Configurator Lite | `/vehicles/[slug]/configure-lite` | **Missing** | No | No | No | No | No |
| **S31** | Comparison Shortlist | `/vehicles/[slug]/compare/saved` | **Missing** | No | No | No | No | No |
| **S32** | WhatsApp Bridge | modal / inline | **Missing** | Partial | No | Partial | No | No |
| **S33** | Family Share Summary | `/vehicles/[slug]/share` | **Implemented** | Yes | No | Yes | No | Yes |
| **S34** | Test Drive Logistics | `/vehicles/[slug]/test-drive/info` | **Implemented** | Yes | No | Yes | No | Yes |
| **S35** | Staff Dashboard | `/staff` | **Missing** | No | No | No | No | No |
| **S36** | Consultant Live Handoff | modal / S13 | **Missing** | No | No | Partial | No | No |
| **S37** | Post-Visit Resume | `/resume/[token]` | **Missing** | Partial | No | No | No | No |

### Screen notes (post-worker state)

**Implemented highlights**
- **S01–S03, S22:** Entry arc works; `SessionProvider` stores visitor path; S22 has hot-spots, trust-gated compare CTA, premium motion shell.
- **S06 + journeys:** `TourPlayer` drives trust tour (5-step MVP slice), full 7-step Diego family tour, and desire tour (2 steps). `/journey/diego` is the family conversion centerpiece.
- **S08:** `ContentBlockRenderer` + 20+ topic JSON files; `family-safety` uses dedicated dual-persona screen.
- **S24/S25:** Standalone FAQ and trust-story pages plus Carlos combined experience at `/experience/carlos`.
- **S33/S34:** Family share (WhatsApp + QR) and test-drive logistics are content-complete and navigable.
- **Media framework:** `ShowroomMediaBoundary` + `media-manifest.json` (33 entries) + `MediaSurface`/`HeroMedia`/`TourMedia` — but most hero/attract paths still call `PlaceholderMedia`.

**Critical gaps vs. demo script**
- **S11/S12:** `routes.compare()` linked from S22 but **no `app/` routes** — customer hits 404 after earning compare CTA.
- **S13/S26:** Pages render `PlaceholderPage`; `ConversionHubScreen` and `FinancingPreviewScreen` **exist but are not wired** to routes.
- **S15:** `routes.whatsapp()` defined; **no page**; no post-handoff confirmation screen.
- **S05, S19, S20:** Required kiosk overlays absent — no tour picker modal, no a11y, no idle privacy reset.
- **S23:** No local testimonials — Chinese-brand objection handled only by copy, not proof video.

**Routing deviations**
- Pre-researched path (S02) routes to Sofía experience, not S25 FAQ shortcut per `screen-map.md`.
- Carlos trust arc split across `/experience/carlos`, `/trust/faq`, `/trust/story`, and `/tour/trust` — walkable but IA differs from spec.

---

## Conversion Flow Verification

| Flow step | Expected | Actual state |
|-----------|----------|--------------|
| Trust threshold → compare CTA | After 2+ trust signals | ✅ `SessionProvider` gates S22 compare link |
| Compare → test drive | S12 CTA → S34 → S14 | ❌ Compare routes missing |
| Financing warm-up → convert | S26 → S13 | ❌ S26 stub; financing JSON unused in UI |
| Conversion hub recap | S13 session chips + paths | ❌ Stub page; `ConversionHubScreen` unwired |
| Test drive capture | S34 → S14 → backend | ⚠️ S34 ✅; S14 client-only submit (no API/Supabase) |
| WhatsApp handoff | S15 confirmation + `wa.me` | ⚠️ `wa.me` only on S33; fake `+59100000000` |
| Family co-decision | S33 → spouse mobile → resume | ⚠️ S33 ✅; `/share/[token]` static preview only; no S37 |
| Consultant handoff | S36 → S35 alert | ❌ Not built |
| Lead persistence | Supabase + consultant queue | ❌ No `app/api/` lead routes; analytics types only |

---

## Media Framework Verification

| Layer | Status |
|-------|--------|
| `content/vehicles/gs4-max/media-manifest.json` | ✅ 33 assets catalogued with fallbacks |
| `lib/media/resolve.ts` + `validateMediaAssets()` | ✅ Implemented |
| `ShowroomMediaBoundary` on vehicle routes | ✅ Wired in `vehicles/[slug]/layout.tsx` |
| `HeroMedia`, `TourMedia`, `TrustMedia` | ✅ Built; limited adoption |
| `AttractLoop`, `KenBurnsBackground`, most screens | ❌ Still `PlaceholderMedia` gradients |
| `public/assets/` files | ❌ **0 media files** (scaffold `.gitkeep` only) |
| S01 video loop | ❌ `video-attract-loop` in manifest; not used in `AttractLoop` |

---

## Content & Truth Verification

| Area | Readiness | Blockers |
|------|-----------|----------|
| FAQ (S25) | **High** — 5 MVP items in `faq.json` | Expand to 10; add repuestos/bancos FAQs |
| Trust story (S24) | **High** — chapters + narration | Needs real Viaggio taller video |
| Carlos trust tour | **High** — 8 steps, 5 shown in MVP | Topic hydration complete |
| Diego family tour | **High** — 7 scenes + transitions | Emotional layer strong; lifestyle assets missing |
| Sofía desire tour | **Low** — 2 steps in `desire.json` | Design topic thin; screen-size conflict (10.1" vs 12.3") |
| Compare data | **Not deployable** — template only in `docs/content/templates/`; anchor airbags **6** vs FAQ **8** | Must not ship until `product-truth-matrix` P0 closed |
| `dealership.json` | **Placeholder** — `[Dirección…]`, `+59100000000` | Blocks all real CTAs |
| `financing.json` | **Ready** — BOB bands, 2 trims, disclaimers | UI not connected |
| Product truth conflicts | **9 P0** per `product-truth-matrix.md` | Screen size, airbags, transmission, price BOB |

---

## Remaining P0 Blockers (Post-Worker)

Only blockers that **still remain** after assumed worker merges.

### 1. Compare routes and data (S11/S12)

| | |
|--|--|
| **Impact** | Demo script dead-ends at 404; rational validation stage missing; `#1` objection handling incomplete without side-by-side Corolla Cross |
| **Effort** | **M** — 3–5 days: deploy `compare.gs4-max.corolla-cross.json` to `content/`, fix airbags to 8, build hub + detail pages |
| **Recommended fix** | Add `app/(showroom)/vehicles/[slug]/compare/page.tsx` and `[targetId]/page.tsx`; wire `CompareHubScreen`/`CompareDetailScreen`; resolve P0 airbags + screen-size in compare rows before render |

### 2. Wire conversion economics screens (S13, S26)

| | |
|--|--|
| **Impact** | Built `ConversionHubScreen` and `FinancingPreviewScreen` are unreachable; demo cannot close with session recap, financing warm-up, or test-drive sheet from hub |
| **Effort** | **S** — 0.5–1 day: replace `PlaceholderPage` in convert + financing routes with existing components |
| **Recommended fix** | Swap page implementations; connect `TestDriveForm` sheet from S13; pass `getFinancing(slug)` to `FinancingPreviewScreen` |

### 3. Zero acquired media assets

| | |
|--|--|
| **Impact** | Every screen shows labeled gradients — reads as prototype, not "product theater"; undermines Chinese-brand trust positioning |
| **Effort** | **L** — 1–2 weeks parallel: GAC official pack + half-day Viaggio shoot (showroom, taller, 1 lifestyle) |
| **Recommended fix** | Execute P0 acquisition per `asset-acquisition-plan.md`; migrate `AttractLoop`/`KenBurnsBackground` to `MediaSurface`; minimum 8 files: hero, dashboard, rear seats, logos ×2, Carlos avatar, attract video, showroom photo |

### 4. Placeholder dealership commercial data

| | |
|--|--|
| **Impact** | WhatsApp opens fake number; address/hours undermine trust on S13/S24/S34; legal risk if financing shown with unapproved bands |
| **Effort** | **S** — 1–2 days Viaggio ops (not engineering) |
| **Recommended fix** | Replace `content/shared/dealership.json` with Banzer address, real WhatsApp, approved hours; Viaggio finance sign-off on `financing.json` cuota bands |

### 5. Production build failure

| | |
|--|--|
| **Impact** | Cannot deploy static export or kiosk build; blocks any on-site install |
| **Effort** | **S** — <1 hour |
| **Recommended fix** | Fix circular `HeroHotspot` type export in `VehicleHero.tsx`; run `npm run build` in CI gate |

### 6. No lead capture backend

| | |
|--|--|
| **Impact** | Test drive submissions evaporate; consultants have no queue; demo "confirmar prueba" is theater only |
| **Effort** | **M** — 3–5 days for Supabase anon insert + API route + console dashboard; **L** for S35 |
| **Recommended fix** | MVP: `POST /api/leads` → Supabase with session context; demo fallback: email webhook to Viaggio ventas |

### 7. Kiosk privacy overlay (S20) + a11y (S19)

| | |
|--|--|
| **Impact** | Shared kiosk shows prior visitor PII; no text scaling for group viewing; fails showroom hygiene expectation |
| **Effort** | **M** — 2–3 days |
| **Recommended fix** | `IdleManager` at showroom layout level: 3 min prompt, 5 min reset; `SettingsOverlay` with text scale + reduce motion |

### 8. S15 WhatsApp confirmation screen

| | |
|--|--|
| **Impact** | Demo script ends without closure moment; customer unsure what happened after `wa.me` |
| **Effort** | **S** — 1 day |
| **Recommended fix** | Add `/vehicles/[slug]/whatsapp` page with QR, pre-filled message preview via `buildWhatsAppLink()`, and "Seguir explorando" return |

### 9. Product truth P0 conflicts live in content

| | |
|--|--|
| **Impact** | Customer compares kiosk claims to floor unit — screen size, airbags, transmission inconsistencies destroy Carlos credibility |
| **Effort** | **S** content + **S** engineering — 2–3 days after Viaggio floor-unit sign-off |
| **Recommended fix** | Close rows in `product-truth-matrix.md`; bump `contentVersion`; block Ajv CI on conflict |

### 10. Staff handoff layer (S35/S36)

| | |
|--|--|
| **Impact** | "Consultor ahora" is a dead end; sales manager cannot see sessions; blueprint SLA impossible |
| **Effort** | **L** — 1–2 sprints |
| **Recommended fix** | Demo workaround: consultant stands beside kiosk; production: S36 modal + Supabase Realtime → S35 tablet queue |

### 11. S23 Social proof (local testimonials)

| | |
|--|--|
| **Impact** | Santa Cruz Chinese-brand skepticism unanswered with proof; trust arc is copy-only |
| **Effort** | **M** — content production: minimum 1 verified owner video |
| **Recommended fix** | Film 1 Equipetrol/Plan 3000 owner (30–60s); add `/trust/testimonials` route |

### 12. Media adoption gap on primary surfaces

| | |
|--|--|
| **Impact** | Manifest pipeline exists but S01/S22 still bypass it — assets won't show even after acquisition without migration |
| **Effort** | **S** — 1–2 days engineering |
| **Recommended fix** | Replace `PlaceholderMedia` in `AttractLoop`, `KenBurnsBackground`, `VehicleHero` with `HeroMedia`/`MediaSurface` |

---

## Next Best Sprint (Ranked by ROI)

Items ordered by **dealership demo lift ÷ effort**. Priority tier indicates gate.

| Rank | Item | Priority | ROI rationale | Effort |
|------|------|----------|---------------|--------|
| 1 | Fix build + wire S13/S26 to existing screens | **P0** | Unlocks demo close; hours not days | S |
| 2 | Viaggio `dealership.json` + finance sign-off | **P0** | Real WhatsApp alone fixes conversion theater | S (ops) |
| 3 | Implement S11/S12 + deploy compare JSON (truth-fixed) | **P0** | Removes 404; completes validation arc | M |
| 4 | Acquire + bind P0 media (hero, dashboard, logos, 1 video) | **P0** | Largest perceptual jump for customers | L |
| 5 | S15 WhatsApp confirmation + QR on kiosk | **P0** | Bolivia-primary CTA closure | S |
| 6 | `POST /api/leads` mock → Supabase | **P0** | Consultants see test drives; demo becomes honest | M |
| 7 | S20 idle reset + S19 text scale | **P0** | Kiosk hygiene + group viewing | M |
| 8 | Migrate hero/attract to `MediaSurface` | **P0** | Assets actually render when acquired | S |
| 9 | Close product-truth P0 (screen, airbags, transmission) | **P0** | Prevents floor-unit embarrassment | S–M |
| 10 | S23 minimum 1 local testimonial | **P0** | Proof for Chinese-brand objection | M (content) |
| 11 | S36 modal + manual consultant alert (no S35) | **P0** | "Consultor ahora" works in demo with iPad ping | M |
| 12 | Expand Sofía desire tour to 7 steps | **P1** | Completes desire path for pre-researched visitors | M |
| 13 | S35 staff dashboard MVP (queue only) | **P1** | Pilot launch ops | L |
| 14 | S37 resume tokens | **P1** | 7–21 day family decision cycle | M |
| 15 | S28 TCO + S27 trade-in | **P1** | Economics objections in FAQ/compare | M |
| 16 | S21 pre-visit QR landing | **P1** | Marketing attribution | M |
| 17 | S32 rich WhatsApp bridge | **P1** | Mid-journey context handoff | M |
| 18 | Analytics event instrumentation (30+ events) | **P1** | Measure funnel; required before pilot metrics | M |
| 19 | S09 gallery + S10 specs | **P2** | Power-user escape hatches | M |
| 20 | S30 configurator lite | **P2** | Desire-building trim/color | M |
| 21 | Zoho CRM sync | **P2** | Production ops at scale | L |
| 22 | Offline service worker + LAN deploy | **P2** | Showroom Wi-Fi resilience | L |

---

## If Carmen Walked Into Viaggio Tomorrow

### What would still feel unfinished to a **customer**

- The car never appears — only colored gradients labeled `gs4-max-hero-01`. It feels like a wireframe, not a showroom.
- Tapping **Comparar** after building trust leads to a **404** or broken page.
- **"¿Cuánto es la cuota?"** — the financing screen says "orientativo, sin cálculo en esta fase" despite data existing elsewhere.
- WhatsApp opens **`+59100000000`** — instantly signals "not real."
- No **owner testimonial** — "¿Por qué confiar en una marca china?" gets words, not a face from Santa Cruz.
- Submitting a test drive shows a thank-you message but **nothing actually happens** — no confirmation SMS/WhatsApp from Viaggio.

### What would still feel unfinished to a **salesperson**

- No alert when a customer requests help or submits a lead — they must hover and watch.
- No **session brief**: which topics they saw, compare result, family configuration, financing interest.
- Compare tool missing — cannot validate against Corolla Cross on the kiosk during joint walkthrough.
- **S13 conversion hub** is a placeholder — cannot orchestrate "prueba → WhatsApp → compartir con esposa" from one screen.
- Product claims (pantalla 12.3", 8 airbags) may **not match the floor unit** — creates awkward corrections mid-sale.

### What would still feel unfinished to a **sales manager**

- **Zero leads in a system** — no queue, no SLA, no show-rate tracking.
- Cannot prove kiosk **ROI** — no analytics, no campaign attribution (S21 missing).
- Family share (S33) generates a link but **no notification** when spouse opens it.
- No **compare** or **financing** funnel metrics for coaching consultants.
- Demo requires a **scripted escort** to avoid dead ends — not self-serve ready.

### What would still feel unfinished to a **dealership owner**

- First impression is **"startup prototype"**, not co-branded Viaggio × GAC premium experience.
- **Operational risk**: wrong phone number, wrong address, unapproved cuota ranges.
- No path from digital interest to **consultant revenue** without manual vigilance.
- Cannot show GAC HQ or partner stakeholders a **production-ready** platform — build doesn't compile.
- **Chinese-brand launch narrative** lacks local proof (testimonials, showroom photography, taller video) — strategic investment in the kiosk is not yet defensible to the board.

---

## Demo Script Walkthrough (Today)

| Step | Screen | Result |
|------|--------|--------|
| 1 | S01 Attract → S02 Welcome | ✅ Works |
| 2 | S03 Vehicle selector → S22 Hero | ✅ Works |
| 3 | S25 FAQ → S24 Trust story | ✅ Works |
| 4 | S06 Carlos tour (5 steps) | ✅ Works |
| 5 | S08 ADAS / family-safety topic | ✅ Works |
| 6 | S11 Compare hub | ❌ **404** |
| 7 | S12 Compare detail | ❌ Missing |
| 8 | S26 Financing | ❌ **Stub page** |
| 9 | S13 Conversion hub | ❌ **Stub page** |
| 10 | S34 → S14 Test drive | ⚠️ UI only; no lead |
| 11 | S15 WhatsApp confirm | ❌ Missing |
| 12 | S33 Family share | ✅ Works (fake WhatsApp) |

**Completable demo path without dead ends today:** S01 → S02 → S03 → S22 → S25 → S24 → `/journey/carlos` or `/tour/trust` → S08 → S34 → S14 → S33 — **skip compare, financing, and convert hub**.

---

## Appendix — Route Inventory

**Implemented (`app/(showroom)/`):** 19 routes  
`/`, `/vehicles`, `/vehicles/[slug]`, `/hero`, `/themes/*`, `/tour/*`, `/journey/*`, `/experience/*`, `/trust/faq|story|warranty`, `/economics/financing`, `/convert`, `/test-drive`, `/test-drive/info`, `/share`, `/share/[token]`

**Defined in `routes.ts` but no page:** `/compare`, `/gallery`, `/specs`, `/whatsapp`, `/resume`, `/economics/trade-in`, `/economics/tco`, `/staff`, `/visit/*`

**Build status:** `npm run build` — **FAIL** (`VehicleHero.tsx` circular type alias)

---

*Audit only. No code changes. Related: [asset-readiness-audit.md](./asset-readiness-audit.md) · [mvp-content-readiness.md](./content/mvp-content-readiness.md) · [pre-phase2-readiness.md](./pre-phase2-readiness.md) · [product-truth-matrix.md](./product-truth-matrix.md)*
