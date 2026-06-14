# Phase 7 — Premium Audio Experience Plan

**Viaggio Digital Showroom · Kiosk Audio Strategy**

---

## 1. Vision

Make the kiosk feel alive and emotionally engaging through a layered audio system that supports premium showroom presence without overwhelming visitors or staff. Audio is **optional at every layer**: the experience remains fully functional when assets are missing or sound is muted.

**Locale:** Spanish (Bolivia) — `es-BO`, aligned with `lang="es-BO"` on the document root.

**Phase 7 scope:** Architecture, controls, content hooks, and placeholder asset paths. **No final audio files** are generated in this phase.

---

## 2. Audio Layers

| Layer | Purpose | Default behavior | Channel |
|-------|---------|------------------|---------|
| **Ambient soundtrack** | Continuous low-volume premium showroom music | Auto-play on attract/welcome/hero when unmuted | `ambient` |
| **Voice narration** | Persona-driven storytelling per screen/tour step | Auto-play when enabled in settings | `narration` |
| **Interaction audio** | Soft transitions, CTA taps, navigation, vehicle select | Enabled by default; debounced | `interaction` |

Channels are **independent**: muting ambient does not disable narration controls; master mute silences all.

---

## 3. User Controls & Accessibility

### Global (header)
- **Mute button** — one-tap master mute/unmute (`MuteButton`)
- **Headphone mode badge** — visible when active

### Settings overlay (S19)
- Master mute
- Headphone mode (reduced ambient, boosted narration clarity)
- Narration auto-play toggle
- Interaction sounds toggle
- Ambient volume slider (0–100%)
- Narration volume slider (0–100%)

### Per-screen narration
- **Play/pause** on tour steps (`TourPlayer`) and topic narration blocks (`NarrationRenderer`)

### Auto-pause
- Ambient and narration pause when the browser tab/window is hidden (`visibilitychange`)
- All audio stops on idle session reset (S20) and session restart

### Headphone mode
- Intended for kiosk setups with a 3.5 mm jack or Bluetooth receiver at the stand
- Lowers ambient gain (~55%), raises narration (~115%)
- Sets `html[data-headphone-mode="true"]` for optional CSS tuning

---

## 4. Content Integration

### Narration blocks (`types/blocks.ts`)

```typescript
interface NarrationBlockData {
  text: string;
  emphasis?: string;
  audioAssetId?: string;   // explicit override
  variant?: "short" | "full";
  autoPlay?: boolean;      // per-block override (future)
}
```

**Asset ID convention** (when `audioAssetId` is omitted):

```
audio-narration-{personaId}-{stepId|topicId}
```

Examples:
- `audio-narration-carlos-trust-01` — tour step
- `audio-narration-carlos-engine` — topic deep-dive

Source scripts: `docs/content/carlos-narration.md`, `sofia-narration.md`, `diego-narration.md`.

### Per-screen ambient (`lib/audio/screen-tracks.ts`)

Screens S01, S02, S03, S04, S06, S08, S22, S24 declare optional ambient and narration auto-play flags.

---

## 5. Asset Pipeline

### Directory layout (placeholders only)

```
public/assets/audio/
  ambient/showroom-loop.mp3
  ambient/attract-loop.mp3
  sfx/transition-soft.mp3
  sfx/cta-tap.mp3
  sfx/step-advance.mp3
  sfx/vehicle-select.mp3
  sfx/nav-back.mp3

public/assets/vehicles/gs4-max/audio/narration/
  carlos-trust-01.mp3
  carlos-engine.mp3
  ...
```

### Registry
- **Code registry:** `lib/audio/assets.ts` — global + GS4 MAX narration slots
- **Manifest:** `content/vehicles/gs4-max/media-manifest.json` — `type: "audio"` entries
- **Resolution:** `lib/audio/resolve-audio.ts` — registry first, then manifest

Playback probes asset availability via `HEAD` request; missing files fail **silently** (no console errors in production).

---

## 6. Architecture Diagram

```
app/(showroom)/layout.tsx
  A11yProvider
    SessionProvider
      AudioProvider  ← global engine + preferences
        Screens / Overlays

lib/audio/
  AudioEngine.ts      — 3-channel HTMLAudioElement manager
  AudioProvider.tsx   — React context, analytics hooks
  resolve-audio.ts    — asset ID → src path
  screen-tracks.ts    — per-screen ambient config
  useTourNarration.ts — tour step sync
  useScreenAmbient.ts — screen ambient lifecycle
  useInteractionSound.ts — SFX helpers

components/audio/
  MuteButton.tsx
  NarrationControls.tsx
  HeadphoneModeBadge.tsx
```

### Integration points

| Component | Audio behavior |
|-----------|----------------|
| `ExperienceEntry` | Ambient S01/S02 via `useScreenAmbient` |
| `TourPlayer` | Step narration + `NarrationControls` |
| `NarrationRenderer` | Topic narration controls |
| `PremiumCTA` / `TouchNav` | CTA and navigation SFX |
| `PageTransition` | Soft transition SFX |
| `GlobalHeader` | Mute + headphone badge |
| `SettingsOverlay` | Full audio preferences |
| `IdleManager` | `stopAll()` on idle reset |

---

## 7. Analytics Events

| Event | When |
|-------|------|
| `audio_settings_changed` | Volume, mute, headphone, auto-play toggles |
| `ambient_start` | Ambient track successfully started |
| `narration_start` | Narration track started |
| `narration_pause` / `narration_resume` | Manual narration control |

---

## 8. Production Guidelines (when recording assets)

### Ambient
- 60–90 s seamless loop, -18 LUFS integrated, no vocals
- Warm, modern, understated — luxury automotive showroom tone

### Narration
- Professional Bolivian Spanish (`es-BO`), persona-matched tone per `docs/voice-strategy.md`
- Short variant: 15–30 s for kiosk pacing; full variant for headphone/deep mode

### SFX
- Subtle, < 300 ms for taps; < 600 ms for transitions
- Avoid harsh transients in open showroom environments

---

## 9. Phased Rollout After Phase 7

| Phase | Deliverable |
|-------|-------------|
| 7.1 | Record ambient loops + core SFX pack |
| 7.2 | Carlos trust tour narration (8 steps) |
| 7.3 | Sofia / Diego persona packs |
| 7.4 | Topic-level narration for S08 deep-dives |
| 7.5 | Trust story (S24) chapter audio |

---

## 10. Out of Scope (Phase 7)

- Final MP3/OGG file generation
- Text-to-speech runtime
- Background audio on conversion/forms (privacy)
- Persistent cross-session volume memory (session-scoped only)

---

*Document version: Phase 7 · June 2026*
