# Operations Gap Analysis

Cross-review of showroom architecture against [Dealership Operations Blueprint](./dealership-operations-blueprint.md).

**Inputs reviewed:**

| Document | Role in review |
|----------|----------------|
| [Dealership Operations Blueprint](./dealership-operations-blueprint.md) | Target operating model — lifecycle, SLAs, S35/S36, KPIs, Zoho |
| [Screen Map](./screen-map.md) | Planned 37-screen inventory (S01–S37) |
| [Pre-Phase 2 Readiness](./pre-phase2-readiness.md) | Build scope, P0 backlog, go/no-go gates |
| [Customer Journey](./customer-journey.md) | End-to-end buyer stages, family cycle, handoff moments |

**Review panel (lenses applied):**

| Lens | Primary question |
|------|------------------|
| **General Manager** | Can we run the floor, measure revenue, and hit SLAs? |
| **Sales Director** | Can consultants claim, prioritize, and close from the tablet? |
| **Customer Experience Director** | Does the journey support trust, family co-decision, and low friction? |
| **Product Owner** | Do screens, flows, data, and integrations form a coherent shippable system? |

**Current build state (June 2025):** Partial Next.js scaffold exists (~16 customer routes). S14 has a basic 2-field form (client-only, no backend). S13, S26, and most trust/economics screens are placeholders. **No `/staff` route, no S35/S36, no Supabase lead pipeline in production.** This analysis evaluates **planned architecture + blueprint fit**, and notes **implementation lag** where relevant.

---

## Verdict Summary

| Question | Verdict | Rationale |
|----------|---------|-----------|
| Does **documentation architecture** fully support the operations blueprint? | **Conditional GO** | Customer-facing screen inventory (S01–S37) covers ~80% of capture and journey needs. Staff layer (S35), data model, analytics, executive reporting, and CRM sync are **under-specified or misaligned** with the 9-status lifecycle. |
| Can Viaggio **operate on the floor today** using this system? | **NO GO** | S35/S36 not built; lead lifecycle actions absent; financing/trade-in/compare/family flows largely unimplemented; no CRM or SLA instrumentation. |
| Can Viaggio run a **scoped kiosk demo** without full ops? | **Conditional GO** | Aligns with [pre-phase2-readiness.md](./pre-phase2-readiness.md) — 14-screen vertical slice, mocked leads, consultant standing by manually. |
| Can Viaggio run **production showroom ops** per the blueprint? | **Conditional GO** | Achievable in ~90 days **only if** P0 gaps below are closed in Phase 2 sprints 5–6 and documentation contradictions resolved. Deferring S33/S37/S35 to Phase 3 **breaks** the operations blueprint for Santa Cruz. |

**Overall recommendation:** **Conditional GO** to continue Phase 2 build — **not** Conditional GO for operational deployment until P0 staff, lifecycle, family, and reporting gaps are closed.

---

## Architecture Alignment Scorecard

| Blueprint capability | Screen map | Customer journey | Pre-Phase 2 | Ops blueprint | Gap severity |
|----------------------|------------|------------------|-------------|---------------|--------------|
| 9-status lead lifecycle | ❌ Not in S35 spec | ✅ Stage 12 | ⚠️ Partial (4-status) | ✅ Full | **Critical** |
| S35 staff dashboard | ⚠️ High-level only | ✅ | ✅ Sprint 6 | ✅ Detailed widgets | **Critical** |
| S36 live handoff | ✅ Modal spec | ✅ | ✅ Sprint 6 | ✅ 2-min SLA | **Critical** (unbuilt) |
| Test drive ops (S34→S14→confirm) | ✅ | ✅ | ✅ P0-10 | ✅ Full process | **High** (unbuilt) |
| Financing readiness | ⚠️ S26 soft only | ✅ | ✅ Sprint 4 | ✅ 4-level model | **High** |
| Family co-decision (S33/S37) | ✅ P0/P1 split | ✅ P0 narrative | ⚠️ Deferrable to Ph3 | ✅ P0 ops | **High** (priority conflict) |
| Persona handoff brief | ❌ Not specified | ✅ | ❌ | ✅ Playbooks | **High** |
| Executive KPIs | ❌ No screen | ✅ Metrics table | ⚠️ Subset | ✅ D/W/M views | **Critical** |
| Zoho CRM integration | ❌ Phase 3 mention | ❌ | CSV Phase 2 | ✅ Full strategy | **High** |
| Compare + economics path | ✅ | ✅ | ✅ Sprint 4 | ✅ | **High** (unbuilt) |

