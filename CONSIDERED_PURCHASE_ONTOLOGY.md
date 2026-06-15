# Considered Purchase Ontology (CPO) — Intelligence Specification

**Version:** 1.0  
**Date:** 15 June 2026  
**Asset ID:** KA-02 (see [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md))  
**Codename:** CPI-OS canonical taxonomy  
**Builds on:** ASI · Phase X · SCDG · DNA engines · CoIE · [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md)  
**Constraint:** Intelligence governance only — not software, not storage, not UI  

---

## 1. Purpose

The **Considered Purchase Ontology (CPO)** is the **canonical, versioned vocabulary** governing all intelligence assets in **CPI-OS** (Considered Purchase Intelligence Operating System).

Every label applied to a customer interaction — every fear named, every proof classified, every outcome recorded — must resolve to a **CPO object** with defined semantics, lineage, and governance authority. Without CPO, the Santa Cruz Decision Graph is unstructured telemetry. With CPO, it becomes **auditable institutional memory**.

The CPO defines:

| Domain | What it governs |
|--------|-----------------|
| **Emotional states** | How the buyer feels right now — orthogonal to confidence |
| **Objections** | Latent, verbal, compound, and resolved fears |
| **Proof categories** | What evidence type moves which fear |
| **Decision frames** | What decision the buyer believes they are making |
| **Buying styles** | How the buyer processes information and closes |
| **Seeking modes** | What psychological need the buyer is trying to satisfy |
| **Household roles** | Who decides, who influences, who blocks |
| **Outcomes** | Won, lost, open — with mandatory lost-reason taxonomy |
| **Market shocks** | Exogenous events that confound internal performance |

The ontology must be:

| Property | Meaning |
|----------|---------|
| **Versioned** | Every intelligence artifact cites `cpo_version`; no silent relabeling |
| **Governed** | Changes require board authority, evidence, and floor validation |
| **Explainable** | Any label can be traced to definition, detection criteria, and outcome correlation |
| **Auditable** | Full genealogy from proposal → approval → deployment → outcome impact |

**CPO is not a prompt library.** It is the **semantic constitution** of considered purchase intelligence in Latin America — starting Santa Cruz layer 0, federating outward.

---

## 2. Position in Architecture

CPO sits at the **foundation of the Level 11 intelligence estate**. It does not learn from interactions directly; it **structures** what interactions mean so that SCDG, DNA libraries, and executive action can compound.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE COPILOT                                     │
│         Ontology Evolution packets · CPO lineage in every decision       │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                         │
│         Ontology Evolution (4.9) · Customer DNA Discovery (4.4)            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐       ┌─────────────────┐       ┌───────────────┐
│ SCDG          │       │ DNA Libraries   │       │ MkIE          │
│ Nodes = CPO   │       │ Genotype slots  │       │ Shock registry│
│ objects       │       │ = CPO enums     │       │ = CPO objects │
└───────┬───────┘       └────────┬────────┘       └───────┬───────┘
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│         CONSIDERED PURCHASE ONTOLOGY (CPO) — KA-02                       │
│  Emotional states · Objections · Proofs · Frames · Styles · Modes       │
│  Household roles · Outcomes · Market shocks                              │
│  Versioned · Governed · Explainable · Auditable                          │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              OBSERVATION LAYER (Level 7–10)                                │
│              ASI · BIL · OPE · DPE · NLU · Floor · CRM outcomes          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Flow rule:** Observations **map up** into CPO labels. CPO labels **constrain** graph nodes, DNA genotype slots, and executive recommendations. Outcomes **validate or challenge** CPO definitions — never the reverse.

**Authority hierarchy:**

1. **CPO** defines *what can be said* about a decision  
2. **SCDG** records *what was observed* using CPO vocabulary  
3. **DNA** compresses *who tends to exhibit* which CPO patterns  
4. **ERE / Executive Copilot** proposes *changes to CPO* when evidence demands  

No intelligence asset may introduce a label outside CPO without an approved **Ontology Change Proposal (OCP)**.

---

## 3. Ontology Design Principles

### P-01 — Culture-first, not category-first

CPO is derived from **Santa Cruz considered automotive purchase** — spouse co-decision, Chinese-brand anxiety, informal financing, WhatsApp-native nurture, Viaggio-as-local-anchor trust. US automotive playbooks are **reference only**, never source of truth.

### P-02 — Household, not individual

The atomic decision unit is the **household decision unit**. CPO objects may attach to roles within the household, but outcomes attach to the unit.

### P-03 — Phenotype over demographics

CPO classifies **behavior and language**, not age, income, or ZIP. Sparse demographics in Bolivia make behavioral genetics the only durable segmentation.

