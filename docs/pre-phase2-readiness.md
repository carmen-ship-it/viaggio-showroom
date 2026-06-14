# Pre-Phase 2 Readiness Review

**Project:** Viaggio Digital Showroom  
**Client:** Viaggio Motors Bolivia · GAC Motor Bolivia  
**Market:** Santa Cruz de la Sierra, Bolivia  
**Launch vehicle:** GAC GS4 MAX  
**Review date:** June 2025  
**Scope:** Final production-readiness assessment before Phase 2 implementation  
**Inputs:** [architecture-review.md](./architecture-review.md), [customer-journey.md](./customer-journey.md), [screen-map.md](./screen-map.md), [technical-architecture.md](./technical-architecture.md), [conversion-strategy.md](./conversion-strategy.md), supporting docs

---

## Executive Summary

Viaggio Digital Showroom has **strong Phase 1 documentation**: persona-driven IA, 37-screen inventory (S01–S37), conversion funnel, JSON content architecture, and a candid [architecture review](./architecture-review.md) that correctly identifies Bolivia-specific gaps (Chinese-brand trust, WhatsApp-first, family co-decision, financing sensitivity). **No application code exists yet** — the repository is planning-only, with placeholder dealership data and content templates but no production media, testimonials, or financing bands.

### Go / No-Go Verdicts

| Milestone | Verdict | Rationale |
|-----------|---------|-----------|
| **7-day kiosk demo at Viaggio Motors** | **Conditional GO** | Achievable only with a **severely scoped vertical slice** (~14 screens), stock GAC media, 1–2 placeholder testimonials, mocked lead capture, and **no** live staff dashboard. Requires dedicated build team starting immediately and Viaggio sign-off on orientative financing ranges within 48 hours. |
| **90-day production launch** | **Conditional GO** | Architecture is extensible and P0 gaps are documented, but production readiness depends on closing **all P0 items** (trust arc, economics screens, staff handoff, content sprint, Supabase hardening). Without parallel content production and sales-floor workflow adoption, the platform will demo well but **fail operationally** — leads in Supabase with no consultant SLA, no CRM path, and stale compare/pricing data. |

**Bottom line:** Proceed to Phase 2 **after** stakeholder validation of the scoped MVP demo list below and a committed content/asset sprint. Do **not** treat the original 20-screen Phase 1 plan as sufficient; the architecture review’s 37-screen model reflects Bolivia market reality.

---

## 1. What Would Prevent Demo-Ready in 7 Days?

**Definition:** An impressive, self-guided kiosk walkthrough at Viaggio Motors that demonstrates product theater, trust handling, comparison, financing warm-up, and a conversion moment — **without** claiming full production ops.

### Top Blockers

| Rank | Blocker | Architecture tie | Impact |
|------|---------|------------------|--------|
| 1 | **Zero application codebase** | Technical architecture is documentation-only | Entire Next.js app, content loader, routing for 14+ screens must be built from scratch |
| 2 | **Trust content not produced** | P0-1 (S23, S24, S25); content-strategy still lists testimonials as “Phase 3” in places | Chinese-brand skepticism unaddressed → demo fails the core Santa Cruz value proposition |
| 3 | **No production media pipeline** | P0-6 (S22 Hero); no CDN/video strategy | Hero, attract loop (S01), and tour steps will look like a brochure without cinematic assets |
| 4 | **Placeholder commercial data** | P0-2 (S26); `dealership.json` has fake phone/address | Financing preview and WhatsApp handoff cannot use real Viaggio numbers without legal/commercial approval |
| 5 | **Kiosk environment undefined** | Performance targets assume local mini-PC | Hardware, network, kiosk shell, and on-site install not in repo scope |

### Secondary Blockers (7-day)

- **Staff dashboard (S35/S36)** — Realtime handoff is P0 for production but **optional for demo**; without it, “consultor ahora” is a dead end.
- **23 topics × 4 blocks** — Impossible to populate in 7 days; demo needs 6–8 topics max.
- **Supabase setup** — Can defer to localStorage/mock for demo; production path needs project + RLS.
- **Compare data accuracy** — One competitor comparison requires research sign-off (Corolla Cross or Tiggo 7).
- **Physical-digital bridge** — Windshield QR → S22 (P1-8) is high impact but needs print + floor coordination.

### Demo-Ready Mitigation Path

