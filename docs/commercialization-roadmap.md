# VIS Commercialization Roadmap

Prepared from the current repository state for the VIS Product CTO role.

This roadmap is not a readiness audit. It is a commercialization plan for taking
VIS from the current Viaggio Digital Showroom implementation to a dealership
software platform that can be deployed at Viaggio first and then licensed to
other GAC dealerships and dealer groups.

## Repository basis

The current product is a Next.js 15, React 19, TypeScript kiosk application with
JSON-driven vehicle content, cinematic showroom screens, audio behavior,
conversion paths, and prototype operations surfaces. The repository is strongest
as a premium in-showroom sales experience for the GAC GS4 MAX at Viaggio. It is
not yet a commercial dealership platform because core platform services are
still absent or mocked: persistence, tenant configuration, auth, consent,
analytics ingestion, CRM/DMS integrations, observability, licensing, billing,
and implementation operations.

Key evidence:

- `README.md` positions the repo as the live Vercel kiosk demo.
- `package.json` defines Next.js, React, Tailwind, Framer Motion, Ajv content
  validation, linting, and build scripts, but no test framework or backend SDK.
- `content/` and `docs/schemas/` provide a real content model for vehicles,
  topics, tours, compare data, financing, personas, dealership data, and lead
  structures.
- `lib/config/demo-mode.ts` contains executive demo route locking, placeholder
  hiding, form prefill, default GS4 MAX routing, and demo-specific behavior.
- `app/api/leads/route.ts` and `app/api/handoff/route.ts` return timestamped
  in-memory responses only.
- `lib/analytics/trackEvent.ts` dispatches browser events and logs in
  development only; no server ingest exists.
- `content/shared/dealership.json` is a single demo dealership configuration.
- Operations components exist, but they rely on demo fixtures rather than a
  production lead pipeline.

## Effort scale used in this roadmap

Because this roadmap is for autonomous product execution rather than calendar
planning, effort is expressed by technical scope:

- S: one bounded module or document set; low integration risk.
- M: multiple modules with clear interfaces; moderate QA and rollout work.
- L: cross-cutting backend/frontend/ops work; requires migrations, security,
  QA, and deployment controls.
- XL: platform capability spanning data model, tenant model, integrations,
  operations, contracts, and support.

## 1. Current State Assessment

### Production-quality foundations

These assets are valuable and should be preserved as the platform foundation.

1. Content-driven architecture
   - Vehicle, topic, tour, theme, compare, financing, persona, dealership, and
     media data live in structured JSON.
   - Ajv validation via `scripts/validate-content.mjs` creates a real content
     quality gate.
   - Commercial value: vehicles and content packs can scale without rewriting
     the showroom UI.

2. Premium showroom UX shell
   - Full-screen kiosk routes, cinematic components, touch navigation, idle
     reset behavior, accessibility provider, and audio orchestration are real
     product assets.
   - Commercial value: VIS can be positioned as an in-dealership conversion
     product, not a generic website or CRM screen.

3. GS4 MAX content and narrative system
   - Persona-led content for trust, desire, and family ownership is extensive.
   - Carlos/Sofia/Diego narrative structure addresses the Bolivia GAC adoption
     problem better than generic lead forms.
   - Commercial value: VIS differentiates through objection handling and
     customer education before consultant involvement.

4. Conversion path design
   - Test-drive, financing, WhatsApp, compare, FAQ, and advisor handoff flows
     exist in the application and supporting docs.
   - Commercial value: the customer journey is already aligned to dealership
     revenue moments.

5. Quality gates for content and governance
   - `npm run build`, `npm run lint`, `npm run validate:content`, and
     governance gate linting provide a starting quality discipline.
   - Commercial value: structured gates can become a deployment certification
     process for dealership rollouts.

6. Viaggio-specific operations thinking
   - `docs/dealership-operations-blueprint.md`,
     `docs/lead-capture-strategy.md`, and related docs define lead lifecycle,
     SLAs, consultant behavior, handoff expectations, and CRM direction.
   - Commercial value: the product already has a dealership operating model,
     even though the implementation has not caught up.

### Pilot-ready

These pieces are appropriate for a controlled Viaggio pilot if the deployment is
positioned as a supervised pilot and not as a fully licensed platform.

1. Single-vehicle GS4 MAX showroom journey
   - Suitable for Viaggio floor use with guided staff supervision.
   - Needs approved claims, real media, and production configuration before
     live customer use.

2. WhatsApp handoff concept
   - The WhatsApp-first model fits Bolivia dealership behavior.
   - The current link generation is useful, but it needs tenant/dealer config,
     consent, lead logging, and CRM correlation.

3. Test-drive intent capture UI
   - The form and logistics path are directionally correct.
   - The API must be replaced with durable storage, validation, dedupe, and
     routing before pilot metrics are trusted.

