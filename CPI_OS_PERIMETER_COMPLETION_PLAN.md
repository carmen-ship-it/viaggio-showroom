# CPI-OS Perimeter Completion Plan

**Version:** 1.0  
**Date:** 15 June 2026  
**Role:** CPI-OS Closure Board  
**Objective:** Close all remaining P0 and P1 findings from the Architecture Closure Board audit **without introducing new engines or redesigning architecture**  
**Builds on:** [CPI_OS_CONSTITUTIONAL_HARMONIZATION.md](./CPI_OS_CONSTITUTIONAL_HARMONIZATION.md) · [INTELLIGENCE_ASSET_REGISTRY.md](./INTELLIGENCE_ASSET_REGISTRY.md) · Architecture Closure Board audit (15 June 2026)  
**Constraint:** Perimeter patches, appendices, errata, and binding memos only — no new engines  

---

## Executive Summary

CPI-OS is **76% architecturally closed**. The remaining gaps sit on the **perimeter** — constitutional enrollment of FIE, substrate asset registration, MkIE/CPO bridges, and legacy namespace drift.

This plan defines the **smallest remediations** to reach **Engineering Greenlight (Phase A)** in one documentation sprint, **Pilot Readiness (Phase B)** during node-zero operation, and **FM-2 / Institutional Grade (Phases C–D)** on the existing federation and attestation rails.

**No new engines.** All remediations extend existing specifications via PATCH, appendix, or registry line item.

---

# Part 1 — P0 Remediation (Engineering Blockers)

Five P0 issues block unconstrained engineering. Each must close before Sprint 1.

---

## P0-01 — FIE Not Enrolled in Constitutional Harmonization

### Root cause

FIE v1.0 was authored after Constitutional Harmonization v1.0. FIE defines its own admission gates (`FIE-*`), joint clearance rule (`CoIE pass AND FIE verified`), and ERE blocking behavior — but the constitutional gate registry has no `CPI-G-FIE-*` domain and no FIE slot in gate evaluation order §1.3.

Engineering will implement two incompatible gate namespaces.

### Affected specifications

| Spec | Conflict |
|------|----------|
| [FINANCIAL_INTELLIGENCE_ENGINE.md](./FINANCIAL_INTELLIGENCE_ENGINE.md) | §3.2 admission gates; §17.3 joint constitutional gate |
| [CPI_OS_CONSTITUTIONAL_HARMONIZATION.md](./CPI_OS_CONSTITUTIONAL_HARMONIZATION.md) | Part 1 gate registry; §1.3 evaluation order; §1.4 ownership |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | §13.2 ERE gates requiring FIE |
| [INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md](./INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md) | CPI-G-IBS-02 reconciliation |

### Smallest remediation

**PATCH Constitutional Harmonization → v1.1** (Part 1 addition only):

Add **FIE — Financial Truth Gates**:

| Gate ID | Owner | Purpose | Pass criterion | Consumers |
|---------|-------|---------|----------------|-----------|
| **CPI-G-FIE-01** | FIE steward | Margin truth clearance | `fieTruthStatus = verified` | ERE financial categories |
| **CPI-G-FIE-02** | FIE + Finance steward | CRM reconciliation | Assisted margin vs CRM GP variance ≤ **3%** (aligns CPI-G-IBS-02) | I-ROI, investor pack |
| **CPI-G-FIE-03** | FIE steward | Session–close join | Close-to-session join ≥ **95%** (harmonize with CPI-G-COIE-10) | Attribution, KA-07 |
| **CPI-G-FIE-04** | FIE steward | GP field completeness | ≥ **95%** closes with validated `grossProfitTruth` | Margin maps |
| **CPI-G-FIE-05** | FIE steward | Active S2+ FX modeled | MkIE FX shock → pass-through applied or `shock_deferred` | Budget signals |

Insert in evaluation order **after step 1 (CPI-G-COIE-01), before step 5 (ERE gates)**:

```
1.5 CPI-G-FIE-01 … CPI-G-FIE-05 — if any fail, ERE financial recommendations suppressed (Escalation only)
```

