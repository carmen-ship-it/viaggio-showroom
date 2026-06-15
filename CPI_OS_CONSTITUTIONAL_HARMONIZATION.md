# CPI-OS Constitutional Harmonization Specification

**Version:** 1.0  
**Date:** 15 June 2026  
**Role:** Constitutional Architect — CPI-OS  
**Scope:** Harmonizes CPO · CoIE · MkIE · Customer DNA · Salesperson DNA · ERE · Executive Copilot · LATAM Federation · Intelligence Balance Sheet · Level 11 Architecture · Moat Analysis  
**Constraint:** Closes cross-spec gaps only — does not redesign engines or create new intelligence systems  
**Status:** Supersedes conflicting gate IDs and minimum-N tables in source specs; source specs remain authoritative for engine behavior except where this document explicitly harmonizes  

---

## Preamble

CPI-OS is defined across twelve intelligence specifications. Each engine is internally coherent. Collectively they exhibit **namespace collisions** (G-01 means three different things), **threshold divergence** (proof minimum-N 200 vs 500), **governance overlap** (CPO Board vs Federation Stewards), and **fragmented Level 11 criteria** (six non-identical checklists).

This document is the **constitutional layer** — the single harmonization authority for gates, evidence thresholds, governance precedence, learning freezes, and certification. It preserves the intent of every engine. It does not add engines.

**Constitutional rule:**

> No specification, deployment, or executive action may cite a deprecated gate ID or ad hoc minimum-N. All references use **CPI-G-*** and **CPI-MN-*** identifiers defined herein.

**Deprecation map:** Legacy `G-01` references in source specs map to this registry at next spec revision. Until then, this document governs operations.

---

# Part 1 — Canonical Gate Registry

## 1.1 Namespace

All gates use the form:

```
CPI-G-{DOMAIN}-{NN}

DOMAIN ∈ { COIE, ERE, CPO, MKIE, FED, IBS, DNA }
NN   = two-digit sequence within domain
```

Gates are **boolean pass/fail checks** unless noted as scored. Failed gates **block** the consumer action listed unless an explicit constitutional override applies (see Part 3).

## 1.2 Gate Registry (authoritative)

### CoIE — Organizational Learning Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-COIE-01** | CoIE G-01 | CoIE steward | Data quality gate | Weekly composite ≥ **0.92** | ERE, Executive Copilot, MkIE post-shock release |
| **CPI-G-COIE-02** | CoIE G-02 | CoIE steward | Experiment registration | Promotion claim has active or concluded experiment in registry | ERE, CoIE pre-review |
| **CPI-G-COIE-03** | CoIE G-03 | CoIE steward | Minimum-N compliance | Sample ≥ applicable **CPI-MN-*** threshold | ERE, Experiment Genealogy, IBS |
| **CPI-G-COIE-04** | CoIE G-04 | CoIE steward | MkIE confound clearance | Active shock on affected metric is contained, annotated, or absent | ERE, CoIE pre-review |
| **CPI-G-COIE-05** | CoIE G-05 | CoIE steward | Organizational memory | Same hypothesis not rejected <90 days without new evidence | ERE |
| **CPI-G-COIE-06** | CoIE G-06 | CoIE steward | Adoption feasibility | `operational_feasibility` ≥ **0.50** on behavioral-change proposals | ERE |
| **CPI-G-COIE-07** | CoIE G-07 | CoIE steward | Ritual compliance | Rolling 4-week compliance ≥ **85%** | ERE (non-escalation packets) |
| **CPI-G-COIE-08** | CoIE G-08 | CoIE steward | Automation zone audit | Red-zone actions not misclassified as amber/green | ERE, Executive Copilot |
| **CPI-G-COIE-09** | — | CoIE steward | Outcome label completeness | `lost_reason` present on ≥ **95%** of `outcome.lost` within 24 hr (4-week rolling) | SCDG learning, Customer DNA validation |
| **CPI-G-COIE-10** | — | CoIE steward | Session–outcome join | `sessionId` on ≥ **95%** of closed deals (4-week rolling) | ERE CPI-G-ERE-01 input |

**Resolves collision:** CPO reference to "CoIE gate G-01" for `lost_reason` → **CPI-G-COIE-09** (outcome label discipline). CPO reference to "ERE gate G-02" for `ontology_version` → **CPI-G-ERE-02**.

### ERE — Evidence Gates (proposal emission)

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-ERE-01** | ERE G-01 | ERE | Outcome join on supporting paths | Join rate ≥ CoIE threshold (**CPI-G-COIE-10**) | Recommendation emission |
| **CPI-G-ERE-02** | ERE G-02 | ERE | Lineage citation | `ontology_version` + `scdg_edges` or DNA IDs populated | Executive Copilot, IBS attribution |
| **CPI-G-ERE-03** | ERE G-03 | ERE | MkIE declaration | Active shocks declared in `supporting_assets` or explicitly absent | Recommendation narrative |
| **CPI-G-ERE-04** | ERE G-04 | ERE | Recommendation expiry | Valid `expiry` timestamp set | Executive Copilot |
| **CPI-G-ERE-05** | — | ERE | Reject reason capture | Human reject includes `reason_enum` | ERE calibration, Organizational memory |

### CPO — Ontology Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-CPO-01** | CPO §4.8 (mislabeled G-01) | CPO Board / CoIE | Lost-reason mandatory | No `outcome.lost` without `lost_reason` enters SCDG learning | SCDG, CoIE |
| **CPI-G-CPO-02** | — | CPO Board | Active object assignment | Only `active` CPO objects used for genotype lock and auto-routing | Customer DNA, SIE |
| **CPI-G-CPO-03** | — | CPO Board | OCP authority | CPO object changes only via approved OCP | All labeling systems |
| **CPI-G-CPO-04** | — | CoIE + CPO Board | Drift severity | No unresolved **critical** drift signal >30 days | CPO MAJOR releases, Federation promotion |

