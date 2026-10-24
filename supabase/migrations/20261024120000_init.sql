create extension if not exists pgcrypto;

create table if not exists cameras (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  zone text not null,
  lat double precision not null,
  lng double precision not null,
  heading integer not null default 0,
  fov integer not null default 70,
  range_m integer not null default 80,
  status text not null default 'online' check (status in ('online', 'offline', 'blocked')),
  created_at timestamptz not null default now()
);

create table if not exists candidate_sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  lat double precision not null,
  lng double precision not null,
  cost integer not null,
  notes text
);

create table if not exists incidents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  lat double precision not null,
  lng double precision not null,
  occurred_at timestamptz not null default now(),
  severity integer not null default 2 check (severity between 1 and 5),
  has_evidence boolean not null default false,
  notes text
);

create table if not exists clips (
  id uuid primary key default gen_random_uuid(),
  camera_id uuid references cameras(id) on delete set null,
  captured_at timestamptz not null default now(),
  description text not null,
  tags text[] not null default '{}',
  attributes jsonb not null default '{}'::jsonb
);

create table if not exists placement_plans (
  id uuid primary key default gen_random_uuid(),
  budget integer not null,
  selected jsonb not null,
  coverage_score numeric not null,
  fairness_warning text,
  created_at timestamptz not null default now()
);

create table if not exists search_logs (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  results_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists access_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  resource text not null,
  created_at timestamptz not null default now()
);

alter table cameras enable row level security;
alter table candidate_sites enable row level security;
alter table incidents enable row level security;
alter table clips enable row level security;
alter table placement_plans enable row level security;
alter table search_logs enable row level security;
alter table access_logs enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['cameras','candidate_sites','incidents','clips','placement_plans','search_logs','access_logs']
  loop
    execute format('drop policy if exists public_select on %I', t);
    execute format('drop policy if exists public_insert on %I', t);
    execute format('drop policy if exists public_update on %I', t);
    execute format('drop policy if exists public_delete on %I', t);
    execute format('create policy public_select on %I for select using (true)', t);
    execute format('create policy public_insert on %I for insert with check (true)', t);
    execute format('create policy public_update on %I for update using (true)', t);
    execute format('create policy public_delete on %I for delete using (true)', t);
  end loop;
end $$;
