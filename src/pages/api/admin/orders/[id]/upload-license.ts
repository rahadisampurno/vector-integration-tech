import { db } from '../../../../../db';
import { orders } from '../../../../../db/schema';
import { eq } from 'drizzle-orm';
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request, params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Order ID is required' }), { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('license_file') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'License file is required' }), { status: 400 });
    }

    const order = db.select().from(orders).where(eq(orders.id, id)).get();
    if (!order) {
       return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
    }

    // Use process.cwd() to get project root, then public folder
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'licenses');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate a unique filename using order code
    const ext = path.extname(file.name) || '.lic';
    const fileName = `${order.order_code}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const licenseUrl = `/api/download/license/${fileName}`;

    // Update order status to COMPLETED and set license URL
    db.update(orders)
      .set({ 
         status: 'COMPLETED',
         license_url: licenseUrl
      })
      .where(eq(orders.id, id))
      .run();

    return new Response(JSON.stringify({ 
      success: true, 
      license_url: licenseUrl 
    }), { status: 200 });

  } catch (error: any) {
    console.error('Error uploading license:', error);
    return new Response(JSON.stringify({ error: error.message || 'Server error' }), { status: 500 });
  }
};
