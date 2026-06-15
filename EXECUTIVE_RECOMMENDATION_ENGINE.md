# Executive Recommendation Engine (ERE) — Intelligence Specification

**Version:** 1.0  
**Date:** 14 June 2026  
**Codename:** ERE  
**Sits between:** Intelligence estate (SCDG · DNA engines · MkIE · CoIE) and [Executive Copilot](./EXECUTIVE_COPILOT.md)  
**Builds on:** [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) · [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md)  
**Constraint:** Intelligence architecture only — no software, UI, databases, or APIs  

---

# 1. Purpose

## 1.1 Why ERE exists

Viaggio accumulates intelligence faster than executives can absorb it.

The Santa Cruz Decision Graph grows weekly. Customer DNA clusters shift. Salesperson DNA affinities refine. Marketing DNA exposes acquisition drift. MkIE registers market shocks. CoIE measures whether the organization is capable of learning at all.

**Raw graph intelligence is not executive-actionable.** It is:

- Too granular (thousands of edge weight deltas)  
- Too correlational (confounded by staffing, season, competitor promos)  
- Too noisy (small samples, incomplete labels)  
- Too distributed (no single ranking of what matters *now*)  

**ERE exists to convert organizational learning into ranked executive actions** — a curated, evidence-gated, feasibility-adjusted set of proposals that the Executive Copilot can present for human approval.

## 1.2 What ERE is

ERE is the **organizational reasoning layer** — the intelligence that answers:

> *Given everything we learned this week, what are the highest expected-value actions ownership should consider — and in what order?*

ERE **proposes**. It does **not** decide.

## 1.3 What ERE is not

| ERE is not | Why |
|------------|-----|
| Executive Copilot | Copilot is the **interface** to humans; ERE is the **ranking engine** behind it |
| EIE (reporting) | EIE describes the past; ERE optimizes the future |
| SIE (sales reasoning) | SIE reasons per customer turn; ERE reasons per organization week |
| Dashboard | Dashboards display; ERE ranks |
| Autonomous executive | Authority remains human; ERE has no execution mandate |

## 1.4 Constitutional rule

**Executive Copilot must never consume raw graph intelligence directly.**

All Copilot decision packets originate from ERE-ranked `recommendation` objects. Graph diffs, DNA anomalies, and MkIE shocks enter Copilot **only** after ERE filtering, ranking, and evidence gating.

```
Intelligence estate  →  ERE (rank + gate)  →  Executive Copilot (present)  →  Human decision
```

---

# 2. Position in Architecture

## 2.1 Intelligence flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         INTELLIGENCE SOURCES (inputs)                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ SCDG         │  │ Customer DNA │  │ Salesperson  │  │ Marketing    │ │
│  │ weekly diff  │  │ cluster shift│  │ DNA lift     │  │ DNA drift    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                 │                 │                 │         │
│  ┌──────┴───────┐  ┌──────┴──────────────────────────────────┴───────┐  │
│  │ MkIE         │  │ CoIE                                              │  │
│  │ shock flags  │  │ data quality · ritual · experiment registry     │  │
│  └──────┬───────┘  └──────┬──────────────────────────────────────────┘  │
│         │                 │                                              │
└─────────┼─────────────────┼──────────────────────────────────────────────┘
          │                 │
          └────────┬────────┘
                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                         │
│                                                                          │
│   Observe → Infer → Gate evidence → Rank by EV → Emit recommendations    │
│                                                                          │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              EXECUTIVE COPILOT                                             │
│   Materiality filter · ≤5 packets · green/amber/red zones · presentation │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              HUMAN DECISIONS                                               │
│   Approve · Reject (reason) · Defer · Veto green auto-execute            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              ORGANIZATIONAL LEARNING LOOP                                  │
│   Deployment → outcome → ERE score update → next cycle                     │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2.2 Input responsibilities

| Source | What ERE consumes |
|--------|-------------------|
| **SCDG** | Edge weight deltas, path length changes, new compound objections, holdout results |
| **Customer DNA** | Cluster mix shift, emerging cohorts, affinity confidence changes |
| **Salesperson DNA** | Lift anomalies, coaching gaps, match opportunities, override patterns |
| **Marketing DNA** | Genotype drift, CAC/GP efficiency, entry-path mismatch |
| **MkIE** | Active shock flags, exogenous variance adjustments |
| **CoIE** | Data quality gate, label completeness, experiment status, ritual compliance |

