import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.56.1";

const ALLOWED_ORIGINS = [
  "https://iconic-atl.com",
  "https://www.iconic-atl.com",
  "http://localhost:3000",
  "http://localhost:3100",
  "http://localhost:3200",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3100",
  "http://127.0.0.1:3200",
];

function cors(origin: string | null) {
  const allowed = origin && (ALLOWED_ORIGINS.includes(origin) || /^https:\/\/iconic-website[^/]*\.vercel\.app$/.test(origin));
  return {
    "Access-Control-Allow-Origin": allowed ? origin! : "https://iconic-atl.com",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...cors(origin) },
  });
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRole) return json({ error: "Service unavailable." }, 503, origin);

  const db = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (req.method === "GET") {
    const { data, error } = await db
      .from("noc_giveaway_programs")
      .select("program_key,program_name,status,starts_at,ends_at,no_purchase_required,minimum_age,geography,official_rules_version,total_arv_cents,public_copy")
      .eq("program_key", "noc26_main_sweepstakes")
      .maybeSingle();

    if (error || !data) return json({ error: "Giveaway status unavailable." }, 503, origin);

    const now = Date.now();
    const starts = data.starts_at ? Date.parse(data.starts_at) : Number.POSITIVE_INFINITY;
    const ends = data.ends_at ? Date.parse(data.ends_at) : 0;
    const entryOpen =
      data.status === "live" &&
      !String(data.official_rules_version || "").includes("DRAFT") &&
      now >= starts &&
      now <= ends;

    return json({
      ok: true,
      entry_open: entryOpen,
      program_name: data.program_name,
      status: data.status,
      starts_at: data.starts_at,
      ends_at: data.ends_at,
      minimum_age: data.minimum_age,
      no_purchase_required: data.no_purchase_required,
      rules_version: data.official_rules_version,
      public_copy: data.public_copy,
    }, 200, origin);
  }

  if (req.method !== "POST") return json({ error: "Method not allowed." }, 405, origin);

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > 24_000) return json({ error: "Request too large." }, 413, origin);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request." }, 400, origin);
  }

  // Honeypot: look successful to bots without creating data.
  if (clean(body.website, 120)) return json({ ok: true, duplicate: false, message: "Entry received." }, 201, origin);

  const firstName = clean(body.first_name, 120);
  const lastName = clean(body.last_name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const postalCode = clean(body.postal_code, 20);
  const channelKey = clean(body.channel_key, 80) || "instagram_comment_dm";
  const rulesVersion = clean(body.rules_version, 120);
  const sourcePartner = clean(body.source_partner, 160);
  const sourceContent = clean(body.source_content, 200);

  if (!firstName || !lastName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Enter a valid name and email." }, 400, origin);
  }
  if (phone.replace(/\D/g, "").length < 10 || postalCode.length < 5) {
    return json({ error: "Enter a valid mobile number and ZIP/postal code." }, 400, origin);
  }
  if (body.age_confirmed !== true || body.sweepstakes_consent !== true) {
    return json({ error: "Eligibility and Official Rules acceptance are required." }, 400, origin);
  }

  const rawIp =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";
  const ipHash = await sha256("noc26|" + rawIp);

  const { data, error } = await db.rpc("noc_register_giveaway_entry", {
    p_program_key: "noc26_main_sweepstakes",
    p_channel_key: channelKey,
    p_first_name: firstName,
    p_last_name: lastName,
    p_email: email,
    p_phone: phone,
    p_postal_code: postalCode,
    p_age_confirmed: true,
    p_rules_version: rulesVersion,
    p_sweepstakes_consent: true,
    p_sms_marketing_opt_in: body.sms_marketing_opt_in === true,
    p_email_marketing_opt_in: body.email_marketing_opt_in === true,
    p_source_partner: sourcePartner || null,
    p_source_content: sourceContent || null,
    p_ip_hash: ipHash,
    p_metadata: {
      user_agent: clean(req.headers.get("user-agent"), 500),
      origin: origin || null,
      submitted_via: "noc-giveaway-entry-edge-v1",
    },
  });

  if (error) {
    const message = String(error.message || "");
    if (message.includes("PROMOTION_NOT_LIVE")) return json({ error: "Official entries are not open yet." }, 409, origin);
    if (message.includes("RULES_VERSION_INVALID")) return json({ error: "Rules were updated. Refresh and try again." }, 409, origin);
    if (message.includes("CHANNEL_NOT_LIVE")) return json({ error: "This entry channel is not open yet." }, 409, origin);
    if (message.includes("RATE_LIMITED")) return json({ error: "Too many attempts. Try again later." }, 429, origin);
    if (message.includes("INVALID_ENTRY_FIELDS")) return json({ error: "Please check your entry details." }, 400, origin);
    console.error("giveaway rpc error", { code: error.code, message: error.message });
    return json({ error: "We could not record your entry." }, 500, origin);
  }

  return json(data, 201, origin);
});