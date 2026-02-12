<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { cn } from '$lib/utils.js';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Building from '@lucide/svelte/icons/building';
	import Mail from '@lucide/svelte/icons/mail';
	import Globe from '@lucide/svelte/icons/globe';
	import FileText from '@lucide/svelte/icons/file-text';
</script>

<svelte:head>
	<title>О компании - ООО "Радиотехника-к"</title>
	<meta name="description" content={companyInfo.description} />
	<meta name="keywords" content="ООО Радиотехника-к, аренда оборудования, кинопроизводство, видеопродукция" />
</svelte:head>

<main class="container mx-auto px-4 py-12 max-w-4xl">
	<header class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">О компании</h1>
		<p class="text-xl text-muted-foreground">Профессиональное оборудование для кинопроизводства</p>
	</header>

	<section class="mb-12">
		<div class="prose prose-lg max-w-none dark:prose-invert">
			<p class="text-lg leading-relaxed text-foreground">
				{companyInfo.description}
			</p>
		</div>
	</section>

	<section
		aria-label="Информация о компании"
		class="grid gap-6 md:grid-cols-2"
	>
		<article
			class={cn(
				'flex items-start space-x-4 p-6 rounded-lg border bg-card',
				'hover:shadow-md transition-shadow duration-200'
			)}
		>
			<div class="flex-shrink-0">
				<Building2 class="h-8 w-8 text-primary" aria-hidden="true" />
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Название компании</h2>
				<p class="text-muted-foreground">{companyInfo.name}</p>
			</div>
		</article>

		<article
			class={cn(
				'flex items-start space-x-4 p-6 rounded-lg border bg-card',
				'hover:shadow-md transition-shadow duration-200'
			)}
		>
			<div class="flex-shrink-0">
				<FileText class="h-8 w-8 text-primary" aria-hidden="true" />
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">ОГРН</h2>
				<p class="text-muted-foreground">{companyInfo.ogrn}</p>
			</div>
		</article>

		<article
			class={cn(
				'flex items-start space-x-4 p-6 rounded-lg border bg-card',
				'hover:shadow-md transition-shadow duration-200'
			)}
		>
			<div class="flex-shrink-0">
				<Building class="h-8 w-8 text-primary" aria-hidden="true" />
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Юридический адрес</h2>
				<p class="text-muted-foreground">{companyInfo.legalAddress}</p>
			</div>
		</article>

		<article
			class={cn(
				'flex items-start space-x-4 p-6 rounded-lg border bg-card',
				'hover:shadow-md transition-shadow duration-200'
			)}
		>
			<div class="flex-shrink-0">
				<Globe class="h-8 w-8 text-primary" aria-hidden="true" />
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Веб-сайт</h2>
				<a
					href={`https://${companyInfo.website}`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline transition-colors"
				>
					{companyInfo.website}
				</a>
			</div>
		</article>

		<article
			class={cn(
				'flex items-start space-x-4 p-6 rounded-lg border bg-card',
				'hover:shadow-md transition-shadow duration-200 md:col-span-2'
			)}
		>
			<div class="flex-shrink-0">
				<Mail class="h-8 w-8 text-primary" aria-hidden="true" />
			</div>
			<div>
				<h2 class="text-lg font-semibold mb-1">Email для связи</h2>
				<a
					href={`mailto:${companyInfo.email}`}
					class="text-primary hover:underline transition-colors"
				>
					{companyInfo.email}
				</a>
			</div>
		</article>
	</section>
</main>
