# Sprint A — Sales Psychology Review & Behavioral Refinement

**Date:** 14 June 2026  
**Reviewers (lenses):** Top-performing salesperson · Customer psychologist · First-time SUV buyer · Influencing spouse · Busy kiosk visitor  
**Subject:** Discovery Engine · Route Resolver · Recommendation Engine (SPRINT_A_PRODUCT_SPEC v1.0)  
**Goal:** Customer feels *"This showroom understands me"* — not *"This is collecting data about me"*  
**Output:** Refined behavioral design for **SPRINT_A_PRODUCT_SPEC v1.1** — no code  

---

## Executive diagnosis

The v1.0 discovery flow is **strategically correct** but **emotionally mislabeled**. It asks the right *categories* of questions a salesperson needs, yet presents them like a **loan application**: numbered prompts, abstract priorities, and an early budget probe that triggers financial defensiveness.

| What works | What undermines trust |
|------------|----------------------|
| Local references (Equipetrol, Doble Vía) | *"Pregunta 3 de 5"* — survey framing |
| Short tap-based flow | Q5 budget before relationship exists |
| Archetype routing logic | Q4 forces single "priority" — buyers have *fears*, not priorities |
| Carlos/Diego persona voice in recommendations | Q1 *"Ya investigué online"* — sounds like being watched |
| Compare-first bypass for researchers | No acknowledgment after answers — no mirroring |
| Family question exists | No spouse/co-decision question — critical in Bolivia |
| | *"Seguridad para mi familia"* when user said no kids — feels inattentive |

**Core fix:** Reframe discovery as a **conversation opener**, not a questionnaire. Collect the same business data through **life-context language**, add **micro-acknowledgments** after each tap, and route on **primary concern (miedo)** rather than marketing **priority (beneficio)**.

---

# Part 1 — Question-by-question challenge (v1.0)

---

## Question 1 — *"¿Cómo llegás hoy?"*

### Answer: Es mi primera SUV

| Lens | Assessment |
|------|------------|
| **Business data** | First-time buyer; high education need; skeptical segment likely; no trade-in |
| **Emotional data** | Anxiety, inexperience, fear of wrong choice, possible embarrassment |
| **Feels understood?** | Partial — label is accurate but clinical |
| **Salesperson natural?** | A pro would say: *"¿Es tu primera camioneta o ya tuviste algo similar?"* — yes, natural |
| **Better question?** | Yes — lead with emotion: *"¿Qué te trae hoy a ver el GS4 MAX?"* |

### Answer: Reemplazo de otro vehículo

| Lens | Assessment |
|------|------------|
| **Business data** | Upgrade path; may have trade-in; shorter trust arc |
| **Emotional data** | Comparison to current car; fear of downgrade; attachment to old brand |
| **Feels understood?** | Weak — *"reemplazo"* is transactional, not human |
| **Salesperson natural?** | Yes, but they'd ask: *"¿Qué manejás hoy?"* or *"¿Qué te gustaría mejorar?"* |
| **Better question?** | Merge with improvement motivation — *"¿Qué te gustaría que haga mejor que tu auto actual?"* |

### Answer: Ya investigué online / comparé precios

| Lens | Assessment |
|------|------------|
| **Business data** | Pre-researched; compare-first; shorter funnel; higher intent |
| **Emotional data** | Impatience; distrust of sales spin; wants respect for their homework |
| **Feels understood?** | **No** — sounds accusatory (*"te vimos investigando"*) |
| **Salesperson natural?** | A pro notices but says: *"¿Ya comparaste con otras opciones?"* — softer |
| **Better question?** | *"¿Ya miraste otros modelos?"* — neutral, not surveillance |

### Q1 verdict

**Keep the three segments. Change the frame and labels.**

| Issue | Fix |
|-------|-----|
| Survey tone | Replace *"Para orientarte mejor"* with *"Contame un poco — así no te repito lo que ya sabés"* |
| Accusatory researcher option | Rename to *"Ya comparé con otras SUVs"* |
| Cold replacement label | Rename to *"Quiero mejorar mi auto actual"* |
| No emotional hook | Add micro-ack after tap: *"Entendido — arrancamos por ahí."* |

