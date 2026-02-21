import Stripe from "stripe";

const isStripeConfigured =
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_SECRET_KEY.startsWith("sk_") &&
    process.env.STRIPE_SECRET_KEY.length > 20;

export const stripe = isStripeConfigured
    ? new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true })
    : null;

export { isStripeConfigured };
