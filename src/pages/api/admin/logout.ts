import type { APIRoute } from 'astro';
import { destroySession } from '../../../lib/auth';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  destroySession(cookies);
  return redirect('/admin/login');
};

// Handle GET as well just in case they visit it directly
export const GET: APIRoute = async ({ cookies, redirect }) => {
  destroySession(cookies);
  return redirect('/admin/login');
};
