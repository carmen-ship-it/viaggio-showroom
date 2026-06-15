# CPI-OS — Intelligence Timeline Specification

**Artifact type:** Presentation-only executive visualization (not a customer or ops product screen)  
**Purpose:** Canonical data model for the **Familia Mendoza** journey — first marketing touch to closed sale — for keynote, board, and investor contexts  
**Companion design doc:** [`CPI_OS_INTELLIGENCE_TIMELINE_MOCKUP.md`](./CPI_OS_INTELLIGENCE_TIMELINE_MOCKUP.md)  
**Canon sources:** [Storyboard](./CPI_OS_WOW_PRESENTATION_STORYBOARD_ES.md) · [Executive Narrative](./CPI_OS_EXECUTIVE_NARRATIVE_ES.md) · [Presentation Gap Audit](./CPI_OS_PRESENTATION_GAP_AUDIT.md)

**Version:** 1.0 · Junio 2026

---

## Executive summary

The **Intelligence Timeline** is a single cinematic artifact that answers the question every dealership owner asks after watching a kiosk demo:

> *"¿Pero cómo sé que el anuncio de Instagram trajo esta venta — y qué aprendió mi empresa en el camino?"*

It is **not** a CRM pipeline view. It is a **Palantir-style decision graph** overlaid on a **14-day human story**: Carla sees a Reel, Roberto scans a QR, the family explores without pressure, Javier arrives with context in 90 seconds, a grandmother validates warranty on WhatsApp, and fourteen days later Viaggio delivers a GS4 MAX GT gris.

Each of **13 events** carries six fields — timestamp, source, actor, screen, intelligence generated, business value — plus cumulative learning for the institution. Marketing sees attribution. Sales sees handoff quality. The owner sees revenue with causality.

This document is the **source of truth for data**. The mockup companion defines **how it looks and moves** on a 4K keynote stage.

---

## Cast and deal constants

| Field | Value |
|-------|-------|
| **Household** | Familia Mendoza — Roberto (38), Carla (36), Mateo (8), Sofía (5) |
| **Consultant** | Javier Ríos — asesor senior, Viaggio Motors |
| **Dealership** | Viaggio Motors · Av. Banzer, Santa Cruz de la Sierra |
| **Vehicle** | GAC GS4 MAX GT · Gris metálico |
| **Competitor considered** | Toyota Corolla Cross |
| **Trade-in signal** | Toyota Etios 2018 |
| **Campaign ID** | `instagram_equipetrol_familia_jun2026` |
| **Session ID** | `sess_mendoza_20260607_k1` |
| **Lead ID** | `lead_mendoza_20260607` |
| **Journey duration** | 14 días (5 Jun → 19 Jun 2026) |
| **Attributed revenue** | USD 28,900 (orientativo piloto) |

---

## Event schema (data model)

Every timeline node conforms to this schema. Implementations (Figma, After Effects, React) must not invent fields outside this contract without updating the spec.

