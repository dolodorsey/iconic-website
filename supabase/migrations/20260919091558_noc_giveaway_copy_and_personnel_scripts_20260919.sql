create table if not exists public.noc_giveaway_copy_library (
  id uuid primary key default gen_random_uuid(),
  event_key text not null references public.noc_campaign_control(event_key) on delete cascade,
  copy_key text not null,
  copy_type text not null,
  phase text not null check (phase in ('prelaunch','live','winner','activation','internal')),
  channel text not null,
  title text not null,
  body text not null,
  cta text,
  required_footer text,
  rules_version text,
  status text not null default 'draft' check (status in ('draft','qa','approved','retired')),
  launch_gate text,
  owner_role text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_key,copy_key)
);
alter table public.noc_giveaway_copy_library enable row level security;
revoke all on public.noc_giveaway_copy_library from anon,authenticated;

-- Seeded production copy keys:
-- prelaunch_ig_teaser, prelaunch_comedian_live, live_ig_caption_ticket,
-- live_text_reply, live_call_host, partner_20sec_read, ig_comment_reply,
-- winner_first_notice, winner_confirmed, wheel_operator.
-- Content is stored in KOLLECTIVE BOH and remains gated by phase/status/rules version.