### P-04 — Compound objections are first-class

Real fears arrive bundled (`china_brand AND payment`, `spouse AND resale`). CPO must represent compounds without combinatorial explosion — via **canonical compounds** and **emergence rules**.

### P-05 — Every objection has a proof category map

An objection without an allowed proof category is **incomplete ontology** — it cannot enter SCDG as a learnable node.

### P-06 — Outcomes are mandatory validators

A CPO label that cannot be correlated with won/lost/margin over minimum-N is **provisional** — eligible for observation, not for routing or DNA locking.

### P-07 — Stability with governed evolution

Genotype-level CPO slots change rarely. Phenotype-level slots may shift session-to-session. **Version increments** track genotype-level changes only.

### P-08 — Explainability by construction

Every CPO object carries: `definition`, `detection_criteria`, `counter_examples`, `floor_validation_status`, `introduced_in_version`, `deprecated_in_version?`.

### P-09 — Federation without homogenization

LATAM layers **extend** CPO; they do not flatten Santa Cruz into a generic LATAM bucket. Topology transfers; definitions do not merge without evidence.

### P-10 — Human override is signal, not noise

When a consultant rejects an AI label, the override is typed against CPO alternatives — feeding drift detection and OCP backlog.

---

## 4. Object Taxonomy

All CPO objects share a common envelope:

```yaml
cpoObject:
  id: string                    # stable slug, immutable once published
  domain: enum                  # see domains below
  label_es: string              # floor-facing human label
  label_en: string              # investor / board label
  definition: string            # semantic meaning
  detection_criteria: [string]  # what observations justify assignment
  counter_examples: [string]    # what this is NOT
  parent_id: string?            # hierarchy
  compound_of: [id]?            # for canonical compounds
  proof_categories_allowed: [id]?
  status: active | provisional | deprecated
  floor_validated: boolean
  introduced_in_version: semver
  deprecated_in_version: semver?
  latam_layer: 0                # 0 = Santa Cruz canonical
```

---

### 4.1 Emotional states (`domain: emotional_state`)

How the buyer **feels right now** — orthogonal to confidence band.

| ID | Definition | Distinct from |
|----|------------|---------------|
| `curious` | Open exploration; low commitment fear | Excited (higher urgency) |
| `excited` | High energy forward motion | Fast-decision buying style |
| `skeptical` | Distrust of claim or brand; demands evidence | Analytical style |
| `defensive` | Fear of being sold to; payment shame | Price-sensitive concern |
| `anxious` | Fear of irreversible mistake | Overwhelmed (info overload) |
| `overwhelmed` | Cognitive overload; needs compression | Anxious (fear without overload) |
| `validation_seeking` | Needs external confirmation research is correct | Skeptical (distrust vs doubt) |
| `price_sensitive` | Monthly trap / TCO fear active | Defensive (shame vs math) |
| `family_protective` | Child/spouse safety frame dominant | Family-oriented buying style |
| `status_conscious` | Image and trim prestige active | Status-oriented buying style |
| `research_driven` | Data-gathering mode; compare-heavy | Analytical style |

**Rules:** Primary + optional secondary per session turn. `overwhelmed ≥ threshold` overrides primary for routing implications. Emotional state is **phenotype** — may change within session.

---

### 4.2 Objections (`domain: objection`)

| Subtype | ID pattern | Description |
|---------|------------|-------------|
| **Latent** | `objection_latent.*` | Predicted, not yet verbalized |
| **Verbal** | `objection_verbal.*` | Customer said aloud (NLU-mapped) |
| **Resolved** | `objection_resolved.*` | Status flip after sufficient proof |
| **Compound** | `objection_compound.*` | Canonical AND bundles |

**Santa Cruz canonical latent objections (v1.0 kernel):**

| ID | Core fear |
|----|-----------|
| `objection_latent.china_brand` | Chinese origin → reliability, parts, resale |
| `objection_latent.reliability` | Mechanical durability, turbo, transmission |
| `objection_latent.resale` | Depreciation vs Toyota benchmark |
| `objection_latent.financial` | Monthly payment, hidden fees, informal finance fit |
| `objection_latent.spouse` | Partner permission gate |
| `objection_latent.service` | Parts availability, workshop proximity, Viaggio continuity |
| `objection_latent.technology` | ADAS legitimacy, trim equipment depth |
| `objection_latent.decision_paralysis` | Cannot commit despite information sufficiency |
| `objection_latent.viaggio_trust` | Dealer vs importador; local anchor |

**Canonical compounds (v1.0):**

