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
  if length(trim(coalesce(p_first_name,'')))<1 or length(trim(coalesce(p_last_name,'')))<1 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or length(v_phone_digits)<10 or length(trim(coalesce(p_postal_code,'')))<5 then raise exception 'INVALID_ENTRY_FIELDS'; end if;
  if p_ip_hash is not null and length(p_ip_hash)>=16 then
    insert into public.noc_giveaway_intake_rate_limits(program_id,ip_hash,entry_day,attempt_count,last_attempt_at)
    values(v_program.id,p_ip_hash,v_day,1,v_now)
    on conflict(program_id,ip_hash,entry_day) do update set attempt_count=public.noc_giveaway_intake_rate_limits.attempt_count+1,last_attempt_at=excluded.last_attempt_at
    returning attempt_count into v_attempts;
    if v_attempts>25 then raise exception 'RATE_LIMITED'; end if;
  end if;
  v_contact_hash:=encode(extensions.digest(v_email||'|'||v_phone_digits,'sha256'),'hex');
  insert into public.noc_giveaway_entries(program_id,channel_id,entrant_first_name,entrant_last_name,email,phone,postal_code,age_confirmed,contact_hash,source_partner,source_content,source_code,rules_version,rules_accepted_at,sweepstakes_consent,sms_marketing_opt_in,email_marketing_opt_in,eligibility_status,verification_status,entry_day,metadata)
  values(v_program.id,v_channel.id,left(trim(p_first_name),120),left(trim(p_last_name),120),left(v_email,254),left(v_phone_digits,24),left(trim(p_postal_code),20),p_age_confirmed,v_contact_hash,left(trim(coalesce(p_source_partner,'')),160),left(trim(coalesce(p_source_content,'')),200),v_channel.source_code,p_rules_version,v_now,true,coalesce(p_sms_marketing_opt_in,false),coalesce(p_email_marketing_opt_in,false),'pending','unverified',v_day,coalesce(p_metadata,'{}'::jsonb))
  on conflict(program_id,contact_hash,entry_day) do nothing returning id into v_entry_id;
  if v_entry_id is null then return jsonb_build_object('ok',true,'duplicate',true,'message','Your official entry for today is already recorded. Additional channels do not create extra odds.'); end if;
  return jsonb_build_object('ok',true,'duplicate',false,'entry_id',v_entry_id,'message','Entry received.');
end; $$;
revoke all on function public.noc_register_giveaway_entry(text,text,text,text,text,text,text,boolean,text,boolean,boolean,boolean,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.noc_register_giveaway_entry(text,text,text,text,text,text,text,boolean,text,boolean,boolean,boolean,text,text,text,jsonb) to service_role;
