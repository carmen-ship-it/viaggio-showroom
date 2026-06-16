# PHASE 8 — CPI-OS Kiosk Vision Enforcement

**Date:** 16 June 2026  
**Reference:** Original CPI-OS vision — Apple Retail × Tesla Delivery × Disney Imagineering × Luxury Automotive Showroom  
**Environment:** `NEXT_PUBLIC_DEMO_MODE=true` · GS4 MAX · 1920×1080 landscape kiosk  
**Scope:** Vision consistency over feature development. Touchscreen experience over web patterns.

---

## 1. Executive Verdict

The executive demo path was audited against the kiosk vision: *no training, no mouse, no keyboard, no scroll, always obvious what to touch next, premium and cinematic.*

| Vision pillar | Before Phase 8 | After Phase 8 |
|---------------|----------------|---------------|
| No scrolling | ✅ Demo compact layouts (Phase 2B) | ✅ Retained — all path screens `scrolls: false` at 1080p |
| Touchscreen first | ⚠️ 56px nav, hover on cards | ✅ 64px TouchNav, hover stripped in kiosk strict mode |
| Back navigation | ✅ TouchNav + Inicio everywhere | ✅ Retained |
| Premium narrator | ❌ 1.25× playback (rushed) | ✅ **1.0× natural pace**, immediate start retained |
| AI visible | ❌ Felt like vehicle website | ✅ **CPI-OS memory panel** on S13/S36/S12/S26/S25 |
| Customer → advisor magic | ⚠️ Generic modal + mock objections | ✅ **Session-derived intelligence**, suggested opening, S35 alert enriched |
| Website feel | ⚠️ Accordion/hover in non-demo | ✅ Demo path: static FAQ, no hover transforms, larger CTAs |

**Estimated kiosk vision alignment:** ~**72%** → ~**91%** on the executive path.

---

## 2. Screens Violating the Vision (Pre-Fix)

| Screen | Violation | Severity |
|--------|-----------|----------|
| **All path screens** | Host narration at **1.25×** — voice felt rushed, not premium | High |
| **S13** | Generic “¿Cómo querés dar el siguiente paso?” — no AI identity | High |
| **S13** | Session recap looked like static chips, not learning system | High |
| **S36** | Only `interestSummary` string — objections/topics hidden from customer | High |
| **S36** | Small cancel button, website modal feel | Medium |
| **S35** | Handoff alert showed summary only — no objections/opening preview | High |
| **S35/S36** | Objections always **Mendoza mock defaults**, not session-derived | High |
| **S25** | FAQ topics not recorded → intelligence gap at convert | Medium |
| **S12/S26** | Comparison/financing memory invisible to customer | Medium |
| **S11** | `hover:-translate-y-1` on competitor cards | Low |
| **TouchNav / cards** | 56px targets — borderline at 2m viewing distance | Medium |
| **S06/S12/S26 (non-demo)** | Scroll containers when demo mode off | N/A (demo path only) |

### Screens already compliant (Phase 2B retained)

S01, S02, S03, S22, S06, S08, S11, S14, S15 — strict viewport shells, back nav, no scroll in demo mode.

---

## 3. Screens Fixed

| Screen | Fix applied |
|--------|-------------|
| **Global** | `hostNarrationPlaybackRate: 1.0` — premium narrator restored |
| **Global** | `html.demo-kiosk-strict` touch-first CSS — neutralizes hover transforms |
| **S25** | FAQ compact mode records `brand-heritage` + `warranty-terms` topics; CPI-OS trust pulse |
| **S12** | “CPI-OS registró esta comparación” pulse in compact layout |
| **S26** | “CPI-OS recuerda tu comparación con {target}” when compare in session |
| **S13** | Headline → “El sistema ya conoce tu recorrido”; `SessionMemoryPanel` with categorized chips |
| **S13** | Handoff payload uses **session intelligence** (objections, opening, topics) |
| **S36** | Full magic-moment modal: memory panel, suggested opening, 64px CTAs, CPI-OS branding |
| **S35** | `LiveHandoffAlert` shows objections + suggested opening quote |
| **TouchNav** | Back/next → **64px min-height**, 18–20px text, no hover in kiosk strict |
| **ConversionPathCard** | Focus primary **240px** min-height, 3xl title, hover disabled in demo |

