# Phase X — Conversational Sales Brain

**Codename:** CSI Platform (Conversational Sales Intelligence)  
**Version:** 1.0  
**Date:** 14 June 2026  
**Builds on:** SPRINT_A_PRODUCT_SPEC v1.2 · ADAPTIVE_SALES_INTELLIGENCE v1.0  
**Mission:** Transform the showroom from a **screen-based guided journey** into a **conversational AI salesperson** that listens, reasons, proves, and closes — then hands off to humans with superhuman context.

---

## Executive Summary

Sprint A v1.2 + ASI built a **Level 6–7 digital salesperson**: structured discovery, behavioral inference, objection prediction, and path compression on **fixed screens**.

**Phase X** replaces the screen as the unit of sales with the **conversation turn** as the unit of sales. Screens become **proof surfaces** the AI invokes when needed — not a path the customer walks.

```
Today:     Customer navigates PATH_G → screen 1 → screen 2 → …
Phase X:   Customer talks → AI reasons → AI shows one proof OR asks one question → repeat until close
```

The **Conversational Sales Brain (CSB)** is the unified architecture. Its customer-facing layer is **CSI (Conversational Sales Intelligence)**. Its operational layer inherits and extends **ASI + BIL** on every utterance, tap, and pause.

---

# 1. Architecture Overview

## 1.1 Layer stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    EXPERIENCE CHANNELS                                   │
│   Voice (kiosk mic) · Text (chat overlay) · Touch (legacy screens)       │
│   WhatsApp (async) · Consultant co-pilot tablet                          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────┐
│              CONVERSATIONAL SALES INTELLIGENCE (CSI)                       │
│   Dialog orchestration · Dynamic questioning · NLU · Persona voice       │
│   Turn management · Multimodal fusion (said + tapped + dwelled)            │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ every turn
┌───────────────────────────────────▼─────────────────────────────────────┐
│              REAL-TIME REASONING LAYER (RTR)                             │
│   Fuse conversation + behavior → full cognitive state snapshot            │
│   Emit: nextBestAction · nextBestProof · closeDecision · escalate?       │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ ASI (extended)│         │ DYNAMIC PROOF   │         │ CLOSING         │
│ ESE·OPE·BSM   │         │ ENGINE (DPE)    │         │ INTELLIGENCE    │
│ DRM·APC       │         │ Proof graph     │         │ (CI)            │
└───────┬───────┘         └────────┬────────┘         └────────┬────────┘
        │                          │                           │
        └──────────────────────────┼───────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│              BIL (Behavioral Intelligence) — inherited                   │
│              uncertaintyScore · confidenceLevel · salespersonMode        │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────┐
│              KNOWLEDGE & PROOF LIBRARY                                     │
│   Vehicle truth · Objection scripts · Compare data · Media assets          │
│   Vertical templates (automotive, RE, insurance…)                          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────┐
│              PERSISTENT CUSTOMER MEMORY (PCM)                              │
│   Profile · Objections history · Sessions · Preferences · Consent          │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────┐
│              CONSULTANT COPILOT + CRM / WhatsApp / Analytics               │
└─────────────────────────────────────────────────────────────────────────┘
```

## 1.2 Core design principles

| Principle | Implication |
|-----------|-------------|
| **Conversation-first** | Default UX is talk-or-type; screens appear when proof is needed |
| **One move per turn** | One question OR one proof OR one close ask — never both |
| **Inherited intelligence** | ASI/BIL scores are inputs to RTR, not replaced |
| **Grounded truth** | AI only states facts from Knowledge Library — no hallucinated specs |
| **Human escalation is a win** | Consultant handoff at the right moment beats forced conversion |
| **Memory is consent-based** | PCM stores PII only with explicit opt-in |
| **Vertical-agnostic core** | CSB engine is industry-neutral; Knowledge Library is vertical-specific |

## 1.3 Interaction modes

| Mode | Channel | Phase X role |
|------|---------|--------------|
| **Kiosk voice** | Showroom mic + speaker | Primary Phase X demo |
| **Kiosk hybrid** | Voice + touch proof cards | Legacy screens as DPE surfaces |
| **Text chat** | On-screen chat bubble | Quiet environments, accessibility |
| **WhatsApp async** | Post-visit continuation | PCM resume + CSI text |
| **Consultant co-pilot** | Staff tablet | Real-time CSB state + scripts |

---

# 2. Conversational Sales Intelligence (CSI)

## 2.1 Purpose

CSI is the **dialogue layer** — the voice and personality customers experience. It replaces fixed 4-question discovery with **adaptive conversation** that feels like a top Santa Cruz salesperson.

## 2.2 Capabilities

### Natural language conversations

- Bolivian Spanish (es-BO) primary; code-switch tolerance for technical terms  
- Persona voices: **Carlos** (trust), **Diego** (family), **Sofía** (value), **Host** (neutral)  
- Short sentences; kiosk-optimized (≤15 words per spoken line when possible)  
- Prosody: calmer for REASSURER; brisk for VALIDATOR  

### Voice and text support

| Input | Processing |
|-------|------------|
| Voice | STT → utterance text + confidence + emotion features (pace, pause) |
| Text | Direct to NLU |
| Touch | Maps to structured events (`proof_viewed`, `compare_row:reventa`) |
| Silence >5s | RTR treats as hesitation signal |

**Output:** TTS for voice mode; typed bubble for text mode; optional screen invoke via DPE.

### Dynamic questioning (replaces fixed discovery)

**No mandatory 4-question sequence.** CSI maintains a **Discovery Checklist** — slots to fill, not questions to ask in order.

| Slot | Example inference source |
|------|-------------------------|
| `purchase_context` | *"Es mi primera camioneta"* / inferred from *"nunca tuve SUV"* |
| `family` | *"Vamos con los chicos"* / *"solo mi esposa y yo"* |
| `primary_use` | *"Mucho tráfico en Equipetrol"* → city |
| `concern` | *"Me da miedo que sea chino"* → trust |
| `co_decision` | *"Tengo que convencer a mi esposa"* → partner |
| `competitor_context` | *"Miré el Corolla Cross"* → corolla-cross |
| `timeline` | *"Necesito algo este mes"* → urgency HIGH |

**Question selection rule:** Ask the **highest-information slot** not yet filled — only if confidence in inference <0.7.

**Max one question per turn.** Never interrogate.

### Infer discovery from conversation

**NLU intent + slot extraction** on every customer utterance:

```
Customer: "Vine con mi esposa, queremos algo seguro para los niños pero no sabemos si confiar en GAC"

