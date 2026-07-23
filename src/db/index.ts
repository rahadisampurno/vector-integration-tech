import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error('Database belum dikonfigurasi. Tambahkan SUPABASE_DB_URL atau DATABASE_URL di environment server.');
}

const client = postgres(connectionString, {
  ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1') ? false : 'require',
  max: 10,
  idle_timeout: 20,
  connect_timeout: 15,
  prepare: false
});

await client.begin(async (sql) => {
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS products (id text PRIMARY KEY, slug text NOT NULL UNIQUE, name text NOT NULL, short_description text, description text, category text, regular_price integer NOT NULL, sale_price integer, thumbnail_url text, status text DEFAULT 'active', created_at timestamptz DEFAULT now());
    CREATE TABLE IF NOT EXISTS payment_accounts (id text PRIMARY KEY, name text NOT NULL, holder text NOT NULL, account_number text NOT NULL, status text NOT NULL DEFAULT 'active', sort_order integer NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now());
    CREATE TABLE IF NOT EXISTS affiliates (id text PRIMARY KEY, name text NOT NULL, email text NOT NULL UNIQUE, password_hash text NOT NULL, referral_code text NOT NULL UNIQUE, commission_rate integer NOT NULL DEFAULT 10, discount_rate integer NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'active', created_at timestamptz NOT NULL DEFAULT now());
    CREATE TABLE IF NOT EXISTS orders (id text PRIMARY KEY, order_code text NOT NULL UNIQUE, product_id text REFERENCES products(id), customer_name text NOT NULL, whatsapp text NOT NULL, email text NOT NULL, business_name text, sender_name text, sender_bank text, total_amount integer NOT NULL, subtotal_amount integer, discount_amount integer NOT NULL DEFAULT 0, affiliate_commission integer, commission_status text NOT NULL DEFAULT 'pending', commission_paid_at timestamptz, status text DEFAULT 'WAITING_PAYMENT', referral_code text, affiliate_id text REFERENCES affiliates(id), license_url text, created_at timestamptz DEFAULT now());
    CREATE TABLE IF NOT EXISTS auth_sessions (id text PRIMARY KEY, token_hash text NOT NULL UNIQUE, role text NOT NULL, affiliate_id text REFERENCES affiliates(id), expires_at timestamptz NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
    CREATE TABLE IF NOT EXISTS download_accesses (id text PRIMARY KEY, order_id text REFERENCES orders(id), download_code_hash text NOT NULL, token_hash text NOT NULL UNIQUE, raw_code text, raw_token text, max_downloads integer DEFAULT 3, download_count integer DEFAULT 0, expires_at timestamptz);
    CREATE INDEX IF NOT EXISTS orders_referral_code_idx ON orders(referral_code);
    CREATE INDEX IF NOT EXISTS orders_affiliate_id_idx ON orders(affiliate_id);
    CREATE INDEX IF NOT EXISTS auth_sessions_token_hash_idx ON auth_sessions(token_hash);
    CREATE INDEX IF NOT EXISTS download_accesses_order_id_idx ON download_accesses(order_id);
  `);
});

const [{ count: accountCount }] = await client<{ count: number }[]>`SELECT count(*)::int AS count FROM payment_accounts`;
if (accountCount === 0) {
  const now = new Date();
  const accounts = [
    ['BCA', 'MUHAMAD RAHADI SAMPURNA', '1393215821'], ['Mandiri', 'MUHAMAD RAHADI SAMPU', '1320021312518'],
    ['GoPay', 'MUHAMAD RAHADI SAMPURNA', '081298579746'], ['DANA', 'MUHAMAD RAHADI SAMPURNA', '081298579746']
  ];
  await client.begin(async (sql) => {
    for (const [name, holder, number] of accounts) await sql`INSERT INTO payment_accounts (id, name, holder, account_number, status, sort_order, created_at) VALUES (${crypto.randomUUID()}, ${name}, ${holder}, ${number}, 'active', ${accounts.findIndex(a => a[0] === name)}, ${now}) ON CONFLICT DO NOTHING`;
  });
}

await client`
  INSERT INTO products (id, slug, name, short_description, category, regular_price, thumbnail_url, status)
  VALUES ('veintools-desktop', 'veintools-desktop', 'VeinTools Desktop', 'Aplikasi Desktop multifungsi untuk operasional bisnis', 'Aplikasi Desktop', 199000, '/veintools_logo.png', 'active')
  ON CONFLICT (slug) DO NOTHING
`;

const rawDb = drizzle(client, { schema });

// Compatibility helpers keep the existing query style while PostgreSQL executes asynchronously.
const wrapQuery = (query: any): any => new Proxy(query, {
  get(target, property, receiver) {
    if (property === 'get') return async () => (await target.limit(1))[0];
    if (property === 'all' || property === 'run') return async () => await target;
    if (property === 'then') return target.then.bind(target);
    const value = Reflect.get(target, property, receiver);
    return typeof value === 'function' ? (...args: any[]) => wrapQuery(value.apply(target, args)) : value;
  }
});

export const db: any = new Proxy(rawDb as any, {
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    return typeof value === 'function' ? (...args: any[]) => wrapQuery(value.apply(target, args)) : value;
  }
});
