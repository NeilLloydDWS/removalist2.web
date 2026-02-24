import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { HelpSearch } from "@/components/help-search";
import { HelpCategorySidebar } from "@/components/help-category-sidebar";
import {
  getHelpCategories,
  getAllHelpArticles,
  getCategoryName,
  generateHelpSearchIndex,
} from "@/lib/help";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export function generateStaticParams() {
  return getHelpCategories().map((cat) => ({ categorySlug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const name = getCategoryName(categorySlug);

  return {
    title: `${name} — Help Center`,
    description: `Browse ${name.toLowerCase()} help articles and guides for VanMan.`,
  };
}

export default async function HelpCategoryPage({
  params,
}: CategoryPageProps) {
  const { categorySlug } = await params;
  const grouped = getAllHelpArticles();
  const articles = grouped[categorySlug];
  const name = getCategoryName(categorySlug);
  const searchIndex = generateHelpSearchIndex();

  if (!articles && !getHelpCategories().find((c) => c.slug === categorySlug)) {
    notFound();
  }

  return (
    <Section>
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/help" className="hover:text-foreground">
            Help
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{name}</span>
        </nav>

        <div className="mb-8 sm:flex sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
            <p className="mt-2 text-muted-foreground">
              {articles?.length ?? 0} article{(articles?.length ?? 0) !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-4 w-full sm:mt-0 sm:w-64">
            <HelpSearch searchIndex={searchIndex} />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <HelpCategorySidebar activeCategory={categorySlug} />
            </div>
          </aside>

          {/* Mobile category dropdown */}
          <details className="mb-6 rounded-lg border bg-card lg:hidden">
            <summary className="cursor-pointer p-3 text-sm font-medium">
              Browse categories
            </summary>
            <div className="border-t p-3">
              <HelpCategorySidebar activeCategory={categorySlug} />
            </div>
          </details>

          {/* Article list */}
          <div>
            {articles && articles.length > 0 ? (
              <ul className="divide-y rounded-lg border bg-card">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/help/${categorySlug}/${article.slug}`}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-accent/50"
                    >
                      <div>
                        <p className="font-medium">
                          {article.frontmatter.title}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {article.frontmatter.description}
                        </p>
                      </div>
                      <span className="ml-4 flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {article.readTime} min
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                No articles in this category yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