| Blocker | 7-day mitigation |
|---------|------------------|
| No code | Freeze scope to 14-screen path; reuse content-block renderer for all topic/trust screens |
| Trust content | Minimum: S25 FAQ (copy-only), S24 with showroom photos, **one** owner video or filmed consultant testimonial |
| Media | GAC official GS4 MAX pack + 1 Viaggio lifestyle shoot (half-day) |
| Commercial data | Viaggio provides: real WhatsApp, address, 3 trim price bands, 3 cuota ranges (24/36/48) with disclaimer |
| Staff handoff | Demo script: consultant stands by; S36 shows modal only; no S35 |
| Backend | `console.log` / JSON file leads; WhatsApp opens real `wa.me` link |

### Realistic 7-Day Demo Scope

If blockers 1–4 are not mitigated in parallel **day 1**, verdict flips to **NO-GO**.

---

## 2. What Would Prevent Production-Ready in 90 Days?

**Definition:** Live leads flowing to consultants, staff workflows operational, analytics actionable, content maintainable, kiosk stable on showroom floor — serving real Santa Cruz buyers including family decision cycles.

### Top Blockers

| Rank | Blocker | Architecture tie | Impact |
|------|---------|------------------|--------|
| 1 | **Content production at scale** | 23 topics, 4 tours, 4 trust screens, compare × 3, economics copy | ~100+ content blocks + video; Git-only workflow blocks marketing updates (P2 content ops) |
| 2 | **Staff operational layer incomplete** | P0-3 (S35, S36); CRM Phase 3 | Leads accumulate without assignment SLA; consultants revert to untrained manual follow-up |
| 3 | **P0 screen backlog (29 screens)** | S21–S37 additions | Building 37 screens + generic content engine in 90 days is aggressive for a small team |
| 4 | **Financing/trade-in/commercial accuracy** | P0-2, P0-7 | Wrong cuota ranges create legal/trust damage; bank partner logos and rates need monthly update process |
| 5 | **Session continuity for family decisions** | P0-5 (S33), P1-4 (S37) | Bolivia purchase cycle 7–21 days; idle reset without resume loses spouse alignment |

### Secondary Blockers (90-day)

| Blocker | Priority | Notes |
|---------|----------|-------|
| No rate limiting on anon Supabase inserts | P1 security | Spam leads / event noise |
| Analytics events underspecified (18 → 30+ events) | P0-9 | Cannot measure financing funnel or handoff SLA |
| Compare data quarterly updates — no owner | Content ops | Stale competitor specs erode Carlos credibility |
| No service worker / offline bundle | P1-10 | Showroom Wi-Fi outages kill kiosk |
| Multi-kiosk `device_id` not addressed | Dealership workflow | Cannot attribute sessions per kiosk |
| Pre-visit QR (S21) + campaign UTM | P0-4, P1-9 | Marketing cannot prove ROI from Instagram/WhatsApp ads |
| Test drive logistics + coordinator workflow | P0-10 | No-show rate stays high without S34 + WhatsApp confirm process |
| GAC Bolivia brand approval on objection FAQ copy | P0-1 | “Honest Chinese brand” narrative needs OEM alignment |

### Production-Ready Gate Criteria (90-day)

All must be true before calling production-ready:

1. **P0 screens implemented** with real content (not lorem ipsum) on trust and economics paths  
2. **S35 + S36 live** with consultant training and &lt;2 min handoff SLA  
3. **Lead workflow documented**: new → assigned → contacted within X hours → test drive confirmed  
4. **Minimum 3 local testimonials** on S23 (Equipetrol / Plan 3000 / Urubó preferred)  
5. **Financing bands** approved by Viaggio finance desk, updated monthly  
6. **Supabase production** with rate limits, backup, São Paulo region latency validated on-site  
7. **Kiosk runbook**: crash recovery, daily content sync, idle reset privacy audit  
8. **Baselines captured** in first 30 days per conversion-strategy success targets  

---

## 3. Highest-Risk Technical Decisions

