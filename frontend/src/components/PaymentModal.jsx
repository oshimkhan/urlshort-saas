import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Check } from 'lucide-react';
import { api } from '../lib/api';

export default function PaymentModal({ onClose, plan = 'pro' }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const plans = {
    pro: {
      name: 'Pro',
      price: 9,
      features: ['500 URLs', 'Advanced Analytics', 'Custom Domains', 'Priority Support'],
      priceId: 'price_pro'
    },
    business: {
      name: 'Business',
      price: 29,
      features: ['Unlimited URLs', 'Team Collaboration', 'API Access', '24/7 Support', 'Custom Branding'],
      priceId: 'price_business'
    }
  };

  const selectedPlan = plans[plan];

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await api.post('/billing/create-checkout', {
        priceId: selectedPlan.priceId,
        paymentMethod
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        alert('Stripe is not configured. Please add your Stripe keys to .env file.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment system not configured. Please contact support or add Stripe credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Upgrade to {selectedPlan.name}</h2>
          <p className="text-white/90">Choose your payment method</p>
        </div>

        <div className="p-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{selectedPlan.name} Plan</h3>
                <p className="text-gray-600 dark:text-gray-400">Billed monthly</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${selectedPlan.price}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">per month</div>
              </div>
            </div>
            <div className="space-y-2">
              {selectedPlan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-800 dark:text-white'}`}>
                      Credit Card
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Visa, Mastercard, Amex</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border-2 rounded-xl transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <DollarSign className={`w-6 h-6 ${paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-800 dark:text-white'}`}>
                      PayPal
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Fast & Secure</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="font-semibold mb-1">Secure Payment</div>
                <div>Your payment information is encrypted and secure. We use Stripe for processing payments.</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Processing...' : `Pay $${selectedPlan.price}/month`}
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