### MkIE — Exogenous Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-MKIE-01** | MkIE §1.4 | Shock steward | Learning freeze (S2+) | severity ≥ S2 → `freezeProofPromotion` and `freezeEdgeWeightAutoUpdate` active | SCDG, ERE, Federation |
| **CPI-G-MKIE-02** | — | Shock steward | Steward attestation | S2+ shocks attested within **24 hr** | Registry, Executive Copilot |
| **CPI-G-MKIE-03** | — | Shock steward + CoIE | Post-shock release | Shock expired + post-shock review complete + **CPI-G-COIE-03** satisfied for affected edges | SCDG unfreeze |
| **CPI-G-MKIE-04** | — | Shock steward | Evidence linkage | Shock entry has `evidence.sources` — no orphan shocks | Trust Fabric audit |

### Federation — Layer Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-FED-01** | GT-04, FP-03 | Federation Architect | Local evidence before weight authority | `evidence_count` ≥ applicable **CPI-MN-FED-*** per edge/cluster | Child node graphs |
| **CPI-G-FED-02** | GT-02 | Federation Architect | Cross-layer promotion freeze | No weight or affinity crosses layer boundary during active **CPI-G-MKIE-01** | LATAM Federation |
| **CPI-G-FED-03** | GT-01 | Layer steward | Lost-reason at every node | Same as **CPI-G-CPO-01** at each node | All nodes |
| **CPI-G-FED-04** | FP-11 | Federation Architect | Benchmark eligibility | ≥10 nodes, anonymization contract, CPO major-version alignment | Benchmark tier |

### DNA — Genotype Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-DNA-01** | Customer DNA §3 | Customer DNA steward | Genotype lock | confidence ≥ **0.7** OR outcome validates slot | Customer DNA, SIE |
| **CPI-G-DNA-02** | Salesperson DNA §3.2 | Sales director + CoIE | Affinity publication | ≥ **CPI-MN-SALES-LIFT** assisted outcomes per consultant–cluster pair | Routing, Salesperson DNA |
| **CPI-G-DNA-03** | Customer DNA §5 | CoIE steward | Cluster naming | New cluster reviewed before operational name committed | ERE Customer DNA Discovery |

### IBS — Capital Gates

| Gate ID | Legacy alias | Owner | Purpose | Pass criterion | Primary consumers |
|---------|--------------|-------|---------|----------------|-------------------|
| **CPI-G-IBS-01** | IBS §4.3 | CoIE + Finance | Quality disqualifier | No active disqualifier (label rate <70% for 2 quarters, etc.) | IEV_index publication |
| **CPI-G-IBS-02** | IBS §7.5 | Finance | CRM reconciliation | Assisted margin vs CRM GP variance ≤ **3%** | I-ROI, investor pack |
| **CPI-G-IBS-03** | IBS §1.4 | CoIE steward | Outcome linkage | Asset inventory counts only outcome-linked units | IEV_index, board pack |

## 1.3 Gate evaluation order (per weekly cycle)

```
1. CPI-G-COIE-01 (data quality) — if fail, only Executive Escalation path
2. CPI-G-MKIE-01 (active S2+ shocks) — contextual freeze flags
3. CPI-G-CPO-04 (critical drift) — ontology/federation halt if triggered
4. CPI-G-COIE-07 (ritual compliance) — non-escalation block if fail
5. CPI-G-ERE-01 … CPI-G-ERE-04 — per recommendation
6. CPI-G-COIE-02 … CPI-G-COIE-08 — CoIE pre-review filter
7. Executive Copilot presentation (≤5 packets)
```

## 1.4 Gate ownership summary

| Domain | Accountable role | Escalation |
|--------|------------------|------------|
| COIE | CoIE steward | CEO (learning pause) |
| ERE | ERE (system); CoIE audits | CoIE steward |
| CPO | CPO Board chair (Sales Director) | GM for MAJOR; Board for KERNEL |
| MKIE | Shock steward | GM; contested → Executive Copilot amber |
| FED | Federation Architect | CPO Board for kernel conflicts |
| DNA | Sales director (floor); CoIE (cluster naming) | CPO Board if ontology implied |
| IBS | CEO (IEV owner); Finance (reconciliation) | Board quarterly |

---

# Part 2 — Canonical Minimum-N Registry

## 2.1 Namespace

```
CPI-MN-{CATEGORY}-{QUALIFIER}

All values = labeled comparable outcomes unless noted as sessions, examples, or weeks.
"Comparable" = same DNA cluster, channel, and CPO version unless experiment design documents exception.
```

**Constitutional rule:** The **highest applicable threshold** wins when multiple CPI-MN codes apply to one action. ERE suppresses; CoIE vetoes experiment activation; neither waives silently.

## 2.2 Proof and graph thresholds

| Code | N | Scope | Rationale | Source intent preserved |
|------|---|-------|-----------|-------------------------|
| **CPI-MN-PROOF-CLUSTER** | **200** | Cluster-scoped proof promotion or demotion; rank change ≤±5% within one Customer DNA cluster | Santa Cruz cluster sizes support ~40 paths/week; 5 weeks ≈ minimum credible lift signal at dealership scale | CoIE §4.4 ±5%; ERE §6.3 cluster-specific |
| **CPI-MN-PROOF-GLOBAL-5** | **500** | Fleet-wide proof rank change ≤±5% affecting all clusters or default routing | Global changes affect more paths; false promotion cost exceeds cluster experiment; ERE's stricter global bar retained | ERE §6.3 global ±5% |
| **CPI-MN-PROOF-GLOBAL-10** | **400** | Fleet-wide proof rank change >±5% and ≤±10% | Larger moves need more evidence than cluster but CoIE escalation tier applies before full fleet rewrite | CoIE §4.4 ±10% |
| **CPI-MN-PROOF-DEMOTION** | Same as promotion scope | Demotion uses **identical N** as promotion for equivalent scope | Prevents asymmetric gaming (easy demote, hard promote); demotion during **CPI-G-MKIE-01** still blocked regardless of N | ERE §4.3 + MkIE false-attribution prevention |
| **CPI-MN-GRAPH-OPT** | **200** cluster / **500** global | Graph optimization (sequence reorder, compression gate) | Mirrors proof scope split | ERE §4.1, §6.3 |
| **CPI-MN-HOLDOUT-ETHICS** | ≤**10%** of comparable cohort | Maximum holdout exposure | Floor ethics cap; GM exception documented | CoIE §4.5 |

