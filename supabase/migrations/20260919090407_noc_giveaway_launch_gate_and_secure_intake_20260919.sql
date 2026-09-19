-- Mirrors production migration 20260919090407.
alter table public.noc_giveaway_prizes
  add column if not exists arv_status text not null default 'pending'
    check (arv_status in ('pending','provisional','approved')),
  add column if not exists arv_basis text;

update public.noc_giveaway_prizes
set unit_arv_cents=case prize_key
  when 'ticket_pair' then 30000 when 'food_bev_credit' then 5000 when 'merch_pack' then 15000
  when 'vip_booth' then 250000 when 'meet_greet_pair' then 100000 when 'afterparty_pair' then 10000
  when 'activation_merch' then 5000 when 'activation_food_bev' then 2500 when 'activation_ticket_upgrade' then 10000
  else unit_arv_cents end,
  arv_status='provisional',
  arv_basis='Planning value only; final approved ARV required before launch.',
  updated_at=now()
where prize_key in ('ticket_pair','food_bev_credit','merch_pack','vip_booth','meet_greet_pair','afterparty_pair','activation_merch','activation_food_bev','activation_ticket_upgrade');

update public.noc_giveaway_programs
set starts_at='2026-09-27 12:00:00-04', total_arv_cents=1320000, fdacs_filing_required=true,
    fdacs_filing_status='required_not_filed', trust_or_bond_status='required_not_completed', updated_at=now()
where program_key='noc26_main_sweepstakes';

update public.noc_giveaway_programs
set starts_at='2026-09-27 12:00:00-04', total_arv_cents=285000, fdacs_filing_required=null,
    fdacs_filing_status='pending_structure_review', trust_or_bond_status='pending_structure_review', updated_at=now()
where program_key='noc26_activation_giveaways';

update public.noc_giveaway_calendar
set action_type='prelaunch_teaser',channel_key=null,prize_key=null,
    content_brief='Teaser/waitlist only. Do not accept chance-based entries before compliance gate.',
    cta='WATCH @THEICONICLIVE FOR OFFICIAL ENTRY OPENING',status='planned',launch_gate='prelaunch_only_no_entries'
where event_key='nightmare_on_channelside_2026' and calendar_key='gw_20260922_launch';

update public.noc_giveaway_calendar
set action_type='comedian_teaser_live',channel_key=null,prize_key=null,
    content_brief='Comedian-hosted event promo live only; no sweepstakes entries before launch approval.',
    cta='FOLLOW @THEICONICLIVE + WATCH FOR OFFICIAL ENTRY OPENING',status='planned',launch_gate='prelaunch_only_no_entries'
where event_key='nightmare_on_channelside_2026' and calendar_key='gw_20260925_live1';

insert into public.noc_giveaway_calendar
(event_key,calendar_key,scheduled_at,phase,action_type,channel_key,prize_key,owner_role,content_brief,cta,rules_version,status,launch_gate,notes)
values('nightmare_on_channelside_2026','gw_20260927_launch','2026-09-27 12:00:00-04','LAUNCH','official_launch','instagram_comment_dm','ticket_pair','Online Giveaway Host #1',
'Earliest planned official launch if every gate is green.','TEXT NIGHTMARE / COMMENT NIGHTMARE → COMPLETE OFFICIAL ENTRY','NOC26-RULES-v1','blocked','all_launch_gates_green','Move later if any required gate remains incomplete.')
on conflict(event_key,calendar_key) do nothing;

create table if not exists public.noc_giveaway_intake_rate_limits(
  program_id uuid not null references public.noc_giveaway_programs(id) on delete cascade,
  ip_hash text not null, entry_day date not null, attempt_count integer not null default 1 check(attempt_count>0),
  last_attempt_at timestamptz not null default now(), primary key(program_id,ip_hash,entry_day)
);
alter table public.noc_giveaway_intake_rate_limits enable row level security;
revoke all on public.noc_giveaway_intake_rate_limits from anon,authenticated;
create index if not exists noc_giveaway_rate_limits_day_idx on public.noc_giveaway_intake_rate_limits(entry_day,last_attempt_at);

