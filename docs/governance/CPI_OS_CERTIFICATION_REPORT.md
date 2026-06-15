# CPI-OS Certification Report

**Document ID:** CPI-OS-CERT-001  
**Version:** 1.0  
**Date:** 15 June 2026  
**Issuing authority:** CPI-OS Verification Board  
**Status:** Authoritative certification artifact  
**Architecture constraint:** Frozen — no new engines, assets, registries, frameworks, governance layers, or certification systems  

**Source specifications (read-only references):**

- [CPI_OS_PERIMETER_COMPLETION_PLAN.md](../../CPI_OS_PERIMETER_COMPLETION_PLAN.md)
- [CPI_OS_CONSTITUTIONAL_HARMONIZATION.md](../../CPI_OS_CONSTITUTIONAL_HARMONIZATION.md)
- [ENGINEERING_READINESS_BACKLOG.md](../../ENGINEERING_READINESS_BACKLOG.md)

---

## 1. Executive Summary

CPI-OS is issued **Conditionally Certified** as of the Verification Board session of 15 June 2026. Architecture is frozen at v1.0 perimeter. Engineering may not begin Sprint 1 until certification conditions **C-01 through C-17** are closed or explicitly waived per the tables in §4.

**Current certification score:** 76 / 100 (Architecturally Sound — below Engineering threshold)  
**Engineering elevation threshold:** ≥ 82 / 100  
**Target elevation state upon threshold:** Certified For Engineering  

This report is the single authoritative certification artifact. Amendments require Closure Board quorum and are recorded in `CPI_OS_CERTIFICATION_AMENDMENT.md`.

---

## 2. Certification States

Certification states are mutually exclusive organizational readiness labels. Only the Verification Board (or Closure Board on re-score per C-15) may assign or elevate a state.

| State | Code | Definition | Permitted activities |
|-------|------|------------|-------------------|
| **Not Certified** | `NC` | Architecture audit incomplete or material constitutional conflict unresolved. Score &lt; 70. | Documentation and perimeter remediation only. No Sprint 1 engineering. |
| **Conditionally Certified** | `CC` | Perimeter plan adopted; blockers enumerated; score 70–81 OR mandatory Sprint 1 conditions not yet closed. Waivers may be in force. | Controlled Sprint 1 start only when §4 mandatory conditions are met and waivers documented. Learning promotions remain genesis-restricted per EB-003. |
| **Certified For Engineering** | `CFE` | Closure Board score ≥ **82**; Phase A exit criteria met per Perimeter Plan §Phase A. | Unconstrained node-zero software build. Gate namespace authoritative via EB-001. |
| **Pilot Ready** | `PR` | Phase B exit criteria met. Santa Cruz L0 operates with learning-loop integrity. | Floor pilot with genesis allowances ramping to L11 thresholds. No second-node federation launch. |
| **Federation Ready** | `FR` | Phase C exit criteria met (FM-2 achieved). Assessment level: Scale Ready (single-country federation). | La Paz or second Bolivia L1 node launch per transfer protocol. Cross-node learning under Federation gates. |

### State transition diagram

```
Not Certified
    │  score ≥ 70 + Perimeter Plan adopted
    ▼
Conditionally Certified ──(Sprint 1 start when §4 satisfied)──►
    │  C-15 re-score ≥ 82 + Phase A exit
    ▼
Certified For Engineering
    │  Phase B exit criteria
    ▼
Pilot Ready
    │  FM-2 + Phase C exit
    ▼
Federation Ready
```

**Downgrade rule:** Any RED domain in Quarterly Constitutional Review (Constitutional §5.3) during Pilot or Federation operation may hold elevation but does not automatically downgrade certification state. Downgrade requires Verification Board session with documented root cause.

---

## 3. Certification Conditions (C-01 through C-17)

Each condition is independently auditable. Closure requires all four fields satisfied: purpose met, artifacts present, acceptance criteria checked, evidence on file.

---

### C-01 — FIE Constitutional Gate Enrollment

**Purpose:** Enroll Financial Intelligence Engine admission gates in the constitutional gate registry so engineering implements a single `CPI-G-*` namespace. Prevents dual FIE / constitutional gate implementations.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Constitutional Harmonization v1.1 — FIE gate block (CPI-G-FIE-01…05), §1.3 step 1.5, §1.4 steward ownership | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| FIE §3.2 and §17.3 gate references patched | `FINANCIAL_INTELLIGENCE_ENGINE.md` |
| ERE financial gate cross-references | `EXECUTIVE_RECOMMENDATION_ENGINE.md` |
| IBS ↔ FIE alignment note (CPI-G-IBS-02 ↔ CPI-G-FIE-02) | `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` |
| Gate definitions and evaluators | `lib/governance/gates/fie-gates.ts` |
| Canonical gate registry scaffold | `lib/governance/gate-registry.ts` |
| Evaluation order with step 1.5 | `lib/governance/gate-evaluation-order.ts` |

