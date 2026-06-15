# CPI-OS — Reality Check (Film Production)

**Purpose:** Brutally honest status for every film scene. **Never present fiction as deployed.**  
**Inspected:** Codebase Jun 15 2026 — `app/` routes, `components/operations/`, `lib/demo/handoff-store.ts`, `docs/screenshots/s36-handoff/`  
**Legend:**

| Tag | Meaning |
|-----|---------|
| **REAL** | Implemented route/feature; screen recording reflects actual product |
| **PARTIALLY REAL** | UI exists; data, sync, or media incomplete |
| **MOCK** | Motion graphic or Figma; no product backing |
| **AI GENERATED** | Veo/Runway/Luma or AE typography — not product |

**Cross-links:** [Gap Audit](../CPI_OS_PRESENTATION_GAP_AUDIT.md) · [Screen Capture](./SCREEN_CAPTURE_MASTER_LIST.md) · [Full Script](./FULL_20_MINUTE_FILM_SCRIPT.md)

---

## Codebase verification summary

### What EXISTS (verified)

| Surface | Route / file | Screen ID |
|---------|--------------|-----------|
| Attract + Welcome | `/` | S01, S02 |
| Vehicle hub | `/vehicles/gs4-max` | S04 |
| Hero | `/vehicles/gs4-max/hero` | S22 |
| Trust tour/story/faq | `/trust/story`, `/trust/faq`, `/tour/*` | S06, S24, S25 |
| Compare | `/compare`, `/compare/corolla-cross` | S11, S12 |
| Financing | `/economics/financing` | S26 |
| Test drive | `/test-drive`, `/test-drive/info` | S14, S34 |
| Conversion + handoff modal | `/convert` + `ConsultantHandoffModal` | S13, **S36** |
| Share | `/share`, `/share/[token]` | S33 |
| Resume | `/resume` | S37 |
| Staff dashboard | `/staff` | S35-staff |
| Manager dashboard | `/manager` | — |
| Executive dashboard | `/executive` | — |
| Handoff API/store | `lib/demo/handoff-store.ts`, `app/api/handoff/route.ts` | localStorage demo |
| S36 screenshots | `docs/screenshots/s36-handoff/*.png` (4 files) | captured |

### What does NOT exist

| Storyboard promise | Status |
|--------------------|--------|
| S21 Pre-Visit `/visit/gs4-max` | **No route** in `app/` or `routes.ts` |
| S35 floor map on manager | **Not in** `ManagerDashboard.tsx` |
| Marketing attribution UI | **Not in** `ExecutiveDashboard.tsx` |
| Sales Sankey Mendoza path | **Not built** |
| Intelligence Timeline product screen | **Spec only** ([Timeline spec](../CPI_OS_INTELLIGENCE_TIMELINE_SPEC.md)) |
| Intelligence Map product screen | **Spec only** ([Map spec](../CPI_OS_INTELLIGENCE_MAP_SPEC.md)) |
| Cross-device kiosk→tablet sync | **localStorage same-browser only** |
| Live websocket kiosk sessions | **Static demo data** in `operations-data.ts` |
| Live footage Viaggio / cast | **Zero** — AI-first plan |
| PNG screenshot inventory (S01–S25) | **Not on disk** (except s36-handoff) |
| Real hero/attract video assets | **FallbackMedia** / gradients per demo audits |

---

## TRAILER-90 beats