4. Consultant handoff narrative
   - The S36 handoff concept is commercially strong.
   - Today it is local/demo behavior; pilot requires persistent lead records and
     consultant notification.

5. Demo deployment workflow
   - Vercel deployment and demo-mode checklists are useful for controlled
     showings.
   - Pilot deployment needs environment separation, production flags, health
     checks, and rollback.

### Prototype-only

These items demonstrate intent but cannot be sold as production capability.

1. Lead and handoff APIs
   - Current APIs echo JSON with generated timestamp IDs.
   - No database, queue, deduplication, auth, retry, or audit trail exists.

2. Analytics
   - Current tracking dispatches browser events only.
   - No event ingestion, session ID, offline queue, reporting data model, or
     CRM attribution exists.

3. Operations surfaces
   - Staff, manager, and executive operations components are backed by demo
     fixtures.
   - These should not be expanded. For commercialization, only the minimum
     operational lead queue and handoff workflow should be productized.

4. Resume and family share
   - Local storage and placeholder screens demonstrate the concept.
   - Sellable behavior requires tokens, opt-in consent, expiry, server storage,
     and consultant-visible context.

5. Multi-vehicle support beyond GS4 MAX
   - Registry entries exist for additional GAC models, but content is marked
     coming soon.
   - Commercial multi-model support needs content packs, media, pricing,
     approved claims, and test coverage.

6. CPI-OS learning loop
   - Types and governance docs exist.
   - The product does not yet write real path instances, join outcomes, or
     learning feedback to a backend.

### Must be removed or rewritten before charging for deployment

1. Demo-mode hard locks and scripted route behavior
   - Remove or isolate `NEXT_PUBLIC_DEMO_MODE` behaviors from production
     deployments.
   - Keep a separate demo environment, but never let demo settings define a
     commercial dealer installation.

2. Demo customer data
   - Remove Mendoza family defaults, prefilled names/phones, fake KPIs, and
     static operation data from any production build.

3. Stateless APIs
   - Rewrite lead, handoff, analytics, session, and resume endpoints around a
     durable backend with migrations, validation, audit trails, and tenant IDs.

4. Single-dealership global config
   - Replace `content/shared/dealership.json` as the sole source with a
     tenant/dealership model that supports dealer-specific branding, WhatsApp,
     staff, hours, locations, vehicles, pricing disclaimers, and feature flags.

5. Unauthenticated operations routes
   - Require staff authentication or at minimum device PIN plus role-scoped
     access for pilot. Paid deployments need proper users, roles, and audit
     logging.

6. Unverified product claims and placeholder dealer data
   - GS4 MAX specs, warranty, pricing, financing ranges, locations, WhatsApp
     numbers, and competitor claims must be signed off by Viaggio/GAC.

7. Unlicensed or missing media
   - Replace AI/generated/placeholder assets with licensed GAC, dealer, or
     properly cleared third-party assets.

8. Console-only analytics
   - Replace with a production event pipeline, privacy controls, and
     dealership-readable outcome data.

9. Any dashboard expansion not tied to operational workflow
   - Do not build new dashboards now. Productize the smallest lead queue and
     handoff workflow needed to operate the pilot.

## 2. Minimum Viable Commercial Product (MVCP)

MVCP definition: the minimum VIS product that can be deployed at Viaggio,
measured in a real pilot, and sold to additional dealerships as paid software.
It does not need every future enterprise capability, but it must be safe,
operable, measurable, supportable, and repeatable.

### Required before charging for software deployment

1. Production tenant/dealership configuration
   - Dealer ID and environment-aware config.
   - Dealer branding, locations, hours, WhatsApp numbers, staff roster,
     enabled vehicles, disclaimers, language, and feature flags.
   - Clear separation between Viaggio pilot config and future dealer configs.

2. Durable sessions, leads, handoffs, and events
   - Backend tables for sessions, leads, lead events, handoff requests,
     analytics events, devices, staff users, and dealership config versions.
   - Tenant IDs on every record.
   - Server-side validation and audit timestamps.

3. Consent and privacy baseline
   - Explicit customer consent before PII is stored.
   - Kiosk idle reset clears local PII.
   - Data retention policy for sessions, leads, and analytics.
   - Opt-in resume/share tokens with expiration.

4. Production lead capture
   - Test-drive, financing interest, WhatsApp initiation, and advisor request
     must create or enrich a real lead.
   - Phone-based dedupe.
   - Lead source and session context captured.
   - Consultant notes and status changes persisted.

5. Operational handoff workflow
   - Productize the existing handoff concept as a real workflow: create, notify,
     claim, contact, qualify, schedule, close won/lost.
   - This is not a new dashboard initiative; it is the operational minimum that
     prevents leads from disappearing after kiosk interaction.

