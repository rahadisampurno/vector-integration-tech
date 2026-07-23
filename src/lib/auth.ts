import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { and, eq, gt } from 'drizzle-orm';
import type { AstroCookies } from 'astro';
import { db } from '../db';
import { authSessions } from '../db/schema';

export const SESSION_COOKIE = 'veintech_session';

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createSession(cookies: AstroCookies, role: 'admin' | 'affiliate', affiliateId?: string) {
  const token = randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  await db.insert(authSessions).values({
    id: crypto.randomUUID(),
    token_hash: hashToken(token),
    role,
    affiliate_id: affiliateId || null,
    created_at: now,
    expires_at: expiresAt
  }).run();
  cookies.set(SESSION_COOKIE, token, {
    path: '/', httpOnly: true, secure: import.meta.env.PROD,
    sameSite: 'strict', maxAge: 60 * 60 * 24
  });
}

export async function getSession(cookies: AstroCookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return await db.select().from(authSessions).where(and(
    eq(authSessions.token_hash, hashToken(token)),
    gt(authSessions.expires_at, new Date())
  )).get() || null;
}

export async function destroySession(cookies: AstroCookies) {
  const token = cookies.get(SESSION_COOKIE)?.value;
  if (token) await db.delete(authSessions).where(eq(authSessions.token_hash, hashToken(token))).run();
  cookies.delete(SESSION_COOKIE, { path: '/' });
  cookies.delete('admin_session', { path: '/' });
}
