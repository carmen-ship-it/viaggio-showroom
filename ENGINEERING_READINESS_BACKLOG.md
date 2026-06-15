# CPI-OS Engineering Readiness Backlog

**Version:** 1.0  
**Date:** 15 June 2026  
**Role:** CPI-OS Engineering Readiness Task Force  
**Source:** [Final Certification Report](./CPI_OS_PERIMETER_COMPLETION_PLAN.md) (Conditionally Certified) · [Perimeter Completion Plan](./CPI_OS_PERIMETER_COMPLETION_PLAN.md) · [Constitutional Harmonization](./CPI_OS_CONSTITUTIONAL_HARMONIZATION.md) v1.0  
**Constraint:** Executable backlog only — no new engines, no architecture redesign  

---

## Executive Summary

CPI-OS is **Conditionally Certified**. Engineering may not begin Sprint 1 until certification conditions **C-01 through C-17** close or are explicitly waived in writing by the Closure Board.

**Minimum Sprint 1 waiver set** (per Final Certification Report): C-01, C-04, C-05, C-06, C-08, C-10.

**Critical path:** C-05 → C-01 → C-11 → C-02 → C-03 → C-04 → C-08 → C-09 → C-06 → C-07 → C-13 → C-10 → C-12 → C-14 → C-16 → C-17 → C-15.

**Total Phase A effort:** 5–10 documentation days + 8–12 engineering days (gate registry, session join, PathInstance scaffold).

---

## Dependency Order (C-01 through C-17)

```
C-05 (EB-001 namespace)
  └─► C-01 (FIE constitutional gates)
        └─► C-11 (95% join harmonization)
  └─► C-10 (ERRATA-001)
C-02 (SS-01 Knowledge Library)
  └─► C-03 (Endogenous Calendar) ──► C-04 (CPO↔MkIE bridge)
C-08 (PathInstance schema)
  └─► C-09 (canonicalSessionId)
C-06 (EB-002 CRM Day-1) ──► C-09
C-07 (EB-003 genesis freeze) ──► C-13 (CPO Genesis Protocol)
C-04 ──► C-16 (CPO Board sign-off)
C-07 ──► C-17 (CEO + CoIE sign-off)
C-01…C-14, C-16, C-17 ──► C-15 (Closure Board re-score ≥82)
```

---

# Phase A — Required Before Sprint 1

All certification blockers C-01 through C-17. Items C-15–C-17 are process gates that close Phase A.

---

### C-01 — FIE Constitutional Gate Enrollment

**Description:** Publish Constitutional Harmonization v1.1 with `CPI-G-FIE-01` through `CPI-G-FIE-05`, evaluation order step 1.5 (after CoIE-01, before ERE gates). Patch FIE to reference constitutional gates; deprecate standalone `FIE-*` aliases.

**File(s):**
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — Part 1 FIE gate block, §1.3 step 1.5, §1.4 FIE steward ownership
- `FINANCIAL_INTELLIGENCE_ENGINE.md` — §3.2 admission gates, §17.3 joint clearance
- `EXECUTIVE_RECOMMENDATION_ENGINE.md` — financial recommendation gate references
- `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` — CPI-G-IBS-02 ↔ CPI-G-FIE-02 alignment note
- `lib/governance/gates/fie-gates.ts` — **new** — gate definitions and pass evaluators
- `lib/governance/gate-registry.ts` — **new** — canonical `CPI-G-*` registry (RC-13 scaffold)
- `lib/governance/gate-evaluation-order.ts` — **new** — weekly cycle step 1.5 insertion

**Owner:** Platform Engineering (implementation) · FIE steward (spec sign-off)

**Effort:** 2 doc days · 3 eng days

**Dependency:** C-05 (EB-001 authoritative namespace)

**Acceptance Criteria:**
- [ ] Grep `CPI-G-FIE-0[1-5]` returns hits in Constitutional Harmonization v1.1
- [ ] FIE §17.3 references `CPI-G-FIE-01` composite clearance, not ad hoc rule
- [ ] Gate evaluator returns `suppress_financial_recommendations` when any FIE gate fails
- [ ] Evaluation order unit test asserts step 1.5 runs after CoIE-01 and before ERE-01

---

### C-02 — Knowledge Library Substrate Registration (SS-01)

**Description:** Register SS-01 Knowledge Library in Asset Registry v1.1 Appendix D; add `CPI-G-KL-01` substrate gate; cross-reference Trust Fabric invariants INV-29–INV-38.

**File(s):**
- `INTELLIGENCE_ASSET_REGISTRY.md` — Appendix D (SS-01), staleness metric, KA-01 depreciation link
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — CPI-G-KL-01 gate, Trust Fabric perimeter appendix
- `FUTURE_STATE_ARCHITECTURE.md` — §3.3 domain owner cross-ref to SS-01
- `COMPANY_INTELLIGENCE_ENGINE.md` — Tier A grounding_fail accountability ticket
- `lib/content/validator.ts` — enforce `knowledgeRef` + `validatedAt` on price/spec/legal claims
- `types/content.ts` — `KnowledgeRef` type with `ready: boolean`
- `lib/governance/gates/kl-gates.ts` — **new** — CPI-G-KL-01 evaluator

**Owner:** CoIE steward (accountable rollup) · Platform Engineering (grounding enforcement)