```typescript
interface IntelligenceTimelineEvent {
  /** Stable key for i18n and animation */
  id: IntelligenceEventId;
  /** Display order 1–13 */
  sequence: number;
  /** ISO 8601 with America/La_Paz offset */
  timestamp: string;
  /** Human label for keynote, es-BO */
  label: string;
  /** System layer that emitted or captured the event */
  source: EventSource;
  /** Primary human or system actor */
  actor: string;
  /** CPI-OS screen ID, route, or external surface */
  screen: ScreenRef;
  /** Structured signals produced at this moment */
  intelligenceGenerated: IntelligenceSignal[];
  /** Plain-language outcome for executives */
  businessValue: string;
  /** Running temperature after event */
  leadTemperature?: "cold" | "warm" | "hot";
  /** Cumulative depth score 0–100 */
  sessionDepthScore?: number;
  /** Attribution tags for marketing chain */
  attributionTags?: string[];
}

type IntelligenceEventId =
  | "instagram_ad"
  | "qr_scan"
  | "pre_visit_landing"
  | "showroom_arrival"
  | "kiosk_session"
  | "trust_tour"
  | "competitor_comparison"
  | "financing"
  | "advisor_request"
  | "javier_assigned"
  | "test_drive"
  | "follow_up"
  | "closed_won";

type EventSource =
  | "meta_ads"
  | "mobile_web"
  | "showroom_iot"
  | "kiosk_cpi"
  | "staff_tablet"
  | "whatsapp"
  | "crm_zoho"
  | "cpi_analytics";

interface ScreenRef {
  id: string;           // e.g. "S21", "S35", "EXT_IG"
  route?: string;         // e.g. "/visit/gs4-max"
  label: string;          // Display name
  viewport?: string;      // e.g. "390×844", "1920×1080"
}

interface IntelligenceSignal {
  key: string;
  value: string | number | boolean;
  category: "intent" | "objection" | "persona" | "economic" | "attribution" | "ops";
}
```

### Cumulative intelligence layers

After each event, three accumulation streams update. The timeline visualization should show these as **side-rail meters**, not CRM fields.

| Layer | Description | Example after event 8 |
|-------|-------------|---------------------|
| **Customer intent** | What the buyer is moving toward | Prueba de manejo + financiamiento 36m |
| **Institutional memory** | Patterns added to company knowledge | "Marca china" + "repuestos SCZ" frequency |
| **Attribution graph** | Nodes on path to revenue | IG → QR → Kiosco → Javier → (pending) |

---

## Full event table — Familia Mendoza

### Event 1 — Instagram Ad

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-05T21:14:32-04:00` · Jueves noche |
| **Source** | `meta_ads` |
| **Actor** | Carla Mendoza |
| **Screen** | `EXT_IG` · Instagram Reels · 9:16 · campaña `instagram_equipetrol_familia_jun2026` |
| **Intelligence generated** | `campaign_id`: instagram_equipetrol_familia_jun2026 · `creative_variant`: reel_familia_garantia_v3 · `placement`: equipetrol_feed · `impression_id`: imp_8f2a… · `first_touch_channel`: paid_social · `household_id`: hh_mendoza (probabilistic match post-scan) · `objection_seed`: marca_china (Roberto ambient dismiss) |
| **Business value** | Top-of-funnel entry at **zero showroom cost**. Campaign tagged for later ROI — owner can answer *which ad started this deal*. |
| **Temperature** | — (pre-session) |
| **Depth** | 0 |

---

### Event 2 — QR Scan

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-05T21:17:08-04:00` |
| **Source** | `mobile_web` |
| **Actor** | Carla Mendoza |
| **Screen** | Camera iOS → deep link `https://viaggio.bo/v/gs4-max?utm_campaign=instagram_equipetrol_familia_jun2026` |
| **Intelligence generated** | `qr_scan`: true · `utm_source`: instagram · `utm_campaign`: instagram_equipetrol_familia_jun2026 · `device`: iPhone 15 · `geo`: Santa Cruz · `scan_to_impression_seconds`: 156 · `pre_visit_token`: pv_mendoza_9k2f (issued) |
| **Business value** | **Marketing attribution lock-in** — bridges paid impression to identifiable pre-visit session. Without this, the Saturday walk-in looks like walk-in traffic. |
| **Temperature** | cold → warm (latent) |
| **Depth** | 5 |

---

