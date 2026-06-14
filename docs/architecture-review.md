# Phase 1 Architecture Review

**Project:** Viaggio Digital Showroom  
**Scope:** GS4 MAX launch planning documentation  
**Review date:** June 2025  
**Reviewers (lens):** Tesla showroom design · Apple retail experience · Viaggio sales operations · GAC Bolivia marketing · Software architecture

---

## Executive Summary

Phase 1 documentation establishes a **solid content-driven foundation** — persona guides, theme-based IA, JSON schemas, and conversion CTAs are thoughtfully aligned with the Santa Cruz market. The vision of "digital first salesperson" is clear and differentiated from a brochure website.

However, the current plan **under-specifies the human-digital boundary**, **defers trust-critical features to Phase 3**, and **optimizes for content browsing over premium retail theater**. For a market with acute Chinese-brand skepticism, WhatsApp-first behavior, and family co-decision dynamics, several P0 gaps must be closed before implementation — not after launch.

### Top 10 Critical Weaknesses

| # | Weakness | Impact | Priority |
|---|----------|--------|----------|
| 1 | **No local social proof in Phase 1/2 scope** — testimonials deferred to Phase 3 | Trust deficit for GAC remains unaddressed at peak consideration moment | P0 |
| 2 | **Consultant handoff is a print card, not a live workflow** — no tablet dashboard, no session join, no floor notification | Sales floor cannot operationalize "pre-educated buyer" promise | P0 |
| 3 | **Financing and trade-in completely absent** — vision says consultants handle it, but no digital warm-up | Lost micro-conversions; customers leave kiosk with price anxiety unresolved | P0 |
| 4 | **Pre-visit QR journey deferred to Phase 3** — breaks attribution and family pre-alignment | Marketing cannot connect social → showroom; spouse never sees session before visit | P0 |
| 5 | **TCO / ownership cost calculator marked "future"** — yet Stage 6 of journey depends on it | Warranty views without cost context fail Bolivia financing-sensitive buyers | P0 |
| 6 | **Experience reads as themed content site, not retail theater** — grid of cards vs. hero product moments | Falls short of Tesla/Apple bar; feels like premium brochure | P1 |
| 7 | **Analytics events and dashboard underspecified for staff** — no funnel diagnostics, no lead queue, no consultant attribution | Sales manager cannot manage or improve the funnel | P1 |
| 8 | **Chinese-brand objection handling not structured** — buried in Carlos topics, no dedicated trust arc | Skepticism is #1 barrier; current IA treats it as one theme among eight | P1 |
| 9 | **Post-visit follow-up is optional Phase 3** — session data cleared on idle reset with no resume link | Leads decay; family decision cycle (days/weeks) unsupported | P1 |
| 10 | **Multi-dealer / content ops scalability gaps** — no CMS, no content versioning, single `dealership.json` | GAC Bolivia expansion beyond Viaggio Santa Cruz requires rework | P2 |

### Verdict

**Proceed to Phase 2 implementation only after incorporating P0 documentation updates** (see [customer-journey.md](./customer-journey.md) and [screen-map.md](./screen-map.md)). The architecture is extensible; the **experience specification is incomplete for Bolivia market reality and dealership operations**.

---

## Findings by Stakeholder Lens

### 1. Tesla Showroom Designer

**What works**
- Attract loop (S01) and self-paced exploration align with Tesla's no-pressure floor model
- Compare mode with honest verdicts avoids attack-ad patterns
- Vehicle-centric URL structure supports future model additions

**What fails the Tesla bar**
- **No product hero moment.** Tesla opens with the car — full bleed, minimal UI, spec callouts on the object. Current plan jumps from vehicle selector to an 8-card theme grid (S04). That is information architecture, not product theater.
- **Configurator demoted to P2.** At Tesla, color/trim selection is core desire-building. "Precio orientativo via consultant" is correct, but visual configuration must happen *before* conversion, not after.
- **Specs screen (S10) is a brochure pattern.** Tesla embeds specs contextually on the product, not in a separate tabbed table page.
- **No physical-digital bridge.** Docs never address how kiosk relates to the physical GS4 MAX on the showroom floor (beacon, QR on windshield, "touch to explore what's in front of you").
- **Sticky CTA bar on every screen** breaks immersion. Tesla surfaces "Schedule Drive" at natural decision points, not as persistent chrome.

