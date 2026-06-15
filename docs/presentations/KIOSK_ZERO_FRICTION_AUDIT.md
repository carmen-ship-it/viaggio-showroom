# PHASE 2B-A — Executive Kiosk Zero-Friction Audit

**Audit date:** 15 June 2026  
**Auditor lens:** Tesla showroom kiosk — standing visitor, children present, 3–5 minute attention, may never scroll, may never discover hidden UI  
**Environment audited:** `NEXT_PUBLIC_DEMO_MODE=true` · GS4 MAX · 1920×1080 landscape  
**Method:** Code-first review of routes, screen components, demo flags (`lib/config/demo-mode.ts`), host narration (`lib/audio/host-narration.ts`), and cross-check against [`CPI_OS_PRODUCT_PRESENTATION_ALIGNMENT_AUDIT.md`](./CPI_OS_PRODUCT_PRESENTATION_ALIGNMENT_AUDIT.md), [`CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md`](./CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md), [`EXECUTIVE_DEMO_POLISH_IMPLEMENTATION.md`](./EXECUTIVE_DEMO_POLISH_IMPLEMENTATION.md), and [`KIOSK_POLISH_REPORT.md`](../../KIOSK_POLISH_REPORT.md).

**Executive path audited (this document):**

```
S01 → S02 → S03 → S22 → S25 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15 → S36
```

**Scope:** Audit only — no implementation.

---

## 1. Executive Verdict

The Phase 2 polish pass materially improved **scripted** executive demos: S12 verdict above fold, S13 two-card focus, S14 short form, S11 tap categories, and strict viewport shells on several screens. For an **unsupervised** Tesla-bar kiosk, however, the executive path still fails zero-friction on four systemic axes:

1. **Navigation graph ≠ executive script** — S25 and S06 are wired through S24 (trust story), which is not on this path; a visitor following TouchNav will leave the scripted arc.
2. **No persistent Home** — demo mode disables logo-to-home (`GlobalHeader.tsx`) on every vehicle screen; children can strand the session deep in the funnel.
3. **Host narration assets missing** — `public/assets/audio/narration/host/` contains **0** MP3 files; delays fire into silent/unavailable playback.
4. **Scroll and nested scroll remain** on trust/education beats (S25 open, S06, S08, S15 consultant block) — content below fold is effectively invisible to a non-scrolling visitor.

**Unsupervised kiosk readiness (this path):** **~44%**  
**Scripted consultant demo readiness:** **~88%** (presenter must skip S24, limit S06 steps, avoid opening multiple FAQ items)

---

## 2. Severity Legend

| Rank | Meaning | Kiosk impact |
|------|---------|--------------|
| **C** | Critical | Conversion or orientation breaks without staff intervention |
| **H** | High | Likely lost attention, wrong path, or missed CTA in 3–5 min window |
| **M** | Medium | Friction or polish gap; mitigable when scripted |
| **L** | Low | Refinement; does not block executive rehearsal |

---

## 3. Global Findings (All Screens)

