# Executive Copilot — Intelligence Specification

**Version:** 1.0  
**Date:** 14 June 2026  
**Replaces:** Dashboard-as-primary executive interface (EIE reporting remains audit layer)  
**Builds on:** ERE · CoIE · MkIE · SCDG · DNA engines · [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md)  
**Constraint:** Delivers **decisions and actions** — not widgets  

---

## Purpose

The **Executive Copilot** is the Level 11 interface between **compounding intelligence** and **ownership authority**.

It does not ask the GM to interpret charts. It delivers:

```
SITUATION → INFERENCE → RECOMMENDED ACTION → EXPECTED IMPACT → APPROVE / REJECT / DEFER
```

**Dashboards explain the past. Executive Copilot proposes the future.**

---

# 1. Design Principles

| Principle | Implication |
|-----------|-------------|
| **≤5 packets per week** | Cognitive load cap |
| **Every packet is actionable** | No "awareness only" items |
| **Bounded automation zones** | Green executes; amber approves; red never |
| **MkIE context mandatory** | No internal blame for external shocks |
| **Graph evidence required** | Cite SCDG edge IDs and DNA cohorts |
| **Reject requires reason** | Rejection trains ERE |
| **Margin over volume** | Impact in assisted GP, not leads |

---

# 2. Executive Copilot vs EIE

| EIE (Reporting) | Executive Copilot |
|-----------------|-------------------|
| What happened | What to do next |
| Historical | Forward-looking |
| Audit, investor, board | GM daily/weekly |
| All metrics | Filtered by materiality |
| Passive | Active approval queue |

**Relationship:** Copilot consumes EIE + CoIE + MkIE + graph diff. EIE remains for diligence and board packs.

---

# 3. Weekly Packet Structure

Delivered Monday 07:00 (after Sunday `CompanyLearningReport`).

```yaml
executiveWeeklyPacket:
  weekId: 2026-W24
  materialityScore: 0-100
  mkieShockSummary: string | none
  dataQualityGate: pass | fail    # CoIE — if fail, packets limited to data fixes

  decisions:
    - decisionPacket
  exceptions:
    - exceptionPacket
  deferred:
  - items below materiality threshold (link to EIE)
```

## 3.1 Decision packet schema

```yaml
decisionPacket:
  id: dec_w24_01
  title: "Promote proof edge viaggio_service → compare_corolla for Trust-Anxious cluster"
  automationZone: green | amber | red
  situation: "Trust-anxious co-decision paths lost 8% more week W23 vs baseline"
  inference: "SCDG edge weight Δ +2.3σ; china_brand resolution without service precedes loss"
  recommendedAction:
    type: graph_config_change
    payload: promote_edge_sequence [faq_china, viaggio_service, compare_corolla]
    scope: cluster Trust-Anxious Co-Decision Family
  expectedImpact:
    metric: assisted_GP_per_session
    pointEstimate: +4.2%
    confidenceInterval: [+1.1%, +7.8%]
    minimumN: 214 paths
  evidence:
    scdgEdges: [edge_8821, edge_8829]
    holdoutStatus: passed
    mkieAdjusted: true
  approver: GM | auto_if_green
  expiresAt: 2026-06-17
  onApprove: config_v47_deploy
  onReject: require_reason_enum
```

## 3.2 Exception packet (non-actionable until fixed)

```yaml
exceptionPacket:
  id: exc_w24_02
  title: "Lost-reason completeness 71% — learning frozen"
  action: "Sales director enforces CRM gate before Friday"
  blocksDecisions: [dec_w24_03, dec_w24_04]
```

---

# 4. Decision Types (Executive Copilot Catalog)

## Green — auto-execute unless GM vetoes within 24h

| Type | Example |
|------|---------|
| Suppress proof with negative lift | Demote `heritage_lecture` for overwhelmed DNA |
| Stale knowledge block | Stop quoting cuota band v3 |
| SLA routing | WhatsApp queue when staffing < threshold |
| Content debt priority rank | #1 objection without proof asset |

