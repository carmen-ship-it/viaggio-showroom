# VIS Multi-Tenant Architecture

SaaS architecture for VIS as a platform serving multiple countries, dealership
groups, brands, and dealership locations.

Audience: SaaS architects, product owners, implementation teams, security
reviewers, dealership group operators, and enterprise buyers.

This document defines the target Version 1+ architecture required to migrate VIS
from its current single-dealer Viaggio implementation into a multi-tenant
dealership software platform.

## Architecture objective

VIS must support:

- Multiple countries.
- Multiple legal markets and privacy rules.
- Multiple dealership groups.
- Multiple brands per group.
- Multiple dealership rooftops / locations.
- Multiple customer-facing devices per location.
- Multiple staff roles with scoped permissions.
- Group, brand, country, and location-level reporting.

The architecture must preserve VIS's role:

> VIS is the showroom intelligence and conversion layer that captures,
> qualifies, routes, and measures dealership buyer intent.

VIS should not become a CRM, DMS, inventory master, or finance system. The
multi-tenant architecture must make VIS deployable across organizations while
integrating with each dealership's downstream systems.

## Current single-dealer architecture

The current repository is effectively single-tenant:

- One primary dealership configuration lives in `content/shared/dealership.json`.
- Vehicle registry defaults to GS4 MAX and coming-soon GAC models.
- Demo mode contains hardcoded GS4 MAX routes and demo behavior.
- Lead and handoff APIs are stubs and not tenant-scoped.
- Analytics events are browser-only and not persisted.
- Operations surfaces are demo-data-backed.
- There is no organization, dealership group, location, user, role, device, or
  tenant model in production data.

This is acceptable for a prototype or controlled Viaggio pilot. It is not
acceptable for a SaaS platform serving multiple dealerships.

## Design principles

1. Tenant scope on every business record
   - Every session, lead, event, device, staff action, content version, and CRM
     link must include tenant scope.

2. Separate platform hierarchy from dealership operations
   - Platform ownership, country rules, dealership groups, rooftops, brands, and
     users are separate concepts.

3. Configuration before customization
   - Dealer differences should be handled through configuration and content
     packs, not forked code.

4. Shared core, isolated data
   - All tenants use the same application code. Tenant data is isolated by
     database policy, service layer checks, and operational controls.

5. Local market flexibility
   - Countries differ in language, privacy expectations, currency, financing,
     tax, phone formats, WhatsApp practices, and legal disclaimers.

6. Brand and dealer responsibility
   - VIS can store approval states and content versions, but the dealer/OEM owns
     commercial claim accuracy.

7. Enterprise-compatible, not overbuilt
   - The model must support enterprise expansion, but first deployments can use
     a subset of the hierarchy.

## Tenant model

### Definition

A tenant is the top-level commercial and data-isolation boundary for a VIS
customer.

Recommended tenant types:

1. Single dealership tenant
   - One independent rooftop or location.

2. Dealer group tenant
   - One company operating multiple rooftops and potentially multiple brands.

3. Importer / distributor tenant
   - National or regional importer coordinating brand rollout across
     independently owned dealerships.

4. OEM program tenant
   - Brand-level organization using VIS across markets or dealer networks.

### Tenant responsibilities

Each tenant owns or controls:

- Contract.
- Billing relationship.
- Data access boundary.
- Enabled countries.
- Enabled dealership groups.
- Enabled brands.
- Enabled locations.
- User administration policy.
- Integration policy.
- Reporting hierarchy.
- Support tier.
- Data retention policy.

### Tenant fields

Recommended fields:

- `tenant_id`
- `tenant_type`
- `legal_name`
- `display_name`
- `primary_country_code`
- `default_locale`
- `default_currency`
- `status`
- `support_tier`
- `contract_start_at`
- `contract_end_at`
- `data_retention_policy_id`
- `created_at`
- `updated_at`

### Tenant examples

| Tenant type | Example use |
| --- | --- |
| Single dealership | Viaggio Santa Cruz only |
| Dealer group | A group with Santa Cruz, La Paz, and Cochabamba rooftops |
| Importer | GAC Bolivia coordinating approved GAC content across dealers |
| OEM program | GAC regional program across countries |

## Organization model

Organizations represent commercial or operational entities under a tenant.

### Organization levels

Recommended levels:

1. Platform operator
   - VIS internal administration.