Add to §1.4 ownership: **FIE** → FIE steward; escalation → GM → Finance steward dispute → CEO.

**PATCH FIE §3.2:** Replace standalone thresholds with reference: *"Admission gates enumerated as CPI-G-FIE-03 through CPI-G-FIE-05; CPI-G-FIE-01 is composite clearance."*

**Deprecate:** `FIE-*` gate IDs as operational aliases mapping to `CPI-G-FIE-*` in FIE Appendix A.

### Implementation complexity

| Dimension | Rating |
|-----------|--------|
| Documentation | **Low** — ~2 pages, no engine redesign |
| Engineering | **Low** — single gate evaluator namespace |
| Organizational | **Low** — names existing FIE steward role |

### Acceptance criteria

- [ ] Constitutional Harmonization v1.1 published with 5 FIE gates
- [ ] Gate evaluation order includes step 1.5
- [ ] FIE §17.3 references `CPI-G-FIE-01` not ad hoc rule
- [ ] CPI-G-FIE-03 threshold = CPI-G-COIE-10 = **95%** (single number)
- [ ] Engineering binding memo cites CPI-G-FIE as authoritative

---

## P0-02 — Knowledge Library Unregistered

### Root cause

Knowledge Library is defined in FUTURE_STATE §3.3 and consumed by SIE/CSI grounding guardrails (G1, G7). CoIE monitors staleness but Knowledge Library was never enrolled in the Asset Registry or constitutional perimeter. Grounding failures poison SCDG learning without a capital depreciation signal.

### Affected specifications

| Spec | Gap |
|------|-----|
| [FUTURE_STATE_ARCHITECTURE.md](./FUTURE_STATE_ARCHITECTURE.md) | §3.3 domain owners |
| [COMPANY_INTELLIGENCE_ENGINE.md](./COMPANY_INTELLIGENCE_ENGINE.md) | Staleness gate; domain owner table |
| [INTELLIGENCE_ASSET_REGISTRY.md](./INTELLIGENCE_ASSET_REGISTRY.md) | No substrate inventory |
| [PHASE_X_CONVERSATIONAL_SALES_BRAIN.md](./PHASE_X_CONVERSATIONAL_SALES_BRAIN.md) | Grounded truth dependency |
| [MOAT_ANALYSIS.md](./MOAT_ANALYSIS.md) | BL-14 media/content debt |

### Smallest remediation

**Do not create KA-14 engine.** Register as **substrate asset SS-01** in Asset Registry Appendix D (Substrate Inventory — not IEV-weighted):

| Field | Definition |
|-------|------------|
| **ID** | **SS-01 Knowledge Library** |
| **Owner** | Domain owners per FUTURE_STATE §3.3; **accountable rollup: CoIE Steward** |
| **Creation** | Versioned domain publish with `knowledgeRef` + `validatedAt` |
| **Measurement** | `knowledge_staleness_index` (CoIE Tier A automatic learning) |
| **Depreciation** | Staleness > threshold → Freshness penalty on KA-01 Quality via grounding_fail cluster |
| **Governance** | **CPI-G-KL-01** (new substrate gate, not engine): no SIE spec/price/legal claim without valid `knowledgeRef` |

Add **CPI-G-KL-01** to Constitutional Harmonization v1.1:

| Gate ID | Owner | Pass criterion |
|---------|-------|----------------|
| **CPI-G-KL-01** | CoIE steward | Zero `governance.grounding_fail` on price/spec domains in trailing 7 days OR quarantine active |

Add **Trust Fabric Perimeter Appendix** (1-page annex to Constitutional Harmonization, not new doc tree): consolidates G1–G10 from FUTURE_STATE §4.1 as constitutional invariants **INV-29 through INV-38** — cross-reference only.

### Implementation complexity

| Dimension | Rating |
|-----------|--------|
| Documentation | **Low** — registry appendix + 1 gate + invariant cross-refs |
| Engineering | **Medium** — `knowledgeRef` enforcement in SIE path |
| Organizational | **Low** — owners already named in CoIE |

### Acceptance criteria