Inferred slots (single turn):
  family: yes
  co_decision: partner
  concern: safety (primary), trust (secondary)
  emotionalState: family-protective + skeptical
  latentObjections: [china_brand: 0.65, spouse: 0.55]
```

CSI updates `CustomerProfile` immediately — no separate discovery screen required.

### Continuous profile updates

Profile mutates on:

- Every customer utterance (NLU)  
- Every proof engagement (behavior)  
- Consultant notes (co-pilot input)  
- WhatsApp return messages (PCM)  

**Versioned snapshots** stored per turn for analytics and dispute resolution on claims made.

## 2.3 CSI dialog policies

| Policy | Rule |
|--------|------|
| **Listen ratio** | Customer words ≥ 40% of session audio time by minute 3 |
| **Mirror before move** | Every response opens with 1-line acknowledgment of what they said |
| **No survey language** | Ban: *"Pregunta 2 de 4"* |
| **Permission to not know** | *"No hay problema si aún no tenés claro el presupuesto"* |
| **Honesty mandate** | Must acknowledge Toyota reventa if compare discussed |
| **Grounding** | Spec claims must cite `knowledgeRef` from library |

## 2.4 CSI opening scripts (examples)

**Kiosk attract → voice activate:**

> *"Hola — soy el asistente de Viaggio. Podés preguntarme lo que quieras del GS4 MAX, o contarme qué estás buscando. Sin presión."*

**After first customer utterance (mirror):**

> Customer: *"¿Es confiable? Es chino."*  
> CSI: *"Es la pregunta que más escuchamos — y está bien preguntarla. ¿Querés que te muestre cómo responde Viaggio en Santa Cruz, o preferís comparar con algo que ya miraste?"*

---

# 3. Real-Time Reasoning Layer (RTR)

## 3.1 Purpose

On **every interaction** (utterance, tap, dwell tick, idle), RTR produces a **Reasoning Snapshot** — the single source of truth for what the system believes about the customer **right now**.

## 3.2 Reasoning Snapshot schema

```yaml
reasoningSnapshot:
  turnId: string
  timestamp: ISO8601

  # Cognitive state (required outputs)
  emotionalState: { primary, secondary, confidence }
  confidenceLevel: HIGH | MEDIUM | LOW
  uncertaintyScore: number          # BIL
  decisionReadinessScore: number    # ASI DRM
  latentObjections: [{ id, probability, status }]
  buyingStyle: enum
  seekingMode: certainty | validation | permission | reassurance | urgency
  avoidanceTarget: string
  decisionFrame: string

  # Action outputs
  nextBestProof: { proofId, surface, rationale }
  nextBestAction: { type, label, payload }
  proofSufficiency: boolean
  closeDecision: { ready, recommendedClose, blocker }
  escalateToHuman: { recommended, reason, urgency }

  # Meta
  discoveryCompleteness: 0-1
  inferenceSources: [conversation, behavior, memory]
  salespersonMode: VALIDATOR | GUIDE | REASSURER