| ID | Severity | Issue | Files | Components | Exact fix |
|----|----------|-------|-------|------------|-----------|
| **G-01** | **C** | **No Home action in demo mode** — brand block is non-interactive when `disableExplorationBranches` | `components/layout/GlobalHeader.tsx` | `GlobalHeader` | Add always-visible **Inicio** pill (min 56×56px) routing to `/`; keep exploration lock for other nav |
| **G-02** | **C** | **Host narration MP3s absent** — all `host-s*.mp3` paths in `HOST_NARRATION_TRACKS` resolve to missing files | `lib/audio/host-narration.ts`, `public/assets/audio/narration/host/` | `useHostNarration`, `ScreenAudioController`, `AudioEngine` | Ship audio assets or gate narration UI until assets exist; fail silently is OK only for dev, not showroom |
| **G-03** | **C** | **Executive path TouchNav mismatch** — S25→S24→S06 in code; audited path is S25→S06 | `app/(showroom)/vehicles/[slug]/trust/faq/page.tsx`, `app/(showroom)/vehicles/[slug]/tour/[tourId]/page.tsx` | `FAQScreen`, `TourPlayer` (via page props) | Add `demoPathNext` config: S25 `nextHref` → `routes.tour(slug,"trust")`, S06 `backHref` → `routes.faq(slug)` when `isDemoMode` |
| **G-04** | **H** | **No session progress** — visitor cannot see “Paso 4 de 14” on demo path | `lib/config/demo-mode.ts`, `components/cinematic/TouchNav.tsx` | New `DemoPathProgress` strip | Render fixed top strip from `demoPathRoutes` index for current pathname |
| **G-05** | **H** | **Idle wipe without save** — 5 min resets to S01, no resume offer | `components/overlays/IdleManager.tsx` | `IdleManager` | On idle prompt, offer **Guardar y salir** (WhatsApp QR mini) before `resetToAttract` |
| **G-06** | **M** | **S02 and S25 have no host narration** — audio arc jumps S01→S03→S22 | `lib/audio/host-narration.ts`, `components/audio/ScreenAudioController.tsx` | `useHostNarration` | Add `host-s02-welcome` (~12s, T+1s) and `host-s25-faq` (~20s, T+1s) tracks |
| **G-07** | **M** | **Mute control always visible** — competes with kiosk simplicity | `components/layout/GlobalHeader.tsx` | `MuteButton` | Hide mute in demo (`shouldHideSettings` parity) or move to staff-only corner |
| **G-08** | **L** | **Full journey exceeds 3–5 min** — 14 screens + 5 tour steps + narration totals ~8–12 min if followed literally | `lib/tour/mvp.ts`, `EXECUTIVE_NARRATION_SCRIPT.md` | `TourPlayer`, host tracks | Demo flag `maxTourSteps: 3` on trust tour for kiosk deployment |

---

## 4. Per-Screen Audit

Columns: **S** = scrolling · **C** = clipped · **F** = CTA below fold · **A** = audio delay · **P** = narration pacing · **N** = confusing nav · **B** = missing back · **H** = missing home · **M** = multi-choice · **W** = website feel

### S01 — Attract Loop

| | |
|--|--|
| **Route** | `/` |
| **Files** | `app/(showroom)/page.tsx`, `components/screens/ExperienceEntry.tsx`, `components/screens/AttractLoop.tsx` |
| **Components** | `ExperienceEntry`, `AttractLoop`, `CinematicShell`, `GlobalHeader` (hidden on attract) |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | No scroll — full `h-screen` tap target |
| C | L | Price line may clip on very short viewports (&lt;900px height) — rare on 1080p kiosk |
| F | — | “Tocá para empezar” centered in lower third — visible |
| A | M | Host delay **2.5s** (`host-narration.ts:33`) — acceptable; **no file plays** (G-02) |
| P | M | ~22s script vs 3–5 min budget — OK on idle; stops on touch (`ExperienceEntry.tsx:53`) |
| N | — | Single action — tap anywhere |
| B | — | N/A (entry) |
| H | — | N/A (entry) |
| M | — | One obvious choice |
| W | M | Ambient still/Ken Burns, not looping **video** — reads closer to premium screensaver than Tesla reel |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| C | `public/assets/audio/narration/host/` | Add `host-s01-attract.mp3` per `EXECUTIVE_NARRATION_SCRIPT.md` |
| M | `components/screens/AttractLoop.tsx` | Optional: loop 15s GS4 SCZ video via `HeroMedia` `loop` + `showAmbientLayer` priority |
| L | `components/screens/AttractLoop.tsx:44` | Apply `kioskViewportShellClass()` for consistency with S03+ |

---

### S02 — Session Welcome