6. Staff access control
   - Staff/admin authentication or controlled device PIN for pilot.
   - Role separation for consultant, manager, finance, and admin functions.
   - Audit log for lead status changes and exports.

7. Analytics ingestion and attribution
   - Persist event batches from kiosk.
   - Generate session summaries.
   - Tie CTA events to lead IDs and later CRM outcomes.
   - Include offline-tolerant retry for unreliable showroom connectivity.

8. CRM export/integration baseline
   - MVCP can begin with CSV export plus WhatsApp templates, but it must have a
     clean integration boundary.
   - For Viaggio, define the path to Zoho or the active CRM before pilot
     conclusion.

9. Content truth and approval workflow
   - Commercial content cannot depend on unresolved truth matrix conflicts.
   - Claims, prices, warranty, financing ranges, competitor comparisons, and
     disclaimers need approval state and owner.

10. Licensed media pack
    - OEM/dealer-approved vehicle media, dealership photos, host audio, and
      competitor imagery rights.
    - Media manifest should fail validation when required production assets are
      missing.

11. Deployment operations
    - Separate demo, staging, and production environments.
    - Rollback plan.
    - Health check endpoint.
    - Error logging and uptime monitoring.
    - Device/kiosk setup checklist for dealership staff.

12. Supportable implementation package
    - Dealer onboarding checklist.
    - Content pack template.
    - Staff training guide.
    - Pilot measurement plan.
    - Incident and support process.

13. Commercial contract boundaries
    - License terms, support scope, data ownership, privacy obligations,
      content responsibility, integration assumptions, and cancellation terms.

### Recommended for first commercial sales

1. Multi-vehicle content pack support for GS4 MAX plus at least one additional
   GAC model.
2. Basic admin content management workflow, even if file-based behind the
   scenes at first.
3. Dealer-specific WhatsApp templates and response playbooks.
4. Automated content truth checks for required approvals.
5. CRM connector for Viaggio's selected system after the pilot validates lead
   flow.
6. Implementation certification checklist for each dealership launch.
7. Visual smoke tests for the kiosk path.
8. Device management guidance for tablets, kiosk browser locking, cache
   clearing, and update windows.
9. Basic SLA reporting from real lead timestamps.
10. Dealer group rollout packaging: one master brand template plus per-rooftop
    overrides.

### Future enterprise features

1. Multi-rooftop dealer group hierarchy.
2. SSO and enterprise role management.
3. Bidirectional CRM/DMS integrations.
4. OEM feed ingestion for inventory, pricing, incentives, and specs.
5. Advanced journey experimentation and content optimization.
6. Automated consultant coaching based on session context and close outcomes.
7. Multi-language and multi-country localization.
8. OEM/dealer content approval portals.
9. Billing, entitlements, and usage metering.
10. Enterprise observability, data warehouse export, and BI integration.
11. Compliance modules by country or dealer group policy.
12. White-label theming and content pack marketplace.

## 3. Development Roadmap

### Phase 1 - Viaggio Pilot

Objectives:

- Convert the current demo into a safe, measurable Viaggio pilot.
- Prove that kiosk-led education creates qualified test-drive, financing, and
  WhatsApp leads.
- Keep scope narrow: GS4 MAX, Viaggio Santa Cruz, one or more controlled kiosk
  devices, and the minimum operational workflow.

Deliverables:

1. Production-mode configuration
   - Disable demo prefill and route-lock behavior in pilot production.
   - Add tenant/dealer configuration for Viaggio.
   - Verify WhatsApp number, hours, locations, staff roster, and disclaimers.

2. Backend foundation
   - Tables or backend service for sessions, leads, events, handoffs, staff,
     devices, and audit events.
   - Tenant ID included from the beginning.
   - Server validation for all capture endpoints.

3. Real lead capture
   - Replace stub lead and handoff APIs.
   - Persist test-drive, financing, WhatsApp, and advisor requests.
   - Deduplicate by phone where possible.

4. Consent and kiosk privacy
   - Consent copy before PII submission.
   - Idle reset clears local session PII after event flush.
   - Tokenized resume/share only with opt-in.

5. Minimum operational workflow
   - Staff can see, claim, contact, qualify, schedule, and close leads.
   - Focus on lead handling, not new dashboards.

6. Pilot analytics
   - Session start/end, topic views, compare views, financing interest,
     WhatsApp initiation, test-drive submit, handoff request, lead status
     changes, and close outcome import/manual entry.

7. Content and media certification for GS4 MAX
   - Resolve P0 truth conflicts.
   - Replace placeholder dealer data.
   - Install licensed or approved media.

8. Deployment operations
   - Staging and production environments.
   - Health check, error logging, build validation, content validation.
   - Kiosk setup and staff training materials.

Estimated effort:

- L: cross-cutting work across backend, session model, consent, lead capture,
  staff workflow, content approval, and deployment operations.

Dependencies:

- Viaggio/GAC approval of specs, warranty, pricing/financing disclaimers, brand
  claims, assets, WhatsApp line, operating hours, and staff workflow.
- Choice of backend for pilot persistence.
- Decision on whether pilot staff access uses authenticated accounts or a
  controlled device PIN.
- Confirmation of the CRM/export path used during pilot measurement.

Success criteria:

- Every submitted test-drive, financing, WhatsApp, or advisor request creates a
  durable lead.
- Staff can claim and action hot leads without relying on demo/localStorage
  behavior.
- At least one pilot report can connect sessions to leads and lead outcomes.
- Kiosk reset does not leak customer PII.
- Viaggio staff can operate the workflow using training materials.
- No production environment depends on fake customer data, fake KPIs, or demo
  route locks.

### Phase 2 - First Paid Deployment

Objectives:

- Turn the Viaggio pilot into a repeatable paid dealership deployment.
- Prove that VIS can be installed, configured, supported, and billed outside
  the founding demo context.
- Package product, implementation, and support as a commercial offer.

Deliverables:

1. Repeatable dealer onboarding
   - Dealer intake form.
   - Required assets checklist.
   - Vehicle/content pack checklist.
   - Staff and device setup checklist.
   - Production launch certification.

2. Tenant configuration v1
   - Per-dealer overrides for branding, vehicles, contacts, locations, staff,
     CTAs, pricing disclaimers, financing disclaimers, and feature flags.
   - Configuration versioning and rollback.

3. Commercial deployment pipeline
   - Demo, staging, and production environment templates.
   - Automated build, lint, content validation, and smoke route validation.
   - Production launch checklist.

4. CRM export or connector v1
   - At minimum: scheduled CSV/export with lead status and session context.
   - Preferred: one-way connector into the dealer CRM selected by Viaggio or
     the first paid customer.

5. Support operations
   - Incident process.
   - Support tiers.
   - Change request process for content, pricing, financing, and staff changes.
   - Device support responsibilities.

6. Billing and license administration
   - Dealer license record.
   - Rooftop/device count.
   - Contract start/end dates.
   - Entitlement flags for enabled modules.

7. Pilot-to-sale case study package
   - Sanitized pilot results.
   - Lead flow examples.
   - Staff workflow evidence.
   - Revenue story for dealership owners.

Estimated effort:

- L: fewer net-new product concepts than Phase 1, but significant packaging,
  tenant, deployment, support, and CRM boundary work.

Dependencies:

- Phase 1 pilot data and staff feedback.
- Selected first paid dealership.
- Agreed commercial contract and support scope.
- CRM/export requirements of the first paid customer.
- Confirmed asset and content approval process.

Success criteria:

- A second dealership can be launched without rewriting application code.
- Dealer-specific config can be changed without editing core components.
- Leads from VIS can be imported or synced into the dealership's operating
  system.
- Pricing, implementation, and support terms are signed before production use.
- Support can diagnose incidents from logs and health checks.

### Phase 3 - Multi-Dealership Platform

Objectives:

- Scale VIS from one-off deployments into a multi-tenant dealership software
  platform.
- Support multiple GAC rooftops with shared platform capabilities and
  dealership-specific configuration.
- Build integration and operations depth without changing the customer
  experience into a dashboard product.

Deliverables:

1. Multi-tenant platform model
   - Organizations, dealerships/rooftops, users, roles, devices, vehicles,
     content packs, integrations, and entitlements.
   - Tenant-scoped data access and audit logs.

2. Content pack lifecycle
   - Draft, review, approved, published, archived states.
   - Required approvals for specs, prices, warranty, finance, legal, and media.
   - Content versioning per dealership and vehicle.

3. Integration layer
   - Connector architecture for CRM and later DMS.
   - Webhook/event model.
   - Retry, dead-letter handling, mapping, and integration logs.

4. Data and analytics model
   - Session-to-lead-to-sale attribution.
   - Lead source and campaign tracking.
   - Exportable reports for dealership management and OEM stakeholders.

5. Operations workflow hardening
   - SLA timestamps.
   - Assignment rules.
   - Follow-up reminders.
   - Lead outcome capture.
   - Integration with the dealer's system of record.

6. Security and compliance
   - Role-based access control.
   - Tenant isolation testing.
   - Data retention controls.
   - Privacy policy templates by market.

7. Implementation partner toolkit
   - Dealer launch playbook.
   - Content collection guide.
   - Staff training.
   - Device certification.
   - Acceptance testing checklist.

Estimated effort:

- XL: this is the transition from productized deployment to true platform,
  requiring data architecture, tenant isolation, integration reliability,
  content lifecycle, and support model maturity.

Dependencies:

- At least one paid dealership deployment with real operational usage.
- Standardized GAC model content and media approval process.
- CRM/DMS system priorities across the target dealer network.
- Clear platform contract terms for data ownership and support.

