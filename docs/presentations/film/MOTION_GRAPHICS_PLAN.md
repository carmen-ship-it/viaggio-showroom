# CPI-OS — Motion Graphics Plan

**Tools:** After Effects 2025 (hero) · Premiere Pro (assembly) · CapCut (rapid teaser drafts)  
**Master comp:** 3840×2160 · 23.976 · 16-bit · sRGB  
**Design tokens:** Navy `#0a0f1a` · Gold `#c9a227` · Cyan path `#38bdf8` · Ops surfaces per `components/operations/ops-theme.ts`

**Cross-links:** [Master Plan](./EXECUTIVE_FILM_MASTER_PLAN.md) · [Intelligence Timeline spec](../CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) · [Intelligence Map spec](../CPI_OS_INTELLIGENCE_MAP_SPEC.md) · [Trailer 90](./TRAILER_90_AI_VERSION.md) · [Full Script](./FULL_20_MINUTE_FILM_SCRIPT.md)

---

## Production approach by tool

| Deliverable | AE | Premiere | CapCut |
|-------------|-----|----------|--------|
| Intelligence Timeline | ✅ Primary | Import | Preview only |
| Intelligence Map | ✅ Primary | Import | — |
| KPI counter animations | ✅ | — | Teaser draft |
| Typography cards | ✅ | — | ✅ TRAILER-90 draft |
| Screen recording polish | LUT + zoom | ✅ Primary | — |
| Lead flow diagram | ✅ | — | — |
| Logo lockup | ✅ | — | ✅ |

**Recommendation:** Picture-lock trailer in Premiere; hero MG in AE → ProRes 4444 → Premiere.

---

## Typography cards

**Used in:** TE-00 · TE-18 · A6-S5

### Spec

| Property | Value |
|----------|-------|
| Font | Inter / SF Pro Display · Light 300 questions · Regular 400 sublines |
| Size | Question 72px @ 4K · tracking +2 |
| Animation | Fade up 20px · 18 frames · ease `[0.22, 1, 0.36, 1]` |
| Color | White 92% · gold rule 1px width 40% center |

### Copy (ES)

- Hook: *"¿Y si cada cliente que entra a su concesionaria dejara inteligencia atrás?"*
- Close subline: *"CPI-OS"*
- Tag: *"Sistema Operativo de Inteligencia para Compras Consideradas"*

### CapCut path

1. Template 16:9 4K · black background  
2. Text layer with typewriter 0.5s  
3. Export H.264 review → replace with AE for final

---

## Logo lockup

**Comp:** `MG_LOGO_4K_v01` · 5s

| Layer | Content |
|-------|---------|
| L1 | CPI-OS wordmark · scale 96→100% over 24 frames |
| L2 | Gold hairline expand center-out |
| L3 | Viaggio co-brand smaller · fade @ 2s |
| L4 | Subtle particle field (reuse AI-DVIZ plate at 8% opacity) |

**Audio:** Single piano note @ logo in

---

## KPI animations

**Used in:** A6-S1 · A6-S2 · TE-15 accent · Executive scroll emphasis

### MG-KPI-01 — Counter tick

| Field | Spec |
|-------|------|
| Duration | 3s |
| Data | +22% pruebas · +15% ventas (pilot illustrative) |
| Style | Tabular nums · count-up ease-out |
| Label | Lower-third: *"Resultados ilustrativos — piloto Viaggio"* |

### MG-KPI-02 — Ops pulse

Sync to `/executive` KPI strip — recreate in AE matching `MetricCard` layout:

- Visitas 847 · Leads 124 · Ventas 18 · Revenue USD 521K  
- Delta pills green/red matching demo data from `lib/demo/operations-data.ts`

**Approach:** Screen capture base + AE tracked highlights on numbers (not full rebuild)

---

## Lead flow — kiosk to advisor

**Comp:** `MG_LEADFLOW_v01` · 12s  
**Used in:** A3-S3 · Trailer TE-12→TE-13 bridge

### Storyboard

```
[S36 Modal] ──pulse──▶ [localStorage event] ──▶ [/staff alert]
     │                                              │
     └──────────── Mendoza brief ──────────────────┘
```

| Node | Visual | Timing |
|------|--------|--------|
| Kiosk | Crop from CAP-S36 | 0:00–0:04 |
| Path line | Cyan bezier + traveling dot | 0:04–0:08 |
| Staff | Crop from CAP-OPS-STAFF | 0:08–0:12 |

**Honesty label:** *"Demostración en entorno piloto"* @ 0:10 for external cuts

### After Effects

- Shape layers for path · trim paths 0→100%  
- Glow on "HANDOFF CALIENTE" badge  
- SFX: custom `handoff_alert.wav` @ path arrival

