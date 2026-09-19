-- Foreign-key index hardening for the Nightmare giveaway operating system.
create index if not exists noc_giveaway_entries_channel_idx
  on public.noc_giveaway_entries(channel_id);
create index if not exists noc_giveaway_draws_prize_idx
  on public.noc_giveaway_draws(prize_id);
create index if not exists noc_giveaway_draws_channel_idx
  on public.noc_giveaway_draws(channel_id);
create index if not exists noc_giveaway_draws_winner_entry_idx
  on public.noc_giveaway_draws(winner_entry_id);
create index if not exists noc_giveaway_winners_entry_idx
  on public.noc_giveaway_winners(entry_id);
create index if not exists noc_giveaway_winners_prize_idx
  on public.noc_giveaway_winners(prize_id);