---

## Question 2 — *"¿La van a usar con familia?"*

### Answer: Sí, con hijos

| Lens | Assessment |
|------|------------|
| **Business data** | Family segment; Diego path; child seat; test drive with kids |
| **Emotional data** | Protection instinct; daily chaos (school, súper); spouse may co-decide |
| **Feels understood?** | Yes — direct and relevant |
| **Salesperson natural?** | Very — *"¿Llevás chicos?"* is floor-standard |
| **Better question?** | Add co-decision dimension (see Q2 redesign) |

### Answer: Pronto — estamos esperando

| Lens | Assessment |
|------|------------|
| **Business data** | Future family; space/safety relevant; timeline signal |
| **Emotional data** | Anticipation; planning ahead; may be sensitive topic |
| **Feels understood?** | Yes — thoughtful inclusion |
| **Salesperson natural?** | Yes for engaged couples |
| **Better question?** | Keep option but shorten label: *"Pronto — viene un bebé"* |

### Answer: No, es para mí / pareja sin hijos

| Lens | Assessment |
|------|------------|
| **Business data** | Non-family routing; avoid family-safety lead |
| **Emotional data** | May still have partner influence — **"pareja" buried in option** |
| **Feels understood?** | Partial — lumps solo + couple |
| **Salesperson natural?** | Would split: *"¿Solo vos o con pareja?"* |
| **Better question?** | **Split couple vs solo** — spouse routing is missing |

### Q2 verdict

**Critical gap: no spouse/co-buyer signal.** In Santa Cruz, many kiosk sessions include a partner nearby or a deferred veto. A salesperson asks: *"¿Decidís solo o con tu pareja?"* before deep-diving.

| Issue | Fix |
|-------|-----|
| Missing joint decision | New Q2b or merged Q2: co-decision chip |
| Q4 says "familia" when Q2 = no | Dynamic Q4 labels (see Part 2) |
| No acknowledgment | After kids: *"Perfecto — la seguridad y el espacio cuentan doble."* |

---

## Question 3 — *"¿Dónde la manejarías más?"*

### Answer: Ciudad

| Lens | Assessment |
|------|------------|
| **Business data** | 4x2 trim; city fuel profile; city test drive route |
| **Emotional data** | Traffic stress; parking; heat; daily grind |
| **Feels understood?** | **Strong** — Equipetrol / Plan 3000 = *"they know my city"* |
| **Salesperson natural?** | Yes — daily use is standard qualification |
| **Better question?** | Reframe as life, not geography: *"¿Tu día a día es más ciudad o más carretera?"* |

### Answer: Doble Vía y carretera

| Lens | Assessment |
|------|------------|
| **Business data** | AWD consideration; highway consumption; road trip content |
| **Emotional data** | Family trips; Buena Vista; safety at speed |
| **Feels understood?** | Strong — local landmark language |
| **Salesperson natural?** | Yes |
| **Better question?** | Same reframe — sufficient |

### Answer: Mixto

| Lens | Assessment |
|------|------------|
| **Business data** | Default 4x2; both route preferences |
| **Emotional data** | Balanced practical buyer — most common in reality |
| **Feels understood?** | Yes |
| **Salesperson natural?** | Yes — often the actual answer |
| **Better question?** | Make *"Mixto"* the **first** chip (most relatable) |

### Q3 verdict

**Best question in the flow.** Keep structure; soften frame and order chips by frequency (mixto first).

Micro-ack examples:
- Ciudad: *"Santa Cruz ciudad — tráfico y calor, lo tenemos en cuenta."*
- Doble Vía: *"Buena Vista y Doble Vía — ahí la estabilidad importa."*

---

## Question 4 — *"¿Qué es lo más importante para vos?"*

### Answer: Seguridad para mi familia