### Event 3 — Pre-Visit Landing

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-05T21:17:15` – `21:22:40-04:00` |
| **Source** | `mobile_web` |
| **Actor** | Carla Mendoza (+ Roberto over-shoulder) |
| **Screen** | **S21** · `/visit/gs4-max` · 390×844 |
| **Intelligence generated** | `trust_strip_viewed`: [garantía_5a, taller_viaggio, respaldo_local] · `carlos_clip_played`: true · `clip_completion_pct`: 78 · `path_selected`: ya_investigue_online · `objections_touched`: [marca_china] · `pre_visit_depth_seconds`: 325 · `resume_token`: s37_mendoza_9k2f |
| **Business value** | **Objection defused before Saturday** — 9/10 first-time GAC buyers ask about trust; Carla arrives Friday-night educated. Reduces Saturday consult time ~15 min. |
| **Temperature** | warm |
| **Depth** | 22 |

---

### Event 4 — Showroom Arrival

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T10:28:00-04:00` · Sábado |
| **Source** | `showroom_iot` |
| **Actor** | Familia Mendoza (4) |
| **Screen** | Physical · Viaggio Motors piso · **S01** attract loop visible on Kiosco 1 |
| **Intelligence generated** | `arrival_type`: campaign_attributed_walk_in · `pre_visit_token_matched`: s37_mendoza_9k2f · `party_size`: 4 · `kiosk_proximity`: Kiosco 1 · `vehicle_on_floor`: GS4 MAX GT gris · `wait_before_touch_seconds`: 0 (no intercept) · `campaign_recognition`: "Es el que vimos anoche" |
| **Business value** | **Proof pre-visit worked** — family self-directed to correct kiosk/vehicle. No greeter bandwidth wasted on cold intercept. |
| **Temperature** | warm |
| **Depth** | 28 |

---

### Event 5 — Kiosk Session

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T10:30:12` – `10:37:45-04:00` |
| **Source** | `kiosk_cpi` |
| **Actor** | Roberto Mendoza (primary touch) |
| **Screen** | **S01** → **S02** → **S03** → **S22** · Kiosco 1 · 1920×1080 |
| **Intelligence generated** | `session_id`: sess_mendoza_20260607_k1 · `welcome_path`: ya_investigue_online · `resume_banner_shown`: true · `vehicle_locked`: gs4-max · `hero_hotspots_touched`: [motor, seguridad, maletero] · `persona_signals`: {tecnico: 0.4, familiar: 0.35, valor: 0.25} · `session_minutes`: 7 · `lead_capture`: anonymous → identified pending |
| **Business value** | Session **continuity from QR** — no re-explaining from zero. Kiosk acts as always-on best salesperson; human not deployed yet. |
| **Temperature** | warm |
| **Depth** | 45 |

---

### Event 6 — Trust Tour

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T10:38:00` – `10:52:18-04:00` |
| **Source** | `kiosk_cpi` |
| **Actor** | Roberto Mendoza |
| **Screen** | **S25** FAQ → **S24** Trust Story → **S06** Carlos trust tour → **S08** ADAS · + **S06** Diego family (Carla, 10:48) |
| **Intelligence generated** | `faqs_opened`: [marca_china, repuestos_scz, reventa] · `trust_tour_completed`: carlos_5_steps · `adas_depth`: true · `diego_family_tour`: true · `objections_resolved`: [marca_china, repuestos_scz] · `objections_open`: [reventa] · `persona_shift`: {tecnico: 0.35, familiar: 0.50, valor: 0.15} · `trust_signals_count`: 6 |
| **Business value** | **Brand-china wall lowered** — institutional FAQ + Carlos replace 15 min of repetitive vendor pitch. Company learns which trust assets convert this segment. |
| **Temperature** | warm → hot (rising) |
| **Depth** | 68 |

---