| ID | Components |
|----|------------|
| `objection_compound.china_brand_payment` | china_brand AND financial |
| `objection_compound.china_brand_spouse` | china_brand AND spouse |
| `objection_compound.payment_defensive` | financial AND defensive emotional state |
| `objection_compound.spouse_resale` | spouse AND resale |

**Emergence rule:** When SCDG shows ≥minimum-N paths with consistent unlabeled compound pattern → OCP required within 30 days.

---

### 4.3 Proof categories (`domain: proof_category`)

Proof categories classify **evidence type**, not content asset ID. Content maps to categories; categories map to objections.

| ID | Resolves (primarily) | Category meaning |
|----|----------------------|------------------|
| `proof_category.brand_trust` | china_brand, viaggio_trust | FAQ, heritage honesty, admit limits |
| `proof_category.local_service` | service, china_brand | Viaggio workshop, parts, continuity |
| `proof_category.safety_evidence` | family_protective, reliability | C-NCAP, ADAS, airbags |
| `proof_category.honest_compare` | validation_seeking, resale | Scorecard with admitted losses |
| `proof_category.tco_value` | financial, resale | Total cost, warranty, reventa context |
| `proof_category.financing_transparency` | financial, defensive | Disclaimer-first, range not promise |
| `proof_category.family_narrative` | family_protective, spouse | Diego frame, rear seat, joint decision |
| `proof_category.technology_depth` | technology, status_conscious | Full equipo, ADAS walkthrough |
| `proof_category.permission_enabler` | spouse | Share card, async WhatsApp, joint test drive |
| `proof_category.decision_compression` | decision_paralysis, overwhelmed | Proof sufficiency → test drive ask |

**Proof sufficiency** is a derived CPO state: boolean gate when required proof categories for active objections are satisfied.

---

### 4.4 Decision frames (`domain: decision_frame`)

What the buyer believes they are deciding — not what the salesperson wishes they were deciding.

| ID | Buyer mental model | Sales misread to avoid |
|----|-------------------|------------------------|
| `frame.explore_category` | "Is this class of car for me?" | Pushing test drive too early |
| `frame.choose_model` | "GS4 MAX vs alternatives" | Trust loop when compare-ready |
| `frame.validate_research` | "Was my online research correct?" | Hype instead of scorecard |
| `frame.fit_family_budget` | "Can we afford this responsibly?" | Trim upsell before TCO |
| `frame.get_permission` | "Can I convince my spouse?" | Solo close tactics |
| `frame.reduce_risk` | "What if something goes wrong?" | Speed over service proof |
| `frame.signal_status` | "Will this make me look good?" | Practical TCO-only pitch |
| `frame.commit_today` | "Should I stop looking and act?" | More education post-sufficiency |

Decision frame is **phenotype**, inferred from language + behavior. It constrains CTA class, not screen order alone.

---

### 4.5 Buying styles (`domain: buying_style`)

Stable-ish preference for how information is processed — **BSM kernel**.

| ID | Closes via | Friction |
|----|-----------|----------|
| `buying_style.analytical` | Tables, TCO, honest losses | Vague claims |
| `buying_style.emotional` | Story, family imagery, feel | Dense stats |
| `buying_style.practical` | Daily use, warranty, consumo | Brand philosophy |
| `buying_style.status_oriented` | Full equipo, design wins | "Cheap" framing |
| `buying_style.security_oriented` | FAQ + ADAS + service path | Rushed compare |
| `buying_style.family_oriented` | Joint test drive, rear seat | Solo-focused copy |
| `buying_style.fast_decision` | Verdict, one number | Long arcs |
| `buying_style.slow_decision` | Permission, WhatsApp nurture | Pushy CTAs |

Buying style is **genotype-leaning** — may lock at confidence ≥0.7 with outcome validation.

---

### 4.6 Seeking modes (`domain: seeking_mode`)

What psychological need the buyer is trying to satisfy **right now**.

| ID | Need | Successful response pattern |
|----|------|----------------------------|
| `seeking_mode.certainty` | "Tell me the right answer" | Clear recommendation with evidence |
| `seeking_mode.validation` | "Confirm I'm not wrong" | Honest compare, admit Toyota wins |
| `seeking_mode.permission` | "Help me convince others" | Share, joint visit, async card |
| `seeking_mode.reassurance` | "Tell me it's normal to hesitate" | Normalize, shorten path |
| `seeking_mode.urgency` | "Help me act before I lose it" | Compress, test drive, inventory truth |

Seeking mode is **phenotype** — may shift within session (e.g. validation → permission when spouse enters).

**v1.0 extension candidate (provisional):** `seeking_mode.permission_delayed_async` — permission sought via WhatsApp, not in-room.

---

