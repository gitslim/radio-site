<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { Button } from '$lib/components/ui/button';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { cn } from '$lib/utils.js';
	import GraduationCap from '@lucide/svelte/icons/graduation-cap';
	import Trophy from '@lucide/svelte/icons/trophy';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import Phone from '@lucide/svelte/icons/phone';
	import Mail from '@lucide/svelte/icons/mail';

	interface SolutionCard {
		icon: any;
		title: string;
		description: string;
		href: string;
	}

	const solutions: SolutionCard[] = [
		{
			icon: GraduationCap,
			title: 'VR 360 для образования',
			description:
				'Видеосвязь с эффектом личного присутствия для лекций, виртуальных лабораторий и экскурсий. Внедрено в систему образования Москвы.',
			href: '/innovation/education'
		},
		{
			icon: Trophy,
			title: 'VR 360 для спортивных трансляций',
			description:
				'Иммерсивные трансляции спортивных событий в формате 360° для стриминговых платформ, телеканалов и зрителей по всему миру.',
			href: '/innovation/sports'
		}
	];
</script>

<svelte:head>
	<title>Инновационные решения - Радиотехника-К</title>
	<meta
		name="description"
		content="Инновационные решения на базе VR 360 технологии: видеосвязь для образования и иммерсивные спортивные трансляции."
	/>
	<meta
		name="keywords"
		content="VR 360, инновационные решения, видеосвязь, образование, спортивные трансляции, иммерсивные технологии"
	/>
</svelte:head>

<main class="min-h-screen">
	<!-- Hero Section -->
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<div class="absolute inset-0 z-0">
			<img
				src="/images/innovation/image4.png"
				alt="Инновационные VR 360 решения"
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
					Инновационные решения
				</h1>
				<p
					class="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed"
				>
					Передовые VR 360 технологии для образования и спортивных трансляций —
					от виртуальных лекций до иммерсивных трансляций с эффектом личного
					присутствия.
				</p>
			</ScrollReveal>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{#each solutions as solution, i}
					<ScrollReveal delay={i * 150}>
						<a href={solution.href} class="block h-full">
							<GlassCard blur="lg" opacity={10} border={true} hover={true}>
								<div class="p-8 text-center">
									<div
										class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6"
									>
										<solution.icon
											class="w-8 h-8 text-primary"
										/>
									</div>
									<h2
										class="text-xl md:text-2xl font-semibold text-white mb-4"
									>
										{solution.title}
									</h2>
									<p
										class="text-white/70 mb-6 leading-relaxed"
									>
										{solution.description}
									</p>
									<span
										class="inline-flex items-center gap-2 text-primary font-medium text-sm transition-transform hover:gap-3"
									>
										Подробнее <ArrowRight class="w-4 h-4" />
									</span>
								</div>
							</GlassCard>
						</a>
					</ScrollReveal>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-4">
		<div class="container mx-auto max-w-2xl">
			<ScrollReveal>
				<GlassCard blur="xl" opacity={10} border={true}>
					<div class="p-8 md:p-12 text-center">
						<h2 class="text-2xl md:text-3xl font-bold mb-4">
							Нужна консультация?
						</h2>
						<p class="text-muted-foreground mb-8">
							Свяжитесь с нами, чтобы подобрать оптимальное VR 360 решение для
							вашей задачи.
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