```

## 3.3 Reasoning loop (per turn)

```
┌──────────────────────────────────────────────────────────────┐
│ 1. INGEST                                                     │
│    utterance / touch / dwell / idle / memory recall           │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. FUSE                                                       │
│    NLU slots + BIL signals + ASI engines + PCM history          │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. UPDATE SCORES                                              │
│    uncertainty · DRM sub-scores · OPE probabilities · ESE       │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. DECIDE MOVE TYPE                                           │
│    question | proof | compare | finance | close | escalate    │
│    (Closing Intelligence + APC proofSufficiency)                │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. SELECT PROOF (DPE) or COMPOSE QUESTION (CSI)               │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. GROUND & GENERATE RESPONSE                                 │
│    Template + slots + knowledgeRef — LLM phrasing only          │
└────────────────────────────┬─────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────┐
│ 7. EMIT snapshot + actuate (voice/text/screen/consultant)     │
└──────────────────────────────────────────────────────────────┘
```

**Latency budget (kiosk):** Reasoning + response start **<2.5s** voice; **<1.5s** text.

## 3.4 Fusion rules (conversation + behavior)

| Conversation signal | Behavior signal | Fused inference |
|--------------------|-----------------|-----------------|
| *"Me preocupa la cuota"* | Financing toggles 4× | `concern: payment` locked; financial OPE 90% |
| *"Ya vi todo online"* | Fast proof exits | VALIDATOR + proofSufficiency bias |
| *"No sé"* (vague) | DISC_SLOW, FAQ dwell | Anxious + REASSURER; ask **one** clarifying Q |
| Silence after reventa proof | COMPARE_REVISIT | Resale objection unresolved → TCO proof |
| *"Tengo que hablar con mi esposa"* | spouseInfluence | seekingMode: permission; share proof |

## 3.5 nextBestAction types

| type | When | Example label |
|------|------|---------------|
| `ask` | Discovery gap; inference confidence <0.7 | *(spoken question)* |
| `show_proof` | OPE unaddressed ≥55% | *"Mirá esto"* → DPE surface |
| `compare` | informationalReadiness ≥50 | *"Comparación honesta"* |
| `finance` | financial gate met | *"Rangos orientativos"* |
| `test_drive` | closeDecision.ready | *"Agendemos 20 minutos"* |
| `share` | permission mode + compare done | *"Mandáselo a tu pareja"* |
| `whatsapp` | async preference or LOW + tired | *"Seguimos por WhatsApp"* |
| `escalate` | CI recommends human | *"Te llamo un asesor"* |

**Invariant:** Exactly **one** `nextBestAction` per turn.

---

# 4. Dynamic Proof Engine (DPE)

## 4.1 Purpose

Replace **fixed routes** (PATH_A–G) with a **proof graph** — nodes are proof units, edges are unlock conditions. RTR selects the **single best node** for the current cognitive state.

## 4.2 Proof graph concept

```
                    ┌─────────────┐
                    │ hero_visual │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │faq_china   │  │family_safe │  │adas_demo   │
    └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                 ┌────────────────┐
                 │compare_corolla │
                 └────────┬───────┘
                          ▼
                 ┌────────────────┐
                 │finance_tco    │
                 └────────┬───────┘
                          ▼
                 ┌────────────────┐
                 │test_drive      │
                 └────────────────┘
```

**Not a path** — customer may jump `hero → compare` if VALIDATOR + validation-seeking.

## 4.3 Proof node schema

```yaml
proofNode:
  id: compare_corolla
  vertical: automotive
  product: gs4-max
  type: comparison | narrative | data | social | action
  surfaces: [screen:S12, voice:30s_summary, card:scorecard]
  addressesObjections: [validation, resale, technology]
  emotionalFit: [validation-seeking, research-driven, analytical]
  readinessRequired:
    trust: 30
    informational: 20
  readinessBoost:
    informational: 25
    emotional: 10
  maxPresentations: 2      # trust-loop prevention
  durationTargetSec: 45
  knowledgeRefs: [compare/corolla-cross.json]
  persona: carlos
```

## 4.4 Proof selection algorithm (behavioral)

**Score each eligible node:**

```
proofScore(node) =
  w1 * objectionMatch(node, top latentObjection)
