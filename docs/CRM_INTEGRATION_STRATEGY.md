# VIS CRM Integration Strategy

Vendor-neutral CRM architecture for VIS.

Audience: CRM architects, dealership systems consultants, implementation teams,
dealership operators, and VIS product owners.

VIS should work with any dealership CRM by using a stable internal lead model,
clear ownership rules, and adapter-based integration. This document focuses on
architecture rather than specific CRM vendors.

## CRM integration principle

VIS is the showroom intelligence and lead origination layer.

The dealership CRM is the system of record for customer ownership, sales
pipeline, long-term follow-up, and final deal outcome.

VIS should not try to become the dealership CRM. VIS should capture showroom
intent, summarize buyer behavior, route the lead quickly, and synchronize the
right context into the CRM.

The target operating model:

```text
Customer showroom activity
  -> VIS session and lead capture
  -> VIS lead qualification and staff handoff
  -> CRM lead/contact/opportunity creation or update
  -> CRM sales process and outcome
  -> VIS receives outcome/status summary for attribution
```

## Core architecture

### VIS canonical objects

VIS should maintain vendor-neutral canonical objects and map them to CRM-specific
fields through adapters.

Required canonical objects:

1. Dealership
2. Location / rooftop
3. Device / kiosk
4. Session
5. Customer identity
6. Lead
7. Lead activity
8. Test drive request
9. Handoff request
10. Staff assignment
11. CRM link
12. Outcome

### CRM adapter pattern

VIS should integrate with CRMs through adapters:

```text
VIS canonical lead
  -> CRM adapter
  -> CRM-specific API, file, webhook, email parser, or import format
```

Each adapter should define:

- Authentication method.
- Field mapping.
- Required fields.
- Optional fields.
- Status mapping.
- Error mapping.
- Retry behavior.
- Rate limits.
- Duplicate handling behavior.
- Supported operations.

Supported operations should be explicit. A CRM adapter may support export only,
one-way push, or bidirectional sync. VIS must not assume all CRMs support all
operations.

### Integration capability levels

VIS CRM integration should be sold and implemented in levels:

1. Minimum viable CRM integration: reliable handoff/export.
2. Phase 2 CRM integration: one-way API or webhook push plus outcome import.
3. Enterprise CRM integration: bidirectional status/outcome sync with audit and
   monitoring.

## 1. Minimum viable CRM integration

Minimum viable CRM integration is the smallest integration that lets VIS operate
commercially without becoming isolated from dealership systems.

It is appropriate for:

- Viaggio pilot.
- First paid deployments.
- Dealerships with limited CRM API access.
- Dealerships that need proof before funding deeper integration.

### Scope

Included:

- VIS creates and stores leads internally.
- VIS exports CRM-ready leads.
- VIS sends new-lead notifications if required.
- VIS provides a stable lead CSV format or structured export.
- VIS records the CRM owner/status manually or through import.
- Dealership staff manually creates or imports leads into CRM.
- VIS receives outcomes through manual update or periodic import.

Not included:

- Real-time CRM API write.
- Bidirectional sync.
- CRM contact merge.
- CRM task automation.
- DMS integration.
- Inventory or finance sync.

### Minimum viable data flow

```text
1. Customer interacts with VIS.
2. Customer submits test drive, financing interest, WhatsApp, or advisor request.
3. VIS creates internal lead with session summary.
4. VIS notifies staff and/or export recipient.
5. Dealership creates/imports lead in CRM.
6. CRM owner or staff records external CRM ID back in VIS if available.
7. Outcome is manually updated in VIS or imported on a schedule.
```

### Minimum viable export methods

At least one should be available:

- CSV export.
- Scheduled email attachment.
- Secure download link.
- CRM-import-ready file.
- Operational email with structured lead body.
- Webhook-ready JSON payload for technical customers.

### Minimum viable lead fields

Required:

- VIS lead ID.
- Dealership ID.
- Location ID.
- Lead created timestamp.
- Customer name, if provided.
- Phone/WhatsApp, if provided.
- Email, if provided.
- Vehicle of interest.
- Lead type.
- Lead source.
- Preferred contact method.
- Consent captured flag.
- Session summary.
- Lead status in VIS.

Recommended:

- Current vehicle.
- Trade-in interest.
- Financing interest.
- Preferred test-drive date/time.
- Topics viewed.
- Comparison viewed.
- Advisor request timestamp.
- Staff owner in VIS.
- Lead temperature.
- UTM/campaign/source metadata.

### Minimum viable success criteria

- No VIS lead is lost.
- Every lead can be exported in a consistent format.
- Staff can see whether a VIS lead has been handed to CRM.
- Manual CRM import can be reconciled to VIS lead ID.
- Outcomes can be recorded for ROI even without API integration.

## 2. Phase 2 CRM integration

Phase 2 integration makes CRM handoff more automated while keeping VIS focused
on showroom origination.

It is appropriate after:

- Pilot lead flow is proven.
- Dealership staff is using VIS.
- CRM data ownership rules are agreed.
- The dealer has API, webhook, or reliable import access.

### Scope

Included:

- One-way lead creation or update into CRM.
- CRM external ID stored in VIS.
- Configurable field mapping.
- Basic duplicate lookup before create where CRM supports it.
- Outcome/status import from CRM on a schedule or webhook.
- Test-drive request export to CRM activity/task/appointment where supported.
- Integration logs and retry handling.

Not included by default:

- Full bidirectional contact merge.
- CRM pipeline automation beyond agreed mappings.
- DMS integration.
- Multi-CRM orchestration.
- Custom sales process redesign.

### Phase 2 data flow

```text
1. VIS lead is created.
2. VIS checks local duplicate rules.
3. VIS adapter checks CRM duplicate rules if supported.
4. VIS creates CRM lead/contact/opportunity or updates existing record.
5. CRM returns external ID.
6. VIS stores CRM link and sync status.
7. VIS sends subsequent lead activities as notes/tasks/events.
8. CRM outcome/status is imported back to VIS for attribution.
```

### Phase 2 supported operations

Required for a Phase 2 adapter:

- `createLead`
- `updateLead`
- `findCustomer`
- `addActivity`
- `recordTestDriveRequest`
- `syncOutcome`
- `getSyncStatus`

Optional:

- `assignOwner`
- `createTask`
- `createAppointment`
- `closeLead`
- `reopenLead`

### Phase 2 mapping approach

VIS should map to CRM concepts using a neutral intermediate model:

| VIS concept | Typical CRM target |
| --- | --- |
| Lead | Lead, prospect, opportunity, or customer inquiry |
| Customer identity | Contact, person account, customer |
| Vehicle interest | Vehicle of interest, product interest, opportunity line |
| Session summary | Note, activity, custom field, attachment |
| Test-drive request | Task, appointment, event, lead activity |
| Financing interest | Lead flag, opportunity note, task for finance |
| Staff owner | CRM owner, assigned salesperson |
| Outcome | Lead status, opportunity stage, close reason |

The adapter decides the exact CRM object because dealership CRMs differ.

## 3. Enterprise CRM integration

Enterprise CRM integration is for dealer groups, importers, or OEM-affiliated
networks where CRM process, reporting, and governance matter across multiple
rooftops.

It should only be sold when the customer can fund implementation, provide CRM
access, and enforce data standards.

### Scope

Included:

- Multi-rooftop CRM mapping.
- Tenant/location-aware CRM routing.
- Bidirectional status and outcome synchronization.
- Customer matching rules by dealership group policy.
- Duplicate prevention with CRM and VIS rules.
- Test-drive lifecycle sync.
- Integration dashboard or operational log.
- Retry queues and dead-letter handling.
- Audit trail for all sync actions.
- Field-level mapping documentation.
- Sandbox testing before production.
- Data reconciliation reports.

Possible paid extensions:

- Multiple CRM adapters under one dealer group.
- SSO-based staff ownership mapping.
- CRM task automation.
- Data warehouse export.
- OEM/importer reporting feed.
- DMS correlation where legally and technically allowed.

### Enterprise data flow

```text
VIS lead/session/event
  -> tenant/location routing
  -> CRM adapter
  -> CRM create/update
  -> CRM owner/status/task updates
  -> VIS sync log
  -> outcome/status import
  -> attribution and group reporting
```

### Enterprise requirements

Before enterprise integration starts, the customer must provide:

- CRM sandbox or test environment.
- API documentation and credentials.
- Field mapping owner.
- Sales process/status definitions.
- Duplicate rules.
- Ownership rules.
- Data retention rules.
- Security requirements.
- Support escalation contacts.
- Acceptance criteria.

Without these, enterprise integration becomes custom consulting risk and should
not be sold as standard SaaS.

## Lead creation

### When VIS creates a lead

VIS should create an internal lead when one of these occurs:

- Test drive request submitted.
- Financing interest submitted or explicitly flagged.
- WhatsApp initiation with identifiable contact information.
- Advisor request submitted.
- Staff manually converts an active session into a lead.
- QR/resume interaction captures consented contact information.

VIS may track anonymous sessions before lead creation, but anonymous sessions
should not become CRM leads without a qualifying action and consented contact
data.

### CRM lead creation rules

Minimum viable:

- VIS creates lead internally.
- CRM creation is manual/export-based.

Phase 2:

- VIS pushes lead to CRM when required fields are present.
- If duplicate exists, VIS updates the existing CRM record or creates an
  activity based on configured rule.

Enterprise:

- CRM creation follows dealership group ownership rules.
- VIS may create lead, contact, opportunity, task, and/or activity depending on
  CRM model.
- All create attempts are logged and retryable.

### Required CRM handoff fields

Every CRM-bound lead should include:

- VIS lead ID.
- VIS session ID.
- Dealership/location.
- Lead source: VIS.
- Source detail: kiosk, QR, WhatsApp, test drive, financing, advisor request.
- Customer contact data.
- Vehicle interest.
- Customer intent.
- Session summary.
- Consent flag.
- Created timestamp.

## Lead updates

VIS should update CRM when meaningful new information appears after lead
creation.

Examples:

- Customer requests advisor after browsing.
- Customer views financing after initial test-drive request.
- Customer sends family share/resume interaction with consented identity.
- Staff claims lead in VIS.
- Test-drive date/time is scheduled in VIS.
- Lead is marked contacted, scheduled, won, or lost in VIS.

### Update strategy

Minimum viable:

- Updates are included in next export or manually entered.

Phase 2:

- Updates are pushed as CRM notes, activities, or field updates.
- VIS stores last successful sync timestamp.

Enterprise:

- Updates are idempotent.
- Update conflicts are handled by ownership rules.
- Sync log records before/after payload, result, and error if any.

### Idempotency rule

VIS must include stable external keys:

- `vis_lead_id`
- `vis_session_id`
- `vis_activity_id`
- `vis_test_drive_id`

CRM adapters should use these keys to prevent repeated exports from creating
duplicate notes or activities.

## Outcome synchronization

Outcome synchronization is required for ROI.

VIS needs to know what happened after handoff:

- Contacted.
- Qualified.
- Test drive scheduled.
- Test drive completed.
- Financing started.
- Closed won.
- Closed lost.
- Lost reason.

### CRM remains outcome system of record

For paid deployments, the CRM should be the long-term system of record for final
sales outcome when a CRM is available.

VIS may hold pilot outcomes manually, but enterprise customers should define CRM
as the source for final won/lost status.

### Outcome sync levels

Minimum viable:

- Staff manually enters outcome in VIS.
- Or VIS imports periodic CSV from CRM.

Phase 2:

- VIS imports CRM status/outcome nightly or receives webhook updates.
- Outcome is matched by CRM external ID, phone, or VIS lead ID field.

Enterprise:

- Bidirectional status mapping is documented.
- CRM final outcome overrides VIS final outcome unless exception rules apply.
- Reconciliation report flags mismatches.

### Outcome fields

Required:

- CRM external ID.
- Outcome status.
- Outcome timestamp.
- Assigned owner.
- Close reason if lost.
- Sold vehicle if won.

Recommended:

- Gross profit band if customer agrees.
- Finance approved/declined status.
- Test-drive completion flag.
- Appointment no-show reason.
- Campaign/source attribution.

## Test drive tracking

Test drives are the most important operational conversion event for VIS Version
1.

### Test-drive lifecycle

VIS should model:

1. Requested.
2. Acknowledged.
3. Scheduled.
4. Confirmed.
5. Completed.
6. No-show.
7. Cancelled.
8. Rescheduled.
9. Converted to sale or follow-up.

### Minimum viable tracking

- VIS captures preferred date/time.
- Staff records scheduled/completed/no-show status.
- Export includes test-drive request fields.

### Phase 2 tracking

- VIS creates CRM task or appointment where supported.
- CRM appointment status syncs back to VIS.
- Staff owner and scheduled time stay aligned.

### Enterprise tracking

- Test-drive activity syncs across VIS and CRM with external ID.
- Status changes are reconciled.
- No-show and completion outcomes feed reporting.
- Dealer group can compare request-to-show performance by rooftop.

### Test-drive ownership

- VIS owns the original request and session context.
- CRM owns the dealership's sales follow-up process.
- If the CRM has appointment functionality, CRM should own the official
  appointment record after sync.
- VIS should retain a linked record for attribution.

## Customer matching

Customer matching must be conservative. Bad matches are worse than duplicates
because they can expose private data or corrupt CRM records.

### Matching identifiers

Priority order:

1. CRM external ID already linked to VIS lead.
2. Exact phone/WhatsApp normalized to country format.
3. Exact email.
4. Exact phone plus vehicle interest/date window.
5. Name plus phone fragment only as a manual review hint.

Do not automatically match on name alone.

### Phone normalization

VIS should normalize phone numbers before matching:

- Country code.
- Remove spaces, punctuation, and formatting.
- Store raw and normalized values.
- Track WhatsApp-capable number where known.

### Matching confidence

Use confidence levels:

- High: CRM ID, exact normalized phone, exact email.
- Medium: phone plus recent matching lead context.
- Low: name similarity or partial contact data.

Only high-confidence matches should auto-update CRM records. Medium and low
confidence matches should create a review flag or a new lead depending on dealer
policy.

## Duplicate prevention

Duplicate prevention should happen in both VIS and CRM integration layers.

### VIS duplicate prevention

VIS should detect possible duplicates using:

- Normalized phone.
- Email.
- Active lead window.
- Vehicle interest.
- Dealership/location.
- Recent session activity.

Recommended default:

- If same phone and same vehicle at same rooftop within 30 days, enrich existing
  open lead instead of creating a new lead.
- If prior lead is closed lost, create a new activity or reopen based on dealer
  policy.
- If prior lead is closed won, create a new lead only if new vehicle interest or
  configured time window applies.

### CRM duplicate prevention

Before CRM create, adapter should:

- Search by external VIS lead ID.
- Search by normalized phone.
- Search by email.
- Search by active CRM lead/opportunity for same vehicle/location if supported.

If duplicate is found:

- Update existing record, or
- Add activity/note, or
- Create a new opportunity under existing contact,
depending on configured CRM ownership rules.

### Duplicate audit

Every duplicate decision should be logged:

- Matching fields.
- Confidence.
- Action taken.
- CRM record linked.
- User or system actor.
- Timestamp.

## CRM ownership rules

Ownership rules prevent VIS and CRM from fighting over records.

### System of record rules

| Data category | System of record |
| --- | --- |
| Anonymous session behavior | VIS |
| Customer consent captured in VIS | VIS, exported to CRM |
| Original showroom source and session summary | VIS |
| CRM customer/contact master | CRM |
| Sales pipeline stage | CRM after sync |
| Final won/lost outcome | CRM for integrated deployments |
| Staff follow-up tasks | CRM if supported; otherwise VIS in V1 |
| Test-drive request origin | VIS |
| Official test-drive appointment | CRM if supported; otherwise VIS |
| Content version shown | VIS |

### Owner assignment rules

Minimum viable:

- VIS records the staff user who claimed the lead.
- Dealership manually assigns CRM owner.

Phase 2:

- VIS can send preferred owner to CRM.
- CRM may accept, override, or assign by its own rules.
- VIS stores actual CRM owner if returned.

Enterprise:

- Assignment rules are configured by rooftop.
- CRM owner is source of truth after record creation.
- VIS displays CRM owner but does not override unless allowed.

### Conflict rules

Recommended defaults:

- CRM final status overrides VIS final status.
- VIS new session activity can add notes to a closed/lost CRM lead but should
  not reopen it automatically unless configured.
