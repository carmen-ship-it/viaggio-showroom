# CPI-OS — Presentation Gap Audit

**Role:** Executive presentation consultant (Apple · Tesla · Disney Imagineering · McKinsey lens)  
**Scope:** Full presentation experience — narrative, storyboard, film, screenshots, product surfaces  
**Audience lenses:** Dealership Owner · General Manager · Sales Director · Marketing Director  
**Reference materials audited:**

- [`CPI_OS_EXECUTIVE_NARRATIVE_ES.md`](./CPI_OS_EXECUTIVE_NARRATIVE_ES.md)
- [`CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md`](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md)
- [`CPI_OS_FILM_SHOT_LIST.md`](./CPI_OS_FILM_SHOT_LIST.md)
- [`CPI_OS_VISUAL_PRODUCTION_PLAN.md`](./CPI_OS_VISUAL_PRODUCTION_PLAN.md)
- [`CPI_OS_DEMO_VIDEO_PLAN_ES.md`](./CPI_OS_DEMO_VIDEO_PLAN_ES.md)
- Product: kiosk routes · `/staff` · `/manager` · `/executive`
- Prior audits: [`PRESENTATION_READINESS_AUDIT.md`](../../PRESENTATION_READINESS_AUDIT.md) · [`PRESENTATION_GAP_BACKLOG.md`](../../PRESENTATION_GAP_BACKLOG.md)

**Audit date:** 15 June 2026  
**Build verified:** `npm run build` passes · 72+ static routes including operations layer

---

## Executive summary

CPI-OS has **world-class narrative architecture** — the storyboard, film plan, and executive narrative would pass review at a Tesla product film or McKinsey transformation pitch. The **product and production layers lag the story by 12–18 months of perceived maturity**.

| Stakeholder | What they need to feel | What they will feel today |
|-------------|------------------------|---------------------------|
| **Dealership Owner** | “This is a business asset that compounds — ROI, attribution, moat.” | Strong vision doc; weak proof of closed-loop revenue intelligence |
| **General Manager** | “I can run Saturday from one screen — live floor, SLA, reassign.” | `/manager` looks credible in screenshots; not wired to real kiosks |
| **Sales Director** | “My team stops repeating catalog; hot leads get context in 90 seconds.” | `/staff` handoff brief is presentation-grade; kiosk → tablet loop is fiction in demo |
| **Marketing Director** | “I know which Instagram ad sold the SUV.” | Storyboard Act 5.2 is excellent; **no marketing attribution UI exists** |

**Bottom line:** You can win a **kiosk-only** room with a scripted walkthrough. You **cannot** win a skeptical owner room with screen recordings alone — they will smell mock data and missing film. The gap is not ideas; it is **production closure**: live footage, real media, connected ops, attribution surfaces, and screenshot/video inventory at 4K.

---

## Scoring legend (per scene)

| Code | Question |
|------|----------|
| **A** | Does this currently exist? (product, mock, or captured asset) |
| **B** | Is it screenshot-ready? (clean frame, no dev chrome, narrative data) |
| **C** | Is it video-ready? (can drop into 16:9 film without embarrassment) |
| **D** | Is it believable? (would a SCZ dealer owner accept this as their dealership) |
| **E** | Is it emotionally powerful? |
| **F** | Likely to generate executive excitement? |

**Scale:** ✅ Yes · ⚠️ Partial · ❌ No

**Stakeholder tags:** `O` Owner · `GM` General Manager · `SD` Sales Director · `MK` Marketing Director

---

## Stakeholder lens — cross-cutting gaps

### Dealership Owner (`O`)

| Need | Status | Blocker |
|------|--------|---------|
| One-page weekly P&L story (embudo → ventas → ingresos) | ⚠️ `/executive` has KPIs + trends | No Sankey attribution, no marketing ROI, no PDF/export |
| Proof CPI-OS is an **asset**, not SaaS | ❌ | Act 6.3 institutional memory is storyboard-only |
| Film that shows **their** showroom, not Figma | ❌ | Zero live footage captured |
| Pilot numbers with credibility guardrails | ⚠️ | Demo data reads well but is static |

