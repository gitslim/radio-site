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
		/** Disable parallax effect (for debugging) */
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
	}: ParallaxSectionProps = $props();

	// Track whether parallax should be enabled
	let enableParallax = $state(false);
	let parallaxElement: HTMLElement | null = null;
	let initialScrollY = 0; // Track initial scroll position

	onMount(() => {
		// Check for reduced motion preference
		enableParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !disabled;

		// Record initial scroll position
		initialScrollY = window.scrollY;

		console.log('🎬 ParallaxSection: Mounting', { enableParallax, disabled, speed, offset, initialScrollY });

		if (!enableParallax || !ref) {
			console.log('⏸️ ParallaxSection: Disabled or no ref', { enableParallax, disabled, hasRef: !!ref });
			return;
		}

		// Find the element to parallax (first child that has an img or is positioned)
		// For hero section, we want to parallax the image element itself
		const findParallaxTarget = (element: Element): HTMLElement | null => {
			console.log('🔍 ParallaxSection: Finding target in', element.tagName, element.className);

			// If this element is an img, parallax it
			if (element.tagName === 'IMG') {
				console.log('✅ ParallaxSection: Found IMG as target');
				return element as HTMLElement;
			}
			// If this element contains an img, find and return the img
			const img = element.querySelector('img');
			if (img) {
				console.log('✅ ParallaxSection: Found IMG child as target');
				return img as HTMLElement;
			}
			// Otherwise, parallax the first child element
			if (element.firstElementChild) {
				console.log('🔍 ParallaxSection: Checking first child...');
				return findParallaxTarget(element.firstElementChild);
			}
			console.log('⚠️ ParallaxSection: Using element itself as target');
			return element as HTMLElement;
		};

		parallaxElement = findParallaxTarget(ref);

		if (!parallaxElement) {
			console.error('❌ ParallaxSection: No parallax target found in ref', ref);
			return;
		}

		// Log computed styles of the target
		const targetComputed = window.getComputedStyle(parallaxElement);
		console.log('📊 ParallaxSection: Target element styles', {
			tagName: parallaxElement.tagName,
			className: parallaxElement.className,
			position: targetComputed.position,
			display: targetComputed.display,
			visibility: targetComputed.visibility,
			opacity: targetComputed.opacity,
			zIndex: targetComputed.zIndex,
			width: targetComputed.width,
			height: targetComputed.height,
			transform: targetComputed.transform,
			element: parallaxElement
		});

		// Enable hardware acceleration
		parallaxElement.style.willChange = 'transform';
		parallaxElement.style.transform = 'translate3d(0, 0px, 0)'; // Start at 0

		console.log('✅ ParallaxSection: Initial transform set', parallaxElement.style.transform);

		// Parallax effect handler
		const handleParallax = () => {
			if (!ref || !parallaxElement) return;

			const rect = ref.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const currentScrollY = window.scrollY;
			const scrollDelta = Math.abs(currentScrollY - initialScrollY);

			// Calculate scroll progress: 0 when element top is at viewport bottom,
			// 1 when element bottom is at viewport top
			const progress = -rect.top / (windowHeight + rect.height);

			// Clamp progress between 0 and 1
			const clampedProgress = Math.max(0, Math.min(1, progress));

			// Calculate parallax offset - background moves slower than foreground
			// Speed of 0.3 means background moves at 30% of scroll speed
			const parallaxY = (clampedProgress * windowHeight * speed) + offset;

			// Check for NaN or infinite values
			const isNan = isNaN(parallaxY);
			const isInfinite = !isFinite(parallaxY);

			// Type assertion for window property
			(window as any).__parallaxLogged = (window as any).__parallaxLogged || false;

			// Log all transform calculations
			console.log('🔢 ParallaxSection: Transform calculation', {
				rectTop: rect.top,
				rectHeight: rect.height,
				rectBottom: rect.bottom,
				windowHeight,
				currentScrollY,
				initialScrollY,
				scrollDelta,
				progress,
				clampedProgress,
				speed,
				offset,
				parallaxY,
				isNan,
				isInfinite,
				currentTransform: parallaxElement.style.transform
			});

			// Only apply transform if user has scrolled (prevent initial jump)
			// Small threshold (5px) to handle minor browser scroll adjustments
			if (scrollDelta > 5) {
				const newTransform = `translate3d(0, ${parallaxY}px, 0)`;
				console.log('✅ ParallaxSection: Applying transform', {
					before: parallaxElement.style.transform,
					after: newTransform,
					parallaxY
				});
				parallaxElement.style.transform = newTransform;
			} else {
				console.log('⏸️ ParallaxSection: Not applying transform (scrollDelta <= 5)', {
					scrollDelta,
					currentTransform: parallaxElement.style.transform
				});
			}

			// Warn if we detect invalid values
			if (isNan || isInfinite) {
				console.error('❌ ParallaxSection: Invalid parallaxY value detected!', {
					parallaxY,
					isNan,
					isInfinite,
					progress,
					clampedProgress,
					windowHeight,
					speed,
					offset
				});
			}
		}

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
	<!-- DEBUG: Visual indicator when parallax is disabled -->
	{#if !enableParallax}
		<div
			class="absolute bottom-2 right-2 bg-blue-900/80 text-blue-100 px-3 py-1 rounded text-xs font-mono z-50 pointer-events-none"
			aria-hidden="true"
		>
			⏸️ Parallax: {disabled ? 'Disabled by prop' : 'Reduced motion'}
		</div>
	{/if}

	{@render children?.()}
</div>
