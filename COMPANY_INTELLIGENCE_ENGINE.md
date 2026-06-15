# Company Intelligence Engine (CoIE) — Intelligence Specification

**Version:** 1.0  
**Date:** 15 June 2026  
**Codename:** CoIE  
**Sits above:** Customer Intelligence Platform (CIE · SIE · MIE · OIE · EIE)  
**Sits below:** Executive Recommendation Engine (ERE) · Executive Copilot  
**Builds on:** [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md) · [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) · [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) · [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)  
**Constraint:** Organizational learning architecture only — no software, UI, databases, or APIs  

---

# 1. Purpose

## 1.1 Why CoIE exists

CPI-OS accumulates customer intelligence, market intelligence, and executive recommendations. None of that compounds if the **organization** cannot:

- adopt what it learns  
- execute what it decides  
- measure what it experiments  
- remember what it proved  

**CoIE is the organizational learning system of CPI-OS.** It ensures intelligence becomes institutional habit — not consulting deckware, not dashboard theater, not a smarter kiosk that the floor ignores.

## 1.2 What CoIE is

CoIE answers one meta-question every week:

> *Is this company capable of learning — and did it actually learn?*

It measures and enforces:

| Dimension | CoIE question |
|-----------|---------------|
| **Adoption** | Did roles use intelligence where it mattered? |
| **Execution** | Did approved decisions ship and persist? |
| **Measurement** | Did experiments reach minimum-N before promotion? |
| **Compounding** | Did this week's learning survive into next week's behavior? |

**EIE reports the business. MkIE explains the market. CoIE improves the business that runs the platform.**

## 1.3 What CoIE is not

| CoIE is not | Why |
|-------------|-----|
| EIE | EIE describes outcomes; CoIE audits learning capability |
| ERE | ERE ranks actions; CoIE gates whether those actions may be proposed |
| Executive Copilot | Copilot presents decisions; CoIE enforces ritual and data discipline |
| HR or performance management | CoIE flags misalignment; it does not hire, fire, or set commissions |
| IT project management | CoIE owns learning discipline, not sprint boards |
| Change management consulting | CoIE is permanent institutional machinery, not a one-time rollout |

## 1.4 Constitutional rule

**No organizational learning ships without CoIE clearance.**

When data quality fails, ritual is skipped, or experiments lack proof, CoIE **blocks** graph-driven recommendations from reaching executives — except Executive Escalation (data repair, process failure). Intelligence without organizational discipline poisons the Decision Graph.

```
Customer outcome  →  Intelligence inference  →  CoIE gate  →  ERE  →  Executive Copilot  →  Human decision  →  Measured deployment  →  CoIE audit
```

## 1.5 Mission statement

> **CoIE ensures that every lost sale, every override, every rejected recommendation, and every skipped ritual makes next week's organization measurably more capable of learning — or surfaces why it cannot.**

---

# 2. Position in Architecture

## 2.1 Stack placement

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXECUTIVE COPILOT (Level 11 interface)                │
│         ≤5 packets · approve/reject/defer · margin accountability        │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              EXECUTIVE RECOMMENDATION ENGINE (ERE)                       │
│         Rank · gate · propose bounded organizational actions               │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │  blocked if CoIE gate = fail
┌─────────────────────────────────▼───────────────────────────────────────┐
│              COMPANY INTELLIGENCE ENGINE (CoIE)  ◄── YOU ARE HERE        │
│   Ritual · data quality · experiments · adoption · organizational memory │
└───────────────┬─────────────────────────────────────┬───────────────────┘
                │                                     │
    ┌───────────▼──────────┐              ┌──────────▼──────────┐
    │ MkIE                   │              │ Financial           │
    │ Market shock context   │              │ Intelligence        │
    └───────────┬────────────┘              └──────────┬──────────┘
                │                                        │
                └────────────────┬───────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    INTELLIGENCE ESTATE (Level 11)                        │
│  SCDG · Customer DNA · Salesperson DNA · Marketing DNA · CPO            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────────┐
│              CUSTOMER INTELLIGENCE PLATFORM (Level 7–10)                   │
│              CIE · SIE · MIE · OIE · EIE                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Intelligence flows up for inference. CoIE audits whether the organization deserved that inference.**

## 2.2 Upstream dependencies (what CoIE consumes)

| Source | CoIE use |
|--------|----------|
| **CRM outcome records** | Label completeness, gaming anomalies, join integrity |
| **Governance logs** | Override rates, typed rejections, grounding failures |
| **ERE decision log** | Approval/reject/defer rates, deployment follow-through |
| **Executive Copilot ritual** | Packet review attendance, time-to-resolution |
| **MkIE shock registry** | Whether external variance was acknowledged before blame |
| **Knowledge Library** | Staleness, named domain owners, validation cadence |
| **Salesperson DNA** | Copilot adoption, label discipline, coaching compliance |
| **Floor operations** | SLA patterns, manual workarounds, process debt signals |

## 2.3 Downstream consumers (what CoIE produces)

| Consumer | CoIE output |
|----------|-------------|
| **ERE** | Data quality gate (pass/fail), experiment status, ritual compliance score |
| **Executive Copilot** | Executive Escalation packets when learning is blocked |
| **CEO / ownership** | Weekly organizational learning scorecard, accountability exceptions |
| **MkIE** | Attribution pause signals when internal data untrustworthy |
| **New node deployment** | Maturity gate before config pack replication |
| **Board / investor** | Learning compounding rate, experiment genealogy summary |

## 2.4 CoIE vs adjacent engines

| Engine | Horizon | Question |
|--------|---------|----------|
| **SIE** | Per customer turn | What should we say next? |
| **ERE** | Per organizational week | What should ownership consider? |
| **CoIE** | Per organizational week + quarter | Can we trust this week's learning? Did we act on last week's? |
| **MkIE** | Continuous | What did the market do that we did not control? |

