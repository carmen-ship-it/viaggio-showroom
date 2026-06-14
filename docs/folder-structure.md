# Folder Structure

Planned repository layout for Viaggio Digital Showroom. This document describes the structure **and** matches the actual scaffold created in Phase 1 (empty directories with `.gitkeep` where needed).

## Design Principles

1. **Content-driven vehicles** — Vehicle data lives in `src/content/vehicles/{slug}/`, not scattered in components
2. **Schema-first** — Types generated or validated against `docs/schemas/`
3. **Colocation** — UI components near their domain; shared primitives in `components/ui`
4. **App Router conventions** — Next.js 15 `app/` directory with route groups
5. **Add a folder per new vehicle** — `gs4-max/`, `gs8/`, etc.

## Root Structure

```
viaggio-digital-showroom/
├── README.md
├── .gitignore
├── docs/                          # Phase 1 — all planning (this folder)
│   ├── README.md
│   ├── product-vision.md
│   ├── customer-journey.md
│   ├── information-architecture.md
│   ├── screen-map.md
│   ├── user-flows.md
│   ├── folder-structure.md        # this file
│   ├── component-tree.md
│   ├── data-models.md
│   ├── json-schemas.md
│   ├── voice-strategy.md
│   ├── content-strategy.md
│   ├── conversion-strategy.md
│   ├── technical-architecture.md
│   ├── glossary.md
│   ├── personas.md
│   ├── decisions/
│   │   └── ADR-template.md
│   ├── schemas/                   # JSON Schema files
│   └── content/                   # Sample content templates
├── public/
│   ├── assets/
│   │   ├── vehicles/              # Per-vehicle media (future)
│   │   ├── personas/              # Avatar images
│   │   └── brand/                 # Viaggio + GAC logos
│   └── locales/
│       └── es-BO/                 # UI strings
├── src/
│   ├── app/                       # Next.js 15 App Router
│   │   ├── (showroom)/            # Route group — main experience
│   │   │   ├── layout.tsx         # (future)
│   │   │   ├── page.tsx           # Attract / welcome
│   │   │   └── vehicles/
│   │   │       ├── page.tsx       # Vehicle selector
│   │   │       └── [slug]/
│   │   │           ├── page.tsx   # Vehicle home hub
│   │   │           ├── tour/
│   │   │           │   └── [tourId]/
│   │   │           ├── themes/
│   │   │           │   └── [themeId]/
│   │   │           │       └── [topicId]/
│   │   │           ├── gallery/
│   │   │           ├── specs/
│   │   │           ├── compare/
│   │   │           └── convert/
│   │   ├── api/                   # Route handlers
│   │   │   ├── analytics/
│   │   │   ├── leads/
│   │   │   └── sessions/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                    # Primitives (Button, Card, etc.)
│   │   ├── layout/                # Shell, Nav, CTA bar
│   │   ├── showroom/              # Domain components
│   │   │   ├── attract/
│   │   │   ├── vehicle/
│   │   │   ├── theme/
│   │   │   ├── tour/
│   │   │   ├── compare/
│   │   │   ├── convert/
│   │   │   ├── persona/
│   │   │   └── gallery/
│   │   └── content-blocks/        # Renderers for content JSON
│   ├── content/
│   │   ├── vehicles/
│   │   │   ├── registry.json      # All vehicle slugs + metadata
│   │   │   ├── gs4-max/
│   │   │   │   ├── vehicle.json
│   │   │   │   ├── themes/
│   │   │   │   ├── tours/
│   │   │   │   ├── specs.json
│   │   │   │   ├── compare-targets.json
│   │   │   │   └── media-manifest.json
│   │   │   ├── gs8/               # (future)
│   │   │   ├── emzoom/            # (future)
│   │   │   └── emkoo/             # (future)
│   │   ├── personas/
│   │   │   └── personas.json
│   │   └── shared/
│   │       ├── competitors/       # Segment comparison profiles
│   │       └── dealership.json    # Viaggio Santa Cruz info
│   ├── lib/
│   │   ├── content/               # Content loaders & validators
│   │   ├── supabase/              # Client, queries
│   │   ├── analytics/             # Event tracking
│   │   ├── whatsapp/              # Deep link builders
│   │   └── utils/
│   ├── hooks/
│   │   ├── useSession.ts
│   │   ├── useVehicle.ts
│   │   ├── usePersona.ts
│   │   └── useAnalytics.ts
│   └── types/
│       ├── vehicle.ts
│       ├── content.ts
│       ├── persona.ts
│       └── analytics.ts
└── supabase/
    ├── migrations/                # SQL migrations (future)
    └── seed/                      # Dev seed data
```

## Directory Purposes

### `docs/`

All Phase 1 planning. Source of truth before implementation. Schemas here are authoritative; `src/types` should align.

### `public/assets/vehicles/{slug}/`

Static media per vehicle. Naming convention:

```
public/assets/vehicles/gs4-max/
├── hero.webp
├── exterior/
├── interior/
└── lifestyle/
```

### `src/content/vehicles/{slug}/`

Structured JSON/YAML content consumed at build time (or runtime with caching). **Adding a new GAC model = new folder + registry entry.**

### `src/components/content-blocks/`

One renderer per block type in `content-block.schema.json`:

- `HeroBlock`
- `NarrationBlock`
- `FeatureGridBlock`
- `StatCalloutBlock`
- `MediaGalleryBlock`
- `ComparisonSnippetBlock`
- `AccordionBlock`

### `src/app/(showroom)/`

Route group isolates showroom layout (full-screen, no marketing chrome) from any future admin routes.

### `supabase/`

Database migrations for sessions, leads, analytics events. See [technical-architecture.md](./technical-architecture.md).

## Multi-Vehicle Extension Checklist

When adding a new model (e.g., `gs8`):

- [ ] Add `src/content/vehicles/gs8/` with all content files
- [ ] Update `src/content/vehicles/registry.json`
- [ ] Add `public/assets/vehicles/gs8/` media
- [ ] Add compare targets in `gs4-max/compare-targets.json` (bidirectional)
- [ ] No new routes or components required if schemas match

## Config Files (Future — Phase 2)

These files are **not** created in Phase 1 but are planned:

| File | Purpose |
|------|---------|
| `package.json` | Dependencies |
| `next.config.ts` | Next.js config, image domains |
| `tailwind.config.ts` | Viaggio/GAC design tokens |
| `tsconfig.json` | TypeScript strict mode |
| `.env.local.example` | Supabase keys template |

## Scaffold Status

Phase 1 creates **empty** `src/`, `public/`, and `supabase/` trees with `.gitkeep` files. No `.tsx`, `.ts` application files.

---

*Related: [Component Tree](./component-tree.md) · [Technical Architecture](./technical-architecture.md) · [Data Models](./data-models.md)*
