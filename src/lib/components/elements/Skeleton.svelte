<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<div
	class="animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 {className}"
	aria-hidden="true"
></div>
