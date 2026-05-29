<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	export interface HeaderProps {
		currentPath: string;
		children?: Snippet;
	}

	export interface NavLink {
		label: string;
		href: string;
		children?: { label: string; href: string }[];
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

	const navLinks: NavLink[] = [
		{ label: 'Главная', href: '/' },
		{
			label: 'Инновационные решения',
			href: '/innovation',
			children: [
				{ label: 'Образование', href: '/innovation/education' },
				{ label: 'Спортивные трансляции', href: '/innovation/sports' }
			]
		},
		{ label: 'Оборудование', href: '/equipment' },
		{ label: 'О компании', href: '/about' },
		{ label: 'Контакты', href: '/contact' }
	];

	function isLinkActive(link: NavLink): boolean {
		if (currentPath === '/' && link.href === '/') return true;
		if (currentPath.startsWith(link.href)) return true;
		if (link.children?.some((c) => currentPath.startsWith(c.href))) return true;
		return false;
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
										isLinkActive(link)
											? 'text-primary bg-accent'
											: 'text-muted-foreground hover:text-primary hover:bg-accent'
									)}
									aria-current={isLinkActive(link) ? 'page' : undefined}
								>
									{link.label}
								</a>
							{/snippet}
						</SheetClose>
						{#if link.children}
							{#each link.children as child}
								<SheetClose>
									{#snippet child({ props })}
										<a
											{...props}
											href={child.href}
											class={cn(
												'flex items-center py-3 px-6 pl-8 text-sm transition-all duration-200 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent',
												isLinkActive({ label: child.label, href: child.href }) ? 'text-primary bg-accent/50' : ''
											)}
										>
											{child.label}
										</a>
									{/snippet}
								</SheetClose>
							{/each}
						{/if}
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
				{#if link.children}
					<div class="relative group">
						<a
							href={link.href}
							class={cn(
								'text-sm font-medium transition-colors hover:text-primary py-2 flex items-center gap-1',
								isLinkActive(link)
									? 'text-primary'
									: 'text-muted-foreground'
							)}
							aria-current={isLinkActive(link) ? 'page' : undefined}
						>
							{link.label}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="transition-transform group-hover:rotate-180"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
						</a>
						<!-- Dropdown menu -->
						<div
							class="absolute top-full left-0 mt-1 w-56 rounded-lg border border-border bg-background/95 backdrop-blur shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
						>
							<div class="p-2">
								{#each link.children as child}
									<a
										href={child.href}
										class={cn(
											'block px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-primary',
											isLinkActive({ label: child.label, href: child.href })
												? 'text-primary bg-accent'
												: 'text-muted-foreground'
										)}
									>
										{child.label}
									</a>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<a
						href={link.href}
						class={cn(
							'text-sm font-medium transition-colors hover:text-primary py-2',
							isLinkActive(link)
								? 'text-primary'
								: 'text-muted-foreground'
						)}
						aria-current={isLinkActive(link) ? 'page' : undefined}
					>
						{link.label}
					</a>
				{/if}
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
