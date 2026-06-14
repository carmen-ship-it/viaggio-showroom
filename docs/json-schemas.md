# JSON Schemas

Authoritative schema definitions for Viaggio Digital Showroom content and events. Physical schema files live in [`schemas/`](./schemas/).

## Schema Index

| Schema | File | Purpose |
|--------|------|---------|
| Vehicle | `vehicle.schema.json` | Vehicle metadata and registry entries |
| Vehicle Registry | `vehicle-registry.schema.json` | List of all vehicles |
| Persona | `persona.schema.json` | Digital guide definitions |
| Theme | `theme.schema.json` | Theme metadata per vehicle |
| Topic | `topic.schema.json` | Topic with content blocks |
| Content Block | `content-block.schema.json` | Composable UI blocks |
| Tour | `tour.schema.json` | Guided tour definitions |
| Compare Target | `compare-target.schema.json` | Comparison profiles |
| Media Asset | `media-asset.schema.json` | Media manifest entries |
| Dealership | `dealership.schema.json` | Viaggio dealership config |
| Conversion Event | `conversion-event.schema.json` | Analytics event payloads |
| Lead | `lead.schema.json` | Lead capture records |

---

## Vehicle Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://viaggio.bo/schemas/vehicle.schema.json",
  "title": "Vehicle",
  "type": "object",
  "required": ["slug", "modelName", "modelYear", "status", "tagline"],
  "properties": {
    "slug": {
      "type": "string",
      "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$",
      "description": "URL-safe identifier, e.g. gs4-max"
    },
    "modelName": { "type": "string" },
    "modelYear": { "type": "integer", "minimum": 2020 },
    "status": {
      "type": "string",
      "enum": ["active", "preview", "coming_soon"]
    },
    "tagline": { "type": "string" },
    "heroMediaId": { "type": "string" },
    "priceFrom": { "type": "number", "minimum": 0 },
    "priceDisclaimer": { "type": "string" },
    "launchPriority": { "type": "integer", "default": 99 },
    "keyStats": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["label", "value"],
        "properties": {
          "label": { "type": "string" },
          "value": { "type": "string" },
          "icon": { "type": "string" }
        }
      }
    },
    "metadata": { "type": "object", "additionalProperties": true }
  },
  "additionalProperties": false
}
```

---

## Persona Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://viaggio.bo/schemas/persona.schema.json",
  "title": "Persona",
  "type": "object",
  "required": ["id", "name", "role", "purpose", "avatarMediaId"],
  "properties": {
    "id": {
      "type": "string",
      "enum": ["carlos", "sofia", "diego"]
    },
    "name": { "type": "string" },
    "role": { "type": "string" },
    "purpose": {
      "type": "string",
      "enum": ["trust", "desire", "ownership"]
    },
    "avatarMediaId": { "type": "string" },
    "voiceTraits": {
      "type": "array",
      "items": { "type": "string" }
    },
    "colorAccent": {
      "type": "string",
      "pattern": "^#[0-9A-Fa-f]{6}$"
    },
    "introLine": { "type": "string" }
  },
  "additionalProperties": false
}
```

---

## Content Block Schema

