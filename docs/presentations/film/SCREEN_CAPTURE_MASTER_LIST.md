# CPI-OS — Screen Capture Master List

**Purpose:** Every capturable product surface for the AI-first executive film  
**Capture spec:** 3840×2160 · 60fps source · export 23.976 · no cursor · no dev tools · demo mode OFF  
**Default vehicle slug:** `gs4-max` (verify `getDefaultVehicleSlug()` in content)  
**Date:** Junio 2026 · **Codebase inspected:** Jun 15 2026

**Cross-links:** [Master Plan](./EXECUTIVE_FILM_MASTER_PLAN.md) · [Trailer 90](./TRAILER_90_AI_VERSION.md) · [Full Script](./FULL_20_MINUTE_FILM_SCRIPT.md) · [Reality Check](./REALITY_CHECK.md) · [Gap Audit](../CPI_OS_PRESENTATION_GAP_AUDIT.md)

---

## Capture setup checklist

1. `npm run dev` — kiosk at `http://localhost:3000`
2. Set `NEXT_PUBLIC_DEMO_MODE` or demo flags so financing/share branches visible on S13
3. Hide screen IDs: production build or `shouldHideDeveloperTools()`
4. Viewport: 3840×2160 fullscreen OR 1920×1080 kiosk aspect with 2× export
5. Session seed: complete Carlos journey before S13 so handoff brief is rich
6. Handoff demo: trigger S36 on `/convert`, then capture `/staff` in same browser profile
7. Ops routes: `/staff` · `/manager` · `/executive` — dark mode, no browser chrome

**Tooling:** OBS Studio · QuickTime (fallback) · `scripts/capture-s36-handoff-screenshots.mjs` for S36 stills

---

## Priority legend

| Priority | Meaning |
|----------|---------|
| **P0** | Blocks trailer or Act 2–5; capture first |
| **P1** | Full 20-min film; capture week 1 |
| **P2** | Nice-to-have · B-roll inserts |

---

## Showroom — Kiosk journey

### CAP-S01 — Attract Loop

| Field | Value |
|-------|-------|
| **Screen ID** | S01 |
| **Route** | `/` |
| **Component** | `ExperienceEntry` → attract phase |
| **Duration** | 15s loop + 3s tap |
| **Camera** | Static full frame · optional 102% slow zoom on hero |
| **Priority** | **P0** |
| **Notes** | Video may fallback to gradient (`gs4-max-hero-01`); capture best available state |
| **Used in** | TE-07, TE-08 · A2-S4 · Trailer beat 4 |

---

### CAP-S02 — Session Welcome

| Field | Value |
|-------|-------|
| **Screen ID** | S02 |
| **Route** | `/` (after tap) |
| **Duration** | 8s — select *"Ya investigué online"* |
| **Camera** | Static · highlight resume banner if S37 session exists |
| **Priority** | **P0** |
| **Used in** | TE-08 · A2-S4 |

---

### CAP-S03 — Vehicle Selector

| Field | Value |
|-------|-------|
| **Screen ID** | S03 |
| **Route** | `/vehicles` |
| **Duration** | 6s scroll |
| **Camera** | Slow vertical pan |
| **Priority** | P2 |
| **Used in** | Full film B-roll only |

---

### CAP-S04 — Vehicle Hub

| Field | Value |
|-------|-------|
| **Screen ID** | S04 |
| **Route** | `/vehicles/gs4-max` |
| **Duration** | 10s — hover journeys |
| **Camera** | Static → gentle pan to Carlos card |
| **Priority** | P1 |
| **Used in** | A2-S6 entry |

---

### CAP-S22 — Cinematic Hero

| Field | Value |
|-------|-------|
| **Screen ID** | S22 |
| **Route** | `/vehicles/gs4-max/hero` |
| **Duration** | 12s — let motion settle |
| **Camera** | Static · optional parallax crop |
| **Priority** | **P0** |
| **Used in** | TE-09 · A2-S5 |

---

### CAP-S06 — Trust Tour

| Field | Value |
|-------|-------|
| **Screen ID** | S06 |
| **Route** | `/vehicles/gs4-max/tour/trust-tour` (verify tour id in content) |
| **Duration** | 20s — 2–3 steps |
| **Camera** | Follow tap transitions |
| **Priority** | P1 |
| **Used in** | A2-S6 |