Success criteria:

- Multiple dealerships run from one platform architecture with isolated data.
- A new dealership launch is primarily configuration, content, and training.
- Integrations are monitored and recoverable.
- Leadership can see measurable attribution from sessions to leads to sales
  without manual spreadsheet reconstruction.
- Support burden per dealership decreases as deployments repeat.

### Phase 4 - Enterprise Dealer Group Platform

Objectives:

- Make VIS sellable to dealer groups and OEM-affiliated networks.
- Support enterprise governance, multi-rooftop management, integrations,
  security, procurement, and service-level expectations.
- Position VIS as a dealership conversion intelligence platform, not a kiosk
  build project.

Deliverables:

1. Group hierarchy
   - Dealer group, region, rooftop, brand, vehicle line, and device structure.
   - Shared templates with local overrides.

2. Enterprise identity and permissions
   - SSO/SAML/OIDC where required.
   - Centralized user lifecycle.
   - Granular roles for group admins, dealership managers, consultants,
     finance, marketing, and content approvers.

3. Enterprise integration suite
   - Bidirectional CRM integrations.
   - DMS/inventory feeds where commercially justified.
   - OEM incentives, pricing, and availability feeds.
   - Integration monitoring and support runbooks.

4. Content governance at scale
   - OEM-approved content libraries.
   - Dealer-localized claims and offers.
   - Approval workflows and audit trails.
   - Multi-market localization.

5. Commercial administration
   - Subscription management.
   - Entitlements.
   - Usage metering.
   - Contract-level support plans.
   - Renewal reporting.

6. Enterprise observability and compliance
   - Centralized logs, uptime, error budgets, security reviews, backups,
     retention controls, and incident communications.

Estimated effort:

- XL: enterprise platform work across identity, integrations, data governance,
  billing, content operations, and support.

Dependencies:

- Proven dealership ROI from earlier phases.
- Enterprise buyer requirements.
- Legal templates for data processing, support, service levels, and content
  liability.
- Integration partnerships or documented APIs for priority CRM/DMS systems.

Success criteria:

- A dealer group can buy VIS as a repeatable software platform.
- Group-level governance coexists with rooftop-level customization.
- Procurement/security review can be completed with documented controls.
- License, support, implementation, and renewal motions are operational.

## 4. Revenue Strategy

### Recommended pricing structure

All prices below are recommended starting points in USD. They should be refined
after Viaggio pilot data shows lead volume, appointment conversion, sales
attribution, and support burden.

#### Prototype license pricing

Use when the product is being shown as a controlled demo or proof-of-concept,
not used as a live dealership operating system.

- Suggested range: $1,500 to $3,500 per month per dealership.
- Includes: hosted demo environment, limited content customization, scripted
  kiosk experience, stakeholder presentations, and minor updates.
- Excludes: production lead operations, CRM/DMS integration, formal SLA, custom
  model launches, and guaranteed attribution reporting.
- Commercial purpose: convert interest into a paid pilot while avoiding unpaid
  custom demos.

#### Pilot pricing

Use for Viaggio and the first controlled live deployment.

- Suggested setup fee: $8,000 to $20,000.
- Suggested pilot license: $2,500 to $6,000 per month per rooftop.
- Pilot term: defined contract period with success criteria and data access.
- Includes: production configuration, one dealership, one brand/model focus,
  lead capture, basic operations workflow, support, and pilot measurement.
- Excludes or prices separately: deep CRM/DMS integration, multiple vehicles,
  custom video production, extensive content localization, and enterprise
  security requirements.

#### Software licensing pricing

Most realistic dealership model: per-rooftop subscription with device bands and
integration add-ons. Dealerships understand monthly software expense, rooftops,
and implementation fees better than pure usage billing.

Recommended structure:

- Core VIS Showroom License: $3,500 to $8,000 per month per rooftop.
- Additional kiosk/tablet device band: $250 to $750 per month depending on
  device count and support scope.
- Additional vehicle/content pack: $500 to $2,000 per month per active model,
  or bundled for GAC-only dealer groups.
- CRM connector add-on: $1,000 to $3,000 per month per rooftop after v1.
- Dealer group plan: custom annual contract with volume discounts and shared
  content governance.

Why per-rooftop is realistic:

- Dealership P&L is managed by rooftop/location.
- Software value comes from sales process impact, not just number of users.
- Kiosk/device count affects support, but should not be the sole pricing metric.
- A pure per-lead model creates attribution disputes and encourages dealers to
  bypass the system.
- Revenue-share on sold vehicles is attractive in theory but hard to audit,
  slow to collect, and uncomfortable for many dealers unless the vendor controls
  CRM attribution.

#### Implementation pricing

Implementation should be mandatory for paid deployments.

- Standard single-rooftop implementation: $12,000 to $35,000.
- Additional vehicle content pack: $5,000 to $20,000 depending on asset and
  claim complexity.
