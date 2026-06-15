# Self-Improving Company Blueprint

**Version:** 1.0  
**Date:** 14 June 2026  
**Review panel:** CEO · Dealership Owner · Private Equity Investor · AI Systems Architect · Customer Intelligence Expert · Marketing Attribution Expert · Operations Consultant  
**Reviews:** [FUTURE_STATE_ARCHITECTURE.md](./FUTURE_STATE_ARCHITECTURE.md) and all prior specifications  
**Constraint:** No new product features — structural diagnosis, organizational design, and compounding intelligence architecture only  

---

## Executive Verdict (All Lenses)

[FUTURE_STATE_ARCHITECTURE.md](./FUTURE_STATE_ARCHITECTURE.md) correctly reframes Viaggio from kiosk to **Customer Intelligence Platform (CIP)**. It names five engines, a learning loop, and governance. That is necessary but **not sufficient** for a self-improving company.

A self-improving company is not one that ships smarter software weekly. It is one where:

```
Organizational behavior → Measured outcomes → Automated inference → Bounded action → New outcomes
```

…runs without depending on the GM's memory, a consultant's honesty, or a Monday meeting that gets canceled.

**Current gap:** FUTURE_STATE describes **customer-facing intelligence** well. It under-specifies **company-facing intelligence**, **market-facing intelligence**, and the **organizational machinery** that turns inference into institutional habit.

This blueprint names what blocks compounding, what layers are missing, what must be learned automatically, and what makes the asset category-defining — not dealership software.

---

# Part 1 — Answers to the Eight Strategic Questions

## 1. What would prevent this from becoming a self-improving company?

| Blocker | Why it stops compounding | Who sees it first |
|---------|--------------------------|-------------------|
| **B1 — Outcome labels treated as optional** | Without `won/lost/reason/no-show` joined to `sessionId`, every "learning" loop optimizes engagement fiction | PE investor at diligence |
| **B2 — CRM is downstream, not constitutional** | FUTURE_STATE still allows CRM as Phase 2; until CRM is system of record, the company learns from kiosk events, not revenue | Dealership owner |
| **B3 — Learning is config tuning, not causal inference** | Promoting a proof because it correlates with wins does not prove it *caused* wins; confounders (better consultants, Saturday traffic) poison the loop | AI architect |
| **B4 — Weekly ritual depends on humans showing up** | Monday Intelligence Review is a meeting, not a system; canceled meetings = zero learning | CEO |
| **B5 — Consultant adoption is uninstrumented** | Copilot ignored → no override tags → AI never learns where humans disagree | Operations consultant |
| **B6 — Consultant gaming of outcomes** | Marking deals won/lost incorrectly to protect commission or blame AI corrupts the training signal | Dealership owner |
| **B7 — No owner for truth** | Knowledge Library has update cadences but no **accountable role** when price, stock, or compare data goes stale | CEO |
| **B8 — Marketing spend outside the graph** | Radio, agency fees, GAC co-op not in same ledger as MIE attribution → budget decisions stay political | Marketing attribution expert |
| **B9 — Single-location data gravity** | One dealership cannot learn seasonality, competitive mix, or staffing patterns robustly | PE investor |
| **B10 — Culture still sells cars, not learns** | Floor incentivized on monthly units, not on labeling losses, logging no-shows, or using copilot | Dealership owner |
| **B11 — No experiment discipline** | Proof rank changes ship globally without A/B holdout → cannot measure lift | AI architect |
| **B12 — Technical debt: screen + conversation dual stack** | Engineering maintains two UX paradigms; learning fragments across channels | AI architect |
| **B13 — Privacy/consent fragmentation** | PCM underperforms if consent is inconsistent; learning cohorts shrink | Customer intelligence expert |
| **B14 — Media/content debt ignored in learning** | System learns which proof *node* works, not whether the *asset* was placeholder — confounds intelligence with production quality | CEO |

**Root cause synthesis:** FUTURE_STATE defines a **learning-capable architecture**. Viaggio will not become self-improving until **outcome truth**, **accountable data ownership**, and **organizational incentives** are as engineered as the reasoning layer.

---

## 2. What intelligence layers are still missing?

FUTURE_STATE has CIE, SIE, MIE, OIE, EIE. A self-improving **company** requires two meta-layers above the CIP:

```
┌─────────────────────────────────────────────────────────────┐
│              COMPANY INTELLIGENCE ENGINE (CoIE)              │
│  Org performance · Incentive alignment · Process debt        │
│  Experiment registry · Decision audit · Capability maturity  │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│              MARKET INTELLIGENCE ENGINE (MkIE)               │
│  Competitor pressure · Category demand · Macro/seasonality   │
│  OEM policy · Regional economics · Share-of-voice              │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│         CUSTOMER INTELLIGENCE PLATFORM (existing 5)            │
│         CIE · SIE · MIE · OIE · EIE                            │
└─────────────────────────────────────────────────────────────┘
```

### Missing layers (diagnosis, not feature list)

| Layer | What FUTURE_STATE has | What is missing |
|-------|----------------------|-----------------|
| **Company Intelligence (CoIE)** | EIE dashboards | **Organizational learning**: which processes fail, which roles block labels, which rituals were skipped, incentive misalignment detection |
| **Market Intelligence (MkIE)** | MIE campaign attribution | **Exogenous context**: competitor promotions, Corolla Cross incentive shifts, FX/boliviano, rainy season, GAC regional policy — without this, internal learning misattributes external shocks |
| **Causal Intelligence** | Correlation in weekly loop | **Counterfactual reasoning**: "Would this customer have bought without proof X?" — requires holdouts or quasi-experimental design |
| **Financial Intelligence** | Funnel economics in EIE | **Margin truth**: gross per unit, F&I attach, trade-in bleed, discount authority — revenue attribution without margin is vanity |
| **Workforce Intelligence** | Consultant performance widget | **Skill graph**: who closes trust-anxious vs price-defensive; staffing mix optimization — not just SLA timers |
| **Partner Intelligence** | Bank partner in OIE queue | **OEM + lender + insurer** constraint propagation into reasoning — brand policy changes are market events |
| **Trust Intelligence** | Governance events logged | **Aggregate trust posture**: customer sentiment drift, grounding fail clusters, regulatory exposure score |

**Architect's note:** EIE reports the business. **CoIE improves the business that runs the platform.** MkIE explains what the business cannot control. Without CoIE and MkIE, the company improves **messages** but not **itself**.

---

## 3. What information should the company learn automatically every week?

Not "what could be nice" — what must flow without a human exporting CSV.

### Tier A — Automatic (machine-generated, no meeting required)

| Learning artifact | Source join | Decision it feeds |
|-------------------|-------------|-------------------|
| **Proof lift by cohort** | `proof_sequence` + `outcome` + `concern` + `buyingStyle` | DPE rank proposals |
| **Objection velocity & resolution rate** | `objection.*` + `proof.*` + `outcome` | Content debt queue |
| **Campaign → qualified lead → sale efficiency** | MIE spend + CIE + CRM | Budget reallocation recommendation |
| **Copilot on vs off conversion delta** | `copilot_used` + `deal_won` | AI investment justification |
| **SLA breach autocorrelation** | OIE timestamps + staffing count | Staffing alert rules |
| **No-show rate by segment** | `test_drive_*` + profile slots | CI close timing calibration |
| **Lost reason distribution shift** | CRM `lost_reason` week-over-week | MkIE + product narrative |
| **Knowledge staleness index** | Knowledge Library `version` vs `last_validated` | CoIE accountability ticket |
| **AI override cluster map** | `governance.recommendation_rejected` by proof/action | SIE calibration |
| **Grounding failure rate** | `governance.grounding_fail` | Anti-hallucination escalation |
| **Time-to-close by assisted channel** | Multi-touch + CRM close date | Attribution model weight review |
| **Spouse-block rate** | `spouse_blocked` tag trend | Permission-mode strategy |
| **Inventory recommendation accuracy** | AI promise vs OIE actual | OIE gate tightening |
| **Consultant label completeness score** | % deals with `lost_reason` filled | CoIE incentive enforcement |

### Tier B — Automatic inference, human approval required

| Learning artifact | Why human gate |
|-------------------|----------------|
| Config threshold changes (ASI) | Avoid overfitting small samples |
| Proof node promotion/demotion | Brand and legal review |
| Campaign budget shift >15% | Cash risk |
| Objection taxonomy merge/split | Ontology drift |

### Tier C — Cannot be automatic yet (organizational gap)

| Learning artifact | Blocker |
|-------------------|---------|
| Gross margin per assisted sale | F&I data not in graph |
| Competitor promotion impact | MkIE not built |
| Causal proof attribution | No experiment holdouts |
| Consultant skill routing | Workforce Intelligence missing |

