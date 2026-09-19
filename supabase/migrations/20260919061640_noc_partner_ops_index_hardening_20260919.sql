create index if not exists noc_street_shifts_partner_idx on public.noc_street_shifts(partner_id,status);
alter table public.noc_partner_applications drop constraint if exists noc_partner_applications_converted_partner_id_fkey;
alter table public.noc_partner_applications add constraint noc_partner_applications_converted_partner_id_fkey
  foreign key(converted_partner_id) references public.noc_campaign_partners(id) on delete set null;
