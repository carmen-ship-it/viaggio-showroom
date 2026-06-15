# Santa Cruz Decision Graph — Specification

**Version:** 1.0  
**Date:** 14 June 2026  
**Asset ID:** KA-01 (see [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md))  
**Constraint:** Intelligence specification — not database implementation  

---

## Purpose

Transform every customer interaction from **ephemeral session data** into **persistent, weighted, outcome-labeled edges** in the **Santa Cruz Decision Graph (SCDG)**.

The SCDG is the atomic unit of Viaggio's moat: a living map of **what people fear, what proof moves them, what action closes, and what actually happened** — in Santa Cruz, for considered automotive purchase, with paths to LATAM generalization.

```
Session events  →  Graph edges  →  DNA refinement  →  Weekly edge weight update  →  ERE actions
```

---

# 1. What Is the Decision Graph?

Not a funnel. Not a customer journey map. A **typed, temporal, labeled multigraph** where:

- **Nodes** = cognitive states, objections, proofs, actions, outcomes, market shocks  
- **Edges** = observed transitions with confidence, cohort, and outcome label  
- **Subgraphs** = household decision units, campaigns, consultant assists  

### Graph vs funnel

| Funnel | Decision Graph |
|--------|----------------|
| Linear stages | Multi-path, cyclic (compare revisit) |
| Same for all buyers | Cohort-specific edge weights |
| Counts visits | Labels **why** transition occurred |
| Marketing-owned | **Jointly** sales + marketing + ops + outcome |

---

# 2. Node Taxonomy

## 2.1 Cognitive nodes (from ASI/BIL)

| Node type | Examples | Source |
|-----------|----------|--------|
| `emotional_state` | skeptical, family-protective, overwhelmed | ESE |
| `confidence_band` | LOW, MEDIUM, HIGH | BIL |
| `seeking_mode` | certainty, validation, permission, reassurance, urgency | ASI |
| `buying_style` | analytical, emotional, relational, … | BSM |
| `readiness_band` | DRM 0–25, 26–50, 51–75, 76–100 | DRM |

## 2.2 Objection nodes (from OPE + conversation)

| Node type | Examples |
|-----------|----------|
| `objection_latent` | china_brand, resale, spouse, payment, … |
| `objection_verbal` | customer said aloud (NLU) |
| `objection_resolved` | status flip after proof |

**Compound objections:** Multiple nodes with `AND` edge — e.g. `china_brand AND payment`.

## 2.3 Proof nodes (from DPE)

| Node type | Examples |
|-----------|----------|
| `proof` | faq_china, compare_corolla, family_safety, finance_tco |
| `proof_surface` | voice, screen, whatsapp_card |
| `proof_sufficiency` | boolean gate |

## 2.4 Action nodes

| Node type | Examples |
|-----------|----------|
| `action` | ask, show_proof, compare, finance, test_drive, share, escalate |
| `action_result` | accepted, deferred, rejected, ignored |

## 2.5 Outcome nodes (mandatory for learning)

| Node type | Examples |
|-----------|----------|
| `outcome` | won, lost, open, no_show |
| `lost_reason` | price, spouse, competitor, financing, timing, trust |
| `margin_band` | anonymized bucket for learning |

## 2.6 Context nodes (MkIE)

| Node type | Examples |
|-----------|----------|
| `market_shock` | competitor_promo, fx_move, oem_policy |
| `inventory_state` | unit_available, color_match, demo_ready |
| `channel` | meta, radio, walk_in, whatsapp, kiosk |

## 2.7 Actor nodes

| Node type | Examples |
|-----------|----------|
| `customer_dna` | cluster ID (see CUSTOMER_DNA_ENGINE) |
| `salesperson_dna` | consultant signature |
| `marketing_dna` | message cohort |
| `household` | decision unit ID |

---

# 3. Edge Taxonomy

Every interaction creates or strengthens edges:

```yaml
edge:
  id: uuid
  from: nodeId
  to: nodeId
  type: transition_type
  weight: float              # cumulative strength
  outcome_correlation: float # P(positive outcome | this edge)
  cohort: string             # dna_cluster + concern + co_decision
  evidence_count: int
  last_updated: timestamp
  mkie_shock_adj: float      # weight adjustment during exogenous events
  holdout_eligible: bool
```

### Transition types

| Type | Example |
|------|---------|
| `fear_to_proof` | china_brand → faq_china |
| `proof_to_resolution` | faq_china → china_brand_resolved |
| `proof_to_action` | compare_corolla → test_drive_ask |
| `action_to_outcome` | test_drive → won (9 days) |
| `action_to_failure` | test_drive → no_show |
| `override` | consultant rejected AI proof recommendation |
| `spouse_injection` | share_opened → permission_mode |

---

# 4. How Interactions Become Graph Entries

## 4.1 Per-turn ingestion (real-time)

```
Customer turn N:
  1. Resolve active subgraph (household + session)
  2. Snapshot cognitive nodes from RTR
  3. If proof shown: add fear_to_proof edge (if objection active)
  4. If action taken: add proof_to_action edge
  5. Tag edges with customer_dna_id, salesperson_dna_id (if human)
  6. Do NOT finalize outcome weights until CRM close
```

