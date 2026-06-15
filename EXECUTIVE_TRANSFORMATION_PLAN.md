# Executive Transformation Plan — Viaggio Digital Showroom

**Date:** 14 June 2026  
**Mission:** Transform the showroom from an interactive brochure into a digital salesperson  
**Source of truth:** CEO_SALES_STRATEGY_AUDIT.md · KIOSK_UX_AUDIT.md · MEDIA_ASSET_AUDIT.md · EXECUTIVE_ROADMAP_V2.md  
**Method:** Gap analysis between audit recommendations and current codebase — no implementation yet  

---

## Transformation Thesis

**Today:** The system delivers excellent *content* (Carlos FAQ, honest compare, financing disclaimers) through a *brochure-shaped* journey — fixed 14-screen arc, passive reading, internal trust tracking invisible to the customer.

**Target:** A digital salesperson that qualifies in 60 seconds, shows only relevant proof, surfaces one next action per screen, and delivers a standing customer to test drive or WhatsApp in under 5 minutes.

**North-star question:**

> *"Could this replace an average salesperson for the first 5 minutes of the buying journey?"*

**Current answer: No.**  
**After Phase 1 (code-only): Partially — for supervised kiosk with demo mode.**  
**After Phase 1 + media sprint: Yes — for first-touch qualification and test drive capture.**

---

## Part 1 — Current Implementation Findings

### What exists and works (structural assets)

| Capability | Implementation | Sales value |
|------------|----------------|-------------|
| Canonical demo path | `demo-mode.ts`, `demo-routes.ts`, `middleware.ts` | Scripted stakeholder walkthrough |
| Session state | `SessionProvider.tsx` — path, trust signals, topics, compare, financing, test drive draft | Consultant recap foundation |
| Trust gating | Compare ≥2 signals or ADAS; convert ≥4 signals | Progressive unlock (internal only) |
| Objection content | `faq.json`, Carlos persona, trust tour | Floor-ready copy |
| Honest comparison | `compare/corolla-cross.json`, S11/S12 screens | Strongest rational close |
| Financing preview | `financing.json`, S26 with trim/plazo/TCO bands | Affordability framing |
| Conversion tail | S13 recap, S14 form, S15 WhatsApp + QR + resume token | End-to-end funnel exists |
| Lead capture | `POST /api/leads` | Backend hook present |
| Demo kiosk polish | Hide nav, screen IDs, settings, coming-soon; primary CTA pulse | Reduces prototype feel in demo |
| Compare gate recovery | S11 links to FAQ when locked | Partial dead-end fix |

### What exists but underperforms (experience gaps)

| Capability | Gap | Customer impact |
|------------|-----|-----------------|
| Path personalization | Binary `first_time` / `pre_researched` only; pre-researched forced off in demo | Same lecture for every buyer |
| Next-step guidance | `TouchNav` back/next on some screens; no dynamic recommendation | Customer chooses from menu |
| Compare S12 layout | Scorecard in header ✅; full table + honest summary require scroll | Verdict visible; proof hidden |
| Test drive S14 | 9 input groups (name, phone, email, day, time, spouse, children, child seat, route) | High abandon standing at kiosk |
| Attract S01 / Selector S03 | `FallbackArtwork` overlay at 35–40% on loaded photos | Car looks unfinished |
| Trust arc length | 6 screens before compare on canonical path | 12–15 min vs 3–5 min budget |
| WhatsApp S15 | Placeholder `+591712345678` in `dealership.json` | Broken handoff if deployed |
| Media layer | 6/41 manifest assets on disk; 0 video | Credibility gap on every screen |

### What does not exist (transformation blockers)

| Missing system | Audit reference | Blocks transformation because |
|----------------|-----------------|-------------------------------|
| Guided discovery quiz | Roadmap #1 | No qualification → no personalization |
| Buyer profile / discovery session | CEO audit §A | Cannot route family vs trust vs compare paths |
| Recommendation engine | CEO audit Q3 | Trust signals tracked but never shown to customer |
| Personalized route selection | Roadmap #17 | Fixed arc regardless of buyer type |
| Digital salesperson CTA | Kiosk audit | Multiple equal CTAs per screen |
| One-screen decision layouts | Kiosk audit | Scroll = invisible content |
| Kiosk-short test drive form | Roadmap #5 | Conversion endpoint too heavy |
| Conversion focus mode (production) | Roadmap #8 | Only approximated in demo via `hideExploration` |
| Session progress indicator | Roadmap #18 | No funnel orientation |
| 4x2 vs AWD trim compare | Roadmap #11 | Trim confusion unresolved |
| Editable TCO calculator | Roadmap #12 | Affordability objection partial |
| Social proof S23 | Roadmap #16 | No peer trust transfer |
| Staff dashboard S35 | Roadmap #19 | Consultants blind until WhatsApp sent |