## Amber — requires explicit approval

| Type | Example |
|------|---------|
| Campaign budget shift | −12% Meta, +8% radio QR |
| Proof sequence promotion | Cluster-specific path change |
| Saturday staffing +1 | OIE prediction from session forecast |
| Ontology merge proposal | Compound objection `china_brand+payment` |
| Consultant coaching focus | Permission-mode training for 2 consultants |

## Red — recommend only; never auto

| Type | Example |
|------|---------|
| Pricing / discount | Margin risk |
| Inventory acquisition | Capital decision |
| New vertical launch | Strategic |
| OEM negotiation | Relationship |
| Consultant termination | Legal/human |

---

# 5. Daily Micro-Packets (Optional)

**≤2 per day** for time-sensitive items only:

| Trigger | Packet |
|---------|--------|
| MkIE competitor shock | "Freeze proof rank changes; Toyota 0% rumor week" |
| Grounding fail >2% | "Disable voice channel — investigate Knowledge Library" |
| SLA breach cluster | "Saturday 14:00 — add floor coverage or disable handoff promise" |
| Inventory mismatch spike | "Pause test-drive auto-recommend until OIE sync" |

**Rule:** If nothing material → **no packet**. Silence is trust.

---

# 6. Intelligence Inputs (Not Features)

```
Sunday batch:
  SCDG weekly diff
  Customer DNA cluster mix shift
  Salesperson DNA lift anomalies
  Marketing DNA acquisition vs in-market drift
  Assisted Margin Ledger Δ
  CoIE data quality score
  MkIE shock registry
  ERE ranked proposals
        ↓
  Materiality filter (top 5)
        ↓
  Executive Copilot packet
```

---

# 7. Approve / Reject Learning Loop

| GM action | System learning |
|-----------|-----------------|
| Approve | Log expected impact; review next week |
| Reject + reason `insufficient_evidence` | Raise minimum-N for that decision type |
| Reject + reason `brand_risk` | Tag edge with brand constraint |
| Reject + reason `operational_impossible` | OIE feasibility rule added |
| Defer | Re-surface once with new evidence only |
| Veto green auto | CoIE flags override; tighten green criteria |

**ERE trains on executive judgment** — rare labeled dataset of strategic decisions.

---

# 8. Investor / Board Mode (Quarterly)

Executive Copilot generates **board packet** — still action-oriented:

| Section | Content |
|---------|---------|
| Compounding proof | Graph edges labeled / month trend |
| Moat metric | DNA library size + holdout-validated lifts |
| Margin attribution | Assisted GP from intelligence vs baseline |
| Market context | MkIE summary |
| **Strategic decision queue** | 3 amber/red items for board input |
| Risk register delta | New BL spots |

**Not:** 40-slide dashboard export.

---

# 9. What Executive Copilot Must Never Do

1. Auto-change price or discount  
2. Auto-commit marketing spend >amber threshold  
3. Auto-message customers without template approval  
4. Display customer DNA labels to executives for individual customers (aggregate only)  
5. Fire or penalize consultants  
6. Claim causation without holdout when CoIE experiment registry requires it  
7. Send packet when data quality gate fails (except data-fix actions)  

---

# 10. Level 11 Executive Copilot Maturity

| Level | Behavior |
|-------|----------|
| L9 | Weekly report with recommendations |
| L10 | Approve/reject loop; ERE learns |
| **L11** | **≥60% approved actions show measurable lift; green zone trusted; board uses copilot queue; margin impact attributed per decision packet** |

---

# 11. Blind Spots

| Blind spot | Mitigation |
|------------|------------|
| GM ignores packets | CoIE ritual compliance metric |
| Decision fatigue | Hard cap 5/week |
| Overconfidence intervals | Bayesian widening on small N |
| Political rejections | Reason enum + quarterly pattern review |
| Copilot vs gut | Track deferred decisions vs outcomes |

---

*End of Executive Copilot Specification v1.0*