**Acceptance criteria:**

- [ ] Grep `CPI-G-FIE-0[1-5]` returns hits in Constitutional Harmonization v1.1
- [ ] FIE §17.3 references `CPI-G-FIE-01` composite clearance, not ad hoc rule
- [ ] Gate evaluator returns `suppress_financial_recommendations` when any FIE gate fails
- [ ] Evaluation order unit test asserts step 1.5 runs after CoIE-01 and before ERE-01

**Evidence required:**

- Grep audit output (timestamped) for `CPI-G-FIE-*` in constitutional doc
- Unit test report: `gate-evaluation-order` step 1.5 ordering
- FIE steward attestation that standalone `FIE-*` aliases are deprecated in favor of `CPI-G-FIE-*`

**Dependency:** C-05 (EB-001 authoritative namespace)

---

### C-02 — Knowledge Library Substrate Registration (SS-01)

**Purpose:** Register Knowledge Library as substrate asset SS-01 with constitutional gate CPI-G-KL-01. Ensures grounding failures produce accountable CoIE signals and KA-01 depreciation linkage.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Asset Registry v1.1 Appendix D — SS-01 | `INTELLIGENCE_ASSET_REGISTRY.md` |
| CPI-G-KL-01 gate + Trust Fabric perimeter appendix | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| Domain owner cross-reference | `FUTURE_STATE_ARCHITECTURE.md` |
| Grounding fail accountability | `COMPANY_INTELLIGENCE_ENGINE.md` |
| Content validator enforcement | `lib/content/validator.ts` |
| `KnowledgeRef` type | `types/content.ts` |
| KL gate evaluator | `lib/governance/gates/kl-gates.ts` |

**Acceptance criteria:**

- [ ] Asset Registry lists SS-01 with owner, measurement, depreciation path to KA-01
- [ ] CPI-G-KL-01 in constitutional gate registry
- [ ] Content validator rejects price/spec blocks without valid `knowledgeRef`
- [ ] Grounding fail emits CoIE Tier A ticket artifact (event or log schema documented)

**Evidence required:**

- Asset Registry excerpt showing SS-01 row complete
- Validator test: rejection of ungrounded price/spec block
- Sample CoIE Tier A ticket or documented event schema for grounding fail

**Dependency:** C-05

---

### C-03 — MkIE Endogenous Event Calendar

**Purpose:** Define endogenous event schema and consumer contract so MkIE classification performs `calendar_check` before `shock_registry_write`. Prevents misclassification of controllable variance as exogenous shocks.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| MkIE Appendix A — schema, six event classes, ritual | `MARKET_INTELLIGENCE_ENGINE.md` |
| Endogenous vs exogenous boundary cross-ref | `COMPANY_INTELLIGENCE_ENGINE.md` |
| RC-06 closure note | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| Calendar CRUD + lookup | `lib/mkie/endogenous-calendar.ts` |
| Pre-check classifier step | `lib/mkie/shock-classifier.ts` |
| `EndogenousEvent` type | `types/mkie.ts` |

**Acceptance criteria:**

- [ ] MkIE Appendix A published with YAML schema and 6-class enum
- [ ] Classification pipeline rejects S2+ severity when `annotationOnly: true` calendar match
- [ ] MkIE failure mode F-04 references calendar mitigation
- [ ] Genesis calendar may be empty; schema and API contract exist

**Evidence required:**

- Published Appendix A with schema and enum
- Integration or unit test: S2+ rejection on `annotationOnly` calendar match
- F-04 cross-reference grep result

**Dependency:** None (may run parallel to C-02 after C-05)

---

### C-04 — CPO ↔ MkIE Shock Bridge Table

**Purpose:** Publish authoritative 6-row bidirectional mapping between CPO `market_shock.*` nodes and MkIE `shockClass` types. Resolves RC-07 ontology bridge gap.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| CPO §4.9.1 bridge table (MINOR version bump) | `CONSIDERED_PURCHASE_ONTOLOGY.md` |
| MkIE cross-reference | `MARKET_INTELLIGENCE_ENGINE.md` |
| Federation FP-07 extension cite | `LATAM_FEDERATION_ARCHITECTURE.md` |
| FX_MOVEMENT pass-through row | `FINANCIAL_INTELLIGENCE_ENGINE.md` |
| Runtime bridge lookup | `lib/mkie/cpo-shock-bridge.ts` |
| Machine-readable 6-row table | `content/ontology/shock-bridge.json` |