**Effort:** 1 doc day · 2 eng days

**Dependency:** C-05

**Acceptance Criteria:**
- [ ] Asset Registry lists SS-01 with owner, measurement, depreciation path to KA-01
- [ ] CPI-G-KL-01 in constitutional gate registry
- [ ] Content validator rejects price/spec blocks without valid `knowledgeRef`
- [ ] Grounding fail emits CoIE Tier A ticket artifact (event or log schema documented)

---

### C-03 — MkIE Endogenous Event Calendar

**Description:** Publish MkIE Appendix A with `endogenousEvent` schema, six event classes, and consumer contract: classification pipeline must `calendar_check` before `shock_registry_write`.

**File(s):**
- `MARKET_INTELLIGENCE_ENGINE.md` — Appendix A (schema + class enum + ritual)
- `COMPANY_INTELLIGENCE_ENGINE.md` — endogenous vs exogenous boundary cross-ref
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — RC-06 closure note
- `lib/mkie/endogenous-calendar.ts` — **new** — calendar CRUD + lookup
- `lib/mkie/shock-classifier.ts` — **new** — pre-check step before KA-09 write
- `types/mkie.ts` — **new** — `EndogenousEvent` type

**Owner:** MkIE shock steward + CoIE steward (joint weekly upkeep)

**Effort:** 1 doc day · 2 eng days

**Dependency:** None (may run parallel to C-02 after C-05)

**Acceptance Criteria:**
- [ ] MkIE Appendix A published with YAML schema and 6-class enum
- [ ] Classification pipeline rejects S2+ severity when `annotationOnly: true` calendar match
- [ ] MkIE failure mode F-04 references calendar mitigation
- [ ] Genesis calendar may be empty; schema and API contract exist

---

### C-04 — CPO ↔ MkIE Shock Bridge Table

**Description:** CPO Board PATCH §4.9.1 — 6-row bidirectional mapping between CPO `market_shock.*` nodes and MkIE `shockClass` types; MINOR version bump.

**File(s):**
- `CONSIDERED_PURCHASE_ONTOLOGY.md` — §4.9.1 bridge table, version bump
- `MARKET_INTELLIGENCE_ENGINE.md` — §3 cross-reference to CPO §4.9.1
- `LATAM_FEDERATION_ARCHITECTURE.md` — FP-07 L1 local shock extension cites bridge
- `FINANCIAL_INTELLIGENCE_ENGINE.md` — FX_MOVEMENT pass-through row
- `lib/mkie/cpo-shock-bridge.ts` — **new** — authoritative lookup at shock write time
- `content/ontology/shock-bridge.json` — **new** — machine-readable 6-row table

**Owner:** CPO Board chair · MkIE shock steward

**Effort:** 0.5 doc day · 1 eng day

**Dependency:** C-03 (calendar prevents misclassification before bridge lookup)

**Acceptance Criteria:**
- [ ] CPO §4.9.1 published with 6 rows including severity and learning policy
- [ ] SCDG edges cite CPO shock node; KA-09 stores MkIE class; bridge translates both directions
- [ ] Zero orphan MkIE shocks without CPO mapping path (extension or bridge)
- [ ] CPO version bumped MINOR (e.g. 1.0.0 → 1.1.0)

---

### C-05 — Engineering Binding Memo EB-001

**Description:** Publish EB-001 — `CPI-G-*` and `CPI-MN-*` are authoritative over source spec gate citations; legacy `G-0*` mapping table; violation is build defect.

**File(s):**
- `docs/governance/EB-001-engineering-binding-memo.md` — **new**
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — §7.4 or Appendix cites EB-001 enforcement
- `scripts/lint-gate-ids.mjs` — **new** — fail CI on legacy `G-0[1-9]` in `lib/` and `app/`
- `package.json` — add `lint:gates` script

**Owner:** Platform Engineering lead

**Effort:** 0.5 doc day · 0.5 eng day

**Dependency:** None (first item on critical path)

**Acceptance Criteria:**
- [ ] EB-001 in repo; referenced in engineering charter or README governance section
- [ ] Legacy ID → canonical mapping table complete (copy from Constitutional deprecation map)
- [ ] `npm run lint:gates` passes on current codebase
- [ ] ERRATA-001 (C-10) references EB-001 as enforcement mechanism

---

### C-06 — CRM Day-1 Constitutional Memo EB-002

**Description:** Publish EB-002 — CRM is financial system of record from Sprint 1; no intelligence promotion without close join.

**File(s):**
- `docs/governance/EB-002-crm-day1-memo.md` — **new**
- `SELF_IMPROVING_COMPANY_BLUEPRINT.md` — errata cross-ref (B2 phasing language superseded)
- `lib/crm/types.ts` — **new** — `CloseRecord` with required `sessionId`, `lost_reason`, `grossProfitTruth`
- `lib/crm/close-join.ts` — **new** — join rate calculator for CPI-G-COIE-10 / CPI-G-FIE-03
- `app/api/leads/route.ts` — propagate `sessionId` from client payload

**Owner:** Engineering lead · CoIE steward

**Effort:** 0.5 doc day · 2 eng days

**Dependency:** C-05

**Acceptance Criteria:**
- [ ] EB-002 published; states CRM truth required Day 1
- [ ] Lead API accepts and persists `sessionId` on all capture paths
- [ ] Close join metric computable against 95% threshold (C-11)
- [ ] ERE promotion path blocked when join rate below threshold (integration stub acceptable Sprint 1)