**Harmonization note:** CoIE "proof rank ±5% = 200" applies to **experiment registry scope** when change is **cluster-scoped**. CoIE experiment at N=200 does not authorize **ERE emission** for **global** change until **CPI-MN-PROOF-GLOBAL-5** met. Single table; dual scope — not contradiction.

## 2.3 DNA thresholds

| Code | N | Scope | Rationale | Source intent |
|------|---|-------|-----------|---------------|
| **CPI-MN-DNA-CLUSTER-DISCOVERY** | **50** | Emergent Customer DNA cluster; ERE Customer DNA Discovery packet | Below 50, cluster may be noise; at 50, OCP or naming review warranted | ERE §6.2 |
| **CPI-MN-DNA-CLUSTER-VALIDATED** | **150** | Cross-node cluster merge; Federation cluster validation | Prevents stereotype export; La Paz and Santa Cruz must each validate | LATAM §6.2 N_c=150 |
| **CPI-MN-DNA-GENOTYPE-LOCK** | confidence ≥**0.7** OR **1** outcome | Genotype slot lock | Behavioral inference needs confidence or CRM truth | Customer DNA §3; CPO P-07 |
| **CPI-MN-SALES-LIFT** | **30** | Salesperson DNA affinity published to routing; consultant–cluster lift claim | Binomial noise dominates below 30 assisted outcomes per pair | Salesperson DNA §3.2; ERE §6.2 |
| **CPI-MN-SALES-COACHING** | **30** | Salesperson coaching protocol experiment | Same statistical floor as affinity | CoIE §4.2 |

## 2.4 Marketing thresholds

| Code | N / duration | Scope | Rationale | Source intent |
|------|--------------|-------|-----------|---------------|
| **CPI-MN-MKT-SHIFT** | **30** conversions + **8** weeks spend | Marketing budget shift recommendation | Channel mix needs seasonal coverage; 30 closes for GP/dollar stability | ERE §6.2, §6.3 |
| **CPI-MN-MKT-AMBER** | **15%** budget delta triggers amber | Campaign budget recommend >15% requires experiment registration | Material spend moves never green | CoIE §4.2 |

## 2.5 Ontology thresholds

| Code | N | Scope | Rationale | Source intent |
|------|---|-------|-----------|---------------|
| **CPI-MN-CPO-TAXONOMY-EDIT** | **50** | Objection taxonomy merge/split; OCP with taxonomy edit | Floor language validation minimum | CoIE §4.4; CoIE §4.2 |
| **CPI-MN-CPO-ONTOLOGY-EVOLVE** | **10** override examples OR **100** graph paths | Ontology Evolution (ERE §4.9) emission | Override corpus or graph emergence | ERE §6.2 |
| **CPI-MN-CPO-COMPOUND-EMERGE** | **100** | Unlabeled compound pattern → OCP required within 30 days | CPO emergence rule; harmonized numeric default for "≥minimum-N" | CPO §4.2 emergence rule |
| **CPI-MN-CPO-ACTIVE** | Outcome correlation over **CPI-MN-PROOF-CLUSTER** | CPO label promotion from provisional → active | P-06 outcome validator | CPO P-06 |
| **CPI-MN-CPO-OVERRIDE-REVIEW** | **10** | Override corpus cluster before OCP draft | ERE Ontology Evolution floor | ERE §6.2 |

## 2.6 Organizational experiment thresholds

| Code | N | Scope | Rationale | Source intent |
|------|---|-------|-----------|---------------|
| **CPI-MN-COPILOT-THRESHOLD** | **100** on / **100** off | Copilot threshold config change | Binary treatment needs balanced arms | CoIE §4.4 |
| **CPI-MN-INCENTIVE-PILOT** | **1** full commission cycle | Compensation alignment change | Incentive effects need payroll period | CoIE §4.4 |
| **CPI-MN-ERE-REJECTION-CORPUS** | **200** | ERE Level 11 calibration maturity | Executive labeled decisions for ranking calibration | ERE §10 L11 |

## 2.7 Federation thresholds

| Code | N | Scope | Rationale | Source intent |
|------|---|-------|-----------|---------------|
| **CPI-MN-FED-EDGE-L1** | **200** | La Paz / Cochabamba edge weight authority per edge class | National urban transfer; N₁ | LATAM §3.2 |
| **CPI-MN-FED-EDGE-L2** | **300** | Cross-border L2 licensed node per edge class | Higher confound risk | LATAM §3.3 L2 pack |
| **CPI-MN-FED-MERGE-FLOOR** | **500** per node | Minimum per node before any cross-node weight merge | Merge below 500 forbidden | LATAM §5.4 |
| **CPI-MN-FED-EXPORT-L0** | **15,000** | L0 topology export eligibility | Level 11 path corpus | LATAM §3.1; Level 11 §13 |
| **CPI-MN-FED-BENCHMARK-NODES** | **10** | Benchmark tier activation | Network statistics credibility | LATAM §9.1; FP-11 |

## 2.8 Capital and estate benchmarks (IBS depth — not promotion gates)

