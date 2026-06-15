# CPI-OS — Final Executive Demo Audit

**Audit date:** 15 June 2026  
**Purpose:** Make the **current product** look, feel, and demo like a premium executive presentation — audit only, no new features.  
**Audience:** Dealership owners, GMs, commercial directors (Bolivia / Santa Cruz reference)  
**Presentation window:** 30 days  
**Workspace:** `viaggio-digital-showroom`

**Method:** Code-first review of all customer-facing routes (`app/(showroom)/**`), screen components (`components/screens/**`), demo configuration (`lib/config/demo-mode.ts`), presentation docs (executive narrative, storyboard, film shot list), and cross-check against `docs/screen-map.md` and [`CPI_OS_PRODUCT_PRESENTATION_ALIGNMENT_AUDIT.md`](./CPI_OS_PRODUCT_PRESENTATION_ALIGNMENT_AUDIT.md).

**Kiosk target:** 1920×1080 landscape · standing user · family present · 3–7 min attention · skeptical of Chinese brand · may never scroll.

**Scoring (0–5):** 0 = missing/broken · 3 = demoable with caveats · 5 = executive-ready without apology.

| Column | Meaning |
|--------|---------|
| **WOW** | Executive WOW — would a dealer principal lean forward in &lt;5s? |
| **Luxury** | Luxury brand feel — Viaggio/GAC premium, not dealer website |
| **Simple** | Apple/Tesla simplicity — one clear action, minimal chrome |
| **Screenshot** | Screenshot readiness — clean 1920×1080 capture, no dev artifacts |
| **Film** | Film readiness — usable in 16:9 cinematic capture without embarrassment |

**Constraint:** Recommendations in this document are **polish, copy, layout, visual, demo-mode, and presentation-config only** — no S21, S23, S27, S28, S30, realtime CRM, attribution, analytics backends, or major new features.

---

## 1. Executive Summary

### Verdict

**The kiosk journey is presentable to executives in a scripted 4–6 minute walkthrough today — but only if you rehearse in demo mode, skip broken screens, and never imply the ops loop is live.** The product’s strongest moments (honest compare, persona-guided trust, conversion recap, advisor handoff modal) are genuinely differentiated. The weakest moments (dev link hub, scroll-heavy layouts, prototype overlays, missing screens promised in the film storyboard) will destroy credibility if shown unscripted.

### Demo readiness (honest %)

| Scenario | Readiness | Notes |
|----------|-----------|-------|
| **Scripted executive kiosk demo** (`NEXT_PUBLIC_DEMO_MODE=true`, consultant narrating) | **71%** | Canonical path in `demoPathRoutes` is runnable |
| **Unscripted Saturday showroom floor** | **36%** | Scroll, form length, idle wipe, cognitive load |
| **18-minute cinematic film (storyboard Acts 1–6)** | **24%** | Act 1 B-roll at 0%; S21/S23 scenes unrunnable; ops mock |
| **Owner room “this is already running”** | **42%** | `/staff` looks real; cross-device handoff is not |
| **Luxury automotive perception (Tesla/Apple bar)** | **48%** | S22 + S12 approach tier; web patterns elsewhere |

**Overall executive demo readiness (current product, polish-only ceiling):** **68%** achievable in 30 days without new features — **not** 95% until media capture, data truth, and missing trust surfaces are addressed in later phases.

### What already wins

| Moment | Why it matters |
|--------|----------------|
| **S12 honest compare** (`CompareDetailScreen.tsx`) | “Nosotros ganamos / Ellos ganan” — rare in dealer digital |
| **S22 vehicle hero** (`VehicleHero.tsx`) | Ken Burns + stat strip = closest to product theater |
| **S06 Carlos trust tour** (`TourPlayer.tsx`) | Addresses Chinese-brand skepticism without a salesperson |
| **S13 session recap + advisor CTA** (`ConversionHubScreen.tsx`) | “The system remembers” — executive narrative hook |
| **S36 handoff modal** (`ConsultantHandoffModal.tsx`) | Polished human bridge moment (same-browser demo only) |
| **Ops UI shell** (`components/operations/*`) | Presentation-grade visuals for Act 3–5 montage |

### What will embarrass you if unscripted

| Risk | Evidence |
|------|----------|
| Wireframe SVG over real car photos | `AttractLoop.tsx:56-61`, `VehicleSelector.tsx:91-96` |
| S04 is a developer link list, not a decision hub | `app/(showroom)/vehicles/[slug]/page.tsx` |
| 6–8 screens on demo path require scroll at 1080p | See §5 |
| Demo mode hides hotspots and secondary paths executives may expect | `disableExplorationBranches` in `demo-mode.ts` |
| Pre-seeded “Familia Mendoza” handoff fiction | `ConversionHubScreen.tsx:69-95`, `handoff-store.ts` |
| Resume/share stubs if accidentally navigated | `ResumePlaceholder.tsx`, S33 hidden in demo |
| Product truth conflicts on compare/FAQ claims | `docs/product-truth-matrix.md` |

