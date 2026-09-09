<script lang="ts">
	import './layout.css';
	import SvenApp from '$lib/components/layout/SvenApp.svelte';
	import { siteConfig } from '../site.config';

	let { children } = $props();
</script>

<SvenApp config={siteConfig}>
	{@render children()}
</SvenApp>