## 4.2 Per-session closure

```
Session end:
  1. Freeze path as PathInstance (ordered edge list)
  2. Link to campaign_first_touch, assisted_channels
  3. If lead created: path → leadId
  4. State = pending_outcome
```

## 4.3 Per-outcome labeling (CRM — constitutional)

```
Deal closed or lost (48hr max):
  1. Attach outcome node to PathInstance
  2. Backpropagate outcome_correlation to all edges in path
  3. Update cohort-specific edge weights (minimum-N gate)
  4. Feed Customer DNA + Salesperson DNA refinement
  5. Emit weekly delta to ERE
```

**Without step 4.3, the graph is a diary — not intelligence.**

---

# 5. Santa Cruz Specificity (What Makes It "Santa Cruz")

Generic automotive graphs exist in textbooks. SCDG encodes **local decision physics**:

| Local factor | Graph expression |
|--------------|------------------|
| Chinese-brand trust anxiety | High centrality `china_brand` node; paths through Viaggio service proof |
| Spouse co-decision | `permission` seeking_mode; share → spouse subgraph |
| WhatsApp continuity | Cross-session edges; async permission closes |
| Toyota reventa honesty | `compare_corolla` → must include `resale_toyota_wins` sub-edge before positive outcome |
| Informal financing concern | `payment` + `defensive` compound; finance proof late in path |
| Equipetrol walk-in vs Meta pre-research | Different entry subgraphs, same ontology |
| GAC distributor trust (Viaggio vs importador) | `viaggio_service` proof node — **not in US graphs** |

### Generalization layers (LATAM OS path)

```
Layer 0: Santa Cruz automotive (SCDG pilot)
Layer 1: Bolivia urban (La Paz, Cochabamba) — edge weight transfer + local shock nodes
Layer 2: LATAM automotive (config pack)
Layer 3: LATAM considered purchase (vertical abstraction)
```

**Rule:** Never merge layers without minimum-N in target market. Transfer **topology**, not **weights**.

---

# 6. Graph Intelligence Operations

## 6.1 Weekly graph diff (automatic)

| Metric | Use |
|--------|-----|
| Edge weight Δ > 2σ | ERE: promote/demote proof |
| New compound objection emergence | Ontology proposal (CPO) |
| Path length to won ↓ | APC validation |
| Cyclic compare revisit ↑ | Content or CI failure |
| Spouse subgraph without outcome | Permission-mode strategy |

## 6.2 Graph queries (intelligence, not SQL)

**Natural questions the graph must answer:**

1. *"For trust-anxious family DNA, what is the highest-lift 3-edge path to won under no MkIE shock?"*  
2. *"Which proof resolves `china_brand AND spouse` compound?"*  
3. *"What path precedes `lost_reason: competitor`?"*  
4. *"Which salesperson DNA improves outcomes on defensive-payment paths?"*  
5. *"Did Meta-sourced subgraphs shift after Corolla promo week 24?"*  

## 6.3 Counterfactual discipline

Holdout cohorts **omit** one proof edge per experiment. Compare:

```
P(won | path with proof X) − P(won | holdout without X)
```

If Δ < threshold → edge weight frozen despite correlation.

---

# 7. Graph Integrity Rules

| Rule | Rationale |
|------|-----------|
| No outcome node without `lost_reason` if lost | Learning integrity |
| No edge weight update if evidence_count < N | Overfitting |
| MkIE shock active → freeze auto promotion | External confound |
| Override edges never deleted | Human signal |
| Household edges require consent flag | Privacy |
| Public compare facts ≠ proprietary edges | Moat is **paths**, not **facts** |

---

# 8. Relationship to Other Intelligence Objects

```
SCDG edges
    → refine Customer DNA centroids
    → refine Salesperson DNA affinities
    → refine Marketing DNA message-response curves
    → feed Executive Copilot action packets
    → version Considered Purchase Ontology
```

**Customer DNA** = compressed summary of typical subgraphs per cluster.  
**Decision Graph** = the full institutional memory.

---

# 9. Level 11 Definition (Graph Maturity)

| Level | Graph capability |
|-------|------------------|
| L6 | Sessions logged, no graph |
| L7 | Paths logged, pending outcomes |
| L8 | Outcome-labeled paths, weekly diff |
| L9 | Holdout-validated edge weights |
| L10 | Multi-channel household subgraphs |
| **L11** | **SCDG predicts margin-optimal path per DNA cluster; ERE acts on graph diff; LATAM layer 1 live** |

---

# 10. Blind Spots

| Blind spot | Mitigation |
|------------|------------|
| Graph encodes past culture — misses Gen Z shift | Quarterly ontology review |
| Sparse edges for rare trims | Minimum-N; don't over-route |
| Consultant path ≠ AI path | Dual trace merge on handoff |
| Won deal long cycle — attribution decay | Time-decay on edge credit |

---

*End of Santa Cruz Decision Graph Specification v1.0*