---

## 1. Missing Screens

Screens **planned in screen-map but insufficient for operations blueprint**, or **not in screen-map at all**.

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-S01 | **S35 lacks detailed spec** for lifecycle actions, qualification checklist, follow-up scheduler, lost-reason modal, finance transfer, post-drive log, team availability, SLA banner, handoff brief panel | **P0** | Consultants cannot execute 9-status lifecycle; SLAs unmeasurable; blueprint playbooks have no UI | Expand S35 spec (or add **S35b Lead Detail**) with all consultant actions from blueprint §1 and §8; wire to lead status enum | **S35** (+ new **S35-Detail** panel) |
| GAP-S02 | **No executive / management analytics screen** for GM daily/weekly/monthly KPIs | **P0** | GM cannot review attribution, SLA compliance, or consultant scorecards without exporting raw data | Add **S38 Management Dashboard** (`/management` or Zoho reports + Supabase sync); minimum: sessions, leads by type, S36 SLA %, show rate, tier mix | **New S38** |
| GAP-S03 | **No finance-desk role view** — blueprint requires separate financing queue and transfer | **P0** | Finance Manager misses 4-hour SLA; credit-ready leads sit in general queue | S35 role-based tabs: **Sales** \| **Finance** \| **Coordinator**; or **S39 Finance Queue** | **S35**, **S39** (optional) |
| GAP-S04 | **No test-drive coordinator view** — vehicle prep, today’s slots, no-show tracking | **P1** | Wrong color unit prepped; no-shows not visible on floor | S35 **Coordinator tab**: today’s drives, stock check checklist, no-show flag | **S35** |
| GAP-S05 | **S26 hard financing lead form** (Mode B) not specified — only soft flag + S36 | **P0** | Purchase-intent buyers captured as anonymous flags; Finance Manager lacks contact data | Add S26 extension: nombre, teléfono, plazo, entrada chips → creates `financing` lead | **S26**, **S13** |
| GAP-S06 | **S33 mobile recipient view** underspecified — spouse limited view, “Tengo preguntas” CTA | **P0** | Family co-decision chain breaks after share; secondary decider invisible | Spec **S33-Mobile** (`/share/[token]`) with read-only summary + WhatsApp CTA; track opens | **S33** |
| GAP-S07 | **Presentation mode** referenced in customer journey (consultant-led) but no screen/state | **P1** | Consultant-assisted couples bypass welcome friction awkwardly | Add **S02-Presentation** state: skip path choice, jump S22/S08, link session to consultant ID | **S02**, **S35** |
| GAP-S08 | **Post-drive outcome capture** — journey stage 13 requires consultant log on S35 | **P1** | Show→sale funnel blind; post-drive 4-hour follow-up not triggered | S35 action: **Log test drive outcome** (completed / no-show / reschedule) | **S35** |
| GAP-S09 | **S11/S12 Compare** — routes exist in nav but no pages in screen-map implementation plan alignment | **P0** | Validation stage broken; compare-led Caliente leads impossible | Implement S11/S12 per screen-map; link to S34/S33 | **S11**, **S12** |
| GAP-S10 | **S23 Social Proof Hub** — P0 in map, excluded from 7-day demo, often unbuilt | **P0** | Trust stage fails for Chinese-brand objection; Carlos-heavy handoffs lack proof | Prioritize S23 in Sprint 2; 3 local testimonials minimum | **S23** |
| GAP-S11 | **S28 TCO, S27 Trade-in, S34 Logistics, S32 Bridge, S33 Share, S37 Resume** — documented P0/P1 but not in codebase | **P0** | Economics, family, and test-drive ops paths incomplete | Deliver per pre-phase2 Sprint 4–5; **do not defer S33/S34/S37** if ops blueprint is gate | **S27**, **S28**, **S32**, **S33**, **S34**, **S37** |
| GAP-S12 | **S21 Pre-Visit QR Landing** — P0 in map, deferrable in pre-phase2 §7 | **P1** | Marketing cannot attribute campaigns; pre-visit→showroom resume broken | Implement S21 Sprint 7 with UTM; link to S37 | **S21** |
| GAP-S13 | **S18 Session Summary** with S37/S33 opt-in — P1 in map | **P1** | End-of-visit capture missed; idle reset loses family progress | S18 before S20 reset; prompt share + resume | **S18**, **S20** |
| GAP-S14 | **S36 Handoff Brief** documented in blueprint §8 but not a distinct staff UI in screen-map | **P0** | Consultants see queue card only — no objections, talking points, persona affinity | Add **S35 Handoff Brief** drawer (triggered by S36 claim) with blueprint §8 fields | **S35**, **S36** |

