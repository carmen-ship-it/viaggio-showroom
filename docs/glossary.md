# Glossary

Terms used across Viaggio Digital Showroom documentation and implementation.

## A

**ADR (Architecture Decision Record)**  
Document capturing a significant technical or product decision, its context, and consequences. Template in [`decisions/ADR-template.md`](./decisions/ADR-template.md).

**App Router**  
Next.js 15 routing system using the `app/` directory with layouts, server components, and route groups.

**Attract Loop (S01)**  
Idle-state full-screen video loop on kiosk inviting visitors to start a session.

## C

**Content Block**  
Atomic unit of topic content (hero, narration, feature grid, etc.) defined in `content-block.schema.json`.

**Content Pack**  
All JSON content files for one vehicle under `src/content/vehicles/{slug}/`.

**Compare Target**  
A vehicle or competitor profile used in side-by-side comparison mode.

**Conversion Event**  
Analytics event tracking user actions toward test drive, WhatsApp, or consultant handoff.

**CTA (Call to Action)**  
Primary user action prompt — test drive, WhatsApp, or consultant.

## D

**Dealership Config**  
Static JSON with Viaggio Motors Santa Cruz contact info, hours, WhatsApp number.

**Depth Score**  
Computed engagement metric based on topics viewed, tour progress, and session duration.

**Digital Guide**  
See **Persona**.

## G

**GAC Motor Bolivia**  
Brand represented; parent company Guangzhou Automobile Group (GAC).

**GS4 MAX**  
Launch vehicle — compact SUV, primary content focus of Phase 2.

## I

**IA (Information Architecture)**  
Structure of content, navigation, and hierarchy. See [information-architecture.md](./information-architecture.md).

## K

**Kiosk**  
In-dealership touchscreen display running the showroom app in full-screen mode.

## L

**Lead**  
Captured customer intent record (test drive request, WhatsApp initiation, consultant handoff).

## P

**Persona**  
Digital guide character (Carlos, Sofía, Diego) providing voice and trust segmentation.

**Phase 1**  
Current documentation and scaffolding phase — no application code.

## R

**Registry (`registry.json`)**  
Index of all vehicles with slug, status, and launch priority.

## S

**Session**  
Anonymous visit instance with unique ID, tracked topics, and analytics events.

**Showroom**  
The full in-dealership digital experience (not a traditional marketing website).

**Slug**  
URL-safe vehicle identifier in kebab-case (e.g., `gs4-max`).

**SSG (Static Site Generation)**  
Pre-rendering vehicle pages at build time for kiosk performance.

**Sticky CTA Bar**  
Persistent bottom bar with test drive and WhatsApp buttons.

## T

**Theme**  
Mid-level content grouping (e.g., `safety`, `family`, `technology`).

**Topic**  
Leaf content page within a theme (e.g., `adas`, `space`).

**Tour**  
Guided linear narrative through multiple topics.

## V

**Vehicle Shell**  
Layout wrapper for all pages under `/vehicles/[slug]`.

**Viaggio Motors Bolivia**  
Client dealership; official GAC distributor in Santa Cruz.

## W

**WhatsApp Handoff**  
Conversion flow opening WhatsApp with pre-filled Spanish message including vehicle and session context.

---

*Add terms as the project evolves. Propose updates via ADR or PR to this file.*
