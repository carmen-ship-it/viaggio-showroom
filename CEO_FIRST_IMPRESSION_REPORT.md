# CEO First Impression Report — Viaggio Digital Showroom

**Reviewer lens:** Dealership owner, first time seeing the GS4 MAX kiosk demo  
**Demo path reviewed:** S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15  
**Viewport tested:** Primarily 1920×1080 kiosk (canonical) with mobile-width checks  
**Date:** 14 June 2026  
**Method:** Live customer walkthrough only — no source-code review

---

## Executive Summary

The concept lands. Within the first minute I understand this is *my* showroom helping families explore a Chinese-brand SUV without pressure — and the trust-first arc directly addresses the objection I hear every week: *“¿Es confiable?”*

The **story and copy are investor-grade**. The **visual layer is not**. Gradient placeholders, wireframe silhouettes, missing logos, and occasional layout glitches make it feel like a brilliant script waiting for its stage set. The conversion tail — financing, comparison, test drive, WhatsApp handoff — is surprisingly mature in content and structure, but the demo still asks me to squint past unfinished surfaces.

**Verdict:** Worth investing in the *strategy and architecture*. Not yet worth putting in front of a paying customer without a guided operator and a focused polish sprint.

---

## First 30 Seconds

| Moment | What I felt |
|--------|-------------|
| **0–5 s** | Dark, premium attract loop. “Conocé el GAC GS4 MAX a tu ritmo” — calm, no salesman energy. Good. |
| **5–15 s** | Tap “Tocá para empezar.” Welcome overlay: “Sin presión. Explorá con calma antes de hablar con un asesor.” That line would make me nod in a board meeting. |
| **15–30 s** | Path choice “Primera vez con GAC” is clear. Vehicle card shows price ($us 42.900), warranty, HP — the facts I need early. Then the hero hits with a real car photo. Relief: this isn’t a wireframe anymore. |

**First-30-second grade: B+**  
Copy and tone excel. Visual placeholders and duplicate header text (visible on some viewports) pull it down from an A.

---

## Strongest Screen

### S25 — Objections & FAQ (Carlos, Mecánico Maestro)

This is the screen I would show a skeptical buyer — and a skeptical board member.

- Carlos introduces himself in plain language: *“Llevo más de 20 años bajo el capó… sin vueltas.”*
- Questions match real floor objections: Chinese brand trust, parts in Santa Cruz, resale, warranty, post-sale support.
- Answers are specific (5 años / 150.000 km, Viaggio as exclusive distributor, Grupo Roda) — not marketing fluff.
- Accordion interaction is intuitive; “Profundizar” chips hint at depth without overwhelming.

**Why it wins:** It turns my biggest business risk (Chinese-brand skepticism) into a structured, honest conversation. I would trust my sales team to stand beside this screen.

**Runner-up:** S12 Compare Detail — “Comparación honesta” with a 9 / 1 / 6 scorecard and explicit acknowledgment that Corolla Cross wins on resale. That honesty builds more confidence than a one-sided spec sheet.

---

## Weakest Screen

### S01 / S03 — Attract Loop & Vehicle Selector (visual layer)

At kiosk width the layout is acceptable; the **content gap** is the problem.

- Wireframe car silhouette instead of GS4 MAX photography on attract and selector cards.
- Logo placeholders (dark rectangles) where GAC and Viaggio marks should anchor brand legitimacy.
- On narrower viewports, hero stat pills truncate to nonsense values (e.g. “19 HP”, “$us 5”) — catastrophic if a visitor or executive sees that before the full layout resolves.

**Why it loses:** A dealership owner judges credibility in seconds by whether this looks like *our* car on *our* floor. Right now it reads “expensive prototype,” not “finished showroom.”

**Honorable mention for confusion:** S11 Compare Hub when trust prerequisites aren’t met — “Comparación disponible pronto” with no clear in-screen explanation of what’s missing. Following the scripted path avoids this; a curious visitor who taps ahead will stall.

---

## Would This Feel Worth Investing In?

### Yes — for the business model

