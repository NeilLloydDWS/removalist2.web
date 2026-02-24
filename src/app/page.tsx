import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  BarChart3,
  Smartphone,
  MessagesSquare,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Grid } from "@/components/grid";
import { features } from "@/lib/features";
import { testimonials } from "@/lib/testimonials";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  BarChart3,
  Smartphone,
  MessagesSquare,
};

const stats = [
  { value: "10,000+", label: "Jobs managed" },
  { value: "500+", label: "Moving companies" },
  { value: "4", label: "Countries" },
];

const steps = [
  {
    number: 1,
    title: "Receive bookings",
    description:
      "Customers submit enquiries through your website. They land straight in VanMan — no copy-pasting from email.",
    icon: Globe,
  },
  {
    number: 2,
    title: "Schedule & dispatch",
    description:
      "Drag jobs onto your calendar, assign trucks and crews. Everyone sees the plan in real time.",
    icon: Calendar,
  },
  {
    number: 3,
    title: "Track & communicate",
    description:
      "Send automated SMS updates to customers. Drivers update job status from the mobile app on the road.",
    icon: MessageSquare,
  },
  {
    number: 4,
    title: "Invoice & get paid",
    description:
      "Generate invoices from completed jobs with one click. Sync straight to Xero — no double entry.",
    icon: Receipt,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "VanMan",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web, iOS, Android",
          description:
            "Moving company management software for scheduling, job management, invoicing, and team coordination.",
          url: "https://vanman.app",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "NZD",
            availability: "https://schema.org/OnlineOnly",
            url: "https://vanman.app/pricing",
          },
        }}
      />
      {/* ===== Hero ===== */}
      <Section className="py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Run your moving company from one place
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Scheduling, job management, invoicing, team chat, and a mobile app
            for your drivers &mdash; all in one platform built for removalists.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Free for 14 days.
          </p>
        </div>

        {/* Hero visual placeholder */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-2xl">
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center">
                <Calendar className="mx-auto size-16 text-primary/40" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Product screenshot
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ===== Social Proof ===== */}
      <Section variant="alternate-bg">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by moving companies across NZ, Australia, UK &amp; US
          </p>

          {/* Customer logos placeholder */}
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 items-center gap-8 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex h-12 items-center justify-center rounded-lg bg-muted/60"
              >
                <div className="h-6 w-20 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <Grid cols={3}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role}, {t.company} &middot; {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      {/* ===== Feature Highlights Grid ===== */}
      <Section>
        <SectionHeader
          eyebrow="Features"
          heading="Everything you need to run your moving business"
          subheading="From first enquiry to final invoice, VanMan covers every step."
        />
        <Grid cols={3}>
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.slug}
                className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                {Icon && (
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <Link
                  href={feature.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </Grid>
      </Section>

      {/* ===== How It Works ===== */}
      <Section variant="alternate-bg" id="how-it-works">
        <SectionHeader
          eyebrow="How It Works"
          heading="From booking to invoice in four simple steps"
          subheading="VanMan streamlines your entire workflow so nothing falls through the cracks."
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-4 gap-8">
            {/* Connector line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-8 h-0.5 bg-border" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative text-center">
                  <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="absolute -top-1 left-1/2 z-20 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet: vertical flow */}
        <div className="lg:hidden">
          <div className="relative space-y-8 pl-10">
            {/* Vertical connector line */}
            <div className="absolute bottom-4 left-4 top-4 w-0.5 bg-border" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <div className="absolute -left-10 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <div className="rounded-xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Icon className="size-5 text-primary" />
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ===== Bottom CTA ===== */}
      <Section variant="dark" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to simplify your moving business?
          </h2>
          <p className="mt-4 text-lg opacity-80">
            Join hundreds of moving companies already using VanMan to save time,
            reduce admin, and grow their business.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-background/30 text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm opacity-60">
            No credit card required. Free for 14 days.
          </p>
        </div>
      </Section>
    </>
  );
}