| Decision | Risk | Priority | Mitigation |
|----------|------|----------|------------|
| **Content-driven generic renderer for 23+ topics** | One schema mismatch breaks build; slow iteration for marketing | P0 | Ajv CI gate on every commit; Storybook for content blocks; start with 8 topics, expand weekly |
| **Anonymous Supabase sessions with open anon insert RLS** | Spam leads, event flooding, cost overrun | P1 | Rate limit by `device_id` + IP on API routes; cap events/session; service role for staff reads only |
| **Supabase Realtime for S36 → S35 handoff** | Realtime channels untested on dealership network; fallback needed | P0-3 | Polling fallback every 5s; audible alert on consultant tablet; WhatsApp fallback on timeout |
| **SSG + local mini-PC vs Vercel** | Bolivia bandwidth; offline gaps during outage | P1-10 | Primary: local build served on LAN; P1 service worker for content bundle; cloud as staging only |
| **Session resume tokens (S37) in metadata** | Token leakage, PII retention, GDPR-style privacy | P1-4 | Opt-in only; short TTL (14 days); phone hash not stored in analytics; clear on request |
| **Git-only content ops (no CMS)** | Marketing blocked on dev deploys; compare/pricing stale | P2-2 | `contentVersion` in vehicle.json now; document content-only deploy pipeline; CMS API contract in Phase 3 |
| **Single `dealership.json` tenant** | GAC Bolivia expansion to La Paz/Cochabamba requires rework | P2-1 | Add `dealershipId` to session/lead schemas in Sprint 1 even if unused |
| **Framer Motion on kiosk** | jank on low-end mini-PC; accessibility | P1 | `useReducedMotion()` mandatory; perf budget &lt;200KB route JS; test on target hardware week 1 |
| **WhatsApp `wa.me` pre-fill only** | No server-side message log; attribution gap | P0 | Track `whatsapp_initiated` with session context; S32 rich bridge for family share |
| **18 event types → insufficient** | Blind to financing/trade-in/handoff funnel | P0-9 | Extend `conversion-event.schema.json` before Sprint 1; block merge without schema update |

---

## 4. Highest-Risk UX Decisions

| Decision | Risk | Bolivia / Santa Cruz context | Mitigation |
|----------|------|-------------------------------|------------|
| **Theme grid hub (S04) before hero (S22)** | Feels like brochure, not Tesla/Apple | Buyers expect to see the car first | **Default path: S03 → S22 → trust/explore**; S04 is secondary nav (P0-6) |
| **Persistent sticky CTA bar** | Breaks immersion; premature “test drive” before trust | Chinese-brand skeptics bounce | Contextual CTA emergence after 2+ trust signals (P1-2); sticky fallback only on S04/S08/S12 initially |
| **Welcome persona carousel (S02)** | Friction before product; family groups confused | First visit anxiety | Path choice: *Primera vez con GAC* vs *Ya investigué*; single-line persona intro (screen-map revision) |
| **Trust after desire for first-time visitors** | Sofía-led tour before Carlos erodes credibility | “Es chino” objection surfaces at compare, not before | Enforce trust threshold in journey logic; S22 exit *¿Es confiable?* → S23/S25 |
| **Idle reset clears session (S20)** | Spouse never sees progress; 7–21 day decision cycle broken | Family co-decision is norm | S20 offers S37 save before wipe (P1-4); S33 family share at conversion |
| **Compare without resale/TCO context** | Rational validation incomplete | Buyers decide on **cuota**, not MSRP | Pair S12 with S28 TCO and S26 financing; Carlos narration on resale topic |
| **Test drive form without logistics (S34)** | No-shows; “¿pueden venir mis hijos?” unanswered | Family test drives common | S34 before S14 mandatory on conversion path (P0-10) |
| **S16 static QR card vs S36 live handoff** | Consultant doesn’t know customer is ready | Floor ops failure | Deprecate S16 in UX flows; S36 primary in-dealership (P0-3) |
| **No group-viewing layout** | UI designed for single user | Couple + kids at kiosk | 2m readable type; a11y scale in S19; no tiny tap targets |
| **Pre-researched path skips trust entirely** | Over-correction for wrong segment | Some “investigadores” still need S25 FAQ | *Ya investigué* → S25 or S28, not straight to Sofía desire tour |

---

## 5. Highest-Risk Content Decisions

