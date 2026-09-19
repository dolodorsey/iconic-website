create or replace function public.noc_partner_code()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  city_code text;
  role_code text;
  suffix text;
begin
  city_code := upper(left(regexp_replace(coalesce(new.city,'XXX'), '[^A-Za-z]', '', 'g'), 3));
  role_code := case new.role
    when 'promoter_commission' then 'PRO'
    when 'promoter_comp' then 'CMP'
    when 'ambassador_model' then 'AMB'
    when 'podcast_partner' then 'POD'
    when 'dj_promo' then 'DJP'
    when 'host_promo' then 'HST'
    when 'dj_performance' then 'DJS'
    when 'host_performance' then 'HSP'
    when 'street_team' then 'STR'
    else 'PRT'
  end;
  suffix := lpad(new.partner_number::text, 5, '0');
  if new.promo_code is null or new.promo_code = '' then
    new.promo_code := 'NOC-' || city_code || '-' || role_code || '-' || suffix;
  end if;
  if new.tracking_url is null or new.tracking_url = '' then
    new.tracking_url := 'https://iconic-website-ten.vercel.app/go/' || new.promo_code;
  end if;
  if new.merch_code is null or new.merch_code = '' then
    new.merch_code := 'NOCMERCH-' || suffix;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

update public.noc_campaign_partners
set tracking_url=replace(tracking_url,'https://iconic-atl.com','https://iconic-website-ten.vercel.app'),
    updated_at=now()
where tracking_url like 'https://iconic-atl.com/%';

update public.noc_promo_codes
set tracking_url=replace(tracking_url,'https://iconic-atl.com','https://iconic-website-ten.vercel.app'),
    updated_at=now()
where tracking_url like 'https://iconic-atl.com/%';
