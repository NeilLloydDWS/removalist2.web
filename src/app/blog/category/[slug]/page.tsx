import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { BlogPostCard } from "@/components/blog-post-card";
import { BlogCategoryFilter } from "@/components/blog-category-filter";
import { BlogSearch } from "@/components/blog-search";
import {
  getBlogCategories,
  categoryToSlug,
  slugToCategory,
  getPostsByCategory,
  generateSearchIndex,
} from "@/lib/blog";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category} — Blog`,
    description: `Browse ${category.toLowerCase()} articles on the VanMan blog.`,
    alternates: {
      types: {
        "application/rss+xml": "/blog/rss.xml",
      },
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const category = slugToCategory(slug);

  if (!category) notFound();

  const posts = getPostsByCategory(category);
  const searchIndex = generateSearchIndex();

  return (
    <Section>
      <SectionHeader
        eyebrow="Blog"
        heading={category}
        subheading={`${posts.length} article${posts.length !== 1 ? "s" : ""}`}
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BlogCategoryFilter activeCategory={category} />
        <div className="w-full sm:w-64">
          <BlogSearch searchIndex={searchIndex} />
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">
          No articles in this category yet. Check back soon!
        </div>
      )}
    </Section>
  );
}
