# Component Tree

Planned React component hierarchy for Next.js 15. **No components are implemented in Phase 1.** This tree maps components to [Screen Map](./screen-map.md) screens.

## Tree Overview

```
App
├── RootLayout
│   ├── Providers
│   │   ├── SessionProvider
│   │   ├── PersonaProvider
│   │   ├── AnalyticsProvider
│   │   └── A11yProvider
│   └── ShowroomLayout (route group)
│       ├── AttractLoop (S01)
│       ├── WelcomeScreen (S02)
│       ├── VehicleSelector (S03)
│       └── VehicleExperience
│           ├── VehicleShell
│           │   ├── GlobalHeader
│           │   ├── PersonaStrip
│           │   ├── MainContent (slot)
│           │   ├── StickyCTABar
│           │   └── IdleManager (S20)
│           ├── VehicleHomeHub (S04)
│           ├── TourExperience
│           │   ├── TourPicker (S05)
│           │   └── TourPlayer (S06)
│           ├── ThemeExperience
│           │   ├── ThemeLanding (S07)
│           │   └── TopicDeepDive (S08)
│           ├── MediaGallery (S09)
│           ├── Specifications (S10)
│           ├── CompareExperience
│           │   ├── CompareHub (S11)
│           │   └── CompareDetail (S12)
│           ├── ConvertExperience
│           │   ├── ConversionHub (S13)
│           │   ├── TestDriveForm (S14)
│           │   ├── WhatsAppHandoff (S15)
│           │   └── ConsultantHandoff (S16)
│           ├── Configurator (S17) [Phase 2]
│           └── SessionSummary (S18)
└── Overlays
    ├── SettingsOverlay (S19)
    └── ConfirmDialog
```

---

## Layer 1: Providers (`src/components/layout/Providers.tsx`)

| Component | Responsibility |
|-----------|----------------|
| `SessionProvider` | Session ID, vehicle slug, visited topics, timing |
| `PersonaProvider` | Active guide preference, narration styling |
| `AnalyticsProvider` | Event dispatch to Supabase / buffer |
| `A11yProvider` | Text size, contrast, reduced motion |

---

## Layer 2: Shell (`src/components/layout/`)

### `ShowroomLayout`

Full-viewport wrapper; kiosk-safe; no scroll bleed.

### `VehicleShell`

Wraps all `/vehicles/[slug]/*` pages.

```
VehicleShell
├── GlobalHeader
│   ├── BrandLogos (Viaggio + GAC)
│   ├── VehicleBreadcrumb
│   ├── VehicleSwitcherTrigger
│   └── SettingsButton
├── PersonaStrip
│   ├── PersonaAvatar (×3)
│   └── ActivePersonaIndicator
├── {children}
├── StickyCTABar
│   ├── TestDriveButton
│   └── WhatsAppButton
└── IdleManager
```

### `GlobalHeader` → Screens: all vehicle screens

### `StickyCTABar` → Screens: S04, S07, S08, S11, S12

### `IdleManager` → Screen: S20

---

## Layer 3: Showroom Domain (`src/components/showroom/`)

### Attract (`showroom/attract/`)

| Component | Screen | Props / Notes |
|-----------|--------|---------------|
| `AttractLoop` | S01 | `videoSrc`, `onStart` |
| `AttractOverlay` | S01 | Pulsing CTA text |

### Welcome (`showroom/welcome/`)

| Component | Screen |
|-----------|--------|
| `WelcomeScreen` | S02 |
| `PersonaIntroCarousel` | S02 |
| `WelcomeActions` | S02 |

### Vehicle (`showroom/vehicle/`)

| Component | Screen |
|-----------|--------|
| `VehicleSelector` | S03 |
| `VehicleCard` | S03 |
| `VehicleHomeHub` | S04 |
| `ThemeCardGrid` | S04 |
| `HeroStatStrip` | S04 |
| `QuickActionBar` | S04 |

### Persona (`showroom/persona/`)

| Component | Used In |
|-----------|---------|
| `PersonaAvatar` | Global |
| `PersonaNarration` | S06, S07, S08 |
| `PersonaQuote` | Content blocks |
| `PersonaPicker` | S04 |

### Tour (`showroom/tour/`)

| Component | Screen |
|-----------|--------|
| `TourPicker` | S05 |
| `TourCard` | S05 |
| `TourPlayer` | S06 |
| `TourProgress` | S06 |
| `TourStep` | S06 |
| `TourControls` | S06 |

### Theme (`showroom/theme/`)

| Component | Screen |
|-----------|--------|
| `ThemeLanding` | S07 |
| `TopicList` | S07 |
| `TopicDeepDive` | S08 |
| `SuggestedNextTopic` | S08 |

### Gallery (`showroom/gallery/`)

| Component | Screen |
|-----------|--------|
| `MediaGallery` | S09 |
| `GalleryCategoryTabs` | S09 |
| `GalleryGrid` | S09 |
| `GalleryLightbox` | S09 |

