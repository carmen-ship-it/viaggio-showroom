# Owner Review — Executive Demo Screenshots

**Reviewed:** 14 June 2026  
**Scope:** Customer experience visible in `demo-review/` executive screenshots (S01, S03, S22, S24, S06, S08, S12, S26, S13, S15)  
**Method:** Four stakeholder personas; no code review  
**Companion:** [SCREENSHOT_REVIEW.md](./SCREENSHOT_REVIEW.md)

---

## 1. Dealership Owner (Viaggio)

### First impression
This feels like a serious investment — dark, cinematic, and clearly branded as *Viaggio Motors Santa Cruz*, not a generic GAC microsite. The guided Carlos tour and honest Toyota comparison signal that we are trying to sell with credibility, not hype. The attract screen (S01) is elegant but empty; I would walk past it twice before realizing a car is inside.

### What increases trust
- **Viaggio + GAC co-branding** on every screen — customers know who they are buying from.
- **Carlos as “Mecánico Maestro”** — positions us as technical experts, not order-takers.
- **Honest comparison** (S12) admitting Toyota wins on reventa — rare in Bolivian retail and exactly the tone I want on the floor.
- **Financing disclaimers** (S26) — *cuota referencial*, consultant confirms — protects the business legally.
- **WhatsApp handoff** (S15) — smart bridge from kiosk to human follow-up with session context.

### What feels unfinished
- **S01 attract loop** — no vehicle, no motion, no reason to stop walking.
- **S03 selector** — GS4 MAX card shows a large empty black area where the hero photo should dominate; coming-soon models share identical placeholder imagery.
- **S24 trust story** — text-only chapter; no cinematic video or brand footage visible.
- **S08 ADAS** — large dead space; reads like a slide deck, not a showroom moment.
- **S26 bank partner** — blurred gradient card instead of a real allied-bank logo.
- **S13 conversion hub** — faint vehicle silhouette; action cards cut off at bottom of capture.
- **Internal screen labels** — `S08 · TEMA`, `S13`, `S15`, `S26` visible in chrome — feels like a prototype, not a customer product.

### What would make them hesitate
- **Navigation density** on S13, S15, S26 — three rows of pills (20+ choices) before the customer sees the main message. Looks powerful to me; looks confusing to a shopper.
- **Placeholder WhatsApp number** — if a customer scans and gets a dead line, we lose the lead and look amateur.
- **“Ajustes” (Settings)** on the attract screen — a customer might tap it and break the demo flow.
- **Truncated Carlos copy** on S06 (*“…sin forzar el…”*) — suggests content is broken, not curated.

### What they would ask next
- “Can we hide the screen IDs and developer chrome before I show this to GAC regional?”
- “What does the attract loop look like with real video on a 55″ screen in the showroom?”
- “Is the WhatsApp number live, and who answers within 5 minutes during business hours?”
- “What is the cost to finish photography for GS4 MAX and drop the duplicate coming-soon images?”
- “Can we simplify the header so my sales team does not need a script to explain 21 buttons?”

---

## 2. Sales Manager

### First impression
Strong sales architecture: attract → select → hero → trust → tour → objection topics → compare → finance → convert → WhatsApp. The funnel is there. My concern is **cognitive load** — by S13 the customer has seen more navigation than vehicle.

### What increases trust
- **Session recap** on S13 — *“Exploraste el GS4 MAX”* — gives consultants a natural re-entry: *“Vi que miraste seguridad…”*
- **Compare table with verdict pills** (Empate / Ellos ganan) — pre-handles reventa and Toyota objections before I walk over.
- **Financing preview with trim toggle** (4x2 / AWD) and plazo chips — realistic prep for desk conversation.
- **Multiple conversion paths** — financing, test drive, WhatsApp, share — matches how families actually decide (often not alone).
- **Guided tours by persona** (Carlos, Sofía, Diego) — lets floor staff route by customer type.

### What feels unfinished
- **S06 tour step 1** — no visible *Siguiente* / progress affordance beyond “Paso 1 de 5”; truncated body copy.
- **S08** — duplicate headline (*Asistencias al conductor* twice); no visual proof (dashboard, 360° camera UI).
- **S12 capture** — scrolled to footer; in a live walk I need thumbnails and Sofía callout above the fold (noted in capture index).
- **S13** — bottom action cards partially clipped; cannot confirm full labels (*Financiamiento*, *Prueba*, etc.) from screenshot.
- **GlobalHeader on conversion screens** — same full nav as mid-funnel; no “focus mode” for closing.

