<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	interface BackgroundProps extends WithElementRef<HTMLAttributes<HTMLDivElement>> {
		/** Additional classes for the background container */
		class?: string;
		/** Opacity of the background (default: 0.5) */
		opacity?: number;
	}

	let {
		ref = $bindable(null),
		class: className,
		opacity = 0.5,
		...restProps
	}: BackgroundProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		// Fixed positioning to stay behind content
		'fixed inset-0 -z-10',
		// Grid pattern layer
		'bg-grid',
		// Vignette/shadow layer (radial gradient from center)
		'bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)]',
		// Bottom gradient fade layer (smooth fade at bottom)
		'bg-[linear-gradient(to_bottom,transparent_60%,var(--background)_100%)]',
		className
	)}
	style:opacity={opacity}
	{...restProps}
></div>