---

## 2. Demo Script Recommendation (4–6 min executive path)

**Environment:** `NEXT_PUBLIC_DEMO_MODE=true` · GS4 MAX · 1920×1080 · consultant beside screen · tablet on `/staff` (same browser profile for handoff beat).

**Narration frame:** *“Roberto llega escéptico. El kiosco lo educa sin presión. Cuando pide un humano, Javier ya sabe qué comparó.”*

| Time | Screen | Route | Presenter says (ES) | Do / don’t |
|------|--------|-------|---------------------|------------|
| 0:00 | **S01** Attract | `/` | *“Nadie lo interrumpe. Toca cuando está listo.”* | Tap once. Don’t open settings. |
| 0:15 | **S02** Welcome | `/` (phase) | *“Sin presión — primera vez con GAC.”* | Tap **Empezar** (demo locks first-time path). |
| 0:30 | **S03** Selector | `/vehicles` | *“Hoy el protagonista es el GS4 MAX.”* | Single hero card in demo. |
| 0:45 | **S22** Hero | `/vehicles/gs4-max/hero` | *“Producto primero — tres datos que importan.”* | Use **TouchNav → ¿Es confiable?** Don’t open S04. |
| 1:15 | **S25** FAQ | `/vehicles/gs4-max/trust/faq` | *“La duda #1: ¿es chino?”* | Open **one** accordion only. Tap next. |
| 1:45 | **S06** Tour | `/vehicles/gs4-max/tour/trust` | *“Carlos guía sin repetir al vendedor.”* | Advance **3 steps max** (don’t run full 12 min). |
| 2:30 | **S12** Compare | `/vehicles/gs4-max/compare/corolla-cross` | *“Honestos — también donde Toyota gana.”* | Scroll **once** to verdict paragraph. |
| 3:15 | **S26** Financing | `/vehicles/gs4-max/economics/financing` | *“Cuota orientativa — el humano confirma.”* | Show trim + 36 meses only; don’t scroll to TCO block. |
| 3:45 | **S13** Convert | `/vehicles/gs4-max/convert` | *“El sistema resume la visita.”* | Tap **Hablar con un asesor ahora** → S36 modal. |
| 4:15 | **S35** Staff (cutaway) | `/staff` | *“Javier recibe contexto, no ‘¿en qué le ayudo?’”* | Same machine/profile. Claim handoff. |
| 4:45 | **S14** Test drive (optional) | `/vehicles/gs4-max/test-drive` | *“Agenda en 30 segundos.”* | Pre-fill demo name; submit fast or skip. |
| 5:00 | **S15** WhatsApp (optional) | `/vehicles/gs4-max/whatsapp` | *“WhatsApp con contexto — canal Bolivia.”* | Show QR + message preview. End. |

**Screens intentionally skipped in exec demo:** S04 (link hub), S24 (scroll chapters), S08 (long topic), S11 (hover chips), S34 (not on path), S37 (stub), all missing screens.

**Optional 90s “greatest hits” cut:** S01 → S22 → S12 (verdict) → S13 (recap + advisor) → `/staff`.

---

## 3. Per-Screen Scorecard (S01–S37)

### Entry & session

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S01** | Attract Loop | `/` · `AttractLoop.tsx` | 2 | 2 | 4 | 2 | 2 | No | SVG overlay mutes hero; no price flash; static not cinematic video |
| **S02** | Session Welcome | `/` · `WelcomeScreen.tsx` | 3 | 4 | 4 | 4 | 3 | No | Strong copy; demo locks path; persona avatars generic |
| **S03** | Vehicle Selector | `/vehicles` · `VehicleSelector.tsx` | 3 | 3 | 4 | 3 | 3 | No | Solo GS4 in demo works; SVG overlay; no “desde $X” |
| **S04** | Vehicle Home Hub | `/vehicles/[slug]` · `page.tsx` | 1 | 1 | 1 | 1 | 0 | **Yes** | **Not spec hub** — plain link grid; skip in exec demo |
| **S05** | Tour Picker | *Not implemented* | 1 | 2 | 2 | — | — | — | Tours via journeys/S04 links only |

### Exploration

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S06** | Guided Tour Player | `/tour/[tourId]` · `TourPlayer.tsx` | 4 | 4 | 3 | 3 | 3 | **Yes** | Persona + progress strong; body scrolls; full tour too long |
| **S07** | Theme Landing | `/themes/[themeId]` · `ThemeExperience.tsx` | 3 | 3 | 3 | 3 | 2 | **Yes** | Functional; long themes scroll |
| **S08** | Topic Deep Dive | `TopicDeepDiveScreen.tsx` | 4 | 3 | 3 | 3 | 3 | **Yes** | ADAS on demo path; feature grid below fold |
| **S09** | Media Gallery | *No route* | 0 | 0 | — | — | — | — | `routes.gallery` defined; no page |
| **S10** | Specifications | *No route* | 0 | 0 | — | — | — | — | `routes.specs` defined; no page |

