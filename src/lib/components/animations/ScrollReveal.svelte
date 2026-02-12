<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface ScrollRevealProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Delay in milliseconds before starting animation (default: 0) */
		delay?: number;
		/** Threshold for triggering animation (0-1, default: 0.1) */
		threshold?: number;
		/** Direction of animation (default: 'up') */
		direction?: 'up' | 'down' | 'left' | 'right';
		/** Content to reveal */
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		ref = $bindable(null),
		delay = 0,
		threshold = 0.1,
		direction = 'up',
		children,
		class: className,
		...restProps
	}: ScrollRevealProps = $props();

	let isVisible = $state(false);
	let elementRef = $state<HTMLElement | null>(null);

	// Direction-specific transform classes
	const directionClasses: Record<string, string> = {
		up: 'translate-y-8',
		down: '-translate-y-8',
		left: 'translate-x-8',
		right: '-translate-x-8'
	};

	onMount(() => {
		// SSR safety: only run in browser
		if (typeof window === 'undefined' || !elementRef) {
			return;
		}

		// Check for reduced motion preference
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			// Skip animation for users who prefer reduced motion
			isVisible = true;
			return;
		}

		// Create IntersectionObserver for viewport detection
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// Apply delay if specified
						setTimeout(() => {
							isVisible = true;
						}, delay);
						// Unobserve after animation triggers
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		// Start observing the element
		observer.observe(elementRef);

		// Cleanup on unmount
		return () => {
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={elementRef}
	class={cn(
		// Initial state: hidden and translated
		'opacity-0',
		directionClasses[direction],
		// GPU-accelerated transition
		'transition-all duration-700 ease-out',
		// Apply visible state
		isVisible && 'opacity-100 translate-x-0 translate-y-0',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