---

## Part 2 — Recommendation Status Matrix

Legend: ✅ Complete · ⚠️ Partial · ❌ Missing · 🔧 Ops/Media (not code)

| # | Recommendation | Status | Evidence |
|---|----------------|--------|----------|
| 1 | 60-second guided discovery | ❌ | No discovery types, UI, or routing in codebase |
| 2 | Live WhatsApp + consultant SLA | 🔧 Ops | `dealership.json` placeholder; S15 UI ready |
| 3a | Remove wireframe overlays | ❌ | `AttractLoop.tsx` L56–61, `VehicleSelector.tsx` L95 always render overlay |
| 3b | Attract loop video | ❌ | `video-attract-loop` not wired; 0 MP4 on disk |
| 4a | Corolla Cross licensed photo | 🔧 Media | `compare-corolla-cross` missing from disk |
| 4b | Compare verdict above fold | ⚠️ | Scorecard in S12 header ✅; summary narrative + table below fold |
| 5 | Short test drive form (3 fields) | ❌ | Full form only in `TestDriveForm.tsx` |
| 6 | Brand logos | 🔧 Media | `LogoPlaceholder.tsx` inline SVG; no files in `public/assets/brand/` |
| 7 | Compare gating dead-end fix | ⚠️ | FAQ link added; missing ADAS link + progress copy |
| 8 | Conversion focus mode | ⚠️ | Demo `hideExploration` limits S13 cards; no production `conversionFocus` flag |
| 9 | Viaggio workshop video | 🔧 Media | Wired in S24; file missing |
| 10 | Hero stat truncation + hide screen IDs | ⚠️ | `HeroStatStrip` kiosk static fix ✅; `formatScreenLabel` hides IDs in demo only |
| 11 | 4x2 vs AWD trim comparison | ❌ | Not in compare hub |
| 12 | Editable TCO mini-calculator | ❌ | Fixed defaults in `financing.json` / S26 |
| 13 | Persona avatars Sofía/Diego + tour copy fix | ⚠️ | Carlos ✅; others placeholder; tour truncation unverified |
| 14 | Family proof pack | 🔧 Media | Diego topics mostly placeholder images |
| 15 | GAC heritage video | 🔧 Media | S24 chapter 1 placeholder |
| 16 | Social proof testimonials S23 | ❌ | No route or screen |
| 17 | Pre-researched compare-first path | ⚠️ | Route exists (`ExperienceEntry.tsx` L65–67); disabled in demo |
| 18 | Session progress indicator | ❌ | Tour has step progress only |
| 19 | Staff dashboard S35 | ❌ | Not built |
| 20 | ADAS visual proof | ⚠️ | Dashboard image ✅; no feature UI/video |

### Summary counts (Top 20)

| Status | Count |
|--------|------:|
| ✅ Complete | 0 |
| ⚠️ Partial | 8 |
| ❌ Missing (code) | 7 |
| 🔧 Ops/Media | 5 |

**Interpretation:** Zero audit recommendations are fully complete. Demo mode addressed ~30% of kiosk UX pain (nav, IDs, settings, conversion card count) but **none of the core salesperson behaviors** (discovery, recommendation, personalized routing, short conversion).

---

## Part 3 — Screen-by-Screen Salesperson Audit

For each screen: decision, fear, salesperson line, best next action, usability scores.

**Scoring:** ✅ Good · ⚠️ Needs work · ❌ Fails kiosk/mobile standing user

---

### S01 — Attract Loop

| Lens | Assessment |
|------|------------|
| **Decision** | *"Should I stop and explore this?"* |
| **Fear** | *"Is this just an ad screen? Will someone pressure me?"* |
| **Salesperson would say** | *"Mirá — GAC GS4 MAX, desde $us 42.900, sin compromiso. Tocá cuando quieras."* |
| **Best next action** | Tap anywhere → welcome |
| Scroll | ✅ Fits 1080p |
| CTA clarity | ✅ Single tap target |
| Mobile | ⚠️ Overlay mutes photo |
| Kiosk | ❌ Wireframe overlay; no price; no motion |
| Family buyer | ❌ No family signal |
| Compare / finance / test drive | N/A |

