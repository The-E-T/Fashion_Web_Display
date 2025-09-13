// src/routes/api/auth/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { verifyToken } from '$lib/magicLinkStore'; // Make sure to import from your store

export const GET: RequestHandler = async ({ url, cookies }) => {
  const token = url.searchParams.get('token') ?? '';
  const email = verifyToken(token);

  if (!email) {
    return new Response('Invalid or expired token', { status: 401 });
  }

  // Set HTTP-only cookie to persist admin session (1 day)
  cookies.set('admin', email, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
    secure: false    // set to true if you're on HTTPS; false for localhost HTTP (TODO: change to true in production)
  });

  // Redirect to the edit page or homepage after login
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/gallery' // or wherever you want to redirect after login
    }
  });
};
