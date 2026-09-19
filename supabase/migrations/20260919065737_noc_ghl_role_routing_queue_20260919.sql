alter table public.noc_partner_applications
  add column if not exists ghl_sync_status text not null default 'queued'
    check (ghl_sync_status in ('queued','blocked_iam','syncing','synced','failed')),
  add column if not exists ghl_contact_id text,
  add column if not exists ghl_opportunity_id text,
  add column if not exists ghl_last_error text,
  add column if not exists ghl_synced_at timestamptz;

create table if not exists public.noc_ghl_partner_sync_queue (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.noc_partner_applications(id) on delete cascade,
  pipeline_key text not null,
  target_location_id text not null default 'rlQrPJzNgIauNFkZ2equ',
  target_stage text not null default 'Prospect',
  status text not null default 'blocked_iam'
    check (status in ('queued','blocked_iam','syncing','synced','failed')),
  desired_payload jsonb not null default '{}'::jsonb,
  ghl_contact_id text,
  ghl_opportunity_id text,
  attempt_count integer not null default 0,
  last_error text,
  last_attempt_at timestamptz,
  synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(application_id)
);
create index if not exists noc_ghl_partner_sync_queue_status_idx
  on public.noc_ghl_partner_sync_queue(status,pipeline_key,created_at);
alter table public.noc_ghl_partner_sync_queue enable row level security;
revoke all on public.noc_ghl_partner_sync_queue from anon,authenticated;

create or replace function public.noc_queue_ghl_partner_application()
returns trigger
language plpgsql
set search_path=''
as $$
begin
  insert into public.noc_ghl_partner_sync_queue(
    application_id,pipeline_key,target_location_id,target_stage,status,desired_payload,last_error
  )
  values(
    new.id,new.pipeline_key,'rlQrPJzNgIauNFkZ2equ','Prospect','blocked_iam',
    jsonb_build_object(
      'full_name',new.full_name,'display_name',new.display_name,'email',new.email,'phone',new.phone,
      'instagram',new.instagram,'tiktok',new.tiktok,'city',new.city,'requested_role',new.requested_role,
      'role_profile',new.role_profile,'referral_source',new.referral_source,
      'future_opportunities_interest',new.future_opportunities_interest,
      'source','ICONIC LIVE Partners Website','application_url',new.application_url
    ),
    'HighLevel ICONIC LIVE connector currently returns IAM/scope 401. Application is correctly routed and held for sync.'
  )
  on conflict(application_id) do update set
    pipeline_key=excluded.pipeline_key,
    desired_payload=excluded.desired_payload,
    updated_at=now();
  return new;
end;
$$;
drop trigger if exists trg_noc_queue_ghl_partner_application on public.noc_partner_applications;
create trigger trg_noc_queue_ghl_partner_application
after insert on public.noc_partner_applications
for each row execute function public.noc_queue_ghl_partner_application();

insert into public.noc_campaign_config(config_key,config_value,is_secret,notes)
values(
  'ghl_form_routing',
  jsonb_build_object(
    'location_id','rlQrPJzNgIauNFkZ2equ',
    'routing',jsonb_build_object(
      'promoter_commission','noc_partner_program',
      'promoter_comp','noc_partner_program',
      'ambassador_model','noc_partner_program',
      'dj_promo','noc_partner_program',
      'host_promo','noc_partner_program',
      'podcast_partner','noc_media_podcast',
      'dj_performance','noc_performance_talent',
      'host_performance','noc_performance_talent',
      'street_team','noc_street_team'
    ),
    'current_sync_state','blocked_iam',
    'website_forms_active',true
  ),
  false,
  'Every public personnel form is mapped to its exact future GHL pipeline before sync.'
)
on conflict(config_key) do update
set config_value=excluded.config_value,notes=excluded.notes,updated_at=now();
