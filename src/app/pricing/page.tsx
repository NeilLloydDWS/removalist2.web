import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { PricingCard } from "@/components/pricing-card";
import { PricingFaq } from "@/components/pricing-faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for moving companies. One plan, all features included. Start your 14-day free trial today — no credit card required.",
  openGraph: {
    title: "Pricing | VanMan",
    description:
      "Simple, transparent pricing for moving companies. One plan, all features included.",
  },
};

export default function PricingPage() {
  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Pricing"
          heading="One plan. Everything included."
          subheading="No tiers, no hidden fees, no per-user charges. Every feature in VanMan is included from day one."
        />
        <PricingCard />
      </Section>

      <Section variant="alternate-bg">
        <SectionHeader
          heading="Frequently asked questions"
          subheading="Everything you need to know about pricing and billing."
        />
        <PricingFaq />
      </Section>
    </>
  );
}