| Decision | Risk | Priority | Mitigation |
|----------|------|----------|------------|
| **Deferring local testimonials** | Fatal for Chinese OEM launch | P0-1 | Minimum 3 owner videos before public launch; barrio + occupation metadata; Equipetrol/Plan 3000 diversity |
| **Financing cuota ranges unpublished** | #1 kiosk question unanswered | P0-2 | Viaggio finance desk owns monthly JSON; disclaimer on every S26 view |
| **Honest compare vs Chinese competitors** | GAC marketing pushback; legal sensitivity | P1 | Pre-clear Tiggo 7 / Haval rows with GAC Bolivia; Carlos voice for “ellos ganan” rows |
| **Resale value topic absent or vague** | Top SUV objection in Santa Cruz | P0-8 | Add `resale-value` topic; honest depreciation framing in S25 + Carlos |
| **Placeholder dealership facts** | Trust destroyer if wrong | P0 | Replace `[Dirección]` and `+59100000000` in templates before any public demo |
| **23 topics at launch** | Quality dilution; production never finishes | Content strategy | Phase 2 launch: 8 core topics + 4 trust screens; add 3 topics/sprint |
| **Compare data quarterly with no owner** | Stale specs → Carlos credibility loss | Content ops | Named owner at Viaggio + GAC; calendar reminder; `contentVersion` bump |
| **Diego lifestyle without local shoots** | Generic stock feels inauthentic | Bolivia localization | Half-day Santa Cruz shoot: Warnes road, Doble Vía, 35°C cabin scenario |
| **Objection FAQ without service bay proof** | “¿Viaggio responde post-venta?” unanswered | P0-1 | S24 requires taller video + certified technician callout |
| **Testimonials as Phase 3 in content-strategy** | **Contradicts architecture review P0** | P0 | Reconcile docs; block launch until S23 populated |
| **Voice inconsistency across 100+ blocks** | Persona magic lost | Voice strategy | Copy review checklist per persona; Carlos never sells, Sofía never warrants |

---

## 6. Which Screens Should Be Included in the MVP Demo?

**Goal:** 7-day kiosk walkthrough at Viaggio Motors — impress stakeholders and a real customer, not full platform.

### MVP Demo Screen List (14 screens)

| ID | Screen | Role in demo | Content minimum |
|----|--------|--------------|-----------------|
| S01 | Attract Loop | Floor draw | 1 loop video, 15–30s |
| S02 | Session Welcome | Path routing | First-time vs pre-researched choice |
| S03 | Vehicle Selector | GS4 MAX entry | Hero card only; coming-soon teasers OK |
| S22 | Immersive Vehicle Hero | **Product theater** | Full-bleed imagery + 3 hot-spots → 2 topics |
| S25 | Objections & FAQ | Trust without full S23 | 5 accordion items, copy-only OK |
| S24 | Viaggio & GAC Trust Story | Local + OEM credibility | Showroom photos + 1 service clip |
| S06 | Guided Tour Player | Narrative | **Carlos Trust tour only** (shortened to 5 steps) |
| S08 | Topic Deep Dive | Feature proof | 2 topics: ADAS + family space |
| S11 | Compare Hub | Validation entry | 1 competitor pre-selected |
| S12 | Compare Detail | Decision support | Corolla Cross or Tiggo 7 — one complete table |
| S26 | Financing Preview | Cuota warm-up | 2 trims × 3 plazos, Viaggio-approved ranges |
| S13 | Conversion Hub | Session recap + paths | Simplified recap |
| S14 | Test Drive Form | Lead capture | Mock submit OK for demo |
| S15 | WhatsApp Handoff | Bolivia-primary CTA | Real Viaggio WhatsApp number |

### Global overlays (include)

| ID | Screen | Demo note |
|----|--------|-----------|
| S20 | Idle Reset Prompt | Required for shared kiosk hygiene |
| S19 | Settings / A11y | Text size toggle for floor demo |

### Explicitly exclude from 7-day demo

S04 Hub (use S22 as hub), S05 tour picker (direct to S06), S07 themes, S09 gallery, S10 specs, S16 card, S17 full config, S18 summary, S21 pre-visit, S23 (unless 1 video ready), S27–S31, S32 bridge, S33 share, S34 logistics, S35–S37, S28 TCO, S29 warranty deep-dive, S30 configurator.

**MVP demo screen count: 14 core + 2 overlays = 16 touchable states**

---

## 7. Which Screens Should Be Postponed Until Phase 3?