**Acceptance criteria:**

- [ ] CPO §4.9.1 published with 6 rows including severity and learning policy
- [ ] SCDG edges cite CPO shock node; KA-09 stores MkIE class; bridge translates both directions
- [ ] Zero orphan MkIE shocks without CPO mapping path (extension or bridge)
- [ ] CPO version bumped MINOR (e.g. 1.0.0 → 1.1.0)

**Evidence required:**

- §4.9.1 published text with version bump in CPO release metadata
- `shock-bridge.json` validated against schema
- Orphan-shock audit query result = 0

**Dependency:** C-03

---

### C-05 — Engineering Binding Memo EB-001

**Purpose:** Establish `CPI-G-*` and `CPI-MN-*` as authoritative over legacy gate citations. Violation is a build defect.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| EB-001 memo | `docs/governance/EB-001-engineering-binding-memo.md` |
| Constitutional enforcement cross-ref | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| Legacy ID lint script | `scripts/lint-gate-ids.mjs` |
| npm script | `package.json` (`lint:gates`) |

**Acceptance criteria:**

- [ ] EB-001 in repo; referenced in engineering charter or README governance section
- [ ] Legacy ID → canonical mapping table complete (from Constitutional deprecation map)
- [ ] `npm run lint:gates` passes on current codebase
- [ ] ERRATA-001 (C-10) references EB-001 as enforcement mechanism

**Evidence required:**

- EB-001 memo with mapping table
- CI or local `lint:gates` pass log
- README or charter citation of EB-001

**Dependency:** None (first item on critical path)

---

### C-06 — CRM Day-1 Constitutional Memo EB-002

**Purpose:** Declare CRM as financial system of record from Sprint 1. No intelligence promotion without close join.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| EB-002 memo | `docs/governance/EB-002-crm-day1-memo.md` |
| Blueprint errata cross-ref | `SELF_IMPROVING_COMPANY_BLUEPRINT.md` |
| `CloseRecord` type | `lib/crm/types.ts` |
| Join rate calculator | `lib/crm/close-join.ts` |
| Lead API `sessionId` propagation | `app/api/leads/route.ts` |

**Acceptance criteria:**

- [ ] EB-002 published; states CRM truth required Day 1
- [ ] Lead API accepts and persists `sessionId` on all capture paths
- [ ] Close join metric computable against 95% threshold (C-11)
- [ ] ERE promotion path blocked when join rate below threshold (integration stub acceptable Sprint 1)

**Evidence required:**

- EB-002 published memo
- API test: `sessionId` persisted on lead capture
- Join rate computation sample output

**Dependency:** C-05

---

### C-07 — Genesis Quarter Freeze Policy EB-003

**Purpose:** Define genesis-quarter learning freeze rules: LF-03 marginal only; LF-01 requires CEO + 2-week label rate trend.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| EB-003 memo | `docs/governance/EB-003-genesis-freeze-policy.md` |
| Constitutional freeze appendix cross-ref | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| LF-01/LF-03 precedence evaluator | `lib/governance/learning-freeze.ts` |
| Executive Copilot errata note | `EXECUTIVE_COPILOT.md` |

**Acceptance criteria:**

- [ ] EB-003 published with LF-03/LF-01 genesis rules
- [ ] Learning freeze evaluator rejects LF-01 without CEO attestation flag during genesis quarter
- [ ] CoIE incident log schema documents genesis freeze events

**Evidence required:**

- EB-003 published memo with genesis quarter date range
- Unit test: LF-01 rejection without CEO attestation during genesis
- Incident log schema documentation

**Dependency:** C-05 · C-13

---

### C-08 — PathInstance Canonical Schema

**Purpose:** Publish canonical `PathInstance` schema all channels emit. Resolves H-P0-01 channel fragmentation in decision graph.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| DECISION_GRAPH_SPEC §5 PathInstance PATCH | `DECISION_GRAPH_SPEC.md` |
| TypeScript schema | `types/path-instance.ts` |
| Create, freeze, attach outcome | `lib/graph/path-instance.ts` |
| `path_edge` event emission | `lib/analytics/trackEvent.ts` |
| Active `pathInstanceId` in session | `lib/session/SessionProvider.tsx` |

**Acceptance criteria:**

- [ ] PathInstance schema documented with required fields: `pathInstanceId`, `sessionId`, `channel`, `edges[]`, `cpo_version`, `frozenAt?`
- [ ] Kiosk screen transitions append to same edge list format as conversation turns (schema parity)
- [ ] Unit test: two channels produce mergeable PathInstance objects given same `pathInstanceId`
- [ ] DECISION_GRAPH_SPEC §7 integrity rules reference PathInstance freeze on outcome

