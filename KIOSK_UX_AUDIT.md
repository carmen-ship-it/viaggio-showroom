# Kiosk UX Audit — Viaggio Digital Showroom

**Audit date:** 14 June 2026  
**Context:** In-dealership kiosk, 1920×1080 landscape, customer standing, distracted, 3–5 minutes available, may never scroll, may not be tech-savvy  
**Method:** Screen-by-screen usability review against kiosk heuristics — not responsive web audit  

---

## Kiosk Design Assumptions

| Assumption | Implication |
|------------|-------------|
| User is **standing** | No comfortable scrolling; thumb reach matters |
| User is **distracted** | Spouse, kids, consultant, other cars competing |
| User has **3–5 minutes** | Full 14-screen demo path (~12–15 min) exceeds attention budget |
| User **may never scroll** | Below-fold content = does not exist |
| User **may not be tech-savvy** | No hidden gestures; no multi-step nav puzzles |
| User may be **55+ or low digital literacy** | Large text, high contrast, obvious buttons |
| **Family groups** watch from 2m | Type must be readable at distance |

---

## Global Usability Scorecard

| Heuristic | Score (1–5) | Notes |
|-----------|-------------|-------|
| Single-screen fit (no scroll) | **2/5** | 6+ screens require scroll |
| One obvious primary action | **2/5** | Nav chrome overwhelms CTAs |
| Touch target size (≥48px) | **4/5** | Chip selects and CTAs generally adequate |
| Readability at 2m | **3/5** | Good typography; truncated stats break trust |
| Progress/orientation | **2/5** | No session progress; screen IDs confuse |
| Error recovery | **3/5** | Back button exists; idle reset loses work |
| Accessibility (S19) | **4/5** | Settings overlay is strong — but exposed too early |
| Time-to-value | **2/5** | 6 screens before compare |

**Overall kiosk readiness: 2.5/5 — Not suitable for unsupervised deployment.**

---

## Screen-by-Screen Kiosk Audit

### S01 — Attract Loop

| Check | Pass? | Issue |
|-------|-------|-------|
| Fits 1080p | ✅ | — |
| One primary action | ✅ | Full-screen tap |
| Stops foot traffic | ❌ | Wireframe overlay at 40% opacity **mutes real hero photo** |
| 3-second comprehension | ❌ | Text-only value prop; car not obvious |
| Safe from mis-tap | ❌ | Settings/Ajustes accessible |

**Abandon risk:** Customer walks past without tapping — **highest traffic loss point**.

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Remove SVG overlay when real photo loads | More stops | See the car instantly | Low | 9 |
| Add looping video + price flash ("desde $us 42.900") | Foot traffic conversion | Immediate relevance | Medium | 9 |
| Hide Settings on attract | Fewer broken sessions | No accidental misconfig | Low | 8 |

---

### S02 — Session Welcome

| Check | Pass? | Issue |
|-------|-------|-------|
| Fits 1080p | ✅ | — |
| One primary action | ⚠️ | Path choice before "Empezar" adds friction |
| 3-second comprehension | ✅ | "Sin presión" lands well |
| Persona avatars | ❌ | Sofía/Diego empty circles |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Merge path choice into discovery quiz (next screen) | Faster start | One less decision | Medium | 7 |
| Real persona photos | Immersion | Guides feel human | Low (assets) | 8 |

---

### S03 — Vehicle Selector

| Check | Pass? | Issue |
|-------|-------|-------|
| Fits 1080p | ✅ | — |
| One primary action | ✅ | Tap GS4 MAX |
| Visual credibility | ⚠️ | 35% SVG overlay on hero card |
| Coming-soon clarity | ❌ | Three identical placeholder SUVs |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Remove overlay on loaded image | Credibility | Car looks real | Low | 9 |
| Hide or visually distinct coming-soon cards | Less confusion | Clear "one car today" | Low | 7 |

---

### S22 — Immersive Hero

| Check | Pass? | Issue |
|-------|-------|-------|
| Fits 1080p | ✅ | Best kiosk screen |
| One primary action | ❌ | 5+ footer CTAs in full mode |
| Hot-spots usable standing | ⚠️ | Small targets on large image |
| Stat strip readable | ❌ | Truncates on some widths ("19 HP") |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Single recommended CTA + "Más opciones" drawer | Guided flow | No paralysis | Medium | 8 |
| Fix stat strip min-width/truncation | Trust | Correct numbers always | Low | 10 |
| Enlarge hot-spot hit areas (min 64px) | Engagement | Easier standing tap | Low | 7 |

