<script lang="ts">
	import {
		type CarouselAPI,
		type CarouselProps,
		type EmblaContext,
		setEmblaContext,
	} from "./context.js";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		opts = {},
		plugins = [],
		setApi = () => {},
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: WithElementRef<CarouselProps> = $props();

	// Internal state for API-managed values
	let api = $state<CarouselAPI | undefined>();
	let canScrollNext = $state(false);
	let canScrollPrev = $state(false);
	let scrollSnaps = $state<number[]>([]);
	let selectedIndex = $state(0);

	// Functions that reference the state
	function scrollPrev() {
		api?.scrollPrev();
	}

	function scrollNext() {
		api?.scrollNext();
	}

	function scrollTo(index: number, jump?: boolean) {
		api?.scrollTo(index, jump);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			scrollPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			scrollNext();
		}
	}

	function onInit(event: CustomEvent<CarouselAPI>) {
		api = event.detail;
		setApi(api);

		scrollSnaps = api.scrollSnapList();
		api.on("select", onSelect);
		onSelect();
	}

	function onSelect() {
		if (!api) return;
		selectedIndex = api.selectedScrollSnap();
		canScrollNext = api.canScrollNext();
		canScrollPrev = api.canScrollPrev();
	}

	// State object that combines props with internal state
	let carouselState = $state<EmblaContext>({
		api,
		scrollPrev,
		scrollNext,
		orientation,
		canScrollNext,
		canScrollPrev,
		handleKeyDown,
		options: opts,
		plugins,
		onInit,
		scrollSnaps,
		selectedIndex,
		scrollTo,
	});

	// Set context synchronously - MUST be outside $effect
	setEmblaContext(carouselState);

	// Update context when props change (orientation, opts, plugins)
	$effect(() => {
		carouselState.orientation = orientation;
		carouselState.options = opts;
		carouselState.plugins = plugins;
	});

	// Update context when internal state changes (api, canScroll, etc.)
	$effect(() => {
		carouselState.api = api;
		carouselState.canScrollNext = canScrollNext;
		carouselState.canScrollPrev = canScrollPrev;
		carouselState.scrollSnaps = scrollSnaps;
		carouselState.selectedIndex = selectedIndex;
	});

	$effect(() => {
		return () => {
			api?.off("select", onSelect);
		};
	});
</script>

<div
	bind:this={ref}
	data-slot="carousel"
	class={cn("relative", className)}
	role="region"
	aria-roledescription="carousel"
	{...restProps}
>
	{@render children?.()}
</div>
