# CEO Sales Strategy Audit — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Auditor lenses:** Automotive salesperson · Dealership owner · Showroom experience designer · CRO specialist · Kiosk UX specialist  
**Scope:** GAC GS4 MAX digital showroom — canonical demo path S01→S15  
**Method:** Customer-journey walkthrough, content review, stakeholder reports — not a code audit  

---

## Executive Summary

This system has **investor-grade sales architecture** and **floor-ready objection handling** in Carlos/FAQ and honest comparison content. It is **not yet a finished digital salesperson** for unsupervised customer use.

The biggest gap is not missing features — it is **failure to close the decision loop in 3–5 minutes**. A first-time buyer arrives anxious about a Chinese brand, needs family-fit proof, and wants to know *"can I afford this and is it safe for my kids?"* The experience delivers trust depth over 14 screens but asks too much time, too much scrolling, and too many navigation choices before a single obvious next step.

**Strategic verdict:** Invest to finish the **decision engine** (guided discovery → personalized path → one comparison → affordability → test drive) on top of the existing trust content. The narrative skeleton is worth funding; the current customer journey is still a **brochure with good copy**, not a salesperson who asks questions and drives to action.

---

## The 12 Critical Questions

### 1. Is every screen visible on a single 1920×1080 screen without scrolling?

**No.** Roughly half the journey requires scroll or snap-scroll.

| Screen | Fits 1080p? | Sales impact |
|--------|-------------|--------------|
| S01 Attract | ✅ Yes | — |
| S02 Welcome | ✅ Mostly | — |
| S03 Vehicle Selector | ✅ Mostly | — |
| S22 Hero | ✅ Mostly | Hot-spots may push CTAs tight |
| S25 FAQ | ⚠️ Partial | Open accordions overflow |
| S24 Trust Story | ❌ No | Multi-chapter vertical scroll |
| S06 Trust Tour | ⚠️ Partial | Body scrolls; truncated copy visible |
| S08 ADAS | ⚠️ Partial | Feature grid below fold |
| S11 Compare Hub | ✅ Mostly | — |
| S12 Compare Detail | ❌ No | Demo script says scroll to summary |
| S26 Financing | ⚠️ Partial | Trim + plazo + TCO exceeds viewport |
| S13 Conversion Hub | ⚠️ Partial | Cards clip at bottom |
| S14 Test Drive | ❌ No | Long form — worst offender for kiosk |
| S15 WhatsApp | ⚠️ Partial | QR + preview tight |

**Business risk:** Standing customers at a kiosk do not scroll. Content below the fold is **invisible inventory** — equivalent to a salesperson who stops talking mid-sentence.

---

### 2. Does every screen have one obvious primary action?

**No.** Navigation chrome exposes 15–20+ equal-weight choices on conversion screens while primary CTAs compete with secondary paths.

| Screen | Primary action | Problem |
|--------|----------------|---------|
| S01 | Tap anywhere | ✅ Clear |
| S02 | Empezar experiencia | ⚠️ Path choice adds decision before start |
| S22 | ¿Es confiable? (demo) | ❌ 5+ footer CTAs in full mode |
| S25 | Next chapter | ⚠️ Accordion invites exploration without "next step" |
| S06 | Siguiente (tour) | ⚠️ Progress unclear; copy truncates |
| S11 | Ver comparación | ⚠️ Gated state shows dead-end message |
| S13 | Test drive OR WhatsApp | ❌ 4 cards + full nav = paralysis |
| S14 | Enviar solicitud | ⚠️ Buried below 8+ form fields |

**Sales principle violated:** Every screen should answer *"What do I tap next?"* in under 2 seconds. Multiple equal CTAs = customer waits for a human.

---

### 3. Is the customer always guided to the next best step?

**Partially — in demo mode only.** The scripted path works. Free exploration does not.

**What works:**
- Demo path S01→S15 is a coherent trust→compare→finance→convert arc
- Persona voices (Carlos) suggest depth without requiring it
- Session recap on S13 gives consultants re-entry context

**What fails:**
- Compare hub shows *"Comparación disponible pronto"* with no instruction when trust gate not met
- Hero offers parallel paths (trust, family, design, compare) without recommendation
- No dynamic "based on what you viewed, next best step is…"
- Sofía shortcut exists but is disabled in demo; no equivalent for family-first buyers
- Post-compare path to financing exists; post-financing path to test drive is weak (generic convert hub)

