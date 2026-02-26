<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { cn } from '$lib/utils.js';
	import Pointer from '@lucide/svelte/icons/pointer';
	import Eye from '@lucide/svelte/icons/eye';
	import TrendingUp from '@lucide/svelte/icons/trending-up';
	import Video from '@lucide/svelte/icons/video';
	import Cpu from '@lucide/svelte/icons/cpu';
	import MonitorPlay from '@lucide/svelte/icons/monitor-play';
	import Plug from '@lucide/svelte/icons/plug';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import FlaskConical from '@lucide/svelte/icons/flask-conical';
	import Map from '@lucide/svelte/icons/map';
	import Users from '@lucide/svelte/icons/users';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Award from '@lucide/svelte/icons/award';
	import Phone from '@lucide/svelte/icons/phone';
	import Mail from '@lucide/svelte/icons/mail';
	import ArrowDown from '@lucide/svelte/icons/arrow-down';
	import Building2 from '@lucide/svelte/icons/building-2';

	interface HeroBenefit {
		icon: any;
		title: string;
		description: string;
	}

	const heroBenefits: HeroBenefit[] = [
		{
			icon: Pointer,
			title: 'Доступ в один клик',
			description: 'Учащиеся подключаются через браузер по ссылке или QR-коду'
		},
		{
			icon: Eye,
			title: 'Полное погружение',
			description: 'Качество 8K и обзор 360° позволяют изучать детали, как в реальности'
		},
		{
			icon: TrendingUp,
			title: 'Повышение успеваемости',
			description: 'Вовлечённость растёт на 30%, а понимание сложных тем на 25%'
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
			title: 'Съёмка',
			description: 'Камера и ПО в 8K фиксирует лекцию, лабораторный опыт или экскурсию в формате 360°'
		},
		{
			number: 2,
			title: 'Обработка',
			description: 'Облачная платформа автоматически адаптирует видео для любых устройств'
		},
		{
			number: 3,
			title: 'Просмотр',
			description: 'Студенты подключаются по ссылке, смотрят в удобном формате, общаются в чате'
		},
		{
			number: 4,
			title: 'Интеграция',
			description: 'ПО и камера просты в управлении, облако гарантирует стабильную трансляцию, интегрируется с LMS через API'
		}
	];

	interface ApplicationArea {
		icon: any;
		title: string;
		description: string;
	}

	const applicationAreas: ApplicationArea[] = [
		{
			icon: GraduationCap,
			title: 'Лекции с удалённым присутствием',
			description: 'Студенты из филиалов или на больничном могут присутствовать на лекциях в реальном времени'
		},
		{
			icon: FlaskConical,
			title: 'Виртуальные лаборатории',
			description: 'Проведение экспериментов без риска и дорогостоящего оборудования'
		},
		{
			icon: Map,
			title: 'VR-экскурсии и практика',
			description: 'Посещение предприятий, музеев, раскопок в формате 360'
		},
		{
			icon: Users,
			title: 'Командные тренинги',
			description: 'Отработка навыков в безопасной виртуальной среде'
		},
		{
			icon: BookOpen,
			title: 'Массовые онлайн-курсы (МООК)',
			description: 'Запись лекций в 360° для открытого образования'
		},
		{
			icon: Award,
			title: 'Повышение квалификации педагогов',
			description: 'Трансляции открытых уроков лучших учителей'
		}
	];

	interface AdvantageColumn {
		title: string;
		items: string[];
	}

	const advantages: AdvantageColumn[] = [
		{
			title: 'Для учебного процесса',
			items: [
				'Повышение вовлечённости',
				'Доступ к редкому оборудованию',
				'Занятия для студентов с ОВЗ',
				'Запись лекций'
			]
		},
		{
			title: 'Для преподавателей',
			items: [
				'Простота использования',
				'Инструменты обратной связи',
				'Приглашение внешних экспертов',
				'Аналитика'
			]
		},
		{
			title: 'Для студентов',
			items: [
				'Доступ к лучшим курсам',
				'Новый уровень интерактивности',
				'Удобство на любых устройствах'
			]
		}
	];

	interface Stat {
		value: string;
		label: string;
	}

	const stats: Stat[] = [
		{
			value: '94%',
			label: 'Протестировавших заявляют, что VR-формат помогает лучше понимать материал'
		},
		{
			value: '30%',
			label: 'Экономия бюджета на организацию практик'
		},
		{
			value: '500+',
			label: 'Одновременных подключений без потери качества'
		}
	];

	const moscowBenefits: string[] = [
		'Готовые модули для публикации VR-лекций',
		'Создание ресурсных центров на базе учреждения',
		'Социальный эффект – равный доступ к качественному образованию',
		'Преимущества для удалённых районов'
	];

	function scrollToTechnology() {
		const element = document.getElementById('technology');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<svelte:head>
	<title>Инновационные решения - VR 360 видеосвязь для образования</title>
	<meta
		name="description"
		content="Видеосвязь с эффектом личного присутствия для образования. VR 360 технологии для лекций, виртуальных лабораторий и экскурсий. Удалённое присутствие без установки приложений."
	/>
	<meta
		name="keywords"
		content="VR 360, видеосвязь, образование, виртуальные лаборатории, удалённое присутствие, онлайн-лекции, VR-экскурсии"
	/>
</svelte:head>

<main class="min-h-screen">
	<!-- Block 1: Hero Section -->
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<!-- Background Image with Overlay -->
		<div class="absolute inset-0 z-0">
			<img
				src="/images/innovation/image4.png"
				alt="Студенты в классе с VR технологиями"
				class="w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
		</div>

		<!-- Hero Content -->
		<div class="relative z-10 container mx-auto px-4 py-20 text-center">
			<ScrollReveal>
				<h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
					Видеосвязь с эффектом личного присутствия<br class="hidden md:block" /> для образования
				</h1>
			</ScrollReveal>

			<ScrollReveal delay={100}>
				<p class="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto mb-12 leading-relaxed">
					Откройте новые форматы обучения: удалённое присутствие на лекциях, виртуальные лаборатории,
					командные тренинги в VR 360 без установки приложений.
				</p>
			</ScrollReveal>

			<!-- Benefits Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
				{#each heroBenefits as benefit, index}
					<ScrollReveal delay={200 + index * 100}>
						<GlassCard blur="lg" opacity={20} border hover={false} class="p-6 text-left">
							<div class="flex items-start gap-4">
								<div class="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
									<svelte:component this={benefit.icon} class="w-6 h-6 text-white" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
									<p class="text-sm text-gray-300">{benefit.description}</p>
								</div>
							</div>
						</GlassCard>
					</ScrollReveal>
				{/each}
			</div>

			<!-- CTA Button -->
			<ScrollReveal delay={500}>
				<Button
					size="lg"
					class="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-white/90"
					onclick={scrollToTechnology}
				>
					Узнать больше
					<ArrowDown class="ml-2 w-5 h-5" />
				</Button>
			</ScrollReveal>
		</div>

		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
			<ArrowDown class="w-8 h-8 text-white/60" />
		</div>
	</section>

	<!-- Block 2: How It Works (Technology) -->
	<section id="technology" class="py-20 md:py-32 bg-background">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<header class="text-center mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-4">Как это работает?</h2>
					<p class="text-lg text-muted-foreground max-w-3xl mx-auto">
						Готовое решение для учебных заведений, объединяющее съёмку, обработку и доставку 360° контента
					</p>
				</header>
			</ScrollReveal>

			<div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
				<!-- Image -->
				<ScrollReveal direction="left">
					<div class="relative rounded-2xl overflow-hidden shadow-2xl">
						<img
							src="/images/innovation/image1.png"
							alt="Стенд с VR оборудованием"
							class="w-full h-auto object-cover"
						/>
					</div>
				</ScrollReveal>

				<!-- Steps -->
				<div class="space-y-6">
					{#each steps as step, index}
						<ScrollReveal delay={index * 100} direction="right">
							<div class="flex gap-4">
								<div class="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
									{step.number}
								</div>
								<div>
									<h3 class="text-xl font-semibold mb-2">{step.title}</h3>
									<p class="text-muted-foreground">{step.description}</p>
								</div>
							</div>
						</ScrollReveal>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Block 3: Application Areas -->
	<section class="py-20 md:py-32 bg-muted/30">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<header class="text-center mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-4">Где решение меняет образование?</h2>
				</header>
			</ScrollReveal>

			<!-- Application Cards Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
				{#each applicationAreas as area, index}
					<ScrollReveal delay={index * 50}>
						<Card class="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
							<CardHeader>
								<div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
									<svelte:component this={area.icon} class="w-7 h-7" />
								</div>
								<CardTitle class="text-lg">{area.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground">{area.description}</p>
							</CardContent>
						</Card>
					</ScrollReveal>
				{/each}
			</div>

			<!-- Images Row -->
			<div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
				<ScrollReveal direction="left">
					<div class="relative rounded-2xl overflow-hidden shadow-xl">
						<img
							src="/images/innovation/image5.png"
							alt="Интерактивная сессия с VR"
							class="w-full h-64 md:h-80 object-cover"
						/>
					</div>
				</ScrollReveal>
				<ScrollReveal direction="right">
					<div class="relative rounded-2xl overflow-hidden shadow-xl">
						<img
							src="/images/innovation/image2.jpg"
							alt="VR-экскурсии"
							class="w-full h-64 md:h-80 object-cover"
						/>
					</div>
				</ScrollReveal>
			</div>
		</div>
	</section>

	<!-- Block 4: Advantages -->
	<section class="py-20 md:py-32 bg-background">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<header class="text-center mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-4">
						Почему вузы и школы заинтересованы в данной технологии
					</h2>
				</header>
			</ScrollReveal>

			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				{#each advantages as column, index}
					<ScrollReveal delay={index * 100}>
						<Card class="h-full">
							<CardHeader>
								<CardTitle class="text-xl text-center">{column.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<ul class="space-y-3">
									{#each column.items as item}
										<li class="flex items-start gap-3">
											<div class="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
												<div class="w-2 h-2 rounded-full bg-primary"></div>
											</div>
											<span class="text-muted-foreground">{item}</span>
										</li>
									{/each}
								</ul>
							</CardContent>
						</Card>
					</ScrollReveal>
				{/each}
			</div>
		</div>
	</section>

	<!-- Block 5: Stats -->
	<section class="py-20 md:py-32 bg-primary text-primary-foreground">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<header class="text-center mb-16">
					<h2 class="text-3xl md:text-4xl font-bold mb-4">Цифры и факты</h2>
				</header>
			</ScrollReveal>

			<div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				{#each stats as stat, index}
					<ScrollReveal delay={index * 100}>
						<div class="text-center">
							<div class="text-5xl md:text-6xl font-bold mb-4">{stat.value}</div>
							<p class="text-lg opacity-90">{stat.label}</p>
						</div>
					</ScrollReveal>
				{/each}
			</div>
		</div>
	</section>

	<!-- Block 6: For Moscow -->
	<section class="py-20 md:py-32 bg-muted/30">
		<div class="container mx-auto px-4">
			<div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
				<!-- Content -->
				<ScrollReveal direction="left">
					<header class="mb-8">
						<h2 class="text-3xl md:text-4xl font-bold mb-6">
							Технология VR 360 телеприсутствия в образовательной системе Москвы
						</h2>
					</header>
					<p class="text-lg text-muted-foreground mb-8 leading-relaxed">
						Вовлечённость учеников во время тестового испытания повысилась, 92% отметили, что
						VR-экскурсии интереснее обычных видео. Решение рекомендовано к тиражированию в медколледжах
						Москвы.
					</p>
					<ul class="space-y-4">
						{#each moscowBenefits as benefit}
							<li class="flex items-start gap-3">
								<div class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
									<div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
								</div>
								<span class="text-foreground">{benefit}</span>
							</li>
						{/each}
					</ul>
				</ScrollReveal>

				<!-- Image -->
				<ScrollReveal direction="right">
					<div class="relative rounded-2xl overflow-hidden shadow-2xl">
						<img
							src="/images/innovation/image3.jpg"
							alt="Центр управления VR системой"
							class="w-full h-auto object-cover"
						/>
					</div>
				</ScrollReveal>
			</div>
		</div>
	</section>

	<!-- Block 7: CTA Form -->
	<section class="py-20 md:py-32 bg-background">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<GlassCard
					blur="lg"
					opacity={10}
					border
					hover={false}
					class="max-w-4xl mx-auto text-center p-12 md:p-16"
				>
					<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
						<Building2 class="w-8 h-8 text-primary" />
					</div>
					<h2 class="text-3xl md:text-4xl font-bold mb-6">
						Готовы внедрить VR 360 в вашем учебном заведении?
					</h2>
					<p class="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
						Оставьте заявку – мы проведём демонстрацию для вашей администрации и преподавателей
					</p>

					<!-- Contact Info -->
					<div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
						<a
							href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
							class={cn(
								'flex items-center gap-3 text-lg font-medium',
								'text-primary hover:text-primary/80 transition-colors'
							)}
						>
							<Phone class="w-5 h-5" />
							{companyInfo.phone}
						</a>
						<a
							href={`mailto:${companyInfo.email}`}
							class={cn(
								'flex items-center gap-3 text-lg font-medium',
								'text-primary hover:text-primary/80 transition-colors'
							)}
						>
							<Mail class="w-5 h-5" />
							{companyInfo.email}
						</a>
					</div>

					<Button size="lg" href="/contact" class="text-lg px-8 py-6">
						Связаться с нами
					</Button>
				</GlassCard>
			</ScrollReveal>
		</div>
	</section>
</main>