---

## 2. Missing User Flows

Documented flows in [user-flows.md](./user-flows.md) lag screen-map and operations blueprint.

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-F01 | **No UF for 9-status lead lifecycle** on consultant tablet | **P0** | Status ownership matrix unenforceable | Add **UF-13 Lead Lifecycle** covering all transitions + SLAs | **S35** |
| GAP-F02 | **UF-03 / UF-08 still reference S16** static QR — not S36→S35 live handoff | **P0** | Training docs misroute consultants; 2-min SLA never practiced | Rewrite UF-03, UF-08 for S36 primary, S16 fallback only | **S36**, **S35**, **S16** |
| GAP-F03 | **No UF for S36 timeout → S32 WhatsApp fallback** | **P0** | Missed handoffs lose Caliente leads with no recovery | Add **UF-14 Handoff Escalation** at 60s/120s per blueprint | **S36**, **S32**, **S35** |
| GAP-F04 | **No UF for finance desk transfer** (consultant → Finance Manager) | **P0** | Financing Interest status orphaned | **UF-15 Finance Handoff**: S26/S35 transfer → finance queue → return to consultant | **S26**, **S35**, **S39** |
| GAP-F05 | **No UF for test-drive coordinator workflow** (claim → stock check → confirm → reminder) | **P0** | Blueprint §5 process not walkable | **UF-16 Test Drive Ops** end-to-end | **S34**, **S14**, **S35** |
| GAP-F06 | **Family decision flow** (S33 → spouse mobile → S37 → return visit) in journey variant E but no UF | **P0** | 60%+ SUV purchases involve spouse; ops cannot train | **UF-17 Family Co-Decision** | **S33**, **S37**, **S35** |
| GAP-F07 | **No UF for persona-based consultant approach** (Carlos/Sofía/Diego) | **P1** | Playbooks exist in blueprint but not in product flows | **UF-18 Persona Handoff** triggered from S35 brief | **S35**, **S08**, **S06** |
| GAP-F08 | **No UF for post-drive follow-up ≤ 4 hr** | **P1** | Show→sale conversion drops | **UF-19 Post-Drive** with S35 reminder + WhatsApp template | **S35** |
| GAP-F09 | **No UF for director reassignment / backup consultant** on SLA breach | **P1** | Single consultant bottleneck breaks Caliente SLA | **UF-20 Escalation** from S35 SLA banner | **S35** |
| GAP-F10 | **Pre-visit QR → kiosk resume** (journey variant D) — S21→S37 not in user-flows | **P1** | Campaign ROI and returning visitors untracked | **UF-21 Pre-Visit Resume** | **S21**, **S37**, **S02** |
| GAP-F11 | **Contextual CTA emergence** (screen-map § Global CTA) — no UF | **P1** | Premature test drive CTAs erode trust per pre-phase2 UX risk | **UF-22 Trust Threshold CTA** | **S04**, **S08**, **S12**, **S13** |
| GAP-F12 | **Lead scoring tier escalation on floor** (Tibio crosses 40 mid-session) — no alert flow | **P1** | Sales Director playbook “approach within 5 min” impossible | Live session tier badge + optional push when score crosses threshold | **S35** |

---

