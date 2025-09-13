// src/routes/dresses/+page.server.ts
import type { PageServerLoad } from './$types';
import allDresses from '$lib/dress.json'; // now includes both hidden and visible
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import dresses from '$lib/dress.json'; // or your DB interface
import type { Dress } from '$lib/dressTemplate';
import { dressTemplate } from '$lib/dressTemplate';

export const load: PageServerLoad = async ({ cookies }) => {
  const isAdmin = !!cookies.get('admin');

  // Only include non-hidden dresses for regular users
  const dresses = isAdmin
    ? allDresses
    : allDresses.filter(d => !d.isHidden);

  return {
    dresses,
    isAdmin
  };
};

function generateUniqueId() {
  let id: number;
  do {
    id = Math.floor(Math.random() * 1000000);
  } while (dresses.some(d => d.id === id));
  return id;
}

export const actions: Actions = {
  default: async () => {
    const newId = generateUniqueId();

    const newDress: Dress = {
      ...dressTemplate,
      id: newId as number
    };
    // Add dress to your data source (remember to persist)
    dresses.push(newDress);
    // Save to your JSON file or DB here if applicable

    // Redirect to the new dress page
    throw redirect(303, `/dress/${newId}`);
  }
};