---

### C-07 — Genesis Quarter Freeze Policy EB-003

**Description:** Publish EB-003 — genesis quarter: LF-03 marginal only; LF-01 requires CEO + 2-week label rate trend.

**File(s):**
- `docs/governance/EB-003-genesis-freeze-policy.md` — **new**
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — Part 4 freeze appendix cross-ref
- `lib/governance/learning-freeze.ts` — **new** — LF-01/LF-03 precedence evaluator
- `EXECUTIVE_COPILOT.md` — errata note on genesis freeze behavior

**Owner:** CEO · CoIE steward

**Effort:** 0.5 doc day · 1 eng day

**Dependency:** C-05 · C-13 (Genesis Protocol defines provisional object rules)

**Acceptance Criteria:**
- [ ] EB-003 published with LF-03/LF-01 genesis rules
- [ ] Learning freeze evaluator rejects LF-01 without CEO attestation flag during genesis quarter
- [ ] CoIE incident log schema documents genesis freeze events

---

### C-08 — PathInstance Canonical Schema

**Description:** DECISION_GRAPH_SPEC PATCH — canonical `PathInstance` schema all channels emit (kiosk, voice, WhatsApp, consultant tablet); resolves H-P0-01 channel fragmentation.

**File(s):**
- `DECISION_GRAPH_SPEC.md` — §5 PathInstance PATCH (ordered edge list, channel, `pathInstanceId`)
- `types/path-instance.ts` — **new** — canonical TypeScript schema
- `lib/graph/path-instance.ts` — **new** — create, freeze, attach outcome
- `lib/analytics/trackEvent.ts` — emit `path_edge` events with `pathInstanceId`
- `lib/session/SessionProvider.tsx` — hold active `pathInstanceId`

**Owner:** Platform Engineering · CoIE steward (graph integrity)

**Effort:** 1 doc day · 3 eng days

**Dependency:** C-05

**Acceptance Criteria:**
- [ ] PathInstance schema documented with required fields: `pathInstanceId`, `sessionId`, `channel`, `edges[]`, `cpo_version`, `frozenAt?`
- [ ] Kiosk screen transitions append to same edge list format as conversation turns (schema parity)
- [ ] Unit test: two channels produce mergeable PathInstance objects given same `pathInstanceId`
- [ ] DECISION_GRAPH_SPEC §7 integrity rules reference PathInstance freeze on outcome

---

### C-09 — PCM canonicalSessionId Cross-Channel Join

**Description:** PCM PATCH — `canonicalSessionId` links async (WhatsApp) and floor (kiosk) sessions; satisfies H-P0-03.

**File(s):**
- `PHASE_X_CONVERSATIONAL_SALES_BRAIN.md` — PCM §7 PATCH: `canonicalSessionId` join rules
- `DECISION_GRAPH_SPEC.md` — session linkage cross-ref
- `lib/session/canonical-session.ts` — **new** — ID minting, async↔floor link, persistence
- `lib/whatsapp/buildWhatsAppLink.ts` — include `canonicalSessionId` query param
- `lib/session/SessionProvider.tsx` — expose `canonicalSessionId`
- `components/screens/TestDriveForm.tsx` — submit `canonicalSessionId` with lead

**Owner:** Platform Engineering · CIE lead

**Effort:** 0.5 doc day · 2 eng days

**Dependency:** C-08 (PathInstance uses `sessionId` / `canonicalSessionId`) · C-06 (CRM join)

**Acceptance Criteria:**
- [ ] WhatsApp deep link carries `canonicalSessionId`; floor session resolves same ID
- [ ] CPI-G-COIE-10 join test passes cross-channel (kiosk start → WhatsApp continue → CRM close)
- [ ] PathInstance records from both channels share `canonicalSessionId`
- [ ] PCM spec documents collision handling (shared phone, family devices)

---

### C-10 — Legacy Gate Errata Index ERRATA-001

**Description:** Publish ERRATA-001 — line-level mapping of all legacy `G-0*` references in engine specs to canonical `CPI-G-*` IDs; grep-complete.

**File(s):**
- `docs/governance/ERRATA-001-legacy-gate-index.md` — **new**
- `CONSIDERED_PURCHASE_ONTOLOGY.md` — line 338 `G-01` → CPI-G-COIE-09 (Phase B full text refresh)
- `COMPANY_INTELLIGENCE_ENGINE.md` — G-01 Data gate entries
- `EXECUTIVE_RECOMMENDATION_ENGINE.md` — G-01–G-05 entries
- `EXECUTIVE_COPILOT.md` — any legacy refs
- `scripts/lint-gate-ids.mjs` — verify errata coverage via grep audit output

**Owner:** Platform Engineering · Constitutional Architect

**Effort:** 1 doc day · 0.5 eng day (grep audit automation)

**Dependency:** C-05 (EB-001)

**Acceptance Criteria:**
- [ ] ERRATA-001 covers 100% of legacy `G-0*` hits in engine specs (grep-verified)
- [ ] Each errata row: file, line, legacy ID, canonical ID, status (indexed | patched)
- [ ] CI optional rule documented; `lint:gates` passes
- [ ] Full source doc text updates deferred to Phase B (B-5) — index sufficient for greenlight