## 3. Missing Lead Capture Points

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-L01 | **S14 implemented with 2 fields only** (nombre, teléfono) — blueprint requires 8 fields | **P0** | Coordinator lacks time/passengers/retoma; lead score incomplete | Extend S14: día, hora, pasajeros, vehículo actual, primera GAC, retoma → S27 | **S14** |
| GAP-L02 | **No server-side lead persistence** — S14 client-only submit | **P0** | Zero operational leads; S35 has nothing to show | POST `/api/leads`; Supabase insert; offline queue | **S14**, **API**, **S35** |
| GAP-L03 | **Lead type `financing` missing** from lead schema | **P0** | Financing Interest status cannot be stored | Extend `lead.schema.json` + data-models enum | **S26**, **Schema** |
| GAP-L04 | **S36 handoff does not create lead record** in architecture | **P0** | Live handoffs invisible in queue/history | `staff_handoff_requested` → upsert lead type `consultant` | **S36**, **S35** |
| GAP-L05 | **S32 intent chips** (prueba / cuota / info / retoma) — S32 P1, often deferred | **P0** | WhatsApp leads lack qualification; consultants open cold | Implement S32; map chip to `metadata.intent` | **S32**, **S15** |
| GAP-L06 | **S33 share does not enrich lead** with `share_initiated` + secondary decider tag | **P1** | Family journey metrics and follow-up scripts fail | Event + optional phone of recipient; tag `decisor_secundario` | **S33**, **S35** |
| GAP-L07 | **S27 trade-in capture** not built | **P0** | High Santa Cruz retoma rate invisible to finance desk | Implement S27; attach to lead metadata | **S27**, **S14**, **S13** |
| GAP-L08 | **S30 configurator selections** not attached to leads | **P1** | Consultant repeats trim/color questions | Pass S30 state to S14/S35 lead card | **S30**, **S14**, **S35** |
| GAP-L09 | **Milestone capture prompts** (10+ min + depth → S36 offer) not specified in flows | **P1** | Caliente leads who don’t tap S36 missed | Contextual modal once per session per screen-map | **S04**, **S36** |
| GAP-L10 | **Form abandon tracking** (`test_drive_form_started` without submit) | **P1** | Tibio recovery playbook lacks trigger | Analytics event on S14 open/abandon | **S14**, **S35** |
| GAP-L11 | **S21 pre-visit optional phone capture** for resume | **P2** | Pre-visit leads not merged with in-dealership session | S21 optional field → S37 token + lead stub | **S21** |
| GAP-L12 | **S03 coming-soon WhatsApp interest** (UF-10) not wired to leads | **P2** | Future model demand uncaptured | `future_model_interest` event + lead type | **S03** |

---

## 4. Missing Financing Touchpoints

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-FN01 | **S26 placeholder only** — no cuota bands, plazo tabs, bank logos | **P0** | #1 floor question unanswered; blueprint financing readiness model idle | Content-driven cuota JSON; interactive S26 per screen-map | **S26** |
| GAP-FN02 | **S28 TCO calculator not built** — affordability concern signal missing | **P0** | Cannot detect “no sé si me alcanza” digitally | Implement S28; default YPF/km Santa Cruz | **S28** |
| GAP-FN03 | **S28 → S26 bridge** (“Ver cuota con este uso”) not in screen-map CTAs explicitly | **P1** | Product→financing transition friction | Deep-link S26 with TCO metadata | **S28**, **S26** |
| GAP-FN04 | **Financing readiness badges on S35** (curiosity / concern / intent / urgency) not specified | **P0** | Finance Manager and consultant lack shared signal language | Compute readiness from events; show on lead card + handoff brief | **S35** |
| GAP-FN05 | **Compare price row → S26 CTA** missing on S12 | **P1** | Validation-stage financing entry lost | Inline *"Ver cuota orientativa"* on Precio row | **S12**, **S26** |
| GAP-FN06 | **S27 + S26 bundled handoff** to finance desk not flow-documented | **P0** | Retoma + cuota deals require two human hops | Single S35 **Transfer to finance** with both payloads | **S27**, **S26**, **S35** |
| GAP-FN07 | **Post-test-drive financing path** (journey stage 13) — no digital prompt | **P1** | Physical confirmation moment misses credit conversation | S35 post-drive template triggers finance if TCO/S26 viewed | **S35** |
| GAP-FN08 | **Monthly cuota content update process** — ops only, no screen/admin | **P1** | Stale rates = legal/trust damage | Document owner + `contentVersion`; optional admin note on S26 | **S26**, **Content ops** |
| GAP-FN09 | **S14 retoma field → S27 pre-fill** not implemented | **P0** | Trade-in signal lost at highest-intent capture | Conditional S27 deep link on retoma=sí | **S14**, **S27** |

---