2. Country market
   - Bolivia, Paraguay, Peru, etc.

3. Importer / distributor
   - National entity responsible for brand standards.

4. Dealer group
   - Multi-rooftop ownership group.

5. Dealership company
   - Legal dealership operator.

6. Rooftop / location
   - Physical showroom or branch.

7. Department
   - Sales, finance, marketing, management, implementation.

### Organization fields

- `organization_id`
- `tenant_id`
- `parent_organization_id`
- `organization_type`
- `legal_name`
- `display_name`
- `country_code`
- `timezone`
- `currency`
- `locale`
- `status`
- `created_at`
- `updated_at`

### Organization hierarchy example

```text
Tenant: GAC Bolivia Program
  Country Market: Bolivia
    Importer: GAC Bolivia
      Dealer Group: Viaggio Motors
        Dealership Company: Viaggio Motors Bolivia
          Rooftop: Viaggio Santa Cruz
          Rooftop: Viaggio La Paz
          Rooftop: Viaggio Cochabamba
```

The same model can support independent dealerships by using fewer hierarchy
levels.

## Dealership model

A dealership is the operational sales entity where VIS captures and routes
leads.

In many cases, dealership and location are different:

- Dealership: business entity or rooftop operation.
- Location: physical showroom, pop-up showroom, event booth, or kiosk area.

### Dealership fields

- `dealership_id`
- `tenant_id`
- `organization_id`
- `dealer_group_id`
- `country_code`
- `market_code`
- `display_name`
- `legal_name`
- `brand_ids`
- `default_language`
- `default_currency`
- `primary_whatsapp`
- `primary_phone`
- `website`
- `status`
- `crm_integration_id`
- `privacy_policy_url`
- `created_at`
- `updated_at`

### Location fields

- `location_id`
- `tenant_id`
- `dealership_id`
- `organization_id`
- `name`
- `location_type`
- `address`
- `city`
- `region`
- `country_code`
- `timezone`
- `hours`
- `whatsapp`
- `phone`
- `geo_lat`
- `geo_lng`
- `status`

### Device model

Each customer-facing kiosk/tablet and staff device should be registered.

Fields:

- `device_id`
- `tenant_id`
- `dealership_id`
- `location_id`
- `device_type`
- `device_label`
- `assigned_zone`
- `status`
- `last_seen_at`
- `app_version`
- `config_version_id`

Device types:

- Customer kiosk.
- Customer tablet.
- Consultant tablet.
- Manager workstation.
- Event kiosk.

## Brand model

VIS must support multiple brands without making the entire platform generic and
uncontrolled.

### Brand fields

- `brand_id`
- `tenant_id`
- `name`
- `country_code`
- `logo_asset_id`
- `brand_colors`
- `approved_disclaimers`
- `status`

### Brand / dealership relationship

A dealership can sell one or more brands.

Recommended relationship:

- `dealership_brand_id`
- `tenant_id`
- `dealership_id`
- `brand_id`
- `brand_role`
- `status`

Brand roles:

- Primary brand.
- Secondary brand.
- Campaign-only brand.
- Coming-soon brand.

### Content pack relationship

Content should be packaged by brand, country, vehicle, and dealership override.

Example:

```text
Brand: GAC
  Country: Bolivia
    Vehicle: GS4 MAX
      Base approved content pack
      Viaggio Santa Cruz local override
      Campaign-specific financing disclaimer
```

## Vehicle and content model

### Content ownership levels

VIS should support content at these levels:

1. Global platform template.
2. Country market template.
3. Brand-approved content pack.
4. Dealer group override.
5. Dealership/location override.
6. Campaign override.

### Content versioning

Every content item shown to a customer should be traceable.

Recommended fields:

- `content_version_id`
- `tenant_id`
- `brand_id`
- `vehicle_id`
- `country_code`
- `dealership_id` if overridden
- `status`
- `approved_by`
- `approved_at`
- `published_at`
- `effective_from`
- `effective_to`

Content statuses:

- Draft.
- In review.
- Approved.
- Published.
- Archived.

## User permissions

### User model

Users should be global identities with scoped memberships.

Fields:

- `user_id`
- `email`
- `phone`
- `name`
- `status`
- `auth_provider`
- `created_at`
- `updated_at`

### Membership model

Permissions should be granted through memberships scoped to tenant,
organization, dealership, location, brand, or department.

Fields:

- `membership_id`
- `user_id`
- `tenant_id`
- `scope_type`
- `scope_id`
- `role_id`
- `status`
- `created_at`
- `updated_at`

Scope types:

- Platform.
- Tenant.
- Country.
- Organization.
- Dealer group.
- Dealership.
- Location.
- Brand.
- Department.

### Role model

Recommended roles:

1. VIS platform admin
   - Internal VIS operations across tenants.

2. Tenant admin
   - Customer-level administration for contract tenant.

3. Country admin
   - Market-level setup, reporting, disclaimers, and localization.

4. Importer / brand admin
   - Brand content approvals and network reporting.

5. Dealer group admin
   - Group reporting, user management, rollout oversight.

6. Dealership manager
   - Location performance, staff workflow, lead ownership.

7. Sales consultant
   - Claim leads, contact customers, update lead status, add notes.

8. Finance manager
   - View and update financing-interest leads.

9. Marketing user
   - Campaign/source reporting and approved content inputs.

10. Implementation consultant
    - Configure deployments during onboarding.

11. Read-only auditor
    - View reports and audit trails.

### Permission categories

Permissions should be explicit:

- View sessions.
- View leads.
- View PII.
- Claim lead.
- Assign lead.
- Update lead status.
- Add lead note.
- Export leads.
- View reports.
- Manage users.
- Manage dealership config.
- Manage content drafts.
- Approve content.
- Publish content.
- Manage integrations.
- View integration logs.
- Manage billing/entitlements.
- View audit logs.

### PII permissions

PII access should be more restrictive than ordinary lead access.

Example:

- Sales consultant can view PII for leads assigned to their location.
- Dealership manager can view PII for their location.
- Dealer group admin may see aggregated reporting but not all PII by default.
- Importer/OEM user may see aggregate performance and content metrics, not
  customer PII unless explicitly contracted and legally allowed.
- VIS support can access PII only through controlled support procedures.

## Data isolation

### Isolation model

Version 1 multi-tenant VIS can use shared application infrastructure with
tenant-scoped rows, provided isolation is enforced at multiple layers.

Recommended model:

1. Shared application code.
2. Shared database with tenant-scoped tables for early scale.
3. Row-level security or equivalent service-layer enforcement.
4. Tenant-aware API authorization.
5. Tenant-scoped storage paths for media and exports.
6. Tenant-scoped analytics queries.
7. Tenant-scoped integration credentials.

Enterprise option:

- Dedicated database or schema per enterprise tenant if required by contract,
  country law, or security review.

### Tenant-scoped tables

Every business table should include `tenant_id`.

Examples:

- `organizations`
- `dealerships`
- `locations`
- `brands`
- `vehicles`
- `content_versions`
- `devices`
- `sessions`
- `analytics_events`
- `leads`
- `lead_activities`
- `test_drive_requests`
- `handoff_requests`
- `crm_links`
- `integration_logs`
- `users` through memberships
- `audit_logs`

### Country and residency concerns

VIS should track country on records even when tenant ID exists.

Reasons:

- Privacy rules differ by country.
- Consent text differs by country.
- Currency and financing disclaimers differ by country.
- Phone normalization differs by country.
- Reporting may need market-level segmentation.
- Future data residency requirements may require country partitioning.

### Access control checks

Every request should answer:

1. Who is the user?
2. What tenant memberships do they have?
3. What scope are they acting in?
4. What permission is required?
5. Does the record belong to an allowed tenant/scope?
6. Is PII access permitted?

No API should infer scope only from route parameters or client-provided IDs.

### Audit logs

Audit logs should capture:

- User ID or system actor.
- Tenant ID.
- Scope.
- Action.
- Record type.
- Record ID.
- Timestamp.
- Before/after summary when appropriate.
- IP/device metadata when appropriate.

Required audited actions:

- PII view/export.
- Lead status changes.
- Lead assignment changes.
- Content approval/publish.
- Integration credential changes.
- User/role changes.
- Data exports.

## Reporting hierarchy

Reporting should roll up according to the organization model.

### Report levels

1. Location report
   - One showroom, one rooftop, or one event.

2. Dealership report
   - All devices and staff for a dealership.

3. Dealer group report
   - Multiple dealerships under common ownership.

4. Brand report
   - Performance by brand and vehicle across allowed locations.

5. Country report
   - Market-level performance across brands or dealerships.