**Recommendations**
- Add **Immersive Vehicle Hero (S22)** between selector and hub — 360° or cinematic hero with contextual hot-spots
- Promote **Configurator Lite (S30)** to P0 — color/trim visual only, price disclaimer
- Replace persistent sticky bar with **contextual CTA emergence** after trust thresholds (e.g., 3+ topics or tour step 5)
- Embed spec callouts in topic deep-dives; demote S10 to power-user escape hatch

---

### 2. Apple Retail Experience Designer

**What works**
- Three personas mirror Apple's specialist model (technical, creative, practical)
- Progressive disclosure via tours and themes
- Accessibility overlay (S19) shows inclusive intent
- Premium tone in voice strategy — no hard sell

**What fails the Apple bar**
- **No "session that travels."** Apple Store visits continue via email summary, pickup notifications, and Genius appointments. Here, idle reset **clears session** with resume only in Phase 3. Family co-decision in Bolivia requires a **shareable session artifact** now, not later.
- **Human handoff lacks Genius Bar equivalent.** S16 is a QR card. Apple has visible queue, specialist assignment, and continuity. Consultant tablet workflow is undocumented.
- **No skill/progression arc.** Apple Today sessions have beginning, middle, end with clear outcome. Tours exist but there's no "You're ready for X" milestone UX.
- **Welcome screen (S02) front-loads three personas** — Apple introduces help contextually when needed, not as a carousel upfront.
- **Missing delight moments** — no haptic/visual celebration on tour completion, compare verdict, or test drive confirmation.

**Recommendations**
- Add **Family Share Summary (S33)** — WhatsApp PDF/link with sections viewed, compare results, photos
- Add **Session Resume (S37)** with PIN or QR — survives idle reset opt-in
- Add **Consultant Live Handoff (S36)** — customer taps "Llamar consultor"; floor dashboard pings
- Introduce **milestone moments** at trust → desire → action transitions with subtle animation (not gamification)

---

### 3. Viaggio Motors Sales Manager

**What works**
- Clear scope separation: digital handles product, human handles financing/close
- Lead scoring concept and persona affinity tracking
- Test drive as primary KPI
- WhatsApp as primary channel — correct for Bolivia

**What fails dealership reality**
- **No financing preview.** Customers will ask "¿cuánto es la cuota?" before test drive. Sending them to a human without orientative ranges wastes consultant time on basic questions.
- **No trade-in pathway.** High percentage of Santa Cruz purchases involve trade-in. Zero capture mechanism.
- **Test drive form is too thin.** Missing: preferred time (not just day), WhatsApp confirmation preference, current vehicle, number of passengers, "first time at Viaggio?"
- **No test drive logistics screen.** Customers don't know: duration, route (doble vía loop?), what documents to bring, can family come?
- **Consultant dashboard Phase 3** — floor cannot see live sessions, lead queue, or handoff requests in Phase 2
- **No inventory/color hook.** "Unidades en showroom" mentioned in conversion strategy but no screen or content block spec
- **CRM handoff Phase 3** — leads sit in Supabase with no operational workflow definition
- **No shift handoff.** What happens when consultant A starts session and consultant B closes?

**Recommendations**
- Add **Financing Preview (S26)**, **Trade-In Intent (S27)**, **Test Drive Logistics (S34)** — all P0 for sales ops
- Add **Staff Dashboard (S35)** — minimum viable: live sessions, lead queue, handoff alerts (Phase 2, not 3)
- Extend test drive schema: time slot, trade-in yes/no, current vehicle free text
- Define **lead SLA workflow** in conversion strategy: new → assigned → contacted within X hours