**Gap:** Brochure intro, not sales hook. Overlay code actively degrades existing photography.

---

### S02 — Session Welcome

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is this safe to explore without a salesperson hovering?"* |
| **Fear** | Sales pressure; wasting time |
| **Salesperson would say** | *"Contame un poco — ¿primera SUV? ¿Con familia? — y te muestro lo que te importa."* |
| **Best next action** | Start discovery → personalized path |
| Scroll | ✅ |
| CTA clarity | ⚠️ Path choice + Empezar = 2 decisions |
| Mobile | ✅ |
| Kiosk | ⚠️ Persona avatars incomplete |
| Family buyer | ❌ No family question yet |
| Compare / finance / test drive | N/A |

**Gap:** "Sin presión" copy is excellent; discovery questions missing entirely.

---

### S03 — Vehicle Selector

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is this the car I came to see?"* |
| **Fear** | Wrong model; empty card = broken |
| **Salesperson would say** | *"Hoy te muestro el GS4 MAX — el que más eligen familias en Santa Cruz."* |
| **Best next action** | Tap GS4 MAX → hero (skip if single-SKU kiosk) |
| Scroll | ✅ |
| CTA clarity | ✅ Single hero card in demo |
| Mobile | ⚠️ Overlay |
| Kiosk | ⚠️ Overlay; selector redundant for single-SKU |
| Family buyer | ⚠️ Stats visible; no family hook |
| Compare / finance / test drive | N/A |

**Gap:** Single-SKU kiosk should auto-advance to hero after discovery.

---

### S22 — Immersive Hero

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is this the SUV I saw outside? What does it offer?"* |
| **Fear** | Unknown Chinese brand; wrong vehicle |
| **Salesperson would say** | *"Este es el full equipo — 8 airbags, garantía 5 años. ¿Tu duda es confianza, familia o precio?"* |
| **Best next action** | Dynamic: trust → FAQ / family → Diego path / price → compare |
| Scroll | ✅ Mostly |
| CTA clarity | ❌ 5+ CTAs in full mode; demo forces one |
| Mobile | ⚠️ Hot-spots hidden on small screens |
| Kiosk | ⚠️ Best visual screen; CTA overload in full mode |
| Family buyer | ⚠️ Hot-spots exist but disabled in demo |
| Compare / finance / test drive | ⚠️ Gated; not recommended |

**Gap:** Hero is product theater, not qualification router.

---

### S25 — Objections & FAQ

| Lens | Assessment |
|------|------------|
| **Decision** | *"Can I trust a Chinese brand and Viaggio after the sale?"* |
| **Fear** | Brand failure; no parts; warranty fraud; poor resale |
| **Salesperson would say** | *"La duda #1 es marca china — dejame mostrarte C-NCAP, Viaggio en Santa Cruz y la garantía real."* |
| **Best next action** | Objection-specific answer → trust story OR compare (if ready) |
| Scroll | ⚠️ Open accordions overflow |
| CTA clarity | ⚠️ Read vs "Siguiente" compete |
| Mobile | ✅ Readable |
| Kiosk | ⚠️ Passive accordion; long reads standing |
| Family buyer | ⚠️ Post-sale FAQ relevant |
| Compare / finance / test drive | ⚠️ Compare link when unlocked |

**Gap:** Strongest content screen; needs objection routing (*"¿Cuál es tu duda?"*) not passive FAQ list.

---

### S24 — Trust Story

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is GAC/Viaggio a real long-term partner?"* |
| **Fear** | Fly-by-night importer |
| **Salesperson would say** | *"Mirá nuestro taller — mismo Grupo Roda, repuestos originales, 4 sucursales."* |
| **Best next action** | 60s proof → Carlos tour |
| Scroll | ❌ Multi-chapter snap scroll |
| CTA clarity | ⚠️ Scroll is implicit action |
| Mobile | ⚠️ Text-heavy |
| Kiosk | ❌ Brochure reading wall |
| Family buyer | ⚠️ Indirect |
| Compare / finance / test drive | N/A |

**Gap:** Should be 2 proof points above fold or video — not scroll chapters.

---

