# Adaptive Sales Intelligence (ASI) — Strategic Architecture

**Version:** 1.0  
**Date:** 14 June 2026  
**Authors (lenses):** Chief Sales Psychologist · Automotive Sales Trainer · Behavioral Economist · CRO Director  
**Builds on:** SPRINT_A_PRODUCT_SPEC.md v1.2 (Discovery · Route Resolver · Recommendation Engine · BIL)  
**Constraint:** No new screens. No AI training. Configuration + event analytics only.  
**Mission:** Behave like the **top 1% salesperson** in a Santa Cruz dealership — not the average floor rep.

---

## Executive Summary

Sprint A v1.2 is a **strong Level 6 digital salesperson**: it qualifies, routes, adapts tone by confidence, and hands consultants a brief. It still thinks like a **smart funnel** — not like a master closer who knows *what the customer is avoiding*, *what decision they're actually making*, and *when to stop talking and ask for the keys*.

**Adaptive Sales Intelligence (ASI)** is the layer that closes that gap. It sits above BIL and answers five questions on every screen transition:

1. What is the customer emotionally trying to **avoid**?  
2. What decision are they actually trying to **make**?  
3. What objection have they **not yet said aloud**?  
4. What **proof** would unlock movement right now?  
5. Are they seeking **certainty, validation, permission, reassurance, or urgency**?

ASI does not add screens. It changes **which proof to show next**, **when to compress**, **what to stop repeating**, and **what the consultant should say in one sentence**.

---

# Part 1 — Executive Assessment of Sprint A v1.2

## What v1.2 already does like a top salesperson

| Capability | Grade | Evidence |
|------------|-------|----------|
| Opens with conversation, not interrogation | A | 4-question discovery, concern-based |
| Listens before lecturing | A− | Micro-acks, completion mirror |
| Adapts pace to confidence | B+ | BIL uncertainty → VALIDATOR/GUIDE/REASSURER |
| Honest comparison | A | Compare content + reventa counter |
| One clear next step | B+ | Recommendation engine invariant |
| Knows when customer is nervous | B | LOW confidence, hesitation patterns |
| Briefs the consultant | B | §9.8 handoff — still data-heavy |

## What v1.2 still does like an average salesperson

| Gap | Why it matters |
|-----|----------------|
| **Single axis of adaptation** (confidence only) | Top reps read *emotion*, not just certainty — same confident buyer can be price-defensive or validation-hungry |
| **Reactive, not predictive** | BIL responds to behavior; does not forecast unstated objections |
| **No "stop selling" rule** | Average reps over-explain; v1.2 can still trust-loop (FAQ → trust → ADAS → compare revisit) |
| **Proof is path-fixed** | Top rep picks *the one proof* for *this fear* — not the next screen in PATH_G |
| **No buying style model** | Analytical buyer gets same copy density as emotional buyer |
| **Three scores conflated mentally** | `uncertaintyScore`, `salesReadinessScore`, progress stages — no unified *decision readiness* |
| **Consultant gets facts, not a play** | "Viewed FAQ" ≠ "open with service story, avoid price" |
| **No learning loop** | Cannot improve routes/copy from Santa Cruz floor data without engineering |

## Verdict

Sprint A v1.2 can replace an **average** salesperson for the **first 5 minutes** on a **supervised** kiosk for **medium-confidence** buyers on a **known archetype path**.

It cannot yet replace a **top 1%** rep who:

- Stops pitching when the customer has already nodded three times  
- Names the fear before the customer has to  
- Asks for the test drive at the emotional peak — not after screen 9  
- Tells the consultant *"she's not afraid of the car — she's afraid her husband will say it's cheap"*  

**That is ASI's job.**

---

# Part 2 — Gaps Preventing Full Salesperson Replacement

| # | Gap | Customer experience | Top 1% behavior |
|---|-----|---------------------|-----------------|
| 1 | No **avoidance** model | Keeps showing trust to someone avoiding price | Switch proof type |
| 2 | No **latent objection** prediction | Customer must find FAQ themselves | Surface proof preemptively |
| 3 | No **decision frame** | "Explore GS4 MAX" | "Decide if this fits your family budget" |
| 4 | No **proof sufficiency** | Trust loop until idle timeout | "You've seen enough — let's drive it" |
| 5 | No **seeking mode** (certainty vs permission) | Same CTA for all | Permission CTA for spouse; validation for researcher |
| 6 | **Emotional states** collapsed into LOW/MED/HIGH | Overwhelmed gets same as skeptical | Shorter path for overwhelmed; data for skeptical |
| 7 | **Buying style** ignored | Analyst gets Diego stories | Tables for analyst; story for emotional |
| 8 | **decisionReadiness** not dimensional | Financing shown when trust=0 | Gate financing on trust readiness |
| 9 | **Consultant script** generic | Rep improvises badly | Personality + avoid list + close strategy |
| 10 | **No config learning** | Same PATH_G forever | Weekly tune: "FAQ→compare converts 2×" |