## 5. Missing Consultant Tools

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-C01 | **S35 Staff Dashboard not built** (`/staff` absent) | **P0** | Entire operations blueprint non-functional on floor | Sprint 6 deliverable per pre-phase2 | **S35** |
| GAP-C02 | **S36 Live Handoff modal not built** | **P0** | No real-time floor signal; 2-min SLA impossible | Sprint 6; POST `/api/handoff` + Realtime/polling | **S36** |
| GAP-C03 | **Session mirror** (join customer screen read-only) — spec only | **P0** | Consultant approaches blind | S35 **Join session** → mirror route + current screen | **S35** |
| GAP-C04 | **Handoff brief**: objections detected, talking points, persona % — blueprint §8, not in screen-map | **P0** | Playbooks not operationalized | Auto-generate brief from session analytics | **S35**, **S36** |
| GAP-C05 | **Lead scoring tier (Frío/Tibio/Caliente) on S35** — blueprint §6, partial in conversion-strategy | **P0** | Queue sort order cannot run | Compute `lead_score` server-side; display tier badges | **S35** |
| GAP-C06 | **Qualification checklist** (Engaged → Qualified) | **P0** | BANT-lite confirmation not recorded | S35 checkbox panel: budget band, timeline, vehicle confirmed | **S35** |
| GAP-C07 | **Follow-up scheduler with ±15 min reminders** | **P0** | Follow-Up Scheduled SLA unmeasurable | S35 datetime picker + push/WhatsApp reminder | **S35** |
| GAP-C08 | **Close lost with reason codes** | **P0** | CX quarterly pattern review impossible | Modal: Price / Financing denied / Competitor / Timing / No response / Other | **S35** |
| GAP-C09 | **WhatsApp templates from S35** (confirm, post-drive, S33 link) | **P1** | Phase 1 manual copy error-prone | Template buttons opening `wa.me` with session context | **S35** |
| GAP-C10 | **Team availability board** (Available / With customer / On drive) | **P1** | Backup consultant routing manual | S35 status toggle per consultant | **S35** |
| GAP-C11 | **Audible + visual S36 alert** with 60s/120s escalation | **P0** | Missed handoffs during busy floor | Realtime + polling fallback per pre-phase2 | **S35** |
| GAP-C12 | **CSV lead export** — Phase 2 minimum CRM bridge | **P1** | GM/Sales Director daily pipeline review manual | S35 export + nightly job | **S35** |
| GAP-C13 | **Vehicle availability check** (DMS/manual list) on test-drive claim | **P1** | Wrong unit prepped | Coordinator field on lead: stock Y/N + color note | **S35** |
| GAP-C14 | **Director assign / reassign lead** | **P1** | Pool imbalance; SLA breaches | S35 admin action (Sales Director PIN) | **S35** |
| GAP-C15 | **Consultant notes** on lead — mentioned in screen-map, not in data model | **P1** | Handoff continuity lost between shifts | `lead_notes` table or JSON array on lead | **S35**, **Schema** |

---

## 6. Missing Family-Decision Support

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-FM01 | **S33 Family Share not built** | **P0** | Spouse/co-decision chain broken; blueprint §6 non-functional | Sprint 5; WhatsApp + QR share payload | **S33** |
| GAP-FM02 | **S37 Session Resume not built** — pre-phase2 §7 allows Phase 3 deferral | **P0** | 7–21 day purchase cycle lost on idle reset; contradicts customer journey stage 14 | Elevate S37 to **P0 for ops launch**; S20 must offer save | **S37**, **S20**, **S18** |
| GAP-FM03 | **S33 mobile recipient limited view** not designed in screen-map detail | **P0** | Remote spouse sees broken layout or full kiosk | Mobile-optimized `/share/[token]` | **S33** |
| GAP-FM04 | **Secondary decider fields** absent from lead schema | **P1** | Consultant cannot track spouse name/reply | `metadata.secondary_contact`, tag `decisor_secundario` | **Schema**, **S35** |
| GAP-FM05 | **S35 alert when S37 resume or S33 link opened** by family member | **P1** | “Family active” playbook trigger missed | Notify assigned consultant on token open | **S37**, **S33**, **S35** |
| GAP-FM06 | **Group viewing / 2m readability** — S19 a11y not implemented | **P1** | Couple + children at kiosk; CX journey stage 3 requirement | Implement S19 text scale + high contrast | **S19** |
| GAP-FM07 | **S34 family welcome + S14 pasajeros=familia** linkage | **P1** | Family test drive ops underspecified | Pass pasajeros to coordinator checklist | **S34**, **S14**, **S35** |
| GAP-FM08 | **Diego milestone prompt → S33** after trust+compare not in CTA logic | **P1** | Family buyers not nudged to share | Contextual prompt when `preferred_persona=diego` + compare done | **S12**, **S13**, **S33** |
| GAP-FM09 | **Documentation priority conflict**: screen-map P0 S33 vs pre-phase2 “defer S33 to Phase 3” | **P0** | Team may build wrong sprint order | **Resolve in favor of operations blueprint** — S33 P0 for Santa Cruz launch | **Docs**, **S33** |