| Lens | Assessment |
|------|------------|
| **Business data** | Safety path; ADAS; family-safety topic |
| **Emotional data** | Fear of harm — deepest emotional driver |
| **Feels understood?** | **Only if Q2 = kids** — otherwise feels scripted |
| **Salesperson natural?** | Pros ask *"¿Qué te preocupa?"* before *"¿Qué querés?"* |
| **Better question?** | **Replace with concern-based framing** (see Part 2) |

### Answer: Tecnología y equipamiento

| Lens | Assessment |
|------|------------|
| **Business data** | Tech path; ADAS; compare tecnología rows |
| **Emotional data** | Desire; fear of paying extra for basics; status |
| **Feels understood?** | Moderate — sounds like spec-sheet language |
| **Salesperson natural?** | Would say: *"¿Te importa que traiga todo de serie?"* |
| **Better question?** | *"¿Que traiga todo incluido sin pagar extra?"* |

### Answer: Precio y cuota mensual

| Lens | Assessment |
|------|------------|
| **Business data** | Budget path; financing emphasis |
| **Emotional data** | Financial anxiety; shame about budget; fear of debt |
| **Feels understood?** | Partial — honest but exposes money early |
| **Salesperson natural?** | Yes, but rarely as abstract "priority" — they'd watch body language first |
| **Better question?** | Fold into concern: *"¿Te preocupa más la cuota mensual?"* |

### Answer: Espacio

| Lens | Assessment |
|------|------------|
| **Business data** | Family-comfort; compare espacio |
| **Emotional data** | Stroller, súper, trips; practical overwhelm |
| **Feels understood?** | Yes for families |
| **Salesperson natural?** | *"¿Necesitás maletero grande?"* — more concrete |
| **Better question?** | *"¿Espacio para equipaje, compras o sillas?"* |

### Q4 verdict — **weakest question psychologically**

Buyers don't think in marketing pillars. They think in **worries**:

| Marketing priority (v1.0) | Real customer concern |
|----------------------------|-------------------------|
| Seguridad | *"¿Mis hijos van seguros?"* / *"¿Es confiable?"* |
| Tecnología | *"¿Me van a cobrar extra por todo?"* |
| Precio | *"¿Me voy a endeudar mal?"* |
| Espacio | *"¿Entra todo lo que llevamos?"* |

**Missing concern entirely:** *"¿Puedo confiar en una marca china?"* — the #1 Bolivia objection, currently only inferred from Q1. It should be **explicit and routable**.

| Issue | Fix |
|-------|-----|
| Benefit language vs fear language | Reframe Q4 as *"¿Qué es lo que más te preocupa hoy?"* |
| Missing trust/brand option | Add: *"Que sea confiable a largo plazo (marca, repuestos, taller)"* |
| Dynamic labels | If no kids, never show *"para mi familia"* in safety chip |
| Routes skeptical segment poorly | Brand-trust concern → FAQ first, not generic safety |

---

## Question 5 — *"¿Tenés una cuota mensual en mente?"*

### All budget answers

| Lens | Assessment |
|------|------------|
| **Business data** | Trim/plazo defaults; lead scoring; consultant prep |
| **Emotional data** | **Defensiveness, shame, suspicion** — *"they want to size me up"* |
| **Feels understood?** | **No** — feels like bank pre-qualification at a kiosk |
| **Salesperson natural?** | A pro **never** asks budget in the first 60 seconds standing. They show value first, then: *"¿Querés ver un rango de cuota orientativo?"* |
| **Better question?** | **Remove from discovery.** Defer to financing screen with consent gate |

### Skip: Prefiero no decir

| Lens | Assessment |
|------|------------|
| **Emotional data** | Relief — but labels user as non-cooperative in CRM |
| **Feels understood?** | Skip option helps; framing doesn't |
| **Better approach** | Don't ask — offer later: *"¿Te muestro números orientativos?"* Yes/No |

### Q5 verdict — **remove from discovery flow**

| Issue | Fix |
|-------|-----|
| Too early for money talk | Move to S26 entry: consent micro-prompt |
| Damages "sin presión" promise | Discovery ends at 4 questions for most users |
| Same data collected better | Financing screen with optional entrada — user opts in when ready |

