# Brutally Honest VIS Commercialization Strategy

Audience: founder, automotive technology CEO, dealership operator, CFO, SAP
architect, and enterprise software investor.

Goal: deploy at Viaggio, prove results, expand to other GAC dealerships, and
eventually become a dealership intelligence platform.

This document challenges the assumptions in `docs/commercialization-roadmap.md`.
The roadmap is directionally sound as a productization plan, but a productization
plan is not the same thing as a company strategy. VIS only becomes a software
company if it proves that dealerships will pay repeatedly for measurable sales
outcomes, not for a beautiful kiosk.

## Executive verdict

VIS should not be sold first as a SaaS platform. It should be sold first as a
paid dealership conversion pilot with software, implementation, training, and
measurement bundled together.

The fastest credible path is:

1. Viaggio founder deployment.
2. Measure incremental qualified leads, test drives, follow-up speed, and sales
   attribution.
3. Turn the result into a GAC dealer enablement package.
4. Sell to the importer/OEM network or dealer group as a rollout program.
5. Only then invest in broad multi-tenant platform features.

If VIS tries to become Salesforce, DealerSocket, HubSpot, AutomotiveMastermind,
an OEM content CMS, and an in-showroom Apple Store experience at the same time,
it will become an expensive services project with weak SaaS margins.

The initial wedge must be narrower:

> VIS helps challenger automotive brands and their dealers convert skeptical
> showroom visitors into qualified WhatsApp, test-drive, and financing
> conversations, with proof that staff followed up.

That is what can sell.

## The assumptions that need to be challenged

### Assumption 1: Dealerships want a digital showroom

They may say yes in meetings. They will pay only if it helps sell cars, protect
gross margin, improve lead follow-up, or satisfy OEM pressure.

Dealership operators do not wake up wanting kiosks. They care about:

- More qualified appointments.
- Faster WhatsApp response.
- Higher test-drive show rate.
- Fewer missed walk-ins.
- Better staff consistency.
- Higher close rate on specific models.
- Stronger brand confidence for hard-to-sell nameplates.
- Proof that marketing spend becomes showroom action.

If VIS is positioned as "premium digital showroom," it risks being treated as a
nice-to-have marketing expense. If positioned as "showroom conversion and
follow-up control for GAC sales," it is closer to revenue.

### Assumption 2: The buyer is the dealership

Maybe. But the most scalable early buyer may be the importer, OEM distributor,
or dealer group leadership.

Individual dealerships are hard buyers:

- They are margin-sensitive.
- They already pay for CRM, DMS, ads, marketplaces, WhatsApp tools, and staff.
- They resist systems that change floor behavior.
- They will blame inventory, finance approvals, or staff quality when results
  are weak.

Importer/OEM/distributor buyers may care more about:

- Brand trust.
- Consistent launch messaging.
- Dealer sales enablement.
- Model-level objection handling.
- Network-wide lead process quality.
- Evidence that GAC is professionally represented.

For GAC, VIS may be easier to sell as a regional brand/dealer enablement program
than as standalone SaaS to one rooftop at a time.

### Assumption 3: Multi-tenant SaaS is the next step

Not immediately. Multi-tenancy is important, but it should not be confused with
product-market fit.

A true multi-tenant platform is expensive because it creates obligations:

- Tenant isolation.
- Role and permission models.
- Content versioning.
- Support tooling.
- Billing.
- Security reviews.
- Data retention.
- Integration logs.
- Customer-specific configuration.

If funding is limited, VIS should avoid building enterprise-grade multi-tenancy
before proving that at least one dealership will renew after a paid pilot.

The near-term architecture should support multiple dealers, but the company
should not overbuild a full enterprise tenant control plane first.

### Assumption 4: CRM/DMS integration is required early

CRM export is required. Deep CRM/DMS integration is not.

Every dealership says integration matters. In practice, early integrations can
destroy momentum:

- CRM fields are messy.
- DMS access is expensive and politically sensitive.
- Vendor APIs may be closed, slow, or undocumented.
- Dealers may not maintain clean pipeline data.
- Integration projects create support obligations before revenue is proven.

