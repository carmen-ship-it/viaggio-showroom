# VIS Product Definition - Version 1

Version 1 commercial product definition for dealership buyers, dealership group
operators, implementation teams, and VIS sales.

This document defines what VIS is as a sellable Version 1 software product. It
does not describe long-term roadmap ambitions. Anything not listed here should
be considered out of scope unless explicitly contracted as paid services.

## 1. What VIS actually is

VIS is a dealership showroom conversion system.

It combines:

1. A customer-facing kiosk or tablet experience for vehicle education.
2. Lead capture for test drives, financing interest, WhatsApp follow-up, and
   advisor requests.
3. A staff-facing lead workflow for claiming, contacting, qualifying, and
   recording outcomes.
4. Basic reporting that proves whether showroom interactions became sales
   actions.
5. A managed implementation package that configures the product for a dealership
   or dealership group.

VIS is not a website, CRM, DMS, inventory system, marketing automation suite, or
replacement for dealership sales staff. It sits before the CRM and helps turn
anonymous showroom interest into qualified, context-rich leads.

The simplest description:

> VIS helps a dealership capture and act on high-intent showroom demand that
> would otherwise be handled inconsistently by staff or lost entirely.

## 2. What problems VIS solves

### For dealership ownership and management

- Showroom visitors often browse vehicles without becoming trackable leads.
- Sales staff may miss, delay, or poorly handle high-intent walk-ins.
- Product explanations vary by consultant.
- Managers lack proof that digital showroom engagement became test drives,
  financing conversations, WhatsApp follow-up, or sales.
- New or challenger brands need more trust-building before price negotiation.
- Marketing campaigns may drive visitors without clear showroom attribution.

### For sales consultants

- Consultants approach customers without knowing what they already explored.
- Customers repeat the same concerns about reliability, warranty, financing,
  family use, and comparisons.
- Hot buyers can be mixed with passive browsers.
- Follow-up context is often stored in memory or personal WhatsApp threads.

### For customers

- They can learn at their own pace before speaking to a salesperson.
- They can ask for help only when ready.
- They can send a relevant WhatsApp message with vehicle context.
- They can request a test drive or financing discussion without repeating their
  entire journey.

### For GAC and similar brands

- Brand trust objections must be handled consistently.
- Model launch messaging must be controlled and approved.
- Dealer networks need repeatable sales enablement, not just brochures.

## 3. What is included in Version 1

Version 1 includes only the capabilities required to deploy at a dealership,
capture real leads, operate a basic staff workflow, measure results, and repeat
the deployment with controlled services.

### Customer-facing showroom experience

- Kiosk/tablet-optimized vehicle exploration.
- One approved launch vehicle content pack included in the base package.
- Vehicle education sections for trust, safety, warranty/service, comfort,
  technology, value, financing orientation, and selected comparisons.
- Spanish-first dealership experience.
- Touch-first interface with idle reset.
- QR and WhatsApp handoff paths.
- Test-drive request flow.
- Financing interest capture with non-binding disclaimer.
- Advisor request/handoff flow.
- Basic session summary attached to lead records.

### Lead capture

- Lead types:
  - Test drive request.
  - Financing interest.
  - WhatsApp initiation.
  - Advisor request.
- Required lead fields:
  - Name when submitted.
  - Phone/WhatsApp when submitted.
  - Vehicle.
  - Dealership/location.
  - Lead source.
  - Session summary.
  - Lead status.
  - Created and updated timestamps.
- Phone-based deduplication where data is available.
- Consent copy before storing personal information.
- Kiosk PII clearing on reset.

### Staff workflow

- Staff access for dealership users.
- Lead queue with new, claimed, contacted, scheduled, won, and lost statuses.
- Claim and assignment actions.
- Consultant notes.
- Basic lead temperature based on session behavior.
- Handoff alert for advisor requests.
- Test-drive scheduling status fields.
- Financing-interest flag.
- Manual close won/lost outcome entry.
- Exportable lead records.

This is a workflow, not a full dashboard suite. The purpose is to prevent leads
from being missed and to record what happened.

### Reporting