| ID | Screen | Rationale for Phase 3 |
|----|--------|----------------------|
| S17 | Configurator (full) | P2; S30 Configurator Lite covers desire-building for Phase 2 |
| S21 | Pre-Visit QR Landing | High value but mobile + UTM infra; kiosk-first launch can defer 4–6 weeks if marketing accepts attribution gap (P0-4 tradeoff) |
| S31 | Comparison Shortlist | P1; single compare path sufficient until multi-competitor analytics justify complexity |
| S32 | WhatsApp Bridge (rich) | P1; S15 basic pre-fill OK until share/compare enrichment needed |
| S37 | Post-Visit Resume | P1; requires token infra, privacy policy, WhatsApp follow-up templates — critical for family cycle but not day-one kiosk |
| S09 | Media Gallery (standalone) | P1; inline media in S08/S22 adequate initially |
| S10 | Specifications | P1; power-user escape hatch; topics + compare cover 90% of questions |
| S16 | Consultant Handoff Card | Superseded by S36; keep print fallback only |
| — | Voice-over narration | P2-4; text narration sufficient Phase 2 |
| — | Admin CMS | P2-2; Git workflow + content deploy pipeline first |
| — | Full CRM bidirectional sync | P2-3; CSV/webhook export minimum in Phase 2 |
| — | English locale | P2-6; es-BO only for Santa Cruz launch |
| — | AR / visualizer | P2-7 |
| — | A/B testing infrastructure | P2-5 |
| — | Multi-dealer tenant UI | P2-1; schema only in Phase 2 |
| — | Referral / post-sale advocacy | Not in screen map; conversion strategy Phase 3 |
| — | Trade-in photo upload | S27 Phase 2 captures text; photo on Phase 3 |
| — | Accessory/package offers | content block type future |

**Note:** S21, S33, and S37 are **architecturally P0** for full Bolivia market fit. Postponing them to Phase 3 is a **conscious tradeoff** acceptable only for a kiosk-only Phase 2 launch — not for a marketing-integrated or family-decision-optimized launch.

---

## 8. Recommended MVP Screen List — Dealership Demonstration

**Audience:** Viaggio sales manager, GAC Bolivia marketing, live customer on showroom floor  
**Duration:** 12–18 minute scripted walkthrough + 5 min free exploration  
**Hardware:** 1920×1080 touch kiosk, consultant standing by (S36 mocked)

### Recommended Path

```
S01 → S02 (Primera vez) → S03 → S22 → S25 → S24 → S06 (Carlos, 5 steps)
  → S08 (ADAS) → S11 → S12 → S26 → S13 → S14 → S15
```

### Screen-by-Screen Demo Script Intent

| Step | ID | Demo talking point (consultant / narrator) |
|------|-----|---------------------------------------------|
| 1 | S01 | *“El kiosk invita sin presión — tocá cuando quieras.”* |
| 2 | S02 | Path choice proves respect for pre-research vs first-time GAC |
| 3 | S03 | GS4 MAX as hero; future models teased |
| 4 | S22 | **Peak moment** — product theater, hot-spots, link to physical floor vehicle |
| 5 | S25 | Address *“es chino”* openly — FAQ accordion |
| 6 | S24 | Viaggio local + GAC global — taller, map, years in market |
| 7 | S06 | Carlos trust tour — warranty, repuestos, Santa Cruz service |
| 8 | S08 | One deep topic — ADAS for safety-minded buyer |
| 9 | S12 | Honest compare — show *“Ellos ganan / Nosotros ganamos”* |
| 10 | S26 | Cuota orientativa — *“El precio exacto te lo confirma tu consultor”* |
| 11 | S13 | Recap — topics viewed, compare summary |
| 12 | S14 → S15 | Test drive intent → WhatsApp with context |

### MVP Screen Count Summary

| Category | IDs | Count |
|----------|-----|-------|
| Entry & product theater | S01, S02, S03, S22 | 4 |
| Trust | S24, S25 | 2 |
| Education | S06, S08 | 2 |
| Validation & economics | S11, S12, S26 | 3 |
| Conversion | S13, S14, S15 | 3 |
| System | S19, S20 | 2 |
| **Total demo surfaces** | | **16** |

### Optional “wow” additions if time permits (+2–4 days)

| ID | Addition |
|----|----------|
| S23 | Even 1 local testimonial video transforms trust arc |
| S28 | TCO calculator — strong for financing-sensitive buyers |
| S34 | Test drive logistics — reduces “¿qué llevo?” friction |
| S30 | Color swatch — desire moment before S13 |

---

## 9. Recommended Phase 2 Implementation Order

**Assumption:** 90-day horizon · 2-week sprints · 1–2 engineers + parallel content producer · dependencies noted

### Sprint 0 — Foundation (Week 1)

| Deliverable | Screens / infra | Dependencies |
|-------------|-----------------|--------------|
| Next.js 15 scaffold, Tailwind tokens, VehicleShell | — | None |
| Content loader + Ajv CI | — | Schemas in `docs/schemas/` |
| Supabase project (São Paulo), `sessions`, `analytics_events`, `leads` | API: `/api/sessions`, `/api/analytics` | Env vars, RLS policies |
| Extended event schema | P0-9 | Schema approval |
| `dealershipId` on session/lead metadata | P2-1 architect now | — |

