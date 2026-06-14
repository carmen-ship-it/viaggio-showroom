# Executive Demo Review — Viaggio Digital Showroom Kiosk

**Reviewer lens:** Dealership owner (Viaggio Motors Santa Cruz) seeing the kiosk for the first time  
**Date:** 14 June 2026  
**Build:** Production server (`npm start`, `localhost:3000`)  
**Viewport:** 1920×1080 landscape kiosk  
**Language:** es-BO  
**Method:** Live click-through of canonical path + first-impression evaluation  
**Scope:** Audit only — no code changes

---

## Walkthrough Completed

```
S01 → S02 → S03 → S22 → S25 → S24 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
```

| Step | Screen | Route | Action taken |
|------|--------|-------|--------------|
| 1 | **S01** Attract Loop | `/` | Tapped **Tocá para empezar** |
| 2 | **S02** Session Welcome | `/` overlay | Selected **Primera vez con GAC** → **Empezar experiencia** |
| 3 | **S03** Vehicle Selector | `/vehicles` | Tapped **GAC GS4 MAX** card |
| 4 | **S22** Immersive Hero | `/vehicles/gs4-max/hero` | Tapped **¿Es confiable?** |
| 5 | **S25** FAQ | `/vehicles/gs4-max/trust/faq` | Opened 2 accordion items → **Historia Viaggio & GAC** |
| 6 | **S24** Trust Story | `/vehicles/gs4-max/trust/story` | Reviewed Chapter 1 (GAC global) |
| 7 | **S06** Carlos Trust Tour | `/vehicles/gs4-max/tour/trust` | Advanced through tour steps |
| 8 | **S08** ADAS Topic | `/vehicles/gs4-max/themes/safety/adas` | Scrolled feature content → **Comparar con Corolla Cross** |
| 9 | **S11** Compare Hub | `/vehicles/gs4-max/compare` | Corolla Cross pre-selected → **Ver comparación** |
| 10 | **S12** Compare Detail | `/vehicles/gs4-max/compare/corolla-cross` | Reviewed safety/technology tables |
| 11 | **S26** Financing Preview | `/vehicles/gs4-max/economics/financing` | Reviewed 36-month cuota band |
| 12 | **S13** Conversion Hub | `/vehicles/gs4-max/convert` | Reviewed session recap + action cards |
| 13 | **S14** Test Drive Form | `/vehicles/gs4-max/test-drive` | Filled **Nombre** + **Teléfono** → **Confirmar** |
| 14 | **S15** WhatsApp Handoff | `/vehicles/gs4-max/whatsapp?intent=test_drive` | Reviewed QR + message preview |

**Timing estimate:** 12–16 minutes with natural reading; 8–10 minutes if rushed.

---

## Executive Summary

As a dealership owner walking this for the first time, my overall impression is **promising and strategically sound, but not yet showroom-floor ready for a VIP or press demo without operator narration.**

The kiosk nails what matters most for GAC in Bolivia: **honest trust-building before desire**, local Santa Cruz context, and a credible path to test drive + WhatsApp handoff. The copy voice (*“sin vueltas de vendedor”*, *“Ellos ganan”* on reventa) would differentiate Viaggio from every other dealer screen in the market.

What holds the experience back from feeling like a **$50k+ digital showroom investment** is a mix of **visual gaps** (attract loop, trust video, ADAS hero, competitor thumbnails), **UX friction** (too many equal-weight choices on S22/S13, financing density on S26), and **operator artifacts** leaking to customers (FAQ *“Profundizar:”* scripts, trust-signal counter). One moment during the live test-drive submit briefly surfaced a client-side error on S15 before recovering on reload — worth hardening before a owner-facing demo.

**Overall kiosk impression score: 7.2 / 10**  
**Would I put this on the showroom floor today?** Yes, with a trained operator and demo-mode enabled. **Would I invite the GAC regional director without prep?** Not yet.

---

## Dimension Scores by Screen

Scores are 1–10 from a dealership-owner perspective. Higher = stronger impression on that dimension.