---

# Part 3 — ASI Architecture Overview

## Layer stack (v1.3 target)

```
┌─────────────────────────────────────────────────────────────┐
│           ADAPTIVE SALES INTELLIGENCE (ASI)                  │
│  Emotional State · Objection Prediction · Buying Style       │
│  Decision Readiness · Path Compression · Learning Config     │
└───────────────────────────┬─────────────────────────────────┘
                            │ modulates
┌───────────────────────────▼─────────────────────────────────┐
│     BEHAVIORAL INTELLIGENCE LAYER (BIL) — Sprint A v1.2      │
│     uncertaintyScore → confidenceLevel → salespersonMode       │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│  Discovery · Route Resolver · Recommendation Engine            │
└─────────────────────────────────────────────────────────────┘
```

## ASI outputs (every screen transition)

| Output | Consumer |
|--------|----------|
| `emotionalState` (primary + secondary) | Copy tone, persona choice |
| `latentObjections[]` (ranked, probability) | Preemptive proof routing |
| `buyingStyle` | Information density, CTA type |
| `decisionFrame` | What decision customer is making |
| `avoidanceTarget` | What they're emotionally avoiding |
| `seekingMode` | certainty \| validation \| permission \| reassurance \| urgency |
| `decisionReadinessScore` + 4 sub-scores | Stage gates, compression |
| `proofSufficiency` | boolean — stop educating, ask test drive |
| `nextBestProof` | content node ID, not just screen ID |
| `consultantPlaybook` | Superpowers handoff |

## ASI invariants

| Rule | Rationale |
|------|-----------|
| No new screens | ASI reroutes existing nodes only |
| No ML / AI training | Rule engine + JSON config + analytics aggregates |
| ASI can **override** BIL compression | BIL says skip trust; ASI can block if latent objection >70% |
| ASI can **force** compression | BIL says more trust; ASI says proof sufficient |
| Customer never sees labels | No "you seem anxious" |
| One primary CTA always | ASI changes target + copy, not count |

---

# Part A — Emotional State Engine (ESE)

## Purpose

Classify **how the customer feels right now** — orthogonal to confidence. A **HIGH confidence** buyer can be **defensive** about price. A **LOW confidence** buyer can be **curious** and exploring.

## State taxonomy

| State | Detection signals (composite) | Hidden fears | Tone | Path adjustment | CTA language pattern |
|-------|------------------------------|--------------|------|-----------------|----------------------|
| **Curious** | First visit; hero dwell 30–90s; hotspots tapped; low back nav; `moment_first` | Missing out on a good option; choosing wrong class | Warm, inviting | Allow exploration; don't compress early | *"Mirá esto — te va a interesar"* |
| **Excited** | Fast taps; short dwell; `moment_compare` or upgrade; ADAS quick exit | Losing the deal; wait time | Match energy; move fast | **Compress** — skip to compare or test drive | *"Dale — siguiente paso"* |
| **Skeptical** | `concern: trust`; FAQ china-brand; slow FAQ dwell; few CTA follows | Being fooled; brand failure; dealer exit | Carlos factual; admit limits | FAQ → proof → compare; never hype | *"Sin vueltas — mirá los datos"* |
| **Defensive** | `FINANCING_EXIT_FAST`; `FINANCING_CONSENT_NO`; back from financing; payment concern | Being sold to; hidden fees; shame | Low pressure; disclaimers first | Delay financing; compare value first | *"Sin compromiso — solo orientativo"* |
| **Anxious** | `DISC_SLOW`; `DISC_BACK_2PLUS`; high uncertainty; idle prompt | Irreversible mistake; spouse reaction | Normalize; short sentences | REASSURER; no rush CTA | *"Es normal — vamos paso a paso"* |
| **Overwhelmed** | `ADAS_DWELL_120`; `FAQ_2PLUS` + no advance; `COMPARE_ROW_EXPAND_0` + long dwell | Too much information; can't decide | **Reduce** — one proof only | **Force compression** after 1 proof | *"Resumamos en una cosa"* |
| **Validation-seeking** | `moment_compare`; compare 5+ rows expanded; `concern: validation` | Being wrong publicly; online research incorrect | Peer respect; honest scorecard | Compare early; admit Toyota wins | *"Tu investigación — confirmemos"* |
| **Price-sensitive** | `concern: payment`; financing toggles; compare Precio row expanded | Monthly trap; hidden costs | TCO before cuota; Carlos disclaimer | Compare value → finance; not trust depth | *"Valor por boliviano — no solo precio"* |
| **Family-protective** | `family: yes/soon`; family-safety dwell; `concern: safety/space` | Child harm; spouse veto | Diego; protection language | family_safety before compare | *"Para los que van atrás"* |
| **Status-conscious** | `moment_upgrade`; technology concern; trim interest; low price focus | Looking cheap; downgrading image | Sofía; design, full equipo | Hero → ADAS → compare tech | *"Full equipo — sin versión recortada"* |
| **Research-driven** | `moment_compare`; fast discovery; validation-seeking overlap | Wasting time; biased info | Data, timestamps, honest compare | PATH_A compress | *"Datos verificables — vos decidís"* |

