export type DbDriver = 'neon' | 'turso' | 'sqlite';

export interface SaasUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null;
	role?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export type SubscriptionStatus =
	'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'unpaid';

export interface SaasSubscription {
	id: string;
	userId: string;
	polarId?: string | null;
	status: SubscriptionStatus;
	priceId?: string | null;
	productId?: string | null;
	tier: string;
	interval?: 'month' | 'year' | null;
	currentPeriodEnd?: Date | null;
	cancelAtPeriodEnd: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface PricingFeature {
	name: string;
	included: boolean;
	hint?: string;
}

export interface PricingTier {
	id: string;
	name: string;
	description: string;
	priceMonthly: number;
	priceYearly: number;
	productIdMonthly?: string;
	productIdYearly?: string;
	popular?: boolean;
	badge?: string;
	buttonText?: string;
	features: (string | PricingFeature)[];
}
