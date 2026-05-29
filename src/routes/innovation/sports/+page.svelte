<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { cn } from '$lib/utils.js';
	import Pointer from '@lucide/svelte/icons/pointer';
	import Eye from '@lucide/svelte/icons/eye';
	import Landmark from '@lucide/svelte/icons/landmark';
	import PersonStanding from '@lucide/svelte/icons/person-standing';
	import LineChart from '@lucide/svelte/icons/line-chart';
	import Lock from '@lucide/svelte/icons/lock';
	import Users from '@lucide/svelte/icons/users';
	import Mountain from '@lucide/svelte/icons/mountain';
	import Phone from '@lucide/svelte/icons/phone';
	import Mail from '@lucide/svelte/icons/mail';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Radio from '@lucide/svelte/icons/radio';
	import Swords from '@lucide/svelte/icons/swords';
	import Trophy from '@lucide/svelte/icons/trophy';

	interface HeroBenefit {
		icon: any;
		title: string;
		description: string;
	}

	const heroBenefits: HeroBenefit[] = [
		{
			icon: Radio,
			title: 'Трансляция в один клик',
			description: 'Зрители подключаются через браузер по ссылке или QR-коду'
		},
		{
			icon: Trophy,
			title: 'Полное погружение',
			description:
				'Качество 4K и обзор 360° позволяют смотреть матч с любого ракурса'
		},
		{
			icon: Swords,
			title: 'Новый опыт',
			description:
				'Вовлечённость аудитории растёт, премиум-контент привлекает рекламодателей'
		}
	];

	interface Step {
		number: number;
		title: string;
		description: string;
	}

	const steps: Step[] = [
		{
			number: 1,
			title: 'Размещение камер',
			description:
				'Камеры VR360 устанавливаются на ключевых позициях стадиона — за воротами, по центру поля, на трибуне'
		},
		{
			number: 2,
			title: 'Обработка в облаке',
			description:
				'Видео в реальном времени передаётся в облако, где автоматически стабилизируется и адаптируется для любых устройств'
		},
		{
			number: 3,
			title: 'Трансляция зрителям',
			description:
				'Зрители подключаются по ссылке, выбирают ракурс через WebXR и смотрят матч в иммерсивном формате'
		},
		{
			number: 4,
			title: 'Интеграция с платформами',
			description:
				'RTMP/HLS pipeline интегрируется с существующими стриминговыми платформами и телеканалами через API'
		}
	];

	interface ApplicationArea {
		icon: any;
		title: string;
		description: string;
	}

	const applicationAreas: ApplicationArea[] = [
		{
			icon: Landmark,
			title: 'Виртуальные места на стадионе',
			description:
				'Трансляции с ракурса «первого ряда» для фанатов по всему миру'
		},
		{
			icon: PersonStanding,
			title: 'Экшн от первого лица',
			description:
				'Передача скорости и эмоций через камеру на шлеме или форме спортсмена'
		},
		{
			icon: LineChart,
			title: 'Анализ игр и тактики',
			description:
				'Разбор игровых моментов в 360° для тренеров и игроков с любого ракурса'
		},
		{
			icon: Lock,
			title: 'Закулисье и эксклюзивный доступ',
			description:
				'Прямые включения из раздевалок, зон разминки и пресс-центров'
		},
		{
			icon: Users,
			title: 'Интерактивные фан-зоны',
			description:
				'Виртуальные трибуны для совместного просмотра матчей и общения'
		},
		{
			icon: Mountain,
			title: 'Трансляции экстремальных видов спорта',
			description:
				'Безопасное погружение в серфинг, автогонки или скалолазание'
		}
	];

	interface AdvantageColumn {
		title: string;
		items: string[];
	}

	const advantages: AdvantageColumn[] = [
		{
			title: 'Для платформы и телеканала',
			items: [
				'Удержание премиум-аудитории',
				'Новые рекламные форматы',
				'Эксклюзивный контент'
			]
		},
		{
			title: 'Для продакшена и режиссёров',
			items: [
				'Иммерсивный сторителлинг',
				'Гибкие ракурсы',
				'Оптимизация workflows',
				'Аналитика'
			]
		},
		{
			title: 'Для зрителей и подписчиков',
			items: [
				'Эффект присутствия',
				'Интерактивный выбор ракурса',
				'Погружение без границ',
				'Доступ из любой точки мира'
			]
		}
	];

	interface CaseStudy {
		title: string;
		subtitle: string;
		description: string;
		benefits: string[];
		images: string[];
		imageAlts: string[];
	}

	const caseStudies: CaseStudy[] = [
		{
			title: 'Декабрь 2024 — ФК Краснодар vs Локомотив',
			subtitle: 'Стадион ФК «Краснодар»',
			description:
				'Первая в России VR 360 трансляция футбольного матча для широкой аудитории. Три камеры VR360 передавали видео в облако, где через RTMP→HLS pipeline транслировались зрителям в реальном времени.',
			benefits: [
				'3 камеры VR360 для панорамного захвата',
				'Разрешение 4096×2048 при потоке 15 Мбит/с',
				'WebXR для интерактивного выбора ракурса',
				'Просмотр через браузер без установки приложений'
			],
			images: [
				'/images/innovation/sports/case1-1.jpg',
				'/images/innovation/sports/case1-2.jpg',
				'/images/innovation/sports/case1-3.jpg'
			],
			imageAlts: [
				'VR 360 трансляция матча ФК Краснодар — общая панорама стадиона',
				'Камеры VR360 за воротами на матче Краснодар-Локомотив',
				'Зрительский интерфейс выбора ракурса WebXR'
			]
		},
		{
			title: 'Суперкубок — Зенит vs Краснодар',
			subtitle: 'Газпром Арена, Санкт-Петербург',
			description:
				'VR 360 трансляция Суперкубка России с Газпром Арены. Помимо основной трансляции с трёх камер, записаны лучшие моменты матча в формате VR 360 с камер на форме игроков.',
			benefits: [
				'3 камеры VR360 по периметру поля',
				'VR 360 лучшие моменты с первых лиц — Миллер, Дзюба',
				'Трансляция на крупнейших стриминговых платформах',
				'Многократный рост зрительского вовлечения'
			],
			images: [
				'/images/innovation/sports/case2-1.jpg',
				'/images/innovation/sports/case2-2.jpg',
				'/images/innovation/sports/case2-3.jpg'
			],
			imageAlts: [
				'VR 360 трансляция Суперкубка на Газпром Арене',
				'Камеры VR360 на площадке Газпром Арены',
				'Лучшие моменты матча в формате VR 360'
			]
		}
	];

	function scrollToTechnology() {
		const element = document.getElementById('technology');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>VR 360 для спортивных трансляций - Инновационные решения</title>
	<meta
		name="description"
		content="Иммерсивные VR 360 спортивные трансляции для стриминговых платформ и телеканалов. Виртуальные места на стадионе, экшн от первого лица, аналитика в 360°."
	/>
	<meta
		name="keywords"
		content="VR 360, спортивные трансляции, иммерсивные трансляции, футбол, стриминг, WebXR, панорамное видео"
	/>
</svelte:head>

<main class="min-h-screen">
	<!-- Block 1: Hero Section -->
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<!-- Background Image with Overlay -->
		<div class="absolute inset-0 z-0">
			<img
				src="/images/innovation/sports/app-area-1.png"
				alt="Спортивная трансляция в VR 360"
				class="w-full h-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"
			></div>
		</div>

		<div class="relative z-10 container mx-auto px-4 py-20 text-center">
			<ScrollReveal>
				<h1
					class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
				>
					Видеосвязь VR 360 для<br />спортивных трансляций
				</h1>
				<p
					class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
				>
					Иммерсивные трансляции спортивных событий в формате 360° — от
					виртуальных мест на стадионе до экшн-камер на форме спортсменов
				</p>
			</ScrollReveal>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
				{#each heroBenefits as benefit, i}
					<ScrollReveal delay={i * 150}>
						<GlassCard blur="lg" opacity={10} border={true} hover={true}>
							<div class="p-6 text-center">
								<div
									class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/20 mb-4"
								>
									<benefit.icon class="w-7 h-7 text-primary" />
								</div>
								<h3 class="text-lg font-semibold text-white mb-2">
									{benefit.title}
								</h3>
								<p class="text-white/70 text-sm leading-relaxed">
									{benefit.description}
								</p>
							</div>
						</GlassCard>
					</ScrollReveal>
				{/each}
			</div>

			<ScrollReveal delay={450}>
				<Button
					size="lg"
					onclick={scrollToTechnology}
					class="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-base"
				>
					<ArrowDown class="w-4 h-4 mr-2" />
					Как это работает
				</Button>
			</ScrollReveal>
		</div>
	</section>

	<!-- Block 2: How It Works -->
	<section id="technology" class="py-20 px-4">
		<div class="container mx-auto max-w-6xl">
			<ScrollReveal>
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-16"
				>
					Как это работает?
				</h2>
			</ScrollReveal>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-8">
					{#each steps as step, i}
						<ScrollReveal delay={i * 100}>
							<div class="flex gap-4">
								<div
									class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
								>
									<span class="text-primary font-bold text-lg">
										{step.number}
									</span>
								</div>
								<div>
									<h3 class="text-xl font-semibold mb-2">
										{step.title}
									</h3>
									<p class="text-muted-foreground leading-relaxed">
										{step.description}
									</p>
								</div>
							</div>
						</ScrollReveal>
					{/each}
				</div>

				<ScrollReveal delay={200}>
					<img
						src="/images/innovation/sports/app-area-2.jpg"
						alt="VR 360 камера на спортивном мероприятии"
						class="rounded-xl shadow-2xl w-full"
					/>
				</ScrollReveal>
			</div>
		</div>
	</section>

	<!-- Block 3: Application Areas -->
	<section class="py-20 px-4 bg-muted/30">
		<div class="container mx-auto max-w-6xl">
			<ScrollReveal>
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-16"
				>
					Где решение меняет<br />спортивные трансляции?
				</h2>
			</ScrollReveal>

			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
			>
				{#each applicationAreas as area, i}
					<ScrollReveal delay={i * 100}>
						<Card class="h-full">
							<CardHeader>
								<div
									class="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2"
								>
									<area.icon class="w-6 h-6 text-primary" />
								</div>
								<CardTitle class="text-lg">{area.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground leading-relaxed">
									{area.description}
								</p>
							</CardContent>
						</Card>
					</ScrollReveal>
				{/each}
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ScrollReveal delay={200}>
					<img
						src="/images/innovation/sports/app-area-1.png"
						alt="Виртуальные места на стадионе в VR 360"
						class="rounded-xl shadow-lg w-full"
					/>
				</ScrollReveal>
				<ScrollReveal delay={300}>
					<img
						src="/images/innovation/sports/app-area-3.jpg"
						alt="Экшн от первого лица в спортивной трансляции"
						class="rounded-xl shadow-lg w-full"
					/>
				</ScrollReveal>
			</div>
		</div>
	</section>

	<!-- Block 4: Advantages -->
	<section class="py-20 px-4">
		<div class="container mx-auto max-w-6xl">
			<ScrollReveal>
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-16"
				>
					Почему стриминговые платформы<br />и телеканалы заинтересованы
				</h2>
			</ScrollReveal>

			<div
				class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
			>
				{#each advantages as column, i}
					<ScrollReveal delay={i * 150}>
						<GlassCard blur="lg" opacity={10} border={true}>
							<div class="p-6">
								<h3 class="text-xl font-semibold mb-4">
									{column.title}
								</h3>
								<ul class="space-y-2">
									{#each column.items as item}
										<li class="flex items-start gap-2 text-muted-foreground">
											<span class="text-primary mt-1">•</span>
											<span>{item}</span>
										</li>
									{/each}
								</ul>
							</div>
						</GlassCard>
					</ScrollReveal>
				{/each}
			</div>

			<ScrollReveal delay={400}>
				<img
					src="/images/innovation/sports/advantages.png"
					alt="Преимущества VR 360 для спортивных трансляций"
					class="rounded-xl shadow-lg max-w-3xl mx-auto w-full"
				/>
			</ScrollReveal>
		</div>
	</section>

	<!-- Block 5 & 6: Case Studies -->
	{#each caseStudies as caseStudy, caseIndex}
	<section class={cn('py-20 px-4', caseIndex % 2 === 0 ? 'bg-muted/30' : '')}>
		<div class="container mx-auto max-w-6xl">
			<ScrollReveal>
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-4"
				>
					{caseStudy.title}
				</h2>
				<p class="text-center text-muted-foreground text-lg mb-8">
					{caseStudy.subtitle}
				</p>
			</ScrollReveal>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<ScrollReveal>
						<p class="text-muted-foreground leading-relaxed mb-6">
							{caseStudy.description}
						</p>
					</ScrollReveal>

					<ScrollReveal delay={100}>
						<ul class="space-y-3">
							{#each caseStudy.benefits as benefit}
								<li
									class="flex items-start gap-3 text-muted-foreground"
								>
									<span class="text-primary mt-0.5">✓</span>
									<span>{benefit}</span>
								</li>
							{/each}
						</ul>
					</ScrollReveal>
				</div>

				<div class="grid grid-cols-2 gap-4">
					{#each caseStudy.images as image, imgIndex}
						<ScrollReveal delay={imgIndex * 100 + 50}>
							<img
								src={image}
								alt={caseStudy.imageAlts[imgIndex]}
								class="rounded-lg shadow-lg w-full aspect-auto object-cover"
							/>
						</ScrollReveal>
					{/each}
				</div>
			</div>
		</div>
	</section>
	{/each}

	<!-- Block 7: CTA Section -->
	<section class="py-20 px-4">
		<div class="container mx-auto max-w-2xl">
			<ScrollReveal>
				<GlassCard blur="xl" opacity={10} border={true}>
					<div class="p-8 md:p-12 text-center">
						<h2 class="text-2xl md:text-3xl font-bold mb-4">
							Готовы внедрить VR 360<br />в спортивные трансляции?
						</h2>
						<p class="text-muted-foreground mb-8">
							Свяжитесь с нами для подбора оборудования и разработки решения
							для вашего спортивного мероприятия или трансляции.
						</p>
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a href={`tel:${companyInfo.phone.replace(/ /g, '')}`}>
								<Button size="lg">
									<Phone class="w-4 h-4 mr-2" />
									{companyInfo.phone}
								</Button>
							</a>
							<a href={`mailto:${companyInfo.email}`}>
								<Button variant="outline" size="lg">
									<Mail class="w-4 h-4 mr-2" />
									{companyInfo.email}
								</Button>
							</a>
						</div>
					</div>
				</GlassCard>
			</ScrollReveal>
		</div>
	</section>
</main>
