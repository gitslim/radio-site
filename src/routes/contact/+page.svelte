<script lang="ts">
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import { companyInfo } from '$lib/data/company';
	import Mail from '@lucide/svelte/icons/mail';
</script>

<svelte:head>
	<title>Контакты - ТехКино</title>
	<meta
		name="description"
		content="Свяжитесь с ООО Радиотехника-к для аренды профессионального оборудования"
	/>
	<meta
		name="keywords"
		content="контакты, ООО Радиотехника-к, email, телефон, адрес"
	/>
</svelte:head>

<main class="container mx-auto px-4 py-12 max-w-6xl">
	<header class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
		<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
			Свяжитесь с нами для консультации и подбора оборудования для вашего проекта
		</p>
	</header>

	<div class="grid lg:grid-cols-2 gap-12">
		<!-- Contact Form -->
		<section>
			<header class="mb-8">
				<h2 class="text-2xl font-bold mb-2">Отправьте нам сообщение</h2>
				<p class="text-muted-foreground">
					Заполните форму, и мы свяжемся с вами в ближайшее время
				</p>
			</header>
			<ContactForm />
		</section>

		<!-- Contact Information -->
		<section class="space-y-8">
			<header class="mb-8">
				<h2 class="text-2xl font-bold mb-2">Контактная информация</h2>
				<p class="text-muted-foreground">
					Альтернативные способы связи с нами
				</p>
			</header>

			<!-- Direct Email -->
			<div class="flex items-start space-x-4 p-6 rounded-lg border bg-card">
				<div class="flex-shrink-0">
					<Mail class="h-6 w-6 text-primary" aria-hidden="true" />
				</div>
				<div>
					<h3 class="font-semibold mb-2">Email</h3>
					<a
						href={`mailto:${companyInfo.email}`}
						class="text-primary hover:underline transition-colors"
					>
						{companyInfo.email}
					</a>
				</div>
			</div>

			<!-- Company Name -->
			<div class="p-6 rounded-lg border bg-card">
				<h3 class="font-semibold mb-2">Название компании</h3>
				<p class="text-muted-foreground">{companyInfo.name}</p>
			</div>

			<!-- Legal Address -->
			<div class="p-6 rounded-lg border bg-card">
				<h3 class="font-semibold mb-2">Юридический адрес</h3>
				<p class="text-muted-foreground text-sm leading-relaxed">
					{companyInfo.legalAddress}
				</p>
			</div>

			<!-- Website -->
			<div class="p-6 rounded-lg border bg-card">
				<h3 class="font-semibold mb-2">Веб-сайт</h3>
				<a
					href={`https://${companyInfo.website}`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary hover:underline transition-colors"
				>
					{companyInfo.website}
				</a>
			</div>
		</section>
	</div>
</main>