## 2.3 Output responsibility

ERE emits a **ranked recommendation set** per cycle (typically weekly batch + optional daily micro-batch for MkIE-critical shocks). Executive Copilot selects ≤5 for human attention.

---

# 3. Recommendation Object

Every ERE output is a typed `recommendation` — the atomic unit of organizational action proposal.

```yaml
recommendation:
  id: string                      # unique, immutable
  source: enum                    # scdg | customer_dna | salesperson_dna | marketing_dna | mkie | coie | composite
  confidence: float               # 0-1; P(that inference is correct)
  expected_margin_impact:         # assisted gross profit, not revenue volume
    point_estimate: float         # currency or % lift on assisted GP
    confidence_interval: [low, high]
    horizon_days: int             # over which impact expected
    reach: int                    # customers/sessions/deals affected in horizon
  evidence_quality: float         # 0-1; composite of gates passed (§6)
  operational_feasibility: float    # 0-1; can org execute this week?
  strategic_risk: float           # 0-1; brand, legal, OEM, margin, political
  recommendation_type: enum       # see §4
  automation_zone: green | amber | red
  expiry: timestamp               # recommendation stale after
  supporting_assets:
    scdg_edges: [edge_id]
    customer_dna_clusters: [cluster_id]
    salesperson_dna_ids: [dna_id]
    marketing_dna_ids: [dna_id]
    mkie_shock_ids: [shock_id]
    coie_gates: [gate_id]
    ontology_version: string
    experiment_id: string?
    holdout_status: passed | failed | not_required | pending
  narrative:
    situation: string             # what changed
    inference: string             # what we believe it means
    proposed_action: string       # what to do
    alternatives_considered: [recommendation_id]
  ranking:
    expected_value: float         # computed score (§5)
    rank: int                     # 1 = highest this cycle
    materiality: float            # 0-100 for Copilot filter
```

### Field semantics

| Field | Meaning |
|-------|---------|
| `confidence` | Belief that the **inference** linking situation to action is correct |
| `expected_margin_impact` | **Primary objective function** — assisted gross profit lift |
| `evidence_quality` | Strength of data behind the proposal — independent of confidence in execution |
| `operational_feasibility` | Staffing, inventory, budget authority, ritual readiness |
| `strategic_risk` | Downside if wrong — reputational, legal, OEM, organizational |
| `expiry` | Recommendations decay; stale graph state invalidates proposal |

**Invariant:** No recommendation ships without `supporting_assets` populated for its `source`.

---

# 4. Recommendation Categories

ERE generates proposals only within these categories. Each maps to intelligence sources and typical automation zones.

## 4.1 Graph Optimization

**Source:** SCDG  
**Purpose:** Adjust path topology — edge promotion, sequence reordering, compression gates.  
**Example:** Promote `[faq_china → viaggio_service → compare_corolla]` for Trust-Anxious cluster.  
**Typical zone:** Green (bounded rank change) or Amber (sequence change).

## 4.2 Proof Promotion

**Source:** SCDG + Customer DNA  
**Purpose:** Elevate proof node or edge with holdout-validated lift.  
**Example:** Elevate `family_safety` for family-protective phenotype.  
**Typical zone:** Green if within ±10% rank; Amber if cluster-specific.

## 4.3 Proof Demotion

**Source:** SCDG + Override corpus  
**Purpose:** Suppress proof correlated with loss or high consultant override rejection.  
**Example:** Demote `heritage_lecture` for overwhelmed DNA.  
**Typical zone:** Green.

## 4.4 Customer DNA Discovery

**Source:** Customer DNA  
**Purpose:** New or splitting cluster detected; ontology or routing implication.  
**Example:** Emergent compound cluster `china_brand + payment` — propose CPO merge.  
**Typical zone:** Amber (ontology change).

## 4.5 Salesperson Coaching

**Source:** Salesperson DNA + CoIE  
**Purpose:** Match, skill gap, or override discipline — **coaching**, not discipline automation.  
**Example:** Route permission-blocked pipeline coaching to consultant with +18% lift on cluster.  
**Typical zone:** Amber.

## 4.6 Marketing Budget Shift

**Source:** Marketing DNA + MkIE  
**Purpose:** Reallocate spend toward channels/creatives with superior acquired genotype and assisted GP/dollar.  
**Example:** −12% Meta, +8% radio QR — genotype drift toward Trust-Anxious at lower CAC.  
**Typical zone:** Amber. **Never green** above materiality threshold.

