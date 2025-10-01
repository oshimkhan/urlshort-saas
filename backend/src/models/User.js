import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String },

    // Billing
    plan: { type: String, enum: ['free', 'pro', 'business'], default: 'free' },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    subscriptionStatus: { type: String, enum: ['active', 'trialing', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid', 'none'], default: 'none' },

    // Limits
    limits: {
      maxUrls: { type: Number, default: 50 },
      customDomains: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
