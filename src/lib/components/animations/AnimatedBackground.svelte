<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface AnimatedBackgroundProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Animation variant (default: 'x') */
		variant?: 'x' | 'y' | 'xy';
		/** Animation duration in seconds (default: 3) */
		speed?: number;
		/** Content to display over background */
		children?: import('svelte').Snippet;
		class?: string;
	}

	let {
		ref = $bindable(null),
		variant = 'x',
		speed = 3,
		children,
		class: className,
		...restProps
	}: AnimatedBackgroundProps = $props();

	// SSR safety flag
	let isClient = $state(false);
	let shouldAnimate = $state(true);

	onMount(() => {
		isClient = true;

		// Check for reduced motion preference
		shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
</script>

<div
	bind:this={ref}
	class={cn(
		// Base gradient background (customizable by user via className)
		'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
		// Animation classes - only apply if not reduced motion
		isClient && shouldAnimate && 'animate-gradient-x',
		variant === 'y' && isClient && shouldAnimate && 'animate-gradient-y',
		variant === 'xy' && isClient && shouldAnimate && 'animate-gradient-xy',
		className
	)}
	style:animation-duration={isClient && shouldAnimate ? `${speed}s` : undefined}
	{...restProps}
>
	{@render children?.()}
</div>
