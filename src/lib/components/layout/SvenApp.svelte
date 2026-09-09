<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { Tooltip } from 'bits-ui';
	import type { SiteConfig } from '$lib/site/config';
	import { themeInitScript } from '$lib/theme/theme.svelte';
	import Favicons from '../seo/Favicons.svelte';
	import Seo from '../seo/Seo.svelte';
	import { setSiteConfig } from '$lib/site/context';
	import { siteConfig as defaultSiteConfig } from '../../../site.config';
	import '$lib/styles/sven.css';

	interface Props {
		config?: SiteConfig;
		enableDefaultSeo?: boolean;
		children?: Snippet;
	}

	let { config = defaultSiteConfig, enableDefaultSeo = true, children }: Props = $props();

	// Provide config to all descendant components via Svelte 5 context
	setSiteConfig(() => config);

	const scriptTag = `<script>${themeInitScript}</` + `script>`;
</script>

<svelte:head>
	{@html scriptTag}
</svelte:head>

{#if enableDefaultSeo}
	<Seo {config} />
{/if}
<Favicons {config} />

<Tooltip.Provider delayDuration={200}>
	<div
		class="flex min-h-screen flex-col bg-white text-neutral-900 transition-colors dark:bg-neutral-950 dark:text-neutral-50"
	>
		{#if children}
			{@render children()}
		{/if}
	</div>
</Tooltip.Provider>

<!-- Global Toast Container -->
<Toaster richColors position="top-right" closeButton />