### 4.7 Household roles (`domain: household_role`)

| ID | Authority | CPO attachment rules |
|----|-----------|---------------------|
| `household_role.primary_buyer` | Initiates; often drives interaction | Default actor on session |
| `household_role.partner` | Co-decision; veto power | Permission-seeking mode amplifier |
| `household_role.influencer` | Advises; may not sign | Genotype fragment only with consent |
| `household_role.user` | Drives car; may not pay | Phenotype signal, not outcome owner |
| `household_role.financial_gate` | Controls payment approval | Financial objection compound trigger |

**Household decision unit** is the container — not a CPO object but a **required context** on all genotype-level assignments.

**Consent rule:** Influencer and partner fragments cannot merge into household genotype without documented consent event.

---

### 4.8 Outcomes (`domain: outcome`)

| ID | Terminal? | Required fields |
|----|-----------|-----------------|
| `outcome.won` | Yes | margin_band, days_to_close |
| `outcome.lost` | Yes | **lost_reason** (mandatory) |
| `outcome.open` | No | expected_close_window |
| `outcome.no_show` | Yes | prior_action_id |

**Lost reason taxonomy (v1.0):**

| ID | Meaning |
|----|---------|
| `lost_reason.price` | Could not meet payment/TCO threshold |
| `lost_reason.spouse` | Partner blocked |
| `lost_reason.competitor` | Chose alternative brand/dealer |
| `lost_reason.financing` | Credit, down payment, informal finance mismatch |
| `lost_reason.timing` | Not ready; life event |
| `lost_reason.trust` | Brand, dealer, or proof failure |
| `lost_reason.inventory` | Unit, color, trim unavailable |
| `lost_reason.ghost` | Unreachable after qualified engagement |

No `outcome.lost` without `lost_reason` → edge excluded from SCDG learning (CoIE gate G-01).

---

### 4.9 Market shocks (`domain: market_shock`)

Exogenous events that invalidate week-over-week comparison. MkIE registry objects — CPO-defined types.

| ID | Examples | Graph behavior |
|----|----------|----------------|
| `market_shock.competitor_promo` | Corolla 0km promo week | Freeze edge promotion |
| `market_shock.fx_move` | BOB/USD shift > threshold | Adjust financial objection prior |
| `market_shock.oem_policy` | GAC warranty change | Proof category refresh review |
| `market_shock.inventory_disruption` | National trim shortage | Inventory outcome spike expected |
| `market_shock.regulatory` | Import rule, emissions | Trust objection prior shift |
| `market_shock.seasonal` | Agro income season, holidays | Demand mix annotation only |

Market shocks **annotate** SCDG edges; they do not redefine CPO objects unless persistent cultural shift is proven (OCP + 2-quarter evidence).

---

## 5. Ontology Versioning

CPO uses **semantic versioning** tied to intelligence estate releases:

```
MAJOR.MINOR.PATCH

MAJOR — Breaking relabel: deprecated IDs, merged clusters, split objections affecting DNA genotype
MINOR — Additive: new objects, new compounds, new proof categories (backward compatible)
PATCH — Clarifications: definition text, detection criteria, counter-examples (no ID change)
```

### Version artifact

```yaml
cpoRelease:
  version: "1.0.0"
  release_date: 2026-06-15
  latam_layer: 0
  market: Santa Cruz automotive considered purchase
  changelog:
    - type: introduced
      objects: [objection_latent.viaggio_trust, ...]
  migration_notes:
    - from: null
      to: "1.0.0"
      action: initial_kernel
  floor_validation:
    sales_director_signoff: required
    minimum_outcome_paths_reviewed: 0  # N/A at genesis
  superseded_by: null
```

### Lineage rules

| Rule | Rationale |
|------|-----------|
| Every SCDG edge cites `cpo_version` at creation | Historical queries remain valid |
| Every DNA genotype lock cites `cpo_version` | Cluster definitions traceable |
| Every ERE packet cites `ontology_version` | Executive audit |
| MAJOR bump → 90-day dual-label window | Reconcile historical edges |
| PATCH requires no ERE packet | CoIE log only |
| MINOR with new routing implications → Amber Copilot packet | Visibility before silent routing shift |

### Version maturity states

| State | Meaning |
|-------|---------|
| **Draft** | Internal psychology + data review only |
| **Provisional** | Observable in graph; not for genotype lock or auto-routing |
| **Active** | Full intelligence estate use |
| **Deprecated** | Historical edges retained; no new assignments |
| **Retired** | Migrated to successor ID; edges remapped in audit pass |

---

## 6. Ontology Governance Board

The **CPO Governance Board** is the human authority over taxonomy integrity. It exists because **no algorithm may redefine what a fear means**.