**Missing:** A salesperson always knows where the customer is in the funnel and pushes one next step. This system tracks trust signals internally but **does not surface guidance to the customer**.

---

### 4. Where would a customer get confused?

| # | Moment | Why |
|---|--------|-----|
| 1 | **S11 Compare gating** | "Comparación disponible pronto" — no explanation of what to do |
| 2 | **S13/S15/S26 navigation** | 20+ header pills; customer cannot find the main message |
| 3 | **Prueba familiar vs Agendar prueba vs Tour Familiar** | Three similar labels, different destinations |
| 4 | **Screen IDs visible** (S08 · TEMA, S13) | Customer asks "¿Qué es S08?" — consultant has no answer |
| 5 | **Persona inconsistency** | Carlos = photo in FAQ, letter badge in story; Sofía/Diego = empty |
| 6 | **Coming-soon models (S03)** | GS8, EMZOOM, EMKOO look identical — "are these the same car?" |
| 7 | **Financing band width** | Bs 1.680–1.820 feels vague; entrada not shown |
| 8 | **Compare → Reventa "Ellos ganan"** | Honest but triggers fear without immediate pivot to TCO/garantía |
| 9 | **Settings on S01** | Customer or child taps Ajustes, breaks flow |
| 10 | **Tour truncated copy** | *"…sin forzar el…"* reads as broken, not curated |

---

### 5. Where would a customer get bored?

| # | Moment | Why |
|---|--------|-----|
| 1 | **S01 Attract** | Dark screen, wireframe overlay mutes real photo — no motion, no price flash |
| 2 | **S24 Trust Story** | Text chapters without video — feels like reading, not experiencing |
| 3 | **S06 Tour steps 1–3** | Text-only steps (chassis, heritage, maintenance) with no hero media |
| 4 | **S08 ADAS** | Large dead space; words without dashboard/camera proof |
| 5 | **Long trust arc before compare** | 6 screens before validation — skeptics who already trust Toyota may leave |
| 6 | **Accordion FAQ (S25)** | Passive reading; no interactive proof (video, 360°, testimonial) |
| 7 | **Pre-researched path disabled** | "Ya investigué online" buyers forced through full trust arc |

**Pattern:** Brochure moments (read, scroll, accordion) dominate over **showroom moments** (video, hot-spot, comparison scorecard, live-feeling proof).

---

### 6. Where would a customer abandon the experience?

| Abandon point | Trigger | Estimated drop-off risk |
|---------------|---------|-------------------------|
| **S01 — walk past** | No car visible, no motion, no price | High (street traffic) |
| **S03 — empty card** | Hero image area looks unloaded | Medium |
| **S11 — compare locked** | Dead end, no guidance | Medium-High |
| **S06/S24 — mid trust arc** | Too long before "so what?" | Medium |
| **S12 — reventa fear** | "Ellos ganan" without TCO counter | Medium |
| **S14 — form length** | 8+ fields standing at kiosk | High |
| **S15 — placeholder WhatsApp** | Scan fails → trust destroyed | Critical |
| **Any screen — idle 3 min** | Reset to S01 loses progress | Medium |

**Highest-risk abandonment:** Never starting (S01), never converting (S14 form fatigue), dead WhatsApp (S15).

---

### 7. Which screens feel like a brochure instead of a salesperson?

| Screen | Brochure signal | Salesperson alternative |
|--------|-----------------|-------------------------|
| S24 Trust Story | Scroll chapters, text blocks | 60s Viaggio workshop video + one stat |
| S25 FAQ | Accordion Q&A | Carlos asks *"¿Cuál es tu mayor duda?"* → routes to one answer |
| S08 ADAS | Feature grid list | Hot-spot on real dashboard + 15s ADAS clip |
| S06 Tour (steps 1–3) | Narration paragraphs | Engine bay photo, chassis cutaway, service bay |
| S29 Warranty | Timeline infographic (placeholder) | *"Tu primer service a los 10.000 km cuesta Bs 0"* |
| S03 Selector | Spec card | *"Este es el SUV que más eligen familias en Santa Cruz"* |