- [ ] SS-01 registered in Asset Registry with owner, staleness metric, depreciation link to KA-01
- [ ] CPI-G-KL-01 in constitutional gate registry
- [ ] Grounding fail → CoIE accountability ticket defined (existing Tier A artifact)
- [ ] No new engine document created

---

## P0-03 — Endogenous Event Calendar Undefined

### Root cause

MkIE §1.3 explicitly excludes endogenous signals (proof rank, consultant performance, campaign edits, CRM quality) from MkIE ownership. MkIE §4.4 and failure mode F-04 require an **Endogenous Event Calendar** to prevent the "excuse engine" — but no schema, owner, or consumer contract exists. MkIE cannot reliably separate controllable variance from exogenous shocks.

### Affected specifications

| Spec | Gap |
|------|-----|
| [MARKET_INTELLIGENCE_ENGINE.md](./MARKET_INTELLIGENCE_ENGINE.md) | §1.3, §4.4, F-04, weekly ritual |
| [COMPANY_INTELLIGENCE_ENGINE.md](./COMPANY_INTELLIGENCE_ENGINE.md) | Endogenous vs exogenous boundary |
| [CPI_OS_CONSTITUTIONAL_HARMONIZATION.md](./CPI_OS_CONSTITUTIONAL_HARMONIZATION.md) | RC-06 |

### Smallest remediation

**PATCH MkIE — Appendix A: Endogenous Event Calendar** (not new engine):

```yaml
endogenousEvent:
  eventId: uuid
  class: enum                    # see table below
  sourceEngine: CoIE | MIE | OIE | SalespersonDNA | ExperimentGenealogy
  scheduledAt: datetime          # known-in-advance
  detectedAt: datetime?          # emergent
  affectedMetrics: [metric_id]
  annotationOnly: bool           # default true — does NOT trigger CPI-G-MKIE-01
  coieAttestation: bool          # CoIE steward confirms not misclassified as exogenous
  expiresAt: datetime
```

| Class | Examples | Owner |
|-------|----------|-------|
| `ORG_EXPERIMENT` | Holdout traffic start/end | CoIE steward |
| `CAMPAIGN_LAUNCH` | New Meta creative live | Marketing lead |
| `INCENTIVE_CHANGE` | Commission cycle start | Sales director |
| `CONFIG_DEPLOY` | Proof rank promotion Friday | CoIE steward |
| `STAFFING_CHANGE` | Saturday half-staff | OIE / GM |
| `KNOWLEDGE_PUBLISH` | Price band update | Knowledge domain owner |

**Consumer contract:** MkIE shock classification pipeline **must check calendar** before creating KA-09 entry. Match → annotate only; do not assign S2+ severity.

**Ritual:** CoIE + shock steward weekly calendar upkeep (MkIE existing line 784).

### Implementation complexity

| Dimension | Rating |
|-----------|--------|
| Documentation | **Low** — 1 appendix, ~30 lines schema |
| Engineering | **Low** — calendar table + classification pre-check |
| Organizational | **Low** — extends existing weekly MkIE/CoIE ritual |

### Acceptance criteria

- [ ] MkIE Appendix A published with schema and class enum
- [ ] Classification pipeline step: `calendar_check` before `shock_registry_write`
- [ ] F-04 mitigation explicitly references calendar
- [ ] Genesis calendar may be empty — schema is the closure artifact

---

## P0-04 — CPO ↔ MkIE Shock Type Mapping Missing

### Root cause

CPO defines 6 `market_shock.*` ontology nodes. MkIE defines 10 `shockClass` types with subtypes. Federation, FIE FX pass-through, and SCDG freeze flags route through MkIE classes — but graph edges and CPO labels cite CPO nodes. No bidirectional mapping exists; cross-node shock inheritance breaks at the vocabulary boundary.

### Affected specifications

| Spec | Gap |
|------|-----|
| [CONSIDERED_PURCHASE_ONTOLOGY.md](./CONSIDERED_PURCHASE_ONTOLOGY.md) | §4.9 six shock nodes |
| [MARKET_INTELLIGENCE_ENGINE.md](./MARKET_INTELLIGENCE_ENGINE.md) | §3 shockClass taxonomy |
| [FINANCIAL_INTELLIGENCE_ENGINE.md](./FINANCIAL_INTELLIGENCE_ENGINE.md) | FX_MOVEMENT pass-through |
| [LATAM_FEDERATION_ARCHITECTURE.md](./LATAM_FEDERATION_ARCHITECTURE.md) | FP-07 local shock extension |