### Event 7 — Competitor Comparison

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T10:54:22-04:00` |
| **Source** | `kiosk_cpi` |
| **Actor** | Roberto Mendoza |
| **Screen** | **S11** Compare Hub → **S12** Compare Detail · vs `toyota-corolla-cross` |
| **Intelligence generated** | `competitor_selected`: Toyota Corolla Cross · `compare_categories_viewed`: 8 · `honest_loss_row_viewed`: reventa_historica · `gs4_wins`: [equipamiento, garantía, espacio] · `buyer_quote_signal`: "al_menos_no_mienten" · `competitive_intent_score`: 0.82 |
| **Business value** | **Honest compare builds credibility** — data shows sessions with honest compare close +22% vs no compare. Marketing gets competitor mix for creative. |
| **Temperature** | hot |
| **Depth** | 78 |

---

### Event 8 — Financing

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T11:02:10` – `11:05:44-04:00` |
| **Source** | `kiosk_cpi` |
| **Actor** | Roberto Mendoza |
| **Screen** | **S26** Financing Preview → **S13** Conversion Hub |
| **Intelligence generated** | `trim_selected`: GT · `color_interest`: gris · `plazo_months`: 36 · `cuota_orientativa_usd`: 412 · `trade_in_signal`: Toyota Etios 2018 · `financing_interest_flagged`: true · `recap_chips`: [vs Corolla Cross, garantía, retoma Etios] · `conversion_hub_viewed`: true |
| **Business value** | **Economic qualification before human** — finance desk receives trim, plazo, retoma on handoff. Fewer surprises, faster close. |
| **Temperature** | hot |
| **Depth** | 87 |

---

### Event 9 — Advisor Request

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T11:06:33-04:00` |
| **Source** | `kiosk_cpi` |
| **Actor** | Roberto Mendoza |
| **Screen** | **S36** Consultant Live Handoff (modal) · triggered from **S13** |
| **Intelligence generated** | `handoff_requested`: true · `handoff_type`: advisor_now · `lead_id`: lead_mendoza_20260607 · `temperature`: hot · `priority_score`: 94 · `wait_timer_started`: true · `sla_target_seconds`: 120 · `brief_auto_generated`: true · `suggested_opening`: "Vi que comparaste el GS4 MAX con el Corolla Cross…" |
| **Business value** | **Anonymous visit becomes named opportunity** — floor team alerted with full context, not "¿en qué le ayudo?". |
| **Temperature** | hot |
| **Depth** | 87 |

---

### Event 10 — Javier Assigned

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T11:08:05-04:00` |
| **Source** | `staff_tablet` |
| **Actor** | Javier Ríos |
| **Screen** | **S35** `/staff` · Lead queue + Handoff brief |
| **Intelligence generated** | `consultant_id`: javier_rios · `claim_latency_seconds`: 92 · `sla_met`: true · `handoff_brief_delivered`: [vehículo, comparación, cuota_36m, retoma_etios, objeciones, persona_mixto, apertura_sugerida] · `staff_tablet_alert`: HANDOFF_CALIENTE · `kiosk_id`: Kiosco 1 |
| **Business value** | **90-second contextual approach** — consultant skips catalog monologue. Owner metric: first-contact SLA compliance. |
| **Temperature** | hot |
| **Depth** | 87 |

---

### Event 11 — Test Drive

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-07T11:32:00` – `12:05:00-04:00` (drive) · scheduled slot `15:00` also captured **S14**/`S34` |
| **Source** | `kiosk_cpi` + `staff_tablet` |
| **Actor** | Javier Ríos · Familia Mendoza (4) |
| **Screen** | **S14** Test Drive Form → **S34** Logistics → physical prueba · GS4 MAX GT gris |
| **Intelligence generated** | `test_drive_scheduled`: 2026-06-07T15:00 · `test_drive_executed`: 2026-06-07T11:32 (adelantada) · `party_in_vehicle`: 4 · `child_seats`: 2 · `post_drive_sentiment`: positive · `topics_reinforced`: [espacio_trasero, adas] · `whatsapp_confirm_sent`: true · `stage`: qualified_test_drive |
| **Business value** | **Qualified test drive** — family already educated; drive validates feeling, not specs. Conversion prueba→venta lifts when CPI-OS precedes. |
| **Temperature** | hot |
| **Depth** | 92 |

---

### Event 12 — Follow-Up

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-10T14:22:18-04:00` · Martes (+3 días) |
| **Source** | `whatsapp` + `mobile_web` |
| **Actor** | Carla Mendoza · decisor secundario (abuela) |
| **Screen** | **S33** Family Share · WhatsApp grupo "Familia Mendoza" · **S29** warranty deep-link |
| **Intelligence generated** | `family_share_sent`: 2026-06-07T20:15 · `share_opened`: 2026-06-08 · `secondary_decider_active`: true · `abuela_objection`: garantía_motor · `warranty_link_clicked`: true · `follow_up_owner`: javier_rios · `financing_simulation_requested`: 2026-06-12 · `stage`: negotiation |
| **Business value** | **60% SUV deals need off-floor decider** — WhatsApp summary brought grandmother into loop without second showroom visit. Company learns family-cycle patterns. |
| **Temperature** | hot |
| **Depth** | 95 |