### Compare & convert

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S11** | Compare Hub | `/compare` · `CompareHubScreen.tsx` | 4 | 4 | 3 | 4 | 3 | Borderline | Strong layout; hover category chips; gated state if low trust |
| **S12** | Compare Detail | `/compare/[targetId]` · `CompareDetailScreen.tsx` | **5** | 4 | 3 | 4 | 4 | **Yes** | **Best product moment**; verdict below fold |
| **S13** | Conversion Hub | `/convert` · `ConversionHubScreen.tsx` | 4 | 4 | 3 | 3 | 3 | **Yes** | Recap chips + advisor CTA; cards clip; demo hides financing/share |
| **S14** | Test Drive Form | `/test-drive` · `TestDriveForm.tsx` | 2 | 2 | 1 | 2 | 2 | **Yes** | 8+ fields; modal `max-h-[88vh] overflow-y-auto` |
| **S15** | WhatsApp Handoff | `/whatsapp` · `WhatsAppHandoffScreen.tsx` | 4 | 3 | 4 | 3 | 4 | Borderline | QR + context preview; verify real WA number |
| **S16** | Consultant Handoff Card | *Partial / legacy* | 2 | 2 | 2 | 2 | 1 | — | Superseded by S36 |
| **S17** | Configurator (full) | *Not implemented* | 0 | — | — | — | — | — | Phase 2+ |

### Session chrome

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S18** | Session Summary | *Not implemented* | 0 | — | — | — | — | — | End-of-visit recap missing |
| **S19** | Settings / A11y | `SettingsOverlay.tsx` | 2 | 3 | 2 | 3 | — | No | Hidden in demo; good a11y; don’t show execs |
| **S20** | Idle Reset | `IdleManager.tsx` | 2 | 3 | 4 | 4 | — | No | 3 min prompt / 5 min wipe; no save offer |

### Trust & economics

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S21** | Pre-Visit QR Landing | *Not implemented* | 0 | — | — | — | — | — | **Do not show** — storyboard only |
| **S22** | Immersive Vehicle Hero | `/hero` · `VehicleHero.tsx` | 4 | **5** | 3 | 4 | 4 | Unlikely | Best visual; hotspots off in demo; CTA clutter in full mode |
| **S23** | Social Proof Hub | *Not implemented* | 0 | — | — | — | — | — | **Do not show** |
| **S24** | Trust Story | `/trust/story` · `TrustStoryScreen.tsx` | 2 | 3 | 2 | 2 | 1 | **Yes** | `snap-y overflow-y-auto` chapters — kiosk fail |
| **S25** | FAQ / Objections | `/trust/faq` · `FAQScreen.tsx` | 4 | 4 | 3 | 3 | 4 | **Yes** (open) | Carlos portrait; accordion = web pattern |
| **S26** | Financing Preview | `/economics/financing` · `FinancingPreviewScreen.tsx` | 4 | 3 | 2 | 3 | 3 | **Yes** | Strong cuota hero; TCO + tips below fold; BANCO placeholder |
| **S27** | Trade-In Intent | *Not implemented* | 0 | — | — | — | — | — | **Do not show** |
| **S28** | TCO Calculator | *Partial in S26* | 2 | 2 | 2 | 2 | 2 | **Yes** | Embedded in S26 only |
| **S29** | Warranty Deep-Dive | `/trust/warranty` · `page.tsx` | 3 | 3 | 3 | 3 | 2 | **Yes** | Content OK; layout basic vs cinematic shell |
| **S30** | Configurator Lite | *Not implemented* | 0 | — | — | — | — | — | **Do not show** |

### Share & logistics

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S31** | Comparison Shortlist | *Not implemented* | 0 | — | — | — | — | — | — |
| **S32** | WhatsApp Bridge | *Partial (S15)* | 2 | 2 | 2 | 2 | 2 | — | No mid-journey intent modal |
| **S33** | Family Share | `/share` · `FamilyShareScreen.tsx` | 2 | 3 | 3 | 2 | 2 | **Yes** | Hidden in demo; basic mobile recipient |
| **S34** | Test Drive Logistics | `/test-drive/info` · `TestDriveLogisticsScreen.tsx` | 3 | 4 | 3 | 3 | 3 | **Yes** | Good family copy; 8 zones scroll |
| **S37** | Post-Visit Resume | `/resume` · `ResumePlaceholder.tsx` | 0 | 1 | 2 | 1 | 0 | No | **“Próximamente” stub** — fatal if shown |

### Staff-facing (include for completeness — not customer kiosk)

| ID | Screen | Route / component | WOW | Luxury | Simple | Screenshot | Film | Scroll @1080p | Notes |
|----|--------|-------------------|-----|--------|--------|------------|------|---------------|-------|
| **S35** | Staff Dashboard | `/staff` · `StaffDashboard.tsx` | 4 | 4 | 3 | 3 | 2 | **Yes** | Presentation-strong; mock + localStorage |
| **S36** | Live Handoff Modal | S13 · `ConsultantHandoffModal.tsx` | 4 | 4 | 5 | 4 | 3 | No | Same-browser only; film needs two-device comp |