+ w2 * emotionalFit(node, emotionalState)
+ w3 * readinessFit(node, DRM sub-scores)
+ w4 * styleFit(node, buyingStyle)
+ w5 * novelty(node, session.proofsShown)   # penalize repeat
+ w6 * memoryFit(node, PCM.unresolved)    # boost if raised before
```

**Select highest proofScore** where all `readinessRequired` met.

**If `proofSufficiency`:** force node `test_drive` or `whatsapp` — no educational nodes.

## 4.5 Proof presentation modes

| Surface | When |
|---------|------|
| **Voice summary** | Overwhelmed; fast-decision; kiosk standing |
| **Screen invoke** | Analytical; compare tables; financing |
| **Chat card** | Text mode; share links |
| **Split** | Voice intro 10s → screen detail 30s |

## 4.6 Enough proof — DPE + APC union

`enoughProof = proofSufficiency` (ASI APC) **OR**:

| Condition | Result |
|-----------|--------|
| Top objection `status: resolved` AND decisionReadiness ≥60 | enough |
| Customer verbatim buying signal (CI) | enough |
| 3+ proof nodes presented + decisionReadiness ≥55 | enough |
| Customer said *"ok entiendo"* / *"tiene sentido"* (NLU) | enough + close bias |

When `enoughProof` → CSI must **stop educating** and execute `closeDecision`.

---

# 5. Closing Intelligence (CI)

## 5.1 Purpose

Detect **when the customer is ready to buy the next step** (test drive, human, finance) — not when the script runs out of screens.

## 5.2 Buying signal detection

| Signal type | Examples (NLU) | Behavior corroboration | Weight |
|-------------|----------------|------------------------|--------|
| **Verbal commitment** | *"Me gusta"* · *"Cuándo puedo probarlo"* · *"¿Tienen en blanco?"* | TEST_DRIVE_OPEN | +35 |
| **Ownership language** | *"Si lo compro…"* · *"Para mi familia…"* | — | +25 |
| **Logistics questions** | *"¿Cuánto demora la prueba?"* · *"¿Entrega?"* | — | +30 |
| **Financial openness** | *"¿Cuánto sería la cuota?"* (not defensive) | FINANCING_VIEW consent yes | +20 |
| **Partner alignment** | *"A mi esposa le gustó"* | SHARE_INITIATED | +25 |
| **Repeat visit** | PCM: session 2+ | — | +20 |

**buyingSignalScore** 0–100; ≥50 → `closeDecision.candidate = true`

## 5.3 Hesitation detection (extended)

| Pattern | Interpretation | CI action |
|---------|----------------|-----------|
| Long dwell + silence | Processing fear | REASSURER; one proof only |
| *"Déjame pensarlo"* | Stall | WhatsApp + PCM schedule |
| Compare ×3 without finance | Analysis paralysis | Force test drive ask |
| Financing exit <15s | Price shock | Compare value first; defer cuota |
| *"Muy caro"* | Price objection | TCO + garantía; not discount |
| Back-nav after close ask | Not ready | Step back one proof level |

## 5.4 Spouse influence detection

| Signal | Action |
|--------|--------|
| Verbal: *esposa/pareja/marido* | `spouseInfluence: high` |
| `co_decision: partner` from discovery | Permission mode |
| Compare done, no share, HIGH spouse | **Primary close = share**, not test drive |
| PCM: prior session "need to ask wife" | Open with *"¿Pudiste hablar con tu pareja?"* |

## 5.5 Close decision matrix

| Condition | Continue educating | Recommend financing | Recommend test drive | Escalate human |
|-----------|------------------|---------------------|----------------------|----------------|
| buyingSignal ≥50 + DRM emotional ≥50 | — | If payment concern | **Yes** | If asks for person |
| proofSufficiency + trust OK | — | If payment concern | **Yes** | Optional |
| LOW confidence + trust unresolved | **Yes** (1 proof) | No | No | If session >8 min |
| decision_paralysis ≥60% | No | Maybe | **Yes** or WhatsApp | **Yes** if on lot |
| buyingSignal + spouse block | Share proof | No | Joint test drive | **Yes** |
| FINANCIAL concern + defensive | Compare value | Soft offer only | No | No |
| *"Quiero hablar con alguien"* | — | — | — | **Immediate** |

## 5.6 Escalation triggers

| Trigger | Urgency | Consultant alert |
|---------|---------|------------------|
| Explicit human request | Immediate | Pager + tablet |
| `decisionReadiness ≥70` + buyingSignal ≥50 | High | *"Hot lead on kiosk 1"* |
| Session >10 min + paralysis | Medium | Walk-over suggested |
| PCM VIP / return visit 3+ | Medium | Named consultant |
| AI confidence in grounding <0.8 on spec question | Immediate | Human takeover |

---

# 6. Consultant Copilot

## 6.1 Purpose

Turn CSB state into **actionable floor intelligence** — not a data dump.

## 6.2 Copilot card (real-time)

```
┌─────────────────────────────────────────────────────────┐
│ KIOSK 1 · LIVE · 4:32                                    │
│─────────────────────────────────────────────────────────│
│ Carmen M. · Family-first · Seeking: permission           │
│ Emotional: Anxious → warming · Confidence: LOW→MEDIUM    │
│ Decision readiness: 58/100 (trust: 45 ⚠️ financial: 62)  │
│─────────────────────────────────────────────────────────│
│ LIKELY OBJECTION: Brand trust (78%) — partially addressed  │
│ AVOID: Cuota · Heritage lecture                         │
│ EMPHASIZE: Taller Viaggio · Prueba en pareja            │
│─────────────────────────────────────────────────────────│
│ OPEN: "Vi que la duda era la marca — ¿qué faltó          │
│        responder?"                                       │
│ CLOSE: Pareja no vio el auto — invitar test drive juntos │
│─────────────────────────────────────────────────────────│
│ CONVERSION PROBABILITY: 34% → 52% if test drive today    │
│ [Walk over] [Send WhatsApp template] [Dismiss]            │
└─────────────────────────────────────────────────────────┘
```

## 6.3 Copilot outputs (schema)

```yaml
consultantCopilot:
  customerSummary: string          # 2 sentences
  emotionalSummary: string
  likelyObjections: [{ id, prob, status }]
  recommendedOpeningLine: string
  recommendedCloseStrategy: string
  topicsToAvoid: string[]
  topicsToEmphasize: string[]
  conversionProbability:
    current: 0.34
    ifTestDriveToday: 0.52
    ifHumanHandoffNow: 0.48
  proofsDelivered: string[]
  proofsNotToRepeat: string[]
  liveTranscriptTail: string[]     # last 3 turns
  suggestedWalkOver: boolean
