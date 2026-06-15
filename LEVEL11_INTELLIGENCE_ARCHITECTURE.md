# Level 11 Intelligence Architecture

**Version:** 1.0  
**Date:** 14 June 2026  
**Horizon:** 10 years · Considered purchase · Latin America  
**Codename:** CPI-OS (Considered Purchase Intelligence Operating System)  
**Builds on:** Level 10 CIP · CoIE · MkIE · ERE · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Constraint:** Intelligence architecture only — not software, not features  

---

## Executive Thesis

**Level 10** = a platform that learns from customers.  
**Level 11** = an **intelligence estate** that learns faster than any competitor can imitate — because every interaction deposits irreplaceable structure into:

1. **Santa Cruz Decision Graph (SCDG)**  
2. **Customer DNA Library**  
3. **Salesperson DNA Library**  
4. **Marketing DNA Library**  
5. **Considered Purchase Ontology (CPO)** — versioned, outcome-validated  

Level 11 is not more AI. It is **the organizational decision to treat these five assets as the balance sheet** — not the kiosk, not the CRM, not the LLM contract.

```
Level 10:  Observe → Reason → Act → Outcome → Learn → Report
Level 11:  Interact → Graph → DNA → Match → Margin → Compound → Decide (Executive Copilot)
```

---

# Part 1 — Level 10 vs Level 11

| Dimension | Level 10 (CIP) | Level 11 (CPI-OS) |
|-----------|----------------|-------------------|
| Unit of memory | Session, customer profile | **Decision Graph edge + DNA cluster** |
| Unit of value | Assisted sale | **Assisted margin per graph path** |
| Learning | Weekly config | **Graph weight + DNA affinity + executive decision loop** |
| Executive interface | Dashboard | **Executive Copilot action packets** |
| Consultant interface | Copilot card | **Customer DNA × Salesperson DNA match** |
| Marketing | Attribution | **Marketing DNA → acquisition-to-genotype map** |
| Moat | Promised | **Measured compounding rate** |
| Geography | Santa Cruz pilot | **LATAM layer federation** |
| Category | Smart dealership | **Considered Purchase Intelligence** |

---

# Part 2 — Intelligence Stack (Full)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE COPILOT (Level 11 interface)                │
│         Actions · Approvals · Margin impact · Board queue                │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                         │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        ▼                         ▼                         ▼
┌───────────────┐       ┌─────────────────┐       ┌───────────────┐
│ CoIE          │       │ MkIE            │       │ Financial     │
│ Org learning  │       │ Market shocks   │       │ Intelligence  │
└───────┬───────┘       └────────┬────────┘       └───────┬───────┘
        │                        │                         │
        └────────────────────────┼─────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    INTELLIGENCE ESTATE (Level 11 core)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ SCDG        │ │ Customer    │ │ Salesperson │ │ Marketing   │        │
