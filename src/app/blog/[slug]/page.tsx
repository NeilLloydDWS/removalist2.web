import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/blog-post-card";
import { BlogToc, type TocItem } from "@/components/blog-toc";
import { BlogShare } from "@/components/blog-share";
import { mdxComponents } from "@/components/mdx-components";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  categoryToSlug,
  getRelatedPosts,
} from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  const { frontmatter } = post;
  const url = `https://vanman.app/blog/${slug}`;

  return {
    title: `${frontmatter.title} | VanMan Blog`,
    description: frontmatter.excerpt,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": "/blog/rss.xml",
      },
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: "article",
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: [
        {
          url: frontmatter.featuredImage,
          width: 1200,
          height: 675,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [frontmatter.featuredImage],
    },
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

function generateJsonLd(
  post: NonNullable<ReturnType<typeof getBlogPostBySlug>>,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    image: `https://vanman.app${post.frontmatter.featuredImage}`,
    publisher: {
      "@type": "Organization",
      name: "VanMan",
      logo: {
        "@type": "ImageObject",
        url: "https://vanman.app/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, content, readTime } = post;
  const url = `https://vanman.app/blog/${slug}`;
  const tocItems = extractTocItems(content);
  const relatedPosts = getRelatedPosts(
    slug,
    frontmatter.category,
    frontmatter.tags
  );
  const jsonLd = generateJsonLd(post, url);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="pb-0 sm:pb-0 lg:pb-0">
        <Container>
          {/* Post header */}
          <div className="mx-auto max-w-prose">
            <div className="mb-4 flex items-center gap-3">
              <Link
                href={`/blog/category/${categoryToSlug(frontmatter.category)}`}
              >
                <Badge variant="secondary">{frontmatter.category}</Badge>
              </Link>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                {readTime} min read
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {frontmatter.title}
            </h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{frontmatter.author}</span>
              <span>&middot;</span>
              <time dateTime={frontmatter.date}>
                {formatDate(frontmatter.date)}
              </time>
            </div>
          </div>

          {/* Featured image */}
          <div className="mx-auto mt-8 max-w-4xl">
            <Image
              src={frontmatter.featuredImage}
              alt={frontmatter.title}
              width={1200}
              height={675}
              className="rounded-lg"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-8 lg:pt-8">
        <Container>
          <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
            {/* Article body */}
            <article className="mx-auto max-w-prose">
              {/* Mobile TOC */}
              <div className="lg:hidden">
                <BlogToc items={tocItems} />
              </div>

              <div className="prose-custom">
                <MDXRemote source={content} components={headingComponents} />
              </div>

              {/* Share buttons */}
              <div className="mt-8 border-t pt-6">
                <BlogShare title={frontmatter.title} url={url} />
              </div>

              {/* Author bio */}
              <div className="mt-8 rounded-lg border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {frontmatter.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{frontmatter.author}</p>
                    <p className="text-sm text-muted-foreground">
                      Writing about moving companies and the tools that help
                      them grow.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA banner */}
              <div className="mt-8 rounded-lg bg-primary/5 p-6 text-center sm:p-8">
                <h3 className="text-lg font-semibold">
                  Try VanMan free for 14 days
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No credit card required. Get your moving company organised in
                  minutes.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </article>

            {/* Desktop TOC sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <BlogToc items={tocItems} />
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h2 className="mb-6 text-xl font-semibold">Related articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