**Strongest salesperson screens:** S25 FAQ (Carlos voice), S12 Compare (honest verdict), S26 Financing (affordability framing), S14 Test Drive (qualifying questions).

---

### 8. Which information is missing for a buying decision?

| Decision factor | Status | Gap |
|-----------------|--------|-----|
| **Cash price (4x2 vs AWD)** | Partial | On hero stats and financing; not on convert screen |
| **Ownership costs (TCO)** | Partial | Fixed defaults in S26; not editable; no 3-year/5-year total |
| **Warranty scope** | Partial | Headline numbers; no "what's covered / excluded" |
| **Reliability at altitude** | ❌ Missing | Critical for Bolivia — La Paz buyers |
| **Real fuel consumption (city)** | Partial | WLTC ranges in compare; no Santa Cruz city truth |
| **Resale / depreciation** | Qualitative only | Honest but no benchmark numbers |
| **Safety for children** | Teased | ISOFIX, 3-seat row, stroller fit — not answered |
| **Cargo / family fit** | Partial | Maletero liters; no visual with stroller/luggage |
| **Service intervals + cost post-warranty** | Partial | 10.000 km mentioned; post-year-3 costs absent |
| **Stock / color on lot** | ❌ Missing | "Is the white one available?" |
| **Trade-in** | ❌ Not built | S27 planned only |
| **Social proof / testimonials** | ❌ Not built | S23 planned only |
| **Financing with entrada** | Partial | Tips mention 20–30%; no calculator input |
| **Competitor breadth** | Partial | Only Corolla Cross live |

---

### 9. What would a real salesperson ask that the system never asks?

| Salesperson question | Purpose | System today |
|---------------------|---------|--------------|
| *"¿Es tu primer SUV o reemplazás uno?"* | Position upgrade vs first buy | ❌ |
| *"¿Tenés hijos? ¿Cuántos?"* | Route to family content | Only at test drive form (too late) |
| *"¿Manejás más ciudad o Doble Vía?"* | Consumo, ADAS, AWD relevance | Only at test drive form |
| *"¿Qué auto mirás hoy?"* | Comparison personalization | ❌ — defaults to Corolla Cross |
| *"¿Cuál es tu presupuesto mensual?"* | Financing qualification | ❌ — shows ranges only |
| *"¿Comprás solo o con tu pareja?"* | Family share, joint decision | ❌ until convert |
| *"¿Qué te preocupa más: reventa, garantía o cuota?"* | Objection routing | ❌ — fixed trust arc |
| *"¿Cuándo necesitás el vehículo?"* | Urgency, stock | ❌ |
| *"¿Tenés auto para retoma?"* | Trade-in, deal structure | ❌ |
| *"¿Ya fuiste al banco o querés que te ayudemos?"* | Financing readiness | Partial flag on S26 |
| *"¿Probaste algún GAC o solo viste online?"* | Experience level | Binary path choice only |

**Impact:** Without discovery questions, every customer gets the same 14-screen lecture. A skilled salesperson would spend 60 seconds qualifying and then show 3 relevant proof points.

---

### 10. What objections are not being handled?

| Objection | Handled? | Gap |
|-----------|----------|-----|
| *"Es chino, no confío"* | ✅ Strong | FAQ + trust story |
| *"No hay repuestos"* | ✅ Strong | FAQ + Viaggio network |
| *"¿Cuánto vale usado?"* | ⚠️ Honest but scary | No TCO counter-narrative immediately after |
| *"El turbo se calienta / la caja falla"* | ❌ Weak | Not in customer-facing content |
| *"La electrónica se rompe"* | ❌ Missing | ADAS screen doesn't address failure fear |
| *"Garantía de papel"* | ⚠️ Partial | No warranty claim process shown |
| *"Viaggio desaparece después"* | ✅ Adequate | Post-sale FAQ |
| *"Toyota es más seguro (marca)"* | ⚠️ Partial | Compare handles specs; not brand trust |
| *"AWD no vale la pena en Santa Cruz"* | ❌ Missing | Trim choice exists; no guidance |
| *"La cuota es muy alta"* | ⚠️ Partial | Ranges shown; no affordability check |
| *"Mi esposa/a no está convencida"* | ⚠️ Partial | Family share exists but late in funnel |
| *"Prefiero esperar a que salga más info de reventa"* | ❌ Missing | No early-adopter / TCO reframe |