**Exit:** CI green; blank S01 renders on dev kiosk viewport.

---

### Sprint 1 — Kiosk Entry & Product Theater (Weeks 2–3)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Attract + welcome + selector | S01, S02, S03, S20 | Attract video asset |
| Immersive hero | S22 | Hero imagery / 360; hot-spot → topic map |
| Idle reset + a11y | S20, S19 | — |

**Exit:** S01 → S03 → S22 happy path; idle reset works.

**Content parallel:** GAC official pack ingested; Viaggio address/WhatsApp finalized.

---

### Sprint 2 — Trust Arc (Weeks 3–4)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Social proof, trust story, objections, warranty | S23, S24, S25, S29 | **3+ testimonials**; taller video; FAQ copy approval |
| Hub as secondary nav | S04 | Trust quick links row |
| `resale-value` topic | S08 | Carlos copy |

**Exit:** First-time path S22 → S25/S23 → S29 completable.

**Content parallel:** Objection FAQ + warranty deep-dive copy; GAC Bolivia legal review.

---

### Sprint 3 — Education & Tours (Weeks 5–6)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Theme landing + topic renderer | S07, S08 | 8 launch topics minimum |
| Tour picker + player | S05, S06 | 3 tours (Trust, Family, Desire) |
| Generic content blocks | — | Templates from `docs/content/templates/` |

**Exit:** All 8 topics navigable; one full tour completable.

**Content parallel:** Diego Santa Cruz lifestyle shoot; 8 topics × 4 blocks.

---

### Sprint 4 — Validation & Economics (Weeks 7–8)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Compare hub + detail | S11, S12 | 3 compare targets researched |
| TCO calculator | S28 | Fuel defaults (YPF), insurance range |
| Financing preview + trade-in | S26, S27 | **Viaggio cuota bands**; bank logos |
| Configurator lite | S30 | Trim/color renders |

**Exit:** Compare → TCO → financing path live; lead enrichment fields on trade-in.

**Content parallel:** Compare quarterly data signed off; financing JSON monthly update process.

---

### Sprint 5 — Conversion & Family (Weeks 9–10)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Conversion hub | S13 | Session recap logic |
| Test drive logistics + form | S34, S14 | Extended lead schema P0-7 |
| WhatsApp handoff + bridge | S15, S32 | `buildWhatsAppLink()` |
| Family share | S33 | Share payload template |
| Session summary | S18 | — |
| Contextual CTA logic | P1-2 | Trust threshold rules |

**Exit:** Full conversion funnel; WhatsApp pre-fill with session context; family share generates link.

---

### Sprint 6 — Staff Operations (Weeks 10–11)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Staff dashboard | S35 | Supabase Realtime or polling |
| Live handoff | S36 | POST `/api/handoff` |
| Lead queue + claim workflow | S35 | Sales manager SLA definition |
| Consultant session mirror | S35 | Read-only customer route view |
| CSV lead export | — | Minimum CRM bridge |

**Exit:** Customer taps S36 → consultant tablet alerts within 2 min in floor test.

**Ops parallel:** Consultant training; shift handoff procedure documented.

---

### Sprint 7 — Pre/Post Visit & Hardening (Weeks 11–12)

| Deliverable | Screens | Dependencies |
|-------------|---------|--------------|
| Pre-visit QR landing | S21 | UTM/campaign metadata P1-9 |
| Post-visit resume | S37 | Resume token in session metadata |
| Comparison shortlist | S31 | Optional if ahead of schedule |
| Gallery + specs | S09, S10 | P1 polish |
| Service worker offline bundle | P1-10 | Kiosk network test |
| E2E Playwright (UF-01, UF-07) | — | Critical flows |
| On-site kiosk deploy + runbook | — | Hardware procured |

**Exit:** Production launch checklist complete; 30-day baseline measurement begins.

---

### Phase 2 Screen Delivery Summary

| Sprint | New screens | Cumulative |
|--------|-------------|------------|
| 0 | — | 0 |
| 1 | S01–S03, S19–S20, S22 | 7 |
| 2 | S04, S23–S25, S29 | 12 |
| 3 | S05–S08 | 16 |
| 4 | S11–S12, S26–S28, S30 | 22 |
| 5 | S13–S15, S18, S32–S34 | 29 |
| 6 | S35–S36 | 31 |
| 7 | S21, S31, S37, S09–S10 | 35–37 |

**S17 Full Configurator remains Phase 3.**