### CapCut

- Keyframe arrow sticker + swipe transition — acceptable for internal review only

---

## Manager dashboard enhancements

### Manager floor map (concept)

**Used in:** A4-S1 · TE-14 (optional inset)  
**Status:** **NOT in `/manager` codebase** — MG only

| Element | Spec |
|---------|------|
| Layout | Top-down schematic 3 kiosk bays · GS4 MAX bay highlighted |
| Mendoza node | Pulse · depth counter 87% · "Javier en camino" |
| Label | **"Visión piloto — mapa de piso"** mandatory |
| Style | Match `ManagerDashboard` dark cards · not game-map aesthetic |

**Do not** imply live websocket tracking.

---

## Executive dashboard — attribution panels

**Used in:** A5-S2 · A5-S3  
**Status:** **NOT in `/executive` codebase**

### Intelligence Timeline

**Comp:** `MG_TIMELINE_4K_v01` · 35s  
**Data source:** [Intelligence Timeline spec](../CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md) — 13 events

| Phase | Time | Content |
|-------|------|---------|
| Zoom in | 0–5s | Event 1 Instagram impression |
| Scroll | 5–20s | Events 2–8 kiosk journey |
| Handoff | 20–25s | Event 9 Javier alert |
| Close | 25–35s | Events 10–13 sale + revenue USD 28,900 |

**Fields per node:** timestamp · source · actor · screen · intelligence · value

**Animation:** Horizontal scroll · active node scale 1.08 · connector draw-on

### Attribution Sankey

**Comp:** `MG_SANKEY_4K_v01` · 20s

```
Instagram → QR → Kiosco → Comparación → Handoff → Prueba → Venta
```

| Channel width | Proportional to pilot spec (illustrative) |
| Color | Campaign gold → product cyan → revenue green |
| Label | *"Atribución ilustrativa — Familia Mendoza"* |

---

## Intelligence Map

**Comp:** `MG_MAP_4K_v01` · 50s  
**Used in:** A6-S3  
**Spec:** [Intelligence Map](../CPI_OS_INTELLIGENCE_MAP_SPEC.md)

### Acts (internal)

| Act | Time | Camera |
|-----|------|--------|
| Mendoza hero path | 0–20s | Slow dolly on single DAG |
| Zoom to dealership | 20–35s | 20 parallel paths appear |
| Institutional | 35–50s | L3 moat shell · hundreds of nodes |

**AE technique:** Plexus or custom shape layers · avoid sci-fi neon — Palantir restraint

**Cavalry alternative:** For node physics if AE timeline slips

---

## Screen recording polish (Premiere)

| Technique | Use |
|-----------|-----|
| Scale 100→102% over 5s | Static UI shots |
| Crop safe 5% | Hide browser edge |
| Lumetri: slight desat -5, lift shadows | Match ops dark grade |
| Click ripple (AE export) | Tap moments on S01, S36 |
| Speed ramp 80→100% | Long scrolls on `/manager` |

---

## Instagram / CRM mocks (Act 1)

| Comp | Content |
|------|---------|
| `MG_INSTA_REEL_v01` | 9:16 GS4 · familia · badge campaign |
| `MG_CRM_EMPTY_v01` | Generic CRM · empty notes fields · blur logos |
| `MG_META_ADS_v01` | Simplified Ads Manager ES |

---

## Audio-sync MG beats

| Timecode (Trailer) | MG element | SFX |
|--------------------|------------|-----|
| TE-00 | Question fade | Music in |
| TE-12 | S36 chip glow | UI whoosh |
| TE-13 | Staff pulse | Handoff alert |
| TE-18 | Text hold | Music drop |

---

## Deliverables checklist

| ID | Comp name | Duration | Priority |
|----|-----------|----------|----------|
| MG-01 | MG_LOGO_4K_v01 | 5s | P0 |
| MG-02 | MG_TYPO_HOOK_v01 | 4s | P0 |
| MG-03 | MG_LEADFLOW_v01 | 12s | P0 |
| MG-04 | MG_INSTA_REEL_v01 | 15s | P0 |
| MG-05 | MG_TIMELINE_4K_v01 | 35s | P1 |
| MG-06 | MG_SANKEY_4K_v01 | 20s | P1 |
| MG-07 | MG_MAP_4K_v01 | 50s | P1 |
| MG-08 | MG_FLOOR_MAP_v01 | 8s | P1 |
| MG-09 | MG_KPI_PILOT_v01 | 6s | P2 |

---

*Next: [VOICEOVER_MASTER_SCRIPT.md](./VOICEOVER_MASTER_SCRIPT.md)*
