import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { db } from '../../../../db';
import { orders } from '../../../../db/schema';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { deviceFingerprint, customerName, orderId } = await request.json();

    if (!deviceFingerprint || !customerName) {
      return new Response(JSON.stringify({
        success: false,
        message: "Format salah. Pastikan mengirimkan 'deviceFingerprint' dan 'customerName'."
      }), { status: 400 });
    }

    // Resolving private.pem from process.cwd() so it works consistently
    const privateKeyPath = path.join(process.cwd(), 'src/lib/keys/private.pem');

    if (!fs.existsSync(privateKeyPath)) {
      return new Response(JSON.stringify({
        success: false,
        message: "Sistem error: private.pem tidak ditemukan di server."
      }), { status: 500 });
    }

    const privateKey = crypto.createPrivateKey(fs.readFileSync(privateKeyPath));

    const payload = {
      license_id: `LIC-${Date.now()}`,
      product_id: "veintools-desktop",
      edition: "VeinTools Business V1.0",
      customer_name: customerName,
      device_fingerprint: deviceFingerprint,
      issued_at: Math.floor(Date.now() / 1000),
      expires_at: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60),
      entitlements: ["hpp", "invoice", "quotation", "buku_kas", "stok", "piutang"],
      max_devices: 1
    };

    const canonicalPayloadStr = JSON.stringify(payload);
    const canonicalPayload = Buffer.from(canonicalPayloadStr);
    
    const signature = crypto.sign(null, canonicalPayload, privateKey).toString('hex');

    const envelope = {
      payload,
      signature
    };

    const safeDeviceStr = deviceFingerprint.replace(/[^a-zA-Z0-9]/g, '-');
    const fileName = `VeinTools_${payload.license_id}_${safeDeviceStr}.veinlicense`;

    // Save the file to public/uploads/licenses
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'licenses');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, JSON.stringify(envelope, null, 2));

    const licenseUrl = `/api/download/license/${fileName}`;

    // Update order status if orderId is provided
    if (orderId) {
      try {
        await db.update(orders)
          .set({ 
             status: 'COMPLETED',
             license_url: licenseUrl
          })
          .where(eq(orders.id, orderId))
          .run();
      } catch (dbErr) {
        console.error("Failed to update order status:", dbErr);
        // Continue anyway
      }
    }

    return new Response(JSON.stringify({
      success: true,
      licenseUrl: licenseUrl,
      fileName
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error: any) {
    console.error("Error generating license:", error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message || "Terjadi kesalahan internal saat membuat lisensi."
    }), { status: 500 });
  }
};
