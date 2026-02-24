import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPostMeta } from "@/lib/blog";
import { categoryToSlug } from "@/lib/blog";
import { cn } from "@/lib/utils";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostCard({
  post,
  featured = false,
}: {
  post: BlogPostMeta;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/50",
        featured && "md:col-span-2 md:grid md:grid-cols-2"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn("block overflow-hidden", featured ? "aspect-[16/10]" : "aspect-video")}
      >
        <Image
          src={post.frontmatter.featuredImage}
          alt={post.frontmatter.title}
          width={featured ? 800 : 600}
          height={featured ? 500 : 340}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <Link href={`/blog/category/${categoryToSlug(post.frontmatter.category)}`}>
            <Badge variant="secondary">{post.frontmatter.category}</Badge>
          </Link>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" />
            {post.readTime} min read
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={cn(
              "font-semibold tracking-tight group-hover:text-primary",
              featured ? "text-2xl" : "text-lg"
            )}
          >
            {post.frontmatter.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.frontmatter.excerpt}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {formatDate(post.frontmatter.date)}
        </p>
      </div>
    </article>
  );
}