| | |
|--|--|
| **Route** | `/` (phase overlay after S01) |
| **Files** | `components/screens/ExperienceEntry.tsx`, `components/screens/WelcomeScreen.tsx` |
| **Components** | `WelcomeScreen`, `ExperienceEntry` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | No scroll at 1080p |
| C | — | Copy fits `max-w-3xl` |
| F | — | “Empezar experiencia” visible without scroll |
| A | H | **No host track** for S02 — silent orientation beat after S01 audio |
| P | — | N/A |
| N | M | Demo locks `first_time` (`demo-mode.ts:18`) but still renders path card UI — harmless but slightly “form-like” |
| B | M | No **Atrás** to attract — child tap cannot undo welcome without staff reset |
| H | M | No Home — header shows logos but no escape hatch |
| M | — | Demo: one path + one CTA (OK) |
| W | M | Path-picker card pattern is web onboarding, not Tesla single-CTA |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/WelcomeScreen.tsx` | Add `TouchNav` with `backLabel="Volver"` calling `setPhase("attract")` |
| M | `lib/audio/host-narration.ts` | Register `host-s02-welcome`, wire in `ExperienceEntry` when `phase === "welcome"` |
| M | `components/screens/WelcomeScreen.tsx:75-110` | In demo mode, replace path grid with single line of copy — no faux choice |

---

### S03 — Vehicle Selector

| | |
|--|--|
| **Route** | `/vehicles` |
| **Files** | `app/(showroom)/vehicles/page.tsx`, `components/screens/VehicleSelector.tsx` |
| **Components** | `VehicleSelector`, `GlobalHeader` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | L | `kioskViewportShellClass()` applied — polish validation noted ~61px overflow risk on stat chips; re-verify on hardware |
| C | — | Solo GS4 card fits strict viewport in demo |
| F | — | “Explorar experiencia →” on card footer — visible |
| A | M | Delay **1.5s** (`host-s03`) — file missing (G-02) |
| P | M | ~28s narration may overlap impatient tap on card |
| N | — | Single hero card in demo — clear |
| B | **H** | **No TouchNav / no back to S02** |
| H | **C** | `GlobalHeader` brand not linked (`lockNavigation`, line 44-49) |
| M | — | One vehicle — OK |
| W | M | “Selección de vehículo” + stat chips feels like catalog page; CTA is text-link style inside card |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/VehicleSelector.tsx` | Add footer `TouchNav` `backHref="/"` `backLabel="Atrás"` |
| C | G-01 | Enable Home on header |
| M | `components/screens/VehicleSelector.tsx:123-125` | Promote CTA to full-width `PremiumCTA` bar below card |

---

### S22 — Immersive Vehicle Hero

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/hero` |
| **Files** | `app/(showroom)/vehicles/[slug]/hero/page.tsx`, `components/screens/VehicleHero.tsx`, `components/premium/HeroStatStrip.tsx`, `components/premium/HotSpotMarker.tsx` |
| **Components** | `VehicleHero`, `HeroStatStrip`, `HotSpotMarker`, `TouchNav`, `GlobalHeader` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | M | Outer `kioskViewportShellClass()` but inner `min-h-screen` (`VehicleHero.tsx:54`) — footer `TouchNav` can compress hero on short displays |
| C | — | Post-polish: stat strip uses `clamp()` — no truncation at 1080p |
| F | — | TouchNav **¿Es confiable?** pinned in footer — visible |
| A | M | Delay **2.0s** (`host-s22`) — file missing |
| P | M | ~32s host + Ken Burns delay 0.45s on footer — visitor may tap before narration frames “why FAQ next” |
| N | **H** | **Hotspots** (`enableHeroHotspotsInDemo`) link to topics — parallel exploration paths compete with scripted TouchNav |
| B | M | Back = “Modelos” → S03 — OK but label unclear vs “Atrás” |
| H | **C** | No Home (G-01) |
| M | **H** | Hotspots (up to 4) + TouchNav = **more than one obvious next step** |
| W | L | Premium theater aesthetic — strongest Tesla analog on path |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/VehicleHero.tsx:83-103` | Demo flag `disableHeroHotspotsOnScriptedPath` — hide hotspots when `highlightPrimaryCta` |
| M | `components/screens/VehicleHero.tsx:54` | Replace inner `min-h-screen` with `h-full flex-col` inside `kioskViewportShellClass()` parent |
| M | `components/screens/VehicleHero.tsx:115-117` | Replace helper copy with pulsing arrow on TouchNav next only |

---

