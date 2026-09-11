import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// Better-Auth Tables (PostgreSQL)
// ---------------------------------------------------------------------------

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull().default(false),
	image: text('image'),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
	role: text('role').default('user'),
	banned: boolean('banned').default(false),
	banReason: text('ban_reason'),
	banExpires: timestamp('ban_expires', { mode: 'date' })
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at', { mode: 'date' }),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { mode: 'date' }),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at', { mode: 'date' }).notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }),
	updatedAt: timestamp('updated_at', { mode: 'date' })
});

// ---------------------------------------------------------------------------
// Polar.sh Billing & Subscription Tables (PostgreSQL)
// ---------------------------------------------------------------------------

export const customer = pgTable('customer', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: 'cascade' }),
	polarCustomerId: text('polar_customer_id').notNull().unique(),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull()
});

export const subscription = pgTable('subscription', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	polarId: text('polar_id').unique(),
	status: text('status').notNull().default('incomplete'), // 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete'
	priceId: text('price_id'),
	productId: text('product_id'),
	tier: text('tier').notNull().default('free'), // e.g. 'free' | 'pro' | 'enterprise'
	interval: text('interval'), // 'month' | 'year'
	currentPeriodEnd: timestamp('current_period_end', { mode: 'date' }),
	cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull()
});