### Score averages (implemented customer screens only, n≈22)

| Dimension | Average | Highest | Lowest |
|-----------|---------|---------|--------|
| Executive WOW | **2.9** | S12 (5) | S04, S09–S10, S21, S23, S27, S30, S37 (0) |
| Luxury Brand Feel | **3.0** | S22 (5) | S04 (1) |
| Apple/Tesla Simplicity | **2.8** | S02, S15 (4) | S14 (1) |
| Screenshot Readiness | **2.8** | S11 (4) | S04, S37 (1) |
| Film Readiness | **2.5** | S12 (4) | S04, S24, S37 (0–1) |

---

## 4. Per-Screen Qualitative Flags (all S01–S37)

Compact reference. **Scroll** = likely scroll required at 1920×1080 standing.

| ID | Breaks immersion | Feels like software | Creates confusion | Scroll | WOW in &lt;5s |
|----|------------------|---------------------|-------------------|--------|-------------|
| S01 | Wireframe over car; no motion | SVG prototype overlay | Settings/mute on non-demo attract | No | Full-bleed GS4 + tagline pulse |
| S02 | Generic persona circles | Path picker (web) | Two paths but demo locks one | No | “Sin presión” + vehicle name |
| S03 | SVG on hero card | Catalog grid | Only one car in demo — OK | No | Large GS4 card tap |
| S04 | **Everything** — dev hub | Link list, “Tours · N pasos” | vs S22 hero — where am I? | Yes | *None — skip screen* |
| S05 | Missing picker | — | Multiple tour entry points | — | — |
| S06 | Text-only steps | Progress + scroll panel | Tour length vs kiosk time | Yes | Carlos avatar + step title |
| S07 | — | Theme link pills | Too many topics | Yes | Theme hero image |
| S08 | — | Long content page | Compare CTA at bottom | Yes | Hero media + headline |
| S09 | Missing | — | Dead nav link if exposed | — | — |
| S10 | Missing | — | Dead nav link | — | — |
| S11 | Gated dead-end | Hover category chips | “Pronto” if low trust | Borderline | Side-by-side vehicle thumbs |
| S12 | Data truth risk if wrong | Expandable table rows | Many rows — where’s verdict? | Yes | **Win/loss scorecard (9/1/6)** |
| S13 | Mendoza fiction in handoff | Equal-weight cards | 3–4 paths, which first? | Yes | Session recap chips |
| S14 | Long form standing | Form fields | Too many optional fields | Yes | *None until shortened* |
| S15 | Placeholder phone | QR utility screen | Resume token → S37 stub | Borderline | Prefilled WA message |
| S16 | Legacy | QR card | Overlap with S36 | — | — |
| S17 | Missing | — | — | — | — |
| S18 | Missing | — | No end recap | — | — |
| S19 | Staff settings on floor | Toggle panel | Audio controls complexity | No | — |
| S20 | Session wipe anxiety | System dialog | No save path | No | — |
| S21 | **Missing entirely** | — | Storyboard promises it | — | — |
| S22 | Hotspots hidden (demo) | Footer CTA sprawl (full) | Too many choices full mode | Unlikely | Ken Burns + model name + stats |
| S23 | **Missing** | — | Trust gap for skeptics | — | — |
| S24 | Chapter scroll | Snap-scroll web | vs S25 — redundant? | Yes | Chapter 1 headline only |
| S25 | Long answers | Accordion | Open many = lost | Yes (open) | Carlos + first question tile |
| S26 | BANCO placeholder | Calculator density | Trim × plazo × TCO | Yes | Big cuota number |
| S27 | Missing | — | “Retoma Etios” in recap fiction | — | — |
| S28 | No standalone | Spreadsheet embed | Duplicated in S26 | Yes | — |
| S29 | Emoji icons | Basic page layout | vs premium trust screens | Yes | 5yr/150k badge |
| S30 | Missing | — | Storyboard hotspot path | — | — |
| S31 | Missing | — | — | — | — |
| S32 | Partial | — | S15 vs S32 | — | — |
| S33 | Hidden demo | Share utility | Token view basic | Yes | Hero + 3 bullets |
| S34 | — | Info cards grid | 8 zones — overwhelming | Yes | Family welcome headline |
| S35 | Mock data | Dashboard | “Live” label vs static | Yes | Handoff brief card |
| S36 | Same-browser only | Wait timer | Claim won’t sync cross-device | No | “Asesor en camino” modal |
| S37 | **“Próximamente”** | Placeholder | Breaks continuity promise | No | *None — never show* |

---

## 5. Focus Screen Deep Dives

### S01 — Attract Loop (`components/screens/AttractLoop.tsx`)