**Evidence required:**

- Published schema in DECISION_GRAPH_SPEC
- Unit test report: cross-channel mergeability
- Sample PathInstance JSON from two channels

**Dependency:** C-05

---

### C-09 — PCM canonicalSessionId Cross-Channel Join

**Purpose:** Link async (WhatsApp) and floor (kiosk) sessions via `canonicalSessionId`. Satisfies H-P0-03.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| PCM §7 PATCH — join rules | `PHASE_X_CONVERSATIONAL_SALES_BRAIN.md` |
| Session linkage cross-ref | `DECISION_GRAPH_SPEC.md` |
| ID minting and persistence | `lib/session/canonical-session.ts` |
| WhatsApp deep link param | `lib/whatsapp/buildWhatsAppLink.ts` |
| Session provider exposure | `lib/session/SessionProvider.tsx` |
| Lead form submission | `components/screens/TestDriveForm.tsx` |

**Acceptance criteria:**

- [ ] WhatsApp deep link carries `canonicalSessionId`; floor session resolves same ID
- [ ] CPI-G-COIE-10 join test passes cross-channel (kiosk start → WhatsApp continue → CRM close)
- [ ] PathInstance records from both channels share `canonicalSessionId`
- [ ] PCM spec documents collision handling (shared phone, family devices)

**Evidence required:**

- End-to-end join test log (kiosk → WhatsApp → CRM)
- PCM §7 published join rules including collision handling
- Sample linked session IDs across channels

**Dependency:** C-08 · C-06

---

### C-10 — Legacy Gate Errata Index ERRATA-001

**Purpose:** Publish line-level mapping of all legacy `G-0*` references in engine specs to canonical `CPI-G-*` IDs. Grep-complete index for Phase A; full text refresh deferred to Phase B.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| ERRATA-001 index | `docs/governance/ERRATA-001-legacy-gate-index.md` |
| Engine spec legacy refs (indexed) | `CONSIDERED_PURCHASE_ONTOLOGY.md`, `COMPANY_INTELLIGENCE_ENGINE.md`, `EXECUTIVE_RECOMMENDATION_ENGINE.md`, `EXECUTIVE_COPILOT.md` |
| Grep audit integration | `scripts/lint-gate-ids.mjs` |

**Acceptance criteria:**

- [ ] ERRATA-001 covers 100% of legacy `G-0*` hits in engine specs (grep-verified)
- [ ] Each errata row: file, line, legacy ID, canonical ID, status (indexed | patched)
- [ ] CI optional rule documented; `lint:gates` passes
- [ ] Full source doc text updates deferred to Phase B — index sufficient for greenlight

**Evidence required:**

- Grep audit output with 100% coverage
- ERRATA-001 table with all rows populated
- `lint:gates` pass log

**Dependency:** C-05

---

### C-11 — Session-Join Threshold Harmonization (95%)

**Purpose:** Single 95% close-to-session join threshold everywhere. Aligns FIE §3.2 with CPI-G-COIE-10 and CPI-G-FIE-03.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| FIE §3.2 threshold patch (85% → 95%) | `FINANCIAL_INTELLIGENCE_ENGINE.md` |
| CoIE join table | `COMPANY_INTELLIGENCE_ENGINE.md` |
| Constitutional confirmation | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| Shared threshold constant | `lib/crm/close-join.ts` |
| FIE gate uses same constant | `lib/governance/gates/fie-gates.ts` |

**Acceptance criteria:**

- [ ] Grep finds no 85% session join threshold in FIE or CoIE specs
- [ ] Single `JOIN_RATE_THRESHOLD` constant imported by FIE and CoIE gate evaluators
- [ ] P1-06 marked superseded in Perimeter Plan cross-ref

**Evidence required:**

- Grep audit: zero 85% join threshold in FIE/CoIE
- Code reference showing single imported constant
- Perimeter Plan P1-06 closure note

**Dependency:** C-01

---

### C-12 — Privacy Steward Escalation Tree

**Purpose:** Insert Privacy Steward parallel track after CoIE for KA-11 consent failures. Escalate to Federation Architect if cross-node.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Constitutional §3.3 escalation insert | `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` |
| KA-11 consent governance cross-ref | `INTELLIGENCE_ASSET_REGISTRY.md` |
| Consent failure escalation path | `CUSTOMER_DNA_ENGINE.md` |
| Privacy Steward routing | `lib/governance/escalation.ts` |
| Household consent gate | `lib/privacy/consent-gate.ts` |