### Smallest remediation

**CPO Board PATCH — §4.9.1 Shock Bridge Table** (ontology amendment, MINOR version):

| CPO node | MkIE shockClass | MkIE subtype (if any) | Default severity | Learning policy |
|----------|-----------------|----------------------|------------------|-----------------|
| `market_shock.competitor_promo` | `COMPETITOR_ACTION` | `promo_financing`, `lot_event` | S2 | CPI-G-MKIE-01 |
| `market_shock.fx_move` | `FX_MOVEMENT` | `official_rate`, `parallel_spread` | S2 | CPI-G-MKIE-01 + FIE pass-through |
| `market_shock.oem_policy` | `OEM_POLICY` | `warranty_change`, `recall` | S1–S2 | Annotate; proof refresh review |
| `market_shock.inventory_disruption` | `INVENTORY_SHOCK` | `national_shortage`, `local_demo_loss` | S1 | Annotate unless S2 shortage |
| `market_shock.regulatory` | `REGULATORY` | `import_rule`, `emissions` | S2 | CPI-G-MKIE-01 |
| `market_shock.seasonal` | `MACROECONOMIC` | `income_cycle`, `holiday_demand` | S0–S1 | **Annotation only** — never freeze |

MkIE types without CPO node (yet): `MACROECONOMIC.credit_tightening`, `MACROECONOMIC.fuel_price` → **L1 extension objects** per Federation FP-07; steward proposes OCP within 30 days of first detection.

**Rule:** SCDG edges cite `cpo_version` shock node; KA-09 registry stores MkIE class; bridge table is authoritative translation.

### Implementation complexity

| Dimension | Rating |
|-----------|--------|
| Documentation | **Low** — single mapping table |
| Engineering | **Low** — lookup at shock write time |
| Organizational | **Low** — CPO Board PATCH approval |

### Acceptance criteria

- [ ] CPO §4.9.1 published with 6-row bridge table
- [ ] MkIE §3 cross-references CPO §4.9.1
- [ ] Federation FP-07 cites bridge for L1 local shock extension
- [ ] Zero orphan MkIE shocks without CPO mapping path (extension or bridge)

---

## P0-05 — Legacy Gate IDs in Source Specifications

### Root cause

Constitutional Harmonization v1.0 harmonizes gates operationally but source engine specs still cite legacy `G-01`, `G-02`, etc. Engineering and floor operators reading engine specs will implement wrong gates. Deprecation map exists in constitutional preamble but source docs were not errata'd.

### Affected specifications

| Spec | Known legacy references |
|------|------------------------|
| [CONSIDERED_PURCHASE_ONTOLOGY.md](./CONSIDERED_PURCHASE_ONTOLOGY.md) | "CoIE gate G-01" for lost_reason |
| [COMPANY_INTELLIGENCE_ENGINE.md](./COMPANY_INTELLIGENCE_ENGINE.md) | G-01 Data gate |
| [EXECUTIVE_RECOMMENDATION_ENGINE.md](./EXECUTIVE_RECOMMENDATION_ENGINE.md) | G-01–G-05 |
| [EXECUTIVE_COPILOT.md](./EXECUTIVE_COPILOT.md) | Possible legacy refs |
| All engine specs | Scattered |

### Smallest remediation

**Two artifacts — no spec rewrites:**

1. **Engineering Binding Memo EB-001** (1 page, authoritative over source doc gate citations):
   - All gate references use `CPI-G-{DOMAIN}-{NN}` and `CPI-MN-*`
   - Legacy ID → canonical mapping table (copy Constitutional Harmonization deprecation map)
   - Violation of EB-001 is build defect

2. **Source Spec Errata Index ERRATA-001** (registry table, not full rewrites):
   - Line-level errata for each legacy gate reference → canonical ID
   - Target: complete errata index before Sprint 1; source doc text updates in Phase B