**Exception:** If user selected *"cuota mensual"* as primary concern in Q4, S26 opens with: *"Vos dijiste que la cuota importa — acá van rangos orientativos, sin compromiso."* — mirrors their words.

---

# Part 2 — Revised discovery flow (v1.1)

## Design principles

1. **Conversation, not form** — replace *"Pregunta X de 5"* with *"Una cosa más…"* or a soft progress line with no numbers  
2. **Mirror after every tap** — one-line acknowledgment before next question (0.8s transition)  
3. **Concerns, not benefits** — Q4 asks what **worries** them  
4. **Co-decision explicit** — capture spouse/partner influence  
5. **Budget by consent** — only at financing, never in discovery  
6. **Four questions + optional fifth** — default path is **4 taps** (~35 seconds)

---

## Revised welcome (S02)

**Before (v1.0):** *"Sin presión. En 1 minuto te muestro lo que te importa."*

**After (v1.1):**

- Headline: *"Conocé el GAC GS4 MAX a tu ritmo"*
- Subline: *"Sin presión. Cuatro preguntas rápidas — y te muestro solo lo que te sirve."*
- Primary: *"Dale, empecemos"*

**Why:** *"Cuatro"* is honest (budget removed). *"Solo lo que te sirve"* = respect for time.

---

## Revised Q1 — Life moment (replaces purchase context)

**Frame:** *"¿Qué te trae hoy a ver este SUV?"*

| Answer ID | Customer label | Maps to (internal) | Micro-ack |
|-----------|----------------|-------------------|-----------|
| `moment_first` | Es mi primera SUV — quiero acertar | `purchase_context: first_suv` | *"Primera SUV — vamos sin apuro y con claridad."* |
| `moment_upgrade` | Quiero algo mejor que lo que manejo hoy | `purchase_context: replacement` | *"Bien — veamos qué ganás con el GS4 MAX."* |
| `moment_compare` | Ya comparé otras opciones | `purchase_context: researched` | *"Perfecto — no te repito lo básico."* |

**Skippable:** No

---

## Revised Q2 — Who decides (NEW structure)

**Frame:** *"¿Quién va a usar el auto en el día a día?"*

| Answer ID | Customer label | Maps to | Micro-ack |
|-----------|----------------|---------|-----------|
| `users_family_kids` | Mi familia — con hijos | `family: yes` | *"Con chicos — espacio y seguridad primero."* |
| `users_family_future` | Mi familia — pronto llega un bebé | `family: soon` | *"Qué bueno planificar con tiempo."* |
| `users_couple` | Mi pareja y yo | `family: no`, `co_decision: partner` | *"Los dos — te ayudo a tener info para decidir juntos."* |
| `users_solo` | Principalmente yo | `family: no`, `co_decision: solo` | *"Entendido — vamos directo a lo que te importa."* |

**Skippable:** No

**New session fields:**
- `coDecision: solo | partner | family_group`
- `spouseInfluence: low | high` — `partner` or `family_group` → `high`

**Routing impact:**
- `co_decision: partner` → surface **family share** earlier as secondary; recommend test drive copy *"traé a tu pareja"*; WhatsApp message includes *"para compartir en casa"*

---

## Revised Q3 — Daily life (unchanged logic, warmer frame)

**Frame:** *"¿Cómo sería un día típico con el auto?"*

| Answer ID | Customer label (order) | Maps to |
|-----------|------------------------|---------|
| `use_mixed` | **Mixto** — ciudad y algún viaje | `primary_use: mixed` |
| `use_city` | Casi todo en ciudad | `primary_use: city` |
| `use_doble_via` | Mucha Doble Vía o carretera | `primary_use: doble_via` |

**Micro-acks:** (same as v1.0 review, local Santa Cruz language)

**Skippable:** No

---

## Revised Q4 — Primary concern (replaces priority)

**Frame:** *"¿Qué es lo que más te preocupa al elegir?"*

