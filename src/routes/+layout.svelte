<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<MetaTags
	title="ТехКино — Прокат оборудования для кинопроизводства"
	description="Прокат профессионального оборудования для кино и видеосъемки. Осветительное оборудование, генераторы, стабилизация и другая техника."
	url={$page.url.toString()}
/>

<Header currentPath={$page.url.pathname} />
{@render children()}
<Footer />
