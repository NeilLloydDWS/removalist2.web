import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/help");
const WORDS_PER_MINUTE = 200;

export interface HelpArticleFrontmatter {
  title: string;
  description: string;
  category: string;
  sortOrder: number;
  lastUpdated: string;
  tags: string[];
}

export interface HelpArticle {
  slug: string;
  categorySlug: string;
  frontmatter: HelpArticleFrontmatter;
  content: string;
  readTime: number;
}

export interface HelpArticleMeta {
  slug: string;
  categorySlug: string;
  frontmatter: HelpArticleFrontmatter;
  readTime: number;
}

export interface HelpCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
}

const categoryMeta: Record<string, { name: string; description: string; icon: string }> = {
  "getting-started": {
    name: "Getting Started",
    description: "Set up your account, add trucks, invite your team, and get moving.",
    icon: "Rocket",
  },
  "calendar-scheduling": {
    name: "Calendar & Scheduling",
    description: "Schedule jobs, manage your calendar, and coordinate your fleet.",
    icon: "Calendar",
  },
  "job-management": {
    name: "Job Management",
    description: "Create, edit, and track jobs from enquiry to completion.",
    icon: "ClipboardList",
  },
  "fleet-trucks": {
    name: "Fleet & Trucks",
    description: "Manage your trucks, capacity, colours, and availability.",
    icon: "Truck",
  },
  "booking-requests": {
    name: "Booking Requests",
    description: "Set up your online booking form and manage incoming enquiries.",
    icon: "Globe",
  },
  "customer-communications": {
    name: "Customer Communications",
    description: "Send SMS and email to customers using templates and automation.",
    icon: "MessageSquare",
  },
  "invoicing-xero": {
    name: "Invoicing & Xero",
    description: "Generate invoices, connect Xero, and track payments.",
    icon: "Receipt",
  },
  "mobile-app": {
    name: "Mobile App",
    description: "Use VanMan on iOS and Android for drivers, operators, and admins.",
    icon: "Smartphone",
  },
  "team-chat": {
    name: "Team Chat",
    description: "Real-time messaging for your team with photo sharing and notifications.",
    icon: "MessagesSquare",
  },
  "account-billing": {
    name: "Account & Billing",
    description: "Manage your subscription, billing, and account settings.",
    icon: "CreditCard",
  },
  "integrations": {
    name: "Integrations",
    description: "Connect Gmail, Outlook, and Xero to VanMan.",
    icon: "Plug",
  },
  "workflow-automation": {
    name: "Workflow Automation",
    description: "Build automated workflows to save time on repetitive tasks.",
    icon: "Zap",
  },
};

function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function getAllHelpArticles(): Record<string, HelpArticleMeta[]> {
  const grouped: Record<string, HelpArticleMeta[]> = {};

  if (!fs.existsSync(CONTENT_DIR)) return grouped;

  const categories = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const categorySlug of categories) {
    const categoryDir = path.join(CONTENT_DIR, categorySlug);
    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith(".mdx"));

    const articles = files.map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(categoryDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        categorySlug,
        frontmatter: data as HelpArticleFrontmatter,
        readTime: calculateReadTime(content),
      };
    });

    articles.sort((a, b) => a.frontmatter.sortOrder - b.frontmatter.sortOrder);

    if (articles.length > 0) {
      grouped[categorySlug] = articles;
    }
  }

  return grouped;
}

export function getFlatHelpArticles(): HelpArticleMeta[] {
  const grouped = getAllHelpArticles();
  return Object.values(grouped).flat();
}

export function getHelpArticleBySlug(
  categorySlug: string,
  articleSlug: string
): HelpArticle | null {
  const filePath = path.join(CONTENT_DIR, categorySlug, `${articleSlug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: articleSlug,
    categorySlug,
    frontmatter: data as HelpArticleFrontmatter,
    content,
    readTime: calculateReadTime(content),
  };
}

export function getHelpCategories(): HelpCategory[] {
  const grouped = getAllHelpArticles();
  const allSlugs = Object.keys(categoryMeta);

  return allSlugs.map((slug) => ({
    name: categoryMeta[slug].name,
    slug,
    description: categoryMeta[slug].description,
    icon: categoryMeta[slug].icon,
    articleCount: grouped[slug]?.length ?? 0,
  }));
}

export function getCategoryName(slug: string): string {
  return categoryMeta[slug]?.name ?? slug;
}

export function getCategoryIcon(slug: string): string {
  return categoryMeta[slug]?.icon ?? "FileText";
}

export function getRelatedHelpArticles(
  currentSlug: string,
  categorySlug: string,
  limit = 3
): HelpArticleMeta[] {
  const grouped = getAllHelpArticles();
  const articles = grouped[categorySlug] ?? [];
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}

export function generateHelpSearchIndex(): {
  slug: string;
  categorySlug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}[] {
  const articles = getFlatHelpArticles();
  return articles.map((a) => ({
    slug: a.slug,
    categorySlug: a.categorySlug,
    title: a.frontmatter.title,
    category: getCategoryName(a.categorySlug),
    description: a.frontmatter.description,
    tags: a.frontmatter.tags,
  }));
}