---

## 7. Missing Reporting Requirements

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-R01 | **Analytics schema has 18 events** — blueprint requires 30+ (financing, handoff, share, resume, TCO, etc.) | **P0** | Cannot measure SLA, financing funnel, or family journey | Extend `conversion-event.schema.json` per pre-phase2 P0-9 | **Schema**, **All** |
| GAP-R02 | **No `staff_handoff_requested` / claim time events** | **P0** | S36 SLA % unmeasurable | Events: `staff_handoff_requested`, `staff_handoff_claimed`, `staff_handoff_missed`, `staff_handoff_cancelled` | **S36**, **S35** |
| GAP-R03 | **No executive dashboard** (GM daily/weekly/monthly views) | **P0** | Blueprint §9 KPIs have no surface | **S38** or Supabase + Zoho dashboards | **S38** |
| GAP-R04 | **S35 daily stats widget underspecified** vs blueprint §7 widget catalog | **P1** | Sales Director shift huddle lacks single pane | Implement widget list: SLA clock, hot leads, handoff queue, financing queue, test drives today | **S35** |
| GAP-R05 | **Consultant scorecard** (claim time, qualify rate, show rate) | **P1** | Performance management manual | Weekly report from events + lead status transitions | **S38**, **S35** |
| GAP-R06 | **Test drive metrics** (show rate, no-show, post-drive ≤4 hr) | **P0** | Blueprint §5 targets not trackable | Events + S35 outcome log fields | **S35**, **S34** |
| GAP-R07 | **Campaign attribution** (`campaign_attribution`, S21 UTM) | **P1** | Marketing ROI unknown | UTM on S21; store in session metadata | **S21**, **Schema** |
| GAP-R08 | **Tier distribution reporting** (Caliente/Tibio/Frío) | **P1** | Lead scoring tuning impossible | Aggregate `lead_tier` at capture + EOD snapshot | **S35**, **S38** |
| GAP-R09 | **Sale attribution to showroom session** | **P2** | GM monthly review incomplete until CRM | Zoho custom field `digital_showroom_session_id` | **CRM**, **S38** |
| GAP-R10 | **Family journey metrics** (S33 send rate, secondary engagement, days to sale) | **P1** | CX Director cannot prove co-decision support | Events: `share_initiated`, `share_link_opened`, `share_whatsapp_reply` | **S33**, **S38** |
| GAP-R11 | **Lost reason analytics** | **P1** | Product/content fixes blind | Aggregate close-lost reasons from S35 | **S35**, **S38** |
| GAP-R12 | **Multi-kiosk `device_id` attribution** — noted in pre-phase2, not in analytics schema | **P1** | Cannot compare kiosk performance | Add `device_id` to session + events | **Schema**, **S35** |

---

## 8. Missing CRM Integration Requirements

