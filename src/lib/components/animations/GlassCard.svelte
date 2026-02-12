<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { HTMLAttributes } from 'svelte/elements';

	export const glassCardVariants = tv({
		base: 'rounded-xl transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none',
		variants: {
			blur: {
				sm: 'backdrop-blur-sm',
				md: 'backdrop-blur-md',
				lg: 'backdrop-blur-lg',
				xl: 'backdrop-blur-xl',
				'2xl': 'backdrop-blur-2xl',
				'3xl': 'backdrop-blur-3xl'
			},
			opacity: {
				5: 'bg-white/5',
				10: 'bg-white/10',
				20: 'bg-white/20',
				30: 'bg-white/30',
				40: 'bg-white/40',
				50: 'bg-white/50'
			},
			border: {
				true: 'border border-white/10',
				false: ''
			},
			hover: {
				true: 'hover:scale-[1.05] hover:shadow-xl',
				false: ''
			}
		},
		defaultVariants: {
			blur: 'md',
			opacity: 10,
			border: true,
			hover: true
		}
	});

	export type GlassCardBlur = VariantProps<typeof glassCardVariants>['blur'];
	export type GlassCardOpacity = VariantProps<typeof glassCardVariants>['opacity'];
	export type GlassCardBorder = VariantProps<typeof glassCardVariants>['border'];
	export type GlassCardHover = VariantProps<typeof glassCardVariants>['hover'];

	export type GlassCardProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		blur?: GlassCardBlur;
		opacity?: GlassCardOpacity;
		border?: GlassCardBorder;
		hover?: GlassCardHover;
		children?: import('svelte').Snippet;
		class?: string;
	};
</script>

<script lang="ts">
	let {
		ref = $bindable(null),
		blur = 'md',
		opacity = 10,
		border = true,
		hover = true,
		children,
		class: className,
		...restProps
	}: GlassCardProps = $props();
</script>

<div
	bind:this={ref}
	class={cn(glassCardVariants({ blur, opacity, border, hover }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