**Weekly company learning output (single artifact):**  
`CompanyLearningReport@v1` — generated Sunday 23:00, in executive inbox Monday 07:00. Meeting reviews **exceptions**, not data assembly.

---

## 4. What executive decisions could be automated safely?

**Principle:** Automate **reversible, bounded, auditable** decisions. Never automate **irreversible, legal, or interpersonal authority**.

### Safe automation zone (green)

| Decision | Bounds | Kill switch |
|----------|--------|-------------|
| Proof rank adjustment within ±10% | Pre-approved proof catalog only | GM revert config version |
| Suppress proof node if media asset `ready=false` | Knowledge Library gate | Manual override |
| Route lead to finance queue when `financing_interest` + DRM ≥ threshold | No credit promises | Finance manager reassign |
| SLA alert → WhatsApp fallback queue | No customer-facing lie about human wait | Ops supervisor |
| Flag stale cuota band for human update | AI stops quoting stale range | Auto-escalate, not auto-quote |
| Prioritize content debt in weekly report | Ranking only, not production | Marketing owns execution |
| Experiment allocation 90/10 holdout | Ethics board max 10% holdout | GM disables experiment |
| Nurture template selection from objection state | Pre-approved templates only | Marketing legal list |

### Recommendation-only zone (amber — Executive Recommendation Engine)

| Decision | Automation level |
|----------|------------------|
| Campaign budget shift | Recommend ±%; GM approves |
| Saturday staffing increase | Recommend +1 consultant; director approves |
| Promote objection to taxonomy vNext | Propose merge; sales director approves |
| Discount authority escalation | Never auto — surface probability only |

### Forbidden automation zone (red)

| Decision | Why |
|----------|-----|
| Final price or discount | Legal, margin, negotiation |
| Financing approval language | Regulatory |
| Firing or commission penalties | Labor, gaming risk |
| Public competitive claims not in Knowledge Library | Legal, brand |
| Autonomous close without human on high-ticket | Trust culture (Bolivia) |
| Customer PII retention extension | Consent law |

**CEO lens:** Safe automation earns trust by being **boring, bounded, and reversible**. The moment the system auto-discounts to hit month-end, the self-improving loop becomes a **self-destructing margin loop**.

---

## 5. What assumptions would break at 10,000 customers?

FUTURE_STATE assumes Santa Cruz pilot scale. At **10,000 active customer graphs** (not 10,000 sessions — a harder number):

| Assumption | Breaks because | Symptom |
|------------|----------------|---------|
| **Phone as primary identity key** | Collisions, family shared phones, WhatsApp Business API limits | Duplicate graphs, wrong PCM recall |
| **Synchronous RTR <2.5s** | Event volume, LLM latency, graph fan-out | Kiosk feels broken |
| **Weekly batch learning on single warehouse** | Join complexity, late CRM updates | Stale Monday report |
| **Manual Knowledge Library updates** | 10k customers expose edge-case questions faster | Grounding fail spike |
| **8-type objection taxonomy** | Long tail of compound objections | OPE confidence collapses |
| **Single dealership staffing model** | SLA math does not generalize | False alerts or missed breaches |
| **Consent = binary** | Retention policies, deletion requests, cross-border | Legal exposure |
| **All learning from one market** | Santa Cruz ≠ La Paz ≠ Cochabamba | Wrong proof ranking exported |
| **CRM as sync destination** | Zoho rate limits, conflict resolution | Lost outcome labels |
| **Flat event taxonomy** | Storage cost, query cost | Analytics bankruptcy |
| **No identity resolution service** | Spouse, return visit, kiosk, WhatsApp fragments | Attribution chaos |
| **Rule-heavy SIE** | Edge cases outnumber rules | Maintenance cliff |
| **Investor metrics from one location** | N=1 growth story | PE discount |
| **10% weekly config changes** | Overfitting noise at higher N | Conversion volatility |

**Scale law:** At 10k customers, the product is no longer a reasoning engine — it is a **data platform with SLAs**. FUTURE_STATE acknowledges multi-tenant schema but not **identity resolution**, **event lake economics**, or **federated learning across tenants**.

**Architect's redesign implication (structural, not feature):** Customer Graph must become **event-sourced**; learning must become **cohort-based with minimum-N gates**; MkIE must externalize market shocks before internal proof ranks move.

---

## 6. What data should become mandatory to collect?

"Mandatory" means: **no lead enters CRM, no deal closes, no config learning runs** without these fields.

