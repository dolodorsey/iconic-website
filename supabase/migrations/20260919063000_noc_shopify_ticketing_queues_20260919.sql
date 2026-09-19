alter table public.noc_campaign_partners add column if not exists merch_eligible boolean not null default true;

create table if not exists public.noc_shopify_discount_queue (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.noc_campaign_partners(id) on delete cascade,
  merch_code text not null unique,
  shop_domain text not null default 'bodgeaworldwide.myshopify.com',
  collection_gid text not null default 'gid://shopify/Collection/378868957375',
  percentage numeric(5,2) not null default 75 check(percentage between 0 and 100),
  max_discounted_quantity integer not null default 4 check(max_discounted_quantity>0),
  usage_limit integer not null default 1 check(usage_limit>0),
  applies_once_per_customer boolean not null default true,
  combines_with_product_discounts boolean not null default false,
  combines_with_order_discounts boolean not null default false,
  combines_with_shipping_discounts boolean not null default false,
  status text not null default 'queued' check(status in ('queued','creating','active','failed','paused','expired')),
  shopify_discount_node_id text,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  activated_at timestamptz,
  unique(partner_id)
);
create index if not exists noc_shopify_discount_queue_status_idx on public.noc_shopify_discount_queue(status,created_at);
alter table public.noc_shopify_discount_queue enable row level security;
revoke all on public.noc_shopify_discount_queue from anon,authenticated;

create or replace function public.noc_queue_shopify_discount() returns trigger language plpgsql set search_path='' as $$
begin
  if new.status='active' and new.merch_eligible and new.merch_code is not null then
    insert into public.noc_shopify_discount_queue(partner_id,merch_code) values(new.id,new.merch_code)
    on conflict(partner_id) do update set merch_code=excluded.merch_code,updated_at=now(),
      status=case when public.noc_shopify_discount_queue.status in ('active','creating') then public.noc_shopify_discount_queue.status else 'queued' end;
  end if;
  return new;
end $$;
drop trigger if exists trg_noc_queue_shopify_discount on public.noc_campaign_partners;
create trigger trg_noc_queue_shopify_discount after insert or update of status,merch_eligible,merch_code on public.noc_campaign_partners for each row execute function public.noc_queue_shopify_discount();

create table if not exists public.noc_ticket_sales_ledger (
  id uuid primary key default gen_random_uuid(),
  provider text not null check(provider in ('ticketmaster','shopify','stripe','manual_verified_import')),
  provider_order_id text not null,
  event_key text not null default 'nightmare_on_channelside_2026',
  event_id text,
  purchaser_email text,
  purchaser_phone text,
  promo_code text,
  partner_id uuid references public.noc_campaign_partners(id) on delete set null,
  quantity integer not null default 1 check(quantity>0),
  gross_amount numeric(14,2) not null default 0 check(gross_amount>=0),
  eligible_commission_revenue numeric(14,2) not null default 0 check(eligible_commission_revenue>=0),
  currency text not null default 'USD',
  order_status text not null default 'pending' check(order_status in ('pending','settled','refunded','partially_refunded','cancelled','chargeback','fraud_hold')),
  ticket_status text not null default 'unknown' check(ticket_status in ('unknown','reserved','issued','claimed','void')),
  ordered_at timestamptz,
  settled_at timestamptz,
  raw_reference jsonb not null default '{}'::jsonb,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(provider,provider_order_id)
);
create index if not exists noc_ticket_sales_ledger_event_status_idx on public.noc_ticket_sales_ledger(event_key,order_status,ordered_at desc);
create index if not exists noc_ticket_sales_ledger_partner_idx on public.noc_ticket_sales_ledger(partner_id,order_status);
create index if not exists noc_ticket_sales_ledger_promo_idx on public.noc_ticket_sales_ledger(promo_code,order_status);
alter table public.noc_ticket_sales_ledger enable row level security;
revoke all on public.noc_ticket_sales_ledger from anon,authenticated;

create table if not exists public.noc_ticket_sync_runs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  sync_type text not null check(sync_type in ('event_details','inventory','orders','manual_import')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'running' check(status in ('running','success','partial','failed','awaiting_credentials')),
  records_seen integer not null default 0,
  records_upserted integer not null default 0,
  last_error text,
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists noc_ticket_sync_runs_status_idx on public.noc_ticket_sync_runs(provider,sync_type,started_at desc);
alter table public.noc_ticket_sync_runs enable row level security;
revoke all on public.noc_ticket_sync_runs from anon,authenticated;