| Screen | Premium | Trust | Realism | Visual | Confusion | Sales | Family | Executive | **Overall** |
|--------|---------|-------|---------|--------|-----------|-------|--------|-----------|-------------|
| **S01** Attract Loop | 7 | 5 | 4 | 5 | 6 | 6 | 5 | 6 | **6** |
| **S02** Welcome | 8 | 7 | 6 | 7 | 7 | 7 | 8 | 7 | **7** |
| **S03** Vehicle Selector | 7 | 7 | 7 | 7 | 6 | 7 | 7 | 7 | **7** |
| **S22** Immersive Hero | 9 | 6 | 8 | 9 | 5 | 7 | 8 | 8 | **8** |
| **S25** FAQ | 8 | 9 | 8 | 8 | 6 | 8 | 7 | 8 | **8** |
| **S24** Trust Story | 7 | 8 | 6 | 6 | 7 | 7 | 6 | 7 | **7** |
| **S06** Trust Tour | 8 | 9 | 8 | 8 | 6 | 8 | 7 | 8 | **8** |
| **S08** ADAS Topic | 6 | 8 | 6 | 5 | 7 | 7 | 7 | 6 | **6** |
| **S11** Compare Hub | 7 | 8 | 7 | 7 | 6 | 8 | 6 | 7 | **7** |
| **S12** Compare Detail | 7 | 9 | 8 | 7 | 6 | 9 | 6 | 8 | **8** |
| **S26** Financing | 6 | 8 | 7 | 6 | 5 | 8 | 8 | 6 | **7** |
| **S13** Conversion Hub | 7 | 7 | 7 | 7 | 6 | 8 | 8 | 7 | **7** |
| **S14** Test Drive | 7 | 8 | 8 | 7 | 7 | 9 | 9 | 8 | **8** |
| **S15** WhatsApp Handoff | 7 | 7 | 7 | 6 | 7 | 8 | 7 | 7 | **7** |

### Dimension highlights

| Dimension | Strongest screens | Weakest screens |
|-----------|-------------------|-----------------|
| **Premium feel** | S22, S02, S25 | S01, S08, S26 |
| **Trust** | S25, S06, S12 | S01, S22 (stat animation), S08 |
| **Realism** | S22, S06, S14 | S01, S24, S08 |
| **Visual quality** | S22, S06, S25 | S01, S08, S24 |
| **Low confusion** | S14, S02, S03 | S22, S26, S11 (when gated) |
| **Sales effectiveness** | S12, S14, S13 | S01, S22, S08 |
| **Family friendliness** | S14, S02, S13 | S12, S11, S24 |
| **Executive perception** | S22, S25, S12 | S08, S26, S01 |

---

## Screen-by-Screen Owner Notes

### S01 — Attract Loop · **6/10**

**First 5 seconds:** Dark, cinematic, unhurried. Feels expensive in typography and restraint — but I do not see the car. As an owner, I worry a walk-in thinks the screen is off or loading.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Strong dark palette; weak payoff without vehicle motion |
| Trust | Neutral — no claims yet |
| Realism | No photography/video on loop; reads as “coming soon” |
| Visual quality | Clean type; empty visual field |
| Confusion | Tap target is clear (*Tocá para empezar*) but no visual hint of SUV silhouette |
| Sales | Low-pressure invite works for Santa Cruz culture |
| Family | Neutral |
| Executive | Elegant but underwhelming as a “wow” first beat |

---

### S02 — Session Welcome · **7/10**

**First 5 seconds:** Immediately understand this is Viaggio × GAC GS4 MAX. *“Sin presión”* copy builds confidence. Path cards are clear.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Gold accent, glass cards, confident headline |
| Trust | Persona framing (*Carlos, Sofía, Diego*) signals guided expertise |
| Realism | Carlos avatar is real; **Sofía and Diego avatars are missing** — placeholder circles with overlapping label text looks unfinished |
| Visual quality | Typography executive-grade; avatar row hurts polish |
| Confusion | Two paths without consequence labels — accidental tap on *Ya investigué online* derails trust arc |
| Sales | Good low-pressure framing before any product shot |
| Family | Tagline explicitly mentions family |
| Executive | Would pass copy review; would fail visual QA on persona row |

---

### S03 — Vehicle Selector · **7/10**

**First 5 seconds:** Understand I should pick GS4 MAX. Stats strip (177 HP, 8 airbags, $us 42.900, garantía) is exactly what I want on a kiosk.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Split layout feels intentional |
| Trust | Price and warranty visible early — good |
| Realism | GS4 hero image loaded slowly on first paint (black card moment); coming-soon models reuse similar imagery |
| Visual quality | Layout polished; **Próximamente** sidebar dilutes hero moment |
| Confusion | *Explorar experiencia →* is subtle vs. buttons elsewhere |
| Sales | *Disponible ahora* badge helps urgency |
| Family | Tagline carries family message |
| Executive | Acceptable if GS4 is the only live model; sidebar noise should be reduced for stakeholder demos |