---

### C-11 — Session-Join Threshold Harmonization (95%)

**Description:** Single 95% close-to-session join threshold everywhere — FIE §3.2 aligned with CPI-G-COIE-10 and CPI-G-FIE-03.

**File(s):**
- `FINANCIAL_INTELLIGENCE_ENGINE.md` — §3.2: change 85% → 95%
- `COMPANY_INTELLIGENCE_ENGINE.md` — session→CRM join table
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — confirm CPI-G-FIE-03 = CPI-G-COIE-10 = 95%
- `lib/crm/close-join.ts` — threshold constant `JOIN_RATE_THRESHOLD = 0.95`
- `lib/governance/gates/fie-gates.ts` — CPI-G-FIE-03 uses same constant

**Owner:** FIE steward · CoIE steward

**Effort:** 0.25 doc day · 0.5 eng day

**Dependency:** C-01 (FIE gates published)

**Acceptance Criteria:**
- [ ] Grep finds no 85% session join threshold in FIE or CoIE specs
- [ ] Single `JOIN_RATE_THRESHOLD` constant imported by FIE and CoIE gate evaluators
- [ ] P1-06 marked superseded in Perimeter Plan cross-ref

---

### C-12 — Privacy Steward Escalation Tree

**Description:** Constitutional v1.1 §3.3 — Privacy Steward parallel track after CoIE for KA-11 consent failures; escalate to Federation Architect if cross-node.

**File(s):**
- `CPI_OS_CONSTITUTIONAL_HARMONIZATION.md` — §3.3 escalation insert
- `INTELLIGENCE_ASSET_REGISTRY.md` — KA-11 consent governance cross-ref
- `CUSTOMER_DNA_ENGINE.md` — consent failure escalation path
- `lib/governance/escalation.ts` — **new** — Privacy Steward routing for CPI-G-DNA-03 failures
- `lib/privacy/consent-gate.ts` — **new** — household fragment consent check before genotype merge

**Owner:** Privacy Steward · CIE lead

**Effort:** 0.5 doc day · 1 eng day

**Dependency:** C-01 (v1.1 bundle)

**Acceptance Criteria:**
- [ ] §3.3 lists Privacy Steward with escalation to Federation Architect for cross-node consent
- [ ] Genotype merge blocked without consent flag (INV-28 enforcement in code path)
- [ ] Escalation event schema documented for CoIE incident log

---

### C-13 — CPO Genesis Protocol Appendix

**Description:** CPO appendix — provisional objects auto-active 90 days; promotion to `active` requires CPI-MN-CPO-ACTIVE OR floor sign-off packet.

**File(s):**
- `CONSIDERED_PURCHASE_ONTOLOGY.md` — Genesis Protocol appendix
- `lib/ontology/cpo-genesis.ts` — **new** — provisional→active promotion evaluator
- `content/ontology/cpo-release.json` — **new** — genesis v1.0.0 artifact with `floor_validation`

**Owner:** CPO Board chair · CoIE steward

**Effort:** 0.5 doc day · 1 eng day

**Dependency:** C-05

**Acceptance Criteria:**
- [ ] Genesis Protocol published with 90-day provisional rule and promotion paths
- [ ] SCDG learning accepts provisional CPO objects during genesis quarter
- [ ] Promotion blocked without minimum-N or floor sign-off per protocol
- [ ] EB-003 (C-07) references Genesis Protocol for freeze policy context

---

### C-14 — IBS Registry Inventory Footnote

**Description:** IBS §1.1 footnote — seven IEV core classes per §4.1; full estate inventory in Asset Registry KA-01–13 + SS-01.

**File(s):**
- `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` — §1.1 footnote PATCH
- `INTELLIGENCE_ASSET_REGISTRY.md` — reciprocal pointer in §1

**Owner:** Finance steward · CoIE steward

**Effort:** 0.25 doc day · 0 eng days

**Dependency:** C-02 (SS-01 registered)

**Acceptance Criteria:**
- [ ] IBS §1.1 footnote cites Asset Registry as canonical 13+1 inventory
- [ ] No narrative conflict between IBS seven classes and Registry thirteen assets
- [ ] P1-05 marked closed in Perimeter Plan cross-ref

---

### C-15 — Closure Board Re-Score ≥82

**Description:** Closure Board re-audit after C-01–C-14, C-16, C-17 complete; score ≥82 elevates status to **Certified For Engineering**.

**File(s):**
- `docs/governance/CPI_OS_CERTIFICATION_AMENDMENT.md` — **new** — score, date, signatories
- `CPI_OS_PERIMETER_COMPLETION_PLAN.md` — Phase A exit checklist marked complete

**Owner:** Closure Board chair · CEO

**Effort:** 1 process day (board session)

**Dependency:** C-01 through C-14 · C-16 · C-17

**Acceptance Criteria:**
- [ ] Closure Board score ≥ **82** documented
- [ ] Status elevation: Conditionally Certified → **Certified For Engineering**
- [ ] All Phase A exit criteria in Perimeter Plan §Phase A checked
- [ ] Assessment level: **Implementation Ready**

---

### C-16 — CPO Board Sign-Off on §4.9.1

**Description:** CPO Board formal sign-off on shock bridge table (C-04) before engineering uses bridge in production shock pipeline.

