# Deployment Checklist — Viaggio Digital Showroom

**Phase:** 5 — Vercel Deployment & Stakeholder Preview  
**Date:** 14 June 2026  
**Scope:** Deployment preparation only (no feature, UI, or routing changes)

---

## Pre-Deploy Audit

### Environment variables

| Variable | Required | Scope | Value | Status |
|----------|----------|-------|-------|--------|
| `NEXT_PUBLIC_DEMO_MODE` | **Yes** | Preview (and Production for stakeholder demo) | `true` | Documented in `.env.example`; set in `.env.local` locally |

No server-side secrets, database URLs, or third-party API keys are required for the current MVP.

### Next.js configuration

| Item | File | Status |
|------|------|--------|
| Framework version | Next.js 15.5.19 | OK |
| Config file | `next.config.ts` — default, no custom rewrites/redirects | OK |
| App Router | `app/(showroom)/` route group | OK |
| TypeScript | Strict mode enabled | OK |
| Fonts | `next/font/google` (Geist) — auto-optimized by Vercel | OK |

### Middleware compatibility

| Item | Status | Notes |
|------|--------|-------|
| Edge runtime | OK | `middleware.ts` uses only `NextResponse`, `NextRequest`, and demo-route helpers |
| Matcher | OK | Excludes `_next/static`, `_next/image`, `favicon.ico`, `assets` |
| Demo redirects | OK | Verified in production server — unfinished routes redirect correctly |
| Node-only imports | OK | Middleware imports only Edge-safe modules (`lib/config/demo-routes` → `demo-mode`) |

### Image configuration

| Item | Status | Notes |
|------|--------|-------|
| `next/image` usage | N/A | App uses native `<img>` via `MediaImage` |
| `images` config in `next.config.ts` | Not required | No remote image domains needed |
| Fallback system | OK | Missing assets degrade to `FallbackMedia` SVG/gradient treatments |
| Static assets | Partial | 16 of 48 manifest references exist on disk; fallbacks cover the rest |

### Static asset paths

| Path | Purpose | Status |
|------|---------|--------|
| `public/assets/` | Vehicle photos, videos, brand SVGs, persona avatars | Scaffold + partial P0 assets (~1.1 MB) |
| `public/locales/` | Locale files | Present |
| `content/` | JSON content bundled at build time via `fs` reads | OK — included in server bundle |
| `/assets/*` | Served directly by Vercel static file handler | OK — excluded from middleware matcher |

### API routes

| Route | Method | Runtime | Status |
|-------|--------|---------|--------|
| `/api/leads` | POST | Node.js (default) | OK — returns 201 with mock lead payload; no persistence |

---

## Build Verification

Run locally before every deploy:

```bash
# 1. Content schema validation
npm run validate:content

# 2. Lint
npm run lint

# 3. Production build (demo mode baked in at build time for NEXT_PUBLIC_*)
NEXT_PUBLIC_DEMO_MODE=true npm run build
```

### Results (14 June 2026)

| Command | Result | Notes |
|---------|--------|-------|
| `npm run validate:content` | **PASS** | 34 schema checks OK |
| `npm run lint` | **PASS** | 0 errors, 2 warnings (unused vars — non-blocking) |
| `NEXT_PUBLIC_DEMO_MODE=true npm run build` | **PASS** | 69 static pages generated in ~27s |

---

## Vercel Project Setup

### 1. Import repository

- [ ] Connect Git provider (GitHub/GitLab/Bitbucket) or use `vercel` CLI
- [ ] Framework preset: **Next.js** (auto-detected)
- [ ] Root directory: `.` (project root)
- [ ] Node.js version: **20.x** (recommended; matches Vercel default)

### 2. Build settings

| Setting | Value |
|---------|-------|
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| `vercel.json` | **Not required** — default Next.js 15 settings are sufficient |

### 3. Environment variables (Vercel Dashboard → Settings → Environment Variables)

| Name | Preview | Production | Notes |
|------|---------|------------|-------|
| `NEXT_PUBLIC_DEMO_MODE` | `true` | `true` (for stakeholder preview) | Must be set **before** build — value is inlined at compile time |

