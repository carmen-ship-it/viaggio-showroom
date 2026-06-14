# Information Architecture

## IA Principles

1. **Vehicle-centric root** — Every experience is scoped to a `vehicleSlug` (e.g., `gs4-max`)
2. **Theme-based navigation** — Organized by buyer decisions, not manufacturer org charts
3. **Persona-attributed content** — Each theme has a primary digital guide
4. **Flat hub, deep branches** — Max 2 taps to any major topic from vehicle home
5. **Add vehicles, not routes** — New GAC model = new content pack + registry entry, same URL patterns

## Top-Level Structure

```
Viaggio Digital Showroom
├── Welcome / Attract Loop (idle state)
├── Vehicle Selector (multi-vehicle)
└── Per-Vehicle Experience (/vehicles/{slug})
    ├── Home Hub
    ├── Guided Tours
    │   ├── Trust Tour (Carlos-led)
    │   ├── Family Tour (Diego-led)
    │   └── Desire Tour (Sofía-led)
    ├── Explore by Theme
    │   ├── Reliability & Engineering
    │   ├── Safety
    │   ├── Family & Comfort
    │   ├── Technology
    │   ├── Design & Exterior
    │   ├── Interior & Cargo
    │   ├── Driving Experience
    │   ├── Warranty & Service
    │   └── Value & Equipment
    ├── Media Gallery
    ├── Specifications
    ├── Compare
    ├── Configurator (visual trim/color — Phase 2)
    └── Convert
        ├── Request Test Drive
        ├── WhatsApp
        └── Speak with Consultant
```

## Navigation Model

### Global (Persistent)

| Element | Behavior |
|---------|----------|
| **Viaggio + GAC logo** | Tap → Vehicle home (confirm if mid-flow) |
| **Vehicle name** | Tap → Vehicle selector overlay |
| **Progress breadcrumb** | Hub > Theme > Sub-topic (collapsible on kiosk) |
| **Persona pill** | Shows active guide; tap → switch guide preference |
| **CTA bar** | Sticky: Prueba de manejo · WhatsApp |

### Vehicle Home Hub

Primary entry after vehicle selection. Card-based layout:

| Card | Destination | Default Guide |
|------|-------------|---------------|
| Confiabilidad | Reliability theme | Carlos |
| Seguridad | Safety theme | Carlos |
| Para tu familia | Family & Comfort | Diego |
| Tecnología | Technology | Sofía |
| Garantía y servicio | Warranty & Service | Carlos |
| Valor y equipamiento | Value theme | Sofía |
| Comparar | Compare mode | Rotating |
| Tour guiado | Guided tour picker | — |

### URL Pattern (Planned — App Router)

```
/                                    → Welcome / attract
/vehicles                            → Vehicle selector
/vehicles/[slug]                     → Vehicle home hub
/vehicles/[slug]/tour/[tourId]       → Guided tour
/vehicles/[slug]/themes/[themeId]    → Theme landing
/vehicles/[slug]/themes/[themeId]/[topicId] → Deep topic
/vehicles/[slug]/gallery             → Media gallery
/vehicles/[slug]/specs               → Specifications
/vehicles/[slug]/compare             → Comparison
/vehicles/[slug]/convert             → Conversion hub
```

## Multi-Vehicle Registry

Vehicles are registered in content config — not hardcoded in routes.

| Slug | Model | Status | Launch Priority |
|------|-------|--------|-----------------|
| `gs4-max` | GAC GS4 MAX | **Active (Phase 2)** | 1 |
| `gs8` | GAC GS8 | Planned | 2 |
| `emzoom` | GAC EMZOOM (Aion) | Planned | 3 |
| `emkoo` | GAC EMKOO | Planned | 4 |

### Vehicle Selector UX

- GS4 MAX: hero card, full experience
- Future models: visible with "Próximamente" or partial preview if content exists
- Selector accessible from welcome and global nav
- Selection persists in session (localStorage + optional Supabase session)

## Content Hierarchy: GS4 MAX

### Theme: Reliability & Engineering (`reliability`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `engine` | Motor y rendimiento | Carlos |
| `chassis` | Chasis y durabilidad | Carlos |
| `brand-heritage` | GAC en el mundo | Carlos |
| `local-service` | Servicio en Viaggio Santa Cruz | Carlos |

### Theme: Safety (`safety`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `adas` | Asistencias al conductor | Carlos |
| `structure` | Estructura y airbags | Carlos |
| `family-safety` | Seguridad para tu familia | Diego |

### Theme: Family & Comfort (`family`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `space` | Espacio y asientos | Diego |
| `climate` | Clima y confort | Diego |
| `cargo` | Maletero y versatilidad | Diego |
| `daily-life` | Un día con el GS4 MAX | Diego |

### Theme: Technology (`technology`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `infotainment` | Pantalla y conectividad | Sofía |
| `connectivity` | CarPlay, Android Auto | Sofía |
| `driver-tech` | Tecnología a bordo | Sofía |

### Theme: Value & Equipment (`value`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `standard-features` | Equipamiento de serie | Sofía |
| `trim-levels` | Versiones disponibles | Sofía |
| `total-value` | Valor vs. segmento | Sofía |

### Theme: Warranty & Service (`warranty`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `warranty-terms` | Garantía GAC | Carlos |
| `maintenance` | Mantenimiento programado | Carlos |
| `viaggio-service` | Taller Viaggio | Carlos |

### Theme: Driving Experience (`driving`)

| Topic ID | Title (ES) | Guide |
|----------|------------|-------|
| `handling` | Manejo en ciudad | Diego |
| `comfort-ride` | Confort en ruta | Diego |
| `santa-cruz` | Pensado para Santa Cruz | Diego |

## Guided Tours

Pre-built narrative paths (10–15 min each):

| Tour ID | Name | Sequence | Guide Lead |
|---------|------|----------|------------|
| `trust` | Tour de Confianza | reliability → safety → warranty | Carlos |
| `family` | Tour Familiar | family → safety → driving | Diego |
| `desire` | Tour de Descubrimiento | design → technology → value | Sofía |
| `complete` | Tour Completo | All themes abbreviated | Mixed |

## Compare IA

### Compare Targets (GS4 MAX launch)

- Internal: vs. `gs8` when content available
- External segment: configurable competitor profiles (content-driven JSON)
- Dimensions: Safety, Tech, Space, Warranty, Price band, Fuel economy

Compare is **honest** — acknowledge competitor strengths; win on total value.

## Search & Find (Phase 2+)

Kiosk search: plain-language queries in Spanish

- *"garantía"* → warranty theme
- *"asientos"* → family > space
- *"consumo"* → reliability > engine

Implemented via content tags on blocks (see `content-block.schema.json`).

## Metadata & Tagging

Every content block carries:

```yaml
vehicleSlug: gs4-max
themeId: safety
topicId: adas
personaId: carlos
tags: [seguridad, adas, familia]
priority: 1
locale: es-BO
```

## Localization

| Layer | Phase 1 | Future |
|-------|---------|--------|
| UI chrome | Spanish (Bolivia) | — |
| Content body | Spanish (Bolivia) | Optional English for expat segment |
| Specs/units | Metric, BOB references | — |
| Dates/formats | DD/MM/YYYY | — |

## Accessibility (Kiosk)

- Minimum 48px touch targets
- High contrast mode toggle
- Text size adjustment (3 levels)
- Reduced motion respects `prefers-reduced-motion`
- Audio optional for persona voice-over (Phase 3)

---

*Related: [Screen Map](./screen-map.md) · [Data Models](./data-models.md) · [Content Strategy](./content-strategy.md)*
