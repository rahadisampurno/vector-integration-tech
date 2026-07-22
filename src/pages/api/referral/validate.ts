import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { affiliates, products } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code')?.trim().toUpperCase() || '';
  const slug = url.searchParams.get('product')?.trim() || '';
  if (!code || !slug) return Response.json({ valid: false });
  const affiliate = db.select().from(affiliates).where(eq(affiliates.referral_code, code)).get();
  const product = db.select().from(products).where(eq(products.slug, slug)).get();
  if (!affiliate || affiliate.status !== 'active' || !product || product.status !== 'active') {
    return Response.json({ valid: false });
  }
  const price = product.sale_price || product.regular_price;
  const discount = Math.round(price * affiliate.discount_rate / 100);
  return Response.json({ valid: true, code: affiliate.referral_code, discountRate: affiliate.discount_rate, price, discount, subtotal: price - discount });
};
