import {
  commitTicketmasterCart,
  reserveTicketmasterCart,
  ticketmasterErrorResponse,
} from "@/lib/ticketmaster";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const body = await request.json();
    if (!body?.reserve) {
      return Response.json({ error: "reserve payload is required." }, { status: 400 });
    }

    const cart = await reserveTicketmasterCart(params.eventId, body.reserve);
    return Response.json(cart, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return ticketmasterErrorResponse(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { eventId: string } },
) {
  try {
    const body = await request.json();
    if (!body?.cart_id) {
      return Response.json({ error: "cart_id is required." }, { status: 400 });
    }

    const order = await commitTicketmasterCart(params.eventId, body);
    return Response.json(order, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return ticketmasterErrorResponse(error);
  }
}
