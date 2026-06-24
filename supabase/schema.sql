-- ============================================================
-- MEC Dashboard — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Projects table
create table if not exists projects (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text unique not null,
  category             text not null,
  location             text,
  image_url            text,
  title_en             text not null,
  title_ar             text not null,
  description_en       text,
  description_ar       text,
  full_description_en  text,
  full_description_ar  text,
  features_en          jsonb default '[]'::jsonb,
  features_ar          jsonb default '[]'::jsonb,
  mec_role_en          text,
  mec_role_ar          text,
  published            boolean default true,
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

-- News table
create table if not exists news (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  date         date not null,
  image_url    text,
  linkedin_url text,
  title_en     text not null,
  title_ar     text not null,
  excerpt_en   text,
  excerpt_ar   text,
  content_en   text,
  content_ar   text,
  published    boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Auto-update updated_at on row change
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at before update on projects
  for each row execute procedure update_updated_at();

create trigger news_updated_at before update on news
  for each row execute procedure update_updated_at();

-- Enable Row Level Security
alter table projects enable row level security;
alter table news enable row level security;

-- Allow public (anon) to read published records
create policy "Public can read published projects"
  on projects for select
  using (published = true);

create policy "Public can read published news"
  on news for select
  using (published = true);

-- Service role (used by the dashboard) bypasses RLS automatically
