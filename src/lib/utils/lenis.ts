import Lenis from '@studio-freight/lenis';

/**
 * Configuration options for Lenis initialization
 */
export interface LenisConfig {
	/** Smooth scroll duration in seconds (default: 1.2) */
	duration?: number;
	/** Linear interpolation factor (default: 0.1) */
	lerp?: number;
	/** Whether smooth wheel scrolling is enabled (default: true) */
	smoothWheel?: boolean;
	/** Custom easing function */
	easing?: (t: number) => number;
}

/**
 * Initializes Lenis smooth scroll with proper cleanup
 * @param config - Optional configuration for Lenis
 * @returns Cleanup function that destroys Lenis instance and stops RAF loop
 *
 * @example
 * ```svelte
 * <script>
 * import { onMount } from 'svelte';
 * import { initializeLenis } from '$lib/utils/lenis';
 *
 * onMount(() => {
 *   const cleanup = initializeLenis({
 *     duration: 1.5,
 *     lerp: 0.1
 *   });
 *
 *   return cleanup;
 * });
 * </script>
 * ```
 */
export function initializeLenis(config: LenisConfig = {}): () => void {
	// Check if running in browser environment
	if (typeof window === 'undefined') {
		return () => {};
	}

	// Check for prefers-reduced-motion system preference
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	// If user prefers reduced motion, skip Lenis initialization
	if (prefersReducedMotion) {
		return () => {};
	}

	// Initialize Lenis with merged configuration
	const lenis = new Lenis({
		duration: config.duration ?? 1.2,
		lerp: config.lerp ?? 0.1,
		smoothWheel: config.smoothWheel ?? true,
		easing: config.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
		orientation: 'vertical',
		gestureOrientation: 'vertical',
		syncTouch: false,
	});

	// Set up RAF loop for smooth scrolling
	let rafId: number;

	function raf(time: number) {
		lenis.raf(time);
		rafId = requestAnimationFrame(raf);
	}

	rafId = requestAnimationFrame(raf);

	// Return cleanup function
	return () => {
		// Cancel RAF loop
		if (rafId) {
			cancelAnimationFrame(rafId);
		}

		// Destroy Lenis instance
		lenis.destroy();
	};
}
