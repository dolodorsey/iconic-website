alter table public.noc_campaign_partners
  add column if not exists touring_review_status text not null default 'not_reviewed'
    check (touring_review_status in ('not_reviewed','consider','selected','not_prioritized','separate_agreement')),
  add column if not exists bevco_review_status text not null default 'not_reviewed'
    check (bevco_review_status in ('not_reviewed','consider','selected','not_prioritized','separate_agreement'));

update public.noc_campaign_config
set config_value = config_value || jsonb_build_object(
  'post_campaign_review', jsonb_build_object(
    'touring_review_field','touring_review_status',
    'bevco_review_field','bevco_review_status',
    'selection_requires_separate_agreement',true
  )
),
updated_at=now()
where config_key='personnel_benefits_20260919';