### What would make them hesitate
- **Too many equal-weight CTAs** — *Agendar prueba*, *Prueba familiar*, *Compartir en familia*, *Próximo paso*, three tour types, five theme buttons — customer paralysis; consultant may lose the thread.
- **Placeholder competitor imagery** (S12) — if Toyota thumb looks synthetic next to our real GS4 shot, comparison feels uneven.
- **No visible consultant availability** — WhatsApp promises a human; no hours, name, or SLA on screen.
- **Settings exposed on S01** — risk of language/kiosk misconfiguration mid-demo.

### What they would ask next
- “Can we default to a **5-button header** on conversion screens and tuck the rest behind *Explorar más*?”
- “What is the **handoff payload** in the WhatsApp prefilled message — trim, topics viewed, compare competitor?”
- “Do we get a **lead alert** when someone scans QR, or only when they send the message?”
- “Can Carlos tour auto-advance or require tap — and what happens if they skip step 3?”
- “Is there a **sales playbook** mapping each screen to talk track?” (referencing `docs/demo-walkthrough.md`)

---

## 3. Senior Sales Consultant

### First impression
This would **help me sell** if the kiosk does the heavy lifting on specs, ADAS, and Toyota comparisons before I arrive. Carlos sounds like how I actually talk in the lane — cadena de distribución, no prototipo. The hero (S22) is the screen I want families staring at while I fetch keys.

### What increases trust
- **Hotspots on S22** — Motor turbo, Seguridad ADAS, Espacio familiar — gives me anchors for a 90-second walk-around.
- **Carlos ADAS copy** (S08) — *“no gadgets de feria”*, cámara 360° en calles angostas — locally relevant, not brochure fluff.
- **Trust stats on S24** — 5★ C-NCAP, 8 airbags — easy to point at without memorizing.
- **Compare honesty** (S12) — I can say *“Toyota gana en reventa hoy”* and pivot to equipamiento/garantía without losing face.
- **Financing band Bs 1.680–1.820** — enough to qualify budget before bank visit; disclaimer keeps me safe.

### What feels unfinished
- **S01** — I cannot use it to pull someone from the street; no car, no price flash, no *“desde $us 42.900”*.
- **S03** — if the main card image is missing, I lose the *“mirá este color”* moment at selection.
- **S06 truncated text** — customer will ask what comes after *“sin forzar el…”*; looks like a bug.
- **S08** — I need a dashboard photo or ADAS animation; words alone do not convince a skeptical spouse.
- **S24** — no video chapter; I still have to narrate GAC global story myself.

### What would make them hesitate
- **Screen IDs (`S08 · TEMA`)** — customer asks *“¿Qué es S08?”* and I have no good answer.
- **Duplicate *¿Es confiable?* buttons** on S22 — minor, but feels templated.
- **WhatsApp placeholder number** — I cannot say *“escaneá y te escribo”* with confidence today.
- **No trim/color selector** visible on hero or financing — customer asks *“¿AWD en qué color?”* and path is unclear from screenshots.

### What they would ask next
- “Where do I **pick up** after WhatsApp — CRM, tablet, or my personal phone?”
- “Can the recap on S13 show **which topics** they opened (ADAS, compare, financing)?”
- “Is there a **objection shortcut** from compare → financing in one tap?”
- “What do I say when they ask why **reventa** says *liquidez en construcción*?”
- “Can we add **real Viaggio workshop / reception photo** so Carlos feels like our guy, not a chatbot?”

---

## 4. Customer Shopping for a Family SUV

### First impression
*“Conocé el GAC GS4 MAX a tu ritmo”* — low pressure, I like that. Once inside, the car photo on S22 looks modern and the *“listo para Santa Cruz”* line feels local. But the first screen is just black text — I might not know it is a car kiosk unless someone tells me.

