import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

export async function load() {
	// Check if not in development mode
	if (!dev) {
		// Redirect to home page with 403 status
		redirect(403, '/');
	}

	// Allow access in development mode
	return {};
}
