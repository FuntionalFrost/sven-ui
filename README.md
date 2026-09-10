<div align="center">

# Sven UI

**The Intuitive Svelte UI Library**  
_Nuxt UI v4 Equivalent for SvelteKit 2.7+ & Svelte 5 with Built-in SEO Parity._

[![Svelte 5](https://img.shields.io/badge/Svelte-5.0+-FF3E00?style=flat&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2.7+-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Bits UI](https://img.shields.io/badge/Bits_UI-v2.0-18181b?style=flat)](https://bits-ui.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

[**Live Documentation & Playground →**](https://sven-ui.dev)

</div>

---

## 🌟 Overview

**Sven UI** brings the full developer experience, visual elegance, and full-stack toolkit of **Nuxt UI** and the **Nuxt SEO ecosystem** to **SvelteKit 2.7+** and **Svelte 5**.

- 🎨 **Tailwind CSS v4 Native Tokens**: Styled with `@theme` variables; customize any color or token directly.
- ⚡ **Pure Svelte 5 Runes**: Built using `$state`, `$derived`, `$props`, and `$bindable` — zero Virtual DOM overhead.
- ♿ **Accessible by Default**: Headless primitives powered by **Bits UI**.
- 🚀 **100% DRY SEO Parity**: Automate dynamic Open Graph cards (`/api/og`), environment-aware `robots.txt`, XML sitemaps with human-readable `sitemap.xsl` stylesheets, PWA manifests, and Schema.org JSON-LD from a single `src/site.config.ts`.
- 🧩 **30+ Production Components**: Full suite of layout, element, form, and overlay components.
- 🛠️ **Composable Runes**: `useShortcuts`, `useClipboard`, `useColorMode`, `useToast`, `useMediaQuery`, `useDebounce`.

---

## 📦 Quickstart in 3 Steps

### 1. Install Sven UI

```bash
pnpm add sven-ui bits-ui tailwind-variants svelte-sonner
# or
npm install sven-ui bits-ui tailwind-variants svelte-sonner
```

### 2. Define Your Site Configuration

Create `src/site.config.ts` — your single source of truth for branding, metadata, and SEO:

```ts
// src/site.config.ts
import { defineSiteConfig } from 'sven-ui';

export const siteConfig = defineSiteConfig({
	name: 'My Indie App',
	title: 'My Indie App — Build Fast with SvelteKit',
	description: 'Fast, beautiful, accessible web applications.',
	url: 'https://my-app.com',
	theme: {
		primaryColor: '#ff3e00',
		defaultMode: 'dark'
	},
	socials: {
		github: 'https://github.com/my-org/my-app',
		twitter: '@my_app'
	}
});
```

### 3. Wrap Root Layout

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { SvenApp } from 'sven-ui';
	import { siteConfig } from '../site.config';

	let { children } = $props();
</script>

<SvenApp config={siteConfig}>
	{@render children()}
</SvenApp>
```

---

## 🛡️ 1-Line Server SEO Automation

Handle **all 5 SEO endpoints** (`/robots.txt`, `/sitemap.xml`, `/sitemap.xsl`, `/site.webmanifest`, `/api/og`) automatically with a **single line** in `src/hooks.server.ts`:

```ts
// src/hooks.server.ts
import { createSvenHook } from 'sven-ui';
import { siteConfig } from './site.config';

export const handle = createSvenHook(siteConfig);
```

### Automatic Page SEO via SvelteKit `load()`

```ts
// src/routes/blog/[slug]/+page.ts
import { definePageSeo } from 'sven-ui';

export const load = async ({ params }) => {
	return {
		seo: definePageSeo({
			title: 'How to Build Fast Indie SaaS',
			description: 'Step-by-step guide with SvelteKit 2.7 & Sven UI',
			badge: 'Tutorial'
		})
	};
};
```

---

## 🧩 Component Library

| Category           | Components                                                                                                                                                   |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Elements**       | `Button`, `ButtonGroup`, `Badge`, `Avatar`, `AvatarGroup`, `DataTable`, `Chip`, `Meter`, `Kbd`, `Icon`, `Spinner`, `Progress`, `Skeleton`, `Link`, `Logo`    |
| **Forms**          | `Form`, `FormField`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Select`, `RadioGroup`, `Slider`, `ColorPicker`                                              |
| **Layout**         | `Container`, `Header`, `Footer`, `Section`, `Card`, `Divider`, `SvenApp`                                                                                     |
| **Overlays & Nav** | `Tabs`, `Breadcrumb`, `Pagination`, `CommandPalette` (`⌘K`), `DropdownMenu`, `ContextMenu`, `Modal`, `Slideover`, `Popover`, `Tooltip`, `Alert`, `Accordion` |
| **Composables**    | `useClipboard`, `useShortcuts`, `useColorMode`, `useToast`, `useMediaQuery`, `useDebounce`                                                                   |

---

## 🎨 Interactive Live Accent Themes

Sven UI includes first-class support for instant dynamic CSS accent variables:

```ts
import { switchAccent } from 'sven-ui';

// Change theme accent dynamically at runtime:
switchAccent('#ff3e00'); // Svelte Flame
switchAccent('#10b981'); // Emerald Mint
switchAccent('#0ea5e9'); // Sky Cyan
```

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository: `git clone https://github.com/FuntionalFrost/sven-ui.git`
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm dev`
4. Run type checking & linting: `pnpm check && pnpm lint`

---

## 📄 License

[MIT License](LICENSE) © 2026 Sven UI Contributors.
