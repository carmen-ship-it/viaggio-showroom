# Market Intelligence Engine (MkIE) — Intelligence Specification

**Version:** 1.0  
**Date:** 15 June 2026  
**Asset ID:** KA-09 (Market Shock Registry) · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Codename:** CPI-OS exogenous layer  
**Builds on:** [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) · [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md) · [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md)  
**Feeds:** ERE · Executive Copilot · SCDG · Customer DNA · Marketing DNA · CoIE  
**Constraint:** Intelligence specification only — not data pipelines, vendors, or UI  

---

## 1. Purpose

**MkIE** is CPI-OS's **exogenous intelligence layer**. It answers one question the internal estate cannot answer alone:

> *What changed in the world that could explain variance in outcomes — independent of what we did?*

MkIE prevents CPI-OS from **falsely attributing market events to internal performance**. Without it, a Toyota promotion week becomes "the AI failed," a boliviano move becomes "consultants underperformed," and a GAC recall rumor becomes "proof rank regression."

### 1.1 Mission

Separate **endogenous variance** (what Viaggio controlled: proof sequences, staffing, campaign creative, consultant behavior) from **exogenous variance** (what the market imposed: competitor incentives, OEM policy, FX, regulation, macro cycles, category shocks).

### 1.2 What MkIE tracks (exogenous only)

| Domain | Examples (Santa Cruz automotive) |
|--------|----------------------------------|
| **Competitor actions** | Corolla Cross 0% financing rumor, Toyota lot event, BYD price cut in La Paz |
| **OEM policy changes** | GAC warranty extension, regional allocation cut, recall advisory |
| **Pricing shifts** | Competitor list-price move, informal market spread, fleet discount leak |
| **FX movements** | USD/BOB band shift, parallel rate divergence, import cost pass-through |
| **Regulatory changes** | Import duty, emissions rule, financing disclosure requirement |
| **Inventory shocks** | Trim unavailable nationally, color pipeline delay, demo unit loss |
| **Macroeconomic conditions** | Credit tightening, fuel price, agro income cycle, rainy-season mobility |

### 1.3 What MkIE explicitly does not own

| Endogenous signal | Owner |
|-------------------|-------|
| Proof rank changes | CoIE + SCDG |
| Consultant performance | Salesperson DNA + OIE |
| Campaign creative edits | Marketing DNA + MIE |
| CRM data quality | CoIE |
| Session UX failures | CoIE + Trust Fabric |

**MkIE is context, not excuse.** It labels confounds; it does not remove accountability for controllable factors.

### 1.4 Constitutional rule

**No automatic learning action ships during an unclassified exogenous shock window** unless CoIE confirms minimum-N holdout integrity and MkIE marks the shock `learning_safe: false` override with executive acknowledgment.

---

## 2. Position in Architecture

MkIE sits in the **Level 11 intelligence stack** between raw market reality and the compounding estate. It is peer to CoIE (organizational learning) and upstream of ERE (executive ranking).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE COPILOT                                     │
│         mkieShockSummary · mkieAdjusted evidence on every packet         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                       │
│         Suppresses / defers proposals when mkie_shock_flags active       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐       ┌─────────────────┐       ┌───────────────┐
│ CoIE          │       │ MkIE            │       │ Financial     │
│ Org learning  │       │ Exogenous shocks│       │ Intelligence  │
└───────┬───────┘       └────────┬────────┘       └───────┬───────┘
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    INTELLIGENCE ESTATE                                   │
│  SCDG · Customer DNA · Salesperson DNA · Marketing DNA · CPO           │
│  (all receive shock context — none infer market causality alone)         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              CUSTOMER INTELLIGENCE PLATFORM (Level 7–10)                   │
│              MIE · OIE · EIE — endogenous operational signals              │
└───────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Information flow

```
Exogenous signals (human + feeds + floor + CRM lost_reason spikes)
    → MkIE detection
    → MkIE classification + impact model
    → Shock Registry entry (KA-09)
    → SCDG context nodes + edge freeze flags
    → DNA phenotype overlays (not genotype mutation)
    → Marketing DNA efficiency reinterpretation
    → ERE proposal gating
    → Executive Copilot context line
```