---

### CAP-S24 — Trust Story (Carlos)

| Field | Value |
|-------|-------|
| **Screen ID** | S24 |
| **Route** | `/vehicles/gs4-max/trust/story` or `/experience/carlos` |
| **Duration** | 15s |
| **Camera** | Static |
| **Priority** | **P0** |
| **Used in** | TE-09 · A2-S6 |

---

### CAP-S25 — FAQ / Carlos clip

| Field | Value |
|-------|-------|
| **Screen ID** | S25 |
| **Route** | `/vehicles/gs4-max/trust/faq` |
| **Duration** | 12s — expand repuestos question |
| **Camera** | Static |
| **Priority** | **P0** |
| **Used in** | TE-09 · A2-S6 |

---

### CAP-S08 — Family Safety Topic

| Field | Value |
|-------|-------|
| **Screen ID** | S08 |
| **Route** | `/vehicles/gs4-max/themes/safety/family-safety` |
| **Duration** | 12s |
| **Camera** | Slow scroll |
| **Priority** | P1 |
| **Used in** | A2-S7 Diego path |

---

### CAP-S11 — Compare Hub

| Field | Value |
|-------|-------|
| **Screen ID** | S11 |
| **Route** | `/vehicles/gs4-max/compare` |
| **Duration** | 8s |
| **Camera** | Static · highlight Corolla Cross row |
| **Priority** | **P0** |
| **Used in** | TE-10 · A2-S8 |

---

### CAP-S12 — Compare Detail

| Field | Value |
|-------|-------|
| **Screen ID** | S12 |
| **Route** | `/vehicles/gs4-max/compare/corolla-cross` |
| **Duration** | 10s — scroll honest advantages |
| **Camera** | Vertical scroll mid-speed |
| **Priority** | **P0** |
| **Used in** | TE-10 · A2-S8 |

---

### CAP-S26 — Financing Preview

| Field | Value |
|-------|-------|
| **Screen ID** | S26 |
| **Route** | `/vehicles/gs4-max/economics/financing` |
| **Duration** | 12s — adjust slider to USD ~412 |
| **Camera** | Static · animate slider 0:02–0:08 |
| **Priority** | **P0** |
| **Used in** | TE-11 · A2-S9 |

---

### CAP-S14 — Test Drive Form

| Field | Value |
|-------|-------|
| **Screen ID** | S14 |
| **Route** | `/vehicles/gs4-max/test-drive` |
| **Duration** | 10s — fill Mendoza fields |
| **Camera** | Static |
| **Priority** | P1 |
| **Used in** | A2-S10 |

---

### CAP-S34 — Test Drive Logistics

| Field | Value |
|-------|-------|
| **Screen ID** | S34 |
| **Route** | `/vehicles/gs4-max/test-drive/info` |
| **Duration** | 8s |
| **Camera** | Static |
| **Priority** | P2 |

---

### CAP-S13 — Conversion Hub

| Field | Value |
|-------|-------|
| **Screen ID** | S13 |
| **Route** | `/vehicles/gs4-max/convert` |
| **Duration** | 8s — show path cards |
| **Camera** | Static |
| **Priority** | P1 |
| **Used in** | A2-S10 lead-in to S36 |

---

### CAP-S36 — Consultant Handoff Modal

| Field | Value |
|-------|-------|
| **Screen ID** | S36 (modal on S13) |
| **Route** | `/vehicles/gs4-max/convert` → *"Hablar con asesor ahora"* |
| **Duration** | 8s — timer tick · wait state |
| **Camera** | Static full modal |
| **Priority** | **P0** |
| **Implementation** | `ConsultantHandoffModal` + `handoff-store.ts` |
| **Stills exist** | `docs/screenshots/s36-handoff/s36-customer-modal.png` |
| **Used in** | TE-12 · A2-S10 · A3-S3 |

---

### CAP-S33 — Family Share

| Field | Value |
|-------|-------|
| **Screen ID** | S33 |
| **Route** | `/vehicles/gs4-max/share` |
| **Duration** | 10s |
| **Camera** | Static |
| **Priority** | P1 |
| **Used in** | A2-S11 |
| **Mobile variant** | `/share/[token]` — capture 390×844 device frame separately |

