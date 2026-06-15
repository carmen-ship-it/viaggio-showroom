# Executive Roadmap V2 — Viaggio Digital Showroom

**Date:** 14 June 2026  
**Purpose:** Rank the top 20 improvements by **business value** — what most increases sales and customer confidence  
**Audience:** Dealership ownership, GAC regional stakeholders, implementation team  
**Basis:** [CEO_SALES_STRATEGY_AUDIT.md](./CEO_SALES_STRATEGY_AUDIT.md) · [KIOSK_UX_AUDIT.md](./KIOSK_UX_AUDIT.md) · [MEDIA_ASSET_AUDIT.md](./MEDIA_ASSET_AUDIT.md)  

---

## How Rankings Work

Each item scored on:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Revenue proximity** | 35% | How directly it drives test drives, WhatsApp leads, or closes |
| **Confidence impact** | 30% | Does it answer a fear or objection that blocks purchase? |
| **Reach** | 20% | % of visitors affected |
| **Effort inverse** | 15% | Faster wins rank higher when impact is comparable |

**Priority Score (PS):** 1–10 composite. **Effort:** Low (<1 wk) · Medium (1–3 wk) · High (3+ wk)

---

## Top 20 Improvements — Ranked by Business Value

### #1 — 60-Second Guided Discovery at Welcome

**What:** Replace passive path choice with 5 tap questions: first SUV vs replacement, family, city/highway, priority (safety/tech/price/space), optional budget range. Route to personalized 3-screen proof path.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Critical** — +25% lead quality; −40% time-to-CTA; reduces consultant qualification time |
| Customer impact | Feels like a salesperson who listens; relevant proof only |
| Effort | Medium (2–3 weeks: UX + routing logic + content variants) |
| **PS** | **10** |

**Why #1:** Transforms brochure into salesperson. Every other improvement works harder when the journey is personalized.

---

### #2 — Live WhatsApp + Consultant SLA on Handoff

**What:** Replace placeholder number with WhatsApp Business line. Show consultant name, photo, business hours, "Respondemos en 15 minutos."

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Critical** — zero dead leads; direct conversion endpoint |
| Customer impact | Scan works; human continuity confirmed |
| Effort | Low (1–2 days ops + config) |
| **PS** | **10** |

**Why #2:** A broken handoff destroys trust built across entire session. Highest ROI per hour invested.

---

### #3 — Remove Wireframe Overlays + Attract Loop Video

**What:** (a) Stop rendering SVG silhouette over real photos on S01/S03. (b) Wire 15–30s `video-attract-loop` with price flash "desde $us 42.900."

| Dimension | Assessment |
|-----------|------------|
| Business impact | **High** — recovers ~40% foot traffic that walks past |
| Customer impact | Sees the car in 3 seconds; premium motion |
| Effort | Low (overlay: 1 day code) + Medium (video: 1–2 wk production) |
| **PS** | **9.5** |

**Why #3:** First impression is showroom entry. Currently failing its one job — stop the customer.

---

### #4 — Corolla Cross Licensed Photo + One-Screen Compare Verdict

**What:** (a) Acquire Toyota press photo for `compare-corolla-cross`. (b) Pin 9/1/6 scorecard + "Cuota orientativa" CTA above fold on S12 — no scroll required.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **High** — strengthens strongest rational close screen |
| Customer impact | Fair comparison; decision in 10 seconds standing |
| Effort | Low (photo license) + Medium (layout, 3–5 days) |
| **PS** | **9.5** |

**Why #4:** Compare content is excellent; visual asymmetry and scroll bury the payoff.

---

### #5 — Short Test Drive Capture (3 Fields at Kiosk)

**What:** Kiosk mode: name + phone + preferred day only. Family context, route, email captured via WhatsApp follow-up. Pre-fill from discovery session.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **High** — +30% form completion = more test drives |
| Customer impact | 30-second form standing at kiosk |
| Effort | Medium (1 week: form variant + API + WhatsApp template) |
| **PS** | **9** |

**Why #5:** Test drive is primary KPI. Current form is the worst kiosk offender.

---

### #6 — Brand Logos (Viaggio + GAC + Bank Partner)

**What:** Deploy approved SVG logos for header, financing screen, and co-brand lockup. Replace inline text placeholders.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **High** — every screen signals "prototype" without these |
| Customer impact | Legitimate dealership and financing partner |
| Effort | Low (marketing asset delivery + 1 day integration) |
| **PS** | **9** |

**Why #6:** Logos are table stakes for premium positioning. Cheap, universal impact.

---

### #7 — Fix Compare Gating Dead-End

**What:** Replace "Comparación disponible pronto" with actionable message: "Mirá 2 temas de confianza primero" + direct tap links to FAQ and ADAS. Hide unavailable competitors until live.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — removes mid-funnel abandon point |
| Customer impact | Always knows what to do next |
| Effort | Low (2–3 days) |
| **PS** | **8.5** |

---

### #8 — Conversion Focus Mode (Hide Nav on S13/S14/S15)

