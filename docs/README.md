# Viaggio Digital Showroom — Documentation

Product and implementation docs for the **Vercel-deployed kiosk demo**.

Presentations, executive decks, and film production → **Replit**.

## Demo operator docs

| Document | Purpose |
|----------|---------|
| [Demo walkthrough](./demo-walkthrough.md) | Click-by-click kiosk script |
| [Kiosk vision enforcement](./demo/KIOSK_VISION_ENFORCEMENT.md) | Phase 8 UX audit + fixes |
| [Demo mode checklist](../DEMO_MODE_CHECKLIST.md) | `NEXT_PUBLIC_DEMO_MODE` reference |

## Product planning (reference)

| # | Document | Description |
|---|----------|-------------|
| 0 | [Architecture Review](./architecture-review.md) | **Phase 1 review** — stakeholder findings, gaps, P0/P1/P2 improvements |
| 1 | [Product Vision](./product-vision.md) | Vision, mission, success metrics, UX principles |
| 2 | [Customer Journey](./customer-journey.md) | Stages from awareness to post-visit conversion |
| 3 | [Information Architecture](./information-architecture.md) | Content hierarchy, navigation, multi-vehicle model |
| 4 | [Screen Map](./screen-map.md) | Complete inventory of showroom screens and states |
| 5 | [User Flows](./user-flows.md) | Discovery, exploration, comparison, conversion paths |
| 6 | [Folder Structure](./folder-structure.md) | Planned repo layout + scaffold reference |
| 7 | [Component Tree](./component-tree.md) | Planned React component hierarchy |
| 8 | [Data Models](./data-models.md) | Domain entities, relationships, Supabase outline |
| 9 | [JSON Schemas](./json-schemas.md) | Schema definitions for vehicles, personas, events |
| 10 | [Voice Strategy](./voice-strategy.md) | Carlos, Sofía, Diego — tone, examples in Spanish |
| 11 | [Content Strategy](./content-strategy.md) | Themes, formats, localization, GS4 MAX focus |
| 12 | [Conversion Strategy](./conversion-strategy.md) | Funnel, CTAs, WhatsApp, metrics |
| 13 | [Technical Architecture](./technical-architecture.md) | Next.js 15 App Router, Supabase, analytics |

## Supporting Artifacts

| Document | Description |
|----------|-------------|
| [Personas](./personas.md) | Detailed digital guide personas |
| [Glossary](./glossary.md) | Terms used across the project |
| [ADR Template](./decisions/ADR-template.md) | Architecture Decision Record template |

## Schema & Content Assets

| Path | Description |
|------|-------------|
| [`schemas/`](./schemas/) | JSON Schema files (vehicle, persona, content blocks, events) |
| [`content/`](./content/) | Sample content templates for GS4 MAX and reusable blocks |

## Reading Order (Recommended)

1. **Product Vision** → understand the why
2. **Personas** + **Voice Strategy** → understand the guides
3. **Customer Journey** → understand the buyer
4. **Information Architecture** → understand the structure
5. **Screen Map** + **User Flows** → understand the experience
6. **Content Strategy** + **Conversion Strategy** → understand messaging and goals
7. **Data Models** + **JSON Schemas** → understand the data layer
8. **Folder Structure** + **Component Tree** + **Technical Architecture** → understand implementation plan

## Document Conventions

- **Language:** Documentation in English; customer-facing copy examples in Spanish (Bolivia)
- **Vehicle slug:** `gs4-max` (kebab-case) as canonical identifier
- **Market:** Santa Cruz, Bolivia — WhatsApp-first, trust-sensitive, value-conscious
- **Extensibility:** All schemas and IA designed for GS4 MAX launch + future GAC models without structural rewrites

---

*Last updated: Phase 1 architecture review — June 2025*