CoIE is the **immune system** of CPI-OS: it does not generate customer-facing intelligence; it protects the compounding loop from organizational failure.

---

# 3. Organizational Learning Cycle

## 3.1 The compounding loop

Organizational learning is not a meeting. It is a **closed cycle** with named stages, owners, and pass/fail criteria.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   OBSERVE    │ ──► │   INFER      │ ──► │   PROPOSE    │ ──► │   DECIDE     │
│  outcomes +  │     │  graph diff  │     │  ERE ranked  │     │  Copilot +   │
│  behaviors   │     │  DNA shift   │     │  actions     │     │  human       │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │                    │
       │                    ▼                    │                    ▼
       │             ┌──────────────┐           │             ┌──────────────┐
       │             │  CoIE GATE   │◄──────────┘             │   DEPLOY     │
       │             │  data · exp  │                         │  bounded     │
       │             │  · ritual    │                         │  change      │
       │             └──────┬───────┘                         └──────┬───────┘
       │                    │ pass only                            │
       │                    ▼                                      ▼
       │             ┌──────────────┐                     ┌──────────────┐
       └────────────►│   MEASURE    │◄────────────────────│   EXECUTE    │
                     │  lift · N ·  │                     │  floor · ops │
                     │  adoption    │                     │  · marketing │
                     └──────┬───────┘                     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   REMEMBER   │
                     │  org memory  │
                     │  + genealogy │
                     └──────────────┘
```

**CoIE owns stages:** GATE · MEASURE · REMEMBER · and the audit of DECIDE → DEPLOY → EXECUTE.

## 3.2 Four learning horizons

| Loop | Cadence | CoIE focus | Primary owner role |
|------|---------|------------|-------------------|
| **L1 — Interaction** | Real-time | Override typing discipline; copilot availability logged | Consultant + supervisor |
| **L2 — Operational** | Daily | SLA breach patterns; workaround detection | Ops director |
| **L3 — Tactical** | Weekly | Data quality gate; experiment status; ritual compliance | GM |
| **L4 — Strategic** | Quarterly | Capability maturity; incentive alignment; taxonomy governance | CEO + ownership |

CoIE does not replace L1 reasoning. It ensures L2–L4 **close** — that tactical learning does not die in a drawer.

## 3.3 Weekly learning artifact

**`CompanyLearningReport`** — generated without human data prep (Sunday 23:00), consumed Monday 07:00.

| Section | Content | CoIE responsibility |
|---------|---------|----------------------|
| **Exceptions only** | ≤10 items requiring human attention | Curate; never dump raw tables |
| **Data quality score** | Mandatory field completeness, join rate | Compute gate |
| **Experiment status** | Active holdouts, minimum-N progress | Registry update |
| **Decision follow-through** | Last week's approved actions: deployed? measured? | Audit trail |
| **Adoption deltas** | Copilot use, label discipline, ritual attendance | Trend |
| **Organizational memory** | What we proved, rejected, or deferred — with reasons | Append |

**Meeting rule:** Monday review is **30 minutes, exceptions only**. If the meeting discusses data assembly, CoIE has failed.

## 3.4 Learning cycle invariants

1. **No promotion without measurement** — graph or config changes that claim lift require experiment registry entry.  
2. **No inference without labels** — below CoIE data quality threshold, learning pauses.  
3. **No silent rejection** — every deferred or rejected ERE recommendation requires typed reason (feeds organizational memory).  
4. **No deployment without owner** — every approved change has a named role accountable for execution by Friday.  
5. **No blame without MkIE check** — performance drops trigger shock review before "AI failed" narrative.  
6. **No second node without maturity gate** — replication requires CoIE score ≥ threshold (see §13).

---

# 4. Experiment Registry

## 4.1 Purpose

The Experiment Registry is CoIE's **institutional memory of causal discipline**. It prevents:

- promoting correlations confounded by staffing, season, or competitor promos  
- shipping global config changes from Santa Cruz noise  
- claiming causation in board decks without holdout proof  

**KA-10 Experiment Genealogy** (see [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md)) lives here.

## 4.2 What must be registered

| Change type | Registration required | Minimum design |
|-------------|----------------------|----------------|
| Proof rank adjustment >±5% | Yes | Holdout or matched cohort |
| Objection taxonomy merge/split | Yes | 50 labeled examples + human sign-off |
| Copilot threshold change | Yes | 100 on vs 100 off comparable outcomes |
| Campaign budget recommend >15% | Yes | 2 weeks + 30 conversions (amber; ERE owns proposal) |
| Green-zone auto actions | Yes | Pre-approved bounds + kill switch owner |
| Salesperson DNA coaching protocol | Yes | Before/after on target cluster |
| New Customer DNA cluster name | Yes | CoIE review before ontology commit |

## 4.3 Experiment record (conceptual)

```yaml
experiment:
  id: string
  hypothesis: string              # "Proof X before compare raises win rate for Trust-Anxious"
  owner_role: enum                # GM | sales_director | marketing | CoIE_steward
  status: draft | active | concluded | abandoned
  design:
    type: holdout | matched_cohort | before_after | mkie_adjusted
    holdout_pct: float            # max 10% ethics cap
    minimum_n: int
    comparable_criteria: [string] # DNA cluster, channel, day-of-week, etc.
  deployment:
    approved_at: date
    config_version_before: string
    config_version_after: string
    deploy_owner: role
  measurement:
    primary_metric: assisted_GP_lift | win_rate | label_completeness | adoption_rate
    horizon_days: int
    mkie_shock_excluded: bool
    result: positive | null | negative | inconclusive
    confidence: float
  genealogy:
    parent_experiment_id: string    # if iteration
    ere_recommendation_id: string
    copilot_decision: approved | rejected | deferred
