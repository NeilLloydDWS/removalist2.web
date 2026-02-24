import Link from "next/link";
import { getBlogCategories, categoryToSlug } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function BlogCategoryFilter({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = getBlogCategories();

  return (
    <nav
      className="flex flex-wrap gap-2"
      aria-label="Blog categories"
    >
      <Link
        href="/blog"
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
          !activeCategory
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
        )}
      >
        All
      </Link>
      {categories.map((category) => {
        const slug = categoryToSlug(category);
        const isActive = activeCategory === category;

        return (
          <Link
            key={slug}
            href={`/blog/category/${slug}`}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