│  │ Decision    │ │ DNA         │ │ DNA         │ │ DNA         │        │
│  │ Graph       │ │ Library     │ │ Library     │ │ Library     │        │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘        │
│  ┌─────────────────────────────────────────────────────────────┐        │
│  │ Considered Purchase Ontology (CPO) — versioned taxonomy      │        │
│  └─────────────────────────────────────────────────────────────┘        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              CUSTOMER INTELLIGENCE PLATFORM (Level 7–10)                   │
│              CIE · SIE (ASI·BIL·CSI·DPE·CI) · MIE · OIE · EIE            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              TRUST FABRIC (cross-cut)                                      │
│  Anti-hallucination · Explainability · Human override · Data governance    │
└─────────────────────────────────────────────────────────────────────────┘
```

**Intelligence flows down for action. Outcomes flow up for compounding.**

---

# Part 3 — Proprietary Knowledge Assets (Q1–Q3 Summary)

Full analysis: [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)

| Asset | Compounds? | Uncopyable @ Y3? |
|-------|------------|------------------|
| SCDG outcome-labeled edges | Yes — superlinear | Yes — if 15k+ paths |
| Customer DNA clusters | Yes — linear | Yes — with outcomes |
| Salesperson DNA affinity | Yes — linear | Yes — organizational |
| Marketing DNA curves | Yes — linear | Partial — creative copyable |
| CPO taxonomy versions | Step function | Yes — with floor validation |
| Override corpus | Yes | Yes |
| Assisted margin ledger | Yes | Yes — finance integration |
| Proof efficacy (holdout) | Superlinear | Yes |

**Not assets:** LLM weights, UI, public OEM specs.

---

# Part 4 — Marketing DNA Engine (Q7)

**Marketing DNA** is the **acquisition-side genotype** — encoding which messages, channels, and creative proofs **select for** which Customer DNA clusters before they enter the SCDG.

Distinct from Customer DNA:

| | Marketing DNA | Customer DNA |
|---|---------------|--------------|
| **When** | Pre-visit, campaign | In-market, all channels |
| **Question** | Who did we attract? | Who is deciding? |
| **Unit** | Campaign × audience × creative | Household decision unit |
| **Optimizes** | Spend efficiency | Path to margin |

## 4.1 Marketing DNA structure

```yaml
marketingDNA:
  dnaId: uuid
  campaignId: string
  channel: meta | radio | qr_lot | whatsapp_inbound | referral
  creativeProof: string           # which message/hero
  audienceTarget: string          # intended segment

  # Acquired genotype distribution
  acquiredGenotypeMix:
    Trust-Anxious Co-Decision: 0.42
    Compare-First Researcher: 0.31
    Payment-Defensive First SUV: 0.18
    other: 0.09

  # Funnel genetics (not just clicks)
  responseSignature:
  impressions: int
  scans: int
  sessions: int
  qualifiedLeads: int
  assistedWins: int
  assistedGP_per_dollar: float
  drm_delta_avg: float            # how much DRM moves vs cold entry

  # Drift detection
  genotypeDrift: float              # acquired vs intended target
  inMarketMismatch: bool            # high cost, wrong Customer DNA

  # Graph entry edges
  typicalEntryPath: [edge_id]       # first 3 SCDG edges after touch
```

## 4.2 Marketing DNA intelligence operations

| Weekly inference | Action via Executive Copilot |
|------------------|-------------------------------|
| Channel X selects Compare-First at 2× rate | Increase compare-first path capacity |
| Meta creative attracts Payment-Defensive but low win | Change creative or reduce bid |
| Radio QR → Trust-Anxious at low CAC | Shift budget amber packet |
| Genotype drift vs campaign brief | Agency coaching |
| Entry path differs from intended | Fix S21 landing message |

## 4.3 Marketing × Customer DNA loop

```
Marketing DNA (who we bought)
    → Customer DNA (who arrived)
        → SCDG (what they did)
            → Outcome (won/lost + margin)
                → Marketing DNA efficiency update
```

**Attribution maturity:** Marketing DNA closes the loop **before** first kiosk touch — essential for LATAM where research is mobile-first.

---

# Part 5 — Santa Cruz Decision Graph (Q4)

Full spec: [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md)

**Transformation rule:**

```
Every interaction  →  PathInstance edge list
Every CRM outcome  →  Backpropagate to edges + DNA + Marketing DNA efficiency
Every week         →  Graph diff  →  ERE  →  Executive Copilot
```

SCDG is the **shared memory** all DNA libraries compress and query.

---

# Part 6 — Customer DNA (Q5) · Salesperson DNA (Q6)

| Doc | Role |
|-----|------|
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Household decision genetics + graph affinity |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | Consultant skill signature + match intelligence |

**Level 11 matching intelligence:**

```
optimalPath(customerDNA, salespersonDNA?) =
  argmax_path  P(won | path) × E[margin | path]
  subject to MkIE shocks, OIE feasibility, proofs_negative blocked