**Direction:** MkIE flows **down** as context. It never backpropagates market events into proof efficacy as if Viaggio caused them.

### 2.2 Relationship to MIE

| | MIE (Level 7–10) | MkIE (Level 11) |
|---|------------------|-----------------|
| **Question** | Which campaign touch contributed? | What external event confounded results? |
| **Variance type** | Endogenous attribution | Exogenous attribution |
| **Unit** | Channel × creative × session | Shock × market × time window |
| **Failure mode** | Over-credit Meta | Blame AI for Toyota promo |

MIE and MkIE compose: *"Radio QR efficiency dropped — but MkIE flags competitor 0% week; do not demote radio creative."*

---

## 3. Market Shock Taxonomy

All registered events use a **typed shock ontology** aligned with SCDG `market_shock` context nodes and CPO versioning.

### 3.1 Primary shock classes

```yaml
shockClass:
  COMPETITOR_ACTION
  OEM_POLICY
  PRICING_SHIFT
  FX_MOVEMENT
  REGULATORY
  INVENTORY_SHOCK
  MACROECONOMIC
  SEASONALITY          # exogenous calendar / climate — not staffing choice
  CATEGORY_NARRATIVE   # EV hype, SUV share shift, brand-country sentiment
  SUPPLY_CHAIN         # port delay, chip allocation — when external to dealer ops
```

### 3.2 Subtypes (Santa Cruz automotive reference)

| Class | Subtype | Example |
|-------|---------|---------|
| `COMPETITOR_ACTION` | `promo_financing` | Toyota 0% rumor at Equipetrol competitor |
| `COMPETITOR_ACTION` | `lot_event` | Corolla Cross launch weekend |
| `COMPETITOR_ACTION` | `aggressive_trade_in` | Competitor trade-in bonus |
| `OEM_POLICY` | `warranty_change` | GAC 7-year powertrain extension |
| `OEM_POLICY` | `allocation_cut` | GS4 Max white unavailable 6 weeks |
| `OEM_POLICY` | `recall_advisory` | Regional safety bulletin |
| `PRICING_SHIFT` | `competitor_list` | Corolla Cross −$800 equivalent |
| `PRICING_SHIFT` | `informal_market` | Parallel import undercut |
| `FX_MOVEMENT` | `official_rate` | Central bank band adjustment |
| `FX_MOVEMENT` | `parallel_spread` | Dollar street premium widens |
| `REGULATORY` | `import_duty` | Tariff on CBU category |
| `REGULATORY` | `financing_disclosure` | New cuota advertising rule |
| `INVENTORY_SHOCK` | `national_shortage` | Trim not buildable |
| `INVENTORY_SHOCK` | `local_demo_loss` | Demo unit accident — not ops negligence flag |
| `MACROECONOMIC` | `credit_tightening` | Bank auto loan approval drop |
| `MACROECONOMIC` | `fuel_price` | Diesel +12% — TCO objection spike |
| `MACROECONOMIC` | `income_cycle` | Soy harvest liquidity wave |
| `SEASONALITY` | `rainy_season` | Walk-in ↓; WhatsApp async ↑ |
| `CATEGORY_NARRATIVE` | `ev_anxiety` | "Only Toyota is safe" media cycle |
| `CATEGORY_NARRATIVE` | `china_brand_sentiment` | National news on Chinese imports |

### 3.3 Shock scope dimensions

Every shock is tagged along **scope axes** — federation and impact modeling depend on these:

```yaml
scope:
  geography: node_id | region_id | national | latam_fragment
  category: automotive_suv | automotive_sedan | considered_purchase_all
  brand_exposure: gac | toyota_competitive_set | all_oem
  channel_sensitivity: walk_in | meta | finance_desk | all
  customer_dna_affinity: [cluster_id]   # optional — which genotypes amplify
```

### 3.4 Shock severity bands

