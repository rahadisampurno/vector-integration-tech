import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Protect /admin and /api/admin routes
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    
    // Allow login and logout routes
    if (path === '/admin/login' || path === '/api/admin/login' || path === '/api/admin/logout') {
      return next();
    }

    // Check for admin session cookie
    const adminSession = context.cookies.get('admin_session')?.value;

    if (adminSession !== 'active') {
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
  }

  return next();
});