---

### S22 — Immersive Hero · **8/10**

**First 5 seconds:** Best screen on the journey. Full-bleed GS4 photography, hotspot markers, stat strip — this is the reveal I expected at S01.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Ken Burns hero + glass stat strip = luxury digital showroom |
| Trust | Hotspots and *¿Es confiable?* support trust-first strategy |
| Realism | Real exterior photography; stats animate **from zero** on load — briefly shows values like **9 HP**, **0 airbags**, **$us 2** which would alarm a real shopper |
| Visual quality | Highest on path; only 3 of 4 key stats shown (garantía dropped from strip) |
| Confusion | **Four equal footer CTAs** — no visual “start here” for first-time GAC visitors; demo assumes *¿Es confiable?* |
| Sales | Desire trigger present but buried in long tagline |
| Family | *Espacio familiar* hotspot supports family narrative |
| Executive | Strong enough to show GAC regional — fix stat animation before that meeting |

---

### S25 — FAQ / Objections · **8/10**

**First 5 seconds:** Carlos portrait + *“sin vueltas de vendedor”* — I trust this more than a salesperson brochure.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Editorial layout, calm pacing |
| Trust | **Best trust screen** — addresses China-brand, service, reventa, garantía honestly |
| Realism | Carlos photo real; warranty visual still text-led |
| Visual quality | Accordion UX polished |
| Confusion | Answers are long for kiosk distance; **“Profundizar:”** lines are clearly **operator scripts** shown to customers |
| Sales | Directly handles objections that kill GAC deals in Bolivia |
| Family | Indirect (reventa, garantía matter to families) |
| Executive | Copy is board-ready; remove operator scripts before executive walkthrough |

---

### S24 — Trust Story · **7/10**

**First 5 seconds:** Understand global GAC + local Viaggio story. Stats (3ª gen, 5★ C-NCAP, 8 airbags) land.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Dark editorial — premium in type, not in motion |
| Trust | Strong Bolivia/Grupo Roda positioning; real address now populated |
| Realism | **No trust videos** — chapters are text + stat cards, not cinematic proof |
| Visual quality | Text-heavy; Chapter 2 requires scroll discovery |
| Confusion | *Ver ubicación en mapa* exits kiosk to Google Maps without return prompt |
| Sales | Reinforces “not an experiment” narrative |
| Family | Low emotional pull |
| Executive | Message right; production value needs video chapters |

---

### S06 — Carlos Trust Tour · **8/10**

**First 5 seconds:** Carlos guiding step-by-step feels like having my best mechanic on the floor.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Glass narration over real vehicle photography |
| Trust | **Peak credibility** — maintenance intervals, timing chain, local road context |
| Realism | Step 1 photography strong; later steps vary in visual richness |
| Visual quality | Tour chrome (progress, persona) is best-in-class for automotive kiosks |
| Confusion | Three content layers (media + narration + topic blocks) is dense; **Siguiente ×5** is a commitment |
| Sales | Educates without hard sell — builds permission for compare/financing |
| Family | Indirect |
| Executive | Would demo this screen to GAC — it proves Viaggio understands the product |

---

### S08 — ADAS Topic · **6/10**

**First 5 seconds:** I know we’re talking safety — but it feels like reading a brochure, not experiencing ADAS.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Drops vs. S06/S22 — mostly text on black |
| Trust | Carlos expert voice credible; feature list relevant to Santa Cruz traffic |
| Realism | **Dashboard / 360° imagery not prominent** despite asset on disk |
| Visual quality | Duplicate title (*Asistencias al conductor* twice); text truncation on narrow viewports |
| Confusion | Feature grid below fold — first viewport is all copy |
| Sales | *Comprobá en tu prueba de manejo* is a smart bridge to S14 |
| Family | Safety angle helps family buyers |
| Executive | Weakest “technology proof” screen — needs visual evidence |

---

### S11 — Compare Hub · **7/10**

