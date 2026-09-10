<script lang="ts">
	import type { SiteConfig } from '$lib/site/config';
	import { getSiteConfig } from '$lib/site/context';

	interface Props {
		config?: SiteConfig;
		faviconSvg?: string;
	}

	let { config, faviconSvg = '/favicon.svg' }: Props = $props();

	let currentConfig = $derived(config || getSiteConfig());
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={faviconSvg} />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content={currentConfig.theme?.primaryColor || '#ff3e00'} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content={currentConfig.name} />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>