**Dynamic chip set** — rules:

| Condition | Chips shown |
|-----------|-------------|
| `family: yes/soon` | Seguridad de los chicos · Espacio (maletero, sillas) · Cuota mensual · Que sea confiable (marca, taller) · Equipamiento completo sin extra |
| `co_decision: partner` | + *"Que mi pareja también quede tranquilo/a"* (maps to `concern: joint_confidence`) |
| `family: no`, solo | Seguridad en la ruta · Cuota mensual · Que sea confiable · Equipamiento completo |
| `moment_compare` | Hide *"equipamiento"* first — show *"Si realmente conviene vs lo que miré"* → `concern: validation` |

| Answer ID | Customer label | Maps to | Primary route bias |
|-----------|----------------|---------|-------------------|
| `concern_trust` | Que sea confiable (marca, repuestos, taller) | `concern: trust` + skeptical | FAQ → trust compressed |
| `concern_safety` | Seguridad de los chicos / en la ruta | `concern: safety` | family-safety or ADAS |
| `concern_space` | Espacio — maletero, sillas, viajes | `concern: space` | family-comfort |
| `concern_payment` | La cuota mensual y el costo total | `concern: payment` | compare → finance fast |
| `concern_validation` | Si conviene vs lo que ya comparé | `concern: validation` | compare-first |
| `concern_joint` | Que mi pareja quede tranquilo/a | `concern: joint_confidence` | family proof + share path |
| `concern_equipment` | Que traiga todo de serie | `concern: technology` | ADAS → compare tech |

**Skippable:** No

**Note:** `concern` replaces `priority` in archetype logic. Old `priority` maps 1:1 for engineering migration.

---

## Revised Q5 — REMOVED from discovery

**Budget collection moves to S26 entry gate:**

**Frame (at financing, not discovery):**  
*"¿Querés ver rangos de cuota orientativos? Es referencial — tu consultor confirma después."*

| Answer | Behavior |
|--------|----------|
| Sí, mostrame | Expand financing calculator; optional budget chips appear **here** |
| Todavía no | Show single line: *"Cuando quieras, está acá."* → recommend test drive instead |

**If `concern: payment`:** Auto-expand financing; skip consent gate.

---

## Revised completion beat

**Before:** *"Perfecto — te muestro lo que importa para vos."*

**After (mirrors their concern in second person):**

| Primary concern | Completion headline | Completion subline |
|-----------------|---------------------|-------------------|
| `trust` | *"Tu duda de confianza es la más común."* | *"Empezamos por respuestas directas — sin vueltas de vendedor."* |
| `safety` | *"La seguridad de tu familia va primero."* | *"Te muestro cómo protege el GS4 MAX en calle real."* |
| `space` | *"El espacio importa cuando hay vida de verdad."* | *"Mirá maletero, asientos y uso diario."* |
| `payment` | *"La cuota tiene que cerrar — lo entendemos."* | *"Compará valor y veamos números orientativos."* |
| `validation` | *"Ya hiciste tarea — respetamos eso."* | *"Comparación honesta, lado a lado."* |
| `joint_confidence` | *"Decidir en pareja es normal."* | *"Te doy info clara para compartir en casa."* |
| `technology` | *"Que traiga todo de serie — sin sorpresas."* | *"Te muestro qué incluye el full equipo."* |

**Auto-advance:** 4 seconds (was 3) — user needs a beat to feel seen  
**CTA:** *"Ver el GS4 MAX"* (not *"Ver vehículo"*)

---

## Revised archetype assignment (v1.1)

**Change:** Route on **`concern` first**, then life context — not waterfall on purchase context alone.

| Priority | Condition | Archetype |
|----------|-----------|-----------|
| 1 | `concern: validation` OR `moment_compare` | Compare-first researcher |
| 2 | `concern: trust` OR (`moment_first` + no compare) | Skeptical / trust-led |
| 3 | `concern: joint_confidence` OR (`family: yes/soon` + `co_decision: partner/family`) | Family-first (joint decision) |
| 4 | `concern: safety` OR `concern: space` with kids | Family-first |
| 5 | `concern: payment` | Budget-first |
| 6 | `concern: technology` | Technology-first |
| 7 | `moment_upgrade` | Upgrade buyer |
| 8 | `concern: safety` without kids | Safety-first |
| Default | — | Skeptical |

