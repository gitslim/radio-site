import { services } from '$lib/data/services';

/**
 * Generate entries for prerendering service detail pages
 * This tells SvelteKit which dynamic routes to prerender
 */
export function entries() {
	return services.map((service) => ({
		slug: service.slug
	}));
}

/**
 * Prerender all service detail pages
 */
export const prerender = true;
