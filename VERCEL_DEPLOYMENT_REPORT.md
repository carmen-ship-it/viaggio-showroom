# Vercel Deployment Report — Viaggio Digital Showroom

**Phase:** 5 — Vercel Deployment & Stakeholder Preview  
**Date:** 14 June 2026  
**Auditor:** Automated deployment readiness pass  
**Verdict:** **READY TO DEPLOY** — no blockers

---

## Executive Summary

The Viaggio Digital Showroom passes all pre-deployment gates. Production build, lint, and content validation succeed. All 13 canonical demo-path routes render HTTP 200 in a local production server with `NEXT_PUBLIC_DEMO_MODE=true`. Middleware redirects behave correctly on Edge-compatible code paths. No `vercel.json` is required.

**Recommended next step:** Import the project into Vercel, set `NEXT_PUBLIC_DEMO_MODE=true` for Preview (and Production if used for stakeholder demo), and deploy.

---

## Deployment Blockers

| Severity | Item | Status |
|----------|------|--------|
| — | None identified | **Clear** |

### Advisory items (do not block deploy)

| Item | Severity | Detail |
|------|----------|--------|
| Partial media assets | Low | 16 of 48 manifest file references exist on disk; `FallbackMedia` covers missing files gracefully |
| ESLint warnings | Low | 2 unused-variable warnings in `AttractLoop.tsx` and `capture-phase4-screenshots.mjs` — build succeeds |
| No `favicon.ico` | Low | Browser shows default icon; no functional impact |
| Mock lead API | Info | `/api/leads` returns 201 with in-memory payload; no CRM persistence |
| No git remote detected | Info | Project directory is not a git repository locally; Vercel import requires a connected Git provider or CLI deploy from filesystem |

---

## Environment Variables Required

| Variable | Required | Environments | Value | Build-time / Runtime |
|----------|----------|--------------|-------|----------------------|
| `NEXT_PUBLIC_DEMO_MODE` | **Yes** | Preview, Production (stakeholder demo) | `true` | **Build-time** — inlined into client bundle |

### Variables not required

- Database URLs
- API keys (WhatsApp, CRM, analytics)
- Server secrets
- `VERCEL_*` system variables (auto-injected by Vercel)

### Local configuration verified

- `.env.example` documents `NEXT_PUBLIC_DEMO_MODE=true`
- `.env.local` contains `NEXT_PUBLIC_DEMO_MODE=true`
- Build log confirms: `Environments: .env.local`

---

## Build & Validation Results

Executed 14 June 2026 with `NEXT_PUBLIC_DEMO_MODE=true`:

| Check | Command | Result | Duration |
|-------|---------|--------|----------|
| Content validation | `npm run validate:content` | **PASS** (34 checks) | <1s |
| Lint | `npm run lint` | **PASS** (0 errors, 2 warnings) | ~6s |
| Production build | `npm run build` | **PASS** (69 pages) | ~27s |

### Build output summary

```
Route (app)                              Size     First Load JS
┌ ○ /                                    4.79 kB  162 kB
├ ○ /vehicles                            3.4 kB   160 kB
├ ● /vehicles/[slug]/hero                …        …
├ ● /vehicles/[slug]/trust/faq           …        …
├ ● /vehicles/[slug]/trust/story         …        …
├ ● /vehicles/[slug]/tour/[tourId]       …        …
├ ● /vehicles/[slug]/themes/…/[topicId]  …        …
├ ● /vehicles/[slug]/compare             …        …
├ ● /vehicles/[slug]/compare/[targetId]  …        …
├ ● /vehicles/[slug]/economics/financing …        …
├ ● /vehicles/[slug]/convert             …        …
├ ● /vehicles/[slug]/test-drive          …        …
├ ● /vehicles/[slug]/whatsapp            11.3 kB  157 kB
└ ƒ /api/leads                           123 B    103 kB

ƒ Middleware                             34.5 kB
```