### What increases trust
- **Family-first language** — *“El SUV que tu familia merece”*, *Espacio familiar*, *Seguridad familiar*, *Para tu familia*.
- **8 airbags and 5★ C-NCAP** called out clearly — safety matters for kids.
- **Carlos explains maintenance** (10.000 km, cadena) — sounds practical, not salesy.
- **Honest Toyota comparison** — they admit Corolla Cross is strong on brand/reventa; makes the rest feel more believable.
- **Financing disclaimer** — not promising a fake rate; *“tu consultor confirma”* feels responsible.
- **WhatsApp with context** — I can leave, pick up kids, and not repeat everything to a salesperson.

### What feels unfinished
- **S01** — no picture of the SUV; I am not sure what I am starting.
- **S03** — big empty area on the main card; feels like something did not load.
- **S08** — lots of blank space; I expected to see the backup camera or lane-assist graphic.
- **S06** — story cuts off mid-sentence.
- **Coming-soon models** (GS8, EMZOOM, EMKOO) all look like the same silver SUV — confusing if I think they are different cars.
- **Bank logo** on financing — blurry placeholder; I want to know which bank.

### What would make them hesitate
- **Too many buttons at the top** (S13, S15, S26) — *“Prueba familiar”* vs *“Agendar prueba”* vs *“Tour Familiar”* — which one do I tap?
- **Reventa: “Ellos ganan”** — makes me worry about resale even if they were honest.
- **Price spread on financing** (Bs 1.680–1.820) — wide band; is that with entrega or without?
- **Settings button** on welcome screen — I might tap it by mistake with a kid.
- **No visible stock/color** — is the white one on screen actually on the lot?

### What they would ask next
- “**¿Cuánto sale** en efectivo o con entrega — full equipo 4x2 vs AWD?”
- “**¿Hay unidad para probar** esta semana en Santa Cruz?”
- “**¿Qué incluye la garantía** 5 años / 150.000 km — motor, turbo, electrónica?”
- “**¿Consumo real** en tráfico de Equipetrol / Plan 3000?” (compare table helps but city row is still ranges)
- “If I scan WhatsApp, **¿quién me responde** y en cuánto tiempo?”
- “**¿Viene con ISOFIX**, espacio para 3 sillas, y maletero para cochecito?” (Espacio familiar hotspot teases but screenshot does not show answer)

---

## Cross-Persona Themes

| Theme | Owner | Sales Mgr | Consultant | Customer |
|-------|-------|-----------|------------|----------|
| Trust tone & honest compare | ✅ Strong | ✅ Strong | ✅ Strong | ✅ Strong |
| Hero / product photography | ⚠️ S22 yes; S01/S03 gaps | ⚠️ | ⚠️ | ⚠️ |
| Navigation complexity | ⚠️ Power vs clutter | ❌ Paralysis risk | ⚠️ | ❌ Confusing |
| Commercial placeholders | ❌ Blockers for live | ❌ | ❌ | ❌ |
| Carlos / expert narrative | ✅ | ✅ | ✅ | ✅ |
| Conversion / WhatsApp | ✅ Concept | ✅ Needs ops | ⚠️ Needs number | ✅ If it works |

---

## Priority Rankings

### P0 — Must fix before owner demo

| # | Issue | Screens | Why |
|---|-------|---------|-----|
| 1 | **Replace placeholder WhatsApp number** with live Viaggio line | S15 | Owner demo fail if QR leads nowhere; legal/reputation risk |
| 2 | **Hide or remove internal screen IDs** (`S08 · TEMA`, `S13`, `S15`, `S26`, etc.) from customer-facing chrome | S08, S13, S15, S26 | Immediately reads as unfinished product to GAC regional / owner peers |
| 3 | **Fix GS4 MAX hero imagery on vehicle selector** — eliminate empty black hero area | S03 | First product screen after attract; missing image kills “digital showroom” story |
| 4 | **Fix truncated Carlos tour copy** (complete sentence + readable overflow) | S06 | Visible content bug undermines expert narrative |
| 5 | **Attract loop must show vehicle or motion** — still frame is not enough for showroom floor | S01 | Owner demo opens here; black screen undermines investment narrative |
| 6 | **Lock or hide “Ajustes” on customer/kiosk mode** | S01 (+ others) | Prevents accidental misconfiguration during executive walk-through |

### P1 — Should fix before customer pilot