| Shot | Title | Status | Notes |
|------|-------|--------|-------|
| TE-00 | Opening question | **AI GENERATED** | MG typography |
| TE-01 | Carla scroll | **AI GENERATED** | No live cast |
| TE-02 | Reel + tap | **AI GENERATED** + **MOCK** | Reel UI comp |
| TE-03 | QR scan | **AI GENERATED** | |
| TE-04 | S21 landing | **MOCK** | `/visit/` not in codebase |
| TE-05 | Dealership exterior | **AI GENERATED** | |
| TE-06 | Showroom walk-in | **AI GENERATED** | |
| TE-07 | Kiosk touch OTS | **PARTIALLY REAL** | UI real · human AI |
| TE-08 | S01→S02 | **REAL** | `/` · session continuity demo-dependent |
| TE-09 | Trust montage | **PARTIALLY REAL** | Routes real · media often fallback |
| TE-10 | Compare | **REAL** | Strongest honest moment |
| TE-11 | Financing | **REAL** | Requires demo mode off |
| TE-12 | S36 modal | **PARTIALLY REAL** | Modal real · sync same-browser only |
| TE-13 | Staff alert | **PARTIALLY REAL** | `/staff` real · demo data · local handoff |
| TE-14 | Manager | **REAL** | Demo data · no floor map |
| TE-15 | Executive | **PARTIALLY REAL** | KPIs real · no attribution panels |
| TE-16 | Delivery | **AI GENERATED** | |
| TE-17 | Golden hour drive | **AI GENERATED** | |
| TE-18 | Closing question | **AI GENERATED** | |
| TE-19 | Logo | **AI GENERATED** | |

---

## ACT 1 — El problema de hoy

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A1-S1 | Cliente deambula | **AI GENERATED** | No showroom B-roll |
| A1-S2 | Vendedor repite | **AI GENERATED** | |
| A1-S3 | Gerente a ciegas | **AI GENERATED** + **MOCK** CRM | Do not show `/manager` in Act 1 |
| A1-S4 | Marketing a ciegas | **MOCK** + **AI GENERATED** | No Meta Ads integration |

---

## ACT 2 — Conocé al cliente

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A2-S1 | Instagram ad | **AI GENERATED** + **MOCK** | |
| A2-S2 | QR → S21 | **MOCK** | Route missing |
| A2-S3 | Llegada | **AI GENERATED** | Optional S01 in composite |
| A2-S4 | Primer toque kiosco | **PARTIALLY REAL** | `/` S01/S02 |
| A2-S5 | Hero S22 | **PARTIALLY REAL** | Route exists · media fallbacks |
| A2-S6 | Confianza Carlos | **PARTIALLY REAL** | S24/S25 · content OK · video may fallback |
| A2-S7 | Familia Diego | **PARTIALLY REAL** | S08 real · family insert AI |
| A2-S8 | Comparación honesta | **REAL** | S11/S12 implemented |
| A2-S9 | Cuota orientativa | **REAL** | S26 implemented |
| A2-S10 | Handoff + prueba | **PARTIALLY REAL** | S36+S14 · handoff local only |
| A2-S11 | WhatsApp familia | **PARTIALLY REAL** | S33 share real · WA thread mock |
| A2-S12 | La compra | **AI GENERATED** | |

---

## ACT 3 — Equipo de ventas

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A3-S1 | Tablet vendedor | **REAL** | `/staff` · static demo data |
| A3-S2 | Cola priorizada | **REAL** | Temperature badges implemented |
| A3-S3 | Alerta caliente | **PARTIALLY REAL** | Works same-browser · not production sync |
| A3-S4 | Handoff brief | **REAL** | Mendoza narrative in `operations-data` |
| A3-S5 | Javier recibe familia | **AI GENERATED** | No live dialogue footage |

---

## ACT 4 — Gerente

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A4-S1 | Tablero + mapa | **PARTIALLY REAL** | `/manager` yes · floor map **MOCK** |
| A4-S2 | Sesiones activas | **REAL** | `activeKioskSessions` demo |
| A4-S3 | SLA | **REAL** | No reassign action |
| A4-S4 | Pruebas del día | **REAL** | No fleet assignment UI |

---

## ACT 5 — Propietario

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A5-S1 | Reporte semanal | **REAL** | `/executive` KPIs + trends |
| A5-S2 | Atribución marketing | **MOCK** | **Not in product** — Timeline MG only |
| A5-S3 | Sankey ventas | **MOCK** | **Not in product** |
| A5-S4 | Top objeciones | **REAL** | `topObjections` in dashboard |
| A5-S5 | Top competidores | **REAL** | `topCompetitors` in dashboard |