### Composition

| Seat | Role | Veto domain |
|------|------|-------------|
| **Sales Director** | Floor truth, consultant language | Objections, proof categories, outcomes |
| **Chief Intelligence Officer (or delegate)** | Graph evidence, statistical discipline | Compounds, emergence promotion |
| **Customer Experience Lead** | Household consent, trust ethics | Household roles, seeking modes |
| **CoIE Chair** | Data quality, holdout discipline | Any change affecting learning gates |
| **GM** | Business impact, margin alignment | MAJOR version approval |
| **Optional: OEM liaison** | Brand/legal constraints | Brand-trust proof definitions only — no veto on local trust objects |

### Cadence

| Ritual | Frequency | Output |
|--------|-----------|--------|
| **CPO Standing Review** | Monthly | OCP backlog triage |
| **Quarterly Ontology Audit** | Quarterly | Drift report, deprecated object review |
| **Annual LATAM Federation Review** | Annual | Layer extension proposals |
| **Emergency Session** | On CoIE red gate | Freeze MAJOR changes during data integrity failure |

### Decision thresholds

| Change type | Board quorum | Executive Copilot zone |
|-------------|--------------|------------------------|
| PATCH | CoIE + Sales Director | Log only |
| MINOR (no routing) | 3 of 5 seats | Green after log |
| MINOR (routing impact) | 4 of 5 seats | Amber — GM approve |
| MAJOR | Unanimous minus optional OEM | Amber — GM + board minutes |
| Deprecation | 4 of 5 + 60-day notice | Amber |
| LATAM layer extension | GM + CIO + local market lead | Red if new layer |

### Board invariants

1. **Floor validation is mandatory** for objection and proof category changes — graph statistics alone insufficient.  
2. **No MAJOR release during active MkIE shock** without shock annotation in changelog.  
3. **Board minutes are investor-auditable** — tied to config genealogy (KA-10).  
4. **Dissent is recorded** — minority floor opinion enters Override corpus taxonomy.

---

## 7. Ontology Change Proposals

An **Ontology Change Proposal (OCP)** is the only path to modify Active CPO objects.

### OCP schema

```yaml
ocp:
  id: OCP-2026-014
  title: "Formalize permission_delayed_async seeking mode"
  proposer: ERE | Sales Director | CoIE | DNA Discovery
  type: introduce | merge | split | deprecate | redefine
  target_version: "1.1.0"
  affected_domains: [seeking_mode]
  affected_objects:
    - id: seeking_mode.permission_delayed_async
      action: introduce
  evidence:
    scdg_paths: 312
    outcome_correlation: 0.18 lift to won
    override_corpus_count: 47
    floor_interviews: 3 consultants
  detection_criteria_proposed: [...]
  counter_examples_proposed: [...]
  migration_plan:
    dual_label_days: 90
    dna_recluster_required: false
  holdout_requirement: passed | pending | waived_with_reason
  board_vote: pending
  copilot_packet_id: dec_w24_04
```

### OCP sources

| Source | Typical trigger |
|--------|-----------------|
| **SCDG weekly diff** | New compound objection emergence |
| **Customer DNA Discovery** | Cluster split implying new genotype slot |
| **Override corpus** | Consultants consistently reject AI label |
| **Floor intake** | New customer language not in NLU map |
| **MkIE** | Persistent shock shifts objection prior 2+ quarters |
| **LATAM layer pilot** | Local market object not in layer 0 |

### OCP lifecycle

```
Draft → Evidence review (CoIE) → Floor validation → Board vote →
  Provisional (optional) → Active → Monitor 2 quarters → Close or iterate
```

### Rejection reasons (logged for ERE learning)

- Insufficient minimum-N  
- No floor validation  
- Duplicate of existing object (merge instead)  
- Combinatorial explosion risk  
- Ethics/consent concern  
- MkIE confound not cleared  

---

## 8. Ontology Drift Detection

**Ontology drift** occurs when **observed language and behavior diverge from CPO definitions** — or when **consultants and AI systematically disagree** on labels.

### Drift signals

| Signal | Detection | Severity |
|--------|-----------|----------|
| **Unlabeled compound emergence** | SCDG paths with 2+ active objections, no `objection_compound.*` | High — OCP within 30 days |
| **NLU orphan rate** | Verbal fear phrases with no `objection_verbal.*` mapping | Medium — weekly CoIE |
| **Override clustering** | Same override reason >2σ vs baseline | High — definition or detection failure |
| **DNA orphan cluster** | Households high confidence, no cohort label | Medium — split or merge OCP |
| **Proof category mismatch** | Proof shown, objection unresolved, high won correlation elsewhere | Medium — proof map wrong |
| **Lost reason entropy** | `lost_reason.ghost` or null rising | High — outcome taxonomy gap |
| **Cross-layer label collision** | La Paz layer reuses ID with different local meaning | Critical — federation violation |
| **Gen Z language shift** | Emotional state detection criteria stale 2+ quarters | Low — quarterly audit |