## State resolution rules

1. Compute **top 3** states by weighted signal match (0–100 each).  
2. **Primary** = highest score ≥40.  
3. **Secondary** = second ≥25, modifies copy only.  
4. If **Overwhelmed** ≥50 → **override** primary — compression mandatory.  
5. If **Excited** + HIGH confidence → **override** path compression to test drive.

### Signal weights (examples)

| Signal | States boosted |
|--------|----------------|
| `DISC_MOMENT_COMPARE` + fast | Research-driven +40, Excited +25 |
| `FAQ china-brand` viewed | Skeptical +45 |
| `FINANCING_TOGGLE_4PLUS` | Price-sensitive +35, Anxious +20 |
| `family_safety` + dwell >45s | Family-protective +40 |
| `COMPARE_REVISIT` + expand 0 rows | Anxious +30, Overwhelmed +25 |
| `spouseInfluence: high` + no share | Anxious +20, Family-protective +15 |

## ESE → BIL interaction

| ESE state | BIL modifier |
|-----------|--------------|
| Overwhelmed | Force REASSURER; cap session at +1 screen then test drive offer |
| Excited + Research-driven | Allow VALIDATOR even if `concern: trust` |
| Defensive | Block financing CTA until compare value seen |
| Skeptical | Block VALIDATOR until FAQ or trust proof consumed |

---

# Part B — Objection Prediction Engine (OPE)

## Purpose

Predict objections **before** the customer opens FAQ. Route **one preemptive proof** — the way a top rep says *"Let me guess — you're wondering about parts in Santa Cruz"* without being asked.

## Objection catalog

| Objection ID | Probability signals | Threshold | Best intervention | Best proof asset (existing) | Salesperson wording |
|--------------|---------------------|-----------|-------------------|----------------------------|---------------------|
| **china_brand** | `concern: trust` +40; `moment_first` +25; `FAQ china-brand` not yet viewed +20; Santa Cruz first SUV market | **≥55%** | Pre-select FAQ tile; Carlos intro line on hero | S25 `china-brand` item | *"La duda más común es la marca — te respondo directo."* |
| **reliability** | `moment_first` +20; `concern: trust` +15; skipped ADAS +10; turbo fear keywords in FAQ expand | **≥50%** | Route ADAS or Carlos engine topic | S08 ADAS, S06 motor step | *"Lo que más preguntan: ¿aguanta el motor y la caja?"* |
| **resale** | `concern: payment` +15; compare Reventa row hover/expand +35; `moment_upgrade` +10 | **≥50%** | Show compare reventa counter **before** full table | S12 honest summary + TCO pivot | *"Toyota gana en reventa hoy — veamos el costo total."* |
| **financial** | `concern: payment` +45; `FINANCING_*` signals +30; declined consent +20 | **≥55%** | Value compare before cuota; Carlos disclaimer | S12 Precio/Garantía → S26 | *"Primero veamos qué incluye — después la cuota."* |
| **spouse** | `co_decision: partner` +40; `concern: joint_confidence` +45; compare done no share +25 | **≥50%** | Share CTA or joint test drive | S33 share, S14 pareja copy | *"¿Querés mandarle esto a tu pareja antes de decidir?"* |
| **service** | `concern: trust` +20; FAQ parts-service not viewed +30; post-warranty fear dwell | **≥45%** | Viaggio service proof | S25 `parts-service`, S24 compressed ch.2 | *"Repuestos y taller acá — no importador de paso."* |
| **technology** | `concern: technology` +50; compare Tecnología expand +25 | **≥50%** | ADAS first | S08 dashboard hero | *"Todo esto va de serie — no es paquete extra."* |
| **decision_paralysis** | `COMPARE_REVISIT` +25; `FINANCING_TOGGLE_4PLUS` +25; `HESITATE_CONVERT_STALL` +30; 3+ hesitation patterns | **≥60%** | **Proof sufficiency** → test drive or WhatsApp | S14 soft capture | *"Pará de leer — 20 minutos manejando vale más."* |

## OPE output contract

```yaml
latentObjections:
  - id: china_brand
    probability: 72
    status: unaddressed | partially_addressed | resolved
    recommendedProof: faq/china-brand
    preemptiveLine: "..."
```

**Resolved** when: proof node viewed with dwell ≥20s AND customer advanced via recommended CTA.

## Preemptive routing rule

When top objection probability ≥ threshold AND `status: unaddressed`:

- **Override** next mandatory node to `recommendedProof` **once** per objection  
- Do not stack — max **1 preemptive detour** per session before compare  
- After resolve, return to archetype path  

---

# Part C — Buying Style Model (BSM)

## Styles

| Style | How they behave | Information they value | Friction | What closes them |
|-------|-----------------|------------------------|----------|------------------|
| **Analytical** | Expand compare rows; slow deliberate taps; 5+ FAQ items | Tables, scores, verified dates, honest losses | Vague claims, stories without numbers | Compare scorecard + TCO |
| **Emotional** | Hero dwell; family content; persona narration; shorter text ok | Stories, family imagery, Diego/Carlos voice | Dense tables, too many stats | Family-safety + test drive feel |
| **Practical** | Space, consumo, maletero; mixed use; route questions | Daily use, maintenance, warranty terms | Brand philosophy, heritage scroll | Compare Espacio/Consumo + warranty FAQ |
| **Status-oriented** | Upgrade path; technology; trim interest | Full equipo, design, vs base Corolla | Being shown "cheap" options | Hero + tech compare wins |
| **Security-oriented** | Trust concern; FAQ; slow trust path | C-NCAP, airbags, Viaggio network | Rushed compare, skipped FAQ | FAQ + ADAS + service |
| **Family-oriented** | Kids; family-safety; joint decision | ISOFIX, space, rear seat | Solo-focused copy | Diego path + joint test drive |
| **Fast-decision** | DISC_FAST; VALIDATOR; ignores depth | Headline verdict, one number | Long arcs, trust story | Compare → test drive |
| **Slow-decision** | DISC_SLOW; high dwell; revisits | Permission to take time | Pushy CTAs | WhatsApp + share; soft test drive |

## Classification (rule-based)

| Input signals | Style |
|---------------|-------|
| `COMPARE_ROW_EXPAND_5PLUS` + `moment_compare` | Analytical |
| `family: yes` + family-safety viewed | Family-oriented |
| `concern: trust` + `FAQ_2PLUS` | Security-oriented |
| `DISC_FAST` + `NAV_REC_CTA_FOLLOW` | Fast-decision |
| `DISC_SLOW` + `COMPARE_REVISIT` | Slow-decision |
| `concern: technology` + `moment_upgrade` | Status-oriented |
| `concern: payment` + `primary_use: mixed` | Practical |
| Default MEDIUM confidence | Practical |

**Tie-break:** `concern` from discovery > behavior.

## BSM → presentation rules (no new screens)

| Style | Copy density | Persona | Compare default | Financing default |
|-------|--------------|---------|-----------------|-------------------|
| Analytical | Full scorecard visible | Carlos | All rows collapsed except top 3 wins | Show range + disclaimer |
| Emotional | 2-line summary first | Diego/Sofía | Highlight 3 wins + 1 honest loss | Defer unless payment concern |
| Practical | Bullets: maletero, consumo, garantía | Carlos | Espacio + Garantía categories expanded | TCO note prominent |
| Fast-decision | Verdict only | Sofía | Scorecard above fold only | Skip unless tapped |
| Slow-decision | Repeat permission language | Carlos soft | Offer WhatsApp summary | Never auto-expand |

---

# Part D — Decision Readiness Model (DRM)

## Purpose

Separate from:

| Score | Measures |
|-------|----------|
| `uncertaintyScore` (BIL) | Need for reassurance |
| `salesReadinessScore` (§6) | Lead quality / consultant priority |
| **`decisionReadinessScore` (DRM)** | **Readiness to take the next commercial step** |

## Four sub-scores (0–100 each)

### emotionalReadiness

| Increases | Decreases |
|-----------|-----------|
| Excited state +20; CTA follow streak +15; completion mirror engagement +10 | Anxious + overwhelmed −20; TEST_DRIVE_ABANDON −30; IDLE_RESET −25 |
| Trust concern addressed (OPE resolved) +15 | DEFENSIVE state −15 |

### informationalReadiness

| Increases | Decreases |
|-----------|-----------|
| Compare completed +25; relevant concern proof viewed +20; ADAS if safety +15 | No compare and archetype requires it −30; FAQ unaddressed when OPE china_brand >60 −20 |

### financialReadiness

| Increases | Decreases |
|-----------|-----------|
| Financing viewed +20; consent yes +15; payment concern + compare precio +20 | FINANCING_CONSENT_NO −10; FINANCING_EXIT_FAST −25; payment concern without compare −15 |

### trustReadiness

| Increases | Decreases |
|-----------|-----------|
| FAQ/trust/ADAS per archetype threshold +30; OPE trust objections resolved +20 | `concern: trust` without FAQ −40; skeptical path skip trust −25 |

## decisionReadinessScore

```
decisionReadinessScore = weighted_mean(
  emotionalReadiness,    0.25
  informationalReadiness, 0.30
  financialReadiness,     0.20  // weight 0 if concern ≠ payment
  trustReadiness,         0.25  // weight 0.35 if concern = trust
)
```