```

## 4.4 Minimum-N gates

| Change type | Minimum sample | If unmet |
|-------------|----------------|----------|
| Proof rank ±5% | 200 comparable outcomes | Hold — no ERE promotion packet |
| Proof rank ±10% | 400 comparable outcomes | Hold + CoIE escalation |
| Objection taxonomy edit | 50 labeled examples | Human-only review |
| Copilot threshold | 100 on / 100 off | Extend experiment |
| Incentive alignment pilot | 1 full commission cycle | No comp policy change |

## 4.5 Experiment lifecycle rules

1. **Draft** — hypothesis documented; CoIE steward validates design before activation.  
2. **Active** — deployment locked except kill switch; MkIE shock may pause measurement.  
3. **Concluded** — result recorded; organizational memory updated; ERE may promote or demote.  
4. **Abandoned** — reason required (sample too small, shock contamination, political kill); still remembered.  

**Ethics cap:** Holdout exposure ≤10% of comparable cohort unless ownership documents exception.

## 4.6 CoIE experiment authority

- CoIE **vetoes** experiment activation if data quality gate = fail.  
- CoIE **vetoes** promotion if minimum-N unmet or MkIE shock uncontained.  
- CoIE **does not** design customer-facing experiments — it enforces discipline on organizational and config experiments ERE proposes.

---

# 5. Change Management Framework

## 5.1 Principle

CPI-OS fails when treated as **software rollout**. It succeeds when treated as **operating model change**. CoIE is the permanent change management function — not a 90-day consultancy.

**McKinsey delivers decks. CoIE delivers habit.**

## 5.2 Change classes

| Class | Examples | CoIE approach |
|-------|----------|---------------|
| **C1 — Behavioral** | Label every loss; type every override; attend Monday ritual | Incentive alignment + ritual enforcement |
| **C2 — Process** | CRM close gates; copilot on floor; WhatsApp nurture handoff | Process debt register + owner accountability |
| **C3 — Cognitive** | Trust AI recommendations; accept holdouts; defer to data over gut | Adoption metrics + supervised wins |
| **C4 — Structural** | New location; vertical pack; commission redesign | Maturity gate + phased playbook |

## 5.3 Change playbook (per initiative)

Every organizational change tied to intelligence ships with:

```yaml
change_initiative:
  name: string
  class: C1 | C2 | C3 | C4
  sponsor: role                    # must be GM or above
  affected_roles: [role]
  success_metric: string           # observable within 30 days
  training_ritual: string          # not slide deck — floor ritual
  resistance_hypothesis: string    # "consultants fear commission impact"
  coie_tracking_metric: string     # adoption or compliance measure
  rollback_trigger: string         # when to pause
  review_date: date
```

## 5.4 Resistance patterns (Santa Cruz automotive)

| Resistance | Root cause | CoIE response |
|------------|------------|---------------|
| "CRM labeling wastes selling time" | Short-term incentive | Show time saved by PCM recall; tie micro-bonus to completeness |
| "Copilot makes me look weak" | Status anxiety | Salesperson DNA celebrates match wins; supervisor frames as leverage |
| "AI took my commission" | Attribution fear | Assisted sale flag transparency; no auto-penalty from CoIE |
| "Monday meeting is for firefighting" | Ops overload | Shrink to 30 min exceptions; escalate if skipped 2× |
| "Holdout costs me deals" | Misunderstanding | MkIE-adjusted reporting; ethics cap; GM explains purpose once quarterly |

## 5.5 Deployment readiness gate (new node or major change)

Before replicating CPI-OS to a second location or vertical:

| Gate | Threshold |
|------|-----------|
| Primary node data quality | ≥92% four-week rolling |
| Ritual compliance | ≥85% Monday reviews held |
| Experiment discipline | ≥1 concluded holdout with documented lift |
| Label completeness | ≥95% lost deals with reason code |
| Named CoIE steward | Assigned at target node |
| Sponsor commitment | GM signs change playbook |

**Config pack without CoIE gate = replication of screens, not intelligence.**

## 5.6 Process debt register

CoIE maintains a living register of recurring organizational failures:

| Field | Purpose |
|-------|---------|
| **Symptom** | What keeps breaking (SLA breach, manual CSV export, stale cuota) |
| **Frequency** | Weekly recurrence count |
| **Workaround cost** | Consultant-hours or margin leakage |
| **Root cause class** | Incentive · tooling · training · authority · data |
| **Owner** | Role accountable for redesign |
| **ERE link** | Whether tactical recommendation exists |

Process debt is **organizational technical debt**. Unresolved entries cap CoIE maturity score.

---

# 6. Learning Rituals

## 6.1 Ritual philosophy

Rituals are **scheduled organizational habits** with attendance, agenda, and outputs — not culture posters. CoIE measures ritual compliance as a leading indicator of compounding.

## 6.2 Core ritual calendar

| Ritual | Cadence | Duration | Participants | CoIE-tracked output |
|--------|---------|----------|--------------|---------------------|
| **Monday Intelligence Exception Review** | Weekly | 30 min | GM, sales director, marketing lead, CoIE steward | ≤5 decisions resolved; deferrals typed |
| **Wednesday Override Triage** | Weekly | 15 min | Floor supervisor + AI steward | Override clusters tagged; coaching assigned |
| **Friday Deployment Confirmation** | Weekly | 15 min | Change owner + GM | Approved config deployed or escalated |
| **Monthly Data Quality Standup** | Monthly | 45 min | CRM owner, finance, CoIE steward | Domain owners named; staleness tickets closed |
| **Quarterly Learning Retrospective** | Quarterly | 2 hr | CEO, ownership, GM | Maturity score; incentive review; taxonomy governance |
| **Post-Shock Attribution Review** | As needed (MkIE) | 30 min | GM + marketing | Pause/resume experiment registry |

## 6.3 Monday Intelligence Exception Review (canonical)

**Purpose:** Convert `CompanyLearningReport` exceptions into decisions — not discussion.

**Agenda (fixed):**

1. CoIE data quality gate — pass or fail (2 min)  
2. If fail: Executive Escalation only — data repair owners assigned (10 min)  
3. If pass: Executive Copilot packets — approve / reject / defer with reason (20 min)  
4. Experiment registry — any promotion blocked? (3 min)  
5. Next-week deployment owners named (5 min)  

**Forbidden:** Rebuilding charts, debating vanity metrics, blaming consultants without data.

## 6.4 Ritual compliance scoring

```yaml
ritual_compliance:
  week: string
  monday_review:
    held: bool
    attendance_rate: float        # required roles present
    decisions_resolved: int       # approve + reject + defer (typed)
    packets_ignored: int          # Copilot packets with no action
  friday_deployment:
    approved_changes_deployed: int
    approved_changes_pending: int
    pending_reason_typed: bool
  compliance_score: float         # 0-1 composite