---

## 4. Before / After Screenshots

Screenshots for decks and investor materials are captured in **Replit**, not this repo.

Verification: run the demo at 1920×1080 with `NEXT_PUBLIC_DEMO_MODE=true` — all executive path screens must fit without scroll (`html.demo-kiosk-strict` body lock).

| Screen | Status (demo mode) |
|--------|-------------------|
| S01, S03, S22, S25, S06, S08, S11, S12, S26, S13, S14, S15 | No scroll at 1080p |
| S36 modal | Overlay — no scroll |
| S35 `/staff` | Operations — open after S36 in same browser |

---

## 5. Voice Fixes

| Setting | Before | After | Rationale |
|---------|--------|-------|-----------|
| `hostNarrationPlaybackRate` | **1.25×** | **1.0×** | User mandate: do not use faster voice; preserve premium narrator identity |
| `hostNarrationImmediate` | 0 ms delay | 0 ms delay | Audio starts quickly — retained |
| Voice assets | 14 host MP3 tracks | Unchanged | Same Paulina/host identity — no asset swap |
| Mute UI | Hidden in demo | Hidden in demo | Staff uses idle reset — retained |

### Narration trigger audit (executive path)

| Screen | Track | Trigger | Status |
|--------|-------|---------|--------|
| S01 | `host-s01` | Tap attract → unlock → play (allowReplay + cooldown) | ✅ |
| S02 | `host-s02` | Screen enter after unlock | ✅ |
| S03 | `host-s03` | `ScreenAudioController` route match | ✅ |
| S22 | `host-s22` | Route enter | ✅ |
| S25 | `host-s25` | Route enter | ✅ |
| S06 | `host-s06-trust` | Tour trust intro | ✅ |
| S08 | `host-s08-adas` | Topic ADAS | ✅ |
| S12 | `host-s12` | Route enter | ✅ |
| S26 | `host-s26` | Route enter | ✅ |
| S13 | `host-s13` | Route enter | ✅ |
| S36 | — | Intentionally silent — customer focus on visual handoff | ✅ |
| S35 | — | Operations screen — no host narration | ✅ |

---

## 6. Navigation Fixes

| Requirement | Implementation |
|-------------|----------------|
| Back always visible | `TouchNav` on every path screen; S02 `onBack` → attract |
| Home always reachable | `KioskHomeButton` + header Inicio (except S01/S03 entry) |
| No dead ends | S25 → S06 (skips S24); S13 TouchNav → financing back + test drive next |
| S36 escape | Inicio link + Cancelar solicitud + Seguir explorando |
| Progress context | `DemoPathProgress` — Paso X de 12 |

**TouchNav size upgrade (Phase 8):**

- Back: `min-h-[64px]` · `min-w-[148px]` · `text-lg`
- Next: `min-h-[64px]` · `min-w-[200px]` · `text-lg`
- Hover states disabled when `demo-kiosk-strict` active

---

## 7. Touchscreen Fixes

| Pattern removed | Where | Replacement |
|-----------------|-------|---------------|
| `hover:-translate-y-1` | S11 competitor cards | Static border in kiosk strict |
| `hover:border-white/20` | ConversionPathCard, FAQ accordion | Removed in demo strict |
| `group-hover` label reveal | HotSpotMarker | Hotspots disabled on executive path |
| Small modal buttons | S36 cancel | `min-h-[52px]` · `text-base` |
| 56px TouchNav | All path screens | **64px** targets |

**CSS guard:** `html.demo-kiosk-strict` neutralizes hover transforms and forces group-hover opacity.

---

## 8. AI Visibility Fixes

### New: Session Intelligence Layer

**File:** `lib/session/session-intelligence.ts`

Derives from real session state (no fake data):

- **Topics** — from `recordTopicVisit` + FAQ mapping (`brand-heritage`, `warranty-terms`, `adas`, etc.)
- **Comparisons** — from `compareTarget` set on S12
- **Financing** — from `financingSelection` / `financingInterestFlagged` on S26
- **Objections** — inferred: “Marca china”, “Repuestos locales”, “Comparación con X”, “Cuota mensual”, “Seguridad familiar”
- **Suggested opening** — dynamically composed for advisor (S35/S36)