```

## 6.4 Conversion probability model (rule-based v1)

```
P(convert) = sigmoid(
    0.35 * decisionReadinessScore/100
  + 0.25 * buyingSignalScore/100
  - 0.20 * uncertaintyScore/100
  + 0.15 * sessionOutcomePrior_from_PCM
  + 0.10 * spouseAligned
  - 0.15 * decision_paralysis_prob
)
```

Calibrated monthly from closed-won CRM data (Self-Learning Layer). **No black-box required for v1.**

---

# 7. Persistent Customer Memory (PCM)

## 7.1 Purpose

Sales continues **across visits, channels, and days** — like a rep who remembers *"la semana pasada le preocupaba la reventa"*.

## 7.2 Identity resolution

| Key | Source |
|-----|--------|
| `phone` | Test drive, WhatsApp (primary) |
| `resumeToken` | S37 legacy |
| `deviceFingerprint` | Weak — kiosk only with consent |
| `explicitLogin` | Future: OTP |

## 7.3 Memory record schema

```yaml
customerMemory:
  customerId: uuid
  phone: string?
  consent: { storage, marketing, voiceRecording }
  profile:
    # Persistent discovery — merged from all sessions
    purchase_context, family, concern, co_decision, primary_use
    buyingStyle: inferred_long_term
    spouseName: string?   # only if volunteered
  objectionHistory:
    - { id: china_brand, firstRaised, lastRaised, status, sessions[] }
  comparisonHistory:
    - { competitor: corolla-cross, outcome: gs4_won_9_1, sessionId }
  proofHistory:
    - { proofId, presentedAt, dwellSec, resolvedObjection? }
  sessions:
    - { sessionId, startedAt, channel, outcome, snapshotSummary }
  preferences:
    preferredChannel: voice | text | whatsapp
    preferredLanguage: es-BO
    doNotAsk: [budget]   # if declined twice
  narrativeSummary: string   # rolling 3-sentence LLM summary, grounded
```

## 7.4 Cross-session continuity behaviors

| Return scenario | CSI opening |
|-----------------|-------------|
| Session 2, same day, no submit | *"Volviste — ¿seguimos donde quedamos con la comparación?"* |
| Session 2, +3 days, WhatsApp thread | *"Hola de nuevo — la última vez te preocupaba la cuota. ¿Pudiste pensarlo?"* |
| Spouse opens share link | Diego mode; recap for co-decision; permission CTAs |
| CRM: test drive done, no sale | *"¿Cómo fue la prueba? ¿Qué te gustaría revisar?"* |

## 7.5 Memory governance

| Rule | Implementation |
|------|----------------|
| Retention | 24 months default; delete on request |
| Minimization | No voice storage without consent |
| Accuracy | Customer can say *"no es para familia"* → slot correction |
| Export | Consultant sees summary; not raw audio |

---

# 8. Data Model (unified)

## 8.1 Entity relationship

```
Customer (1) ──< Session (N) ──< Turn (N)
    │                │
    │                └── ReasoningSnapshot (per turn)
    │
    └── CustomerMemory (1)

