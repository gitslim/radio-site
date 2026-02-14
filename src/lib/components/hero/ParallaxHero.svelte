<script lang="ts" module>
	import type { ComponentProps } from 'svelte';

 	export interface ParallaxHeroProps {
 		/** Hero image path */
 		imageUrl?: string;
 		/** Parallax speed multiplier (default: 0.3) */
 		speed?: number;
 		/** Hero title/headline */
 		title?: string;
 		/** Optional subtitle/subheadline */
 		subtitle?: string;
 		/** CTA button text (optional) */
 		ctaText?: string;
 		/** CTA button link (optional) */
 		ctaLink?: string;
 		/** Animation direction for ScrollReveal (default: 'up') */
 		animationDirection?: 'up' | 'down' | 'left' | 'right';
 		/** Animation delay in ms (default: 0) */
 		animationDelay?: number;
 		/** Content alignment (default: 'center') */
 		align?: 'left' | 'center' | 'right';
 		/** Custom slot content for maximum flexibility */
 		children?: import('svelte').Snippet;
 		/** Disable parallax effect (for debugging) */
 		disabled?: boolean;
 	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import ParallaxSectionFixed from '$lib/components/animations/ParallaxSectionFixed.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Button } from '$lib/components/ui/button';

 	let {
 		imageUrl = '/images/hero-cinema.jpg',
 		speed = 0.3,
 		title,
 		subtitle,
 		ctaText,
 		ctaLink,
 		animationDirection = 'up',
 		animationDelay = 0,
 		align = 'center',
 		children,
 		class: className = '',
 		disabled = false,
 		...restProps
 	}: ParallaxHeroProps & { class?: string } = $props();

  	// Alignment classes
  	const alignmentClasses = {
  		left: 'items-start text-left',
  		center: 'items-center text-center',
  		right: 'items-end text-right'
  	};
</script>

<section
	class={cn(
		'relative w-full overflow-hidden',
		// Responsive height: 80vh (min 600px) on desktop, 60vh on mobile
		'min-h-[60vh] md:min-h-[80vh] h-[60vh] md:h-[80vh]',
		className
	)}
   	{...restProps}
   	aria-label="Hero section with parallax background"
 >
  	<!-- Parallax background image -->
    	<ParallaxSectionFixed {speed} {disabled}>
     		<div
     			class="absolute inset-0 w-full h-full overflow-hidden z-0"
     		>

        		<img
        				src={imageUrl}
        				alt=""
        				style="
         					position: absolute !important;
         					top: 0 !important;
         					left: 0 !important;
         					right: 0 !important;
         					bottom: 0 !important;
         					width: 100% !important;
         					height: 100% !important;
         					object-fit: cover !important;
         					z-index: 1 !important;
        				"
        				loading="eager"
        				decoding="async"
        				aria-hidden="true"
        			/>
   		</div>
  	</ParallaxSectionFixed>

    	<!-- Gradient overlay for better text readability -->
    	<div
       		class="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/15 z-10"
       		aria-hidden="true"
       	></div>



 	<!-- Content overlay -->
 	<div
 		class={cn(
 			'absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12 z-20',
 			alignmentClasses[align]
 		)}
 	>
		<ScrollReveal direction={animationDirection} delay={animationDelay}>
			{#if children}
				<!-- Slot content for maximum flexibility -->
				{@render children()}
			{:else}
				<!-- Default content layout -->
				<div class="max-w-4xl">
					{#if title}
						<h1
							class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 drop-shadow-lg"
						>
							{title}
						</h1>
					{/if}

					{#if subtitle}
						<p
							class="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 max-w-3xl drop-shadow-md"
						>
							{subtitle}
						</p>
					{/if}

					{#if ctaText && ctaLink}
						<div class="flex justify-center gap-4">
							<Button
								variant="default"
								size="lg"
								class="group px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white hover:bg-gray-100 text-gray-900"
								onclick={() => {
									window.location.href = ctaLink;
								}}
							>
								{ctaText}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="ml-2 transition-transform duration-300 group-hover:translate-x-1"
									aria-hidden="true"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</Button>
						</div>
					{/if}
				</div>
			{/if}
		</ScrollReveal>
 	</div>
 </section>