**What:** On conversion screens, collapse header to back + home only. Two cards: Test drive (primary, 2× size) + WhatsApp (secondary). Hide 15+ nav pills.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — reduces CTA paralysis at close |
| Customer impact | One obvious action |
| Effort | Low (3–5 days) |
| **PS** | **8.5** |

---

### #9 — Viaggio Workshop Video in Trust Story

**What:** Produce 30–60s B-roll of Viaggio service bay, technicians, parts shelf. Replace gradient placeholder on S24 chapter 2.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — proves local post-sale existence |
| Customer impact | "They won't disappear after I buy" |
| Effort | Medium (local shoot + edit, 1–2 wk) |
| **PS** | **8.5** |

---

### #10 — Fix Hero Stat Truncation + Hide Screen IDs

**What:** (a) Ensure stat pills never truncate ("19 HP", "$us 5"). (b) Remove S08 · TEMA, S13 labels from production UI.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — prevents credibility destruction on first hero view |
| Customer impact | Correct numbers; premium not prototype |
| Effort | Low (1–2 days) |
| **PS** | **8** |

---

### #11 — 4x2 vs AWD Trim Comparison in Compare Hub

**What:** Internal comparison (not competitor): price delta, when AWD matters in Santa Cruz, cuota difference. Default recommend 4x2 for city-only buyers from discovery.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — reduces consultant trim explanation; prevents AWD oversell/undersell |
| Customer impact | Answers "¿necesito AWD en Santa Cruz?" |
| Effort | Medium (content + UI, 1–2 wk) |
| **PS** | **8** |

---

### #12 — Editable TCO Mini-Calculator on Financing

**What:** Sliders: km/month, entrada %. Show monthly all-in (cuota + fuel + insurance + maintenance) and 3-year total. Default from discovery budget range.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — handles #1 objection after reventa: "can I afford it?" |
| Customer impact | Personal affordability answer |
| Effort | Medium (2 wk) |
| **PS** | **8** |

---

### #13 — Persona Avatars (Sofía + Diego) + Tour Copy Fix

**What:** Real headshots for Sofía/Diego. Fix truncated tour narration. Reduce blur on Carlos text panel.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — persona system is core differentiator |
| Customer impact | Guides feel human; complete sentences |
| Effort | Low–Medium (photos + CSS, 1 wk) |
| **PS** | **7.5** |

---

### #14 — Family Proof Pack (ISOFIX, Maletero, 3-Min Diego Path)

**What:** Rear seat photo with child seat. Maletero with stroller + luggage. Curated Diego path: colegio → súper → Buena Vista in 3 screens for family discovery signal.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** for family segment (core buyer) |
| Customer impact | Spouse confidence; "will my kids fit?" answered |
| Effort | Medium–High (shoot + content, 2–3 wk) |
| **PS** | **7.5** |

---

### #15 — GAC Heritage Video (Trust Story Chapter 1)

**What:** License/edit GAC global heritage reel for S24 chapter 1. Replace text scroll with 30s auto-play.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — "es chino" objection at brand level |
| Customer impact | Global manufacturer proof in 30s |
| Effort | Medium (license + edit, 1–2 wk) |
| **PS** | **7.5** |

---

### #16 — Social Proof — 2–3 Santa Cruz Owner Testimonials (S23)

**What:** Build S23 screen with 30s vertical clips: local owners on reliability, service, family use. Carlos introduces each.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — trust transfer from peers > brand claims |
| Customer impact | "Someone like me bought and is happy" |
| Effort | Medium–High (recruit owners + shoot, 2–3 wk) |
| **PS** | **7** |

---

### #17 — Pre-Researched Path (Compare-First for "Ya investigué")

**What:** Enable S02 shortcut: skip 6-screen trust arc → hero → compare hub → financing → convert. Trust content available on demand, not forced.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — serves ~30% of visitors who already trust or cross-shopped |
| Customer impact | Respects their time; no repeated lecture |
| Effort | Low (enable existing route + tune gating, 3–5 days) |
| **PS** | **7** |

---

### #18 — Session Progress Indicator

**What:** Persistent footer or header: "Tu camino hacia la prueba — Paso 3 de 5" with milestones (Conociste · Comparaste · Cuota · Prueba).

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — increases completion rate on long paths |
| Customer impact | Orientation; motivation to finish |
| Effort | Low (1 wk) |
| **PS** | **6.5** |

---

### #19 — Staff Dashboard + Lead Alert (S35)

**What:** Consultant tablet view: active kiosk session, topics viewed, compare target, financing selection, test drive submission. Push notification on lead.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium-High** — faster human response = higher close rate |
| Customer impact | Consultant arrives informed, not cold |
| Effort | High (3–4 wk + CRM) |
| **PS** | **6.5** |

---

### #20 — ADAS Visual Proof (Dashboard + Feature Screenshots/Clip)

**What:** Full-bleed dashboard on S08 above fold. Backup camera, 360°, lane assist UI screenshots or 15s demo clip. Wire `video-trust-adas`.