## 4.7 Inventory Recommendation

**Source:** SCDG + OIE signals (via CoIE) + Customer DNA demand mix  
**Purpose:** Acquisition or allocation guidance — **recommend only**.  
**Example:** Aging white unit + high demand in cluster → prioritize demo assignment.  
**Typical zone:** Red (capital decision) or Amber (operational reallocation).

## 4.8 Operational Staffing

**Source:** CoIE + MkIE + session forecast  
**Purpose:** Floor coverage, SLA prevention, coordinator capacity.  
**Example:** Saturday session forecast + historical SLA breach → +1 consultant 14:00–18:00.  
**Typical zone:** Amber.

## 4.9 Ontology Evolution

**Source:** SCDG + Customer DNA + Override corpus  
**Purpose:** Taxonomy merge, split, or new objection type — CPO version increment.  
**Example:** Formalize `permission_delayed_async` as seeking-mode sub-type.  
**Typical zone:** Amber; requires sales director + CoIE sign-off in Copilot.

## 4.10 Executive Escalation

**Source:** CoIE + MkIE + Trust fabric  
**Purpose:** Intelligence system or organizational integrity at risk — **act before optimize**.  
**Example:** Data quality gate fail — freeze learning recommendations; enforce label completeness.  
**Example:** Grounding fail rate >2% — disable voice channel pending Knowledge review.  
**Typical zone:** Green for safety blocks; Amber for process enforcement.

## 4.11 Strategic Opportunities

**Source:** Composite (EIE margin + MkIE + DNA trends)  
**Purpose:** Multi-week, high-impact moves — second node, vertical, partnership.  
**Example:** Compare-first genotype rising market-wide → pre-build compare proof pack for La Paz layer.  
**Typical zone:** Red — board queue only.

---

# 5. Ranking Model

## 5.1 Expected value (primary rank)

ERE ranks recommendations by **Expected Value (EV)** — organizational margin impact, not customer engagement.

```
EV =
  P(success)
× Expected_Margin_Lift
× Reach
```

| Term | Definition |
|------|------------|
| `P(success)` | Probability the proposed action achieves intended outcome if approved and deployed — derived from holdout history, cohort similarity, and `confidence` |
| `Expected_Margin_Lift` | Expected change in **assisted gross profit** per affected unit or aggregate over `horizon_days` |
| `Reach` | Count of sessions, customers, deals, or spend units affected within horizon |

**Example (intuition):**

```
Proof promotion for Trust-Anxious cluster:
  P(success) = 0.72
  Expected_Margin_Lift = $420 per assisted path
  Reach = 38 paths/week
  EV = 0.72 × 420 × 38 = $11,491 equivalent weekly
```

## 5.2 Adjustment multipliers

Raw EV is insufficient. ERE applies multiplicative adjustments:

```
Adjusted_EV =
  EV
× Operational_Feasibility
× Evidence_Quality
× (1 − Strategic_Risk)
× MkIE_Shock_Discount
```

| Multiplier | Range | Effect |
|------------|-------|--------|
| `Operational_Feasibility` | 0–1 | Zero if cannot execute — recommendation suppressed |
| `Evidence_Quality` | 0–1 | Down-ranks weak evidence even if raw EV high |
| `(1 − Strategic_Risk)` | 0–1 | High brand/legal risk reduces rank |
| `MkIE_Shock_Discount` | 0–1 | Active shock → discount graph-derived recommendations until confound cleared |

## 5.3 Tie-breaking rules

When `Adjusted_EV` within 5%:

1. Prefer **Executive Escalation** if CoIE data quality gate failed  
2. Prefer higher `evidence_quality`  
3. Prefer lower `strategic_risk`  
4. Prefer shorter `horizon_days` (faster feedback to learning loop)  
5. Prefer categories with stronger historical approval→lift calibration  

## 5.4 Suppression rules

ERE **does not emit** recommendations when:

| Condition | Result |
|-----------|--------|
| `evidence_quality` < minimum threshold (§6) | Suppress |
| `Operational_Feasibility` < 0.2 | Suppress |
| CoIE data quality gate = **fail** | Only Executive Escalation + data-fix categories |
| MkIE shock active + graph-derived | Hold graph optimization until shock window ends |
| Duplicate action deployed <4 weeks without outcome | Suppress re-proposal |
| `Reach` below minimum materiality | Defer to EIE, not Copilot |

