# Viaggio Showroom Audio Assets

Executive demo audio: **ElevenLabs host narration** (MP3) and **subtle UI sound effects** only.

## Layout

```
narration/host/host-*.mp3   — executive host voice (es-BO), one file per screen
sfx/nav-tap.mp3             — navigation / CTA tap
sfx/card-select.mp3         — vehicle card selection
sfx/transition-soft.mp3     — screen transition
sfx/success.mp3             — financing interest confirm
sfx/qr-reveal.mp3           — WhatsApp QR panel
```

Registry paths are defined in `lib/audio/host-narration.ts` and `lib/audio/assets.ts`.

Validate integration:

```bash
node scripts/validate-audio-routes.mjs
```

Replace host MP3 files in `narration/host/` when updating ElevenLabs exports; keep filenames aligned with `HOST_NARRATION_TRACKS`.
