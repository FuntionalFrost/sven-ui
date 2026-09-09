<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { page } from '$app/state';
	import Icon from './Icon.svelte';

	interface Props extends HTMLAnchorAttributes {
		href: string;
		activeClass?: string;
		inactiveClass?: string;
		exact?: boolean;
		external?: boolean;
		showExternalIcon?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		href,
		activeClass = 'text-primary-600 dark:text-primary-400 font-semibold',
		inactiveClass = 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
		exact = false,
		external,
		showExternalIcon = false,
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	let isExternal = $derived(
		external ?? (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//'))
	);

	let isActive = $derived.by(() => {
		if (isExternal) return false;
		try {
			const currentPath = page.url.pathname;
			if (exact) return currentPath === href;
			return currentPath === href || (href !== '/' && currentPath.startsWith(href));
		} catch {
			return false;
		}
	});
</script>

<a
	{href}
	class="inline-flex items-center gap-1 transition-colors duration-150 {isActive
		? activeClass
		: inactiveClass} {className}"
	aria-current={isActive ? 'page' : undefined}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'noopener noreferrer' : undefined}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}

	{#if isExternal && showExternalIcon}
		<Icon name="external-link" size="xs" />
	{/if}
</a>
