import { db } from '../../../../../db';
import { orders, downloadAccesses } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import type { APIRoute } from 'astro';
import { randomBytes, createHash } from 'node:crypto';

export const POST: APIRoute = async ({ params }) => {
  const { id } = params;
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'Order ID is required' }), { status: 400 });
  }

  try {
    const order = db.select().from(orders).where(eq(orders.id, id)).get();
    
    if (!order) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    if (order.status !== 'PAYMENT_CONFIRMATION_SENT' && order.status !== 'PAYMENT_REVIEW') {
      return new Response(JSON.stringify({ error: 'Order is not waiting for verification' }), { status: 400 });
    }

    // 1. Generate Kode Download (Easy to type, eg: VT-84KM-29PX)
    const rawCodePart1 = randomBytes(2).toString('hex').toUpperCase();
    const rawCodePart2 = randomBytes(2).toString('hex').toUpperCase();
    const rawCode = `VT-${rawCodePart1}-${rawCodePart2}`;
    
    // Hash the code to store in DB
    const codeHash = createHash('sha256').update(rawCode).digest('hex');
    
    // 2. Generate URL Token (Secure 128-bit)
    const token = randomBytes(16).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');

    // Default max downloads & expiry (7 days)
    const maxDownloads = 3;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Update Status
    db.update(orders)
      .set({ status: 'DOWNLOAD_READY' })
      .where(eq(orders.id, id))
      .run();

    // Create Download Access
    db.insert(downloadAccesses).values({
      id: crypto.randomUUID(),
      order_id: id,
      download_code_hash: codeHash,
      token_hash: tokenHash,
      raw_code: rawCode,
      raw_token: token,
      max_downloads: maxDownloads,
      download_count: 0,
      expires_at: expiresAt
    }).run();

    // Return the generated raw code and token for the admin to copy and send
    return new Response(JSON.stringify({ 
      success: true, 
      download_code: rawCode,
      download_token: token,
      status: 'DOWNLOAD_READY' 
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