```

---

# Part 7 — Executive Copilot (Q8)

Full spec: [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md)

**Replaces dashboard-as-primary** for GM weekly rhythm.

≤5 decision packets · green/amber/red zones · reject-reason learning · margin impact.

---

# Part 8 — Category-Defining Company (Q9)

Viaggio becomes **category-defining** when all are true:

| # | Criterion |
|---|-----------|
| 1 | **Category named and owned** — Considered Purchase Intelligence (CPI) |
| 2 | **Intelligence estate on balance sheet** — audited graph + DNA metrics |
| 3 | **Compounding published** — edges labeled/month, holdout lifts quarter |
| 4 | **Second node without rewrite** — Bolivia L1 or vertical pack #2 |
| 5 | **License economics** — third party pays for ontology + graph methodology |
| 6 | **LATAM thesis** — WhatsApp household, trust markets, informal finance |
| 7 | **Human-in-the-loop as leverage** — margin per consultant-hour ↑ |
| 8 | **Executive Copilot adopted** — ≥60% amber decisions acted |
| 9 | **Not competing with OpenAI** — interchangeable phrasing; proprietary structure |
| 10 | **Dealership = node zero** — not TAM ceiling |

**Investor sentence:**

> *"Viaggio built the operating system for considered purchase in Latin America — the Decision Graph and DNA estate compound with every sale; dealerships are deployment nodes."*

---

# Part 9 — External Critics (Q10)

Full critique: [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) §6

| Critic | Core attack | Level 11 response |
|--------|-------------|-------------------|
| **OpenAI** | "Wrapper on our models" | Own graph + DNA; LLM is substrate |
| **Palantir** | "No ontology governance / federation" | CPO board + LATAM layers + lineage |
| **McKinsey** | "70% fail on behavior" | CoIE + Executive Copilot ritual |
| **a16z** | "TAM = one dealer" | CPI-OS; node zero; API + license line |

**Unified rebuttal:** Level 11 measures **compounding intelligence assets**, not demo quality.

---

# Part 10 — Assumption Challenges (Level 11)

| Assumption | Challenge | Level 11 position |
|------------|-----------|-------------------|
| AI is the product | Commoditizes | **Graph + DNA estate** is product |
| More data = better | Wrong labels poison | **Outcome truth > volume** |
| LATAM = translate US playbooks | Trust/spouse/WhatsApp differ | **Santa Cruz layer 0 is source** |
| Scale = more dealerships | Linear ops | **Federated graph layers** |
| Dashboards = control | Passive | **Executive Copilot = control** |
| Customer = individual | Spouse decides | **Household DNA unit** |
| Marketing = leads | Vanity | **Marketing DNA genotype mix** |
| Consultants = users | Adoption risk | **Salesperson DNA = institutionalized skill** |
| Speed to Level 11 | Skip CRM discipline | **No graph without outcomes** |
| OpenAI makes this free | Models ≠ ontology | **3-year edge corpus uncopyable** |

---

# Part 11 — Remaining Blind Spots (Complete Inventory)

### Intelligence blind spots

| ID | Spot |
|----|------|
| I-01 | Graph correlation ≠ causation without perpetual holdouts |
| I-02 | DNA clusters ossify into stereotypes |
| I-03 | Marketing DNA optimizes past creatives; misses cultural shift |
| I-04 | Cross-border weight transfer wrong (Santa Cruz → São Paulo) |
| I-05 | Compound objections explode combinatorially |
| I-06 | Executive Copilot ignored → intelligence becomes theater |

### Organizational blind spots

| ID | Spot |
|----|------|
| O-01 | Floor incentivized on units not margin or labels |
| O-02 | OEM owns brand narrative; Viaggio doesn't own graph derivatives |
| O-03 | Key consultant leaves before DNA institutionalized |
| O-04 | Informal economy breaks margin ledger |
| O-05 | GAC builds global showroom; channel conflict |

### Legal / ethical blind spots

| ID | Spot |
|----|------|
| E-01 | Profiling regulation in LATAM evolves |
| E-02 | Household graph without spouse consent |
| E-03 | DNA used for pricing or credit inference |
| E-04 | AI disclosure rules in automotive ads |

### Competitive blind spots

| ID | Spot |
|----|------|
| C-01 | Toyota funds competing intelligence via dealer network |
| C-02 | CRM vendors add "good enough" lead AI |
| C-03 | Palantir enters automotive LATAM via enterprise |
| C-04 | Copycat with 3-year runway in Peru — parallel graph |

---

# Part 12 — Ten-Year Evolution (LATAM CPI-OS)

```
Phase 0 (Y0–1): Santa Cruz node — SCDG + DNA v1 + outcome discipline
Phase 1 (Y1–2): Bolivia federation — La Paz, Cochabamba layers
Phase 2 (Y2–4): Vertical pack #2 — real estate or insurance (same ontology kernel)
Phase 3 (Y4–6): LATAM automotive partners — licensed graph methodology
Phase 4 (Y6–8): Anonymized benchmark product — network moat
Phase 5 (Y8–10): CPI-OS standard — API for reason(path|DNA) + governance hosted
```

### Year-by-year intelligence maturity

| Year | Graph edges labeled | DNA profiles | Executive Copilot | Category |
|------|---------------------|--------------|-------------------|----------|
| Y1 | 2k | 800 | Recommendations | Pilot |
| Y2 | 8k | 4k | Approve/reject | Bolivia |
| Y3 | 15k+ | 12k | Auto green zone | Moat proven |
| Y5 | 50k+ federated | 40k | Board queue | Vertical #2 |
| Y10 | 500k+ LATAM | 200k+ | Licensed OS | CPI standard |

---

# Part 13 — Level 11 Definition (Formal)

> **Level 11** is achieved when Viaggio's **intelligence estate** — SCDG, Customer DNA, Salesperson DNA, Marketing DNA, and CPO — demonstrates **measurable quarter-over-quarter compounding** of **assisted gross profit per decision path**, with:

1. **≥15,000 outcome-labeled graph paths** in primary market  
2. **Holdout-validated proof promotions** — not correlation-only  
3. **Executive Copilot** driving ≥60% of amber decisions to resolution  
4. **Marketing DNA** closing acquisition-to-margin loop  
5. **Salesperson DNA** improving match lift on ≥2 clusters  
6. **MkIE-adjusted** performance reporting (no false AI blame)  
7. **Second node or vertical** live on same ontology kernel  
8. **Investor-auditable** config genealogy tied to margin  
9. **LATAM layer 1** defined (topology transfer, not weight clone)  
10. **Category language** — CPI-OS — used externally by partners, not only Viaggio  

---

# Part 14 — Intelligence Document Map

| Document | Intelligence object |
|----------|---------------------|
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | Assets, compounding, critics, category |
| [DECISION_GRAPH_SPEC.md](./DECISION_GRAPH_SPEC.md) | SCDG |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Customer DNA |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | Salesperson DNA |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Executive action interface |
| §4 this doc | Marketing DNA |
| FUTURE_STATE_ARCHITECTURE | CIP Level 7–10 |
| SELF_IMPROVING_COMPANY_BLUEPRINT | CoIE, MkIE, ERE |

---

# Part 15 — Closing Thesis

Software architectures are copied in months. **Intelligence estates** are copied in years — if ever.

Level 11 is the deliberate construction of:

- A **Decision Graph** that remembers every fear and every proof that failed or succeeded  
- **DNA libraries** that compress that memory into matchable signatures  
- An **Executive Copilot** that turns compounding into **approved action**  
- A **category** — Considered Purchase Intelligence — that makes Viaggio **uncompareable to dealership software**

The goal is not to be the best car kiosk in Santa Cruz.

The goal is to be **the intelligence layer that Latin America uses to sell anything that requires trust before money changes hands.**

**That is Level 11.**

---

*End of Level 11 Intelligence Architecture v1.0*