**Emotional routing overlay (new layer — applies on top of path):**

| Emotional state | Detection | Route modifier |
|-----------------|-----------|----------------|
| **High anxiety** | `concern: trust` + `moment_first` | Insert Carlos one-liner on hero; shorten to FAQ → compare; skip trust story if dwell >60s on FAQ |
| **Partner veto risk** | `co_decision: partner` or `concern: joint_confidence` | After compare, offer *"Mandá resumen a tu pareja"* before financing; test drive copy emphasizes both attend |
| **Time pressure** | Kiosk idle <2 min to first tap after attract | Force shortest path: hero → compare → finance |
| **Defensive researcher** | `moment_compare` + fast taps (<20s discovery) | Skip hero dwell; land directly on compare hub with headline *"Comparación honesta — como pediste"* |
| **Financial shame** | `concern: payment` + skipped financing consent | Never show budget chips; lead with TCO *"costo total"* not *"cuota"*; Carlos disclaimer prominent |

---

# Part 3 — Revised recommendation copy

## Copy principles

| v1.0 pattern | v1.1 pattern |
|--------------|--------------|
| *"Te muestro…"* (directive) | *"Vos dijiste…"* / *"Por lo que contás…"* (mirror) |
| Feature-led | Concern-led |
| Persona lectures | Persona **validates** then guides |
| Same line for all | Dynamic insertion of `{concern}`, `{use}`, `{family}` |
| *"Siguiente paso recomendado"* | Never use — feels like algorithm |

## Template formula

```
[Validation of their situation] + [One clear action] + [Why it helps them]
```

Max 120 characters for `reasonLine`. Use contractions and *vos*.

---

## Screen-by-screen revised recommendations

### S22 Hero

| Archetype / concern | primaryLabel | reasonLine (v1.1) |
|---------------------|--------------|-------------------|
| `concern: trust` | Resolvamos la duda de confianza | *"Mencionaste la marca y el taller — arranquemos por ahí, sin presión."* (Carlos) |
| `concern: safety` + kids | Ver cómo protege a tu familia | *"Con chicos a bordo — mirá primero seguridad y espacio atrás."* (Diego) |
| `concern: joint_confidence` | Ver lo que tu pareja va a querer saber | *"Deciden juntos — te doy info clara para los dos."* (Diego) |
| `concern: validation` | Comparar con lo que ya miraste | *"Ya comparaste — veamos lado a lado, sin truco."* (Carlos) |
| `concern: payment` | Ver si el valor cierra | *"La cuota importa — primero veamos qué ganás por el precio."* (Sofía) |
| `moment_upgrade` | Ver qué mejorás vs tu auto hoy | *"Querés algo mejor — comparemos equipamiento y garantía."* (Carlos) |

**Avoid:** *"¿Es confiable?"* as button — sounds like the kiosk doubts the car too.  
**Use:** *"Resolvamos la duda de confianza"* — externalizes doubt to market, not product.

---

### S25 FAQ

**Entry for `concern: trust`:** Pre-open tile *"¿Por qué confiar en una marca china?"* — not accordion list.

| After FAQ view | primaryLabel | reasonLine |
|----------------|--------------|------------|
| `concern: trust` | Conocé a Viaggio en Santa Cruz | *"La marca es una cosa — quién te atiende después, otra. Mirá esto."* |
| `concern: payment` | Comparar precio y garantía | *"Mencionaste la cuota — veamos valor real vs competencia."* |
| `concern: joint` | Ver seguridad familiar | *"Para que tu pareja también vea cómo protege."* |

---

### S08 ADAS / family-safety