Session ──< ProofEvent (N)
Session ──< ObjectionState (N)

ProofNode (catalog) ── invoked by ── ProofEvent

KnowledgeLibrary ── grounds ── Turn.response
VerticalConfig ── configures ── ProofNode catalog
```

## 8.2 Turn schema

```yaml
turn:
  turnId: uuid
  sessionId: uuid
  index: number
  channel: voice | text | touch
  customerInput:
    raw: string
    sttConfidence: number?
    nlu: { intents[], slots{} }
  systemOutput:
    spoken: string
    displayed: string?
    proofInvoked: proofId?
    action: nextBestAction
  reasoningSnapshotId: uuid
  durationMs: number
```

## 8.3 CustomerProfile (session + persistent merge)

```yaml
customerProfile:
  # Discovery slots (CSI checklist)
  slots: { purchase_context, family, concern, ... }
  slotConfidence: { concern: 0.92, budget: 0.0 }
  slotsComplete: 0.75

  # ASI/BIL state (latest)
  cognitive: { emotionalState, uncertaintyScore, ... }

  # CI state
  buyingSignalScore: number
  closeDecision: object

  # PCM link
  memoryId: uuid?
  isReturnVisit: boolean
```

---

# 9. Confidence Systems (unified)

Phase X runs **four coupled scores** — never conflate in copy or consultant brief.

| Score | Owner | Range | Meaning |
|-------|-------|-------|---------|
| `uncertaintyScore` | BIL | 0–100+ ↑ = worse | Needs reassurance |
| `decisionReadinessScore` | ASI DRM | 0–100 | Ready for next commercial step |
| `buyingSignalScore` | CI | 0–100 | Wants to advance now |
| `conversionProbability` | Copilot | 0–1 | P(sale) conditional |

**Display rule for consultants:** Show `decisionReadiness` + `conversionProbability` + `confidenceLevel`. Hide raw `uncertaintyScore`.

## Confidence coupling examples

| uncertainty | decisionReadiness | buyingSignal | CSB behavior |
|-------------|-----------------|--------------|--------------|
| High | Low | Low | Educate one proof; REASSURER |
| High | Medium | High | **Close** — fear + action ("last mile anxiety") |
| Low | High | High | VALIDATOR close — test drive now |
| Low | Medium | Low | GUIDE — one more proof, no rush |

---

# 10. Interaction Examples (Viaggio GS4 MAX)

## Example 1 — Skeptical family, voice kiosk

```
[CSI]  Hola — contame qué te trae a ver el GS4 MAX.

[C]    Es mi primera SUV. Tengo dos hijos. Me da miedo que sea chino.

[RTR]  concern:trust+safety · family:yes · OPE china_brand 82% · REASSURER

[CSI]  Es la duda más común — y con hijos, tiene sentido. Te muestro en
       30 segundos cómo responde Viaggio acá en Santa Cruz, ¿te parece?

[C]    Dale.

[DPE]  → proof:faq_china + viaggio_service (voice + card)

[CSI]  Viaggio es el distribuidor con taller y repuestos — no un importador
       de paso. ¿Querés ver cómo protege a los chicos en el GS4, o preferís
       comparar con algo que miraste?

[C]    ¿Cómo es atrás? ¿Entran las sillas?

[DPE]  → proof:family_safety (screen)

[CSI]  Ocho airbags de serie, espacio para tres sillas en muchas configuraciones.
       ¿Comparás con algún otro modelo?

[C]    Con el Corolla Cross.

[DPE]  → proof:compare_corolla (scorecard voice summary)

[CI]   buyingSignal 45 · proofSufficiency approaching

[CSI]  En equipamiento y espacio ganamos fuerte; Toyota gana en reventa hoy.
       ¿Te cierra ver un rango de cuota orientativo, o preferís manejarlo primero?

[C]    Primero manejarlo.

[CI]   closeDecision.ready = true

[CSI]  Perfecto — 20 minutos, sin compromiso. ¿Qué día te viene bien esta semana?
```

## Example 2 — Researcher, text chat, return visit (PCM)

```
[CSI]  Hola de nuevo — la última vez comparaste con Corolla Cross. ¿Seguís
       en eso o querés ver cuota?

[C]    Sí, pero mi esposa dice que GAC no se vende bien usado.

