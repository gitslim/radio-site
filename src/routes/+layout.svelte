<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Background from '$lib/components/Background.svelte';
	import { initializeLenis } from '$lib/utils/lenis';

	let { children } = $props();

	onMount(() => {
		let cleanup: (() => void) | undefined;

		try {
			// Initialize Lenis smooth scroll (browser-only, handles SSR internally)
			cleanup = initializeLenis({
				duration: 1.2,
				lerp: 0.1
			});
		} catch (error) {
			// Graceful degradation: fall back to native scroll if Lenis fails
			console.warn('Lenis initialization failed, falling back to native scroll:', error);
		}

		// Return cleanup function to destroy Lenis on unmount/navigation
		return () => {
			cleanup?.();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<MetaTags
	title="Радиотехника-К — Прокат оборудования для кинопроизводства"
	description="Прокат профессионального оборудования для кино и видеосъемки. Осветительное оборудование, генераторы, стабилизация и другая техника."
	url={$page.url.toString()}
/>

<Background opacity={0.5} />
<Header currentPath={$page.url.pathname} />
{@render children()}
<Footer />