| Lens | Finding |
|------|---------|
| **First 5 seconds** | Tagline + pulse CTA work; car is **muted** by 40% opacity `FallbackArtwork` SVG (`lines 56-61`) |
| **Luxury gap** | Static Ken Burns/photo ≠ storyboard “cinematic GS4 MAX footage”; no price anchor |
| **Film** | Scene 2.3 needs kiosk beside physical car — attract must loop **video** without wireframe |
| **Scroll** | None — full viewport ✓ |
| **Polish levers** | Remove SVG when `HeroMedia` loaded; add `desde $us X` subline; hide all chrome via `hideSettings` on S01 always; optional 15s loop asset swap in `HeroMedia` |

**Scores:** WOW 2 · Luxury 2 · Simple 4 · Screenshot 2 · Film 2

---

### S04 — Decision Hub (`app/(showroom)/vehicles/[slug]/page.tsx`)

| Lens | Finding |
|------|---------|
| **Spec vs reality** | Screen map promises hero strip, trust row, theme grid, economics row — **implementation is link lists** |
| **Executive risk** | Any exec tap on “Explorar” from hero lands here — **instant “this is internal tooling”** |
| **Film** | Unusable — no cinematic composition |
| **Scroll** | Yes — multiple sections |
| **Polish levers** | **Demo:** middleware redirect S04 → S22 or S25; **layout:** replace `<ul>` with 6 premium cards (no new routes); hide “Tours · N pasos” raw list |

**Scores:** WOW 1 · Luxury 1 · Simple 1 · Screenshot 1 · Film 0

---

### S06 — Guided Tour Player (`components/screens/TourPlayer.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Progress bar, persona glass card, `TourMedia` — Disney narrator pattern works |
| **Weakness** | `overflow-y-auto` on body (`line 128`); topic block `max-h-[26vh] overflow-y-auto` (`line 182`); trust tour ~12 min |
| **Demo script** | Show steps 1–3 only; use TouchNav not free exploration |
| **Film** | Edit 35s montage per step; avoid scroll in capture |
| **Polish levers** | `demoPathMaxSteps: 3` config; enlarge narration type; ensure every step has image (content); disable topic renderer block in demo |

**Scores:** WOW 4 · Luxury 4 · Simple 3 · Screenshot 3 · Film 3

---

### S12 — Compare Detail (`components/screens/CompareDetailScreen.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Honest verdict badges, persona explanations, Corolla Cross default — **signature executive moment** |
| **Weakness** | Scorecard in header but **verdict paragraph + TouchNav below fold** (`footerRef` at `line 278`); expandable rows feel like admin table |
| **Legal** | P0 product truth conflicts — do not film until `product-truth-matrix` P0 cleared |
| **WOW &lt;5s** | Three stat pills: Nosotros ganamos / Ellos ganan / Empate |
| **Polish levers** | Pin scorecard + verdict quote in top 45vh; collapse rows by default with 3 highlighted wins; sticky TouchNav |

**Scores:** WOW 5 · Luxury 4 · Simple 3 · Screenshot 4 · Film 4

---

### S13 — Conversion Hub (`components/screens/ConversionHubScreen.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | `SessionRecap` chips, dealership footer, S36 integration — matches “system remembers” |
| **Weakness** | 3–4 equal cards + footer = scroll; demo hides financing/share (`hideExploration`); handoff pre-fills Mendoza narrative regardless of visitor |
| **Executive beat** | Tap advisor → modal → cut to `/staff` |
| **Polish levers** | Demo: single-column 3 cards with advisor 2× height; dynamic recap from actual session; rename default customer away from “Familia Mendoza” in live pilot |

**Scores:** WOW 4 · Luxury 4 · Simple 3 · Screenshot 3 · Film 3

---

### S14 — Test Drive Form (`components/screens/TestDriveForm.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Chip selects, family-aware copy, logistics integration |
| **Weakness** | **8+ fields** — critical kiosk failure; `max-h-[88vh] overflow-y-auto` sheet |
| **Executive demo** | Skip or pre-fill; show first screen only |
| **Polish levers** | `demoModeConfig.kioskShortForm: true` — nombre + teléfono + día only; sticky submit; pre-seed “Roberto Mendoza” for film

**Scores:** WOW 2 · Luxury 2 · Simple 1 · Screenshot 2 · Film 2

---

### S22 — Vehicle Hero (`components/screens/VehicleHero.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | `KenBurnsBackground`, `HeroStatStrip`, minimal header — **best luxury moment** |
| **Weakness** | Hotspots `hidden lg:block` + disabled in demo (`line 79`); 5+ footer CTAs in full mode; demo shows only TouchNav |
| **WOW &lt;5s** | Model name + 3 stats over moving hero |
| **Polish levers** | `executiveDemoMode` flag to enable hotspots without full exploration; fix stat strip truncation in `HeroStatStrip`; add “desde $us”; physical-digital copy line when `?source=floor` |

**Scores:** WOW 4 · Luxury 5 · Simple 3 · Screenshot 4 · Film 4

---

### S24 — Trust Story (`components/screens/TrustStoryScreen.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Chapter narrative GAC + Viaggio — right content |
| **Weakness** | `snap-y snap-mandatory overflow-y-auto` (`line 39`) — **explicit multi-screen scroll**; no workshop video assets |
| **Demo path** | On `demoPathRoutes` — **weak link**; prefer S25 → S06 skip S24 |
| **Polish levers** | Demo: render chapter 1 only; or auto-advance slideshow 60s; remove snap scroll in demo mode |

