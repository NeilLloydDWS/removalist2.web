import type { Metadata } from "next";
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
import { Container } from "@/components/container";
import { FeaturesSidebar } from "@/components/features-sidebar";
import { features } from "@/lib/features";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore VanMan's full feature set — scheduling, job management, fleet tracking, online bookings, invoicing, analytics, mobile app, and team chat.",
};

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

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to run your moving business
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            From online bookings to invoicing, VanMan covers every step of your
            workflow. Explore our features below.
          </p>
        </div>
      </Section>

      {/* Features with sticky sidebar */}
      <Container className="pb-20">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 xl:grid-cols-[260px_1fr]">
          {/* Sticky sidebar - desktop only */}
          <aside className="hidden lg:block">
            <FeaturesSidebar />
          </aside>

          {/* Mobile top nav */}
          <div className="mb-8 overflow-x-auto lg:hidden">
            <div className="flex gap-2 pb-2">
              {features.map((feature) => (
                <a
                  key={feature.slug}
                  href={`#${feature.slug}`}
                  className="shrink-0 rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {feature.name}
                </a>
              ))}
            </div>
          </div>

          {/* Feature sections */}
          <div className="space-y-20">
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon];
              const isEven = index % 2 === 0;

              return (
                <section
                  key={feature.slug}
                  id={feature.slug}
                  className="scroll-mt-24"
                >
                  <div
                    className={cn(
                      "flex flex-col gap-8 md:flex-row md:items-start md:gap-12",
                      !isEven && "md:flex-row-reverse"
                    )}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="size-5 text-primary" />
                          </div>
                        )}
                        <h2 className="text-2xl font-bold tracking-tight">
                          {feature.name}
                        </h2>
                      </div>
                      <p className="mt-3 text-muted-foreground">
                        {feature.tagline}
                      </p>
                      <ul className="mt-6 space-y-3">
                        {feature.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={feature.href}
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Learn more
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>

                    {/* Screenshot placeholder */}
                    <div className="flex-1">
                      <div className="overflow-hidden rounded-xl border bg-muted/30">
                        <div className="flex aspect-[4/3] items-center justify-center">
                          {Icon && (
                            <div className="text-center">
                              <Icon className="mx-auto size-12 text-primary/30" />
                              <p className="mt-2 text-xs text-muted-foreground">
                                Screenshot
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Container>

      {/* CTA */}
      <Section variant="dark" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See it all in action
          </h2>
          <p className="mt-4 text-lg opacity-80">
            Start your free trial and explore every feature with your own data.
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
