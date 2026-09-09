import {
  getTicketmasterEvent,
  ticketmasterErrorResponse,
} from "@/lib/ticketmaster";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const event = await getTicketmasterEvent(params.eventId);
    return Response.json(event, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return ticketmasterErrorResponse(error);
  }
}