| Band | Definition | Default learning policy |
|------|------------|-------------------------|
| `S0 — ambient` | Background noise; <5% expected outcome shift | Log only |
| `S1 — localized` | Single competitor lot; 1–2 week window | Annotate reports |
| `S2 — material` | Measurable lost_reason or traffic shift | Freeze proof promotions |
| `S3 — structural` | Multi-week; affects margin model | Freeze + executive packet |
| `S4 — regime` | FX/regulatory/category reset | Quarterly strategy queue |

---

## 4. Shock Detection

MkIE detection is **multi-source, human-validated, and conservative**. A shock is not real because an LLM said so — it is real when **evidence crosses threshold** and a **steward attests**.

### 4.1 Signal sources (exogenous)

| Source tier | Examples | Latency |
|-------------|----------|---------|
| **T0 — Structured feeds** | FX official rate, fuel index, regulatory gazette | Daily |
| **T1 — Competitive intelligence** | Dealer scout reports, OEM bulletins, social promo scans | 24–72 hr |
| **T2 — Floor signals** | Consultant verbal tags, walk-out interviews | Real-time |
| **T3 — CRM anomaly** | `lost_reason: competitor` spike; compare mentions | 48 hr |
| **T4 — Graph anomaly** | SCDG path shift without internal config change | Weekly |
| **T5 — Marketing DNA drift** | CAC ↑ with genotype mix stable — suggests external pull | Weekly |

### 4.2 Detection pipeline

```
Signal ingest
  → Deduplicate (same Toyota promo from 3 consultants = 1 candidate)
  → Correlate with scope (Santa Cruz vs national)
  → Cross-check endogenous exclusions (did we change price? staffing? creative?)
  → Score confidence (0–1)
  → If confidence ≥ 0.6 OR CRM anomaly ≥ 2σ → candidate_shock
  → Human steward review (≤24 hr for S2+)
  → Registry publish OR reject with reason
```

### 4.3 Detection heuristics (non-exhaustive)

| Pattern | Hypothesis | Confirm with |
|---------|------------|--------------|
| `lost_reason: competitor` ↑ 2σ, no MkIE yet | Competitor promo | Floor CI + competitor lot visit |
| Compare path revisit ↑, trust nodes stable | External price anchor moved | Pricing shift subtype |
| Finance objection ↑, no rate card change | Credit tightening or FX | Bank bulletin + FX feed |
| Walk-in ↓, Meta stable, rainy season calendar | Seasonality | Historical season prior |
| `china_brand` objection ↑ without creative change | Category narrative shock | News corpus + OEM statement |
| Test-drive requests ↑, closes ↓, inventory node active | Inventory shock | OIE stock truth |

### 4.4 Anti-detection failures (what not to detect as exogenous)

| False exogenous | Actual endogenous owner |
|---------------|-------------------------|
| Session drop after deploy | CoIE release regression |
| Lost spike after consultant turnover | Salesperson DNA / training gap |
| Lead quality drop after Meta creative change | Marketing DNA |
| SLA breach Saturday | OIE staffing |

CoIE maintains an **endogenous event calendar** MkIE must consult before promoting a candidate shock.

---

## 5. Shock Classification

Detection produces candidates; **classification** assigns operational meaning — severity, scope, affected subgraphs, and learning policy.

### 5.1 Classification schema

```yaml
classifiedShock:
  shockId: uuid
  class: COMPETITOR_ACTION
  subtype: promo_financing
  severity: S2
  confidence: 0.78
  title: "Toyota Corolla Cross 0% financing rumor — Equipetrol corridor"
  narrative: "Three floor reports + CRM competitor losses; no Viaggio pricing change"

  window:
    detectedAt: timestamp
    effectiveStart: date          # when market impact likely began
    expectedEnd: date | open_ended
    halfLifeDays: int             # impact decay assumption

  scope:
    geography: santa_cruz_node
    category: automotive_suv
    brand_exposure: toyota_competitive_set
    channel_sensitivity: walk_in

  evidence:
    sources: [floor_report, crm_anomaly, consultant_tag]
    crmDelta: { lost_reason_competitor: +2.4σ }
    scdgDelta: { edge_compare_corolla: +1.8σ traffic }
    endogenousRuledOut: [no_config_change, no_price_change]

  learningPolicy:
    freezeProofPromotion: true
    freezeEdgeWeightAutoUpdate: true
    allowPhenotypeOverlay: true
    allowGenotypeMutation: false
    ereDeferral: [campaign_budget_shift, proof_sequence_promotion]

  steward:
    attestedBy: role
    attestedAt: timestamp
    disputeStatus: none | contested | overturned
```