create or replace function public.noc_register_giveaway_entry(
  p_program_key text,p_channel_key text,p_first_name text,p_last_name text,p_email text,p_phone text,p_postal_code text,
  p_age_confirmed boolean,p_rules_version text,p_sweepstakes_consent boolean,p_sms_marketing_opt_in boolean default false,
  p_email_marketing_opt_in boolean default false,p_source_partner text default null,p_source_content text default null,
  p_ip_hash text default null,p_metadata jsonb default '{}'::jsonb
) returns jsonb language plpgsql security definer set search_path='' as $$
declare
  v_program public.noc_giveaway_programs%rowtype; v_channel public.noc_giveaway_channels%rowtype;
  v_now timestamptz:=now(); v_day date:=(timezone('America/New_York',v_now))::date; v_attempts integer;
  v_contact_hash text; v_entry_id uuid; v_phone_digits text; v_email text;
begin
  select * into v_program from public.noc_giveaway_programs where program_key=p_program_key;
  if not found then raise exception 'PROGRAM_NOT_FOUND'; end if;
  if v_program.status<>'live' or v_program.starts_at is null or v_program.ends_at is null or v_now<v_program.starts_at or v_now>v_program.ends_at then raise exception 'PROMOTION_NOT_LIVE'; end if;
  if v_program.official_rules_version is null or v_program.official_rules_version like '%DRAFT%' or p_rules_version is distinct from v_program.official_rules_version then raise exception 'RULES_VERSION_INVALID'; end if;
  select * into v_channel from public.noc_giveaway_channels where program_id=v_program.id and channel_key=p_channel_key;
  if not found or v_channel.status<>'live' then raise exception 'CHANNEL_NOT_LIVE'; end if;
  if coalesce(p_sweepstakes_consent,false) is not true then raise exception 'ENTRY_CONSENT_REQUIRED'; end if;
  if v_program.minimum_age is not null and coalesce(p_age_confirmed,false) is not true then raise exception 'AGE_CONFIRMATION_REQUIRED'; end if;
  v_email:=lower(trim(coalesce(p_email,''))); v_phone_digits:=regexp_replace(coalesce(p_phone,''),'[^0-9]','','g');
  if length(trim(coalesce(p_first_name,'')))<1 or length(trim(coalesce(p_last_name,'')))<1
     or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or length(v_phone_digits)<10
     or length(trim(coalesce(p_postal_code,'')))<5 then raise exception 'INVALID_ENTRY_FIELDS'; end if;
  if p_ip_hash is not null and length(p_ip_hash)>=16 then
    insert into public.noc_giveaway_intake_rate_limits(program_id,ip_hash,entry_day,attempt_count,last_attempt_at)
    values(v_program.id,p_ip_hash,v_day,1,v_now)
    on conflict(program_id,ip_hash,entry_day) do update
      set attempt_count=public.noc_giveaway_intake_rate_limits.attempt_count+1,last_attempt_at=excluded.last_attempt_at
    returning attempt_count into v_attempts;
    if v_attempts>25 then raise exception 'RATE_LIMITED'; end if;
  end if;
  v_contact_hash:=encode(extensions.digest(v_email||'|'||v_phone_digits,'sha256'),'hex');
  insert into public.noc_giveaway_entries(program_id,channel_id,entrant_first_name,entrant_last_name,email,phone,postal_code,age_confirmed,contact_hash,source_partner,source_content,source_code,rules_version,rules_accepted_at,sweepstakes_consent,sms_marketing_opt_in,email_marketing_opt_in,eligibility_status,verification_status,entry_day,metadata)
  values(v_program.id,v_channel.id,left(trim(p_first_name),120),left(trim(p_last_name),120),left(v_email,254),left(v_phone_digits,24),left(trim(p_postal_code),20),p_age_confirmed,v_contact_hash,left(trim(coalesce(p_source_partner,'')),160),left(trim(coalesce(p_source_content,'')),200),v_channel.source_code,p_rules_version,v_now,true,coalesce(p_sms_marketing_opt_in,false),coalesce(p_email_marketing_opt_in,false),'pending','unverified',v_day,coalesce(p_metadata,'{}'::jsonb))
  on conflict(program_id,channel_id,contact_hash,entry_day) do nothing returning id into v_entry_id;
  if v_entry_id is null then return jsonb_build_object('ok',true,'duplicate',true,'message','Entry already recorded.'); end if;
  return jsonb_build_object('ok',true,'duplicate',false,'entry_id',v_entry_id,'message','Entry received.');
end; $$;
revoke all on function public.noc_register_giveaway_entry(text,text,text,text,text,text,text,boolean,text,boolean,boolean,boolean,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.noc_register_giveaway_entry(text,text,text,text,text,text,text,boolean,text,boolean,boolean,boolean,text,text,text,jsonb) to service_role;