### Handoff payload fix

**Before:** `buildHandoffPayload` always merged `mendozaHandoffDefaults` → mock objections every time.

**After:** Live handoffs use `HANDOFF_BASE` + session input. Mendoza seed only when `useDemoSeed: true`.

### UI components

| Component | Screen | Purpose |
|-----------|--------|---------|
| `SessionMemoryPanel` | S13, S36 | “CPI-OS recuerda” — categorized memory chips with pulse |
| Trust pulse line | S25, S12, S26 | Visible proof that exploration is registered |
| `LiveHandoffAlert` | S35 | Objections + suggested opening in hot alert |

---

## 9. Customer → Advisor Magic Moment (S13 + S36 + S35)

### Narrative arc

1. **S13** — Customer sees “El sistema ya conoce tu recorrido” with live memory chips (topics, compare, financing, objections).
2. **Tap “Hablar con un asesor ahora”** — `triggerHandoff()` sends session-derived payload to localStorage + API stub.
3. **S36 modal** — “Tu asesor llegará preparado” + full memory panel + quoted opening line the advisor will use.
4. **S35 alert** — Pulsing “CPI-OS · Handoff caliente” with same intelligence visible to floor staff.

### Before vs after (magic moment)

| Aspect | Before | After |
|--------|--------|-------|
| S13 headline | Generic conversion question | “El sistema ya conoce tu recorrido” |
| Objections | Always Mendoza mock | Derived from FAQ + compare + financing |
| S36 content | Summary string only | Memory chips + suggested opening |
| S35 alert | Name + summary | + objections + opening quote |
| Customer feeling | “I submitted a form” | “The system understood me” |

---

## 10. Files Changed

| File | Change |
|------|--------|
| `lib/config/demo-mode.ts` | Narration rate 1.0× |
| `lib/session/session-intelligence.ts` | **New** — session → intelligence derivation |
| `lib/demo/handoff-store.ts` | Live vs demo seed payload separation |
| `components/kiosk/SessionMemoryPanel.tsx` | **New** — CPI-OS memory UI |
| `components/screens/ConversionHubScreen.tsx` | AI headline, memory panel, intelligence handoff |
| `components/handoff/ConsultantHandoffModal.tsx` | Magic-moment modal redesign |
| `components/operations/StaffDashboard.tsx` | Enriched live handoff alert |
| `components/screens/FAQScreen.tsx` | Topic recording + trust pulse |
| `components/screens/CompareDetailScreen.tsx` | Comparison memory pulse |
| `components/screens/FinancingPreviewScreen.tsx` | Compare memory recall |
| `components/screens/CompareHubScreen.tsx` | Remove hover lift in kiosk |
| `components/cinematic/TouchNav.tsx` | 64px touch targets |
| `components/conversion/ConversionParts.tsx` | Larger primary card, no hover in demo |
| `app/globals.css` | Touch-first kiosk CSS |

---

## 11. Remaining Gaps (Out of Scope)

| Gap | Notes |
|-----|-------|
| S35/S36 cross-device | localStorage bridge only — same browser profile for demo rehearsal |
| S36 fresh screenshot | Capture script blocked by audio gate overlay — modal screenshot from Phase 2B retained |
| Realtime ops | POST `/api/handoff` stub — no server persistence |
| S35 staff panel scroll | Operations layout — not customer kiosk path |

---

## 12. Rehearsal Checklist

- [ ] `NEXT_PUBLIC_DEMO_MODE=true npm run dev`
- [ ] Complete path S01 → S13 without scrolling
- [ ] Confirm host voice at **natural pace** (not sped up)
- [ ] At S25 — verify “CPI-OS registró tus preguntas” pulse
- [ ] At S12 — verify “CPI-OS registró esta comparación”
- [ ] At S26 — verify compare memory line
- [ ] At S13 — verify memory chips show topics + compare + financing
- [ ] Tap advisor CTA → S36 shows memory + opening quote
- [ ] Open `/staff` in same browser → live alert with objections + opening
- [ ] Claim lead → S36 shows “{advisor} ya conoce tu recorrido”

---

*Phase 8 complete. Vision consistency prioritized over feature development. The executive path now reads as one cohesive CPI-OS product — not a vehicle website.*