| # | Issue | Screens | Why |
|---|-------|---------|-----|
| 7 | **Reduce GlobalHeader to focused nav on conversion/finance screens** (collapse guided tours / theme rows) | S13, S15, S26 | Customer paralysis; consultant loses control of funnel |
| 8 | **Replace bank partner placeholder** with authorized ally logo + name | S26 | Financing credibility for family buyers |
| 9 | **Add ADAS visual** (dashboard, 360°, or lifestyle) | S08 | Safety topic needs proof, not text-only |
| 10 | **Trust story cinematic chapter** — video or high-quality poster frame | S24 | Brand-global story is key objection handler |
| 11 | **Distinct coming-soon model imagery** (or generic silhouette per segment) | S03 | Duplicate silver SUV implies lazy catalog |
| 12 | **Competitor thumbnail** — real Corolla Cross asset | S12 | Honest compare loses punch if rival image is synthetic |
| 13 | **Tour navigation affordance** — clear Siguiente / progress; verify all 5 steps | S06 | Pilot users will abandon if stuck on step 1 |
| 14 | **Conversion hub hero + full action card labels** visible without scroll | S13 | Closing screen must show all next steps at a glance |
| 15 | **Clarify CTA differentiation** — *Prueba familiar* vs *Agendar prueba* vs *Tour Familiar* | S13, header | Reduces family shopper confusion |
| 16 | **Verify hero stat strip legibility** (177 HP, 8 airbags, $us 42.900) at kiosk viewing distance | S22 | Core facts must read from 1–2 m on touch display |
| 17 | **WhatsApp ops**: named consultant, business hours, prefilled message preview visible in screenshot path | S15 | Customer trust depends on human response promise |

### P2 — Future improvements

| # | Issue | Screens | Why |
|---|-------|---------|-----|
| 18 | **Attract loop ambient video** (hero reel, not static) | S01 | Elevates premium feel post-pilot |
| 19 | **Session recap chips** showing topics explored (ADAS, compare, financing) | S13 | Helps consultant personalize handoff |
| 20 | **Trim / color selector** tied to financing and hero | S22, S26 | Common family SUV questions |
| 21 | **Real Carlos / Sofía / Diego photography** (Viaggio staff or licensed talent) | S06, S08, S12 | Deepens local trust beyond avatar initial |
| 22 | **Compare screen above-fold capture** — Sofía callout + vehicle thumbs in default viewport | S12 | Better first glance in marketing materials |
| 23 | **Reventa narrative helper** — what Viaggio does to protect resale (certification, trade-in program) | S12 | Turn honest “Ellos ganan” into actionable next step |
| 24 | **Family-specific proof** — ISOFIX, boot dimensions, third-row if applicable | S22 hotspots | Closes family SUV research loop |
| 25 | **Lead telemetry** — scan/send events to sales dashboard | S15 | Manager visibility for pilot ROI |
| 26 | **Remove duplicate UI labels** (*Asistencias al conductor* twice; duplicate *¿Es confiable?*) | S08, S22 | Polish pass |
| 27 | **Spanish copy pass** for kiosk distance (contrast, type size on stat pills) | All | Accessibility on bright showroom floor |

---

## Recommended Owner Demo Sequence (with known gaps narrated)

1. **S22** — Open on immersive hero (*product reveal*); narrate hotspots live.  
2. **S06** — Carlos tour step 1 (*technical trust*); skip ahead if copy truncation not yet fixed.  
3. **S12** — Honest compare (*differentiation*); acknowledge synthetic competitor thumb if asked.  
4. **S26** — Financing preview (*commercial seriousness*); emphasize referencial disclaimer.  
5. **S15** — WhatsApp handoff (*Viaggio human follow-up*); **do not scan QR until number is live**.

Avoid starting on **S01** until attract media lands; avoid **S08** as a standalone wow moment until ADAS visuals arrive.

---

## Sign-Off Checklist (Owner Demo Gate)

- [ ] P0 items 1–6 resolved or explicitly demo-scripted around  
- [ ] WhatsApp tested end-to-end on physical kiosk with sales phone  
- [ ] 55″ display walk-through at 1.5 m viewing distance  
- [ ] Sales manager sign-off on header simplification plan (P1 #7)  
- [ ] GAC regional narrative aligned on S24/S06 media timeline  

---

*Generated from executive screenshot review. Regenerate captures after fixes: see [SCREENSHOT_REVIEW.md](./SCREENSHOT_REVIEW.md).*