Version 1 reporting is operational and commercial, not business intelligence.

Included reports:

- Sessions started.
- Leads captured by type.
- Session-to-lead conversion rate.
- Advisor request response time.
- Test-drive requests.
- Test-drive scheduled count.
- Test-drive show count if entered by staff.
- Closed won/lost count if entered by staff.
- Leads by vehicle.
- Leads by source.
- Staff claim/contact timing.
- Weekly export for management review.

Reports may be delivered through a simple product screen, CSV export, scheduled
email, or implementation-managed report. Version 1 does not require a polished
executive analytics suite.

### Configuration

- Dealership name, logo, colors, locations, hours, phone numbers, and WhatsApp
  number.
- Staff users and roles.
- Enabled vehicle content packs.
- Dealer disclaimers.
- Financing disclaimer.
- Feature flags for pilot, standard, or enterprise package scope.
- Kiosk/device labels.

### Integrations

Version 1 includes practical integration boundaries, not deep system
replacement.

Included:

- CSV export of leads and outcomes.
- Email notification or operational export for new leads if required.
- Webhook-ready lead payload where technically feasible.
- One standard CRM export format.

Not included by default:

- Bidirectional CRM sync.
- DMS integration.
- Inventory feed integration.
- Finance system integration.
- OEM incentive feed integration.

Any connector beyond the standard export is paid implementation scope.

### Security and privacy baseline

- Staff access control.
- Tenant/dealership scoping of records.
- Consent language before PII capture.
- Basic audit timestamps for lead changes.
- Kiosk idle reset and PII clearing.
- Production, staging, and demo environment separation.
- Error logging and support diagnostics.

## 4. What is NOT included

Version 1 does not include:

- A full CRM.
- A full DMS.
- Inventory management.
- Website replacement.
- E-commerce or online vehicle purchase.
- Payment processing.
- Credit application submission.
- Binding financing quotes.
- Trade-in appraisal engine.
- Service appointment booking.
- Marketing automation.
- Email campaign builder.
- SMS platform.
- AI sales agent.
- Automated negotiation.
- Advanced personalization.
- Enterprise data warehouse.
- Self-service content CMS.
- Fully custom dashboards.
- Bidirectional CRM/DMS sync by default.
- OEM incentive feed ingestion.
- SSO unless separately contracted.
- Custom mobile app.
- Hardware costs unless contracted.
- Unlimited content updates.
- Unlimited custom vehicle pages.
- Unlimited integrations.

Brutal reality: if a dealership wants VIS to become its CRM, BI tool, inventory
system, financing platform, and website, that is not Version 1. That is a custom
enterprise program and should be priced separately.

## 5. Pilot package

The Pilot Package is for Viaggio or a first dealership proving whether VIS
creates measurable showroom value.

### Included

- One dealership rooftop.
- One showroom location.
- One approved vehicle content pack.
- Up to two kiosk/tablet customer devices.
- Up to ten staff users.
- Lead capture for test drive, financing interest, WhatsApp, and advisor
  request.
- Staff lead workflow.
- Basic reporting/export.
- Staff training session.
- Pilot launch checklist.
- Weekly pilot performance report.
- Standard business-hours support.

### Not included

- Deep CRM/DMS integration.
- Multiple rooftops.
- Multiple brands.
- More than one full vehicle content pack.
- Custom dashboards.
- Hardware procurement unless contracted.
- Onsite support unless contracted.
- Unlimited content rewrites.

### Recommended pricing

- Setup / implementation: USD 8,000 to 18,000.
- Monthly SaaS and support: USD 2,000 to 4,000 per rooftop.
- Suggested minimum pilot commitment: three months.

### When to use this package

- Founder deployment at Viaggio.
- First proof with a GAC dealership.
- Dealer group evaluation before broader rollout.

## 6. Standard package

The Standard Package is the normal Version 1 product for a single dealership
rooftop after pilot proof exists.

### Included

- One dealership rooftop.
- One showroom location.
- Up to four customer kiosk/tablet devices.
- Up to twenty-five staff users.
- Up to two approved vehicle content packs.
- Lead capture and staff workflow.
- Basic management reporting/export.
- Dealer-specific configuration.
- Standard CRM export format.
- Staff training and launch support.
- Monthly performance review.
- Standard business-hours support.

