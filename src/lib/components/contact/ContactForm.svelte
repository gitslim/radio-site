<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { validateForm, isFormValid, type FormValidationErrors } from '$lib/utils/form.js';
	import type { ContactFormData } from '$lib/utils/form.js';
	import { companyInfo } from '$lib/data/company';

	interface ContactFormProps {
		service?: string;
	}

	let { service = '' }: ContactFormProps = $props();

	// Form state
	let formData = $state<ContactFormData>({
		name: '',
		company: '',
		email: '',
		phone: '',
		service,
		message: ''
	});

	let errors = $state<FormValidationErrors>({});
	let isSubmitting = $state(false);

	// Handle input changes
	const handleInput = (field: keyof ContactFormData, value: string): void => {
		formData[field] = value as never;
	};

	// Validate form on submission
	const validate = (): boolean => {
		errors = validateForm(formData);
		return isFormValid(errors);
	};

	// Submit form - construct mailto: link
	const handleSubmit = (): void => {
		if (!validate()) {
			return;
		}

		isSubmitting = true;

		// Construct mailto: link with pre-filled data
		const email = companyInfo.email;
		const subject = encodeURIComponent(
			`Запрос услуги: ${formData.service || 'Общий вопрос'}`
		);

		const body = encodeURIComponent(
			`Имя: ${formData.name}\n` +
				`Компания: ${formData.company || 'Не указана'}\n` +
				`Email: ${formData.email}\n` +
				`Телефон: ${formData.phone || 'Не указан'}\n` +
				`Услуга: ${formData.service || 'Не указана'}\n\n` +
				`Сообщение:\n${formData.message}`
		);

		// Open mailto: link
		const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
		window.location.href = mailtoLink;

		isSubmitting = false;
	};

	// Handle blur to show validation errors
	const handleBlur = (field: keyof ContactFormData): void => {
		errors = validateForm(formData);
	};
</script>

<form onsubmit={(e) => e.preventDefault()} class="space-y-6">
	<!-- Name field -->
	<div class="space-y-2">
		<label for="name" class="text-sm font-medium text-foreground">
			Ваше имя <span class="text-destructive">*</span>
		</label>
		<Input
			id="name"
			name="name"
			type="text"
			placeholder="Введите ваше имя"
			value={formData.name}
			oninput={(e) => handleInput('name', e.currentTarget.value)}
			onblur={() => handleBlur('name')}
			class={cn(errors.name && 'border-destructive')}
			aria-invalid={!!errors.name}
			aria-describedby={errors.name ? 'name-error' : undefined}
			required
		/>
		{#if errors.name}
			<p id="name-error" class="text-sm text-destructive">{errors.name}</p>
		{/if}
	</div>

	<!-- Company field (optional) -->
	<div class="space-y-2">
		<label for="company" class="text-sm font-medium text-foreground">Компания</label>
		<Input
			id="company"
			name="company"
			type="text"
			placeholder="Название компании"
			value={formData.company}
			oninput={(e) => handleInput('company', e.currentTarget.value)}
		/>
	</div>

	<!-- Email field -->
	<div class="space-y-2">
		<label for="email" class="text-sm font-medium text-foreground">
			Email <span class="text-destructive">*</span>
		</label>
		<Input
			id="email"
			name="email"
			type="email"
			placeholder="example@email.com"
			value={formData.email}
			oninput={(e) => handleInput('email', e.currentTarget.value)}
			onblur={() => handleBlur('email')}
			class={cn(errors.email && 'border-destructive')}
			aria-invalid={!!errors.email}
			aria-describedby={errors.email ? 'email-error' : undefined}
			required
		/>
		{#if errors.email}
			<p id="email-error" class="text-sm text-destructive">{errors.email}</p>
		{/if}
	</div>

	<!-- Phone field (optional) -->
	<div class="space-y-2">
		<label for="phone" class="text-sm font-medium text-foreground">Телефон</label>
		<Input
			id="phone"
			name="phone"
			type="tel"
			placeholder="+7 (999) 123-45-67"
			value={formData.phone}
			oninput={(e) => handleInput('phone', e.currentTarget.value)}
			onblur={() => handleBlur('phone')}
			class={cn(errors.phone && 'border-destructive')}
			aria-invalid={!!errors.phone}
			aria-describedby={errors.phone ? 'phone-error' : undefined}
		/>
		{#if errors.phone}
			<p id="phone-error" class="text-sm text-destructive">{errors.phone}</p>
		{/if}
	</div>

	<!-- Service field (optional, pre-filled if provided) -->
	<div class="space-y-2">
		<label for="service" class="text-sm font-medium text-foreground">Услуга</label>
		<Input
			id="service"
			name="service"
			type="text"
			placeholder="Услуга, которая вас интересует"
			value={formData.service}
			oninput={(e) => handleInput('service', e.currentTarget.value)}
		/>
	</div>

	<!-- Message field -->
	<div class="space-y-2">
		<label for="message" class="text-sm font-medium text-foreground">
			Сообщение <span class="text-destructive">*</span>
		</label>
		<Textarea
			id="message"
			name="message"
			placeholder="Опишите ваш запрос..."
			value={formData.message}
			oninput={(e) => handleInput('message', e.currentTarget.value)}
			onblur={() => handleBlur('message')}
			class={cn('min-h-[150px]', errors.message && 'border-destructive')}
			aria-invalid={!!errors.message}
			aria-describedby={errors.message ? 'message-error' : undefined}
			required
		/>
		{#if errors.message}
			<p id="message-error" class="text-sm text-destructive">{errors.message}</p>
		{/if}
	</div>

	<!-- Submit button -->
	<Button type="button" onclick={handleSubmit} disabled={isSubmitting} class="w-full">
		{#if isSubmitting}
			Отправка...
		{:else}
			Отправить сообщение
		{/if}
	</Button>
</form>