Reference: `docs/content/carlos-objection-analysis.md` documents 15+ uncovered objections in Carlos narration alone.

---

### 11. What fears are not being addressed?

| Fear | Emotional core | System response | Gap |
|------|----------------|-----------------|-----|
| **Financial mistake** | *"No puedo pagarlo / me endeudo mal"* | Financing ranges | No entrada calculator, no "can I afford" gate |
| **Safety of children** | *"¿Mis hijos van seguros?"* | 8 airbags, C-NCAP | No ISOFIX visual, no crash test clip |
| **Brand embarrassment** | *"¿Qué dirán si compro chino?"* | Trust story | No local owner testimonial |
| **Being trapped** | *"Si se rompe, estoy solo"* | Warranty FAQ | No workshop video, no claim walkthrough |
| **Resale trap** | *"No lo voy a poder vender"* | Honest compare | No 3-year TCO vs depreciation math |
| **Sales pressure** | *"Me van a presionar"* | "Sin presión" welcome | ✅ Strong |
| **Wrong vehicle choice** | *"¿Y si el GS8 es mejor?"* | Coming soon cards | No lineup guidance |
| **Spouse veto** | *"Mi pareja no vio esto"* | Family share (late) | Should be earlier |

---

### 12. What comparison opportunities are missing?

**Currently live:** GS4 MAX vs Toyota Corolla Cross only.

**Missing comparisons (high Santa Cruz relevance):**

| Comparison | Why it matters | Priority |
|------------|----------------|----------|
| GS4 MAX vs GS4 Luxury (trim) | Upsell / clarify value of MAX | High |
| GS4 MAX vs GS8 | Same-brand upgrade path | High |
| GS4 MAX vs Hyundai Tucson | Popular segment alternative | Medium |
| GS4 MAX vs Chery Tiggo 7 | Chinese-brand cross-shop | Medium |
| GS4 MAX vs used Toyota RAV4 | Budget alternative | Medium |
| GS4 MAX 4x2 vs AWD | Internal trim decision | High |

Hub shows Tucson and Tiggo 7 as "Próximamente" — customer sees competitors listed but cannot compare. **Worse than not showing them** — promises capability that doesn't exist.

---

## A. Guided Discovery Evaluation

### Should the experience begin with lifestyle/budget questions?

**Yes — strongly recommended.** Not a 20-question survey. A **60-second qualifying conversation** (3–5 taps):

1. *"¿Primera SUV o reemplazo?"*
2. *"¿Familia con hijos?"* → Yes/No/Pronto
3. *"¿Uso principal?"* → Ciudad / Doble Vía / Mixto
4. *"¿Qué te importa más?"* → Seguridad / Tecnología / Precio / Espacio
5. *"¿Presupuesto mensual orientativo?"* → Ranges (optional skip)

### Would this improve personalization?

**Yes — materially.**

| Without discovery | With discovery |
|-------------------|----------------|
| Every buyer: 14-screen trust arc | Family + city → Diego tour + maletero proof (3 screens) |
| Pre-researched buyer forced through FAQ | "Ya investigué" → Compare hub first |
| Compare defaults to Corolla | "Miraba Tucson" → Tucson comparison |
| Financing shows both trims equally | "Solo ciudad" → 4x2 highlighted |
| Test drive form repeats questions | Form pre-filled from discovery |

**Business impact:** Shorter time-to-CTA, higher completion rate, better lead quality (consultant sees discovery answers in recap).

**Risk if skipped:** System remains a **one-size-fits-all brochure** — the opposite of reducing salesperson dependence.

---

## B. Vehicle Comparison Evaluation

### Should customers compare from a single hub?

**Yes — but only after trust threshold OR discovery signal.** Compare hub architecture is correct; execution is incomplete.

**Required hub contents (priority order):**

1. **GS4 MAX vs Corolla Cross** — ✅ Live (finish competitor photo)
2. **GS4 MAX 4x2 vs AWD** — Internal trim (not competitor)
3. **GS4 MAX vs GS8** — Same-brand upsell
4. **GS4 MAX vs Tucson / Tiggo 7** — When content ready; hide until live

