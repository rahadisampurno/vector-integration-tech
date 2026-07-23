import { defineMiddleware } from 'astro:middleware';
import { getSession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Protect /admin and /api/admin routes
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    
    // Allow login and logout routes
    if (path === '/admin/login' || path === '/api/admin/login' || path === '/api/admin/logout') {
      return next();
    }

    const session = await getSession(context.cookies);

    if (!session) {
      // If it's an API route, return 401 Unauthorized
      if (path.startsWith('/api/admin')) {
        return new Response(JSON.stringify({ error: 'Unauthorized', message: 'Silakan login terlebih dahulu' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      // If it's a page route, redirect to login
      return context.redirect('/admin/login');
    }

    const affiliateAllowed = path === '/admin/affiliate/dashboard' || path === '/api/admin/logout';
    if (session.role === 'affiliate' && !affiliateAllowed) {
      if (path.startsWith('/api/admin')) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
      }
      return context.redirect('/admin/affiliate/dashboard');
    }
  }

  return next();
});
