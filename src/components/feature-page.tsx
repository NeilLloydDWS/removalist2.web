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
  ArrowLeft,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Users,
  Target,
  TrendingUp,
  Layers,
  RefreshCw,
  Search,
  MapPin,
  Mail,
  FileText,
  Bell,
  Camera,
  Wifi,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Grid } from "@/components/grid";
import { features } from "@/lib/features";
import type { FeaturePageData } from "@/lib/feature-pages/types";
import { cn } from "@/lib/utils";

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
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Users,
  Target,
  TrendingUp,
  Layers,
  RefreshCw,
  Search,
  MapPin,
  Mail,
  FileText,
  Bell,
  Camera,
  Wifi,
  CreditCard,
};

interface FeaturePageProps {
  data: FeaturePageData;
}

export function FeaturePage({ data }: FeaturePageProps) {
  const currentIndex = features.findIndex((f) => f.slug === data.slug);
  const prevFeature = currentIndex > 0 ? features[currentIndex - 1] : null;
  const nextFeature =
    currentIndex < features.length - 1 ? features[currentIndex + 1] : null;

  const currentFeature = features[currentIndex];
  const FeatureIcon = currentFeature ? iconMap[currentFeature.icon] : null;

  const relatedFeatureData = data.relatedFeatures
    .map((slug) => features.find((f) => f.slug === slug))
    .filter(Boolean) as (typeof features)[number][];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <Link
            href="/features"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium">{data.title}</span>
        </div>
      </div>

      {/* Hero */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            {FeatureIcon && (
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <FeatureIcon className="size-6 text-primary" />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {data.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-primary">
              {data.tagline}
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              {data.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/features">See All Features</Link>
              </Button>
            </div>
          </div>

          {/* Hero screenshot placeholder */}
          <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-lg">
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="text-center">
                {FeatureIcon && (
                  <FeatureIcon className="mx-auto size-16 text-primary/30" />
                )}
                <p className="mt-3 text-sm text-muted-foreground">
                  {data.heroImage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Key Benefits */}
      <Section variant="alternate-bg">
        <SectionHeader
          eyebrow="Key Benefits"
          heading={`Why ${data.title}`}
          subheading="The advantages that make the difference for your moving business."
        />
        <Grid cols={data.benefits.length <= 3 ? 3 : 4}>
          {data.benefits.map((benefit) => {
            const Icon = iconMap[benefit.icon];
            return (
              <div
                key={benefit.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                {Icon && (
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </Grid>
      </Section>

      {/* Detail Sections (alternating layout) */}
      {data.detailSections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <Section
            key={section.title}
            variant={isEven ? "default" : "alternate-bg"}
          >
            <div
              className={cn(
                "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
                !isEven && "lg:[&>*:first-child]:order-2"
              )}
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Screenshot placeholder */}
              <div className="overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center">
                  <div className="text-center">
                    {FeatureIcon && (
                      <FeatureIcon className="mx-auto size-10 text-primary/20" />
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {section.imagePlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      {/* Integration Callout */}
      <Section variant="gradient">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            eyebrow="Works With"
            heading={data.integrationCallout.title}
            subheading={data.integrationCallout.description}
          />
          <div className="flex flex-wrap justify-center gap-3">
            {data.integrationCallout.features.map((slug) => {
              const feature = features.find((f) => f.slug === slug);
              if (!feature) return null;
              const Icon = iconMap[feature.icon];
              return (
                <Link
                  key={slug}
                  href={feature.href}
                  className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                >
                  {Icon && <Icon className="size-4 text-primary" />}
                  {feature.name}
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Related Features */}
      {relatedFeatureData.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Related"
            heading="You might also like"
            subheading="Features that work great alongside this one."
          />
          <Grid cols={3}>
            {relatedFeatureData.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <Link
                  key={feature.slug}
                  href={feature.href}
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
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </Grid>
        </Section>
      )}

      {/* Prev/Next Navigation */}
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl items-stretch">
          {prevFeature ? (
            <Link
              href={prevFeature.href}
              className="flex flex-1 items-center gap-3 border-r px-4 py-6 transition-colors hover:bg-muted/50 sm:px-8"
            >
              <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="truncate text-sm font-medium">
                  {prevFeature.name}
                </p>
              </div>
            </Link>
          ) : (
            <div className="flex-1 border-r" />
          )}
          {nextFeature ? (
            <Link
              href={nextFeature.href}
              className="flex flex-1 items-center justify-end gap-3 px-4 py-6 transition-colors hover:bg-muted/50 sm:px-8"
            >
              <div className="min-w-0 text-right">
                <p className="text-xs text-muted-foreground">Next</p>
                <p className="truncate text-sm font-medium">
                  {nextFeature.name}
                </p>
              </div>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      {/* CTA */}
      <Section variant="dark" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to try {data.title}?
          </h2>
          <p className="mt-4 text-lg opacity-80">
            Start your free 14-day trial and see how VanMan transforms your
            moving business.
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
              <Link href="/features">See All Features</Link>
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
