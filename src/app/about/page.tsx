import type { Metadata } from "next";
import Link from "next/link";
import { Users, Heart, Truck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { Grid } from "@/components/grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "VanMan was built by a real removalist company. Learn our story and why we're building the tools we wished we had.",
};

const values = [
  {
    icon: Truck,
    title: "Built by movers",
    description:
      "We've loaded trucks, dealt with traffic, and chased invoices. VanMan was born from real problems, not a boardroom.",
  },
  {
    icon: Heart,
    title: "Customer obsessed",
    description:
      "Every feature starts with a conversation with a moving company. We build what you actually need.",
  },
  {
    icon: Target,
    title: "Simple by design",
    description:
      "Moving is complicated enough. Our software shouldn't be. We obsess over keeping things straightforward.",
  },
  {
    icon: Users,
    title: "Global & local",
    description:
      "We serve movers in NZ, Australia, the UK, and the US — with support and features that work wherever you operate.",
  },
];

const team = [
  { name: "Neill Lloyd", role: "Founder & CEO", initials: "NL" },
  { name: "Jordan Smith", role: "Head of Product", initials: "JS" },
  { name: "Olivia Chen", role: "Lead Engineer", initials: "OC" },
  { name: "Marcus Webb", role: "Customer Success", initials: "MW" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Our Story
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Built by movers, for movers
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            VanMan started as an internal tool at a real moving company in New
            Zealand. We built it because nothing else on the market understood
            how removalists actually work.
          </p>
        </div>
      </Section>

      {/* Origin story */}
      <Section variant="alternate-bg">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            How it started
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              VanMan NZ is a removalist company that spent years juggling
              spreadsheets, whiteboards, and a patchwork of tools that
              didn&apos;t talk to each other. Jobs got lost. Invoices went out
              late. Customers had to call for updates that should have been
              automatic.
            </p>
            <p>
              So we started building the tool we wished existed — one platform
              that handles scheduling, job tracking, customer communication,
              invoicing, and team coordination, all designed specifically for
              moving companies.
            </p>
            <p>
              What started as an internal solution quickly became something other
              movers wanted too. Today, VanMan helps hundreds of moving companies
              across New Zealand, Australia, the UK, and the US run their
              businesses more efficiently.
            </p>
          </div>

          <div className="mt-10 rounded-xl border bg-card p-6 shadow-sm">
            <blockquote className="text-lg font-medium italic">
              &ldquo;We&apos;re building the tools we wished we had when running
              our own moving company.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-muted-foreground">
              — The VanMan Team
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeader
          eyebrow="What Drives Us"
          heading="Our values"
          subheading="The principles behind every feature, decision, and support conversation."
        />
        <Grid cols={2}>
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            );
          })}
        </Grid>
      </Section>

      {/* Team */}
      <Section variant="alternate-bg">
        <SectionHeader
          eyebrow="The Team"
          heading="The people behind VanMan"
          subheading="A small, focused team that cares deeply about making moving companies more successful."
        />
        <Grid cols={4}>
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                {member.initials}
              </div>
              <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {member.role}
              </p>
            </div>
          ))}
        </Grid>
      </Section>

      {/* CTA */}
      <Section variant="dark" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see VanMan in action?
          </h2>
          <p className="mt-4 text-lg opacity-80">
            Start your free 14-day trial and see why hundreds of moving
            companies have made the switch.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/signup">Start Free Trial</Link>
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