---

### S25 — FAQ

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Open accordions scroll |
| One primary action | ⚠️ | Read vs "next step" compete |
| Kiosk reading load | ⚠️ | 5 items × long answers = fatigue |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| "¿Cuál es tu duda?" — 5 tap tiles routing to ONE expanded answer | Faster objection handling | Personalized | Medium | 8 |
| Sticky footer CTA: "Siguiente: Historia Viaggio" | Flow continuity | Always know what's next | Low | 7 |

---

### S24 — Trust Story

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ❌ | Vertical snap-scroll chapters |
| One primary action | ⚠️ | Scroll = implicit action |
| Kiosk-appropriate | ❌ | Reading wall; no video files exist |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Replace with 2 auto-advancing 30s video chapters | Trust in 60s | Cinematic, no scroll | Medium | 8 |
| Or: single-screen "3 proof points" card | Same | Above-fold only | Low | 7 |

---

### S06 — Carlos Trust Tour

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Body scrolls; narration truncated |
| One primary action | ⚠️ | Siguiente exists but progress weak |
| Text readability | ❌ | Frosted blur obscures Carlos copy |
| Media per step | ❌ | Steps 1–3 text-only |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Fix truncated copy (CSS overflow) | Trust | Complete sentences | Low | 9 |
| Reduce blur on narration panel | Readability | See what Carlos says | Low | 8 |
| One image minimum per step | Engagement | Visual proof | Medium | 7 |
| Auto-advance option (15s) with tap-to-pause | Passive viewing | Works for distracted users | Medium | 6 |

---

### S08 — ADAS Topic

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Feature grid below fold |
| One primary action | ⚠️ | "Comparar" at bottom |
| Visual proof | ❌ | Dashboard photo exists but large dead space |
| Scroll cue | ❌ | No indicator that content continues |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Hero = dashboard photo full-bleed above fold | ADAS credibility | See the tech | Low | 8 |
| 3-tile summary above fold; detail on tap | No scroll needed | Quick comprehension | Medium | 7 |
| Animated scroll cue if content overflows | Completion | Discover hidden content | Low | 6 |

---

### S11 — Compare Hub

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ✅ | — |
| One primary action | ⚠️ | Gated = dead end |
| Competitor selection | ⚠️ | Unavailable options shown |

**Gated state failure:**

```
"Comparación disponible pronto"
```

Standing customer has **no instruction**. Abandon.

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Replace dead-end with "Te falta: mirá Garantía y ADAS" + 2 tap links | −abandon | Clear recovery | Low | 9 |
| Hide "Próximamente" competitors | Trust | No false promise | Low | 7 |

---

### S12 — Compare Detail

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ❌ | Must scroll to summary + CTA |
| One primary action | ⚠️ | CTA at bottom after scroll |
| Above-fold value | ⚠️ | Scorecard may be below fold in capture |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Pin scorecard (9/1/6) + "Cuota orientativa" CTA above fold | Faster close | Verdict in 5 seconds | Medium | 9 |
| Collapse rows by default; expand on tap | Less scroll | Progressive disclosure | Low | 7 |

---

### S26 — Financing Preview

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Trim + plazo + TCO + tips overflow |
| One primary action | ✅ | "Dar el siguiente paso" |
| Cognitive load | ⚠️ | Many toggles for standing user |
| Bank partner | ❌ | "BANCO" placeholder |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Default view: one trim, one plazo, one cuota number + TCO total | Affordability in 10s | Simple | Medium | 8 |
| "Personalizar" expands options | Power users | Progressive | Low | 6 |
| Real bank logo | Financing trust | Legitimate partnership | Low (ops) | 7 |

---

### S13 — Conversion Hub

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Cards clip |
| One primary action | ❌ | 4 cards + 20 nav pills |
| Focus mode | ❌ | Same chrome as exploration |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Conversion focus mode: hide nav, show 2 cards (Test drive + WhatsApp) | +conversion | Obvious close | Low | 9 |
| Enlarge primary card (test drive) 2× secondary | Visual hierarchy | Clear priority | Low | 8 |

---

### S14 — Test Drive Form

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ❌ | Longest scroll in app |
| One primary action | ⚠️ | Submit below many fields |
| Kiosk-appropriate field count | ❌ | 8+ inputs standing |

**Fields today:** Name, phone, email, day, time slot, spouse attending, children attending, child seat, route preference.