---

### Event 13 — Closed Won

| Field | Value |
|-------|-------|
| **Timestamp** | `2026-06-19T16:45:00-04:00` · Jueves · **14 días** desde primer touch |
| **Source** | `crm_zoho` + `cpi_analytics` |
| **Actor** | Roberto Mendoza · Patricia (finanzas) · Javier Ríos |
| **Screen** | CRM contrato + CPI-OS attribution record |
| **Intelligence generated** | `outcome`: closed_won · `vehicle_delivered`: GS4 MAX GT gris · `revenue_usd`: 28900 · `attribution_chain`: [instagram_equipetrol_familia_jun2026, qr_scan, pre_visit, kiosk_sess, javier_rios] · `cycle_days`: 14 · `objections_overcome`: [marca_china, repuestos_scz] · `competitor_beaten`: Corolla Cross · `trade_in`: Etios 2018 · `digital_touchpoints`: 11 · `pattern_registered`: familia_equipetrol_gac_trust_compare_finance |
| **Business value** | **Full-loop ROI** — owner sees Instagram → USD 28,900 with lesson encoded for next family. Marketing justifies spend; sales validates SLA; institution retains pattern after Javier's vacation. |
| **Temperature** | hot → **won** |
| **Depth** | 100 |

---

## Intelligence accumulation summary

| After event | Intent state | Top objections | Persona | Key ops metric |
|-------------|--------------|----------------|---------|----------------|
| 3 Pre-visit | Curious, trust-seeking | Marca china | — | Pre-visit depth 325s |
| 6 Trust tour | Educated, family-fit | Repuestos resolved | Familiar-dominant | Trust signals 6 |
| 8 Financing | Ready to commit economically | Reventa open | Mixto | Cuota 36m / retoma |
| 10 Javier assigned | Human close | — | — | SLA 92s ✓ |
| 11 Test drive | Emotional validation | — | — | 4 occupants |
| 12 Follow-up | Multi-decider align | Garantía (abuela) | Familiar | Secondary decider on |
| 13 Closed won | — | Overcome | — | 14-day cycle |

---

## Attribution chain (owner / marketing)

Linear chain for Sankey and executive report **5.3**. All nodes must appear in timeline animation.

```
Meta Ads (instagram_equipetrol_familia_jun2026)
  → QR Scan (utm locked)
    → Pre-Visit S21 (pv token)
      → Kiosk Session (sess_mendoza_20260607_k1)
        → Lead (lead_mendoza_20260607)
          → Consultant (javier_rios)
            → Test Drive
              → Closed Won (USD 28,900)
```

**Marketing KPIs derivable from this chain:**

| Metric | Mendoza value |
|--------|---------------|
| Impressions → QR scan | 12,400 → 1 (household) |
| QR → showroom (7d) | 1 → 1 |
| Showroom → test drive | 1 → 1 |
| Test drive → close (14d) | 1 → 1 |
| Cost per attributed sale | Bs. XXX (campaign spend / 1) |
| Creative insight | Familia + garantía beat precio-only |