### General Manager (`GM`)

| Need | Status | Blocker |
|------|--------|---------|
| Live floor map + session depth | ❌ | Storyboard 4.1 “supervisor map” not in `/manager` |
| SLA breach → reassign in one tap | ⚠️ | SLA metrics shown; no reassign action |
| Test drive calendar + fleet conflict | ⚠️ | List in `/manager`; no vehicle assignment UI |
| End-of-day summary push to owner | ❌ | Narrative only |

### Sales Director (`SD`)

| Need | Status | Blocker |
|------|--------|---------|
| Priority queue 🔴🟡🟢 | ✅ | `/staff` — demo data, polished UI |
| Handoff brief with opening line | ✅ | Mendoza/Ríos narrative matches storyboard 3.4 |
| Kiosk “asesor ahora” → tablet alert | ❌ | No S36; conversion hub omits CTA |
| Loss reason capture → weekly pattern | ❌ | No consultant close/lost flow |
| Join live kiosk session on tablet | ❌ | Not implemented |

### Marketing Director (`MK`)

| Need | Status | Blocker |
|------|--------|---------|
| Pre-visit QR landing (S21) | ❌ | Route not built |
| Campaign → showroom → sale attribution | ❌ | Executive storyboard 5.2 has no product surface |
| Compare/competitor intel for creative | ⚠️ | `/executive` competitor table; not tied to campaigns |
| Family share / spouse decision tracking | ⚠️ | S33 UI exists; no analytics |

---

## Scene-by-scene audit (34 storyboard scenes + TRAILER-90)

*Primary source: [`CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md`](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md)*

### ACTO 1 — El problema de hoy

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **1.1** | Cliente deambula | ❌ | ❌ | ❌ | — | ⚠️ | ⚠️ | O, GM, SD |
| **1.2** | Vendedor repite | ❌ | ❌ | ❌ | — | ✅ | ✅ | SD, GM |
| **1.3** | Gerente a ciegas | ❌ | ❌ | ❌ | — | ✅ | ✅ | GM, O |
| **1.4** | Marketing a ciegas | ❌ | ❌ | ❌ | — | ✅ | ✅ | MK, O |

**Notes**

- **1.1–1.4:** Entire act is **film-dependent**. No B-roll, no showroom photography, no captured frames. Pain is narratively perfect; **production is at 0%**.
- **1.3:** `/manager` *contradicts* this scene if shown too early — you’d undercut the “before” story. Act 1 must stay live/AI plate only.
- **1.4:** Meta Ads mock + empty floor — planned as UI mock; **nothing produced**.

---

### ACTO 2 — Conocé al cliente

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **2.1** | Instagram ad | ❌ | ❌ | ❌ | — | ⚠️ | ⚠️ | MK |
| **2.2** | QR scan → S21 | ❌ | ❌ | ❌ | — | ⚠️ | ⚠️ | MK, O |
| **2.3** | Llegada concesionaria | ⚠️ | ❌ | ❌ | — | ✅ | ✅ | O, GM |
| **2.4** | Primer toque kiosco | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | All |
| **2.5** | Hero inmersivo S22 | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | All |
| **2.6** | Recorrido confianza | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | O, SD |
| **2.7** | Vida familiar Diego | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | SD, MK |
| **2.8** | Comparación honesta | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | All |
| **2.9** | Cuota orientativa | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | O, SD |
| **2.10** | Prueba de manejo | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | SD, GM |
| **2.11** | WhatsApp familia | ⚠️ | ❌ | ❌ | ⚠️ | ✅ | ✅ | MK, O |
| **2.12** | La compra | ❌ | ❌ | ❌ | — | ✅ | ✅ | O |

**Notes**

