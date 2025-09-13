// src/routes/dress/[id]/+page.server.ts
import type { PageServerLoad } from './$types';
import dresses from '$lib/dress.json';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies }) => {
	const dressId = Number(params.id);
	const isAdmin = !!cookies.get('admin');

	// Try to find the dress by ID
	const dress = dresses.find((d) => d.id === dressId);

	// If no match, throw 404
	if (!dress) {
		throw error(404, 'Dress was not found' );
	}

	// If the dress is hidden and user is not admin, deny access
	if (dress.isHidden && !isAdmin) {
		throw error(404, 'Dress was not found');
	}

	return {
		dress,
		isAdmin
	};
};