[RTR]  PCM: resale objection unresolved · seekingMode: permission · spouse

[CSI]  Tiene razón en que Toyota reventa hoy es más fuerte — no lo escondemos.
       Lo que muchas familias miran es costo total: garantía 5 años, mantenimiento
       sin costo 3 años. ¿Querés un resumen para mandarle a tu esposa?

[C]    Sí, por favor.

[DPE]  → proof:share_summary + compare_honest_summary

[CI]   conversionProbability 0.38 → 0.55 if spouse views

[CSI]  Te generé un link. Cuando lo vean los dos, agendamos la prueba en pareja.
```

## Example 3 — Escalation

```
[C]    ¿Puedo hablar con alguien? No me cierra el tema del turbo.

[CI]   escalate: immediate · human_request

[CSI]  Claro — te comunico con un asesor de Viaggio. Carlos del piso viene en
       un momento. Mientras, ¿querés que le avise que tu duda es el motor turbo?

[Copilot → consultant]  LOW trust · turbo objection · OPEN: "Vi que la duda es
       mecánica — soy Carlos, mecánico maestro…"
```

---

# 11. Platform Vision — Autonomous Sales Intelligence Platform (ASIP)

## 11.1 Vertical abstraction

| Layer | Automotive (Viaggio) | Real Estate | Insurance | Education | Healthcare | High-ticket retail |
|-------|---------------------|-------------|-----------|-----------|------------|-------------------|
| **Product** | GS4 MAX | Listing / unit | Policy SKU | Program / campus | Procedure / plan | SKU / collection |
| **Proof graph** | ADAS, compare, TCO | Floor plan, neighborhood, ROI | Coverage table, claims | Outcomes, alumni | Credentials, outcomes | Materials, craftsmanship |
| **Objections** | china brand, resale | location, developer | fine print, claim denial | job placement | risk, cost | price, authenticity |
| **Close action** | Test drive | Site visit | Quote bind | Campus tour | Consultation | Private viewing |
| **Personas** | Carlos/Diego/Sofía | Agent archetypes | Advisor | Counselor | Patient advocate | Stylist |
| **Regulation** | Financing disclaimers | Fair housing | Suitability | Accreditations | HIPAA | Consumer law |

## 11.2 Shared CSB core (vertical-agnostic)

- CSI dialog orchestration  
- RTR reasoning loop  
- DPE proof graph engine  
- CI closing logic  
- PCM memory  
- Consultant Copilot  
- BIL + ASI score modules  
- Self-learning config layer  

## 11.3 Vertical pack (per industry)

```yaml
verticalPack:
  id: automotive_v1
  discoverySlots: [...]
  objectionCatalog: [...]
  proofNodes: [...]
  knowledgeLibrary: path
  personaDefinitions: [...]
  complianceRules: [...]
  closeActions: [test_drive, whatsapp, escalate]
