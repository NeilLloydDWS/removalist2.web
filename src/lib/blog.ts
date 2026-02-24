import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readTime: number;
}

export interface BlogPostMeta {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  readTime: number;
}

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      frontmatter: data as BlogPostFrontmatter,
      readTime: calculateReadTime(content),
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as BlogPostFrontmatter,
    content,
    readTime: calculateReadTime(content),
  };
}

export function getBlogCategories(): string[] {
  return [
    "Business Tips",
    "Industry News",
    "Product Updates",
    "Guides & How-tos",
    "Customer Stories",
  ];
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function slugToCategory(slug: string): string | undefined {
  const categories = getBlogCategories();
  return categories.find((c) => categoryToSlug(c) === slug);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllBlogPosts().filter(
    (post) => post.frontmatter.category === category
  );
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  tags: string[],
  limit = 3
): BlogPostMeta[] {
  const all = getAllBlogPosts().filter((p) => p.slug !== currentSlug);

  // Prefer same category
  const sameCategory = all.filter(
    (p) => p.frontmatter.category === category
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  // Fill with tag matches
  const remaining = all.filter(
    (p) => p.frontmatter.category !== category
  );
  const tagMatches = remaining.filter((p) =>
    p.frontmatter.tags.some((t) => tags.includes(t))
  );

  return [...sameCategory, ...tagMatches].slice(0, limit);
}

export function generateSearchIndex(): {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
}[] {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    category: post.frontmatter.category,
    excerpt: post.frontmatter.excerpt,
    tags: post.frontmatter.tags,
  }));
}