| Code | Benchmark | Scope | Rationale | Source intent |
|------|-----------|-------|-----------|---------------|
| **CPI-MN-ESTATE-GRAPH-Y3** | **15,000** | Outcome-labeled edges, primary market Y3 | Moat proof inventory | IBS §4.2; MOAT |
| **CPI-MN-ESTATE-DNA-Y3** | **12,000** | Active Customer DNA profiles with outcome linkage | Genotype resolution | IBS §4.2 |
| **CPI-MN-ESTATE-EXPERIMENT-Y3** | **120** | Valid experiments in Experiment Genealogy | Causal discipline depth | IBS §4.2 |

## 2.9 Minimum-N resolution algorithm

```
1. Identify action type (proof, DNA, marketing, ontology, federation, org experiment).
2. Identify scope (cluster | global | node layer L0|L1|L2).
3. Look up all applicable CPI-MN codes.
4. N_required = max(applicable thresholds).
5. If CPI-G-MKIE-01 active on affected metric → block regardless of N (except Executive Escalation).
6. If CPI-G-COIE-01 fail → block promotion paths regardless of N.
7. CoIE experiment registry must cite N_required in design.minimum_n before activation.
```

---

# Part 3 — Governance Supremacy Matrix

## 3.1 Authority classes

| Class | Entities | Mandate |
|-------|----------|---------|
| **Sovereign** | Board, CEO | Capital allocation, learning pause lift, license terms, KERNEL ontology |
| **Constitutional** | CPO Board, CoIE steward | Taxonomy integrity, data truth, experiment discipline |
| **Operational** | GM, sales director, marketing lead | Floor execution, approve/defer Copilot packets within zone |
| **Inferential** | ERE | Rank and propose — never execute |
| **Presentational** | Executive Copilot | Present ≤5 packets — never bypass gates |
| **Exogenous** | MkIE shock steward | Classify shocks, freeze learning on confounded metrics |
| **Federative** | Layer stewards, Federation Architect | Layer extensions, topology seed, benchmark release |

## 3.2 Supremacy rules (conflict resolution)

| Situation | Prevailing authority | Loser defers |
|-----------|---------------------|--------------|
| Learning pause declared | **CoIE steward → CEO** | ERE, Copilot promotions, Federation cross-layer promotion |
| CPI-G-COIE-01 fail | **CoIE steward** | All ERE categories except Executive Escalation |
| CPI-G-MKIE-01 active (S2+) | **MkIE shock steward** | Proof promotion, edge auto-update, graph-derived ERE proposals |
| CPO KERNEL / MAJOR version | **CPO Board** (GM sign-off MAJOR) | Layer steward local fork; ERE Ontology Evolution without board vote |
| CPO MINOR extension at L1+ | **Layer steward proposes → CPO Board approves** | Steward cannot publish Active L1 object without board quorum per CPO §6 |
| L0 definition vs L1 extension conflict | **CPO Board**; F-02 extension-not-override | L1 steward |
| Federation weight import attempt | **Federation Architect** blocks | GM, partner, ERE |
| ERE recommendation vs CoIE pre-review block | **CoIE** (`coie_block_reason` returned) | ERE re-ranks; no Copilot packet |
| Executive Copilot green auto vs CPI-G-COIE-08 fail | **CoIE** | Auto-execute vetoed |
| GM rejects amber packet | **GM** (human sovereignty) | ERE learns; no override |
| GM attempts bypass of learning pause | **CEO** | GM |
| MkIE contested shock | **Conservative freeze** until 72 hr resolution; GM adjudicates | Marketing budget demotion proposals |
| Benchmark release vs privacy (PR-09) | **Board audit committee** (or CEO delegate) | Federation Architect |
| IBS IEV publication vs CRM variance | **Finance + CPI-G-IBS-02** | Marketing/sales narrative |

## 3.3 Escalation order (unresolved conflict)

```
Floor supervisor
    → Sales director / marketing lead (domain)
        → CoIE steward (data, ritual, experiment)
            → Shock steward (MkIE dispute) — parallel track if exogenous
                → Federation Architect (cross-layer / lineage)
                    → CPO Board (ontology semantics)
                        → GM (operational tradeoff)
                            → CEO (learning pause, capital freeze, contested MkIE S3+)
                                → Board (KERNEL ontology, benchmark release, IEV red zone, license)
```

**Time boxes:**

| Escalation | SLA |
|------------|-----|
| CoIE data gate fail | CEO queue within **24 hr** |
| MkIE S2+ unattested | **24 hr** to steward; else watchlist downgrade |
| MkIE contested | **72 hr** to GM resolution |
| CPO critical drift | Emergency board session within **14 days** |
| Federation privacy freeze (PR-10) | Halt promotion until remediated — no SLA waiver |

## 3.4 Human sovereignty invariants

- **ERE never executes.** Executive Copilot never approves on behalf of GM.  
- **Board never operates floor.** Board approves KERNEL ontology, federation license, IEV red-zone response.  
- **GM may veto green** within 24 hr — not bypass CoIE/MkIE/CPO freezes.  
- **CEO is sole authority** to lift learning pause and to authorize MkIE `learning_safe: false` override during S2+ (joint sign-off with CoIE steward).

---

# Part 4 — Learning Freeze Precedence Rules

## 4.1 Freeze types

