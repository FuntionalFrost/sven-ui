<script lang="ts">
	import DocHeader from '../_components/DocHeader.svelte';
	import DocCodeBlock from '../_components/DocCodeBlock.svelte';
	import Badge from '$lib/components/elements/Badge.svelte';

	const viteSnippet = `import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()]
});`;

	const layoutSnippet =
		`<` +
		`script lang="ts">
  import 'yaxa/yaxa.css';
  import { YaxaApp } from 'yaxa';
  import { siteConfig } from '../site.config';

  let { children } = $props();
<` +
		`/script>

<YaxaApp config={siteConfig}>
  {@render children()}
</YaxaApp>`;

	const hooksSnippet = `import { createYaxaHook } from 'yaxa';
import { siteConfig } from './site.config';

// Automatically handles /robots.txt, /sitemap.xml, /site.webmanifest, and /api/og
export const handle = createYaxaHook(siteConfig);`;
</script>

<DocHeader
	title="Creating a Project & Installation"
	description="Get up and running with Yaxa in your SvelteKit project in less than 2 minutes."
	badge="Quickstart"
	category="Getting Started"
/>

<div class="space-y-8">
	<!-- Step 1 -->
	<div class="space-y-3">
		<div class="flex items-center gap-2.5">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white dark:bg-primary-500"
			>
				1
			</span>
			<h3 class="text-base font-bold text-zinc-900 dark:text-white">
				Create a SvelteKit project (if needed)
			</h3>
		</div>
		<p class="text-xs text-zinc-600 dark:text-zinc-400">
			If you don't already have a SvelteKit app, initialize one using the official CLI:
		</p>
		<DocCodeBlock code="pnpm create svelte@latest my-app" filename="Terminal" language="bash" />
	</div>

	<!-- Step 2 -->
	<div class="space-y-3">
		<div class="flex items-center gap-2.5">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white dark:bg-primary-500"
			>
				2
			</span>
			<h3 class="text-base font-bold text-zinc-900 dark:text-white">
				Install Yaxa and Tailwind CSS v4
			</h3>
		</div>
		<DocCodeBlock
			code="pnpm add yaxa @tailwindcss/vite tailwindcss"
			filename="Terminal"
			language="bash"
		/>
	</div>

	<!-- Step 3 -->
	<div class="space-y-3">
		<div class="flex items-center gap-2.5">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white dark:bg-primary-500"
			>
				3
			</span>
			<h3 class="text-base font-bold text-zinc-900 dark:text-white">Configure Vite Plugins</h3>
		</div>
		<p class="text-xs text-zinc-600 dark:text-zinc-400">
			Add the Tailwind CSS Vite plugin in your <code
				class="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800"
				>vite.config.ts</code
			>:
		</p>
		<DocCodeBlock code={viteSnippet} filename="vite.config.ts" language="typescript" />
	</div>

	<!-- Step 4 -->
	<div class="space-y-3">
		<div class="flex items-center gap-2.5">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white dark:bg-primary-500"
			>
				4
			</span>
			<h3 class="text-base font-bold text-zinc-900 dark:text-white">
				Mount YaxaApp in Root Layout
			</h3>
		</div>
		<p class="text-xs text-zinc-600 dark:text-zinc-400">
			Wrap your application in <code
				class="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800"
				>&lt;YaxaApp /&gt;</code
			>
			in
			<code class="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800"
				>src/routes/+layout.svelte</code
			>:
		</p>
		<DocCodeBlock code={layoutSnippet} filename="src/routes/+layout.svelte" language="svelte" />
	</div>

	<!-- Optional Step 5 -->
	<div class="space-y-3">
		<div class="flex items-center gap-2.5">
			<Badge color="primary" variant="subtle" size="sm">Optional</Badge>
			<h3 class="text-base font-bold text-zinc-900 dark:text-white">
				Automate SEO Routes with Server Hooks
			</h3>
		</div>
		<p class="text-xs text-zinc-600 dark:text-zinc-400">
			To automatically enable <code class="font-mono text-xs text-primary-600 dark:text-primary-400"
				>/robots.txt</code
			>, <code class="font-mono text-xs text-primary-600 dark:text-primary-400">/sitemap.xml</code>,
			<code class="font-mono text-xs text-primary-600 dark:text-primary-400">/site.webmanifest</code
			>, and <code class="font-mono text-xs text-primary-600 dark:text-primary-400">/api/og</code>:
		</p>
		<DocCodeBlock code={hooksSnippet} filename="src/hooks.server.ts" language="typescript" />
	</div>
</div>