```

**Viaggio GS4 MAX** = first `verticalPack` instance. Phase X generalizes the engine.

## 11.4 Deployment modes

| Mode | Description |
|------|-------------|
| **Embedded** | Viaggio kiosk — CSB + existing Next.js surfaces |
| **API** | `POST /v1/turn` — any front-end |
| **WhatsApp bot** | Async CSI + PCM |
| **Consultant-only** | Copilot without customer AI — Phase X-lite |

---

# 12. Implementation Roadmap

## Phase X0 — Foundation (8–10 weeks)

**Prerequisite:** Sprint A v1.2 + ASI B1 live on screens.

| Deliverable | Description |
|-------------|-------------|
| Knowledge Library API | Grounded facts, no free-form specs |
| Proof graph v1 (automotive) | 12 nodes mapped to existing screens |
| RTR v1 | Rule engine + template responses (no LLM) |
| CSI text mode | Chat overlay on kiosk |
| PCM v1 | Phone-keyed resume |
| Copilot v1 | Static playbook from ASI |

**Exit:** Customer can **chat** instead of 4-tap discovery; system picks proof node.

## Phase X1 — Conversational core (10–12 weeks)

| Deliverable | Description |
|-------------|-------------|
| Voice STT/TTS pipeline | Kiosk mic, Carlos voice |
| NLU slot extraction | Discovery checklist inference |
| LLM phrasing layer | Grounded templates only |
| DPE dynamic selection | Replace PATH_A–G as primary |
| CI buying signals | Verbal + behavioral |
| Copilot live | Real-time tablet card |

**Exit:** Full voice conversation drives session on kiosk.

## Phase X2 — Intelligence parity (8–10 weeks)

| Deliverable | Description |
|-------------|-------------|
| ASI full integration in RTR | ESE, OPE, DRM, APC per turn |
| Closing Intelligence v2 | Escalation automation |
| PCM cross-channel | WhatsApp continuity |
| Conversion probability calibration | CRM feedback loop |
| Self-learning from conversations | Intent/proof performance |

**Exit:** Matches ASI screen intelligence in conversational mode.

## Phase X3 — Platform (12+ weeks)

| Deliverable | Description |
|-------------|-------------|
| Vertical pack SDK | Second vertical pilot (real estate OR insurance) |
| ASIP admin console | Proof editor, objection thresholds |
| Multi-tenant | Dealership groups |
| API marketplace | Partner integrations |

**Exit:** CSB is a product, not a Viaggio feature.

---

# 13. Maturity Model — Evolution Path

| Stage | Name | Unit of sales | Customer feels | Level |
|-------|------|---------------|----------------|-------|
| **1** | Digital brochure | Page | "Website on a TV" | 1–2 |
| **2** | Guided showroom | Screen path | "Nice kiosk" | 3–4 |
| **3** | Smart showroom | Personalized screens | "They ask a few questions" | 5–6 |
| **4** | **Adaptive showroom** | Screen + ASI | "They understand my concern" | **7** ← ASI target |
| **5** | **Conversational brain** | Conversation turn | "I talked to someone who listened" | **8** ← Phase X1 |
| **6** | **Memory-enabled brain** | Relationship | "They remembered me from last week" | **9** ← Phase X2 |
| **7** | **Autonomous sales platform** | Cross-vertical AI | "This is how buying should work" | **10** ← Phase X3 |

## Current position → target

| Milestone | Level | Timeline |
|-----------|-------|----------|
| Sprint A v1.2 live | 6.5 | Now |
| ASI B1 | 7 | +3 months |
| Phase X0 text | 7.5 | +6 months |
| Phase X1 voice | 8 | +9 months |
| Phase X2 memory + CI | 9 | +12 months |
| Phase X3 platform | 10 | +18 months |

## Level 10 definition (Conversational)

> A customer speaks naturally in Spanish at a Viaggio kiosk. The AI infers their situation without a form, names their unstated fear before they repeat it, shows exactly one proof that addresses it, knows when more talking will **lose** the sale, asks for the test drive at the right moment, remembers them on WhatsApp three days later, and hands the consultant a one-glance copilot card that makes the human conversation feel continuous — **as if one top salesperson was there the entire time.**

---

# 14. Technical Boundaries (behavioral, not implementation)

| Component | Phase X approach |
|-----------|------------------|
| **LLM role** | Phrasing + NLU only — **not** spec invention |
| **Rule engine** | Scores, gates, close decisions, compliance |
| **Human override** | Consultant can always take mic on kiosk |
| **Failure mode** | STT fail → fall back to text + touch discovery checklist |
| **Hallucination** | Block response if `knowledgeRef` missing; escalate human |
| **Latency** | Pre-cache proof summaries; stream TTS |

---

# 15. Success Metrics (Phase X)

| Metric | X0 | X1 | X2 |
|--------|----|----|-----|
| Discovery slots filled via conversation (no form) | 60% | 85% | 90% |
| Avg turns to test drive ask | — | ≤12 | ≤8 |
| Proof nodes per conversion | — | ≤4 | ≤3 |
| Voice session completion rate | — | 70% | 80% |
| PCM return visit conversion lift | — | — | +25% vs cold |
| Consultant copilot usage rate | 50% | 80% | 90% |
| Escalation → close rate | — | 40% | 50% |
| Customer "felt understood" (survey) | — | 75% | 85% |

---

# 16. Relationship to Prior Specs

| Document | Role in Phase X |
|----------|-----------------|
| SPRINT_A_PRODUCT_SPEC v1.2 | Proof surfaces, BIL, baseline discovery → migrated to CSI checklist |
| ADAPTIVE_SALES_INTELLIGENCE | Becomes modules inside RTR — not replaced |
| PHASE1_IMPLEMENTATION_BACKLOG | Prerequisite — screens must work before conversation invokes them |
| **PHASE_X (this doc)** | Strategic architecture for conversational layer |

---

# 17. Closing Thesis

**Sprint A** taught the showroom to **walk** a path.  
**ASI** taught it to **judge** when to stop walking.  
**Phase X** teaches it to **talk, listen, remember, and close** — like the best rep on the floor, available at every kiosk, every hour, in every Viaggio location — and eventually, every high-stakes purchase where trust is the product.

The screen does not disappear. It becomes **what the salesperson points at** while saying: *"Mirá esto."*

---

*End of Phase X — Conversational Sales Brain specification v1.0*