---

### 4. GAC Bolivia Marketing Director

**What works**
- Content pillars weight reliability and safety appropriately
- Compare targets include Chinese and aspirational competitors
- Bolivia localization section in content strategy
- Persona voice aligned with brand elevation goals

**What fails marketing needs**
- **Social proof deferred to Phase 3** — fatal for Chinese OEM trust building
- **No brand story screen** separate from vehicle — GAC global scale, J.D. Power mentions, Latin America presence underdeveloped
- **No attribution architecture** — entry source is kiosk/qr/consultant but no UTM/campaign tracking for Instagram/Facebook ads
- **Pre-visit mobile deferred** — QR on social posts cannot deep-link into experience
- **Resale value topic missing** — top objection in Bolivia SUV segment, not in IA
- **No local testimonial content requirements** — template/schema absent
- **Share mechanics weak** — no WhatsApp share of specific topic or compare result
- **Event/promotion content blocks** exist in strategy but no screen for seasonal campaigns

**Recommendations**
- Add **Social Proof Hub (S23)**, **Viaggio & GAC Trust Story (S24)**, **Objections FAQ (S25)**
- Add topic: `resale-value` under reliability theme
- Add **Pre-Visit QR Landing (S21)** to Phase 2 scope with campaign params
- Extend `conversion-event.schema.json` with `campaignId`, `shareInitiated`, `financingPreviewViewed`
- Content template for local testimonial (video + text + neighborhood)

---

### 5. Software Architect

**What works**
- Content-driven multi-vehicle pattern is sound
- JSON Schema + build-time validation
- SSG for kiosk performance
- Anonymous sessions with privacy-conscious idle reset
- Offline analytics buffer planned

**Architecture weaknesses**

| Category | Issue |
|----------|-------|
| **Data model** | Single `dealership.json` — no multi-dealer tenant model |
| **Events** | 18 event types insufficient for new screens (financing, trade-in, share, staff) |
| **Session** | No resume token, no cross-device continuity |
| **Security** | RLS allows unrestricted anon insert — needs rate limiting spec |
| **Content ops** | Git-only workflow OK for Phase 2; no CMS path for marketing self-service |
| **Real-time** | No WebSocket/push spec for consultant notifications |
| **Search** | Phase 2+ — kiosk needs typeahead for 23+ topics at launch |
| **i18n** | es-BO only — no extraction architecture for UI strings |
| **Feature flags** | A/B tests mentioned but no flag infrastructure |
| **Media** | No CDN, image optimization, or video streaming strategy for Bolivia bandwidth |

**Recommendations**
- Add `dealershipId` to session/lead schemas for multi-dealer future
- Add `/api/handoff` and Supabase Realtime channel spec for consultant dashboard
- Define session resume token in `sessions.metadata`
- Document content versioning convention (`vehicle.json` `contentVersion`)
- P1: kiosk full offline bundle via service worker

---

## Architecture Weaknesses (Categorized)

### Experience Design
- Theme grid hub (S04) is brochure IA, not premium retail theater
- Persistent sticky CTA bar reduces immersion
- Welcome persona carousel adds friction before product
- No physical vehicle ↔ digital link
- Configurator and hero moments under-prioritized

### Trust & Credibility (Bolivia-Specific)
- Social proof absent from Phase 1/2
- Chinese-brand objections not structured as dedicated journey
- Resale value content missing
- Local testimonials no schema/template
- GAC global credibility underweighted vs. Viaggio local

### Conversion & Sales
- Financing preview absent
- Trade-in absent
- TCO calculator deferred
- Test drive capture incomplete
- No inventory/availability signal
- Price anxiety unaddressed between desire and CTA

### Human Handoff & Dealership Ops
- Consultant handoff is static card
- No staff dashboard in Phase 2
- No live notification architecture
- CRM integration too late (Phase 3)
- No lead assignment workflow
- No shift/consultant attribution