Early VIS should support:

- CSV export.
- Email/WhatsApp lead notifications.
- Webhook-ready event format.
- Manual outcome import.
- One simple CRM connector only if Viaggio already has a cooperative system.

Do not build DMS integration until VIS has revenue, clear buyer demand, and a
repeatable field map.

### Assumption 5: More screens create more product value

They do not. The current experience already has enough customer-facing product
surface to test value.

The bottleneck is not missing screens. The bottleneck is that the system cannot
yet prove:

- A real person engaged.
- The person consented.
- A real lead was created.
- Staff responded.
- The dealership followed up.
- A test drive happened.
- A sale or lost reason was recorded.

Until that loop is real, more screens are mostly cosmetic.

### Assumption 6: Dashboards are proof of intelligence

They are not. Dashboards are where data goes to die when no one owns the
workflow.

VIS needs operational enforcement, not more management surfaces:

- Alert when a handoff is waiting.
- Let a consultant claim it.
- Record contact.
- Record test-drive scheduled.
- Record outcome.
- Export to CRM.

That is enough. A dealership will pay for fewer missed hot leads. It will not
pay meaningful money for another passive dashboard.

### Assumption 7: The moat is the UI

The UI is impressive, but it is not defensible by itself. It can be copied.

The defensible assets could become:

- Automotive objection-handling content tuned to challenger brands.
- Localized sales psychology for markets like Bolivia.
- Dealer operating playbooks tied to software workflow.
- Session-to-lead-to-sale attribution data.
- Model-level conversion intelligence.
- OEM/dealer-approved content governance.
- Integrations and process ownership inside dealerships.

The company should invest in the loop that learns which content and handoffs
move buyers, not just in presentation.

## What would prevent VIS from becoming a successful software company?

### 1. Selling beauty instead of business impact

VIS can look premium and still fail commercially if the buyer sees it as a
showroom decoration. Software companies renew because they create measurable
business value.

Hard truth: "Tesla-like showroom" is a good demo phrase, not a budget owner
argument.

### 2. Weak attribution

If VIS cannot tie sessions to qualified leads, test drives, and sales outcomes,
the CFO will eventually treat it as marketing theater.

The minimum attribution story must be:

- This many sessions.
- This many consented leads.
- This many WhatsApp/test-drive/finance requests.
- This response time.
- This many appointments.
- This many shown test drives.
- This many sold or lost with reasons.

Without that, renewal depends on enthusiasm rather than economics.

### 3. Dealership staff non-adoption

The product assumes consultants will use context instead of ignoring it. That is
not guaranteed.

Operators know that process failure is common:

- Consultants may not log in.
- Managers may not enforce response SLAs.
- Staff may prefer their personal WhatsApp habits.
- Salespeople may see VIS as monitoring or extra work.
- Front desk may still capture leads manually.

If staff behavior does not change, VIS becomes an expensive brochure.

### 4. Too much enterprise architecture too early

From a SAP architect lens, clean master data, integration boundaries, audit
trails, and tenant IDs matter. But building an enterprise platform before
revenue can bankrupt the product.

The architecture should be enterprise-compatible, not enterprise-complete.

Build the minimum data contract now:

- Dealer.
- Location.
- Device.
- Session.
- Lead.
- Lead activity.
- Staff user.
- Vehicle.
- Content version.
- Outcome.

Defer:

- Complex org hierarchies.
- SSO.
- DMS bidirectionality.
- Advanced entitlement billing.
- Enterprise BI.

### 5. Mispricing the product

If VIS charges too little, it becomes a custom services shop. If it charges too
much before proving value, dealers will wait.

The danger zone is "cheap SaaS plus unlimited customization." That creates low
gross margin and no scalable company.

### 6. Treating GAC expansion as a guaranteed channel

GAC network expansion is a promising wedge, not a guaranteed distribution
machine.

Risks:

- Dealerships may be independently owned.
- Importer priorities may change.
- Model inventory may be uneven.
- OEM co-op budgets may be controlled elsewhere.
- GAC dealers may use different CRMs and sales processes.

VIS should earn the GAC rollout through Viaggio proof, not assume it.

### 7. Content operations becoming the hidden cost center

Every vehicle needs specs, claims, media, comparisons, pricing, financing,
disclaimers, and approvals. That is expensive.

If VIS has to hand-produce every model experience, SaaS margins suffer.

The company needs strict content packages:

- Standard launch pack.
- Premium launch pack.
- Update fees.
- Approval responsibilities.
- Clear customer-owned data obligations.

### 8. Legal exposure from claims and financing

Automotive claims are commercially sensitive. Financing and warranty wording can
create real liability.

If VIS says the wrong thing, the dealer and OEM will blame the software vendor.

The company needs contract language and approval workflow making clear:

- Dealer/OEM owns claim accuracy.
- VIS publishes only approved content.
- Financing is indicative unless confirmed by finance desk.
- Competitor comparisons require approved sources and rights.

### 9. Becoming trapped between CRM vendors

If VIS attempts to replace CRM, it competes with entrenched systems. If it does
not integrate at all, it becomes operationally isolated.

The right position:

> VIS is the pre-CRM showroom intelligence and conversion layer.

It should feed CRM, not replace it.

### 10. Not enough market size in the initial wedge

GAC Bolivia alone is probably too small for venture-scale software. It may be
enough for initial revenue, proof, and domain specialization.

Investor reality:

- GAC-only Bolivia is a beachhead.
- Challenger-brand dealerships in LATAM may be the broader wedge.
- Dealer groups and OEM distributors are the expansion route.
- "All dealerships" is too generic and too competitive.

## What features are unnecessary now?

These features may sound strategic but are distractions before revenue proof.

### Cut or defer

1. New dashboards
   - Do not build more executive, manager, or analytics dashboards.
   - Build workflow actions and timestamps instead.

2. Enterprise SSO
   - Use simple staff auth or controlled device PIN for pilot.
   - Add SSO only when an enterprise buyer requires it.

3. Deep DMS integration
   - DMS is not needed to prove showroom conversion.
   - Use manual inventory inputs or simple files first.

4. Full bidirectional CRM sync
   - Start with export, email, webhook, or one-way push.
   - Bidirectional sync comes after workflow is proven.

5. Billing/usage metering platform
   - Contracts can be managed manually for first customers.
   - Do not build Stripe-style metering before repeatable pricing exists.

6. Broad multi-brand support
   - Stay focused on GAC/challenger-brand trust and conversion.
   - Generic multi-brand positioning weakens the story.

7. AI personalization
   - There is not enough clean data yet.
   - Rule-based session summaries and lead scoring are enough.

8. Complex family resume journeys
   - Valuable later, but not required for first revenue.
   - A WhatsApp summary link is enough to test the behavior.

9. Advanced configurator
   - Inventory, color, and trim complexity can become a trap.
   - Keep only the choices that change lead context.

10. Full content CMS
    - File-based or admin-assisted content operations are acceptable early.
    - Build approval metadata before building a rich editor.

11. Voice/audio expansion
    - Audio is a premium differentiator but not the revenue bottleneck.
    - Do not generate full narration libraries for every model before proving
      lead impact.

12. Large competitor comparison library
    - Comparisons create legal and maintenance burden.
    - Keep one or two high-impact competitors per model.

13. Management KPI suites
    - Daily/weekly metrics are needed, but they can start as exports/reports.
    - Do not spend scarce engineering effort on polished reporting.

14. Round-robin assignment algorithms
    - Manual claim is enough for pilot.
    - Assignment automation only matters after volume increases.

15. Enterprise dealer group hierarchy
    - Architect for it; do not build it.

## What are the fastest paths to revenue?

### Path 1: Paid Viaggio founder pilot

This is the fastest credible revenue path because Viaggio is the anchor context
and the current product is already tailored to it.

Offer:

- Fixed implementation fee.
- Monthly pilot license.
- Support and measurement included.
- Explicit pilot success criteria.

What to sell:

- "We will capture and route every showroom digital lead."
- "We will prove which sessions become WhatsApp conversations, test drives, and
  sales."
- "We will train staff to use context instead of repeating the brochure."

Avoid selling:

- A platform.
- Enterprise analytics.
- A CRM replacement.

### Path 2: GAC Bolivia / importer dealer enablement package

If Viaggio proves results, sell VIS upward.

Buyer logic:

- GAC needs trust-building in the market.
- Dealers need consistent product explanations.
- The importer wants launch quality across rooftops.
- VIS can standardize messaging and surface buyer objections.

Offer:

- GAC model launch package.
- Dealer rollout kit.
- Shared approved content library.
- Per-rooftop activation fee.
- Monthly support/license per rooftop.

This may be faster than selling one dealership at a time.

### Path 3: Managed showroom conversion service

Early revenue may look more like software-enabled services than pure SaaS. That
is acceptable if priced correctly.

Offer:

- Software.
- Content setup.
- Device setup.
- Staff training.
- Weekly pilot report.
- Lead process coaching.

The key is to avoid unlimited custom work. Use fixed packages and change-order
pricing.

### Path 4: Lead capture and WhatsApp response module

If budgets are tight, sell the operational core without the full cinematic
promise.

Offer:

- QR/WhatsApp capture.
- Test-drive form.
- Session summary.
- Staff alert.
- Lead export.
- Response-time measurement.

This is less glamorous but closer to what dealers pay for.

### Path 5: Content and objection-handling package for challenger brands

For GAC and similar brands, the content itself has value.

Offer:

- Approved sales narrative.
- FAQ/objection library.
- Model comparison talking points.
- Consultant scripts.
- Kiosk/tablet delivery.

This can be bundled into implementation and model launch fees.

## What would a dealership actually pay for?

A dealership will pay for VIS if it believes at least one of these is true:

1. VIS creates more test drives.
2. VIS reduces missed hot leads.
3. VIS makes consultants faster and more consistent.
4. VIS improves close rate on a specific vehicle.
5. VIS helps sell a brand customers do not fully trust yet.
6. VIS gives management proof of follow-up discipline.
7. VIS satisfies OEM/importer expectations or unlocks co-op support.

### Dealership budget owner view

#### General manager

Pays for:

- More sold units.
- Better floor control.
- Fewer missed leads.
- Model launch support.

Does not care about:

- Elegant architecture.
- Multi-tenant purity.
- Fancy dashboards.

#### Sales director

Pays for:

- Hot lead alerts.
- Consultant accountability.
- Session context before approach.
- Test-drive scheduling discipline.

Rejects:

- Anything that slows consultants down.
- Anything that duplicates CRM entry without value.

#### Marketing manager

Pays for:

- QR/campaign attribution.
- Better showroom conversion from campaigns.
- Approved brand content.

Rejects:

- Systems that cannot show lead source.

#### CFO / owner

Pays for:

- Monthly cost justified by incremental gross profit.
- Implementation fee if tied to launch or OEM program.
- Support if downtime creates operational pain.

Rejects:

- Open-ended customization.
- Unclear attribution.
- "Innovation" without measurable pipeline.

#### Finance manager

Pays attention if VIS:

- Captures financing intent.
- Routes qualified buyers.
- Avoids quoting binding numbers.
- Reduces repeated explanation.

Rejects:

- Inaccurate cuota or bank claims.

### What they probably will not pay much for

- A beautiful kiosk alone.
- A content library without lead capture.
- Audio narration as a standalone feature.
- A generic dashboard.
- Enterprise architecture before they have multiple rooftops.
- Multi-year contracts before pilot proof.

## Pricing reality

The roadmap's pricing ranges are plausible, but the first sale should be more
pragmatic.

### Founder deployment pricing

For Viaggio:

- Implementation: $8,000 to $15,000 if the relationship is strategic.
- Monthly pilot license/support: $1,500 to $4,000.
- Success bonus option: fixed bonus for verified test-drive or sale milestones,
  but not as the primary pricing model.

Why lower than ideal SaaS pricing:

- Product still needs proof.
- Viaggio is the reference customer.
- The pilot creates expansion evidence.

Guardrail:

- Do not do it free.
- Free pilots create weak urgency and no proof of willingness to pay.

### First paid non-founder dealership

- Implementation: $15,000 to $35,000.
- Monthly license/support: $3,000 to $7,500 per rooftop.
- Additional vehicle/model launch pack: $5,000 to $15,000.
- CRM connector: separate paid scope.

### GAC network package

- Importer/OEM setup: $25,000 to $75,000 for approved content and rollout
  foundation.
- Per-rooftop activation: $8,000 to $25,000.
- Per-rooftop monthly: $2,500 to $6,000 with volume discounts.
- Premium support/training: separate.

This model fits automotive better than pure seat-based SaaS. Dealership value is
by rooftop and sales process, not by user seat.

## If funding is limited, what should be built first?

Build the smallest product that proves paid conversion value.

### Build first: the revenue proof loop

1. Production lead capture
   - Test drive.
   - Financing interest.
   - WhatsApp initiation.
   - Advisor request.

2. Durable session summary
   - Session ID.
   - Topics viewed.
   - Compare viewed.
   - Financing viewed.
   - CTA taken.
   - Timestamp.

3. Staff alert and claim workflow
   - New lead.
   - Claim.
   - Contacted.
   - Scheduled.
   - Won/lost.

4. Basic export
   - CSV/email/webhook.
   - Enough to get into CRM manually.

5. Consent and PII hygiene
   - Required for live use.

6. Viaggio-approved GS4 MAX content and media
   - No legal ambiguity.

7. Weekly pilot report
   - Can be generated manually at first from database/export.
   - Must show business outcomes.

### Do not build first

- New customer screens.
- New dashboards.
- Enterprise roles.
- DMS integration.
- Full CMS.
- Advanced analytics.
- AI recommendations.
- Multi-dealer hierarchy.
- Billing platform.

### Minimum technical architecture if capital is tight

Use a boring architecture:

- Next.js application.
- Managed Postgres/Supabase or equivalent.
- Server-side API routes.
- Tenant ID on every business record.
- Simple staff auth or controlled PIN.
- Webhook/export boundary.
- Error logging.
- Manual admin scripts if needed.

Do not create a microservice platform. Do not introduce SAP-grade complexity
before SAP-grade contracts exist.

## SAP architect lens: what must be designed correctly now

The company should avoid enterprise overbuild, but some data architecture cannot
be postponed.

Design these cleanly from the start:

1. Master data
   - Dealer organization.
   - Rooftop/location.
   - Device.
   - Staff user.
   - Vehicle.
   - Content version.
   - Lead.
   - Customer contact.

2. Transaction data
   - Session.
   - Event.
   - Lead activity.
   - Handoff.
   - Appointment.
   - Outcome.

3. Integration contract
   - VIS lead ID.
   - External CRM lead ID.
   - Status mapping.
   - Retry state.
   - Last sync timestamp.
   - Error message.

4. Auditability
   - Who changed lead status.
   - Who approved content.
   - Which content version was shown.
   - Which financing disclaimer was active.

5. Tenant isolation
   - Every table that contains business data must carry dealership/tenant
     scope.

Design these now. Build the enterprise UI later.

## CFO lens: unit economics and margin traps

VIS can fail financially even if customers like it.

### Margin traps

1. Custom content for every dealer.
2. Custom integrations for every CRM.
3. Onsite device support included for free.
4. Unlimited pricing/financing updates.
5. Bespoke dashboards for each manager.
6. Free pilots.
7. No change-order discipline.

### Healthy commercial structure

1. Implementation fee covers onboarding cost.
2. Monthly license covers software and standard support.
3. Content packs are paid.
4. Integrations are paid projects plus monthly support.
5. Hardware/device work is either customer-owned or marked up.
6. Custom requests require paid change orders.