### 5.2 Classification decision tree (summary)

```
Is variance explained by endogenous calendar? → NO
Is geographic scope consistent with signal? → YES
Is CRM/graph shift temporally aligned? → YES
Severity:
  lost_reason or traffic ≥ 2σ → S2 minimum
  FX/regulatory national → S3–S4
  Rumor unconfirmed + no CRM shift → S0–S1, watchlist
```

### 5.3 Contested shocks

Floor may disagree ("customers aren't mentioning Toyota"). MkIE holds **contested** state:

- Learning freeze **on** if severity ≥ S2 (conservative)  
- Executive Copilot receives **dispute flag**  
- Resolution within 72 hr or auto-downgrade to S1  

**Never** silently delete a shock — append `overturned` with reason for CoIE audit.

---

## 6. Impact Modeling

MkIE estimates **how much** exogenous force moved outcomes — not to claim precision, but to **bound false attribution** before internal systems retrain.

### 6.1 Impact model outputs

```yaml
impactModel:
  shockId: uuid
  version: int

  # Directional effects (hypothesis — not CRM ground truth)
  expectedEffects:
    - metric: lost_reason_competitor_rate
      direction: up
      magnitudeBand: moderate        # low | moderate | high
    - metric: walk_in_traffic
      direction: down
      magnitudeBand: low
    - metric: compare_path_revisit_rate
      direction: up
      magnitudeBand: moderate

  # DNA-specific amplification
  dnaAmplification:
    - cluster: Compare-First Researcher
      amplification: 1.4
    - cluster: Trust-Anxious Co-Decision Family
      amplification: 0.9

  # SCDG edge sensitivity (which paths confounded)
  sensitiveEdges: [edge_compare_corolla, edge_validation_tco]
  mkie_shock_adj: float              # global weight dampener 0.0–1.0

  # Counterfactual band (weekly)
  attributedExogenousShare: 0.35     # 35% of Δ potentially external
  confidenceInterval: [0.15, 0.55]
  minimumN: int
  modelMethod: crm_baseline | diff_in_diff | prior_season
```

### 6.2 Modeling methods (by maturity)

| Maturity | Method | When used |
|----------|--------|-----------|
| L8 | Rule-based priors | Subtype → default effect direction |
| L9 | CRM diff-in-diff vs prior year week | Seasonally adjusted |
| L10 | Graph-aligned DiD | SCDG path mix as covariate |
| L11 | Shock library regression | Historical shock registry as priors |

### 6.3 Impact model constraints

1. **No single-number causality** in executive packets — always bands + minimum-N  
2. **Impact models decay** — `halfLifeDays` reduces adj weight automatically  
3. **Inventory shocks** model separately from demand shocks (supply ≠ persuasion failure)  
4. **FX shocks** route to finance objection nodes — not proof rank demotion  

### 6.4 Santa Cruz worked example

**Shock:** Corolla Cross promo rumor, S2, week 24.

| Metric | Raw Δ | MkIE-adjusted interpretation |
|--------|-------|------------------------------|
| Win rate | −11% | −4 to −7% endogenous concern after exogenous band |
| `compare_corolla` edge weight | +2.3σ | Freeze promotion — traffic is defensive, not proof lift |
| Trust-Anxious cluster loss | +8% | Partially expected — competitor trust anchor |
| Meta CAC | stable | Marketing DNA: acquisition not broken |

---

## 7. Shock Registry

The **Market Shock Registry** is **KA-09** — a versioned, auditable ledger of classified exogenous events. It is MkIE's persistent memory and the moat's **causal discipline record**.

### 7.1 Registry entry (canonical)

