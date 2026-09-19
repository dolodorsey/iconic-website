alter table public.noc_partner_applications
  add column if not exists role_profile jsonb not null default '{}'::jsonb,
  add column if not exists application_version text not null default 'partners_v2_20260919',
  add column if not exists application_url text,
  add column if not exists future_opportunities_interest boolean not null default true;

alter table public.noc_partner_applications
  add column if not exists pipeline_key text generated always as (
    case requested_role
      when 'podcast_partner' then 'noc_media_podcast'
      when 'dj_performance' then 'noc_performance_talent'
      when 'host_performance' then 'noc_performance_talent'
      when 'street_team' then 'noc_street_team'
      else 'noc_partner_program'
    end
  ) stored;

create index if not exists noc_partner_applications_pipeline_idx
  on public.noc_partner_applications(pipeline_key,status,created_at desc);

revoke insert(role_profile,application_version,application_url,future_opportunities_interest)
  on public.noc_partner_applications from anon,authenticated;
grant insert(role_profile,application_version,application_url,future_opportunities_interest)
  on public.noc_partner_applications to anon,authenticated;

insert into public.noc_campaign_config(config_key,config_value,is_secret,notes)
values
('public_site',jsonb_build_object(
  'base_url','https://iconic-website-ten.vercel.app',
  'partners_url','https://iconic-website-ten.vercel.app/partners',
  'status','temporary_until_custom_domain'
),false,'Temporary public ICONIC LIVE website URL. Do not publish iconic-atl.com while this config is active.'),
('future_pipeline',jsonb_build_object(
  'message','Strong personnel from Tampa can be considered first for future ICONIC LIVE markets and touring properties.',
  'properties',jsonb_build_array(
    jsonb_build_object('name','Nightmare on Channelside','next_market','Atlanta','target_window','December 2026','status','target / subject to confirmation'),
    jsonb_build_object('name','Summer Walker — Soul Symphony','type','tour','status','planned / development'),
    jsonb_build_object('name','DJ Snake — Pardon My French','type','tour','status','planned / development'),
    jsonb_build_object('name','Additional ICONIC LIVE concerts, tours and activations','type','pipeline','status','ongoing development')
  )
),false,'Internal/public inspiration copy should describe future items as targets/plans unless formally confirmed.')
on conflict(config_key) do update set config_value=excluded.config_value,notes=excluded.notes,updated_at=now();

update public.noc_campaign_config
set config_value=jsonb_set(coalesce(config_value,'{}'::jsonb),'{owned_link_pattern}',to_jsonb('https://iconic-website-ten.vercel.app/go/{PROMO_CODE}'::text),true),
    updated_at=now()
where config_key='ticketing';

update public.noc_campaign_partners
set tracking_url=replace(tracking_url,'https://iconic-atl.com','https://iconic-website-ten.vercel.app')
where tracking_url like 'https://iconic-atl.com/%';

update public.noc_promo_codes
set tracking_url=replace(tracking_url,'https://iconic-atl.com','https://iconic-website-ten.vercel.app'),
    updated_at=now()
where tracking_url like 'https://iconic-atl.com/%';
