<script lang="ts">
	import Card from '../layout/Card.svelte';
	import Button from '../elements/Button.svelte';
	import Input from '../forms/Input.svelte';
	import FormField from '../forms/FormField.svelte';
	import Divider from '../layout/Divider.svelte';
	import Alert from '../overlays/Alert.svelte';
	import Icon from '../elements/Icon.svelte';
	import { useAuth, type SocialProvider } from '../../composables/useAuth.svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		mode?: 'signin' | 'signup' | 'magic-link';
		providers?: SocialProvider[];
		showSocial?: boolean;
		showMagicLinkToggle?: boolean;
		callbackURL?: string;
		class?: string;
		onsuccess?: () => void;
		onerror?: (err: string) => void;
	}

	let {
		title,
		subtitle,
		mode = 'signin',
		providers = ['github', 'google'],
		showSocial = true,
		showMagicLinkToggle = true,
		callbackURL = '/dashboard',
		class: className = '',
		onsuccess,
		onerror
	}: Props = $props();

	const auth = useAuth();

	let customMode = $state<'signin' | 'signup' | 'magic-link' | null>(null);
	let currentMode = $derived(customMode ?? mode);

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let localError = $state<string | null>(null);
	let magicLinkSent = $state(false);

	async function handleSocial(provider: SocialProvider) {
		localError = null;
		await auth.signInWithSocial(provider);
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		localError = null;

		if (currentMode === 'magic-link') {
			const ok = await auth.signInWithMagicLink(email);
			if (ok) {
				magicLinkSent = true;
				if (onsuccess) onsuccess();
			} else {
				localError = auth.error || 'Failed to send magic link';
				if (onerror) onerror(localError);
			}
			return;
		}

		if (currentMode === 'signup') {
			const ok = await auth.signUpWithEmail(email, password, name);
			if (ok) {
				if (onsuccess) onsuccess();
				if (typeof window !== 'undefined') window.location.href = callbackURL;
			} else {
				localError = auth.error || 'Could not create account';
				if (onerror) onerror(localError);
			}
			return;
		}

		// Sign In mode
		const ok = await auth.signInWithEmail(email, password);
		if (ok) {
			if (onsuccess) onsuccess();
			if (typeof window !== 'undefined') window.location.href = callbackURL;
		} else {
			localError = auth.error || 'Invalid email or password';
			if (onerror) onerror(localError);
		}
	}
</script>

<Card
	class="mx-auto w-full max-w-md space-y-6 border-zinc-200 p-6 shadow-xl sm:p-8 dark:border-zinc-800 {className}"
>
	<!-- Header -->
	<div class="space-y-1.5 text-center">
		<h2 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
			{#if title}
				{title}
			{:else if currentMode === 'signup'}
				Create an account
			{:else if currentMode === 'magic-link'}
				Sign in with Magic Link
			{:else}
				Welcome back
			{/if}
		</h2>
		<p class="text-sm text-zinc-500 dark:text-zinc-400">
			{#if subtitle}
				{subtitle}
			{:else if currentMode === 'signup'}
				Start your 14-day free trial, no credit card required.
			{:else if currentMode === 'magic-link'}
				We will email you a passwordless sign-in link.
			{:else}
				Sign in to access your dashboard and workspace.
			{/if}
		</p>
	</div>

	<!-- Error Alert -->
	{#if localError || auth.error}
		<Alert
			color="error"
			title="Authentication Error"
			description={localError || auth.error || ''}
		/>
	{/if}

	<!-- Magic Link Success State -->
	{#if magicLinkSent}
		<div
			class="space-y-2 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-5 text-center dark:bg-emerald-950/20"
		>
			<div class="flex justify-center text-emerald-600 dark:text-emerald-400">
				<Icon name="check" class="h-8 w-8" />
			</div>
			<h3 class="font-semibold text-zinc-900 dark:text-zinc-100">Check your email</h3>
			<p class="text-sm text-zinc-600 dark:text-zinc-400">
				We've sent a magic link to <strong class="text-zinc-900 dark:text-zinc-100">{email}</strong
				>.
			</p>
			<Button
				variant="ghost"
				size="sm"
				class="mt-2 text-xs"
				onclick={() => {
					magicLinkSent = false;
				}}
			>
				Use a different method
			</Button>
		</div>
	{:else}
		<!-- Social Login Buttons -->
		{#if showSocial && providers.length > 0}
			<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
				{#each providers as provider}
					<Button
						variant="outline"
						class="w-full justify-center gap-2 font-medium"
						loading={auth.isLoading}
						onclick={() => handleSocial(provider)}
					>
						{#if provider === 'github'}
							<Icon name="github" class="h-4 w-4" />
							<span>GitHub</span>
						{:else if provider === 'google'}
							<Icon name="external-link" class="h-4 w-4" />
							<span>Google</span>
						{:else}
							<span>{provider}</span>
						{/if}
					</Button>
				{/each}
			</div>

			<Divider label="or continue with" />
		{/if}

		<!-- Email Form -->
		<form onsubmit={handleSubmit} class="space-y-4">
			{#if currentMode === 'signup'}
				<FormField label="Full Name" required>
					<Input type="text" placeholder="Alex Johnson" bind:value={name} required />
				</FormField>
			{/if}

			<FormField label="Email address" required>
				<Input type="email" placeholder="name@company.com" bind:value={email} required />
			</FormField>

			{#if currentMode !== 'magic-link'}
				<FormField label="Password" required>
					<Input type="password" placeholder="••••••••" bind:value={password} required />
				</FormField>
			{/if}

			<Button
				type="submit"
				variant="solid"
				color="primary"
				class="w-full justify-center font-semibold shadow-md"
				loading={auth.isLoading}
			>
				{#if currentMode === 'signup'}
					Create Account
				{:else if currentMode === 'magic-link'}
					Send Magic Link
				{:else}
					Sign In
				{/if}
			</Button>
		</form>

		<!-- Mode Switchers -->
		<div class="flex flex-col items-center gap-2 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
			{#if currentMode === 'signin'}
				<div>
					Don't have an account?
					<button
						type="button"
						class="font-semibold text-primary-600 hover:underline dark:text-primary-400"
						onclick={() => {
							customMode = 'signup';
							localError = null;
						}}
					>
						Sign up
					</button>
				</div>
				{#if showMagicLinkToggle}
					<button
						type="button"
						class="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
						onclick={() => {
							customMode = 'magic-link';
							localError = null;
						}}
					>
						Sign in with a passwordless magic link
					</button>
				{/if}
			{:else if currentMode === 'signup'}
				<div>
					Already have an account?
					<button
						type="button"
						class="font-semibold text-primary-600 hover:underline dark:text-primary-400"
						onclick={() => {
							customMode = 'signin';
							localError = null;
						}}
					>
						Sign in
					</button>
				</div>
			{:else}
				<button
					type="button"
					class="font-semibold text-primary-600 hover:underline dark:text-primary-400"
					onclick={() => {
						customMode = 'signin';
						localError = null;
					}}
				>
					← Back to email and password sign in
				</button>
			{/if}
		</div>
	{/if}
</Card>
