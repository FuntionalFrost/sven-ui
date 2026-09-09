<script lang="ts">
	import {
		Button,
		ButtonGroup,
		Badge,
		Avatar,
		AvatarGroup,
		Kbd,
		Icon,
		Spinner,
		Progress,
		Skeleton,
		Link,
		Input,
		Textarea,
		Checkbox,
		Switch,
		Select,
		RadioGroup,
		Slider,
		FormField,
		Container,
		Header,
		Footer,
		Card,
		Divider,
		Tabs,
		Pagination,
		CommandPalette,
		DropdownMenu,
		Modal,
		Slideover,
		Popover,
		Tooltip,
		Alert,
		Accordion,
		DataTable,
		Chip,
		Meter,
		ColorPicker,
		ContextMenu,
		useShortcuts,
		OgImage,
		toast,
		theme
	} from '$lib';
	import { siteConfig } from '../site.config';

	// Interactive Dialog & Command State
	let commandOpen = $state(false);
	let modalOpen = $state(false);
	let slideoverOpen = $state(false);

	// Form State
	let demoEmail = $state('');
	let demoName = $state('Alex Mercer');
	let demoPlan = $state('pro');
	let demoBio = $state('Solo developer building indie SaaS with SvelteKit & Sven UI.');
	let demoNotifications = $state(true);
	let demoMarketing = $state(false);
	let demoVolume = $state(75);
	let demoPaginationPage = $state(2);
	let demoActiveTab = $state('preview');

	// Active Docs Nav
	let activeDocSection = $state('intro');

	// CLI Copy state
	let copiedCli = $state(false);
	async function copyCli() {
		try {
			await navigator.clipboard.writeText('pnpm add sven-ui');
			copiedCli = true;
			toast.success('Copied to clipboard: pnpm add sven-ui');
			setTimeout(() => (copiedCli = false), 2000);
		} catch {
			toast.info('Command: pnpm add sven-ui');
		}
	}

	// Interactive Live Accent Theme Switcher
	const accentThemes = [
		{ name: 'Svelte Flame', color: '#ff3e00' },
		{ name: 'Sunset Amber', color: '#f59e0b' },
		{ name: 'Emerald Mint', color: '#10b981' },
		{ name: 'Sky Cyan', color: '#0ea5e9' },
		{ name: 'Electric Violet', color: '#8b5cf6' },
		{ name: 'Neon Rose', color: '#f43f5e' }
	];
	let activeAccent = $state('#ff3e00');

	function switchAccent(color: string) {
		activeAccent = color;
		if (typeof document !== 'undefined') {
			document.documentElement.style.setProperty('--color-primary-500', color);
			document.documentElement.style.setProperty('--color-primary-600', color);
		}
		toast.info(`Primary accent updated`);
	}

	// Interactive Svelte 5 Runes State Inspector
	let runeCounter = $state(6);
	let runeMultiplier = $state(2);
	let runeTotal = $derived(runeCounter * runeMultiplier);
	let runeStatus = $derived(
		runeTotal >= 20 ? 'Max Capacity' : runeTotal >= 10 ? 'High Performance' : 'Optimal'
	);

	// Dynamic OG Demo State
	let ogTitle = $state('Building Indie SaaS with SvelteKit');
	let ogDesc = $state(
		'How Sven UI delivers 100% DRY components, Tailwind v4 tokens, and automated SEO.'
	);
	let ogBadge = $state('Case Study');
	let ogTheme = $state<'dark' | 'light'>('dark');

	// DataTable Demo Data
	const demoTableData = [
		{
			id: 1,
			name: 'Rich Harris',
			role: 'Creator of Svelte',
			team: 'Core',
			stars: 78500,
			status: 'Active'
		},
		{
			id: 2,
			name: 'Sébastien Chopin',
			role: 'Creator of Nuxt',
			team: 'Nuxt Labs',
			stars: 54200,
			status: 'Active'
		},
		{
			id: 3,
			name: 'Alex Mercer',
			role: 'Solo Developer',
			team: 'Indie SaaS',
			stars: 1200,
			status: 'Building'
		},
		{
			id: 4,
			name: 'Elena Rostova',
			role: 'Lead Architect',
			team: 'Design Systems',
			stars: 3400,
			status: 'Active'
		}
	];
	let selectedRows = $state<typeof demoTableData>([]);
	let tableSearch = $state('');

	// ColorPicker Demo State
	let customThemeColor = $state('#ff3e00');

	// Meter Demo State
	let cpuMeter = $state(68);

	// Context Menu items
	const contextMenuItems = [
		{ id: '1', label: 'Inspect Component', icon: 'sparkles' },
		{ id: '2', label: 'Copy Source Code', icon: 'copy', shortcut: '⌘C' },
		{ id: 'sep-1', label: '', separator: true },
		{
			id: '3',
			label: 'Open in Docs',
			icon: 'external-link',
			onSelect: () => toast.info('Opened documentation')
		}
	];

	// Global Keyboard Shortcuts (Nuxt UI useShortcuts parity)
	useShortcuts({
		meta_k: () => (commandOpen = true)
	});

	// Command Palette items
	const commandItems = [
		{
			id: 'comp-btn',
			label: 'Button Component',
			description: 'Explore Button variants & states',
			icon: 'sparkles',
			group: 'Components',
			shortcut: 'B',
			href: '#components'
		},
		{
			id: 'comp-form',
			label: 'Form Controls & Inputs',
			description: 'Inputs, Selects, Switches, Sliders',
			icon: 'check',
			group: 'Components',
			shortcut: 'F',
			href: '#forms'
		},
		{
			id: 'seo-og',
			label: 'Dynamic OG Image Studio',
			description: 'Test live Open Graph SVG generator',
			icon: 'sparkles',
			group: 'SEO Suite',
			shortcut: 'O',
			href: '#seo-studio'
		},
		{
			id: 'seo-robots',
			label: 'View /robots.txt',
			description: 'Inspect live robots.txt endpoint',
			icon: 'external-link',
			group: 'SEO Suite',
			href: '/robots.txt'
		},
		{
			id: 'seo-sitemap',
			label: 'View /sitemap.xml',
			description: 'Inspect live sitemap.xml endpoint',
			icon: 'external-link',
			group: 'SEO Suite',
			href: '/sitemap.xml'
		},
		{
			id: 'theme-toggle',
			label: 'Toggle Dark / Light Mode',
			description: 'Switch application color mode',
			icon: 'sun',
			group: 'Actions',
			shortcut: 'T',
			onSelect: () => theme.toggle()
		}
	];

	// Menu items for Dropdown demo
	const menuItems = [
		{ id: '1', label: 'Edit Profile', icon: 'sparkles' },
		{ id: '2', label: 'Account Settings', icon: 'info', shortcut: '⌘S' },
		{ id: 'sep-1', label: '', separator: true },
		{ id: '3', label: 'Documentation', icon: 'external-link' },
		{
			id: '4',
			label: 'Log out',
			icon: 'cross',
			destructive: true,
			onSelect: () => toast.error('Logged out')
		}
	];

	// Accordion items
	const faqItems = [
		{
			value: 'item-1',
			title: 'Why build Sven UI for SvelteKit?',
			content:
				'Nuxt UI v4 is widely considered the gold standard for full-stack developer ergonomics in Vue. Sven UI brings that exact level of polish, Tailwind CSS v4 design tokens, accessible primitives, and built-in Nuxt SEO parity to SvelteKit 2.7+ and Svelte 5 with authentic Svelte aesthetics.'
		},
		{
			value: 'item-2',
			title: 'How does it follow the DRY principle?',
			content:
				'You define your brand, metadata, social links, author, and theme colors in a single src/site.config.ts file. The framework automatically derives your meta tags, OpenGraph cards, Twitter cards, Schema.org JSON-LD, robots.txt, sitemap.xml, PWA manifest, favicons, header, and footer from that single source of truth.'
		},
		{
			value: 'item-3',
			title: 'How do I add it to existing SvelteKit projects?',
			content:
				'Simply import sven.css in your layout, wrap your root +layout.svelte with <SvenApp config={siteConfig}>, and create two 1-line server routes for /robots.txt and /sitemap.xml. That is all!'
		}
	];
