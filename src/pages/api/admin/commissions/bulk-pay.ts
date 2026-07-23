import type { APIRoute } from 'astro';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../../../../db';
import { orders } from '../../../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const ids = Array.isArray(body.ids) ? [...new Set(body.ids.filter((id: unknown) => typeof id === 'string'))] as string[] : [];
    const affiliateId = typeof body.affiliateId === 'string' ? body.affiliateId : '';
    if (!affiliateId || ids.length === 0 || ids.length > 500) {
      return Response.json({ error: 'Pilih 1–500 pesanan dari satu affiliate.' }, { status: 400 });
    }
    const eligibleOrders = await db.select().from(orders).where(and(
      inArray(orders.id, ids), eq(orders.affiliate_id, affiliateId),
      eq(orders.status, 'COMPLETED'), eq(orders.commission_status, 'pending')
    )).all();
    if (eligibleOrders.length !== ids.length) {
      return Response.json({ error: 'Ada pesanan yang tidak valid, belum selesai, berbeda affiliate, atau sudah dibayar.' }, { status: 409 });
    }
    const total = eligibleOrders.reduce((sum, order) => sum + Number(order.affiliate_commission || 0), 0);
    const paidAt = new Date();
    await db.update(orders).set({ commission_status: 'paid', commission_paid_at: paidAt }).where(and(
      inArray(orders.id, ids), eq(orders.affiliate_id, affiliateId),
      eq(orders.status, 'COMPLETED'), eq(orders.commission_status, 'pending')
    )).run();
    return Response.json({ success: true, updated: eligibleOrders.length, total, paidAt: paidAt.toISOString() });
  } catch {
    return Response.json({ error: 'Gagal memperbarui pembayaran komisi.' }, { status: 500 });
  }
};
