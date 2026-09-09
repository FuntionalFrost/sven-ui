<script lang="ts">
	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		name?: string;
		class?: string;
	}

	let {
		value = $bindable(50),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		name,
		class: className = ''
	}: Props = $props();

	let percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="relative flex w-full touch-none items-center select-none {className}">
	<input
		type="range"
		bind:value
		{min}
		{max}
		{step}
		{disabled}
		{name}
		class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 accent-primary-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800"
		style="background: linear-gradient(to right, rgb(37 99 235) {percentage}%, rgb(228 228 231) {percentage}%);"
	/>
</div>