```

**Threshold:** Rolling 4-week compliance ≥85%. Below threshold → CoIE blocks non-escalation ERE packets until compliance recovers.

## 6.5 Ritual failure escalation

| Consecutive failures | Escalation |
|---------------------|------------|
| 1 skipped Monday | CoIE steward notifies GM; report in CEO queue |
| 2 skipped Mondays | CEO exception review mandatory |
| 3 skipped Mondays | CoIE declares **learning pause** — all graph promotions frozen |
| Friday deployment miss without typed reason | Same as 1 skipped Monday |

## 6.6 Floor rituals (L1 adoption)

| Ritual | Behavior | CoIE measures |
|--------|----------|---------------|
| **Copilot open on greet** | Consultant views card before first speak | `copilot_used` at session start |
| **Typed override** | Rejection uses enum, not silence | Override taxonomy completeness |
| **Loss autopsy** | Lost deal gets reason code before end of day | Time-to-label |
| **Spouse loop close** | Permission-mode outcomes tagged | `spouse_blocked` resolution rate |

Supervisors coach — CoIE does not punish individuals. **>20% override rate** triggers coaching protocol, not discipline.

---

# 7. Data Quality Governance

## 7.1 Principle

**Outcome truth > data volume.** A 10,000-session month with 60% label completeness is worse for compounding than 2,000 sessions at 98%.

CoIE owns **label quality** and **join integrity** — the constitutional foundation of the Decision Graph.

## 7.2 Data quality domains

| Domain | Owner role | CoIE measures |
|--------|------------|---------------|
| **Outcome labels** | Sales director + CRM admin | `lost_reason` completeness, time-to-close outliers |
| **Session → CRM join** | Ops + CRM admin | `sessionId` present on ≥95% closed deals |
| **Mandatory capture** | Marketing + floor | Identity, consent, product SKU at lead creation |
| **Assisted sale attribution** | Finance + GM | `assisted_sale`, `assistance_types[]`, `gross_margin` |
| **Governance fields** | AI steward | `reasoningSnapshotId`, typed overrides |
| **Knowledge truth** | Named domain owners per Library section | Staleness index, validation cadence |
| **Ops events** | OIE owner | SLA timestamps, inventory state at recommendation |

## 7.3 Data quality score (weekly)

```yaml
data_quality_score:
  components:
    outcome_label_completeness: float    # weight 0.30
    session_outcome_join_rate: float     # weight 0.25
    mandatory_capture_rate: float        # weight 0.15
    assisted_attribution_completeness: float  # weight 0.15
    governance_field_completeness: float   # weight 0.10
    knowledge_staleness_inverse: float     # weight 0.05
  composite: float                       # 0-1
  gate: pass | fail                      # pass if composite ≥ 0.92
  anomalies:
    - consultant_id
    - reason_code
    - severity
```

## 7.4 Gate effects

| Gate | ERE behavior | Executive Copilot behavior |
|------|--------------|----------------------------|
| **Pass (≥0.92)** | Full recommendation set eligible | Normal ≤5 packet flow |
| **Marginal (0.85–0.91)** | Graph promotions suppressed; adoption + data fixes only | Executive Escalation prioritized |
| **Fail (<0.85)** | Executive Escalation + data repair categories only | CEO-visible alert |

## 7.5 Gaming detection

CoIE monitors label integrity — not to punish, but to protect the training signal:

| Anomaly | Detection heuristic | Response |
|---------|---------------------|----------|
| **Loss avoidance** | Consultant with 95% win rate vs cohort 40% | Label audit sample |
| **Reason code clustering** | >80% losses tagged "price" | Coaching + taxonomy review |
| **Time-to-close outliers** | Deals closed in <1 hr or >180 days without flag | CRM review |
| **Assisted sale under-reporting** | Copilot sessions not reflected in close | Attribution workshop |
| **Override without engagement** | `copilot_available=false` spike | Ops fix availability |

**Dealership owner lens:** Gaming detection protects honest consultants. Unlabeled losses corrupt everyone's copilot.

## 7.6 Knowledge domain accountability

Every Knowledge Library domain has a **named human owner** (not "marketing team"):

| Domain example | Owner | Staleness SLA |
|----------------|-------|---------------|
| Financing bands | Finance manager | 7 days |
| Compare claims | Sales director | 14 days |
| Promotions | Marketing lead | 3 days |
| Inventory snapshot | Ops | Real-time |

Staleness appears in CEO weekly exceptions. CoIE opens accountability ticket — not auto-fix.

## 7.7 Data quality improvement loop

```
Measure weekly  →  Identify domain deficit  →  Assign owner  →  Close within SLA  →  Re-score Friday  →  Gate re-evaluated
```

If gate fails 3 consecutive weeks → Quarterly Learning Retrospective must address root cause (incentive, tooling, or authority).

---

# 8. Executive Accountability

## 8.1 Principle

Intelligence without executive accountability is **expensive journalism**. CoIE makes learning **owned** — with named roles, visible exceptions, and board-auditable follow-through.

## 8.2 Accountability matrix

| Decision / obligation | Accountable role | CoIE tracks |
|----------------------|------------------|-------------|
| Monday exception review | GM | Ritual compliance |
| Data quality gate recovery | Sales director + CRM admin | Week-over-week delta |
| Experiment promotion approval | GM + CoIE steward sign-off | Registry status |
| Knowledge domain truth | Named domain owners | Staleness tickets |
| Copilot floor availability | Ops director | `copilot_available` rate |
| Commission / incentive alignment | CEO (quarterly) | Incentive alignment index |
| Learning pause declaration | CoIE steward → CEO | Incident log |
| Second node maturity gate | CEO sponsor | Deployment readiness |
| Board learning narrative | CEO | Compounding metrics §9 |

## 8.3 Executive Escalation packet

When CoIE gate fails or ritual compliance breaches threshold, CoIE surfaces **Executive Escalation** to Copilot — always ≤3 items:

```yaml
executive_escalation:
  id: string
  severity: critical | high
  category: data_quality | ritual_failure | experiment_contamination | adoption_collapse
  blocker: string                   # what learning is frozen
  accountable_role: role
  required_action: string           # observable by Friday
  metric_to_clear: string
  consequence_if_unresolved: string # e.g. "graph promotions remain frozen"