**File(s):**
- `docs/governance/signoffs/CPO-4.9.1-shock-bridge-signoff.md` — **new**
- `CONSIDERED_PURCHASE_ONTOLOGY.md` — `floor_validation.sales_director_signoff: completed`

**Owner:** CPO Board chair (Sales Director)

**Effort:** 0.25 process day

**Dependency:** C-04

**Acceptance Criteria:**
- [ ] Signed minute or signoff doc in repo with date and CPO version
- [ ] Bridge table locked for Sprint 1; changes require OCP
- [ ] C-15 bundle includes this artifact

---

### C-17 — CEO + CoIE Steward Sign-Off on EB-003

**Description:** Executive sign-off on genesis-quarter freeze policy before floor operations begin.

**File(s):**
- `docs/governance/signoffs/EB-003-genesis-freeze-signoff.md` — **new**

**Owner:** CEO · CoIE steward

**Effort:** 0.25 process day

**Dependency:** C-07 · C-13

**Acceptance Criteria:**
- [ ] CEO and CoIE steward signatures (or written approval) on EB-003
- [ ] Genesis quarter dates defined (start/end)
- [ ] C-15 bundle includes this artifact

---

# Phase B — Required Before Pilot

Operational implementations required for node-zero learning integrity and Domain C (MkIE) / Domain B (CoIE) attestation readiness. These extend Phase A artifacts into live operation — not new engines.

---

### B-01 — Gate Registry Runtime (RC-13)

**Description:** Software implementation of constitutional gate registry — weekly evaluation cycle, pass/fail persistence, ERE suppression hooks.

**File(s):**
- `lib/governance/gate-registry.ts` — expand from C-01 scaffold
- `lib/governance/gate-runner.ts` — **new** — weekly batch per §1.3 order
- `lib/governance/gates/coie-gates.ts` — **new**
- `lib/governance/gates/ere-gates.ts` — **new**
- `lib/governance/gates/mkie-gates.ts` — **new**
- `app/api/governance/gates/route.ts` — **new** — read-only gate status for CoIE dashboard

**Owner:** Platform Engineering

**Effort:** 5 eng days

**Dependency:** Phase A complete (C-01, C-05, C-10)

**Acceptance Criteria:**
- [ ] Weekly gate run produces `CompanyLearningReport.gate` block matching CoIE schema
- [ ] Failed CPI-G-COIE-01 restricts ERE to Executive Escalation only
- [ ] Gate results auditable for Domain B-01 attestation (92% pass rate computable)

---

### B-02 — KA-09 Market Shock Registry Operational

**Description:** Implement KA-09 shock registry with 24hr attestation (Domain C **C-02** attestation criterion), post-shock review scheduler (Domain C **C-04**), false attribution log (Domain C **C-03**).

**File(s):**
- `lib/mkie/shock-registry.ts` — **new** — KA-09 CRUD
- `lib/mkie/shock-attestation.ts` — **new** — CPI-G-MKIE-02 24hr SLA
- `lib/mkie/post-shock-review.ts` — **new** — 14-day post-expiry review
- `MARKET_INTELLIGENCE_ENGINE.md` — operational cross-ref only (no redesign)

**Owner:** MkIE shock steward

**Effort:** 4 eng days

**Dependency:** C-03, C-04

**Acceptance Criteria:**
- [ ] 100% S2+ shocks attested within 24 hr (Domain C C-02)
- [ ] 100% S2+ post-shock reviews within 14 days of expiry (Domain C C-04)
- [ ] False attribution log captures proof demotions during S2+ for quarterly audit (Domain C C-03)

---

### B-03 — MkIE Weekly Ops Log (Domain C C-01)

**Description:** MkIE ops log proving ≥90% of weeks with material internal Δ received MkIE review.

**File(s):**
- `lib/mkie/ops-log.ts` — **new**
- `lib/mkie/weekly-review.ts` — **new** — material Δ detection + review attestation
- `COMPANY_INTELLIGENCE_ENGINE.md` — Tier A artifact cross-ref

**Owner:** MkIE steward

**Effort:** 2 eng days

**Dependency:** B-02

**Acceptance Criteria:**
- [ ] Ops log export shows review coverage ≥90% for weeks with material Δ
- [ ] Material Δ definition documented (aligns MkIE §weekly ritual)

---

### B-04 — Customer DNA Shock Immutability Audit (Domain C C-05)

**Description:** Audit trail proving Customer DNA genotype never mutated by shock adjustment.

**File(s):**
- `lib/dna/genotype-audit.ts` — **new**
- `CUSTOMER_DNA_ENGINE.md` — audit schema cross-ref
- `lib/mkie/shock-registry.ts` — `learning_safe: false` flag enforcement

**Owner:** CIE lead · MkIE steward

**Effort:** 2 eng days

**Dependency:** B-02

**Acceptance Criteria:**
- [ ] DNA audit clean for trailing quarter — zero genotype mutations attributed to shock pipeline
- [ ] MkIE shock entries cannot write to DNA genotype fields (schema enforcement)

---

### B-05 — Board Pack MkIE Provenance (Domain C C-06)

**Description:** Executive Copilot / board pack Market context section sourced exclusively from KA-09 registry.

**File(s):**
- `EXECUTIVE_COPILOT.md` — board pack provenance rule (errata if needed)
- `lib/copilot/board-pack.ts` — **new** — MkIE registry-only market context block
- `EXECUTIVE_RECOMMENDATION_ENGINE.md` — CPI-G-ERE-03 shock declaration cross-ref

