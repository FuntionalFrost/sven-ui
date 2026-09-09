import { browser } from '$app/environment';

export type ThemeMode = 'light' | 'dark' | 'system';

class ThemeStore {
	mode = $state<ThemeMode>('system');
	resolvedTheme = $state<'light' | 'dark'>('light');

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('sven-theme') as ThemeMode | null;
			if (stored && ['light', 'dark', 'system'].includes(stored)) {
				this.mode = stored;
			}
			this.updateResolvedTheme();

			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
				if (this.mode === 'system') {
					this.updateResolvedTheme();
				}
			});
		}
	}

	setMode(newMode: ThemeMode) {
		this.mode = newMode;
		if (browser) {
			localStorage.setItem('sven-theme', newMode);
			this.updateResolvedTheme();
		}
	}

	toggle() {
		if (this.resolvedTheme === 'dark') {
			this.setMode('light');
		} else {
			this.setMode('dark');
		}
	}

	private updateResolvedTheme() {
		if (!browser) return;

		let isDark: boolean;
		if (this.mode === 'system') {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			isDark = this.mode === 'dark';
		}

		this.resolvedTheme = isDark ? 'dark' : 'light';

		if (isDark) {
			document.documentElement.classList.add('dark');
			document.documentElement.style.colorScheme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			document.documentElement.style.colorScheme = 'light';
		}
	}
}

export const theme = new ThemeStore();

/**
 * Inline script to prevent theme flash (FOUC) during initial SSR load.
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('sven-theme');
    var isDark = stored === 'dark' || (!stored || stored === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
`;
