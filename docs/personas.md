# Digital Guide Personas

Detailed persona profiles for Carlos, Sofía, and Diego — the three digital guides in Viaggio Digital Showroom.

## Persona Overview

| ID | Name | Role (ES) | Archetype | UI Accent (planned) |
|----|------|-----------|-----------|---------------------|
| `carlos` | Carlos | Mecánico Maestro | The Expert | Steel blue |
| `sofia` | Sofía | Consultora de Ventas | The Enthusiast | Warm coral |
| `diego` | Diego | Conductor Familiar | The Relatable Neighbor | Earth green |

---

## Carlos — Mecánico Maestro

### Profile

| Attribute | Detail |
|-----------|--------|
| **Age** | 48 |
| **Background** | 25 years in automotive — workshops, dealership service, GAC certification |
| **Family** | Married, adult children |
| **Drives** | GAC GS4 (personal — credibility anchor) |
| **Works at** | Viaggio Motors service department (fictional digital persona, real expertise backed by Viaggio) |

### Purpose in Showroom

Build **trust** through technical honesty. Carlos is the antidote to dealership skepticism in Santa Cruz.

### Personality Traits

- Calm, measured, patient
- Explains *why*, not just *what*
- Admits trade-offs when they exist
- Never competes with human sales staff

### Content Domains

- Engine, transmission, chassis
- Safety systems (technical angle)
- Warranty terms and maintenance intervals
- GAC brand heritage and testing
- Viaggio service capabilities
- Total cost of ownership (factual)

### Visual Representation

- Avatar: Professional, workshop shirt or Viaggio polo, arms crossed or with tool
- Setting: Service bay, engine bay close-ups in background media
- Motion: Subtle, minimal animation — fades, not bounces

### Sample Intro (`introLine`)

> *"Soy Carlos. Llevo más de 20 años bajo el capó. Te cuento cómo está hecho este auto — sin vueltas."*

### Engagement Signals

Track when users spend 60s+ on Carlos-narrated topics → `preferred_persona: carlos` → recommend test drive with technical framing.

---

## Sofía — Consultora de Ventas

### Profile

| Attribute | Detail |
|-----------|--------|
| **Age** | 32 |
| **Background** | 8 years in automotive retail, GAC product specialist |
| **Family** | Single professional |
| **Drives** | GAC EMKOO (aspirational — when available) |
| **Works at** | Viaggio Motors showroom floor |

### Purpose in Showroom

Create **desire** through benefits, design, and value storytelling. Sofía makes customers *want* the vehicle.

### Personality Traits

- Warm, polished, genuinely enthusiastic
- Benefit-led communication
- Visually oriented — draws attention to design details
- Professional boundaries — defers pricing to consultant

### Content Domains

- Exterior and interior design
- Infotainment and connectivity
- Equipment and trim levels
- Value vs. segment positioning
- Lifestyle aspiration (urban professional angle)

### Visual Representation

- Avatar: Showroom professional attire, approachable smile
- Setting: Vehicle exterior glamour shots, interior detail
- Motion: Slightly more dynamic — scale reveals, slide-ins

### Sample Intro (`introLine`)

> *"Hola, soy Sofía. Me encanta este vehículo y quiero que descubras cada detalle que lo hace especial."*

### Engagement Signals

High Sofía engagement + compare views → desire established → strong test drive CTA.

---

## Diego — Conductor Familiar

### Profile

| Attribute | Detail |
|-----------|--------|
| **Age** | 38 |
| **Background** | Office manager, not automotive expert — learned through family car purchases |
| **Family** | Married, two children (7 and 10) |
| **Drives** | GAC GS4 MAX (family SUV) |
| **Lives in** | Equipetrol, Santa Cruz |

### Purpose in Showroom

Help customers **imagine ownership** — daily life, family trips, real Santa Cruz driving.

### Personality Traits

- Relatable, conversational, occasionally humorous
- First-person plural (*"nosotros"*, *"mi familia"*)
- Practical — focuses on real problems (space, heat, traffic)
- Emotionally intelligent — acknowledges spouse/kids in decisions

### Content Domains

- Cabin space and child seats
- Climate comfort in Santa Cruz heat
- Cargo and weekend trips
- City driving and parking
- Family safety from driver perspective

### Visual Representation

- Avatar: Casual smart, family man
- Setting: Lifestyle shots — school drop-off, road trip, supermarket parking
- Motion: Friendly — gentle parallax on lifestyle images

### Sample Intro (`introLine`)

> *"Soy Diego. Papá, esposo y manejador diario. Te cuento cómo encaja este auto en la vida real en Santa Cruz."*

### Engagement Signals

Diego engagement on family topics → WhatsApp CTA (*"¿Preguntas de tu familia?"*).

---

## Persona Interaction Model

### Default Assignment

Each theme has a `primaryPersonaId` in content (see [Information Architecture](./information-architecture.md)).

### User Override

`PersonaPicker` on home hub sets preference — affects narration styling and CTA recommendations, not content authorship.

### Multi-Persona Topics

Some topics blend voices:
- `family-safety`: Diego opens (emotional), Carlos delivers ADAS facts
- Implementation: alternating `narration` blocks with different `personaId`

---

## Avatar & Asset Requirements (Phase 2)

| Persona | Assets Needed |
|---------|---------------|
| All | Avatar portrait (512×512), avatar small (64×64) |
| All | 3 expression variants optional (neutral, explaining, inviting) |
| Carlos | Workshop b-roll, hands-on engine footage |
| Sofía | Showroom walk-around clips |
| Diego | Family lifestyle photo set (Santa Cruz locations) |

---

*Related: [Voice Strategy](./voice-strategy.md) · [Content Strategy](./content-strategy.md) · [schemas/persona.schema.json](./schemas/persona.schema.json)*
