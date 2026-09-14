-- Applied through the authorized Supabase connector to Kollective Creative Engine.
-- Align the existing insert constraint with the existing website/API intents.
-- No rows deleted, no RLS policies or public read permissions changed.
alter table public.iconic_live_leads drop constraint iconic_live_leads_intent_check;
alter table public.iconic_live_leads add constraint iconic_live_leads_intent_check
check(intent in ('presale','vip','travel','merch','partners','sponsorship','media','creator','music','booking','contact'));
-- Verification: anon-role music test insertion succeeded inside BEGIN/ROLLBACK.
