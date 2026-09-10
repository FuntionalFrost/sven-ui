<script lang="ts">
	import './layout.css';
	import SvenApp from '$lib/components/layout/SvenApp.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { siteConfig } from '../site.config';

	let { children } = $props();
</script>

<SvenApp config={siteConfig}>
	<Header config={siteConfig} />
	<div class="flex-1">
		{@render children()}
	</div>
	<Footer config={siteConfig} />
</SvenApp>