**Do not** rewrite engine specs in Phase A — errata index is sufficient for greenlight.

### Implementation complexity

| Dimension | Rating |
|-----------|--------|
| Documentation | **Low** — 2 short artifacts |
| Engineering | **Low** — single namespace in code |
| Organizational | **None** |

### Acceptance criteria

- [ ] EB-001 published and referenced in engineering charter
- [ ] ERRATA-001 covers all legacy `G-0*` references in engine specs (grep-verified)
- [ ] CI/lint rule (optional): fail build on legacy `G-01` string in new code
- [ ] Constitutional Harmonization §22 cites EB-001 as enforcement mechanism

---

# Part 2 — P1 Classification and Resolution Timing

| ID | Issue | Class | Resolve before |
|----|-------|-------|----------------|
| **P1-01** | CPO drift index `w1`–`w4` unpublished | Ontology | **Pilot** (needed for OCP rhythm; not blocking Sprint 1) |
| **P1-02** | CPO bootstrap protocol (provisional → active) | Ontology | **Engineering** (genesis quarter rules) |
| **P1-03** | `production_config_ref` scattered in KA-10 | Capital | **Pilot** (needed for lineage audit) |
| **P1-04** | Privacy Steward absent from escalation tree | Governance | **Engineering** (KA-11 consent path) |
| **P1-05** | IBS body still says "seven classes" without Registry pointer | Capital | **Engineering** (investor narrative coherence) |
| **P1-06** | FIE 85% vs CoIE 95% session join | Governance | **Engineering** (closed by P0-01 if 95% adopted) |
| **P1-07** | L3 vertical federation pack unspecified | Federation | **FM-2** |
| **P1-08** | Dual UX stack — PathInstance contract across channels | Operational substrate | **Engineering** |
| **P1-09** | Trust Fabric not consolidated | Operational substrate | **Engineering** (closed by P0-02 SS-01 + INV-29–38) |
| **P1-10** | Finance desk / F&I resolution loop unspecified | Operational substrate | **Pilot** |

### P1 remediation summaries (smallest path)

| ID | Smallest remediation |
|----|---------------------|
| P1-01 | CPO Board publishes `w1=0.35, w2=0.25, w3=0.25, w4=0.15` in §8.1 PATCH or removes numeric drift_index until Y1 data |
| P1-02 | CPO Appendix: Genesis Protocol — provisional objects auto-active for 90 days; promotion to `active` requires CPI-MN-CPO-ACTIVE OR floor sign-off packet |
| P1-03 | KA-10 schema addition: `production_config_ref: string` required on deploy; CoIE weekly audit |
| P1-04 | Constitutional §3.3 insert: Privacy Steward parallel track after CoIE for KA-11 consent failures → Federation Architect if cross-node |
| P1-05 | IBS §1.1 footnote: *"Seven IEV core classes per §4.1; full estate inventory: INTELLIGENCE_ASSET_REGISTRY.md KA-01–13 + SS-01"* |
| P1-06 | **Superseded by P0-01** — adopt 95% everywhere |
| P1-07 | LATAM Federation Appendix: L3 Vertical Pack Transfer List (ontology kernel reuse checklist only — no new engine) |
| P1-08 | DECISION_GRAPH_SPEC PATCH: PathInstance canonical schema; all channels emit same `pathInstanceId` |
| P1-09 | **Superseded by P0-02** Trust Fabric perimeter appendix |
| P1-10 | FIE Appendix B: Finance Desk Outcome Loop — 5 fields F&I must return within 14 days; OIE queues pending |

---

# Part 3 — Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         P0 (Engineering Greenlight)                      │
├─────────────────────────────────────────────────────────────────────────┤
│  P0-05 EB-001/ERRATA-001 ──► P0-01 FIE gates v1.1                      │
│         │                           │                                    │
│         └───────────┬───────────────┘                                    │
│                     ▼                                                    │
│  P0-02 SS-01 Knowledge Library ──► P0-09 Trust Fabric (INV-29–38)       │
│                     │                                                    │
│  P0-03 Endogenous Calendar ──► P0-04 CPO↔MkIE bridge                    │
│                     │                    │                               │
└─────────────────────┼────────────────────┼───────────────────────────────┘
                      ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    P1 (Pilot / Genesis Quarter)                            │