- **Kiosk core (2.4–2.10):** Routes exist (`/`, `/vehicles`, `/hero`, `/trust/*`, `/compare`, `/economics/financing`, `/test-drive`). **Screenshot-ready blocked by:** zero PNG inventory on disk; gradient/SVG media fallbacks; demo mode hides financing/share branches on S13.
- **2.2 S21:** Missing — breaks marketing attribution arc.
- **2.3 / 2.12:** Hero money shots require **Viaggio location + GS4 physical + family cast** — highest ROI film assets, not built.
- **2.8:** Strongest believable product moment — honest compare row is implemented and narratively differentiated.
- **2.11:** S33 share page exists; **no mobile mock screenshots**, WhatsApp thread mock not produced, compare/cuota not always in payload.

---

### ACTO 3 — Equipo de ventas

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **3.1** | Tablet vendedor | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | SD |
| **3.2** | Cola priorizada | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | SD, GM |
| **3.3** | Alerta caliente | ⚠️ | ❌ | ❌ | ❌ | ✅ | ✅ | SD |
| **3.4** | Handoff brief | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | SD, O |
| **3.5** | Javier recibe familia | ❌ | ❌ | ❌ | — | ✅ | ✅ | SD, O |

**Notes**

- **`/staff` (S35):** Exists with Mendoza/Ríos-aligned demo data — **major upgrade since June readiness audit**. UI quality is presentation-tier for stills.
- **3.3:** Requires **S36 client modal + sync alert** — client modal missing; staff alert is static, not triggered from kiosk.
- **3.5:** **#1 WOW asset in entire presentation** — must be live dialogue on Viaggio floor. Cannot be faked with AI faces.
- **Believability gap:** Sophisticated owners will ask “if I tap the kiosk now, does Javier’s tablet move?” Answer today: **no**.

---

### ACTO 4 — Gerente

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **4.1** | Tablero en vivo + mapa | ⚠️ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | GM |
| **4.2** | Sesiones activas | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | GM |
| **4.3** | Tiempos respuesta SLA | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | GM, SD |
| **4.4** | Pruebas del día | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | GM |

**Notes**

- **`/manager`:** Dark ops shell, funnel, roster, SLA, test drives — **covers ~70% of storyboard Act 4 in one scroll**.
- **Missing vs storyboard:** Floor map with kiosk dots (4.1), reassign action (4.3), vehicle-unit assignment on calendar (4.4).
- **Video:** Patricia in glass office + live monitor — **not filmed**; UI-only inserts will feel cold without human anchor.

---

### ACTO 5 — Propietario

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **5.1** | Reporte semanal | ⚠️ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | O |
| **5.2** | Atribución marketing | ❌ | ❌ | ❌ | — | ✅ | ✅ | MK, O |
| **5.3** | Atribución ventas Sankey | ❌ | ❌ | ❌ | — | ✅ | ✅ | O, MK |
| **5.4** | Top objeciones | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ✅ | O, SD |
| **5.5** | Top competidores | ✅ | ⚠️ | ❌ | ⚠️ | ⚠️ | ⚠️ | O, MK |

**Notes**

- **`/executive`:** Delivers KPI strip, weekly trends, insights, objections, competitors — **good foundation for 5.1, 5.4, 5.5**.
- **Critical hole:** **5.2 and 5.3 are the owner’s “take my money” scenes** — Instagram → QR → kiosco → Javier → venta. **Not built.** This is the Marketing Director’s entire reason to fund CPI-OS.
- **5.1:** Storyboard asks for **one-page weekly PDF aesthetic**; current UI is dashboard, not “Monday morning coffee report.”

---

### ACTO 6 — Por qué cambia todo

| Scene | Title | A | B | C | D | E | F | Primary stakeholders |
|-------|-------|---|---|---|---|---|---|----------------------|
| **6.1** | Más pruebas | ❌ | ❌ | ❌ | — | ⚠️ | ⚠️ | GM, O |
| **6.2** | Más ventas | ❌ | ❌ | ❌ | — | ✅ | ✅ | O |
| **6.3** | Memoria institucional | ❌ | ❌ | ❌ | — | ✅ | ✅ | O |
| **6.4** | Futuro retail montage | ❌ | ❌ | ❌ | — | ✅ | ✅ | All |
| **6.5** | Cierre logo | ❌ | ❌ | ❌ | — | ⚠️ | ⚠️ | All |