**Scores:** WOW 2 · Luxury 3 · Simple 2 · Screenshot 2 · Film 1

---

### S25 — FAQ (`components/screens/FAQScreen.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Real SCZ objections; Carlos `PersonaPortrait`; warranty visual on garantía item |
| **Weakness** | Accordion pattern; long answers; portrait + list = scroll when open |
| **WOW &lt;5s** | First question tile: “¿Por qué confiar en una marca china?” |
| **Polish levers** | Demo: pre-open one item; tile grid mode for film; sticky TouchNav “Siguiente: Tour de confianza” |

**Scores:** WOW 4 · Luxury 4 · Simple 3 · Screenshot 3 · Film 4

---

### S26 — Financing Preview (`components/screens/FinancingPreviewScreen.tsx`)

| Lens | Finding |
|------|---------|
| **Strength** | Large cuota typography; disclaimer visible; readiness meter |
| **Weakness** | 6+ sections (examples, TCO, tips, partners) — **all below fold**; `LogoPlaceholder` BANCO |
| **Demo script** | Never scroll past cuota card + plazo toggles |
| **Polish levers** | `demoFinancingCompact` — hide sections after line 215; replace placeholder with Viaggio partner **image** (static PNG); default 36 meses + GT trim |

**Scores:** WOW 4 · Luxury 3 · Simple 2 · Screenshot 3 · Film 3

---

## 6. Scroll & Film Blockers Summary

### Canonical demo path scroll audit (`demoPathRoutes` in `lib/config/demo-mode.ts`)

```
/ → /vehicles → /hero → /trust/faq → /trust/story → /tour/trust →
/themes/safety/adas → /compare → /compare/corolla-cross → /economics/financing →
/convert → /test-drive → /whatsapp
```

| Screen | Scroll @1080p | Below-fold content lost | Film blocker severity |
|--------|---------------|-------------------------|------------------------|
| S01 | No | — | Medium (visual quality) |
| S02 | No | — | Low |
| S03 | No | — | Low |
| S22 | Unlikely | Footer CTAs | Low |
| S25 | **Yes** (accordion) | Answer body | Medium |
| S24 | **Yes** | Chapters 2–3 | **High** — remove from film path |
| S06 | **Yes** | Narration, controls | Medium |
| S08 | **Yes** | Feature grid | Medium — skip in 4-min demo |
| S11 | Borderline | Category chips | Low |
| S12 | **Yes** | Verdict, CTAs | **High** — pin layout |
| S26 | **Yes** | TCO, tips, logos | Medium — crop in capture |
| S13 | **Yes** | Cards 2–4, footer | Medium |
| S14 | **Yes** | Most fields | **High** — short form |
| S15 | Borderline | QR copy | Low |

**Screens that must not appear in film capture:** S04, S19, S20 (unless intentional), S37, any missing screen, non-demo ShowroomNav.

### Global film blockers (no new features — mitigation only)

| Blocker | Mitigation |
|---------|------------|
| No Viaggio B-roll (Act 1) | Shoot dealership exterior separately; UI comps for kiosk beats |
| S21 QR scene | Static mock frame — **do not imply built** |
| Cross-device handoff | Same-machine two-window comp + cutaway |
| Wireframe overlays | Remove before any capture |
| Dev labels S## | `NEXT_PUBLIC_DEMO_MODE=true` always |
| Idle reset mid-shoot | Disable idle timers during capture (`IdleManager` env flag) |

---

## 7. TOP 10 CHANGES FOR MAXIMUM EXECUTIVE IMPACT

Ranked by: presentation quality · filming quality · executive perception · effort (S/M/L).

| Rank | Change | Impact (Pres / Film / Exec) | Effort | Files |
|------|--------|----------------------------|--------|-------|
| **1** | Remove SVG wireframe overlays on S01 + S03 when photo loads | High / High / High | **S** | `AttractLoop.tsx`, `VehicleSelector.tsx` |
| **2** | Pin S12 scorecard + honest verdict in top 45% viewport | High / High / High | **M** | `CompareDetailScreen.tsx` |
| **3** | S14 executive short form (nombre, teléfono, día) + sticky submit | High / High / Med | **M** | `TestDriveForm.tsx`, `demo-mode.ts` |
| **4** | S13 conversion focus layout — advisor + test drive dominant | High / Med / High | **S** | `ConversionHubScreen.tsx` |
| **5** | Remove S24 from demo path; show FAQ → tour only | Med / High / Med | **S** | `demo-mode.ts` (`demoPathRoutes`), presenter script |
| **6** | S26 compact demo — cuota + plazo only, hide TCO/tips/partners | Med / High / High | **S** | `FinancingPreviewScreen.tsx`, `demo-mode.ts` |
| **7** | Enable S22 hotspots for `executiveRehearsal` flag (not full exploration) | High / High / Med | **S** | `demo-mode.ts`, `VehicleHero.tsx` |
| **8** | Redirect S04 → S22 in demo middleware | Med / High / High | **S** | `middleware.ts` or `demo-mode.ts` |
| **9** | S01 attract: price flash + hide settings always | High / Med / High | **S** | `AttractLoop.tsx`, `ExperienceEntry.tsx` |
| **10** | Pre-seed session + fix handoff copy to use live `customerName` | Med / Med / High | **S** | `ConversionHubScreen.tsx`, `handoff-store.ts`, demo seed script |

