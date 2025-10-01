import { Router } from 'express';
import Stripe from 'stripe';
import User from '../models/User.js';
import { authMiddleware } from '../utils/jwt.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const router = Router();

router.use(authMiddleware);

router.post('/create-checkout', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(400).json({ error: 'Payment system not configured. Please contact support.' });
    }

    const { priceId } = req.body;
    const user = await User.findById(req.user.id);

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard`
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error('Stripe checkout error:', e);
    res.status(500).json({ error: e.message });
  }
});

router.post('/create-portal', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(400).json({ error: 'Payment system not configured. Please contact support.' });
    }

    const user = await User.findById(req.user.id);
    if (!user.stripeCustomerId) return res.status(400).json({ error: 'No subscription' });

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/dashboard`
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error('Stripe portal error:', e);
    res.status(500).json({ error: e.message });
  }
});

export async function stripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
      const subscription = event.data.object;
      const user = await User.findOne({ stripeCustomerId: subscription.customer });
      if (user) {
        user.stripeSubscriptionId = subscription.id;
        user.subscriptionStatus = subscription.status;
        // Map plan from metadata or price
        if (subscription.items.data[0]?.price?.metadata?.plan) {
          user.plan = subscription.items.data[0].price.metadata.plan;
        }
        if (user.plan === 'pro') {
          user.limits.maxUrls = 500;
        } else if (user.plan === 'business') {
          user.limits.maxUrls = 10000;
        }
        await user.save();
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const user = await User.findOne({ stripeCustomerId: subscription.customer });
      if (user) {
        user.plan = 'free';
        user.subscriptionStatus = 'canceled';
        user.limits.maxUrls = 50;
        await user.save();
      }
    }

    res.json({ received: true });
  } catch (e) {
    console.error('Webhook error:', e.message);
    res.status(400).send(`Webhook Error: ${e.message}`);
  }
}

export default router;