Normalize weights to sum 1.0 per session.

## Stage gates — what the customer is ready for

| Stage | Minimum sub-scores | System behavior |
|-------|-------------------|-----------------|
| **Continue exploration** | Default — always allowed | Next proof per path |
| **Compare** | informational ≥35 OR validation-seeking OR HIGH confidence | Open compare hub |
| **Financing** | informational ≥50; trust ≥40 (if trust concern); financial ≥30 OR payment not a concern | S26 entry |
| **Test drive** | emotional ≥45; informational ≥55; trust ≥50 (if applicable); decisionReadiness ≥**60** | Primary CTA = test drive |
| **Human consultant** | decisionReadiness ≥45 AND (LOW confidence OR decision_paralysis ≥60% OR spouse unresolved) | WhatsApp with `consultantPlaybook`; optional prompt: *"Un asesor te acompaña ahora"* |

**ASI can block BIL compression** if stage gate not met.  
**ASI can force compression** if decisionReadiness ≥70 and proofSufficiency true.

---

# Part E — Adaptive Path Compression (APC)

## Purpose

Answer: **"When should the system stop selling and ask for the test drive?"**

Top 1% reps recognize the **buying signal cluster** — not a single event.

## proofSufficiency — boolean

`proofSufficiency = true` when **any** of:

### Cluster A — Decisive buyer

- `decisionReadinessScore ≥ 70` AND  
- `COMPARE_DETAIL` viewed AND  
- (`FINANCING_VIEW` OR `concern ≠ payment`) AND  
- `emotionalState ∉ {Anxious, Overwhelmed}`  

→ **Next CTA must be test drive** (override all education nodes)

### Cluster B — Researcher satisfied

- `moment_compare` AND  
- `COMPARE_DETAIL` dwell <90s AND  
- `COMPARE_ROW_EXPAND` ≥3 AND  
- `NAV_REC_CTA_FOLLOW` on last 2 screens  

→ Skip financing if not payment concern → test drive

### Cluster C — Family convinced

- `family-protective` state AND  
- `family_safety` viewed AND  
- `COMPARE_DETAIL` with Espacio or Seguridad expanded  

→ Test drive with *"Prueba en pareja"*

### Cluster D — Paralysis breaker

- `decision_paralysis` objection ≥60% AND  
- `sessionDuration > 4 min` AND  
- `proof nodes visited ≥ 3`  

→ Stop educating — test drive OR WhatsApp only

## Anti-patterns — when NOT to compress

| Condition | Reason |
|-----------|--------|
| `trustReadiness < 40` AND `concern: trust` | Premature close increases abandon |
| `OPE china_brand` unaddressed AND prob ≥55% | Must name the fear first |
| `TEST_DRIVE_ABANDON` in session | Switch to WhatsApp, not repeat form |
| `spouseInfluence: high` AND share not offered | Permission before close |

## Trust-loop prevention

| Rule | Action |
|------|--------|
| Same proof category visited **2×** (e.g. FAQ → FAQ) | Block third; force compare or test drive |
| `FAQ_2PLUS` + `TRUST_STORY_COMPLETE` + no compare | Mandate compare — no more trust |
| `COMPARE_REVISIT` without financing or test drive | Mandate financing OR test drive — no third compare |
| Session > **6 min** without conversion event | APC force — test drive primary |

## Over-explaining guard

When `proofSufficiency` AND recommended CTA ignored **once**:

- Replace reasonLine with: *"Ya viste lo principal — lo que falta es manejarlo."*  
- Hide secondary CTAs  
- Pulse test drive only  

---

# Part F — Self-Learning Layer (Configuration Analytics)

## Purpose

Improve routes and copy **without ML** — weekly review of aggregates → JSON config updates.

## Telemetry schema (extend Sprint A events)

| Event | Properties for learning |
|-------|-------------------------|
| `session_outcome` | `test_drive` \| `whatsapp` \| `abandon` \| `idle_reset` |
| `path_template` | PATH_A–G |
| `path_actual` | ordered nodes visited |
| `confidence_final` | HIGH/MED/LOW |
| `emotionalState_final` | primary |
| `top_objection` | OPE id |
| `buyingStyle` | BSM |
| `decisionReadiness_at_convert` | number |
| `screens_count` | number |
| `duration_sec` | number |
| `recommended_cta_follow_rate` | 0–1 |
| `compression_triggered` | boolean |

## Weekly aggregate reports (auto-generated)

| Report | Question answered | Config knob |
|--------|-------------------|-------------|
| **Path conversion** | Which PATH_A–G → test drive % highest? | Default path weights per archetype |
| **Objection frequency** | Top 3 OPE ids in Santa Cruz | Preemptive threshold tuning |
| **Hesitation heatmap** | Which screen → most `HESITATE_*` | Screen copy / compression trigger |
| **CTA copy A/B** | Which `reasonLine` variant → follow tap | `recommendations.json` winner |
| **Compression success** | `proofSufficiency` → test drive % | Cluster threshold tune |
| **Abandon screen** | Last screen before idle_reset | Recovery intervention |

