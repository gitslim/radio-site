import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Configure image optimization for build process
// Generates AVIF, WebP, and JPEG formats at multiple sizes
// Images are processed during build and cached in node_modules/.cache/imagetools
export default defineConfig({
	plugins: [
		enhancedImages(), // must come before SvelteKit plugin
		tailwindcss(),
		sveltekit()
	],
	ssr: {
		noExternal: ['svelte-sonner']
	}
});
