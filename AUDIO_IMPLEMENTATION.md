# Phase 7 — Audio Implementation Reference

Technical guide for the premium audio architecture delivered in Phase 7.

---

## Quick Start

The build is **audio-ready**: all wiring is in place. Drop MP3 files into the paths below and they will play automatically (subject to user settings).

```bash
# Verify content + production build
npm run validate:content
npm run build
```

No additional npm packages were added — playback uses the native `HTMLAudioElement` API.

---

## Provider Setup

`AudioProvider` wraps the showroom layout:

```tsx
// app/(showroom)/layout.tsx
<A11yProvider>
  <SessionProvider>
    <AudioProvider>
      {children}
      <SettingsOverlay />
      <IdleManager />
    </AudioProvider>
  </SessionProvider>
</A11yProvider>
```

### Consumer hook

```tsx
import { useAudio } from "@/lib/audio";

const {
  preferences,
  toggleMute,
  playAmbient,
  playNarration,
  playInteraction,
} = useAudio();
```

Use `useAudioOptional()` in overlays that must tolerate missing provider (e.g. tests).

---

## Channel Model

Defined in `lib/audio/channels.ts`:

| Channel | Loop | Pause on hidden | Exclusive |
|---------|------|-----------------|-----------|
| `ambient` | yes | yes | no |
| `narration` | no | yes | yes |
| `interaction` | no | no | no |

Default gains (`lib/audio/constants.ts`):

- Ambient: 0.22 × user slider
- Narration: 0.85 × user slider
- Interaction: 0.35 × user slider (disabled when interaction sounds off)

Headphone mode multipliers: ambient ×0.55, narration ×1.15, interaction ×0.9.

---

## Adding a New Audio Asset

### 1. Place the file

```
public/assets/vehicles/{slug}/audio/narration/carlos-trust-02.mp3
```

### 2. Register in code (optional but recommended)

```typescript
// lib/audio/assets.ts
{
  id: "audio-narration-carlos-trust-02",
  src: "/assets/vehicles/gs4-max/audio/narration/carlos-trust-02.mp3",
  channel: "narration",
  vehicleSlug: "gs4-max",
  label: "Carlos — Chasis y durabilidad",
}
```

### 3. Add to media manifest (for CMS parity)

```json
{
  "id": "audio-narration-carlos-trust-02",
  "vehicleSlug": "gs4-max",
  "type": "audio",
  "src": "/assets/vehicles/gs4-max/audio/narration/carlos-trust-02.mp3",
  "alt": "Narración Carlos — Chasis (es-BO)",
  "category": "audio",
  "tags": ["narration", "carlos", "trust-02"]
}
```

### 4. Content hook (optional explicit ID)

In a narration block:

```json
{
  "type": "narration",
  "data": {
    "text": "...",
    "audioAssetId": "audio-narration-carlos-trust-02"
  }
}
```

If omitted, convention resolves to `audio-narration-{persona}-{stepId|topicId}`.

---

## Screen Ambient Tracks

Configure in `lib/audio/screen-tracks.ts`:

```typescript
S22: {
  screenId: "S22",
  ambientAssetId: "audio-ambient-showroom",
  autoPlayAmbient: true,
},
```

Use in a screen component:

```tsx
import { useScreenAmbient } from "@/lib/audio";

useScreenAmbient({ screenId: "S22" });
```

---

## Tour Narration

`TourPlayer` uses `useTourNarration`:

```tsx
const { narrationAssetId } = useTourNarration({
  vehicleSlug,
  stepId: current.stepId,
  personaId: persona.id,
  topicId: current.topic?.id,
  narrationData: narrationBlock,
});
```

Behavior:
- Plays on step change when `preferences.narrationAutoPlay` and not muted
- Plays step-advance SFX between steps
- Stops narration channel on tour unmount
- Renders `NarrationControls` for manual play/pause

---

## Interaction Sounds

```tsx
import { useInteractionSound } from "@/lib/audio";

const { playCtaTap, playTransition, playVehicleSelect } = useInteractionSound();
```

Already wired:
- `PremiumCTA` — `audio-sfx-cta-tap`
- `TouchNav` — `audio-sfx-step-advance`, `audio-sfx-nav-back`
- `PageTransition` — `audio-sfx-transition-soft`

To add vehicle select sound, call `playVehicleSelect()` in `VehicleSelector` on card tap.

---

## UI Components

| Component | Path | Usage |
|-----------|------|-------|
| `MuteButton` | `components/audio/MuteButton.tsx` | Header quick mute |
| `NarrationControls` | `components/audio/NarrationControls.tsx` | Play/pause per track |
| `HeadphoneModeBadge` | `components/audio/HeadphoneModeBadge.tsx` | Status when headphone mode on |

Settings controls live in `components/overlays/SettingsOverlay.tsx` (Audio section).

---

## Document Attributes

Set by `AudioProvider` for CSS hooks:

```html
<html data-audio-muted="true|false" data-headphone-mode="true|false">
```

---

## Schema Updates

- `docs/schemas/media-asset.schema.json` — `type: "audio"`, `category: "audio"`
- `docs/schemas/content-block.schema.json` — narration `audioAssetId`, `variant`, `autoPlay`
- `types/media.ts` — `MediaType` includes `"audio"`
- `types/blocks.ts` — extended `NarrationBlockData`

---

## Engine Internals

`AudioEngine` (`lib/audio/AudioEngine.ts`):

- Lazy `HTMLAudioElement` pool keyed by `assetId::src`
- `HEAD` probe caches availability per src URL
- Fade-in for ambient starts (`AMBIENT_FADE_MS = 800`)
- Interaction debounce (`INTERACTION_DEBOUNCE_MS = 120`)
- `destroy()` on provider unmount clears elements

### Key methods

```typescript
engine.playAsset(assetId, { channel?, fadeIn? })
engine.pauseChannel("narration")
engine.stopChannel("ambient")
engine.stopAll()
engine.playInteraction("audio-sfx-cta-tap")
```

---

## Testing Without Audio Files

Expected behavior when files are absent:

1. No thrown errors; `playAsset` returns `false`
2. `NarrationControls` still render (manual play attempts fail silently)
3. Ambient hook runs but no audible output
4. Interaction SFX no-op

To test with a real file, add any short MP3 at:

```
public/assets/audio/sfx/cta-tap.mp3
```

Then tap any `PremiumCTA`.

---

## File Index

```
lib/audio/
  AudioEngine.ts
  AudioProvider.tsx
  assets.ts
  channels.ts
  constants.ts
  index.ts
  resolve-audio.ts
  screen-tracks.ts
  useInteractionSound.ts
  useScreenAmbient.ts
  useTourNarration.ts

components/audio/
  HeadphoneModeBadge.tsx
  MuteButton.tsx
  NarrationControls.tsx
  index.ts

types/audio.ts

public/assets/audio/README.md
public/assets/vehicles/gs4-max/audio/narration/README.md
```

---

## Known Limitations

- No crossfade between ambient tracks when switching screens (stop + restart)
- Narration unavailable state not surfaced in UI (button visible, silent playback)
- Browser autoplay policies may require first user gesture before ambient starts — attract tap on S01 satisfies this for subsequent screens
- Session preferences reset on full page reload (by design for kiosk privacy)

---

*Implementation reference · Phase 7 · June 2026*