- Custom integration implementation: $15,000 to $75,000 depending on CRM/DMS
  access, mapping, testing, and support obligations.
- Staff training package: $2,500 to $10,000 depending on users and sessions.
- Device procurement/kiosk installation: pass-through hardware plus 15% to 25%
  management margin if VIS owns coordination.

Implementation should cover:

- Dealer discovery.
- Content and asset intake.
- Legal/claim approval.
- Environment setup.
- Device configuration.
- Staff onboarding.
- Launch testing.
- Go-live support.

#### Support pricing

Support should be a separately described recurring line item or bundled into
license tiers.

Recommended tiers:

1. Standard support
   - Included or 15% of annual software license.
   - Business-hours support, bug fixes, minor content updates, and incident
     triage.

2. Premium showroom support
   - 20% to 30% of annual software license or $1,000 to $3,000 per month.
   - Faster response targets, launch coverage, kiosk/device support, monthly
     performance review, and staff refreshers.

3. Enterprise support
   - Custom.
   - Named support lead, integration monitoring, security review support,
     quarterly business reviews, and formal service commitments.

### Most realistic model for automotive dealerships

The most realistic model is:

1. Paid implementation fee.
2. Monthly per-rooftop software subscription.
3. Optional add-ons for vehicles, integrations, and device support.
4. Premium support tier for dealerships that depend on VIS daily.

Avoid making the primary commercial model success-fee-only. Dealers will argue
over attribution, lead quality, sales cycle timing, staff follow-up, inventory
availability, and financing outcomes. VIS should sell measurable process
improvement and conversion assistance, then use pilot attribution data to
defend subscription pricing.

## 5. Competitive Positioning

### VIS vs CRM-only solutions

CRM-only systems record and manage leads after a customer is known. They do not
usually educate an anonymous showroom visitor, overcome model-specific
objections, or prepare the buyer before a consultant conversation.

VIS advantage:

- Captures intent before the lead form.
- Carries session context into the human handoff.
- Teaches staff what the customer already explored.
- Reduces repeated product explanations.
- Makes anonymous showroom behavior measurable.

CRM still matters. VIS should integrate with CRM rather than replace it.

### VIS vs HubSpot

HubSpot is strong for marketing automation, contact management, email journeys,
landing pages, and sales pipeline operations. It is not designed as a premium
touchscreen dealership showroom experience.

VIS advantage:

- Kiosk-first UX built for floor behavior and touch interaction.
- WhatsApp-native flow aligned to Bolivia dealership habits.
- Vehicle-specific education, comparisons, financing context, and objection
  handling.
- Consultant handoff built around in-person sales timing.

HubSpot can be a downstream marketing/CRM system. VIS should send qualified
leads and context into HubSpot if a dealer uses it.

### VIS vs Salesforce

Salesforce is a broad enterprise CRM platform. It can be configured for
automotive, but it requires significant implementation work and is not a
customer-facing showroom product out of the box.

VIS advantage:

- Faster dealership floor deployment.
- Purpose-built automotive journey.
- Lower cognitive load for consultants.
- Vehicle content and showroom interaction built into the product.

Salesforce can own enterprise CRM and reporting. VIS should own showroom
engagement and pre-sales conversion intelligence.

### VIS vs DealerSocket

DealerSocket and similar automotive CRM platforms manage dealership leads,
inventory workflows, follow-up, and sales process. They are closer to dealer
operations than HubSpot or Salesforce, but still primarily operate after lead
capture.

VIS advantage:

- Creates and qualifies the lead through guided in-showroom education.
- Gives consultants a reason to approach with relevance.
- Builds trust in a challenger brand like GAC before price negotiation.
- Can feed DealerSocket with richer lead context than a form submission.

VIS should not try to become a full DealerSocket replacement in early phases.

### VIS vs AutomotiveMastermind

AutomotiveMastermind focuses on predictive marketing, equity mining, customer
data, and identifying likely buyers from existing databases. It is powerful for
outbound targeting and owner lifecycle campaigns.

VIS advantage:

- Works with walk-in and anonymous visitors, not just known database contacts.
- Improves the in-store product education and handoff moment.
- Handles model trust objections and family co-decision behavior at the point
  of interest.

AutomotiveMastermind predicts who might buy. VIS improves what happens when a
buyer is physically or digitally engaged with a vehicle.

### VIS vs traditional dealership lead workflows

Traditional workflows depend on a salesperson noticing the customer, asking
generic discovery questions, repeating brochure facts, manually following up on
WhatsApp, and later entering incomplete notes into CRM.

VIS advantage:

- Always-on product expert at the dealership.
- Consistent GAC story and approved claims.
- Lower-pressure buyer education.
- Automatic session memory.
- Contextual WhatsApp/test-drive/finance intent.
- Staff handoff based on observed behavior rather than guesswork.