### 4. Deploy

```bash
# Option A: Git push to connected branch (auto-deploy)
git push origin main

# Option B: CLI deploy
npx vercel --prod          # production
npx vercel                 # preview
```

---

## Post-Deploy Route Verification

Canonical demo routes (full paths under `/vehicles/gs4-max/`):

| # | Route | Screen | Verified locally |
|---|-------|--------|------------------|
| 1 | `/` | S01 Attract Loop | 200 OK |
| 2 | `/vehicles` | S03 Vehicle Selector | 200 OK |
| 3 | `/vehicles/gs4-max/hero` | S22 Immersive Hero | 200 OK |
| 4 | `/vehicles/gs4-max/trust/faq` | S25 FAQ | 200 OK |
| 5 | `/vehicles/gs4-max/trust/story` | S24 Trust Story | 200 OK |
| 6 | `/vehicles/gs4-max/tour/trust` | S06 Carlos Trust Tour | 200 OK |
| 7 | `/vehicles/gs4-max/themes/safety/adas` | S08 ADAS Topic | 200 OK |
| 8 | `/vehicles/gs4-max/compare` | S11 Compare Hub | 200 OK |
| 9 | `/vehicles/gs4-max/compare/corolla-cross` | S12 Compare Detail | 200 OK |
| 10 | `/vehicles/gs4-max/economics/financing` | S26 Financing | 200 OK |
| 11 | `/vehicles/gs4-max/convert` | S13 Conversion Hub | 200 OK |
| 12 | `/vehicles/gs4-max/test-drive` | S14 Test Drive Form | 200 OK |
| 13 | `/vehicles/gs4-max/whatsapp` | S15 WhatsApp Handoff | 200 OK |

### Middleware redirects (demo mode)

| From | To | Verified |
|------|----|----------|
| `/vehicles/gs4-max` | `/vehicles/gs4-max/hero` | 307 OK |
| `/vehicles/gs4-max/themes/safety` | `/vehicles/gs4-max/themes/safety/adas` | 307 OK |
| `/vehicles/gs4-max/journey/carlos` | `/vehicles/gs4-max/tour/trust` | 307 OK |

### API smoke test

```bash
curl -X POST https://<preview-url>/api/leads \
  -H "Content-Type: application/json" \
  -d '{"type":"test_drive","name":"Test","phone":"70000000","vehicleSlug":"gs4-max"}'
# Expected: 201 { "ok": true, "lead": { ... } }
```

---

## Stakeholder Preview Handoff

- [ ] Copy Vercel **Preview URL** (or Production URL if promoted)
- [ ] Confirm `NEXT_PUBLIC_DEMO_MODE=true` is active (no S## badges, no Ajustes button)
- [ ] Test on **1920×1080 landscape** viewport (kiosk target)
- [ ] Share [docs/demo-walkthrough.md](./docs/demo-walkthrough.md) with operators
- [ ] Note: placeholder/fallback media is expected until full P0 asset acquisition

---

## Known Non-Blockers

| Item | Impact | Action |
|------|--------|--------|
| ESLint warnings (2 unused imports) | None on build | Optional cleanup in a future pass |
| 32 of 48 media manifest files missing | Visual — fallbacks render | Acquire P0 assets per `docs/assets/asset-acquisition-plan.md` |
| `/api/leads` has no persistence | Demo-only mock response | Wire CRM integration post-MVP |
| No `favicon.ico` in `public/` | Minor — browser default icon | Add favicon in a future pass |

---

## Quick Reference

```
Project:     viaggio-digital-showroom
Framework:   Next.js 15.5.19
Runtime:     Node.js 20.x (Vercel)
Demo flag:   NEXT_PUBLIC_DEMO_MODE=true
Build time:  ~30s (local), ~2–4 min (Vercel cold)
Pages:       69 SSG + 1 dynamic API route
Middleware:  Edge (34.5 kB)
vercel.json: Not required
```
