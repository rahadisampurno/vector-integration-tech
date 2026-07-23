import type { APIRoute } from 'astro';
import { db } from '../../../../../db';
import { orders } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';

const paidStatuses = ['PAID', 'DOWNLOAD_READY', 'WAITING_LICENSE', 'COMPLETED'];

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: 'ID pesanan tidak valid.' }), { status: 400 });
    const order = await db.select().from(orders).where(eq(orders.id, id)).get();
    if (!order) return new Response(JSON.stringify({ error: 'Pesanan tidak ditemukan.' }), { status: 404 });
    if (!order.affiliate_id || !order.affiliate_commission) return new Response(JSON.stringify({ error: 'Pesanan ini tidak memiliki komisi affiliate.' }), { status: 400 });
    if (!paidStatuses.includes(order.status || '')) return new Response(JSON.stringify({ error: 'Komisi hanya dapat dibayar setelah pesanan lunas.' }), { status: 400 });
    const body = await request.json().catch(() => ({}));
    const nextStatus = body.status === 'paid' ? 'paid' : body.status === 'pending' ? 'pending' : null;
    if (!nextStatus) return new Response(JSON.stringify({ error: 'Status komisi tidak valid.' }), { status: 400 });
    await db.update(orders).set({ commission_status: nextStatus, commission_paid_at: nextStatus === 'paid' ? new Date() : null }).where(eq(orders.id, id)).run();
    return new Response(JSON.stringify({ success: true, status: nextStatus }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Gagal memperbarui status komisi.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