**Notes**

- Act 6 is **90% motion graphics + film** — almost nothing captured.
- **6.3** node-network animation is the **intellectual moat slide** for investors; high priority for AE/Cavalry production.

---

### TRAILER-90 (mandatory opener)

| Beat | A | B | C | D | E | F |
|------|---|---|---|---|---|---|
| T-01–T-15 full trailer | ❌ | ❌ | ❌ | — | ✅ | ✅ |

**Notes:** Shot list and schedule are production-ready. **Zero raw footage.** Trailer is the single highest-leverage deliverable before any owner meeting.

---

## Screenshot inventory audit

**Referenced paths in storyboard / readiness docs:**

| Asset | Referenced path | On disk |
|-------|-----------------|---------|
| S01 Attract | `docs/audit/screenshots/S01-attract-loop.png` | ❌ |
| S03 Vehicles | `docs/audit/screenshots/S03-vehicle-selector.png` | ❌ |
| S06 Trust | `docs/audit/screenshots/S06-trust-tour.png` | ❌ |
| S08 ADAS | `docs/audit/screenshots/S08-adas-topic.png` | ❌ |
| S11 Compare | `docs/screenshots/executive-demo-pass/after/s11-compare.png` | ❌ |
| S22 Hero | `docs/screenshots/executive-demo-pass/after/s22-hero.png` | ❌ |
| S24 Trust story | `docs/screenshots/executive-demo-pass/after/s24-trust-story.png` | ❌ |
| S25 FAQ | `docs/screenshots/executive-demo-pass/after/s25-faq.png` | ❌ |
| S35 Staff | — | ❌ never captured |
| S35 Manager | — | ❌ never captured |
| Executive report | — | ❌ never captured |
| S21, S33 mobile | — | ❌ screens not built |

**Finding:** **0 PNG assets** in repository. Documentation references a screenshot pass that **was not committed or was lost**. Every “Existing screenshot” row in the Visual Production Plan is **currently false**.

**Screenshot readiness by surface (live capture possible today):**

| Surface | Route | Ready after capture pass? |
|---------|-------|---------------------------|
| Kiosk journey | `/` → `/convert` | ⚠️ Yes, if demo mode off + 4K viewport |
| Staff queue + brief | `/staff` | ✅ Yes — best ops frame in product |
| Manager command | `/manager` | ✅ Yes — dark mode reads well on projector |
| Executive intel | `/executive` | ⚠️ Yes — missing attribution panels |
| Mobile S21/S33 | — | ❌ Blocked |

---

## Product surfaces — `/staff` · `/manager` · `/executive`

### `/staff` — Panel de piso (S35)

| Storyboard promise | Implemented | Gap |
|--------------------|-------------|-----|
| Cola 🔴🟡🟢 | ✅ | Static demo data |
| Wait timer on hot leads | ✅ | Not fed by real handoff |
| Handoff brief + opening line | ✅ | Excellent narrative match |
| Reclamar lead | ✅ | Client state only |
| Live sessions / join kiosk | ❌ | — |
| Mark won/lost + reason | ❌ | — |
| Alert sound / pulse on new hot | ❌ | — |

**Screenshot:** ✅ Capturable now · **Video:** ❌ needs Javier B-roll + tablet OTS  
**Believability:** ⚠️ 6/10 — UI credible; disconnected loop obvious under questions

---

### `/manager` — Tablero de mando

| Storyboard promise | Implemented | Gap |
|--------------------|-------------|-----|
| Sesiones activas + depth | ✅ | No live websocket |
| Handoffs sin atender | ✅ (0 in demo) | No red-alert state demo |
| SLA compliance | ✅ | No reassign |
| Team roster + status | ✅ | — |
| Funnel today | ✅ | — |
| Test drives today | ✅ | No fleet slot UI |
| Floor map | ❌ | Storyboard 4.1 |
| Motivos de pérdida | ❌ | — |

**Screenshot:** ✅ · **Video:** ❌ needs Patricia + glass office  
**Believability:** ⚠️ 7/10 for GM audience