**First 5 seconds:** When unlocked, message is clear — honest comparison with Corolla Cross.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Clean split layout |
| Trust | *“sin ocultar nada”* positioning is brave and correct |
| Realism | GS4 reference area still dark/minimal; competitor thumb placeholder |
| Visual quality | Category pills lack verdict preview on touch (hover-only) |
| Confusion | **If trust threshold not met:** dead-end *“Comparación disponible pronto”* with no checklist of what to do — frustrating on first visit |
| Sales | Pre-selecting Corolla Cross reduces friction |
| Family | Spec-focused, not lifestyle |
| Executive | Comparison framing is a competitive advantage — polish competitor imagery |

---

### S12 — Compare Detail · **8/10**

**First 5 seconds:** Verdict summary (9 / 1 / 6) is instantly scannable. *“Ellos ganan”* on reventa feels honest.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Table design is clean, not cheap |
| Trust | **Highest integrity moment** — admitting Toyota wins on reventa builds long-term credibility |
| Realism | Data feels researched; competitor photo still synthetic |
| Visual quality | Dense — requires scroll + row expansion |
| Confusion | Expand affordance is a small `+` without *“Ver detalle”* label; financing CTA appears late |
| Sales | Strong rational close before financing |
| Family | Spec/comparison focus — less emotional |
| Executive | This is the screen I’d show a skeptical board member |

---

### S26 — Financing Preview · **7/10**

**First 5 seconds:** I see a monthly band (Bs 1.680–1.820) — good. Then I see six more sections and wonder if I’m in a spreadsheet.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | **Light theme breaks dark cinematic arc** — feels like a different product |
| Trust | Disclaimers are legally careful (*cuota referencial*) — good for owner liability |
| Realism | Numbers feel plausible for Santa Cruz; bank partner is gradient placeholder |
| Visual quality | Information architecture is overloaded (cuota + plazo grid + TCO + education + readiness meter) |
| Confusion | Two forward labels (*Quiero que me confirmen la cuota* vs *Dar el siguiente paso*) |
| Sales | Monthly band is the right hook for family budget conversations |
| Family | TCO section speaks to household budget — valuable |
| Executive | Functionally complete; needs visual simplification to 3 blocks max |

---

### S13 — Conversion Hub · **7/10**

**First 5 seconds:** Session recap makes me feel the kiosk “remembers” my visit — strong.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Faint hero silhouette; recap chips add personalization |
| Trust | Recap reinforces journey; dealership footer now has real address/hours |
| Realism | Recap chips use shorthand requiring prior context |
| Visual quality | Only **two primary cards visible** (test drive + WhatsApp) — financing/share may be trust-gated |
| Confusion | Five competing actions if all cards visible; no single *“Recomendado”* badge on test drive |
| Sales | Right options at right moment |
| Family | Test drive card mentions family welcome + Doble Vía — excellent local touch |
| Executive | Good conversion architecture; needs recommended-path hierarchy |

---

### S14 — Test Drive Form · **8/10**

**First 5 seconds:** Looks like more fields than necessary — but only name + phone are required. Family toggles feel thoughtful.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Light form theme consistent with S26, not hero screens |
| Trust | *“Un consultor te confirma por WhatsApp”* sets expectation |
| Realism | Day/slot options reflect real scheduling; route choices (Ciudad / Doble Vía) local |
| Visual quality | Clean form UX; optional fields could collapse behind *“Más opciones”* |
| Confusion | Form **looks** heavy before you realize most fields are optional |
| Sales | **Best conversion screen** — low friction to lead capture |
| Family | *Hijos — pueden subir atrás*, child-seat thinking — standout |
| Executive | Production-ready lead capture |

---

### S15 — WhatsApp Handoff · **7/10**

**First 5 seconds:** Dual QR concept is smart. Message preview proves context travels to the phone.

| Dimension | Observation |
|-----------|-------------|
| Premium feel | Functional, not celebratory — no “you’re almost an owner” moment |
| Trust | Consultant script personalizes handoff; real WhatsApp number displayed |
| Realism | QR codes generate; resume token adds continuity |
| Visual quality | Dark layout works; two QR panels need numbered steps (1 → 2) |
| Confusion | Which QR first?; no explicit *“Fin del recorrido”* |
| Sales | Strong bridge from kiosk to human consultant |
| Family | Neutral |
| Executive | Complete handoff UX; **brief client error observed immediately after S14 submit** (recovered on reload) — must be zero-failure at demo end |

---

## Emotional Arc (Owner Read)

```
Curiosity → Relief → Interest → Confidence → Validation → Action
 S01        S02       S22/S03    S25/S24/S06   S12/S26      S14/S15
  6          7          8           8            8           7–8
```

