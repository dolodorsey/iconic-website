alter table public.noc_campaign_partners
  add column if not exists promo_bonus_amount numeric(12,2) not null default 0 check (promo_bonus_amount >= 0),
  add column if not exists promo_bonus_trigger text,
  add column if not exists sellout_bonus_eligible boolean not null default false,
  add column if not exists sellout_bonus_status text not null default 'not_applicable'
    check (sellout_bonus_status in ('not_applicable','pending','earned','issued','forfeited')),
  add column if not exists hospitality_access_status text not null default 'included'
    check (hospitality_access_status in ('included','confirmed','issued','used','restricted','waived')),
  add column if not exists afterparty_access_status text not null default 'included'
    check (afterparty_access_status in ('included','confirmed','issued','used','restricted','waived')),
  add column if not exists benefits_notes text;

insert into public.noc_campaign_config(config_key,config_value,is_secret,notes)
values(
  'personnel_benefits_20260919',
  jsonb_build_object(
    'all_activated_personnel',jsonb_build_array(
      'complimentary event-day meal',
      'complimentary beverage',
      'VIP bar access',
      'credentialed access to official ICONIC LIVE after-parties associated with Nightmare on Channelside'
    ),
    'paid_promotional_personnel',jsonb_build_object(
      'additional_bonus',true,
      'amount_source','personalized compensation sheet',
      'release_condition','verified completion of assigned promotional deliverables'
    ),
    'noncash_promotional_personnel',jsonb_build_object(
      'sellout_bonus_trigger','official event sellout + completed assigned deliverables',
      'package',jsonb_build_array(
        'massage gift certificate',
        'additional gift selected by ICONIC LIVE',
        'bonus merchandise',
        'future ICONIC LIVE tickets and/or backstage-access opportunities'
      ),
      'consideration_opportunities',jsonb_build_array(
        'potential touring-company job',
        'possible endorsement consideration from an individual BEVCO beverage brand'
      )
    ),
    'controls',jsonb_build_array(
      'alcohol service only to legally eligible guests',
      'after-party and backstage access subject to credential, capacity, security, venue and artist-management restrictions',
      'touring-company work and BEVCO endorsements require separate selection and agreement'
    )
  ),
  false,
  'Authoritative personnel benefit/bonus configuration for Nightmare on Channelside.'
)
on conflict(config_key) do update
set config_value=excluded.config_value, notes=excluded.notes, updated_at=now();