## Configuration files (human-editable)

```
config/asi/
  objection-thresholds.json    # OPE probability cutoffs
  emotional-weights.json       # ESE signal weights
  compression-clusters.json    # APC rules
  path-performance.json        # PATH override weights from analytics
  cta-variants.json            # A/B copy with performance tags
```

## Learning workflow (no AI)

1. **Collect** 2 weeks floor data (min 200 sessions).  
2. **Analyst** (or GM) reviews reports.  
3. **Adjust** JSON thresholds ±5 points.  
4. **Deploy** config — no code deploy if hot-reload.  
5. **Tag** config version in analytics for before/after.

### Example learning decision

> *"PATH_G with trust_compressed skipped converts 18% vs 11% with full trust — update APC to skip trust_story when HIGH confidence + trustReadiness >50 after FAQ."*

---

# Part G — Consultant Superpowers

## Purpose

Handoff is a **coaching card**, not a CRM dump.

## consultantPlaybook structure

```yaml
personalitySummary:    # 2 sentences, plain Spanish
emotionalSummary:      # how they feel + what they're avoiding
likelyObjection:       # top OPE not fully resolved
buyingStyle:           # BSM label + one line
confidenceLevel:       # from BIL
decisionReadiness:     # score + weakest dimension
seekingMode:           # certainty | validation | permission | reassurance | urgency
openingLine:           # verbatim — 15 words max
closeStrategy:         # one paragraph
topicsToAvoid:         # bullet list
topicsToEmphasize:     # bullet list
proofAlreadyDelivered: # don't repeat
recommendedFirstAction: # test drive | desk | whatsapp follow-up
```

## Generation rules (templates)

### personalitySummary

| BSM + ESE | Template |
|-----------|----------|
| Analytical + Skeptical | *"Comprador analítico y escéptico — necesita datos verificables antes de emoción. Respetá su ritmo."* |
| Family-oriented + Anxious | *"Padre/madre protector/a — la decisión es emocional. No abrir con precio."* |
| Fast-decision + Excited | *"Viene decidido/a — no sobre-expliques. Coordiná prueba rápido."* |
| Slow-decision + Defensive | *"Desconfía de presión — ofrecé WhatsApp y tiempo. Cuota solo si la pide."* |

### emotionalSummary

Formula: *"Evita {avoidanceTarget}. Busca {seekingMode}. Estado: {emotionalState primary}."*

Example: *"Evita sentir que se equivoca con una marca china. Busca permiso (pareja). Estado: ansioso pero interesado."*

### closeStrategy examples

| Profile | closeStrategy |
|---------|---------------|
| LOW trust + partner | *"Cerrá con taller Viaggio + prueba en pareja. Llevá los dos al GS4 físico antes de números."* |
| HIGH validation | *"Confirmá compare verbalmente — 9 categorías. Preguntá qué día prueba. No re-pitches marca."* |
| decision_paralysis | *"Pará de pantalla. Ofrecé salida: prueba 20 min o WhatsApp mañana. Un solo siguiente paso."* |
| Price-sensitive | *"TCO y garantía antes de cuota. Simulación con banco solo si pidió."* |

### topicsToAvoid

| Condition | Avoid |
|-----------|-------|
| `china_brand` OPE resolved | GAC global heritage lecture |
| `FINANCING_EXIT_FAST` | Cuota in first 30 seconds |
| `spouseInfluence: high` | *"¿Comprás hoy?"* urgency |
| `moment_first` | Assuming they know SUV jargon |
| Compare reventa fear | Dismissing Toyota — acknowledge first |

### topicsToEmphasize

| Condition | Emphasize |
|-----------|-----------|
| `family-protective` | ISOFIX, espacio, prueba con chicos |
| `service` OPE high | Taller Banzer, repuestos originales |
| `moment_upgrade` | Qué mejora vs auto actual |
| `concern: payment` | Mantenimiento sin costo 3 años |

---

# Part 4 — The Five ASI Questions (operational)

On every screen exit, ASI computes:

| # | Question | ASI field |
|---|----------|-----------|
| 1 | What are they emotionally trying to **avoid**? | `avoidanceTarget` |
| 2 | What decision are they actually trying to **make**? | `decisionFrame` |
| 3 | What objection is **unspoken**? | `latentObjections[0]` |
| 4 | What **proof** unlocks movement? | `nextBestProof` |
| 5 | Certainty, validation, permission, reassurance, or urgency? | `seekingMode` |

### avoidanceTarget inference