| Concern | primaryLabel | reasonLine |
|---------|--------------|------------|
| `safety` | Comparar seguridad con Corolla Cross | *"8 airbags y ADAS de serie — veamos cómo queda vs Toyota."* |
| `technology` | Comparar equipamiento | *"Querés todo incluido — mirá qué trae de serie el GS4."* |
| `joint` + kids | Siguiente: ¿cómo cierra en cuota? | *"Tu pareja va a preguntar precio — veamos rangos orientativos."* |

---

### S12 Compare detail

**Above-fold companion (reventa fear):**

**Before:** *"Toyota gana en reventa hoy. Ganás en equipamiento…"*

**After:** *"Es verdad: Toyota hoy gana en reventa. Muchas familias eligen GS4 por lo que **usás cada día** — equipamiento, garantía y cuota. Veamos si eso te cierra."*

| Concern | primaryLabel | reasonLine |
|---------|--------------|------------|
| `payment` | Ver rangos de cuota | *"Comparaste — ahora veamos si el pago mensual calza en tu caso."* |
| `joint` | Mandar resumen a tu pareja | *"Esto es lo que suele convencer — compartilo y venís los dos a probar."* |
| Default | Ver cuota orientativa | *"9 de 10 categorías — veamos si los números te cierran."* |

**Note:** For `concern: joint`, primary may be **share** before financing if `compare_completed` and `co_decision: partner` — still ONE primary.

---

### S26 Financing

**Entry gate (budget — moved here):**

*"¿Querés ver cuotas orientativas? Sin compromiso — tu consultor confirma con el banco."*  
→ Sí / Todavía no

| Concern | primaryLabel | reasonLine |
|---------|--------------|------------|
| `payment` | Agendar prueba de manejo | *"Los números son orientativos — manejarlo 20 minutos aclara más que cualquier pantalla."* |
| `joint` | Prueba con tu pareja | *"Que lo manejen los dos — 20 minutos, sin compromiso."* |
| `trust` still high | Primero probá, después números | *"Si la confianza es lo principal — probalo y charlamos cuota después."* |
| Default | Agendar prueba | *"La mejor forma de decidir es manejarlo en tu ruta."* |

---

### S13 Conversion

| State | primaryLabel | reasonLine |
|-------|--------------|------------|
| Default | Agendar prueba de manejo | *"Dedicás 20 minutos — y salís con más claridad que con otra hora de pantalla."* |
| `hesitation: high` | Escribinos por WhatsApp | *"Sin presión — seguimos por chat cuando te quede cómodo."* |
| `joint` + compare done | Prueba en pareja | *"Los dos manejan — así deciden con la misma experiencia."* |

---

# Part 4 — Emotional routing layer (new)

Sits **between** Route Resolver and Recommendation Engine.

## Inputs

- `DiscoveryProfile` (v1.1 fields)
- `concern` (primary)
- `coDecision` / `spouseInfluence`
- `emotionalTone` — computed: `anxious | pragmatic | confident | rushed`

## `emotionalTone` detection (no extra questions)

| Tone | Signals |
|------|---------|
| `anxious` | `concern: trust`; slow taps then fast; FAQ opened first if available |
| `pragmatic` | `concern: payment` or `validation`; discovery completed <25s |
| `confident` | `moment_compare`; skipped back navigation |
| `rushed` | Discovery <20s; idle prompt on hero <30s |

## Tone → route modifications

| Tone | Modification |
|------|--------------|
| `anxious` | Carlos voice on every reasonLine; max 7 screens; no trust tour scroll |
| `pragmatic` | Compare earlier; numbers forward; minimal story |
| `confident` | Respect expertise — fewer disclaimers; compare-first |
| `rushed` | Hide all secondary CTAs; auto-suggest test drive after compare OR whatsapp |

## Spouse-influence path (overlay)

When `spouseInfluence: high`:

1. Never use *"¿Comprás solo?"* language  
2. After S12: primary = *"Mandá esto a tu pareja"* if not yet shared  
3. Test drive labels always: *"Prueba en pareja"* not *"Agendar prueba"*  
4. WhatsApp prefill: *"Mirá lo que vimos del GS4 MAX — ¿lo probamos juntos?"*  
5. Progress stage labels: *"Confiaste"* → *"Los dos confían"* (optional copy swap)

