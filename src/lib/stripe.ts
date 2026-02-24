import Stripe from "stripe";
import {
  type RegionCode,
  type RegionalPrice,
  defaultRegionalPricing,
} from "@/lib/pricing";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

const currencyToRegion: Record<string, RegionCode> = {
  nzd: "NZ",
  aud: "AU",
  gbp: "GB",
  usd: "US",
};

export async function getRegionalPricing(): Promise<
  Record<RegionCode, RegionalPrice>
> {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRODUCT_ID) {
    return defaultRegionalPricing;
  }

  try {
    const stripe = getStripe();
    const { data: prices } = await stripe.prices.list({
      product: process.env.STRIPE_PRODUCT_ID,
      active: true,
    });

    const result = structuredClone(defaultRegionalPricing);

    for (const price of prices) {
      const region = currencyToRegion[price.currency];
      if (!region || !price.unit_amount || !price.recurring) continue;

      const amount = price.unit_amount / 100;

      if (price.recurring.interval === "month") {
        result[region].monthlyPrice = amount;
      } else if (price.recurring.interval === "year") {
        result[region].annualPrice = Math.round(amount / 12);
      }
    }

    return result;
  } catch {
    return defaultRegionalPricing;
  }
}