**Anti-pattern today:** Listing unavailable competitors with "Próximamente" damages credibility — like a salesperson who says *"también tenemos Tucson"* but has no sheet.

**Comparison UX fix:** One-screen summary scorecard above the fold (9 win / 1 lose / 6 tie) with expandable detail below — customer gets the verdict in 10 seconds standing at kiosk.

---

## C. Decision Support — What's Missing Today

| Need | Today | Required for purchase confidence |
|------|-------|----------------------------------|
| Ownership costs | Static TCO band in S26 | Editable km/month + 3-year total |
| Warranty | Headline + FAQ | Coverage matrix + claim process |
| Reliability | Carlos narration (partial) | Taller proof video + 80k km expectations |
| Safety | ADAS topic | ISOFIX + child seat visual + NCAP clip |
| Service intervals | Mentioned in tour | Cost table: year 1–5 |
| Resale value | Honest qualitative | TCO vs depreciation chart |
| Financing | Range by trim/plazo | Entrada slider + monthly check |
| Cargo space | Liters in compare | Photo with stroller + luggage |
| Family suitability | Diego topics (placeholder media) | Real family scenarios, 3-minute path |
| Travel suitability | Doble Vía topic (placeholder) | Road trip proof with Buena Vista context |

**Definition of done (from product vision) — customer should leave able to answer five questions without a salesperson. Current score:**

| Question | Ready? |
|----------|--------|
| ¿Es confiable para mi familia? | ⚠️ 70% — content yes, proof media no |
| ¿Qué tecnología y seguridad incluye? | ⚠️ 60% — ADAS words, not visuals |
| ¿Cuánto cuesta mantenerlo y qué garantía? | ⚠️ 65% — headline strong, depth weak |
| ¿Vale la pena vs otras opciones? | ✅ 75% — compare is a strength |
| ¿Cómo agendo prueba de manejo? | ⚠️ 70% — form too long for kiosk |

---

## D. Sales Process Support — What to Standardize

Knowledge salespeople **forget, explain poorly, or explain inconsistently** — this system should own:

| Topic | Floor inconsistency | Standardization opportunity |
|-------|---------------------|----------------------------|
| GAC global scale + Viaggio local role | Every consultant different story | S24 trust story (needs video) |
| Warranty terms (5yr/150k, 3yr service) | Often misquoted | S29 warranty deep-dive |
| C-NCAP + 8 airbags | Forgotten or vague | Hero stat strip + ADAS screen |
| Corolla Cross honest comparison | Some avoid reventa topic | S12 — already excellent |
| Cuota orientativa + disclaimer | Legal risk if overstated | S26 — already good |
| Maintenance intervals + first free service | Rarely mentioned proactively | Carlos tour step |
| AWD vs 4x2 guidance for Santa Cruz | Oversell AWD | New trim comparison |
| WhatsApp handoff context | Consultant starts cold | S15 session recap — strong |
| Test drive route options | Ad hoc | S34 logistics — underused |
| Post-sale service locations | Incomplete | FAQ + map |

**Missing operational layer:** Staff dashboard (S35), live handoff alert (S36), CRM lead queue — consultants still blind until customer sends WhatsApp.

---

## E. Kiosk Usability (Summary — see KIOSK_UX_AUDIT.md)

Critical kiosk failures affecting sales:

- Scrolling required on 6+ screens
- 20+ navigation pills on conversion screens
- Test drive form = 8+ fields (should be 3 + WhatsApp follow-up)
- Settings exposed on attract screen
- Screen IDs visible to customers
- No progress indicator ("Paso 3 de 5 hacia tu prueba")
- 3-minute idle reset loses unsaved progress

---

## Strategic Recommendations

Each item includes **Business Impact (BI)**, **Customer Impact (CI)**, **Effort (E)**, **Priority Score (PS)** — 1–10, 10 = do first.

### Tier 1 — Revenue-critical (PS 9–10)