```yaml
registryEntry:
  shockId: uuid
  registryVersion: 4
  status: active | expired | overturned | superseded
  classifiedShock: classifiedShock    # §5.1
  impactModel: impactModel            # §6.1

  # Lineage
  supersededBy: shockId?
  relatedShocks: [shockId]            # e.g. FX + credit tightening
  cpoVersionAtCapture: string

  # Downstream consumption audit
  consumers:
    scdg: { contextNodeId, edgesFrozen: [edge_id] }
    customerDNA: { phenotypeOverlay: true }
    marketingDNA: { efficiencyReinterpreted: true }
    ere: { proposalsDeferred: [rec_id] }
    executiveCopilot: { packetIds: [dec_w24_01] }

  # Learning release
  learningReleasedAt: timestamp?
  releasedBy: role
  postShockReview: { expected vs actual }
```

### 7.2 Registry operations

| Operation | Trigger | Rule |
|-----------|---------|------|
| **Publish** | Steward attestation | Immutable entry; corrections via supersede |
| **Activate learning freeze** | severity ≥ S2 | Auto |
| **Expire** | `expectedEnd` + review | Auto-downgrade adj weights |
| **Supersede** | Better classification | Old entry `superseded`, not deleted |
| **Post-shock review** | 2 weeks after expiry | Calibrate impact model priors |

### 7.3 Registry queries (intelligence)

1. *"What exogenous events overlapped week 24?"*  
2. *"Which proof promotions were frozen due to shocks this quarter?"*  
3. *"Historical S2 competitor promos — median exogenous share?"*  
4. *"Was Bolivia L1 node affected by same shock as Santa Cruz?"*  
5. *"Did we ever blame AI when MkIE had active S3 FX shock?"* (audit)

### 7.4 Retention and depreciation

Per [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md), KA-09 is **Tier C — depreciating without refresh**. Historical shocks inform priors but do not replace current sensing. Registry older than 36 months compresses to **seasonal/regime summaries** unless S4.

---

## 8. Interaction with SCDG

SCDG is MkIE's primary **downstream consumer** for confound labeling. See [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) §2.6, §7.

### 8.1 Graph artifacts

| Artifact | MkIE action |
|----------|-------------|
| `market_shock` context node | One node per active registry entry on affected PathInstances |
| `mkie_shock_adj` on edges | Dampen auto weight updates during shock window |
| Weekly graph diff | Split **raw Δ** vs **shock-adjusted Δ** in ERE feed |
| Holdout experiments | Pause promotion if shock overlaps treatment week |

### 8.2 PathInstance tagging

```yaml
pathInstance:
  edges: [edge_id]
  mkieContext:
    activeShocks: [shockId]
    phenotypeOverlayApplied: bool
  outcomeInterpretation:
    raw: won
    mkieAnnotated: "won — competitor promo week; compare-heavy path"
```

### 8.3 Graph integrity rules (MkIE extensions)

| Rule | Rationale |
|------|-----------|
| Active S2+ shock → freeze auto edge promotion | External confound |
| Shock context on path if **any** session day overlapped window | Honest labeling |
| Post-shock release requires CoIE minimum-N | Avoid premature unfreeze |
| `lost_reason: competitor` during COMPETITOR_ACTION → expected path, not proof failure | Correct ontology |

### 8.4 Graph queries MkIE enables

- *"Highest-lift path to won for Trust-Anxious DNA **under no MkIE shock**?"*  
- *"Did Meta subgraphs shift after Corolla promo week 24?"*  
- *"Edge weight Δ attributable to exogenous share > 50%?"* → defer ERE action  

---

## 9. Interaction with Marketing DNA

Marketing DNA measures **who we bought**. MkIE explains when **the market moved underneath** that acquisition — preventing false creative and budget attribution.

### 9.1 Reinterpretation matrix

| Observation | Without MkIE | With MkIE |
|-------------|--------------|-----------|
| CAC ↑, genotype mix stable | "Creative failed" | Check competitor pull / FX |
| Radio QR efficiency ↓ | "Demote radio" | Rainy season + walk-in seasonality |
| Meta leads ↑, wins ↓ | "Landing broken" | Competitor promo — defensive researchers |
| Genotype drift ↑ | "Wrong targeting" | Category narrative shock |

### 9.2 Marketing DNA fields affected

