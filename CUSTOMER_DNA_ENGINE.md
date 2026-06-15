# Customer DNA Engine — Intelligence Specification

**Version:** 1.0  
**Date:** 14 June 2026  
**Asset ID:** KA-03 · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Feeds:** [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) · SIE · DPE · Executive Copilot  
**Constraint:** Intelligence only — not UI or storage implementation  

---

## Purpose

**Customer DNA** is a stable, compressible **decision signature** for a household decision unit — not a CRM contact record.

It answers: *What kind of buyer is this, how do they decide, what moves them, what loses them, and which paths in the Santa Cruz Decision Graph historically work for people like them?*

DNA is **inferred continuously**, **validated at outcome**, and **refined weekly** from graph backpropagation.

---

# 1. What Customer DNA Is Not

| Not DNA | Why |
|---------|-----|
| Demographics (age, income) | Sparse at kiosk; unreliable in Bolivia |
| CRM contact fields | Static; not behavioral |
| Session state | Ephemeral |
| Lead score | Commercial priority, not identity |
| "Persona" (Carlos/Diego) | Content voice, not buyer genetics |
| LLM summary | Unbounded; not comparable |

---

# 2. Customer DNA Structure

```yaml
customerDNA:
  dnaId: uuid
  householdId: uuid
  version: int                    # increments on material refinement
  confidence: 0-1                 # inference confidence

  # Core genotype (stable-ish)
  genotype:
    primary_concern: enum         # trust | safety | payment | validation | space | technology
    co_decision_mode: enum        # solo | partner | family_influencer
    buying_style: enum            # BSM
    trust_baseline: float         # 0-1 prior skepticism
    price_sensitivity: float
    validation_need: float
    permission_need: float        # spouse/family gate strength

  # Phenotype (session-expressed)
  phenotype:
    dominant_emotional_state: enum
    seeking_mode: enum
    avoidance_target: string
    decision_frame: string
    compound_objections: [id]

  # Graph affinity (learned)
  graphAffinity:
    optimal_path_template: edge_sequence_id   # from SCDG cohort match
    proofs_high_lift: [proof_id]
    proofs_negative: [proof_id]               # correlate with loss
    actions_preferred: [action_type]
    typical_path_length_to_won: int
    spouse_gate_probability: float

  # Outcome history (phenotypic validation)
  outcomeSignature:
    sessions: int
    leads: int
    test_drives: int
    wins: int
    losses: int
    dominant_lost_reason: enum?
    avg_days_to_close: float
    assisted_margin_band: enum?

  # Meta
  lastMaterialChange: timestamp
  cohortLabel: string             # human-readable cluster name
  latamLayer: 0                   # 0=Santa Cruz pilot
```

---

# 3. How DNA Is Built (Inference Pipeline)

## Stage 1 — Genotype seed (first touch)

Sources (no fixed order):

| Signal | Genotype slot |
|--------|---------------|
| NLU: *"es chino"* | trust_baseline ↑, primary_concern: trust |
| NLU: *"mi esposa"* | co_decision_mode: partner, permission_need ↑ |
| Compare revisit behavior | validation_need ↑ |
| FINANCING_EXIT_FAST | price_sensitivity ↑ |
| Campaign (Meta compare ad) | validation_need ↑, pre_research flag |
| MkIE: competitor promo week | temporary phenotype shift, not genotype |

**Minimum evidence rule:** No genotype slot locked until confidence ≥0.7 OR outcome validates.

## Stage 2 — Phenotype update (every turn)

RTR snapshot merges into phenotype. Phenotype can diverge from genotype temporarily (e.g. usually analytical buyer, today overwhelmed).

## Stage 3 — Graph affinity (weekly)

Match household paths to SCDG cohort edges:

```
affinity(proof X) = mean(outcome_correlation | dna_cohort, proof X)
```

Top-k proofs become `proofs_high_lift`. Proofs with negative Δ on won rate → `proofs_negative`.

