# Sven UI — Nuxt UI Parity for SvelteKit 2.7+ & Svelte 5

**Sven UI** delivers the full developer experience and component toolkit of **Nuxt UI v1** and the **Nuxt SEO ecosystem** to **SvelteKit 2.7+** and **Svelte 5**, with authentic Svelte flame branding (`#ff3e00` / `#121212`).

---

## ⚡ DX (Developer Experience) & Idiomatic SvelteKit Architecture

1. **`definePageSeo()` Type-Safe SvelteKit `load()` Helper**:
   - Return `{ seo: definePageSeo({ title, description, badge }) }` directly from `+page.ts` / `+page.server.ts`.
   - `<SvenApp>` automatically extracts and binds all meta tags, OpenGraph cards, Twitter cards, and Schema.org JSON-LD data without requiring `<Seo />` tags in child pages.

2. **Vite Plugin (`sven()`)**:
   - Configurable in `vite.config.ts`:

     ```ts
     import { sven } from 'sven-ui/vite';
     export default defineConfig({
     	plugins: [tailwindcss(), sveltekit(), sven()]
     });
     ```

   - Automatically handles dependency pre-bundling for rapid HMR.

3. **1-Line Server Hook (`createSvenHook`)**:
   - Manage all 5 SEO endpoints (`/robots.txt`, `/sitemap.xml`, `/sitemap.xsl`, `/site.webmanifest`, `/api/og`) with **1 line** in `src/hooks.server.ts`:

     ```ts
     import { createSvenHook } from 'sven-ui';
     import { siteConfig } from './site.config';
     export const handle = createSvenHook(siteConfig);
     ```

4. **Svelte 5 Context (`setSiteConfig` / `getSiteConfig`)**:
   - Zero prop-drilling across all header, footer, SEO, and favicon components.

---

## 🧩 30+ Svelte 5 Components & Runes Composables

- **Elements**: `Button`, `ButtonGroup`, `Badge`, `Avatar`, `AvatarGroup`, `DataTable`, `Chip`, `Meter`, `Kbd`, `Icon`, `Spinner`, `Progress`, `Skeleton`, `Link`, `Logo`.
- **Forms**: `Form`, `FormField`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Select`, `RadioGroup`, `Slider`, `ColorPicker`.
- **Layout**: `Container`, `Header`, `Footer`, `Section`, `Card`, `Divider`, `SvenApp`.
- **Navigation & Overlays**: `Tabs`, `Breadcrumb`, `Pagination`, `CommandPalette`, `DropdownMenu`, `ContextMenu`, `Modal`, `Slideover`, `Popover`, `Tooltip`, `Alert`, `Accordion`.
- **Composables**: `useClipboard`, `useShortcuts`, `useColorMode`, `useToast`, `useMediaQuery`, `useDebounce`.

---

## ✅ Verification Results

- **`pnpm check`**: **0 errors, 0 warnings**
- **`pnpm build`**: **Production build succeeded in 6.8s**