---

## JSON payload — React / API reference

Full timeline document for presentation component. See mockup for render contract.

```json
{
  "meta": {
    "version": "1.0",
    "presentationOnly": true,
    "household": "Familia Mendoza",
    "dealership": "Viaggio Motors",
    "campaignId": "instagram_equipetrol_familia_jun2026",
    "journeyDays": 14,
    "locale": "es-BO",
    "timezone": "America/La_Paz"
  },
  "deal": {
    "vehicle": "GAC GS4 MAX GT",
    "color": "Gris metálico",
    "competitor": "Toyota Corolla Cross",
    "tradeIn": "Toyota Etios 2018",
    "revenueUsd": 28900,
    "consultant": "Javier Ríos",
    "closedAt": "2026-06-19T16:45:00-04:00"
  },
  "attributionChain": [
    "instagram_equipetrol_familia_jun2026",
    "qr_scan",
    "pre_visit_landing",
    "kiosk_session",
    "javier_assigned",
    "test_drive",
    "closed_won"
  ],
  "events": [
    {
      "id": "instagram_ad",
      "sequence": 1,
      "timestamp": "2026-06-05T21:14:32-04:00",
      "label": "Anuncio Instagram",
      "source": "meta_ads",
      "actor": "Carla Mendoza",
      "screen": { "id": "EXT_IG", "label": "Instagram Reels", "viewport": "9:16" },
      "intelligenceGenerated": [
        { "key": "campaign_id", "value": "instagram_equipetrol_familia_jun2026", "category": "attribution" },
        { "key": "first_touch_channel", "value": "paid_social", "category": "attribution" }
      ],
      "businessValue": "Entrada de funnel con campaña etiquetada para ROI posterior.",
      "sessionDepthScore": 0
    },
    {
      "id": "qr_scan",
      "sequence": 2,
      "timestamp": "2026-06-05T21:17:08-04:00",
      "label": "Escaneo QR",
      "source": "mobile_web",
      "actor": "Carla Mendoza",
      "screen": { "id": "EXT_QR", "route": "/v/gs4-max", "label": "Deep link QR" },
      "intelligenceGenerated": [
        { "key": "utm_campaign", "value": "instagram_equipetrol_familia_jun2026", "category": "attribution" },
        { "key": "pre_visit_token", "value": "pv_mendoza_9k2f", "category": "attribution" }
      ],
      "businessValue": "Atribución marketing: clic conectado a visita futura.",
      "leadTemperature": "warm",
      "sessionDepthScore": 5
    },
    {
      "id": "pre_visit_landing",
      "sequence": 3,
      "timestamp": "2026-06-05T21:17:15-04:00",
      "label": "Landing pre-visita",
      "source": "mobile_web",
      "actor": "Carla Mendoza",
      "screen": { "id": "S21", "route": "/visit/gs4-max", "label": "Pre-Visit Landing", "viewport": "390×844" },
      "intelligenceGenerated": [
        { "key": "carlos_clip_played", "value": true, "category": "intent" },
        { "key": "objections_touched", "value": "marca_china", "category": "objection" },
        { "key": "resume_token", "value": "s37_mendoza_9k2f", "category": "attribution" }
      ],
      "businessValue": "Confianza construida antes del sábado; menos tiempo de vendedor.",
      "leadTemperature": "warm",
      "sessionDepthScore": 22
    },
    {
      "id": "showroom_arrival",
      "sequence": 4,
      "timestamp": "2026-06-07T10:28:00-04:00",
      "label": "Llegada al showroom",
      "source": "showroom_iot",
      "actor": "Familia Mendoza",
      "screen": { "id": "S01", "label": "Attract Loop (visible)", "viewport": "1920×1080" },
      "intelligenceGenerated": [
        { "key": "pre_visit_token_matched", "value": true, "category": "attribution" },
        { "key": "party_size", "value": 4, "category": "persona" }
      ],
      "businessValue": "Walk-in atribuido a campaña; familia autoconsiguió kiosco correcto.",
      "leadTemperature": "warm",
      "sessionDepthScore": 28
    },
    {
      "id": "kiosk_session",
      "sequence": 5,
      "timestamp": "2026-06-07T10:30:12-04:00",
      "label": "Sesión kiosco",
      "source": "kiosk_cpi",
      "actor": "Roberto Mendoza",
      "screen": { "id": "S02", "route": "/", "label": "Welcome + Resume", "viewport": "1920×1080" },
      "intelligenceGenerated": [
        { "key": "session_id", "value": "sess_mendoza_20260607_k1", "category": "attribution" },
        { "key": "resume_banner_shown", "value": true, "category": "intent" }
      ],
      "businessValue": "Continuidad QR→kiosco sin formulario ni login.",
      "leadTemperature": "warm",
      "sessionDepthScore": 45
    },
    {
      "id": "trust_tour",
      "sequence": 6,
      "timestamp": "2026-06-07T10:38:00-04:00",
      "label": "Recorrido de confianza",
      "source": "kiosk_cpi",
      "actor": "Roberto Mendoza",
      "screen": { "id": "S06", "route": "/vehicles/gs4-max/tour/trust", "label": "Carlos + Diego tours" },
      "intelligenceGenerated": [
        { "key": "objections_resolved", "value": ["marca_china", "repuestos_scz"], "category": "objection" },
        { "key": "persona_familiar", "value": 0.5, "category": "persona" }
      ],
      "businessValue": "Objeción de marca neutralizada; patrón agregado a memoria institucional.",
      "leadTemperature": "hot",
      "sessionDepthScore": 68
    },
    {
      "id": "competitor_comparison",
      "sequence": 7,
      "timestamp": "2026-06-07T10:54:22-04:00",
      "label": "Comparación competidor",
      "source": "kiosk_cpi",
      "actor": "Roberto Mendoza",
      "screen": { "id": "S12", "route": "/vehicles/gs4-max/compare/corolla-cross", "label": "Compare Detail" },
      "intelligenceGenerated": [
        { "key": "competitor", "value": "Toyota Corolla Cross", "category": "intent" },
        { "key": "honest_loss_row", "value": "reventa_historica", "category": "objection" }
      ],
      "businessValue": "Credibilidad por honestidad; inteligencia competitiva semanal.",
      "leadTemperature": "hot",
      "sessionDepthScore": 78
    },
    {
      "id": "financing",
      "sequence": 8,
      "timestamp": "2026-06-07T11:02:10-04:00",
      "label": "Financiamiento",
      "source": "kiosk_cpi",
      "actor": "Roberto Mendoza",
      "screen": { "id": "S26", "route": "/vehicles/gs4-max/economics/financing", "label": "Financing Preview" },
      "intelligenceGenerated": [
        { "key": "plazo_months", "value": 36, "category": "economic" },
        { "key": "cuota_usd", "value": 412, "category": "economic" },
        { "key": "trade_in", "value": "Toyota Etios 2018", "category": "economic" }
      ],
      "businessValue": "Calificación económica antes de mesa de finanzas.",
      "leadTemperature": "hot",
      "sessionDepthScore": 87
    },
    {
      "id": "advisor_request",
      "sequence": 9,
      "timestamp": "2026-06-07T11:06:33-04:00",
      "label": "Solicitud de asesor",
      "source": "kiosk_cpi",
      "actor": "Roberto Mendoza",
      "screen": { "id": "S36", "label": "Consultant Live Handoff" },
      "intelligenceGenerated": [
        { "key": "handoff_requested", "value": true, "category": "ops" },
        { "key": "priority_score", "value": 94, "category": "ops" },
        { "key": "lead_id", "value": "lead_mendoza_20260607", "category": "attribution" }
      ],
      "businessValue": "Visita anónima → oportunidad nombrada con brief automático.",
      "leadTemperature": "hot",
      "sessionDepthScore": 87
    },
    {
      "id": "javier_assigned",
      "sequence": 10,
      "timestamp": "2026-06-07T11:08:05-04:00",
      "label": "Javier asignado",
      "source": "staff_tablet",
      "actor": "Javier Ríos",
      "screen": { "id": "S35", "route": "/staff", "label": "Handoff Brief", "viewport": "1024×768" },
      "intelligenceGenerated": [
        { "key": "claim_latency_seconds", "value": 92, "category": "ops" },
        { "key": "sla_met", "value": true, "category": "ops" }
      ],
      "businessValue": "Primer contacto en 90s con contexto completo.",
      "leadTemperature": "hot",
      "sessionDepthScore": 87
    },
    {
      "id": "test_drive",
      "sequence": 11,
      "timestamp": "2026-06-07T11:32:00-04:00",
      "label": "Prueba de manejo",
      "source": "staff_tablet",
      "actor": "Javier Ríos",
      "screen": { "id": "S34", "route": "/vehicles/gs4-max/test-drive", "label": "Test Drive Logistics" },
      "intelligenceGenerated": [
        { "key": "party_in_vehicle", "value": 4, "category": "persona" },
        { "key": "stage", "value": "qualified_test_drive", "category": "intent" }
      ],
      "businessValue": "Prueba calificada; cliente valida emoción no catálogo.",
      "leadTemperature": "hot",
      "sessionDepthScore": 92
    },
    {
      "id": "follow_up",
      "sequence": 12,
      "timestamp": "2026-06-10T14:22:18-04:00",
      "label": "Seguimiento familiar",
      "source": "whatsapp",
      "actor": "Carla Mendoza",
      "screen": { "id": "S33", "route": "/vehicles/gs4-max/share", "label": "Family Share", "viewport": "390×844" },
      "intelligenceGenerated": [
        { "key": "secondary_decider_active", "value": true, "category": "persona" },
        { "key": "abuela_objection", "value": "garantía_motor", "category": "objection" }
      ],
      "businessValue": "Decisor fuera del piso incluido vía WhatsApp.",
      "leadTemperature": "hot",
      "sessionDepthScore": 95
    },
    {
      "id": "closed_won",
      "sequence": 13,
      "timestamp": "2026-06-19T16:45:00-04:00",
      "label": "Venta cerrada",
      "source": "crm_zoho",
      "actor": "Roberto Mendoza",
      "screen": { "id": "CRM", "label": "Contrato + atribución CPI-OS" },
      "intelligenceGenerated": [
        { "key": "outcome", "value": "closed_won", "category": "attribution" },
        { "key": "revenue_usd", "value": 28900, "category": "economic" },
        { "key": "cycle_days", "value": 14, "category": "attribution" }
      ],
      "businessValue": "ROI completo: Instagram → USD 28,900 en 14 días.",
      "sessionDepthScore": 100
    }
  ]
}
```

---

## Implementation notes

| Consumer | Uses this spec for |
|----------|-------------------|
| **Figma** | Node data on timeline components; variant = event `id` |
| **After Effects** | JSON → Motion Bro / data-driven labels; depth score drives meter |
| **React** | `IntelligenceTimeline` props: `timeline: TimelineDocument` |
| **Executive report 5.3** | `attributionChain` + `closed_won` event |

**Not in scope:** Live data binding, customer-facing UI, CRM writeback.

---

## Control de versiones

| Versión | Fecha | Cambio |
|---------|-------|--------|
| 1.0 | 15 Jun 2026 | Especificación inicial — 13 eventos Mendoza |

---

*Diseño visual: [`CPI_OS_INTELLIGENCE_TIMELINE_MOCKUP.md`](./CPI_OS_INTELLIGENCE_TIMELINE_MOCKUP.md)*