### S06 — Carlos Trust Tour

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is this vehicle engineered to last?"* |
| **Fear** | Turbo/DCT failure; hidden defects |
| **Salesperson would say** | *"Cadena de distribución, mantenimiento a los 10.000 km sin costo — te lo muestro en 3 minutos."* |
| **Best next action** | Siguiente → ADAS (skip text-only steps for kiosk) |
| Scroll | ⚠️ Body scrolls; truncated copy reported |
| CTA clarity | ⚠️ Progress bar exists; next not always obvious |
| Mobile | ⚠️ |
| Kiosk | ⚠️ Steps 1–3 text-only (no media in topic JSON) |
| Family buyer | ⚠️ |
| Compare / finance / test drive | N/A |

**Gap:** 5-step tour too long for kiosk; should compress to 3 proof steps with media.

---

### S08 — ADAS / Safety Topic

| Lens | Assessment |
|------|------------|
| **Decision** | *"Will my family be safe? Is the tech real?"* |
| **Fear** | Cheap electronics; spouse skepticism |
| **Salesperson would say** | *"8 airbags, cámara 360° — mirá el tablero, no es feria."* |
| **Best next action** | Compare (unlocks compare gate) |
| Scroll | ⚠️ Feature grid below fold |
| CTA clarity | ⚠️ Compare at bottom via TouchNav |
| Mobile | ⚠️ Dead space |
| Kiosk | ⚠️ Words without feature visuals |
| Family buyer | ✅ Core screen — under-delivered visually |
| Compare | ✅ Unlocks compare |
| Finance / test drive | N/A |

**Gap:** Family/trust buyers need this earlier if discovery signals safety priority.

---

### S11 — Compare Hub

| Lens | Assessment |
|------|------------|
| **Decision** | *"Is GS4 MAX better than what I'm cross-shopping?"* |
| **Fear** | Biased comparison; wrong competitor |
| **Salesperson would say** | *"¿Con qué lo comparás hoy — Corolla Cross? Mirá lado a lado, sin truco."* |
| **Best next action** | Select competitor → detail |
| Scroll | ✅ |
| CTA clarity | ✅ When unlocked; ❌ when gated (partial recovery) |
| Mobile | ✅ |
| Kiosk | ⚠️ Gated state improved but incomplete |
| Family buyer | ⚠️ |
| Compare flow | ⚠️ Only Corolla live; Tucson/Tiggo shown as coming soon (hidden in demo) |
| Finance / test drive | N/A |

**Gap:** Should pre-select competitor from discovery; full recovery when gated.

---

### S12 — Compare Detail

| Lens | Assessment |
|------|------------|
| **Decision** | *"Do the wins outweigh Toyota's resale advantage?"* |
| **Fear** | Resale trap; financial mistake |
| **Salesperson would say** | *"Toyota gana en reventa hoy — nosotros en equipamiento, garantía y cuota. Mirá el score: 9 a 1."* |
| **Best next action** | Cuota orientativa (with TCO counter to reventa fear) |
| Scroll | ❌ Full table + summary below fold |
| CTA clarity | ⚠️ TouchNav at bottom |
| Mobile | ⚠️ Table horizontal squeeze |
| Kiosk | ⚠️ Scorecard above fold ✅; narrative requires scroll |
| Family buyer | ⚠️ Espacio rows help |
| Compare flow | ✅ Strongest rational asset |
| Finance | ⚠️ Next step exists; reventa fear unaddressed inline |
| Test drive | N/A |

**Gap:** Pin honest summary + financing CTA above fold; collapse table rows by default.

---

### S26 — Financing Preview

| Lens | Assessment |
|------|------------|
| **Decision** | *"Can my family afford this monthly?"* |
| **Fear** | Hidden costs; fake rate; debt trap |
| **Salesperson would say** | *"Cuota orientativa Bs 1.680–1.820 a 36 meses — más combustible y seguro. ¿Con qué entrada pensás?"* |
| **Best next action** | Dar el siguiente paso → test drive |
| Scroll | ⚠️ Trim + plazo + TCO overflow |
| CTA clarity | ✅ Primary exists |
| Mobile | ⚠️ Many toggles |
| Kiosk | ⚠️ Cognitive load high standing |
| Family buyer | ⚠️ TCO mentions family budget |
| Compare | N/A |
| Finance flow | ⚠️ Good disclaimers; no entrada input |
| Test drive | ⚠️ Weak — goes to convert hub not direct test drive |

**Gap:** Default one-screen affordability view; editable km/entrada; direct test drive CTA.

---

### S13 — Conversion Hub