---

### `/executive` — Reporte ejecutivo

| Storyboard promise | Implemented | Gap |
|--------------------|-------------|-----|
| Weekly KPIs + deltas | ✅ | — |
| Trend charts | ✅ | — |
| Narrative insights | ✅ | Matches narrative “Tucson” beat |
| Top objeciones | ✅ | No “recommended action” cards per objection |
| Top competidores | ✅ | — |
| Marketing attribution table | ❌ | **P0 for MK/O** |
| Sales Sankey Mendoza path | ❌ | **P0 for O** |
| Revenue / CPL / mix entrada | ⚠️ | Partial in KPIs only |
| Export PDF / WhatsApp lunes AM | ❌ | — |

**Screenshot:** ⚠️ · **Video:** ❌ needs Miguel Ángel morning beat  
**Believability:** ⚠️ 6/10 — strong shell, missing the “aha” panels

---

## TOP 20 — Missing WOW moments

Ranked by composite executive impact (storyboard EW × narrative closure × stakeholder breadth).

| Rank | WOW moment | Storyboard | Why it matters | Status |
|------|------------|------------|----------------|--------|
| 1 | **Javier arrives with full context** (3.5) | 3.5 | Human proof of entire product thesis | ❌ Not filmed |
| 2 | **Split-sync handoff alert** S36 + S35 (3.3) | 3.3 | Tesla-grade “system is alive” | ❌ S36 missing |
| 3 | **Kiosk S01 + physical GS4 in one frame** (2.3) | 2.3 | Apple Store moment for SCZ | ❌ Not filmed |
| 4 | **Sankey: Instagram → QR → Kiosco → Javier → Venta** (5.3) | 5.3 | Owner + Marketing “shut up and take my money” | ❌ No UI |
| 5 | **Marketing attribution: ad → prueba → venta** (5.2) | 5.2 | Marketing Director funding unlock | ❌ No UI |
| 6 | **Honest compare “Ellos ganan en reventa”** (2.8) | 2.8 | Trust differentiation vs every dealer deck | ✅ Product — not captured 4K |
| 7 | **Handoff brief opening line visible** (3.4) | 3.4 | Sales Director adoption hook | ✅ `/staff` — not in film |
| 8 | **TRAILER-90 cold open** | TRAILER | Sets cinematic contract with room | ❌ |
| 9 | **Familia Mendoza delivery + 14-day timeline** (2.12) | 2.12 | Emotional close + ROI time horizon | ❌ |
| 10 | **WhatsApp resumen + abuela “¿Y la garantía?”** (2.11) | 2.11 | Bolivia family decision culture | ⚠️ UI partial |
| 11 | **Resume session “Continuamos donde lo dejaste”** (2.4) | 2.4 | Proves 7–21 day cycle support | ❌ S37 stub |
| 12 | **Supervisor floor map live dots** (4.1) | 4.1 | GM control fantasy | ❌ |
| 13 | **SLA 1:47 + vendor ranking** (4.3) | 4.3 | Measurable service culture | ✅ UI — not animated for film |
| 14 | **Institutional memory node network** (6.3) | 6.3 | Investor moat narrative | ❌ MG only |
| 15 | **Pre-visit QR S21 trust strip + Carlos clip** (2.2) | 2.2 | Closes online-offline loop | ❌ |
| 16 | **Groundhog Day vendor repeat ×3** (1.2) | 1.2 | Act 1 empathy — every SD nods | ❌ Not filmed |
| 17 | **Test drive familiar + kids in back** (2.10/2.12) | 2.10 | Emotional validation before close | ❌ |
| 18 | **Owner Monday AM one-page report** (5.1) | 5.1 | Owner ritual | ⚠️ Dashboard not “report” |
| 19 | **Doble Vía golden hour GS4 + familia** (6.4) | 6.4 | Aspirational local hero | ❌ |
| 20 | **Alert SFX + haptic on tablet** (3.3) | 3.3 | Sensory WOW in trailer beat 5 | ❌ No sound design |

---

## TOP 20 — Missing visuals