| Freeze ID | Trigger | Effect |
|-----------|---------|--------|
| **LF-01** | CoIE learning pause | All graph promotions frozen; Escalation + data repair only |
| **LF-02** | CPI-G-COIE-01 fail (<0.85 composite) | Same as LF-01 for practical purposes; CEO alert |
| **LF-03** | CPI-G-COIE-01 marginal (0.85–0.91) | Graph promotions suppressed; adoption + data fixes only |
| **LF-04** | CPI-G-MKIE-01 (S2+ shock) | Proof promotion, edge weight auto-update frozen; phenotype overlay allowed |
| **LF-05** | CPI-G-CPO-04 (critical drift) | MAJOR CPO releases halted; Federation cross-layer promotion halted |
| **LF-06** | CPI-G-FED-02 | Cross-layer weight/affinity promotion frozen |
| **LF-07** | CPI-G-COIE-07 fail (ritual <85%) | Non-escalation ERE packets blocked |
| **LF-08** | CPO high drift on object | Genotype lock frozen on affected CPO objects |
| **LF-09** | Federation privacy (PR-10) | Cross-layer promotion frozen for offending node |

## 4.2 Precedence stack (highest wins)

When multiple freezes active, **the highest precedence freeze governs**. Lower freezes remain logged but do not add restrictions.

| Rank | Freeze | Authority |
|------|--------|-----------|
| **1** | LF-01 Learning pause | CoIE steward + CEO |
| **2** | LF-02 Data quality fail | CoIE steward |
| **3** | LF-05 CPO critical drift / Federation halt | CPO Board chair |
| **4** | LF-09 Privacy federation freeze | Federation Architect + CEO |
| **5** | LF-04 MkIE S2+ shock | Shock steward |
| **6** | LF-06 Federation GT-02 (MkIE-triggered or independent) | Federation Architect |
| **7** | LF-03 Data quality marginal | CoIE steward |
| **8** | LF-07 Ritual compliance | CoIE steward |
| **9** | LF-08 CPO genotype lock (high drift) | CPO Board delegate |
| **10** | LF-04 MkIE S1 annotate-only | No freeze — annotation only |

## 4.3 Allowed actions under active freezes

| Action | LF-01/02 | LF-04 MkIE S2+ | LF-05 CPO critical | LF-03 marginal |
|--------|----------|----------------|-------------------|----------------|
| Executive Escalation (data repair) | ✓ | ✓ | ✓ | ✓ |
| Customer-facing copilot (rescue) | ✓ | ✓ | ✓ | ✓ |
| Proof promotion | ✗ | ✗ | ✗ | ✗ |
| Proof demotion (green auto) | ✗ | ✗ | ✗ | ✗ |
| Ontology OCP (PATCH) | ✗ | ✗ | ✗ | CoIE log only |
| Ontology OCP (MINOR/MAJOR) | ✗ | ✗ | ✗ | ✗ |
| MkIE shock publish | ✓ | ✓ | ✓ | ✓ |
| Federation topology seed (no weights) | CEO exception | ✓ | ✗ | CoIE gate pass required |
| Post-shock learning release | ✗ | CPI-G-MKIE-03 | ✗ | ✗ |

## 4.4 MkIE `learning_safe: false` override (constitutional)

MkIE §1.4 permits learning during shock with executive acknowledgment. Harmonized rule:

- **Only CEO + CoIE steward joint sign-off** may authorize override.  
- Override applies to **one named experiment_id** with holdout integrity confirmed (**CPI-G-COIE-02**, **CPI-G-COIE-03**).  
- Override **does not** lift LF-01, LF-02, LF-05, or LF-09.  
- Override **may** permit continued measurement of a pre-shock active experiment — not new promotions.  
- Document in Organizational memory **M6** and Experiment Genealogy.

## 4.5 Freeze lift order

```
1. Resolve root cause (data, drift, shock expiry, privacy remediation)
2. Responsible authority signs lift
3. CoIE recomputes CPI-G-COIE-01
4. If MkIE shock: CPI-G-MKIE-03 post-shock review complete
5. Friday deployment confirmation ritual
6. Resume ERE weekly batch
```

---

# Part 5 — Unified Level 11 Attestation Framework

## 5.1 Certification model

**CPI-OS Level 11 Certified** is the **single** organizational maturity attestation. Domain-specific "Level 11" lists in CoIE, CPO, MkIE, IBS, Federation, and ERE are **sub-attestations** mapped below — not independent certifications.

```
CPI-OS L11 Certified =
  Domains A + B + C + D + E + F all GREEN
  for 2 consecutive quarters (26 weeks)
  on primary node (L0) AND
  Federation sub-attestation (Domain D) includes FM-2 minimum
```

**Sub-certification (optional narrative):**

**CPI-OS L11 Institutional** = L11 Certified + CoIE organizational track record (**4** consecutive quarters per CoIE §13.2) — used for board annex "learning survives leadership change" claims.

## 5.2 Attestation domains

### Domain A — Intelligence Estate

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| A-01 | ≥ **CPI-MN-FED-EXPORT-L0** outcome-labeled graph paths (L0) | SCDG audit | Level 11 §13 #1; LATAM §3.1 |
| A-02 | ≥ **3** holdout-validated proof promotions (trailing 12 months) | Experiment Genealogy | ERE L11 #3; IBS moat checklist |
| A-03 | Customer DNA match lift significant on ≥ **2** clusters | Holdout or quasi-experimental report | Level 11 §13 #5; IBS §13 #6 |
| A-04 | Salesperson DNA match lift positive on ≥ **2** clusters | Salesperson DNA + CRM | IBS §13 #6 |
| A-05 | Marketing DNA acquisition-to-margin loop closed | Campaign → outcome trace | Level 11 §13 #4 |
| A-06 | CPO ≥ **3** MAJOR versions with migration maps | CPO board minutes | CPO L11 #1 |
| A-07 | 100% SCDG learning edges cite active `cpo_version` | Graph audit | CPO L11 #3 |
| A-08 | Override corpus disagreement <**5%** on primary emotional state + top-3 objections | CoIE drift report | CPO L11 #8 |

