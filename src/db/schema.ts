import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  short_description: text('short_description'),
  description: text('description'),
  category: text('category'),
  regular_price: integer('regular_price').notNull(),
  sale_price: integer('sale_price'),
  thumbnail_url: text('thumbnail_url'),
  status: text('status').default('active'),
  created_at: integer('created_at', { mode: 'timestamp' })
});

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  order_code: text('order_code').notNull().unique(),
  product_id: text('product_id').references(() => products.id),
  customer_name: text('customer_name').notNull(),
  whatsapp: text('whatsapp').notNull(),
  email: text('email').notNull(),
  business_name: text('business_name'),
  sender_name: text('sender_name'),
  sender_bank: text('sender_bank'),
  total_amount: integer('total_amount').notNull(),
  status: text('status').default('WAITING_PAYMENT'),
  referral_code: text('referral_code'),
  license_url: text('license_url'),
  created_at: integer('created_at', { mode: 'timestamp' })
});

export const downloadAccesses = sqliteTable('download_accesses', {
  id: text('id').primaryKey(),
  order_id: text('order_id').references(() => orders.id),
  download_code_hash: text('download_code_hash').notNull(),
  token_hash: text('token_hash').notNull(),
  raw_code: text('raw_code'),
  raw_token: text('raw_token'),
  max_downloads: integer('max_downloads').default(3),
  download_count: integer('download_count').default(0),
  expires_at: integer('expires_at', { mode: 'timestamp' })
});
