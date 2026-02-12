<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface ParallaxSectionProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Parallax speed multiplier (default: 1) */
		speed?: number;
		/** Offset from viewport top in pixels (default: 0) */
		offset?: number;
		/** Content to be parallaxed */
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		ref = $bindable(null),
		speed = 1,
		offset = 0,
		children,
		class: className,
		...restProps
	}: ParallaxSectionProps = $props();

	// Track whether parallax should be enabled
	let enableParallax = $state(true);

	onMount(() => {
		// Check for reduced motion preference
		enableParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Store data attributes for parallax implementation (if external parallax script is used)
		if (ref && enableParallax) {
			ref.dataset.speed = speed.toString();
			ref.dataset.offset = offset.toString();
		}
	});
</script>

<div
	bind:this={ref}
	data-speed={enableParallax ? speed : 0}
	data-offset={enableParallax ? offset : 0}
	data-parallax={enableParallax ? "true" : "false"}
	class={cn('relative motion-reduce:transform-none', className)}
	{...restProps}
>
	{@render children?.()}
</div>