## 5.5 Materiality filter (handoff to Copilot)

Executive Copilot receives recommendations with `materiality ≥ threshold` and `rank ≤ 20`. Copilot applies **≤5 packet cap** — ERE does not cap; Copilot curates presentation.

---

# 6. Evidence Requirements

ERE **cannot propose** actions unless evidence passes applicable gates. `evidence_quality` is the fraction of required gates passed.

## 6.1 Universal gates (all categories)

| Gate | Requirement |
|------|-------------|
| **G-01 Outcome join** | Supporting paths have `sessionId → outcome` join rate ≥ CoIE threshold |
| **G-02 Lineage** | `ontology_version` and `scdg_edges` or DNA IDs cited |
| **G-03 MkIE check** | Active shocks declared or explicitly absent |
| **G-04 Expiry set** | Recommendation has valid `expiry` |

## 6.2 Category-specific gates

| Category | Additional gates |
|----------|------------------|
| Graph Optimization, Proof Promotion/Demotion | **Minimum-N** (§6.3), **holdout** (§6.4) if rank change >5% |
| Customer DNA Discovery | ≥50 labeled paths in emergent cluster |
| Salesperson Coaching | ≥30 assisted outcomes per consultant-cluster pair |
| Marketing Budget Shift | ≥8 weeks spend + outcome data; assisted GP/dollar computed |
| Inventory, Strategic | Human feasibility review flag from CoIE |
| Ontology Evolution | Override corpus ≥10 examples OR graph edge evidence ≥100 |

## 6.3 Minimum-N

| Action magnitude | Minimum labeled outcomes |
|------------------|--------------------------|
| Cluster-specific proof change | 200 comparable paths |
| Global proof rank ±5% | 500 paths |
| Consultant-cluster lift claim | 30 assisted outcomes |
| Marketing channel shift | 30 conversions + 8 weeks |
| Ontology merge/split | 50 paths exhibiting compound pattern |

Below minimum-N: recommendation **suppressed** or downgraded to `Strategic Opportunities` with `holdout_status: pending`.

## 6.4 Holdout validation

For Proof Promotion and material Graph Optimization:

```
Lift_holdout = P(won | treatment path) − P(won | holdout path)
```

| Result | ERE behavior |
|--------|--------------|
| `Lift_holdout` > threshold AND significant | `holdout_status: passed`; eligible for green zone |
| `Lift_holdout` ≤ 0 | **Suppress** promotion |
| Holdout running | `pending`; amber max |

CoIE experiment registry owns holdout design. ERE consumes status; does not design experiments.

## 6.5 Confidence intervals

`expected_margin_impact.confidence_interval` required for:

- Marketing Budget Shift  
- Graph Optimization affecting >1 cluster  
- Strategic Opportunities  

Wide interval (>50% relative width) → `strategic_risk` ↑, rank ↓.

## 6.6 MkIE shock adjustment

When `mkie_shock_ids` non-empty:

- Graph-derived recommendations: `MkIE_Shock_Discount` = 0 unless shock explicitly modeled  
- Marketing recommendations: require shock-adjusted baseline comparison  
- ERE must state in `narrative.inference` whether shock explains observed delta  

**Prevents:** Promoting internal proof during Toyota promo week — false attribution.

## 6.7 Ontology lineage

Any recommendation affecting routing or proof must cite:

- `ontology_version` current  
- Proposed `ontology_version` target (if Ontology Evolution)  
- Diff scope (clusters, objections, seeking modes affected)  

CPO changes without lineage → **suppress**.

---

# 7. Organizational Learning Loop

ERE closes the loop between **executive judgment** and **future ranking quality**.

## 7.1 Action approved

```
Approve (human)
    → Deployment recorded (config version, staffing change, budget shift, etc.)
    → Horizon elapses (horizon_days)
    → Outcome measured (assisted GP Δ, SLA Δ, cluster conversion Δ)
    → Recommendation scored:
        prediction_error = actual_impact − expected_margin_impact.point_estimate
    → ERE calibration update:
        - P(success) prior for this category/source
        - Confidence interval width model
        - Automation zone eligibility
    → Supporting assets linked to Experiment Genealogy (KA-10)
```

**Compounding asset:** Approved recommendations with measured outcomes become **calibration history** — ERE learns how optimistic its proposals were.

## 7.2 Action rejected

