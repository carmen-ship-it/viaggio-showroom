# CPI-OS — Executive Film Master Plan (AI-First)

**Internal title:** `CPI_OS_EXECUTIVE_FILM_AI_v01`  
**Production model:** Zero live-action · Screen recordings · Motion graphics · AI video · Spanish VO  
**Format master:** 3840×2160 · 23.976 fps · 16:9 · Rec. 709  
**Canon:** Familia Mendoza · Javier Ríos · Patricia Vargas · Miguel Ángel Suárez · Viaggio Motors SCZ · GAC GS4 MAX gris  
**Date:** Junio 2026

---

## Production shift (mandatory)

| Old plan | New plan |
|----------|----------|
| Viaggio location shoot, cast, drone, showroom B-roll | **AI-generated** dealership exteriors, families, delivery moments |
| Javier/Patricia/Miguel on camera | **Voice + UI** — ops dashboards are the human anchor |
| S21 live QR on phone | **Figma/AE mock** until `/visit/[slug]` is built |
| "Deployed product" implication | **Label every frame** per [REALITY_CHECK.md](./REALITY_CHECK.md) |

This package replaces location-dependent production with an **Apple-keynote-grade digital film** that can ship from a laptop. See [REALITY_CHECK.md](./REALITY_CHECK.md) before any external screening.

---

## Document map (film package)

| # | Document | Purpose |
|---|----------|---------|
| 1 | **This file** | Runtime structures, acts, transitions |
| 2 | [TRAILER_90_AI_VERSION.md](./TRAILER_90_AI_VERSION.md) | 90s opener — no actors |
| 3 | [FULL_20_MINUTE_FILM_SCRIPT.md](./FULL_20_MINUTE_FILM_SCRIPT.md) | Scene-by-scene 6-act script |
| 4 | [SCREEN_CAPTURE_MASTER_LIST.md](./SCREEN_CAPTURE_MASTER_LIST.md) | Every capturable route |
| 5 | [AI_VIDEO_PROMPTS.md](./AI_VIDEO_PROMPTS.md) | Veo / Runway / Luma prompts |
| 6 | [MOTION_GRAPHICS_PLAN.md](./MOTION_GRAPHICS_PLAN.md) | KPI, flow, timeline, map |
| 7 | [VOICEOVER_MASTER_SCRIPT.md](./VOICEOVER_MASTER_SCRIPT.md) | Spanish VO — all runtimes |
| 8 | [ASSET_PRODUCTION_BACKLOG.md](./ASSET_PRODUCTION_BACKLOG.md) | Prioritized production queue |
| 9 | [REALITY_CHECK.md](./REALITY_CHECK.md) | REAL / MOCK / AI per scene |

**Parent presentation docs:**  
[Storyboard ES](../CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md) · [Trailer Master Edit](../CPI_OS_TRAILER_MASTER_EDIT.md) · [Film Shot List](../CPI_OS_FILM_SHOT_LIST.md) · [Gap Audit](../CPI_OS_PRESENTATION_GAP_AUDIT.md) · [Intelligence Timeline](../CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) · [Intelligence Map](../CPI_OS_INTELLIGENCE_MAP_SPEC.md)

---

## Three runtime versions

### Version A — Teaser · 3:00