| Lens | Assessment |
|------|------------|
| **Decision** | *"What do I do now — test drive, WhatsApp, or leave?"* |
| **Fear** | Committing too early; wrong choice among options |
| **Salesperson would say** | *"Lo ideal: probalo 20 minutos con tu familia. Si preferís, seguimos por WhatsApp."* |
| **Best next action** | Test drive (primary) |
| Scroll | ⚠️ Cards may clip |
| CTA clarity | ⚠️ 2 cards demo ✅; 4 in full mode |
| Mobile | ✅ |
| Kiosk | ⚠️ Demo improved; production still heavy |
| Family buyer | ⚠️ Share card hidden in demo |
| Compare / finance | ✅ Recap chips excellent |
| Test drive | ✅ Primary card highlighted in demo |

**Gap:** Production conversion focus mode; direct recommendation not recap + choose.

---

### S14 — Test Drive Form

| Lens | Assessment |
|------|------------|
| **Decision** | *"Am I ready to commit time to a test drive?"* |
| **Fear** | Spam; long process; giving too much info |
| **Salesperson would say** | *"Dejame tu nombre y WhatsApp — coordinamos el día que te venga bien."* |
| **Best next action** | Submit → WhatsApp confirm |
| Scroll | ❌ Long form |
| CTA clarity | ⚠️ Submit below fields |
| Mobile | ⚠️ Usable but long |
| Kiosk | ❌ Worst screen for standing user |
| Family buyer | ✅ Rich qualification — too late and too long |
| Compare / finance | ✅ Pre-filled in session for API |
| Test drive conversion | ❌ ~50% abandon est. |

**Gap:** Kiosk variant 3 fields; move family questions to discovery + WhatsApp follow-up.

---

### S15 — WhatsApp Handoff

| Lens | Assessment |
|------|------------|
| **Decision** | *"Can I leave and continue without repeating everything?"* |
| **Fear** | Dead number; no human response |
| **Salesperson would say** | *"Escaneá — te llega un mensaje con lo que vimos. Te respondo en 15 minutos."* |
| **Best next action** | Scan QR / open WhatsApp |
| Scroll | ⚠️ Tight |
| CTA clarity | ✅ |
| Mobile | ✅ QR works |
| Kiosk | ⚠️ Phone handoff natural |
| Family buyer | ✅ Context includes family topics |
| Compare / finance | ✅ In message |
| Test drive | ✅ Intent routing |

**Gap:** Operational — live number, consultant name, SLA copy.

---

## Part 4 — Buyer Journey Gap Analysis

### Trust-focused buyer journey

| Stage | Current | Target | Gap |
|-------|---------|--------|-----|
| Entry | Fixed trust arc | Discovery flags "trust priority" → FAQ + 2 proof screens | ❌ No routing |
| Proof | 6 screens | 3 screens max | ❌ Too long |
| Validation | Compare after gate | Compare when trust threshold OR discovery says cross-shopping | ⚠️ Gate logic exists; not discovery-driven |
| Close | Convert hub | Test drive with trust recap | ⚠️ |

### Family buyer journey

| Stage | Current | Target | Gap |
|-------|---------|--------|-----|
| Entry | Same as all | Discovery "children=yes" → Diego 3-min path | ❌ |
| Proof | Diego topics (placeholder media) | ISOFIX + maletero + school run | 🔧 Media + ❌ routing |
| Validation | Generic compare | Compare espacio + seguridad rows highlighted | ⚠️ Content exists |
| Close | Family fields on S14 | Pre-filled; family share earlier | ⚠️ |

### Affordability buyer journey

| Stage | Current | Target | Gap |
|-------|---------|--------|-----|
| Entry | Same trust arc | Discovery "price priority" → financing sooner | ❌ |
| Proof | S26 after full arc | S26 after compare or skip trust if pre-researched | ❌ |
| Validation | Static TCO | Editable entrada + km | ❌ |
| Close | Financing → convert | Financing → test drive direct | ⚠️ |

---

## Part 5 — Highest-Value Phase 1 (No New Media / No Ops)

These can ship from **code + content JSON only** — no photography, video, logos, or live WhatsApp required.

