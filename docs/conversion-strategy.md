# Conversion Strategy

Conversion framework for Viaggio Digital Showroom — funnel stages, CTAs, WhatsApp integration, and measurable success metrics for Santa Cruz dealership operations.

> **See [Architecture Review](./architecture-review.md)** for P0 gaps addressed in this strategy: financing preview (S26), trade-in intent (S27), TCO calculator (S28), family share (S33), staff handoff (S35–S36), and contextual CTA emergence.

## Conversion Philosophy

The showroom **does not close sales**. It converts **exploration into intent**:

1. **Test drive request** — highest-intent action
2. **WhatsApp conversation** — primary channel for Bolivian buyers
3. **Consultant handoff** — immediate human connection on floor

Every screen should answer: *"What should an excited, informed customer do next?"*

## Funnel Stages

```mermaid
funnel
    title Conversion Funnel
    "Session Start" : 100
    "Vehicle Selected" : 85
    "1+ Theme Viewed" : 70
    "3+ Topics Viewed" : 50
    "Trust Content (Carlos)" : 45
    "Compare or Tour Complete" : 30
    "Conversion Hub Reached" : 20
    "CTA Clicked" : 12
    "Lead Captured" : 8
```

### Stage Definitions

| Stage | Event(s) | Intent Level |
|-------|----------|--------------|
| **Awareness** | `session_started` | Curious |
| **Interest** | `vehicle_selected`, `theme_viewed` | Exploring |
| **Consideration** | `topic_viewed` ×3+, `tour_started` | Evaluating |
| **Validation** | `comparison_viewed`, Carlos topics | Rationalizing |
| **Commercial warm-up** | `tco_calculated`, `financing_preview_viewed`, `trade_in_intent_submitted` | Price-ready |
| **Intent** | `conversion_hub_viewed` | Ready to act |
| **Action** | `test_drive_requested`, `whatsapp_initiated`, `share_initiated`, `staff_handoff_requested` | Committed |

## Primary CTAs

### 1. Prueba de Manejo (Test Drive)

**Priority:** P0 — primary KPI

| Attribute | Value |
|-----------|-------|
| Label | *"Agendá tu prueba de manejo"* |
| Placement | Sticky bar, tour end, compare end, conversion hub |
| Friction | 3 fields: nombre, teléfono, día preferido |
| Confirmation | On-screen success + optional WhatsApp confirm |
| Event | `test_drive_requested` |

**Form copy:**
> *"Manejalo vos mismo. Dejá tus datos y un consultor de Viaggio te confirma por WhatsApp."*

### 2. WhatsApp

**Priority:** P0 — secondary KPI, primary for Bolivia

| Attribute | Value |
|-----------|-------|
| Label | *"Escribinos por WhatsApp"* |
| Placement | Sticky bar (always visible), inline CTAs |
| Behavior | `wa.me` deep link with pre-filled context |
| Fallback | QR code if `wa.me` unavailable on kiosk |
| Event | `whatsapp_initiated` |

**Pre-fill template:**
```
Hola Viaggio, exploré el GAC GS4 MAX en el showroom digital.
Me interesa: [prueba de manejo / información y precio].
Temas que vi: [seguridad, familia, garantía].
Mi nombre: [___]
```

**Viaggio WhatsApp:** Configured in `dealership.json` — Santa Cruz business line.

### 3. Hablar con Consultor

**Priority:** P0 — in-dealership specific (raised per architecture review)

| Attribute | Value |
|-----------|-------|
| Label | *"Un consultor te atiende ahora"* |
| Placement | Conversion hub, after 10+ min session, post-financing preview |
| Behavior | S36 Live Handoff → S35 Staff Dashboard alert (Phase 2, not Phase 3) |
| Event | `staff_handoff_requested`, `consultant_handoff` |

### 4. Compartir con Familia (NEW — P0)

| Attribute | Value |
|-----------|-------|
| Label | *"Enviar resumen a mi familia"* |
| Placement | S13, S12 compare end, S18 session summary |
| Behavior | S33 WhatsApp share with session summary link |
| Event | `share_initiated` |

### 5. Financiamiento / Retoma (NEW — P0 micro-conversions)

| Attribute | Value |
|-----------|-------|
| Labels | *"Ver cuota orientativa"* (S26) · *"Tasación de retoma"* (S27) |
| Placement | S04 economics row, post-TCO (S28), conversion hub |
| Behavior | Enriches lead; routes to consultant or finance desk |
| Events | `financing_preview_viewed`, `trade_in_intent_submitted` |

## CTA Placement Matrix