### S25 — FAQ / Objections

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/trust/faq` |
| **Files** | `app/(showroom)/vehicles/[slug]/trust/faq/page.tsx`, `components/screens/FAQScreen.tsx`, `content/vehicles/gs4-max/faq.json` |
| **Components** | `FAQScreen`, `PersonaPortrait`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | **H** | **5 accordion rows** — opening **one** item adds ~120–180px; opening **two** forces page scroll (validated in `EXECUTIVE_DEMO_POLISH_VALIDATION.md`) |
| C | M | Carlos portrait `lg:w-[35%]` reduces FAQ column — long answers clip horizontal balance, not text |
| F | M | TouchNav footer visible closed; expanded content pushes nav down |
| A | **H** | **No host narration** on S25 |
| P | **H** | Answers ~55 words (`faq.json`) — too slow for 3–5 min path; **Profundizar:** lines are operator scripts leaked to customer (`FAQScreen.tsx:109-114`) |
| N | **C** | TouchNav `nextHref` → **S24** trust story (`faq/page.tsx:32`) — **not on executive path**; visitor derails to scroll-chapter screen |
| B | M | Back “Volver al hero” — OK |
| H | **C** | No Home |
| M | M | Accordion = discoverable-only interaction — non-obvious that tap expands |
| W | **H** | Accordion FAQ is classic **website** pattern, not kiosk “one answer, one CTA” |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| C | `app/(showroom)/vehicles/[slug]/trust/faq/page.tsx:32-33` | Demo: `nextHref={routes.tour(slug,"trust")}` `nextLabel="Tour con Carlos"` |
| H | `content/vehicles/gs4-max/faq.json` | Split answers: 1-sentence lead + optional “Más detalle”; remove `proofSuggestion` from customer JSON |
| H | `components/screens/FAQScreen.tsx` | Demo compact layout: show **top 2 questions** expanded by default, no accordion |
| H | `lib/audio/host-narration.ts` | Add `host-s25-faq` (~18s) |

---

### S06 — Guided Tour Player (Carlos / trust)

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/tour/trust` |
| **Files** | `app/(showroom)/vehicles/[slug]/tour/[tourId]/page.tsx`, `components/screens/TourPlayer.tsx`, `lib/tour/mvp.ts` |
| **Components** | `TourPlayer`, `TourMedia`, `TopicRenderer`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | **H** | Step body `overflow-y-auto` (`TourPlayer.tsx:128`); topic panel `max-h-[26vh] overflow-y-auto` (`TourPlayer.tsx:182`) — **nested hidden scroll** |
| C | M | Glass narration card overlays media — topic blocks below fold inside inner scroll |
| F | — | **Siguiente** / last-step **Profundizar en ADAS** in footer — visible |
| A | M | Host intro delay **1.0s** on step 1 only — no per-step host; Carlos text in glass card |
| P | **H** | **5 MVP steps** (`MVP_TRUST_TOUR_STEP_COUNT = 5`) × ~45–90s ≈ **4–7 min** for tour alone — exceeds attention budget |
| N | M | `backHref` → S24 (`tour/page.tsx:48`) — wrong for executive path (should be S25) |
| B | M | Step 0 back = “Salir” to S24 — not S25 |
| H | **C** | No Home |
| M | M | Last step: only **Profundizar en ADAS** in demo — OK; mid-tour only **Siguiente** — OK |
| W | M | Three content layers (media + glass + topic) = dashboard density |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `lib/config/demo-mode.ts` | `maxTrustTourSteps: 3` consumed in `tour/[tourId]/page.tsx` |
| H | `components/screens/TourPlayer.tsx:181-189` | Demo: hide `TopicRenderer` sub-panel — narration + media only |
| C | `app/(showroom)/vehicles/[slug]/tour/[tourId]/page.tsx:48` | Demo `backHref={routes.faq(slug)}` |
| M | `components/screens/TourPlayer.tsx:128` | Remove `overflow-y-auto` on step container in demo strict mode |

---

