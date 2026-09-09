<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
		showText?: boolean;
		text?: string;
		class?: string;
	}

	let { size = 'md', showText = false, text = 'Sven UI', class: className = '' }: Props = $props();

	let sizeClasses = $derived.by(() => {
		if (typeof size === 'number') {
			return {
				box: `w-[${size}px] h-[${size}px]`,
				svg: `w-[${Math.round(size * 0.6)}px] h-[${Math.round(size * 0.6)}px]`,
				text: 'text-base font-bold'
			};
		}
		switch (size) {
			case 'xs':
				return { box: 'h-6 w-6 rounded-md', svg: 'h-3.5 w-3.5', text: 'text-xs font-bold' };
			case 'sm':
				return { box: 'h-7 w-7 rounded-lg', svg: 'h-4 w-4', text: 'text-sm font-bold' };
			case 'lg':
				return { box: 'h-10 w-10 rounded-xl', svg: 'h-6 w-6', text: 'text-xl font-extrabold' };
			case 'xl':
				return { box: 'h-12 w-12 rounded-2xl', svg: 'h-7 w-7', text: 'text-2xl font-extrabold' };
			case 'md':
			default:
				return { box: 'h-8 w-8 rounded-lg', svg: 'h-4.5 w-4.5', text: 'text-base font-bold' };
		}
	});
</script>

<div class="inline-flex items-center gap-2.5 {className}">
	<div
		class="flex shrink-0 items-center justify-center bg-gradient-to-tr from-[#ff3e00] to-[#ea580c] text-white shadow-xs shadow-[#ff3e00]/25 transition-transform hover:scale-105 {sizeClasses.box}"
	>
		<svg
			class={sizeClasses.svg}
			viewBox="0 0 250 308"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="#ffffff"
				d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.7 52.7 0 0 1-9.003-39.85a50 50 0 0 1 1.713-6.693l1.35-4.115l3.671 2.697a92.5 92.5 0 0 0 28.036 14.007l2.663.808l-.245 2.659a16.07 16.07 0 0 0 2.89 10.656a17.14 17.14 0 0 0 18.397 6.828a15.8 15.8 0 0 0 4.403-1.935l71.67-45.672a14.92 14.92 0 0 0 6.734-9.977a15.92 15.92 0 0 0-2.713-12.011a17.16 17.16 0 0 0-18.404-6.832a15.8 15.8 0 0 0-4.396 1.933l-27.35 17.434a52.3 52.3 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.68 52.68 0 0 1-9.004-39.849a49.43 49.43 0 0 1 22.34-33.114l71.664-45.677a52.2 52.2 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.7 52.7 0 0 1 9.004 39.85a51 51 0 0 1-1.713 6.692l-1.35 4.116l-3.67-2.693a92.4 92.4 0 0 0-28.037-14.013l-2.664-.809l.246-2.658a16.1 16.1 0 0 0-2.89-10.656a17.14 17.14 0 0 0-18.398-6.828a15.8 15.8 0 0 0-4.402 1.935l-71.67 45.674a14.9 14.9 0 0 0-6.73 9.975a15.9 15.9 0 0 0 2.709 12.012a17.16 17.16 0 0 0 18.404 6.832a15.8 15.8 0 0 0 4.402-1.935l27.345-17.427a52.2 52.2 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.68 52.68 0 0 1 9.003 39.848a49.45 49.45 0 0 1-22.34 33.12l-71.664 45.673a52.2 52.2 0 0 1-14.563 6.398"
			/>
		</svg>
	</div>
	{#if showText}
		<span class="tracking-tight text-neutral-900 dark:text-white {sizeClasses.text}">
			{text}
		</span>
	{/if}
</div>