### Not included

- Dealer group hierarchy.
- Custom integration beyond standard export.
- DMS integration.
- Enterprise SSO.
- Custom BI dashboards.
- Custom content production beyond contracted vehicle packs.
- Hardware costs.

### Recommended pricing

- Setup / implementation: USD 18,000 to 40,000.
- Monthly SaaS and support: USD 4,500 to 8,500 per rooftop.
- Additional vehicle content pack: USD 5,000 to 15,000 setup plus USD 500 to
  1,500 per month.
- Additional device support beyond included devices: USD 250 to 750 per month
  per device band, depending on support obligations.

### When to use this package

- A dealership has budget ownership and wants VIS as an operating tool.
- The dealership agrees to enforce staff workflow.
- Management wants measurable showroom conversion and follow-up discipline.

## 7. Enterprise package

The Enterprise Package is Version 1 for a dealership group, importer, or OEM
distributor rolling VIS across multiple rooftops with managed configuration.

This is not a self-service enterprise platform. Version 1 Enterprise is a
managed rollout package with common standards and rooftop-level configuration.

### Included

- Multi-rooftop deployment under one commercial agreement.
- Shared brand/model content foundation.
- Rooftop-specific dealership configuration.
- Up to two approved vehicle content packs in the shared base.
- Standard lead capture and staff workflow per rooftop.
- Consolidated monthly group report.
- Standard CRM export format per rooftop.
- Launch playbook for each rooftop.
- Train-the-trainer session for group managers.
- Priority support.

### Not included by default

- Custom SSO.
- Bidirectional CRM or DMS sync.
- Real-time inventory integration.
- OEM pricing/incentive feed integration.
- Custom data warehouse integration.
- Custom group dashboards.
- Unrestricted content localization.
- Guaranteed integration with every rooftop's existing systems.

### Recommended pricing

- Group setup / implementation: USD 45,000 to 120,000.
- Monthly SaaS and support minimum: USD 12,000 to 25,000 per group.
- Per-rooftop monthly SaaS after minimum: USD 3,000 to 6,500 per rooftop,
  depending on volume and support tier.
- Additional rooftop activation: USD 8,000 to 25,000 per rooftop.
- Custom integration: separately scoped, typically USD 20,000 to 100,000 plus
  monthly support.

### When to use this package

- GAC importer/distributor wants controlled rollout across dealerships.
- Dealer group leadership wants common process and reporting.
- The buyer can enforce staff usage across locations.

## 8. Implementation services

VIS Version 1 requires implementation services. It is not a self-serve product.

### Included implementation activities

- Dealership discovery.
- Sales process mapping.
- Package scope confirmation.
- Dealer configuration.
- Content and claim intake.
- Vehicle content setup.
- Media intake and validation.
- Financing and legal disclaimer setup.
- Staff user setup.
- Kiosk/device configuration guidance.
- Production environment setup.
- Launch checklist.
- Staff training.
- Go-live support.
- First reporting cycle setup.

### Paid add-on services

- Additional vehicle content packs.
- Custom photography or video coordination.
- Spanish copywriting beyond standard templates.
- Competitor comparison research.
- CRM connector work.
- Data cleanup.
- Onsite launch support.
- Extra staff training sessions.
- Hardware procurement and installation management.
- Custom legal/compliance review support.
- Custom reporting beyond Version 1 metrics.

### Implementation principle

Implementation fees must cover real work. VIS should not absorb dealership
content cleanup, staff training, hardware problems, or integration complexity
inside a low monthly SaaS fee.

## 9. Customer responsibilities

The customer is the dealership, dealer group, importer, or OEM distributor
buying VIS.

The customer must provide:

1. Executive sponsor.
2. Sales operations owner.
3. Primary implementation contact.
4. Approved dealership information.
5. Approved vehicle specs.
6. Approved warranty and service language.
7. Approved pricing and financing disclaimers.
8. Approved media assets or rights to use provided media.
9. Staff roster and role assignments.
10. Device and network readiness.
11. CRM/export recipient and process owner.
12. Staff availability for training.
13. Agreement on pilot success metrics.
14. Timely feedback on content and launch blockers.
15. Process enforcement after go-live.