### S08 — Topic Deep Dive (ADAS)

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/themes/safety/adas` |
| **Files** | `app/(showroom)/vehicles/[slug]/themes/[themeId]/[topicId]/page.tsx`, `components/screens/TopicDeepDiveScreen.tsx`, `content/vehicles/gs4-max/topics/adas.json` |
| **Components** | `TopicDeepDiveScreen`, `TopicRenderer`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | **H** | Main column `overflow-y-auto` (`TopicDeepDiveScreen.tsx:39`) — hero + narration + **4-item feature grid** + stat callout exceed 1080p without scroll |
| C | — | TouchNav sticky footer — not clipped |
| F | **H** | Feature grid and stat callout **below fold** — invisible if visitor never scrolls |
| A | M | ADAS host delay **2.0s** (`host-s08-adas`) — suppresses frame track; file missing |
| P | M | Carlos narration block ~45 words in content — dense for kiosk |
| N | — | TouchNav next → compare — matches executive path |
| B | M | Back “Tour con Carlos” — OK |
| H | **C** | No Home |
| M | — | Single forward CTA in footer |
| W | M | Long-form article layout via `TopicRenderer` |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `lib/config/demo-mode.ts` | Add `topicCompactLayout: true` for demo path topics |
| H | `components/screens/TopicDeepDiveScreen.tsx` | Demo ADAS: 2×2 icon grid above fold, drop stat callout to compare screen |
| H | `components/screens/TopicDeepDiveScreen.tsx:39` | Replace scroll container with `kioskViewportShellClass()` flex column |

---

### S11 — Compare Hub

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/compare` |
| **Files** | `app/(showroom)/vehicles/[slug]/compare/page.tsx`, `components/screens/CompareHubScreen.tsx` |
| **Components** | `CompareHubScreen`, `CompareVerdictBadge`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | M | Two-column layout — fits 1080p closed; **category chip row** may wrap to second line |
| C | — | — |
| F | — | TouchNav **Ver comparación con…** visible |
| A | — | No host track on S11 |
| P | — | — |
| N | M | Pre-selected Corolla Cross helps; **category preview** still optional second interaction |
| B | M | Back → S08 ADAS — OK for path |
| H | **C** | No Home |
| M | **H** | **Select competitor** (trivial in demo) + **tap category for verdict** + **footer CTA** = 2–3 decisions |
| W | L | Strong side-by-side layout — acceptable kiosk compare picker |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/CompareHubScreen.tsx:205-245` | Demo: hide category preview section entirely — competitor pre-selected, one CTA |
| M | `components/screens/CompareHubScreen.tsx:257-259` | Shorten `nextLabel` to **Ver comparación →** (≤20 chars) |

---

### S12 — Compare Detail

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/compare/corolla-cross` |
| **Files** | `components/screens/CompareDetailScreen.tsx` |
| **Components** | `CompareDetailScreen`, `CompareVerdictBadge`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | **Demo compact** (`compareCompactLayout`) — no scroll at 1080p (polish PASS) |
| C | — | Scorecard + verdict + 3 rows fit viewport |
| F | — | **Cuota orientativa** in sticky TouchNav — visible |
| A | M | Host delay **1.5s** — file missing |
| P | M | Verdict paragraph 4 sentences (`CompareDetailScreen.tsx:42-43`) — borderline for 5s read rule |
| N | — | Clear forward to S26 |
| B | M | Back “Elegir competidor” — OK |
| H | **C** | No Home |
| M | — | One forward CTA in demo compact |
| W | L | Honest scorecard — differentiated kiosk moment |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| M | `components/screens/CompareDetailScreen.tsx:42-43` | Demo: shorten verdict to 2 lines max |
| C | G-02 | Ship `host-s12-compare.mp3` |
| L | `components/screens/CompareDetailScreen.tsx` | Pilot mode: keep full table but sticky TouchNav always visible (non-demo) |

---

### S26 — Financing Preview

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/economics/financing` |
| **Files** | `app/(showroom)/vehicles/[slug]/economics/financing/page.tsx`, `components/screens/FinancingPreviewScreen.tsx` |
| **Components** | `FinancingPreviewScreen`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | **Demo compact** (`financingCompact`) — cuota + plazo only, no scroll (polish PASS) |
| C | — | — |
| F | — | **Dar el siguiente paso** in TouchNav — visible |
| A | M | Delay **2.0s** after disclaimer block — file missing |
| P | M | Disclaimer duplicate in header (~40 words) + subcopy — slow for kiosk |
| N | M | **Trim toggle × plazo grid** = 2 interaction dimensions before forward |
| B | M | Back to compare — OK |
| H | **C** | No Home |
| M | **H** | Trim chips (2+) × plazo chips (4) — **more than one obvious choice** for standing parent |
| W | M | Light mode spreadsheet aesthetic — functional not aspirational |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/FinancingPreviewScreen.tsx` | Demo: lock trim to default, show **36 meses** only as selected state — plazo change via staff |
| M | `components/screens/FinancingPreviewScreen.tsx:131-134` | Collapse disclaimer to one line in demo |
| M | `lib/config/demo-mode.ts` | `financingSinglePlazo: 36` flag |

---