---

## ACT 6 — Por qué cambia todo

| Scene | Title | Status | Notes |
|-------|-------|--------|-------|
| A6-S1 | Más pruebas | **MOCK** KPI + **AI GENERATED** | Pilot numbers illustrative |
| A6-S2 | Más ventas | **MOCK** KPI + **AI GENERATED** | |
| A6-S3 | Memoria institucional | **MOCK** | Intelligence Map spec only |
| A6-S4 | Futuro retail | **AI GENERATED** | |
| A6-S5 | Cierre logo | **AI GENERATED** | |

---

## Aggregate scorecard

| Status | Scene count (full film) | % |
|--------|-------------------------|---|
| **REAL** | 10 | 22% |
| **PARTIALLY REAL** | 12 | 27% |
| **MOCK** | 8 | 18% |
| **AI GENERATED** | 15 | 33% |

*45 scene units across Acts 1–6 + trailer beats*

---

## What you CAN honestly claim in a screening

1. **Kiosk journey is walkable** — `/` through compare, financing, test drive, convert (72+ routes build)
2. **Honest comparison** (S11/S12) is implemented — rare differentiator
3. **Operations dashboards exist** — `/staff`, `/manager`, `/executive` with presentation-grade UI
4. **S36 handoff modal exists** — customer can trigger advisor request on `/convert`; staff sees brief on `/staff` **in demo setup (same machine)**
5. **S36 screenshots captured** — 4 PNGs in `docs/screenshots/s36-handoff/`

---

## What you CANNOT claim (yet)

1. **"Instagram ad connected to sale in the dashboard"** — no attribution UI
2. **"Pre-visit QR landing is live"** — S21 route missing
3. **"Tablet vibrates when any kiosk in the dealership triggers"** — localStorage only, not multi-device
4. **"Manager sees live floor map"** — not built
5. **"This was filmed at Viaggio"** — AI-first; no location shoot
6. **"Institutional memory compiles automatically"** — Intelligence Map/Timeline are presentation specs
7. **"Production media on every screen"** — hero/trust videos largely fallback placeholders

---

## Mandatory on-screen labels (external audiences)

| When showing | Label |
|--------------|-------|
| S21 mock | *Pre-visita — concepto de piloto* |
| Timeline / Sankey / Map | *Capa de inteligencia — visión de producto* |
| Floor map inset | *Mapa de piso — visión piloto* |
| Act 6 KPI lifts | *Resultados ilustrativos — piloto* |
| Handoff loop in trailer | *Demostración en entorno piloto* (optional but recommended) |

---

## Gap vs June 2026 Gap Audit — updates

| Item | Gap Audit (Jun 15) | Reality Check (film) |
|------|--------------------|----------------------|
| S36 client modal | ❌ Missing | ✅ **Now exists** on `/convert` |
| S36 → staff alert | ❌ Fiction | ⚠️ **PARTIALLY REAL** (localStorage) |
| S36 screenshots | ❌ | ✅ 4 PNGs committed |
| S21 | ❌ | ❌ Still missing |
| Attribution | ❌ | ❌ Still missing |
| Live footage | ❌ | ❌ Replaced by AI plan |

---

## Presenter script (honest)

> *"Las pantallas del recorrido del cliente y los tableros de equipo son el producto que estamos piloteando. La atribución de marketing, el mapa de piso en vivo y la pre-visita por QR están en la hoja de ruta — las verán hoy como visualizaciones de diseño, claramente marcadas. La coordinación asesor-kiosco funciona en demostración; la sincronización en todos los dispositivos del piso es el siguiente hito de ingeniería."*

---

*Parent: [EXECUTIVE_FILM_MASTER_PLAN.md](./EXECUTIVE_FILM_MASTER_PLAN.md)*
