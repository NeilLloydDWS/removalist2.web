export type RegionCode = "NZ" | "AU" | "GB" | "US";

export interface RegionalPrice {
  currency: string;
  monthlyPrice: number;
  annualPrice: number;
  locale: string;
}

export const regionalPricing: Record<RegionCode, RegionalPrice> = {
  NZ: {
    currency: "NZD",
    monthlyPrice: 99,
    annualPrice: 79,
    locale: "en-NZ",
  },
  AU: {
    currency: "AUD",
    monthlyPrice: 89,
    annualPrice: 69,
    locale: "en-AU",
  },
  GB: {
    currency: "GBP",
    monthlyPrice: 49,
    annualPrice: 39,
    locale: "en-GB",
  },
  US: {
    currency: "USD",
    monthlyPrice: 59,
    annualPrice: 47,
    locale: "en-US",
  },
};

export function formatPrice(
  amount: number,
  region: RegionCode
): string {
  const { currency, locale } = regionalPricing[region];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const planFeatures = [
  "Unlimited jobs",
  "Unlimited contacts",
  "Unlimited users",
  "All features included",
  "Xero integration",
  "iOS & Android mobile app (drivers, operators, admins)",
  "Team chat (real-time staff messaging)",
  "Email & SMS customer communications",
];

export const faqItems = [
  {
    question: "What happens after the free trial?",
    answer:
      "After your 14-day free trial ends, you can add a payment method to continue using VanMan on your chosen billing plan. If you don't add a payment method, your account will be paused \u2014 but your data is safe and you can reactivate any time.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. There are no lock-in contracts. You can cancel your subscription at any time from your billing settings, and you'll keep access until the end of your current billing period.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. Your 14-day free trial starts immediately \u2014 no credit card required. You only need to add a payment method when you're ready to continue after the trial.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No setup fees, no hidden costs. The price you see is the price you pay. Our onboarding wizard gets you up and running in minutes.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure payment partner, Stripe. Invoices can be paid via bank transfer on request.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes! Switch to annual billing and save 20% compared to monthly. You can change your billing period at any time from your billing settings.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "VanMan is a single all-inclusive plan \u2014 every feature is included from day one. If your needs change, you can switch between monthly and annual billing at any time.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "Everything. Your free trial gives you full access to every feature in VanMan \u2014 calendar, job management, invoicing, Xero integration, mobile app, team chat, and more. No restrictions.",
  },
];