### S13 — Conversion Hub

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/convert` |
| **Files** | `app/(showroom)/vehicles/[slug]/convert/page.tsx`, `components/screens/ConversionHubScreen.tsx`, `components/conversion/ConversionParts.tsx` |
| **Components** | `ConversionHubScreen`, `ConversionPathCard`, `SessionRecap`, `ConsultantHandoffModal`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | **Focus mode** — 2 cards + compact recap fit 1080p (polish PASS) |
| C | — | — |
| F | — | Primary cards above fold |
| A | M | Host delay **2.5s** — file missing; fires after recap render |
| P | M | ~38s script — long for conversion beat |
| N | **H** | TouchNav `backLabel="Seguir explorando"` goes **back** to financing — label implies forward; cognitive dissonance |
| B | M | Back exists — mislabeled |
| H | **C** | No Home |
| M | **H** | **Two equal-focus cards** (asesor + test drive) + TouchNav WhatsApp = **3 conversion paths** |
| W | L | Recap chips feel personalized — strong kiosk moment |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/ConversionHubScreen.tsx:262-283` | Demo: single primary **Asesor ahora** full-width; test drive demoted to TouchNav next |
| H | `components/screens/ConversionHubScreen.tsx:322` | Rename back to **Volver a cuota** |
| M | `components/screens/ConversionHubScreen.tsx:323-328` | Remove WhatsApp from TouchNav when focus mode — avoid third path |

---

### S14 — Test Drive Form

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/test-drive` |
| **Files** | `app/(showroom)/vehicles/[slug]/test-drive/page.tsx`, `components/screens/TestDriveForm.tsx` |
| **Components** | `TestDriveForm`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | **Kiosk short form** — 3 fields, centered in strict viewport (polish PASS) |
| C | — | — |
| F | — | Sticky submit `bottom-4` — visible |
| A | — | No host narration |
| P | — | Helper copy one line in short form |
| N | — | Submit → auto-route to S15 WhatsApp |
| B | M | TouchNav “Volver” — OK |
| H | **C** | No Home |
| M | — | One submit action |
| W | M | Still a **form** — necessary evil; mitigated by 3 fields |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| M | `components/screens/TestDriveForm.tsx:527-539` | Demo: auto-select first `dayOptions` entry — reduce to **2 taps** (submit + confirm) |
| L | `components/screens/TestDriveForm.tsx:632` | Sheet variant still `max-h-[88vh] overflow-y-auto` — document “page only” for kiosk |

---

### S15 — WhatsApp Handoff

| | |
|--|--|
| **Route** | `/vehicles/gs4-max/whatsapp` |
| **Files** | `app/(showroom)/vehicles/[slug]/whatsapp/page.tsx`, `components/screens/WhatsAppHandoffScreen.tsx` |
| **Components** | `WhatsAppHandoffScreen`, `QRCodePanel`, `TouchNav` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | **H** | `kioskViewportShellClass()` on outer but inner grid stacks QR + message preview + consultant `GlassCard` — **consultant block below fold** if visitor doesn't scroll |
| C | — | QR 260px fits |
| F | **H** | **Abrir WhatsApp** visible; completion state absent — visitor may not know session ended |
| A | M | Host delay **2.0s**; QR sound at T+400ms (`WhatsAppHandoffScreen.tsx:75`) — file missing |
| P | M | Intro ~35 words + blockquote script — dense |
| N | M | No numbered “1 Escaneá · 2 Listo” — two parallel actions (QR vs button) |
| B | M | TouchNav back — OK |
| H | **C** | No Home |
| M | M | QR scan **or** tap button — acceptable dual path for WhatsApp |
| W | M | `<pre>` message preview + 3-column bullet grid = support page |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/screens/WhatsAppHandoffScreen.tsx` | Demo compact: QR + button + **“Listo — podés esperar al asesor”** banner only; hide consultant essay |
| H | `components/screens/WhatsAppHandoffScreen.tsx:150-266` | Single-viewport layout — remove `md:col-span-2` stacks |
| M | `components/screens/WhatsAppHandoffScreen.tsx` | Add **Fin del recorrido** celebration state after QR reveal |

---

### S36 — Consultant Live Handoff (modal on S13)

| | |
|--|--|
| **Route** | Modal overlay — triggered from S13 **Hablar con un asesor ahora** |
| **Files** | `components/handoff/ConsultantHandoffModal.tsx`, `components/screens/ConversionHubScreen.tsx`, `lib/demo/handoff-store.ts`, `app/api/handoff/route.ts` |
| **Components** | `ConsultantHandoffModal`, `ConversionHubScreen` |

