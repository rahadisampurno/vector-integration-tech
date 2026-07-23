import { db } from '../../../db';
import { downloadAccesses, orders } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { token, code } = await request.json();

    if (!token || !code) {
      return new Response(JSON.stringify({ error: 'Token and code are required' }), { status: 400 });
    }

    const tokenHash = createHash('sha256').update(token).digest('hex');
    const access = await db.select().from(downloadAccesses).where(eq(downloadAccesses.token_hash, tokenHash)).get();

    if (!access) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 404 });
    }

    // Check expiration
    if (new Date() > new Date(access.expires_at)) {
      return new Response(JSON.stringify({ error: 'Tautan kedaluwarsa.' }), { status: 403 });
    }

    // Check limit
    if (access.download_count >= access.max_downloads) {
      return new Response(JSON.stringify({ error: 'Batas maksimal unduhan tercapai.' }), { status: 403 });
    }

    // Hash the input code and compare
    const inputCodeHash = createHash('sha256').update(code).digest('hex');
    
    if (inputCodeHash !== access.download_code_hash) {
      // In a real app, we should also track failed attempts here (rate limiting)
      return new Response(JSON.stringify({ error: 'Kode salah. Periksa kembali kode dari WhatsApp.' }), { status: 401 });
    }

    // Order status must be DOWNLOAD_READY, WAITING_LICENSE, or COMPLETED
    const order = await db.select().from(orders).where(eq(orders.id, access.order_id)).get();
    if (!order || (order.status !== 'DOWNLOAD_READY' && order.status !== 'WAITING_LICENSE' && order.status !== 'COMPLETED')) {
      return new Response(JSON.stringify({ error: 'Pesanan belum valid untuk diunduh.' }), { status: 403 });
    }

    // Update download count
    await db.update(downloadAccesses)
      .set({ download_count: access.download_count + 1 })
      .where(eq(downloadAccesses.id, access.id))
      .run();

    if (order.status === 'DOWNLOAD_READY') {
      await db.update(orders)
        .set({ status: 'WAITING_LICENSE' })
        .where(eq(orders.id, order.id))
        .run();
    }

    // Return the list of files
    return new Response(JSON.stringify({ 
      success: true, 
      files: [
        { name: 'Windows (.msi)', url: '/produk/veintools/installers/veintools-desktop_0.1.0_x64_en-US.msi', icon: 'window' },
        { name: 'Windows (.exe)', url: '/produk/veintools/installers/veintools-desktop_0.1.0_x64-setup.exe', icon: 'window' },
        { name: 'Mac (.dmg)', url: '/produk/veintools/installers/veintools-desktop_0.1.0_aarch64.dmg', icon: 'laptop_mac' }
      ]
    }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
