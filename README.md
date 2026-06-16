# Viaggio Digital Showroom

Premium touchscreen kiosk demo for **Viaggio Motors Bolivia** — official **GAC Motor Bolivia** dealership, Santa Cruz.

This repository is the **live product demo** deployed on **Vercel**. It is the visible CPI-OS showroom experience: attract loop → vehicle exploration → trust → compare → financing → conversion → advisor handoff.

**Presentations, decks, and film assets live in Replit — not here.**

---

## Quick start

```bash
npm install
cp .env.example .env.local   # if present
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Kiosk demo mode (executive path)

```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=true
```

See [`DEMO_MODE_CHECKLIST.md`](./DEMO_MODE_CHECKLIST.md) for operator setup and the locked 12-step path.

---

## What lives in this repo

| Area | Purpose |
|------|---------|
| `app/` | Next.js 15 App Router — showroom + operations routes |
| `components/` | Kiosk screens, cinematic shell, audio, handoff UI |
| `content/` | GS4 MAX JSON content (FAQ, tours, compare, financing) |
| `lib/config/demo-mode.ts` | Kiosk flags, executive path, narration |
| `public/assets/` | Hero media, host narration MP3, placeholders |
| `docs/demo/` | Demo implementation notes (kiosk vision, walkthrough) |

---

## Executive demo path

```
S01 → S02 → S03 → S22 → S25 → S06 → S08 → S11 → S12 → S26 → S13 → S14 → S15
                                                              └─ S36 modal (advisor)
```

Operations rehearsal: trigger S36 on kiosk, open `/staff` in the **same browser** for live handoff.

Guided script: [`docs/demo-walkthrough.md`](./docs/demo-walkthrough.md)

---

## Deploy (Vercel)

1. Connect repo to Vercel
2. Set `NEXT_PUBLIC_DEMO_MODE=true` for kiosk deployments
3. `npm run build` must pass

See [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) and [`VERCEL_DEPLOYMENT_REPORT.md`](./VERCEL_DEPLOYMENT_REPORT.md).

---

## Tech stack

Next.js 15 · TypeScript · Tailwind CSS 4 · Framer Motion

---

## Out of scope (Replit)

- Executive decks and PDFs
- Film / trailer production
- Presentation screenshot pipelines
- Investor narrative documents
