import { getTicketmasterBridgeStatus } from "@/lib/ticketmaster";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getTicketmasterBridgeStatus(), {
    headers: { "Cache-Control": "no-store" },
  });
}
