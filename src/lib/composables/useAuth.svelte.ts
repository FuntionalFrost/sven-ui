import { createAuthClient } from 'better-auth/svelte';

export interface UseAuthOptions {
	baseURL?: string;
}

export type SocialProvider = 'github' | 'google' | 'discord' | 'apple';

/**
 * Creates a reactive Svelte 5 Rune composable for Better-Auth authentication.
 */
export function useAuth(options: UseAuthOptions = {}) {
	const authClient = createAuthClient({
		baseURL: options.baseURL || (typeof window !== 'undefined' ? window.location.origin : '')
	});

	let user = $state<any>(null);
	let session = $state<any>(null);
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	const isAuthenticated = $derived(!!user);

	async function fetchSession() {
		try {
			isLoading = true;
			const res = await authClient.getSession();
			if (res.data) {
				user = res.data.user;
				session = res.data.session;
			} else {
				user = null;
				session = null;
			}
		} catch (err: any) {
			user = null;
			session = null;
			error = err?.message || 'Failed to fetch session';
		} finally {
			isLoading = false;
		}
	}

	async function signInWithEmail(email: string, password: string): Promise<boolean> {
		isLoading = true;
		error = null;
		try {
			const res = await authClient.signIn.email({ email, password });
			if (res.error) {
				error = res.error.message || 'Invalid email or password';
				return false;
			}
			await fetchSession();
			return true;
		} catch (err: any) {
			error = err?.message || 'Authentication error';
			return false;
		} finally {
			isLoading = false;
		}
	}

	async function signUpWithEmail(email: string, password: string, name: string): Promise<boolean> {
		isLoading = true;
		error = null;
		try {
			const res = await authClient.signUp.email({ email, password, name });
			if (res.error) {
				error = res.error.message || 'Could not create account';
				return false;
			}
			await fetchSession();
			return true;
		} catch (err: any) {
			error = err?.message || 'Registration error';
			return false;
		} finally {
			isLoading = false;
		}
	}

	async function signInWithSocial(provider: SocialProvider): Promise<void> {
		isLoading = true;
		error = null;
		try {
			await authClient.signIn.social({
				provider,
				callbackURL: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '/'
			});
		} catch (err: any) {
			error = err?.message || `Failed to sign in with ${provider}`;
			isLoading = false;
		}
	}

	async function signInWithMagicLink(email: string): Promise<boolean> {
		isLoading = true;
		error = null;
		try {
			const res = await (authClient.signIn as any).magicLink?.({
				email,
				callbackURL: typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '/'
			});
			if (res?.error) {
				error = res.error.message || 'Failed to send magic link';
				return false;
			}
			return true;
		} catch (err: any) {
			error = err?.message || 'Failed to send magic link';
			return false;
		} finally {
			isLoading = false;
		}
	}

	async function signOut(): Promise<void> {
		isLoading = true;
		try {
			await authClient.signOut();
			user = null;
			session = null;
		} catch (err: any) {
			error = err?.message || 'Failed to sign out';
		} finally {
			isLoading = false;
		}
	}

	// Initialize session on mount if in browser
	if (typeof window !== 'undefined') {
		fetchSession();
	}

	return {
		get user() {
			return user;
		},
		set user(val) {
			user = val;
		},
		get session() {
			return session;
		},
		get isLoading() {
			return isLoading;
		},
		get isAuthenticated() {
			return isAuthenticated;
		},
		get error() {
			return error;
		},
		client: authClient,
		fetchSession,
		signInWithEmail,
		signUpWithEmail,
		signInWithSocial,
		signInWithMagicLink,
		signOut
	};
}
