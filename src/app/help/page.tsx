import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  Smartphone,
  MessagesSquare,
  CreditCard,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { HelpSearch } from "@/components/help-search";
import { getHelpCategories, getFlatHelpArticles, generateHelpSearchIndex } from "@/lib/help";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers, guides, and tutorials for using VanMan. Search our help center or browse by category.",
  openGraph: {
    title: "Help Center | VanMan",
    description: "Find answers, guides, and tutorials for using VanMan.",
  },
};

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Calendar,
  ClipboardList,
  Truck,
  Globe,
  MessageSquare,
  Receipt,
  Smartphone,
  MessagesSquare,
  CreditCard,
};

export default function HelpPage() {
  const categories = getHelpCategories();
  const articles = getFlatHelpArticles();
  const searchIndex = generateHelpSearchIndex();

  // Popular articles — first 5 by sort order across categories
  const popularArticles = articles.slice(0, 5);

  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Help Center"
          heading="How can we help?"
          subheading="Search our guides and tutorials, or browse by category below."
        />

        <div className="mx-auto mb-12 max-w-xl">
          <HelpSearch searchIndex={searchIndex} />
        </div>

        {/* Category grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Rocket;
            return (
              <Link
                key={cat.slug}
                href={`/help/${cat.slug}`}
                className="group rounded-lg border bg-card p-5 transition-colors hover:bg-accent/50"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold group-hover:text-primary">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cat.description}
                </p>
                {cat.articleCount > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {cat.articleCount} article{cat.articleCount !== 1 ? "s" : ""}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Popular articles */}
      {popularArticles.length > 0 && (
        <Section variant="alternate-bg">
          <SectionHeader
            heading="Popular articles"
            subheading="Quick answers to the most common questions."
          />
          <div className="mx-auto max-w-2xl">
            <ul className="divide-y rounded-lg border bg-card">
              {popularArticles.map((article) => (
                <li key={`${article.categorySlug}/${article.slug}`}>
                  <Link
                    href={`/help/${article.categorySlug}/${article.slug}`}
                    className="flex items-center justify-between p-4 transition-colors hover:bg-accent/50"
                  >
                    <div>
                      <p className="font-medium">{article.frontmatter.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {article.frontmatter.description}
                      </p>
                    </div>
                    <span className="ml-4 text-xs text-muted-foreground">
                      {article.readTime} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* Contact support */}
      <Section>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Can&apos;t find what you need?</h2>
          <p className="mt-2 text-muted-foreground">
            Our support team is here to help.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Contact Support &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