6. Tenant report
   - Full commercial customer view.

7. Platform report
   - Internal VIS health, usage, support, and billing metrics.

### Report metrics

Core metrics:

- Sessions.
- Leads.
- Session-to-lead rate.
- Lead type mix.
- Test-drive requests.
- Test-drive scheduled/completed/no-show.
- Advisor request response time.
- Financing-interest leads.
- WhatsApp initiations.
- Lead contact rate.
- Outcome recording rate.
- Won/lost counts where synced.
- Content viewed.
- Vehicle interest.
- Device uptime.
- Staff workflow adoption.

### Reporting permissions

Users should only see reports within their scope.

Examples:

- Consultant: their assigned leads and location queue.
- Dealership manager: location-level reporting.
- Dealer group admin: all group rooftops.
- Brand/importer admin: brand performance across authorized rooftops, with PII
  excluded by default.
- VIS platform admin: operational access across tenants with audit controls.

### PII in reporting

Default reporting should be aggregate and PII-free. PII exports should be
separate, permissioned, audited, and limited to dealership operators who need
customer follow-up.

## Integration hierarchy

Integrations can be configured at multiple levels:

1. Tenant-level integration
   - One CRM or reporting destination for the entire tenant.

2. Dealer-group integration
   - Common CRM across multiple rooftops.

3. Dealership/location integration
   - Specific CRM instance, WhatsApp line, export recipient, or workflow.

4. Brand/importer reporting integration
   - Aggregate non-PII reporting feed.

Integration credentials must be scoped to the lowest practical level. A single
integration failure should not expose or block unrelated tenants.

## Configuration resolution

VIS needs deterministic configuration resolution.

Recommended precedence from lowest to highest:

1. Platform default.
2. Country default.
3. Brand default.
4. Tenant default.
5. Dealer group override.
6. Dealership override.
7. Location override.
8. Device override.
9. Campaign/session override.

Example:

```text
Default WhatsApp template
  -> Bolivia Spanish template
  -> GAC brand-approved wording
  -> Viaggio group phone tone
  -> Santa Cruz location address
  -> Kiosk 1 device label
```

Every resolved configuration should record `config_version_id` on sessions and
leads for auditability.

## Future franchise expansion

VIS can support franchise expansion if the platform separates brand standards
from local dealer operations.

### Franchise-ready concepts

- Franchisor / importer / OEM content authority.
- Franchisee / dealership local execution.
- Brand-approved content packs.
- Local disclaimers and legal overrides.
- Shared reporting with PII restrictions.
- Group-level launch standards.
- Location-level staff workflows.
- Franchise compliance reporting.

### Franchise roles

Franchisor or importer:

- Approves brand content.
- Reviews aggregate performance.
- Defines launch standards.
- May fund or mandate rollout.

Dealer group:

- Owns staff process.
- Owns customer follow-up.
- Owns local CRM integration.
- Owns rooftop performance.

Dealership/location:

- Operates devices.
- Claims and follows up leads.
- Records outcomes.
- Maintains local details.

VIS:

- Hosts platform.
- Enforces data scopes.
- Provides configuration and reporting.
- Supports integrations.
- Maintains audit trails.

### Franchise expansion controls

To support franchises, VIS should include:

- Brand content approval states.
- Location launch certification.
- Required disclaimer enforcement.
- Device health monitoring.
- Report templates.
- Tenant/location entitlements.
- Support tiers.
- Local market configuration.

## Migration path from current architecture

The migration should be staged. Do not attempt to jump from single-dealer demo
to full enterprise platform in one release.

### Stage 1: Introduce tenant-aware configuration

Goal:

- Replace single global dealership configuration with tenant/dealership/location
  configuration while keeping Viaggio as the only active tenant.

Actions:

- Create canonical IDs:
  - `tenant_id`
  - `organization_id`
  - `dealership_id`
  - `location_id`
  - `brand_id`
  - `device_id`
- Move `content/shared/dealership.json` into a tenant-aware config structure.
- Add Viaggio as first tenant.
- Add Santa Cruz as first location.
- Add GAC as first brand.
- Ensure routes and content loaders resolve config by tenant context.
- Keep demo mode separate from production tenant config.

Success criteria:

- Viaggio still works exactly as before from a user perspective.
- Code no longer assumes one global dealership.
- Production and demo configs are clearly separated.

### Stage 2: Tenant-scope new backend data