| Rank | Visual asset | Type | Scenes | Priority |
|------|--------------|------|--------|----------|
| 1 | Viaggio showroom exterior + family entrance | Live film / drone | 2.3, TRAILER | P0 |
| 2 | Kiosk + GS4 MAX side-by-side hero still | Live film | 2.3, 2.4, 6.4 | P0 |
| 3 | Javier + familia dialogue at kiosco | Live film | 3.5 | P0 |
| 4 | 4K kiosk journey screen recording (S01→S15) | Animated UI | 2.4–2.10 | P0 |
| 5 | `/staff` queue + Mendoza handoff brief | Product screenshot | 3.1–3.4 | P0 |
| 6 | Marketing attribution infographic | Executive mock | 5.2 | P0 |
| 7 | Sankey attribution diagram | Motion graphic | 5.3 | P0 |
| 8 | S21 mobile pre-visit landing mock | UI mock | 2.2 | P0 |
| 9 | S33 mobile family share + WhatsApp thread | UI mock + film | 2.11 | P0 |
| 10 | Patricia glass office + monitor glow | Live film | 4.1, TRAILER | P1 |
| 11 | Miguel Ángel café + tablet report | Live film | 5.1, TRAILER | P1 |
| 12 | GS4 real photography / attract loop video | Media asset | S01, S22 | P0 |
| 13 | Maletero familia + child seats (Diego beat) | Live film | 2.7 | P1 |
| 14 | Test drive + delivery wide | Live film | 2.12, 6.2 | P1 |
| 15 | `/manager` full dashboard dark | Product screenshot | 4.1–4.4 | P1 |
| 16 | S36 client “asesor en breve” modal | UI mock | 3.3 | P0 |
| 17 | Empty CRM / Excel “42 leads” mock | AI still | 1.3 | P1 |
| 18 | Instagram Reel 9:16 GS4 SCZ streets | AI video / live | 2.1 | P1 |
| 19 | Institutional memory node animation | Motion graphic | 6.3 | P1 |
| 20 | CPI-OS + Viaggio logo motion close | Motion graphic | 6.5 | P1 |

---

## TOP 10 — Moments that feel like software (not business transformation)

These kill McKinsey-grade credibility if shown without film, context, or live data.

| Rank | Moment | Why it feels like “another dashboard” | Fix |
|------|--------|--------------------------------------|-----|
| 1 | **`/executive` trend charts without Sankey** | Looks like Google Analytics for cars | Build 5.2 + 5.3 panels; lead with pesos and campaign names |
| 2 | **`/staff` with static Mendoza always on top** | Obvious mock — no live pulse | Wire one real session OR scripted screen recording with timer tick |
| 3 | **Kiosk with gradient placeholders** | Reads as prototype | Drop 41 manifest media assets — minimum 8 hero/trust videos |
| 4 | **Conversion hub without “asesor ahora”** | Broken promise in narrative | Ship S36 + CTA on S13 |
| 5 | **WhatsApp handoff with static consultant script** | Generic chatbot energy | Dynamic script from session + film the human moment after |
| 6 | **Compare screen without customer reaction** | Feature demo | Pair 2.8 UI with Roberto “al menos no mienten” live line |
| 7 | **Manager funnel as today-only bar chart** | Ops widget, not “mando” | Add floor map + red alert state + reassign |
| 8 | **Demo mode hiding financing/share CTAs** | Undermines Act 2 economics arc | Separate `DEMO_KIOSK` vs `DEMO_PRESENTATION` flags |
| 9 | **Executive insights as bullet cards** | McKinsey would want “so what → action” | Format as decisions: stock, training, ad spend |
| 10 | **No TRAILER-90 before walkthrough** | Defaults to SaaS slide deck rhythm | Mandatory film open per shot list |

---

## TOP 10 — Moments that should produce an emotional reaction