---

### Detail — Top 10

#### 1. Remove SVG wireframe overlays (S01, S03)

**Why:** Instant “prototype” signal kills luxury perception at the front door.  
**What:** Delete or gate `FallbackArtwork` overlay `div` when `HeroMedia`/`MediaSurface` reports loaded — keep fallback only on image error.  
**Files:** `components/screens/AttractLoop.tsx:56-61`, `components/screens/VehicleSelector.tsx:91-96`  
**Effort:** S (&lt;4h)

#### 2. Pin S12 compare verdict above fold

**Why:** Strongest differentiator is invisible without scroll — executives never see the payoff.  
**What:** Move `statItems` + verdict paragraph into fixed header; limit visible rows to 3 categories; sticky `TouchNav`.  
**Files:** `components/screens/CompareDetailScreen.tsx`  
**Effort:** M (1–2 days)

#### 3. S14 kiosk short form for executive demo

**Why:** 8-field form reads as software; film scene 2.10 dies on scroll.  
**What:** Add `demoModeConfig.kioskShortForm`; show 3 fields; pre-fill for rehearsal; sticky bottom submit.  
**Files:** `components/screens/TestDriveForm.tsx`, `lib/config/demo-mode.ts`  
**Effort:** M (1–2 days)

#### 4. S13 conversion focus layout

**Why:** Equal cards = no recommendation; execs want “what should customer do next?”  
**What:** When `hideExploration`, single column: advisor card 2× visual weight, test drive second, WhatsApp third; move footer address to tooltip.  
**Files:** `components/screens/ConversionHubScreen.tsx`, `components/conversion/ConversionParts.tsx`  
**Effort:** S (&lt;8h)

#### 5. Remove S24 from canonical demo path

**Why:** Scroll chapters break kiosk + film continuity; S25 + S06 cover same trust arc.  
**What:** Update `demoPathRoutes` to skip `/trust/story`; TouchNav S25 → tour directly.  
**Files:** `lib/config/demo-mode.ts`, `components/screens/FAQScreen.tsx` (nextHref)  
**Effort:** S (&lt;2h)

#### 6. S26 compact financing viewport

**Why:** Executives need **one number** — cuota orientativa — not a spreadsheet journey.  
**What:** `shouldShowFinancingSections()` false in demo for sections after cuota card; replace `LogoPlaceholder` with static partner PNG.  
**Files:** `components/screens/FinancingPreviewScreen.tsx`, `lib/config/demo-mode.ts`  
**Effort:** S (&lt;8h)

#### 7. Executive rehearsal hotspots on S22

**Why:** Hotspots are the Tesla “product theater” moment — disabled in demo today.  
**What:** New flag `enableHeroHotspotsInDemo` separate from `disableExplorationBranches`.  
**Files:** `lib/config/demo-mode.ts`, `components/screens/VehicleHero.tsx:79`  
**Effort:** S (&lt;4h)

#### 8. Hide S04 from executives (redirect)

**Why:** Link hub is the #1 “feels like internal dev tool” moment.  
**What:** Middleware redirect `/vehicles/[slug]` → `/vehicles/[slug]/hero` when demo mode.  
**Files:** `middleware.ts`  
**Effort:** S (&lt;4h)

#### 9. S01 price flash + zero chrome

**Why:** Foot traffic + film beat need commercial anchor in 3 seconds.  
**What:** Add `desde $us X` under tagline from vehicle content; force `hideSettings` on attract phase.  
**Files:** `components/screens/AttractLoop.tsx`, `components/screens/ExperienceEntry.tsx`  
**Effort:** S (content + &lt;4h)

#### 10. Honest handoff recap copy

**Why:** “Familia Mendoza” + “Retoma Etios” when visitor didn’t do that = credibility loss if exec asks.  
**What:** Use `customerName` from session only; omit trade-in chip unless captured; optional `demoSeedSession()` for rehearsed narrative.  
**Files:** `components/screens/ConversionHubScreen.tsx:69-95`, `lib/demo/handoff-store.ts`  
**Effort:** S (&lt;8h)

---

## 8. 30-Day Presentation Checklist

### Week 1 — Demo integrity (polish only)