| Field | Detail |
|-------|--------|
| **Objective** | Stop-scroll opener before a board meeting, investor email, or WhatsApp forward. Plant one question: *¿Y si cada visita dejara inteligencia?* |
| **Audience** | Busy owners, angels, strategic partners — attention span ≤ 3 min |
| **Emotional arc** | Curiosity → recognition → aspiration → brand |
| **Structure** | Cold open (problem montage) → Mendoza micro-journey (kiosk UI only) → ops flash (staff alert) → closing typography |
| **Acts used** | Act 1 compressed (1 scene) · Act 2 highlights (4 scenes) · Act 3 (1 scene) · Act 5 (1 KPI strip) · Logo |
| **Scene count** | ~12 editorial units |
| **Transitions** | Hard cuts on music downbeats · 2 dissolves (problem → product · UI → logo) |
| **VO** | Sparse — 6 lines max; music-led. Full script: [VO § Teaser](./VOICEOVER_MASTER_SCRIPT.md#teaser-300) |
| **Estimated runtime** | **2:55–3:05** (target 3:00.000) |

**Beat map**

| Time | Beat | Source |
|------|------|--------|
| 0:00–0:25 | Problem montage (AI + MG) | Act 1 · [AI prompts §1–2](./AI_VIDEO_PROMPTS.md) |
| 0:25–0:45 | Instagram → QR (AI phone + S21 mock) | Act 2.1–2.2 |
| 0:45–1:35 | Kiosk journey UI montage S01→S12→S26 | [Screen capture P0](./SCREEN_CAPTURE_MASTER_LIST.md) |
| 1:35–1:55 | S36 handoff + `/staff` alert | REAL product · [s36 screenshots](../../screenshots/s36-handoff/) |
| 1:55–2:25 | `/manager` + `/executive` KPI pulse | REAL demo data |
| 2:25–2:50 | AI delivery wide + question card | [AI prompts §7](./AI_VIDEO_PROMPTS.md) |
| 2:50–3:00 | CPI-OS logo | [Motion graphics §Logo](./MOTION_GRAPHICS_PLAN.md) |

---

### Version B — Executive · 8:00

| Field | Detail |
|-------|--------|
| **Objective** | Primary sales film for dealership leadership off-site. Prove vision **and** show working surfaces without a live demo. |
| **Audience** | Propietarios, GMs, directores comerciales y de marketing |
| **Emotional arc** | Pain (structural) → guided discovery → team empowerment → executive clarity → future dealership |
| **Structure** | Full Act 1 (problem) · Act 2 (customer journey, abbreviated) · Act 3–5 (ops trilogy) · Act 6 compressed · CTA |
| **Scene count** | ~28 editorial units |
| **Transitions** | Act breaks: 1s black + super title · UI sequences: match cuts on tap · Ops: cool grade pulse |
| **VO** | Confident narrator throughout. [VO § Executive 8min](./VOICEOVER_MASTER_SCRIPT.md#executivo-800) |
| **Estimated runtime** | **7:50–8:10** (target 8:00.000) |

**Act timing**

| Act | Title | Duration | Scenes |
|-----|-------|----------|--------|
| 1 | El problema de hoy | 1:30 | 1.1–1.4 (AI + MG only) |
| 2 | Conocé al cliente | 3:00 | 2.1–2.10 (skip 2.11–2.12 or AI still) |
| 3 | Equipo de ventas | 1:15 | 3.1–3.4 (no 3.5 live dialogue) |
| 4 | Gerente | 1:00 | 4.1–4.4 (`/manager` scroll) |
| 5 | Propietario | 1:00 | 5.1, 5.4, 5.5 + **MG** attribution (not product) |
| 6 | Por qué cambia todo | 0:45 | 6.3 Intelligence Map + 6.4 AI montage |
| — | Cierre | 0:30 | Logo + presenter handoff line |

---

### Version C — Full · 20:00

| Field | Detail |
|-------|--------|
| **Objective** | Flagship keynote replacement — Dreamforce / Tesla reveal density. Room goes dark; film **is** the presentation. |
| **Audience** | Owners, investors, federation partners, Viaggio leadership |
| **Emotional arc** | Full storyboard arc from [WOW Storyboard](../CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md) |
| **Structure** | 6 acts + cierre · Intelligence Timeline insert in Act 5 · Intelligence Map in Act 6 |
| **Scene count** | ~45 editorial units (all storyboard scenes 1.1–6.5) |
| **Transitions** | Act titles 2s · Journey UI: continuous scroll feel · Timeline: horizontal wipe |
| **VO** | Full narration — scene IDs map to [FULL_20_MINUTE_FILM_SCRIPT.md](./FULL_20_MINUTE_FILM_SCRIPT.md) |
| **Estimated runtime** | **19:30–20:30** (target 20:00.000) |

**Act timing (canonical)**

| Act | Title | Duration | Notes |
|-----|-------|----------|-------|
| 1 | El problema de hoy | 2:30 | Scenes 1.1–1.4 |
| 2 | Conocé al cliente | 7:00 | Scenes 2.1–2.12 |
| 3 | Lo que ve el equipo de ventas | 3:00 | Scenes 3.1–3.5 |
| 4 | Lo que ve el gerente | 2:30 | Scenes 4.1–4.4 |
| 5 | Lo que ve el propietario | 2:30 | Scenes 5.1–5.5 |
| 6 | Por qué cambia todo | 2:00 | Scenes 6.1–6.4 |
| — | Cierre | 0:30 | Scene 6.5 |

---

## Mandatory opener: TRAILER-90 (AI)

All three versions **may** open with [TRAILER_90_AI_VERSION.md](./TRAILER_90_AI_VERSION.md) (90s, music-led, minimal VO). Recommended flow for owner meetings:

1. TRAILER-90 (black → film → logo)
2. Presenter: *"Ahora veamos cómo funciona."*
3. Version B (8 min) or live kiosk demo

---

## Visual language (AI-first)

| Layer | Treatment | Grade |
|-------|-----------|-------|
| **AI video** | Photoreal SCZ, golden hour, no identifiable real staff | Warm daylight → neutral |
| **Screen recordings** | 4K capture, no dev chrome, demo mode OFF | Slight cool lift on ops |
| **Motion graphics** | Dark navy `#0a0f1a`, accent gold `#c9a227`, Mendoza cyan path | Match [ops-theme](../../../components/operations/ops-theme.ts) |
| **Typography** | SF Pro / Inter · questions in light weight · KPIs in tabular nums | — |
| **Audio** | Cinematic score + UI SFX bed · Spanish VO -16 LUFS | [Trailer audio map](../CPI_OS_TRAILER_MASTER_EDIT.md) |

---

## Scene ID convention (cross-doc)

| Prefix | Meaning | Example |
|--------|---------|---------|
| `A{n}-S{m}` | Full film act.scene | A2-S8 = Act 2 Scene 2.8 compare |
| `TE-{nn}` | Trailer beat | TE-12 = S36 handoff |
| `CAP-{id}` | Screen capture row | CAP-S22 |
| `MG-{id}` | Motion graphic | MG-TIMELINE |
| `AI-{id}` | AI video prompt | AI-L5-exterior |

---

## Production phases

| Phase | Deliverable | Owner | Blocker |
|-------|-------------|-------|---------|
| **P0** | Screen capture pass (18 P0 surfaces) | Engineering + Design | Demo mode, media fallbacks |
| **P0** | TRAILER-90 AI assembly | Editor | S21 mock, AI exteriors |
| **P0** | S36 handoff demo loop (kiosk + staff same machine) | Engineering | Cross-device sync |
| **P1** | Intelligence Timeline + Map AE builds | Motion | Spec-only today |
| **P1** | VO record (3 tracks) | VO talent | Script lock |
| **P2** | Full 20-min picture lock | Producer | All P0+P1 |

See [ASSET_PRODUCTION_BACKLOG.md](./ASSET_PRODUCTION_BACKLOG.md) for full queue.

---

## QC gates (before external screen)

- [ ] Every frame tagged REAL / PARTIAL / MOCK / AI in [REALITY_CHECK.md](./REALITY_CHECK.md)
- [ ] No narration claims marketing attribution UI exists (5.2–5.3 = MG only)
- [ ] S36 handoff labeled **PARTIAL** unless cross-browser sync ships
- [ ] `/visit/` never shown without "concept" lower-third
- [ ] `npm run build` passes · ops routes load at 4K
- [ ] Legal: AI faces not matched to real Viaggio staff

---

## Presenter handoff (after film)

> *"Lo que vieron en pantalla es el sistema que estamos desplegando en Viaggio Motors. Algunas capas — atribución de marketing, mapa de piso en vivo — están en la hoja de ruta del piloto. Lo que ya funciona hoy es el recorrido del cliente en kiosco y la coordinación del equipo en `/staff`, `/manager` y `/executive`."*

Adjust per [REALITY_CHECK.md](./REALITY_CHECK.md) at time of screening.

---

*Next: [TRAILER_90_AI_VERSION.md](./TRAILER_90_AI_VERSION.md) · [FULL_20_MINUTE_FILM_SCRIPT.md](./FULL_20_MINUTE_FILM_SCRIPT.md)*