```

## 8.4 Decision follow-through audit

For every Copilot decision last week:

| Status | Definition | CoIE action |
|--------|------------|-------------|
| **Deployed** | Change live; owner confirms | Await measurement horizon |
| **In progress** | Owner named; partial execution | Track; Friday check |
| **Deferred** | Typed reason; review date set | Organizational memory |
| **Rejected** | Typed reason | Feed ERE negative evidence |
| **Ignored** | No action recorded | Ritual compliance hit; CEO queue |

**Target:** ≥90% of approved decisions reach Deployed or In progress within 7 days.

## 8.5 CEO exception queue

Weekly — independent of Monday meeting:

| Item | Trigger |
|------|---------|
| Data quality gate fail | Automatic |
| Learning pause declared | Automatic |
| Ritual compliance <85% rolling | Automatic |
| Experiment promoted without holdout | CoIE steward flag |
| Second node gate bypass attempted | Automatic block + alert |

CEO role is not micromanagement — it is **ensuring the organization remains capable of learning**.

## 8.6 Board accountability (quarterly)

CoIE prepares **Organizational Learning Annex** for board pack:

- Compounding rate (§9)  
- Experiment genealogy summary (concluded, promoted, abandoned)  
- Ritual compliance trend  
- Data quality trend  
- Adoption metrics by role  
- Maturity score (§13)  
- Top 3 process debt items unresolved  

**Investor lens:** Board should see learning in the same deck as margin — not in an appendix no one reads.

---

# 9. Intelligence Adoption Metrics

## 9.1 Principle

Adoption is not login count. Adoption is **intelligence changing behavior that changes outcomes**.

## 9.2 Metric tiers

### Tier A — Leading (weekly)

| Metric | Definition | Target |
|--------|------------|--------|
| **Copilot session-start rate** | % sessions where consultant opened copilot before first speak | ≥75% |
| **Typed override rate** | % overrides with enum reason | ≥90% |
| **Label same-day rate** | % lost deals with reason code within 24 hr | ≥85% |
| **Monday ritual resolution rate** | % Copilot packets with approve/reject/defer | ≥95% |
| **ERE response rate** | % recommendations acted (not ignored) within 7 days | ≥90% |

### Tier B — Lagging (monthly)

| Metric | Definition | Target |
|--------|------------|--------|
| **Assisted sale lift** | Win rate copilot-on vs matched copilot-off | Positive + significant |
| **Time-to-close delta** | Assisted vs unassisted comparable cohorts | Neutral or improved |
| **Proof sequence adherence** | Floor follows SIE top proof when copilot used | ≥70% |
| **Coaching protocol completion** | Salesperson DNA flagged gaps addressed | ≥80% |
| **Knowledge staleness incidents** | Domains past SLA | ≤2/month |

### Tier C — Strategic (quarterly)

| Metric | Definition | Target |
|--------|------------|--------|
| **Incentive alignment index** | Comp structure rewards labels + adoption | ≥0.75 composite |
| **Organizational learning velocity** | Proven lifts / quarter | ≥2 holdout-validated |
| **Consultant retention of DNA** | Skill signatures persist after turnover | Institutional, not personal |
| **Executive decision half-life** | Days from approve to measured outcome | ≤21 median |

## 9.3 Incentive alignment index

```yaml
incentive_alignment_index:
  components:
    labels_rewarded: float          # comp or recognition tied to completeness
    copilot_neutral_or_positive: float  # no penalty for assisted sales
    override_safe: float            # no punishment for typed disagreement
    learning_ritual_protected: float    # Monday time blocked on calendar
  composite: float                  # 0-1
