import type { Metadata } from "next";

const SITE_NAME = "VanMan — Moving Company Software";
const SITE_URL = "https://vanman.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export interface SEOOptions {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article";
}

export function generateSEO({
  title,
  description,
  image,
  url,
  type = "website",
}: SEOOptions): Metadata {
  const truncatedDescription =
    description.length > 160 ? description.slice(0, 157) + "..." : description;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const canonicalUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  return {
    title,
    description: truncatedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: truncatedDescription,
      url: canonicalUrl,
      siteName: "VanMan",
      type,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: truncatedDescription,
      images: [ogImage],
    },
  };
}

export { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE };
