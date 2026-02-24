"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type RegionCode,
  regionalPricing,
  formatPrice,
  planFeatures,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

const regions: { code: RegionCode; label: string }[] = [
  { code: "NZ", label: "NZD" },
  { code: "AU", label: "AUD" },
  { code: "GB", label: "GBP" },
  { code: "US", label: "USD" },
];

export function PricingCard() {
  const [region, setRegion] = useState<RegionCode>("NZ");
  const [annual, setAnnual] = useState(false);

  const pricing = regionalPricing[region];
  const price = annual ? pricing.annualPrice : pricing.monthlyPrice;
  const formattedPrice = formatPrice(price, region);

  return (
    <div className="mx-auto max-w-md">
      {/* Currency selector */}
      <div className="mb-6 flex items-center justify-center gap-1 rounded-lg bg-muted p-1">
        {regions.map((r) => (
          <button
            key={r.code}
            onClick={() => setRegion(r.code)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              region === r.code
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Billing toggle */}
      <div className="mb-8 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-medium",
            !annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
            annual ? "bg-primary" : "bg-input"
          )}
          role="switch"
          aria-checked={annual}
          aria-label="Toggle annual billing"
        >
          <span
            className={cn(
              "pointer-events-none block size-5 rounded-full bg-background shadow-sm ring-0 transition-transform",
              annual ? "translate-x-5.5" : "translate-x-0.5"
            )}
          />
        </button>
        <span
          className={cn(
            "text-sm font-medium",
            annual ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Annual
        </span>
        {annual && (
          <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success">
            Save 20%
          </span>
        )}
      </div>

      {/* Plan card */}
      <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-muted-foreground">
            VanMan Pro
          </h3>
          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="text-5xl font-bold tracking-tight">
              {formattedPrice}
            </span>
            <span className="text-lg text-muted-foreground">/month</span>
          </div>
          {annual && (
            <p className="mt-1 text-sm text-muted-foreground">
              Billed annually ({formatPrice(pricing.annualPrice * 12, region)}
              /year)
            </p>
          )}
        </div>

        <ul className="mt-8 space-y-3">
          {planFeatures.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-success" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button asChild size="lg" className="w-full text-base">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