- **○** Static prerendered
- **●** SSG via `generateStaticParams`
- **ƒ** Dynamic (API route, middleware)

---

## Route Verification (Production Server)

Tested against `next start` on port 3456 with `NEXT_PUBLIC_DEMO_MODE=true`:

| Route | HTTP | Content | Notes |
|-------|------|---------|-------|
| `/` | 200 | Viaggio/GAC content | S01 Attract Loop |
| `/vehicles` | 200 | ✓ | S03 Vehicle Selector |
| `/vehicles/gs4-max/hero` | 200 | ✓ | S22 Immersive Hero |
| `/vehicles/gs4-max/trust/faq` | 200 | ✓ | S25 FAQ |
| `/vehicles/gs4-max/trust/story` | 200 | ✓ | S24 Trust Story |
| `/vehicles/gs4-max/tour/trust` | 200 | ✓ | S06 Carlos Trust Tour |
| `/vehicles/gs4-max/themes/safety/adas` | 200 | ✓ | S08 ADAS Topic |
| `/vehicles/gs4-max/compare` | 200 | ✓ | S11 Compare Hub |
| `/vehicles/gs4-max/compare/corolla-cross` | 200 | ✓ | S12 Compare Detail |
| `/vehicles/gs4-max/economics/financing` | 200 | ✓ | S26 Financing |
| `/vehicles/gs4-max/convert` | 200 | ✓ | S13 Conversion Hub |
| `/vehicles/gs4-max/test-drive` | 200 | ✓ | S14 Test Drive Form |
| `/vehicles/gs4-max/whatsapp` | 200 | ✓ | S15 WhatsApp Handoff |

> **Route path note:** Demo routes live under `/vehicles/gs4-max/…`, not at shortened paths like `/compare` or `/themes/safety/adas`. Middleware redirects unfinished routes to the canonical demo path.

### Middleware redirect verification

| Request | Response | Target |
|---------|----------|--------|
| `GET /vehicles/gs4-max` | 307 | `/vehicles/gs4-max/hero` |
| `GET /vehicles/gs4-max/themes/safety` | 307 | `/vehicles/gs4-max/themes/safety/adas` |
| `GET /vehicles/gs4-max/journey/carlos` | 307 | `/vehicles/gs4-max/tour/trust` |

### API route verification

| Request | Response |
|---------|----------|
| `POST /api/leads` (name + phone) | **201** `{ ok: true, lead: { … } }` |

---

## Configuration Audit

### Next.js (`next.config.ts`)

Default configuration — no custom `rewrites`, `headers`, `redirects`, or `images` blocks. Vercel auto-detects Next.js 15 with zero additional config.

### Middleware (`middleware.ts`)

- **Runtime:** Edge — compatible with Vercel Edge Middleware
- **Matcher:** Excludes static assets (`/assets/*`, `/_next/*`, `favicon.ico`)
- **Logic:** Demo-mode route guards via `resolveDemoRedirect()` — no filesystem or Node.js APIs
- **Bundle size:** 34.5 kB (within Vercel limits)

### Images & media

- No `next/image` — uses native `<img>` with lazy loading
- No `remotePatterns` configuration needed
- `public/assets/` served as static files by Vercel CDN
- Server-side manifest reads from `content/vehicles/gs4-max/media-manifest.json` at build time
- Missing files fall back to `FallbackMedia` (SVG silhouettes + gradients) — no runtime crashes

### Static assets

| Location | Size | Files | Notes |
|----------|------|-------|-------|
| `public/assets/` | ~1.1 MB | 6 media + `.gitkeep` scaffolds | Partial P0 coverage |
| `public/locales/` | Present | Locale JSON | OK |
| `content/` | Bundled | All vehicle/theme/topic JSON | Validated by schema |

### `vercel.json`

**Not required.** The project uses standard Next.js App Router conventions. Vercel's default build pipeline handles:

- App Router page routing
- Edge Middleware deployment
- Static file serving from `public/`
- Serverless function for `/api/leads`

---

## Estimated Deployment Time

| Phase | First deploy | Subsequent deploys |
|-------|-------------|-------------------|
| Git clone + `npm install` | 30–60s | 15–30s (cached) |
| `npm run build` | 25–35s | 20–30s |
| Vercel upload + edge propagation | 30–60s | 15–30s |
| **Total** | **~2–4 minutes** | **~1–2 minutes** |

Local benchmark: production build completed in **26.5 seconds** on Node.js v24.15.0.

---

## Recommended Vercel Settings

### Project

| Setting | Recommendation |
|---------|----------------|
| Framework Preset | Next.js (auto-detected) |
| Root Directory | `.` |
| Node.js Version | **20.x** |
| Package Manager | npm |
| Install Command | `npm install` (default) |
| Build Command | `npm run build` (default) |
| Output Directory | Auto (`.next`) |

### Environment variables

| Variable | Preview | Production | Development |
|----------|---------|------------|-------------|
| `NEXT_PUBLIC_DEMO_MODE` | `true` | `true` | `true` |

Set this variable in the Vercel dashboard **before the first build**. `NEXT_PUBLIC_*` variables are inlined at compile time and cannot be changed at runtime without a rebuild.

### Region

| Setting | Recommendation | Rationale |
|---------|----------------|-----------|
| Primary region | **São Paulo (`gru1`)** | Closest Vercel edge to Santa Cruz, Bolivia |
| Edge Middleware | Enabled (default) | Demo route redirects run on Edge |

### Domains

| Type | Use |
|------|-----|
| `*.vercel.app` Preview URL | Stakeholder review link (share immediately after deploy) |
| Custom domain (optional) | `showroom.viaggio.bo` or similar — configure post-approval |

### Deployment protection (optional)

- Enable **Vercel Authentication** on Preview if the link should not be publicly indexed
- For open stakeholder demos, leave Preview deployments public

### Performance notes

- 69 statically generated pages — fast TTFB on Edge CDN
- First Load JS: ~102 kB shared + ~50–65 kB per route (within acceptable kiosk range)
- No ISR or dynamic server rendering on demo path — all pages are pre-built

---

## Shareable Preview Link — How to Obtain

1. **Import project** into Vercel (Git connect or `npx vercel`)
2. **Set** `NEXT_PUBLIC_DEMO_MODE=true` in Environment Variables → Preview
3. **Deploy** — Vercel assigns a URL like:
   ```
   https://viaggio-digital-showroom-<hash>-<team>.vercel.app
   ```
4. **Verify** the 13 demo routes listed above return 200
5. **Share** the Preview URL with stakeholders along with [docs/demo-walkthrough.md](./docs/demo-walkthrough.md)

For a stable URL across commits, assign a **Preview Branch Alias** in Vercel (e.g. `demo.viaggio-showroom.vercel.app` → `main` branch).

---

## Files Generated This Phase

| File | Purpose |
|------|---------|
| `DEPLOYMENT_CHECKLIST.md` | Operator step-by-step deploy checklist |
| `VERCEL_DEPLOYMENT_REPORT.md` | This report — audit findings and Vercel recommendations |

No `vercel.json` created — not required for this project.

---

## Sign-Off

| Gate | Status |
|------|--------|
| Environment variables documented | ✅ |
| Next.js config compatible | ✅ |
| Middleware Edge-compatible | ✅ |
| Image/static asset paths verified | ✅ (partial assets, fallbacks OK) |
| API route functional | ✅ |
| `npm run build` | ✅ |
| `npm run lint` | ✅ |
| `npm run validate:content` | ✅ |
| Demo routes render in production | ✅ (13/13) |
| `NEXT_PUBLIC_DEMO_MODE=true` | ✅ |
| `vercel.json` required | ❌ Not needed |

**Deployment readiness: APPROVED**
