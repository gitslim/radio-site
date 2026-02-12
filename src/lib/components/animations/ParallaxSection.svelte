<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface ParallaxSectionProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Parallax speed multiplier (default: 0.3) - negative values move opposite direction */
		speed?: number;
		/** Offset from viewport top in pixels (default: 0) */
		offset?: number;
		/** Content to be parallaxed */
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		ref = $bindable(null),
		speed = 0.3,
		offset = 0,
		children,
		class: className,
		...restProps
	}: ParallaxSectionProps = $props();

	// Track whether parallax should be enabled
	let enableParallax = $state(false);
	let parallaxElement: HTMLElement | null = null;

	onMount(() => {
		// Check for reduced motion preference
		enableParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!enableParallax || !ref) {
			return;
		}

		// Find the element to parallax (first child that has an img or is positioned)
		// For hero section, we want to parallax the image element itself
		const findParallaxTarget = (element: Element): HTMLElement | null => {
			// If this element is an img, parallax it
			if (element.tagName === 'IMG') {
				return element as HTMLElement;
			}
			// If this element contains an img, find and return the img
			const img = element.querySelector('img');
			if (img) {
				return img as HTMLElement;
			}
			// Otherwise, parallax the first child element
			if (element.firstElementChild) {
				return findParallaxTarget(element.firstElementChild);
			}
			return element as HTMLElement;
		};

		parallaxElement = findParallaxTarget(ref);

		if (!parallaxElement) {
			return;
		}

		// Enable hardware acceleration
		parallaxElement.style.willChange = 'transform';
		parallaxElement.style.transform = 'translateZ(0)';

		// Parallax effect handler
		const handleParallax = () => {
			if (!ref || !parallaxElement) return;

			const rect = ref.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculate scroll progress: 0 when element top is at viewport bottom,
			// 1 when element bottom is at viewport top
			const progress = -rect.top / (windowHeight + rect.height);

			// Clamp progress between 0 and 1
			const clampedProgress = Math.max(0, Math.min(1, progress));

			// Calculate parallax offset - background moves slower than foreground
			// Speed of 0.3 means background moves at 30% of scroll speed
			const parallaxY = (clampedProgress * windowHeight * speed) + offset;

			// Apply transform using translate3d for hardware acceleration
			parallaxElement.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
		};

		// Use requestAnimationFrame for smooth performance
		let ticking = false;

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					handleParallax();
					ticking = false;
				});
				ticking = true;
			}
		};

		// Add scroll listener
		window.addEventListener('scroll', onScroll, { passive: true });

		// Initial calculation
		handleParallax();

		// Cleanup
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (parallaxElement) {
				parallaxElement.style.willChange = '';
				parallaxElement.style.transform = '';
			}
		};
	});
</script>

<div
	bind:this={ref}
	data-speed={enableParallax ? speed : 0}
	data-offset={enableParallax ? offset : 0}
	data-parallax={enableParallax ? "true" : "false"}
	class={cn(
		'relative',
		enableParallax ? '' : 'motion-reduce:transform-none',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