| # | Recommendation | BI | CI | E | PS |
|---|----------------|----|----|---|-----|
| 1 | **60-second guided discovery** at S02 (5 questions → personalized path) | +25% lead quality; −40% time-to-CTA | Feels heard; relevant proof only | Medium (2–3 wk) | **10** |
| 2 | **Live WhatsApp + consultant SLA** on S15 (real number, name, "respondemos en X min") | Direct conversion; zero dead leads | Trust in handoff | Low (1–2 days ops) | **10** |
| 3 | **One-screen compare summary** — verdict above fold on S12 | Faster rational close | Decision in 10 seconds | Low (3–5 days) | **9** |
| 4 | **Short test drive capture** — name + phone + day (3 fields); rest via WhatsApp | +30% form completion | Less friction standing | Low (1 wk) | **9** |
| 5 | **Finish P0 media** — attract video, logos, competitor photo, persona avatars | Credibility = starts journey | "This is real" in 5 sec | Medium (2–4 wk assets) | **9** |

### Tier 2 — Confidence-building (PS 7–8)

| # | Recommendation | BI | CI | E | PS |
|---|----------------|----|----|---|-----|
| 6 | **Remove compare gating dead-end** — show "Mirá 2 temas de confianza primero" with direct links | −abandon at S11 | Clear path forward | Low | **8** |
| 7 | **4x2 vs AWD trim comparison** in compare hub | Higher margin clarity; less consultant time | Answers "¿necesito AWD?" | Medium | **8** |
| 8 | **Editable TCO mini-calculator** (km/month + entrada) | Handles affordability objection | "Can I afford this?" answered | Medium | **8** |
| 9 | **Family proof pack** — ISOFIX, maletero visual, Diego 3-min path | Family segment = core buyer | Spouse confidence | Medium | **8** |
| 10 | **Conversion focus mode** — hide nav chrome on S13/S14/S15 | Less paralysis; clearer close | One obvious action | Low | **7** |
| 11 | **Social proof screen (S23)** — 2–3 Santa Cruz owner clips | Trust transfer | "Someone like me bought" | Medium | **7** |
| 12 | **Viaggio workshop video** in trust story | Local credibility | "They exist after sale" | Medium | **7** |

### Tier 3 — Experience polish (PS 5–6)

| # | Recommendation | BI | CI | E | PS |
|---|----------------|----|----|---|-----|
| 13 | **Progress bar** — "Tu camino hacia la prueba" across session | Completion rate | Orientation | Low | **6** |
| 14 | **Pre-researched path** — compare-first for "Ya investigué" | Serves 30% of visitors faster | Respects their time | Low | **6** |
| 15 | **Hide unavailable comparisons** until content ready | Avoids broken promise | Trust | Low | **6** |
| 16 | **Stock/color indicator** on hero | Urgency; fewer wasted visits | "That white one is here" | Medium (ops) | **6** |
| 17 | **Staff dashboard + lead alert** (S35) | Consultant response time | Human continuity | High | **6** |
| 18 | **Altitude/consumo real content** for Bolivia | Handles La Paz objection | Local relevance | Low (content) | **5** |
| 19 | **Trade-in capture (S27)** | Deal structure; retention | Complete purchase picture | High | **5** |
| 20 | **Session resume (S37)** | Pre-visit → kiosk continuity | No repeat exploration | Medium | **5** |

---

## Closing Statement — Dealership Owner Lens

If I am investing in this as **sales infrastructure**, not a marketing demo, my money goes to:

1. **Making the first 60 seconds irresistible** (attract video, car visible, price flash)
2. **Asking 5 questions and showing 5 relevant proofs** (not 14 generic screens)
3. **Closing in 3 taps** (compare verdict → "me alcanza" → test drive with phone only)
4. **Handing consultants a qualified lead with context** (discovery answers + objections viewed)

The copy and architecture prove the team understands how Chinese-brand SUVs sell in Bolivia. The experience still behaves like a **well-written brochure on a screen**. The next investment tranche should turn it into a **salesperson that never has a bad day**.

---

*Related audits: [KIOSK_UX_AUDIT.md](./KIOSK_UX_AUDIT.md) · [MEDIA_ASSET_AUDIT.md](./MEDIA_ASSET_AUDIT.md) · [EXECUTIVE_ROADMAP_V2.md](./EXECUTIVE_ROADMAP_V2.md)*