</script>

<!-- Navigation Header -->
<Header config={siteConfig} onOpenCommand={() => (commandOpen = true)}>
	{#snippet actions()}
		<Button
			variant="solid"
			color="primary"
			size="sm"
			icon="sparkles"
			onclick={() => toast.success('Sven UI is ready for production!')}
		>
			Get Started
		</Button>
	{/snippet}
</Header>

<!-- Command Palette Modal -->
<CommandPalette bind:open={commandOpen} items={commandItems} />

<main
	class="flex-1 bg-white text-neutral-900 transition-colors dark:bg-[#121212] dark:text-neutral-100"
>
	<!-- HERO SECTION (Nuxt UI Structure with Authentic Svelte Flame Theme) -->
	<section
		class="relative overflow-hidden border-b border-neutral-200/60 pt-16 pb-20 md:pt-24 md:pb-28 dark:border-neutral-800/60"
	>
		<!-- Svelte Flame ambient glowing orbs -->
		<div
			class="pointer-events-none absolute -top-40 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#ff3e00]/15 blur-[120px]"
		></div>
		<div
			class="pointer-events-none absolute top-1/2 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-[#ea580c]/10 blur-[100px]"
		></div>

		<Container size="2xl">
			<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
				<!-- Left Column: Hero Headline, CTAs, Features -->
				<div class="space-y-8 lg:col-span-6">
					<div class="space-y-4">
						<h1
							class="text-4xl leading-[1.1] font-extrabold tracking-tight text-neutral-900 sm:text-6xl dark:text-white"
						>
							The Intuitive <br />
							<span
								class="bg-gradient-to-r from-[#ff3e00] via-[#ff6a00] to-[#ff9900] bg-clip-text text-transparent"
							>
								Svelte UI Library
							</span>
						</h1>

						<p
							class="max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300"
						>
							A comprehensive Svelte 5 UI component library (SvelteKit optional) with 25+
							accessible, Tailwind CSS v4 components and built-in Nuxt SEO parity for building
							modern web applications.
						</p>
					</div>

					<!-- CTAs -->
					<div class="flex flex-wrap items-center gap-4">
						<Button
							href="#docs"
							variant="solid"
							color="primary"
							size="md"
							class="bg-[#ff3e00] font-semibold shadow-lg shadow-[#ff3e00]/25 hover:bg-[#ea3400]"
						>
							Get started
						</Button>
						<Button
							href="#components"
							variant="outline"
							color="neutral"
							size="md"
							trailingIcon="chevron-right"
						>
							Explore components
						</Button>

						<!-- 1-Click CLI Quick Copy Bar -->
						<button
							type="button"
							onclick={copyCli}
							class="group flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-100/80 px-3.5 py-2 font-mono text-sm font-medium text-neutral-700 transition hover:border-[#ff3e00]/50 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:border-[#ff3e00]/50"
						>
							<span class="text-neutral-400 dark:text-neutral-500">$</span>
							<span>pnpm add sven-ui</span>
							<span class="ml-1 text-neutral-400 group-hover:text-[#ff3e00]">
								{#if copiedCli}
									<Icon name="check" size="xs" class="text-emerald-500" />
								{:else}
									<Icon name="copy" size="xs" />
								{/if}
							</span>
						</button>
					</div>

					<!-- Interactive Accent Palette Swatches -->
					<div class="flex items-center gap-3 pt-2">
						<span class="text-sm font-semibold text-neutral-600 dark:text-neutral-300">Accent:</span
						>
						<div class="flex items-center gap-1.5">
							{#each accentThemes as themeItem}
								<button
									type="button"
									onclick={() => switchAccent(themeItem.color)}
									class="h-5 w-5 rounded-full transition-transform hover:scale-110 {activeAccent ===
									themeItem.color
										? 'scale-110 ring-2 ring-neutral-900 ring-offset-2 dark:ring-white'
										: ''}"
									style="background-color: {themeItem.color};"
									title={themeItem.name}
									aria-label={themeItem.name}
								></button>
							{/each}
						</div>
					</div>

					<!-- 3 Value Props with Svelte Flame Accents -->
					<div class="space-y-4 border-t border-neutral-200/60 pt-4 dark:border-neutral-800/60">
						<!-- Feature 1 -->
						<div class="flex items-start gap-3.5">
							<div
								class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#ff3e00]/10 text-[#ff3e00]"
							>
								<svg
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2zm0-10h2v8h-2z"
									/>
								</svg>
							</div>
							<div>
								<h3 class="text-base font-semibold text-neutral-900 dark:text-white">
									Styled with Tailwind CSS v4
								</h3>
								<p class="text-sm text-neutral-600 dark:text-neutral-400">
									Beautifully styled by default with native <code class="text-[#ff3e00]"
										>@theme</code
									> tokens, overwrite any style you want.
								</p>
							</div>
						</div>

						<!-- Feature 2 -->
						<div class="flex items-start gap-3.5">
							<div
								class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#ff6a00]/10 text-[#ff6a00]"
							>
								<svg
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<path d="M4 6h16M4 12h16M4 18h7" />
								</svg>
							</div>
							<div>
								<h3 class="text-base font-semibold text-neutral-900 dark:text-white">
									Accessible with Bits UI & Runes
								</h3>
								<p class="text-sm text-neutral-600 dark:text-neutral-400">
									Robust accessibility out of the box powered by pure Svelte 5 runes and snippets.
								</p>
							</div>
						</div>

						<!-- Feature 3 -->
						<div class="flex items-start gap-3.5">
							<div
								class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-500"
							>
								<span class="font-mono text-sm font-bold">TS</span>
							</div>
							<div>
								<h3 class="text-base font-semibold text-neutral-900 dark:text-white">
									Type-safe & Zero-Config SEO
								</h3>
								<p class="text-sm text-neutral-600 dark:text-neutral-400">
									Auto-complete and type safety for all components plus automated dynamic OG images,
									robots.txt, and sitemaps.
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: The Component Mosaic Grid with Svelte Theme -->
				<div class="lg:col-span-6">
					<div class="grid grid-cols-2 gap-4">
						<!-- Mosaic 1: Login Card -->
						<div
							class="space-y-3 rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-1.5">
									<div class="h-2 w-2 rounded-full bg-[#ff3e00]"></div>
									<div class="h-2 w-2 rounded-full bg-amber-400"></div>
								</div>
								<span class="text-xs font-medium text-neutral-400">Login</span>
							</div>
							<div class="space-y-2">
								<div
									class="flex h-7 items-center rounded-md border border-neutral-200/60 bg-white/70 px-2 text-xs text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/70"
								>
									user@sven-ui.dev
								</div>
								<div
									class="flex h-7 items-center rounded-md border border-neutral-200/60 bg-white/70 px-2 text-xs text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/70"
								>
									••••••••••••
								</div>
								<button
									type="button"
									class="w-full rounded-md bg-[#ff3e00] py-1.5 text-center text-xs font-bold text-white transition-colors hover:bg-[#ea3400]"
								>
									Continue
								</button>
							</div>
						</div>

						<!-- Mosaic 2: Chat Message Feed -->
						<div
							class="space-y-3 rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<div class="flex items-center gap-2">
								<Avatar alt="Sarah" size="xs" presence="online" />
								<div class="flex-1 space-y-1">
									<div class="h-2 w-3/4 rounded bg-neutral-300 dark:bg-neutral-700"></div>
									<div class="h-1.5 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800"></div>
								</div>
							</div>
							<div
								class="rounded-lg bg-neutral-200/40 p-2 text-xs text-neutral-600 dark:bg-neutral-900/60 dark:text-neutral-400"
							>
								Sven UI handles 100% of my meta tags automatically.
							</div>
						</div>

						<!-- Mosaic 3: Avatar Stack & Presence -->
						<div
							class="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<span class="text-xs font-semibold text-neutral-400">Team Presence</span>
							<div class="flex items-center justify-center gap-2 py-3">
								<Avatar alt="Dev 1" size="sm" presence="online" />
								<Avatar alt="Dev 2" size="sm" presence="busy" />
								<Avatar alt="Dev 3" size="sm" presence="away" />
								<div
									class="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3e00]/10 text-xs font-bold text-[#ff3e00]"
								>
									+4
								</div>
							</div>
							<div class="text-center text-xs text-neutral-500">7 devs active now</div>
						</div>

						<!-- Mosaic 4: Chat Thread with Reaction -->
						<div
							class="space-y-2 rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<div class="flex items-center gap-2">
								<Avatar alt="Hunter" size="xs" />
								<span class="text-xs font-bold text-neutral-900 dark:text-white">Hunter</span>
								<Badge variant="soft" color="primary" size="xs">Admin</Badge>
							</div>
							<div class="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-800"></div>
							<div class="h-2 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800"></div>
							<div class="flex items-center gap-1.5 pt-1">
								<span
									class="rounded bg-neutral-200/60 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
								>
									🔥 12
								</span>
								<span
									class="rounded bg-neutral-200/60 px-1.5 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
								>
									🚀 8
								</span>
							</div>
						</div>

						<!-- Mosaic 5: Avatar Group Preview -->
						<div
							class="flex items-center justify-center rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<AvatarGroup>
								<Avatar alt="User 1" size="sm" />
								<Avatar alt="User 2" size="sm" />
								<Avatar alt="User 3" size="sm" />
							</AvatarGroup>
						</div>

						<!-- Mosaic 6: Command Search Preview -->
						<div
							class="space-y-2 rounded-2xl border border-neutral-200/80 bg-neutral-100/60 p-4 backdrop-blur-md dark:border-neutral-800/80 dark:bg-[#18181b]/80"
						>
							<div class="flex items-center justify-between text-xs text-neutral-400">
								<span>Quick Search</span>
								<Kbd value="⌘K" size="xs" />
							</div>
							<div
								class="flex items-center gap-1.5 rounded bg-white/80 p-1.5 text-xs text-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-300"
							>
								<Icon name="search" size="xs" />
								<span>Search components...</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	</section>

	<!-- DOCUMENTATION & SHOWCASE SECTION (Svelte.dev Inspired 3-Column Layout) -->
	<section id="docs" class="py-12 md:py-16">
		<Container size="2xl">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<!-- Left Sidebar: Doc Navigation Tree -->
				<aside class="space-y-8 lg:col-span-3">
					<!-- Group: Getting Started -->
					<div class="space-y-3">
						<h3
							class="text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500"
						>
							Getting started
						</h3>
						<ul class="space-y-1.5 text-sm">
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'intro')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'intro'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Introduction
								</button>
							</li>
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'install')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'install'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Creating a project
								</button>
							</li>
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'config')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'config'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Site configuration
								</button>
							</li>
						</ul>
					</div>

					<!-- Group: SEO & Site Kit -->
					<div class="space-y-3">
						<h3
							class="text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500"
						>
							Site & SEO Kit
						</h3>
						<ul class="space-y-1.5 text-sm">
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'seo-og')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'seo-og'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Dynamic OG Generator (/api/og)
								</button>
							</li>
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'seo-robots')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'seo-robots'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Robots & Sitemaps
								</button>
							</li>
						</ul>
					</div>

					<!-- Group: Components -->
					<div class="space-y-3" id="components">
						<h3
							class="text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500"
						>
							Components
						</h3>
						<ul class="space-y-1.5 text-sm">
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'comp-buttons')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'comp-buttons'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Buttons & Badges
								</button>
							</li>
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'comp-forms')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'comp-forms'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Forms & Inputs
								</button>
							</li>
							<li>
								<button
									type="button"
									onclick={() => (activeDocSection = 'comp-overlays')}
									class="w-full rounded-md px-2.5 py-1.5 text-left transition-colors {activeDocSection ===
									'comp-overlays'
										? 'bg-[#ff3e00]/10 font-bold text-[#ff3e00]'
										: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'}"
								>
									Modals & Overlays
								</button>
							</li>
						</ul>
					</div>
				</aside>

				<!-- Center: Main Editorial & Interactive Playground -->
				<div class="space-y-12 lg:col-span-7">
					<!-- Breadcrumb Header -->
					<div>
						<div
							class="text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500"
						>
							SVELTEKIT • GETTING STARTED
						</div>
						<h2
							class="mt-2 font-serif text-3xl font-extrabold text-neutral-900 sm:text-4xl dark:text-white"
						>
							Introduction
						</h2>
					</div>

					<!-- Callout Box (Svelte.dev Lightbulb Style) -->
					<div
						class="flex items-start gap-3 rounded-xl border border-[#ff3e00]/30 bg-[#ff3e00]/5 p-4"
					>
						<div class="mt-0.5 text-[#ff3e00]">
							<Icon name="sparkles" size="sm" />
						</div>
						<div class="space-y-1.5 text-base text-neutral-700 dark:text-neutral-300">
							<p>
								If you're new to Sven UI or SvelteKit, explore the live interactive component and
								SEO playground below.
							</p>
							<p class="text-sm text-neutral-500 dark:text-neutral-400">
								Need assistance? Check out the <a
									href="https://github.com/FuntionalFrost/sven-ui"
									target="_blank"
									rel="noopener noreferrer"
									class="font-medium text-[#ff3e00] underline">GitHub repository</a
								> or documentation guides.
							</p>
						</div>
					</div>

					<!-- Editorial Section: What is Sven UI? -->
					<div class="space-y-4">
						<h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
							What is Sven UI?
						</h3>
						<p class="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
							Sven UI brings the developer experience and full-stack polish of <strong
								>Nuxt UI v4</strong
							>
							to <strong>SvelteKit 2.7+</strong> and <strong>Svelte 5</strong> with authentic Svelte design
							language. If you're coming from Vue or Nuxt, Sven UI is identical to Nuxt UI. If you're
							coming from React, Sven UI is similar to Shadcn UI combined with Next SEO.
						</p>
					</div>

					<!-- Svelte 5 Runes Live Inspector -->
					<div class="space-y-4">
						<h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
							Pure Svelte 5 Runes Architecture
						</h3>
						<Card variant="outline" padding="lg">
							{#snippet header()}
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
										<span class="text-base font-bold text-neutral-900 dark:text-white"
											>Live Runes Inspector ($state & $derived)</span
										>
									</div>
									<Badge variant="solid" color="primary">Zero Virtual DOM</Badge>
								</div>
							{/snippet}

							<div class="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
								<div
									class="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900"
								>
									<div class="font-mono text-sm text-neutral-500">$state(runeCounter)</div>
									<div class="my-1 text-2xl font-black text-neutral-900 dark:text-white">
										{runeCounter}
									</div>
									<div class="mt-2 flex items-center justify-center gap-2">
										<Button
											size="xs"
											variant="outline"
											color="neutral"
											onclick={() => (runeCounter = Math.max(1, runeCounter - 1))}>-</Button
										>
										<Button size="xs" variant="solid" color="primary" onclick={() => runeCounter++}
											>+</Button
										>
									</div>
								</div>

								<div
									class="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900"
								>
									<div class="font-mono text-sm text-neutral-500">$derived(runeTotal)</div>
									<div class="my-1 text-2xl font-black text-[#ff3e00]">{runeTotal}</div>
									<div class="mt-2 font-mono text-sm text-neutral-400">
										counter × {runeMultiplier}
									</div>
								</div>

								<div
									class="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900"
								>
									<div class="font-mono text-sm text-neutral-500">$derived(runeStatus)</div>
									<div class="my-2 text-base font-bold text-emerald-500">{runeStatus}</div>
									<Badge variant="soft" color="success" size="xs">Reactive</Badge>
								</div>
							</div>
						</Card>
					</div>

					<!-- Feature Parity Matrix -->
					<div class="space-y-4">
						<h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
							Nuxt UI v4.11.1 vs Sven UI Parity Matrix
						</h3>
						<div
							class="overflow-x-auto rounded-xl border border-neutral-200 shadow-xs dark:border-neutral-800"
						>
							<table class="w-full text-left text-sm">
								<thead
									class="border-b border-neutral-200 bg-neutral-100 font-semibold text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
								>
									<tr>
										<th class="p-3">Feature Capability</th>
										<th class="p-3">Nuxt UI v4 (Vue)</th>
										<th class="p-3 text-[#ff3e00]">Sven UI (SvelteKit)</th>
										<th class="p-3">Ergonomics</th>
									</tr>
								</thead>
								<tbody
									class="divide-y divide-neutral-200 text-neutral-700 dark:divide-neutral-800 dark:text-neutral-300"
								>
									<tr>
										<td class="p-3 font-medium">Design Tokens</td>
										<td class="p-3">Tailwind CSS v4 @theme</td>
										<td class="p-3 font-semibold text-[#ff3e00]">Tailwind CSS v4 @theme</td>
										<td class="p-3"
											><Badge variant="soft" color="success" size="xs">100% Identical</Badge></td
										>
									</tr>
									<tr>
										<td class="p-3 font-medium">UI Primitives</td>
										<td class="p-3">Radix Vue</td>
										<td class="p-3 font-semibold text-[#ff3e00]">Bits UI & Runes</td>
										<td class="p-3"
											><Badge variant="soft" color="success" size="xs">Accessible & Fast</Badge></td
										>
									</tr>
									<tr>
										<td class="p-3 font-medium">Dynamic OG Generator</td>
										<td class="p-3">nuxt-og-image (Satori)</td>
										<td class="p-3 font-semibold text-[#ff3e00]">Zero-Dep Native SVG (/api/og)</td>
										<td class="p-3"
											><Badge variant="soft" color="success" size="xs">Zero Binaries</Badge></td
										>
									</tr>
									<tr>
										<td class="p-3 font-medium">Sitemap & XSL Viewer</td>
										<td class="p-3">@nuxtjs/sitemap</td>
										<td class="p-3 font-semibold text-[#ff3e00]">/sitemap.xml + /sitemap.xsl</td>
										<td class="p-3"
											><Badge variant="soft" color="success" size="xs">Styled Dashboard</Badge></td
										>
									</tr>
									<tr>
										<td class="p-3 font-medium">Robots Automation</td>
										<td class="p-3">@nuxtjs/robots</td>
										<td class="p-3 font-semibold text-[#ff3e00]">/robots.txt (Env Gated)</td>
										<td class="p-3"
											><Badge variant="soft" color="success" size="xs">Zero-Config</Badge></td
										>
									</tr>
									<tr>
										<td class="p-3 font-medium">Configuration</td>
										<td class="p-3">nuxt.config.ts</td>
										<td class="p-3 font-semibold text-[#ff3e00]">src/site.config.ts</td>
										<td class="p-3"
											><Badge variant="solid" color="primary" size="xs">100% DRY</Badge></td
										>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<!-- Interactive Tabs Component Demo -->
					<div class="space-y-6">
						<h3
							class="font-serif text-2xl font-bold text-neutral-900 dark:text-white"
							id="playground"
						>
							Interactive Component Showcase
						</h3>

						<Card variant="outline" padding="lg">
							{#snippet header()}
								<div class="flex items-center justify-between">
									<h4 class="text-base font-bold text-neutral-900 dark:text-white">
										Live Playground
									</h4>
									<Badge variant="soft" color="primary">Svelte 5 Runes</Badge>
								</div>
							{/snippet}

							<div class="space-y-6">
								<!-- Buttons & Badges & ButtonGroup -->
								<div>
									<h5 class="mb-3 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
										Buttons, Badges & Groups
									</h5>
									<div class="flex flex-wrap items-center gap-3">
										<Button variant="solid" color="primary" icon="sparkles">Solid Primary</Button>
										<Button variant="outline" color="primary">Outline</Button>
										<Button variant="soft" color="primary">Soft</Button>
										<Button variant="subtle" color="primary">Subtle</Button>
										<Button variant="ghost" color="primary">Ghost</Button>
										<Button variant="solid" color="success" icon="check">Success</Button>
										<Button variant="solid" color="error" icon="cross">Error</Button>
										<Button variant="solid" color="primary" loading>Loading</Button>
									</div>

									<div class="mt-4 flex flex-wrap items-center gap-4">
										<ButtonGroup>
											<Button variant="outline" color="neutral" size="sm">Monthly</Button>
											<Button variant="solid" color="primary" size="sm">Yearly</Button>
											<Button variant="outline" color="neutral" size="sm">Lifetime</Button>
										</ButtonGroup>

										<div class="flex items-center gap-2">
											<Badge variant="soft" color="primary" dot>Active</Badge>
											<Badge variant="solid" color="success" icon="check">Verified</Badge>
											<Badge variant="subtle" color="error">Rejected</Badge>
										</div>
									</div>
								</div>

								<Divider />

								<!-- Form Controls & Inputs -->
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2" id="forms">
									<FormField label="Developer Name" required>
										<Input
											bind:value={demoName}
											placeholder="Enter your name"
											icon="sparkles"
											clearable
										/>
									</FormField>

									<FormField label="Work Email" required>
										<Input
											type="email"
											bind:value={demoEmail}
											placeholder="alex@company.com"
											icon="search"
										/>
									</FormField>

									<FormField label="Subscription Plan">
										<Select
											bind:value={demoPlan}
											options={[
												{ value: 'free', label: 'Starter Plan' },
												{ value: 'pro', label: 'Pro Solo Dev ($19/mo)' },
												{ value: 'team', label: 'Enterprise ($99/mo)' }
											]}
										/>
									</FormField>

									<FormField label="Developer Bio">
										<Textarea
											bind:value={demoBio}
											rows={2}
											maxlength={140}
											showCount
											placeholder="Short bio..."
										/>
									</FormField>

									<div class="space-y-3 md:col-span-2">
										<Switch
											bind:checked={demoNotifications}
											label="Enable Realtime Sync"
											description="Automatically receive live updates and SEO indexing metrics"
										/>
										<Checkbox
											bind:checked={demoMarketing}
											label="Subscribe to Sven UI newsletter"
											description="Get notified about new component releases"
										/>
									</div>

									<div class="md:col-span-2">
										<RadioGroup
											bind:value={demoPlan}
											card
											options={[
												{
													value: 'pro',
													label: 'Pro License ($19)',
													description: 'Full component suite and SEO tools'
												},
												{
													value: 'team',
													label: 'Team License ($99)',
													description: 'Unlimited seats and priority support'
												}
											]}
										/>
									</div>

									<div class="md:col-span-2">
										<div
											class="mb-1.5 flex justify-between text-sm text-neutral-600 dark:text-neutral-400"
										>
											<span>Volume</span>
											<span>{demoVolume}%</span>
										</div>
										<Slider bind:value={demoVolume} min={0} max={100} />
									</div>
								</div>

								<Divider />

								<!-- Loaders & Skeletons -->
								<div class="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
									<div>
										<h5
											class="mb-2 text-sm font-semibold tracking-wider text-neutral-400 uppercase"
										>
											Spinners
										</h5>
										<div class="flex items-center gap-3">
											<Spinner size="sm" class="text-[#ff3e00]" />
											<Spinner size="md" class="text-amber-500" />
											<Spinner size="lg" class="text-orange-500" />
										</div>
									</div>

									<div>
										<h5
											class="mb-2 text-sm font-semibold tracking-wider text-neutral-400 uppercase"
										>
											Progress
										</h5>
										<Progress value={demoVolume} max={100} color="primary" />
									</div>

									<div>
										<h5
											class="mb-2 text-sm font-semibold tracking-wider text-neutral-400 uppercase"
										>
											Skeleton & Link
										</h5>
										<div class="space-y-1.5">
											<Skeleton class="h-3.5 w-3/4" />
											<Link href="https://svelte.dev" showExternalIcon class="text-sm">
												Svelte Official
											</Link>
										</div>
									</div>
								</div>

								<Divider />

								<!-- Overlays, Modals, Popovers, Tooltips & Toast -->
								<div class="space-y-4">
									<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
										Overlays & Notifications
									</h5>
									<div class="flex flex-wrap items-center gap-3">
										<Button
											variant="outline"
											color="primary"
											icon="sparkles"
											onclick={() => (modalOpen = true)}
										>
											Open Modal Dialog
										</Button>
										<Button
											variant="outline"
											color="neutral"
											icon="chevron-right"
											onclick={() => (slideoverOpen = true)}
										>
											Open Slideover Drawer
										</Button>
										<Tooltip text="Sven UI Tooltip with Floating UI">
											<Button variant="subtle" color="neutral" size="sm">Hover Tooltip</Button>
										</Tooltip>
										<Popover>
											{#snippet trigger()}
												<Button variant="subtle" color="primary" size="sm">Popover</Button>
											{/snippet}
											<div class="max-w-xs space-y-1 text-sm">
												<h6 class="font-bold text-neutral-900 dark:text-white">Floating Popover</h6>
												<p class="text-neutral-500 dark:text-neutral-400">
													Accessible popover with backdrop anchoring.
												</p>
											</div>
										</Popover>
										<DropdownMenu items={menuItems}>
											{#snippet trigger()}
												<Button
													variant="outline"
													color="neutral"
													size="sm"
													trailingIcon="chevron-down">Menu</Button
												>
											{/snippet}
										</DropdownMenu>
										<Button
											variant="soft"
											color="success"
											icon="check"
											onclick={() => toast.success('Action completed with Sven UI toast!')}
										>
											Trigger Toast
										</Button>
									</div>

									<Alert
										color="info"
										title="Zero-Config Notifications"
										description="SvenApp mounts the global toast provider so you can call toast.success() anywhere."
										closable
									/>
								</div>

								<Divider />

								<!-- DataTable Component (Nuxt UTable parity) -->
								<div class="space-y-3">
									<div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
										<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
											Data Table (<code class="font-mono text-[#ff3e00]">&lt;DataTable /&gt;</code>)
										</h5>
										<Input
											bind:value={tableSearch}
											placeholder="Search table records..."
											icon="search"
											class="h-9 max-w-xs text-sm"
										/>
									</div>

									<DataTable
										data={demoTableData}
										columns={[
											{ key: 'name', label: 'Developer', sortable: true },
											{ key: 'role', label: 'Role', sortable: true },
											{ key: 'team', label: 'Organization' },
											{ key: 'stars', label: 'Stars ★', sortable: true },
											{ key: 'status', label: 'Status' }
										]}
										selectable
										bind:selected={selectedRows}
										searchQuery={tableSearch}
									>
										{#snippet cell(item, col)}
											{#if col.key === 'status'}
												<Badge
													variant="soft"
													color={item.status === 'Active' ? 'success' : 'primary'}
													dot
												>
													{item.status}
												</Badge>
											{:else if col.key === 'stars'}
												<span class="font-mono font-medium text-amber-500"
													>{item.stars.toLocaleString()}</span
												>
											{:else}
												{item[col.key as keyof typeof item] ?? '—'}
											{/if}
										{/snippet}
									</DataTable>
								</div>

								<Divider />

								<!-- Chips, Meter & ColorPicker -->
								<div class="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
									<!-- Chip Component -->
									<div class="space-y-2">
										<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
											Chips & Badges (<code class="font-mono text-[#ff3e00]">&lt;Chip /&gt;</code>)
										</h5>
										<div class="flex items-center gap-4 pt-1">
											<Chip color="success" pulse>
												<Avatar alt="Alex" fallback="AM" size="md" />
											</Chip>

											<Chip text="3" color="primary">
												<Button variant="outline" color="neutral" size="sm">Inbox</Button>
											</Chip>

											<Chip text="9+" color="error">
												<Avatar alt="Team" fallback="TM" size="md" />
											</Chip>
										</div>
									</div>

									<!-- Meter Component -->
									<div class="space-y-2">
										<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
											Metric Meter (<code class="font-mono text-[#ff3e00]">&lt;Meter /&gt;</code>)
										</h5>
										<Meter
											value={cpuMeter}
											label="System CPU Load"
											color={cpuMeter > 80 ? 'error' : cpuMeter > 60 ? 'warning' : 'success'}
										/>
										<div class="flex gap-2 pt-1">
											<Button
												size="xs"
												variant="outline"
												color="neutral"
												onclick={() => (cpuMeter = Math.max(10, cpuMeter - 15))}>Decrease</Button
											>
											<Button
												size="xs"
												variant="solid"
												color="primary"
												onclick={() => (cpuMeter = Math.min(95, cpuMeter + 15))}>Increase</Button
											>
										</div>
									</div>

									<!-- ColorPicker Component -->
									<div class="space-y-2">
										<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
											Color Picker (<code class="font-mono text-[#ff3e00]"
												>&lt;ColorPicker /&gt;</code
											>)
										</h5>
										<ColorPicker bind:value={customThemeColor} />
									</div>
								</div>

								<Divider />

								<!-- Context Menu Demo -->
								<div>
									<h5 class="mb-2 text-sm font-semibold tracking-wider text-neutral-400 uppercase">
										Context Menu (<code class="font-mono text-[#ff3e00]">&lt;ContextMenu /&gt;</code
										>)
									</h5>
									<ContextMenu items={contextMenuItems}>
										<div
											class="flex h-24 w-full items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50/50 text-sm text-neutral-500 transition hover:border-[#ff3e00] dark:border-neutral-700 dark:bg-neutral-900/40 dark:text-neutral-400"
										>
											Right-click anywhere inside this box to trigger the Context Menu
										</div>
									</ContextMenu>
								</div>

								<Divider />

								<!-- Tabs & Pagination & FAQ Accordion -->
								<div class="space-y-4">
									<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
										<h5 class="text-sm font-semibold tracking-wider text-neutral-400 uppercase">
											Tabs & Pagination
										</h5>
										<Pagination bind:page={demoPaginationPage} total={60} pageSize={10} />
									</div>

									<Tabs
										items={[
											{ value: 'preview', label: 'Preview', icon: 'sparkles' },
											{ value: 'code', label: 'Svelte 5 Runes', icon: 'check' },
											{ value: 'seo', label: 'Site Config', icon: 'info' }
										]}
										bind:value={demoActiveTab}
									>
										{#if demoActiveTab === 'preview'}
											<div
												class="rounded-xl border border-neutral-200/80 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900/50"
											>
												Ready to use Svelte 5 components with zero boilerplate.
											</div>
										{:else if demoActiveTab === 'code'}
											<div class="rounded-xl bg-neutral-900 p-4 font-mono text-sm text-neutral-200">
												<pre>&lt;script lang="ts"&gt;
  import &#123; Button, Modal, toast &#125; from '$lib';
  let open = $state(false);
&lt;/script&gt;</pre>
											</div>
										{:else}
											<div class="rounded-xl bg-neutral-900 p-4 font-mono text-sm text-neutral-200">
												<pre>// src/site.config.ts
export const siteConfig = defineSiteConfig(&#123;
  name: 'Sven UI',
  url: 'https://sven-ui.dev'
&#125;);</pre>
											</div>
										{/if}
									</Tabs>

									<Accordion items={faqItems} />
								</div>
							</div>
						</Card>
					</div>

					<!-- Dynamic OG Studio Section -->
					<div class="space-y-6" id="seo-studio">
						<h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
							Dynamic Open Graph Studio (/api/og)
						</h3>

						<Card variant="outline" padding="lg">
							{#snippet header()}
								<div class="flex items-center justify-between">
									<span class="text-base font-bold text-neutral-900 dark:text-white"
										>Live OG Card Generator</span
									>
									<Badge variant="solid" color="primary">Zero Binary Dependencies</Badge>
								</div>
							{/snippet}

							<div class="space-y-4">
								<FormField label="Card Title">
									<Input bind:value={ogTitle} placeholder="Card title" />
								</FormField>

								<FormField label="Card Description">
									<Textarea bind:value={ogDesc} rows={2} placeholder="Card description" />
								</FormField>

								<div class="grid grid-cols-2 gap-4">
									<FormField label="Badge Text">
										<Input bind:value={ogBadge} placeholder="e.g. Case Study" />
									</FormField>
									<FormField label="Card Theme">
										<Select
											bind:value={ogTheme}
											options={[
												{ value: 'dark', label: 'Dark Mode Card' },
												{ value: 'light', label: 'Light Mode Card' }
											]}
										/>
									</FormField>
								</div>

								<Divider />

								<OgImage
									title={ogTitle}
									description={ogDesc}
									badge={ogBadge}
									theme={ogTheme}
									config={siteConfig}
								/>
							</div>
						</Card>
					</div>

					<!-- Quickstart Code Guide -->
					<div class="space-y-4" id="quickstart">
						<h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
							Quickstart in 3 Steps
						</h3>

						<div class="space-y-4">
							<div
								class="space-y-2 rounded-xl border border-neutral-200 bg-neutral-900 p-4 font-mono text-sm text-neutral-200 dark:border-neutral-800"
							>
								<div class="font-bold text-[#ff3e00]">// 1. Wrap your root +layout.svelte</div>
								<pre>&lt;script lang="ts"&gt;
  import &#123; SvenApp &#125; from 'sven-ui';
  import &#123; siteConfig &#125; from '../site.config';
  let &#123; children &#125; = $props();
&lt;/script&gt;

&lt;SvenApp config=&#123;siteConfig&#125;&gt;
  &#123;@render children()&#125;
&lt;/SvenApp&gt;</pre>
							</div>

							<div
								class="space-y-2 rounded-xl border border-neutral-200 bg-neutral-900 p-4 font-mono text-sm text-neutral-200 dark:border-neutral-800"
							>
								<div class="font-bold text-emerald-400">
									// 2. Zero-file SEO automation (hooks.server.ts)
								</div>
								<pre>// src/hooks.server.ts
import &#123; createSvenHook &#125; from 'sven-ui';
import &#123; siteConfig &#125; from './site.config';

// Handles /robots.txt, /sitemap.xml, /sitemap.xsl, /site.webmanifest, and /api/og automatically
export const handle = createSvenHook(siteConfig);</pre>
							</div>

							<div
								class="space-y-2 rounded-xl border border-neutral-200 bg-neutral-900 p-4 font-mono text-sm text-neutral-200 dark:border-neutral-800"
							>
								<div class="font-bold text-amber-400">
									// 3. Automatic page SEO in SvelteKit load()
								</div>
								<pre>// src/routes/blog/[slug]/+page.ts
export const load = async (&#123; params &#125;) => &#123;
  return &#123;
    seo: &#123;
      title: 'How to Build Fast Indie SaaS',
      description: 'Step-by-step guide with SvelteKit 2.7 & Sven UI',
      badge: 'Tutorial'
    &#125;
  &#125;;
&#125;;</pre>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Sidebar: "On this page" (Svelte.dev Style) -->
				<aside class="hidden space-y-4 lg:col-span-2 lg:block">
					<h3
						class="text-sm font-semibold tracking-wider text-neutral-400 uppercase dark:text-neutral-500"
					>
						On this page
					</h3>
					<ul class="space-y-2.5 text-sm text-neutral-500 dark:text-neutral-400">
						<li>
							<a href="#overview" class="transition-colors hover:text-[#ff3e00]"> Introduction </a>
						</li>
						<li>
							<a href="#docs" class="transition-colors hover:text-[#ff3e00]"> Before we begin </a>
						</li>
						<li>
							<a href="#playground" class="transition-colors hover:text-[#ff3e00]">
								Component Playground
							</a>
						</li>
						<li>
							<a href="#seo-studio" class="transition-colors hover:text-[#ff3e00]">
								Dynamic OG Studio
							</a>
						</li>
						<li>
							<a href="#quickstart" class="transition-colors hover:text-[#ff3e00]">
								Quickstart Guide
							</a>
						</li>
					</ul>
				</aside>
			</div>
		</Container>
	</section>
</main>

<!-- Interactive Modal Demo -->
<Modal
	bind:open={modalOpen}
	title="Sven UI Modal Dialog"
	description="Accessible dialog powered by Bits UI primitives and Svelte 5 runes."
>
	<p class="text-base text-neutral-600 dark:text-neutral-400">
		This modal includes automatic keyboard focus trapping, backdrop blur, escape key handling, and
		smooth transition animations.
	</p>

	{#snippet footer()}
		<Button variant="outline" color="neutral" onclick={() => (modalOpen = false)}>Cancel</Button>
		<Button
			variant="solid"
			color="primary"
			onclick={() => {
				modalOpen = false;
				toast.success('Action confirmed!');
			}}
		>
			Confirm Action
		</Button>
	{/snippet}
</Modal>

<!-- Interactive Slideover Demo -->
<Slideover
	bind:open={slideoverOpen}
	title="Filters & Settings Drawer"
	description="Responsive slide-in panel for navigation, filters, or details."
>
	<div class="space-y-4 py-2">
		<FormField label="Search Filter">
			<Input placeholder="Filter records..." icon="search" />
		</FormField>
		<FormField label="Category">
			<Select
				options={[
					{ value: 'all', label: 'All Categories' },
					{ value: 'components', label: 'Components' },
					{ value: 'seo', label: 'SEO Tools' }
				]}
			/>
		</FormField>
		<Switch label="Enable Realtime Sync" />
	</div>

	{#snippet footer()}
		<Button variant="solid" color="primary" block onclick={() => (slideoverOpen = false)}>
			Apply Filters
		</Button>
	{/snippet}
</Slideover>

<!-- Footer -->
<Footer config={siteConfig} />
