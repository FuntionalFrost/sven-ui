<script lang="ts">
	export interface PropItem {
		name: string;
		type: string;
		default?: string;
		description: string;
	}

	interface Props {
		items: PropItem[];
		title?: string;
	}

	let { items, title = 'Props & API Reference' }: Props = $props();
</script>

<div class="my-8">
	<h3 class="mb-3 text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
	<div class="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
		<table class="w-full text-left text-xs">
			<thead
				class="border-b border-zinc-200 bg-zinc-50 font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
			>
				<tr>
					<th class="px-4 py-2.5">Prop</th>
					<th class="px-4 py-2.5">Type</th>
					<th class="px-4 py-2.5">Default</th>
					<th class="px-4 py-2.5">Description</th>
				</tr>
			</thead>
			<tbody
				class="divide-y divide-zinc-200 font-mono text-zinc-600 dark:divide-zinc-800/60 dark:text-zinc-400"
			>
				{#each items as item}
					<tr class="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
						<td class="px-4 py-2.5 font-bold text-primary-600 dark:text-primary-400">{item.name}</td
						>
						<td class="px-4 py-2.5 text-zinc-600 dark:text-zinc-300">{item.type}</td>
						<td class="px-4 py-2.5 text-zinc-400">{item.default || '-'}</td>
						<td class="px-4 py-2.5 font-sans text-zinc-700 dark:text-zinc-300"
							>{item.description}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