**Owner:** ERE owner · MkIE steward

**Effort:** 2 eng days

**Dependency:** B-02

**Acceptance Criteria:**
- [ ] Board pack market section cites KA-09 entry IDs only — no ad hoc narrative
- [ ] Provenance audit passes Domain C C-06

---

### B-06 — CPO Drift Weights or Qualitative Fallback (P1-01)

**Description:** Publish drift index coefficients OR disable numeric drift_index until N>2000.

**File(s):**
- `CONSIDERED_PURCHASE_ONTOLOGY.md` — §8.1 PATCH (`w1=0.35, w2=0.25, w3=0.25, w4=0.15`) OR qualitative-only flag
- `lib/ontology/drift-index.ts` — **new**

**Owner:** CPO Board chair

**Effort:** 0.5 doc day · 1 eng day

**Dependency:** C-13

**Acceptance Criteria:**
- [ ] No unpublished `w1`–`w4` in active OCP rhythm
- [ ] RC-10 closed

---

### B-07 — Experiment Genealogy production_config_ref (P1-03)

**Description:** KA-10 schema requires `production_config_ref` on every deploy; CoIE weekly audit.

**File(s):**
- `lib/experiments/genealogy.ts` — **new**
- `COMPANY_INTELLIGENCE_ENGINE.md` — registry schema cross-ref
- `lib/governance/config-lineage-audit.ts` — **new**

**Owner:** CoIE steward

**Effort:** 2 eng days

**Dependency:** C-08

**Acceptance Criteria:**
- [ ] Zero silent config changes in pilot quarter
- [ ] F-05 config lineage coverage ≥80% computable (Domain F, pre-FM-2)

---

### B-08 — FIE Finance Desk Outcome Loop (P1-10)

**Description:** FIE Appendix B — 5 F&I fields returned within 14 days; OIE queues pending.

**File(s):**
- `FINANCIAL_INTELLIGENCE_ENGINE.md` — Appendix B
- `lib/fie/finance-desk-loop.ts` — **new**
- `lib/crm/types.ts` — F&I outcome fields

**Owner:** FIE steward · Finance steward

**Effort:** 1 doc day · 2 eng days

**Dependency:** C-01, C-06

**Acceptance Criteria:**
- [ ] F&I closes return 5 required fields within 14 days or OIE escalation
- [ ] FIE L2 maturity criterion met (Assisted Margin Ledger operational)

---

### B-09 — SS-01 Media Readiness Gate (H-P0-04)

**Description:** Proof nodes require `media.knowledgeRef.ready=true` OR `experiment.genealogy.media_waiver`.

**File(s):**
- `lib/content/validator.ts` — proof node media gate
- `lib/media/manifest.ts` — `ready` flag enforcement
- `MOAT_ANALYSIS.md` — BL-14 cross-ref

**Owner:** Knowledge domain owner · CoIE steward

**Effort:** 1 eng day

**Dependency:** C-02

**Acceptance Criteria:**
- [ ] No `ready=false` media proofs in live SCDG learning path without waiver
- [ ] BL-14 production debt gated from proof efficacy

---

### B-10 — ERRATA-001 Source Spec Text Refresh (P0-05 completion)

**Description:** Apply ERRATA-001 line patches to all engine specs — replace legacy gate IDs in source text.

**File(s):**
- `CONSIDERED_PURCHASE_ONTOLOGY.md`
- `COMPANY_INTELLIGENCE_ENGINE.md`
- `EXECUTIVE_RECOMMENDATION_ENGINE.md`
- `EXECUTIVE_COPILOT.md`
- `docs/governance/ERRATA-001-legacy-gate-index.md` — status → patched

**Owner:** Constitutional Architect

**Effort:** 1 doc day

**Dependency:** C-10

**Acceptance Criteria:**
- [ ] Zero legacy `G-0*` in engine spec body text (grep-verified)
- [ ] ERRATA-001 all rows status = patched

---

### B-11 — First Quarterly Constitutional Review (Constitutional §5.4)

**Description:** Operational ritual — Federation Architect, CoIE, shock steward, CEO, CPO Board, GM publish domain evidence; board records certification status.

**File(s):**
- `docs/governance/quarterly-reviews/Q1-2026-constitutional-review.md` — **new** — template + first run
- `lib/governance/attestation-export.ts` — **new** — domain A–G evidence bundle generator

**Owner:** CEO

**Effort:** 1 process day (ritual) · 2 eng days (export tooling)

**Dependency:** B-01 through B-05

**Acceptance Criteria:**
- [ ] First Quarterly CPI-OS Constitutional Review completed per §5.4 ritual
- [ ] Domain evidence artifacts exportable for each attestation domain

---

# Phase C — Required Before FM-2

Second-node federation readiness — Domain D attestation and graph scale minimums.

---

### C-FM-01 — LATAM Federation L3 Vertical Pack Checklist (P1-07)

**Description:** Federation Appendix L3 — ontology kernel reuse checklist for vertical transfer (no new engine).

**File(s):**
- `LATAM_FEDERATION_ARCHITECTURE.md` — Appendix L3

**Owner:** Federation Architect

**Effort:** 0.5 doc day

**Dependency:** C-04, B-02

