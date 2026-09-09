<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ZodSchema } from 'zod';
	import Alert from '../overlays/Alert.svelte';

	interface Props {
		schema?: ZodSchema;
		values?: Record<string, any>;
		loading?: boolean;
		errorSummary?: boolean;
		class?: string;
		onsubmit?: (e: SubmitEvent, values: Record<string, any>) => void | Promise<void>;
		children?: Snippet;
	}

	let {
		schema,
		values = {},
		loading = false,
		errorSummary = false,
		class: className = '',
		onsubmit,
		children
	}: Props = $props();

	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let isBusy = $derived(loading || isSubmitting);

	function validate() {
		if (!schema) return true;
		try {
			schema.parse(values);
			errors = {};
			return true;
		} catch (err: any) {
			const fieldErrors: Record<string, string> = {};
			const issues = err?.issues || err?.errors || [];
			for (const e of issues) {
				const field = Array.isArray(e.path) ? e.path.join('.') : String(e.path || 'form');
				if (!fieldErrors[field]) {
					fieldErrors[field] = e.message;
				}
			}
			errors = fieldErrors;
			return false;
		}
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!validate()) {
			return;
		}

		if (onsubmit) {
			isSubmitting = true;
			try {
				await onsubmit(e, values);
			} finally {
				isSubmitting = false;
			}
		}
	}
</script>

<form
	onsubmit={handleSubmit}
	aria-busy={isBusy}
	class="space-y-4 {className} {isBusy ? 'pointer-events-none opacity-80' : ''}"
	novalidate
>
	{#if errorSummary && Object.keys(errors).length > 0}
		<Alert
			color="error"
			title="Please correct the following errors:"
			description={Object.values(errors).join(' · ')}
		/>
	{/if}

	{#if children}
		{@render children()}
	{/if}
</form>
