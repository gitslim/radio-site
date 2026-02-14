<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface ParallaxSectionFixedProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Parallax speed multiplier (default: 0.3) */
		speed?: number;
		/** Offset from viewport top in pixels (default: 0) */
		offset?: number;
		/** Content to be parallaxed */
		children?: import('svelte').Snippet;
		class?: string;
		/** Disable parallax effect */
		disabled?: boolean;
	}

	let {
		ref = $bindable(null),
		speed = 0.3,
		offset = 0,
		children,
		class: className,
		disabled = false,
		...restProps
	}: ParallaxSectionFixedProps = $props();

	let parallaxY = $state(0);
	let enableParallax = $state(false);

	onMount(() => {
		// Check for reduced motion preference
		enableParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !disabled;

		if (!enableParallax) return;

		// Simple parallax calculation based on scroll position
		const handleParallax = () => {
			parallaxY = window.scrollY * speed + offset;
		};

		// Initial calculation
		handleParallax();

		// Scroll listener
		const onScroll = () => {
			requestAnimationFrame(handleParallax);
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<div
	bind:this={ref}
	data-speed={enableParallax ? speed : 0}
	data-offset={enableParallax ? offset : 0}
	data-parallax={enableParallax ? "true" : "false"}
	class={cn('relative h-full', className)}
	{...restProps}
>
	<!-- Inner wrapper that gets the transform - keeps children untouched -->
	<div
		class="relative w-full h-full"
		style="transform: translate3d(0, {parallaxY}px, 0); will-change: transform;"
	>
		{@render children?.()}
	</div>

	<!-- Visual indicator when parallax is disabled -->
	{#if !enableParallax}
		<div
			class="absolute bottom-2 right-2 bg-blue-900/80 text-blue-100 px-3 py-1 rounded text-xs font-mono z-50 pointer-events-none"
			aria-hidden="true"
		>
			⏸️ Parallax: {disabled ? 'Disabled' : 'Reduced motion'}
		</div>
	{/if}
</div>