| Signals | avoidanceTarget |
|---------|-----------------|
| `concern: trust`, FAQ china | *"Being fooled by a Chinese brand"* |
| `concern: payment`, financing exit | *"Monthly payment trap"* |
| `co_decision: partner`, no share | *"Spouse conflict at home"* |
| `COMPARE_REVISIT`, reventa expand | *"Resale regret"* |
| `moment_first` | *"Choosing the wrong first SUV"* |

### decisionFrame inference

| Archetype + stage | decisionFrame |
|-------------------|---------------|
| Compare-first, pre-compare | *"Is my research right?"* |
| Family, post family-safety | *"Is this safe enough for my kids?"* |
| Skeptical, post FAQ | *"Can I trust Viaggio after the sale?"* |
| Post compare | *"Does value beat Toyota for my situation?"* |
| Post financing | *"Can I afford this without stress?"* |
| Pre test drive | *"Am I ready to commit 20 minutes?"* |

### seekingMode inference

| Priority signals | seekingMode |
|------------------|-------------|
| `moment_compare`, validation | **validation** |
| `spouseInfluence: high` | **permission** |
| LOW confidence, anxious | **reassurance** |
| HIGH + excited + fast | **urgency** |
| Analytical + compare expand | **certainty** |
| Default MEDIUM | **certainty** |

---

# Part 5 — ASI Feature Priority Ranking

| Rank | Feature | Revenue impact | Confidence impact | Effort | Sprint |
|------|---------|----------------|-------------------|--------|--------|
| 1 | **Adaptive Path Compression (APC)** | Very High | High | Medium | B1 |
| 2 | **Objection Prediction Engine (OPE)** | Very High | Very High | Medium | B1 |
| 3 | **Decision Readiness Model (DRM)** | High | High | Medium | B1 |
| 4 | **Consultant Superpowers playbook** | High | Medium | Low | B1 |
| 5 | **Emotional State Engine (ESE)** | High | Very High | Medium | B2 |
| 6 | **Buying Style Model (BSM)** | Medium | High | Low | B2 |
| 7 | **Seeking mode → CTA mapping** | Medium | High | Low | B2 |
| 8 | **Trust-loop prevention rules** | Medium | High | Low | B1 |
| 9 | **Self-learning config layer** | High (lag 4–8 wk) | Medium | Medium | B3 |
| 10 | **Preemptive proof routing** | High | High | Medium | B2 |

---

# Part 6 — Revenue Impact Estimate (Santa Cruz, 12 months post-ASI)

**Assumptions:** 1 kiosk, 40 sessions/day, 250 business days, baseline from Sprint A v1.2 targets.

| Metric | v1.2 (est.) | v1.2 + ASI B1 | v1.2 + ASI B1–B3 |
|--------|-------------|---------------|-------------------|
| Session → test drive | 14% | **19–22%** | **22–26%** |
| Test drive → sale (floor) | 25% | 27% | **30%** |
| Consultant close rate (warm handoff) | 35% | **45%** | **50%** |
| Avg screens to convert | 8 | **5–6** | **4–5** |
| Abandon at trust loop | 12% | **6%** | **4%** |

**Incremental GS4 MAX sales (directional):**

| Phase | Incremental sales/year | Notes |
|-------|------------------------|-------|
| ASI B1 only | **+18–28 units** | Compression + OPE + DRM + playbook |
| ASI B1–B3 | **+35–50 units** | + ESE/BSM + learning tuning |

At ~$us 42,900 ASP, B1 alone ≈ **$770K–$1.2M** gross vehicle revenue — implementation cost order of magnitude **$40–80K** (config + engineering, no media).

**Highest leverage:** APC stopping over-sell → recovers **analysis-paralysis abandons** (estimated 8–12% of sessions).

---

# Part 7 — Implementation Order (Sprint B+)

## Sprint B1 — "Stop over-selling" (3–4 weeks)

1. `decisionReadinessScore` + 4 sub-scores (DRM)  
2. `proofSufficiency` + APC clusters A–D  
3. Trust-loop prevention rules  
4. OPE v1 — top 4 objections (china_brand, resale, financial, spouse)  
5. `consultantPlaybook` replaces raw handoff  
6. Stage gates on financing / test drive  

**Exit:** System asks for test drive when ready — not after fixed screen count.

## Sprint B2 — "Read the room" (3–4 weeks)

7. Emotional State Engine (ESE) — 6 primary states first  
8. Buying Style Model (BSM) — 4 styles first  
9. `seekingMode` → CTA copy matrix  
10. Preemptive proof routing (OPE override once per session)  
11. `avoidanceTarget` + `decisionFrame` in recommendations  

**Exit:** Copy feels like it names the fear before the customer speaks.

## Sprint B3 — "Learn from the floor" (2–3 weeks + ongoing)

12. `session_outcome` analytics pipeline  
13. Weekly aggregate reports  
14. JSON config hot-reload  
15. CTA variant tagging  
16. PATH performance overrides  

**Exit:** GM can tune thresholds without engineering every month.

