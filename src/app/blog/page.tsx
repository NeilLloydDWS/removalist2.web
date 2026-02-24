import type { Metadata } from "next";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/section-header";
import { BlogPostCard } from "@/components/blog-post-card";
import { BlogCategoryFilter } from "@/components/blog-category-filter";
import { BlogSearch } from "@/components/blog-search";
import { getAllBlogPosts, generateSearchIndex } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and updates for moving company owners. Learn how to grow your removalist business with VanMan.",
  openGraph: {
    title: "Blog | VanMan",
    description:
      "Tips, guides, and updates for moving company owners.",
  },
  alternates: {
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
};

export default function BlogListingPage() {
  const posts = getAllBlogPosts();
  const searchIndex = generateSearchIndex();

  const featuredPost =
    posts.find((p) => p.frontmatter.featured) ?? posts[0];
  const remainingPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <>
      <Section>
        <SectionHeader
          eyebrow="Blog"
          heading="Tips, guides & updates"
          subheading="Practical advice for running a better moving company."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <BlogCategoryFilter />
          <div className="w-full sm:w-64">
            <BlogSearch searchIndex={searchIndex} />
          </div>
        </div>

        {featuredPost && (
          <div className="mb-8">
            <BlogPostCard post={featuredPost} featured />
          </div>
        )}

        {remainingPosts.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {remainingPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No blog posts yet. Check back soon!
          </div>
        )}
      </Section>
    </>
  );
}