### Analytics & Attribution
- Staff cannot act on analytics in real time
- Missing events for new conversion paths
- No campaign/UTM attribution
- Funnel diagnostics underspecified
- No A/B test infrastructure
- Sale attribution relies on manual CRM match

### Content & Scalability
- 23 topics × 4 blocks = significant production burden with no CMS
- Compare data quarterly update — no ownership assigned in workflow
- EV themes noted but no architecture for mixed ICE/EV selector
- Design theme split across value/family — inconsistent
- No content freshness indicators on kiosk

### Technical & Future-Proofing
- Pre-visit mobile deferred
- Session resume deferred
- Multi-dealer not modeled
- Search deferred despite large topic count
- Service worker/offline content not specified

---

## Recommended Improvements (Prioritized)

### P0 — Must address before Phase 2 build

| ID | Improvement | Docs affected |
|----|-------------|---------------|
| P0-1 | Add Social Proof Hub, Trust Story, Objections FAQ screens + content requirements | screen-map, content-strategy, customer-journey |
| P0-2 | Add Financing Preview, Trade-In Intent, TCO Calculator screens | screen-map, conversion-strategy, data-models |
| P0-3 | Spec minimum viable Staff Dashboard + Live Handoff | screen-map, technical-architecture, user-flows |
| P0-4 | Promote Pre-Visit QR Landing to Phase 2 | screen-map, customer-journey, technical-architecture |
| P0-5 | Add Family Share Summary (WhatsApp) — not Phase 3 | screen-map, conversion-strategy |
| P0-6 | Add Immersive Vehicle Hero between selector and hub | screen-map, information-architecture |
| P0-7 | Extend lead schema: time slot, trade-in flag, current vehicle | schemas/lead.schema.json (note in review) |
| P0-8 | Add `resale-value` topic and warranty deep-dive screen | information-architecture, screen-map |
| P0-9 | Extend analytics events for financing, trade-in, share, staff actions | json-schemas, conversion-strategy |
| P0-10 | Define test drive logistics content + screen | screen-map, customer-journey |

### P1 — Include in Phase 2 scope if possible

| ID | Improvement |
|----|-------------|
| P1-1 | Configurator Lite (color/trim visual) promoted from P2 |
| P1-2 | Contextual CTA emergence vs. always-on sticky bar |
| P1-3 | Comparison Shortlist / save multiple competitors |
| P1-4 | Session Resume with PIN/QR after idle |
| P1-5 | Kiosk search/typeahead for topics |
| P1-6 | WhatsApp Bridge as dedicated mid-journey screen with rich context |
| P1-7 | Milestone celebration UX at journey transitions |
| P1-8 | Physical-digital bridge (QR on vehicle windshield) |
| P1-9 | Campaign attribution (UTM → session metadata) |
| P1-10 | Service worker for offline content bundle |

### P2 — Phase 3+ but architect now

| ID | Improvement |
|----|-------------|
| P2-1 | Multi-dealer `dealershipId` tenant model |
| P2-2 | Admin CMS for content self-service |
| P2-3 | Full CRM bidirectional sync |
| P2-4 | Voice-over narration for personas |
| P2-5 | A/B testing infrastructure |
| P2-6 | English locale for expat segment |
| P2-7 | AR/visualizer integration |

---

## Gap Analysis Tables

### 1. Missing Screens

