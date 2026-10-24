# SightLine

Connected camera planning and footage search. Built from the Team Codeprix pitch for
SEVA First Innovation Challenge 2026 (Theme 5, Surakshit Bharat).

## What it does

- **Placement planner** — incident weight, budget, OpenStreetMap-style candidate sites,
  greedy gain-per-rupee selection, fairness warning
- **Footage finder** — natural-language search over clothing and vehicle attributes
  (no face match)
- **Camera map** — cones of view, so a search ignores cameras that could not have seen
  the event
- **No-evidence loop** — incidents without footage raise the priority of that spot in
  the next placement round
- **Access logs** — every search, plan and map view is recorded
- **The pitch** — problem, innovation, architecture, feasibility, impact and research
  at `/about`

## Stack

Next.js (App Router), Tailwind CSS v4, Leaflet + OpenStreetMap, Supabase Postgres.

The detection pipeline described in the deck (YOLOv8 → OpenCLIP → FAISS) is the next
phase; this app ships the planner, the map, the attribute search over indexed clips, and
the feedback loop.

## Setup

1. Copy `.env.example` to `.env.local` and fill in the Supabase URL, publishable key
   and direct database URL.
2. Apply the schema:

   ```bash
   npm install
   npm run db:migrate
   ```

   (This runs every file in `supabase/migrations` against `DATABASE_URL`. You can also
   paste `supabase/migrations/20261024120000_init.sql` into the Supabase SQL editor.)
3. `npm run dev`

The first visit to the map, planner, search, incidents or logs page seeds the demo
dataset: a Hyderabad campus cluster the planner runs on, plus city cameras across India
(Delhi, Mumbai, Bengaluru, Kolkata, Chennai and more) so the unified map reads as a
national picture. The seed is idempotent — it tops up any cameras added to the list since
the last visit without duplicating what is already there.