```

Below 0.60 → CoIE mandates quarterly comp review agenda item. CoIE recommends; CEO decides.

## 9.4 Adoption failure signals

| Signal | Likely cause | CoIE response |
|--------|--------------|---------------|
| Copilot rate drops >15% WoW | Tool friction or cultural backlash | Ops + supervisor diagnostic |
| Override rate drops while win rate drops | Silent disagreement | Reinforce typing ritual |
| High copilot rate, no assisted lift | Card ignored cosmetically | Redesign floor ritual |
| Label completeness up, margin flat | Wrong labels (gaming) | Anomaly audit |

## 9.5 Adoption compounding

Adoption metrics feed **organizational memory** (§10) and **ERE feasibility score** — low adoption reduces `operational_feasibility` on proposals requiring floor behavior change.

---

# 10. Organizational Memory

## 10.1 Principle

Organizations forget faster than graphs grow. CoIE is the **institutional hippocampus** — what we tried, what worked, what failed, and why we rejected alternatives.

Without organizational memory, every GM rotation resets learning to zero.

## 10.2 Memory classes

| Class | Contents | Retention |
|-------|----------|-----------|
| **M1 — Decision memory** | Approve/reject/defer with typed reasons | Permanent |
| **M2 — Experiment memory** | Registry genealogy (§4) | Permanent |
| **M3 — Failure memory** | Abandoned experiments, negative holdouts | Permanent |
| **M4 — Process memory** | Process debt resolutions | 24 months |
| **M5 — Cultural memory** | Resistance patterns overcome | Permanent narrative |
| **M6 — Shock memory** | MkIE events + how org responded | Permanent |

## 10.3 Memory record (conceptual)

```yaml
organizational_memory_entry:
  id: string
  class: M1 | M2 | M3 | M4 | M5 | M6
  date: date
  summary: string                   # one sentence — searchable
  context:
    ere_recommendation_id: string
    experiment_id: string
    mkie_shock_id: string
  decision: approved | rejected | deferred | abandoned
  reason_code: enum                 # typed human reason
  expected_outcome: string
  actual_outcome: string            # filled at measurement horizon
  lesson: string                    # required on conclude
  applicable_to: [node_id]          # Santa Cruz | Bolivia L1 | all
```

## 10.4 Memory access rules

| Audience | Access |
|----------|--------|
| **GM** | Full M1–M6 for their node |
| **New GM onboarding** | M5 + top 20 M1 lessons — required reading week 1 |
| **ERE** | M2 + M3 for evidence gating (do not re-propose failed hypotheses) |
| **Executive Copilot** | Relevant memory snippets attached to packets |
| **Board** | Quarterly synthesis — not raw log |
| **Second node deploy** | M4 + M5 + applicable M1 |

## 10.5 Anti-patterns CoIE prevents

| Anti-pattern | Memory defense |
|--------------|----------------|
| "We tried that years ago" (no record) | M1 searchable log |
| Re-promoting failed proof | M3 negative holdout block |
| Repeating consultant resistance | M5 playbook |
| Blaming AI for Toyota promo | M6 shock + response |
| New GM undoes working config | M1 approval genealogy |

## 10.6 Memory hygiene

- Every concluded experiment **requires** `lesson` field — empty blocked.  
- Rejected recommendations **require** `reason_code` — feeds M1.  
- Annual prune: M4 entries >24 months archived, not deleted.  
- CoIE steward reviews memory completeness monthly.

---

# 11. Recommendation Review Process

## 11.1 Scope

This section defines how **organizational learning** interfaces with ERE and Executive Copilot — CoIE's role in the review pipeline, not ERE's ranking logic (see [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md)).

## 11.2 Review pipeline

```
CompanyLearningReport generated
        │
        ▼
CoIE data quality gate ──fail──► Executive Escalation only
        │ pass
        ▼
ERE emits ranked recommendations
        │
        ▼
CoIE pre-review filter
  · experiment registered?
  · minimum-N met?
  · adoption feasibility?
  · ritual compliance OK?
  · memory: previously rejected?
        │
        ▼
Eligible recommendations → Executive Copilot (≤5)
        │
        ▼
Monday Intelligence Exception Review
        │
        ├── Approve → deployment owner named → Friday confirm
        ├── Reject → reason_code → organizational memory M1
        ├── Defer → review_date + reason → memory M1
        └── Veto green auto → CoIE incident + criteria tighten
        │
        ▼
CoIE follow-through audit (§8.4)
        │
        ▼
