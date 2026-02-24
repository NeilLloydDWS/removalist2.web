import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/legal");

export interface LegalPageFrontmatter {
  title: string;
  lastUpdated: string;
}

export interface LegalPage {
  slug: string;
  frontmatter: LegalPageFrontmatter;
  content: string;
}

export interface LegalPageMeta {
  slug: string;
  frontmatter: LegalPageFrontmatter;
}

export function getAllLegalPages(): LegalPageMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      frontmatter: data as LegalPageFrontmatter,
    };
  });
}

export function getLegalPageBySlug(slug: string): LegalPage | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as LegalPageFrontmatter,
    content,
  };
}
