# Content Templates

Sample content structures for GS4 MAX and reusable patterns. Copy to `src/content/` during Phase 2 implementation.

## Templates

| File | Schema | Description |
|------|--------|-------------|
| `vehicle.gs4-max.json` | `vehicle.schema.json` | GS4 MAX vehicle metadata |
| `vehicle-registry.json` | `vehicle-registry.schema.json` | All GAC models registry |
| `personas.json` | `persona.schema.json` | Carlos, Sofía, Diego |
| `dealership.json` | `dealership.schema.json` | Viaggio Santa Cruz config |
| `topic.gs4-max.adas.json` | `topic.schema.json` | Sample safety/ADAS topic |
| `theme.gs4-max.family.yaml` | `theme.schema.json` | Family theme metadata (YAML example) |
| `tour.gs4-max.trust.json` | `tour.schema.json` | Carlos trust tour |
| `compare.gs4-max.corolla-cross.json` | `compare-target.schema.json` | Segment comparison |
| `media-manifest.gs4-max.json` | `media-asset.schema.json` | Media asset index |

## Usage

1. Validate against schemas in `docs/schemas/` using Ajv or VS Code JSON Schema association
2. Replace placeholder values (address, WhatsApp, pricing) with Viaggio-approved data
3. Copy validated files to `src/content/vehicles/gs4-max/` maintaining structure from [folder-structure.md](../folder-structure.md)

## GS4 MAX Content Folder (Target)

```
src/content/vehicles/gs4-max/
├── vehicle.json
├── themes/
│   ├── reliability.json
│   ├── safety.json
│   └── ...
├── topics/
│   ├── adas.json
│   └── ...
├── tours/
│   ├── trust.json
│   └── ...
├── specs.json
├── compare-targets.json
└── media-manifest.json
```

*Templates here use flat naming for authoring convenience; reorganize on implementation.*