├─────────────────────────────────────────────────────────────────────────┤
│  P1-02 CPO bootstrap ──► P1-01 drift weights                            │
│  P1-08 PathInstance contract ──► P1-03 production_config_ref              │
│  P1-04 Privacy escalation ──► KA-11 consent gates                       │
│  P1-05 IBS footnote ──► investor pack coherence                          │
│  P1-10 Finance desk loop ──► FIE L2 maturity                            │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         FM-2 (Federation Readiness)                      │
├─────────────────────────────────────────────────────────────────────────┤
│  P0-04 shock bridge ──► L1 local shock extensions (FP-07)               │
│  P1-07 L3 vertical pack checklist (optional pre-FM-2)                   │
│  Domain D attestation (Constitutional §5.2)                               │
│  CPI-MN-FED-EDGE-L1 met at La Paz node                                    │
│  D-02: zero weight clone on child launch                                  │
└─────────────────────────────────┬───────────────────────────────────────┘
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Level 11 (Institutional Grade)                        │
├─────────────────────────────────────────────────────────────────────────┤
│  Domains A–G GREEN × 2 consecutive quarters                             │
│  IEV ≥ 75 · I-ROI medium+ · MSI ≥ 0.65                                  │
│  CPI-MN-FED-EXPORT-L0 (15k edges) · FM-2 proven                         │
│  KA-13 executive calibration · KA-12 federation multiplier active         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical path to Engineering Greenlight:** `P0-05 → P0-01 → P0-02 → P0-03 → P0-04` (sequential documentation sprint, ~5–8 working days).

**Critical path to FM-2:** P0 closure + Pilot P1 + 12–18 months node-zero operation + La Paz launch discipline.

**Critical path to L11:** FM-2 + Domain attestation + capital gates (no new perimeter docs required).

---

# Part 4 — Hidden P0 Risks (Not Previously Listed)

These risks were identified in cross-estate review. None require new engines; each maps to a perimeter patch.

| ID | Hidden risk | Root cause | Smallest remediation | Timing |
|----|-------------|------------|----------------------|--------|
| **H-P0-01** | **PathInstance channel fragmentation** — screen journey and conversation turn produce incompatible edge lists | PHASE_X + legacy screen stack dual paradigm (Blueprint B12) | P1-08: canonical PathInstance in DECISION_GRAPH_SPEC | **Engineering** |
| **H-P0-02** | **CRM constitutional lag** — SELF_IMPROVING_COMPANY_BLUEPRINT B2 flags CRM as Phase 2 in some narratives; intelligence loop requires CRM truth Day 1 | Historical phasing language | EB-002 binding memo: *"CRM is financial system of record from Sprint 1; no intelligence promotion without close join"* | **Engineering** |
| **H-P0-03** | **WhatsApp async session → CRM close join** — LATAM research path may not share `sessionId` with floor close | Channel architecture under-specified | PCM §join rules PATCH: `canonicalSessionId` links async + floor; CPI-G-COIE-10 tests cross-channel | **Engineering** |
| **H-P0-04** | **Media `ready=false` proofs in live graph** — BL-14 confounds proof efficacy with production debt | Knowledge Library media domain not gated | SS-01 rule: proof node requires `media.knowledgeRef.ready=true` OR `experiment.genealogy.media_waiver` | **Pilot** |
| **H-P0-05** | **OEM derivative ownership undefined in license architecture** — MOAT mistake #1; no contract clause spec | Commercial gap treated as architecture risk | Investor Diligence Framework Appendix: **License Derivative Clause Checklist** (5 bullets, not new engine) | **OEM licensing** |
| **H-P0-06** | **CoIE learning pause vs pilot velocity** — floor may trigger LF-01 during genesis low-N period | Strict gates on immature data | CPO Genesis Protocol (P1-02) + EB-003: *"Genesis quarter: LF-03 marginal only; LF-01 requires CEO + 2-week label rate trend"* | **Engineering** |

