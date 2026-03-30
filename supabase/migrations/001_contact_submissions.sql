-- Exécuter ce script dans Supabase → SQL Editor (nouveau projet ou existant).
-- Les insertions depuis l’API Next.js utilisent la clé service_role (contourne RLS).

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text not null default '',
  project_type text not null default '',
  message text not null
);

comment on table public.contact_submissions is 'Messages du formulaire contact (site Bredly)';

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Aucune policy : l’anon ne lit/écrit pas. La service_role bypass RLS pour l’API serveur.