| Screen | Sticky Bar | Inline CTA | End-of-Flow CTA |
|--------|------------|------------|-----------------|
| S04 Home | ✓ | — | — |
| S06 Tour end | ✓ | — | ✓ Primary |
| S08 Topic | ✓ | Soft (*"¿Querés probarlo?"*) | — |
| S12 Compare | ✓ | — | ✓ Strong |
| S13 Convert Hub | ✓ | All three paths | — |
| Carlos warranty | ✓ | ✓ (*"Agendá servicio post-venta"*) | — |

## Micro-Conversions

Track these as leading indicators:

| Micro-Conversion | Event | Why It Matters |
|------------------|-------|----------------|
| Tour completed | `tour_completed` | Full education → higher close rate |
| Compare expanded | `comparison_row_expanded` | Active evaluation |
| Media played | `media_played` | Emotional engagement |
| 5+ topics viewed | computed `depth_score` | Session quality |
| Carlos content | `topic_viewed` where persona=carlos | Trust building |

## Persona-to-CTA Mapping

| After engaging with... | Recommended CTA | Copy |
|------------------------|-----------------|------|
| Carlos (trust) | Test drive | *"Comprobá lo que te conté — agendá tu prueba"* |
| Diego (family) | WhatsApp | *"¿Tu familia tiene preguntas? Escribinos"* |
| Sofía (desire) | Test drive | *"Sentí el manejo — reservá tu prueba"* |
| Compare | Test drive | *"Los números están. Ahora manejalo."* |

## Urgency & Scarcity — Use Sparingly

**Avoid:** Fake countdown timers, *"solo hoy"*, pressure tactics.

**Acceptable:**
- Factual: *"Unidades disponibles en showroom — consultá color con tu asesor"*
- Seasonal: Viaggio-approved promotions with real end dates (content block, not system-wide)

## Lead Qualification Scoring (Phase 2)

Auto-compute `lead_score` from session:

| Signal | Points |
|--------|--------|
| Tour completed | +20 |
| Compare viewed | +15 |
| Warranty topic viewed | +10 |
| 5+ topics | +10 |
| 15+ min session | +10 |
| Test drive CTA clicked | +25 |
| Return visit (Phase 3) | +20 |

Consultant handoff card shows score tier: *Frío / Tibio / Caliente*

## Metrics Dashboard (Planned)

### Daily (Viaggio sales manager)

| Metric | Source |
|--------|--------|
| Sessions started | `session_started` count |
| Test drive requests | `test_drive_requested` count |
| WhatsApp initiations | `whatsapp_initiated` count |
| Avg. session depth | `depth_score` mean |
| Top topics viewed | `topic_viewed` group by topicId |
| Abandonment rate | `session_abandoned` / sessions |

### Weekly (Marketing)

| Metric | Source |
|--------|--------|
| Funnel conversion rates | Stage-to-stage |
| Persona engagement split | By `personaId` |
| Compare target popularity | By `compareTargetId` |
| Entry source mix | kiosk vs qr vs consultant |

### Monthly (Attribution)

| Metric | Source |
|--------|--------|
| Sales with prior session | CRM match on phone/session |
| Test drive → sale rate | Viaggio CRM |
| Cost per lead | marketing spend / leads |

## CRM Integration (Phase 3)

Lead record exports to Viaggio CRM:

```json
{
  "leadId": "uuid",
  "customerPhone": "+591...",
  "vehicleInterest": "gs4-max",
  "leadScore": 75,
  "topicsExplored": ["safety", "family", "warranty"],
  "preferredPersona": "diego",
  "conversionType": "test_drive",
  "sessionDurationMin": 22
}
```

## A/B Tests (Future)

| Test | Hypothesis |
|------|------------|
| Carlos-first vs Sofía-first tour default | Trust-first improves CTA rate in SC market |
| WhatsApp sticky vs test drive sticky primary | WhatsApp higher in Bolivia |
| 3-field vs 2-field test drive form | Fewer fields = more submissions |
| Compare on hub vs hidden in menu | Visibility increases validation |

## Offline / Kiosk Considerations

- Leads queue locally if Supabase unreachable
- WhatsApp QR always available as backup
- Session data cleared on idle reset (privacy) — events flushed before reset

## Success Targets (Directional — Validate with Viaggio)

| Metric | Baseline (no showroom) | Target (+showroom) |
|--------|------------------------|---------------------|
| Test drives / week | TBD | +30% |
| Qualified WhatsApp leads / week | TBD | +40% |
| Avg. consultant pitch time | TBD | -25% |
| GS4 MAX close rate | TBD | +15% |

*Establish baselines in first 30 days of deployment.*

---

*Related: [User Flows](./user-flows.md) · [Customer Journey](./customer-journey.md) · [Product Vision](./product-vision.md)*