---

# Part 5 — Lens-specific validation

## Top-performing salesperson

*"I'd ask about their worry before their budget. I'd notice the wife standing three feet back. I'd say 'marca china' before they have to. These revisions match how I actually open on the floor."*

**Adopt:** Concern-based Q4, co-decision Q2, budget at finance.  
**Watch:** Don't over-compress skeptical path — some need 90 seconds of Carlos before compare.

## Customer psychologist

*"Numbered questions activate 'evaluation apprehension.' Micro-acks increase perceived empathy. Moving money talk post-value reduces cortisol response. Joint-decision framing reduces post-purchase dissonance."*

**Adopt:** Remove question numbers; 4-second completion beat; validation headlines.  
**Watch:** `concern: joint` must not stereotype — some partners are drivers, not vetoers.

## First-time SUV buyer

*"I don't know what 'prioridad tecnología' means. I do know I'm scared it's Chinese and that I can't afford a mistake."*

**Adopt:** `concern: trust` chip; *"primera SUV — sin apuro"* ack; skeptical path in plain language.  
**Watch:** Avoid jargon (ADAS, TCO) in discovery — only in proof screens.

## Influencing spouse

*"I'm not the one at the kiosk — but I'll kill the deal if the rear seat looks small. Give me something to forward on WhatsApp."*

**Adopt:** `users_couple` chip; share CTA after compare; joint test drive language.  
**Watch:** Share must be one tap — not buried in convert hub.

## Busy standing kiosk visitor

*"Four taps, no scroll, no budget interrogation — I'll finish. Tell me what to tap next."*

**Adopt:** 4-question default; mixto first on Q3; rushed tone routing.  
**Watch:** Micro-acks add ~3 seconds total — acceptable if copy is one short line.

---

# Part 6 — v1.0 → v1.1 spec delta summary

| Element | v1.0 | v1.1 |
|---------|------|------|
| Question count | 5 | **4** (+ budget consent at S26) |
| Progress UI | *"Pregunta X de 5"* | *"Una cosa más…"* or silent progress dots |
| Q1 frame | Cómo llegás hoy | Qué te trae hoy |
| Q2 | Family only | **Who uses + co-decision** |
| Q4 | Priority (benefits) | **Concern (worries)** + trust chip |
| Q5 budget | In discovery | **Removed** — consent at S26 |
| Archetype key | `priority` waterfall | **`concern` first** + emotional overlay |
| Completion beat | Generic | **Mirrors stated concern** |
| Recommendation copy | Directive | **Reflective** (*"Vos dijiste…"*) |
| Spouse | Implicit | **`coDecision` + joint path** |
| Session fields | 11 | **+ `concern`, `coDecision`, `spouseInfluence`, `emotionalTone`** |

---

# Part 7 — Implementation note for product team

Update **SPRINT_A_PRODUCT_SPEC.md** to v1.1 with:

1. Revised §1.3 questions (this document Part 2)  
2. Revised §1.6 archetype assignment (Part 2 table)  
3. New §3.8 Emotional routing overlay (Part 4)  
4. Revised §4 recommendation tables (Part 3)  
5. New `content/shared/discovery-v1.1.json` copy pack  
6. Lead payload: replace `priority` with `concern` in consultant summary  

**Do not implement v1.0 discovery copy** — it will feel like a survey and undermine the premium positioning Viaggio has built in S02 *"sin presión"* messaging.

---

## Closing standard

After v1.1, the customer should be able to say:

> *"Preguntó lo que yo le hubiera contado al vendedor — y me llevó directo a lo que me preocupaba."*

That is the difference between **understanding** and **collecting**.

---

*Refines: SPRINT_A_PRODUCT_SPEC.md v1.0 · Does not supersede route topology or lead scoring mechanics — only discovery framing, concern routing, and customer-facing language.*