Goal:

- Ensure all new persistent records include tenant/location scope.

Actions:

- Add tenant fields to sessions, leads, handoffs, events, devices, and staff
  records.
- Introduce tenant-aware APIs.
- Reject writes without valid tenant context.
- Store config version on session and lead.
- Add audit events for lead changes.

Success criteria:

- Two dealerships could theoretically write to the same backend without data
  collision.
- Every lead and session can be traced to tenant, dealership, location, device,
  brand, vehicle, and content version.

### Stage 3: Add role-based access control

Goal:

- Prevent staff from seeing or changing data outside their scope.

Actions:

- Add users, memberships, roles, and permissions.
- Scope staff workflows by dealership/location.
- Restrict PII view/export permissions.
- Add audit logging for sensitive actions.

Success criteria:

- Consultant sees only authorized location leads.
- Manager sees authorized location/group reporting.
- Platform admin access is audited.

### Stage 4: Add multi-location support

Goal:

- Support a second location under the same tenant without code forks.

Actions:

- Add location selector/resolution for staff/admin flows.
- Register devices by location.
- Configure location-specific WhatsApp, hours, address, and staff.
- Roll reporting up from location to dealership/group.

Success criteria:

- A second Viaggio location can be configured without changing core code.
- Reports separate and aggregate both locations.

### Stage 5: Add brand and content pack hierarchy

Goal:

- Support multiple brands and vehicle content packs.

Actions:

- Add brand model.
- Add dealership-brand relationship.
- Add content versioning by brand, country, vehicle, and dealership override.
- Add approval workflow metadata.
- Add publish/effective dates.

Success criteria:

- GS4 MAX content can be treated as a GAC Bolivia content pack.
- Another GAC model or brand can be added through content/config, not a fork.

### Stage 6: Add integration scoping

Goal:

- Allow different dealerships or groups to use different CRM/export settings.

Actions:

- Store integration configurations by tenant/group/dealership/location.
- Scope credentials.
- Add integration logs with tenant IDs.
- Route leads to correct CRM/export destination based on location.

Success criteria:

- Two locations can use different export recipients or CRM adapters.
- Integration failures are isolated and traceable.

### Stage 7: Enterprise reporting and franchise controls

Goal:

- Support dealer group, importer, and franchise expansion.

Actions:

- Add reporting rollups.
- Add PII-free brand/importer views.
- Add launch certification.
- Add content approval enforcement.
- Add support for country-level disclaimers and localization.

Success criteria:

- Dealer group can view all owned rooftops.
- Importer/OEM can view brand-level aggregate performance without unnecessary
  PII.
- New franchise locations can be onboarded through a controlled launch process.

## Migration anti-patterns

Avoid:

- Forking the app per dealership.
- Hardcoding dealer IDs into route logic.
- Treating brand as tenant.
- Letting CRM IDs become primary VIS IDs.
- Giving importer/OEM users unrestricted customer PII by default.
- Building enterprise SSO before role scopes are correct.
- Building multi-country reporting before country fields exist on records.
- Mixing demo flags with production tenant configuration.
- Creating one-off content structures for each dealer.

## Recommended initial data model

Minimum tables or collections for multi-tenant readiness:

- `tenants`
- `organizations`
- `dealerships`
- `locations`
- `brands`
- `dealership_brands`
- `vehicles`
- `content_versions`
- `devices`
- `users`
- `memberships`
- `roles`
- `permissions`
- `sessions`
- `analytics_events`
- `leads`
- `lead_activities`
- `test_drive_requests`
- `handoff_requests`
- `crm_links`
- `integration_configs`
- `integration_logs`
- `audit_logs`

For a limited Viaggio rollout, not every admin UI needs to exist immediately.
The data model should still include tenant and location scope from the start.

## Final recommendation

VIS should migrate to multi-tenancy in layers:

1. Tenant-aware configuration.
2. Tenant-scoped persistence.
3. Role-based permissions.
4. Multi-location support.
5. Brand/content pack hierarchy.
6. Integration scoping.
7. Enterprise/franchise reporting.

The critical first step is not building a large enterprise admin console. The
critical first step is making the data model impossible to confuse across
dealerships.

If VIS gets tenant scope, permissions, content versioning, and reporting
hierarchy right early, it can expand from Viaggio to GAC dealerships, dealer
groups, and future franchise networks without rewriting the product.