Measurement horizon → experiment conclude → memory M2/M3
```

## 11.3 CoIE pre-review filter rules

| Check | Block if |
|-------|----------|
| **G-01 Data gate** | Composite <0.92 |
| **G-02 Experiment** | Promotion claim without active/concluded experiment |
| **G-03 Minimum-N** | Sample below threshold (§4.4) |
| **G-04 MkIE** | Active shock uncontained on affected metric |
| **G-05 Memory** | Same hypothesis rejected <90 days without new evidence |
| **G-06 Adoption** | `operational_feasibility` <0.50 on behavioral change |
| **G-07 Ritual** | Compliance <85% rolling |
| **G-08 Zone audit** | Red-zone action misclassified as amber |

Blocked recommendations return to ERE with `coie_block_reason` — not silently dropped.

## 11.4 Review quality standards

**Approve** requires:

- Named deployment owner  
- Measurement metric and horizon  
- MkIE shock check documented  
- Experiment registry updated if config change  

**Reject** requires:

- `reason_code` from enum: insufficient_evidence | wrong_timing | brand_risk | margin_risk | political | prefer_human | other_typed  
- Optional: `revisit_when` condition  

**Defer** requires:

- `review_date` within 30 days  
- `defer_reason` typed  

Untyped rejections **do not enter organizational memory** and trigger ritual compliance penalty.

## 11.5 Green-zone oversight

Green-zone auto-executions still pass CoIE:

- Pre-approved bounds documented  
- Kill switch owner named  
- Weekly sample audit (5% sessions for customer-facing green actions)  
- CoIE may **veto green auto** if override spike or grounding fail budget exceeded  

## 11.6 Cross-functional sign-off matrix

| Recommendation type | GM | Sales director | Marketing | Finance | CoIE steward |
|-------------------|:--:|:--------------:|:---------:|:-------:|:------------:|
| Proof / objection | ✓ | ✓ | — | — | ✓ |
| Campaign budget | ✓ | — | ✓ | ✓ | ✓ |
| Staffing | ✓ | ✓ | — | — | ✓ |
| Commission / incentive | ✓ | — | — | ✓ | ✓ |
| Taxonomy change | ✓ | ✓ | ✓ | — | ✓ |
| Data repair escalation | ✓ | ✓ | — | — | ✓ |
| Second node deploy | CEO | ✓ | ✓ | ✓ | ✓ |

CoIE steward sign-off = process compliance, not business judgment.

---

# 12. Failure Modes

## 12.1 Organizational failure modes

| ID | Failure mode | Symptom | CoIE detection | Recovery |
|----|--------------|---------|----------------|----------|
| **F-01** | **Deckware** | Beautiful reports; no behavior change | Adoption metrics flat; ritual ignored | Learning pause; CEO queue |
| **F-02** | **Label rot** | CRM filled; reasons meaningless | Anomaly clustering; holdout incoherent | Label audit; coaching |
| **F-03** | **Meeting theater** | Monday happens; no decisions | `packets_ignored` >0 | Shrink agenda; escalate |
| **F-04** | **Promotion superstition** | Config changes without holdout | Registry gap | Block ERE; experiment required |
| **F-05** | **Blame spiral** | "AI failed" during Toyota promo | MkIE shock ignored | Post-shock review ritual |
| **F-06** | **Consultant bypass** | Copilot cosmetic; gut selling | High copilot rate, zero lift | Floor ritual redesign |
| **F-07** | **Executive churn** | New GM reverses working config | Memory bypass | Onboarding M5 required |
| **F-08** | **Incentive sabotage** | Comp punishes assisted sales | Alignment index <0.60 | Quarterly comp review |
| **F-09** | **Replication fantasy** | Node 2 launches without maturity | Gate bypass attempt | Block deploy |
| **F-10** | **Memory amnesia** | Same failed experiment re-proposed | M3 not consulted | ERE block G-05 |
| **F-11** | **Governance silence** | Untyped overrides | Override completeness <90% | Wednesday triage enforcement |
| **F-12** | **Knowledge drift** | Stale cuota quoted | Staleness index; grounding fails | Domain owner escalation |
| **F-13** | **CoIE checkbox** | Steward signs without audit | Gate pass but margin incoherent | External quarterly audit |
| **F-14** | **Learning overload** | 20 recommendations/week | Decision half-life >30 days | ERE materiality cap |

## 12.2 Failure cascade

```
Label rot (F-02)
  → Bad graph inference
    → Wrong ERE recommendation
      → Rejected by floor reality
        → Executive distrust
          → Ritual skipped (F-03)
            → Learning pause
              → Moat stops compounding
```

**CoIE breaks cascade at earliest detectable stage** — usually F-02 or F-03.

## 12.3 CoIE self-failure modes

| Self-failure | Prevention |
|--------------|------------|
| CoIE becomes bureaucratic obstacle | Gate affects promotions only; never blocks customer-facing rescue |
| CoIE steward captured by GM | Dotted line to CEO for learning pause authority |
| Metrics gamed for gate pass | Anomaly detection + quarterly external sample |
| Memory becomes landfill | Required `lesson`; annual synthesis |

## 12.4 Incident response: Learning Pause

**Declared when:** Gate fail 3 weeks OR ritual compliance <70% OR proven label gaming.

**Effects:**

- All graph-driven promotions frozen  
- Executive Escalation + data repair only  
- CEO owns resolution plan within 14 days  
- Public narrative: "protecting decision graph integrity" — not "AI broken"  

**Lifted when:** Gate pass 2 consecutive weeks + ritual compliance restored.

---

# 13. Level 11 Maturity

## 13.1 CoIE maturity model

CoIE maturity measures **organizational learning capability** — independent of graph size or AI sophistication.

| Level | Name | Organizational capability |
|-------|------|---------------------------|
| **L0** | Absent | No label discipline; no rituals; intelligence = demo |
| **L1** | Aware | Mandatory fields defined; Monday meeting exists |
| **L2** | Measured | Data quality score computed weekly |
| **L3** | Gated | Failed gate blocks promotions |
| **L4** | Experimental | Registry active; ≥1 holdout concluded |
| **L5** | Ritualized | Compliance ≥85%; follow-through ≥90% |
| **L6** | Adopted | Copilot lift documented; alignment index ≥0.60 |
| **L7** | Remembering | Organizational memory complete; onboarding uses M5 |
| **L8** | Replicable | Second node passed deployment gate |
| **L9** | Accountable | Board annex quarterly; CEO exception queue clean |
| **L10** | Compounding | ≥2 holdout lifts/quarter; decision half-life ≤21 days |
| **L11** | Institutional | Learning survives leadership change; moat rate published |

## 13.2 Level 11 CoIE definition (formal)

> **CoIE Level 11** is achieved when the organization demonstrates **≥4 consecutive quarters** of:

1. Data quality gate pass rate ≥92% of weeks  
2. Ritual compliance ≥90% rolling  
3. ≥2 holdout-validated organizational lifts per quarter attributed in board annex  
4. Incentive alignment index ≥0.75  
5. Organizational memory onboarding mandatory for all GMs  
6. Second node operating at ≥L7 CoIE maturity  
7. Learning pause not declared in trailing 12 months  
8. Experiment genealogy (KA-10) auditor-ready  
9. Adoption metrics show copilot lift without margin erosion  
10. CEO can name **which organizational changes** caused trailing margin improvement — with memory citations  

## 13.3 Maturity gates (deployment)

| Deploy target | Minimum CoIE maturity |
|---------------|----------------------|
| Config change (tactical) | L3 |
| Proof promotion (graph) | L4 |
| Second dealership node | L8 primary + L5 target |
| Vertical pack #2 | L9 |
| LATAM license narrative | L11 |

## 13.4 Maturity anti-indicators

- High graph edge count + low label completeness = **L2 at best** (dangerous illusion)  
- High ritual attendance + zero holdouts = **L3 theater**  
- Single GM heroics + no memory = **L6 ceiling** — leaves with GM  

---

# 14. Relationship to Moat

## 14.1 Principle

The moat is **labeled outcome data in a proprietary ontology** — not the kiosk, not the LLM. CoIE is what keeps that moat **widening** instead of eroding through organizational neglect.

From [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md):

```
Moat_strength(t) =
    α · |Decision Graph edges with outcome labels|
  + β · |DNA profiles × matched outcomes|
  + γ · |Holdout-validated proof lifts|
  + δ · |Multi-node anonymized benchmarks|
  − ε · taxonomy_drift_unresolved