| Dimension | Assessment |
|-----------|------------|
| Business impact | **Medium** — ADAS is key differentiator vs Corolla base |
| Customer impact | Spouse sees the tech, not just reads about it |
| Effort | Medium (OEM assets + layout, 1–2 wk) |
| **PS** | **6.5** |

---

## Roadmap Phases

### Phase A — "Stop the Bleeding" (Week 1–2)

**Goal:** Fix abandonment points and dead ends. Deploy with staff supervision.

| Rank | Item | PS |
|------|------|-----|
| #2 | Live WhatsApp + SLA | 10 |
| #3 | Remove overlays (code portion) | 9.5 |
| #6 | Brand logos | 9 |
| #7 | Compare gating fix | 8.5 |
| #8 | Conversion focus mode | 8.5 |
| #10 | Stat truncation + hide screen IDs | 8 |

**Expected outcome:** Credible first impression, working conversion endpoint, no dead-ends.

---

### Phase B — "Close the Decision" (Week 3–6)

**Goal:** Personalize journey and compress time-to-test-drive.

| Rank | Item | PS |
|------|------|-----|
| #1 | Guided discovery | 10 |
| #4 | Corolla photo + compare above fold | 9.5 |
| #5 | Short test drive form | 9 |
| #11 | 4x2 vs AWD comparison | 8 |
| #12 | TCO mini-calculator | 8 |
| #17 | Pre-researched path | 7 |

**Expected outcome:** 4-minute standing journey to test drive request. Qualified leads with context.

---

### Phase C — "Prove It" (Week 7–10)

**Goal:** Visual trust proof for unsupervised deployment.

| Rank | Item | PS |
|------|------|-----|
| #3 | Attract loop video (production) | 9.5 |
| #9 | Viaggio workshop video | 8.5 |
| #13 | Persona avatars + tour fixes | 7.5 |
| #14 | Family proof pack | 7.5 |
| #15 | GAC heritage video | 7.5 |
| #20 | ADAS visual proof | 6.5 |

**Expected outcome:** Premium showroom feel. Family and trust objections proven visually.

---

### Phase D — "Scale the Sales Floor" (Week 11–16)

**Goal:** Consultant integration and social proof.

| Rank | Item | PS |
|------|------|-----|
| #16 | Owner testimonials | 7 |
| #18 | Progress indicator | 6.5 |
| #19 | Staff dashboard + lead alert | 6.5 |

**Expected outcome:** Human + digital handoff seamless. Measurable attribution to sales.

---

## Investment Summary

| Phase | Duration | Primary spend | Expected KPI lift |
|-------|----------|---------------|-------------------|
| A | 2 wk | Dev + ops config | −50% dead-end abandons; working leads |
| B | 4 wk | Dev + content | −40% time-to-CTA; +30% form completion |
| C | 4 wk | Photo/video production | Unsupervised kiosk ready |
| D | 6 wk | CRM + shoot | Consultant response <15 min; attribution |

---

## What NOT to Build Yet

These are documented in screen map but **low business value relative to cost** for Phase 1:

| Screen | Why defer |
|--------|-----------|
| S17/S30 Configurator | Color picker doesn't drive test drives; no stock integration |
| S27 Trade-in | High build cost; consultant handles in conversation |
| S31 Comparison shortlist | One competitor compare is sufficient initially |
| S21 Pre-visit QR | Requires S37 resume first |
| GS8/EMZOOM/EMKOO content | Single-SKU focus until GS4 MAX converts |

---

## Success Metrics — 90 Days Post Phase B

| Metric | Baseline (est.) | Target |
|--------|-----------------|--------|
| Attract → session start | ~60% | 80% |
| Session → test drive request | ~8% | 18% |
| Session → WhatsApp initiated | ~12% | 25% |
| Avg. time to first CTA | 12+ min | <5 min |
| Form abandonment (S14) | ~50% | <20% |
| Lead quality score (consultant rated) | Unmeasured | 7+/10 |

---

## Owner Decision Framework

**If budget is limited to one sprint:** Phase A + #5 (short form) + #4 (Corolla photo).

**If budget allows full Phase B:** Add #1 (discovery) — this is the strategic moat.

**If goal is GAC regional showcase:** Phase C media — video and photography transform perception.

**If goal is sales floor ROI:** Phase B + #19 (staff dashboard) — consultants close what kiosk starts.

---

## Closing Thesis

The Viaggio Digital Showroom has **already solved the hardest content problem** — honest objection handling for a Chinese brand in Bolivia. It has **not yet solved the experience problem** — guiding a distracted standing customer to a confident test drive in 5 minutes.

The top 20 list prioritizes **conversion mechanics and credibility** over feature expansion. A configurator, trade-in tool, or fourth vehicle model adds nothing if the customer walks past S01, abandons at S11, or fails to submit a 9-field form.

**Invest in the salesperson behavior, not the brochure inventory.**

---

*Audits: [CEO_SALES_STRATEGY_AUDIT.md](./CEO_SALES_STRATEGY_AUDIT.md) · [KIOSK_UX_AUDIT.md](./KIOSK_UX_AUDIT.md) · [MEDIA_ASSET_AUDIT.md](./MEDIA_ASSET_AUDIT.md)*