---

### CAP-S15 — WhatsApp Handoff

| Field | Value |
|-------|-------|
| **Screen ID** | S15 |
| **Route** | `/vehicles/gs4-max/whatsapp` |
| **Duration** | 8s |
| **Camera** | Static |
| **Priority** | P2 |

---

### CAP-S37 — Resume Session

| Field | Value |
|-------|-------|
| **Screen ID** | S37 |
| **Route** | `/vehicles/gs4-max/resume` |
| **Duration** | 6s |
| **Camera** | Static |
| **Priority** | P1 |
| **Used in** | A2-S4 continuity beat |

---

### CAP-S29 — Warranty Deep Dive

| Field | Value |
|-------|-------|
| **Screen ID** | S29 |
| **Route** | `/vehicles/gs4-max/trust/warranty` |
| **Duration** | 10s |
| **Camera** | Scroll |
| **Priority** | P2 |

---

### CAP-S21 — Pre-Visit QR Landing

| Field | Value |
|-------|-------|
| **Screen ID** | S21 |
| **Route** | `/visit/gs4-max` — **❌ NOT IN CODEBASE** |
| **Duration** | N/A |
| **Priority** | **P0** (mock) |
| **Action** | Figma/AE mock · do not screen-record until route ships |
| **Used in** | TE-04 · A2-S2 |

---

## Operations layer

### CAP-OPS-STAFF — Staff Dashboard

| Field | Value |
|-------|-------|
| **Screen ID** | S35 (staff) |
| **Route** | `/staff` |
| **Component** | `StaffDashboard` |
| **Duration** | 15s — select Mendoza · show brief |
| **Camera** | Slow scroll · zoom 110% on hot badge @ 0:05 |
| **Priority** | **P0** |
| **Stills** | `docs/screenshots/s36-handoff/s36-staff-alert.png` |
| **Used in** | TE-13 · A3-S1–S4 |

---

### CAP-OPS-MANAGER — Manager Command

| Field | Value |
|-------|-------|
| **Route** | `/manager` |
| **Component** | `ManagerDashboard` |
| **Duration** | 20s — KPIs → handoffs → funnel → roster |
| **Camera** | Vertical scroll full page |
| **Priority** | **P0** |
| **Stills** | `docs/screenshots/s36-handoff/s36-manager-handoff.png` |
| **Gap** | No floor map — do not crop fake map |
| **Used in** | TE-14 · A4-S1–S4 |

---

### CAP-OPS-EXEC — Executive Report

| Field | Value |
|-------|-------|
| **Route** | `/executive` |
| **Component** | `ExecutiveDashboard` |
| **Duration** | 25s — KPI strip → trends → objections → competitors |
| **Camera** | Scroll · hold 3s on revenue KPI |
| **Priority** | **P0** |
| **Gap** | No attribution table / Sankey |
| **Used in** | TE-15 · A5-S1, S4, S5 |

---

## Capture summary

| Priority | Count | IDs |
|----------|-------|-----|
| **P0** | **18** | S01, S02, S22, S24, S25, S11, S12, S26, S36, /staff, /manager, /executive + S21 mock (required) + TE comps |
| **P1** | 9 | S04, S06, S08, S14, S13, S33, S37, S33-mobile |
| **P2** | 4 | S03, S34, S15, S29 |

**P0 screen recordings (product routes): 17** (+ 1 S21 mock = **18 P0 assets**)

---

## NOT capturable (motion graphics only)

| Surface | Spec doc | Film use |
|---------|----------|----------|
| Intelligence Timeline | [Timeline spec](../CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) | A5-S2, A5-S3 |
| Intelligence Map | [Map spec](../CPI_OS_INTELLIGENCE_MAP_SPEC.md) | A6-S3 |
| Marketing attribution dashboard | Gap Audit P0 | A5-S2 |
| Manager floor map | Storyboard 4.1 | A4-S1 partial |
| Instagram Reel UI | Trailer TE-02 | AI + MG |

---

*Next: [AI_VIDEO_PROMPTS.md](./AI_VIDEO_PROMPTS.md) · [ASSET_PRODUCTION_BACKLOG.md](./ASSET_PRODUCTION_BACKLOG.md)*