| Screen | Purpose | Why missing hurts | Priority |
|--------|---------|-------------------|----------|
| S21 Pre-Visit QR Landing | Mobile entry from social/campaign | Breaks marketing attribution and family pre-alignment | P0 |
| S22 Immersive Vehicle Hero | Product theater first moment | Feels like brochure site, not Tesla/Apple | P0 |
| S23 Social Proof Hub | Local testimonials, owner stories | Chinese brand trust deficit | P0 |
| S24 Viaggio & GAC Trust Story | Dealership + OEM credibility | Skepticism blocks consideration | P0 |
| S25 Objections & FAQ | Chinese brand, parts, resale | Objections scattered, not addressable | P0 |
| S26 Financing Preview | Monthly payment orientative ranges | #1 question before test drive | P0 |
| S27 Trade-In Intent | Capture current vehicle for consultant | Standard Santa Cruz purchase path | P0 |
| S28 Ownership Cost Calculator | Fuel + maintenance + insurance TCO | Financing-sensitive market | P0 |
| S29 Warranty Deep-Dive | Immersive warranty/service story | Trust pillar buried in theme list | P0 |
| S30 Configurator Lite | Color/trim visual selection | Desire-building demoted too far | P1 |
| S31 Comparison Shortlist | Save 2–3 competitors to compare | Multi-competitor shoppers underserved | P1 |
| S32 WhatsApp Bridge | Rich context handoff mid-journey | Sticky button insufficient for family share | P1 |
| S33 Family Share Summary | WhatsApp session summary for spouse | Family co-decision unsupported | P0 |
| S34 Test Drive Logistics | Route, duration, documents, passengers | Reduces no-shows and anxiety | P0 |
| S35 Staff Dashboard | Live sessions, leads, handoffs | Sales floor cannot operationalize | P0 |
| S36 Consultant Live Handoff | Customer requests human now | Static QR card inadequate | P0 |
| S37 Post-Visit Resume | Continue session days later | Decision cycle is days/weeks | P1 |

**Original screens:** 20 (S01–S20)  
**New screens:** 17 (S21–S37)  
**Total:** 37 screens

---

### 2. Missing Sales Opportunities

| Opportunity | Current state | Recommended action |
|-------------|---------------|-------------------|
| Financing warm-up | Absent | S26 with bank partners, orientative cuota ranges |
| Trade-in capture | Absent | S27 intent form → lead enrichment |
| Upsell trim level | Trim topic only | S30 configurator shows feature diff → consultant quote |
| Accessory/packages | Not mentioned | Content block type: `package_offer` (future) |
| Inventory urgency | Mentioned in strategy only | Hero stat: "X unidades en showroom" content-driven |
| Cross-sell GAC models | Coming soon cards only | S31 compare shortlist includes GS8 when preview |
| Post-test-drive follow-up | Phase 3 | S37 resume + WhatsApp template |
| Referral | Not mentioned | Post-conversion "Recomendá a un amigo" (Phase 3) |
| Corporate/fleet | Not mentioned | FAQ entry + WhatsApp routing (P2) |
| Insurance partnership | Not mentioned | TCO calculator includes orientative seguro (P1) |

---

### 3. Missing Trust-Building Opportunities

| Opportunity | Current state | Recommended action |
|-------------|---------------|-------------------|
| Local owner testimonials | Phase 3 | S23 with video, barrio, occupation |
| Viaggio service bay proof | One topic (`local-service`) | S24 immersive tour of taller |
| GAC global credentials | One topic (`brand-heritage`) | S24 dedicated narrative |
| Third-party ratings | Not mentioned | Content: Latin NCAP, J.D. Power if available |
| Resale value | Not in IA | Topic `resale-value` + Carlos narration |
| Parts availability | Not explicit | Objections FAQ with stock proof |
| Years in market | Mentioned in strategy | Stat callout on S24, S13 |
| Physical address/map | Footer only | Interactive map on trust screens |
| Staff credentials | Not mentioned | "Técnicos certificados GAC" on S29 |
| Competitor honesty | Compare only | S25 FAQ: "Why Chinese brands improved" |

---

### 4. Missing Lead-Generation Opportunities

