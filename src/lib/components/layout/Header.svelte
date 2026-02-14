<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	export interface HeaderProps {
		currentPath: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Menu, Phone } from '@lucide/svelte';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
		SheetClose
	} from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { companyInfo } from '$lib/data/company';

	let { currentPath }: HeaderProps = $props();
	let isMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Главная', href: '/' },
		{ label: 'Оборудование', href: '/equipment' },
		{ label: 'О компании', href: '/about' },
		{ label: 'Контакты', href: '/contact' }
	];

	function isLinkActive(href: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<header
	class={cn(
		'sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
	)}
>
	<div class="container mx-auto flex h-16 items-center px-4 justify-between">
		<!-- Mobile Menu Button (hidden on desktop) -->
		<div class="md:hidden">
			<Sheet bind:open={isMenuOpen}>
				<SheetTrigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon"
							aria-label="Открыть меню"
						>
							<Menu class="h-5 w-5" />
						</Button>
					{/snippet}
				</SheetTrigger>

				<SheetContent side="left" class="w-[320px]">
					<SheetHeader>
						<SheetTitle>Меню</SheetTitle>
					</SheetHeader>
					<nav class="flex flex-col space-y-0 mt-4" aria-label="Mobile navigation">
						{#each navLinks as link, index}
							<SheetClose>
								{#snippet child({ props })}
									<a
										{...props}
										href={link.href}
										class={cn(
											'flex items-center py-3.5 px-4 text-sm font-medium transition-all duration-200 hover:scale-[1.02] rounded-lg border-b border-border/50',
											index === navLinks.length - 1 ? 'border-b-0' : '',
											isLinkActive(link.href)
												? 'text-primary bg-accent'
												: 'text-muted-foreground hover:text-primary hover:bg-accent'
										)}
										aria-current={isLinkActive(link.href) ? 'page' : undefined}
									>
										{link.label}
									</a>
								{/snippet}
							</SheetClose>
						{/each}
					</nav>
					<div class="mt-8 pt-4 border-t">
						<a
							href={`tel:${companyInfo.phone.replace(/ /g, '')}`}
							class="flex items-center space-x-3 py-3.5 px-4 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-200 hover:scale-[1.02]"
						>
							<Phone class="h-4 w-4" aria-hidden="true" />
							<span>{companyInfo.phone}</span>
						</a>
					</div>
				</SheetContent>
			</Sheet>
		</div>

		<!-- Logo (first on desktop, second on mobile) -->
		<a
			href="/"
			class="flex items-center gap-2 hover:opacity-80 transition-opacity"
			aria-label="Перейти на главную страницу"
		>
			<img
				src="/images/logo.png"
				alt=""
				class="h-8 w-8 flex-shrink-0"
				aria-hidden="true"
			/>
			<span class="font-bold text-primary text-lg tracking-tight max-w-[150px]">
				Радиотехника-К
			</span>
		</a>

		<!-- Desktop Navigation (hidden on mobile, after logo on desktop) -->
		<nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class={cn(
						'text-sm font-medium transition-colors hover:text-primary py-2',
						isLinkActive(link.href)
							? 'text-primary'
							: 'text-muted-foreground'
					)}
					aria-current={isLinkActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Phone Number (hidden on mobile, last on desktop) -->
		<a
			href={`tel:${companyInfo.phone.replace(/ /g, '')}`}
			class="hidden md:flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
		>
			<Phone class="h-4 w-4" aria-hidden="true" />
			<span>{companyInfo.phone}</span>
		</a>
	</div>
</header>