**Board ruling:** H-P0-01, H-P0-02, H-P0-03 elevate to **effective P0** for engineering greenlight. H-P0-04 through H-P0-06 are **P1 with hard pilot gates**.

---

# Part 5 — CPI-OS Closure Roadmap

## Phase A — Engineering Greenlight

**Objective:** Authorize Santa Cruz node-zero software build with single gate namespace and closed substrate perimeter.

**Duration:** 1 documentation sprint (5–10 working days) before Sprint 1.

### Deliverables

| # | Deliverable | Closes |
|---|-------------|--------|
| A-1 | Constitutional Harmonization **v1.1** (FIE gates, KL gate, Privacy escalation) | P0-01, P1-04, P1-06 |
| A-2 | Asset Registry **v1.1** — SS-01 Knowledge Library + Trust Fabric INV cross-refs | P0-02, P1-09 |
| A-3 | MkIE **Appendix A** — Endogenous Event Calendar | P0-03 |
| A-4 | CPO **§4.9.1** Shock Bridge Table (MINOR bump) | P0-04 |
| A-5 | **EB-001** Engineering Binding Memo (gate namespace) | P0-05 |
| A-6 | **EB-002** CRM Day-1 constitutional memo | H-P0-02 |
| A-7 | **EB-003** Genesis quarter freeze policy | H-P0-06 |
| A-8 | **ERRATA-001** Legacy gate index | P0-05 |
| A-9 | DECISION_GRAPH_SPEC **PathInstance PATCH** | P1-08, H-P0-01 |
| A-10 | CPO **Genesis Protocol** appendix | P1-02 |
| A-11 | IBS **§1.1 footnote** to Registry | P1-05 |
| A-12 | PCM **canonicalSessionId** join PATCH | H-P0-03 |

### Phase A exit criteria (Engineering Greenlight)

- [ ] All P0 items closed (P0-01 through P0-05)
- [ ] H-P0-01, H-P0-02, H-P0-03 remediated
- [ ] EB-001 is engineering charter attachment
- [ ] Closure Board score ≥ **82** (Architecturally Sound → Implementation Ready)
- [ ] **Assessment level: Implementation Ready**

---

## Phase B — Pilot Readiness

**Objective:** Santa Cruz L0 operates with learning loop integrity; genesis data compounds without poisoning.

**Duration:** Months 0–12 (node zero operation).

### Deliverables

| # | Deliverable | Closes |
|---|-------------|--------|
| B-1 | CPO drift weights published OR drift_index qualitative-only until N>2000 | P1-01 |
| B-2 | KA-10 `production_config_ref` enforced in Experiment Genealogy | P1-03 |
| B-3 | FIE Appendix B — Finance Desk Outcome Loop operational | P1-10 |
| B-4 | SS-01 media readiness gate live | H-P0-04 |
| B-5 | ERRATA-001 applied to source spec text (full doc refresh) | P0-05 completion |
| B-6 | First Quarterly CPI-OS Constitutional Review completed | Constitutional §5.4 |
| B-7 | Investor Intelligence Pack v1 published (IBS §10) | Operational |
| B-8 | ≥5,000 outcome-labeled edges (CPI-MN-ESTATE-GRAPH pre-A threshold) | Series A bar |

### Phase B exit criteria (Pilot Ready)

- [ ] CPI-G-COIE-01 pass ≥85% of weeks (genesis allowance)
- [ ] CPI-G-COIE-09 lost_reason ≥85% (ramp to 95%)
- [ ] CPI-G-FIE-02 reconciliation ≤5% (ramp to 3%)
- [ ] I-ROI computable at low or medium confidence
- [ ] CoIE ritual compliance ≥70% (ramp to 85%)
- [ ] Zero silent config changes (P1-03)
- [ ] **Assessment level: Pilot Ready**

---

## Phase C — FM-2 Federation Readiness

**Objective:** La Paz (or second Bolivia L1 node) launches with topology-only transfer; national federation proven.

**Duration:** Months 12–24.

### Deliverables