The customer is responsible for:

- Accuracy of commercial claims.
- Accuracy of prices, financing ranges, warranty terms, and inventory-related
  statements.
- Staff follow-up behavior.
- Entering outcomes when CRM integration is not included.
- Maintaining WhatsApp response process.
- Providing legally usable assets.
- Ensuring dealership policies allow customer data capture.

If the customer does not enforce staff usage, VIS will not produce reliable ROI.

## 10. Viaggio responsibilities

For the initial Viaggio deployment, Viaggio must act as both customer and
reference operating partner.

Viaggio is responsible for:

1. Naming an executive sponsor.
2. Naming a sales floor owner for daily workflow.
3. Approving GS4 MAX content claims.
4. Approving dealership, warranty, service, financing, and WhatsApp language.
5. Providing or approving production media.
6. Confirming the official WhatsApp line and response process.
7. Confirming test-drive logistics.
8. Confirming financing-disclaimer wording.
9. Providing staff names, roles, and access needs.
10. Training staff to claim and update VIS leads.
11. Enforcing response-time expectations.
12. Recording test-drive, won, lost, and lost-reason outcomes if no CRM
    integration is active.
13. Participating in weekly pilot review.
14. Providing testimonial/case-study approval if results support expansion.

Viaggio should not treat VIS as a passive kiosk. If staff does not use the lead
workflow, the pilot should be considered operationally invalid.

## 11. Pricing assumptions

Recommended Version 1 pricing assumes VIS is sold as dealership operating
software plus implementation, not as a one-off kiosk build.

### Monthly SaaS pricing

| Package | Recommended monthly SaaS and support |
| --- | --- |
| Pilot | USD 2,000 to 4,000 per rooftop |
| Standard | USD 4,500 to 8,500 per rooftop |
| Enterprise | USD 12,000 to 25,000 group minimum, then USD 3,000 to 6,500 per rooftop |

### Setup pricing

| Package | Recommended setup / implementation |
| --- | --- |
| Pilot | USD 8,000 to 18,000 |
| Standard | USD 18,000 to 40,000 |
| Enterprise | USD 45,000 to 120,000 |

### Assumptions behind pricing

- Dealerships pay by rooftop because the value is tied to showroom operations.
- Implementation is mandatory because every dealership requires configuration,
  content approval, staff setup, and launch training.
- Vehicle content packs are paid because content production and approval are
  real cost centers.
- CRM/DMS integration is not included in base SaaS because it creates custom
  implementation and support burden.
- Hardware is not included unless separately contracted.
- Discounts should be tied to multi-rooftop commitments or longer terms, not
  vague promises of future rollout.

### Pricing guardrails

- Do not run free pilots.
- Do not include unlimited customization.
- Do not include deep integrations in base SaaS.
- Do not price solely per user seat; dealership value is not seat-based.
- Do not price solely per lead; attribution disputes will hurt renewals.

## 12. ROI assumptions

VIS ROI depends on lead volume, staff adoption, test-drive conversion, vehicle
gross profit, and whether the dealership records outcomes.

### Basic ROI logic

VIS is financially justified if:

1. It creates incremental qualified leads that would otherwise be missed, or
2. It improves conversion of existing showroom traffic, or
3. It improves staff follow-up discipline enough to recover lost opportunities,
   or
4. It helps sell a vehicle/brand that requires trust-building.

### Example ROI model

Assumptions for a single rooftop:

- Monthly VIS SaaS: USD 5,500.
- Monthly allocated implementation amortization: USD 2,000.
- Total monthly VIS cost for ROI view: USD 7,500.
- Average front/back gross profit per vehicle: USD 1,500 to 3,500.

Break-even:

- At USD 1,500 gross profit, VIS needs roughly 5 incremental vehicle sales per
  month.
- At USD 2,500 gross profit, VIS needs roughly 3 incremental vehicle sales per
  month.