Discriminated union by `type` field:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://viaggio.bo/schemas/content-block.schema.json",
  "title": "ContentBlock",
  "type": "object",
  "required": ["id", "type", "sortOrder"],
  "properties": {
    "id": { "type": "string" },
    "type": {
      "type": "string",
      "enum": [
        "hero",
        "narration",
        "feature_grid",
        "stat_callout",
        "media_gallery",
        "comparison_snippet",
        "accordion",
        "video",
        "cta"
      ]
    },
    "personaId": {
      "type": "string",
      "enum": ["carlos", "sofia", "diego"]
    },
    "sortOrder": { "type": "integer", "minimum": 0 },
    "data": { "type": "object" }
  },
  "allOf": [
    {
      "if": { "properties": { "type": { "const": "hero" } } },
      "then": {
        "properties": {
          "data": {
            "type": "object",
            "required": ["mediaId", "headline"],
            "properties": {
              "mediaId": { "type": "string" },
              "headline": { "type": "string" },
              "subheadline": { "type": "string" }
            }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "narration" } } },
      "then": {
        "properties": {
          "data": {
            "type": "object",
            "required": ["text"],
            "properties": {
              "text": { "type": "string" },
              "emphasis": { "type": "string" }
            }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "feature_grid" } } },
      "then": {
        "properties": {
          "data": {
            "type": "object",
            "required": ["features"],
            "properties": {
              "features": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["icon", "title", "description"],
                  "properties": {
                    "icon": { "type": "string" },
                    "title": { "type": "string" },
                    "description": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "stat_callout" } } },
      "then": {
        "properties": {
          "data": {
            "type": "object",
            "required": ["stats"],
            "properties": {
              "stats": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["value", "label"],
                  "properties": {
                    "value": { "type": "string" },
                    "label": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    },
    {
      "if": { "properties": { "type": { "const": "cta" } } },
      "then": {
        "properties": {
          "data": {
            "type": "object",
            "required": ["action", "label"],
            "properties": {
              "action": {
                "type": "string",
                "enum": ["test_drive", "whatsapp", "compare", "tour", "topic"]
              },
              "label": { "type": "string" },
              "targetId": { "type": "string" }
            }
          }
        }
      }
    }
  ],
  "additionalProperties": false
}
```

---

## Conversion Event Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://viaggio.bo/schemas/conversion-event.schema.json",
  "title": "ConversionEvent",
  "type": "object",
  "required": ["eventType", "sessionId", "timestamp"],
  "properties": {
    "eventType": {
      "type": "string",
      "enum": [
        "session_started",
        "session_ended",
        "session_abandoned",
        "vehicle_selected",
        "theme_viewed",
        "topic_viewed",
        "content_block_viewed",
        "tour_started",
        "tour_step_completed",
        "tour_completed",
        "media_played",
        "comparison_viewed",
        "comparison_row_expanded",
        "test_drive_requested",
        "whatsapp_initiated",
        "consultant_handoff",
        "lead_queued_offline",
        "a11y_settings_changed"
      ]
    },
    "sessionId": { "type": "string", "format": "uuid" },
    "vehicleSlug": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "payload": {
      "type": "object",
      "properties": {
        "themeId": { "type": "string" },
        "topicId": { "type": "string" },
        "tourId": { "type": "string" },
        "stepId": { "type": "string" },
        "personaId": { "type": "string" },
        "compareTargetId": { "type": "string" },
        "entrySource": {
          "type": "string",
          "enum": ["kiosk", "qr", "consultant"]
        },
        "blockId": { "type": "string" },
        "blockType": { "type": "string" },
        "durationMs": { "type": "integer" }
      },
      "additionalProperties": true
    }
  },
  "additionalProperties": false
}
```

---

## Topic Schema (Summary)

Full file: `schemas/topic.schema.json`

```json
{
  "type": "object",
  "required": ["id", "themeId", "vehicleSlug", "title", "personaId", "blocks"],
  "properties": {
    "id": { "type": "string" },
    "themeId": { "type": "string" },
    "vehicleSlug": { "type": "string" },
    "title": { "type": "string" },
    "personaId": { "type": "string", "enum": ["carlos", "sofia", "diego"] },
    "tags": { "type": "array", "items": { "type": "string" } },
    "relatedTopicIds": { "type": "array", "items": { "type": "string" } },
    "blocks": {
      "type": "array",
      "items": { "$ref": "content-block.schema.json" }
    }
  }
}
```

---

## Validation Strategy (Phase 2)

1. **Build-time:** `ajv` validates all `src/content/**/*.json` in CI
2. **Authoring:** Content editors use schemas in VS Code (YAML/JSON schema association)
3. **Runtime:** Light validation on load; fail gracefully with fallback UI
4. **Types:** `json-schema-to-typescript` generates `src/types/` from `docs/schemas/`

## Sample Content Locations

| Content | Template Path |
|---------|---------------|
| GS4 MAX vehicle | `content/templates/vehicle.gs4-max.json` |
| GS4 MAX topic (safety) | `content/templates/topic.gs4-max.adas.json` |
| Personas | `content/templates/personas.json` |
| Dealership | `content/templates/dealership.json` |
| Compare target | `content/templates/compare.gs4-max.corolla-cross.json` |

---

*Related: [Data Models](./data-models.md) · [schemas/](./schemas/) · [content/](./content/)*
