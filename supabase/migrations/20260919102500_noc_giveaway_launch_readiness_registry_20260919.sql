create table if not exists public.noc_giveaway_launch_gates (
  id uuid primary key default gen_random_uuid(),
  event_key text not null references public.noc_campaign_control(event_key) on delete cascade,
  program_key text not null references public.noc_giveaway_programs(program_key) on delete cascade,
  gate_key text not null,
  gate_name text not null,
  owner_role text,
  status text not null default 'blocked' check (status in ('blocked','in_progress','ready_for_review','approved','not_required')),
  required_evidence text[] not null default '{}'::text[],
  evidence jsonb not null default '{}'::jsonb,
  blocker text,
  due_at timestamptz,
  approved_at timestamptz,
  approved_by text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(program_key,gate_key)
);
alter table public.noc_giveaway_launch_gates enable row level security;
revoke all on public.noc_giveaway_launch_gates from anon,authenticated;

-- Seeded production registry includes Sponsor/Operator, Official Rules, ARV/inventory, FDACS,
-- trust/bond, ticket inventory, venue F&B, VIP booth, meet & greet, after-party,
-- Tampa HighLevel auth, GHL materialization, and technical QA gates.

create or replace view public.noc_giveaway_launch_readiness as
select
  g.event_key,g.program_key,
  count(*) as total_gates,
  count(*) filter(where g.status in ('approved','not_required')) as cleared_gates,
  count(*) filter(where g.status='blocked') as blocked_gates,
  count(*) filter(where g.status='in_progress') as in_progress_gates,
  bool_and(g.status in ('approved','not_required')) as launch_ready,
  jsonb_agg(jsonb_build_object(
    'gate_key',g.gate_key,'gate_name',g.gate_name,'status',g.status,
    'owner_role',g.owner_role,'blocker',g.blocker,'due_at',g.due_at
  ) order by g.due_at nulls last,g.gate_key) as gates
from public.noc_giveaway_launch_gates g
group by g.event_key,g.program_key;

revoke all on public.noc_giveaway_launch_readiness from anon,authenticated;