## Stage 4 — Outcome validation (at CRM close)

| Outcome | DNA update |
|---------|------------|
| Won | Reinforce path template; ↑ confidence |
| Lost + spouse | ↑ permission_need permanently |
| Lost + competitor | ↑ validation_need; compare in template |
| Lost + trust | ↑ trust_baseline; remove failed proofs from high_lift |
| No_show | phenotype: hesitation; don't mutate genotype aggressively |

---

# 4. DNA Clusters (Emergent Cohorts)

Clusters are **discovered**, not hand-drawn — but named for operations.

### Santa Cruz pilot clusters (expected emergence)

| Cluster label | Genotype signature | Graph path bias |
|---------------|-------------------|-----------------|
| **Trust-Anxious Co-Decision Family** | trust + partner + family-protective | service → family → compare honest → joint drive |
| **Compare-First Researcher** | validation + analytical | compare early → TCO → drive |
| **Payment-Defensive First SUV** | payment + defensive + trust | value compare → delay finance → human |
| **Fast Validator** | validation + excited + HIGH confidence | compress → drive |
| **Permission-Blocked Async** | partner + permission; WhatsApp | share → spouse subgraph → delayed close |

**New clusters** appear when graph diff detects unexplained outcome variance — CoIE reviews before naming.

---

# 5. Household Decision Unit

Customer DNA attaches to **householdId**, not phone alone.

```yaml
household:
  householdId: uuid
  primaryDecisionMaker: customerId?
  influencers: [{ customerId?, role, consent }]
  sharedObjectionLedger: merged
  permissionState: pending | aligned | blocked
```

**Spouse opens share link:** Create or link influencer DNA fragment; merge into household genotype when consent allows.

**Blind spot:** Forced household merge without consent destroys trust. Permission gate on merge.

---

# 6. DNA → Intelligence Consumption

| Consumer | Use |
|----------|-----|
| **SIE / DPE** | Match `proofs_high_lift`; block `proofs_negative` |
| **CI** | permission_need → share close; trust_baseline → delay finance |
| **Salesperson DNA** | Match consultant affinity to customer DNA |
| **Marketing DNA** | Acquisition cohort vs in-market DNA drift |
| **Executive Copilot** | Portfolio mix: "42% of pipeline is Trust-Anxious Co-Decision" |
| **SCDG** | Cohort edge on all path instances |

---

# 7. DNA Decay and Refresh

| Event | DNA behavior |
|-------|--------------|
| 90 days inactive | confidence ↓; phenotype reset on return |
| Major life change (verbal) | manual genotype correction |
| Market shock (MkIE) | phenotype overlay, not genotype erase |
| Wrong cluster assignment | override tag → CoIE review |

---

# 8. Ethics and Trust (Intelligence Guardrails)

| Risk | Safeguard |
|------|-----------|
| Stereotyping | Never expose cluster label to customer |
| Discrimination | No DNA use for pricing or credit |
| Surveillance feeling | DNA invisible; behavior is "being understood" |
| Data minimization | Genotype slots only — no inferred income |

**Customer-facing:** Mirror language from phenotype, not *"your DNA says X."*

---

# 9. Level 11 Customer DNA Maturity

| Level | Capability |
|-------|------------|
| L8 | Slots + style inferred |
| L9 | Graph affinity from cohort |
| L10 | Household merge + outcome validation |
| **L11** | **DNA predicts margin-optimal path; cross-node cluster transfer (Bolivia L1); spouse async closes traced to genotype** |

---

# 10. Relationship to Marketing DNA

**Customer DNA** = in-market decision genetics.  
**Marketing DNA** (see [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) §4) = which **acquired** audiences contain which customer DNA before they enter the graph.

```
Marketing DNA (acquisition) → Customer DNA (in-market) → Decision Graph (paths) → Outcome
```

---

*End of Customer DNA Engine Specification v1.0*