### Compare (`showroom/compare/`)

| Component | Screen |
|-----------|--------|
| `CompareHub` | S11 |
| `CompareTargetPicker` | S11 |
| `CompareDetail` | S12 |
| `CompareTable` | S12 |
| `CompareRow` | S12 |
| `CompareVerdict` | S12 |

### Convert (`showroom/convert/`)

| Component | Screen |
|-----------|--------|
| `ConversionHub` | S13 |
| `SessionRecap` | S13, S18 |
| `TestDriveForm` | S14 |
| `WhatsAppHandoff` | S15 |
| `WhatsAppQRFallback` | S15 |
| `ConsultantHandoff` | S16 |
| `LeadConfirmation` | S14, S15 |

### Specs (`showroom/specs/`)

| Component | Screen |
|-----------|--------|
| `Specifications` | S10 |
| `SpecTabs` | S10 |
| `SpecTable` | S10 |

---

## Layer 4: Content Blocks (`src/components/content-blocks/`)

Composable renderers driven by JSON content. Used inside `TopicDeepDive`, `TourStep`, `ThemeLanding`.

```
ContentBlockRenderer
├── HeroBlock
├── NarrationBlock
│   └── uses PersonaNarration
├── FeatureGridBlock
├── StatCalloutBlock
├── MediaGalleryBlock
├── ComparisonSnippetBlock
├── AccordionBlock
├── VideoBlock
└── CTABlock
```

### `ContentBlockRenderer`

```typescript
// Planned signature (not implemented)
type Props = {
  blocks: ContentBlock[];
  vehicleSlug: string;
  personaId?: PersonaId;
};
```

Maps `block.type` → component via registry pattern in `lib/content/block-registry.ts`.

---

## Layer 5: UI Primitives (`src/components/ui/`)

Shared, style-only components (shadcn-style or custom):

| Component | Usage |
|-----------|-------|
| `Button` | CTAs, tour controls |
| `Card` | Theme cards, tour cards |
| `Badge` | Persona labels, compare verdicts |
| `Progress` | Tour progress |
| `Dialog` | Modals, settings |
| `Tabs` | Gallery, specs |
| `Accordion` | Spec detail, content blocks |
| `Input` / `Select` | Test drive form |

---

## Component-to-Screen Matrix

| Screen | Top-Level Component | Key Children |
|--------|---------------------|--------------|
| S01 | `AttractLoop` | `AttractOverlay` |
| S02 | `WelcomeScreen` | `PersonaIntroCarousel` |
| S03 | `VehicleSelector` | `VehicleCard` × n |
| S04 | `VehicleHomeHub` | `ThemeCardGrid`, `HeroStatStrip` |
| S05 | `TourPicker` | `TourCard` × n |
| S06 | `TourPlayer` | `TourStep`, `ContentBlockRenderer` |
| S07 | `ThemeLanding` | `TopicList`, `PersonaNarration` |
| S08 | `TopicDeepDive` | `ContentBlockRenderer` |
| S09 | `MediaGallery` | `GalleryGrid`, `GalleryLightbox` |
| S10 | `Specifications` | `SpecTabs`, `SpecTable` |
| S11 | `CompareHub` | `CompareTargetPicker` |
| S12 | `CompareDetail` | `CompareTable`, `CompareVerdict` |
| S13 | `ConversionHub` | `SessionRecap` |
| S14 | `TestDriveForm` | form fields |
| S15 | `WhatsAppHandoff` | `WhatsAppQRFallback` |
| S16 | `ConsultantHandoff` | session QR |
| S18 | `SessionSummary` | `SessionRecap` |
| S19 | `SettingsOverlay` | a11y toggles |
| S20 | `IdleManager` | timeout prompts |

---

## State Ownership

| State | Owner | Consumers |
|-------|-------|-----------|
| `sessionId`, `visitedTopics` | `SessionProvider` | Analytics, Convert, Handoff |
| `activePersona` | `PersonaProvider` | Narration, Tour, Theme |
| `vehicleSlug` | URL + `useVehicle` | All vehicle components |
| `a11ySettings` | `A11yProvider` | Global CSS variables |
| Form state | `TestDriveForm` local | Submit → API |

---

## Framer Motion Usage (Planned)

| Component | Animation |
|-----------|-----------|
| `WelcomeScreen` | Staggered persona entrance |
| `ThemeCardGrid` | Layout fade on filter |
| `TourStep` | Slide transition between steps |
| `TopicDeepDive` | Scroll-triggered block reveals |
| `VehicleCard` | Scale on press (kiosk) |
| `StickyCTABar` | Slide up on scroll threshold |

Respect `A11yProvider.reducedMotion` — instant transitions when enabled.

---

*Related: [Screen Map](./screen-map.md) · [Folder Structure](./folder-structure.md) · [Technical Architecture](./technical-architecture.md)*
