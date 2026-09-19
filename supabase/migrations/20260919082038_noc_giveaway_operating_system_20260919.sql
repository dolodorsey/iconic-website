-- Nightmare on Channelside 2026 — Giveaway / Sweepstakes operating system
-- Supabase production migration: 20260919082038
-- Public browser roles are intentionally denied. Entry writes must pass through a server-side
-- endpoint/workflow so rules acceptance, dedupe, abuse controls and consent semantics are enforced.

create table public.noc_giveaway_programs (
  id uuid primary key default gen_random_uuid(),
  event_key text not null references public.noc_campaign_control(event_key) on delete cascade,
  program_key text not null unique,
  program_name text not null,
  program_type text not null check (program_type in ('main_sweepstakes','activation_giveaway','partner_giveaway')),
  legal_label text not null default 'Promotional Giveaway / Sweepstakes',
  status text not null default 'draft_legal' check (status in ('draft_legal','qa','approved','live','paused','ended','archived')),
  timezone text not null default 'America/New_York',
  starts_at timestamptz,
  ends_at timestamptz,
  no_purchase_required boolean not null default true,
  minimum_age integer,
  geography text,
  official_rules_url text,
  official_rules_version text,
  total_arv_cents bigint,
  fdacs_filing_required boolean,
  fdacs_filing_status text not null default 'pending_arv_review',
  trust_or_bond_status text not null default 'pending_arv_review',
  launch_gate jsonb not null default '{}'::jsonb,
  public_copy jsonb not null default '{}'::jsonb,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.noc_giveaway_prizes (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.noc_giveaway_programs(id) on delete cascade,
  prize_key text not null,
  prize_category text not null check (prize_category in ('tickets','food_beverage','merch','vip_booth','meet_greet','after_party','other')),
  display_name text not null,
  quantity_available integer not null default 0 check (quantity_available >= 0),
  quantity_reserved integer not null default 0 check (quantity_reserved >= 0),
  unit_arv_cents bigint,
  public_eligible boolean not null default false,
  approval_status text not null default 'pending' check (approval_status in ('pending','approved','rejected','not_required')),
  approval_owner text,
  restrictions jsonb not null default '{}'::jsonb,
  fallback_prize_key text,
  fulfillment_owner_role text,
  inventory_source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(program_id, prize_key)
);

create table public.noc_giveaway_channels (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.noc_giveaway_programs(id) on delete cascade,
  channel_key text not null,
  channel_type text not null check (channel_type in ('text','call','instagram','radio_podcast','field_activation','onsite_wheel','web')),
  display_name text not null,
  status text not null default 'planned' check (status in ('planned','qa','approved','live','paused','ended')),
  entry_instructions text not null,
  entry_url text,
  keyword text,
  phone text,
  source_code text not null,
  max_entries_per_person_per_day integer not null default 1 check (max_entries_per_person_per_day > 0),
  marketing_opt_in_separate boolean not null default true,
  requires_rules_acceptance boolean not null default true,
  requires_partner_rules boolean not null default false,
  eligible_prize_categories text[] not null default '{}'::text[],
  verification_rules jsonb not null default '{}'::jsonb,
  tracking_params jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(program_id, channel_key)
);

create table public.noc_giveaway_entries (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.noc_giveaway_programs(id) on delete cascade,
  channel_id uuid not null references public.noc_giveaway_channels(id) on delete restrict,
  entrant_first_name text,
  entrant_last_name text,
  email text,
  phone text,
  postal_code text,
  age_confirmed boolean,
  contact_hash text not null,
  source_partner text,
  source_content text,
  source_code text,
  rules_version text not null,
  rules_accepted_at timestamptz not null,
  sweepstakes_consent boolean not null default false,
  sms_marketing_opt_in boolean not null default false,
  email_marketing_opt_in boolean not null default false,
  eligibility_status text not null default 'pending'
    check (eligibility_status in ('pending','eligible','ineligible','duplicate','fraud_review','withdrawn')),
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified','verified_contact','verified_eligibility','rejected')),
  entry_day date not null default (timezone('America/New_York', now()))::date,
  submitted_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create unique index noc_giveaway_entries_daily_dedupe
  on public.noc_giveaway_entries(program_id, channel_id, contact_hash, entry_day);

create index noc_giveaway_entries_eligibility_idx
  on public.noc_giveaway_entries(program_id, eligibility_status, submitted_at);

create table public.noc_giveaway_draws (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.noc_giveaway_programs(id) on delete cascade,
  draw_key text not null,
  prize_id uuid not null references public.noc_giveaway_prizes(id) on delete restrict,
  channel_id uuid references public.noc_giveaway_channels(id) on delete set null,
  scheduled_at timestamptz not null,
  selection_scope text not null default 'all_eligible'
    check (selection_scope in ('all_eligible','channel_specific','partner_specific','onsite_verified')),
  selection_method text not null default 'cryptographic_random',
  status text not null default 'scheduled'
    check (status in ('scheduled','locked','drawn','notified','fulfilled','voided')),
  eligible_entry_count integer,
  winner_entry_id uuid references public.noc_giveaway_entries(id) on delete set null,
  randomization_proof jsonb not null default '{}'::jsonb,
  witnessed_by text[],
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(program_id, draw_key)
);

create table public.noc_giveaway_winners (
  id uuid primary key default gen_random_uuid(),
  draw_id uuid not null unique references public.noc_giveaway_draws(id) on delete cascade,
  entry_id uuid not null references public.noc_giveaway_entries(id) on delete restrict,
  prize_id uuid not null references public.noc_giveaway_prizes(id) on delete restrict,
  notification_status text not null default 'pending'
    check (notification_status in ('pending','contacted','confirmed','unreachable','declined','expired')),
  notified_at timestamptz,
  claim_deadline timestamptz,
  identity_verified_at timestamptz,
  age_verified_at timestamptz,
  affidavit_required boolean not null default false,
  affidavit_status text not null default 'not_required'
    check (affidavit_status in ('not_required','pending','received','rejected')),
  fulfillment_status text not null default 'pending'
    check (fulfillment_status in ('pending','scheduled','fulfilled','substituted','cancelled')),
  fulfilled_at timestamptz,
  fulfillment_proof text,
  public_winner_name text,
  winner_list_reportable boolean not null default false,
  internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.noc_giveaway_personnel_slots (
  id uuid primary key default gen_random_uuid(),
  event_key text not null references public.noc_campaign_control(event_key) on delete cascade,
  slot_key text not null,
  role_name text not null,
  preferred_profile text,
  owner_name text,
  accountable_to text,
  responsibilities text[] not null default '{}'::text[],
  scheduled_windows jsonb not null default '[]'::jsonb,
  status text not null default 'unassigned'
    check (status in ('unassigned','sourcing','assigned','confirmed','complete')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_key, slot_key)
);

create table public.noc_giveaway_calendar (
  id uuid primary key default gen_random_uuid(),
  event_key text not null references public.noc_campaign_control(event_key) on delete cascade,
  calendar_key text not null,
  scheduled_at timestamptz not null,
  phase text not null,
  action_type text not null,
  channel_key text,
  prize_key text,
  owner_role text,
  content_brief text,
  cta text,
  rules_version text,
  status text not null default 'planned'
    check (status in ('planned','qa','approved','scheduled','live','complete','blocked','cancelled')),
  launch_gate text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_key, calendar_key)
);

alter table public.noc_giveaway_programs enable row level security;
alter table public.noc_giveaway_prizes enable row level security;
alter table public.noc_giveaway_channels enable row level security;
alter table public.noc_giveaway_entries enable row level security;
alter table public.noc_giveaway_draws enable row level security;
alter table public.noc_giveaway_winners enable row level security;
alter table public.noc_giveaway_personnel_slots enable row level security;
alter table public.noc_giveaway_calendar enable row level security;

revoke all on public.noc_giveaway_programs from anon, authenticated;
revoke all on public.noc_giveaway_prizes from anon, authenticated;
revoke all on public.noc_giveaway_channels from anon, authenticated;
revoke all on public.noc_giveaway_entries from anon, authenticated;
revoke all on public.noc_giveaway_draws from anon, authenticated;
revoke all on public.noc_giveaway_winners from anon, authenticated;
revoke all on public.noc_giveaway_personnel_slots from anon, authenticated;
revoke all on public.noc_giveaway_calendar from anon, authenticated;
