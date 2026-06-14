# Executive Polish Pass — Viaggio Digital Showroom

**Date:** 14 June 2026  
**Scope:** Canonical demo path only (14 screens)  
**Constraint:** Visual-only changes — no routing, business logic, forms, APIs, trust gating, analytics, middleware, or content structure changes.

---

## Executive Summary

This pass elevates perceived premium quality across the full stakeholder demo path by standardizing typography, spacing, card treatment, and CTA hierarchy. Duplicate navigation controls and low-value operator chrome were removed. All changes are low-risk CSS/className adjustments plus minimal structural JSX cleanup (duplicate button removal only).

**Build status:** `npm run build` passes.

**Demo path:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15

---

## Global Design System Updates

### `app/globals.css`

| Change | Rationale |
|--------|-----------|
| Added `--spacing-section-lg`, `--spacing-card` tokens | Consistent vertical rhythm between sections |
| Enlarged `.type-label` (0.875rem, wider tracking) | Kiosk readability at 2–3 m |
| Added `.type-eyebrow`, `.type-kiosk-lead` | Unified eyebrow and lead copy hierarchy |
| Added `.section-rhythm`, `.section-rhythm-lg`, `.card-premium` | Reusable spacing/card utilities |

### Shared Components

| Component | Changes |
|-----------|---------|
| `TouchNav` | Buttons 56px min-height, `text-base`, wider padding, kiosk horizontal inset |
| `PremiumCTA` | Primary/secondary tiers use `text-lg` on md+, semibold primary |
| `ConversionPathCard` | New `variant="dark"` for glass cards on dark canvases; larger titles (xl), accent ring on highlighted card |
| `QRCodePanel` | Optional `step` prop with numbered badge for sequential handoff |
| `HeroStatStrip` | Stats 32→40px on md; increased card padding |
| `FeatureGridRenderer` | Feature titles lg, body base — better ADAS grid legibility |

---

## Screen-by-Screen Changes

### S01 · Attract Loop (`AttractLoop.tsx`)

- Applied `type-display`, `type-label`, `type-eyebrow` for hero hierarchy
- Enlarged “Tocá para empezar” pill to 56px min-height with stronger border
- Increased vertical padding and kiosk horizontal inset

### S02 · Session Welcome (`WelcomeScreen.tsx`)

- Consolidated tagline into single `type-kiosk-lead` line (removed redundant sub-copy)
- Path selector cards 80px min-height, lg titles
- Primary CTA 64px min-height, `text-lg`
- Persona guide row hidden in demo lock mode (already single-path)

### S03 · Vehicle Selector (`VehicleSelector.tsx`)

- Headlines use `type-headline` / `type-display`
- Stats pills enlarged to `text-sm`
- **CTA affordance:** “Explorar experiencia →” converted from text link to gold pill button (matches TouchNav accent language)

### S22 · Immersive Hero (`VehicleHero.tsx`)

- Footer bar padding increased; TouchNav spacing separated from CTA row

### S25 · FAQ (`FAQScreen.tsx`)

- Accordion questions `text-xl`, rows 76px min-height
- Typography utilities applied to header
- **Removed low-value chrome in demo:** trust signal counter and inline compare link hidden when `shouldHideDeveloperTools()` (operator-only elements)

### S24 · Trust Story (`TrustStoryScreen.tsx`)

- Chapter sections use kiosk padding token
- Headlines `type-headline`, subtitles `type-kiosk-lead`
- Increased block spacing (mt-12, space-y-8)

### S06 · Carlos Trust Tour (`TourPlayer.tsx`)

- **Removed duplicate title** overlay on media (title now appears once in narration card)
- Enlarged persona avatar, headline, and narration card padding
- Header step indicator `text-lg`

### S08 · ADAS Topic (`TopicDeepDiveScreen.tsx`)

- Applied type utilities; increased section padding and content gap

### S11 · Compare Hub (`CompareHubScreen.tsx`)

- Typography hierarchy aligned with other trust screens
- Competitor cards 160px min-height, xl names
- **Removed duplicate CTA:** inline “Ver comparación” button removed; TouchNav remains sole forward action

### S12 · Compare Detail (`CompareDetailScreen.tsx`)