### Renewal metric that matters

The renewal argument should be:

> VIS influenced enough qualified opportunities that the monthly fee is small
> relative to incremental gross profit or protected lost leads.

If this cannot be demonstrated, pricing will compress.

## Enterprise investor lens: what makes this venture-backable?

VIS is not venture-backable as a custom kiosk studio. It could become
venture-backable if it proves a repeatable category:

> showroom intelligence for automotive dealers and challenger OEMs.

Investor-positive signals:

- Paid pilot converts to renewal.
- Second dealership launches with low customization.
- Same content/data model works across multiple models.
- Dealer staff uses workflow daily.
- CRM/export data proves attribution.
- Importer/OEM becomes channel partner.
- Gross margin improves after first deployments.

Investor-negative signals:

- Revenue mostly implementation services.
- Every dealer requires bespoke features.
- No one renews without founder involvement.
- Product is used only during demos.
- CRM/DMS integrations consume engineering capacity.
- Dashboards are built but not acted on.
- GAC expansion does not materialize.

## Revised commercialization sequence

### Stage 0: Stop building presentation surface

Mandate:

- No new dashboards.
- No new showroom journeys unless they directly increase lead capture.
- No enterprise features before revenue proof.

Output:

- Freeze customer-facing scope except bug fixes, content approval, and
  conversion improvements.

### Stage 1: Paid Viaggio conversion pilot

Build only:

- Real lead capture.
- Real session summary.
- Staff claim/contact workflow.
- Consent/privacy.
- Basic export.
- Weekly pilot report.
- Approved content/media.

Commercial ask:

- Paid implementation.
- Monthly pilot fee.
- Written success criteria.

Proof required:

- Session to lead rate.
- Lead to contact time.
- Contact to test-drive scheduled.
- Test-drive show rate.
- Sales attribution or lost reasons.

### Stage 2: Viaggio renewal or expansion decision

Do not proceed to platform expansion until one of these happens:

- Viaggio renews.
- Viaggio expands to more vehicles/devices.
- GAC/importer funds rollout.
- Another dealership signs based on pilot evidence.

If none happen, the product has not proven commercial urgency.

### Stage 3: GAC dealer package

Package:

- Approved GAC content foundation.
- Dealer-local configuration.
- Lead capture and staff workflow.
- Training.
- Reporting.
- CRM/export path.

Sell to:

- GAC Bolivia/importer.
- GAC dealer group.
- High-potential individual GAC dealerships.

### Stage 4: Platform hardening

Only after repeated paid deployments:

- Multi-tenant admin.
- Content approval workflow.
- CRM connectors.
- Dealer group hierarchy.
- Enterprise security.
- Billing/entitlements.

## Brutally prioritized backlog under capital constraint

If funding is limited, build these in order:

1. Production lead persistence.
2. Session summary persistence.
3. Consent and PII cleanup.
4. Staff claim/contact workflow.
5. Viaggio production configuration.
6. GS4 MAX claim/media approval completion.
7. WhatsApp/test-drive/finance lead routing.
8. Basic lead export.
9. Weekly pilot report generation.
10. Error logging and health check.
11. Staff training and operating checklist.
12. Simple content version tracking.
13. Phone-based dedupe.
14. Manual outcome import.
15. One additional GAC model content pack only after Viaggio proof.

Everything else waits.

## Final recommendation

VIS should pursue revenue before platform breadth.

The company should not ask "How do we build a dealership intelligence platform?"
yet. It should ask:

> Can we get Viaggio to pay for a system that captures, routes, and proves
> higher-quality GAC sales opportunities?

If yes, expand to the GAC network with a focused dealer enablement package. If
that works, the dealership intelligence platform becomes a credible destination.

If no, more dashboards, more screens, more architecture, and more enterprise
language will not fix the core problem.

The company-killing mistake would be building a sophisticated platform before
proving that dealerships will repeatedly pay for the workflow VIS changes.
