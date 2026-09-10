<script lang="ts">
	import Button from '$lib/components/elements/Button.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';
	import { useToast } from '$lib/composables/useToast';

	interface Props {
		code: string;
		filename?: string;
		language?: string;
		class?: string;
	}

	let { code, filename = '', language = 'svelte', class: className = '' }: Props = $props();

	let copied = $state(false);
	const toast = useToast();

	function copy() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(code);
			copied = true;
			toast.success('Copied to clipboard', filename || 'Code snippet');
			setTimeout(() => {
				copied = false;
			}, 2000);
		}
	}
</script>

<div
	class="my-4 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800 {className}"
>
	{#if filename}
		<div
			class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/70 px-4 py-2 font-mono text-xs text-zinc-400"
		>
			<span class="flex items-center gap-1.5 font-medium text-zinc-300">
				<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
				{filename}
			</span>
			<Button
				size="xs"
				variant="ghost"
				onclick={copy}
				class="h-6 px-2 text-xs text-zinc-400 hover:text-white"
			>
				<Icon name={copied ? 'check' : 'clipboard-document'} size="xs" class="mr-1" />
				{copied ? 'Copied' : 'Copy'}
			</Button>
		</div>
	{:else}
		<div class="flex justify-end p-2 pb-0">
			<Button
				size="xs"
				variant="ghost"
				onclick={copy}
				class="h-6 px-2 text-xs text-zinc-400 hover:text-white"
			>
				<Icon name={copied ? 'check' : 'clipboard-document'} size="xs" class="mr-1" />
				{copied ? 'Copied' : 'Copy'}
			</Button>
		</div>
	{/if}
	<pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-200"><code
			class="language-{language}">{code}</code
		></pre>
</div>
