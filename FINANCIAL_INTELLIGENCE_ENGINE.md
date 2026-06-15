# Financial Intelligence Engine (FIE) — Intelligence Specification

**Version:** 1.0  
**Date:** 15 June 2026  
**Asset ID:** KA-07 (Assisted Margin Ledger) · margin truth authority  
**Codename:** CPI-OS financial reasoning layer  
**Builds on:** [INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md](./INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md) · [MARKET_INTELLIGENCE_ENGINE.md](./MARKET_INTELLIGENCE_ENGINE.md) · [COMPANY_INTELLIGENCE_ENGINE.md](./COMPANY_INTELLIGENCE_ENGINE.md) · [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) · [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Feeds:** ERE · Executive Copilot · IBS  
**Constraint:** Intelligence architecture only — not accounting systems, ERP integration, GAAP/IFRS mapping, or ledger software  

---

## Executive Thesis

CPI-OS compounds through **decision paths**, not through revenue volume. Revenue without margin truth is vanity attribution. Margin without intelligence linkage is ungovernable capital.

**FIE** is CPI-OS's **financial reasoning layer**. It answers one question the intelligence estate and executive stack cannot answer alone:

> *What did we actually earn — per unit, per path, per channel, per shock window — and what should capital do next?*

EIE reports what happened. MkIE explains what the market imposed. CoIE audits whether the organization deserved to learn. **FIE establishes whether the economics are true enough to rank, allocate, and compound.**

```
Revenue answers:        "What did we sell?"
Margin truth answers:   "What did we keep — honestly?"
Assisted attribution:   "Which intelligence paths earned it?"
FIE answers:            "Given truth + attribution + shocks, where should the next boliviano go?"
```

---

# 1. Purpose

## 1.1 What FIE is

FIE is the **authoritative financial intelligence layer** of CPI-OS. It defines, validates, and reasons over:

| Domain | FIE question |
|--------|--------------|
| **Margin truth** | What is gross profit per close — after discount bleed, trade-in erosion, and F&I reality? |
| **Assisted Margin Ledger** | Which closes trace to intelligence paths with auditable confidence? |
| **Gross profit attribution** | How does assisted margin flow to graph paths, DNA clusters, consultants, campaigns? |
| **FX economics** | How do MkIE FX shocks pass through to unit margin, carry cost, and spend efficiency? |
| **Budget intelligence** | Which channel/creative/genotype combinations produce assisted GP per dollar — shock-adjusted? |
| **Capital allocation** | Where is capital trapped (inventory, floorplan, waste spend) vs compounding (intelligence paths)? |
| **Carrying cost** | What is the economic drag of aging inventory — in margin terms executives can rank? |
| **Marketing efficiency** | Is spend buying genotypes that close at margin — or volume fiction? |

## 1.2 What FIE is not

| FIE is not | Why |
|------------|-----|
| EIE | EIE describes historical business reporting; FIE **reasons** about margin truth and forward allocation |
| ERP / DMS | FIE consumes financial facts; it does not post journal entries |
| MkIE | MkIE classifies exogenous shocks; FIE **translates** shocks into margin and capital impact |
| IBS | IBS governs intelligence **capital** scoring; FIE owns **operational margin truth** that IBS consumes |
| ERE | ERE ranks organizational actions; FIE supplies **economic inputs and gates** — it does not propose |
| Executive Copilot | Copilot presents decisions; FIE supplies **margin accountability and financial impact bands** |
| Pricing authority | FIE surfaces discount bleed and margin risk; humans retain price authority |

## 1.3 Mission statement

> **FIE ensures every executive recommendation, intelligence ROI claim, and capital decision in CPI-OS is grounded in reconciled margin truth — not revenue volume, not uncorrected FX, not marketing clicks.**

## 1.4 Constitutional rule

**No ERE recommendation with material financial impact ships without FIE margin truth clearance.**

When margin reconciliation fails, FX pass-through is unmodeled during active S2+ shock, or assisted attribution confidence collapses, FIE **blocks** financial ranking inputs to ERE — except Executive Escalation (reconciliation repair, data repair). Intelligence without margin truth poisons capital allocation.

```
Intelligence path outcome  →  FIE margin truth  →  Assisted Margin Ledger  →  ERE EV rank  →  Executive Copilot  →  Human capital decision
```

---

# 2. Position in Architecture

## 2.1 Stack placement

FIE sits **above** the intelligence estate and **peer to** CoIE and MkIE — translating operational learning and market context into **economic reasoning** consumed by ERE and Executive Copilot.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE COPILOT                                     │
│         marginImpact bands · capital red-zone · fieReconciliation line │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                       │
│         EV rank · budget proposals · inventory signals — FIE-gated       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐       ┌─────────────────┐       ┌───────────────┐
│ CoIE          │       │ MkIE            │       │ FIE           │
│ Org learning  │       │ Exogenous shocks│       │ Margin truth  │
│ Data quality  │       │ FX · competitor │       │ Attribution   │
└───────┬───────┘       └────────┬────────┘       │ Capital signals│
        │                        │               └───────┬───────┘
        └────────────────────────┼───────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    INTELLIGENCE ESTATE                                   │
│  SCDG · Customer DNA · Salesperson DNA · Marketing DNA · CPO           │
│  (paths produce attribution traces — FIE validates economic linkage)   │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              CUSTOMER INTELLIGENCE PLATFORM (Level 7–10)                   │
│              CIE · SIE · MIE · OIE · EIE — operational + reporting       │
└─────────────────────────────────────────────────────────────────────────┘
```

**Ordering principle (user stack):**

```
Customer DNA → Salesperson DNA → Marketing DNA → SCDG → MkIE → CoIE → FIE → ERE → Executive Copilot
```

DNA engines and SCDG produce **behavioral and path intelligence**. MkIE and CoIE produce **context and discipline**. FIE produces **economic truth**. ERE and Executive Copilot produce **ranked capital and organizational action**.

## 2.2 Information flow

```
CRM close + unit economics (EIE join)
    → FIE margin truth normalization
    → Intelligence path trace (SCDG × DNA × Marketing DNA)
    → Assisted Margin Ledger entry (KA-07)
    → MkIE shock overlay (FX, competitor, inventory)
    → Attribution confidence band
    → IBS capital linkage (IEV, I-ROI numerator)
    → ERE expected_margin_impact inputs
    → Executive Copilot margin accountability
```

**Direction:** Financial facts flow **up** into FIE. FIE emits **truth objects and signals** — never raw P&L dumps to executives. ERE and Copilot consume typed financial intelligence only.

## 2.3 FIE vs adjacent engines

| Engine | Horizon | Question |
|--------|---------|----------|
| **EIE** | Historical period | What did we report? |
| **MkIE** | Shock window | What did the market impose? |
| **CoIE** | Organizational week | Can we trust this week's learning? |
| **FIE** | Per close + rolling quarter | Is margin true, attributable, and allocatable? |
| **ERE** | Organizational week | What should ownership consider? |
| **IBS** | Quarter + year | What intelligence capital do we own — and does it pay? |

FIE is the **economic immune system** of CPI-OS: it does not generate customer-facing intelligence; it protects compounding from financial fiction.

---

# 3. Inputs

FIE consumes **typed economic facts** and **intelligence lineage** — never unjoined revenue aggregates.

## 3.1 Primary inputs

| Source | What FIE consumes | Use |
|--------|-------------------|-----|
| **CRM close records** | Unit sold, list price, discount, trade-in, close date, consultant | Margin truth anchor |
| **Finance desk outcomes** | F&I attach, product penetration, bank spread realization | Gross profit completion |
| **Inventory state** | Unit age, trim, color, acquisition cost band, demo flag | Carrying cost, allocation signals |
| **Marketing spend** | Channel × campaign × creative × period (Marketing DNA join) | Spend efficiency intelligence |
| **SCDG path traces** | Edges traversed, config version, proof sequence | Path-level margin attribution |
| **Customer DNA** | Cluster at decision time | Genotype margin profiles |
| **Salesperson DNA** | Consultant match record | Consultant-assisted margin lift |
| **Marketing DNA** | Campaign → session → outcome join | Acquisition-to-margin map |
| **Experiment Genealogy** | Config version at assist time | Experiment margin linkage |
| **MkIE Shock Registry** | FX_MOVEMENT, INVENTORY_SHOCK, PRICING_SHIFT, MACROECONOMIC | Shock-adjusted margin bands |
| **CoIE data quality gate** | Label completeness, reconciliation status | FIE clearance prerequisite |
| **EIE historical rolls** | Trailing margin trends, unit mix | Baseline and anomaly detection |
| **Override Corpus** | Discount override, finance objection override | Bleed and error cost signals |

## 3.2 Input quality gates (FIE admission)

An input **does not enter margin truth** unless:

| Gate | Threshold | Owner |
|------|-----------|-------|
| Close-to-session join | ≥ 85% of closes joinable to intelligence session | CoIE + FIE |
| Gross profit field completeness | ≥ 95% of closes with validated GP | Finance steward |
| Discount authority tag | 100% of below-floor deals tagged | Sales director |
| F&I attach within 14 days | ≥ 90% of closes with F&I resolution or explicit pending | Finance manager |
| Inventory cost band current | No unit with cost band > 60 days stale | FIE steward |
| MkIE FX shock acknowledged | Active S2+ FX → pass-through model applied or explicit defer | MkIE + FIE |

Failed gate → `fieTruthStatus: degraded` → ERE financial recommendations suppressed.

## 3.3 Inputs FIE explicitly does not own

| Signal | Owner |
|--------|-------|
| Proof rank, edge weights | SCDG + CoIE |
| Competitor promo classification | MkIE |
| Consultant skill signature | Salesperson DNA |
| Creative performance (engagement) | Marketing DNA / MIE |
| Organizational ritual compliance | CoIE |
| Customer utterance reasoning | SIE |

FIE **interprets economic consequences** of those signals — it does not generate them.

---

# 4. Financial Ontology

All FIE reasoning uses a **typed financial ontology** aligned with CPO `market_shock` nodes, IBS asset classes, and ERE `expected_margin_impact` — not ad hoc spreadsheet categories.

## 4.1 Core object classes

```yaml
financialObjectClass:
  MARGIN_UNIT              # one closeable economic unit (VIN / deal)
  MARGIN_EVENT             # economic change on a unit (discount, F&I close, trade-in revalue)
  COST_POOL                # aggregated drag (carry, floorplan, intelligence opex)
  CAPITAL_COMMITMENT       # inventory acquisition, campaign lock, staffing
  SPEND_EFFICIENCY_CURVE   # assisted GP per dollar over time by Marketing DNA
  FX_PASS_THROUGH          # shock-adjusted margin band from MkIE FX_MOVEMENT
  CARRYING_COST            # economic drag of holding inventory
  DISCOUNT_BLEED           # authorized vs unauthorized margin erosion
  TRADE_IN_EROSION         # appraisal gap vs expected on assisted paths
  FI_ATTACH_LIFT           # incremental GP from finance products
  ASSISTED_GP_ATTRIBUTION  # intelligence-linked gross profit with confidence
  BUDGET_SIGNAL            # ERE-ready channel reallocation intelligence
  CAPITAL_SIGNAL           # ERE-ready inventory / allocation intelligence
```

## 4.2 Margin unit schema (conceptual)

```yaml
marginUnit:
  unitId: string                    # VIN or deal anchor
  closeId: string                   # CRM anchor
  closeDate: date

  # Margin truth components
  revenueRecognized: float          # list + options − contractual adjustments
  cogsBand: float                   # acquisition cost band (not invoice precision fiction)
  discountBleed:
    authorized: float
    unauthorized: float
    authorityTag: enum | missing
  tradeInErosion: float             # expected vs actual appraisal gap
  fiAttachLift: float               # net F&I contribution
  grossProfitTruth: float           # FIE authoritative GP — see §5

  # Intelligence linkage
  intelligenceAssist: bool
  attributionPath:                  # §6
    campaignId: string?
    customerDnaCluster: string?
    pathId: string?                 # SCDG path hash
    salespersonId: string?
    configVersion: string?
  attributionConfidence: high | medium | low

  # Shock overlay
  mkieOverlay:
    activeShocks: [shockId]
    fxAdjustedGP_band: [low, high]?
    exogenousShare: float?          # 0-1; MkIE + FIE joint

  # Ledger pointer
  assistedMarginLedgerRef: string?  # KA-07 entry if assist = true
```

## 4.3 Cost pool taxonomy

| Pool ID | Definition | Compounding link |
|---------|------------|----------------|
| `CP-01` | Floorplan / inventory financing drag | Carrying cost intelligence |
| `CP-02` | Physical holding (lot, insurance, recondition) | Per-unit carry rate |
| `CP-03` | Aging opportunity cost | Capital trapped vs redeployable |
| `CP-04` | Marketing waste | Genotypes below median close margin |
| `CP-05` | Discount authority leakage | Sales process discipline |
| `CP-06` | Trade-in revaluation error | Trust + compare path errors |
| `CP-07` | Intelligence operating cost | I-ROI denominator (IBS §6) |
| `CP-08` | Shock-induced margin compression | MkIE FX / macro pass-through |

## 4.4 Capital commitment classes

| Class | Examples | ERE typical zone |
|-------|----------|------------------|
| `CC-INV` | New unit acquisition, swap with OEM | Red |
| `CC-REALLOC` | Demo reassignment, lot repositioning | Amber |
| `CC-MKT` | Campaign budget lock, channel shift | Amber |
| `CC-INTEL` | Holdout traffic, labeling sprint | Green / Amber |
| `CC-FLOOR` | Extended floorplan exposure | Red |

## 4.5 Ontology alignment rules

1. Every `MARGIN_EVENT` must cite `marginUnit` — no orphan economics  
2. Every `ASSISTED_GP_ATTRIBUTION` must cite intelligence lineage or `assist: false`  
3. Every `FX_PASS_THROUGH` must cite MkIE `shockId` — FIE does not invent FX shocks  
4. Every `BUDGET_SIGNAL` and `CAPITAL_SIGNAL` must cite confidence band and minimum-N status  
5. Financial ontology version bumps require FIE steward + finance steward sign-off — parallel to CPO governance  

---

# 5. Margin Truth

**Margin truth** is FIE's authoritative definition of gross profit — the number ERE, Executive Copilot, and IBS may treat as economically real.

## 5.1 Definition

```
Gross_Profit_Truth =
  Revenue_Recognized
  − COGS_Band
  − Unauthorized_Discount_Bleed
  − Trade_In_Erosion
  + FI_Attach_Lift
  ± Shock_Adjustments (MkIE-gated, banded — never point fiction)
```

**Not margin truth:**

| Metric | Why excluded |
|--------|--------------|
| List price | Ignores discount reality |
| Revenue only | Vanity — per SELF_IMPROVING_COMPANY_BLUEPRINT |
| Gross without F&I | Incomplete for automotive considered purchase |
| Consultant-reported margin | Unverified — CRM + finance desk anchor |
| Pre-discount "theoretical" margin | Inflates intelligence ROI |

## 5.2 Margin truth layers

| Layer | Scope | Consumer |
|-------|-------|----------|
| **L1 — Unit truth** | Per close / VIN | Operations, finance reconciliation |
| **L2 — Path truth** | Per SCDG path hash | Graph optimization, proof promotion |
| **L3 — Genotype truth** | Per Customer DNA cluster | Routing, compare strategy |
| **L4 — Channel truth** | Per Marketing DNA segment | Budget intelligence |
| **L5 — Consultant truth** | Per Salesperson DNA match | Coaching — not commission |
| **L6 — Portfolio truth** | Rolling 90d node aggregate | Board, IBS, investor narrative |

Each layer aggregates from L1 with **confidence-weighted rollups** — a path with 40% low-confidence assists does not receive full L2 credit.

## 5.3 Truth status (FIE clearance)

```yaml
fieTruthStatus:
  verified          # reconciliation within tolerance; all gates pass
  provisional       # 90–95% completeness; bands widened ±10%
  degraded          # reconciliation fail or stale cost bands; financial ERE inputs blocked
  shock_deferred    # active S2+ FX without pass-through model; rankings use bands only
```

## 5.4 Reconciliation protocol

Quarterly (minimum); weekly spot-check on assisted margin subset.

| Check | Tolerance | Failure consequence |
|-------|-----------|---------------------|
| Sum `grossProfitTruth` vs finance GP | ≤ 3% | `degraded`; IEV Quality discount |
| Assisted close count vs CRM | ≤ 5% | CoIE escalation |
| Unattributed assist flags | < 10% of assisted sessions | FIE labeling sprint signal |
| F&I lift sum vs finance desk | ≤ 5% | Finance steward review |
| Unauthorized discount untagged | 0 tolerated | Sales director Executive Escalation |

**Finance steward** owns CRM/finance source accuracy. **FIE steward** owns intelligence join and attribution integrity. Disputes escalate to GM via Executive Copilot — not silent override.

## 5.5 Margin truth vs MkIE

| Situation | FIE behavior |
|-----------|--------------|
| Close during S2 competitor promo | Unit truth recorded; path attribution flagged `mkieAdjusted` |
| Close during S3 FX band shift | `grossProfitTruth` point estimate + `fxAdjustedGP_band` |
| Lost deal — finance objection spike | Negative learning value; no GP — but path cost recorded |
| Inventory unavailable — no close | No margin unit; carrying cost still accrues on VIN |

MkIE explains **why** margin moved. FIE records **what** margin was — with honest bands when exogenous share is high.

---

# 6. Assisted Margin Ledger Ownership

## 6.1 Ownership split (FIE vs IBS)

| Responsibility | Owner |
|----------------|-------|
| **Operational ledger** — entry creation, update, confidence, shock flags | **FIE** (KA-07) |
| **Capital framework** — I-ROI, IEV linkage, asset class attribution rules | **IBS** |
| **Reconciliation authority** | FIE steward + finance steward |
| **Investor narrative** | IBS (consumes FIE rollup) |
| **Deprecation / quarantine of bad attribution** | FIE proposes; Executive Copilot approves |

The Assisted Margin Ledger is the **sub-ledger of economic truth** — not a GAAP ledger. IBS §7 defines the capital reporting contract; **FIE is the system of record for intelligence-mediated margin.**

## 6.2 Ledger entry schema (KA-07)

```yaml
assistedMarginLedgerEntry:
  entryId: string
  closeId: string
  assistedMargin: float             # grossProfitTruth where assist = true
  pathId: string
  customerDnaCluster: string
  salespersonId: string
  campaignId: string
  configVersion: string
  confidenceBand: high | medium | low
  mkieShockFlag: [shockId]
  attributionSplit:                 # IBS §7.4 default; FIE computes
    marketing: float
    graph: float
    consultant: float
  multiTouchPolicy: string          # versioned split rule
  createdAt: timestamp
  supersededBy: entryId?            # corrections immutable chain
  fieTruthStatusAtCapture: enum
```

## 6.3 Entry lifecycle

```
Close recorded (CRM)
    → FIE margin truth normalization
    → Intelligence assist evaluation (§6.4)
    → If assist: ledger entry created
    → MkIE overlay applied
    → Confidence band assigned
    → Published to IBS + ERE consumption layer
    → Quarterly reconciliation
    → Supersede if correction (never delete)
```

## 6.4 Intelligence assist criteria

A close receives `intelligenceAssist: true` when **at least one** traceable assist occurred:

| Assist type | Evidence |
|-------------|----------|
| Graph routing | SCDG path applied; edges logged |
| DNA routing | Customer DNA cluster drove proof sequence or consultant match |
| Copilot recommendation | Followed or consciously overridden with reason tag |
| Holdout-promoted proof | Experiment Genealogy version delivered |
| Marketing DNA join | Campaign → session within attribution window |

**No assist without trace** — untraced closes are organic for I-ROI numerator purposes (IBS constitutional rule).

## 6.5 Ledger operations

| Operation | Trigger | Rule |
|-----------|---------|------|
| **Create** | Verified close + assist criteria | Immutable entry |
| **Annotate** | MkIE shock retroactive classification | Add shock flag; do not change GP |
| **Supersede** | Reconciliation correction | New entry; old `supersededBy` |
| **Quarantine** | Attribution fraud or join failure | Remove from I-ROI; audit log |
| **Release** | Post-reconciliation clearance | Restore to IBS rollups |

## 6.6 Compounding property (KA-07)

Per [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md), the Assisted Margin Ledger compounds **linearly** — each labeled close sharpens path, genotype, and channel margin maps. FIE protects compounding by **rejecting volume without lineage**.

---

# 7. Gross Profit Attribution

Attribution is how assisted margin **flows back** to intelligence assets — the economic bridge IBS §7 requires.

## 7.1 Attribution chain (mandatory)

```
Campaign (Marketing DNA)
  → Session (Customer DNA assignment)
    → Path (SCDG edges traversed)
      → Proofs (Experiment Genealogy version)
        → Consultant (Salesperson DNA match)
          → Margin unit (FIE grossProfitTruth)
            → Overrides (Override Corpus — confidence adjustment)
```

Broken link → confidence degrades one band level per break.

## 7.2 Multi-touch split (default policy)

| Touch | Default share | Rationale |
|-------|---------------|-----------|
| Last intelligence touch (graph + consultant) | 60% | Proximate assist |
| First Marketing DNA touch | 25% | Acquisition selection |
| Graph path structure | 15% | Compounding asset |

Policy is **versioned** — changes require FIE steward approval and IBS disclosure. Sum of gross attributions may exceed total; board reporting uses Shapley normalization (IBS §6.5).

## 7.3 Confidence bands

| Band | Criteria | I-ROI eligible |
|------|----------|----------------|
| **High** | Full chain + holdout or verified join + no active S2+ unmodeled shock | Yes |
| **Medium** | Chain with ≤1 weak link OR quasi-experimental match | Yes, with ±15% band |
| **Low** | Correlation only; missing outcome reason; override without tag | Volume only — not I-ROI numerator |

## 7.4 Negative attribution (losses)

Lost deals with intelligence assist still produce **attribution records** with `assistedMargin: 0` and `lostReason` — they inform path **negative learning value** and prevent false promotion of loss-correlated proofs.

```
Negative_Learning_Value = f(lostReason, pathId, cluster) → ERE suppression input
```

## 7.5 Attribution vs MkIE exogenous share

When `mkieOverlay.exogenousShare > 0.5`:

- Attribution records persist (audit truth)  
- I-ROI numerator **excludes** the assist for that window unless holdout survived shock  
- ERE `expected_margin_impact` uses shock-discounted lift  

FIE and MkIE jointly prevent **crediting intelligence for Toyota's promotion week**.

---

# 8. FX Shock Integration with MkIE

FX is the highest-frequency **financial confound** in Bolivian automotive. MkIE owns detection; FIE owns **economic translation**.

## 8.1 Division of responsibility

| Function | MkIE | FIE |
|----------|------|-----|
| Detect USD/BOB band shift, parallel spread | ✓ | — |
| Classify severity S1–S4 | ✓ | — |
| Register shock in KA-09 | ✓ | — |
| Model import cost pass-through to COGS band | — | ✓ |
| Widen unit margin bands | — | ✓ |
| Reinterpret marketing efficiency | — | ✓ |
| Hold budget recommendations | Signals ERE | ✓ `budgetSignalHold` |
| Route to finance objection nodes (SCDG) | Context flag | Margin prior update |

## 8.2 FX pass-through model (intelligence)

```yaml
fxPassThrough:
  shockId: string                   # MkIE FX_MOVEMENT
  severity: S1 | S2 | S3 | S4
  passThroughCoefficient_band: [low, high]  # never point estimate at S2+
  affectedCostPools: [CP-01, CP-08]
  affectedMarginLayers: [L1, L4, L6]
  inventoryCarryRateAdjustment: float?
  marketingEfficiencyReinterpret: bool
  learningSafe: bool                # inherited from MkIE
  budgetRecommendationHold: bool    # true at S2+ until model calibrated
```

## 8.3 FX integration loop

```
MkIE: FX_MOVEMENT registered
    → FIE: apply pass-through bands to open inventory COGS
    → FIE: recompute carrying cost (§10)
    → FIE: reinterpret Marketing DNA assisted GP/dollar
    → FIE: set fieTruthStatus shock_deferred if model immature
    → ERE: defer budget + proof promotions with financial impact
    → Executive Copilot: mkieShockSummary + margin band line
    → Post-shock review: calibrate pass-through priors (joint MkIE + FIE)
```

## 8.4 FX rules (constitutional)

1. **FX shocks route to finance economics** — not proof rank demotion (MkIE §8 + FIE)  
2. **No single-point margin restatement** during active S2+ FX — bands only  
3. **Parallel rate divergence** widens uncertainty before official band moves — FIE may flag `provisional` early  
4. **FIE never overrides MkIE classification** — disputes go to steward contest, not silent recode  
5. **Post-shock minimum-N** before pass-through coefficients update — CoIE gate  

## 8.5 Federation (Bolivia / LATAM)

National FX shocks (BOB band) inherit to L1 nodes with **−confidence** on pass-through coefficients — Santa Cruz coefficients do not clone to La Paz without local minimum-N.

---

# 9. Budget Recommendation Intelligence

FIE does not propose budget shifts. It produces **`BUDGET_SIGNAL` objects** that ERE converts into Marketing Budget Shift recommendations (ERE §4.6).

## 9.1 Core metric

```
Assisted_GP_per_Dollar(channel, creative, genotype) =
  Σ assistedMargin (Marketing DNA segment, shock-adjusted window)
  ÷ Σ spend (same segment, same window)
```

**Primary objective:** assisted gross profit per dollar — not CAC, not leads, not sessions.

## 9.2 Signal schema

```yaml
budgetSignal:
  signalId: string
  marketingDnaId: string
  channel: enum
  creativeProof: string
  acquiredGenotypeMix: object
  raw_assistedGP_per_dollar: float
  mkie_adjusted_band: [low, high]
  mkieShockIds: [shockId]
  budgetRecommendationHold: bool
  minimumN_status: pass | pending | fail
  suggestedDirection: increase | decrease | hold | reallocate
  reallocateTarget: marketingDnaId?
  confidence: float
  horizon_weeks: int
```

## 9.3 Budget intelligence rules

| Rule | Rationale |
|------|-----------|
| ≥8 weeks spend + ≥30 conversions before directional signal | ERE gate alignment |
| `budgetRecommendationHold: true` when MkIE S2+ active | False creative blame prevention |
| Genotype below median close margin → `waste` flag regardless of CAC | Volume fiction elimination |
| Reallocation suggestions must cite **target** segment with superior assisted GP/dollar | Not just "cut Meta" |
| Shock-adjusted band width > 40% relative → `hold` only | F-08 impact overconfidence |

## 9.4 Budget intelligence loop

```
Marketing DNA (spend + genotype acquired)
    → FIE: compute assisted GP/dollar
    → MkIE: gate — exogenous share?
    → FIE: emit budgetSignal
    → ERE: Marketing Budget Shift recommendation (amber)
    → Executive Copilot: approve / reject / defer
    → Outcome → FIE: update efficiency curves
```

## 9.5 Interaction with Marketing DNA

Marketing DNA owns **who we bought**. FIE owns **what they were worth in margin terms**. Marketing DNA `mkieOverlay` fields (MkIE §9.2) are **populated by FIE computation** — not by Marketing DNA self-reporting.

---

# 10. Capital Allocation Signals

FIE emits **`CAPITAL_SIGNAL` objects** for decisions where money is trapped, misdeployed, or compounding — consumed by ERE for Inventory Recommendation (ERE §4.7) and Strategic Opportunities (ERE §4.11).

## 10.1 Signal classes

| Signal class | Question | Typical ERE type |
|--------------|----------|------------------|
| `CAS-INV-TRAP` | Which VINs trap capital above carry threshold? | Inventory Recommendation (red) |
| `CAS-INV-RELEASE` | Which aging unit should demo/reassign to high-demand genotype? | Inventory Recommendation (amber) |
| `CAS-MKT-WASTE` | Which spend pools buy sub-median margin genotypes? | Marketing Budget Shift |
| `CAS-INTEL-ROI` | Does intelligence opex produce incremental assisted margin? | Strategic / board |
| `CAS-FLOOR-RISK` | Is floorplan exposure accelerating vs close velocity? | Executive Escalation |
| `CAS-REALLOC` | Where would the next unit of capital compound fastest? | Composite ranking input |

## 10.2 Capital signal schema

```yaml
capitalSignal:
  signalId: string
  class: enum
  trappedCapital_estimate: float
  opportunityCost_band: [low, high]
  compoundingAlternative: string      # path, genotype, or channel
  horizon_days: int
  confidence: float
  mkieAdjusted: bool
  minimumN_status: pass | pending | fail
  ereEligibility: inventory | budget | strategic | escalation
```

## 10.3 Allocation principles (FIE reasoning)

1. **Compound before accumulate** — capital trapped in aging white GS4 > marginal Meta spend on low-margin genotype  
2. **Margin paths beat volume paths** — SCDG path with highest assisted GP/truth beats highest session count  
3. **Shock windows defer acquisition** — S3+ FX → `CAS-INV-TRAP` warnings escalate; no auto-acquire signals  
4. **Intelligence opex is capital** — CP-07 tracked; I-ROI < 0 for two quarters → `CAS-INTEL-ROI` escalation  
5. **Red zone stays red** — FIE signals inform; humans approve CC-INV commitments  

## 10.4 IBS Economic Shadow Value (ESV) feed

FIE supplies `Assisted_Margin_Attributed × Confidence_Band × Persistence_Factor` inputs to IBS §4.5 ESV — FIE does not compute IEV weights; IBS owns capital scoring methodology.

---

# 11. Inventory Carrying Cost Intelligence

Inventory is **silent margin erosion** — FIE makes carry economically visible for executive ranking.

## 11.1 Definition

```
Carrying_Cost_per_Unit_per_Day =
  (COGS_Band × floorplan_rate_daily)
  + holding_cost_daily
  + opportunity_cost_daily (FIE portfolio prior)
```

During MkIE FX shocks, `floorplan_rate_daily` and `COGS_Band` widen to bands — carry becomes a **range**, not false precision.

## 11.2 Carry intelligence objects

```yaml
carryingCostIntelligence:
  unitId: string
  vin: string
  ageDays: int
  trim: string
  color: string
  cogsBand: float
  dailyCarry_band: [low, high]
  cumulativeCarry_band: [low, high]
  demandGenotypeFit: float          # Customer DNA demand mix match
  demoPriorityScore: float
  trapThresholdBreached: bool
  mkieShockIds: [shockId]
```

## 11.3 Trap threshold

Default: cumulative carry exceeds **X% of expected grossProfitTruth** for trim (steward-configured per node). Breach → `CAS-INV-TRAP` capital signal.

## 11.4 Carry × genotype demand

FIE joins:

- Inventory unit attributes  
- Customer DNA cluster demand mix (trailing 90d)  
- SCDG path demand signals  

To produce `demandGenotypeFit` — operational reallocation intelligence, not pricing.

## 11.5 Carry rules

| Rule | Rationale |
|------|-----------|
| Demo units accrue carry — no fiction exemption | Economic honesty |
| Unavailable trim (MkIE INVENTORY_SHOCK) suspends trap signals | Supply ≠ demand failure |
| Carry feeds ERE inventory packets — never auto-acquire | Capital authority human |
| Post-close, carry stops — margin unit supersedes | Clean lifecycle |

---

# 12. Marketing Spend Efficiency Intelligence

Spend efficiency is FIE's **genotype-margin map** — the financial mirror of Marketing DNA.

## 12.1 Efficiency curve (per Marketing DNA segment)

```yaml
spendEfficiencyCurve:
  marketingDnaId: string
  windowWeeks: int
  spend: float
  assistedMarginAttributed: float
  assistedGP_per_dollar: float
  mkie_adjusted_band: [low, high]
  wasteRatio: float                 # spend on below-median margin genotypes
  genotypeMarginMap:
    - cluster: string
      shareOfSpend: float
      assistedGP_per_close_band: [low, high]
  trend: improving | flat | degrading
```

## 12.2 Waste definition

```
Waste_Ratio =
  Spend attracting genotypes with assistedGP_per_close < node_median
  ÷ Total spend
```

High waste → `CAS-MKT-WASTE` even when CAC looks acceptable — **volume without margin is CP-04**.

## 12.3 Efficiency reinterpretation (MkIE compose)

| Observation | Without FIE + MkIE | With FIE + MkIE |
|-------------|-------------------|-----------------|
| CAC ↑, margin stable | Cut channel | Check FX / competitor pull |
| Leads ↑, assisted GP ↓ | Fix landing | Competitor promo — hold budget |
| Genotype drift ↑ | Retarget creative | Category narrative — widen bands |
| Radio efficiency ↓ | Cut radio | Seasonality — efficiency reinterpret |

## 12.4 IBS linkage

Marketing DNA IBS line items (IBS §3.4):

- `acquisition_to_margin_map_coverage` — FIE computes  
- `waste_ratio` — FIE computes  
- `marketing_dna_campaigns_linked` — FIE validates economic join  

---

# 13. Interaction with ERE

ERE ranks organizational actions. FIE **gates and enriches** every recommendation with financial materiality.

## 13.1 What ERE consumes from FIE

| FIE output | ERE use |
|------------|---------|
| `grossProfitTruth` rollups | `expected_margin_impact` baseline |
| `assistedMarginLedger` aggregates | EV numerator — assisted GP lift |
| `budgetSignal` | Marketing Budget Shift proposals |
| `capitalSignal` | Inventory + strategic recommendations |
| `fieTruthStatus` | Financial recommendation suppression |
| `carryingCostIntelligence` | Inventory Recommendation ranking |
| `spendEfficiencyCurve` | Marketing shift evidence quality |
| Negative learning value | Proof demotion financial corroboration |

## 13.2 ERE gates requiring FIE

| ERE category | FIE gate |
|--------------|----------|
| Marketing Budget Shift | `budgetSignal.minimumN: pass`; `budgetRecommendationHold: false` |
| Inventory Recommendation | `capitalSignal` with carry + demand fit |
| Graph Optimization (material) | Path-level L2 margin truth trend |
| Strategic Opportunities | I-ROI trend + portfolio L6 truth |
| All amber/red financial | `fieTruthStatus: verified | provisional` |

## 13.3 EV composition (FIE enrichment)

ERE §5.1:

```
EV = P(success) × Expected_Margin_Lift × Reach
```

FIE supplies:

- `Expected_Margin_Lift` in **assisted gross profit** — never revenue  
- Shock-adjusted bands when `mkieShockIds` present  
- `P(success)` prior adjustment when attribution confidence low  

## 13.4 Suppression matrix

| FIE state | ERE action |
|-----------|------------|
| `verified` | Full financial ranking |
| `provisional` | Rank with widened CI; no green auto on budget |
| `degraded` | Suppress all financial recommendations; CoIE escalation only |
| `shock_deferred` | Hold budget + inventory acquire; amber max on margin claims |

## 13.5 Feedback loop

```
ERE recommendation approved
    → Deployment (budget, inventory, config)
        → Outcomes
            → FIE margin truth update
                → ERE score calibration (ERE §7)
```

---

# 14. Interaction with Executive Copilot

Executive Copilot presents decisions. FIE supplies **margin accountability** — every packet with economic impact cites financial intelligence.

## 14.1 Weekly packet integration

```yaml
executiveWeeklyPacket:
  fieReconciliation: verified | provisional | degraded
  fieSummaryLine: string              # e.g. "Assisted margin 31% of GP; reconciliation within 2.1%"
  intelligenceRoiBand: [low, high]?   # trailing I-ROI; IBS methodology

  decisions:
    - expectedImpact:
        metric: assisted_GP           # never revenue-only
        pointEstimate: float
        confidenceInterval: [low, high]
        fieTruthStatusAtEmit: enum
        mkieAdjusted: bool
```

## 14.2 Packet types FIE triggers

| Trigger | Copilot behavior |
|---------|------------------|
| `fieTruthStatus: degraded` | Exception packet — blocks financial decisions |
| `CAS-FLOOR-RISK` | Red-zone capital queue |
| `CAS-INV-TRAP` breach | Inventory exception or amber decision |
| I-ROI < 0 two quarters | Board-mode intelligence capital review |
| Reconciliation variance > 3% | Finance + FIE steward joint escalation |
| FX S3+ active | Margin band language mandatory in inference |

## 14.3 Decision packet language rules

**Required pattern:**

```
EXPECTED IMPACT in assisted gross profit
CONFIDENCE INTERVAL when FIE provisional or MkIE active
FIE reconciliation line on any amber/red capital packet
```

**Forbidden:**

- Revenue-only impact on budget or inventory packets  
- Single-point margin claim during `shock_deferred`  
- Auto-approve budget when `budgetRecommendationHold: true`  
- "Profitable week" without assisted margin % context  

## 14.4 Board mode

Quarterly board **Financial intelligence** section sources from FIE L6 portfolio truth + IBS I-ROI — not ad hoc GM spreadsheet narrative.

---

# 15. Interaction with IBS

IBS governs intelligence **capital**. FIE governs intelligence **margin truth**. Clean separation prevents double ownership.

## 15.1 Division of responsibility

| Function | FIE | IBS |
|----------|-----|-----|
| Assisted Margin Ledger (KA-07) operations | ✓ | Consumes |
| Attribution rules execution | ✓ | Defines policy (§7) |
| I-ROI numerator (incremental assisted margin) | ✓ computes | ✓ publishes |
| I-ROI denominator (intelligence opex) | ✓ tracks CP-07 | ✓ inclusion rules |
| IEV asset capital scores | — | ✓ |
| ESV optional view | ✓ inputs | ✓ formula |
| Reconciliation tolerance enforcement | ✓ | ✓ Quality disqualifier |
| Investor narrative | Supplies metrics | ✓ authors |

## 15.2 IBS metrics FIE feeds

| Metric ID | FIE contribution |
|-----------|------------------|
| CM-04 | Assisted margin per labeled path (L2 truth) |
| I-ROI | Incremental assisted margin numerator |
| IEV Quality | Reconciliation pass/fail |
| Marketing DNA `waste_ratio` | Spend efficiency intelligence |
| Board pack §D | Assisted margin %, reconciliation status |

## 15.3 Constitutional alignment

IBS §1.4: *No intelligence asset counts without outcome linkage.*  
FIE enforcement: *No assisted margin counts without attribution path.*

IBS §7.3 ledger schema — **FIE is authoritative implementation**. IBS changes to attribution policy propagate to FIE as versioned `multiTouchPolicy` — not informal override.

## 15.4 Depreciation linkage

IBS §8 shock depreciation (MkIE) triggers FIE to:

- Flag affected path margin records `mkieShockFlag`  
- Exclude from I-ROI windows per policy  
- Widen carry bands on affected inventory  

FIE does not depreciate IEV directly — it supplies freshness inputs.

---

# 16. Interaction with MkIE

MkIE and FIE are **tight peers** — confound classification meets economic translation.

## 16.1 MkIE → FIE

| MkIE shock class | FIE response |
|------------------|--------------|
| `FX_MOVEMENT` | Pass-through bands, carry adjustment, budget hold |
| `PRICING_SHIFT` | Competitor list move → genotype demand reinterpret |
| `INVENTORY_SHOCK` | Suspend trap signals; supply path annotation |
| `MACROECONOMIC` | Credit tightening → F&I lift prior adjustment |
| `COMPETITOR_ACTION` | Efficiency hold; exogenous share on attribution |
| `SEASONALITY` | Efficiency reinterpret — not carry fiction |

## 16.2 FIE → MkIE

| FIE anomaly | MkIE hint |
|-------------|-----------|
| Finance objection spike without rate card change | Credit tightening or FX candidate |
| Sudden GP band collapse across trims | FX or OEM policy investigation |
| Marketing efficiency cliff with stable genotype | Competitor pull watchlist |
| Carry acceleration + close velocity drop | Macro or inventory shock candidate |

FIE **hints** — MkIE stewards classify. FIE never writes KA-09 entries.

## 16.3 Joint audit (monthly)

CoIE publishes **financial false attribution near-miss log**:

- Budget shifts that would have shipped without MkIE+FIE adjustment  
- I-ROI claims later revised post shock review  
- Pass-through model error vs post-shock actual  

**Level 11 criterion:** Zero approved budget shifts later overturned by post-shock margin review for same window.

---

# 17. Interaction with CoIE

CoIE gates organizational learning. FIE gates **financial learning eligibility**.

## 17.1 CoIE → FIE

| CoIE output | FIE effect |
|-------------|------------|
| Data quality gate fail | `fieTruthStatus: degraded` |
| CRM label completeness < threshold | Attribution confidence capped at low |
| Experiment holdout invalid | Exclude experiment margin from I-ROI |
| Ritual skipped (finance reconciliation) | Weekly FIE clearance withheld |

## 17.2 FIE → CoIE

| FIE output | CoIE effect |
|------------|-------------|
| Reconciliation fail | Executive Escalation packet |
| Unauthorized discount spike | Sales director accountability metric |
| Finance desk join failure | Finance manager ritual flag |
| Attribution fraud pattern | CoIE gaming anomaly |

## 17.3 Joint constitutional gate

```
CoIE pass AND FIE verified  →  ERE financial recommendations eligible
CoIE fail OR FIE degraded   →  Executive Escalation only
```

Neither engine overrides the other. Both must clear for financial compounding.

---

# 18. Failure Modes

## 18.1 FIE failure catalog

| ID | Failure | Consequence | Mitigation |
|----|---------|-------------|------------|
| FIE-01 | **Margin fiction** — revenue as GP | Inflated I-ROI, wrong budget | Constitutional GP formula |
| FIE-02 | **Assist without trace** | Moat narrative collapse | No-trace = organic rule |
| FIE-03 | **Reconciliation drift** | Investor diligence fail | Quarterly gate + IEV penalty |
| FIE-04 | **FX point precision** | False budget confidence | Bands at S2+ |
| FIE-05 | **Carry blindness** | Capital trapped in aging units | Daily carry accrual |
| FIE-06 | **CAC worship** | Waste spend on bad genotypes | assisted GP/dollar primary |
| FIE-07 | **FIE bypass** — ERE ships without clearance | Discipline broken | CoIE constitutional audit |
| FIE-08 | **Attribution overlap undisclosed** | Board trust loss | Shapley normalization |
| FIE-09 | **Stale COGS bands** | Wrong trap signals | 60-day freshness gate |
| FIE-10 | **F&I lag ignored** | Premature close margin | 14-day resolution rule |

## 18.2 Organizational failure modes

| Failure | FIE response |
|---------|--------------|
| Finance desk doesn't close F&I loop | `provisional` until resolved |
| Sales tags all discounts "authorized" | Bleed audit → CoIE gaming flag |
| GM demands revenue-based ERE ranking | FIE blocks; Executive Escalation |
| Marketing disputes waste ratio | Publish genotype map; human review |

---

# 19. Stewardship and Rituals

| Role | Responsibility |
|------|----------------|
| **FIE steward** | Margin truth policy, ledger integrity, attribution version |
| **Finance steward** | CRM GP accuracy, F&I join, reconciliation sign-off |
| **MkIE steward** | FX classification — FIE does not duplicate |
| **GM** | Resolves FIE/MkIE/Finance disputes; red-zone capital authority |

## 19.1 Cadence

| Ritual | Cadence | Output |
|--------|---------|--------|
| Margin truth roll-up | Weekly | L6 snapshot to ERE |
| Assisted margin reconciliation | Monthly spot / quarterly full | `fieTruthStatus` |
| Carry trap review | Weekly | `CAS-INV-*` signals |
| Spend efficiency refresh | Weekly | `budgetSignal` set |
| FX post-shock calibration | Per shock + 2 weeks | Pass-through prior update |
| I-ROI feed to IBS | Quarterly | IBS §6 publish inputs |

---

# 20. Maturity Levels

| Level | FIE capability | Evidence |
|-------|----------------|----------|
| **L0** | Revenue reporting only | No GP truth |
| **L1** | Unit GP truth, manual reconciliation | Sporadic |
| **L2** | Assisted Margin Ledger operational | KA-07 live |
| **L3** | Path + genotype margin maps | L2/L3 rollups |
| **L4** | MkIE FX integration + budget signals | Shock-adjusted efficiency |
| **L5** | Carry intelligence + capital signals | CAS-* in ERE |
| **L11** | I-ROI high-confidence + reconciliation < 3% | Board-grade financial intelligence |

**Level 11 FIE criterion:**

> Trailing twelve-month assisted margin reconciliation within 3% tolerance; I-ROI published at high or medium confidence; zero ERE financial recommendations shipped under `degraded` truth status.

---

# 21. Moat Contribution

### 21.1 What FIE moats

| Asset | FIE contribution |
|-------|------------------|
| **KA-07 Assisted Margin Ledger** | Authoritative operational record — compounds with each traced close |
| **Path margin maps** | Economic linkage SCDG edges to GP — uncopyable without same loop |
| **Genotype margin profiles** | Which clusters actually pay — not demographic fiction |
| **Spend efficiency curves** | Shock-disciplined marketing capital memory |
| **FX pass-through priors** | Bolivia-specific economic translation |

### 21.2 What FIE does not moat

- Raw CRM exports — commodity  
- Generic DMS margin reports — commodity  
- FX feeds — commodity (MkIE sensing); **pass-through memory** is moat  
- Spreadsheet budgets — replaceable  

### 21.3 Investor sentence

> *"Viaggio's Financial Intelligence Engine ensures assisted margin compounding is reconciled to gross profit — not engagement. Every intelligence path is economically accountable. That is what makes CPI-OS investable as intelligence capital, not software rent."*

---

# 22. Summary — FIE in One Page

```
PURPOSE:     Financial reasoning layer of CPI-OS — margin truth authority
POSITION:    Peer to CoIE + MkIE; feeds ERE + Executive Copilot + IBS
OWNS:        KA-07 Assisted Margin Ledger · margin truth · attribution execution
CONSUMES:    CRM · finance desk · inventory · DNA paths · MkIE shocks · CoIE gates
PRODUCES:    budgetSignal · capitalSignal · carrying cost · efficiency curves · fieTruthStatus
CONSTITUTION: No material ERE financial recommendation without FIE clearance
COMPOSES:    MkIE (shocks) + intelligence estate (paths) → economic truth → capital ranking
NOT:         ERP · accounting · pricing authority · software
```

---

*FIE v1.0 — intelligence architecture only. For IBS capital reporting see [INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md](./INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md). For shock taxonomy see [MARKET_INTELLIGENCE_ENGINE.md](./MARKET_INTELLIGENCE_ENGINE.md). For executive ranking see [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md).*