| Check | Sev | Finding |
|-------|-----|---------|
| S | — | Modal fits viewport |
| C | — | — |
| F | — | **Seguir explorando** visible |
| A | — | No narration (appropriate) |
| P | — | Wait timer copy clear |
| N | M | “Seguir explorando” dismisses modal but **does not cancel queue** — visitor may think they cancelled |
| B | **H** | **No Back** — only dismiss; no “Cancelar solicitud” |
| H | **H** | **No Home** while modal open — child stuck behind overlay |
| M | — | One dismiss action — OK |
| W | L | Modal polish is presentation-grade |

**Fixes**

| Sev | File | Fix |
|-----|------|-----|
| H | `components/handoff/ConsultantHandoffModal.tsx` | Add **Cancelar solicitud** secondary action calling handoff store cancel |
| H | `components/handoff/ConsultantHandoffModal.tsx` | Add persistent **Inicio** in modal header (G-01) |
| M | `lib/demo/handoff-store.ts` | Surface claim state only on same browser — document; for film use two-device comp |
| M | `app/api/handoff/route.ts` | Ephemeral POST — not operational cross-device (audit note for executives) |

---

## 5. Master Severity Ranking (Executive Path)

| Rank | ID | Screen | Issue | Effort |
|------|-----|--------|-------|--------|
| 1 | G-03 | S25, S06 | TouchNav routes through S24 — breaks audited executive path | S |
| 2 | G-01 | All | No Home action in demo mode | S |
| 3 | G-02 | S01–S15 | Host narration MP3 assets missing | M (content) |
| 4 | S25 | S25 | FAQ accordion + scroll + operator `Profundizar` leak | S |
| 5 | S08 | S08 | Feature grid below fold — requires scroll | M |
| 6 | S06 | S06 | 5-step tour + nested scroll exceeds 3–5 min budget | M |
| 7 | S13 | S13 | Two dominant conversion cards + mislabeled back | S |
| 8 | S15 | S15 | Consultant content block below fold | S |
| 9 | S22 | S22 | Hotspots compete with scripted TouchNav | S |
| 10 | S03 | S03 | No back navigation to S02 | S |
| 11 | S26 | S26 | Trim × plazo dual toggles — cognitive load | S |
| 12 | S11 | S11 | Category preview chips — extra decision | S |
| 13 | G-04 | All | No session progress indicator | S |
| 14 | S36 | S36 | No cancel handoff / no home behind modal | M |
| 15 | G-05 | Global | Idle reset without save offer | M |
| 16 | S02 | S02 | No back to attract; no narration | S |
| 17 | S01 | S01 | No cinematic video loop — weaker luxury idle | L (asset) |
| 18 | S12 | S12 | Verdict paragraph slightly long | S (copy) |
| 19 | S14 | S14 | Day dropdown still required | S |
| 20 | G-06 | S02, S25 | Missing host narration on orientation/trust beats | M (content) |

---

## 6. Zero-Friction Scorecard (10 Criteria × Path)

| Criterion | Pass | Fail | Notes |
|-----------|------|------|-------|
| 1. No scrolling | 9/14 | S25†, S06, S08, S15† | † = fail when accordion open / consultant block reached |
| 2. No clipped content | 13/14 | S06 inner panel | TopicRenderer in 26vh viewport |
| 3. CTA above fold | 12/14 | S08, S15† | Grid / consultant block |
| 4. No audio delay issues | 3/14 | 11 screens | Delays OK; **assets missing** |
| 5. Narration pacing OK | 6/14 | Long host scripts + FAQ copy | Within budget only if presenter skips steps |
| 6. Clear navigation | 8/14 | S25→S24, S06 back, S13 back label | Path graph fixes needed |
| 7. Back action present | 11/14 | S02, S03, S36 | |
| 8. Home action present | 0/14 | **All fail** in demo mode | |
| 9. ≤1 obvious choice | 7/14 | S22, S11, S26, S13, S15 | |
| 10. Feels like kiosk not website | 8/14 | S25, S08, S15, S02, S03 | |

**Composite zero-friction score:** **52%** (demo mode, unsupervised) · **84%** (scripted, polish flags on, presenter coaches navigation)