---

## 10. Recommended Asset Acquisition Checklist

### A. Photography

| Asset | Spec | Used on | Owner | Status |
|-------|------|---------|-------|--------|
| GS4 MAX hero — exterior 3/4 front | 4K min, WebP | S01, S22, S03 | GAC official + Viaggio | **Acquire** |
| GS4 MAX exterior — color variants (min 4) | Per trim/color | S30, S09 | GAC + local shoot if missing | **Acquire** |
| GS4 MAX interior — dashboard, rear seats, cargo | Lifestyle + detail | S08, S09, S22 hot-spots | GAC + Viaggio | **Acquire** |
| Viaggio Santa Cruz showroom exterior/interior | Authentic local | S24, S13 footer | Viaggio marketing | **Acquire** |
| Viaggio service bay / taller | Technician in frame | S24, S29 | Viaggio service mgr | **Acquire** |
| Diego lifestyle — family, Warnes road, Doble Vía | Santa Cruz recognizable | S08 family topics | Local photographer | **Acquire** |
| Comparison competitor imagery | Corolla Cross, Tiggo 7, Tucson | S11, S12 | Stock / OEM press | **Acquire** |
| Test drive route map graphic | Showroom → doble vía loop | S34 | Viaggio ops + designer | **Create** |

### B. Video

| Asset | Duration | Used on | Owner | Status |
|-------|----------|---------|-------|--------|
| Attract loop — GS4 MAX cinematic | 15–30s loop, silent OK | S01 | GAC marketing | **Acquire** |
| S22 hero ambient loop | 10–20s | S22 | GAC | **Acquire** |
| Carlos trust tour step clips | 5 × 15–30s | S06 | GAC + Viaggio overlay | **Acquire/edit** |
| Viaggio taller / service process | 45–60s | S24, S29 | Viaggio | **Produce** |
| Local owner testimonials | 3–5 × 30–60s | S23 | Viaggio customers | **Produce** — P0 blocker |
| ADAS / 360° demo clip | 15–30s | S08 ADAS topic | GAC | **Acquire** |
| GAC brand heritage reel | 30s | S24 | GAC Bolivia | **Acquire** |
| Pre-visit vertical clip | 15s silent | S21 | Edit from above | **Produce** |

### C. 360° / Interactive

| Asset | Spec | Used on | Priority | Status |
|-------|------|---------|----------|--------|
| GS4 MAX exterior 360 (or 24-frame spin) | Web-optimized | S22, S30 | P1 — static hero OK for demo | **Acquire if budget** |
| Interior panorama | Hot-spots optional | S22 interior spot | P2 | Defer |
| Windshield QR artwork | Links to S22 physical mode | Floor vehicle | P1-8 | **Print** |

### D. Copy & Narration (es-BO)

| Asset | Volume | Used on | Owner | Status |
|-------|--------|---------|-------|--------|
| Persona voice — Carlos/Sofía/Diego | Voice strategy audit | All S08, S06 | Copywriter + Viaggio | **Write** |
| Objection FAQ (5 categories) | ~800 words | S25 | Carlos + legal review | **Write** |
| Trust story — Viaggio + GAC | ~600 words | S24 | Marketing | **Write** |
| Warranty deep-dive | Coverage table + honest exclusions | S29 | Service mgr + Carlos | **Write** |
| 8 launch topics × 4 blocks | ~64 blocks | S08 | Content producer | **Write** — phased |
| 3 guided tours | Trust, Family, Desire | S06 | Copywriter | **Write** |
| Compare row copy × 3 competitors | 6 categories each | S12 | Research + Carlos | **Write** |
| Test drive logistics copy | Route, docs, family | S34 | Sales ops | **Write** |
| WhatsApp pre-fill templates | 4 intents | S15, S32 | Conversion strategy | **Write** |
| Family share summary template | 1-page | S33 | Marketing | **Write** |
| `resale-value` topic | Honest depreciation | S08, S25 | Carlos | **Write** |

### E. Testimonials & Social Proof

| Asset | Requirement | Used on | Status |
|-------|-------------|---------|--------|
| Owner video #1 | Equipetrol, professional, GS4 MAX 6+ mo | S23 | **Produce** |
| Owner video #2 | Plan 3000, family buyer | S23 | **Produce** |
| Owner video #3 | Urubó or Doble Vía commuter | S23 | **Produce** |
| Quote cards | Pull quote + barrio + km + trim | S23 | **Produce** |
| Stat: *“X familias en Santa Cruz”* | Verified with Viaggio sales | S23 | **Validate** |
| Third-party ratings | Latin NCAP, J.D. Power if available | S24, S25 | **Acquire permission** |

