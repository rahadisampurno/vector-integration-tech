import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('sqlite.db');
sqlite.pragma('foreign_keys = ON');

// Lightweight migrations for the existing MVP database.
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS affiliates (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    referral_code TEXT NOT NULL UNIQUE,
    commission_rate INTEGER NOT NULL DEFAULT 10,
    discount_rate INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS auth_sessions (
    id TEXT PRIMARY KEY NOT NULL,
    token_hash TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    affiliate_id TEXT REFERENCES affiliates(id),
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS payment_accounts (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    holder TEXT NOT NULL,
    account_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS auth_sessions_token_hash_idx ON auth_sessions(token_hash);
  CREATE INDEX IF NOT EXISTS orders_referral_code_idx ON orders(referral_code);
`);

const paymentAccountCount = (sqlite.prepare('SELECT count(*) AS count FROM payment_accounts').get() as { count: number }).count;
if (paymentAccountCount === 0) {
  const insertAccount = sqlite.prepare('INSERT INTO payment_accounts (id, name, holder, account_number, status, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const now = Math.floor(Date.now() / 1000);
  const seedAccounts = [
    ['BCA', 'MUHAMAD RAHADI SAMPURNA', '1393215821'],
    ['Mandiri', 'MUHAMAD RAHADI SAMPU', '1320021312518'],
    ['GoPay', 'MUHAMAD RAHADI SAMPURNA', '081298579746'],
    ['DANA', 'MUHAMAD RAHADI SAMPURNA', '081298579746']
  ];
  const seed = sqlite.transaction(() => seedAccounts.forEach(([name, holder, number], index) => insertAccount.run(crypto.randomUUID(), name, holder, number, 'active', index, now)));
  seed();
}

const orderColumns = sqlite.prepare("PRAGMA table_info('orders')").all() as Array<{ name: string }>;
if (!orderColumns.some((column) => column.name === 'affiliate_id')) {
  sqlite.exec('ALTER TABLE orders ADD COLUMN affiliate_id TEXT REFERENCES affiliates(id)');
}
if (!orderColumns.some((column) => column.name === 'subtotal_amount')) {
  sqlite.exec('ALTER TABLE orders ADD COLUMN subtotal_amount INTEGER');
}
if (!orderColumns.some((column) => column.name === 'discount_amount')) {
  sqlite.exec('ALTER TABLE orders ADD COLUMN discount_amount INTEGER NOT NULL DEFAULT 0');
}
if (!orderColumns.some((column) => column.name === 'affiliate_commission')) {
  sqlite.exec('ALTER TABLE orders ADD COLUMN affiliate_commission INTEGER');
}
if (!orderColumns.some((column) => column.name === 'commission_status')) {
  sqlite.exec("ALTER TABLE orders ADD COLUMN commission_status TEXT NOT NULL DEFAULT 'pending'");
}
if (!orderColumns.some((column) => column.name === 'commission_paid_at')) {
  sqlite.exec('ALTER TABLE orders ADD COLUMN commission_paid_at INTEGER');
}

const affiliateColumns = sqlite.prepare("PRAGMA table_info('affiliates')").all() as Array<{ name: string }>;
if (!affiliateColumns.some((column) => column.name === 'discount_rate')) {
  sqlite.exec('ALTER TABLE affiliates ADD COLUMN discount_rate INTEGER NOT NULL DEFAULT 0');
}

// Snapshot commission for older attributed orders created before this column existed.
sqlite.exec(`
  UPDATE orders
  SET affiliate_commission = round(
    (coalesce(subtotal_amount, total_amount) - coalesce(discount_amount, 0)) *
    coalesce((SELECT commission_rate FROM affiliates WHERE affiliates.id = orders.affiliate_id), 0) / 100.0
  )
  WHERE affiliate_id IS NOT NULL AND affiliate_commission IS NULL
`);

export const db = drizzle(sqlite, { schema });