| Rank | Moment | Target emotion | Readiness |
|------|--------|----------------|-----------|
| 1 | **3.5 Javier — “Vi que comparaste…”** | Surprise → relief (“they get me”) | ❌ Film |
| 2 | **2.8 “Al menos no mienten”** | Trust shock | ⚠️ UI only |
| 3 | **2.11 Abuela en WhatsApp** | Family warmth | ❌ |
| 4 | **1.2 Vendor repeat ×3** | Empathy for floor team | ❌ Film |
| 5 | **2.12 Delivery + 14 días** | Joy / accomplishment | ❌ Film |
| 6 | **3.3 90-second alert** | Urgency + professionalism | ❌ |
| 7 | **1.1 Family wandering** | Uncomfortable recognition | ❌ Film |
| 8 | **6.4 Doble Vía sunset** | Aspiration / pride local | ❌ Film |
| 9 | **5.3 Mendoza path to sale** | Vindication for owner | ❌ UI |
| 10 | **6.3 “Knowledge stays when Javier leaves”** | Legacy / moat | ❌ MG |

---

## Final scores (1–10)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| **Vision** | **9.0** | Narrative + storyboard + film architecture are best-in-class for automotive retail |
| **Narrative** | **8.5** | Complete arc, Bolivia-specific, four-stakeholder coverage; minor cast name drift (Ríos vs Mendoza) |
| **Product** | **6.0** | Kiosk path strong; ops UI now exists; S21/S36/attribution missing; no live loop |
| **Operations** | **5.0** | `/staff` + `/manager` credible for demo; not production ops |
| **Executive Intelligence** | **4.5** | `/executive` partial; missing marketing/sales attribution — owner killer |
| **Visual Design** | **4.0** | UI craft good; zero real photography/video; no screenshot library |
| **Cinematic Impact** | **2.0** | Plans exist; no trailer, no B-roll, no grade |
| **Investor / Board Impact** | **4.5** | Story compels; proof layer absent — would not pass diligence without pilot data |

### **Composite presentation readiness: 5.4 / 10**

*Weighted for an owner/board room with projector + skeptical GM — not a kiosk-only tech demo.*

---

## Prioritized roadmap to 10/10 executive presentation

### Phase 0 — 72 hours: “Capture what exists”

**Goal:** Stop documenting phantom screenshots; create real inventory.

| # | Deliverable | Owner | Unlocks |
|---|-------------|-------|---------|
| 0.1 | 4K screenshot pass: S01, S03, S22, S06, S08, S24, S25, S11, S13, S26 | Eng | Acts 2.4–2.9 in edit |
| 0.2 | 4K screenshot pass: `/staff`, `/manager`, `/executive` | Eng | Acts 3–5 stills |
| 0.3 | Turn off demo-mode branch hiding for presentation build profile | Eng | Full conversion hub in frames |
| 0.4 | Commit to `docs/screenshots/presentation-v1/` | Eng | Single source of truth |

**Exit criteria:** 25+ PNGs at 3840×2160 · no broken paths in storyboard

---

### Phase 1 — 2 weeks: “Close the storyboard P0 UI holes”

**Goal:** Every mandatory storyboard UI comp can be screen-recorded.

| # | Deliverable | Scenes |
|---|-------------|--------|
| 1.1 | S36 consultant modal + “asesor ahora” on S13 | 2.10, 3.3 |
| 1.2 | S21 pre-visit mobile `/visit/gs4-max` | 2.2 |
| 1.3 | S33 enriched share payload (compare + cuota + warranty) | 2.11 |
| 1.4 | Executive **Marketing Attribution** panel | 5.2 |
| 1.5 | Executive **Sales Sankey** (Mendoza path) | 5.3 |
| 1.6 | Manager **floor map** supervisor view | 4.1 |
| 1.7 | Handoff SFX + alert animation spec | 3.3, TRAILER |

**Exit criteria:** Visual Production Plan “New UI mockup” P0 rows = 0 open

---

### Phase 2 — 2 weeks: “Minimum viable film”

**Goal:** TRAILER-90 + hero dialogue — **Plan A half-day shoot** per shot list.