### Mandatory at capture (hard gate)

| Field | Why mandatory |
|-------|---------------|
| `sessionId` | All joins |
| `channel` | Attribution |
| `timestamp` | Sequencing |
| `consent_version` | Legal |
| `product_sku` | Portfolio learning |
| `location_id` | Multi-site |
| At least one identity: `phone` OR `crmContactId` OR `resumeToken` | Graph existence |

### Mandatory at intent (lead created)

| Field | Why mandatory |
|-------|---------------|
| `lead_type` | OIE routing |
| `discovery_slots` (minimum: `concern`, `co_decision`) | SIE cohorts |
| `assisted_channels[]` | Attribution |
| `copilot_available` (bool) | Causal copilot studies |

### Mandatory at outcome (deal closed or lost — CRM hard gate)

| Field | Why mandatory |
|-------|---------------|
| `outcome` | won \| lost \| open |
| `lost_reason_code` (enum, required if lost) | Learning integrity |
| `primary_objection_at_close` | OPE validation |
| `test_drive_completed` (bool) | Vanity metric correction |
| `days_to_close` | Velocity learning |
| `gross_margin` (if won) | Financial intelligence |
| `assisted_sale` (bool) + `assistance_types[]` | AI ROI proof |
| `consultant_id` | Workforce intelligence |
| `campaign_first_touch` | MIE |

### Mandatory at AI action (governance)

| Field | Why mandatory |
|-------|---------------|
| `reasoningSnapshotId` | Explainability |
| `knowledgeRefs[]` | Anti-hallucination audit |
| `nextBestAction` + `alternativesConsidered` | Override learning |

### Mandatory at ops events

| Field | Why mandatory |
|-------|---------------|
| `sla_clock_start/end` | OIE |
| `inventory_state_at_recommendation` | OIE accuracy |
| `no_show` (bool) for scheduled drives | CI calibration |

**Dealership owner lens:** Mandatory data feels like bureaucracy until the first month consultants **stop re-asking** what the kiosk already learned. Then it is **time savings**. Until then, enforce at CRM close — not at kiosk greet.

---

## 7. What competitive advantages become impossible for competitors to copy?

**Copyable in 12–18 months (commodity):**

- Conversational UI, voice kiosk, chatbot  
- Compare tables, FAQ content, persona voices  
- LLM vendor choice, STT/TTS  
- Generic lead scoring, dashboards  
- WhatsApp integration  

**Impossible or extremely costly to copy (structural moat):**

| Moat | Why it compounds | Copy barrier |
|------|------------------|--------------|
| **Outcome-labeled objection → proof graph** | Every closed deal refines which proof resolves which fear for which cohort | Requires years of CRM-disciplined labels + cultural tuning |
| **Bolivia high-trust purchase ontology** | Spouse co-decision, Chinese-brand anxiety, WhatsApp-native nurture — not US automotive playbooks | Domain expertise embedded in taxonomy, not prompts |
| **Closed-loop revenue attribution** | session → campaign → copilot → consultant → margin | Competitors measure leads; you measure **assisted gross profit** |
| **Consultant-AI hybrid operating system** | Copilot is embedded in floor ritual, not bolt-on SaaS | Requires ops blueprint + change management + staff tablets |
| **Grounded trust architecture with audit trail** | Every claim has `knowledgeRef`; failures are logged | Legal defensibility + OEM confidence |
| **Household decision graph** | Primary buyer + spouse influencer + async permission mode | CRMs track individuals, not **decision units** |
| **Weekly config intelligence with experiment holdouts** | Proof ranks improve with statistical discipline | Most dealers lack data science habit |
| **Cross-tenant anonymized benchmarks (at scale)** | "Trust-anxious families in LATAM close 12% higher with service proof before compare" | Network effect — **only available to platform owner** |
| **Vertical pack replication methodology** | automotive_v1 → real_estate_v1 without rewriting reasoning kernel | Platform architecture, not app clone |

**PE investor lens:** The moat is not AI. The moat is **labeled outcome data tied to a proprietary decision ontology in a high-friction purchase category**. GPT-5 does not give a competitor your **three years of lost-reason codes from Santa Cruz**.

---

## 8. What would make an investor say: *"This is not a dealership system. This is a vertical operating system."*

### The sentence requires evidence, not narrative