- Header and stat pills enlarged for kiosk
- Table row labels `text-lg`; expand affordance `text-lg`
- **Removed duplicate CTA:** sticky footer “Ver cuota orientativa” bar removed; TouchNav handles forward navigation
- Intersection observer retained for `comparison_completed` trust signal

### S26 · Financing Preview (`FinancingPreviewScreen.tsx`)

- Disclaimer collapsed from boxed alert to single prose line (reduced header density)
- Headlines use type utilities; cuota hero unchanged functionally
- **Removed duplicate CTAs:** mid-page “Quiero que me confirmen” / “Agendar prueba” row removed
- TouchNav `onNext` preserves `handleConfirmInterest()` before routing to S13

### S13 · Conversion Hub (`ConversionHubScreen.tsx`)

- All path cards switched to `variant="dark"` glass treatment (consistent with cinematic screens)
- Test drive card gets accent border + demo pulse ring
- **Removed duplicate CTA:** footer “Agendar ahora” button and sheet overlay removed (test drive card is primary)
- Session recap card padding increased

### S14 · Test Drive Form (`TestDriveForm.tsx`)

- Page header uses type utilities
- Form field spacing increased (`space-y-6`)

### S15 · WhatsApp Handoff (`WhatsAppHandoffScreen.tsx`)

- Numbered steps on QR panels (1 · WhatsApp, 2 · Reanudar opcional)
- Typography aligned with conversion screens
- **Removed duplicate link:** “Volver al vehículo” tertiary link removed; single “Seguir explorando” remains

---

## Duplicate Controls Removed

| Screen | Removed | Kept |
|--------|---------|------|
| S11 | Inline comparison button | TouchNav next |
| S12 | Sticky footer financing CTA | TouchNav next |
| S26 | Mid-page dual CTAs | TouchNav next (with interest flag) |
| S13 | Footer “Agendar ahora” + sheet | Highlighted test drive card |
| S15 | “Volver al vehículo” link | WhatsApp primary + TouchNav back |
| S06 | Duplicate step title on media | Title in narration card only |

---

## Kiosk Readability Improvements

- Minimum touch targets raised to **56px** on all primary navigation (TouchNav, attract CTA, conversion cards)
- Body and label type scaled via clamp utilities and enlarged `.type-label`
- Horizontal padding uses `--spacing-kiosk` (7.5rem) consistently on md+ breakpoints
- Stat numerals and comparison verdict counts enlarged for distance viewing

---

## Intentionally Not Changed

Per scope constraints, the following were **not** modified:

- Route definitions, middleware, demo-mode gating logic
- Form fields, validation, API payloads
- Trust signal thresholds and session recording
- Analytics event names or triggers
- Content JSON, copy text, or block structure
- Media assets (still fallback gradients/SVG where production assets pending)

---

## Files Modified

```
app/globals.css
components/cinematic/TouchNav.tsx
components/premium/PremiumCTA.tsx
components/premium/HeroStatStrip.tsx
components/conversion/ConversionParts.tsx
components/conversion/QRCodePanel.tsx
components/content/renderers/FeatureGridRenderer.tsx
components/screens/AttractLoop.tsx
components/screens/WelcomeScreen.tsx
components/screens/VehicleSelector.tsx
components/screens/VehicleHero.tsx
components/screens/FAQScreen.tsx
components/screens/TrustStoryScreen.tsx
components/screens/TourPlayer.tsx
components/screens/TopicDeepDiveScreen.tsx
components/screens/CompareHubScreen.tsx
components/screens/CompareDetailScreen.tsx
components/screens/FinancingPreviewScreen.tsx
components/screens/ConversionHubScreen.tsx
components/screens/TestDriveForm.tsx
components/screens/WhatsAppHandoffScreen.tsx
```

---

## Verification

```bash
rm -rf .next && npm run build
# ✓ Compiled successfully
# ✓ Generating static pages (69/69)
```

---

## Recommended Follow-Up (Out of Scope)

These items require assets or logic changes beyond this polish pass:

1. Replace fallback media with production photography/video (biggest luxury lift)
2. S08 ADAS dashboard imagery in feature grid
3. S12 competitor thumbnail (real Corolla Cross photo)
4. S26 bank partner logos (replace placeholder)