| # | Deliverable | Closes |
|---|-------------|--------|
| C-1 | LATAM Federation **Appendix L3** — Vertical Pack Transfer Checklist | P1-07 |
| C-2 | La Paz transfer package (topology seed, zero weight clone) | Domain D-02 |
| C-3 | CPI-MN-FED-EDGE-L1 (200) met per edge class | Federation §3.2 |
| C-4 | Cross-node cluster hypothesis tested (D-06) | Constitutional §5.2 |
| C-5 | ≥15,000 L0 edges (CPI-MN-FED-EXPORT-L0) | Domain A-01 |
| C-6 | 3+ holdout-validated promotions trailing 12mo | Domain A-02 |
| C-7 | CPO ≥3 MAJOR versions with migration maps | Domain A-06 |

### Phase C exit criteria (FM-2 Ready)

- [ ] **FM-2 achieved** — Bolivia L1 sibling validated; divergent local weights (Domain D-01)
- [ ] D-02 lineage clean — no parent weight merge on child launch
- [ ] IEV_index ≥ 60
- [ ] MSI ≥ 0.5
- [ ] **Assessment level: Scale Ready (single-country federation)**

---

## Phase D — Institutional Grade

**Objective:** CPI-OS L11 Certified per Constitutional Harmonization Part 5; diligence-grade for PE/strategic/OEM.

**Duration:** Months 24–36+.

### Deliverables

| # | Deliverable | Closes |
|---|-------------|--------|
| D-1 | Domains A–G GREEN × 2 consecutive quarters | L11 Certified |
| D-2 | IEV_index ≥ 75; I-ROI medium+; assisted margin ≥25% GP | Domain F |
| D-3 | MSI ≥ 0.65 | Domain G-02 |
| D-4 | KA-13 rejection corpus ≥ CPI-MN-ERE-REJECTION-CORPUS | Domain E-03 |
| D-5 | Benchmark tier design (10 nodes) or LOI with licensee | Domain G-01 |
| D-6 | **License Derivative Clause Checklist** in active OEM/partner contract | H-P0-05 |
| D-7 | MOAT §6 Palantir cross-reference editorial fix | P2-01 |

### Phase D exit criteria (Institutional Grade)

- [ ] **CPI-OS L11 Certified** per Constitutional §5.1
- [ ] Optional: **CPI-OS L11 Institutional** (4Q CoIE track record)
- [ ] Investor attribution sample available (F-07)
- [ ] Federation Architect audit: transfer contamination = 0
- [ ] **Assessment level: Institutional Grade**

---

# Part 6 — Effort Summary

| Phase | Calendar | Doc effort | Engineering dependency |
|-------|----------|------------|------------------------|
| **A — Engineering Greenlight** | 1–2 weeks | ~12 patches/memos | Blocks Sprint 1 |
| **B — Pilot Readiness** | 0–12 months | 4 patches + operations | Parallel to build |
| **C — FM-2** | 12–24 months | 1 appendix + node launch | Second node build |
| **D — Institutional Grade** | 24–36+ months | Commercial checklist | License negotiations |

**Total new engines introduced:** 0  
**Total architecture redesign:** 0  
**Perimeter documents to produce in Phase A:** 12  
**Estimated Phase A documentation effort:** 5–10 working days (single architect + CPO Board sign-off on §4.9.1)

---

# Appendix — Document Map (Post-Completion)

| Artifact | Phase | Status after plan |
|----------|-------|-------------------|
| CPI_OS_CONSTITUTIONAL_HARMONIZATION.md | A | v1.1 |
| INTELLIGENCE_ASSET_REGISTRY.md | A | v1.1 (+ SS-01) |
| MARKET_INTELLIGENCE_ENGINE.md | A | + Appendix A |
| CONSIDERED_PURCHASE_ONTOLOGY.md | A, B | §4.9.1 + Genesis |
| DECISION_GRAPH_SPEC.md | A | PathInstance PATCH |
| FINANCIAL_INTELLIGENCE_ENGINE.md | A, B | Gate refs + Appendix B |
| INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md | A | §1.1 footnote |
| EB-001, EB-002, EB-003, ERRATA-001 | A | New binding memos |
| LATAM_FEDERATION_ARCHITECTURE.md | C | + Appendix L3 |

---

*End of CPI-OS Perimeter Completion Plan v1.0*