- At USD 3,500 gross profit, VIS needs roughly 2 to 3 incremental vehicle sales
  per month.

This is why VIS must measure sales actions, not only kiosk engagement.

### More realistic near-term ROI proof

For the pilot, do not promise incremental sales immediately. Prove leading
indicators first:

- More consented leads from showroom traffic.
- Faster staff response to hot visitors.
- More test-drive requests.
- Higher test-drive show rate.
- More financing conversations.
- Better lost-reason capture.
- Clearer attribution from showroom engagement to sales activity.

Sales attribution should be measured, but it may lag because automotive buying
cycles, financing, inventory, and family approval can delay purchase.

### ROI risks

VIS ROI will be weak if:

- The dealership has low showroom traffic.
- Staff ignores alerts.
- Management does not enforce follow-up.
- Inventory is unavailable.
- Financing approvals are poor.
- Pricing is not competitive.
- The WhatsApp process is slow.
- Outcomes are not recorded.
- The dealership expects software to replace sales management.

## 13. Success metrics

Version 1 success metrics should be simple, auditable, and tied to dealership
operations.

### Pilot success metrics

| Metric | Definition | Target assumption |
| --- | --- | --- |
| Sessions started | Customer showroom sessions initiated | Establish baseline |
| Lead capture rate | Leads / sessions | 8% to 20% depending on traffic quality |
| Advisor request response time | Median time from request to staff claim | Under 5 minutes; under 2 minutes for best operators |
| Test-drive requests | Submitted test-drive leads | Establish baseline, then improve |
| Test-drive scheduled rate | Scheduled / test-drive requests | 60% to 80% if staff follows up |
| Test-drive show rate | Completed drives / scheduled drives | 60% to 75% realistic target |
| Financing-interest capture | Financing leads or flags | Establish baseline |
| Lead contact rate | Contacted / captured leads | 80%+ within agreed SLA |
| Outcome recording rate | Leads with won/lost/scheduled status | 70%+ during pilot |
| Sales attribution | Sold units matched to VIS lead/session | Track; do not overpromise early |

### Standard package success metrics

| Metric | Definition | Realistic target |
| --- | --- | --- |
| Lead capture rate | Leads / sessions | 10% to 25% |
| Hot lead claim SLA | Hot leads claimed within SLA | 80%+ |
| Contact SLA | Captured leads contacted within agreed window | 85%+ |
| Test-drive show rate | Shows / scheduled | 65%+ |
| Lost reason completeness | Lost leads with reason | 75%+ |
| Staff adoption | Active staff users / assigned staff | 80%+ weekly |
| Lead export completion | Leads delivered to CRM/export process | 95%+ |

### Enterprise package success metrics

| Metric | Definition | Realistic target |
| --- | --- | --- |
| Rooftop launch completion | Rooftops live against launch checklist | 90%+ on agreed rollout plan |
| Standard content adoption | Rooftops using approved content pack | 95%+ |
| Lead process compliance | Rooftops meeting contact/outcome requirements | 75%+ initially |
| Group reporting completeness | Rooftops submitting comparable data | 90%+ |
| Support ticket resolution | Issues resolved within support policy | Per contract |

### Metrics VIS should avoid overpromising

- Guaranteed vehicle sales.
- Guaranteed close-rate lift.
- Guaranteed gross profit.
- Guaranteed CRM data quality.
- Guaranteed staff adoption without management enforcement.

VIS can influence these outcomes, but the dealership controls pricing,
inventory, financing, staff behavior, and closing.

## Version 1 sales position

VIS Version 1 should be sold as:

> A managed showroom conversion product for dealerships that need to capture
> more qualified buyer intent, enforce faster follow-up, and prove what happens
> after customers engage with vehicle content.

It should not be sold as:

- A futuristic AI dealership platform.
- A CRM replacement.
- A generic analytics dashboard.
- A website redesign.
- A one-time kiosk project.

The honest sales promise is:

> VIS will not sell cars by itself. It will make more buyer intent visible,
> actionable, and measurable. If the dealership follows the workflow, VIS should
> help management recover opportunities that are currently missed or handled
> inconsistently.
