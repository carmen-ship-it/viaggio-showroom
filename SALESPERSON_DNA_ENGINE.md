# Salesperson DNA Engine — Intelligence Specification

**Version:** 1.0  
**Date:** 14 June 2026  
**Asset ID:** KA-04 · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Feeds:** Consultant Copilot · SCDG · Executive Copilot  
**Constraint:** Intelligence for coaching and matching — not surveillance or automated discipline  

---

## Purpose

**Salesperson DNA** is a **skill and style signature** for each consultant (and AI-assist mode) — encoding *who closes whom, how, and where humans outperform machines*.

It completes the matching triangle:

```
Customer DNA  ×  Salesperson DNA  ×  Proof path  →  Outcome
```

Without Salesperson DNA, the platform learns **what to say** but not **who should say it**.

---

# 1. What Salesperson DNA Is Not

| Not Salesperson DNA | Why |
|---------------------|-----|
| Monthly units sold | Confounded by lead quality |
| CRM activity volume | Busyness ≠ skill |
| Commission rank | Incentive-gamed |
| AI copilot on/off boolean | Tool usage ≠ capability |
| Manager opinion | Subjective; not graph-backed |

---

# 2. Salesperson DNA Structure

```yaml
salespersonDNA:
  dnaId: uuid
  actorType: human_consultant | ai_assist | hybrid_handoff
  consultantId: string?
  version: int
  confidence: 0-1
  sampleSize: int                 # minimum-N gate for claims

  # Skill genotype
  skillGenotype:
    trust_closer: float           # wins on high trust_baseline customers
    validation_specialist: float  # compare-first researchers
    permission_facilitator: float # spouse-blocked paths
    payment_navigator: float      # defensive payment DNA
    family_emotional: float       # family-protective phenotype
    fast_closer: float            # short path to won
    recovery_specialist: float    # wins after prior lost

  # Style phenotype
  stylePhenotype:
    avg_talk_listen_ratio: float
    override_rate: float          # rejects AI recommendation
    override_accuracy: float        # overrides that led to won vs AI path
    copilot_adherence: float
    avg_time_to_first_contact: float
    sla_compliance: float
    label_completeness: float     # lost_reason discipline — CoIE input

  # Affinity matrix (learned)
  customerDNAAffinity:
    - customerCluster: Trust-Anxious Co-Decision Family
      lift_vs_baseline: +0.18
      evidence_count: 47
    - customerCluster: Compare-First Researcher
      lift_vs_baseline: -0.05
      evidence_count: 22

  # Graph contribution
  graphSignature:
    edges_strengthened: [edge_id]   # paths where human improved outcome
    edges_weakened: [edge_id]       # human shortened path vs AI-only
    preferred_opening_frames: [string]
    preferred_close_frames: [string]

  # Outcome signature
  outcomeSignature:
    assisted_wins: int
    assisted_losses: int
    avg_assisted_margin_band: enum
    no_show_rate_when_owned: float
    spouse_align_rate: float

  # Meta
  lastRefined: timestamp
  coachingPriority: [skill_gap]     # for sales director, not auto-punishment
```

---

# 3. How Salesperson DNA Is Built

## 3.1 Evidence sources

| Source | Signal |
|--------|--------|
| Handoff takeover | Human entered path at edge E |
| Copilot override (typed) | Human disagreed with AI |
| Path divergence | AI recommended proof A; human used proof B → outcome |
| CRM outcome | Won/lost with consultant_id |
| Time-to-contact | SLA and engagement |
| Customer feedback | Rare; high weight |
| AI-only sessions (no claim) | Baseline for lift calculation |

## 3.2 Lift calculation (per customer cluster)

```
lift(consultant C, cluster K) =
  P(won | C, K) − P(won | baseline_any, K)
```

**Minimum-N:** 30 assisted outcomes per cluster before affinity published to routing.

## 3.3 AI-assist as pseudo-consultant

`actorType: ai_assist` gets its own DNA — measuring **unassisted AI paths**:

- Where AI-only beats human baseline → expand automation (bounded)  
- Where human override_accuracy high → require handoff earlier  

**Intelligence insight:** Salesperson DNA includes **when humans should interrupt AI** — not only when AI helps humans.

---

# 4. DNA Matching Intelligence (Not Feature — Inference Rule)

When handoff or assignment considered:

```
matchScore(C, customerDNA) =
  w1 * customerDNAAffinity[C].lift
+ w2 * skillGenotype[C].relevant_skill
+ w3 * sla_compliance[C]
+ w4 * inventory_ownership[C]        # OIE — who knows the unit
− w5 * current_load[C]
```

**Output:** Ranked consultant list in Copilot — **recommendation**, not auto-assign (organizational politics remain human).

---

# 5. Coaching Intelligence (CoIE Integration)

Salesperson DNA feeds **coaching**, not automated punishment.

| DNA signal | Coaching action |
|------------|-----------------|
| High override_rate + low override_accuracy | "Trust the copilot on validation paths" |
| Low permission_facilitator + high spouse losses | Permission-mode training |
| High label_incompleteness | CRM discipline workshop |
| Negative lift on cluster with high volume | Pair with top performer on that cluster |
| High recovery_specialist | Route stale leads to this consultant |

**Blind spot BL-03 (MOAT):** Using DNA for firing creates gaming. **Policy:** DNA not in termination packets without human review.

---

# 6. Consultant Departure (Knowledge Retention)

When consultant leaves:

| Retained | Walks out |
|----------|-----------|
| Anonymized graph edges they strengthened | Personal relationships |
| Override corpus patterns | — |
| Aggregated affinity (reassigned to "historical consultant X") | Individual match scores |

**Graph institutionalizes** consultant skill — reduces key-person risk over time.

---

# 7. Relationship to Executive Copilot

Weekly packet includes:

- *"Assign permission-blocked pipeline to [C] — +18% lift on cluster"*  
- *"Copilot ignored on 34% of trust paths — floor coaching"*  
- *"AI-only paths outperform on Fast Validator; expand compression"*  

Actions, not charts — see [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md).

---

# 8. Level 11 Salesperson DNA Maturity

| Level | Capability |
|-------|------------|
| L8 | Consultant ID on outcomes |
| L9 | Override corpus typed |
| L10 | Cluster lift per consultant |
| **L11** | **Match intelligence improves assisted margin; AI/human boundary optimized per cluster; departure doesn't erase graph contribution** |

---

# 9. Remaining Blind Spots

| Blind spot | Mitigation |
|------------|------------|
| Star consultant gets best leads | Match on marginal lift, control for lead tier |
| Small team — low N | Bayesian shrinkage toward baseline |
| Consultants game copilot adherence | Adherence ≠ outcome; weight outcomes only |
| Cultural bias in "fast closer" | Bolivia permission culture — fast ≠ good for all clusters |

---

*End of Salesperson DNA Engine Specification v1.0*