```

**CoIE directly protects α, β, γ** — and enables δ by making replication disciplined.

## 14.2 CoIE as moat infrastructure

| Moat asset | Without CoIE | With CoIE |
|------------|--------------|-----------|
| **KA-01 SCDG** | Edges grow; labels rot | Gate blocks bad inference |
| **KA-06 Proof Efficacy** | Correlation promoted as causation | Experiment registry enforces holdouts |
| **KA-08 Override Corpus** | Untyped noise | Wednesday triage; typed signal |
| **KA-10 Experiment Genealogy** | Config changes untracked | Permanent memory |
| **KA-04 Salesperson DNA** | Leaves with consultant | Institutional coaching memory |
| **Multi-node benchmarks** | Garbage in from node 2 | Maturity gate before federation |

## 14.3 Moat-killing mistakes CoIE prevents

| Mistake (from Moat Analysis) | CoIE defense |
|------------------------------|--------------|
| Skip outcome labels | Data quality gate; CRM accountability |
| Hire McKinsey deck, skip CoIE | Permanent ritual + memory vs one-time consulting |
| Optimize test drives, not margin | Assisted attribution completeness in gate score |
| Replicate screens without ops ritual | Deployment readiness gate (§5.5) |
| Claim causation without holdout | Experiment registry block |

## 14.4 CoIE and competitive narrative

**McKinsey critic:** "70% of transformations fail on behavior."  
**CoIE response:** Behavior is measured weekly — ritual compliance, adoption metrics, incentive alignment. Failure is detected in weeks, not years.

**Palantir critic:** "No ontology governance."  
**CoIE response:** Taxonomy changes require experiment + cross-functional sign-off + memory entry.

**a16z critic:** "TAM = one dealer."  
**CoIE response:** L8 maturity + second node proves replication is organizational, not heroic.

## 14.5 Compounding rate (published metric)

CoIE owns the **organizational compounding rate** — board-visible:

```yaml
organizational_compounding_rate:
  quarter: string
  holdout_validated_lifts: int
  graph_edge_quality_score: float    # labeled / total new edges
  memory_lessons_applied: int        # M1 entries that changed behavior
  replication_success: bool          # second node at target maturity
  net_moat_contribution: enum        # widening | stable | eroding
```

**Widening** requires: positive lifts + gate pass rate ≥92% + no learning pause.  
**Eroding** triggers: CEO board narrative correction — not engineering sprint.

## 14.6 The investor sentence (CoIE-enabled)

> *"Viaggio's moat is not AI — it is three years of outcome-labeled decision paths in Bolivian high-trust purchase culture. CoIE ensures that moat compounds every week through ritual discipline, experiment proof, and organizational memory — the operating system McKinsey cannot ship in a deck."*

---

# Appendix A — CoIE Steward Role

| Responsibility | Authority |
|----------------|-----------|
| Compute data quality gate weekly | Block ERE promotions |
| Maintain experiment registry | Veto underpowered experiments |
| Score ritual compliance | Escalate to CEO |
| Curate organizational memory | Require lesson fields |
| Onboard new GMs on M5 | Pause learning if refused |
| Prepare board annex quarterly | Direct CEO reporting line |

**Not:** Sales decisions, commission setting, customer-facing AI tuning.

---

# Appendix B — Document Map

| Document | Relationship to CoIE |
|----------|---------------------|
| [SELF_IMPROVING_COMPANY_BLUEPRINT.md](./SELF_IMPROVING_COMPANY_BLUEPRINT.md) | CoIE origin; blockers B4, B6 |
| [LEVEL11_INTELLIGENCE_ARCHITECTURE.md](./LEVEL11_INTELLIGENCE_ARCHITECTURE.md) | Stack position; maturity context |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | CoIE gates ERE; review pipeline |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Ritual interface; packet presentation |
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | KA-10; moat formula |
| [CUSTOMER_DNA_ENGINE.md](./CUSTOMER_DNA_ENGINE.md) | Cluster naming review |
| [SALESPERSON_DNA_ENGINE.md](./SALESPERSON_DNA_ENGINE.md) | Coaching intelligence input |

---

# Appendix C — Glossary (CoIE terms)

| Term | Definition |
|------|------------|
| **Data quality gate** | Weekly pass/fail blocking graph promotions |
| **Experiment genealogy** | Version history of changes with measured lift |
| **Executive Escalation** | CoIE packet when learning is blocked |
| **Learning pause** | Organization-wide freeze on graph promotions |
| **Organizational memory** | Institutional record of decisions and experiments |
| **Ritual compliance** | Rolling measure of scheduled learning habits |
| **CompanyLearningReport** | Weekly exceptions-only organizational learning artifact |

---

*End of Company Intelligence Engine (CoIE) Intelligence Specification v1.0*