| Opportunity | Current state | Recommended action |
|-------------|---------------|-------------------|
| Pre-visit QR capture | Phase 3 | S21 with optional phone for resume link |
| Mid-journey WhatsApp | Sticky button only | S32 dedicated bridge with topic context |
| Family share | Phase 3 | S33 generates WhatsApp summary link |
| Trade-in lead | Absent | S27 |
| Financing interest flag | Absent | S26 "Quiero simular crédito" → lead type |
| Compare-driven lead | Compare CTA only | Auto-enrich WhatsApp with compare results |
| Coming soon models | WhatsApp notify Phase 3 | Capture interest on S03 for GS8/EMZOOM |
| Session resume opt-in | Absent | Phone capture on S37 for follow-up |
| Event/promo leads | Not structured | Campaign landing S21 variant |
| Consultant-initiated | Partial (UF-08) | S36 with consultant session join |

---

### 5. Missing Analytics Opportunities

| Metric / Event | Current state | Recommended action |
|----------------|---------------|-------------------|
| `financing_preview_viewed` | Not in schema | Add to conversion-event schema |
| `trade_in_intent_submitted` | Not in schema | Add to schema |
| `share_initiated` | Not in schema | Track family share, topic share |
| `objection_faq_viewed` | Not in schema | Track which FAQ items opened |
| `staff_handoff_requested` | Not in schema | Real-time floor metric |
| `session_resumed` | Not in schema | Cross-visit attribution |
| `campaign_attribution` | entry_source only | UTM fields in session metadata |
| `configurator_selection` | N/A | Color/trim selection events |
| `tco_calculated` | N/A | Inputs + completion (no PII) |
| `consultant_assigned` | Not in schema | Staff dashboard action |
| `time_to_handoff` | Not computed | Session start → consultant join |
| `topic_abandon_rate` | Partial | Per-topic exit without next topic |
| Funnel by persona | Mentioned | Dashboard filter by preferred_persona |
| Compare-to-CTA rate | Partial | Dedicated funnel stage |
| Staff leaderboard | Not mentioned | Sessions assisted per consultant (P2) |

---

### 6. Missing Dealership Workflows

| Workflow | Current state | Recommended action |
|----------|---------------|-------------------|
| Customer → consultant handoff | QR card (S16) | S36 live request + S35 dashboard alert |
| Consultant → presentation mode | UF-08 basic | Skip intro, bookmark topics, annotate interest |
| Test drive scheduling | Form → Supabase | Form → lead → consultant confirms via WhatsApp |
| Test drive execution | Not documented | Checklist: vehicle prep, route card, feedback capture |
| Lead assignment | Not documented | Round-robin or manual claim on S35 |
| Shift handoff | Not documented | Lead status persists; consultant notes field |
| Financing desk routing | Not documented | Lead type `financing_interest` → desk queue |
| Trade-in appraisal routing | Not documented | Lead type `trade_in` → used car desk |
| CRM export | Phase 3 | Phase 2: CSV/webhook minimum |
| Kiosk maintenance | Idle reset only | Daily content sync, crash recovery runbook |
| Content update without deploy | Not possible | Document content-only deploy pipeline |
| Multi-kiosk same floor | Not addressed | device_id per kiosk in sessions |

---

### 7. Missing Content Requirements

| Content need | Current state | Recommended action |
|--------------|---------------|-------------------|
| Local video testimonials | Phase 3 | 3–5 owners, 30–60s each, Equipetrol/Plan 3000 |
| Financing rate bands | Placeholder only | Monthly ranges per trim, 12/24/36/48 months |
| Trade-in FAQ | Absent | What info needed, appraisal process |
| TCO inputs | Absent | Fuel price, km/month defaults for Santa Cruz |
| Insurance orientative | Absent | Partner or range in TCO |
| Resale data | Absent | Segment depreciation comparison (honest) |
| Test drive route map | Absent | Static map: showroom → doble vía loop |
| Objection scripts | Partial in voice | Structured FAQ content JSON |
| Seasonal campaigns | Mentioned | Content block + S21 campaign variant |
| Spouse-friendly summary | Phase 3 | One-page WhatsApp share content template |
| Physical vehicle QR | Not mentioned | Windshield QR linking to S22 |
| Accessory catalog | Not mentioned | P2 content pack |
| EV charging (EMZOOM) | Theme note only | Full theme when EV launches |