- [ ] Set `NEXT_PUBLIC_DEMO_MODE=true` on presentation build
- [ ] Remove SVG overlays S01/S03
- [ ] Update `demoPathRoutes` — drop S24; confirm S08 optional
- [ ] Redirect S04 → S22 in demo
- [ ] Close P0 items in `docs/product-truth-matrix.md` before filming compare/FAQ
- [ ] Wire real WhatsApp Business number in dealership content
- [ ] Document 4-min presenter script (§2) — Spanish Bolivia
- [ ] Rehearse S36 → `/staff` on same browser profile

### Week 2 — Layout & capture prep

- [ ] Implement S12 above-fold verdict layout
- [ ] S13 conversion focus + S14 short form
- [ ] S26 compact demo mode
- [ ] Enable executive hotspots S22
- [ ] Capture screenshot set 1920×1080 for each demo path screen
- [ ] Disable idle timers during film shoots (`IdleManager` override)
- [ ] Hide S19 settings globally on presentation kiosk

### Week 3 — Film & narrative alignment

- [ ] Shoot Viaggio exterior / family entrance B-roll (no UI)
- [ ] Screen-record demo path at 4K — no scroll unless scripted
- [ ] Record `/staff` handoff claim beat (same machine comp)
- [ ] Prepare `/manager` + `/executive` as **“future state”** montage with disclaimer slide
- [ ] Build 90s trailer from [`CPI_OS_FILM_SHOT_LIST.md`](./CPI_OS_FILM_SHOT_LIST.md) using **runnable screens only**
- [ ] Audio: interaction sounds on; narration off for film capture

### Week 4 — Executive rehearsal & hardening

- [ ] 3 full dry runs with dealership stakeholders
- [ ] Pin kiosk: single vehicle, demo mode, no keyboard
- [ ] Backup: offline video of golden path if live demo fails
- [ ] One-page “what’s live vs roadmap” handout for Q&A honesty
- [ ] Final pass: no “Próximamente”, no S## labels, no placeholder logos on path
- [ ] Present: trailer → 4-min live demo → 2-min ops montage → discussion

---

## 9. What NOT to Show Executives (honest list)

| Do not show | Why |
|-------------|-----|
| **S04 Vehicle Hub** | Dev link list — destroys premium narrative |
| **S21 Pre-visit QR** | Not built — storyboard only |
| **S23 Testimonials** | Not built — critical gap but no UI |
| **S27 Trade-in / S28 TCO standalone / S30 Configurator** | Not built |
| **S37 Resume** | “Próximamente” stub |
| **S09 Gallery / S10 Specs / S18 Summary** | Missing |
| **S19 Settings** | Operational; breaks immersion |
| **Non-demo mode** | S## badges, ShowroomNav pills, trust signal debug copy |
| **Full 12-min Carlos tour** | Exceeds attention; looks slow |
| **S24 full chapter scroll** | Kiosk scroll on camera |
| **S14 full form** | Until short form shipped |
| **Cross-device handoff without rehearsal** | Will fail silently |
| **Executive dashboard as “live data”** | Mock `executiveKpis` — say “illustrative” |
| **Marketing attribution / CRM closed loop** | Not in product — narrative only |
| **Any compare/FAQ claim** | Until P0 product truth resolved |
| **Family share S33 in demo** | Hidden + basic; storyboard WhatsApp thread not producible |
| **Coming-soon vehicles** | Demo hides — don’t toggle off mid-demo |

**Safe to show with label “simulación”:** `/manager`, `/executive` dashboards.  
**Safe to show as hero moments:** S22, S25 (one question), S12, S26 (cuota only), S13 + S36, `/staff` brief.

---

## Appendix — File Reference Index

| Area | Path |
|------|------|
| Demo config | `lib/config/demo-mode.ts` |
| Demo path | `demoPathRoutes` in same file |
| Entry / attract | `components/screens/ExperienceEntry.tsx`, `AttractLoop.tsx` |
| Hero | `components/screens/VehicleHero.tsx` |
| Hub (weak) | `app/(showroom)/vehicles/[slug]/page.tsx` |
| Compare | `components/screens/CompareHubScreen.tsx`, `CompareDetailScreen.tsx` |
| Convert | `components/screens/ConversionHubScreen.tsx` |
| Handoff | `components/handoff/ConsultantHandoffModal.tsx`, `lib/demo/handoff-store.ts` |
| Ops (montage) | `components/operations/StaffDashboard.tsx`, `ManagerDashboard.tsx`, `ExecutiveDashboard.tsx` |
| Idle | `components/overlays/IdleManager.tsx` |
| Shell / nav | `components/layout/ShowroomShell.tsx`, `lib/navigation/showroom-nav.ts` |
| Screen spec | `docs/screen-map.md` |
| Prior audit | `docs/presentations/CPI_OS_PRODUCT_PRESENTATION_ALIGNMENT_AUDIT.md` |
| Storyboard | `docs/presentations/CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md` |
| Film shots | `docs/presentations/CPI_OS_FILM_SHOT_LIST.md` |

---

*This audit is scoped to executive perception on the **current** codebase. Closing the Top 10 polish list raises scripted demo readiness from ~71% to ~85% without new features. Crossing 90% requires trust surfaces (S23), resume (S37), and media production outside this document’s scope.*