### Drift response matrix

| Severity | Automatic action | Human action |
|----------|------------------|--------------|
| Low | CoIE log | Next quarterly audit |
| Medium | Amber Copilot packet | OCP draft within 60 days |
| High | Freeze genotype lock on affected objects | Emergency board session within 14 days |
| Critical | Freeze MAJOR routing changes | LATAM federation halt until resolved |

### Drift metric (published quarterly)

```
drift_index =
  w1 · unlabeled_compound_rate
+ w2 · override_disagreement_rate
+ w3 · orphan_verbal_rate
+ w4 · deprecated_object_assignment_rate
```

**Moat health:** Rising drift unresolved → compounding penalty ε in moat formula ([MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)).

---

## 9. Relationship to SCDG

SCDG nodes **are instances of CPO objects**. The graph is the empirical record; CPO is the type system.

| SCDG node type | CPO domain |
|----------------|------------|
| `emotional_state` | emotional_state |
| `objection_latent`, `objection_verbal`, `objection_resolved` | objection |
| `proof` | maps to proof_category (+ content ref) |
| `action`, `action_result` | not CPO — operational |
| `outcome`, `lost_reason` | outcome |
| `market_shock` | market_shock |
| `customer_dna`, `salesperson_dna`, `marketing_dna` | DNA IDs — genotype uses CPO enums |
| `household` | household_role context |

### SCDG → CPO feedback loop

```
Weekly graph diff
  → compound emergence? → OCP
  → proof edge Δ > 2σ? → proof_category map review (not automatic OCP)
  → new verbal phrase cluster? → objection_verbal candidate
  → outcome label gaps? → lost_reason OCP
```

**Rule:** SCDG may propose CPO changes; it may not enact them. Edge weights update freely within Active CPO version.

**Integrity:** Edges created under `cpo_version X` remain interpretable after version `Y` via migration map — never silent relabel of historical edges.

---

## 10. Relationship to DNA Engines

DNA libraries **compress SCDG paths into signatures** whose genotype slots are **CPO enums**.

### Customer DNA

| DNA field | CPO source |
|-----------|------------|
| `genotype.primary_concern` | objection domain (collapsed) |
| `genotype.co_decision_mode` | household_role pattern |
| `genotype.buying_style` | buying_style |
| `phenotype.dominant_emotional_state` | emotional_state |
| `phenotype.seeking_mode` | seeking_mode |
| `phenotype.decision_frame` | decision_frame |
| `phenotype.compound_objections` | objection_compound IDs |
| `cohortLabel` | human name for CPO pattern bundle — not a new object |

**Rule:** Genotype slots lock only against **Active** CPO objects at stated version.

### Salesperson DNA

| DNA field | CPO dependency |
|-----------|----------------|
| `affinity.objection_resolution_signature` | which proof_categories succeed per consultant |
| `affinity.seeking_mode_response` | permission vs certainty handling |
| `override_pattern` | typed CPO label disagreements |

### Marketing DNA

| DNA field | CPO dependency |
|-----------|----------------|
| `acquiredGenotypeMix` | distribution over Customer DNA cohorts (CPO-pattern bundles) |
| `creativeProof` | maps to proof_category for acquisition hypothesis |

### DNA → CPO feedback

When Customer DNA Discovery detects a **splitting cluster** — households that share CPO assignments but diverge in outcomes — the resolution is **OCP (merge/split/redefine)**, not a new unofficial cluster name.

---

## 11. Relationship to Executive Copilot

Executive Copilot is the **primary interface for ontology governance decisions** at operational cadence.

### Copilot touchpoints

| ERE category | CPO action |
|--------------|------------|
| **4.4 Customer DNA Discovery** | Propose OCP when cluster implies new compound or frame |
| **4.9 Ontology Evolution** | Formal version increment packet |
| **All routing packets** | Must cite `ontology_version` — suppress if missing (ERE gate G-02) |

### Ontology Evolution packet (Amber)

