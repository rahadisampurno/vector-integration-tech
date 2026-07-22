import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
};

// Handle GET as well just in case they visit it directly
export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
};
