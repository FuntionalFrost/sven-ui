import { defineSiteConfig } from '$lib/site/config';

export const siteConfig = defineSiteConfig({
	name: 'Sven UI',
	title: 'Sven UI — The Intuitive Svelte UI Library',
	description:
		'A comprehensive Svelte 5 UI component library (SvelteKit optional) with 25+ accessible, Tailwind CSS components for building modern web applications.',
	url: 'https://sven-ui.dev',
	version: 'v4.11.1',
	logo: '/favicon.svg',
	author: {
		name: 'Sven UI Team',
		twitter: '@sven_ui',
		github: 'https://github.com/sven-ui/sven'
	},
	theme: {
		primaryColor: '#ff3e00',
		neutralColor: '#71717a',
		defaultMode: 'dark'
	},
	seo: {
		titleTemplate: '%s · Sven UI',
		defaultOgImage: '/api/og',
		twitterCard: 'summary_large_image',
		keywords: [
			'Svelte',
			'SvelteKit',
			'Svelte 5',
			'Nuxt UI',
			'Tailwind CSS v4',
			'UI Components',
			'SEO',
			'OpenGraph',
			'Sitemap',
			'Robots.txt'
		],
		robots: {
			index: true,
			follow: true
		}
	},
	sitemap: {
		changefreq: 'weekly',
		priority: 0.8,
		exclude: ['/api/*']
	},
	nav: [
		{ label: 'Docs', href: '#docs' },
		{ label: 'Components', href: '#components' },
		{ label: 'SEO Suite', href: '#seo-studio' },
		{ label: 'Releases', href: '#releases', badge: 'v4.11.1' }
	],
	socials: {
		github: 'https://github.com/sven-ui/sven',
		twitter: 'https://twitter.com/sven_ui'
	}
});
