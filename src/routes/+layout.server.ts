// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const adminEmail = cookies.get('admin');
  return {
    isAdmin: !!adminEmail
  };
};