**Acceptance Criteria:**
- [ ] L3 checklist published with kernel reuse items only
- [ ] P1-07 closed

---

### C-FM-02 — La Paz Transfer Package (Domain D D-02)

**Description:** Child node launch with topology seed, zero weight clone — no parent weight merge.

**File(s):**
- `LATAM_FEDERATION_ARCHITECTURE.md` — §transfer protocol
- `lib/federation/transfer-pack.ts` — **new** — topology-only export
- `lib/federation/lineage-audit.ts` — **new** — D-02 pre-check

**Owner:** Federation Architect

**Effort:** 5 eng days · 2 ops days

**Dependency:** B-07, B-11 · ≥5,000 L0 edges (pilot threshold)

**Acceptance Criteria:**
- [ ] D-02 lineage clean — zero parent weight merge on child launch
- [ ] Transfer contamination audit = 0
- [ ] Child node SCDG starts with L0 topology, empty local weights

---

### C-FM-03 — CPI-MN-FED-EDGE-L1 Minimum-N (200 per edge class)

**Description:** La Paz node achieves 200 outcome-labeled edges per edge class before local weight authority.

**File(s):**
- `lib/federation/minimum-n.ts` — **new** — CPI-G-FED-01 evaluator
- `lib/graph/path-instance.ts` — edge class tagging

**Owner:** Federation Architect · GM La Paz

**Effort:** 12–18 months operational (architecture: 2 eng days)

**Dependency:** C-FM-02

**Acceptance Criteria:**
- [ ] CPI-G-FED-01 pass at La Paz for all active edge classes
- [ ] CPI-MN-FED-EDGE-L1 (200) met per Federation §3.2

---

### C-FM-04 — Cross-Node Cluster Hypothesis (Domain D D-06)

**Description:** Holdout-validated cross-node cluster test — accept or reject documented.

**File(s):**
- `lib/federation/cross-node-hypothesis.ts` — **new**
- `LATAM_FEDERATION_ARCHITECTURE.md` — §13 #7 cross-ref

**Owner:** Federation Architect · CoIE steward

**Effort:** 3 eng days · 1 quarter operational

**Dependency:** C-FM-02, C-FM-03

**Acceptance Criteria:**
- [ ] At least one cross-node cluster hypothesis tested with holdout report
- [ ] D-06 attestation evidence in quarterly review

---

### C-FM-05 — CPI-MN-FED-EXPORT-L0 (15,000 edges) + Holdout Promotions (Domain A A-01, A-02)

**Description:** L0 path corpus scale and 3+ holdout-validated proof promotions trailing 12 months.

**File(s):**
- `lib/graph/edge-export.ts` — **new** — L0 export eligibility check
- `lib/experiments/holdout-promotion.ts` — **new**

**Owner:** CoIE steward · GM Commercial

**Effort:** Operational (12–24 months) · 2 eng days tooling

**Dependency:** Phase B complete

**Acceptance Criteria:**
- [ ] ≥15,000 outcome-labeled L0 graph paths (A-01)
- [ ] ≥3 holdout-validated proof promotions trailing 12mo (A-02)

---

### C-FM-06 — FM-2 Attestation (Domain D D-01)

**Description:** Bolivia L1 sibling validated; divergent local weights accepted — FM-2 achieved.

**File(s):**
- `docs/governance/fm2-attestation.md` — **new**
- `LATAM_FEDERATION_ARCHITECTURE.md` — FM-2 criteria reference

**Owner:** Federation Architect · CEO

**Effort:** Process (board attestation)

**Dependency:** C-FM-02 through C-FM-05 · CPO ≥3 MAJOR versions (A-06)

**Acceptance Criteria:**
- [ ] FM-2 achieved per Domain D-01
- [ ] IEV_index ≥ 60 · MSI ≥ 0.5 (Phase C exit criteria)
- [ ] Assessment level: **Scale Ready (single-country federation)**

---

# Phase D — Required Before OEM Licensing

Commercial and institutional perimeter — Domain G and OEM diligence blockers.

---

### D-01 — License Derivative Clause Checklist (H-P0-05)

