import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out ChainBuddy',
    features: [
      'Basic inventory tracking',
      'Up to 100 orders/month',
      'Email support',
      '1 team member',
      'Basic analytics',
      'Community access'
    ],
    cta: 'Get Started',
    highlight: false
  },
  {
    name: 'Starter',
    price: 49,
    description: 'Perfect for small businesses starting their supply chain journey',
    features: [
      'Basic inventory management',
      'Order tracking',
      'Simple analytics',
      'Email support',
      '2 team members',
      '1,000 orders/month',
      'Basic API access'
    ],
    cta: 'Start Free Trial',
    highlight: false
  },
  {
    name: 'Professional',
    price: 99,
    description: 'Ideal for growing businesses with complex supply chain needs',
    features: [
      'Advanced inventory management',
      'Real-time order tracking',
      'Advanced analytics & reporting',
      'Priority email & chat support',
      '5 team members',
      '5,000 orders/month',
      'Full API access',
      'Custom integrations',
      'Demand forecasting'
    ],
    cta: 'Start Free Trial',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large-scale operations',
    features: [
      'Custom inventory solutions',
      'Advanced order management',
      'AI-powered analytics',
      '24/7 dedicated support',
      'Unlimited team members',
      'Unlimited orders',
      'Premium API access',
      'Custom integrations',
      'Advanced forecasting',
      'Dedicated account manager',
      'Custom training'
    ],
    cta: 'Contact Sales',
    highlight: false
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your supply chain needs
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative bg-white rounded-lg p-0.5 flex">
            <button
              type="button"
              className={`relative py-2 px-6 text-sm font-medium rounded-md focus:outline-none ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`relative py-2 px-6 text-sm font-medium rounded-md focus:outline-none ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700'
              }`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl ${
                plan.highlight ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-0 right-6 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold tracking-wide rounded-full">
                  Most Popular
                </span>
              )}
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-4xl font-extrabold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-base font-medium text-gray-500">
                        /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-gray-900">
                      {plan.price}
                    </span>
                  )}
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 shrink-0" />
                      <span className="ml-3 text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-8 w-full py-3 px-4 rounded-md shadow text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 max-w-3xl mx-auto">
            {[
              {
                question: 'Can I switch plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.'
              }
            ].map((faq) => (
              <div key={faq.question} className="mt-8 border-t border-gray-200 pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Need a custom solution?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Contact our sales team for a personalized demo and custom pricing.
          </p>
          <button
            type="button"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}