| ID | Gap | Priority | Business impact | Recommended solution | Screen(s) affected |
|----|-----|----------|-----------------|----------------------|-------------------|
| GAP-CRM01 | **Lead status enum mismatch** — data-models: 4 states vs blueprint: 9 states | **P0** | Zoho sync mapping broken; ops lifecycle untrackable | Align schema to blueprint statuses + tags for concurrent financing/test drive | **Schema**, **S35** |
| GAP-CRM02 | **No Zoho field mapping in json-schemas / data-models** — blueprint §10 only | **P0** | Phase 3 integration rework risk | Add `docs/schemas/crm-sync.schema.json` or ADR with field map | **Schema**, **Docs** |
| GAP-CRM03 | **No webhook/API contract** for Supabase → Zoho | **P1** | Manual CSV only in Phase 2; delay and errors | POST lead on create/update; idempotent phone dedup | **API** |
| GAP-CRM04 | **No `assigned_to` / owner on lead** in SQL outline | **P0** | Consultant Assigned status non-functional | Add `assigned_to`, `assigned_at` on leads | **Schema**, **S35** |
| GAP-CRM05 | **No lost reason / close metadata** on lead | **P0** | Closed Lost pipeline hygiene fails | `closed_reason`, `closed_at`, `closed_by` | **Schema**, **S35** |
| GAP-CRM06 | **WhatsApp Business API integration** — Phase 3 only, no thread sync spec | **P1** | Duplicate outreach; no “WhatsApp activo” flag | Thread ID in lead metadata; S35 indicator | **S35**, **WhatsApp** |
| GAP-CRM07 | **Follow-Up Scheduled → Zoho activity/task** mapping not in data layer | **P1** | Reminders live only in S35 | Sync task due date to Zoho on schedule | **S35**, **Zoho** |
| GAP-CRM08 | **Phone dedup rule** (blueprint §10) not implemented | **P0** | Duplicate leads flood CRM and consultants | Normalize +591; merge session notes on match | **API**, **Supabase** |
| GAP-CRM09 | **Bidirectional status sync** (Zoho → Supabase) — Phase 3 | **P2** | Consultant sees stale status if deal updated in CRM | Webhook on Zoho deal stage change | **CRM** |
| GAP-CRM10 | **Financing Interest → Zoho sub-pipeline** | **P1** | Finance Manager pipeline invisible in CRM | Tag + custom module per blueprint §10 | **Zoho**, **S35** |
| GAP-CRM11 | **Attribution field** `digital_showroom Y/N` on Closed Won | **P2** | GM cannot report showroom ROI to GAC | Zoho deal field populated from session_id match | **Zoho**, **S38** |

---

## Documentation & Priority Conflicts (Product Owner)

These are **architecture process gaps** — not screens — but block ops alignment:

| Conflict | Documents | Resolution |
|----------|-----------|------------|
| S33/S37 deferrable to Phase 3 | pre-phase2 §7 vs customer-journey + ops blueprint | **Treat as P0 for operational launch** |
| S32 listed P1 in screen-map | ops blueprint WhatsApp bridge P0 | **Elevate S32 to P0** |
| S37 listed P1 in screen-map | ops blueprint family cycle | **Elevate S37 to P0** |
| UF-08 uses S16 | user-flows vs screen-map S36 | **Rewrite user-flows** |
| Lead 4-status vs 9-status | data-models vs ops blueprint | **Extend schema before Sprint 5** |
| S36 described as “consultant tablet” in blueprint §8 title | screen-map (S36 = customer modal) | **Rename to Handoff Brief on S35** (doc fix) |

---

## Implementation vs Plan Gap (Product Owner)

| Area | Planned (screen-map) | Built (repo) | Ops blueprint requirement |
|------|---------------------|--------------|---------------------------|
| Customer conversion | S13–S15, S32–S34 | S13 placeholder, S14 partial, no S15/S32/S34 | **Not met** |
| Staff ops | S35–S36 | None | **Not met** |
| Economics | S26–S28, S27 | S26 placeholder only | **Not met** |
| Family | S33, S37 | None | **Not met** |
| Compare | S11–S12 | Route only, no page | **Not met** |
| Trust | S23–S25, S29 | S25, warranty partial | **Partial** |
| Analytics / leads | Supabase + 30+ events | 18 events; no API | **Not met** |

---

## Top 10 Operational Risks

Ranked by combined likelihood × impact on Viaggio floor operations if launched without closing P0 gaps.

| Rank | Risk | Why it happens | Mitigation |
|------|------|----------------|------------|
| 1 | **Caliente leads go unclaimed** | S35/S36 unbuilt; no Realtime alerts | Sprint 6 P0; floor test with 2-min SLA |
| 2 | **Consultants repeat 15-min product pitch** | No session mirror or handoff brief | S35 join + auto talking points |
| 3 | **Test drive no-shows stay high** | S34/S14 incomplete; no WhatsApp confirm workflow | Full S34→S14→S35 confirm chain |
| 4 | **Financing questions stall floor** | S26 placeholder; no finance queue | Cuota bands + finance desk tab on S35 |
| 5 | **Family purchases lost after visit** | S33/S37 deferred or unbuilt | P0 family screens; S20 save before reset |
| 6 | **Leads in database, no human workflow** | Lead schema/status mismatch; no claim UI | 9-status model + S35 actions |
| 7 | **Wrong cuota/trust damage** | Stale S26 content; no monthly owner | Finance desk owns JSON; disclaimer |
| 8 | **GM flies blind on ROI** | No S38; incomplete analytics | Extend events + management dashboard |
| 9 | **CRM duplicate chaos** | No phone dedup; manual CSV | Dedup rule + webhook Phase 2b |
| 10 | **Showroom Wi-Fi / Realtime failure** | Untested dealership network | Polling fallback; offline lead queue |