**Description:** Five-bullet license derivative clause checklist in active OEM/partner contract — graph license without derivative retention gap (MOAT §8 #1).

**File(s):**
- `CPI_OS_INVESTOR_DILIGENCE_FRAMEWORK.md` — Appendix: License Derivative Clause Checklist
- `docs/governance/oem/License-Derivative-Clause-Checklist.md` — **new**

**Owner:** CEO · Legal counsel

**Effort:** 2 legal days (no eng)

**Dependency:** C-FM-06 (FM-2 proven for negotiation leverage)

**Acceptance Criteria:**
- [ ] Checklist published (5 bullets minimum)
- [ ] At least one OEM/partner contract incorporates checklist or equivalent clauses
- [ ] H-P0-05 closed

---

### D-02 — Domains A–G GREEN × 2 Consecutive Quarters (L11 Certified)

**Description:** Full CPI-OS L11 Certified attestation per Constitutional §5.1 — all domains GREEN for 26 weeks including FM-2 in Domain D.

**File(s):**
- `docs/governance/l11-certification.md` — **new**
- `lib/governance/attestation-export.ts` — expand for investor pack

**Owner:** CEO · Closure Board

**Effort:** 6+ months operational evidence

**Dependency:** Phase C complete · Phase B attestation rails live

**Acceptance Criteria:**
- [ ] Domains A–G all GREEN for 2 consecutive quarters
- [ ] CPI-OS L11 Certified status recorded in board minutes

---

### D-03 — Capital Domain F Full Attestation (IEV ≥75, I-ROI medium+)

**Description:** IEV_index ≥75, I-ROI positive at medium confidence, assisted margin ≥25% GP, F-07 investor attribution sample.

**File(s):**
- `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` — §10 investor pack
- `lib/ibs/iev-calculator.ts` — **new**
- `lib/ibs/investor-pack-export.ts` — **new**

**Owner:** Finance steward · CoIE steward

**Effort:** 3 eng days tooling · 24+ months data

**Dependency:** B-08, B-07

**Acceptance Criteria:**
- [ ] IEV_index ≥ 75 with no CPI-G-IBS-01 disqualifier (F-01)
- [ ] I-ROI positive at medium confidence (F-02)
- [ ] Investor attribution sample available on request (F-07)

---

### D-04 — Executive Decision Corpus Scale (Domain E E-03)

**Description:** KA-13 rejection corpus ≥ CPI-MN-ERE-REJECTION-CORPUS (200 labeled decisions).

**File(s):**
- `EXECUTIVE_RECOMMENDATION_ENGINE.md` — corpus schema
- `lib/ere/decision-corpus.ts` — **new**
- `EXECUTIVE_COPILOT.md` — CPI-G-ERE-05 reject reason enforcement

**Owner:** GM · ERE owner

**Effort:** 2 eng days · 18+ months operational

**Dependency:** B-01, B-05

**Acceptance Criteria:**
- [ ] Rejection corpus ≥ 200 labeled decisions (E-03)
- [ ] CPI-G-ERE-05 compliance 100% on rejects (E-05)

---

### D-05 — External CPI-OS Category Validation (Domain G G-01)

**Description:** ≥1 partner or licensee uses CPI-OS / CPI language externally (contract or LOI).

**File(s):**
- `docs/governance/partner-loi-template.md` — **new**
- `MOAT_ANALYSIS.md` — G-01 cross-ref

**Owner:** CEO · Business development

**Effort:** Commercial (no eng)

**Dependency:** D-01, C-FM-06

**Acceptance Criteria:**
- [ ] Executed contract or LOI with CPI-OS language
- [ ] G-01 attestation evidence in board pack

---

### D-06 — MOAT §6 Federation Cross-Reference Editorial (RC-14)

**Description:** Update MOAT Palantir critique to reference LATAM Federation — doc drift fix only.

**File(s):**
- `MOAT_ANALYSIS.md` — §6 cross-reference PATCH

**Owner:** Constitutional Architect

**Effort:** 0.25 doc day

**Dependency:** None

**Acceptance Criteria:**
- [ ] MOAT §6 acknowledges federation architecture
- [ ] RC-14 closed

---

### D-07 — MSI ≥ 0.65 and OEM Brand Truth Governance (Domain G G-02)

**Description:** MSI at Y3 threshold; SS-01 OEM approval workflow operational for brand truth in Knowledge Library.

**File(s):**
- `INTELLIGENCE_BALANCE_SHEET_FRAMEWORK.md` — §12 MSI
- `FUTURE_STATE_ARCHITECTURE.md` — §3.3 OEM approval workflow implementation
- `lib/content/validator.ts` — OEM-approved domain flag

**Owner:** CoIE steward · OEM partner manager

**Effort:** 1 eng day · operational ongoing

**Dependency:** C-02, D-02

**Acceptance Criteria:**
- [ ] MSI ≥ 0.65 with clean CRM reconciliation
- [ ] OEM spec/price claims require OEM approval workflow in SS-01
- [ ] Assessment level: **Institutional Grade**

---

# Effort Summary

| Phase | Scope | Doc effort | Eng effort | Calendar |
|-------|-------|------------|------------|----------|
| **A — Sprint 1** | C-01…C-17 | 5–10 days | 8–12 days | 1–2 weeks |
| **B — Pilot** | B-01…B-11 | 2–3 days | 20–25 days | 0–12 months |
| **C — FM-2** | C-FM-01…C-FM-06 | 1 day | 12 days + ops | 12–24 months |
| **D — OEM** | D-01…D-07 | 2 days | 8 days + commercial | 24–36+ months |

**New engines introduced:** 0  
**Architecture redesign:** 0  

---

# Owner Roster

| Role | Phase A items | Phase B+ items |
|------|---------------|----------------|
| **Platform Engineering** | C-01, C-05, C-08, C-09, C-10, C-11 | B-01, B-07, C-FM-02 |
| **CoIE steward** | C-02, C-06, C-07, C-13, C-17 | B-03, B-07, B-11 |
| **MkIE shock steward** | C-03, C-04 | B-02, B-03, B-05 |
| **CPO Board chair** | C-04, C-13, C-16 | B-06 |
| **FIE steward** | C-01, C-11 | B-08 |
| **CIE lead / Privacy Steward** | C-09, C-12 | B-04 |
| **Federation Architect** | — | C-FM-01…C-FM-06 |
| **CEO / Closure Board** | C-15, C-17 | D-01, D-02, D-05 |

---

*End of CPI-OS Engineering Readiness Backlog v1.0*