**Peak moments:** S22 reveal, S25 honesty, S06 Carlos tour, S12 comparison integrity.  
**Valley moments:** S01 empty attract, S08 text-only ADAS, S26 density, S15 error flash.

---

## Top 10 Improvements (Ranked by Owner Impact)

| Rank | Improvement | Screens | Why it matters |
|------|-------------|---------|----------------|
| **1** | **Ship attract-loop video + hero on S01** — visitor must see the GS4 MAX in the first 3 seconds | S01 | Sets luxury tone; currently feels like a loading screen |
| **2** | **Fix hero stat strip** — show final values immediately (no count-up from 0); show all 4 stats including garantía | S22 | Brief **9 HP / 0 airbags / $us 2** destroys trust at the hero peak |
| **3** | **Remove customer-facing operator scripts** — delete *“Profundizar:”* lines from FAQ answers | S25 | Immediately signals “internal tool” not customer experience |
| **4** | **Add dashboard / 360° hero imagery to ADAS topic** | S08 | Safety is a top purchase driver; text-only undersells ADAS |
| **5** | **Establish one primary CTA on S22 for first-time visitors** — visually promote *¿Es confiable?* or *“Empezar tour de confianza”* | S22 | Four equal paths stalls unguided visitors |
| **6** | **Collapse S26 to 3 scannable blocks** (cuota → plazo → one CTA); defer TCO/education behind expand | S26 | Owner liability is clear; shopper cognitive load is too high |
| **7** | **Replace Sofía + Diego avatars + competitor compare photo + bank partner logo** | S02, S11, S12, S26 | Broken/placeholder visuals at credibility touchpoints |
| **8** | **Improve compare gate dead-end** — when locked, show checklist with deep links (FAQ → Tour → ADAS) | S11 | *“Comparación disponible pronto”* feels like a broken feature |
| **9** | **Enable `NEXT_PUBLIC_DEMO_MODE=true` on showroom build** — hide Ajustes, coming-soon models, exploration branches, screen IDs | Global | Owner demo should feel customer-facing, not developer-facing |
| **10** | **Harden S14 → S15 handoff** — zero client errors after test-drive confirm; add completion state on S15 | S14, S15 | Last impression is the one owners remember |

### Honorable mentions (11–15)

- Shorten FAQ answers to headline + optional *“Más detalle”*
- Hide trust-signal counter (*“2 señales registradas”*) from S25
- Add *“Recomendado”* badge on test drive card at S13
- Collapse S14 optional fields behind *“Más opciones”*
- Add trust-story cinematic video chapters on S24

---

## What I Would Tell My Team Monday Morning

**Keep:**
- Trust-before-desire journey architecture
- Carlos persona and honest comparison tone
- Santa Cruz local context (Doble Vía, heat, family)
- Session recap + WhatsApp context handoff
- Test drive form family affordances

**Fix before GAC regional visit:**
1. S01 vehicle reveal
2. S22 stat animation bug
3. S25 operator script leak
4. S08 visual proof of ADAS
5. Demo-mode production config

**Fix before unattended kiosk:**
1. S11 compare gate messaging
2. S26 simplification
3. S15 handoff reliability
4. All placeholder avatars/logos/photos
5. S22 single recommended path for unguided visitors

---

## Demo Operator Reminders

1. Run **`NEXT_PUBLIC_DEMO_MODE=true`** on the kiosk build.
2. On S02, always choose **Primera vez con GAC**.
3. On S22, tap **¿Es confiable?** — not family or design paths.
4. On S25, open **≥2 FAQ items** before continuing (unlocks compare if ADAS skipped).
5. On S06, advance all **5 steps** before ADAS/compare.
6. On S12, scroll to summary for financing CTA.
7. Narrate through placeholder media until video/asset drop is complete.
8. Full scripted path: **12–16 minutes** with narration.

---

## Related Documents

- [`docs/demo-walkthrough.md`](docs/demo-walkthrough.md) — canonical click script
- [`KIOSK_POLISH_REPORT.md`](KIOSK_POLISH_REPORT.md) — UX friction inventory
- [`DEMO_READINESS_REPORT.md`](DEMO_READINESS_REPORT.md) — asset and engineering readiness
- [`demo-review/SCREENSHOT_REVIEW.md`](demo-review/SCREENSHOT_REVIEW.md) — visual capture reference

---

*Audit completed without modifying application code.*