---

## Recommended Phase 3 Backlog

Items **intentionally beyond Phase 2 ops launch** but required for scaled Viaggio + GAC operations. Ordered by stakeholder value.

| # | Item | Owner lens | Depends on |
|---|------|------------|------------|
| 1 | **Zoho bidirectional sync** — status, deals, activities, financing sub-pipeline | GM | Phase 2 lead schema stable |
| 2 | **WhatsApp Business API** — thread sync, templates, “WhatsApp activo” on S35 | Sales Director | Viaggio Business account |
| 3 | **S38 Executive Dashboard** — full GM/Sales/CX views with sale attribution | GM | CRM + event completeness |
| 4 | **S17 Full Configurator** — superset of S30 | CX Director | Media/asset pipeline |
| 5 | **Trade-in photo upload on S27** | Finance Manager | Storage + privacy policy |
| 6 | **Post-sale testimonial capture → S23 pipeline** | CX Director | Closed Won CRM trigger |
| 7 | **Referral / advocacy WhatsApp program** | GM | CRM + consent |
| 8 | **A/B testing** — Carlos-first vs Sofía-first, form length, CTA emergence | Product Owner | Analytics volume |
| 9 | **Admin CMS** — cuota bands, compare data, testimonials without Git deploy | Product Owner | contentVersion pattern |
| 10 | **Multi-dealer tenant** — La Paz / Cochabamba `dealershipId` | GM | Schema already flagged P2-1 |
| 11 | **English locale** | CX Director | es-BO launch stable |
| 12 | **AR / 360 spin** — S22/S30 enhancement | CX Director | Asset budget |
| 13 | **SMS fallback** for S37/S33 when WhatsApp fails | Sales Director | Local SMS provider |
| 14 | **Voice-over narration** on tours | CX Director | Studio budget |
| 15 | **Predictive lead score tuning** — ML on close rates by persona/topic | Product Owner | 90-day baseline data |

---

## Phase 2 Must-Complete List (Bridge to Operational GO)

Before changing verdict from **Conditional GO** to **GO** for floor operations, close these **minimum** items:

1. **S35 + S36** with handoff brief, claim, lifecycle actions, SLA indicators  
2. **S14 + S34** enriched capture + logistics  
3. **S26 + S28 + S27** economics path with financing readiness on S35  
4. **S32 + S15** WhatsApp bridge with QR fallback  
5. **S33 + S37 + S18/S20** family and resume chain  
6. **S11 + S12** compare validation path  
7. **Lead schema** — 9 statuses, `financing` type, `assigned_to`, lost reasons  
8. **Analytics** — 30+ events including handoff SLA and share/resume  
9. **S23** trust minimum (3 testimonials)  
10. **CSV or webhook** CRM bridge + consultant training runbook  

---

## Stakeholder Sign-Off Summary

| Stakeholder | Assessment |
|-------------|------------|
| **General Manager** | Architecture **does not yet** support weekly KPI review or sale attribution. Conditional on S38/events/CRM. |
| **Sales Director** | **Cannot** run queue, SLAs, or playbooks without S35/S36 and full S14. No GO for ops. |
| **Customer Experience Director** | Journey **design** is sound; **implementation and S33/S37 priority** must match Bolivia family cycle. |
| **Product Owner** | Screen map is ~80% sufficient; **expand S35 spec, add S38, align schemas and user-flows**, resolve pre-phase2 contradictions before Sprint 5. |

---

*Related: [Dealership Operations Blueprint](./dealership-operations-blueprint.md) · [Lead Capture Strategy](./lead-capture-strategy.md) · [Screen Map](./screen-map.md) · [Pre-Phase 2 Readiness](./pre-phase2-readiness.md) · [Customer Journey](./customer-journey.md)*