**Acceptance criteria:**

- [ ] §3.3 lists Privacy Steward with escalation to Federation Architect for cross-node consent
- [ ] Genotype merge blocked without consent flag (INV-28 enforcement in code path)
- [ ] Escalation event schema documented for CoIE incident log

**Evidence required:**

- Published §3.3 escalation tree
- Unit test: genotype merge blocked without consent
- Escalation event schema in CoIE incident log documentation

**Dependency:** C-01 (v1.1 bundle)

---

### C-13 — CPO Genesis Protocol Appendix

**Purpose:** Define provisional object rules: auto-active 90 days; promotion to `active` requires CPI-MN-CPO-ACTIVE OR floor sign-off packet. Closes RC-11.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Genesis Protocol appendix | `CONSIDERED_PURCHASE_ONTOLOGY.md` |
| Promotion evaluator | `lib/ontology/cpo-genesis.ts` |
| Genesis release artifact | `content/ontology/cpo-release.json` |

**Acceptance criteria:**

- [ ] Genesis Protocol published with 90-day provisional rule and promotion paths
- [ ] SCDG learning accepts provisional CPO objects during genesis quarter
- [ ] Promotion blocked without minimum-N or floor sign-off per protocol
- [ ] EB-003 (C-07) references Genesis Protocol for freeze policy context

**Evidence required:**

- Published Genesis Protocol appendix
- `cpo-release.json` with `floor_validation` metadata
- Cross-reference grep: EB-003 ↔ Genesis Protocol

**Dependency:** C-05

---

### C-14 — IBS Registry Inventory Footnote

**Purpose:** Resolve narrative conflict between IBS seven IEV core classes and Asset Registry thirteen assets. Closes P1-05.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| IBS §1.1 footnote PATCH | `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` |
| Reciprocal pointer | `INTELLIGENCE_ASSET_REGISTRY.md` |

**Acceptance criteria:**

- [ ] IBS §1.1 footnote cites Asset Registry as canonical 13+1 inventory
- [ ] No narrative conflict between IBS seven classes and Registry thirteen assets
- [ ] P1-05 marked closed in Perimeter Plan cross-ref

**Evidence required:**

- Published footnote text in IBS §1.1
- Registry reciprocal pointer
- Perimeter Plan P1-05 closure note

**Dependency:** C-02

---

### C-15 — Closure Board Re-Score ≥ 82

**Purpose:** Closure Board re-audit after C-01–C-14, C-16, C-17 complete. Score ≥ 82 elevates status from Conditionally Certified to **Certified For Engineering**.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Certification amendment record | `docs/governance/CPI_OS_CERTIFICATION_AMENDMENT.md` |
| Phase A exit checklist | `CPI_OS_PERIMETER_COMPLETION_PLAN.md` |

**Acceptance criteria:**

- [ ] Closure Board score ≥ **82** documented per §5 methodology
- [ ] Status elevation: Conditionally Certified → **Certified For Engineering**
- [ ] All Phase A exit criteria in Perimeter Plan §Phase A checked
- [ ] Assessment level: **Implementation Ready**

**Evidence required:**

- Completed score worksheet (§5.3 template)
- Signed amendment with date and signatories (§6)
- Phase A exit checklist with all items checked

**Dependency:** C-01 through C-14 · C-16 · C-17

---

### C-16 — CPO Board Sign-Off on §4.9.1

**Purpose:** CPO Board formal sign-off on shock bridge table (C-04) before engineering uses bridge in production shock pipeline.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Sign-off minute | `docs/governance/signoffs/CPO-4.9.1-shock-bridge-signoff.md` |
| Floor validation metadata | `CONSIDERED_PURCHASE_ONTOLOGY.md` (`floor_validation.sales_director_signoff: completed`) |

**Acceptance criteria:**

- [ ] Signed minute or signoff doc in repo with date and CPO version
- [ ] Bridge table locked for Sprint 1; changes require OCP
- [ ] C-15 bundle includes this artifact

**Evidence required:**

- Sign-off document with CPO Board Chair signature and date
- CPO version cited in sign-off matches published §4.9.1

**Dependency:** C-04

---

### C-17 — CEO + CoIE Steward Sign-Off on EB-003

**Purpose:** Executive sign-off on genesis-quarter freeze policy before floor operations begin.

**Required artifacts:**

| Artifact | Location |
|----------|----------|
| Sign-off minute | `docs/governance/signoffs/EB-003-genesis-freeze-signoff.md` |

**Acceptance criteria:**