| Priority | Initiative | Why Phase 1 | Effort |
|----------|------------|-------------|--------|
| P0 | **Guided discovery module** (5 questions → `DiscoveryProfile` in session) | Unlocks all personalization | Medium |
| P0 | **Recommendation engine** (`getNextStep(profile, session)`) | Single CTA per screen | Medium |
| P0 | **Personalized route map** (trust / family / affordability / compare-first) | Replaces fixed 14-screen arc | Medium |
| P0 | **Remove SVG overlays** when media resolves | Uses existing hero photos | Low |
| P0 | **Kiosk test drive form** (name + phone + day) | Biggest conversion lift, code only | Low–Medium |
| P1 | **Compare gating full recovery** (FAQ + ADAS links + "te falta X") | Eliminates dead end | Low |
| P1 | **S12 one-screen mode** (collapsed rows + summary + CTA above fold) | Decision without scroll | Medium |
| P1 | **S26 one-screen default** (one trim, one plazo, one number + TCO total) | Affordability in 10s | Low–Medium |
| P1 | **Conversion focus mode** (production flag, not demo-only) | Close without paralysis | Low |
| P1 | **Session progress strip** ("Paso 3 de 5 → Prueba") | Orientation | Low |
| P1 | **Enable pre-researched path** + compare-first routing | 30% of visitors | Low |
| P1 | **FAQ objection router** (5 tap tiles → one answer) | Salesperson behavior, same content | Low–Medium |
| P2 | **4x2 vs AWD compare** (JSON + hub tab) | Trim decision, no new photos | Medium |
| P2 | **TCO sliders** (km/month, entrada %) | Affordability, math only | Medium |
| P2 | **Discovery → test drive pre-fill** | Continuity | Low |
| P2 | **Reventa counter-narrative** inline on S12 after "Ellos ganan" | Fear handling, copy only | Low |
| P2 | **Auto-skip S03** when single vehicle + discovery complete | −1 screen | Low |
| P2 | **Compress trust tour** to 3 steps for kiosk profile | −2 screens for trust path | Medium |

**Deferred until media/ops:** Attract video, logos, Corolla photo, workshop video, persona photos, live WhatsApp, testimonials.

---

## Part 6 — Recommended Implementation Order

### Wave 1 — Salesperson brain (Week 1–2)

1. Discovery profile schema + welcome quiz UI  
2. Route resolver (`resolveBuyerPath(profile)`)  
3. Recommendation engine + `RecommendedNextStep` component  
4. Wire dynamic CTA on S22, S25, S11, S12, S26, S13  

**Outcome:** Customer asked questions; journey adapts; one obvious next step.

### Wave 2 — Kiosk conversion (Week 2–3)

5. Remove attract/selector overlays  
6. Kiosk test drive form variant  
7. Compare gating recovery (complete)  
8. S12 one-screen compare mode  
9. S26 one-screen financing default  
10. Conversion focus mode (production)  

**Outcome:** Standing customer can decide and convert without scroll.

### Wave 3 — Journey compression (Week 3–4)

11. Session progress indicator  
12. Pre-researched / compare-first path  
13. FAQ objection router  
14. Trust tour kiosk compression (3 steps)  
15. Auto-skip vehicle selector  

**Outcome:** 4–5 minute path to test drive for each buyer type.

### Wave 4 — Decision depth (Week 4–5)

16. 4x2 vs AWD internal compare  
17. TCO sliders  
18. Reventa TCO counter on compare  
19. Discovery pre-fill on test drive + WhatsApp message  

**Outcome:** Affordability and trim objections handled in software.

### Parallel track (ops/media — not blocking Wave 1–2)

- Live WhatsApp number  
- Brand logos + Corolla photo  
- Attract video  
- Workshop + heritage video  

---

## Part 7 — Business Impact Summary

| Transformation area | Current state | Post Phase 1 (code) | Post media sprint |
|--------------------|---------------|---------------------|-------------------|
| Time to first CTA | 12+ min | ~5 min | ~4 min |
| Test drive form completion | ~50% est. | ~75% est. | ~80% |
| Compare abandon (gated) | Medium-high | Low | Low |
| Lead qualification | Consultant asks | Discovery in session recap | Same + richer |
| Replace avg salesperson (5 min) | No | Partially | Yes |
| Unsupervised kiosk ready | No | Supervised OK | Yes |

---

## Part 8 — Investment Decision

**Spend next on:** Wave 1 + Wave 2 (salesperson brain + kiosk conversion) — approximately 3 weeks development, zero asset budget.

**Do not spend next on:** Configurator, trade-in, GS8 content, staff dashboard — lower ROI until discovery + short conversion path live.

**The moat is not more screens.** It is: *ask → route → prove → decide → act* in under 5 minutes.

---

*Next document: [PHASE1_IMPLEMENTATION_BACKLOG.md](./PHASE1_IMPLEMENTATION_BACKLOG.md)*
