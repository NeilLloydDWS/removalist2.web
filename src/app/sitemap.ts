import type { MetadataRoute } from "next";
import { getAllBlogPosts, getBlogCategories, categoryToSlug } from "@/lib/blog";
import { getAllHelpArticles, getHelpCategories } from "@/lib/help";
import { getAllLegalPages } from "@/lib/legal";

const SITE_URL = "https://vanman.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/features`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/help`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Feature detail pages
  const featureSlugs = [
    "calendar-scheduling",
    "job-management",
    "fleet-management",
    "booking-requests",
    "customer-communications",
    "invoicing-xero",
    "reporting-analytics",
    "mobile-app",
    "team-chat",
  ];
  const featurePages: MetadataRoute.Sitemap = featureSlugs.map((slug) => ({
    url: `${SITE_URL}/features/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogPosts = getAllBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.frontmatter.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog category pages
  const blogCategories = getBlogCategories();
  const blogCategoryPages: MetadataRoute.Sitemap = blogCategories.map((cat) => ({
    url: `${SITE_URL}/blog/category/${categoryToSlug(cat)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Help category pages
  const helpCategories = getHelpCategories();
  const helpCategoryPages: MetadataRoute.Sitemap = helpCategories.map((cat) => ({
    url: `${SITE_URL}/help/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Help articles
  const helpArticles = getAllHelpArticles();
  const helpArticlePages: MetadataRoute.Sitemap = Object.entries(helpArticles).flatMap(
    ([categorySlug, articles]) =>
      articles.map((article) => ({
        url: `${SITE_URL}/help/${categorySlug}/${article.slug}`,
        lastModified: article.frontmatter.lastUpdated,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
  );

  // Legal pages
  const legalPages = getAllLegalPages();
  const legalPageEntries: MetadataRoute.Sitemap = legalPages.map((page) => ({
    url: `${SITE_URL}/legal/${page.slug}`,
    lastModified: page.frontmatter.lastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [
    ...staticPages,
    ...featurePages,
    ...blogPages,
    ...blogCategoryPages,
    ...helpCategoryPages,
    ...helpArticlePages,
    ...legalPageEntries,
  ];
}
