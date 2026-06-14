# DEMO_MODE Checklist

Stakeholder kiosk configuration for the Viaggio Digital Showroom. When enabled, the app locks to the canonical GS4 MAX demo arc and hides operator/dev surfaces.

## Enable

```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=true
```

Restart the dev server or rebuild for production:

```bash
npm run dev
# or
npm run build && npm start
```

Configuration lives in `lib/config/demo-mode.ts`. Route guards live in `middleware.ts` via `lib/config/demo-routes.ts`.

---

## What DEMO_MODE Does

| Flag | Behavior |
|------|----------|
| Hide developer tools | Removes S## badges, ShowroomNav, and inline screen IDs |
| Hide unfinished routes | Redirects dev/placeholder routes to the nearest demo step |
| Hide coming soon vehicles | Hides GS8, EMKOO, EMZOOM cards on S03; hides unavailable compare targets on S11 |
| Hide placeholder warnings | Removes “Próximamente” resume/share stubs |
| Force Primera Vez path | Hides “Ya investigué online”; always routes to `/vehicles` |
| Highlight primary CTA | Pulses scripted next actions (footer TouchNav + key cards) |
| Disable exploration branches | Hides hero hotspots, lateral CTAs, share/financing detours, home-logo restart |

---

## Pre-Demo Checklist (Operator)

### Environment

- [ ] `NEXT_PUBLIC_DEMO_MODE=true` is set on the kiosk build
- [ ] Dev server restarted after env change
- [ ] Viewport set to **1920×1080** landscape
- [ ] Browser chrome hidden (kiosk / fullscreen)

### Session reset

- [ ] Attract loop is showing at `/` (no stale session)
- [ ] If S20 idle prompt appears, tap **Sí, continuar** or wait for auto-reset
- [ ] Optional: **Ajustes → Reiniciar sesión** between visitors

### Visual verification (demo mode ON)

- [ ] No S## badges visible anywhere
- [ ] No ShowroomNav sidebar on convert / WhatsApp / financing pages
- [ ] S03 shows **only** GAC GS4 MAX (no “Próximamente” column)
- [ ] S02 shows **only** “Primera vez con GAC” (no pre-researched card)
- [ ] S22 hero has **no** hotspot markers or lateral CTA row — only footer **¿Es confiable?**
- [ ] Footer **next** buttons show a gold pulse ring
- [ ] Logo in header does **not** link home (prevents accidental reset)

### Content placeholders (expected)

- [ ] Hero / tour / trust media may show gradient placeholders — narrate the story
- [ ] WhatsApp number in `dealership.json` may be placeholder — QR structure still works

---

## Canonical Demo Path

```
S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
```

| Step | Screen | Route | Primary action (highlighted) |
|------|--------|-------|----------------------------|
| 1 | S01 Attract | `/` | Touch anywhere |
| 2 | S02 Welcome | `/` | **Empezar experiencia** |
| 3 | S03 Selector | `/vehicles` | Tap GS4 MAX hero card |
| 4 | S22 Hero | `/vehicles/gs4-max/hero` | Footer **¿Es confiable?** |
| 5 | S25 FAQ | `/vehicles/gs4-max/trust/faq` | Open ≥2 items → footer **Historia Viaggio & GAC** |
| 6 | S24 Trust Story | `/vehicles/gs4-max/trust/story` | Footer **Tour con Carlos** |
| 7 | S06 Carlos Tour | `/vehicles/gs4-max/tour/trust` | **Siguiente** ×4 → **Profundizar en ADAS** |
| 8 | S08 ADAS Topic | `/vehicles/gs4-max/themes/safety/adas` | Footer **Comparar con Corolla Cross** |
| 9 | S11 Compare Hub | `/vehicles/gs4-max/compare` | **Ver comparación con Toyota Corolla Cross** |
| 10 | S12 Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` | Footer **Cuota orientativa** |
| 11 | S26 Financing | `/vehicles/gs4-max/economics/financing` | **Dar el siguiente paso** |
| 12 | S13 Conversion | `/vehicles/gs4-max/convert` | **Agendá tu prueba de manejo** card |
| 13 | S14 Test Drive | `/vehicles/gs4-max/test-drive` | Fill name + phone → **Confirmar** |
| 14 | S15 WhatsApp | `/vehicles/gs4-max/whatsapp` | Show QR + message preview |

Overlays still available: **S19** (Settings) · **S20** (Idle reset)

---

## Blocked Routes (auto-redirect in demo mode)

| Blocked route | Redirects to |
|---------------|--------------|
| `/vehicles/gs4-max` (S04 dev hub) | `/vehicles/gs4-max/hero` |
| `/vehicles/gs4-max/journey/*` | `/vehicles/gs4-max/tour/trust` |
| `/vehicles/gs4-max/experience/*` | `/vehicles/gs4-max/hero` |
| `/vehicles/gs4-max/share` | `/vehicles/gs4-max/convert` |
| `/vehicles/gs4-max/resume` | `/vehicles/gs4-max/convert` |
| `/vehicles/gs4-max/test-drive/info` | `/vehicles/gs4-max/test-drive` |
| `/vehicles/gs4-max/gallery`, `/specs` | `/vehicles/gs4-max/hero` |
| `/vehicles/gs4-max/trust/warranty` | `/vehicles/gs4-max/trust/faq` |
| Theme landings (except ADAS topic) | `/vehicles/gs4-max/themes/safety/adas` or hero |

---

## Hidden UI in Demo Mode

### Developer tools

- [ ] CinematicShell S## pill
- [ ] ShowroomShell header badge + ShowroomNav
- [ ] Inline `S## ·` eyebrow labels (shown as plain copy only)

### Exploration branches

- [ ] S02 “Ya investigué online” path card
- [ ] S22 hero hotspots (SEGURIDAD, etc.)
- [ ] S22 lateral PremiumCTA row (Diego, Sofía, compare shortcuts)
- [ ] S06 tour end “Volver al hero”
- [ ] S13 financing + share conversion cards
- [ ] S33 resume / “Continuar después” placeholder block
- [ ] GlobalHeader logo home link

### Coming soon / placeholders

- [ ] S03 coming-soon vehicle column (GS8, EMKOO, EMZOOM)
- [ ] S11 unavailable compare targets (Tucson, Tiggo)
- [ ] “Próximamente” resume copy on share screen

---

## QA Smoke Test (5 min)

Run with `NEXT_PUBLIC_DEMO_MODE=true`:

1. [ ] Load `/` → touch → welcome shows single path → **Empezar experiencia**
2. [ ] Lands on `/vehicles` with one hero card only
3. [ ] Hero → FAQ → story → tour (5 steps) → ADAS → compare → detail → financing → convert → test drive → WhatsApp
4. [ ] Try `/vehicles/gs4-max` manually → redirects to hero
5. [ ] Try `/vehicles/gs4-max/experience/sofia` → redirects to hero
6. [ ] Confirm no S## badges or nav sidebar visible on `/convert`

---

## Disable Demo Mode

Set `NEXT_PUBLIC_DEMO_MODE=false` (or remove the variable) and restart. Full showroom navigation, coming-soon teasers, and exploration branches return.

---

## Related Documents

- [docs/demo-walkthrough.md](./docs/demo-walkthrough.md) — full click-by-click script
- [lib/config/demo-mode.ts](./lib/config/demo-mode.ts) — configuration source
- [lib/config/demo-routes.ts](./lib/config/demo-routes.ts) — redirect rules