### F. Pricing, Financing & Commercial

| Asset | Detail | Used on | Owner | Status |
|-------|--------|---------|-------|--------|
| MSRP orientativo per trim | BOB, monthly review | S04 strip, S26, S30 | Viaggio sales | **Acquire** — placeholder today |
| Cuota ranges | 12/24/36/48 meses × trim | S26 | Finance desk | **Acquire** — P0 |
| Disclaimer legal | *Cuota referencial…* | S26, S28 | Legal | **Approve** |
| Bank partner logos | Authorized use | S26 | Viaggio partners | **Acquire** |
| Trade-in process FAQ | What to bring, timeline | S27 | Used car desk | **Write** |
| TCO defaults | YPF/Petrobras price, km/mes SC avg, seguro range | S28 | Finance + ops | **Define** |
| Inventory stat | *“X unidades en showroom”* | S04, S30 | Sales mgr weekly | **Operationalize** |
| Seasonal campaign copy | If launch promo | S21 | Marketing | **Optional** |

### G. Operational & Technical Assets

| Asset | Purpose | Owner | Status |
|-------|---------|-------|--------|
| Real WhatsApp Business number | S15, S32, S33 | Viaggio | **Replace placeholder** |
| Real showroom address + coordinates | S13, S24, maps | Viaggio | **Replace placeholder** |
| Kiosk hardware spec | 1080p touch, mini-PC | IT | **Procure** |
| Chromium kiosk shell config | Locked browser | IT | **Configure** |
| Supabase production project | Sessions, leads, events | Engineering | **Provision** |
| Consultant tablet(s) | S35 | Sales mgr | **Procure** |
| Windshield / tent QR print | S22, S21 | Marketing | **Print** |
| Content deploy runbook | Git → build → kiosk | Engineering | **Document** |
| Lead SLA playbook | new → contacted → test drive | Sales mgr | **Document** |

### Checklist Summary

| Category | Must-have before demo (7d) | Must-have before production (90d) |
|----------|---------------------------|-----------------------------------|
| Photography | Hero + 2 interior + showroom | Full color set + lifestyle + taller |
| Video | Attract loop + 1 trust clip | 3 testimonials + taller + tour clips |
| 360° | Optional (static OK) | Recommended for S22/S30 |
| Copy | S25 FAQ + 2 topics + compare 1 | 8 topics + 3 tours + all trust screens |
| Testimonials | 0–1 acceptable for demo | **3 minimum** |
| Pricing/financing | WhatsApp + 1 cuota band | Full trim matrix + monthly update process |
| Operational | Kiosk + real phone | S35/S36 + lead SLA + runbook |

---

## Appendix: Risk ↔ Priority Cross-Reference

| Architecture review ID | Theme | Addressed in sections |
|------------------------|-------|----------------------|
| P0-1 | Social proof, trust story, objections | 1, 2, 5, 6, 10 |
| P0-2 | Financing, trade-in, TCO | 1, 2, 4, 9 Sprint 4 |
| P0-3 | Staff dashboard, live handoff | 1, 2, 9 Sprint 6 |
| P0-4 | Pre-visit QR | 2, 7, 9 Sprint 7 |
| P0-5 | Family share | 2, 4, 9 Sprint 5 |
| P0-6 | Immersive hero | 1, 4, 6, 9 Sprint 1 |
| P0-7 | Extended lead schema | 2, 9 Sprint 5 |
| P0-8 | Resale-value topic | 2, 5, 9 Sprint 2 |
| P0-9 | Analytics events | 2, 3, 9 Sprint 0 |
| P0-10 | Test drive logistics | 2, 4, 9 Sprint 5 |
| P1-* | Configurator, CTAs, resume, search, offline | 3, 4, 7, 9 |
| P2-* | CMS, multi-dealer, CRM, voice, A/B, AR | 2, 3, 7 |

---

## Document Control

| Field | Value |
|-------|-------|
| Created | June 2025 |
| Author | Pre-Phase 2 readiness review (automated assessment) |
| Next action | Stakeholder session — validate MVP demo list + content sprint commitment |
| Related | [architecture-review.md](./architecture-review.md) · [screen-map.md](./screen-map.md) |

*This document is the single gate review artifact before Phase 2 implementation begins. No application code should be treated as production-ready until Section 2 gate criteria are met.*