```
Reject (human) + reason_enum (required)
    → Reason categories:
        insufficient_evidence
        brand_risk
        operational_impossible
        strategic_misalignment
        political_timing
        prefer_gut
        mkie_context_missed
        other (free text)
    → ERE adjustment:
        - insufficient_evidence → raise minimum-N or evidence_quality bar for similar
        - brand_risk → increase strategic_risk prior for category
        - operational_impossible → OIE feasibility rule; feasibility scorer update
        - mkie_context_missed → MkIE integration weight ↑
        - prefer_gut → no penalty; excluded from calibration
    → Rejection logged in Executive Decision Corpus (intelligence asset)
```

**Key insight:** Rejections are **labeled executive training data**. Without reason capture, ERE cannot improve.

## 7.3 Defer and veto

| Action | ERE learning |
|--------|--------------|
| **Defer** | Re-surface only if new evidence changes `Adjusted_EV` >15% |
| **Veto green auto** | Tighten green criteria; CoIE incident flag |

## 7.4 Weekly cycle integration

```
Sunday 23:00   Intelligence sources emit weekly deltas
Sunday 23:30   ERE batch: observe → infer → gate → rank
Monday 07:00   Executive Copilot delivers top packets
Monday–Friday  Human decisions
Friday 17:00   Deploy approved green + approved amber
Following Sunday   Outcome measurement for prior week deployments
```

---

# 8. Recommendation Lifecycle

Every recommendation traverses eight states:

```
┌─────────────┐
│ OBSERVATION │  Intelligence sources emit signals (graph diff, DNA shift, etc.)
└──────┬──────┘
       ▼
┌─────────────┐
│ INFERENCE   │  ERE links signal to actionable hypothesis
└──────┬──────┘
       ▼
┌─────────────┐
│ PROPOSAL    │  recommendation object created; gates evaluated
└──────┬──────┘
       ▼
┌─────────────┐
│ APPROVAL    │  Executive Copilot → human approve / reject / defer
└──────┬──────┘
       ▼
┌─────────────┐
│ DEPLOYMENT  │  Organizational action executed (bounded zone)
└──────┬──────┘
       ▼
┌─────────────┐
│ OUTCOME     │  Margin, conversion, SLA measured over horizon
└──────┬──────┘
       ▼
┌─────────────┐
│ LEARNING    │  ERE calibration + Experiment Genealogy update
└─────────────┘
```

### State rules

| State | Owner |
|-------|-------|
| Observation | Intelligence estate |
| Inference, Proposal | ERE |
| Approval | Human via Executive Copilot |
| Deployment | Operations / marketing / sales leadership |
| Outcome | CoIE + EIE measurement |
| Learning | ERE + CoIE |

**Terminal states without learning:** Rejected (reason captured), Expired (no approval), Suppressed (failed gates).

---

# 9. Failure Modes

| Failure mode | Description | Detection | Mitigation |
|--------------|-------------|-----------|------------|
| **False correlation** | Edge correlates with won but does not cause | Holdout fail; prediction_error persistent | Suppress promotion; CoIE experiment |
| **Data quality failure** | Labels incomplete; joins broken | CoIE gate fail | Executive Escalation only; freeze graph recs |
| **Market shocks** | External event drives outcomes | MkIE flag; internal recs fail post-shock | MkIE_Shock_Discount; pause graph recs |
| **Overfitting** | Small-N cluster over-optimized | minimum-N breach on review | Bayesian shrinkage; widen CI |
| **Political approval bias** | GM approves only safe/low-EV actions | Approval pattern vs lift correlation | Board review; red-zone queue |
| **Recommendation spam** | Too many proposals; executive fatigue | Copilot cap; low materiality | ERE suppression; raise materiality threshold |
| **Stale deployment** | Action deployed but outcome never measured | Missing outcome after horizon | CoIE ritual enforcement |
| **Gaming** | Consultants inflate labels to shift graph | CoIE anomaly detection | Label audit; Salesperson DNA integrity |
| **Category creep** | ERE proposes red-zone actions as amber | strategic_risk mis-scored | Zone audit in CoIE |
| **Reject without reason** | Learning loop breaks | Empty reason_enum | Copilot hard gate — cannot reject |

---

# 10. Level 11 Maturity

ERE maturity is independent of CIP conversational maturity. A company can have voice AI at L9 and ERE at L6 — **organizational intelligence lags product intelligence**.