```yaml
decisionPacket:
  title: "CPO v1.0.0 → v1.1.0: introduce permission_delayed_async"
  automationZone: amber
  situation: "312 paths show async spouse close; seeking_mode.permission under-classifies"
  inference: "Override corpus 47× 'esperar WhatsApp'; won rate +18% when permission_enabler proof late"
  recommendedAction:
    type: ontology_version_increment
    payload:
      target_version: "1.1.0"
      ocp_id: OCP-2026-014
  expectedImpact:
    metric: permission_blocked_to_won_rate
    pointEstimate: +6.1%
  evidence:
    ocp_id: OCP-2026-014
    holdoutStatus: passed
    board_vote: pending_sales_director
  approver: GM
```

### Reject-reason learning

When GM rejects Ontology Evolution:

- Reason enum feeds ERE (e.g. `insufficient_floor_validation`)  
- OCP returns to draft — no provisional deployment  
- Rejection does **not** block unrelated green-zone packets  

**Cadence alignment:** Ontology Evolution packets appear in Monday weekly packet ≤2 per month — taxonomy stability over reactivity.

---

## 12. Federation Rules (LATAM)

CPO federates in **layers** — Santa Cruz layer 0 remains canonical kernel.

### Layer model

| Layer | Scope | Authority |
|-------|-------|-----------|
| **L0** | Santa Cruz considered automotive | Global board |
| **L1** | Bolivia national (La Paz, Cochabamba) | L1 lead + board |
| **L2** | LATAM country pack | Country partner + board |
| **L3** | Vertical pack (real estate, insurance) | Vertical lead + board — **extends kernel, does not replace** |

### Federation rules

| Rule | Description |
|------|-------------|
| **F-01 Kernel immutability** | L0 object IDs never deleted; only deprecated with successor |
| **F-02 Extension not override** | L1+ may add objects (`latam_layer: 1`); may not redefine L0 `definition` |
| **F-03 Collision prohibition** | Same `id` across layers must mean same thing — or use layer-prefixed id |
| **F-04 Weight non-transfer** | SCDG edge weights do not import across layers — topology only |
| **F-05 Minimum-N per layer** | Object promoted to Active in L1 requires L1 outcome evidence |
| **F-06 WhatsApp-native objects** | `permission_delayed_async`, `household_role.influencer` — LATAM-first, L0 valid |
| **F-07 Informal finance** | `objection_latent.financial` detection criteria vary by layer — definition stable |
| **F-08 Benchmark anonymization** | Cross-layer benchmarks use CPO IDs only — no local slang in shared product |

### L1 example extensions (provisional until validated)

| Object | Layer | Rationale |
|--------|-------|-----------|
| `market_shock.altiplano_seasonal` | L1 Bolivia | Altitude, agro income calendar |
| `objection_latent.public_transport_compare` | L1 La Paz | Micro/bus vs first car frame |
| `proof_category.altitude_performance` | L1 | Local mechanical concern |

### Federation failure guard

If L1 object correlates with outcomes in L0 market → consider **promotion to L0** via OCP, not shadow taxonomy.

---

## 13. Failure Modes

| ID | Failure | Consequence | Mitigation |
|----|---------|-------------|------------|
| **FM-01** | **Shadow taxonomy** | Consultants use slang labels outside CPO | Override corpus → OCP; NLU map refresh |
| **FM-02** | **US playbook import** | Wrong objections dominate; spouse gate missed | P-01 culture-first; board veto |
| **FM-03** | **Combinatorial explosion** | Too many compound objects; sparse edges | Canonical compounds only; emergence rules |
| **FM-04** | **Silent version bump** | Historical edges uninterpretable; investor audit fail | Lineage gates; MAJOR dual-label window |
| **FM-05** | **Graph-driven redefinition** | Correlation without floor truth enshrines noise | Floor validation mandatory |
| **FM-06** | **DNA ossification** | CPO clusters become stereotypes | Drift detection; split OCP; holdouts |
| **FM-07** | **Ontology theater** | CPO versions increment without outcome link | Provisional state; CoIE block promotion |
| **FM-08** | **Federation homogenization** | São Paulo weights applied to Santa Cruz | F-04; topology transfer only |
| **FM-09** | **Ethics breach** | Household roles used without consent | Consent gate; freeze DNA merge |
| **FM-10** | **Copilot bypass** | GM changes routing without OCP | Config genealogy audit; E-08 red packet |
| **FM-11** | **OEM narrative capture** | Brand-trust proofs crowd out viaggio_trust | Separate proof categories; local anchor protected |
| **FM-12** | **Deprecated object assignment** | New edges use retired IDs | Drift metric; automatic CoIE alert |

**Catastrophic failure definition:** MAJOR CPO release without migration map → **intelligence estate audit failure** → freeze learning until remediated.

---

## 14. Level 11 Maturity

CPO maturity is measured independently of software deployment.