- [ ] CEO and CoIE steward signatures (or written approval) on EB-003
- [ ] Genesis quarter dates defined (start/end)
- [ ] C-15 bundle includes this artifact

**Evidence required:**

- Signed sign-off with genesis quarter date range
- EB-003 memo version referenced in sign-off

**Dependency:** C-07 · C-13

---

## 4. Sprint 1 Gate Classification

This table removes ambiguity around the **minimum waiver set**. Conditions listed as **Waivable** may proceed to Sprint 1 with written Closure Board approval and documented mitigation. Conditions listed as **Mandatory** must close with evidence — no waiver permitted.

| Condition | Title | Classification | Rationale |
|-----------|-------|----------------|-----------|
| **C-01** | FIE Constitutional Gate Enrollment | **Waivable With Closure Board Approval** | Namespace scaffold may lag if EB-001 + ERRATA-001 enforce lint; FIE gates stubbed Sprint 1 |
| **C-02** | Knowledge Library Substrate (SS-01) | **Mandatory Before Sprint 1** | Grounding enforcement required before any SIE price/spec output |
| **C-03** | MkIE Endogenous Event Calendar | **Mandatory Before Sprint 1** | Shock classifier contract required before KA-09 writes |
| **C-04** | CPO ↔ MkIE Shock Bridge | **Waivable With Closure Board Approval** | Genesis may operate with annotation-only shocks; bridge required before S2+ production pipeline |
| **C-05** | Engineering Binding Memo EB-001 | **Waivable With Closure Board Approval** | Waiver only if interim manual gate-ID review process documented; strongly discouraged |
| **C-06** | CRM Day-1 Memo EB-002 | **Waivable With Closure Board Approval** | Waiver permits delayed CRM join if `sessionId` capture live; no promotion path until join metric live |
| **C-07** | Genesis Quarter Freeze EB-003 | **Mandatory Before Sprint 1** | Learning freeze precedence is constitutional; no floor ops without CEO/CoIE policy |
| **C-08** | PathInstance Canonical Schema | **Waivable With Closure Board Approval** | Waiver permits single-channel kiosk-only Sprint 1 with documented fragmentation debt |
| **C-09** | canonicalSessionId Cross-Channel Join | **Mandatory Before Sprint 1** | H-P0-03 effective P0; async↔floor join required for any multi-channel capture |
| **C-10** | Legacy Gate Errata ERRATA-001 | **Waivable With Closure Board Approval** | Index may lag if grep audit proves zero legacy IDs in `lib/` and `app/` |
| **C-11** | Session-Join Threshold (95%) | **Mandatory Before Sprint 1** | Single threshold number required before any gate evaluator ships |
| **C-12** | Privacy Steward Escalation Tree | **Mandatory Before Sprint 1** | INV-28 consent enforcement required before genotype merge paths |
| **C-13** | CPO Genesis Protocol | **Mandatory Before Sprint 1** | Provisional object rules required before SCDG accepts genesis data |
| **C-14** | IBS Registry Inventory Footnote | **Mandatory Before Sprint 1** | Capital narrative integrity; documentation-only, zero waiver risk |
| **C-15** | Closure Board Re-Score ≥ 82 | **Mandatory Before Sprint 1** | Score worksheet must be filed; elevation to CFE may complete during Sprint 1 week 1 |
| **C-16** | CPO Board Sign-Off §4.9.1 | **Mandatory Before Sprint 1** | Bridge lock required unless C-04 waived (if C-04 waived, C-16 N/A with board minute) |
| **C-17** | CEO + CoIE Sign-Off EB-003 | **Mandatory Before Sprint 1** | Executive attestation on genesis freeze before floor operations |

### Minimum waiver set (explicit)

The following conditions constitute the **only** conditions eligible for Closure Board waiver while authorizing Sprint 1 start:

**C-01, C-04, C-05, C-06, C-08, C-10**

Waiver rules:

1. Waiver requires **written Closure Board minute** citing condition ID, mitigation, owner, and target close date within Sprint 1.
2. Maximum **three** conditions may be waived simultaneously.
3. Waived conditions score at **80%** of maximum points (§5.2) until closed.
4. C-15 cannot pass at ≥ 82 if more than **two** conditions remain waived at re-score time.
5. C-16 is **not waivable** when C-04 is closed. If C-04 is waived, C-16 is automatically deferred with C-04.

### Sprint 1 authorization rule

Sprint 1 may begin when:

```
∀ mandatory conditions: status = Verified Closed
AND
∀ waivable conditions: status ∈ {Verified Closed, Waived With Approval}
AND
C-15 score worksheet filed (score may be < 82 at start if waivers in force)
```

---