### Domain B — Organizational Learning (CoIE)

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| B-01 | CPI-G-COIE-01 pass rate ≥**92%** of weeks (trailing 4 quarters) | CompanyLearningReport | CoIE L11 #1 |
| B-02 | Ritual compliance ≥**90%** rolling | ritual_compliance score | CoIE L11 #2 |
| B-03 | ≥**2** holdout-validated organizational lifts per quarter (trailing 4Q) | Board annex | CoIE L11 #3 |
| B-04 | Incentive alignment index ≥**0.75** | CoIE quarterly | CoIE L11 #4 |
| B-05 | Organizational memory onboarding mandatory for GMs | HR + CoIE record | CoIE L11 #5 |
| B-06 | No learning pause in trailing **12** months | CoIE incident log | CoIE L11 #7 |
| B-07 | Experiment Genealogy (KA-10) auditor-ready | Registry export | CoIE L11 #8 |
| B-08 | Decision follow-through ≥**90%** approved → deployed within 7 days | CoIE audit | CoIE §8.4 |

### Domain C — Exogenous Discipline (MkIE)

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| C-01 | ≥**90%** of weeks with material internal Δ have MkIE review | MkIE ops log | MkIE L11 #1 |
| C-02 | 100% S2+ shocks attested within **24 hr** | KA-09 registry | MkIE L11 #2 |
| C-03 | Zero proof demotions shipped during S2+ later overturned (trailing quarter) | False attribution log | MkIE L11; CoIE monthly |
| C-04 | 100% S2+ post-shock reviews within **14** days of expiry | Registry | MkIE L11 #4 |
| C-05 | Customer DNA genotype never mutated by shock (audit clean) | DNA audit | MkIE L11 #8 |
| C-06 | Board Market context from MkIE registry only | Board pack provenance | MkIE L11 #6 |

### Domain D — Federation

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| D-01 | **FM-2** achieved: Bolivia L1 sibling validated; divergent local weights | Lineage audit | Federation §13; Level 11 §13 #7, #9 |
| D-02 | Zero parent weight merge on child launch (lineage clean) | Federation Architect audit | Federation §13 #4 |
| D-03 | CPO governance board operational with version log | Board minutes | Federation §13 #5 |
| D-04 | ≥**2** LATAM layer extensions Active with L1 minimum-N | CPO + Federation | CPO L11 #4 |
| D-05 | Executive Copilot packets scoped by layer — no false LATAM blend | Copilot config audit | Federation §13 #9 |
| D-06 | Cross-node cluster hypothesis tested (accept or reject documented) | Holdout report | Federation §13 #7 |

### Domain E — Executive Action (ERE + Copilot)

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| E-01 | ≥**60%** amber Copilot decisions approved or rejected with reason (trailing 4Q) | Decision log | Level 11 §13 #3; ERE L11 #1 |
| E-02 | Mean absolute `prediction_error` on margin impact declining (4Q trend) | ERE calibration | ERE L11 #2 |
| E-03 | Rejection corpus ≥**CPI-MN-ERE-REJECTION-CORPUS** | Executive Decision Corpus | ERE L11 #4 |
| E-04 | Experiment Genealogy links ≥**80%** of deployed graph recommendations | KA-10 | ERE L11 #8 |
| E-05 | CPI-G-ERE-05 compliance 100% on rejects | Copilot audit | ERE Appendix B |
| E-06 | Executive Escalation SLA met when LF-01/02 active | CEO queue | ERE L11 #7 |

### Domain F — Capital Accounting (IBS)

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| F-01 | IEV_index ≥ **75** with no CPI-G-IBS-01 disqualifier | IBS quarterly | IBS §13 #1 |
| F-02 | I-ROI positive at **medium** confidence or better | I-ROI worksheet | IBS §13 #3 |
| F-03 | Assisted margin ≥**25%** of gross profit (high/medium attribution) | Assisted Margin Ledger | IBS §13 #8 |
| F-04 | CPI-G-IBS-02 reconciliation clean (trailing quarter) | Finance sign-off | IBS §7.5 |
| F-05 | Config lineage coverage ≥**80%** | Experiment Genealogy | IBS §13 #7 |
| F-06 | Board receives IBS pack quarterly; no red zone >**60** days unresolved | Board minutes | IBS §13 #9 |
| F-07 | Investor attribution sample available on request | Diligence kit | IBS §10.5 |

### Domain G — Category (external narrative)

| ID | Criterion | Evidence | Harmonized source |
|----|-----------|----------|-------------------|
| G-01 | CPI-OS / CPI language used externally by ≥**1** partner or licensee | Contract or LOI | Level 11 §13 #10; Part 8 |
| G-02 | MSI ≥ **0.65** | IBS §12 | MOAT Y3 |
| G-03 | CEO can cite organizational memory for trailing margin improvement | Board Q&A | CoIE L11 #10 |

## 5.3 Domain scoring

| Status | Rule |
|--------|------|
| **GREEN** | 100% of domain criteria met |
| **AMBER** | ≥80% met; no A-01, B-01, C-03, D-02, F-02 failures |
| **RED** | Any of A-01, B-01, C-03, D-02, F-02 fail OR <80% domain met |

**L11 Certified:** Domains A–G all GREEN for **2 consecutive quarters**.

## 5.4 Attestation ritual

**Quarterly CPI-OS Constitutional Review** (replaces fragmented maturity meetings):

1. Federation Architect publishes gate + minimum-N compliance report.  
2. CoIE steward publishes domain B evidence.  
3. Shock steward publishes domain C evidence.  
4. CEO publishes IBS domain F + overall IEV.  
5. CPO Board chair publishes domain A ontology subset (A-06, A-07, A-08).  
6. GM publishes domain E Copilot metrics.  
7. Board records certification status in minutes.

**Owner:** CEO. **Cancel policy:** Cancelled review = AMBER automatically in next investor pack.

## 5.5 Legacy mapping

