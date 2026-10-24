-- Seeding is triggered from the client when tables are empty. Two mounts at once
-- (React dev double-mount, two tabs) could both see an empty table and both insert.
-- Remove any duplicates that already happened, then make the inserts idempotent.

delete from clips c
  using clips c2
  where c.ctid > c2.ctid
    and c.description = c2.description
    and c.captured_at = c2.captured_at;

delete from incidents i
  using incidents i2
  where i.ctid > i2.ctid
    and i.title = i2.title
    and i.occurred_at = i2.occurred_at;

delete from candidate_sites s
  using candidate_sites s2
  where s.ctid > s2.ctid
    and s.name = s2.name;

delete from cameras c
  using cameras c2
  where c.ctid > c2.ctid
    and c.name = c2.name;

create unique index if not exists cameras_name_key on cameras (name);
create unique index if not exists candidate_sites_name_key on candidate_sites (name);
create unique index if not exists incidents_title_occurred_key on incidents (title, occurred_at);
create unique index if not exists clips_description_captured_key on clips (description, captured_at);
