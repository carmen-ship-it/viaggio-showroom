# Mobile Audio Compatibility

Reference for showroom audio on **iPhone Safari**, **Android Chrome**, and desktop browsers.

---

## Architecture

Playback uses native `HTMLAudioElement` — **no Web Audio `AudioContext`**. There are therefore no suspended-AudioContext issues; policy compliance is handled via user-gesture unlock.

| Layer | Role |
|-------|------|
| `AudioUnlockOverlay` | Full-screen tap on deep-linked routes when autoplay probe fails |
| `ExperienceEntry` / `AttractLoop` | **Single tap** — "Tocá para empezar" unlocks audio and advances to welcome (home `/`) |
| `useShowroomAmbient` | Keeps `showroom-loop.mp3` running across client routes |
| `AudioEngine.unlockFromUserGesture()` | **Synchronous** silent probe + ambient start inside pointer/tap handler |
| Gesture retry listener | Restores ambient after in-tab reload when session unlock is persisted |

Asset: `public/assets/audio/ambient/showroom-loop.mp3` → `audio-ambient-showroom`

---

## Mobile browser requirements

### iPhone Safari

1. **First `HTMLAudioElement.play()` must run synchronously inside a user gesture** (`pointerdown` / `touchstart` / `click`). Deferred `play()` from `useEffect`, `setTimeout`, or post-`await` fetch will fail.
2. **`playsinline` / `webkit-playsinline`** are set on all audio elements (`lib/audio/mobile-playback.ts`).
3. **Home attract uses `onPointerDown`** — one "Tocá para empezar" tap unlocks audio and starts the experience (no separate overlay on `/`).
4. **Deep links** — `AudioUnlockOverlay` still appears on non-home routes when unlock is required.
5. **No autoplay on load** — mount probe uses a silent WAV; failure is handled by the first user tap (expected on iOS).
6. **Session reload**: `sessionStorage` may mark audio unlocked, but iOS still blocks ambient until the next tap. A one-shot `pointerdown`/`touchstart` listener calls `unlockFromUserGesture()` again.

### Android Chrome

Same autoplay policy as iOS for unmuted media. The gesture-unlock path above applies identically. Desktop Chrome usually passes the silent mount probe and skips the overlay.

### Desktop Chrome

Silent autoplay probe on mount typically succeeds. Ambient starts via `useShowroomAmbient` without overlay. Deep-link routes still use `AudioUnlockOverlay` when needed.

---

## Verified behaviors

| Requirement | Implementation |
|-------------|----------------|
| Unlock on first interaction | `unlockFromUserGesture()` in overlay tap, attract tap, or gesture retry |
| Ambient after interaction | Starts in same synchronous handler as unlock |
| Ambient across routes | `AudioExperienceRoot` + `useShowroomAmbient` at layout level; `ensureAmbientPlaying` resumes without restart |
| Duck during narration | `AMBIENT_DUCKED_GAIN` (4%) while narration channel is `playing` |
| Restore after narration | `syncAmbientVolume(true)` on narration `ended` / `stop` |
| No autoplay violations | No audible play before user gesture; mount probe is silent |
| No AudioContext issues | Engine uses `HTMLAudioElement` only |
| No restart between screens | Per-screen `useScreenAmbient` disabled; global ambient only |
| Survives demo routes | Layout-level provider; narration stops per screen, ambient continues |

Routes exercised in executive demo: vehicle selection (`/vehicles`), compare, trust tour/themes, financing, convert, WhatsApp handoff.

---

## Ducking levels

- Ambient normal: `DEFAULT_CHANNEL_GAIN.ambient` × user slider ≈ **10%**
- Ambient ducked: `AMBIENT_DUCKED_GAIN` × user slider ≈ **4%**
- Fade: `AMBIENT_FADE_MS` (2000 ms)

---

## Validation

```bash
node scripts/validate-audio-routes.mjs
npm run build
```

Manual checklist (real device recommended):

1. iPhone Safari — cold load on `/` → single "Tocá para empezar" tap → ambient within ~2 s fade-in
2. Navigate vehicles → compare → financing → ambient continuous (no restart click)
3. Host narration on S03/S12 — ambient dips, restores when narration ends
4. Android Chrome — same flow
5. Desktop — no overlay (usually), ambient after load or first navigation

---

## Known limitations

- **In-tab reload with persisted unlock (iOS)**: One extra tap may be required before ambient resumes; gesture retry handles this automatically.
- **Background tab**: Ambient pauses on `visibilitychange` (by design); resumes when tab visible if it was playing.
- **Idle reset**: `IdleManager` fades out ambient and clears session — user must unlock again (kiosk privacy).
- **HEAD probe fallback**: Availability check tries `HEAD`, then `GET Range: bytes=0-0`; gesture unlock skips probe to preserve sync `play()`.

---

*Mobile audio audit · June 2026*