| Legacy term | Constitutional equivalent |
|-------------|---------------------------|
| CoIE L11 | Domain B (+ B Institutional for 4Q) |
| CPO L11 | A-06, A-07, A-08 + D-04 |
| MkIE L11 | Domain C |
| ERE L11 | Domain E |
| IBS L11 | Domain F |
| Federation L11 / FM-2 | Domain D |
| Level 11 Architecture §13 | Domains A–G aggregate |

---

# Part 6 — Constitutional Invariants

No future specification, engine config, or organizational policy may violate these rules. Amendments require Board vote + 90-day notice + CPO PATCH at minimum.

### Authority and flow

| ID | Invariant |
|----|-----------|
| **INV-01** | Intelligence estate produces inference; **ERE proposes**; **Executive Copilot presents**; **humans approve**; operations deploy; outcomes return to estate. |
| **INV-02** | Executive Copilot **never** ingests raw SCDG diffs or unstructured graph telemetry. |
| **INV-03** | ERE **never** executes organizational action. |
| **INV-04** | No intelligence asset counts toward IBS inventory **without outcome linkage** (IBS constitutional principle). |

### Data truth

| ID | Invariant |
|----|-----------|
| **INV-05** | **Outcome truth > data volume.** Label quality gates supersede edge-count growth narratives. |
| **INV-06** | No `outcome.lost` enters SCDG learning without `lost_reason` (**CPI-G-CPO-01**). |
| **INV-07** | CoIE data quality gate fail (**CPI-G-COIE-01** <0.92) restricts ERE to Executive Escalation categories only. |
| **INV-08** | Reject without `reason_enum` is invalid — no ERE calibration or organizational memory write. |

### Evidence and experimentation

| ID | Invariant |
|----|-----------|
| **INV-09** | Minimum-N **suppresses**; waivers require CEO + CoIE steward documented exception with Experiment Genealogy entry. |
| **INV-10** | Holdout exposure ≤ **CPI-MN-HOLDOUT-ETHICS** unless ownership documents exception. |
| **INV-11** | No promotion claim without experiment registry entry when CoIE registration rules apply (**CPI-G-COIE-02**). |
| **INV-12** | `expected_margin_impact` in ERE refers to **assisted gross profit** unless explicitly strategic-red. |

### Exogenous discipline

| ID | Invariant |
|----|-----------|
| **INV-13** | MkIE is **context, not excuse** — controllable factors remain accountable. |
| **INV-14** | Active MkIE S2+ shock (**CPI-G-MKIE-01**) blocks proof promotion and edge weight auto-update regardless of N. |
| **INV-15** | Customer DNA **genotype is never mutated** by market shock — phenotype overlay only. |

### Ontology

| ID | Invariant |
|----|-----------|
| **INV-16** | No label outside CPO without approved **OCP** (**CPI-G-CPO-03**). |
| **INV-17** | SCDG may **propose** CPO changes; it may **not enact** them. |
| **INV-18** | Every intelligence artifact cites `cpo_version` at creation for genotype-level assignments. |

### Federation

| ID | Invariant |
|----|-----------|
| **INV-19** | **Transfer topology. Never transfer weights without evidence.** |
| **INV-20** | Edge weights **never** auto-merge across nodes or layers below **CPI-MN-FED-MERGE-FLOOR** per node. |
| **INV-21** | Salesperson DNA profiles **do not export** cross-node by default. |
| **INV-22** | Layer 0 (Santa Cruz) remains **lineage root** — not promoted to L1. |

### Automation zones

| ID | Invariant |
|----|-----------|
| **INV-23** | Red-zone categories **never** auto-execute. |
| **INV-24** | Marketing budget shift above materiality **never** green — amber minimum. |
| **INV-25** | Green auto-execute remains subject to CoIE weekly sample audit and MkIE/CPO/CoIE freeze precedence (Part 4). |

### Ethics

| ID | Invariant |
|----|-----------|
| **INV-26** | Customer DNA cluster labels **never** customer-facing. |
| **INV-27** | No DNA use for pricing, credit, or insurance underwriting. |
| **INV-28** | Household influencer/partner fragments require **consent** before genotype merge. |

*(Invariants 26–28 extend ethics guardrails; numbered for constitutional completeness.)*

---

# Part 7 — Architectural Closure Assessment

## 7.1 Closed by this harmonization

| Gap (pre-v1.0) | Resolution |
|----------------|------------|
| G-01 / G-02 / G-03 namespace collision | CPI-G-{DOMAIN}-{NN} registry (Part 1) |
| Proof minimum-N 200 vs 500 conflict | Scoped thresholds CPI-MN-PROOF-CLUSTER vs GLOBAL-5 (Part 2) |
| CPO Board vs Federation Steward conflict | Supremacy matrix (Part 3) |
| MkIE vs CoIE vs CPO freeze conflicts | Precedence stack LF-01…LF-10 (Part 4) |
| Six fragmented Level 11 checklists | Unified domains A–G (Part 5) |
| Lost_reason vs data-quality G-01 collision | CPI-G-CPO-01 vs CPI-G-COIE-09 |
| Ontology version lineage "ERE G-02" | CPI-G-ERE-02 |

## 7.2 Remaining gaps (post-harmonization)

These gaps **cannot** be closed by constitutional harmonization alone. They require future specs, operational build, or explicit out-of-scope declarations — **not** new engines per charter.