---

### 8. Missing Future Scalability Requirements

| Requirement | Current state | Recommended action |
|-------------|---------------|-------------------|
| Multi-dealer | Single dealership.json | Add `dealershipId`, tenant config pattern |
| Multi-vehicle | Registry pattern ✓ | Add cross-vehicle comparison hub screen |
| Multi-language | es-BO only | UI string extraction to `locales/` |
| CMS self-service | Phase 4 | Define content API contract now |
| Content versioning | Not specified | `contentVersion` in vehicle.json |
| A/B testing | Mentioned, no infra | Feature flag table or LaunchDarkly note |
| CDN/media | Not specified | Cloudflare R2 or Supabase Storage plan |
| Edge deployment | Vercel default | Local mini-PC primary; cloud fallback |
| Brand white-label | Viaggio-specific | Abstract brand tokens in tailwind config |
| API for third parties | Not mentioned | Read-only content API for GAC Bolivia site |
| Analytics warehouse | Supabase only | Export to BigQuery/Metabase note |
| Role-based admin | Phase 3 auth | Roles: admin, marketing, sales, readonly |

---

## Assumption Challenge Log

| Assumption in Phase 1 docs | Challenge | Resolution |
|----------------------------|-----------|------------|
| "Trust before desire" = Carlos tour first | Works for skeptics; desire-first visitors bounce on trust tour | Offer path choice on S02/S04; don't force Carlos |
| "Consultant handles financing" = no digital financing | Customers need orientative cuota before committing to human conversation | S26 Financing Preview |
| "WhatsApp primary" = sticky button sufficient | Family decisions need shareable artifacts, not just chat open | S32, S33 |
| "Phase 3 for social proof" | Chinese brand launch in Bolivia fails without local proof at day one | S23 in Phase 2 launch content |
| "Theme grid hub" = premium | Tesla/Apple never open with 8 cards | S22 Hero first; hub becomes secondary nav |
| "20 screens sufficient" | Missing half the conversion and ops surface | 37 screens per updated screen-map |
| "Content-driven = no CMS needed" | 23 topics × media = marketing blocked on dev deploys | Plan CMS API for Phase 3; versioning now |
| "Idle reset clears session" = privacy win | Also kills multi-day family decisions | Opt-in resume on S37 |
| "Compare with honest verdicts" = enough validation | Buyers need narrative FAQ for emotional objections | S25 Objections |
| "Single dealership" = fine for Phase 1 | GAC Bolivia may want La Paz, Cochabamba — architect tenant ID now | dealershipId in schemas |

---

## Document Change Summary

| Document | Action |
|----------|--------|
| [architecture-review.md](./architecture-review.md) | **Created** — this document |
| [customer-journey.md](./customer-journey.md) | **Updated** — new stages, emotions, metrics, Bolivia specifics |
| [screen-map.md](./screen-map.md) | **Updated** — 17 new screens, revised relationships |
| [README.md](./README.md) | **Updated** — cross-reference to architecture review |
| [conversion-strategy.md](./conversion-strategy.md) | **Minimal update** — P0 funnel additions, see review |
| [technical-architecture.md](./technical-architecture.md) | **Minimal update** — staff dashboard, session resume notes |

---

## Next Steps

1. **Stakeholder review session** — Viaggio sales + GAC marketing validate P0 screen list
2. **Content production sprint** — testimonials, financing bands, objection FAQ (blocks Phase 2 launch)
3. **Schema revision** — extend lead and conversion-event schemas per P0-7, P0-9
4. **ADR** — Record decision on contextual vs. sticky CTA bar
5. **Prototype priority** — S22 Hero, S23 Social Proof, S35 Staff Dashboard for usability test on showroom floor

---

*Related: [Customer Journey](./customer-journey.md) · [Screen Map](./screen-map.md) · [Conversion Strategy](./conversion-strategy.md) · [Technical Architecture](./technical-architecture.md)*
