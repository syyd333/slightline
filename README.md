# SightLine

Connected camera planning and footage search. Built from the Team Codeprix pitch for SEVA First Innovation Challenge 2026.

## What it does

- **Placement planner** — incident weight, budget, OSM-style candidate sites, fairness warning
- **Footage finder** — natural-language search over clothing and vehicle attributes (no face match)
- **Camera map** — cones of view so search can ignore cameras that could not have seen the event
- **No-evidence loop** — gaps feed the next placement round
- **Access logs** — every search and map view is recorded

## Stack

Next.js, Tailwind, Leaflet, Supabase.

## Setup

1. Copy `.env.example` to `.env.local` and fill the Supabase URL and publishable key.
2. Apply `supabase/migrations/20261024120000_init.sql` in the Supabase SQL editor, or connect with the database URL.
3. `npm install`
4. `npm run dev`

The first map, planner, or search visit seeds a small Hyderabad campus demo if the tables are empty.