| Level | CPO capability | Approximate milestone |
|-------|----------------|----------------------|
| **L6** | Ad hoc labels; no version | Pre-CPI-OS |
| **L7** | v1.0 kernel published; provisional observation | Santa Cruz pilot start |
| **L8** | Active v1.x; floor-validated objections; SCDG cites version | 2k labeled paths |
| **L9** | OCP rhythm monthly; drift index published; holdout on MINOR | 8k paths |
| **L10** | v3+ with compounds; DNA genotype fully CPO-typed; federation L1 draft | 15k paths |
| **L11** | **Investor-auditable genealogy; LATAM L1 Active extensions; drift < threshold; board ritual ≥12 months; ontology licensed to partner** | Moat proven |

### Level 11 CPO criteria (formal)

> **CPO Level 11** is achieved when:

1. **≥3 MAJOR versions** with complete migration maps and outcome impact retrospectives  
2. **Drift index** below board-defined threshold for 4 consecutive quarters  
3. **100%** of SCDG learning edges cite Active `cpo_version`  
4. **≥2 LATAM layer extensions** Active with L1 minimum-N validation  
5. **Ontology Evolution** ≥80% of Amber packets acted or rejected with reason within SLA  
6. **Floor validation documented** for every Active objection and proof category  
7. **Third-party license** references CPO version in contract — category externalization  
8. **Override corpus** <5% disagreement on primary emotional state and top-3 objections  
9. **No unresolved Critical drift** signals >30 days  
10. **Board minutes** published with config genealogy (KA-10 linkage)  

---

## 15. Relationship to Moat

CPO is **KA-02** — Tier B compounding (step function) in the moat stack.

### Why CPO is moat

| Property | Moat mechanism |
|----------|----------------|
| **Not forkable from PDF** | Definitions embed floor language, Bolivia trust culture, household dynamics |
| **Version genealogy** | Competitor cannot reconstruct v4 without operating same closed loop |
| **SCDG integration** | Ontology without 15k labeled paths is taxonomy theater — CPO + SCDG together |
| **License line** | Partners pay for **governed ontology + methodology**, not LLM access |
| **Federation depth** | Each LATAM layer adds uncopyable local extensions |

### Compounding interaction

```
Moat_strength(t) includes:
  ...
  − ε · taxonomy_drift_unresolved     ← CPO discipline
  + ζ · cpo_version_depth             ← step function at v3, v5+
```

CPO does not compound linearly like edge counts. It **jumps** when:

- A new canonical compound is validated (china_brand + spouse)  
- A seeking mode split unlocks permission-path routing  
- LATAM layer promotes local object to kernel  

### What CPO is not (moat clarity)

| Not moat | Why |
|----------|-----|
| Object count alone | 200 labels without outcomes = noise |
| LLM-extracted entities | Unbounded; not comparable |
| Static persona cards | Content, not genetics |
| US taxonomy translation | Commodity; wrong culture |

### External critic rebuttal

| Critic | Attack | CPO response |
|--------|--------|--------------|
| **Palantir** | "No ontology governance" | Board + OCP + drift + federation rules |
| **OpenAI** | "Models extract entities free" | Extraction ≠ governed outcome-validated taxonomy |
| **a16z** | "Taxonomy is slide deck" | Show version depth + drift index + margin-linked OCP history |

**Investor sentence:**

> *"Viaggio's Considered Purchase Ontology is a versioned, floor-validated fear-and-proof taxonomy refined by thousands of labeled outcomes — the semantic layer competitors cannot download."*

---

## Intelligence Document Map

| Document | Relationship to CPO |
|----------|---------------------|
| [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) | CPO as fifth intelligence estate asset |
| [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) | SCDG nodes instantiate CPO objects |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Genotype/phenotype slots use CPO enums |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | Affinity patterns over CPO categories |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Ontology Evolution approval interface |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | OCP triggers; lineage gates |
| [ADAPTIVE_SALES_INTELLIGENCE.md](./ADAPTIVE_SALES_INTELLIGENCE.md) | ESE, OPE, BSM source taxonomies for v1.0 kernel |
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | KA-02 asset definition; drift penalty |

---

## Closing Thesis

Models commoditize. Graphs compound. **But graphs without governed semantics are wires without a circuit diagram.**

The Considered Purchase Ontology is Viaggio's decision to own **what fears mean in Santa Cruz** — and to govern how that meaning evolves as Latin America teaches the system new compounds, new permission paths, and new trust fractures.

Software can be replicated in months. **A versioned, floor-validated, outcome-linked ontology** takes years of disciplined operation — and that duration is the moat.

**That is CPO.**

---

*End of Considered Purchase Ontology Intelligence Specification v1.0*