| Signal | Weight |
|--------|--------|
| Trust-before-desire arc matches how Chinese-brand leads actually convert in Bolivia | High |
| Carlos persona + FAQ content is floor-ready copy | High |
| Honest comparison vs Corolla Cross — rare and valuable | High |
| Financing preview with disclaimers, TCO, trim/plazo toggles | Medium-High |
| Test drive form (family context, route preference, WhatsApp confirmation) | Medium-High |
| WhatsApp handoff with session context and QR | Medium-High |
| “Sin presión” positioning differentiates from traditional lot pressure | Medium |

### Not yet — for customer-facing deployment

| Gap | Risk |
|-----|------|
| Placeholder / missing media across hero, tour, attract | Looks unfinished to buyers |
| Inconsistent persona visuals (Carlos photo in FAQ, letter avatar in story, empty Sofía/Diego) | Breaks immersion |
| Placeholder WhatsApp number and generic address | Undermines “local partner” story |
| Compare competitor thumbnails missing | Weakens the strongest rational close |
| Tour overlay blur obscures Carlos narration text | Feels like a rendering bug |
| Demo environment instability (500 errors under load) | Unacceptable on opening day |

**Investment framing:** I would approve budget to **finish the visual and operational layer** on top of an already-strong narrative skeleton. I would **not** approve kiosk hardware rollout until P0 assets and a clean end-to-end run are guaranteed without an operator rescue script.

---

## Experience Map — Four Lenses

### Moments of Confusion

1. **Compare gating (S11)** — “Comparación disponible pronto” without telling me what to do next (unless I know the trust arc).
2. **Hero stat truncation** — Wrong numbers on some viewport sizes undermine instant credibility.
3. **Overlapping header text** — “GAC MOTOR BOLIVIA” / “Viaggio Motors Santa Cruz” stack awkwardly on mobile-width views.
4. **Persona inconsistency** — Carlos looks real in FAQ/tour header but appears as a letter badge in trust story; Sofía and Diego are empty circles on welcome.
5. **Tour text blur** — Frosted overlay partially obscures Carlos’s narration; reads as bug, not design.
6. **ADAS topic (S08)** — At mobile width feels sparse; feature grid may be below fold without obvious scroll cue at kiosk.

### Moments of Delight

1. **“Sin presión” welcome** — Immediately lowers guard; aligns with how I want my brand perceived.
2. **Hero car photography (S22)** — First emotional hit after wireframe screens; feels like *the* car.
3. **FAQ honesty** — “sin vueltas de vendedor” delivered with substance, not slogans.
4. **Compare scorecard (S12)** — “Ellos ganan” on reventa — I trust the rest because you admitted weakness.
5. **Financing ranges + TCO (S26)** — Boliviano-realistic framing; “tu consultor confirma tasa” protects me legally.
6. **Test drive form (S14)** — Family checkboxes, Doble Vía route option — shows you know Santa Cruz buyers.
7. **WhatsApp handoff (S15)** — QR + message preview + “contexto de tu visita” — closes the online/offline loop I actually need for leads.

### Moments That Feel Unfinished

1. Wireframe / gradient placeholders on attract, selector, tour media.
2. Missing GAC and Viaggio logos throughout.
3. Empty bank partner logo on financing.
4. Missing competitor vehicle images on compare.
5. Placeholder dealership phone (+59100000000) and address (Av. Cristóbal de Mendoza 1234).
6. Dev-only UI artifacts (framework badges, “N Issues”) if shown in staging.
7. Session recap chips on conversion hub appear thin when arriving without a full guided session.

### Moments That Create Confidence

1. **Structured trust arc** — FAQ → story → Carlos tour → ADAS feels intentional, not random pages.
2. **Local anchoring** — Santa Cruz, Doble Vía, Equipetrol, 4-city Viaggio network.
3. **Hard specs when they appear correctly** — 177 HP, 8 airbags, 5★ C-NCAP, 5 yr / 150k km warranty.
4. **Legal/commercial maturity** — Financing labeled “orientativo,” non-vinculante disclaimers.
5. **Lead handoff design** — Test drive → WhatsApp with intent parameter and session code.
6. **Conversion hub choice architecture** — Test drive vs WhatsApp vs keep exploring respects buyer pace.

