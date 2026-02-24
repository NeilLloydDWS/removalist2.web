import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllLegalPages, getLegalPageBySlug } from "@/lib/legal";
import { mdxComponents } from "@/components/mdx-components";
import { Section } from "@/components/section";
import { LegalToc } from "@/components/legal-toc";

export function generateStaticParams() {
  return getAllLegalPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLegalPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.frontmatter.title,
    description: `${page.frontmatter.title} for VanMan moving company software.`,
    openGraph: {
      title: `${page.frontmatter.title} | VanMan`,
      description: `${page.frontmatter.title} for VanMan moving company software.`,
    },
  };
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /^## (.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text });
  }
  return headings;
}

// Custom heading components that inject IDs
const legalMdxComponents = {
  ...mdxComponents,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text =
      typeof props.children === "string"
        ? props.children
        : String(props.children ?? "");
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
};

export default async function LegalPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const page = getLegalPageBySlug(slug);
  if (!page) notFound();

  const headings = extractHeadings(page.content);
  const formattedDate = new Date(page.frontmatter.lastUpdated).toLocaleDateString(
    "en-NZ",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Section>
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{page.frontmatter.title}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
          {/* Main content */}
          <article className="max-w-prose">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {page.frontmatter.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {formattedDate}
            </p>

            <div className="mt-8 leading-relaxed">
              <MDXRemote
                source={page.content}
                components={legalMdxComponents}
              />
            </div>
          </article>

          {/* Table of Contents sidebar */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <LegalToc headings={headings} />
            </aside>
          )}
        </div>
      </div>
    </Section>
  );
}