| Evidence class | What investor must see |
|----------------|------------------------|
| **Unit economics** | CAC by channel → assisted gross profit per customer graph, not per lead |
| **Compounding** | Proof/objection model measurably improves quarter over quarter |
| **Replicability** | Second location or second vertical live with config pack, <90 day deploy |
| **Network optionality** | Anonymized benchmark product teased or piloted |
| **API boundary** | Third party can invoke `reason(customerContext) → nextBestAction` without Viaggio UI |
| **Human-in-the-loop economics** | Copilot increases consultant productivity 20%+ — labor leverage story |
| **Data ownership** | Viaggio owns customer graph + ontology; not renter of Zoho fields |
| **Category language** | "Considered purchase OS" — auto, RE, insurance, education share same engines |

### Investor quote triggers (specific)

1. **"They don't sell software to dealers — they operate the intelligence layer of considered purchase."**  
   Trigger: MkIE + CoIE + CIP as platform P&L line, not IT project.

2. **"The learning loop is in the financial statements."**  
   Trigger: Documented lift in close rate / margin from weekly intelligence, audited cohort.

3. **"Deployment is configuration, not custom build."**  
   Trigger: Vertical pack #2 live.

4. **"Data moat widens with every lost deal labeled."**  
   Trigger: 50k+ outcome-labeled interactions; taxonomy version history.

5. **"This is Stripe for high-trust sales — rails + intelligence + compliance."**  
   Trigger: API + governance + Knowledge Library as hosted product.

**What would NOT convince:** Better kiosk, Carlos FAQ, demo walkthrough, architecture PDF without CRM join rates above 95%.

---

# Part 2 — Self-Improving Company Architecture

## 2.1 Full stack (category-defining)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE RECOMMENDATION ENGINE (ERE)                    │
│   Bounded decisions · Exception routing · Approval workflows              │
└─────────────────────────────────┬────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────────────┐
│                    COMPANY INTELLIGENCE ENGINE (CoIE)                     │
│   Ritual compliance · Label quality · Incentive alignment · Maturity score │
└─────────────────────────────────┬────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────────────┐
│                    MARKET INTELLIGENCE ENGINE (MkIE)                      │
│   Competitor · Seasonality · OEM · Macro · Category demand                │
└─────────────────────────────────┬────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────────────┐
│              CUSTOMER INTELLIGENCE PLATFORM (FUTURE_STATE)                │
│              CIE · SIE · MIE · OIE · EIE                                  │
└─────────────────────────────────┬────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼────────────────────────────────────────┐
│                    TRUST & GOVERNANCE FABRIC (cross-cut)                  │
│   Anti-hallucination · Explainability · Human override · Data governance  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Self-improvement flywheel:**

```
Customer interaction
    → Outcome labeled in CRM
        → Weekly CompanyLearningReport
            → ERE proposes bounded changes
                → CoIE verifies ritual + data quality
                    → MkIE adjusts for external shocks
                        → CIP config vN+1 deployed
                            → Measured lift next week
```

---

# Part 3 — Company Intelligence Engine (CoIE)

**Mission:** The company learns **how well it learns**.

| Function | Measures | Acts on |
|----------|----------|---------|
| **Data quality score** | % mandatory fields complete | Block learning if below threshold |
| **Label integrity** | Lost reason anomalies, time-to-close outliers | Flag consultant gaming |
| **Ritual compliance** | Was Monday report reviewed? Config shipped? | CEO exception queue |
| **Capability maturity** | Level 1–10 scorecard vs FUTURE_STATE | Roadmap pressure |
| **Process debt register** | Recurring SLA breaches, manual workarounds | Ops redesign tickets |
| **Incentive alignment index** | Do commissions reward labeling + copilot use? | CoIE recommends comp review |
| **Experiment registry** | Active holdouts, minimum-N status | Prevents premature promotion |

**CoIE is what prevents B4 and B6** from killing the flywheel.

---

# Part 4 — Market Intelligence Engine (MkIE)

**Mission:** Separate **what we did** from **what the market did**.

| Signal class | Examples (Santa Cruz automotive) | Feeds |
|--------------|-----------------------------------|-------|
| **Competitor** | Corolla Cross promo, Toyota 0% rumors | MkIE shock flag → pause proof rank changes |
| **OEM** | GAC policy, warranty change, recall | Knowledge Library urgent validation |
| **Macro** | FX, fuel price, credit tightening | MIE message tone; finance queue priority |
| **Seasonality** | Rainy season, agro income cycles | Staffing recommendations |
| **Category** | SUV share shift, EV narrative | Portfolio strategy (EIE) |