- VIS should never overwrite CRM customer master fields without explicit policy.
- VIS may update CRM lead source/session fields it owns.
- Manual CRM changes should be imported back to VIS where relevant.

## Vendor-neutral integration contract

VIS should expose a canonical lead payload independent of CRM vendor.

### Example canonical lead payload

```json
{
  "visLeadId": "lead_123",
  "visSessionId": "session_456",
  "dealershipId": "viaggio",
  "locationId": "santa-cruz",
  "createdAt": "2026-06-17T15:00:00.000Z",
  "leadType": "test_drive",
  "leadSource": "vis_kiosk",
  "customer": {
    "name": "Cliente Ejemplo",
    "phoneRaw": "+591 700 00000",
    "phoneNormalized": "+59170000000",
    "email": null,
    "preferredContactMethod": "whatsapp"
  },
  "vehicle": {
    "make": "GAC",
    "model": "GS4 MAX",
    "modelYear": 2025,
    "trim": null,
    "vehicleSlug": "gs4-max"
  },
  "intent": {
    "testDriveRequested": true,
    "financingInterest": false,
    "advisorRequested": false,
    "whatsappInitiated": true
  },
  "testDrive": {
    "preferredDate": "2026-06-20",
    "preferredTime": "afternoon",
    "status": "requested"
  },
  "sessionSummary": {
    "durationSeconds": 720,
    "topicsViewed": ["warranty", "safety", "compare"],
    "comparisonViewed": "corolla-cross",
    "leadTemperature": "hot"
  },
  "consent": {
    "piiCaptureConsent": true,
    "contactConsent": true,
    "consentCapturedAt": "2026-06-17T15:00:00.000Z"
  }
}
```

Adapters may transform this into CRM-specific fields, but the canonical payload
should remain stable.

## Integration logs and retries

Every CRM integration beyond manual export should include sync logs.

Required log fields:

- VIS record ID.
- CRM adapter name.
- Operation.
- Request timestamp.
- Response timestamp.
- Status: pending, success, failed, retrying, dead-letter.
- CRM external ID if available.
- Error code.
- Error message.
- Retry count.

Retry rules:

- Retry transient network/API failures.
- Do not retry validation failures indefinitely.
- Dead-letter records requiring human action.
- Preserve original payload for audit.

## Implementation checklist

Before any CRM integration project, confirm:

1. Which CRM is system of record.
2. Whether API access exists.
3. Whether sandbox access exists.
4. Required fields for lead creation.
5. Required fields for customer matching.
6. Duplicate rules.
7. Sales statuses and close reasons.
8. Test-drive object model.
9. Staff owner mapping.
10. Consent/privacy requirements.
11. Import/export format.
12. Expected sync frequency.
13. Error handling contacts.
14. Acceptance criteria.
15. Who owns post-launch support.

If these cannot be answered, implement minimum viable export first.

## Recommended rollout

### For Viaggio pilot

Use minimum viable CRM integration:

- VIS internal lead capture.
- CSV or structured export.
- Manual CRM entry/import.
- Manual or scheduled outcome import.
- VIS lead ID carried into CRM where possible.

Reason: prove lead value before spending on custom integration.

### For first paid deployment

Use Phase 2 if CRM access is available:

- One-way create/update.
- CRM external ID stored in VIS.
- Outcome import.
- Test-drive task/appointment where supported.

If CRM access is weak, keep minimum viable export but price and document the
manual process clearly.

### For dealership group / enterprise

Use enterprise integration only when:

- Customer funds integration work.
- CRM standards are documented.
- Ownership rules are signed off.
- Test environment exists.
- Rollout includes support and monitoring budget.

## Final position

VIS should be CRM-neutral and CRM-respectful.

The product should own showroom intelligence, lead origination, session context,
and fast handoff. The dealership CRM should own customer master data, sales
pipeline, long-term follow-up, and final outcome.

The right integration strategy is not to build one-off vendor logic into the
core product. The right strategy is:

1. Stable VIS canonical lead model.
2. Clear ownership rules.
3. Conservative matching and dedupe.
4. Adapter-based CRM connectors.
5. Export-first pilot path.
6. Paid integration depth only after dealership value is proven.