```yaml
marketingDNA:
  # ... standard fields — see LEVEL11 §4
  mkieOverlay:
    activeShocks: [shockId]
    efficiencyReinterpreted: true
    raw_assistedGP_per_dollar: 0.34
    mkie_adjusted_band: [0.28, 0.38]
    budgetRecommendationHold: true    # ERE defers shift
```

### 9.3 Loop (exogenous-aware)

```
Marketing DNA (who we bought)
    → Customer DNA (who arrived)
        → SCDG (what they did)
            → Outcome
                → Marketing DNA efficiency update
                    → MkIE gate: "is Δ exogenous?"
                        → if yes: hold budget packet, annotate board
                        → if no: ERE may propose shift
```

**Rule:** MkIE never edits creative. It **holds or contextualizes** efficiency conclusions.

---

## 10. Interaction with Executive Copilot

Executive Copilot **must** surface MkIE context — constitutional per [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md).

### 10.1 Weekly packet integration

```yaml
executiveWeeklyPacket:
  mkieShockSummary: "S2 competitor promo active W24–W25; proof promotions frozen"
  decisions:
    - evidence:
        mkieAdjusted: true
        mkieShockIds: [shock_uuid]
```

### 10.2 Packet types MkIE triggers

| Trigger | Copilot behavior |
|---------|------------------|
| New S2+ shock | Daily micro-packet: freeze guidance |
| Shock expiry | Release learning freeze recommendation |
| Post-shock review | Exception packet if model mispredicted |
| S4 regime shock | Red-zone strategic queue only |
| Contested shock | Amber: "Confirm or overturn steward call" |

### 10.3 Decision packet language rules

**Required phrasing pattern:**

```
SITUATION includes external context line
INFERENCE separates endogenous graph signal from MkIE band
RECOMMENDED ACTION never demotes proof solely during unadjusted competitor week
```

**Forbidden:**

- *"AI underperformed this week"* without MkIE line when S2+ active  
- Single-point exogenous attribution without confidence band  
- Auto-approve budget shift when `budgetRecommendationHold: true`  

### 10.4 Board mode

Quarterly board packet **Market context** section sources exclusively from MkIE registry rollup — not ad hoc GM narrative.

---

## 11. False Attribution Prevention

This is MkIE's **raison d'être**. False attribution destroys compounding: wrong proof demoted, wrong consultant coached, wrong budget cut, wrong investor story.

### 11.1 False attribution modes

| Mode | Symptom | MkIE prevention |
|------|---------|-----------------|
| **AI blame** | Bad week → retrain proofs | Shock freeze + mkieAdjusted reporting |
| **Creative blame** | CAC spike → kill Meta ad | Efficiency reinterpretation |
| **Consultant blame** | Losses → coaching push | Salesperson DNA anomaly vs shock overlay |
| **Season ignore** | Rainy week → staffing panic | SEASONALITY class + prior year DiD |
| **Inventory ignore** | No close → proof failure | INVENTORY_SHOCK → supply path |
| **Genotype corruption** | Promo week mutates DNA | Phenotype overlay only |
| **Investor narrative** | "Graph broke" | Board MkIE summary + freeze audit |

### 11.2 Gating matrix (ERE + CoIE)

| Internal signal | MkIE state | System action |
|-----------------|------------|---------------|
| Edge weight Δ > 2σ | No active shock | ERE may promote |
| Edge weight Δ > 2σ | S2+ shock | Defer; annotate |
| Edge weight Δ > 2σ | S1 shock | Amber packet with bands |
| CRM lost_reason shift | Matching shock class | Expected — no proof demotion |
| Holdout Δ negative | Overlapping shock | Invalidate experiment week |
| CoIE data quality fail | Any | No MkIE override — fix data first |

### 11.3 Attribution audit (monthly)

CoIE publishes **false attribution near-miss log**:

- Proposals that would have shipped without MkIE  
- Post-shock reviews where exogenous share was under-estimated  
- Steward disputes and overturns  

**Level 11 criterion:** Zero shipped proof demotions later overturned by post-shock review for same window.

---

## 12. Federation Considerations