## Sprint B4 — Operations (parallel)

- Live WhatsApp + consultant SLA (ops — not ASI code)  
- Staff tablet receives `consultantPlaybook` (S35 lite)  

---

# Part 8 — Digital Salesperson Maturity Model (Levels 1–10)

| Level | Name | Capabilities | Customer experience |
|-------|------|--------------|---------------------|
| **1** | Brochure | Static pages, no session | PDF on a screen |
| **2** | Guided brochure | Fixed path, copy | Video + next button |
| **3** | Qualified brochure | Discovery questions | Survey → content |
| **4** | Routed guide | Archetype paths | Relevant sequence |
| **5** | Adaptive tone | BIL confidence modes | Tone matches pace |
| **6** | **← Sprint A v1.2** | Discovery + BIL + 1 CTA | Good salesperson, average close |
| **7** | Predictive | OPE + DRM + APC | Names fear; stops pitching |
| **8** | Empathic | ESE + BSM + seeking mode | *"Understands me"* |
| **9** | Learning | Config analytics loop | Improves monthly from floor |
| **10** | Top 1% digital closer | Full ASI + human seamless handoff + media proof | Replaces first 5 min + sets up close |

## Current rating: **6.5 / 10**

| Dimension | Score | To reach 10 |
|-----------|-------|-------------|
| Qualification | 8 | ASI adds avoidance + seeking (no new Qs) |
| Proof selection | 6 | OPE + nextBestProof |
| Timing / compression | 5 | APC + proofSufficiency |
| Emotional intelligence | 5 | ESE |
| Objection handling | 7 | Content strong; prediction weak |
| Close mechanics | 6 | DRM gates |
| Consultant enablement | 6 | Superpowers playbook |
| Learning | 3 | B3 config layer |
| Visual credibility | 4 | Media sprint (parallel) |
| Human handoff | 6 | Ops + playbook |

## Requirements to reach Level 10

| # | Requirement | Level impact |
|---|-------------|--------------|
| 1 | ASI B1 complete (APC + OPE + DRM) | 6 → 7 |
| 2 | ASI B2 complete (ESE + BSM) | 7 → 8 |
| 3 | Kiosk form + one-screen compare/finance (Sprint B UX) | 8 → 8.5 |
| 4 | P0 media (trust, compare photo, attract) | 8.5 → 9 |
| 5 | ASI B3 learning + 8 weeks data | 9 → 9.5 |
| 6 | Consultant tablet + live WhatsApp SLA | 9.5 → 10 |
| 7 | Test drive attribution to kiosk in CRM | Sustains 10 |

**Level 10 definition:** A first-time skeptical family buyer can walk up alone, feel understood within 60 seconds, receive the **right** proof for **their** unstated fear, be asked for a test drive at the **emotional peak** (not screen 9), and hand a consultant a **one-glance play** that produces a warm conversation — **without the customer feeling surveyed, sold, or rushed.**

---

# Part 9 — ASI Integration with Sprint A v1.2 (reference)

## Processing order per screen transition

```
1. Ingest new behavioral events
2. Update BIL uncertaintyScore → confidenceLevel → salespersonMode
3. Update ASI:
   a. ESE emotional states
   b. OPE latent objections
   c. BSM buying style
   d. DRM sub-scores → decisionReadinessScore
   e. avoidanceTarget, decisionFrame, seekingMode
   f. proofSufficiency (APC)
4. Resolve conflicts:
   - ASI compression overrides BIL trust extension
   - ASI gate blocks BIL VALIDATOR skip if trustReadiness < 40
5. Route Resolver: archetype path ± BIL ± ASI compression/gates
6. Recommendation Engine: concern × salespersonMode × seekingMode × ESE
7. If convert event → generate consultantPlaybook
```

## New session fields (ASI)

```
asiState {
  emotionalPrimary, emotionalSecondary
  latentObjections[]
  buyingStyle
  emotionalReadiness, informationalReadiness,
  financialReadiness, trustReadiness
  decisionReadinessScore
  avoidanceTarget
  decisionFrame
  seekingMode
  proofSufficiency
  nextBestProof
  compressionTriggered
  consultantPlaybook
}
```

---

# Part 10 — Closing Thesis

Sprint A v1.2 built the **nervous system** — reflexes that respond to confidence and hesitation.

ASI builds **judgment** — the part of a top salesperson who knows:

- When the customer is nodding but scared of the monthly payment  
- When another trust slide will **lose** the sale  
- When to say *"Dejá de leer — manejalo"*  
- What to whisper to the consultant: *"No es el auto — es el marido"*  

**No new screens. No AI. Just better decisions with the screens you already have.**

---

*Companion: SPRINT_A_PRODUCT_SPEC.md v1.2 · SPRINT_A_PSYCHOLOGY_REVIEW.md · Implement ASI as §10 in spec v1.3 when approved.*