**Without MkIE:** A bad week becomes "AI failed" when Toyota launched a promo. A self-improving company **attributes exogenous variance** before retraining.

---

# Part 5 — Learning Loops (Redesigned)

## 5.1 Four loops (not three)

| Loop | Horizon | Owner system | Output |
|------|---------|--------------|--------|
| **L1 — Interaction** | Real-time | SIE/BIL/ASI | nextBestAction |
| **L2 — Operational** | Daily | OIE + CoIE | SLA fixes, staffing |
| **L3 — Tactical** | Weekly | CIP + ERE | Config vN+1 proposals |
| **L4 — Strategic** | Quarterly | MkIE + EIE + CoIE | Taxonomy, vertical, portfolio |

## 5.2 Weekly loop (machine-first)

```
Sunday 23:00   Auto-generate CompanyLearningReport
Monday 07:00   ERE surfaces ≤5 decisions requiring approval
Monday 09:00   30-min exception review (not data review)
Wednesday      Floor: override taxonomy tags only
Friday 17:00   Ship approved config if CoIE data quality ≥ threshold
```

## 5.3 Minimum-N gates (10k-customer survival)

| Change type | Minimum sample | Rule |
|-------------|----------------|------|
| Proof rank ±5% | 200 comparable outcomes | Else hold |
| Objection taxonomy edit | 50 labeled examples | Human approval |
| Campaign budget recommend | 2 weeks + 30 conversions | Amber zone |
| Copilot threshold | 100 copilot-on vs 100 off | A/B or matched cohort |

---

# Part 6 — Executive Recommendation Engine (ERE)

**Mission:** Convert learning into **bounded, explainable, approvable** executive actions.

```yaml
executiveRecommendation:
  id: rec_2026_w24_budget_meta
  type: campaign_budget_shift
  recommendation: "Reduce Meta 12%, increase radio QR 8% based on assisted sale efficiency"
  evidence:
    - metric: assisted_GP_per_dollar
    - meta: 0.34
    - radio: 0.61
    - cohort_weeks: 8
    - mkie_shock_flags: none
  confidence: 0.72
  automationZone: amber
  approver: GM
  expiresAt: 2026-06-20
  ifApproved: mie.config.campaign_weights@v14
  ifRejected: log_reason_required
```

**ERE never executes red-zone decisions.** It produces **decision packets**, not authority.

---

# Part 7 — Anti-Hallucination Safeguards

Extends FUTURE_STATE §4 with **company-level** enforcement.

| Layer | Safeguard |
|-------|-----------|
| **Knowledge** | No `knowledgeRef` → no claim |
| **Version** | Stale version → block quote, escalate |
| **Dual validation** | Rule engine approves LLM phrasing before speak |
| **Customer-visible disclaimer** | Financing, compare, promotions — template suffix required |
| **Post-hoc audit** | 5% session sample human review weekly |
| **Failure budget** | Grounding fail rate >2% → auto-disable voice channel (GM re-enable) |
| **CoIE accountability** | Named owner per Knowledge domain; staleness in CEO report |

**Investor requirement:** Hallucination rate and remediation SLA in quarterly board pack.

---

# Part 8 — Explainability Framework

### Three audiences, three formats

| Audience | Format | Content |
|----------|--------|---------|
| **Customer** | Plain language | Why this proof now (optional "¿Por qué?" on kiosk) |
| **Consultant** | Copilot card + expand | Snapshot, sources, avoid topics, confidence |
| **Executive / Investor** | Decision packet | Cohort evidence, lift, MkIE context, config diff |

### Explainability invariants

1. Every automated action has `reasoningSnapshotId`  
2. Every weekly config change has `before/after` + `expected_lift` + `review_date`  
3. Every investor metric defines numerator, denominator, exclusion rules  
4. **No black-box score in comp decisions** — consultant performance uses observable behaviors  

---

# Part 9 — Human Override Framework

Extends FUTURE_STATE §6.3 with **organizational** rules.

| Principle | Rule |
|-----------|------|
| **Override is signal, not failure** | Rejections feed L3 learning |
| **Override must be typed** | Enum: wrong_proof, wrong_tone, customer_ready, fact_wrong, prefer_human |
| **Override cannot be silent** | Untyped override discarded from learning |
| **Supervisor review** | >20% override rate per consultant → coaching, not punishment |
| **Customer override** | "No es correcto" → slot correction + governance log |
| **Emergency** | GM `governance.ai_disabled` — logged, triggers CoIE incident |