## 5. Certification Scoring Methodology

### 5.1 Principles

| Principle | Rule |
|-----------|------|
| **Objective** | Score computed from condition status codes and evidence flags — no subjective letter grades |
| **Evidence-based** | Points awarded only when evidence artifacts listed in §3 are on file and verified |
| **Threshold** | Score ≥ **82** required for **Certified For Engineering** elevation (C-15) |
| **Reproducibility** | Any auditor can recompute score from the worksheet template (§5.3) |

### 5.2 Condition point allocation

Each condition C-01 through C-17 carries equal weight.

| Parameter | Value |
|-----------|-------|
| Conditions counted | 17 |
| Points per condition (maximum) | 5.8824 (100 ÷ 17, rounded to 4 decimals in worksheet) |
| **Maximum score** | **100.00** |
| **Engineering threshold** | **≥ 82.00** |
| **Conditional band** | 70.00 – 81.99 |
| **Not Certified band** | &lt; 70.00 |

### 5.3 Condition status codes

| Status code | Label | Points (× 5.8824) | Evidence requirement |
|-------------|-------|-------------------|----------------------|
| `NC` | Not Started | 0.00 | None |
| `IP` | In Progress | 2.35 (40%) | Owner attestation + partial artifact |
| `ES` | Evidence Submitted | 4.71 (80%) | All acceptance criteria met; verification pending |
| `VC` | Verified Closed | 5.88 (100%) | All §3 evidence on file; verifier sign-off |
| `WA` | Waived With Approval | 4.71 (80%) | Closure Board waiver minute + mitigation plan |

**Waived conditions** (`WA`) cannot exceed three simultaneously at re-score. Each waived condition beyond two deducts **2.00** penalty points from raw total.

**Process gate penalty:** If C-15 worksheet is filed without C-16 or C-17 (when applicable), deduct **5.00** points.

### 5.4 Score calculation formula

```
raw_score = Σ (points_for_status[C-01..C-17])
waiver_penalty = max(0, (waived_count - 2)) × 2.00
process_penalty = (missing C-16 or C-17 when required) ? 5.00 : 0.00

certification_score = round(raw_score - waiver_penalty - process_penalty, 2)
```

### 5.5 Score worksheet template

| Condition | Status | Points | Verifier | Evidence ref |
|-----------|--------|--------|----------|--------------|
| C-01 | | | | |
| C-02 | | | | |
| C-03 | | | | |
| C-04 | | | | |
| C-05 | | | | |
| C-06 | | | | |
| C-07 | | | | |
| C-08 | | | | |
| C-09 | | | | |
| C-10 | | | | |
| C-11 | | | | |
| C-12 | | | | |
| C-13 | | | | |
| C-14 | | | | |
| C-15 | | | | |
| C-16 | | | | |
| C-17 | | | | |
| **Raw subtotal** | | | | |
| Waiver penalty | | | | |
| Process penalty | | | | |
| **Certification score** | | | | |

### 5.6 Score-to-state mapping

| Score range | Assessment level | Certification state |
|-------------|------------------|---------------------|
| &lt; 70 | Not ready | Not Certified |
| 70 – 81.99 | Architecturally Sound | Conditionally Certified |
| ≥ 82 | Implementation Ready | Certified For Engineering |
| Phase B exit (separate audit) | Pilot operational | Pilot Ready |
| Phase C exit (separate audit) | Scale Ready | Federation Ready |

**Current baseline (15 June 2026):** Score **76.00** — Conditionally Certified. Perimeter 76% architecturally closed per Closure Board audit.

### 5.7 Verifier roles

| Role | May verify |
|------|------------|
| Closure Board chair | C-15, overall score |
| Condition owner (per §3) | Respective C-01…C-14 artifact conditions |
| CPO Board chair | C-04, C-13, C-16 |
| CEO + CoIE steward | C-07, C-17 |
| FIE steward | C-01, C-11 |
| Platform Engineering lead | C-05, C-08, C-09, C-10 |

---

## 6. Signatory Requirements

### 6.1 Required signatories

Certification elevation and amendment require signatures from all four roles below. Absence of any signature blocks elevation past Conditionally Certified.

| Role | Responsibility | Signs |
|------|----------------|---------|
| **CPO Board Chair** | Ontology and shock bridge authority | C-16; certification amendment; Pilot Ready attestation (ontology section) |
| **CEO** | Executive authority; genesis freeze; learning pause | C-17; certification amendment; all state elevations |
| **CoIE Steward** | Organizational learning integrity | C-17; certification amendment; Domain B attestation at Pilot Ready |
| **FIE Steward** | Financial truth and join integrity | C-01 verification; certification amendment; Domain F pre-pilot section |