| Level | Name | ERE capability |
|-------|------|----------------|
| **L7** | Reporting handoff | Graph diffs summarized manually for executives |
| **L8** | Unranked proposals | Recommendations generated; no EV model |
| **L9** | Ranked proposals | EV ranking; evidence gates; Copilot consumes ERE |
| **L10** | Executive feedback loop | Approve/reject reasons captured; calibration history grows |
| **L11** | **Organizational compounding** | Recommendations **measurably improve** assisted gross profit and decision quality quarter-over-quarter |

### L11 measurable criteria

| # | Criterion |
|---|-----------|
| 1 | ≥60% amber recommendations approved or explicitly rejected with reason |
| 2 | Mean absolute `prediction_error` on margin impact ↓ over trailing 4 quarters |
| 3 | ≥3 holdout-validated proof promotions with documented lift |
| 4 | Rejection corpus ≥200 labeled decisions |
| 5 | MkIE-adjusted reporting — zero quarter with "AI blame" for shock weeks |
| 6 | CoIE data quality gate pass rate ≥90% of weeks |
| 7 | Executive Escalation response SLA met when learning frozen |
| 8 | Experiment Genealogy links ≥80% of deployed graph recommendations to outcomes |

**L11 definition (formal):**

> ERE at Level 11 means the organization's **expected value of approved recommendations** — measured in assisted gross profit — **exceeds the counterfactual** of operating without ERE, with statistical confidence, over a trailing twelve-month period.

---

# 11. Relationship to Moat

See [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md).

## 11.1 Without ERE

| Asset | Fate |
|-------|------|
| SCDG | Becomes **dashboard** — interesting edges, no institutional action |
| Customer DNA | Becomes **segmentation report** — unused in operations |
| Salesperson DNA | Becomes **HR curiosity** — no coaching deployment |
| Marketing DNA | Becomes **attribution deck** — budget stays political |
| MkIE | Becomes **excuse library** — not confound control |
| CoIE | Becomes **compliance checklist** — no feedback into ranking |

**Intelligence accumulates. The company does not improve.**

## 11.2 With ERE

| Asset | Fate |
|-------|------|
| SCDG | **Edges promoted or demoted** — graph compounds |
| Customer DNA | **Clusters drive routing and ontology** |
| Salesperson DNA | **Coaching and match deployed** |
| Marketing DNA | **Budget shifts evidence-gated** |
| MkIE | **Shocks discount false inference** |
| CoIE | **Gates control proposal quality** |

**Intelligence becomes organizational decision.** Decisions become measured outcomes. Outcomes refine the graph. **The flywheel closes.**

## 11.3 ERE as intelligence estate asset (KA-13)

ERE generates a new compounding asset: the **Executive Decision Corpus** — paired recommendations, human judgments, deployed actions, and measured outcomes.

After three years:

- Competitors may copy compare tables  
- They cannot copy **calibrated executive decision history** tied to Santa Cruz Decision Graph edges  

**PE lens:** ERE is what transforms data moat into **operational moat** — the proof that intelligence changes P&L, not just slides.

## 11.4 Category-defining implication

A **vertical operating system** for considered purchase does not ship dashboards to dealers. It ships **ranked organizational actions** with governance — ERE is the kernel of that OS.

Executive Copilot is the human interface.  
**ERE is the reasoning that makes the OS act on its own intelligence.**

---

# Appendix A — Relationship to Adjacent Specs

| Document | Relationship |
|----------|--------------|
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Sole consumer of ERE output for human presentation |
| [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) | Primary SCDG input |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Cluster and affinity input |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | Coaching and match input |
| [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) | Marketing DNA input; stack position |
| [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md) | CoIE gates; weekly ritual |
| FUTURE_STATE EIE | Reporting layer beneath ERE |

---

# Appendix B — Constitutional Invariants

1. ERE **never** executes — only proposes  
2. Executive Copilot **never** ingests raw SCDG diffs  
3. `expected_margin_impact` **always** refers to assisted gross profit unless explicitly strategic-red  
4. Reject without `reason_enum` is **invalid** — no learning  
5. CoIE data quality **fail** freezes all categories except Executive Escalation  
6. MkIE active shock **discounts** graph-derived optimization  
7. Minimum-N **suppresses**, never waives silently  
8. Red-zone categories **never** auto-execute  

---

*End of Executive Recommendation Engine (ERE) — Intelligence Specification v1.0*
