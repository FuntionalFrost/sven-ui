<script lang="ts">
	import DocHeader from '../_components/DocHeader.svelte';
	import DocCodeBlock from '../_components/DocCodeBlock.svelte';
	import DocSandbox from '../_components/DocSandbox.svelte';
	import { theme, ACCENT_PALETTES, NEUTRAL_PALETTES } from '$lib/theme/theme.svelte';

	let sampleName = $state('My SaaS App');
	let sampleUrl = $state('https://mysaas.com');

	let generatedConfig = $derived(`import { defineSiteConfig } from 'yaxa';

export const siteConfig = defineSiteConfig({
  name: '${sampleName}',
  title: '${sampleName} — Modern Web App',
  description: 'Built with Yaxa, SvelteKit, and Tailwind CSS v4.',
  url: '${sampleUrl}',
  theme: {
    primaryColor: '${ACCENT_PALETTES[theme.accent]?.color || '#ff3e00'}',
    neutralColor: '${NEUTRAL_PALETTES[theme.neutral]?.shades[500] || '#71717a'}',
    defaultMode: '${theme.mode}'
  },
  seo: {
    titleTemplate: '%s · ${sampleName}',
    defaultOgImage: '/api/og',
    twitterCard: 'summary_large_image'
  },
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'Docs', href: '/docs' },
    { label: 'Pricing', href: '#pricing' }
  ],
  socials: {
    github: 'https://github.com/my-org/my-app',
    twitter: 'https://twitter.com/my_app'
  }
});`);

	const contextSnippet =
		`<` +
		`script lang="ts">
  import { getSiteConfig } from 'yaxa';

  // Reactively retrieve the current site configuration from context
  const site = getSiteConfig();
<` +
		`/script>

<h1>Welcome to {site.name}</h1>
<p>{site.description}</p>`;
</script>

<DocHeader
	title="Site Configuration (site.config.ts)"
	description="Define your branding, metadata, color themes, navigation, social links, and SEO rules in one single file."
	badge="100% DRY"
	category="Getting Started"
/>

<div class="space-y-8">
	<!-- Interactive Config Generator -->
	<DocSandbox title="Live Interactive site.config.ts Generator">
		<div class="w-full space-y-4">
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label
						for="cfg-site-name"
						class="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
					>
						Site / Brand Name
					</label>
					<input
						id="cfg-site-name"
						type="text"
						bind:value={sampleName}
						class="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-primary-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
					/>
				</div>
				<div>
					<label
						for="cfg-site-url"
						class="mb-1 block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
					>
						Production URL
					</label>
					<input
						id="cfg-site-url"
						type="text"
						bind:value={sampleUrl}
						class="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-primary-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-white"
					/>
				</div>
			</div>

			<DocCodeBlock code={generatedConfig} filename="src/site.config.ts" language="typescript" />
		</div>
	</DocSandbox>

	<!-- Context API -->
	<div class="space-y-3">
		<h3 class="text-lg font-bold text-zinc-900 dark:text-white">
			Accessing Config Anywhere (Context API)
		</h3>
		<p class="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
			When wrapped in <code
				class="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-800"
				>&lt;YaxaApp /&gt;</code
			>, your configuration is provided to all descendant components via Svelte 5 context. You can
			retrieve it anytime using
			<code class="font-mono text-primary-600 dark:text-primary-400">getSiteConfig()</code>:
		</p>
		<DocCodeBlock
			code={contextSnippet}
			filename="src/routes/any-component.svelte"
			language="svelte"
		/>
	</div>
</div>