---

## Improvements Ranked by Stakeholder Impact

| Rank | Improvement | Primary stakeholder | Impact | Effort |
|------|-------------|---------------------|--------|--------|
| **1** | **Replace all P0 placeholder media** — hero, attract, tour steps, trust story, ADAS with approved GS4 MAX photo/video | CEO, customer, marketing | Critical — transforms “prototype” into “showroom” | Medium |
| **2** | **Lock kiosk layout at 1920×1080** — fix stat truncation, header overlap, tour blur, ensure feature grids visible without hunting | Customer, floor staff | Critical — prevents credibility-killing glitches | Low–Medium |
| **3** | **Complete compare visuals + soften gating UX** — competitor thumbnails; if locked, show “Completá el tour de confianza (2 min)” with one-tap path | Sales manager, customer | High — comparison is the rational close | Medium |
| **4** | **Production operational data** — real WhatsApp, address, hours, bank partner logo | Dealership owner, ops | High — handoff must work on opening day | Low |
| **5** | **Persona visual consistency** — Carlos photo everywhere; Sofía/Diego headshots or hide until ready | Marketing, customer | Medium — immersion and brand polish | Low |
| **6** | **Bulletproof demo reliability** — production build, no 500s, idle reset, session reset between visitors | IT, floor staff | High for launch; Medium for pitch | Medium |
| **7** | **Richer session recap on S13** — chips reflecting FAQ opened, tour completed, compare viewed | Sales consultant | Medium — helps floor pickup | Medium |
| **8** | **Remove dev/staging artifacts** from executive demo environment | CEO, investors | Medium — professionalism | Low |

---

## Top 5 Improvements Before Executive Presentation

These are the minimum to walk into a room with the CEO, Grupo Roda, or GAC regional and feel proud — not apologetic.

### 1. Ship real vehicle photography on the first three screens (S01, S03, S22)
**Why:** Executives decide on visual credibility before reading a single FAQ. Wireframes signal “concept,” not “product.”

### 2. Run the demo only at 1920×1080 kiosk with layout fixes verified
**Why:** One wrong stat pill or blurred tour caption destroys the trust the copy built. The canonical demo viewport must be flawless.

### 3. Walk the full 14-screen path once without operator rescue — including compare unlock
**Why:** A dead-end at compare during the live pitch is the nightmare scenario. Either the path always unlocks, or the lock screen explains exactly what to tap.

### 4. Swap placeholder WhatsApp, address, and bank partner mark for real Viaggio data
**Why:** The closing screen is where investment converts to operations. A fake phone number in front of leadership is indefensible.

### 5. Add competitor imagery and one “hero moment” video clip (15–20 s) on Carlos tour step 1 or ADAS
**Why:** Gives the presentation a cinematic beat and makes the comparison screen feel researched, not generated.

---

## Emotional Arc — Did It Land?

```
Curiosity → Relief → Excitement → Wonder → Trust → Confidence → Validation → Ownership
 S01       S02       S03          S22      S25/S24  S06/S08      S11/S12/S26  S13–S15
  ✓         ✓         △            ✓        ✓✓       ✓/△          ✓✓           ✓
```

**Legend:** ✓✓ strong · ✓ present · △ weakened by visuals or UX friction

The **narrative architecture works**. The **sensorial finish** (photography, motion, consistent personas, zero glitches) is what separates a strategic yes from an operational go-live.

---

## Bottom Line for the Dealership Owner

I would tell my executive team:

> *“The thinking is right — we finally have a digital floor that leads with trust for GAC, speaks Santa Cruz, and hands warm leads to WhatsApp with context. I’m not putting it on the showroom wall until the car looks like our car, the numbers never lie on screen, and the WhatsApp at the end rings my actual sales desk.”*

That gap is closable. It is not a rebuild — it is a **finish pass** on the strongest automotive storytelling shell I’ve seen built for this market.

---

*Report generated from live customer-path review. Demo operator script: `docs/demo-walkthrough.md`.*