**Dealership owner:** Override framework protects staff **and** trains the system. Punishing overrides teaches consultants to hide disagreement — **death of self-improvement**.

---

# Part 10 — Data Governance

| Domain | Policy |
|--------|--------|
| **Ownership** | CIE owns customer graph; CRM owns deal record; CoIE owns label quality |
| **Retention** | 24 months default; deletion on request within 30 days |
| **Minimization** | Collect mandatory set only; no "nice to have" PII |
| **Access** | Role-based: consultant sees narrative summary, not full event lake |
| **Lineage** | session → lead → deal → outcome — auditable chain |
| **Quality SLA** | 95% outcome label completeness within 48 hr of close |
| **Cross-tenant** | Anonymized aggregates only; no raw PII in benchmarks |
| **Vendor** | LLM/STT processors: no training on Viaggio data (contractual) |

---

# Part 11 — Trust Architecture

Trust is not a feature. It is **layered assurance**:

```
Layer 4: Brand promise      ("Viaggio is honest about Toyota reventa")
Layer 3: Operational truth  (inventory, SLA, human available)
Layer 2: AI grounding        (knowledgeRef, version, audit)
Layer 1: Data respect        (consent, idle reset, deletion)
```

| Stakeholder | Trust metric |
|-------------|--------------|
| Customer | Session "felt understood" survey + override rate low |
| Consultant | Copilot accuracy rating weekly |
| GM | Assisted close rate ↑ without margin ↓ |
| Investor | Label completeness + grounding fail <2% |
| OEM | Knowledge Library approval log |
| Regulator | Financing disclaimer compliance 100% |

**Trust failure cascade:** One viral "AI lied about cuota" event destroys more value than six months of engineering. Anti-hallucination is **revenue infrastructure**.

---

# Part 12 — Competitive Moat Analysis

## 12.1 Moat durability matrix

| Asset | Durability | Depends on |
|-------|------------|------------|
| Objection-proof outcome graph | **Very high** | CRM discipline, time, CoIE |
| Bolivia decision ontology | **High** | Domain expertise, not LLM |
| Closed-loop margin attribution | **High** | Financial intelligence integration |
| Consultant hybrid ops | **Medium-high** | Change management |
| Voice/conversation UX | **Low** | Commoditizing |
| Compare content | **Low** | Copyable |
| Knowledge Library (public specs) | **Low** | OEM public data |
| Network benchmarks | **Very high (at scale)** | Multi-tenant, MkIE |

## 12.2 What competitors will try

| Competitor move | Viaggio defense |
|-----------------|-----------------|
| GAC ships global digital showroom | Viaggio owns **local trust + ops + labeled outcomes** |
| CRM adds "AI lead score" | Viaggio owns **proof graph + household + assisted margin** |
| Agency builds WhatsApp bot | Viaggio owns **PCM + objection ledger + CRM join** |
| US SaaS enters LATAM | Viaggio owns **ontology + Spanish trust culture + floor ritual** |

## 12.3 Moat-killing mistakes (self-inflicted)

1. Skip outcome labels → no learning → no moat  
2. Rent intelligence from LLM vendor → no proprietary graph  
3. Sell kiosk without platform → commodity hardware story  
4. Franchise data to OEM without owning graph → lose asset  
5. Optimize test drives, not gross profit → wrong optimization target  

---

# Part 13 — Challenge Assumptions (Extended)

| # | FUTURE_STATE assumption | Challenge | Redesign |
|---|-------------------------|-----------|----------|
| 1 | Five engines sufficient | Company and market are not optional at scale | CoIE + MkIE |
| 2 | Weekly meeting drives learning | Meetings cancel | Machine-generated CompanyLearningReport |
| 3 | Config CI/CD is learning | Without holdouts, it is superstition | Minimum-N + experiment registry |
| 4 | EIE satisfies executives | EIE reports; ERE decides | Split reporting from recommendation |
| 5 | Platform replicates with tenant YAML | Ops ritual and label discipline do not replicate in YAML | CoIE maturity gate per deploy |
| 6 | WhatsApp is a channel | WhatsApp is **identity + CRM** in Bolivia | Phone mandatory, not optional |
| 7 | Consultants will use copilot | Adoption is incentive problem | CoIE alignment index |
| 8 | AI is the product | **Labeled outcome graph** is the product | Investor narrative fix |
| 9 | Level 10 = ASIP licensing | Level 10 = **compounding margin per graph** | Success metric fix |
| 10 | Dealership is first customer | Dealership is **first laboratory** | Category OS framing |

