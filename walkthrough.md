# Yaxa — Nuxt UI & Solo SaaS Parity for SvelteKit 2.7+ & Svelte 5

**Yaxa** delivers the full developer experience, component toolkit, and full-stack SaaS engine of **Nuxt UI v4 / Nuxt UI Pro** and the **Nuxt SEO ecosystem** to **SvelteKit 2.7+** and **Svelte 5**, with authentic Svelte flame branding (`#ff3e00` / `#121212`).

---

## ⚡ DX & Idiomatic SvelteKit Architecture

1. **`definePageSeo()` Type-Safe SvelteKit `load()` Helper**:
   - Return `{ seo: definePageSeo({ title, description, badge }) }` directly from `+page.ts` / `+page.server.ts`.
   - `<YaxaApp>` automatically extracts and binds all meta tags, OpenGraph cards, Twitter cards, and Schema.org JSON-LD data.

2. **1-Line Server Hooks (`createYaxaHook` & `createYaxaAuthHook`)**:
   - Manage all 5 SEO endpoints (`/robots.txt`, `/sitemap.xml`, `/sitemap.xsl`, `/site.webmanifest`, `/api/og`) with **1 line** in `src/hooks.server.ts`:
     ```ts
     import { sequence } from '@sveltejs/kit/hooks';
     import { createYaxaHook, createYaxaAuth, createYaxaAuthHook } from 'yaxa';
     import { siteConfig } from './site.config';

     const yaxaHook = createYaxaHook(siteConfig);
     const auth = createYaxaAuth();
     const authHook = createYaxaAuthHook({
     	auth,
     	protectedPaths: ['/dashboard', '/settings', '/billing'],
     	loginPath: '/login'
     });

     export const handle = sequence(yaxaHook, authHook);
     ```

3. **Multi-Dialect Database Factory (`getDb`)**:
   - Seamlessly switch between **Neon (PostgreSQL)** and **Turso (LibSQL/SQLite)** with Drizzle ORM via `DATABASE_DRIVER="neon" | "turso"`.

4. **Polar.sh Automated Billing & Webhook Synchronization**:
   - `createPolarCheckout` for instant hosted checkouts.
   - `createPolarWebhookHandler` automatically syncs subscriptions, orders, and customer status directly into the Drizzle database.

5. **Resend Transactional Email Engine**:
   - `sendMagicLinkEmail` and `sendWelcomeEmail` with responsive, branded HTML templates.

---

## 🧩 35+ Svelte 5 Components & Runes Composables

- **SaaS Suite**: `<AuthCard>`, `<UserMenu>`, `<PricingCard>`, `<PricingTable>`, `<SubscriptionCard>`, `useAuth()`.
- **Elements**: `Button`, `ButtonGroup`, `Badge`, `Avatar`, `AvatarGroup`, `DataTable`, `Chip`, `Meter`, `Kbd`, `Icon`, `Spinner`, `Progress`, `Skeleton`, `Link`, `Logo`.
- **Forms**: `Form`, `FormField`, `Input`, `Textarea`, `Checkbox`, `Switch`, `Select`, `RadioGroup`, `Slider`, `ColorPicker`.
- **Layout**: `Container`, `Header`, `Footer`, `Section`, `Card`, `Divider`, `YaxaApp`.
- **Navigation & Overlays**: `Tabs`, `Breadcrumb`, `Pagination`, `CommandPalette` (`⌘K`), `DropdownMenu`, `ContextMenu`, `Modal`, `Slideover`, `Popover`, `Tooltip`, `Alert`, `Accordion`.
- **Composables**: `useAuth`, `useClipboard`, `useShortcuts`, `useColorMode`, `useToast`, `useMediaQuery`, `useDebounce`.

---

## 🚀 Live Demo & Documentation

- **Live Documentation**: [https://yaxa.vercel.app](https://yaxa.vercel.app)
- **SaaS Showcase**: Explore the interactive SaaS flow at [`/saas`](src/routes/saas/+page.svelte) or on [yaxa.vercel.app/saas](https://yaxa.vercel.app/saas).
- **SaaS Docs**: Full implementation guide in [`src/routes/docs/_sections/DocSaasSuite.svelte`](src/routes/docs/_sections/DocSaasSuite.svelte) or on [yaxa.vercel.app/docs/saas-suite](https://yaxa.vercel.app/docs/saas-suite).

---

## ✅ Verification Results

- **`pnpm check`**: **0 errors, 0 warnings**
- **`pnpm build`**: **Production build & SSR bundle succeeded**
- **`pnpm package`**: **Library distribution (`dist/`) generated**
- **`pnpm format`**: **All files formatted cleanly with Prettier**