---

## 7. Recommended Fix Sequence (No Implementation)

**Sprint A — Path integrity (≤1 day)**  
1. G-03: Rewire S25→S06 and S06→S25 in demo mode  
2. G-01: Global Home pill  
3. S03, S02: Back navigation  

**Sprint B — Above-fold education (≤2 days)**  
4. S25: Compact FAQ — no accordion in demo  
5. S08: `topicCompactLayout` for ADAS  
6. S06: `maxTrustTourSteps: 3`, hide topic sub-panel  
7. S15: Single-viewport WhatsApp layout  

**Sprint C — Decision reduction (≤1 day)**  
8. S22: Hide hotspots on scripted path  
9. S11: Hide category chips in demo  
10. S26: Lock trim/plazo defaults  
11. S13: Single primary CTA + fix back label  

**Sprint D — Audio & assets (parallel)**  
12. G-02: Record and ship host MP3s per `EXECUTIVE_NARRATION_SCRIPT.md`  
13. G-06: S02 + S25 host tracks  

**Sprint E — Handoff honesty**  
14. S36: Cancel + home in modal  
15. G-04: Demo path progress strip  

---

## 8. Files Index (Executive Path)

| Screen | Primary files |
|--------|----------------|
| S01 | `components/screens/AttractLoop.tsx`, `components/screens/ExperienceEntry.tsx` |
| S02 | `components/screens/WelcomeScreen.tsx` |
| S03 | `components/screens/VehicleSelector.tsx`, `app/(showroom)/vehicles/page.tsx` |
| S22 | `components/screens/VehicleHero.tsx`, `components/premium/HeroStatStrip.tsx`, `components/premium/HotSpotMarker.tsx` |
| S25 | `components/screens/FAQScreen.tsx`, `app/(showroom)/vehicles/[slug]/trust/faq/page.tsx`, `content/vehicles/gs4-max/faq.json` |
| S06 | `components/screens/TourPlayer.tsx`, `app/(showroom)/vehicles/[slug]/tour/[tourId]/page.tsx`, `lib/tour/mvp.ts` |
| S08 | `components/screens/TopicDeepDiveScreen.tsx`, `app/(showroom)/vehicles/[slug]/themes/[themeId]/[topicId]/page.tsx`, `content/vehicles/gs4-max/topics/adas.json` |
| S11 | `components/screens/CompareHubScreen.tsx`, `app/(showroom)/vehicles/[slug]/compare/page.tsx` |
| S12 | `components/screens/CompareDetailScreen.tsx` |
| S26 | `components/screens/FinancingPreviewScreen.tsx`, `app/(showroom)/vehicles/[slug]/economics/financing/page.tsx` |
| S13 | `components/screens/ConversionHubScreen.tsx`, `components/conversion/ConversionParts.tsx` |
| S14 | `components/screens/TestDriveForm.tsx` |
| S15 | `components/screens/WhatsAppHandoffScreen.tsx` |
| S36 | `components/handoff/ConsultantHandoffModal.tsx`, `lib/demo/handoff-store.ts` |
| Global | `lib/config/demo-mode.ts`, `components/layout/GlobalHeader.tsx`, `components/cinematic/TouchNav.tsx`, `lib/audio/host-narration.ts`, `components/audio/ScreenAudioController.tsx`, `components/overlays/IdleManager.tsx` |

---

## 9. References

- [`EXECUTIVE_DEMO_POLISH_IMPLEMENTATION.md`](./EXECUTIVE_DEMO_POLISH_IMPLEMENTATION.md) — Phase 2 polish baseline  
- [`EXECUTIVE_DEMO_POLISH_VALIDATION.md`](./EXECUTIVE_DEMO_POLISH_VALIDATION.md) — 1920×1080 capture results  
- [`CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md`](./CPI_OS_FINAL_EXECUTIVE_DEMO_AUDIT.md) — executive scorecard  
- [`KIOSK_POLISH_REPORT.md`](../../KIOSK_POLISH_REPORT.md) — canonical friction taxonomy  
- [`EXECUTIVE_NARRATION_SCRIPT.md`](../../EXECUTIVE_NARRATION_SCRIPT.md) — host timing matrix  

---

*End of audit — Phase 2B-A. No code changes made.*
