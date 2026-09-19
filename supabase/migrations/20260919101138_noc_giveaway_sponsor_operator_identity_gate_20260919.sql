update public.noc_giveaway_programs
set launch_gate =
      jsonb_set(
        jsonb_set(launch_gate,'{sponsor_operator_confirmed}','false'::jsonb,true),
        '{public_presenter_identity_reconciled}','false'::jsonb,true
      ),
    internal_notes = coalesce(internal_notes,'') ||
      E'\nSponsor/Operator identity hold added 2026-09-19: Benchmark International Arena public release identifies the event as presented by Tampa 813 Events × The Mark Oliver Show, while internal operations identify ICONIC LIVE as producer. Tampa 813 Events LLC appears as an active Florida LLC (document L26000411409), but no executed event contract in the connected files yet proves which legal entity must be the sweepstakes Sponsor/Operator. Do not finalize or file Official Rules until contract-level authority is confirmed.',
    updated_at=now()
where event_key='nightmare_on_channelside_2026';