**Kiosk rule:** Maximum **3 fields** at kiosk; qualify rest via WhatsApp callback.

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Kiosk mode: name + phone + preferred day only | +30% completion | 30-second form | Medium | 10 |
| Pre-fill from discovery session | Less re-entry | Continuity | Medium | 8 |
| Sticky submit button always visible | Completion | Never hunt for CTA | Low | 8 |

---

### S15 — WhatsApp Handoff

| Check | Pass? | Issue |
|-------|----|-------|
| Fits 1080p | ⚠️ | Tight but OK |
| One primary action | ✅ | Scan QR / open WhatsApp |
| Operational readiness | ❌ | Placeholder phone number |

**Recommendations:**

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Live WhatsApp Business number | Zero dead leads | Works when scanned | Low (ops) | 10 |
| Show consultant name + "Respondemos en 15 min" | Response expectation | Confidence | Low | 8 |

---

## Global Chrome Issues

### Navigation density

**Problem:** `GlobalHeader` + `ShowroomNav` expose 15–21 pills on every screen including conversion.

**Standing customer experience:** Looks like a cockpit, not a showroom.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Exploration mode: 5 primary nav items max | Less overwhelm | Simple | Medium | 8 |
| Conversion mode: back + home only | Focus on close | Clear | Low | 9 |
| Hide screen IDs (S08 · TEMA) in production | Premium feel | Not a prototype | Low | 9 |

### Idle management

**Current:** 3 min prompt, 5 min reset to S01.

**Problem:** Customer reading compare table loses session at 5 min.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| Extend idle to 8 min on conversion screens | More completions | Less frustration | Low | 7 |
| "¿Seguís explorando?" saves progress | Resume | Don't lose work | Medium | 6 |

### Settings exposure

**Problem:** Ajustes on S01 attract — customer/child can break audio, language, contrast.

| Fix | BI | CI | E | PS |
|-----|----|----|---|-----|
| PIN-protect settings or hide until session start | Stable demos | No accidents | Low | 8 |

---

## 3–5 Minute Kiosk Journey (Proposed)

What a standing customer should accomplish in **4 minutes**:

```
0:00  S01 — Video loop + price (5 sec to stop)
0:05  Discovery — 5 taps (60 sec)
1:05  Personalized proof — 1 screen (family OR trust OR compare) (60 sec)
2:05  Compare verdict — scorecard above fold (45 sec)
2:50  Financing — one cuota number (30 sec)
3:20  Test drive — name + phone (30 sec)
3:50  WhatsApp QR — scan and go (10 sec)
```

**Current canonical path:** ~12–15 minutes, 6+ scroll events, 14 screens.

**Gap:** Experience is designed for **engaged seated exploration**, not **standing decision support**.

---

## Kiosk Hardware Considerations

| Factor | Recommendation |
|--------|----------------|
| Screen size | 55" minimum for 2m family viewing |
| Height | Center of touch zone at 48–52" from floor |
| Orientation | Landscape locked; disable browser chrome |
| Input | Capacitive; reject palm touches on attract |
| Audio | Headphone jack or directional speaker; default muted with opt-in |
| Environment | Anti-glare film; brightness auto-adjust for showroom lighting |

---

## Priority Matrix — Kiosk Fixes Only

| PS | Fix | E |
|----|-----|---|
| 10 | Short test drive form (3 fields) | Medium |
| 10 | Fix hero stat truncation | Low |
| 10 | Live WhatsApp number | Low |
| 9 | Remove attract/selector SVG overlays | Low |
| 9 | Compare gating recovery (not dead-end) | Low |
| 9 | Compare scorecard above fold | Medium |
| 9 | Conversion focus mode (hide nav) | Low |
| 9 | Hide screen IDs in production | Low |
| 8 | Attract video + price flash | Medium |
| 8 | PIN-protect settings on attract | Low |
| 8 | Sticky CTAs on scroll screens | Low |
| 7 | Session progress indicator | Low |
| 7 | Extend idle on conversion screens | Low |

---

## Verdict

The kiosk UX is **architecturally capable** but **behaviorally designed for a seated consultant demo**, not a standalone standing customer. Until scroll is eliminated on critical path screens, navigation is collapsed on conversion, and the form is shortened, **do not deploy without staff supervision**.

---

*Related: [CEO_SALES_STRATEGY_AUDIT.md](./CEO_SALES_STRATEGY_AUDIT.md) · [EXECUTIVE_ROADMAP_V2.md](./EXECUTIVE_ROADMAP_V2.md)*
