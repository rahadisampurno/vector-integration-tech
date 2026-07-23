import { db } from '../../../../db';
import { orders } from '../../../../db/schema';
import { eq } from 'drizzle-orm';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
  const { id } = params;
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'Order ID is required' }), { status: 400 });
  }

  try {
    const order = await db.select().from(orders).where(eq(orders.id, id)).get();
    
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    const body = await request.json().catch(() => ({}));
    const { senderName, senderBank } = body;

    if (order.status === 'WAITING_PAYMENT') {
      await db.update(orders)
        .set({ 
          status: 'PAYMENT_CONFIRMATION_SENT',
          sender_name: senderName || null,
          sender_bank: senderBank || null
        })
        .where(eq(orders.id, id))
        .run();
    }

    return new Response(JSON.stringify({ success: true, status: 'PAYMENT_CONFIRMATION_SENT' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
