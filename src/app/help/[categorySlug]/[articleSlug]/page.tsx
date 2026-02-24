import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { BlogToc, type TocItem } from "@/components/blog-toc";
import { HelpCategorySidebar } from "@/components/help-category-sidebar";
import { HelpSearch } from "@/components/help-search";
import { HelpFeedback } from "@/components/help-feedback";
import { mdxComponents } from "@/components/mdx-components";
import {
  getAllHelpArticles,
  getHelpArticleBySlug,
  getCategoryName,
  getRelatedHelpArticles,
  generateHelpSearchIndex,
} from "@/lib/help";

interface ArticlePageProps {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}

export function generateStaticParams() {
  const grouped = getAllHelpArticles();
  const params: { categorySlug: string; articleSlug: string }[] = [];

  for (const [categorySlug, articles] of Object.entries(grouped)) {
    for (const article of articles) {
      params.push({ categorySlug, articleSlug: article.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;
  const article = getHelpArticleBySlug(categorySlug, articleSlug);

  if (!article) return { title: "Article Not Found" };

  const url = `https://vanman.app/help/${categorySlug}/${articleSlug}`;

  return {
    title: `${article.frontmatter.title} — Help Center`,
    description: article.frontmatter.description,
    alternates: { canonical: url },
  };
}

function extractTocItems(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ id, text, level });
  }

  return items;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function HelpArticlePage({
  params,
}: ArticlePageProps) {
  const { categorySlug, articleSlug } = await params;
  const article = getHelpArticleBySlug(categorySlug, articleSlug);

  if (!article) notFound();

  const categoryName = getCategoryName(categorySlug);
  const tocItems = extractTocItems(article.content);
  const relatedArticles = getRelatedHelpArticles(articleSlug, categorySlug);
  const searchIndex = generateHelpSearchIndex();

  // JSON-LD for getting-started guides
  const isGettingStarted = categorySlug === "getting-started";
  const jsonLd = isGettingStarted
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: article.frontmatter.title,
        description: article.frontmatter.description,
        step: tocItems.map((item, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: item.text,
        })),
      }
    : null;

  // Add id attributes to headings for TOC linking
  const headingComponents = {
    ...mdxComponents,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h2
          id={id}
          className="mb-4 mt-10 scroll-mt-20 text-2xl font-bold tracking-tight"
          {...props}
        />
      );
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h3
          id={id}
          className="mb-3 mt-8 scroll-mt-20 text-xl font-semibold"
          {...props}
        />
      );
    },
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Section>
        <Container>
          {/* Top search bar */}
          <div className="mb-8 flex justify-end">
            <div className="w-full sm:w-64">
              <HelpSearch searchIndex={searchIndex} />
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/help" className="hover:text-foreground">
              Help
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              href={`/help/${categorySlug}`}
              className="hover:text-foreground"
            >
              {categoryName}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="truncate text-foreground">
              {article.frontmatter.title}
            </span>
          </nav>

          <div className="lg:grid lg:grid-cols-[220px_1fr_200px] lg:gap-8">
            {/* Category sidebar (desktop) */}
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

            {/* Article body */}
            <article className="min-w-0">
              <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  {article.frontmatter.title}
                </h1>
                <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {article.readTime} min read
                  </span>
                  <span>&middot;</span>
                  <span>
                    Updated {formatDate(article.frontmatter.lastUpdated)}
                  </span>
                </div>
              </header>

              {/* Mobile TOC */}
              <div className="lg:hidden">
                <BlogToc items={tocItems} />
              </div>

              <div className="prose-custom max-w-prose">
                <MDXRemote
                  source={article.content}
                  components={headingComponents}
                />
              </div>

              {/* Feedback widget */}
              <div className="mt-10">
                <HelpFeedback articleSlug={articleSlug} />
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-lg font-semibold">
                    Related articles
                  </h2>
                  <ul className="divide-y rounded-lg border bg-card">
                    {relatedArticles.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={`/help/${related.categorySlug}/${related.slug}`}
                          className="flex items-center justify-between p-3 transition-colors hover:bg-accent/50"
                        >
                          <span className="text-sm font-medium">
                            {related.frontmatter.title}
                          </span>
                          <span className="ml-4 text-xs text-muted-foreground">
                            {related.readTime} min
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact support */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Still need help?{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  Contact support
                </Link>
              </div>
            </article>

            {/* TOC sidebar (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <BlogToc items={tocItems} />
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
