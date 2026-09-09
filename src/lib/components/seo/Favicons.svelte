<script lang="ts">
	import type { SiteConfig } from '$lib/site/config';
	import { siteConfig as defaultSiteConfig } from '../../../site.config';

	interface Props {
		config?: SiteConfig;
		faviconSvg?: string;
	}

	let { config = defaultSiteConfig, faviconSvg = '/favicon.svg' }: Props = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={faviconSvg} />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content={config.theme?.primaryColor || '#3b82f6'} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content={config.name} />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
</svelte:head>
