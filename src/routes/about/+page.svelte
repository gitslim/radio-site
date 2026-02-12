<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { cn } from '$lib/utils.js';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Building from '@lucide/svelte/icons/building';
	import Mail from '@lucide/svelte/icons/mail';
	import Globe from '@lucide/svelte/icons/globe';
	import FileText from '@lucide/svelte/icons/file-text';
	import Phone from '@lucide/svelte/icons/phone';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Camera from '@lucide/svelte/icons/camera';
	import Video from '@lucide/svelte/icons/video';
	import Volume2 from '@lucide/svelte/icons/volume-2';
	import Wrench from '@lucide/svelte/icons/wrench';
	import Package from '@lucide/svelte/icons/package';
	import Shield from '@lucide/svelte/icons/shield';
	import Check from '@lucide/svelte/icons/check';
	import Star from '@lucide/svelte/icons/star';
	import Clock from '@lucide/svelte/icons/clock';

	interface CategoryCard {
		icon: any;
		title: string;
		description: string;
	}

	const equipmentCategories: CategoryCard[] = [
		{
			icon: Lightbulb,
			title: 'Осветительное оборудование',
			description: 'Профессиональные светильники, панели и аксессуары для студийной и натурной съемки'
		},
		{
			icon: Camera,
			title: 'Камеры и объективы',
			description: 'Цифровые камеры профессионального класса и оптика для любых съемочных задач'
		},
		{
			icon: Volume2,
			title: 'Звуковое оборудование',
			description: 'Микрофоны, рекордеры и оборудование для качественной записи звука'
		},
		{
			icon: Wrench,
			title: 'Grip оборудование',
			description: 'Штативы, краны, системы стабилизации и вспомогательное оборудование'
		},
		{
			icon: Package,
			title: 'Упаковки и кейсы',
			description: 'Надежные защитные кейсы и сумки для транспортировки оборудования'
		}
	];

	interface ValueCard {
		icon: any;
		title: string;
		description: string;
	}

	const companyValues: ValueCard[] = [
		{
			icon: Shield,
			title: 'Надежность',
			description: 'Только проверенное оборудование в идеальном техническом состоянии'
		},
		{
			icon: Check,
			title: 'Профессионализм',
			description: 'Опытный персонал с многолетним стажем в кинопроизводстве'
		},
		{
			icon: Star,
			title: 'Качество',
			description: 'Профессиональное оборудование от ведущих мировых производителей'
		},
		{
			icon: Clock,
			title: 'Оперативность',
			description: 'Быстрая обработка заявок и доставка оборудования на площадку'
		}
	];
</script>

<svelte:head>
	<title>О компании - ООО "Радиотехника-к"</title>
	<meta name="description" content={companyInfo.description} />
	<meta name="keywords" content="ООО Радиотехника-к, аренда оборудования, кинопроизводство, видеопродукция" />
</svelte:head>