MkIE must **federate** without cloning Santa Cruz shocks onto La Paz or São Paulo blindly. Aligns with SCDG LATAM layers in [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) §5.

### 12.1 Federation layers

```
Layer 0: Santa Cruz node — full MkIE sensing + registry
Layer 1: Bolivia urban — share national shocks; local competitor subgraph
Layer 2: LATAM automotive pack — taxonomy transfer, local feeds
Layer 3: Considered purchase abstract — regime classes only
```

### 12.2 Transfer rules

| Shock attribute | Transfer policy |
|-----------------|-----------------|
| Taxonomy (class/subtype) | Transfer topology |
| Severity prior | Transfer with −confidence |
| Scope geography | **Never** auto-expand |
| Impact model coefficients | **Never** clone — relearn minimum-N |
| Registry entry | Node-specific ID; `relatedShocks` link across nodes |

### 12.3 National vs local shocks

| Example | Federation behavior |
|---------|---------------------|
| BOB FX band shift | All Bolivia L1 nodes inherit S3 |
| Toyota promo Santa Cruz only | Santa Cruz S2; La Paz watchlist |
| GAC national recall | All GAC-exposed nodes S2+ |
| Rainy season | Node-specific SEASONALITY dates |

### 12.4 Multi-tenant benchmark (Y3+)

Anonymized shock **families** (not dealer names) may feed network priors:

*"COMPETITOR_ACTION.promo_financing in LATAM SUV typically 2-week half-life"* — improves impact bands without leaking competitive intelligence.

---

## 13. Failure Modes

### 13.1 MkIE failure catalog

| ID | Failure | Consequence | Mitigation |
|----|---------|-------------|------------|
| F-01 | **Shock blindness** — missed Toyota promo | False AI blame | CRM anomaly + floor CI ritual |
| F-02 | **Shock hallucination** — registered rumor without CRM | Learning frozen too long | Contested state; 72 hr overturn |
| F-03 | **Permanent freeze** — shock never expired | Stagnant graph | Auto-expire + executive review |
| F-04 | **Excuse engine** — everything external | No accountability | Endogenous calendar; steward dispute |
| F-05 | **Genotype corruption** | DNA wrong for months | Phenotype-only rule |
| F-06 | **Registry rot** — stale S4 regimes | Wrong priors | Tier C refresh; compress history |
| F-07 | **Federation overreach** | La Paz inherits Santa Cruz promo | Scope gate on geography |
| F-08 | **Impact overconfidence** | Bad budget decisions | Bands only; minimum-N |
| F-09 | **Steward bottleneck** — no attestation in 48 hr | Freeze without classification | Default S1 watchlist; escalate |
| F-10 | **MkIE bypass** — ERE ships despite flag | Moat discipline broken | CoIE constitutional audit |

### 13.2 Organizational failure modes

| Failure | MkIE response |
|---------|---------------|
| Floor doesn't tag competitor mentions | T3 CRM anomaly becomes primary |
| GM ignores micro-packet | CoIE compliance metric |
| Marketing disputes reinterpretation | Contested + hold budget |
| OEM withholds policy news | OEM_POLICY gap logged; widen uncertainty bands |

### 13.3 Trust Fabric alignment

MkIE outputs are **evidence-linked** — no shock without `evidence.sources`. Overrides require steward attestation. Fits CPI-OS Trust Fabric: explainability, human override, audit lineage.

---

## 14. Level 11 Maturity

MkIE maturity is measured by **attribution discipline**, not feed count.

### 14.1 Maturity ladder

| Level | MkIE capability |
|-------|-----------------|
| L6 | Ad hoc GM memory ("Toyota had a promo") |
| L7 | Manual shock log; reports mention external weeks |
| L8 | Registry v1; S2 freezes proof promotion manually |
| L9 | CRM anomaly detection; weekly mkieShockSummary |
| L10 | Impact bands; Marketing DNA reinterpretation; ERE gating |
| **L11** | **Full false-attribution prevention; federated L1; post-shock calibration; investor-auditable KA-09; zero overturned demotions per quarter** |

### 14.2 Level 11 formal criteria

MkIE contributes to Level 11 when **all** hold:

1. **≥90%** of weeks with material internal Δ have MkIE review completed  
2. **100%** of S2+ shocks attested within 24 hr  
3. **ERE deferral** respected — no proof promotion during active S2+ without executive override  
4. **Post-shock reviews** completed for 100% of S2+ within 14 days of expiry  
5. **Bolivia L1** node receives national shocks without geographic overreach  
6. **Board packet** Market context sourced from registry, not narrative  
7. **False attribution near-miss** log reviewed monthly by CoIE  
8. **Customer DNA genotype** never mutated by shock — audit clean  

### 14.3 Integration with CPI-OS Level 11 definition

From [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) Part 13:

> **MkIE-adjusted** performance reporting (no false AI blame)

MkIE is not optional at Level 11 — it is the **exogenous immune system** for the compounding estate.

---

## 15. Relationship to Moat

### 15.1 KA-09 in the moat stack

The **Market Shock Registry (KA-09)** is Tier C in [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) — it does not compound like SCDG edges, but **enables** compounding integrity:

```
Without KA-09:
  Proof Efficacy Matrix poisoned by Toyota promos
  SCDG edge weights encode competitor weeks as Viaggio failure
  Marketing DNA optimizes against ghosts
  Investor sees volatile "AI ROI"
  Copier can run same LLM — your graph learns wrong things faster

With KA-09:
  Holdout discipline survives exogenous weeks
  "Proof efficacy under MkIE shocks" becomes uncopyable operational patience
  Executive trust in compounding metric rises
```

### 15.2 Moat mechanisms MkIE protects

| Asset | Without MkIE | With MkIE |
|-------|--------------|-----------|
| **KA-01 SCDG** | Weights absorb noise | `mkie_shock_adj` preserves signal |
| **KA-06 Proof Efficacy** | False demotions | Freeze + valid holdouts |
| **KA-05 Marketing DNA** | Budget thrash | Hold + reinterpret |
| **KA-03 Customer DNA** | Genotype corruption | Phenotype overlay |
| **KA-07 Assisted Margin Ledger** | Wrong attribution | Exogenous bands in reporting |
| **KA-10 Experiment Genealogy** | Confounded lifts | Shock overlap in lineage |

### 15.3 What MkIE does not moat

- Raw FX feeds, news scrapers, competitor leaflets — **commodity**  
- Shock taxonomy schema — **publishable**  
- Individual shock entries — **not secret**  

**The moat is operational discipline:** years of **correctly separated** endogenous/exogenous learning while competitors retrain on confounded weeks.

### 15.4 Critic responses

| Critic | Attack | MkIE response |
|--------|--------|---------------|
| **McKinsey** | "You can't separate signal in dealer data" | Registry + post-shock calibration audit |
| **Palantir** | "No exogenous ontology governance" | CPO-linked shock taxonomy + federation rules |
| **a16z** | "Market intel is Bloomberg" | Bloomberg doesn't gate your proof rank or DNA mutation |
| **Toyota dealer network** | "We know market better" | They don't integrate shocks into a decision graph closed loop |

### 15.5 Investor sentence (MkIE-specific)

> *"Viaggio's Market Shock Registry ensures the Decision Graph learns from Viaggio — not from Toyota's promotion calendar. That separation is what makes assisted margin compounding credible."*

---

## Appendix A — Shock Steward Role

| Responsibility | Cadence |
|----------------|---------|
| Review candidate shocks | Daily if CRM anomaly |
| Attest S2+ within 24 hr | Per event |
| Dispute resolution | 72 hr |
| Post-shock review | Per expiry |
| Endogenous calendar upkeep with CoIE | Weekly |

**Steward** may be GM, sales director, or dedicated CI role — but must not be the same person who proposed the proof demotion under review.

---

## Appendix B — Document Map

| Document | MkIE relationship |
|----------|-------------------|
| [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) | `market_shock` nodes; freeze rules |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | mkieShockSummary; micro-packets |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | Proposal gating |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Phenotype overlay |
| [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) | Stack position; L11 criteria |
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | KA-09 asset |
| [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md) | MkIE mission summary |

---

*End of Market Intelligence Engine Specification v1.0*