### 6.2 Signature artifact

All sign-offs are recorded in:

- `docs/governance/CPI_OS_CERTIFICATION_AMENDMENT.md` — score, date, state transition
- `docs/governance/signoffs/` — condition-specific minutes (C-16, C-17)

Minimum fields per signature block:

```
Role:
Name:
Date (ISO 8601):
Condition / amendment ID:
Decision: APPROVE | APPROVE WITH CONDITIONS | REJECT
Conditions (if any):
```

### 6.3 Quorum

| Action | Quorum |
|--------|--------|
| Waiver of C-01, C-04, C-05, C-06, C-08, C-10 | Closure Board chair + 2 of {CEO, CoIE Steward, FIE Steward} |
| Elevation to Certified For Engineering | All four signatories (§6.1) |
| Elevation to Pilot Ready | CEO + CoIE Steward + CPO Board Chair |
| Elevation to Federation Ready | CEO + Federation Architect + Closure Board chair |

---

## 7. Signoff SLA

### 7.1 Standard SLA

| Parameter | Value |
|-----------|-------|
| **SLA** | **5 business days** from evidence submission to signed decision |
| **Clock start** | Timestamp on evidence bundle notification to signatory (email or governance queue) |
| **Clock stop** | Signed artifact committed to `docs/governance/signoffs/` or amendment recorded |
| **Business days** | Monday–Friday, excluding Bolivia public holidays per Viaggio Motors corporate calendar |

### 7.2 Escalation on SLA breach

| Elapsed | Action |
|---------|--------|
| Day 3 | Automated reminder to signatory + condition owner |
| Day 5 | SLA breach flag; escalation to Closure Board chair |
| Day 7 | CEO may issue **provisional approval** valid for 10 business days pending formal signature |
| Day 10 | Unresolved sign-off blocks dependent conditions; Sprint 1 authorization suspended if mandatory sign-off pending |

### 7.3 Delegate rules

Signatories may delegate signature authority under the following constraints. Delegation must be **written** (email or minute) and **time-bounded**.

| Role | Permitted delegate | Scope | Max duration |
|------|-------------------|-------|--------------|
| **CPO Board Chair** | Sales Director or designated CPO Board member | C-16; ontology sign-offs only | 30 calendar days |
| **CEO** | COO or GM Commercial | C-17 co-sign with CoIE; provisional approvals §7.2 | 14 calendar days |
| **CoIE Steward** | CoIE deputy or Platform Engineering lead | C-17; evidence verification for CoIE-owned conditions | 30 calendar days |
| **FIE Steward** | Finance steward | C-01 verification; FIE gate evidence | 30 calendar days |

**Non-delegable actions:**

- Elevation to **Certified For Engineering** — CEO signature cannot be delegated
- Elevation to **Federation Ready** — CEO signature cannot be delegated
- Waiver of more than two conditions simultaneously — Closure Board chair cannot delegate

**Delegate record format:**

```
Delegator:
Delegate:
Effective dates:
Scope (condition IDs):
Revocation notice (optional):
```

Delegate records are filed in `docs/governance/signoffs/delegations/` and referenced in the amendment that relies on them.

---

## 8. Verification Board Attestation

| Field | Value |
|-------|-------|
| **Board** | CPI-OS Verification Board |
| **Session date** | 15 June 2026 |
| **Prior state** | Not Certified |
| **Issued state** | **Conditionally Certified** |
| **Score** | 76.00 / 100 |
| **Next mandatory action** | Close mandatory Sprint 1 conditions (§4); file C-15 worksheet when evidence complete |
| **Architecture status** | Frozen — perimeter remediation only |

This report supersedes informal references to a "Final Certification Report" in downstream documents. All certification queries resolve to this artifact and its amendments.

---

## Appendix A — Quick Reference

### Mandatory before Sprint 1 (11 conditions)

C-02, C-03, C-07, C-09, C-11, C-12, C-13, C-14, C-15, C-16, C-17

### Waivable with Closure Board approval (6 conditions)

C-01, C-04, C-05, C-06, C-08, C-10

### Critical path

```
C-05 → C-01 → C-11 → C-02 → C-03 → C-04 → C-08 → C-09 → C-06 → C-07 → C-13 → C-10 → C-12 → C-14 → C-16 → C-17 → C-15
```

### Thresholds

- Engineering elevation: **≥ 82**
- Maximum simultaneous waivers: **3**
- Maximum waivers at re-score for ≥ 82: **2**
- Signoff SLA: **5 business days**

---

*End of CPI-OS Certification Report v1.0*