---

# Part 14 — Five-Year Evolution Roadmap

**Theme:** From **intelligent dealership** → **self-improving company** → **vertical operating system**

| Year | Stage | Organizational capability | Platform capability | Proof to investor |
|------|-------|-------------------------|---------------------|-----------------|
| **Y1** | Connected laboratory | CRM mandatory labels; Monday ritual machine-generated; copilot on floor | CIP P0–P1: CRM, OIE, EIE v1 | 95% join rate session→outcome |
| **Y2** | Adaptive operator | CoIE live; data quality gates; experiment holdouts | CIP P2–P3: ASI, CSI, PCM | Documented copilot lift + proof rank lift |
| **Y3** | Learning company | ERE amber automation; MkIE competitor shocks; margin in graph | CIP P4; weekly config CI/CD | Quarter-over-quarter assisted margin ↑ |
| **Y4** | Multi-node network | 3+ locations or 2nd vertical; federated learning | Vertical pack #2; tenant isolation | Deploy <90 days; same ontology kernel |
| **Y5** | Vertical OS | API revenue line; anonymized benchmarks product; partner OEMs on Knowledge rails | ASIP: reason API, governance hosted | "Stripe for considered purchase" metrics |

```
Y1: Truth loop closed
Y2: Learning loop disciplined
Y3: Executive loop automated (bounded)
Y4: Network loop begins
Y5: Platform loop monetized
```

---

# Part 15 — Definition of Self-Improving Company (Level 10)

> A **self-improving company** at Level 10 is one where Viaggio's **weekly gross profit per assisted customer graph** measurably increases over trailing quarters — and the organization can **name which intelligence changes caused the lift**, **which market shocks were excluded**, and **which executive decisions were machine-recommended vs human-approved**.

### Level 10 checklist (organizational + platform)

| # | Criterion |
|---|-----------|
| 1 | ≥95% deals have complete mandatory outcome data within 48 hours |
| 2 | CompanyLearningReport generates without human data prep |
| 3 | CoIE data quality gate blocks bad learning automatically |
| 4 | MkIE flags exogenous shocks before config changes ship |
| 5 | ERE decision packets reviewed weekly; ≥60% approved or explicitly rejected with reason |
| 6 | Proof rank changes show statistically gated lift |
| 7 | Assisted gross margin attributable by channel and copilot |
| 8 | Second node deployed via config pack with CoIE maturity ≥8 |
| 9 | Grounding fail rate <2% with published remediation SLA |
| 10 | Investor can audit config version history tied to financial outcomes |

### The investor sentence (earned)

*"Viaggio operates a vertical intelligence layer for considered purchase — automotive first — where every customer interaction compounds into a proprietary outcome graph, weekly organizational learning, and bounded executive automation. Dealership is deployment. The asset is the operating system."*

---

# Part 16 — Relationship to FUTURE_STATE_ARCHITECTURE

| FUTURE_STATE component | This blueprint extends |
|------------------------|------------------------|
| CIE · SIE · MIE · OIE · EIE | Adds CoIE, MkIE, ERE above |
| Weekly learning (§5) | Machine-first + minimum-N gates |
| AI guardrails (§4) | Company-level anti-hallucination budget |
| Dashboards (§7) | ERE decision packets vs reporting only |
| Risks (§9) | Organizational blockers B1–B14 |
| Level 10 (§13) | Self-improving **company** definition |

**No new customer features.** New **organizational and meta-intelligence** structure to make FUTURE_STATE compound.

---

# Part 17 — Closing Thesis (CEO + PE)

FUTURE_STATE_ARCHITECTURE answers: **What should the platform do?**

This blueprint answers: **What must the company become so the platform improves itself?**

The difference is:

- **CRM discipline** over demo intelligence  
- **CoIE** over hope that consultants label honestly  
- **MkIE** over mistaking Toyota promos for AI failure  
- **ERE** over dashboards that nobody acts on  
- **Mandatory data** over optional enrichment  
- **Moat in labeled outcomes** over moat in ChatGPT wrappers  

Viaggio does not become a self-improving company when the kiosk gets smarter.  
It becomes one when **every lost sale makes next week's system statistically more profitable** — and executives can prove it in the board deck.

**That is a vertical operating system. That is the investment story.**

---

*End of Self-Improving Company Blueprint v1.0*