| ID | Gap | Type | Recommended action |
|----|-----|------|-------------------|
| **RC-01** | **Financial Intelligence** appears in stack diagrams but has no intelligence specification | Missing spec | Author FIE spec or remove from stack diagrams in next doc revision |
| **RC-02** | **Executive Decision Corpus (KA-13)** not in IBS seven asset classes | Capital accounting | Extend IBS §3 or formally subsume under Experiment Genealogy + M1 with depreciation rules |
| **RC-03** | **Proof Efficacy Matrix (KA-06)** not distinct in IBS | Capital accounting | Map to SCDG sub-ledger or add line item |
| **RC-04** | **KA-09 Market Shock Registry** absent from IBS | Capital accounting | Add Tier C asset with explicit depreciation (Freshness) |
| **RC-05** | **Knowledge Library** — staleness in CoIE gate but no asset class | Estate inventory | Trust Fabric / Knowledge domain spec or IBS appendix |
| **RC-06** | **Endogenous Event Calendar** (MkIE §4.4) — required, undefined | Operational object | MkIE appendix schema; owner = CoIE steward + shock steward |
| **RC-07** | **CPO ↔ MkIE shock type mapping** (6 CPO types vs 10 MkIE classes) | Ontology bridge | CPO Board PATCH: mapping table |
| **RC-08** | **Household Decision Topology (KA-11)** — MOAT asset without engine spec | Estate inventory | Extend Customer DNA or standalone topology spec |
| **RC-09** | **Config / production genealogy pointer** — scattered across KA-10 | Lineage | Experiment Genealogy appendix: `production_config_ref` |
| **RC-10** | **Drift index weights** (`w1`–`w4`) in CPO §8 | Parameters | CPO Board publishes coefficients or remove published index until defined |
| **RC-11** | **Bootstrap protocol** for CPO v1.0 → Active without outcome correlation | Genesis | CPO Board procedural doc: provisional → active promotion path |
| **RC-12** | **EIE reporting layer** — referenced, not harmonized here | Adjacent system | EIE remains audit layer per Executive Copilot §2 — no constitutional conflict |
| **RC-13** | **Software / API implementation** of gate registry | Implementation | Platform concern — gates are intelligence constitution, not code |
| **RC-14** | **MOAT_ANALYSIS** Palantir critique still says "no federation" | Doc drift | Update MOAT §6 cross-reference to LATAM Federation (editorial, not constitutional) |
| **RC-15** | **Multi-brand GAC portfolio** — not modeled | Domain scope | Future CPO extension — not harmonization scope |

## 7.3 Constitutional completeness score

| Dimension | Pre-harmonization | Post-harmonization v1.0 |
|-----------|-------------------|-------------------------|
| Gate namespace integrity | **F** | **A** |
| Minimum-N single source | **D** | **A** |
| Governance supremacy | **C** | **B+** |
| Learning freeze precedence | **C** | **A-** |
| Level 11 attestation | **D** | **B+** |
| Constitutional invariants | **B** (scattered) | **A** |
| Capital/asset inventory closure | **C** | **C** (unchanged — RC-02–05) |
| **Overall CPI-OS constitutional closure** | **C+** | **B+** |

## 7.4 Deployment guidance

1. **Adopt CPI-G-*** and **CPI-MN-*** immediately in Experiment Registry, CompanyLearningReport, and Executive Copilot packet templates.  
2. **Do not seed LATAM L1 child node** until D-02 attestation pre-check passes (no weight clone).  
3. **Freeze green proof demotion** during **CPI-G-MKIE-01** regardless of Executive Copilot green catalog — constitutional precedence over Copilot §4 green examples.  
4. Schedule **first Quarterly CPI-OS Constitutional Review** at end of first full quarter after adoption.  
5. Source engine specs remain valid; cite this document when thresholds conflict.

---

# Appendix A — Quick Reference Card

### Most-used gates

```
CPI-G-COIE-01   Data quality ≥0.92
CPI-G-COIE-09   Lost reason ≥95%
CPI-G-MKIE-01   S2+ shock freeze
CPI-G-ERE-02    Ontology version cited
CPI-G-CPO-01    No lost without lost_reason
CPI-G-FED-01    Local N before weight authority
```

### Most-used minimum-N

```
CPI-MN-PROOF-CLUSTER     200
CPI-MN-PROOF-GLOBAL-5    500
CPI-MN-SALES-LIFT        30
CPI-MN-DNA-CLUSTER-DISCOVERY  50
CPI-MN-CPO-TAXONOMY-EDIT 50
CPI-MN-FED-EDGE-L1       200
CPI-MN-FED-EDGE-L2       300
CPI-MN-FED-EXPORT-L0     15000
```

### Freeze precedence (remember)

```
Learning pause > Data fail > CPO critical > Privacy > MkIE S2+ > Federation > Marginal data > Ritual
```

---

# Appendix B — Document Map

| Document | Harmonized by |
|----------|---------------|
| [CONSIDERED_PURCHASE_ONTOLOGY.md](./CONSIDERED_PURCHASE_ONTOLOGY.md) | CPI-G-CPO-*, CPI-MN-CPO-*, Part 3 CPO Board |
| [COMPANY_INTELLIGENCE_ENGINE.md](./COMPANY_INTELLIGENCE_ENGINE.md) | CPI-G-COIE-*, CPI-MN org experiments, Domain B |
| [MARKET_INTELLIGENCE_ENGINE.md](./MARKET_INTELLIGENCE_ENGINE.md) | CPI-G-MKIE-*, Part 4 LF-04, Domain C |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | CPI-G-DNA-01/03, CPI-MN-DNA-* |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | CPI-G-DNA-02, CPI-MN-SALES-* |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | CPI-G-ERE-*, CPI-MN proof/DNA/marketing, Domain E |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Part 3 presentational authority, ≤5 cap invariant |
| [LATAM_FEDERATION_ARCHITECTURE.md](./LATAM_FEDERATION_ARCHITECTURE.md) | CPI-G-FED-*, CPI-MN-FED-*, Domain D |
| [INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md](./INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md) | CPI-G-IBS-*, Domain F |
| [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) | Part 5 unified certification |
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | Domain G, RC-14 editorial |

---

*End of CPI-OS Constitutional Harmonization Specification v1.0*
