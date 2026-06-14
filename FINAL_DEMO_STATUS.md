# Final Demo Status — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Branch state:** Phase 3A P0 media landed; production build passes  
**Primary reference:** [docs/demo-readiness-scorecard.md](docs/demo-readiness-scorecard.md) methodology

---

## Current Readiness: **43%**

### Methodology (unchanged from scorecard, recalculated inputs)

Dealership Demo Readiness is derived from the six composite metrics in the scorecard executive summary. Each sub-score was updated for post–Phase 3A facts; the headline **43%** is their weighted average (equal weight per dimension):

| Dimension | Before | After | Change driver |
|-----------|-------:|------:|---------------|
| MVP Completion % | 52 | **58** | Compare routes + convert/financing pages ship in build; build no longer fails |
| Visual Completion % | 18 | **33** | 6/33 unique manifest paths now render real photography on S01/S03/S22/S08/S25 |
| Conversion Completion % | 41 | **41** | Lead backend still absent; dealership data still placeholder |
| Content Completion % | 74 | **74** | Unchanged |
| Asset Completion % | 8 | **25** | 6 unique files on disk (was 0); manifest/resolver infra unchanged |
| Production Readiness % | 11 | **28** | `npm run build` succeeds; no Supabase/staff layer yet |

**Calculation:** (58 + 33 + 41 + 74 + 25 + 28) ÷ 6 = **43.2% → 43%**

### Asset-specific readiness

| Metric | Value |
|--------|------:|
| Phase 3A P0 WebP (6 requested) | **6 / 6** |
| P0 acquisition plan IDs in manifest (16) | **6 / 16** with direct files |
| Unique manifest paths with real files | **6 / 33** (18%) |
| Entries still on gradient fallback for primary `src` | **31 / 41** (76%) |

---

## What Improved Since Baseline

- **Real vehicle photography** on attract (S01), selector (S03), immersive hero (S22), ADAS topic (S08), trust tour step 1 (S06)
- **Carlos persona portrait** on FAQ (S25)
- **MediaResolver** confirms all six P0 IDs as `status: ready`
- **Production build** compiles (69 static routes) — prior scorecard blocker cleared
- **Compare hub/detail routes** exist at `/vehicles/gs4-max/compare`

---

## Remaining Blockers (prioritized)

### P0 — Stakeholder demo credibility

1. **11 remaining P0 manifest assets** — silver exterior, rear seats, 360 display, warranty infographic, both logos, Sofía/Diego avatars, compare Corolla image, attract/trust videos
2. **Placeholder dealership data** — `+59100000000`, `[Dirección…]` undermines every CTA
3. **Zero lead persistence** — test-drive submit is theater without `POST /api/leads` → storage
4. **Product truth conflicts** — screen size, airbags, transmission per `product-truth-matrix.md`
5. **Warranty graphic missing** — S06 step 6 and S25 still show gradient for `warranty-timeline-5yr-150k`
6. **No local social proof (S23)** — Chinese-brand objection answered by copy only

### P1 — Demo polish

7. Compare Corolla Cross asset + truth-fixed compare JSON sign-off  
8. Viaggio taller / GAC heritage videos for S24  
9. Kiosk overlays S19/S20 (a11y + idle reset)  
10. Financing cuota bands need Viaggio finance sign-off  

---

## Next 5 Tasks Before Stakeholder Demo

1. **Acquire next P0 batch (4 assets)** — `warranty-timeline-5yr-150k`, `logo-viaggio-full`, `logo-gac-full`, `compare-corolla-cross` (largest visual gaps on trust + compare arc)
2. **Replace `content/shared/dealership.json`** with real Banzer address, WhatsApp, and approved hours (ops task, blocks all CTAs)
3. **Wire lead capture MVP** — persist S14 test-drive to Supabase or email webhook so demo submissions are real
4. **Close product-truth P0** — align FAQ, compare, and hero stats with floor unit (12.3″ screen, 8 airbags)
5. **Shoot or source `gs4-max-ext-silver` + `gs4-max-int-rear-seats`** — completes selector card and family tour visual proof

---

## Demo Path Status (scripted arc)

| Step | Screen | Status today |
|------|--------|--------------|
| 1 | S01 Attract | **GO** — real hero stills (video loop still missing) |
| 2 | S03 Selector | **GO** — hero imagery visible |
| 3 | S22 Hero | **GO** — full-bleed photography |
| 4 | S25 FAQ | **Partial** — Carlos avatar real; warranty graphic gradient |
| 5 | S06 Tour | **Partial** — step 1 real; steps 2–8 mostly gradient |
| 6 | S08 ADAS | **GO** — dashboard photography |
| 7 | S11 Compare | **Partial** — route exists; Corolla asset missing |
| 8 | S26 Financing | **Partial** — page ships; bank logo gradient |
| 9 | S14 Test drive | **Partial** — UI only, no backend |
| 10 | S33 Family share | **GO** — navigable (WhatsApp still fake number) |

**Completable without dead ends:** S01 → S03 → S22 → S25 → S06 (partial media) → S08 → S34 → S14 → S33 — skip compare close if Corolla asset unavailable.

---

## Artifacts Produced

| Artifact | Location |
|----------|----------|
| Media availability audit | [MEDIA_AVAILABILITY_REPORT.md](./MEDIA_AVAILABILITY_REPORT.md) |
| Asset status summary | [DEMO_ASSET_STATUS.md](./DEMO_ASSET_STATUS.md) |
| Screen screenshots (×6) | [docs/audit/screenshots/](./docs/audit/screenshots/) |

---

*Audit only — no application code modified.*