| # | Shot block | Runtime impact |
|---|------------|----------------|
| 2.1 | TRAILER T-01–T-13 | 1:30 opener |
| 2.2 | A3-S5 Javier handoff (all angles) | Act 3 emotional peak |
| 2.3 | A2-S3 arrival + kiosk hero | Act 2 credibility |
| 2.4 | A2-S12 delivery wide | Act 2 close |
| 2.5 | A5-S1 Miguel Ángel morning (or owner stand-in) | Act 5 human anchor |

**Exit criteria:** 4+ minutes live in canon cut · trailer screens without embarrassment

---

### Phase 3 — 2 weeks: “Media + motion”

**Goal:** Remove prototype smell from kiosk; add Act 6 intelligence visuals.

| # | Deliverable |
|---|-------------|
| 3.1 | Media sprint: 8 P0 assets (hero video, trust, Carlos/Diego clips, attract loop) |
| 3.2 | Screen recordings with Apple easing — kiosk journey master AEP |
| 3.3 | Institutional memory animation (6.3) |
| 3.4 | Weekly report **one-page** layout variant for 5.1 (PDF + tablet) |
| 3.5 | Narrator VO es-BO record · mix TRAILER-90 |

**Exit criteria:** Kiosk believability ≥ 8/10 · Act 6.3–6.4 in rough cut

---

### Phase 4 — 2 weeks: “Believability loop” (optional for 10/10, required for pilot claim)

**Goal:** One scripted end-to-end capture: kiosk action → tablet update.

| # | Deliverable |
|---|-------------|
| 4.1 | Session + lead persistence (minimum viable Supabase) |
| 4.2 | Handoff API: S36 → `/staff` queue insert |
| 4.3 | Simulated live timer on Mendoza lead during presentation |
| 4.4 | Marketing UTM on S21 → executive attribution row |

**Exit criteria:** Presenter can tap “asesor ahora” on kiosk · Javier’s tablet updates within 5s

---

### Phase 5 — Polish to 10/10

| # | Deliverable |
|---|-------------|
| 5.1 | Full-day shoot Plan B — Act 1 pain, Patricia office, family WhatsApp |
| 5.2 | Color grade pass · SCZ warm daylight LUT |
| 5.3 | QC checklist from Visual Production Plan (sync S36/S35, 2s on opening line, etc.) |
| 5.4 | Presenter playbook: 3 closing questions + **what not to claim** card |
| 5.5 | Lean cut 16:45 + full cut 18:22 + trailer-only room mode |

---

## Recommended presentation modes by audience

| Audience | Open with | Show | Do not show |
|----------|-----------|------|-------------|
| **Owner / Board** | TRAILER-90 | Acts 2.8, 3.4, 5.2, 5.3, 6.3 + live Javier clip | `/staff` before film establishes pain |
| **General Manager** | Act 1.3 cut | `/manager` live + Act 4 film | Raw kiosk code paths |
| **Sales Director** | Act 1.2 cut | `/staff` live demo + 3.5 film | `/executive` before floor story |
| **Marketing Director** | Act 1.4 cut | S21 mock + 5.2 + 2.11 | Compare UI without attribution |

---

## Critical path (single thread to 10/10)

```
Screenshot pass (Phase 0)
    → S36 + attribution UI (Phase 1)
        → Half-day Viaggio shoot (Phase 2)
            → Media + VO (Phase 3)
                → Live handoff loop (Phase 4) ── optional but separates 8/10 from 10/10
                    → Full grade + QC (Phase 5)
```

**Estimated calendar:** 8 weeks to **9/10** (film + UI + media) · **10 weeks** with live loop.

---

## Control de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 15 Jun 2026 | Auditoría integral inicial — 34 escenas + TRAILER-90 + ops surfaces |

---

*Relacionado: [CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md) · [CPI_OS_VISUAL_PRODUCTION_PLAN.md](./CPI_OS_VISUAL_PRODUCTION_PLAN.md) · [CPI_OS_FILM_SHOT_LIST.md](./CPI_OS_FILM_SHOT_LIST.md) · [PRESENTATION_GAP_BACKLOG.md](../../PRESENTATION_GAP_BACKLOG.md)*
