import { pgTable, text, integer, timestamp, index } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: text('id').primaryKey(), slug: text('slug').notNull().unique(), name: text('name').notNull(),
  short_description: text('short_description'), description: text('description'), category: text('category'),
  regular_price: integer('regular_price').notNull(), sale_price: integer('sale_price'), thumbnail_url: text('thumbnail_url'),
  status: text('status').default('active'), created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

export const paymentAccounts = pgTable('payment_accounts', {
  id: text('id').primaryKey(), name: text('name').notNull(), holder: text('holder').notNull(),
  account_number: text('account_number').notNull(), status: text('status').notNull().default('active'),
  sort_order: integer('sort_order').notNull().default(0), created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const affiliates = pgTable('affiliates', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(), referral_code: text('referral_code').notNull().unique(),
  commission_rate: integer('commission_rate').notNull().default(10), discount_rate: integer('discount_rate').notNull().default(0),
  status: text('status').notNull().default('active'), created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey(), order_code: text('order_code').notNull().unique(), product_id: text('product_id').references(() => products.id),
  customer_name: text('customer_name').notNull(), whatsapp: text('whatsapp').notNull(), email: text('email').notNull(),
  business_name: text('business_name'), sender_name: text('sender_name'), sender_bank: text('sender_bank'),
  total_amount: integer('total_amount').notNull(), subtotal_amount: integer('subtotal_amount'), discount_amount: integer('discount_amount').notNull().default(0),
  affiliate_commission: integer('affiliate_commission'), commission_status: text('commission_status').notNull().default('pending'),
  commission_paid_at: timestamp('commission_paid_at', { withTimezone: true }), status: text('status').default('WAITING_PAYMENT'),
  referral_code: text('referral_code'), affiliate_id: text('affiliate_id').references(() => affiliates.id), license_url: text('license_url'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
}, (table) => [index('orders_referral_code_idx').on(table.referral_code), index('orders_affiliate_id_idx').on(table.affiliate_id)]);

export const authSessions = pgTable('auth_sessions', {
  id: text('id').primaryKey(), token_hash: text('token_hash').notNull().unique(), role: text('role').notNull(),
  affiliate_id: text('affiliate_id').references(() => affiliates.id), expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
}, (table) => [index('auth_sessions_token_hash_idx').on(table.token_hash)]);

export const downloadAccesses = pgTable('download_accesses', {
  id: text('id').primaryKey(), order_id: text('order_id').references(() => orders.id), download_code_hash: text('download_code_hash').notNull(),
  token_hash: text('token_hash').notNull().unique(), raw_code: text('raw_code'), raw_token: text('raw_token'),
  max_downloads: integer('max_downloads').default(3), download_count: integer('download_count').default(0),
  expires_at: timestamp('expires_at', { withTimezone: true })
}, (table) => [index('download_accesses_order_id_idx').on(table.order_id)]);