<main class="container mx-auto px-4 py-12 max-w-6xl">
	<header class="text-center mb-16">
		<ScrollReveal>
			<h1 class="text-4xl md:text-5xl font-bold mb-4">О компании</h1>
			<p class="text-xl text-muted-foreground">Профессиональное оборудование для кинопроизводства</p>
		</ScrollReveal>
	</header>

	<!-- Section 1: Company Overview -->
	<ScrollReveal class="mb-16">
		<section class="max-w-4xl mx-auto">
			<h2 class="text-3xl font-bold mb-6 text-center">Что мы делаем</h2>
			<div class="prose prose-lg max-w-none dark:prose-invert">
				<p class="text-lg leading-relaxed text-foreground text-center">
					{companyInfo.description}
				</p>
			</div>
		</section>
	</ScrollReveal>

	<!-- Section 2: Equipment Categories -->
	<ScrollReveal class="mb-16">
		<section>
			<header class="text-center mb-12">
				<h2 class="text-3xl font-bold mb-4">Наше оборудование</h2>
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
					Широкий спектр профессиональной техники для любых съемочных задач
				</p>
			</header>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each equipmentCategories as category, index}
					<ScrollReveal delay={index * 100}>
						<Card class="h-full hover:shadow-lg transition-shadow duration-300">
							<CardHeader>
								<div
									class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4"
								>
									<svelte:component this={category.icon} class="w-7 h-7" />
								</div>
								<CardTitle class="text-xl">{category.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground">{category.description}</p>
							</CardContent>
						</Card>
					</ScrollReveal>
				{/each}
			</div>
		</section>
	</ScrollReveal>

	<!-- Section 3: Company Values -->
	<ScrollReveal class="mb-16">
		<section>
			<header class="text-center mb-12">
				<h2 class="text-3xl font-bold mb-4">Наши ценности</h2>
				<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
					Принципы, которые определяют нашу работу
				</p>
			</header>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each companyValues as value, index}
					<ScrollReveal delay={index * 100}>
						<Card class="h-full">
							<CardHeader>
								<div
									class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"
								>
									<svelte:component this={value.icon} class="w-7 h-7" />
								</div>
								<CardTitle class="text-xl">{value.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground">{value.description}</p>
							</CardContent>
						</Card>
					</ScrollReveal>
				{/each}
			</div>
		</section>
	</ScrollReveal>

	<!-- Section 4: Contact CTA -->
	<ScrollReveal class="mb-16">
		<section class="max-w-3xl mx-auto">
			<header class="text-center mb-8">
				<h2 class="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
				<p class="text-lg text-muted-foreground">
					Готовы обсудить ваш проект? Мы всегда на связи
				</p>
			</header>

			<div class="grid gap-6 md:grid-cols-2">
				<a
					href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
					class={cn(
						'flex items-center space-x-4 p-6 rounded-lg border bg-card',
						'hover:border-primary hover:shadow-md transition-all duration-200'
					)}
				>
					<div class="flex-shrink-0">
						<Phone class="h-8 w-8 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">Телефон</p>
						<p class="text-lg font-semibold text-foreground">{companyInfo.phone}</p>
					</div>
				</a>

				<a
					href={`mailto:${companyInfo.email}`}
					class={cn(
						'flex items-center space-x-4 p-6 rounded-lg border bg-card',
						'hover:border-primary hover:shadow-md transition-all duration-200'
					)}
				>
					<div class="flex-shrink-0">
						<Mail class="h-8 w-8 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">Email</p>
						<p class="text-lg font-semibold text-foreground">{companyInfo.email}</p>
					</div>
				</a>
			</div>
		</section>
	</ScrollReveal>

	<!-- Company Details -->
	<ScrollReveal>
		<section class="max-w-4xl mx-auto">
			<header class="text-center mb-8">
				<h2 class="text-2xl font-bold mb-2">Реквизиты компании</h2>
			</header>

			<div class="grid gap-4 md:grid-cols-2">
				<div
					class={cn(
						'flex items-start space-x-4 p-4 rounded-lg border bg-card'
					)}
				>
					<div class="flex-shrink-0">
						<Building2 class="h-6 w-6 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">Название</p>
						<p class="text-base font-medium">{companyInfo.name}</p>
					</div>
				</div>

				<div
					class={cn(
						'flex items-start space-x-4 p-4 rounded-lg border bg-card'
					)}
				>
					<div class="flex-shrink-0">
						<FileText class="h-6 w-6 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">ОГРН</p>
						<p class="text-base font-medium">{companyInfo.ogrn}</p>
					</div>
				</div>

				<div
					class={cn(
						'flex items-start space-x-4 p-4 rounded-lg border bg-card'
					)}
				>
					<div class="flex-shrink-0">
						<Building class="h-6 w-6 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">Юридический адрес</p>
						<p class="text-base font-medium text-sm">{companyInfo.legalAddress}</p>
					</div>
				</div>

				<div
					class={cn(
						'flex items-start space-x-4 p-4 rounded-lg border bg-card'
					)}
				>
					<div class="flex-shrink-0">
						<Globe class="h-6 w-6 text-primary" aria-hidden="true" />
					</div>
					<div>
						<p class="text-sm text-muted-foreground mb-1">Веб-сайт</p>
						<a href="/" class="text-base font-medium text-primary hover:underline">
							{companyInfo.website}
						</a>
					</div>
				</div>
			</div>
		</section>
	</ScrollReveal>
</main>
