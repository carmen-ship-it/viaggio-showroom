# CPI-OS Product ↔ Presentation Alignment Audit

**Audit date:** 15 June 2026  
**Auditors (composite lens):** Apple Retail UX · Tesla Delivery Experience · Disney Imagineering · Dealership Operations · Executive Presentation  
**Workspace:** `viaggio-digital-showroom`  
**Reference narrative:** [`CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](./CPI_OS_EXECUTIVE_NARRATIVE_ES.md)  
**Reference storyboard:** [`CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md`](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md)  
**Prior audits:** [`KIOSK_UX_AUDIT.md`](../../KIOSK_UX_AUDIT.md) · [`PRESENTATION_READINESS_AUDIT.md`](../../PRESENTATION_READINESS_AUDIT.md) · [`PRESENTATION_GAP_BACKLOG.md`](../../PRESENTATION_GAP_BACKLOG.md) · [`CPI_OS_PRESENTATION_GAP_AUDIT.md`](./CPI_OS_PRESENTATION_GAP_AUDIT.md)

**Method:** Code-first review of implemented routes (`app/(showroom)/**`, `app/(operations)/**`), screen components (`components/screens/**`), demo configuration (`lib/config/demo-mode.ts`), handoff layer (`lib/demo/handoff-store.ts`, `app/api/handoff/route.ts`), and cross-check against presentation docs and `docs/screen-map.md`.

**Kiosk assumptions (all UX flags):** standing user · children present · 3–7 min attention · may never scroll · may never use kiosks · skeptical of brand · interruptible at any moment · 1920×1080 landscape.

---

## 1. Executive Summary

### Verdict in one sentence

**CPI-OS has a world-class story and a credible kiosk prototype, but the product being presented is 12–18 months ahead of the product being shipped — especially operations, attribution, and showroom-native UX.**

### What matches

| Layer | Reality |
|-------|---------|
| **Core trust → compare → finance → convert path** | Implemented and scriptable: S01→S03→S22→S25/S24→S06→S08→S11/S12→S26→S13→S14/S15 (`demoPathRoutes` in `lib/config/demo-mode.ts`) |
| **Honest comparison** | S12 with "Nosotros ganamos / Ellos ganan" — strongest differentiator vs. typical dealer sites (`CompareDetailScreen.tsx`) |
| **Persona-guided tours** | Carlos/Diego/Sofía journeys and `TourPlayer` deliver narrative promise at content level |
| **Operations UI shell** | `/staff`, `/manager`, `/executive` exist with presentation-grade visual design (`components/operations/*`) |
| **Advisor handoff (demo-local)** | S36 modal + localStorage bridge to `/staff` on **same machine** (`handoff-store.ts`, `ConversionHubScreen.tsx`) |

### What does not match (brutal)

| Gap | Impact |
|-----|--------|
| **Narrative promises closed-loop intelligence** | Kiosk → tablet → manager → executive reports → CRM attribution. **Only the kiosk third is real; ops is mock data + localStorage.** |
| **S21 pre-visit QR, S23 testimonials, S28 TCO standalone, S30 configurator** | Promised in storyboard Act 2; **routes do not exist** |
| **S04 "decision hub"** | Spec describes rich hub; **implementation is a dev link list** (`app/(showroom)/vehicles/[slug]/page.tsx`) |
| **Kiosk is not scroll-free** | 8+ screens require scroll on 1080p; **unsupervised deployment will lose below-fold conversions** |
| **Demo mode hides the product** | Hotspots, share, financing card on S13, pre-researched path — **disabled** (`disableExplorationBranches`) |
| **Product truth conflicts** | 9 P0 data conflicts block credible claims (`docs/product-truth-matrix.md`) — screen size, airbags, ADAS |
| **Zero live film assets** | Storyboard Act 1, 2.3, 2.12, 3.5 require Viaggio B-roll — **not captured** |
| **Handoff is not operational** | `POST /api/handoff` returns ephemeral JSON; **no persistence, no cross-device realtime** |

### Can you demo today?

| Audience | Honest answer |
|----------|---------------|
| **Scripted kiosk walkthrough** (consultant beside customer) | **Yes** — ~72% ready with `NEXT_PUBLIC_DEMO_MODE=true` |
| **Unsupervised kiosk on Saturday floor** | **No** — scroll, form length, idle reset, cognitive load |
| **Owner room with "this is already running"** | **Risky** — ops dashboards are mock; Mendoza family is pre-seeded |
| **18-minute cinematic presentation** | **No** — Act 1 and half of Act 2–5 lack capture assets |

### Overall alignment (product vs. presentation)

| Dimension | % |
|-----------|---|
| Customer kiosk journey (scripted) | **68%** |
| Customer kiosk journey (unsupervised showroom) | **38%** |
| Sales / staff experience | **42%** |
| Manager experience | **35%** |
| Executive / owner experience | **30%** |
| Presentation / film readiness | **28%** |
| **Overall product vision alignment** | **41%** |

---

## 2. Per-Screen Evaluation (S01–S37)

**Scoring:** 1 = broken / missing · 3 = demoable with caveats · 5 = production-ready for SCZ showroom  
**Columns:** PA = Product Accuracy · PrA = Presentation Accuracy · SS = Screenshot Readiness · VR = Video Readiness · ED = Executive Demo Readiness

### Entry & session

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S01** | Attract Loop | `/` · `AttractLoop.tsx` | 3 | 2 | 3 | 2 | 3 | Full-screen tap works; **40% SVG overlay mutes hero** (`AttractLoop.tsx:56-61`); no looping **video** or price flash as narrative promises |
| **S02** | Session Welcome | `/` · `WelcomeScreen.tsx` | 4 | 3 | 4 | 3 | 4 | "Sin presión" copy lands; **demo mode locks first-time path**; persona avatars empty circles; no S37 resume banner for pre-researched path |
| **S03** | Vehicle Selector | `/vehicles` · `VehicleSelector.tsx` | 4 | 3 | 3 | 3 | 4 | GS4 MAX hero works; demo hides coming-soon; **fallback SVG overlay on card**; no "desde $X" on selector |
| **S04** | Vehicle Home Hub | `/vehicles/[slug]` · `page.tsx` | 2 | 1 | 2 | 1 | 2 | **Not the spec hub** — plain link grid, no trust row, economics row, theme grid, contextual CTA |
| **S05** | Guided Tour Picker | *Not implemented* | 1 | 1 | — | — | 2 | Tours reachable via S04 links / journeys; **no duration badges, no overlay picker** per `screen-map.md` |

### Exploration

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S06** | Guided Tour Player | `/tour/[tourId]` · `TourPlayer.tsx` | 4 | 4 | 3 | 3 | 4 | Progress bar + persona narration; **body scrolls** (`overflow-y-auto`); steps 1–3 often text-only; ~12 min tour **exceeds 3–7 min budget** |
| **S07** | Theme Landing | `/themes/[themeId]` · `ThemeExperience.tsx` | 4 | 3 | 3 | 3 | 3 | Functional; not cinematic; scroll on long themes |
| **S08** | Topic Deep Dive | `/themes/.../[topicId]` · `TopicDeepDiveScreen.tsx` | 4 | 4 | 3 | 3 | 4 | ADAS etc. in demo path; **feature grid below fold**; compare CTA at bottom |
| **S09** | Media Gallery | *No route* | 1 | 1 | — | — | 1 | `routes.gallery` defined; **no page** |
| **S10** | Specifications | *No route* | 1 | 1 | — | — | 1 | `routes.specs` defined; **no page** |

### Compare & convert

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S11** | Compare Hub | `/compare` · `CompareHubScreen.tsx` | 4 | 4 | 4 | 3 | 4 | Strong UI; **gated dead-end** if `!canShowCompareCta` (recovery link to FAQ exists); category chips use **hover** (kiosk-unfriendly) |
| **S12** | Compare Detail | `/compare/[targetId]` · `CompareDetailScreen.tsx` | 5 | 5 | 4 | 4 | 5 | **Best product moment** — honest rows; must **scroll** for verdict + CTA; compare data has P0 conflicts |
| **S13** | Conversion Hub | `/convert` · `ConversionHubScreen.tsx` | 4 | 3 | 3 | 3 | 4 | Session recap chips work; **5 paths in full mode**; demo hides financing/share; **advisor CTA + S36 modal wired**; cards may clip on 1080p |
| **S14** | Test Drive Form | `/test-drive` · `TestDriveForm.tsx` | 3 | 3 | 2 | 2 | 3 | **8+ fields** — kiosk-hostile; modal scroll `max-h-[88vh] overflow-y-auto` |
| **S15** | WhatsApp Handoff | `/whatsapp` · `WhatsAppHandoffScreen.tsx` | 4 | 3 | 3 | 3 | 4 | QR + prefill; **placeholder phone** in content; resume token generated but S37 nonfunctional |
| **S16** | Consultant Handoff Card | *Partial* | 2 | 2 | 2 | 2 | 3 | Superseded by S36; no printable QR card |
| **S17** | Configurator (full) | *Not implemented* | 1 | 1 | — | — | 1 | Phase 2+ per spec |

### Session chrome

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S18** | Session Summary | *Not implemented* | 1 | 1 | — | — | 1 | Storyboard end-of-visit recap missing |
| **S19** | Settings / A11y | Global · `SettingsOverlay.tsx` | 4 | 4 | 4 | — | 3 | Strong a11y; hidden in demo; **exposed on attract in non-demo** |
| **S20** | Idle Reset | Global · `IdleManager.tsx` | 3 | 2 | 4 | — | 3 | 3 min prompt / 5 min reset; **no S37 save offer** before wipe |

### Trust & economics (Phase 1 expansion)

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S21** | Pre-Visit QR Landing | *Not implemented* | 1 | 1 | — | — | 1 | Storyboard 2.2 **entire scene unrunnable**; breaks marketing attribution arc |
| **S22** | Immersive Vehicle Hero | `/hero` · `VehicleHero.tsx` | 4 | 3 | 4 | 3 | 4 | Best visual screen; **hotspots disabled in demo**; 5+ CTAs in full mode; stat strip truncation risk |
| **S23** | Social Proof Hub | *Not implemented* | 1 | 1 | — | — | 1 | Critical for Chinese-brand skepticism; **no `/trust/testimonials`** |
| **S24** | Trust Story | `/trust/story` · `TrustStoryScreen.tsx` | 3 | 3 | 2 | 2 | 3 | **Vertical snap-scroll chapters** — kiosk fail; no workshop video files |
| **S25** | FAQ / Objections | `/trust/faq` · `FAQScreen.tsx` | 4 | 4 | 3 | 3 | 4 | Carlos attribution; **accordion expands → scroll**; long answers |
| **S26** | Financing Preview | `/economics/financing` · `FinancingPreviewScreen.tsx` | 4 | 3 | 3 | 3 | 4 | Trim/plazo toggles + TCO embed; **BANCO placeholder**; overflow on 1080p |
| **S27** | Trade-In Intent | *Not implemented* | 1 | 2 | — | — | 1 | Narrated in storyboard 2.9 chip "Retoma Etios" — **fiction in recap** |
| **S28** | TCO Calculator | *Partial in S26* | 2 | 2 | 2 | 2 | 2 | No standalone `/economics/tco` |
| **S29** | Warranty Deep-Dive | `/trust/warranty` | 4 | 3 | 3 | 3 | 3 | Content strong; scroll likely |
| **S30** | Configurator Lite | *Not implemented* | 1 | 2 | — | — | 1 | Storyboard 2.5 hotspot → config path missing |

### Share & logistics

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S31** | Comparison Shortlist | *Not implemented* | 1 | 1 | — | — | 1 | — |
| **S32** | WhatsApp Bridge | *Partial* | 2 | 2 | 2 | 2 | 2 | S15 covers end state; **no mid-journey modal with intent chips** |
| **S33** | Family Share | `/share` · `FamilyShareScreen.tsx` | 3 | 2 | 2 | 2 | 2 | Page exists; **hidden in demo**; mobile recipient view basic; storyboard 2.11 WhatsApp thread **not producible** |
| **S34** | Test Drive Logistics | `/test-drive/info` · `TestDriveLogisticsScreen.tsx` | 4 | 3 | 3 | 3 | 3 | Family welcome copy; not always in demo path |
| **S37** | Post-Visit Resume | `/resume` · `ResumePlaceholder.tsx` | 1 | 1 | 1 | 1 | 1 | **Explicit stub** — "Próximamente" |

### Operations (staff-facing)

| ID | Screen | Route / component | PA | PrA | SS | VR | ED | Notes |
|----|--------|-------------------|----|-----|----|----|-----|-------|
| **S35** | Staff Dashboard | `/staff` · `StaffDashboard.tsx` | 3 | 4 | 3 | 2 | 4 | **Presentation-strong**; merges `operationsLeads` + localStorage handoffs; **not realtime cross-device**; no "join live session" |
| **S36** | Consultant Live Handoff | S13 modal · `ConsultantHandoffModal.tsx` | 3 | 4 | 3 | 2 | 4 | Modal polished; wait timer; **claim state only updates if staff on same browser profile** |

**Screen implementation scorecard**

| Status | Screens | Count |
|--------|---------|-------|
| Production-viable (PA ≥ 4, ED ≥ 4) | S02, S03, S06, S08, S11, S12, S15, S22, S25, S26, S34, S36 | 12 |
| Demo-only (PA 2–3) | S01, S04, S07, S13, S14, S20, S24, S29, S33, S35 | 10 |
| Missing / stub | S05, S09, S10, S16–S18, S21, S23, S27–S28, S30–S32, S37 | 15 |

---

## 3. Kiosk UX Findings (Issues A–K)

Legend: **Severity** C = Critical · H = High · M = Medium · L = Low · **Effort** S = small (<8h) · M = medium (8–24h) · L = large (24h+)

### Global (all screens)

| Issue | Sev | Screens | Why it hurts in a dealership | Redesign | Effort |
|-------|-----|---------|------------------------------|----------|--------|
| **G. Nav density** — `buildVehicleNav()` exposes 10+ convert items + themes + tours | H | All vehicle screens | Standing family sees "cockpit," not showroom; children tap wrong pill | **Exploration mode:** max 5 nav items; **Conversion mode:** back + home only (`showroom-nav.ts`) | M |
| **G. No session progress** | M | S06, S08, S11→S13 | User doesn't know how close to "done"; spouse loses patience | Persistent "Paso 3 de 5" strip on demo path | S |
| **G. Idle reset without save** | H | S20 | 5 min on compare table → wipe; family walk away angry | Offer S37 save on prompt; extend idle on S12–S14 | M |
| **G. Demo mode ≠ product mode** | C | S22, S13, S02 | Executives rehearse a **reduced** product; live pilot surprises | Separate `DEMO_SCRIPT` vs `PILOT` env flags | S |

### Per-issue flags (A–K)

| ID | Issue | Occurrences |
|----|-------|-------------|
| **A** | Excessive scrolling | S06, S08, S12, S14, S24, S25 (open), S26, S29, S04 |
| **B** | Hidden below fold | S08 feature grid, S12 verdict/CTA, S14 submit, S06 narration panel, S26 TCO block |
| **C** | Weak CTA hierarchy | S22 (5+ footer CTAs full mode), S13 (4–5 equal cards), S25 (read vs next) |
| **D** | Too many choices | S02 path, S11 competitors, S13 paths, S14 fields, S26 trim×plazo |
| **E** | Too much text | S06, S08, S24 chapters, S25 answers, S12 expanded rows |
| **F** | Small touch targets | S22 hotspots (`lg` only), S11 category chips, ShowroomNav pills |
| **G** | Confusing navigation | S04 hub vs S22 hero vs journeys; duplicate tour entry points |
| **H** | Poor 2m readability | S06 frosted narration blur; stat strip truncation; FAQ body text |
| **I** | Cognitive overload | S26 financing+TCO+toggles; S13 recap + 5 cards; S14 form |
| **J** | Dead-end experiences | S11 gated state (mitigated), S37 stub, missing S21 entry |
| **K** | Feels like website | S04 link hub, S11 hover chips, accordion FAQ, form-heavy S14 |

### Detailed flags (critical / high only)

#### S01 — Attract
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| B, K | H | Car not obvious at 2m; SVG wireframe reads "prototype" | Remove `FallbackArtwork` overlay when photo loads; add price flash | S |
| C | M | Settings/mute compete with tap-to-start | Hide all chrome on attract (`hideSettings` always on S01) | S |
| K | H | No motion video loop as narrative/film shows | Loop 15s GS4 SCZ reel + subtle audio | L (asset) |

#### S03 — Vehicle Selection
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| K | M | SVG overlay on hero card | Remove overlay on loaded image | S |
| C | M | No price on card | "Desde $us X" under model name | S (content) |

#### S06 — Guided Tours
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| A, E | H | 12-min tour impossible standing with kids | **Kiosk tour:** 5 steps / 3 min auto-advance | M |
| H | H | Truncated narration (`TourPlayer.tsx` scroll panel) | Fix overflow; larger type | S |
| B | H | Media steps text-only | One full-bleed image per step minimum | M (assets) |

#### S11 / S12 — Comparison
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| F, K | M | Category preview uses mouse hover | Tap-to-preview tiles | S |
| A, B, C | H | S12 verdict below fold | Pin scorecard + primary CTA top 40% viewport | M |
| J | H | Gated compare (pre-trust) | Actionable checklist: "Mirá garantía + ADAS" with 2 taps | S |

#### S13 — Conversion Hub
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| C, D, I | H | 4–5 equal cards + full nav | **Focus mode:** Test drive 2× size + WhatsApp; advisor tertiary | S |
| A | M | Footer + cards clip | Single viewport layout 1080p | M |

#### S14 — Test Drive
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| A, D, E, I | **C** | 8+ fields standing | **Kiosk:** name + phone + day only; rest via WhatsApp | M |
| B, C | H | Submit below fold | Sticky submit bar | S |

#### S22 — Vehicle Hero
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| C, D | H | 5+ footer CTAs (full mode) | Single "¿Es confiable?" + "Más opciones" drawer | M |
| F | M | Hotspots desktop-only `hidden lg:block` | Min 64px targets; always on for kiosk | S |
| H | H | Stat truncation | `HeroStatStrip` min-width fix | S |

#### S24 — Trust Story
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| A, E, K | **C** | `snap-y overflow-y-auto` multi-chapter scroll | 3 proof-point single screen OR 60s auto video | M |

#### S25 — FAQ
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| A, E | H | Long accordion answers | "¿Cuál es tu duda?" → 5 tiles → one answer fullscreen | M |
| C | M | Next step competes with reading | Sticky footer: "Siguiente: Historia Viaggio" | S |

#### S26 — Financing
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| D, I | H | Trim × plazo × TCO | Default: one trim, 36 meses, one number + "Personalizar" | M |
| K | M | BANCO placeholder | Real partner logos | S (ops) |

#### S36 — Advisor Request
| Issue | Sev | Why | Redesign | Effort |
|-------|-----|-----|----------|--------|
| — | — | Modal UX is **good** | Wire cross-tab realtime (Supabase) so tablet actually alerts | L |

---

## 4. Core Journey Scroll Analysis

### Question: Can a customer complete the core journey without scrolling?

**Answer: No.** Not on the canonical demo path at 1920×1080 with a standing user.

### Canonical demo path (`demoPathRoutes`)

```
S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
```

| Screen | Scroll required? | What is below fold |
|--------|------------------|-------------------|
| S01 | No | — |
| S02 | No | — |
| S03 | No | — |
| S22 | Unlikely | Footer CTAs (demo uses TouchNav only) |
| S25 | **Yes** (if accordion open) | Answer body, warranty card |
| S24 | **Yes** | Chapters 2–3 |
| S06 | **Yes** | Narration, next controls |
| S08 | **Yes** | Feature grid, compare CTA |
| S11 | Borderline | Category chips on short displays |
| S12 | **Yes** | Verdict summary, persona callouts, CTAs |
| S26 | **Yes** | TCO breakdown, bank logos, tips |
| S13 | **Yes** | Conversion cards 2–4, footer |
| S14 | **Yes** | Most fields, submit |
| S15 | Borderline | QR instructions |

**Scroll count (likely):** 6–8 screens on critical path.

### Proposed 1080p single-viewport path (4-minute standing journey)

| Step | Screen | Redesign principle |
|------|--------|-------------------|
| 0:00 | S01 | Video + price; one tap |
| 0:05 | S22-lite | Hero + 3 stats + **one** CTA "¿Es confiable?" |
| 1:00 | S25-lite | 5 doubt tiles → fullscreen answer (no accordion) |
| 1:45 | S12-lite | Pinned scorecard 9/1/6 + "Ellos ganan reventa" visible |
| 2:30 | S26-lite | One cuota number, 36 meses |
| 3:00 | S13-focus | 2 cards: Test drive · WhatsApp |
| 3:30 | S14-kiosk | Name + phone + día |
| 3:50 | S15 | QR |

**Effort to implement path:** L (2–3 sprints) — requires layout mode `kioskViewport="strict"`.

---

## 5. Special Focus Deep Dives

### S01 — Attract (`components/screens/AttractLoop.tsx`)

| Lens | Finding |
|------|---------|
| Apple Retail | Full-screen tap is correct; lacks **product hero moment** in first 3 seconds |
| Tesla Delivery | No looping vehicle motion; feels like static poster |
| Imagineering | No story — tagline only; missed "family in SCZ street" emotional hook |
| Dealership ops | Settings/mute on attract = staff support calls |
| Executive presentation | Film scene 2.3 requires attract **beside physical car** — not capturable today |

**Scores:** PA 3 · PrA 2 · SS 3 · VR 2 · ED 3

**Must-fix:** Remove SVG overlay; add video loop + `desde $us` flash.

---

### S03 — Vehicle Selection (`components/screens/VehicleSelector.tsx`)

| Lens | Finding |
|------|---------|
| Apple Retail | Single-hero focus in demo mode is correct |
| Tesla | Missing instant price + config teaser |
| Dealership | Demo hides coming-soon — good for Saturday; production needs clear "solo GS4 hoy" |

**Scores:** PA 4 · PrA 3 · SS 3 · VR 3 · ED 4

---

### S06 — Guided Tours (`components/screens/TourPlayer.tsx`)

| Lens | Finding |
|------|---------|
| Disney | Persona narration is the right storytelling device |
| Apple | Progress bar good; **step count too high** for standing kiosk |
| Operations | Carlos trust tour is demo path — **align staff brief to tour steps actually shown** |

**Scores:** PA 4 · PrA 4 · SS 3 · VR 3 · ED 4

**Must-fix:** Kiosk-short tour (5 steps); per-step media; auto-advance toggle.

---

### S11 / S12 — Comparison (`CompareHubScreen.tsx`, `CompareDetailScreen.tsx`)

| Lens | Finding |
|------|---------|
| Executive | **Strongest honest-compare moment in product** — matches storyboard 2.8 |
| Apple | S11 layout fits 1080p; S12 fails one-glance verdict |
| Dealership | Corolla Cross default matches SCZ reality |
| Compliance | Compare rows have P0 data conflicts — **legal risk if filmed as truth** |

**Scores:** S11: PA 4 · PrA 4 · SS 4 · VR 3 · ED 4  
**Scores:** S12: PA 5 · PrA 5 · SS 4 · VR 4 · ED 5

---

### S13 — Conversion Hub (`components/screens/ConversionHubScreen.tsx`)

| Lens | Finding |
|------|---------|
| Tesla | Recap chips resemble order summary — good |
| Apple | Too many equal-weight paths; should recommend **one** next step based on session |
| Operations | Advisor handoff pre-fills Mendoza narrative — **demo fiction** if customer isn't Mendoza |
| Presentation | Demo hides financing + share cards — **storyboard 2.9 shows financing → S13** |

**Scores:** PA 4 · PrA 3 · SS 3 · VR 3 · ED 4

---

### S22 — Vehicle Hero (`components/screens/VehicleHero.tsx`)

| Lens | Finding |
|------|---------|
| Apple | Closest to "product theater" in codebase |
| Tesla | Hotspots are the differentiator — **disabled in demo** |
| Imagineering | Ken Burns + stat strip works; needs physical-digital windshield QR mode |

**Scores:** PA 4 · PrA 3 · SS 4 · VR 3 · ED 4

---

### S24 — Trust Story (`components/screens/TrustStoryScreen.tsx`)

| Lens | Finding |
|------|---------|
| Disney | Chapter structure is right for **seated** experience |
| Kiosk | `snap-y snap-mandatory overflow-y-auto` is explicit scroll design — **wrong context** |
| Presentation | Storyboard 2.6 includes S24 — film will expose scroll on 4K capture |

**Scores:** PA 3 · PrA 3 · SS 2 · VR 2 · ED 3

---

### S25 — FAQ (`components/screens/FAQScreen.tsx`)

| Lens | Finding |
|------|---------|
| Dealership | Questions match real SCZ objections |
| Apple | Accordion is web pattern; should be **tile → fullscreen answer** |
| Executive | Carlos portrait adds credibility |

**Scores:** PA 4 · PrA 4 · SS 3 · VR 3 · ED 4

---

### S26 — Financing (`components/screens/FinancingPreviewScreen.tsx`)

| Lens | Finding |
|------|---------|
| Dealership | Cuota orientativa is the #1 decision driver in Bolivia |
| Operations | TCO embedded — good; standalone S28 still promised |
| Presentation | Storyboard 2.9 financing → S13 — **demo skips financing card on S13** |

**Scores:** PA 4 · PrA 3 · SS 3 · VR 3 · ED 4

---

### S36 — Advisor Request (`ConsultantHandoffModal.tsx` + handoff store)

| Lens | Finding |
|------|---------|
| Tesla | "Advisor arrives" modal matches delivery lounge pattern |
| Operations | localStorage sync works **kiosk + tablet same machine only** |
| Executive | Act 3.3 alert moment **cannot be filmed cross-device** without backend |
| Code | `POST /api/handoff` does not persist (`app/api/handoff/route.ts`) |

**Scores:** PA 3 · PrA 4 · SS 3 · VR 2 · ED 4 (same-browser demo only)

---

## 6. Top 20 UX Issues That Reduce Conversion

| # | Issue | Screens | Sev |
|---|-------|---------|-----|
| 1 | Test drive form has 8+ fields standing | S14 | Critical |
| 2 | Compare verdict + CTA below fold | S12 | Critical |
| 3 | No S23 social proof for skeptics | Journey | Critical |
| 4 | Trust story requires scrolling chapters | S24 | Critical |
| 5 | 12-minute tours exceed attention budget | S06 | Critical |
| 6 | Idle reset wipes session at 5 min | S20 | High |
| 7 | Compare gated dead-end for low-trust sessions | S11 | High |
| 8 | S13 presents 4–5 equal conversion choices | S13 | High |
| 9 | S22 exposes 5+ CTAs in full mode | S22 | High |
| 10 | Topic deep dives hide feature grid below fold | S08 | High |
| 11 | No pre-visit QR — customer arrives cold | S21 | High |
| 12 | S37 resume stub — family can't continue later | S37 | High |
| 13 | Financing screen cognitive overload | S26 | High |
| 14 | FAQ accordion = reading wall | S25 | High |
| 15 | Attract doesn't stop foot traffic (no video/price) | S01 | High |
| 16 | Placeholder WhatsApp number | S15 | High |
| 17 | Product claim conflicts undermine trust | S12, S25, S22 | High |
| 18 | No configurator = desire gap before test drive | S30 | Medium |
| 19 | S04 hub doesn't orient — users get lost | S04 | Medium |
| 20 | Hover-only compare category previews | S11 | Medium |

---

## 7. Top 20 UX Improvements That Increase Premium Feel

| # | Improvement | Impact | Effort |
|---|-------------|--------|--------|
| 1 | Remove all SVG wireframe overlays on real photos | Instant credibility | S |
| 2 | Cinematic 15s attract video (SCZ streets) | Foot traffic | L |
| 3 | S22 hotspots always on, 64px targets | Product theater | S |
| 4 | Single primary CTA per screen (mode-aware) | Apple-like clarity | M |
| 5 | Conversion focus mode on S13 | Close rate | S |
| 6 | Pin compare scorecard above fold | Trust + speed | M |
| 7 | Kiosk-short tours with auto-advance | Family-friendly | M |
| 8 | Tile-based FAQ (no accordion) | Kiosk-native | M |
| 9 | Trust story → 60s dual-video | Disney-level | M |
| 10 | Hide all screen IDs / dev labels in pilot | Premium | S |
| 11 | Collapse nav to 5 items in exploration | Calm | M |
| 12 | Session progress indicator | Orientation | S |
| 13 | Real Viaggio + bank logos | Local trust | S |
| 14 | Physical-digital hero ("Este es el vehículo frente a vos") | Tesla moment | M |
| 15 | Audio: opt-in host narration with headphone jack | Showroom-appropriate | S |
| 16 | Rich S04 hub (trust row, economics, themes) | Wayfinding | L |
| 17 | S23 owner testimonials (even 1 video) | Objection killer | L |
| 18 | Sticky CTAs on scroll screens | Completion | S |
| 19 | Price on S01/S03/S22 consistently | Commercial clarity | S |
| 20 | Pin-protect or remove settings on floor | Stability | S |

---

## 8. Top 10 Moments That Feel Like Software Instead of a Luxury Automotive Experience

| # | Moment | Evidence |
|---|--------|----------|
| 1 | S04 vehicle hub — plain link list | `vehicles/[slug]/page.tsx` |
| 2 | S01 wireframe SVG over hero photo | `AttractLoop.tsx:56-61` |
| 3 | Accordion FAQ with web typography | `FAQScreen.tsx` |
| 4 | 8-field test drive form | `TestDriveForm.tsx` |
| 5 | ShowroomNav pill strip (15–21 items) | `showroom-nav.ts` |
| 6 | "S## ·" screen labels in non-demo | `formatScreenLabel` usage |
| 7 | Compare category hover tooltips | `CompareHubScreen.tsx` |
| 8 | Resume placeholder "Próximamente" | `ResumePlaceholder.tsx` |
| 9 | BANCO / placeholder logos | `FinancingPreviewScreen.tsx` |
| 10 | Mendoza pre-seeded handoff regardless of visitor | `mendozaHandoffDefaults` in `handoff-store.ts` |

---

## 9. Top 10 Moments That Create Executive WOW

| # | Moment | Why it works | Capture note |
|---|--------|--------------|--------------|
| 1 | S12 honest "Ellos ganan" row | Differentiated vs. every dealer CMS | Screen record + over-shoulder |
| 2 | S22 Ken Burns hero + stat strip | Tesla/Apple first impression | Needs hotspots on |
| 3 | S06 Carlos trust tour narration | Addresses #1 objection without salesperson | Edit to 35s |
| 4 | S13 session recap chips | "The system remembers" | Show after full path |
| 5 | S36 advisor modal + wait timer | Human handoff magic | **Requires two devices** |
| 6 | `/staff` handoff brief + opening line | Javier storyboard moment | Static demo OK |
| 7 | `/manager` live sessions + SLA tiles | GM control fantasy | Label "simulación" if honest |
| 8 | `/executive` weekly trends + insights | Owner P&L narrative | Pair with voiceover |
| 9 | S25 Carlos FAQ — "marca china" | Local credibility | 2 questions only in film |
| 10 | S15 WhatsApp QR with context preview | Bolivia-native conversion | Mock phone overlay |

---

## 10. Final Scores

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| **Customer Experience** | **62%** | Strong content path; scroll, form, missing S21/S23/S37 drag score |
| **Showroom Experience** | **41%** | Not optimized for standing, family, unsupervised kiosk |
| **Sales Experience** | **48%** | `/staff` UI excellent; realtime + join session missing |
| **Manager Experience** | **38%** | `/manager` credible mock; no reassign, no floor map |
| **Executive Experience** | **34%** | `/executive` charts exist; no attribution, export, or live data |
| **Presentation Readiness** | **32%** | Narrative 95%, capture assets ~10%, film Act 1 at 0% |
| **Luxury Brand Feel** | **55%** | Cinematic shell + typography; undermined by web patterns + placeholders |
| **Tesla/Apple-Level Experience** | **38%** | S22 approaches; scroll, nav, forms, stubs break tier |
| **Overall Product Vision Alignment** | **41%** | Vision doc vs. shipped code gap |

---

## 11. Operations Dashboards Alignment

### `/staff` — Staff Dashboard (`StaffDashboard.tsx`)

| Narrative promise | Status | Gap |
|-------------------|--------|-----|
| Priority queue 🔴🟡🟢 | ✅ UI | Static `operationsLeads` + merged localStorage handoffs |
| Handoff brief + opening line | ✅ | Pre-written Mendoza-quality copy |
| Claim lead | ✅ | Client-side only |
| Live kiosk session mirror | ❌ | Not implemented |
| Loss reason / CRM update | ❌ | Not implemented |

**Alignment:** **48%** — Best ops surface; safe for **tablet screenshot** demo, not operations.

### `/manager` — Manager Dashboard (`ManagerDashboard.tsx`)

| Narrative promise | Status | Gap |
|-------------------|--------|-----|
| Active sessions + depth | ⚠️ | Mock `activeKioskSessions` |
| SLA / hot waiting | ⚠️ | Display only |
| Staff roster + status | ⚠️ | Static |
| Reassign lead | ❌ | No action |
| Test drive calendar | ⚠️ | List only |

**Alignment:** **35%** — Visually convincing; **do not show before Act 1 "before" story** (undercuts pain narrative).

### `/executive` — Executive Dashboard (`ExecutiveDashboard.tsx`)

| Narrative promise | Status | Gap |
|-------------------|--------|-----|
| Weekly KPIs + trends | ⚠️ | `executiveKpis`, `weeklyTrends` demo data |
| Top objections / competitors | ⚠️ | Static lists |
| Marketing attribution | ❌ | Storyboard 5.2 has no UI |
| Revenue / CPL / ROI | ❌ | Not implemented |
| Institutional memory | ❌ | Narrative only |

**Alignment:** **30%** — Good for "future state" montage; **not proof of running system**.

### Kiosk ↔ Ops loop honesty

```
Customer taps "Asesor ahora" (S13)
  → triggerHandoff() writes localStorage (same origin)
  → /staff on SAME browser profile sees handoff
  → POST /api/handoff returns JSON (not stored)
  → /manager and /executive do NOT update from live kiosk
```

**Cross-device pilot requires:** Supabase Realtime (or similar), session persistence, lead API — estimated **L (3–4 weeks)**.

---

## 12. Prioritized Remediation Roadmap

### Must Fix Before Demo (P0) — target: 10 days

| # | Item | Screens | Effort |
|---|------|---------|--------|
| 1 | Remove attract/selector SVG overlays | S01, S03 | S |
| 2 | Enable hotspots in demo OR show in executive path only | S22 | S |
| 3 | Pin S12 scorecard + CTA above fold | S12 | M |
| 4 | S14 kiosk mode: 3 fields + sticky submit | S14 | M |
| 5 | S13 conversion focus mode (2 cards) | S13 | S |
| 6 | Fix hero stat truncation | S22 | S |
| 7 | Capture screenshot set 1920×1080 for demo path | All | M |
| 8 | Close P0 product truth conflicts before filming compare/FAQ | S12, S25 | M (content) |
| 9 | Wire real WhatsApp Business number | S15 | S (ops) |
| 10 | Document "same-browser" ops demo script for S36→`/staff` | S36, S35 | S |
| 11 | Hide hover-only interactions on S11 | S11 | S |
| 12 | ConsultantHandoffModal: show in demo path prominently | S13 | S |

### Should Fix Before Pilot (P1) — target: 6–8 weeks

| # | Item | Screens | Effort |
|---|------|---------|--------|
| 1 | Kiosk viewport mode (strict 1080p, no scroll on path) | Global | L |
| 2 | S21 pre-visit QR landing | S21 | M |
| 3 | S23 social proof (≥1 real testimonial) | S23 | L |
| 4 | S37 functional resume + idle save offer | S37, S20 | M |
| 5 | Rich S04 decision hub | S04 | L |
| 6 | Realtime handoff backend + cross-device | S36, S35 | L |
| 7 | S28 standalone TCO + S27 trade-in | S28, S27 | M |
| 8 | S30 configurator lite | S30 | M |
| 9 | Kiosk-short tours (5 step) | S06 | M |
| 10 | S24 trust story single-screen / video | S24 | M |
| 11 | Manager reassign + live session feed | `/manager` | L |
| 12 | Analytics persistence | Global | L |

### Can Fix After Pilot (P2)

| # | Item |
|---|------|
| 1 | S09 gallery, S10 specs |
| 2 | S17 full configurator |
| 3 | S18 session summary |
| 4 | S31 comparison shortlist |
| 5 | S32 mid-journey WhatsApp bridge modal |
| 6 | Marketing attribution UI (executive) |
| 7 | CRM close / loss reason capture |
| 8 | Executive PDF export |
| 9 | S05 dedicated tour picker overlay |
| 10 | Viaggio B-roll + Act 1 film production |

---

## Appendix A — File Reference Index

| Area | Key paths |
|------|-----------|
| Demo config | `lib/config/demo-mode.ts` |
| Entry / attract | `components/screens/ExperienceEntry.tsx`, `AttractLoop.tsx` |
| Hero | `components/screens/VehicleHero.tsx` |
| Compare | `components/screens/CompareHubScreen.tsx`, `CompareDetailScreen.tsx` |
| Convert | `components/screens/ConversionHubScreen.tsx` |
| Handoff | `components/handoff/ConsultantHandoffModal.tsx`, `lib/demo/handoff-store.ts` |
| Ops | `components/operations/StaffDashboard.tsx`, `ManagerDashboard.tsx`, `ExecutiveDashboard.tsx` |
| Idle | `components/overlays/IdleManager.tsx` |
| Nav density | `lib/navigation/showroom-nav.ts` |
| Product truth | `docs/product-truth-matrix.md` |
| Screen spec | `docs/screen-map.md` |

---

## Appendix B — Presentation Doc vs. Code Quick Matrix

| Storyboard scene | Screen | Runnable today? |
|------------------|--------|-----------------|
| 2.2 QR pre-visit | S21 | ❌ |
| 2.3 Arrival + attract | S01 | ⚠️ partial |
| 2.4 Welcome + resume | S02, S37 | ⚠️ no resume |
| 2.5 Hero | S22 | ✅ (demo limits) |
| 2.6 Trust path | S25, S24, S06, S08 | ✅ with scroll |
| 2.7 Diego family | S06 journey | ✅ |
| 2.8 Compare | S11, S12 | ✅ |
| 2.9 Financing → S13 | S26, S13 | ⚠️ demo hides cards |
| 2.10 Test drive | S14, S34, S15 | ✅ form too long |
| 2.11 Family share | S33 | ⚠️ hidden demo |
| 3.1–3.4 Sales tablet | `/staff` | ⚠️ mock + local |
| 4.x Manager | `/manager` | ⚠️ mock |
| 5.x Executive | `/executive` | ⚠️ mock |

---

*This audit is intentionally harsh. The narrative and architecture are investor-grade; the gap is production closure — kiosk-native UX, media assets, data truth, and operational wiring. Closing the P0 list above raises demo credibility from ~41% to ~65% alignment without new features.*