### Unique VIS value

VIS is not just a kiosk, CRM, or dashboard. Its defensible position is:

> A dealership conversion intelligence layer that turns showroom exploration
> into qualified, context-rich sales actions.

For GAC and Viaggio specifically, the core value is trust creation. Buyers are
not only comparing features; they are asking whether a less familiar brand is
safe, reliable, serviceable, financeable, and accepted by their family. VIS is
built around that buying psychology.

## 6. Commercial Risks

Severity scale:

- Critical: can block commercialization or create major liability.
- High: can materially reduce adoption, sales, or platform reliability.
- Medium: manageable with process and focused execution.
- Low: monitor, but not a near-term blocker.

| Rank | Risk | Category | Severity | Why it matters | Mitigation |
| --- | --- | --- | --- | --- | --- |
| 1 | No durable backend for leads, sessions, analytics, and handoffs | Technical | Critical | Cannot charge for a system that loses or cannot prove leads | Build tenant-scoped persistence in Phase 1 |
| 2 | Unverified claims, pricing, warranty, financing, and competitor data | Legal | Critical | Misstatements can create dealer/OEM liability and customer complaints | Approval workflow and signed truth matrix before live use |
| 3 | Demo data and fake operations behavior leaking into production | Technical / Sales | Critical | Damages trust and makes the product unsellable | Separate demo/staging/production flags and remove demo fixtures from production |
| 4 | Missing consent/privacy controls for PII on shared kiosks | Legal | Critical | Phone/name capture on public devices requires explicit handling | Consent gates, idle reset, retention policy, secure storage |
| 5 | Staff does not act on captured leads quickly | Adoption | High | VIS value collapses if consultants ignore handoffs | Pilot training, SLA workflow, manager ownership, simple operational process |
| 6 | CRM/DMS integration expectations exceed product maturity | Sales | High | Dealers may expect full system integration immediately | Sell phased integration; start with export or one-way connector |
| 7 | Single-dealer hardcoding blocks repeatable sales | Scaling | High | Every new dealer becomes custom software work | Tenant model and onboarding package in Phase 2 |
| 8 | Asset licensing gaps | Legal / Adoption | High | Vehicle and competitor media may be unusable commercially | Licensed media pack and validation gate |
| 9 | No observability or support process | Scaling | High | Problems at dealerships cannot be diagnosed quickly | Logging, health checks, incident process, support tiers |
| 10 | Dealer buyer sees VIS as a novelty kiosk, not operating software | Sales | High | Pricing power depends on measurable lead impact | Position around qualified leads, staff efficiency, attribution, and GAC trust |
| 11 | Overbuilding dashboards instead of productization | Product | High | Consumes effort without solving sellability blockers | Freeze dashboard expansion; productize only the lead workflow minimum |
| 12 | Financing data changes frequently | Legal / Ops | Medium | Stale cuota ranges damage trust | Ownership, update SLA, disclaimers, approval state |
| 13 | Connectivity instability in showroom | Technical | Medium | Leads/events may fail if offline | Offline queue and retry for event/lead submissions |
| 14 | Consultant resistance to changed workflow | Adoption | Medium | Staff may prefer old WhatsApp/manual process | Training, scripts, manager incentives, visible lead context value |
| 15 | Content production bottleneck for new models | Scaling | Medium | Each new vehicle needs approved content and media | Content pack templates and approval workflow |
| 16 | Enterprise procurement/security requirements arrive too early | Sales | Medium | Early product may fail enterprise review | Sell to single rooftops first; document security roadmap |
| 17 | Attribution disputes | Sales | Medium | Dealers may challenge ROI | Tie sessions to leads and outcomes; avoid success-fee-only pricing |
| 18 | Device management variability | Technical / Support | Medium | Kiosks/tablets may be misconfigured | Device certification and launch checklist |
| 19 | Local market changes or GAC inventory constraints | Sales | Medium | Product cannot compensate for no stock or unattractive offers | Keep offer/content updates operationally owned |
| 20 | Platform scope creep into full CRM replacement | Product | Medium | Competes with entrenched systems and delays MVCP | Integrate with CRM; own showroom conversion layer |

## 7. Executive Recommendation

If the goal is for Viaggio to successfully deploy VIS and later license it to
other GAC dealerships, build the productization layer next. Do not build more
showroom screens, new dashboards, or broad enterprise features until the system
can safely capture, persist, route, measure, and export real dealership demand.

Build next:

1. Tenant-scoped backend.
2. Real lead/session/event/handoff persistence.
3. Production Viaggio configuration.
4. Consent and privacy controls.
5. Operational lead workflow.
6. Content/media approval gates.
7. Deployment, monitoring, support, and onboarding package.
8. CRM/export boundary.

Ignore for now:

1. New dashboards.
2. More executive demo polish.
3. Full DMS replacement.
4. Enterprise SSO before paid rooftop proof.
5. Complex AI personalization before data quality exists.
6. Multi-brand generic dealership ambitions.
7. Deep inventory/configurator features unless required for the first paid sale.
8. Success-fee-only monetization.

### Prioritized Top 20 development backlog

1. Define production data model and migrations
   - Sessions, leads, handoffs, events, staff users, devices, dealership
     tenants, content versions, consent records, and audit logs.
   - Priority: P0.
   - Effort: L.

2. Replace stub lead API with durable lead capture
   - Server validation, tenant ID, phone dedupe, status, source, session
     context, and audit trail.
   - Priority: P0.
   - Effort: M.

3. Replace stub handoff API with persistent workflow
   - Create, notify, claim, contacted, qualified, scheduled, closed won/lost.
   - Priority: P0.
   - Effort: M.

4. Implement session identity and event ingestion
   - Session ID, event batching, retry, offline tolerance, and session summary.
   - Priority: P0.
   - Effort: L.

5. Add tenant/dealership configuration model
   - Dealer ID, branding, locations, WhatsApp, staff, vehicles, feature flags,
     disclaimers, and environment scoping.
   - Priority: P0.
   - Effort: L.

6. Separate demo, staging, and production modes
   - Ensure demo prefill, route locks, fake people, and fake metrics cannot run
     in production.
   - Priority: P0.
   - Effort: M.

7. Add consent and shared-kiosk privacy controls
   - Consent capture, PII clearing, retention settings, resume/share opt-in,
     token expiry.
   - Priority: P0.
   - Effort: M.

8. Productize the minimum staff lead workflow
   - Keep scope to lead handling: view, claim, contact, qualify, schedule, note,
     close, export.
   - Priority: P0.
   - Effort: L.

9. Add staff/device access control
   - Auth or pilot device PIN, role scopes, audit logging, session timeout.
   - Priority: P0.
   - Effort: M.

10. Resolve GS4 MAX commercial truth matrix
    - Specs, warranty, ADAS naming, airbags, screen sizes, price, financing,
      service, and disclaimers approved by Viaggio/GAC.
    - Priority: P0.
    - Effort: M.

11. Replace production media placeholders
    - Licensed GAC/dealer photography, approved competitor assets, host audio,
      required media validation.
    - Priority: P0.
    - Effort: M.

12. Add CRM/export v1
    - CSV export or one-way connector with session context, lead status, notes,
      and outcome fields.
    - Priority: P0 for paid deployment; P1 for pilot if manual process is
      explicitly accepted.
    - Effort: M to L.

13. Add observability and health checks
    - Error tracking, request logs, integration logs, health endpoint, uptime
      monitor, alerting path.
    - Priority: P1.
    - Effort: M.

14. Create dealer onboarding and launch certification package
    - Intake, content, media, staff, device, legal, environment, launch, and
      support checklists.
    - Priority: P1.
    - Effort: M.

15. Add content approval states and validation gates
    - Draft/approved/published states; required owner approval for claims,
      pricing, financing, warranty, and media.
    - Priority: P1.
    - Effort: M.

16. Add automated route smoke tests for the commercial path
    - Validate core kiosk routes, lead capture routes, handoff workflow, and
      production flag behavior.
    - Priority: P1.
    - Effort: M.

17. Add implementation billing/license records
    - Rooftop license, device count, enabled modules, contract dates,
      entitlements.
    - Priority: P1.
    - Effort: M.

18. Package second GAC vehicle content workflow
    - Use GS8, EMZOOM, or EMKOO as the proof that vehicle expansion is content
      pack work, not custom app work.
    - Priority: P2.
    - Effort: M to L.

19. Define integration connector architecture
    - CRM/DMS abstraction, mapping, retries, dead-letter handling, logs,
      integration tests.
    - Priority: P2.
    - Effort: L.

20. Prepare dealer group platform model
    - Organization hierarchy, rooftop overrides, shared GAC content library,
      enterprise permissions, and group reporting requirements.
    - Priority: P2.
    - Effort: XL.

## CTO decision summary

VIS should be commercialized as a dealership conversion intelligence platform
anchored in the showroom, not as a dashboard product and not as a generic CRM.
The current codebase already proves the customer-facing experience and the
GAC/Viaggio narrative. The next commercial leap is operational trust: when a
customer engages, VIS must remember it, protect it, route it, measure it, and
export it.

The immediate product posture should be:

- Sell Viaggio a paid pilot or founder deployment with explicit pilot terms.
- Use the pilot to prove lead quality, staff workflow, and session-to-sale
  attribution.
- Build only the platform capabilities required to repeat that deployment for
  the next GAC dealership.
- Defer enterprise features until at least one paid rooftop validates that VIS
  changes dealership behavior and revenue outcomes.
