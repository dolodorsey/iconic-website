drop index if exists public.noc_giveaway_entries_daily_dedupe;
create unique index noc_giveaway_entries_daily_dedupe on public.noc_giveaway_entries(program_id,contact_hash,entry_day);
comment on index public.noc_giveaway_entries_daily_dedupe is 'One official entry per person per day across the main promotion; channel is attribution, not extra odds.';
